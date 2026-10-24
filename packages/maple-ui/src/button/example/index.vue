<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import DemoApiReview from './demos/api-review.vue'
import DemoAutoLoading from './demos/auto-loading.vue'
import DemoBasic from './demos/basic.vue'
import DemoBlock from './demos/block.vue'
import OrganizedButtonGroupContent from './demos/button-group-content.vue'
import OrganizedButtonGroupLayout from './demos/button-group-layout.vue'
import DemoButtonGroup from './demos/button-group.vue'
import DemoCustomColor from './demos/custom-color.vue'
import DemoDisabled from './demos/disabled.vue'
import OrganizedFeedback from './demos/feedback.vue'
import DemoIcons from './demos/icons.vue'
import DemoLoadingAppearance from './demos/loading-appearance.vue'
import DemoLoading from './demos/loading.vue'
import DemoNativeEvents from './demos/native-events.vue'
import DemoSize from './demos/size.vue'
import DemoVariants from './demos/variants.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Eight statuses' : '八种主题色' }}</app-type>
    <DemoBasic />
  </section>
  <section data-demo="variants">
    <app-type>{{ english ? 'Variants, statuses and sizes' : '变体、状态与尺寸' }}</app-type>
    <DemoVariants />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Five sizes' : '五档尺寸' }}</app-type>
    <DemoSize />
  </section>
  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled buttons and links' : '禁用与链接拦截' }}</app-type>
    <DemoDisabled />
  </section>
  <section data-demo="loading">
    <app-type>{{ english ? 'Loading animations, layouts and sizes' : '加载动画、布局与尺寸' }}</app-type
    ><DemoLoading />
  </section>
  <section data-demo="loading-appearance">
    <app-type>{{ english ? 'Loading indicator appearance' : '加载指示器样式' }}</app-type
    ><DemoLoadingAppearance />
  </section>
  <section data-demo="auto-loading">
    <app-type>{{ english ? 'Sync, async and rejection recovery' : '同步、异步与失败恢复' }}</app-type>
    <DemoAutoLoading />
  </section>
  <section data-demo="block">
    <app-type>{{ english ? 'Block buttons' : '块级按钮' }}</app-type>
    <DemoBlock />
  </section>
  <section data-demo="custom-color">
    <app-type>{{ english ? 'Custom colors' : '自定义颜色' }}</app-type>
    <DemoCustomColor />
  </section>
  <section data-demo="button-group">
    <app-type>{{ english ? 'Group inheritance and overrides' : '按钮组继承与覆盖' }}</app-type>
    <DemoButtonGroup />
  </section>
  <section data-demo="button-group-layout">
    <app-type>{{ english ? 'Group layouts' : '按钮组布局' }}</app-type>
    <OrganizedButtonGroupLayout />
  </section>
  <section data-demo="button-group-content">
    <app-type>{{ english ? 'Group icons and loading' : '按钮组图文与加载' }}</app-type>
    <OrganizedButtonGroupContent />
  </section>
  <section data-demo="native-events">
    <app-type>{{ english ? 'Native form, focus and touch events' : '原生表单、焦点与触摸事件' }}</app-type>
    <DemoNativeEvents />
  </section>
  <section data-demo="feedback">
    <app-type>{{ english ? 'Ripple and elevation feedback' : '水波与阴影反馈' }}</app-type>
    <OrganizedFeedback />
  </section>
  <section data-demo="icons">
    <app-type>{{ english ? 'Icons and label layouts' : '图标与图文布局' }}</app-type>
    <DemoIcons />
  </section>
  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
