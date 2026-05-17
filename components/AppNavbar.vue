<script setup>
import { Menu, X } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useMediaQuery, useWindowScroll } from '@vueuse/core'
import logoSrc from '~/logo.svg?url'

defineProps({
  githubUrl: {
    type: String,
    required: true,
  },
})

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'FAQ', href: '#faq' },
]

const isMenuOpen = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 18)

watch(
  isDesktop,
  (value) => {
    if (value) {
      isMenuOpen.value = false
    }
  },
  { immediate: true },
)

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50">
    <div
      class="mx-auto mt-3 w-[calc(100%-1.25rem)] rounded-xl border border-white/[0.08] transition duration-300 sm:mt-4 sm:w-[calc(100%-2rem)]"
      :class="isScrolled ? 'bg-black/[0.66] shadow-[0_16px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl' : 'bg-black/[0.30]'"
    >
      <div class="section-shell flex h-16 items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
        <a href="#top" class="inline-flex items-center gap-3 text-sm font-medium text-white">
          <img :src="logoSrc" alt="agent-ready" class="h-8 w-auto" />
          <span class="mono-label text-[0.95rem] tracking-[0.16em] text-white/[0.92]">agent-ready</span>
        </a>

        <nav class="hidden items-center gap-7 text-sm text-white/70 md:flex">
          <a
            v-for="item in navLinks"
            :key="item.href"
            :href="item.href"
            class="transition hover:text-white"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <a
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg border border-white/[0.10] px-4 py-2 text-sm text-white/[0.72] transition hover:border-white/[0.20] hover:text-white"
          >
            GitHub
          </a>
          <a
            href="#quickstart"
            class="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02] hover:bg-white/90"
          >
            See quickstart
          </a>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.10] bg-white/[0.05] text-white md:hidden"
          :aria-expanded="String(isMenuOpen)"
          aria-label="Toggle navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>

      <Transition name="nav-drawer">
        <div v-if="isMenuOpen" class="border-t border-white/[0.08] px-4 pb-4 pt-3 md:hidden">
          <nav class="flex flex-col gap-2">
            <a
              v-for="item in navLinks"
              :key="item.href"
              :href="item.href"
              class="rounded-lg px-3 py-3 text-sm text-white/[0.72] transition hover:bg-white/[0.05] hover:text-white"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
            <a
              href="#quickstart"
              class="mt-2 rounded-lg bg-white px-3 py-3 text-center text-sm font-medium text-black"
              @click="closeMenu"
            >
              See quickstart
            </a>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
.nav-drawer-enter-active,
.nav-drawer-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
  transform-origin: top;
}

.nav-drawer-enter-from,
.nav-drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
