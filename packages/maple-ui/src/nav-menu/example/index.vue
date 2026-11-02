<script setup lang="ts">
import { onThemeChange } from '@maple-design/cli/client'
import Basic from './demos/basic.vue'
import Controlled from './demos/controlled.vue'
import LongContent from './demos/long-content.vue'
import PanelState from './demos/panel-state.vue'

onThemeChange()
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="nav-menu">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">横向筛选栏</span><span lang="en-US">Horizontal filters</span>
    </h3>
    <Basic />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="long-content">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">长内容与固定操作区</span><span lang="en-US">Long content and fixed actions</span>
    </h3>
    <LongContent />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="data-and-state-control">
    <span lang="zh-CN">数据与状态控制</span>
    <span lang="en-US">Data and state control</span>
  </h2>

  <section data-demo="controlled">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">受控状态与禁用</span><span lang="en-US">Controlled state and disabled entries</span>
    </h3>
    <Controlled />
  </section>
  <section data-demo="panel-state">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">面板状态与关闭</span><span lang="en-US">Panel state and closing</span>
    </h3>
    <PanelState />
  </section>
</template>
