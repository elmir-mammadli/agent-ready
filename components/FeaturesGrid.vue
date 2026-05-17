<script setup>
import { Bot, Clock3, GitBranch, ShieldCheck, TriangleAlert, Wrench } from 'lucide-vue-next'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const features = [
  {
    icon: Wrench,
    title: '5-minute setup wizard',
    copy: 'Interactive CLI guides you through every config step. No YAML hand-editing.',
    wide: true,
  },
  {
    icon: ShieldCheck,
    title: 'Runs on your repo',
    copy: 'GitHub Actions on your own infrastructure. Your keys stay yours. Nothing centralized.',
    wide: false,
  },
  {
    icon: GitBranch,
    title: 'Multiple tasks per run',
    copy: 'Every labeled card is processed in one run. Each gets its own branch and PR.',
    wide: false,
  },
  {
    icon: TriangleAlert,
    title: 'Smart failure handling',
    copy: 'Failed tasks move back to To Do with error details in Telegram. Other tasks continue.',
    wide: false,
  },
  {
    icon: Clock3,
    title: 'Timezone-aware scheduling',
    copy: 'Pick your timezone. Choose one to four run times. The wizard handles the UTC cron for you.',
    wide: false,
  },
  {
    icon: Bot,
    title: 'Multi-AI support',
    copy: 'Choose Claude, GPT-4o, or Gemini. Swap anytime. Bring your own key. No lock-in.',
    wide: true,
  },
]

const gridRef = ref(null)
const isVisible = ref(false)

useIntersectionObserver(
  gridRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      isVisible.value = true
    }
  },
  {
    threshold: 0.28,
  },
)
</script>

<template>
  <section id="features" class="section-shell py-20 sm:py-24 lg:py-28">
    <p class="section-kicker">Features</p>
    <h2 class="section-title">What you actually get.</h2>

    <div ref="gridRef" class="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
      <article
        v-for="(feature, index) in features"
        :key="feature.title"
        class="glass-panel rounded-[0.95rem] p-6 transition duration-700 sm:p-7"
        :class="[
          feature.wide ? 'md:col-span-2' : '',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        ]"
        :style="{ transitionDelay: `${index * 90}ms` }"
      >
        <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.05] text-white">
          <component :is="feature.icon" class="h-5 w-5" />
        </div>
        <h3 class="mt-5 text-2xl font-medium text-white">{{ feature.title }}</h3>
        <p class="mt-3 max-w-xl text-sm leading-7 text-white/[0.64]">{{ feature.copy }}</p>
      </article>
    </div>
  </section>
</template>
