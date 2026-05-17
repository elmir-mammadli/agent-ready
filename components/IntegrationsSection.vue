<script setup>
import { integrationStages, integrationTools, upcomingIntegrations } from '~/data/integrationTools'

const stageColumns = integrationStages.map((stage) => ({
  ...stage,
  tools: integrationTools.filter((tool) => tool.stage === stage.id),
}))

const proofPoints = [
  'Trello stays the intake point.',
  'Claude, GPT, and Gemini stay swappable.',
  'GitHub Actions keeps execution in your repo.',
  'Telegram closes the loop with the PR link.',
]
</script>

<template>
  <section id="integrations" class="section-shell py-20 sm:py-24 lg:py-28">
    <p class="section-kicker">Stack</p>
    <h2 class="section-title">Keep the workflow. Swap in the agent.</h2>
    <p class="section-copy">
      agent-ready sits between the tools your team already uses. No new planner. No new review surface.
      No new place to chase status.
    </p>

    <article
      v-motion
      :initial="{ opacity: 0, y: 26 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560 } }"
      class="relative mt-14 overflow-hidden rounded-[1rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] px-6 py-7 shadow-[0_26px_70px_rgba(0,0,0,0.28)] sm:px-7 sm:py-8 lg:px-9 lg:py-10"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,99,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(0,212,170,0.10),transparent_28%)]" />
      <div class="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.20),transparent)]" />

      <div class="relative grid gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-8">
        <div class="max-w-xl">
          <p class="mono-label text-xs uppercase tracking-[0.34em] text-white/[0.42]">Existing stack, tighter loop</p>
          <h3 class="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.05em] text-white sm:text-[2.45rem]">
            Start in Trello. Pick the model. Review in GitHub. Get the link in Telegram.
          </h3>
          <p class="mt-5 max-w-lg text-base leading-7 text-white/[0.66]">
            The handoff is clean because every step already fits the way engineering teams work today.
          </p>

          <div class="mt-8 space-y-3">
            <div
              v-for="point in proofPoints"
              :key="point"
              class="flex items-center gap-3 border-b border-white/[0.06] pb-3 text-sm text-white/[0.72]"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)]" />
              <span>{{ point }}</span>
            </div>
          </div>
        </div>

        <div class="grid gap-4 lg:grid-cols-3">
          <section
            v-for="(stage, index) in stageColumns"
            :key="stage.id"
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 480, delay: 80 + index * 90 } }"
            class="relative rounded-lg border border-white/[0.08] bg-black/[0.18] px-4 py-5"
          >
            <div class="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
            <p class="mono-label text-xs uppercase tracking-[0.28em] text-white/[0.38]">Step {{ stage.eyebrow }}</p>
            <h4 class="mt-3 text-lg font-medium leading-snug text-white">{{ stage.title }}</h4>
            <p class="mt-3 text-sm leading-6 text-white/[0.60]">{{ stage.copy }}</p>

            <div class="mt-6 space-y-3">
              <div
                v-for="tool in stage.tools"
                :key="tool.id"
                class="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-3"
              >
                <div class="flex items-center gap-3">
                  <img
                    :src="tool.src"
                    :alt="tool.name"
                    :class="tool.panelLogoClass"
                    class="shrink-0 object-contain"
                    loading="lazy"
                  />
                  <span v-if="tool.label" class="text-base font-medium tracking-[-0.03em] text-white/[0.92]">
                    {{ tool.label }}
                  </span>
                </div>
                <p class="mt-3 text-xs leading-6 text-white/[0.50]">{{ tool.note }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <span class="mono-label text-xs uppercase tracking-[0.28em] text-white/[0.34]">Next up</span>
      <span
        v-for="item in upcomingIntegrations"
        :key="item"
        class="rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white/[0.58]"
      >
        {{ item }}
      </span>
    </div>
  </section>
</template>
