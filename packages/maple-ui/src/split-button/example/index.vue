<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './api-review.vue'
import AsyncActionDemo from './async-action.vue'
import BasicUsageDemo from './basic.vue'
import ControlledDemo from './controlled.vue'
import CustomIconDemo from './custom-icon.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DisabledDemo from './disabled.vue'
import PopupDemo from './popup.vue'
import SizesDemo from './sizes.vue'
import VariantsDemo from './variants.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="variants">
    <app-type>{{ english ? 'Variants' : '视觉变体' }}</app-type>
    <VariantsDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled states' : '禁用状态' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="sizes">
    <app-type>{{ english ? 'Five sizes' : '五档尺寸' }}</app-type>
    <SizesDemo />
  </section>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom icon' : '自定义图标' }}</app-type>
    <CustomIconDemo />
  </section>

  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled menu' : '受控展开' }}</app-type>
    <ControlledDemo />
  </section>

  <section data-demo="popup">
    <app-type>{{ english ? 'Popup and repeated selection' : '浮层与连续选择' }}</app-type>
    <PopupDemo />
  </section>

  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>

  <section data-demo="async-action">
    <app-type>{{ english ? 'Async action' : '异步操作' }}</app-type>
    <AsyncActionDemo />
  </section>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
