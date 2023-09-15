
<script setup lang="ts">
import json from './vrsws.json'
import { useState } from '#app'
import { walker } from '../walker'

const state = useState('vrsws', () => json)
walker(state.value)
</script>

<template>
  <p>vrsws</p>
</template>
