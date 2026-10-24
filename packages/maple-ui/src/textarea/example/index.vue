<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maple-design/cli/client'
import DemoApiReview from './demos/api-review.vue'
import OrganizedAppearanceLab from './demos/appearance-lab.vue'
import BodyDemo from './demos/body-contract.vue'
import Demo1 from './demos/demo-1.vue'
import Demo2 from './demos/demo-2.vue'
import Demo3 from './demos/demo-3.vue'
import Demo4 from './demos/demo-4.vue'
import Demo5 from './demos/demo-5.vue'
import Demo6 from './demos/demo-6.vue'
import EnBodyDemo from './demos/en-US/body-contract.vue'
import EnDemo1 from './demos/en-US/demo-1.vue'
import EnDemo2 from './demos/en-US/demo-2.vue'
import EnDemo3 from './demos/en-US/demo-3.vue'
import EnDemo4 from './demos/en-US/demo-4.vue'
import EnDemo5 from './demos/en-US/demo-5.vue'
import EnDemo6 from './demos/en-US/demo-6.vue'
import OrganizedStateLab from './demos/state-lab.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>
<template>
  <section data-demo="demo-1">
    <app-type>{{ english ? 'Basic usage and value models' : '基础用法与值模型' }}</app-type
    ><EnDemo1 v-if="english" /><Demo1 v-else />
  </section>
  <section data-demo="demo-5">
    <app-type>{{ english ? 'Length and resize' : '外边框与字数限制' }}</app-type
    ><EnDemo5 v-if="english" /><Demo5 v-else />
  </section>
  <section data-demo="demo-2">
    <app-type>{{ english ? 'Variants' : '外观' }}</app-type
    ><EnDemo2 v-if="english" /><Demo2 v-else />
  </section>
  <section data-demo="demo-3">
    <app-type>{{ english ? 'Hint' : '浮动提示' }}</app-type
    ><EnDemo3 v-if="english" /><Demo3 v-else />
  </section>
  <section data-demo="demo-4">
    <app-type>{{ english ? 'Sizes' : '尺寸' }}</app-type
    ><EnDemo4 v-if="english" /><Demo4 v-else />
  </section>
  <section data-demo="demo-6">
    <app-type>{{ english ? 'States' : '状态' }}</app-type
    ><EnDemo6 v-if="english" /><Demo6 v-else />
  </section>
  <section data-demo="body-contract">
    <app-type>{{ english ? 'Body and event contract' : '主体与事件契约' }}</app-type
    ><EnBodyDemo v-if="english" /><BodyDemo v-else />
  </section>
  <section data-demo="appearance-lab">
    <app-type>{{ english ? 'Appearance combinations' : '外观组合' }}</app-type>
    <OrganizedAppearanceLab />
  </section>
  <section data-demo="state-lab">
    <app-type>{{ english ? 'Interaction states' : '交互状态切换' }}</app-type>
    <OrganizedStateLab />
  </section>
  <section data-demo="api-review"><DemoApiReview /></section>
</template>
