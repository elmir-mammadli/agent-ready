import chalk from 'chalk'
import { welcome } from './steps/welcome.js'
import { selectProvider } from './steps/selectProvider.js'
import { collectTrello } from './steps/collectTrello.js'
import { collectAnthropic } from './steps/collectAnthropic.js'
import { collectTelegram } from './steps/collectTelegram.js'
import { setGithubSecrets } from './steps/setGithubSecrets.js'
import { scaffold } from './steps/scaffold.js'
import { done } from './steps/done.js'

export async function init() {
  try {
    await welcome()
    const provider = await selectProvider()
    const board = await collectTrello()
    const anthropic = await collectAnthropic()
    const telegram = await collectTelegram()
    const secrets = { ...board, ...anthropic, ...telegram }
    await setGithubSecrets(secrets)
    await scaffold()
    await done()
  } catch (err) {
    if (err.name === 'ExitPromptError') {
      console.log(chalk.dim('\n  Setup cancelled.'))
      process.exit(0)
    }
    console.error(chalk.red('\n  Error: ' + err.message))
    process.exit(1)
  }
}
