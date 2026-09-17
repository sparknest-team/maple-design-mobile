<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const clickEvent = ref(0)
function handleClick(active) {
  Message.success(`clicked ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model:active="clickEvent">
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签" @click="handleClick">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
