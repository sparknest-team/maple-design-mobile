<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import Demo7 from './demos/all.vue'
import DemoApiReview from './demos/api-review.vue'
import Demo10 from './demos/auto-adjust.vue'
import Demo0 from './demos/basic.vue'
import Demo8 from './demos/custom-page-button.vue'
import Demo9 from './demos/disabled.vue'
import Demo1 from './demos/more-page-size.vue'
import Demo11 from './demos/responsive.vue'
import Demo3 from './demos/show-jumper.vue'
import Demo2 from './demos/show-page-size.vue'
import Demo6 from './demos/show-total.vue'
import Demo5 from './demos/simple.vue'
import Demo4 from './demos/size.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>
<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Basic and two-way binding' : '基础与双向绑定' }}</app-type
    ><Demo0 />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Five sizes and elevation' : '五档尺寸与阴影' }}</app-type
    ><Demo4 />
  </section>
  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled and hide on single page' : '禁用与单页隐藏' }}</app-type
    ><Demo9 />
  </section>
  <section data-demo="more-page-size">
    <app-type>{{ english ? 'Page window and ellipsis' : '更多页码与省略跳转' }}</app-type
    ><Demo1 />
  </section>
  <section data-demo="show-page-size">
    <app-type>{{ english ? 'Page size and shared selector options' : '每页条数与公共选择器配置' }}</app-type
    ><Demo2 />
  </section>
  <section data-demo="show-jumper">
    <app-type>{{ english ? 'Jumper and prefix/suffix slots' : '跳转与前后缀插槽' }}</app-type
    ><Demo3 />
  </section>
  <section data-demo="simple">
    <app-type>{{ english ? 'Simple mode' : '简洁模式' }}</app-type
    ><Demo5 />
  </section>
  <section data-demo="show-total">
    <app-type>{{ english ? 'Custom total slot' : '自定义总数插槽' }}</app-type
    ><Demo6 />
  </section>
  <section data-demo="all">
    <app-type>{{ english ? 'Full feature controls' : '完整功能交互' }}</app-type
    ><Demo7 />
  </section>
  <section data-demo="custom-page-button">
    <app-type>{{ english ? 'Custom page slots and styles' : '自定义分页按钮与样式' }}</app-type
    ><Demo8 />
  </section>
  <section data-demo="auto-adjust">
    <app-type>{{ english ? 'Data changes and auto adjustment' : '数据变化与自动调整' }}</app-type
    ><Demo10 />
  </section>
  <section data-demo="responsive">
    <app-type>{{ english ? 'Container width and compact layout' : '容器宽度与窄屏布局' }}</app-type
    ><Demo11 />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
