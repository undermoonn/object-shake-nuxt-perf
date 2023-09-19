<template>
  <span class="text-mono"><slot /></span>
</template>

<style>
.text-mono {
  background-color: rgba(0, 0, 0, 0.05);
  /* color: rgba(0, 0, 0, 0.8); */
  padding: 2px 6px;
  border-radius: 3px;
  font-family: Menlo, hack, monospace;
}
</style>
