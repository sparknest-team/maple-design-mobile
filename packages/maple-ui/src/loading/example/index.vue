<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import ColorDemo from './demos/color.vue'
import DirectiveDemo from './demos/directive.vue'
import SizeDemo from './demos/size.vue'
import TypeDemo from './demos/type.vue'
import WrapDemo from './demos/wrap.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="size">
    <app-type>{{ english ? 'Size' : '大小' }}</app-type>
    <SizeDemo />
  </section>

  <section data-demo="type">
    <app-type>{{ english ? 'Type' : '类型' }}</app-type>
    <TypeDemo />
  </section>

  <section data-demo="color">
    <app-type>{{ english ? 'Color' : '颜色' }}</app-type>
    <ColorDemo />
  </section>

  <section data-demo="wrap">
    <app-type>{{ english ? 'Wrap' : '包裹内容' }}</app-type>
    <WrapDemo />
  </section>

  <section data-demo="directive">
    <app-type>{{ english ? 'Loading Directive' : '加载指令' }}</app-type>
    <DirectiveDemo />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
