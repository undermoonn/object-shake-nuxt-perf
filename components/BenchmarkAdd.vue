<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'

defineProps<{
  path: string
}>()

const benchMarkPaths = useLocalStorage<Record<string, number | undefined>>('benchmark-paths', {})

function addToBenchMark(path: string) {
  benchMarkPaths.value[path] = Number(benchMarkPaths.value[path] || 0) + 10
}
</script>

<template>
  <Button @click="addToBenchMark(path)">+</Button>
</template>
