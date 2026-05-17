<script setup>
const siteTitle = 'agent-ready'
const description =
  'Wire an AI coding agent into any GitHub repo in 5 minutes. Tag a Trello card, let Claude open the PR, and get notified on Telegram.'
const githubUrl = 'https://github.com/elmir-mammadli/agent-ready'
const npmUrl = 'https://www.npmjs.com/package/@elmiristic/agent-ready'
const licenseUrl = 'https://opensource.org/license/mit'

useSeoMeta({
  title: siteTitle,
  description,
  ogTitle: `${siteTitle} · AI coding agents for every repo`,
  ogDescription: description,
  ogImage: '/og-image.svg',
  twitterCard: 'summary_large_image',
  twitterTitle: `${siteTitle} · AI coding agents for every repo`,
  twitterDescription: description,
  twitterImage: '/og-image.svg',
})

useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} · AI coding agents for every repo` : 'agent-ready · AI coding agents for every repo',
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  meta: [{ name: 'theme-color', content: '#0a0a0a' }],
})
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="site-base absolute inset-0" />
      <div class="site-depth absolute inset-0" />
      <div class="site-grid-major absolute inset-0 opacity-90" />
      <div class="site-grid absolute inset-0 opacity-85" />
      <div class="site-axis absolute inset-0 opacity-80" />
      <div class="site-vignette absolute inset-0" />
      <div class="site-noise absolute inset-0 opacity-40" />
      <div class="ambient-orb left-[-14rem] top-[4rem] h-[30rem] w-[30rem] bg-[radial-gradient(circle,_rgba(108,99,255,0.24)_0%,_rgba(108,99,255,0)_70%)]" />
      <div class="ambient-orb right-[-10rem] top-[22rem] h-[24rem] w-[24rem] bg-[radial-gradient(circle,_rgba(0,212,170,0.20)_0%,_rgba(0,212,170,0)_72%)]" />
      <div class="ambient-orb left-1/2 top-[-10rem] h-[34rem] w-[34rem] -translate-x-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.07)_0%,_rgba(255,255,255,0)_74%)]" />
      <div class="ambient-orb bottom-[-12rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_0%,_rgba(255,255,255,0)_78%)]" />
    </div>

    <AppNavbar :github-url="githubUrl" />

    <main>
      <HeroSection :github-url="githubUrl" />
      <SocialProofBar />
      <HowItWorks />
      <FeaturesGrid />
      <QuickstartSection />
      <IntegrationsSection />
      <FaqSection />
      <CtaBanner :github-url="githubUrl" />
    </main>

    <AppFooter :github-url="githubUrl" :npm-url="npmUrl" :license-url="licenseUrl" />
  </div>
</template>
