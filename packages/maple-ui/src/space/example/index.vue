<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import DemoApiReview from './demos/api-review.vue'
import AroundDemo from './demos/around.vue'
import BaseUseDemo from './demos/base-use.vue'
import BetweenDemo from './demos/between.vue'
import CenterDemo from './demos/center.vue'
import Demo8Demo from './demos/demo-8.vue'
import EnAroundDemo from './demos/en-US/around.vue'
import EnBaseUseDemo from './demos/en-US/base-use.vue'
import EnBetweenDemo from './demos/en-US/between.vue'
import EnCenterDemo from './demos/en-US/center.vue'
import EnDemo8Demo from './demos/en-US/demo-8.vue'
import EnRightAlignDemo from './demos/en-US/right-align.vue'
import EnSpaceDemo from './demos/en-US/space.vue'
import EnVerticalDemo from './demos/en-US/vertical.vue'
import EnWrapDemo from './demos/en-US/wrap.vue'
import InteractiveLayoutDemo from './demos/interactive-layout.vue'
import OrganizedLayoutLab from './demos/layout-lab.vue'
import RightAlignDemo from './demos/right-align.vue'
import SpaceDemo from './demos/space.vue'
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
  <section data-demo="base-use">
    <app-type>{{ english ? 'Basic Use' : '基本使用' }}</app-type>
    <EnBaseUseDemo v-if="english" />
    <BaseUseDemo v-else />
  </section>
  <section data-demo="interactive-layout">
    <app-type>{{ english ? 'Interactive layout' : '动态布局' }}</app-type>
    <InteractiveLayoutDemo />
  </section>

  <section data-demo="vertical">
    <app-type>{{ english ? 'Vertical' : '垂直' }}</app-type>
    <EnVerticalDemo v-if="english" />
    <VerticalDemo v-else />
  </section>

  <section data-demo="space">
    <app-type>{{ english ? 'Space Size' : '间隙' }}</app-type>
    <EnSpaceDemo v-if="english" />
    <SpaceDemo v-else />
  </section>

  <section data-demo="right-align">
    <app-type>{{ english ? 'Right Align' : '靠右' }}</app-type>
    <EnRightAlignDemo v-if="english" />
    <RightAlignDemo v-else />
  </section>

  <section data-demo="around">
    <app-type>{{ english ? 'Space Around' : '环绕' }}</app-type>
    <EnAroundDemo v-if="english" />
    <AroundDemo v-else />
  </section>

  <section data-demo="center">
    <app-type>{{ english ? 'Align Center' : '居中' }}</app-type>
    <EnCenterDemo v-if="english" />
    <CenterDemo v-else />
  </section>

  <section data-demo="between">
    <app-type>{{ english ? 'Space Between' : '两端对齐' }}</app-type>
    <EnBetweenDemo v-if="english" />
    <BetweenDemo v-else />
  </section>

  <section data-demo="demo-8">
    <app-type>{{ english ? 'demo-8' : 'xs / sm / md / lg / xl' }}</app-type>
    <EnDemo8Demo v-if="english" />
    <Demo8Demo v-else />
  </section>

  <section data-demo="layout-lab">
    <app-type>{{ english ? 'Layout and alignment' : '布局与对齐' }}</app-type>
    <OrganizedLayoutLab />
  </section>
  <section data-demo="wrap">
    <app-type>{{ english ? 'Explicit Wrapping' : '显式换行' }}</app-type>
    <EnWrapDemo v-if="english" />
    <WrapDemo v-else />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
