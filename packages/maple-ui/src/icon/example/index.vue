<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicDemo from './demos/basic.vue'
import ClickEventDemo from './demos/click-event.vue'
import CustomDemo from './demos/custom.vue'
import IconAnimationDemo from './demos/icon-animation.vue'
import IconColorDemo from './demos/icon-color.vue'
import IconListDemo from './demos/icon-list.vue'
import IconSizeDemo from './demos/icon-size.vue'
import OrganizedLifecycle from './demos/lifecycle.vue'
import RotateAndSpinDemo from './demos/rotate-and-spin.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>

  <section data-demo="icon-size">
    <app-type>{{ english ? 'Icon Size' : '图标尺寸' }}</app-type>
    <IconSizeDemo />
  </section>

  <section data-demo="icon-color">
    <app-type>{{ english ? 'Icon Color' : '图标颜色' }}</app-type>
    <IconColorDemo />
  </section>

  <section data-demo="rotate-and-spin">
    <app-type>{{ english ? 'Rotate and Spin' : '旋转与持续旋转' }}</app-type>
    <RotateAndSpinDemo />
  </section>

  <section data-demo="click-event">
    <app-type>{{ english ? 'Click Event' : '点击事件' }}</app-type>
    <ClickEventDemo />
  </section>

  <section data-demo="custom">
    <app-type>{{ english ? 'Custom Icon' : '自定义图标' }}</app-type>
    <CustomDemo />
  </section>

  <section data-demo="icon-animation">
    <app-type>{{ english ? 'Dynamic Name' : '动态名称' }}</app-type>
    <IconAnimationDemo />
  </section>

  <section data-demo="icon-list">
    <app-type>{{ english ? 'All Icons' : '全部图标' }}</app-type>
    <IconListDemo />
  </section>
  <section data-demo="lifecycle">
    <app-type>{{ english ? 'Name Changes and Lifecycle' : '名称切换与生命周期' }}</app-type>
    <OrganizedLifecycle />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
