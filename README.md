# agent-ready

Wire an AI coding agent into any GitHub repo in 5 minutes.

Tag a Trello card **agent-ready**, and Claude reads the task, edits the code, opens a PR, and pings you on Telegram — twice a day, automatically.

## Quick start

```bash
npx agent-ready init
```

The wizard will:
1. Connect your Trello board
2. Add your Anthropic API key
3. Give you a Telegram chat ID via @agent_ready_bot
4. Set all GitHub secrets automatically
5. Write the GitHub Actions workflows into your repo

Then commit and push `.github/` and you're live.

## How it works

1. Add the `agent-ready` label to a Trello card in your **To Do** list
2. The agent runs at **9am and 5pm** (or trigger manually in GitHub Actions)
3. Claude reads the card title + description, identifies relevant files, writes the code
4. A PR is opened — nothing touches `main` without your review
5. You get a Telegram message with the PR link
6. Merge the PR → card moves to **Done** automatically

## Requirements

- Node.js 18+
- A GitHub repository
- GitHub CLI (`gh`) for automatic secret setup (optional — can set manually)
- A Trello account
- An Anthropic API key

## License

MIT
