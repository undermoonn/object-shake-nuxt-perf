import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const filename = fakeString()

fs.writeFileSync(
  path.resolve(dirname, `${filename}.json`),
  JSON.stringify(fakeObject({ counts: 6, deep: 6 }), null, 2)
)

fs.writeFileSync(
  path.resolve(dirname, `${filename}.vue`),
  `
<script setup lang="ts">
import json from './${filename}.json'
import { useStateShake } from '../useStateShake'
import { walker } from '../walker'

const state = useStateShake('${filename}', () => json)
walker(state.value)
</script>

<template>
  <p>${filename}.vue</p>
</template>
`
)

fs.writeFileSync(
  path.resolve(dirname, `${filename}.origin.vue`),
  `
<script setup lang="ts">
import json from './${filename}.json'
import { useState } from '#app'
import { walker } from '../walker'

const state = useState('${filename}', () => json)
walker(state.value)
</script>

<template>
  <p>${filename}.origin.vue</p>
</template>
`
)

// ------------------------------------------------------------

function randomInt(length) {
  return Math.floor(Math.random() * length)
}

function fakeString(length = 5) {
  let res = ''
  for (let i = 0; i < length; i++) {
    res = res + String.fromCharCode('a'.charCodeAt(0) + randomInt(24))
  }
  return res
}

function fakeObject({ counts, deep }) {
  if (typeof counts !== 'number' || typeof deep !== 'number') {
    throw Error('`counts` & `deep` should be number')
  }
  const obj = {}
  for (let i = 0; i < counts; i++) {
    obj[fakeString(5)] =
      deep > 1 ? fakeObject({ counts, deep: deep - 1 }) : fakeString(randomInt(100))
  }
  return obj
}
