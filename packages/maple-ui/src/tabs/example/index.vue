<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import DemoBasic from './demos/basic.vue'
import DemoControlled from './demos/controlled.vue'
import DemoCustomStyle from './demos/custom-style.vue'
import DemoEditable from './demos/editable.vue'
import DemoIconsAndSlots from './demos/icons-and-slots.vue'
import DemoLazyLoad from './demos/lazy-load.vue'
import DemoNavContent from './demos/nav-content.vue'
import OrganizedNavsReview from './demos/navs-review.vue'
import DemoPosition from './demos/position.vue'
import DemoScrollable from './demos/scrollable.vue'
import DemoVariants from './demos/variants.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Simplest usage' : '最简单用法' }}</app-type>
    <DemoBasic />
  </section>
  <section data-demo="variants">
    <app-type>{{ english ? 'Visual variants' : '样式变体' }}</app-type>
    <DemoVariants />
  </section>
  <section data-demo="nav-content">
    <app-type>{{ english ? 'Navigation only' : '仅导航' }}</app-type>
    <DemoNavContent />
  </section>
  <section data-demo="navs-review">
    <app-type>{{ english ? 'Navigation only' : '仅导航' }}</app-type>
    <OrganizedNavsReview />
  </section>
  <section data-demo="scrollable">
    <app-type>{{ english ? 'Scrollable navigation and swiping' : '横向滚动与手势切换' }}</app-type>
    <DemoScrollable />
  </section>
  <section data-demo="position">
    <app-type>{{ english ? 'Orientation and indicator position' : '方向与指示器位置' }}</app-type>
    <DemoPosition />
  </section>
  <section data-demo="editable">
    <app-type>{{ english ? 'Editable tabs' : '动态增删标签' }}</app-type>
    <DemoEditable />
  </section>
  <section data-demo="controlled">
    <app-type>{{ english ? 'Controlled switching' : '受控切换' }}</app-type>
    <DemoControlled />
  </section>
  <section data-demo="lazy-load">
    <app-type>{{ english ? 'Lazy mounting' : '按需挂载内容' }}</app-type>
    <DemoLazyLoad />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="icons-and-slots">
    <app-type>{{ english ? 'Icons and navigation slots' : '图标与导航插槽' }}</app-type>
    <DemoIconsAndSlots />
  </section>
  <section data-demo="custom-style">
    <app-type>{{ english ? 'Custom internal styles' : '类型' }}</app-type>
    <DemoCustomStyle />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
