export function agentScriptTemplate() {
  return `import { execSync } from 'child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import Anthropic from '@anthropic-ai/sdk'

const AGENT_READY_API = 'https://telegram-bot-ruby-tau.vercel.app'

const {
  TRELLO_API_KEY,
  TRELLO_TOKEN,
  TRELLO_LIST_ID,
  TRELLO_DOING_LIST_ID,
  TRELLO_AGENT_LABEL_ID,
  ANTHROPIC_API_KEY,
  TELEGRAM_CHAT_ID,
  AGENT_READY_SECRET,
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
} = process.env

const required = {
  TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_LIST_ID,
  TRELLO_DOING_LIST_ID, TRELLO_AGENT_LABEL_ID,
  ANTHROPIC_API_KEY, TELEGRAM_CHAT_ID,
  GITHUB_TOKEN, GITHUB_REPOSITORY,
}
const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k)
if (missing.length > 0) {
  console.error('Missing secrets: ' + missing.join(', '))
  process.exit(1)
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

async function trello(path, method = 'GET', body = null) {
  const sep = path.includes('?') ? '&' : '?'
  const url = \`https://api.trello.com/1\${path}\${sep}key=\${TRELLO_API_KEY}&token=\${TRELLO_TOKEN}\`
  const opts = { method, headers: { 'Content-Type': 'application/json' } }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(url, opts)
  if (!res.ok) throw new Error(\`Trello \${method} \${path}: \${res.status} \${await res.text()}\`)
  return res.json()
}

async function sendTelegram(text) {
  const headers = { 'Content-Type': 'application/json' }
  if (AGENT_READY_SECRET) headers['x-internal-secret'] = AGENT_READY_SECRET
  await fetch(\`\${AGENT_READY_API}/api/send\`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
  })
}

function parseClaudeJson(msg) {
  if (msg.stop_reason === 'max_tokens') {
    throw new Error('Claude response was cut off. Narrow the task scope in the card description.')
  }
  const raw = msg.content[0].text.trim()
  const json = raw.replace(/^\`\`\`(?:json)?\\s*/i, '').replace(/\\s*\`\`\`$/, '')
  return JSON.parse(json)
}

function getFileTree() {
  return execSync(
    'find src -type f \\\\( -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.js" \\\\) | grep -v ".next" | grep -v "node_modules" | sort',
    { encoding: 'utf8' },
  ).trim()
}

async function getRelevantFiles(card, fileTree) {
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: \`You are a coding agent. Given a task and file tree, identify which files to read.

Task: \${card.name}
Description: \${card.desc || 'No description.'}

File tree:
\${fileTree}

Return ONLY a JSON array of file paths, max 6 files.
Example: ["src/app/page.tsx", "src/components/Hero.tsx"]\`,
    }],
  })
  return parseClaudeJson(msg)
}

async function makeChanges(card, fileContents) {
  const filesText = Object.entries(fileContents)
    .map(([path, content]) => \`### \${path}\\n\\\`\\\`\\\`\\n\${content}\\n\\\`\\\`\\\`\`)
    .join('\\n\\n')

  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    messages: [{
      role: 'user',
      content: \`You are a coding agent.

Task: \${card.name}
Description: \${card.desc || 'No description.'}

File contents:
\${filesText}

Return ONLY valid JSON — no markdown, no explanation:
{
  "changes": [{"path": "src/...", "content": "...complete file content..."}],
  "summary": "One sentence describing the change",
  "branchName": "lowercase-hyphen-slug-max-40-chars"
}

Rules:
- Only include files you actually modified
- Return complete file content, not a diff
- branchName: lowercase, hyphens only, max 40 chars\`,
    }],
  })
  return parseClaudeJson(msg)
}

async function createPR(branch, card, summary) {
  const [owner, repo] = GITHUB_REPOSITORY.split('/')
  const res = await fetch(\`https://api.github.com/repos/\${owner}/\${repo}/pulls\`, {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${GITHUB_TOKEN}\`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      title: \`agent: \${card.name}\`,
      body: \`## Summary\\n\${summary}\\n\\n## Trello Card\\n\${card.shortUrl}\\n\\n<!-- trello-card-id: \${card.id} -->\`,
      head: branch,
      base: 'main',
    }),
  })
  if (!res.ok) throw new Error(\`GitHub PR: \${res.status} \${await res.text()}\`)
  return (await res.json()).html_url
}

async function processCard(card, fileTree) {
  console.log(\`\\nProcessing: "\${card.name}"\`)

  await trello(\`/cards/\${card.id}?idList=\${TRELLO_DOING_LIST_ID}\`, 'PUT')

  const filePaths = await getRelevantFiles(card, fileTree)
  console.log('Files:', filePaths)

  const fileContents = {}
  for (const filePath of filePaths) {
    try {
      const content = readFileSync(filePath, 'utf8')
      const lines = content.split('\\n')
      fileContents[filePath] = lines.length > 300
        ? lines.slice(0, 300).join('\\n') + '\\n// ... truncated ...'
        : content
    } catch {
      console.warn(\`Could not read \${filePath}\`)
    }
  }

  const { changes, summary, branchName } = await makeChanges(card, fileContents)
  console.log('Summary:', summary)

  const branch = \`agent/\${card.id}_\${branchName}\`
  execSync(\`git checkout -b \${branch}\`)

  for (const { path, content } of changes) {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, content, 'utf8')
    console.log('Written:', path)
  }

  execSync('git add -A')
  execSync(\`git commit -m "agent: \${summary} [skip vercel]"\`)
  execSync(\`git push origin \${branch}\`)

  const prUrl = await createPR(branch, card, summary)
  console.log('PR:', prUrl)

  return { summary, prUrl }
}

async function main() {
  console.log('Fetching Trello cards...')
  const allCards = await trello(\`/lists/\${TRELLO_LIST_ID}/cards\`)
  const cards = allCards.filter(c => c.idLabels.includes(TRELLO_AGENT_LABEL_ID))

  console.log(\`\${allCards.length} total, \${cards.length} agent-ready.\`)

  if (cards.length === 0) {
    await sendTelegram('agent-ready: No tasks found. All clear.')
    return
  }

  execSync('git config user.name "agent-ready"')
  execSync('git config user.email "agent@agent-ready.dev"')
  execSync(\`git remote set-url origin https://x-access-token:\${GITHUB_TOKEN}@github.com/\${GITHUB_REPOSITORY}.git\`)

  const fileTree = getFileTree()

  await sendTelegram(\`agent-ready: Starting \${cards.length} task\${cards.length > 1 ? 's' : ''}...\\n\${cards.map((c, i) => \`\${i + 1}. \${c.name}\`).join('\\n')}\`)

  const results = []

  for (const card of cards) {
    try {
      const { summary, prUrl } = await processCard(card, fileTree)
      results.push({ card, summary, prUrl, ok: true })
    } catch (err) {
      console.error(\`Failed "\${card.name}": \${err.message}\`)
      results.push({ card, error: err.message, ok: false })
      await trello(\`/cards/\${card.id}?idList=\${TRELLO_LIST_ID}\`, 'PUT').catch(() => {})
    }
    execSync('git checkout main')
  }

  const succeeded = results.filter(r => r.ok)
  const failed = results.filter(r => !r.ok)

  let msg = \`agent-ready: Run complete\\n\`
  msg += \`\${succeeded.length} done, \${failed.length} failed\\n\`

  if (succeeded.length > 0) {
    msg += \`\\nCompleted:\\n\` + succeeded.map(r => \`- \${r.card.name}\\n  \${r.prUrl}\`).join('\\n')
  }

  if (failed.length > 0) {
    msg += \`\\n\\nFailed (moved back to To Do):\\n\` + failed.map(r => \`- \${r.card.name}: \${r.error}\`).join('\\n')
  }

  await sendTelegram(msg)
  console.log('Done.')
}

main().catch(async err => {
  console.error('Fatal:', err.message)
  await sendTelegram(\`agent-ready: Fatal error\\n\${err.message}\`).catch(() => {})
  process.exit(1)
})
`
}
