<template>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link icon>Default icon</mp-link>
    <mp-link>
      <template #icon><m-icon-github /></template>
      Custom icon
    </mp-link>
  </mp-space>
</template>
