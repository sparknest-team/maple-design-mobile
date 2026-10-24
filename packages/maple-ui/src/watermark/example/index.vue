<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import CustomGapDemo from './demos/custom-gap.vue'
import CustomOffsetDemo from './demos/custom-offset.vue'
import CustomRotateDemo from './demos/custom-rotate.vue'
import FullscreenDemo from './demos/fullscreen.vue'
import ImageWatermarkDemo from './demos/image-watermark.vue'
import MultilineDemo from './demos/multiline.vue'
import TextWatermarkDemo from './demos/text-watermark.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="text-watermark">
    <app-type>{{ english ? 'Text Watermark' : '文字水印' }}</app-type>
    <TextWatermarkDemo />
  </section>

  <section data-demo="multiline">
    <app-type>{{ english ? 'Multiline Text' : '多行文本' }}</app-type>
    <MultilineDemo />
  </section>

  <section data-demo="custom-gap">
    <app-type>{{ english ? 'Custom Gap' : '自定义间距' }}</app-type>
    <CustomGapDemo />
  </section>

  <section data-demo="custom-offset">
    <app-type>{{ english ? 'Custom Offset' : '自定义偏移量' }}</app-type>
    <CustomOffsetDemo />
  </section>

  <section data-demo="custom-rotate">
    <app-type>{{ english ? 'Custom Rotate' : '自定义旋转角度' }}</app-type>
    <CustomRotateDemo />
  </section>

  <section data-demo="image-watermark">
    <app-type>{{ english ? 'Image Watermark' : '图片水印' }}</app-type>
    <ImageWatermarkDemo />
  </section>

  <section data-demo="fullscreen">
    <app-type>{{ english ? 'Fullscreen' : '全屏' }}</app-type>
    <FullscreenDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
