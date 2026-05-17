<script setup>
import { Check, Copy } from 'lucide-vue-next'
import { computed } from 'vue'
import { useClipboard } from '~/composables/useClipboard'

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  copyValue: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'bash',
  },
})

const hashString = (value) =>
  value.split('').reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7).toString(16)

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const { $codeToHtml } = useNuxtApp()
const { copyText, isCopied } = useClipboard()
const cacheKey = `code-${props.language}-${hashString(props.code)}`
const clipboardValue = computed(() => props.copyValue || props.code)

const { data: highlighted } = await useAsyncData(cacheKey, () => $codeToHtml(props.code, props.language))

const displayHtml = computed(
  () =>
    highlighted.value ??
    `<pre class="shiki one-dark-pro"><code>${escapeHtml(props.code)}</code></pre>`,
)
</script>

<template>
  <div class="relative overflow-hidden rounded-[0.85rem] border border-white/10 bg-[#0d0d0d]">
    <button
      type="button"
      class="absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-md border border-white/[0.10] bg-black/[0.45] px-3 py-1.5 text-xs font-medium text-white/[0.72] transition hover:border-white/[0.20] hover:text-white"
      :aria-label="isCopied(clipboardValue) ? 'Copied' : 'Copy code'"
      @click="copyText(clipboardValue)"
    >
      <Check v-if="isCopied(clipboardValue)" class="h-3.5 w-3.5" />
      <Copy v-else class="h-3.5 w-3.5" />
      {{ isCopied(clipboardValue) ? 'Copied' : 'Copy' }}
    </button>

    <div class="code-shell overflow-x-auto p-1" v-html="displayHtml" />
  </div>
</template>

<style scoped>
.code-shell :deep(pre) {
  margin: 0;
  min-width: 100%;
  overflow-x: auto;
  padding: 1.6rem 1.5rem 1.4rem;
  background: transparent !important;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.86rem;
  line-height: 1.8;
}

.code-shell :deep(code) {
  font-family: 'JetBrains Mono', monospace;
}
</style>
