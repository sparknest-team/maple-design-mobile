<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import AdvancedPropsDemo from './demos/advanced-props.vue'
import AlertDialogDemo from './demos/alert-dialog.vue'
import AsyncCloseDemo from './demos/async-close.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ConfirmBoxDemo from './demos/confirm-box.vue'
import CustomButtonTextDemo from './demos/custom-button-text.vue'
import CustomFooterDemo from './demos/custom-footer.vue'
import DividersDemo from './demos/dividers.vue'
import DraggableDemo from './demos/draggable.vue'
import FormDialogDemo from './demos/form-dialog.vue'
import FunctionCallDemo from './demos/function-call.vue'
import GuardProtocolDemo from './demos/guard-protocol.vue'
import ServiceContainerDemo from './demos/service-container.vue'
import ContentSizeComparison from './demos/size-comparison.vue'
import TypeIconDemo from './demos/type-icon.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="dialog">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="invocation-and-content">
    <span lang="zh-CN">调用方式与内容</span>
    <span lang="en-US">Invocation and content</span>
  </h2>

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

  <section data-demo="service-container">
    <app-type>{{ english ? 'Service popup containers' : '函数调用的挂载目标' }}</app-type>
    <ServiceContainerDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="sizing-and-layout">
    <span lang="zh-CN">尺寸与布局</span>
    <span lang="en-US">Sizing and layout</span>
  </h2>

  <section data-demo="size-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">弹窗尺寸与长内容</span><span lang="en-US">Dialog sizing and long content</span>
    </h3>
    <ContentSizeComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-customization">
    <span lang="zh-CN">交互与定制</span>
    <span lang="en-US">Interaction and customization</span>
  </h2>

  <section data-demo="draggable">
    <app-type>{{ english ? 'Drag lifecycle' : '拖动生命周期' }}</app-type>
    <DraggableDemo />
  </section>

  <section data-demo="custom-footer">
    <app-type>{{ english ? 'Custom Footer' : 'custom footer' }}</app-type>
    <CustomFooterDemo />
  </section>

  <section data-demo="dividers">
    <app-type>{{ english ? 'Header and footer dividers' : '上下分割线' }}</app-type>
    <DividersDemo />
  </section>

  <section data-demo="custom-button-text">
    <app-type>{{ english ? 'Custom Button Text' : 'custom button text' }}</app-type>
    <CustomButtonTextDemo />
  </section>

  <section data-demo="advanced-props">
    <app-type>{{ english ? 'Advanced Props' : '高级用法' }}</app-type>
    <AdvancedPropsDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-actions-and-closing">
    <span lang="zh-CN">异步与关闭控制</span>
    <span lang="en-US">Async actions and closing</span>
  </h2>

  <section data-demo="async-close">
    <app-type>{{ english ? 'Async Close' : 'async close' }}</app-type>
    <AsyncCloseDemo />
  </section>

  <section data-demo="guard-protocol">
    <app-type>异步守卫 / Guard protocol</app-type>
    <GuardProtocolDemo />
  </section>
</template>
