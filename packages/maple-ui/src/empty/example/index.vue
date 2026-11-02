<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import ContentContentComparison from './demos/content-comparison.vue'
import ImageSizeDemo from './demos/image-size.vue'
import ShowDemo from './demos/show.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="empty">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="image-size">
    <app-type>{{ english ? 'Image Size' : '图片尺寸' }}</app-type>
    <ImageSizeDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="content-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">空态图形与补充操作</span><span lang="en-US">Empty-state image and actions</span>
    </h3>
    <ContentContentComparison />
  </section>

  <section data-demo="show">
    <app-type>{{ english ? 'Show and Hide' : '显示与隐藏' }}</app-type>
    <ShowDemo />
  </section>
</template>
