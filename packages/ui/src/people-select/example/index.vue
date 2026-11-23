<script setup lang="ts">
import EnPopupSearch from './demos/en-US/popup-search.vue'
import InjectedServices from './demos/injected-services.vue'
import Multiple from './demos/multiple.vue'
import OptionsLoader from './demos/options-loader.vue'
import PopupSearch from './demos/popup-search.vue'
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="people-select">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="multiple"><Multiple /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-data">
    <span lang="zh-CN">异步数据</span>
    <span lang="en-US">Async data</span>
  </h2>

  <section data-demo="options-loader"><OptionsLoader /></section>
  <section data-demo="popup-search">
    <EnPopupSearch v-if="english" />
    <PopupSearch v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="business-composition">
    <span lang="zh-CN">业务组合</span>
    <span lang="en-US">Business composition</span>
  </h2>

  <section data-demo="basic"><InjectedServices /></section>
</template>
