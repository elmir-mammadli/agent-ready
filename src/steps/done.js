import chalk from 'chalk'

export async function done() {
  console.log(chalk.dim('  ─────────────────────────────────────────────────'))
  console.log()
  console.log('  ' + chalk.green('✓') + chalk.bold('  agent-ready is set up.'))
  console.log()
  console.log(chalk.dim('  How it works:'))
  console.log(
    chalk.dim('  1. Add the ') +
      chalk.yellow('agent-ready') +
      chalk.dim(' label to a Trello card in your To Do list'),
  )
  console.log(
    chalk.dim('  2. The agent runs at 9am and 5pm (or trigger manually in GitHub Actions)'),
  )
  console.log(chalk.dim('  3. Claude reads the task, edits the code, opens a PR'))
  console.log(chalk.dim('  4. You get a Telegram message with the PR link'))
  console.log(chalk.dim('  5. Review and merge — nothing touches main without you'))
  console.log()
  console.log(chalk.dim('  Commit the generated files and push to get started:'))
  console.log()
  console.log('  ' + chalk.cyan('git add .github && git commit -m "feat: add agent-ready" && git push'))
  console.log()
  console.log(
    chalk.dim('  Docs: ') + chalk.cyan('https://github.com/amazesofts/agent-ready'),
  )
  console.log()
}
