<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import AsyncChangeDemo from './demos/async-change.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomColorDemo from './demos/custom-color.vue'
import CustomLabelDemo from './demos/custom-label.vue'
import ContentEventComparison from './demos/event-comparison.vue'
import FabDemo from './demos/fab.vue'
import ExplicitLoadingDemo from './demos/loading.vue'
import MatchByNameDemo from './demos/match-by-name.vue'
import ShowBadgeDemo from './demos/show-badge.vue'
import StableKeyDemo from './demos/stable-key.vue'
import UncontrolledDemo from './demos/uncontrolled.vue'
import VariantDemo from './demos/variant.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="tab-bar">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-content">
    <span lang="zh-CN">外观与内容</span>
    <span lang="en-US">Appearance and content</span>
  </h2>

  <section data-demo="variant">
    <app-type>{{ english ? 'Pill indicator' : '胶囊指示器' }}</app-type>
    <VariantDemo />
  </section>

  <section data-demo="show-badge">
    <app-type>{{ english ? 'Show Badge' : '徽标提示' }}</app-type>
    <ShowBadgeDemo />
  </section>

  <section data-demo="custom-color">
    <app-type>{{ english ? 'Custom Color' : '自定义颜色' }}</app-type>
    <CustomColorDemo />
  </section>

  <section data-demo="fab">
    <app-type>{{ english ? 'Fab' : '悬浮按钮' }}</app-type>
    <FabDemo />
  </section>

  <section data-demo="custom-label">
    <app-type>{{ english ? 'Custom selected label' : '自定义选中标签' }}</app-type>
    <CustomLabelDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="value-model-and-interaction">
    <span lang="zh-CN">值模型与交互</span>
    <span lang="en-US">Value model and interaction</span>
  </h2>

  <section data-demo="match-by-name">
    <app-type>{{ english ? 'Match By Name' : '通过名称匹配' }}</app-type>
    <MatchByNameDemo />
  </section>

  <section data-demo="event-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">点击与值变更事件</span><span lang="en-US">Click and value-change events</span>
    </h3>
    <ContentEventComparison />
  </section>

  <section data-demo="uncontrolled">
    <app-type>{{ english ? 'Uncontrolled selection' : '非受控初始选中' }}</app-type>
    <UncontrolledDemo />
  </section>

  <section data-demo="stable-key">
    <app-type>{{ english ? 'Stable keys and selection' : '稳定 key 与选中保持' }}</app-type>
    <StableKeyDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-navigation">
    <span lang="zh-CN">异步切换</span>
    <span lang="en-US">Async navigation</span>
  </h2>

  <section data-demo="async-change">
    <app-type>{{ english ? 'Async selection guards' : '异步切换与拦截' }}</app-type>
    <AsyncChangeDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="loading-and-waiting">
    <span lang="zh-CN">加载与等待</span>
    <span lang="en-US">Loading and waiting</span>
  </h2>

  <section data-demo="loading">
    <h3>受控加载 / Controlled loading</h3>
    <ExplicitLoadingDemo />
  </section>
</template>
