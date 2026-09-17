<script setup>
import { ref } from 'vue'

const showBadge = ref(0)
const badgeVariant = ref(false)
const badgeProps = {
  status: 'primary',
  content: 66,
}
const variant = ref(0)
</script>

<template>
  <p>红点、66 和 99+ 放在图标外侧。切换变体，观察胶囊背景下的徽标位置。</p>
  <mp-switch v-model="badgeVariant" aria-label="变体" /> 变体
  <mp-tab-bar v-model:active="showBadge" :variant="badgeVariant">
    <mp-tab-bar-item label="标签">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" badge>
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" :badge="badgeProps">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" :badge="{ content: 125, max: 99 }">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
