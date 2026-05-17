<script setup>
import { Bot, Clock3, GitPullRequest, Send, Tag } from 'lucide-vue-next'

const steps = [
  {
    icon: Tag,
    title: 'Label it',
    description: 'Tag any Trello card "agent-ready" in your To Do list.',
  },
  {
    icon: Clock3,
    title: 'Agent wakes up',
    description: 'Runs on your cron schedule or manually from the GitHub Actions tab.',
  },
  {
    icon: Bot,
    title: 'AI reads & codes',
    description: 'Reads the card, identifies relevant files, and writes the changes.',
  },
  {
    icon: GitPullRequest,
    title: 'PR opens',
    description: 'New agent/ branch, PR with a one-line summary, ready for review.',
  },
  {
    icon: Send,
    title: 'You get pinged',
    description: 'Telegram lands with the PR link. Merge it. Card moves to Done.',
  },
]
</script>

<template>
  <section id="how-it-works" class="section-shell py-20 sm:py-24 lg:py-28">
    <p class="section-kicker">Workflow</p>
    <h2 class="section-title">From card to PR in minutes.</h2>
    <p class="section-copy">
      Minimal setup. Clear handoff. Your repo stays in charge the whole time.
    </p>

    <ol class="relative mt-16 grid gap-8 lg:grid-cols-5 lg:gap-6">
      <div class="absolute left-8 top-0 hidden h-full w-px bg-white/[0.08] lg:hidden" />
      <div
        class="absolute left-[12%] right-[12%] top-11 hidden h-px bg-gradient-to-r from-transparent via-white/18 to-transparent lg:block"
      />

      <li
        v-for="(step, index) in steps"
        :key="step.title"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 540, delay: index * 90 } }"
        class="relative pl-20 lg:pl-0"
      >
        <div
          class="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-[0.85rem] border border-white/[0.10] bg-white/[0.04] text-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] lg:relative lg:mx-auto"
        >
          <component :is="step.icon" class="h-6 w-6" />
        </div>

        <div class="lg:mt-10 lg:text-center">
          <p class="mono-label text-xs uppercase tracking-[0.32em] text-[var(--color-accent)]">Step {{ index + 1 }}</p>
          <h3 class="mt-4 text-xl font-medium text-white">{{ step.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-white/[0.62]">{{ step.description }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>
