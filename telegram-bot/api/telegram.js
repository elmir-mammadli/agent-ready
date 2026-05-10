const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN

function tg(method, body) {
  return fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const message = body?.message
  if (!message) return res.status(200).json({ ok: true })

  const chatId = message.chat.id
  const text = message.text?.trim()

  if (text === '/start') {
    await tg('sendMessage', {
      chat_id: chatId,
      parse_mode: 'HTML',
      text:
        `👋 <b>Welcome to agent-ready!</b>\n\n` +
        `Your Telegram Chat ID is:\n\n` +
        `<code>${chatId}</code>\n\n` +
        `Copy this and paste it when running <code>npx agent-ready init</code>.\n\n` +
        `You'll receive notifications here whenever your coding agent finishes a task or opens a PR.`,
    })
  }

  return res.status(200).json({ ok: true })
}
