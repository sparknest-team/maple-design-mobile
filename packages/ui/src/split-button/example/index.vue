<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import AsyncActionDemo from './async-action.vue'
import BasicUsageDemo from './basic.vue'
import ControlledDemo from './controlled.vue'
import CustomIconDemo from './custom-icon.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DisabledDemo from './disabled.vue'
import PopupDemo from './popup.vue'
import VariantsDemo from './variants.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="split-button">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="variants">
    <app-type>{{ english ? 'Variants' : '视觉变体' }}</app-type>
    <VariantsDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled states' : '禁用状态' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <OrganizedAppearanceLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="popup">
    <app-type>{{ english ? 'Popup and repeated selection' : '浮层与连续选择' }}</app-type>
    <PopupDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom icon' : '自定义图标' }}</app-type>
    <CustomIconDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled menu' : '受控展开' }}</app-type>
    <ControlledDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-and-dynamic-data">
    <span lang="zh-CN">异步与动态数据</span>
    <span lang="en-US">Async and dynamic data</span>
  </h2>

  <section data-demo="async-action">
    <app-type>{{ english ? 'Async action' : '异步操作' }}</app-type>
    <AsyncActionDemo />
  </section>
</template>
