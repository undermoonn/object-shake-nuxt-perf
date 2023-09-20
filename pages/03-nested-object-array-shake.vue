<script setup lang="ts">
import json from '../mock/nested-object-array.json'
import { useStateShake } from '../composables/useStateShake'
import { walker } from '../utils/walker'
import { useWalkerRate } from '../composables/useWalkerRate'

const { rate } = useWalkerRate()
const state = useStateShake('json', () => json)
onServerPrefetch(() => {
  walker(state.value, rate.value)
})
</script>

<template>
  <Layout></Layout>
</template>
