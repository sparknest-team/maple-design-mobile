<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import ControlSizes from '../../field-decorator/example/demos/control-sizes.vue'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import Demo3 from './demos/controlled-events.vue'
import EnglishDemo3 from './demos/en-US/controlled-events.vue'
import EnglishDemo0 from './demos/en-US/field-basic.vue'
import EnglishDemo1 from './demos/en-US/field-modes.vue'
import EnglishDemo2 from './demos/en-US/field-options.vue'
import EnglishDemo4 from './demos/en-US/form-inheritance.vue'
import EnglishDemo5 from './demos/en-US/format-slots.vue'
import EnglishDemo6 from './demos/en-US/number-boundaries.vue'
import Demo0 from './demos/field-basic.vue'
import Demo1 from './demos/field-modes.vue'
import Demo2 from './demos/field-options.vue'
import Demo4 from './demos/form-inheritance.vue'
import Demo5 from './demos/format-slots.vue'
import Demo6 from './demos/number-boundaries.vue'
import OrganizedStateLab from './demos/state-lab.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>
<template>
  <section data-demo="field-basic">
    <app-type>{{ english ? 'Basic states' : '基础与状态' }}</app-type>
    <EnglishDemo0 v-if="english" /><Demo0 v-else />
  </section>
  <section data-demo="control-sizes">
    <h3>Form controls / 表单控件尺寸对照</h3>
    <ControlSizes />
  </section>
  <section data-demo="field-modes">
    <app-type>{{ english ? 'Control layouts' : '三种布局' }}</app-type>
    <EnglishDemo1 v-if="english" /><Demo1 v-else />
  </section>
  <section data-demo="field-options">
    <app-type>{{ english ? 'Sizes and variants' : '五档尺寸与字段外观' }}</app-type>
    <EnglishDemo2 v-if="english" /><Demo2 v-else />
  </section>
  <section data-demo="controlled-events">
    <app-type>{{ english ? 'Controlled values and events' : '受控值与事件顺序' }}</app-type>
    <EnglishDemo3 v-if="english" /><Demo3 v-else />
  </section>
  <section data-demo="form-inheritance">
    <app-type>{{ english ? 'Form inheritance' : '表单继承' }}</app-type>
    <EnglishDemo4 v-if="english" /><Demo4 v-else />
  </section>
  <section data-demo="number-boundaries">
    <app-type>{{ english ? 'Small steps and boundaries' : '小步长与范围边界' }}</app-type>
    <EnglishDemo6 v-if="english" /><Demo6 v-else />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="format-slots">
    <app-type>{{ english ? 'Formatting and slots' : '格式化与插槽' }}</app-type>
    <EnglishDemo5 v-if="english" /><Demo5 v-else />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
