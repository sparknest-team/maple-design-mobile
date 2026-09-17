<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
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
  <section data-demo="basic-use">
    <app-type>{{ english ? 'Basic Use' : '基本使用' }}</app-type>
    <BasicUseDemo />
  </section>

  <section data-demo="direction">
    <app-type>{{ english ? 'Direction' : '拖拽方向' }}</app-type>
    <DirectionDemo />
  </section>

  <section data-demo="attraction">
    <app-type>{{ english ? 'Attraction Direction' : '吸附方向' }}</app-type>
    <AttractionDemo />
  </section>

  <section data-demo="disabled">
    <app-type>{{ english ? 'Disabled' : '禁用' }}</app-type>
    <DisabledDemo />
  </section>

  <section data-demo="boundary">
    <app-type>{{ english ? 'Boundary' : '拖拽区域' }}</app-type>
    <BoundaryDemo />
  </section>

  <section data-demo="reset">
    <app-type>{{ english ? 'Reset Position' : '重置位置' }}</app-type>
    <ResetDemo />
  </section>
</template>
