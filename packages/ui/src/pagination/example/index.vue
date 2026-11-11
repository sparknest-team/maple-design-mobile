<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import Demo7 from './demos/all.vue'
import Demo10 from './demos/auto-adjust.vue'
import ContentAuxiliaryControlsComparison from './demos/auxiliary-controls-comparison.vue'
import Demo0 from './demos/basic.vue'
import Demo8 from './demos/custom-page-button.vue'
import Demo9 from './demos/disabled.vue'
import Demo1 from './demos/more-page-size.vue'
import Demo11 from './demos/responsive.vue'
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
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="pagination">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic">
    <app-type>{{ english ? 'Basic and two-way binding' : '基础与双向绑定' }}</app-type
    ><Demo0 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="size">
    <app-type>{{ english ? 'Five sizes and elevation' : '五档尺寸与阴影' }}</app-type
    ><Demo4 />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled and hide on single page' : '禁用与单页隐藏' }}</app-type
    ><Demo9 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="pagination-modes-and-information">
    <span lang="zh-CN">分页模式与信息</span>
    <span lang="en-US">Pagination modes and information</span>
  </h2>

  <section data-demo="simple">
    <app-type>{{ english ? 'Simple mode' : '简洁模式' }}</app-type
    ><Demo5 />
  </section>

  <section data-demo="more-page-size">
    <app-type>{{ english ? 'Page window and ellipsis' : '更多页码与省略跳转' }}</app-type
    ><Demo1 />
  </section>

  <section data-demo="auxiliary-controls-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">总数、每页条数与跳页</span><span lang="en-US">Totals, page sizes and jumpers</span>
    </h3>
    <ContentAuxiliaryControlsComparison />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="page-size-navigation-and-buttons">
    <span lang="zh-CN">条数、跳转与按钮</span>
    <span lang="en-US">Page size, navigation and buttons</span>
  </h2>

  <section data-demo="custom-page-button">
    <app-type>{{ english ? 'Custom page slots and styles' : '自定义分页按钮与样式' }}</app-type
    ><Demo8 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="responsive-layout-and-data-changes">
    <span lang="zh-CN">响应式与数据变化</span>
    <span lang="en-US">Responsive layout and data changes</span>
  </h2>

  <section data-demo="responsive">
    <app-type>{{ english ? 'Container width and compact layout' : '容器宽度与窄屏布局' }}</app-type
    ><Demo11 />
  </section>

  <section data-demo="auto-adjust">
    <app-type>{{ english ? 'Data changes and auto adjustment' : '数据变化与自动调整' }}</app-type
    ><Demo10 />
  </section>

  <section data-demo="all">
    <app-type>{{ english ? 'Full feature controls' : '完整功能交互' }}</app-type
    ><Demo7 />
  </section>
</template>
