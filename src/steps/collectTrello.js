import chalk from 'chalk'
import { input, password, confirm } from '@inquirer/prompts'

export async function collectTrello() {
  console.log(chalk.bold('  Step 1 of 3: Trello'))
  console.log()
  console.log(
    chalk.dim('  1. Go to: ') +
      chalk.cyan('https://trello.com/power-ups/admin'),
  )
  console.log(chalk.dim('  2. Create a Power-Up → go to API Key tab'))
  console.log(chalk.dim('  3. Copy your Key, then click "Token" to generate your Token'))
  console.log()

  const apiKey = await password({
    message: '  Trello API Key',
    mask: '●',
  })

  const token = await password({
    message: '  Trello Token',
    mask: '●',
  })

  console.log()
  console.log(chalk.dim('  To find your List IDs, open this URL in your browser:'))
  console.log(
    chalk.cyan(
      `  https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`,
    ),
  )
  console.log(chalk.dim('  Copy your board ID, then open:'))
  console.log(
    chalk.cyan(
      `  https://api.trello.com/1/boards/BOARD_ID/lists?key=${apiKey}&token=${token}`,
    ),
  )
  console.log()

  const todoListId = await input({
    message: '  To Do list ID',
  })

  const doingListId = await input({
    message: '  Doing list ID',
  })

  const doneListId = await input({
    message: '  Done list ID',
  })

  console.log()
  console.log(chalk.dim('  Now create a label called "agent-ready" on your board.'))
  console.log(chalk.dim('  Then open this URL to find its ID:'))
  console.log(
    chalk.cyan(
      `  https://api.trello.com/1/boards/BOARD_ID/labels?key=${apiKey}&token=${token}`,
    ),
  )
  console.log()

  const labelId = await input({
    message: '  agent-ready label ID',
  })

  console.log()

  return {
    TRELLO_API_KEY: apiKey,
    TRELLO_TOKEN: token,
    TRELLO_LIST_ID: todoListId,
    TRELLO_DOING_LIST_ID: doingListId,
    TRELLO_DONE_LIST_ID: doneListId,
    TRELLO_AGENT_LABEL_ID: labelId,
  }
}
