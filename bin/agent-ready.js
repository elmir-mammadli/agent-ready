#!/usr/bin/env node

import { init } from '../src/init.js'

const [, , command] = process.argv

switch (command) {
  case 'init':
    await init()
    break
  default:
    console.log(`
  agent-ready: wire an AI coding agent into any repo in 5 minutes

  Usage:
    npx agent-ready init    Set up the agent in your current repo
`)
    process.exit(0)
}
