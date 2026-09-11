<template>
  <mp-space align="flex-end" :size="24" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar lazy image-url="/cat.jpg" loading="/cat2.jpg" alt="懒加载与占位图" :size="48" />
      <span class="label">lazy + loading</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/missing-avatar.jpg" error="/cat.jpg" alt="失败时回退到占位图" :size="48" />
      <span class="label">error 图片</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-avatar image-url="/missing-avatar.jpg" alt="失败插槽" :size="48">
        <template #error>NA</template>
      </mp-avatar>
      <span class="label">error 插槽</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
