<script setup>
import { ref } from 'vue'

const showBadge = ref(0)
const pill = ref(false)
const badgeProps = {
  content: 66,
}
</script>

<template>
  <p>红点、66 和 99+ 放在图标外侧。切换胶囊指示器，观察徽标位置。</p>
  <mp-switch v-model="pill" aria-label="胶囊指示器" /> 胶囊指示器
  <mp-tab-bar v-model="showBadge" :variant="pill ? 'pill' : 'standard'">
    <mp-tab-bar-item label="首页">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现" badge>
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏" :badge="badgeProps">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的" :badge="{ content: 125, max: 99 }">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
