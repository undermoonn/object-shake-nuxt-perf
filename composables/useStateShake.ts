import { useState } from '#app'
import { shakeMaybeRef } from '@object-shake/vue'

export function useStateShake<T extends object | Ref>(key: string, init: () => T | Ref<T>): Ref<T> {
  if (import.meta.client) {
    return useState<T>(key, init)
  }

  const [proxy, getShaked] = shakeMaybeRef(init())

  useNuxtApp().hook('app:rendered', () => {
    useState(key, () => {
      const res = getShaked()
      return res
    })
  })

  return ref(proxy)
}
