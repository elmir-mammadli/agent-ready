export function workflowTemplate(crons = ['0 9 * * *', '0 17 * * *']) {
  const cronLines = crons.map(c => `    - cron: '${c}'`).join('\n')
  return `name: agent-ready

on:
  schedule:
${cronLines}
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  run-agent:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install agent dependencies
        run: npm install --prefix .github/scripts @anthropic-ai/sdk

      - name: Run agent
        run: node .github/scripts/agent-ready.mjs
        env:
          TRELLO_API_KEY: \${{ secrets.TRELLO_API_KEY }}
          TRELLO_TOKEN: \${{ secrets.TRELLO_TOKEN }}
          TRELLO_LIST_ID: \${{ secrets.TRELLO_LIST_ID }}
          TRELLO_DOING_LIST_ID: \${{ secrets.TRELLO_DOING_LIST_ID }}
          TRELLO_AGENT_LABEL_ID: \${{ secrets.TRELLO_AGENT_LABEL_ID }}
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
          TELEGRAM_CHAT_ID: \${{ secrets.TELEGRAM_CHAT_ID }}
          AGENT_READY_SECRET: \${{ secrets.AGENT_READY_SECRET }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
}
