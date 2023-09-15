<script setup lang="ts">
import json from './vrsws.json'
import { useStateShake } from '../useStateShake'
import { walker } from '../walker'

const state = useStateShake('vrsws', () => json)
walker(state.value)
</script>

<template>
  <p>vrsws</p>
</template>
