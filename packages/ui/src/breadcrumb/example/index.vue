<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import BasicUsageDemo from './demos/basic-usage.vue'
import ClickEventDemo from './demos/click-event.vue'
import CustomIconDemo from './demos/custom-icon.vue'
import DropdownDemo from './demos/dropdown.vue'
import MaxCountDemo from './demos/max-count.vue'
import RoutesModeDemo from './demos/routes-mode.vue'
import SeparatorDemo from './demos/separator.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="breadcrumb">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="routes-mode">
    <app-type>{{ english ? 'Route Configuration' : '参数化配置' }}</app-type>
    <RoutesModeDemo />
  </section>

  <section data-demo="dropdown">
    <app-type>{{ english ? 'Dropdown' : '下拉菜单' }}</app-type>
    <DropdownDemo />
  </section>

  <section data-demo="max-count">
    <app-type>{{ english ? 'Max Count' : '显示省略' }}</app-type>
    <MaxCountDemo />
  </section>

  <section data-demo="click-event">
    <app-type>{{ english ? 'Link & Click' : '链接与点击' }}</app-type>
    <ClickEventDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="separator">
    <app-type>{{ english ? 'Custom Separator' : '自定义分隔符' }}</app-type>
    <SeparatorDemo />
  </section>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom Icon' : '自定义图标' }}</app-type>
    <CustomIconDemo />
  </section>
</template>
