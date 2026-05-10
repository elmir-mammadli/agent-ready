import chalk from 'chalk'

export async function welcome() {
  console.log()
  console.log(
    chalk.bold('  agent-ready') + chalk.dim(': AI coding agent for your repo'),
  )
  console.log()
  console.log(
    chalk.dim('  Tag a Trello card ') +
      chalk.yellow('agent-ready') +
      chalk.dim(', Claude reads the task,'),
  )
  console.log(
    chalk.dim('  writes the code, opens a PR, and pings you on Telegram.'),
  )
  console.log()
  console.log(chalk.dim('  This wizard sets everything up in about 5 minutes.'))
  console.log()
  console.log(chalk.dim('  ─────────────────────────────────────────────────'))
  console.log()
}
