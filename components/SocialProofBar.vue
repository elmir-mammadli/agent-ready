<script setup>
import { integrationTools } from '~/data/integrationTools'
</script>

<template>
  <section class="pb-12 pt-1 sm:pb-14 sm:pt-3">
    <div class="section-shell">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 520 } }"
        class="mx-auto max-w-3xl text-center"
      >
        <p class="text-base font-medium tracking-[-0.03em] text-white/[0.78] sm:text-lg">
          Works with the tools you already use
        </p>
      </div>

      <div class="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2 lg:grid-cols-6">
        <article
          v-for="(tool, index) in integrationTools"
          :key="tool.name"
          v-motion
          :initial="{ opacity: 0, y: 18 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 460, delay: 70 + index * 60 } }"
          class="group relative flex min-h-[5.5rem] items-center justify-center overflow-hidden rounded-lg border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.018))] px-5 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]"
        >
          <!-- <div class="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] opacity-70" /> -->

          <div class="flex items-center justify-center gap-3">
            <img
              :src="tool.src"
              :alt="tool.name"
              :class="tool.barLogoClass"
              class="shrink-0"
              loading="lazy"
            />
            <span v-if="tool.label" class="text-[1.28rem] font-medium tracking-[-0.04em] text-white/[0.92]">
              {{ tool.label }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
