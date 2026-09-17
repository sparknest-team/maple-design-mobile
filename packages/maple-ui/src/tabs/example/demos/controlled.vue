<script setup lang="ts">
import { ref } from 'vue'

const active = ref('first')
</script>

<template>
  <mp-tabs v-model:active="active">
    <mp-tabs-navs aria-label="步骤">
      <mp-tab-nav key="first" title="第一步" />
      <mp-tab-nav key="second" title="第二步" />
    </mp-tabs-navs>
    <mp-tabs-items>
      <mp-tab-item key="first">填写信息</mp-tab-item>
      <mp-tab-item key="second">确认信息</mp-tab-item>
    </mp-tabs-items>
  </mp-tabs>
  <mp-button @click="active = active === 'first' ? 'second' : 'first'">切换到下一步</mp-button>
</template>
