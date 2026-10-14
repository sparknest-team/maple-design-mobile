<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
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

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>
<template>
  <section data-demo="demo-1">
    <app-type>{{ english ? 'Basic' : '基础用法' }}</app-type
    ><EnDemo1 v-if="english" /><Demo1 v-else />
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
  <section data-demo="demo-5">
    <app-type>{{ english ? 'Length and resize' : '字数限制与调整高度' }}</app-type
    ><EnDemo5 v-if="english" /><Demo5 v-else />
  </section>
  <section data-demo="demo-6">
    <app-type>{{ english ? 'States' : '状态' }}</app-type
    ><EnDemo6 v-if="english" /><Demo6 v-else />
  </section>
  <section data-demo="body-contract">
    <app-type>{{ english ? 'Hints, auto-size and events' : '提示、自动高度与事件' }}</app-type
    ><EnBodyDemo v-if="english" /><BodyDemo v-else />
  </section>
</template>
