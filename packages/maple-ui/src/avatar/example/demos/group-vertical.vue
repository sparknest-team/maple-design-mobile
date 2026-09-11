<template>
  <mp-space align="flex-end" :size="32" wrap>
    <mp-space direction="column" :size="8">
      <span class="label">offset = -12</span>
      <mp-avatar-group vertical :offset="-12">
        <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
        <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
        <mp-avatar bordered>+2</mp-avatar>
      </mp-avatar-group>
    </mp-space>
    <mp-space direction="column" :size="8">
      <span class="label">offset = -20</span>
      <mp-avatar-group vertical :offset="-20" :size="48">
        <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
        <mp-avatar color="#00bebe">A</mp-avatar>
      </mp-avatar-group>
    </mp-space>
  </mp-space>
</template>

<style scoped>
.label {
  color: var(--mp-color-text-3);
  font-size: var(--mp-font-size-sm);
}
</style>
