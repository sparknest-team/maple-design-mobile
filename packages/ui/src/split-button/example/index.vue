<script setup lang="ts">
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import AsyncActionDemo from './async-action.vue'
import AsyncActionDemoEn from './en-US/async-action.vue'
import BasicUsageDemo from './basic.vue'
import BasicUsageDemoEn from './en-US/basic.vue'
import ControlledDemo from './controlled.vue'
import ControlledDemoEn from './en-US/controlled.vue'
import CustomIconDemo from './custom-icon.vue'
import CustomIconDemoEn from './en-US/custom-icon.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import OrganizedAppearanceLabEn from './demos/en-US/appearance-lab.vue'
import DisabledDemo from './disabled.vue'
import DisabledDemoEn from './en-US/disabled.vue'
import PopupDemo from './popup.vue'
import PopupDemoEn from './en-US/popup.vue'
import VariantsDemo from './variants.vue'
import VariantsDemoEn from './en-US/variants.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="split-button">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <component :is="english ? BasicUsageDemoEn : BasicUsageDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="variants">
    <app-type>{{ english ? 'Variants' : '视觉变体' }}</app-type>
    <component :is="english ? VariantsDemoEn : VariantsDemo" />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled states' : '禁用状态' }}</app-type>
    <component :is="english ? DisabledDemoEn : DisabledDemo" />
  </section>

  <section data-demo="appearance-lab">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">外观配置对比</span><span lang="en-US">Appearance configuration comparison</span>
    </h3>
    <component :is="english ? OrganizedAppearanceLabEn : OrganizedAppearanceLab" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="popup">
    <app-type>{{ english ? 'Popup and repeated selection' : '浮层与连续选择' }}</app-type>
    <component :is="english ? PopupDemoEn : PopupDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom icon' : '自定义图标' }}</app-type>
    <component :is="english ? CustomIconDemoEn : CustomIconDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled menu' : '受控展开' }}</app-type>
    <component :is="english ? ControlledDemoEn : ControlledDemo" />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="async-and-dynamic-data">
    <span lang="zh-CN">异步与动态数据</span>
    <span lang="en-US">Async and dynamic data</span>
  </h2>

  <section data-demo="async-action">
    <app-type>{{ english ? 'Async action' : '异步操作' }}</app-type>
    <component :is="english ? AsyncActionDemoEn : AsyncActionDemo" />
  </section>
</template>
