<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import Demo0 from './demos/basic.vue'
import Demo1 from './demos/collapse.vue'
import Demo3 from './demos/dynamic.vue'
import Demo2 from './demos/responsive.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>
<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="grid">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

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
    <app-type>{{ english ? 'Columns, spans and offsets' : '列数、跨列与偏移' }}</app-type
    ><Demo0 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="responsive">
    <app-type>{{ english ? 'Responsive columns, gaps and spans' : '响应式列数、间距与跨列' }}</app-type
    ><Demo2 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="customization-and-slots">
    <span lang="zh-CN">自定义与插槽</span>
    <span lang="en-US">Customization and slots</span>
  </h2>

  <section data-demo="collapse">
    <app-type>{{ english ? 'Collapsed rows and suffix slot' : '折叠行数与后缀插槽' }}</app-type
    ><Demo1 />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="dynamic">
    <app-type>{{ english ? 'Insert, remove and reorder' : '动态插入、删除与排序' }}</app-type
    ><Demo3 />
  </section>
</template>
