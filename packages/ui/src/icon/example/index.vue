<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import ContentAppearanceComparison from './demos/appearance-comparison.vue'
import BasicDemo from './demos/basic.vue'
import ClickEventDemo from './demos/click-event.vue'
import CustomDemo from './demos/custom.vue'
import OrganizedLifecycleEn from './demos/en-US/lifecycle.vue'
import IconAnimationDemo from './demos/icon-animation.vue'
import IconListDemo from './demos/icon-list.vue'
import OrganizedLifecycle from './demos/lifecycle.vue'
import RotateAndSpinDemo from './demos/rotate-and-spin.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="icon">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="appearance-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">图标尺寸与颜色</span><span lang="en-US">Icon size and color</span>
    </h3>
    <ContentAppearanceComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="rotate-and-spin">
    <app-type>{{ english ? 'Rotate and Spin' : '旋转与持续旋转' }}</app-type>
    <RotateAndSpinDemo />
  </section>

  <section data-demo="icon-list">
    <app-type>{{ english ? 'All Icons' : '全部图标' }}</app-type>
    <IconListDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom">
    <app-type>{{ english ? 'Custom Icon' : '自定义图标' }}</app-type>
    <CustomDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="click-event">
    <app-type>{{ english ? 'Click Event' : '点击事件' }}</app-type>
    <ClickEventDemo />
  </section>

  <section data-demo="icon-animation">
    <app-type>{{ english ? 'Dynamic Name' : '动态名称' }}</app-type>
    <IconAnimationDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="lifecycle-and-edge-cases">
    <span lang="zh-CN">生命周期与边界</span>
    <span lang="en-US">Lifecycle and edge cases</span>
  </h2>

  <section data-demo="lifecycle">
    <app-type>{{ english ? 'Name Changes and Lifecycle' : '名称切换与生命周期' }}</app-type>
    <component :is="english ? OrganizedLifecycleEn : OrganizedLifecycle" />
  </section>
</template>
