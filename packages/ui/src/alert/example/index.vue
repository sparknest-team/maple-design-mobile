<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import ActionDemo from './demos/action.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BasicDemo from './demos/basic.vue'
import ContentContentComparison from './demos/content-comparison.vue'
import CustomIconDemo from './demos/custom-icon.vue'
import ContentDismissComparison from './demos/dismiss-comparison.vue'
import MessageDemo from './demos/message.vue'
import ShowIconDemo from './demos/show-icon.vue'

const type = ref('info')

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="alert">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic"><BasicDemo /></section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

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

  <section data-demo="content-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">标题、对齐与通栏</span><span lang="en-US">Title, alignment and banners</span>
    </h3>
    <ContentContentComparison />
  </section>

  <section data-demo="show-icon">
    <app-type>{{ english ? 'Hide Icon' : '隐藏图标' }}</app-type>
    <ShowIconDemo />
  </section>

  <section data-demo="action">
    <app-type>{{ english ? 'Action' : '操作区' }}</app-type>
    <ActionDemo />
  </section>

  <section data-demo="message">
    <app-type>{{ english ? 'Message' : '信息' }}</app-type>
    <MessageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-icon">
    <app-type>{{ english ? 'Custom Icon' : '自定义图标' }}</app-type>
    <CustomIconDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="dismiss-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">关闭入口与自定义图标</span><span lang="en-US">Dismiss controls and custom icons</span>
    </h3>
    <ContentDismissComparison />
  </section>
</template>
