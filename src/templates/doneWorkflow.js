export function doneWorkflowTemplate() {
  return `name: agent-ready: mark done

on:
  pull_request:
    types: [closed]

jobs:
  mark-done:
    if: github.event.pull_request.merged == true && startsWith(github.event.pull_request.head.ref, 'agent/')
    runs-on: ubuntu-latest

    steps:
      - name: Move Trello card to Done and notify Telegram
        run: |
          CARD_ID=$(echo "$PR_BODY" | grep -o 'trello-card-id: [a-f0-9]*' | awk '{print $2}')

          if [ -z "$CARD_ID" ]; then
            echo "No card ID found. Skipping."
            exit 0
          fi

          curl -s -X PUT \\
            "https://api.trello.com/1/cards/\${CARD_ID}?idList=\${TRELLO_DONE_LIST_ID}&key=\${TRELLO_API_KEY}&token=\${TRELLO_TOKEN}"

          MESSAGE="Merged: \${PR_TITLE}%0ACard moved to Done."
          curl -s -X POST "https://telegram-bot-ruby-tau.vercel.app/api/send" \\
            -H "Content-Type: application/json" \\
            -d "{\\"chat_id\\":\\"\${TELEGRAM_CHAT_ID}\\",\\"text\\":\\"\${MESSAGE}\\"}"
        env:
          PR_BODY: \${{ github.event.pull_request.body }}
          PR_TITLE: \${{ github.event.pull_request.title }}
          TRELLO_API_KEY: \${{ secrets.TRELLO_API_KEY }}
          TRELLO_TOKEN: \${{ secrets.TRELLO_TOKEN }}
          TRELLO_DONE_LIST_ID: \${{ secrets.TRELLO_DONE_LIST_ID }}
          TELEGRAM_CHAT_ID: \${{ secrets.TELEGRAM_CHAT_ID }}
`
}
