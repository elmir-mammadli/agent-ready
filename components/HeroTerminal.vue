<script setup>
import { useTypewriter } from '~/composables/useTypewriter'

const terminalLines = [
  '$ npx @elmiristic/agent-ready init',
  'Trello board connected',
  'Claude API key saved',
  'Telegram notifications configured',
  'Schedule set: 09:00 · 14:00 · 18:00',
  'GitHub secrets injected',
  'Workflow files written to .github/',
  'agent-ready. Push to activate.',
]

const { isComplete, visibleLines } = useTypewriter(terminalLines, {
  charDelay: 16,
  lineDelay: 120,
  loopDelay: 2200,
})

const lineTone = (line) => {
  if (line.startsWith('$')) return 'text-[var(--color-accent-2)]'
  if (line.startsWith('✔')) return 'text-emerald-300'
  if (line.startsWith('a')) return 'text-white'
  if (!line) return 'h-4'
  return 'text-white/[0.72]'
}

const showCursor = (index) => index === visibleLines.value.length - 1
</script>

<template>
  <div class="glass-panel rounded-[1rem] p-5 sm:p-6">
    <div class="flex items-center gap-2 border-b border-white/[0.08] pb-4">
      <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span class="h-3 w-3 rounded-full bg-[#ffbd2f]" />
      <span class="h-3 w-3 rounded-full bg-[#28c840]" />
      <span class="ml-3 mono-label text-xs uppercase tracking-[0.28em] text-white/[0.36]">setup wizard</span>
    </div>

    <div class="mt-5 min-h-[21rem] rounded-[0.85rem] border border-white/[0.08] bg-[#0d0d0d] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div class="mono-label space-y-3 text-[0.92rem] leading-7 text-white/70 sm:text-[0.98rem]">
        <div
          v-for="(line, index) in visibleLines"
          :key="`${index}-${line}`"
          class="flex min-h-7 items-start gap-2 whitespace-pre-wrap break-words"
          :class="lineTone(line)"
        >
          <span
            class="mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-60"
            :class="line ? 'opacity-60' : 'opacity-0'"
          />
          <span>
            {{ line }}
            <span
              v-if="showCursor(index)"
              class="ml-0.5 inline-block h-[1.05rem] w-[0.58rem] animate-pulse rounded-[1px] bg-white/[0.80] align-middle"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
