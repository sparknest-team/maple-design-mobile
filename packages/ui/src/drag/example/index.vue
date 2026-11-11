<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli-vue/client'
import AttractionDemo from './demos/attraction.vue'
import BasicUseDemo from './demos/basic-use.vue'
import BoundaryDemo from './demos/boundary.vue'
import DirectionDemo from './demos/direction.vue'
import DisabledDemo from './demos/disabled.vue'
import ResetDemo from './demos/reset.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <h2 class="mobile-demo-group-heading" data-demo-group="basic-examples" data-demo-component="drag">
    <span lang="zh-CN">基础示例</span>
    <span lang="en-US">Basic examples</span>
  </h2>

  <section data-demo="basic-use">
    <app-type>{{ english ? 'Basic Use' : '基本使用' }}</app-type>
    <BasicUseDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="appearance-and-states">
    <span lang="zh-CN">外观与状态</span>
    <span lang="en-US">Appearance and states</span>
  </h2>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="direction-and-boundaries">
    <span lang="zh-CN">方向与拖动范围</span>
    <span lang="en-US">Direction and boundaries</span>
  </h2>

  <section data-demo="direction">
    <app-type>{{ english ? 'Direction' : '拖拽方向' }}</app-type>
    <DirectionDemo />
  </section>

  <section data-demo="boundary">
    <app-type>{{ english ? 'Boundary' : '拖拽区域' }}</app-type>
    <BoundaryDemo />
  </section>

  <h2 class="mobile-demo-group-heading" data-demo-group="content-and-presentation">
    <span lang="zh-CN">内容与展示</span>
    <span lang="en-US">Content and presentation</span>
  </h2>

  <section data-demo="attraction">
    <app-type>{{ english ? 'Attraction Direction' : '吸附方向' }}</app-type>
    <AttractionDemo />
  </section>

  <section data-demo="reset">
    <app-type>{{ english ? 'Reset Position' : '重置位置' }}</app-type>
    <ResetDemo />
  </section>
</template>
