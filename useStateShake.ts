import { useState } from '#app'
import { type UnwrapRef } from 'nuxt/dist/app/compat/capi'
import { useReactiveShake } from 'vue-reactive-shake'

export function useStateShake<T extends object>(
  nuxtStateKey: string,
  init: () => T
): Ref<UnwrapRef<T>> {
  const [proxy, shaked] = useReactiveShake(init())
  useState(nuxtStateKey, () => shaked)
  return ref(proxy)
}

export function useStateOrigin<T>(key: string, init: () => T): Ref<T> {
  return useState(key, init)
}
