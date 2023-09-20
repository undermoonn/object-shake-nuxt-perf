<script setup lang="ts">
import json from '../mock/nested-object-array.json'
import { useState } from '#app'
import { walker } from '../utils/walker'
import { useWalkerRate } from '../composables/useWalkerRate'

const { rate } = useWalkerRate()
const state = useState('json', () => json)
onServerPrefetch(() => {
  walker(state.value, rate.value)
})
</script>

<template>
  <Layout></Layout>
</template>
