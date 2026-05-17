<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  githubUrl: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell py-20 sm:py-24">
    <div class="cta-banner relative overflow-hidden rounded-[1.1rem] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
      <div class="absolute inset-0 bg-black/[0.18]" />
      <div class="relative z-10 max-w-3xl">
        <p class="section-kicker text-white/[0.82]">Final call</p>
        <h2 class="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          Start with one command.
        </h2>
        <p class="mt-5 max-w-2xl text-base leading-7 text-white/[0.82] sm:text-lg">
          Run the setup, answer a few prompts, and push when you're ready.
        </p>

        <div class="mt-8 inline-flex rounded-md border border-black/[0.35] bg-black/[0.35] px-5 py-3">
          <span class="mono-label text-sm text-white">npx @elmiristic/agent-ready init</span>
        </div>

        <div class="mt-8">
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.02] hover:bg-white/90"
          >
            View on GitHub
            <ArrowUpRight class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-banner {
  background:
    linear-gradient(135deg, rgba(108, 99, 255, 0.92), rgba(0, 212, 170, 0.86), rgba(108, 99, 255, 0.92));
  background-size: 220% 220%;
  animation: drift 12s ease infinite;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.28);
}

@keyframes drift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
