import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import { workflowTemplate } from '../templates/workflow.js'
import { agentScriptTemplate } from '../templates/agentScript.js'
import { doneWorkflowTemplate } from '../templates/doneWorkflow.js'

export async function scaffold({ crons } = {}) {
  const spinner = ora({ text: '  Generating workflow files...', indent: 2 }).start()

  const cwd = process.cwd()

  const workflowsDir = path.join(cwd, '.github', 'workflows')
  const scriptsDir = path.join(cwd, '.github', 'scripts')

  await fs.ensureDir(workflowsDir)
  await fs.ensureDir(scriptsDir)

  await fs.writeFile(
    path.join(workflowsDir, 'agent-ready.yml'),
    workflowTemplate(crons),
  )

  await fs.writeFile(
    path.join(workflowsDir, 'agent-ready-done.yml'),
    doneWorkflowTemplate(),
  )

  await fs.writeFile(
    path.join(scriptsDir, 'agent-ready.mjs'),
    agentScriptTemplate(),
  )

  spinner.succeed('  Workflow files generated.')
  console.log()
  console.log(
    chalk.dim('  Created: ') + chalk.white('.github/workflows/agent-ready.yml'),
  )
  console.log(
    chalk.dim('  Created: ') +
      chalk.white('.github/workflows/agent-ready-done.yml'),
  )
  console.log(
    chalk.dim('  Created: ') + chalk.white('.github/scripts/agent-ready.mjs'),
  )
  console.log()
}
