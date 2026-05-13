![agent-ready](https://raw.githubusercontent.com/elmir-mammadli/agent-ready/main/banner.svg)

# agent-ready

Wire an AI coding agent into any GitHub repo in 5 minutes.

Tag a Trello card **agent-ready** and Claude reads the task, writes the code, opens a PR, and notifies you on Telegram. Runs on your schedule, in your timezone. Nothing touches `main` without your review.

## Quick start

```bash
npx @elmiristic/agent-ready init
```

## What the wizard sets up

1. **Board** - connect your Trello board and select your To Do, Doing, and Done lists
2. **Anthropic** - add your Claude API key
3. **Telegram** - message [@agentreadybot](https://t.me/agentreadybot) and send `/start` to get your chat ID. No bot setup required.
4. **Schedule** - pick your timezone and how many times per day the agent should run (1 to 4). Set each run time individually. The wizard converts them to UTC and writes the cron expressions automatically.
5. **GitHub secrets** - set automatically via GitHub CLI, or paste them manually in repo settings
6. **Workflow files** - written into `.github/workflows/` and `.github/scripts/` in your current directory

Then commit and push to activate:

```bash
git add .github && git commit -m "feat: add agent-ready" && git push
```

## How it works

1. Add the `agent-ready` label to a Trello card in your To Do list
2. The agent runs at the times you configured, or trigger it manually from the GitHub Actions tab
3. Claude identifies the relevant files, reads them, and writes the changes
4. A PR is opened on a new `agent/` branch with a one-line summary
5. You get a Telegram message with the PR link
6. Merge the PR and the Trello card moves to Done automatically

If a task fails, the card moves back to To Do and the error is included in the Telegram report. All other tasks in the same run continue normally.

## Schedule

Pick your timezone and how many times per day the agent should run — 1, 2, 3, or 4. You set each run time individually. The wizard converts everything to UTC and writes the cron expressions into your workflow file. You can also trigger a run manually anytime from the GitHub Actions tab.

## Multiple tasks per run

The agent processes all cards labeled `agent-ready` in a single run. Each card gets its own branch and PR. The final Telegram message lists what completed and what failed.

## Requirements

- Node.js 18+
- A GitHub repository with Actions enabled
- A Trello account
- An Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com)
- GitHub CLI (`gh`) for automatic secret setup — optional, can be done manually in repo settings

## Supported board tools

| Tool | Status |
|------|--------|
| Trello | Available |
| Jira | Coming soon |
| Linear | Coming soon |
| GitHub Projects | Coming soon |
| GitLab Issues | Coming soon |
| Bitbucket | Coming soon |

## License

MIT
