<script setup></script>
<template>
  <p>无需 v-model，初始选中收藏，点击即可切换。default-active 仅在初始化时读取。</p>
  <mp-tab-bar default-active="favorites">
    <mp-tab-bar-item name="home" label="首页" />
    <mp-tab-bar-item name="favorites" label="收藏" />
    <mp-tab-bar-item name="profile" label="我的" />
  </mp-tab-bar>
</template>
