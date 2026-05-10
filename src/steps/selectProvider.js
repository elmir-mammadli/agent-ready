import chalk from 'chalk'
import { select } from '@inquirer/prompts'

export async function selectProvider() {
  console.log(chalk.bold('  Which project management tool do you use?'))
  console.log()

  const provider = await select({
    message: '  Board tool',
    choices: [
      { name: 'Trello', value: 'trello' },
      { name: 'Jira (coming soon)', value: 'jira', disabled: true },
      { name: 'Linear (coming soon)', value: 'linear', disabled: true },
      { name: 'GitHub Projects (coming soon)', value: 'github-projects', disabled: true },
      { name: 'GitLab Issues (coming soon)', value: 'gitlab', disabled: true },
      { name: 'Bitbucket (coming soon)', value: 'bitbucket', disabled: true },
    ],
  })

  console.log()
  return provider
}
