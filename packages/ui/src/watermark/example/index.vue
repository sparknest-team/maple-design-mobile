<script setup>
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import FullscreenDemo from './demos/fullscreen.vue'
import ContentGeometryComparison from './demos/geometry-comparison.vue'
import ImageWatermarkDemo from './demos/image-watermark.vue'
import MultilineDemo from './demos/multiline.vue'
import TextWatermarkDemo from './demos/text-watermark.vue'

onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="watermark">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="text-watermark">
    <app-type>{{ english ? 'Text Watermark' : '文字水印' }}</app-type>
    <TextWatermarkDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="multiline">
    <app-type>{{ english ? 'Multiline Text' : '多行文本' }}</app-type>
    <MultilineDemo />
  </section>

  <section data-demo="image-watermark">
    <app-type>{{ english ? 'Image Watermark' : '图片水印' }}</app-type>
    <ImageWatermarkDemo />
  </section>

  <section data-demo="fullscreen">
    <app-type>{{ english ? 'Fullscreen' : '全屏' }}</app-type>
    <FullscreenDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="geometry-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">水印间距、偏移与旋转</span><span lang="en-US">Watermark spacing, offset and rotation</span>
    </h3>
    <ContentGeometryComparison />
  </section>
</template>
