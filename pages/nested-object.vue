<script setup lang="ts">
import json from '../mock/nested-object.json'
import { useState } from '#app'
import { walker } from '../utils/walker'

const state = useState('json', () => json)
walker(state.value)
</script>

<template>
  <Layout></Layout>
</template>
