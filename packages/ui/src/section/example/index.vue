<script setup lang="ts">
import { onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish } from '@maple-design/cli-vue/demo-language'
import InlineFormDemoEn from './demos/en-US/inline-form.vue'
import LineDemoEn from './demos/en-US/line.vue'
import OutlineDemoEn from './demos/en-US/outline.vue'
import PlainDemoEn from './demos/en-US/plain.vue'
import SizesDemoEn from './demos/en-US/sizes.vue'
import InlineFormDemo from './demos/inline-form.vue'
import LineDemo from './demos/line.vue'
import OutlineDemo from './demos/outline.vue'
import PlainDemo from './demos/plain.vue'
import SizesDemo from './demos/sizes.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="section">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="plain">
    <h3 class="mobile-demo-case-heading"><span lang="zh-CN">普通分区</span><span lang="en-US">Plain section</span></h3>
    <component :is="demoEnglish ? PlainDemoEn : PlainDemo" />
  </section>

  <section data-demo="line">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">带线分区</span><span lang="en-US">Section with a line</span>
    </h3>
    <component :is="demoEnglish ? LineDemoEn : LineDemo" />
  </section>

  <section data-demo="outline">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">描边分区与自定义标题</span><span lang="en-US">Outlined section with a custom heading</span>
    </h3>
    <component :is="demoEnglish ? OutlineDemoEn : OutlineDemo" />
  </section>

  <section data-demo="sizes">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">分区尺寸、标题层级与内容</span><span lang="en-US">Section size, heading and content</span>
    </h3>
    <component :is="demoEnglish ? SizesDemoEn : SizesDemo" />
  </section>

  <section data-demo="inline-form">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">行内表单分组</span><span lang="en-US">Grouping inline form fields</span>
    </h3>
    <component :is="demoEnglish ? InlineFormDemoEn : InlineFormDemo" />
  </section>
</template>
