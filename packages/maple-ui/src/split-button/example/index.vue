<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import AsyncActionDemo from './demos/async-action.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ControlledDemo from './demos/controlled.vue'
import CustomIconDemo from './demos/custom-icon.vue'
import DisabledDemo from './demos/disabled.vue'
import PopupDemo from './demos/popup.vue'
import SizesDemo from './demos/sizes.vue'
import VariantsDemo from './demos/variants.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="variants">
    <app-type>{{ english ? 'Variants' : '视觉变体' }}</app-type>
    <VariantsDemo />
  </section>

  <section data-demo="sizes">
    <app-type>{{ english ? 'Five sizes' : '五档尺寸' }}</app-type>
    <SizesDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled states' : '禁用状态' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="async-action">
    <app-type>{{ english ? 'Async action' : '异步操作' }}</app-type>
    <AsyncActionDemo />
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
</template>
