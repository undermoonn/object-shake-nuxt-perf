<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { useWalkerRate } from '../composables/useWalkerRate'

interface Result {
  cost: number
  size: number
}
const { rate } = useWalkerRate()
const ssrToFullLoad = useState<number>('ssr-to-full-load')
const processing = useLocalStorage<boolean>('processing', false)
const result = useLocalStorage<Record<string, Array<Result>>>('benchmark-result', {})
const benchMarkPaths = useLocalStorage<Record<string, number>>('benchmark-paths', {})
const times = ref(10)
const paths = computed(() => Object.keys(benchMarkPaths.value).sort((a, b) => a.length - b.length))

function setAllTimes() {
  paths.value.forEach((path) => {
    benchMarkPaths.value[path] = Number(times.value)
  })
}

function reset() {
  benchMarkPaths.value = {}
  result.value = {}
  processing.value = false
}

function processBenchmark() {
  processing.value = true
}

if (processing.value) {
  if (paths.value.length) {
    const path = paths.value[0]
    const times = benchMarkPaths.value[path]
    benchMarkPaths.value[path] = benchMarkPaths.value[path] - 1
    if (times === 1) {
      delete benchMarkPaths.value[path]
    }
  }
}

watchEffect(() => {
  if (!paths.value.length) {
    processing.value = false
  }
})

watchEffect(() => {
  if (processing.value && paths.value.length) {
    const path = paths.value[0]
    if (ssrToFullLoad.value) {
      result.value[path] = [
        ...(result.value[path] || []),
        {
          cost: ssrToFullLoad.value,
          size: JSON.stringify(useState('json').value).length
        }
      ]
      setTimeout(() => {
        location.href = path
      }, 100)
    }
  }
})

function avg(arr: Result[], key: keyof Result): number {
  return Number(
    (
      arr
        .slice()
        .sort((a, b) => a[key] - b[key])
        .slice(1)
        .reverse()
        .slice(1)
        .reduce((prev, curr) => prev + curr[key], 0) /
      (arr.length - 2)
    ).toFixed(0)
  )
}

function max(arr: Result[]) {
  return arr
    .slice()
    .sort((a, b) => a.cost - b.cost)
    .pop()
}

function min(arr: Result[]) {
  return arr
    .slice()
    .sort((a, b) => a.cost - b.cost)
    .shift()
}

function toKB(value: number) {
  return (value / 1024).toFixed(0)
}
</script>

<template>
  <hr />
  <h2 flex="~ items-center">
    <TextMono>benchmarks</TextMono>
    <!-- <Input v-model:value="times" label="repeat times" type="number" />
    <Button ml-4 @click="setAllTimes">set</Button> -->
    <Button mx-4 @click="reset">reset</Button>
    <Input v-model:value="rate" label="reach rate" />
  </h2>
  <ul>
    <li v-for="path in paths" mb-2>
      <TextMono>{{ path }}</TextMono>
      :
      <TextMono ml-2>{{ benchMarkPaths[path] }} times</TextMono>
    </li>
  </ul>
  <Button v-if="paths.length" @click="processBenchmark">do benchmark</Button>

  <div class="benchmark-result" mt-12 v-if="!processing && Object.keys(result).length" w-full>
    <div v-for="resultPath in Object.keys(result)" mb-3 flex="~ inline items-start" w-full>
      <TextMono mr-2 style="width: 220px" inline-block flex="shrink-0"> {{ resultPath }}</TextMono>
      <div flex="~ 1 wrap">
        <TextMono
          mr-1
          mb-1
          v-for="value in result[resultPath]"
          flex="~ inline col"
          style="width: 64px"
          box-border
          :class="{
            remove:
              value.cost === min(result[resultPath])?.cost ||
              value.cost === max(result[resultPath])?.cost
          }"
        >
          <span> {{ value.cost }} ms </span>
          <span>{{ toKB(value.size) }} KB</span>
        </TextMono>
      </div>
      <TextMono flex="~ shrink-0 col">
        <span>
          AVG Cost:
          {{ avg(result[resultPath], 'cost') }}
          ms
        </span>
        <span>
          AVG Size:
          {{ toKB(avg(result[resultPath], 'size')) }}
          KB
        </span>
      </TextMono>
    </div>
  </div>
</template>

<style scoped>
.benchmark-result {
  font-size: 10px;
}
.remove {
  text-decoration: line-through;
  opacity: 0.3;
}
</style>
