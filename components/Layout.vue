<script lang="ts" setup>
const ssrToFullLoad = useState('ssr-to-full-load')
</script>

<template>
  <h1 mb-10>
    <TextMono>{{ $route.path }}</TextMono>
  </h1>
  <h2>
    <TextMono>SSR To Full Load (ms): {{ ssrToFullLoad || '-' }}</TextMono>
  </h2>
  <RouteList />
  <ClientOnly>
    <BenchmarkPanel />
  </ClientOnly>
</template>
