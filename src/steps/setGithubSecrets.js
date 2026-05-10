import chalk from 'chalk'
import { confirm } from '@inquirer/prompts'
import { execa } from 'execa'
import ora from 'ora'

export async function setGithubSecrets(secrets) {
  console.log(chalk.bold('  GitHub Secrets'))
  console.log()

  const useGhCli = await confirm({
    message:
      '  Set GitHub secrets automatically? (requires GitHub CLI: gh.io/cli)',
    default: true,
  })

  console.log()

  const SKIP_DISPLAY = new Set(['TELEGRAM_BOT_TOKEN', 'AGENT_READY_SECRET'])

  if (!useGhCli) {
    console.log(chalk.dim('  Add these secrets manually in:'))
    console.log(
      chalk.dim('  GitHub repo → Settings → Secrets → Actions → New secret'),
    )
    console.log()
    for (const [key] of Object.entries(secrets)) {
      if (SKIP_DISPLAY.has(key)) continue
      console.log(`  ${chalk.yellow(key)}`)
    }
    console.log()
    console.log(
      chalk.dim('  Note: TELEGRAM_BOT_TOKEN and AGENT_READY_SECRET are managed by agent-ready.'),
    )
    console.log()
    return
  }

  const spinner = ora({ text: '  Setting GitHub secrets...', indent: 2 }).start()

  let failed = []

  for (const [key, value] of Object.entries(secrets)) {
    if (key === 'TELEGRAM_BOT_TOKEN') continue
    try {
      await execa('gh', ['secret', 'set', key, '--body', value])
    } catch {
      failed.push(key)
    }
  }

  if (failed.length > 0) {
    spinner.warn(
      `  Some secrets failed to set: ${failed.join(', ')}\n  Set them manually in GitHub repo → Settings → Secrets → Actions`,
    )
  } else {
    spinner.succeed('  All secrets set.')
  }

  console.log()
}
