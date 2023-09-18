import { defineNuxtPlugin, useState } from '#imports'

export default defineNuxtPlugin((nuxt: any) => {
  nuxt.hook('app:mounted', () => {
    const appLoad = Date.now()
    const ssrStart = useState<number>('ssrStart')
    const ssrToFullLoadTime = appLoad - ssrStart.value
    console.log(ssrToFullLoadTime)
  })
})
