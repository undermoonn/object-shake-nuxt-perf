import { useState } from '#app'
import { type UnwrapRef } from 'nuxt/dist/app/compat/capi'
import { reactiveShake } from '@object-shake/vue'

export function useStateShake<T extends object>(
  nuxtStateKey: string,
  init: () => T
): Ref<UnwrapRef<T>> {
  const [proxy, shaked] = reactiveShake(init())
  useState(nuxtStateKey, () => shaked)
  return ref(proxy)
}
