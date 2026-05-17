import { createHighlighter } from 'shiki'

let highlighterPromise: ReturnType<typeof createHighlighter> | undefined

export default defineNuxtPlugin(() => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['one-dark-pro'],
      langs: ['bash', 'plaintext'],
    })
  }

  return {
    provide: {
      codeToHtml: async (code: string, language = 'bash') => {
        const highlighter = await highlighterPromise

        return highlighter.codeToHtml(code, {
          lang: language,
          theme: 'one-dark-pro',
        })
      },
    },
  }
})
