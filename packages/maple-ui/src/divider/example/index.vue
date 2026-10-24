<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import BasicUsageDemo from './demos/basic-usage.vue'
import ColorDemo from './demos/color.vue'
import CustomDemo from './demos/custom.vue'
import LivePropertiesDemo from './demos/live-properties.vue'
import SizeDemo from './demos/size.vue'
import TypeDemo from './demos/type.vue'
import VerticalDemo from './demos/vertical.vue'
import WithDescDemo from './demos/with-desc.vue'

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
  <section data-demo="size">
    <app-type>{{ english ? 'Spacing & Inset' : '间距与缩进' }}</app-type>
    <SizeDemo />
  </section>
  <section data-demo="type">
    <app-type>{{ english ? 'Line Style' : '线型' }}</app-type>
    <TypeDemo />
  </section>
  <section data-demo="with-desc">
    <app-type>{{ english ? 'With Text' : '带文字' }}</app-type>
    <WithDescDemo />
  </section>
  <section data-demo="custom">
    <app-type>{{ english ? 'Custom Content' : '自定义内容' }}</app-type>
    <CustomDemo />
  </section>
  <section data-demo="color">
    <app-type>{{ english ? 'Color, Thickness & Opacity' : '颜色、线宽与透明度' }}</app-type>
    <ColorDemo />
  </section>
  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical Divider' : '垂直分割线' }}</app-type>
    <VerticalDemo />
  </section>
  <section data-demo="live-properties">
    <app-type>{{ english ? 'Live Properties' : '动态属性' }}</app-type>
    <LivePropertiesDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
