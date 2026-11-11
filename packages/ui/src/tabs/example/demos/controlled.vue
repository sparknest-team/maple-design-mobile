<script setup lang="ts">
import { ref } from 'vue'

const active = ref('first')
</script>

<template>
  <mp-tabs v-model="active">
    <mp-tabs-navs aria-label="步骤">
      <mp-tab-nav name="first" title="第一步" />
      <mp-tab-nav name="second" title="第二步" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item name="first">填写信息</mp-tab-item>
      <mp-tab-item name="second">确认信息</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
  <mp-button @click="active = active === 'first' ? 'second' : 'first'">切换到下一步</mp-button>
</template>
