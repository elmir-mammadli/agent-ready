<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import logoSrc from '~/logo.svg?url'

const props = defineProps({
  githubUrl: {
    type: String,
    required: true,
  },
  npmUrl: {
    type: String,
    required: true,
  },
  licenseUrl: {
    type: String,
    required: true,
  },
})

const productLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Quickstart', href: '#quickstart' },
]

const externalLinks = [
  { label: 'GitHub', href: props.githubUrl },
  { label: 'npm', href: props.npmUrl },
  { label: 'License', href: props.licenseUrl },
]
</script>

<template>
  <footer class="border-t border-white/10 py-12 sm:py-16">
    <div class="section-shell grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
      <div>
        <a href="#top" class="inline-flex items-center gap-3 text-white">
          <img :src="logoSrc" alt="agent-ready" class="h-9 w-auto" />
          <span class="mono-label text-base tracking-[0.18em] text-white/[0.92]">agent-ready</span>
        </a>
        <p class="mt-5 max-w-md text-sm leading-7 text-white/[0.62]">AI coding agents for every repo.</p>
        <p class="mt-6 text-sm text-white/[0.42]">Made by Amazesofts</p>
      </div>

      <div class="grid gap-8 sm:grid-cols-2">
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.32em] text-white/[0.36]">Product</p>
          <div class="mt-4 flex flex-col gap-3">
            <a
              v-for="item in productLinks"
              :key="item.href"
              :href="item.href"
              class="text-sm text-white/[0.68] transition hover:text-white"
            >
              {{ item.label }}
            </a>
          </div>
        </div>

        <div>
          <p class="text-xs font-medium uppercase tracking-[0.32em] text-white/[0.36]">Links</p>
          <div class="mt-4 flex flex-col gap-3">
            <a
              v-for="item in externalLinks"
              :key="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-white/[0.68] transition hover:text-white"
            >
              {{ item.label }}
              <ArrowUpRight class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="section-shell mt-12 border-t border-white/[0.08] pt-6">
      <p class="text-xs tracking-[0.2em] text-white/[0.34]">© 2025 agent-ready · MIT License</p>
    </div>
  </footer>
</template>
