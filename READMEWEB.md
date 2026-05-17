Build a single-page marketing website for an npm CLI package called agent-ready.
  The package is published as @elmiristic/agent-ready.

  ---

  ## PRODUCT OVERVIEW

  agent-ready is a CLI tool that wires an AI coding agent into any GitHub repo in 5 minutes.
  The one-liner install is: npx @elmiristic/agent-ready init

  How it works:
  - User runs the setup wizard. It collects their Trello board, AI provider API key (Claude/GPT/Gemini),
    Telegram bot ID, schedule (timezone + up to 4 daily run times), and GitHub secrets.
  - The wizard generates GitHub Actions workflow files and scripts directly into .github/ in the repo.
  - User commits and pushes — agent is live.
  - From then on: user tags a Trello card with the label "agent-ready" → the agent wakes up on schedule,
    Claude (or GPT/Gemini) reads the task, writes the code, opens a PR on a new agent/ branch,
    and sends a Telegram notification with the PR link.
  - User reviews and merges. On merge, the Trello card moves to Done automatically.
  - If a task fails, the card moves back to To Do and the error is reported in Telegram.

  Supported board tools: Trello (live), Jira / Linear / GitHub Projects / GitLab Issues / Bitbucket (coming soon)
  Supported AI providers: Claude (Anthropic), OpenAI GPT, Google Gemini
  Notifications: Telegram
  Runs on: GitHub Actions (user's own repo, user's own API keys — nothing centralized)

  ---

  ## DESIGN DIRECTION

  Primary inspiration: cursor.com
  - Dark background (#0a0a0a or near-black)
  - Clean, minimal, premium developer tool aesthetic
  - Generous whitespace
  - Sharp typographic hierarchy — big bold headline, concise subtext
  - Subtle gradient accents (electric violet / emerald — consistent palette)
  - Grid lines / subtle noise texture as background decoration (like cursor.com's grid)
  - Monospace font for code snippets (Fira Code or JetBrains Mono via Google Fonts)
  - Sans-serif for body (Inter via Google Fonts)
  - Smooth scroll, micro-animations on scroll (fade-in-up, stagger children)
  - Glassmorphism cards where appropriate
  - No stock photos — use icons, code blocks, and abstract visuals only

  Color palette:
    Background:       #0a0a0a
    Surface:          #111111 / #1a1a1a
    Border:           rgba(255,255,255,0.08)
    Primary accent:   #6C63FF  (electric violet)
    Secondary accent: #00D4AA  (emerald)
    Text primary:     #FFFFFF
    Text secondary:   #888888
    Code bg:          #0d0d0d

  ---

  ## PAGE SECTIONS (in order)

  ### 1. NAVBAR
  - Logo: "agent-ready" in monospace with a small lightning bolt icon (lucide-vue-next: Zap)
  - Nav links: How it works · Features · Integrations · FAQ  (all anchor-scroll to sections)
  - CTA button top-right: "Get Started →"  scrolls to quickstart section
  - Sticky with backdrop-blur on scroll (add class on scroll via useWindowScroll from @vueuse/core)
  - Mobile hamburger menu with smooth slide-down drawer

  ### 2. HERO
  - Eyebrow pill badge: "Open Source · MIT License"
  - Main headline (large, bold, 2–3 lines):
      "Your repo has a new
       AI teammate.
       Ships code while you sleep."
  - Subheadline (one sentence):
    "Tag a Trello card. Claude writes the code, opens the PR, and pings you on Telegram.
     Zero infrastructure. Runs on GitHub Actions."
  - Two CTAs:
      Primary:   "Get Started — it's free"   (scrolls to quickstart)
      Secondary: "View on GitHub →"          (link placeholder, opens new tab)
  - Below CTAs: animated terminal block. Dark card with fake window chrome (three dots: red/yellow/green).
    Typewriter effect — lines appear one by one with a blinking cursor using a Vue composable:
      $ npx @elmiristic/agent-ready init
      ✔  Trello board connected
      ✔  Claude API key saved
      ✔  Telegram notifications configured
      ✔  Schedule set: 09:00 · 18:00 (America/New_York)
      ✔  GitHub secrets injected
      ✔  Workflow files written to .github/

      🚀  agent-ready. Push to activate.
    Each line fades/slides in after a short stagger delay.
    Use @vueuse/motion or plain CSS transitions driven by a Vue ref + setInterval.

  ### 3. SOCIAL PROOF BAR
  - Thin divider section: "Works with the tools you already use"
  - Logo/icon row: Trello · GitHub Actions · Anthropic · OpenAI · Gemini · Telegram
  - Use inline SVG logos with correct brand colors
  - On mobile: horizontal auto-scroll marquee (CSS animation, no JS library needed)

  ### 4. HOW IT WORKS
  - Section title: "From card to PR in minutes."
  - 5-step timeline. Desktop: horizontal stepper. Mobile: vertical.
    Each step: icon (lucide-vue-next), bold title, 1–2 sentence description.
      Step 1  🏷  Label it          — Tag any Trello card "agent-ready" in your To Do list
      Step 2  ⏰  Agent wakes up    — Runs on your cron schedule or manually from GitHub Actions tab
      Step 3  🤖  AI reads & codes  — Reads the card, identifies relevant files, writes the changes
      Step 4  🔀  PR opens          — New agent/ branch, PR with a one-line summary, ready for review
      Step 5  📲  You get pinged    — Telegram message with PR link. Merge it. Card moves to Done.
  - Animate each step in on scroll with staggered fade-in-up

  ### 5. FEATURES
  - Section title: "Everything you need. Nothing you don't."
  - Bento grid (CSS Grid). Desktop: 3 columns. Mobile: 1 column.
    Glassmorphism cards: background rgba(255,255,255,0.03), border rgba(255,255,255,0.08), backdrop-blur.
      Card 1 (col-span-2): "5-minute setup wizard"
        Interactive CLI guides you through every config step. No YAML hand-editing.
      Card 2: "Runs on your repo"
        GitHub Actions on your own infrastructure. Your keys stay yours. Nothing centralized.
      Card 3: "Multiple tasks per run"
        Every labeled card is processed in one run. Each gets its own branch and PR.
      Card 4: "Smart failure handling"
        Failed tasks move back to To Do with error details in Telegram. Other tasks continue.
      Card 5: "Timezone-aware scheduling"
        Pick your timezone. Set 1–4 daily run times. Wizard converts to UTC cron automatically.
      Card 6 (col-span-2): "Multi-AI support"
        Choose Claude, GPT-4o, or Gemini. Swap anytime. Bring your own key. No lock-in.
  - Animate cards in on scroll with IntersectionObserver via @vueuse/core useIntersectionObserver

  ### 6. QUICKSTART
  - Section title: "Up and running in 5 minutes."
  - Dark terminal-style container card.
  - Four numbered steps:
      Step 1 — Run the wizard
        $ npx @elmiristic/agent-ready init
      Step 2 — Follow the prompts
        • Connect your Trello board
        • Add your AI provider API key
        • Configure Telegram notifications
        • Set your timezone and daily run times
        • GitHub secrets are injected automatically
      Step 3 — Commit and push
        $ git add .github && git commit -m "feat: add agent-ready" && git push
      Step 4 — Label a card
        Tag any Trello card "agent-ready" and watch the agent do the rest.
  - Each code block has a copy-to-clipboard button (top-right of block).
    Use navigator.clipboard.writeText() in a Vue composable. Show a checkmark for 2s on copy.
  - Syntax highlight: use highlight.js or shiki (both work well in Nuxt 3 as a plugin or via nuxt-shiki)
  - Code theme: One Dark Pro or Tokyo Night

  ### 7. INTEGRATIONS
  - Section title: "Integrations"
  - Two columns side by side (stack on mobile):
      LEFT — "Available now"
        Each row: SVG logo + integration name + green "Live" badge
          Trello
          GitHub Actions
          Anthropic Claude
          OpenAI GPT
          Google Gemini
          Telegram
      RIGHT — "Coming soon" (muted, violet "Soon" pill badges)
          Jira
          Linear
          GitHub Projects
          GitLab Issues
          Bitbucket
  - Cards with the same glassmorphism style as features section

  ### 8. FAQ
  - Section title: "Common questions"
  - Accordion: one open at a time. Animate height with Vue Transition + max-height trick.
  - 8 questions:
      Q: Do I need to host anything?
      A: No. Everything runs on GitHub Actions inside your own repository. Zero servers.

      Q: Which AI models are supported?
      A: Claude (Anthropic), GPT-4o (OpenAI), and Gemini (Google). You choose during setup.

      Q: Is my API key stored anywhere?
      A: Never. Keys are stored as GitHub Actions secrets in your own repo. agent-ready never sees them.

      Q: Can it handle multiple tasks at once?
      A: Yes. Every card labeled "agent-ready" in your To Do list is processed in a single run,
         each on its own branch with its own PR.

      Q: What happens if a task fails?
      A: The card moves back to To Do, you get a Telegram error report, and the other tasks continue normally.

      Q: How do I trigger a run manually?
      A: From the GitHub Actions tab in your repo. No CLI needed after initial setup.

      Q: Is it free?
      A: agent-ready is MIT open source and completely free. You only pay for your AI provider API usage.

      Q: What's the minimum Node.js version?
      A: Node.js 18+.

  ### 9. CTA BANNER
  - Full-width section with animated gradient background (violet → emerald, slow CSS animation)
  - Headline: "Your next PR was already written."
  - Subtext: "One command. Five minutes. Shipped."
  - Terminal line in a dark pill: npx @elmiristic/agent-ready init
  - Button: "View on GitHub →"

  ### 10. FOOTER
  - Logo + tagline: "AI coding agents for every repo."
  - Link groups: Product (How it works, Features, Quickstart) · Links (GitHub, npm, License)
  - "Made by Amazesofts"
  - Copyright: © 2025 agent-ready · MIT License

  ---

  ## TECHNICAL REQUIREMENTS
  Framework:       Nuxt 3.16 (latest stable) with Vue 3 Composition API, <script setup> syntax everywhere
  Styling:         Tailwind CSS via @nuxtjs/tailwindcss module
  Animations:      @vueuse/motion for scroll-triggered animations (useMotion, visibleOnce preset)
                   Plain Vue Transition + CSS for accordion and nav drawer
  Utilities:       @vueuse/core (useWindowScroll, useIntersectionObserver, useClipboard, useMediaQuery)
  Icons:           lucide-vue-next
  Fonts:           @nuxtjs/google-fonts module — Inter (400, 500, 600, 700) + Fira Code (400, 500)
  Code highlight:  nuxt-shiki or shiki as a Nuxt plugin — theme: "one-dark-pro"
  Rendering:       SSG (nuxi generate) — no server needed, deploy to Netlify / Vercel / GitHub Pages
  SEO:             useSeoMeta() and useHead() composables in app.vue
                   og:title, og:description, og:image, twitter:card all set
  Favicon:         ⚡ lightning bolt SVG in /public/favicon.svg

  File structure to follow:
    /components
      AppNavbar.vue
      AppFooter.vue
      HeroSection.vue
      HeroTerminal.vue        ← typewriter terminal animation
      SocialProofBar.vue
      HowItWorks.vue
      FeaturesGrid.vue
      QuickstartSection.vue
      IntegrationsSection.vue
      FaqSection.vue
      CtaBanner.vue
      CodeBlock.vue           ← reusable: syntax-highlighted block + copy button
    /composables
      useTypewriter.js        ← drives the terminal typewriter effect
      useClipboard.js         ← copy-to-clipboard with 2s feedback state (or use @vueuse/core)
    /public
      favicon.svg
      /logos                  ← SVG logos for Trello, Anthropic, OpenAI, Gemini, Telegram, GitHub
    /app.vue
    /nuxt.config.ts

  Quality targets:
    - Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO
    - Fully responsive: mobile-first, sm / md / lg / xl breakpoints
    - All external links: target="_blank" rel="noopener noreferrer"
    - Keyboard navigable, proper aria-labels, semantic HTML throughout
    - No layout shift — reserve space for fonts and images
    - Smooth scroll: html { scroll-behavior: smooth } in Tailwind base layer

  ---

  ## COPY & TONE NOTES

  - Punchy, direct, developer-first. No fluff, no marketing-speak.
  - Short sentences. Active voice.
  - Code examples are first-class content — style them beautifully.
  - The typewriter terminal in the hero is the crown jewel — make it feel alive.
  - The goal: a developer lands on this page and thinks "I need this in my repo right now."
  - cursor.com is the north star for aesthetic: study their spacing, type scale, and card borders.