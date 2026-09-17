<script setup></script>

<template>
  <mp-space direction="column" :size="24">
    <mp-empty>
      <template #image>
        <m-icon-alert-circle />
      </template>
      No data, please reload!!
    </mp-empty>
    <mp-empty image-url="cat.jpg" alt="空状态图片" description="自定义图片和文案" />
  </mp-space>
</template>
