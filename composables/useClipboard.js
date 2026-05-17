import { useClipboard as useVueUseClipboard } from '@vueuse/core'
import { onBeforeUnmount, ref } from 'vue'

export function useClipboard() {
  const copiedValue = ref('')
  const { copy } = useVueUseClipboard()

  let timerId

  const clearFeedback = () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = undefined
    }
  }

  const copyText = async (value) => {
    await copy(value)
    copiedValue.value = value
    clearFeedback()
    timerId = setTimeout(() => {
      copiedValue.value = ''
    }, 2000)
  }

  const isCopied = (value) => copiedValue.value === value

  onBeforeUnmount(() => {
    clearFeedback()
  })

  return {
    copiedValue,
    copyText,
    isCopied,
  }
}
