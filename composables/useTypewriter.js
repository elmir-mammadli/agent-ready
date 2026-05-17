import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useTypewriter(lines, options = {}) {
  const typedLines = ref([])
  const activeLine = ref('')
  const isComplete = ref(false)

  const charDelay = options.charDelay ?? 24
  const lineDelay = options.lineDelay ?? 180
  const loopDelay = options.loopDelay ?? 2200
  const loop = options.loop ?? true

  let lineIndex = 0
  let charIndex = 0
  let timerId

  const clearTimer = () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = undefined
    }
  }

  const reset = () => {
    typedLines.value = []
    activeLine.value = ''
    isComplete.value = false
    lineIndex = 0
    charIndex = 0
  }

  const queue = (callback, delay) => {
    clearTimer()
    timerId = setTimeout(callback, delay)
  }

  const tick = () => {
    if (lineIndex >= lines.length) {
      isComplete.value = true

      if (loop) {
        queue(() => {
          reset()
          tick()
        }, loopDelay)
      }

      return
    }

    const currentLine = lines[lineIndex]

    if (charIndex < currentLine.length) {
      activeLine.value += currentLine[charIndex]
      charIndex += 1
      queue(tick, charDelay)
      return
    }

    typedLines.value.push(activeLine.value)
    activeLine.value = ''
    lineIndex += 1
    charIndex = 0
    queue(tick, lineDelay)
  }

  onMounted(() => {
    reset()
    tick()
  })

  onBeforeUnmount(() => {
    clearTimer()
  })

  const visibleLines = computed(() =>
    activeLine.value ? [...typedLines.value, activeLine.value] : typedLines.value,
  )

  return {
    activeLine,
    isComplete,
    typedLines,
    visibleLines,
  }
}
