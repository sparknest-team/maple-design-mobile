<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import AsyncChangeDemo from './demos/async-change.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ChangeEventDemo from './demos/change-event.vue'
import ClickEventDemo from './demos/click-event.vue'
import CustomColorDemo from './demos/custom-color.vue'
import CustomLabelDemo from './demos/custom-label.vue'
import FabDemo from './demos/fab.vue'
import MatchByNameDemo from './demos/match-by-name.vue'
import NumericNameDemo from './demos/numeric-name.vue'
import ShowBadgeDemo from './demos/show-badge.vue'
import UncontrolledDemo from './demos/uncontrolled.vue'
import VariantDemo from './demos/variant.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="variant">
    <app-type>{{ english ? 'Variant' : '变体' }}</app-type>
    <VariantDemo />
  </section>

  <section data-demo="match-by-name">
    <app-type>{{ english ? 'Match By Name' : '通过名称匹配' }}</app-type>
    <MatchByNameDemo />
  </section>

  <section data-demo="show-badge">
    <app-type>{{ english ? 'Show Badge' : '徽标提示' }}</app-type>
    <ShowBadgeDemo />
  </section>

  <section data-demo="custom-color">
    <app-type>{{ english ? 'Custom Color' : '自定义颜色' }}</app-type>
    <CustomColorDemo />
  </section>

  <section data-demo="change-event">
    <app-type>{{ english ? 'Change Event' : '监听切换事件' }}</app-type>
    <ChangeEventDemo />
  </section>

  <section data-demo="click-event">
    <app-type>{{ english ? 'Click Event' : '监听点击事件' }}</app-type>
    <ClickEventDemo />
  </section>

  <section data-demo="fab">
    <app-type>{{ english ? 'Fab' : '悬浮按钮' }}</app-type>
    <FabDemo />
  </section>

  <section data-demo="uncontrolled">
    <app-type>{{ english ? 'Uncontrolled selection' : '非受控初始选中' }}</app-type>
    <UncontrolledDemo />
  </section>

  <section data-demo="numeric-name">
    <app-type>{{ english ? 'Numeric names and reordering' : '数字名称与重排' }}</app-type>
    <NumericNameDemo />
  </section>

  <section data-demo="custom-label">
    <app-type>{{ english ? 'Custom selected label' : '自定义选中标签' }}</app-type>
    <CustomLabelDemo />
  </section>

  <section data-demo="async-change">
    <app-type>{{ english ? 'Async selection guards' : '异步切换与拦截' }}</app-type>
    <AsyncChangeDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
