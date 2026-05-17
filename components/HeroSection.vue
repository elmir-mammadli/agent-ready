<script setup>
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'

defineProps({
  githubUrl: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section id="top" class="section-shell pb-7 pt-16 sm:pb-8 sm:pt-20 lg:pb-10 lg:pt-24">
    <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:gap-14">
      <div>
        <div
          v-motion
          :initial="{ opacity: 0, y: 28 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 550 } }"
          class="inline-flex items-center gap-2 py-2 text-xs font-normal uppercase tracking-[0.28em] text-white/[0.68]"
        >
        </div>

        <p
          v-motion
          :initial="{ opacity: 0, y: 26 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560, delay: 100 } }"
          class="mono-label text-sm uppercase tracking-[0.36em] text-[var(--color-accent)]"
        >
          agent-ready
        </p>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 32 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 620, delay: 180 } }"
          class="mt-4 max-w-3xl text-[2.55rem] font-semibold leading-[0.98] text-white sm:text-[3.55rem] lg:text-[4.45rem]"
          style="text-wrap: balance"
        >
          <span class="block">Tag a card.</span>
          <span class="block text-white/[0.82]">Wake up to a pull request.</span>
        </h1>

        <p
          v-motion
          :initial="{ opacity: 0, y: 28 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 580, delay: 280 } }"
          class="mt-7 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg"
        >
          Connect Trello, pick your model, choose when it runs, and get the PR link in Telegram.
          Everything runs in GitHub Actions inside your own repo.
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 28 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560, delay: 360 } }"
          class="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#quickstart"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.02] hover:bg-white/90"
          >
            Try the setup
            <ArrowRight class="h-4 w-4" />
          </a>
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.05] px-6 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/[0.20] hover:text-white"
          >
            View on GitHub
            <ArrowUpRight class="h-4 w-4" />
          </a>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, x: 32 }"
        :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 680, delay: 260 } }"
        class="relative"
      >
        <div class="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(108,99,255,0.18),_transparent_62%)] blur-2xl" />
        <HeroTerminal class="relative" />
      </div>
    </div>
  </section>
</template>
