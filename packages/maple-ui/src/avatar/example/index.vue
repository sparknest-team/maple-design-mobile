<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import DemoAutoFix from './demos/auto-fix.vue'
import DemoBasic from './demos/basic.vue'
import DemoFallback from './demos/fallback.vue'
import DemoFit from './demos/fit.vue'
import DemoGroupVertical from './demos/group-vertical.vue'
import DemoGroup from './demos/group.vue'
import DemoHoverable from './demos/hoverable.vue'
import DemoImage from './demos/image.vue'
import DemoShape from './demos/shape.vue'
import DemoSize from './demos/size.vue'
import DemoStyle from './demos/style.vue'
import DemoTrigger from './demos/trigger.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage' : '基础用法' }}</app-type>
    <DemoBasic />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Size' : '尺寸' }}</app-type>
    <DemoSize />
  </section>
  <section data-demo="shape">
    <app-type>{{ english ? 'Shape' : '形状' }}</app-type>
    <DemoShape />
  </section>
  <section data-demo="auto-fix">
    <app-type>{{ english ? 'Auto-fit text' : '文字自适应' }}</app-type>
    <DemoAutoFix />
  </section>
  <section data-demo="image">
    <app-type>{{ english ? 'Image avatar' : '图片头像' }}</app-type>
    <DemoImage />
  </section>
  <section data-demo="fit">
    <app-type>{{ english ? 'Image fit' : '图片填充' }}</app-type>
    <DemoFit />
  </section>
  <section data-demo="fallback">
    <app-type>{{ english ? 'Loading and fallback' : '加载与回退' }}</app-type>
    <DemoFallback />
  </section>
  <section data-demo="style">
    <app-type>{{ english ? 'Color and border' : '颜色与边框' }}</app-type>
    <DemoStyle />
  </section>
  <section data-demo="group">
    <app-type>{{ english ? 'Avatar group' : '头像组' }}</app-type>
    <DemoGroup />
  </section>
  <section data-demo="group-vertical">
    <app-type>{{ english ? 'Vertical group' : '纵向头像组' }}</app-type>
    <DemoGroupVertical />
  </section>
  <section data-demo="hoverable">
    <app-type>{{ english ? 'Hoverable' : '头像可悬停' }}</app-type>
    <DemoHoverable />
  </section>
  <section data-demo="trigger">
    <app-type>{{ english ? 'Trigger icon' : '交互图标' }}</app-type>
    <DemoTrigger />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
