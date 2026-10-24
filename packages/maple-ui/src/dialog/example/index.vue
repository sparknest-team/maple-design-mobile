<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import AdvancedPropsDemo from './demos/advanced-props.vue'
import AlertDialogDemo from './demos/alert-dialog.vue'
import DemoApiReview from './demos/api-review.vue'
import AsyncCloseDemo from './demos/async-close.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ConfirmBoxDemo from './demos/confirm-box.vue'
import CustomButtonTextDemo from './demos/custom-button-text.vue'
import CustomFooterDemo from './demos/custom-footer.vue'
import FormDialogDemo from './demos/form-dialog.vue'
import FunctionCallDemo from './demos/function-call.vue'
import LayoutDemo from './demos/layout.vue'
import LongContentDemo from './demos/long-content.vue'
import TypeIconDemo from './demos/type-icon.vue'

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

  <section data-demo="long-content">
    <app-type>{{ english ? 'Long Content' : 'long content' }}</app-type>
    <LongContentDemo />
  </section>

  <section data-demo="function-call">
    <app-type>{{ english ? 'Function Calls' : 'function call' }}</app-type>
    <FunctionCallDemo />
  </section>

  <section data-demo="alert-dialog">
    <app-type>{{ english ? 'Alert Dialog' : 'alert dialog' }}</app-type>
    <AlertDialogDemo />
  </section>

  <section data-demo="confirm-box">
    <app-type>{{ english ? 'Confirm Box' : 'confirm box' }}</app-type>
    <ConfirmBoxDemo />
  </section>

  <section data-demo="type-icon">
    <app-type>{{ english ? 'Semantic Messages' : 'type icon' }}</app-type>
    <TypeIconDemo />
  </section>

  <section data-demo="form-dialog">
    <app-type>{{ english ? 'Dialog Form' : 'form dialog' }}</app-type>
    <FormDialogDemo />
  </section>

  <section data-demo="custom-footer">
    <app-type>{{ english ? 'Custom Footer' : 'custom footer' }}</app-type>
    <CustomFooterDemo />
  </section>

  <section data-demo="custom-button-text">
    <app-type>{{ english ? 'Custom Button Text' : 'custom button text' }}</app-type>
    <CustomButtonTextDemo />
  </section>

  <section data-demo="layout">
    <app-type>{{ english ? 'Layout' : 'layout' }}</app-type>
    <LayoutDemo />
  </section>

  <section data-demo="advanced-props">
    <app-type>{{ english ? 'Advanced Props' : '高级用法' }}</app-type>
    <AdvancedPropsDemo />
  </section>

  <section data-demo="async-close">
    <app-type>{{ english ? 'Async Close' : 'async close' }}</app-type>
    <AsyncCloseDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
