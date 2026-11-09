<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ContentAlignmentComparison from './demos/alignment-comparison.vue'
import AroundDemo from './demos/around.vue'
import BaseUseDemo from './demos/base-use.vue'
import Demo8Demo from './demos/demo-8.vue'
import ContentAlignmentComparisonEn from './demos/en-US/alignment-comparison.vue'
import EnAroundDemo from './demos/en-US/around.vue'
import EnBaseUseDemo from './demos/en-US/base-use.vue'
import EnDemo8Demo from './demos/en-US/demo-8.vue'
import EnSpaceDemo from './demos/en-US/space.vue'
import EnVerticalDemo from './demos/en-US/vertical.vue'
import EnWrapDemo from './demos/en-US/wrap.vue'
import InteractiveLayoutDemo from './demos/interactive-layout.vue'
import OrganizedLayoutLab from './demos/layout-lab.vue'
import SpaceDemo from './demos/space.vue'
import SplitWrappingDemo from './demos/split-wrapping.vue'
import VerticalDemo from './demos/vertical.vue'
import WrapDemo from './demos/wrap.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="space">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="base-use">
    <app-type>{{ english ? 'Basic Use' : '基本使用' }}</app-type>
    <EnBaseUseDemo v-if="english" />
    <BaseUseDemo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="space">
    <app-type>{{ english ? 'Space Size' : '间隙' }}</app-type>
    <EnSpaceDemo v-if="english" />
    <SpaceDemo v-else />
  </section>

  <section data-demo="demo-8">
    <app-type>{{ english ? 'demo-8' : 'xs / sm / md / lg / xl' }}</app-type>
    <EnDemo8Demo v-if="english" />
    <Demo8Demo v-else />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="layout-and-arrangement">
    <span lang="zh-CN">布局与排列</span>
    <span lang="en-US">Layout and arrangement</span>
  </h2>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical' : '垂直' }}</app-type>
    <EnVerticalDemo v-if="english" />
    <VerticalDemo v-else />
  </section>

  <section data-demo="alignment-comparison">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">主轴对齐方案对比</span><span lang="en-US">Main-axis alignment comparison</span>
    </h3>
    <component :is="english ? ContentAlignmentComparisonEn : ContentAlignmentComparison" />
  </section>

  <section data-demo="wrap">
    <app-type>{{ english ? 'Explicit Wrapping' : '显式换行' }}</app-type>
    <EnWrapDemo v-if="english" />
    <WrapDemo v-else />
  </section>

  <section data-demo="around">
    <app-type>{{ english ? 'Space Around' : '环绕' }}</app-type>
    <EnAroundDemo v-if="english" />
    <AroundDemo v-else />
  </section>

  <section data-demo="layout-lab">
    <app-type>{{ english ? 'Layout and alignment' : '布局与对齐' }}</app-type>
    <OrganizedLayoutLab />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="interaction-and-control">
    <span lang="zh-CN">交互与控制</span>
    <span lang="en-US">Interaction and control</span>
  </h2>

  <section data-demo="interactive-layout">
    <app-type>{{ english ? 'Interactive layout' : '动态布局' }}</app-type>
    <InteractiveLayoutDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="separators-and-wrapping">
    <span lang="zh-CN">分隔与换行</span>
    <span lang="en-US">Separators and wrapping</span>
  </h2>

  <section data-demo="split-wrapping">
    <h3 class="mobile-demo-case-heading">
      <span lang="zh-CN">分隔换行与内容状态</span><span lang="en-US">Split wrapping and content state</span>
    </h3>
    <SplitWrappingDemo />
  </section>
</template>
