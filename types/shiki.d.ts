declare module '#app' {
  interface NuxtApp {
    $codeToHtml: (code: string, language?: string) => Promise<string>
  }
}

export {}
