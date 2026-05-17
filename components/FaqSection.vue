<script setup>
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

const faqs = [
  {
    question: 'Do I need to host anything?',
    answer: 'No. Everything runs on GitHub Actions inside your own repository. Zero servers.',
  },
  {
    question: 'Which AI models are supported?',
    answer: 'Claude (Anthropic), GPT-4o (OpenAI), and Gemini (Google). You choose during setup.',
  },
  {
    question: 'Is my API key stored anywhere?',
    answer: 'Never. Keys are stored as GitHub Actions secrets in your own repo. agent-ready never sees them.',
  },
  {
    question: 'Can it handle multiple tasks at once?',
    answer:
      'Yes. Every card labeled "agent-ready" in your To Do list is processed in a single run, each on its own branch with its own PR.',
  },
  {
    question: 'What happens if a task fails?',
    answer:
      'The card moves back to To Do, you get a Telegram error report, and the other tasks continue normally.',
  },
  {
    question: 'How do I trigger a run manually?',
    answer: 'From the GitHub Actions tab in your repo. No CLI needed after initial setup.',
  },
  {
    question: 'Is it free?',
    answer: 'agent-ready is MIT open source and completely free. You only pay for your AI provider API usage.',
  },
  {
    question: "What's the minimum Node.js version?",
    answer: 'Node.js 18+.',
  },
]

const openIndex = ref(0)
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <section id="faq" class="section-shell py-20 sm:py-24 lg:py-28">
    <p class="section-kicker">FAQ</p>
    <h2 class="section-title">Common questions</h2>

    <div class="mt-12 divide-y divide-white/[0.08] rounded-[0.95rem] border border-white/[0.08] bg-white/[0.02]">
      <article v-for="(item, index) in faqs" :key="item.question" class="px-5 py-5 sm:px-7">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 text-left"
          :aria-expanded="String(openIndex === index)"
          :aria-controls="`faq-panel-${index}`"
          @click="toggle(index)"
        >
          <span class="text-base font-medium text-white sm:text-lg">{{ item.question }}</span>
          <ChevronDown
            class="h-5 w-5 shrink-0 text-white/[0.52] transition duration-300"
            :class="openIndex === index ? 'rotate-180 text-white' : ''"
          />
        </button>

        <Transition name="accordion">
          <div
            v-if="openIndex === index"
            :id="`faq-panel-${index}`"
            class="overflow-hidden pr-8"
          >
            <p class="pt-4 text-sm leading-7 text-white/[0.64] sm:text-base">{{ item.answer }}</p>
          </div>
        </Transition>
      </article>
    </div>
  </section>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition:
    opacity 0.24s ease,
    max-height 0.24s ease;
  max-height: 14rem;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 14rem;
}
</style>
