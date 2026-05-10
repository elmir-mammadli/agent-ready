const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const INTERNAL_SECRET = process.env.INTERNAL_SECRET

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers['x-internal-secret']
  if (INTERNAL_SECRET && authHeader !== INTERNAL_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  const { chat_id, text } = body
  if (!chat_id || !text) {
    return res.status(400).json({ error: 'chat_id and text required' })
  }

  const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text, parse_mode: 'HTML' }),
  })

  const tgData = await tgRes.json()
  if (!tgRes.ok) {
    return res.status(502).json({ error: 'Telegram error', detail: tgData })
  }

  return res.status(200).json({ ok: true })
}
