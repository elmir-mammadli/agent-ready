import chalk from 'chalk'
import { password } from '@inquirer/prompts'

export async function collectAnthropic() {
  console.log(chalk.bold('  Step 2 of 3: Anthropic'))
  console.log()
  console.log(
    chalk.dim('  1. Go to: ') + chalk.cyan('https://console.anthropic.com/settings/keys'),
  )
  console.log(chalk.dim('  2. Create a new API key and paste it below'))
  console.log()

  const apiKey = await password({
    message: '  Anthropic API Key',
    mask: '●',
  })

  console.log()

  return {
    ANTHROPIC_API_KEY: apiKey,
  }
}
