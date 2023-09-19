<script setup lang="ts">
import json from '../mock/nested-object.json'
import { useStateShake } from '../composables/useStateShake'
import { walker } from '../utils/walker'

const state = useStateShake('json', () => json)
onServerPrefetch(() => {
  walker(state.value)
})
</script>

<template>
  <Layout></Layout>
</template>
