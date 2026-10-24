<script setup>
import { ref } from 'vue'
import { Message } from '@maple-design/ui'

const clickEvent = ref(0)
function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model="clickEvent">
    <mp-tab-bar-item label="首页" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="发现" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="收藏" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="我的" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
