<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import Demo2 from './demos/alignment.vue'
import DemoApiReview from './demos/api-review.vue'
import Demo0 from './demos/basic.vue'
import Demo1 from './demos/gutter.vue'
import OrganizedLayoutLab from './demos/layout-lab.vue'
import Demo4 from './demos/nested.vue'
import Demo3 from './demos/wrap.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>
<template>
  <section aria-labelledby="layout-usage-title">
    <app-type id="layout-usage-title">{{ english ? 'Choosing a layout component' : '布局组件选择' }}</app-type>
    <p>
      {{ english ? 'Use Grid / GridItem for two-dimensional grid layouts.' : 'Grid / GridItem 用于二维网格布局。' }}
    </p>
    <p>{{ english ? 'Use Row / Col for 24-column layouts.' : 'Row / Col 用于 24 栏栅格布局。' }}</p>
    <p>
      {{ english ? 'Use Space for content spacing and one-dimensional alignment.' : 'Space 用于内容间距与一维排列。' }}
    </p>
  </section>
  <section data-demo="basic">
    <app-type>{{ english ? '24-column layout' : '24 栏基础布局' }}</app-type
    ><Demo0 />
  </section>
  <section data-demo="gutter">
    <app-type>{{ english ? 'Two-axis and responsive gutters' : '双向间距与响应式间距' }}</app-type
    ><Demo1 />
  </section>
  <section data-demo="alignment">
    <app-type>{{ english ? 'Horizontal and vertical alignment' : '水平与垂直对齐' }}</app-type
    ><Demo2 />
  </section>
  <section data-demo="wrap">
    <app-type>{{ english ? 'Wrapping and plain container mode' : '换行与普通容器模式' }}</app-type
    ><Demo3 />
  </section>
  <section data-demo="nested">
    <app-type>{{ english ? 'Nested rows and isolated gutters' : '嵌套与间距隔离' }}</app-type
    ><Demo4 />
  </section>
  <section data-demo="layout-lab">
    <app-type>{{ english ? 'Layout and alignment' : '布局与对齐' }}</app-type>
    <OrganizedLayoutLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
