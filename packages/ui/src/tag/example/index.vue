<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import CheckableTagDemo from './demos/checkable-tag.vue'
import ClosableTagDemo from './demos/closable-tag.vue'
import CustomColorTagDemo from './demos/custom-color-tag.vue'
import IconTagDemo from './demos/icon-tag.vue'
import LoadingTagDemo from './demos/loading-tag.vue'
import RoundTagDemo from './demos/round-tag.vue'
import ThemeColorTagDemo from './demos/theme-color-tag.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="tag">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="theme-color-tag">
    <app-type>{{ english ? 'Theme Color' : '主题色标签' }}</app-type>
    <ThemeColorTagDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="round-tag">
    <app-type>{{ english ? 'Round' : '圆角标签' }}</app-type>
    <RoundTagDemo />
  </section>

  <section data-demo="custom-color-tag">
    <app-type>{{ english ? 'Custom Color' : '自定义颜色' }}</app-type>
    <CustomColorTagDemo />
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

  <section data-demo="checkable-tag">
    <app-type>{{ english ? 'Checkable' : '可选中标签' }}</app-type>
    <CheckableTagDemo />
  </section>

  <section data-demo="icon-tag">
    <app-type>{{ english ? 'Icon' : '带图标' }}</app-type>
    <IconTagDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="closable-tag">
    <app-type>{{ english ? 'Closable' : '可关闭标签' }}</app-type>
    <ClosableTagDemo />
  </section>

  <section data-demo="loading-tag">
    <app-type>{{ english ? 'Loading' : '加载中标签' }}</app-type>
    <LoadingTagDemo />
  </section>
</template>
