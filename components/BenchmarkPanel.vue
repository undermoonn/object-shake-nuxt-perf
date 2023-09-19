<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'

const ssrToFullLoad = useState<number>('ssr-to-full-load')
const processing = useLocalStorage<boolean>('processing', false)
const result = useLocalStorage<Record<string, number[]>>('benchmark-result', {})
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
      result.value[path] = [...(result.value[path] || []), ssrToFullLoad.value]
      location.href = path
    }
  }
})
</script>

<template>
  <hr />
  <h2 flex="~ items-center">
    <TextMono mr-4>benchmarks</TextMono>
    <Input v-model:value="times" label="repeat times" type="number" />
    <Button ml-4 @click="setAllTimes">set</Button>
    <Button ml-4 @click="reset">reset</Button>
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
        <TextMono mr-1 mb-1 v-for="value in result[resultPath]">{{ value }}</TextMono>
      </div>
      <TextMono flex="shrink-0"
        >AVG:
        {{
          (
            result[resultPath].reduce((prev, curr) => prev + curr, 0) / result[resultPath].length
          ).toFixed(2)
        }}
        ms
      </TextMono>
    </div>
  </div>
</template>

<style scoped>
.benchmark-result {
  font-size: 10px;
}
</style>
