<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { InputHTMLAttributes } from 'nuxt/dist/app/compat/vue-demi'

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string
}

const props = defineProps<Props>()

const modelValue = useVModel(props, 'value')

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="input-wrapper">
    <input
      :value="modelValue"
      @change="(e) => (modelValue = e.target.value)"
      required
      autocomplete="off"
      v-bind="$attrs"
    />
    <label for="name">{{ label }}</label>
  </div>
</template>

<style scoped>
/* https://uiverse.io/Maximinodotpy/thin-sheep-13 */
.input-wrapper {
  font-family: 'Segoe UI', sans-serif;
  max-width: 190px;
  position: relative;
  font-size: 12px;
}

.input-wrapper input {
  font-size: 100%;
  padding: 0.8em;
  outline: none;
  border: 2px solid rgb(200, 200, 200);
  background-color: transparent;
  border-radius: 6px;
}

.input-wrapper label {
  font-size: 100%;
  position: absolute;
  left: 0;
  padding: 0.8em;
  margin-left: 0.5em;
  pointer-events: none;
  transition: all 0.3s ease;
  color: rgb(100, 100, 100);
}

.input-wrapper :is(input:focus, input:valid) ~ label {
  transform: translateY(-50%) scale(0.9);
  margin: 0em;
  margin-left: 1.3em;
  padding: 0.4em;
  background-color: #fff;
}

.input-wrapper :is(input:focus, input:valid) {
  border-color: rgb(150, 150, 200);
}
</style>
