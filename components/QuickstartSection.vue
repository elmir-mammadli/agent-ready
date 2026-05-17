<script setup>
const quickstartItems = [
  {
    step: 'Step 1',
    title: 'Run the wizard',
    code: '$ npx @elmiristic/agent-ready init',
    copyValue: 'npx @elmiristic/agent-ready init',
  },
  {
    step: 'Step 2',
    title: 'Follow the prompts',
    bullets: [
      'Connect your Trello board',
      'Add your AI provider API key',
      'Configure Telegram notifications',
      'Set your timezone and daily run times',
      'GitHub secrets are injected automatically',
    ],
  },
  {
    step: 'Step 3',
    title: 'Commit and push',
    code: '$ git add .github && git commit -m "feat: add agent-ready" && git push',
    copyValue: 'git add .github && git commit -m "feat: add agent-ready" && git push',
  },
  {
    step: 'Step 4',
    title: 'Label a card',
    body: 'Tag any Trello card "agent-ready" and watch the agent do the rest.',
  },
]
</script>

<template>
  <section id="quickstart" class="section-shell py-20 sm:py-24 lg:py-28">
    <p class="section-kicker">Quickstart</p>
    <h2 class="section-title">Up and running in 5 minutes.</h2>

    <div class="glass-panel mt-14 rounded-[1rem] p-5 sm:p-7 lg:p-8">
      <div class="flex items-center gap-2 border-b border-white/[0.08] pb-4">
        <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span class="h-3 w-3 rounded-full bg-[#ffbd2f]" />
        <span class="h-3 w-3 rounded-full bg-[#28c840]" />
        <span class="ml-3 mono-label text-xs uppercase tracking-[0.28em] text-white/[0.34]">quickstart</span>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-2">
        <article
          v-for="(item, index) in quickstartItems"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 520, delay: index * 90 } }"
          class="rounded-[0.9rem] border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
        >
          <div class="inline-flex h-11 min-w-11 items-center justify-center rounded-md border border-white/[0.10] bg-white/[0.05] px-4 text-sm font-medium text-white">
            {{ item.step }}
          </div>
          <h3 class="mt-5 text-2xl font-medium text-white">{{ item.title }}</h3>

          <div v-if="item.code" class="mt-5">
            <CodeBlock :code="item.code" :copy-value="item.copyValue" language="bash" />
          </div>

          <ul v-else-if="item.bullets" class="mt-5 space-y-3 text-sm leading-7 text-white/[0.68]">
            <li v-for="bullet in item.bullets" :key="bullet" class="flex gap-3">
              <span class="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-2)]" />
              <span>{{ bullet }}</span>
            </li>
          </ul>

          <p v-else class="mt-5 text-sm leading-7 text-white/[0.68]">{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
