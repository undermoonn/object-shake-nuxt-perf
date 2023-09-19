<script lang="ts" setup>
const router = useRouter()
const paths: string[] = router
  .getRoutes()
  .map((route) => route.path)
  .sort((a, b) => a.length - b.length)
</script>

<template>
  <ul>
    <li v-for="path in paths" mb-4 flex="inline-block items-center">
      <NuxtLink :to="path">
        <TextMono>{{ path }}</TextMono>
      </NuxtLink>
      <ClientOnly>
        <BenchmarkAdd :path="path" ml-4 style="padding: 4px 8px" />
      </ClientOnly>
    </li>
  </ul>
</template>
