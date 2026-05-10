import chalk from 'chalk'
import { input } from '@inquirer/prompts'

export async function collectTelegram() {
  console.log(chalk.bold('  Step 3 of 3 — Telegram'))
  console.log()
  console.log(chalk.dim('  Open Telegram and message: ') + chalk.cyan('@agent_ready_bot'))
  console.log()
  console.log(chalk.dim('  Send: ') + chalk.white('/start'))
  console.log()
  console.log(chalk.dim('  The bot will reply with your Chat ID. Paste it below.'))
  console.log()

  const chatId = await input({
    message: '  Your Telegram Chat ID',
  })

  console.log()

  return {
    TELEGRAM_BOT_TOKEN: 'managed',
    TELEGRAM_CHAT_ID: chatId,
    AGENT_READY_SECRET: 'ar_shared_2026',
  }
}
