<template>
  <mp-space direction="column" :size="24">
    <mp-space direction="column" :size="8">
      <span class="label">默认叠层</span>
      <mp-avatar-group>
        <mp-avatar image-url="/cat.jpg" alt="用户一" bordered />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" bordered />
        <mp-avatar image-url="/cat.jpg" alt="用户三" bordered />
        <mp-avatar bordered>+2</mp-avatar>
      </mp-avatar-group>
    </mp-space>

    <mp-space direction="column" :size="8">
      <span class="label">max-count + max-style</span>
      <mp-avatar-group :max-count="3" :size="48" :max-style="{ backgroundColor: '#1d2129', color: '#fff' }">
        <mp-avatar image-url="/cat.jpg" alt="用户一" />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" />
        <mp-avatar color="#00bebe">A</mp-avatar>
        <mp-avatar color="#f59e0b">B</mp-avatar>
        <mp-avatar color="#ef4444">C</mp-avatar>
      </mp-avatar-group>
    </mp-space>

    <mp-space direction="column" :size="8">
      <span class="label">z-index-ascend</span>
      <mp-avatar-group z-index-ascend>
        <mp-avatar image-url="/cat.jpg" alt="用户一" />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" />
        <mp-avatar color="#7b61ff">CD</mp-avatar>
      </mp-avatar-group>
    </mp-space>

    <mp-space direction="column" :size="8">
      <span class="label">shape="square" · offset="-16"</span>
      <mp-avatar-group shape="square" :offset="-16" :size="40">
        <mp-avatar image-url="/cat.jpg" alt="用户一" />
        <mp-avatar image-url="/cat2.jpg" alt="用户二" />
        <mp-avatar color="#00bebe">A</mp-avatar>
        <mp-avatar color="#7b61ff">B</mp-avatar>
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
