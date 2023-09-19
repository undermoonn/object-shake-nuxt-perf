<script setup lang="ts">
import { ButtonHTMLAttributes } from 'nuxt/dist/app/compat/capi'

interface Props extends /** @vue-ignore */ ButtonHTMLAttributes {}

defineProps<Props>()
</script>

<template>
  <button v-bind="$attrs"><slot /></button>
</template>

<style scoped>
/* https://uiverse.io/satyamchaudharydev/purple-rat-85 */
button {
  --bg: rgba(150, 150, 200, 0.9);
  --bg-hover: rgba(150, 150, 200, 1);
  color: #fff;
  position: relative;
  border: none;
  background-color: var(--bg);
  padding: 0.7em 1em;
  font-weight: bold;
  transition: 0.2s;
  border-radius: 4px;
  text-transform: uppercase;
}

button:hover {
  cursor: pointer;
  background-color: var(--bg-hover);
}

button:disabled {
  opacity: 0.4;
  cursor: pointer;
  background-color: var(--bg-hover);
  cursor: not-allowed;
}
</style>
