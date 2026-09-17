<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoBasic from './demos/basic.vue'
import DemoFloating from './demos/floating.vue'
import DemoHoverable from './demos/hoverable.vue'
import DemoImage from './demos/image.vue'
import DemoNoPadding from './demos/no-padding.vue'
import DemoRipple from './demos/ripple.vue'
import DemoSize from './demos/size.vue'
import DemoSlots from './demos/slots.vue'
import DemoTooltip from './demos/tooltip.vue'
import DemoVariant from './demos/variant.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic usage and subtitle' : '基础用法与副标题' }}</app-type
    ><DemoBasic />
  </section>
  <section data-demo="no-padding">
    <app-type>{{ english ? 'Custom header' : '自定义标题区域' }}</app-type
    ><DemoNoPadding />
  </section>
  <section data-demo="hoverable">
    <app-type>{{ english ? 'Hover style' : '悬浮样式' }}</app-type
    ><DemoHoverable />
  </section>
  <section data-demo="variant">
    <app-type>{{ english ? 'Variants and elevation' : '变体与阴影' }}</app-type
    ><DemoVariant />
  </section>
  <section data-demo="image">
    <app-type>{{ english ? 'Images and directions' : '图片与三种布局' }}</app-type
    ><DemoImage />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Sizes' : '尺寸' }}</app-type
    ><DemoSize />
  </section>
  <section data-demo="tooltip">
    <app-type>{{ english ? 'Long title and tooltip' : '长标题与提示' }}</app-type
    ><DemoTooltip />
  </section>
  <section data-demo="slots">
    <app-type>{{ english ? 'Content slots' : '内容插槽' }}</app-type
    ><DemoSlots />
  </section>
  <section data-demo="ripple">
    <app-type>{{ english ? 'Ripple and click' : '水波与点击事件' }}</app-type
    ><DemoRipple />
  </section>
  <section data-demo="floating">
    <app-type>{{ english ? 'Floating and close' : '全屏展开与关闭' }}</app-type
    ><DemoFloating />
  </section>
</template>
