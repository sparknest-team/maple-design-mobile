<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import BasicUsageDemo from './demos/basic-usage.vue'
import CustomImageDemo from './demos/custom-image.vue'
import ExtraSlotDemo from './demos/extra-slot.vue'
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
  <section data-demo="basic-usage">
    <app-type>{{ english ? 'Basic Usage' : '基础用法' }}</app-type>
    <BasicUsageDemo />
  </section>

  <section data-demo="custom-image">
    <app-type>{{ english ? 'Custom Image and Copy' : '自定义图片和文案' }}</app-type>
    <CustomImageDemo />
  </section>

  <section data-demo="image-size">
    <app-type>{{ english ? 'Image Size' : '图片尺寸' }}</app-type>
    <ImageSizeDemo />
  </section>

  <section data-demo="extra-slot">
    <app-type>{{ english ? 'Extra Action' : '操作按钮' }}</app-type>
    <ExtraSlotDemo />
  </section>

  <section data-demo="show">
    <app-type>{{ english ? 'Show and Hide' : '显示与隐藏' }}</app-type>
    <ShowDemo />
  </section>
</template>
