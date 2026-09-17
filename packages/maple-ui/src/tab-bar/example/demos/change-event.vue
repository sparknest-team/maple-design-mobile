<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const changeEvent = ref(0)
function handleChange(active) {
  Message.info(`changed to ${active}`)
}
</script>

<template>
  <mp-tab-bar v-model:active="changeEvent" @change="handleChange">
    <mp-tab-bar-item label="标签">
      <template #icon
        ><mp-icon :size="22"><m-icon-home-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon
        ><mp-icon :size="22"><m-icon-search /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon
        ><mp-icon :size="22"><m-icon-heart-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
    <mp-tab-bar-item label="标签">
      <template #icon
        ><mp-icon :size="22"><m-icon-user-circle-fill /></mp-icon
      ></template>
    </mp-tab-bar-item>
  </mp-tab-bar>
</template>
