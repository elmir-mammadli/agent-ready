import anthropicLogo from '~/assets/icons/Anthropic_logo_white.svg?url'
import geminiLogo from '~/assets/icons/Google_Gemini_logo_white.svg?url'
import githubLogo from '~/assets/icons/Octicons-mark-github-white.svg?url'
import openAiLogo from '~/assets/icons/OpenAI_Logo.svg?url'
import telegramLogo from '~/assets/icons/Telegram_logo.svg?url'
import trelloLogo from '~/assets/icons/Trello_logo.svg?url'

export const integrationTools = [
  {
    id: 'trello',
    name: 'Trello',
    src: trelloLogo,
    stage: 'trigger',
    barLogoClass: 'h-7 w-auto brightness-[2] sm:h-8',
    panelLogoClass: 'h-6 w-auto brightness-[2] sm:h-7',
    note: 'Tag a card and the run starts from there.',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    src: anthropicLogo,
    stage: 'model',
    barLogoClass: 'h-4 w-auto opacity-95 sm:h-5',
    panelLogoClass: 'h-4 w-auto opacity-95 sm:h-[1.125rem]',
    note: 'Claude is available as a first-class option.',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    src: openAiLogo,
    stage: 'model',
    barLogoClass: 'h-6.5 w-auto opacity-95 sm:h-8 invert',
    panelLogoClass: 'h-6 w-auto opacity-95 sm:h-7 invert',
    note: 'Use GPT when your team is already on OpenAI.',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    src: geminiLogo,
    stage: 'model',
    barLogoClass: 'h-6.5 w-auto opacity-95 sm:h-7',
    panelLogoClass: 'h-6 w-auto opacity-95 sm:h-[1.625rem]',
    note: 'Swap to Gemini without changing the rest of the flow.',
  },
  {
    id: 'github',
    name: 'GitHub',
    src: githubLogo,
    stage: 'ship',
    barLogoClass: 'h-6 w-6 opacity-95 sm:h-8 sm:w-8',
    panelLogoClass: 'h-5 w-5 opacity-95 sm:h-6 sm:w-6',
    label: 'GitHub',
    note: 'Runs inside GitHub Actions and opens the PR in your repo.',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    src: telegramLogo,
    stage: 'ship',
    barLogoClass: 'h-6 w-6 opacity-95 sm:h-7 sm:w-7',
    panelLogoClass: 'h-5 w-5 opacity-95 sm:h-6 sm:w-6',
    label: 'Telegram',
    note: 'Delivers the PR link straight to your chat.',
  },
] as const

export const integrationStages = [
  {
    id: 'trigger',
    eyebrow: '01',
    title: 'Start where work already lives',
    copy: 'No new queue to manage. The trigger stays in the tool your team already checks all day.',
  },
  {
    id: 'model',
    eyebrow: '02',
    title: 'Pick the model for the repo',
    copy: 'Claude, GPT, and Gemini are all on the table. Change the model without changing the workflow.',
  },
  {
    id: 'ship',
    eyebrow: '03',
    title: 'Keep execution and delivery close',
    copy: 'The run happens in GitHub. The finished link lands in Telegram when it is ready for review.',
  },
] as const

export const upcomingIntegrations = ['Jira', 'Linear', 'GitHub Projects', 'GitLab Issues', 'Bitbucket'] as const
