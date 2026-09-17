<template>
  <mp-space :size="16" wrap>
    <mp-space direction="column" align="center" :size="8">
      <mp-image
        width="160"
        height="100"
        object-fit="cover"
        object-position="left top"
        preview-disabled
        src="/cat.jpg"
      />
      <span class="label">160×100 · left top</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-image width="100" height="100" object-fit="cover" :radius="12" preview-disabled src="/cat.jpg" />
      <span class="label">radius 12</span>
    </mp-space>
    <mp-space direction="column" align="center" :size="8">
      <mp-image width="100" height="100" object-fit="cover" radius="50%" preview-disabled src="/cat.jpg" />
      <span class="label">radius 50%</span>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: 12px;
}
</style>
