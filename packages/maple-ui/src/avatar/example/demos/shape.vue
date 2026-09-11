<template>
  <mp-space align="flex-end" :size="16" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar>圆</mp-avatar>
      <span class="label">circle</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar shape="square">方</mp-avatar>
      <span class="label">square</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="圆形图片" />
      <span class="label">circle · 图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="方形图片" shape="square" />
      <span class="label">square · 图片</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
