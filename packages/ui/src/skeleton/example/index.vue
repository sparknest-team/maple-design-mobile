<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import AnimationDemo from './demos/animation.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContentContentComparison from './demos/content-comparison.vue'
import CustomTemplateDemo from './demos/custom-template.vue'
import FullscreenModeDemo from './demos/fullscreen-mode.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="skeleton">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="content-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">骨架内容形态对比</span><span lang="en-US">Skeleton content shapes</span>
    </h3>
    <ContentContentComparison />
  </section>

  <section data-demo="animation">
    <app-type>{{ english ? 'Animation' : '动画' }}</app-type>
    <AnimationDemo />
  </section>

  <section data-demo="fullscreen-mode">
    <app-type>{{ english ? 'Fullscreen Mode' : '全屏模式' }}</app-type>
    <FullscreenModeDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="custom-template">
    <app-type>{{ english ? 'Custom Template' : '自定义模板' }}</app-type>
    <CustomTemplateDemo />
  </section>
</template>
