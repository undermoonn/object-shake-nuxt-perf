import { defineNuxtPlugin } from '#app'
import { useState } from '#imports'

export default defineNuxtPlugin(() => {
  const ssrStart = Date.now()
  useState('ssrStart', () => ssrStart)
})
