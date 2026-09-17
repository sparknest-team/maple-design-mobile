<template>
  <mp-space :size="['2.666vmin', '2.666vmin']">
    <mp-link icon>默认图标</mp-link>
    <mp-link>
      <template #icon><m-icon-github /></template>
      自定义图标
    </mp-link>
  </mp-space>
</template>
