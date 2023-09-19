import { defineNuxtPlugin, useState } from '#imports'

export default defineNuxtPlugin((nuxt: any) => {
  nuxt.hook('app:mounted', () => {
    const appLoad = Date.now()
    const ssrStart = useState<number>('ssrStart')
    const ssrToFullLoad = appLoad - ssrStart.value
    console.log(ssrToFullLoad)
    useState('ssr-to-full-load', () => ssrToFullLoad)
  })
})
