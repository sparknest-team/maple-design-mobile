<template>
  <mp-space align="center" :size="16" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat.jpg" alt="一只猫" />
      <span class="label">image-url</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/cat2.jpg" alt="一只猫" :size="48" shape="square" />
      <span class="label">方形图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar :size="48">
        <img src="/cat.jpg" alt="默认插槽中的图片" />
      </mp-avatar>
      <span class="label">默认插槽 img</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
