# agent-ready

Wire an AI coding agent into any GitHub repo in 5 minutes.

Tag a Trello card **agent-ready** and Claude reads the task, writes the code, opens a PR, and pings you on Telegram. Runs on your schedule, in your timezone.

## Quick start

```bash
npx @elmiristic/agent-ready init
```

That's it. The wizard handles everything.

## What the wizard sets up

1. **Board** - connect your Trello board and pick the right lists
2. **Anthropic** - add your Claude API key
3. **Telegram** - message [@agentreadybot](https://t.me/agentreadybot) and paste your chat ID. No bot setup needed.
4. **Schedule** - pick your timezone and the times you want the agent to run each day
5. **GitHub secrets** - set automatically via GitHub CLI, or manually if you prefer
6. **Workflow files** - written directly into your repo under `.github/`

Then run:

```bash
git add .github && git commit -m "feat: add agent-ready" && git push
```

## How it works

1. Add the `agent-ready` label to a Trello card in your To Do list
2. The agent runs at the times you chose during setup
3. Claude reads the card title and description, finds the relevant files, and writes the code
4. A PR is opened with a summary of the change
5. You get a Telegram message with the PR link
6. Merge the PR and the card moves to Done automatically

Nothing touches `main` without your review.

## Schedule

During setup you pick your timezone and up to two daily run times. The wizard converts them to UTC and writes the correct cron expressions into your workflow file. You can also trigger a run manually anytime from the GitHub Actions tab.

## Requirements

- Node.js 18+
- A GitHub repository
- A Trello account
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))
- GitHub CLI (`gh`) for automatic secret setup — optional, secrets can be added manually

## Supported board tools

| Tool | Status |
|------|--------|
| Trello | Available |
| Jira | Coming soon |
| Linear | Coming soon |
| GitHub Projects | Coming soon |

## License

MIT
