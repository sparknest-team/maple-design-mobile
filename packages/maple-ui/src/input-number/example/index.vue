<script setup>
import { computed, ref } from 'vue'
import { AppType, onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import Demo1Demo from './demos/demo-1.vue'
import Demo2Demo from './demos/demo-2.vue'
import Demo3Demo from './demos/demo-3.vue'
import Demo4Demo from './demos/demo-4.vue'
import Demo5Demo from './demos/demo-5.vue'
import Demo6Demo from './demos/demo-6.vue'
import Demo7Demo from './demos/demo-7.vue'
import Demo8Demo from './demos/demo-8.vue'
import Demo9Demo from './demos/demo-9.vue'
import Demo10Demo from './demos/demo-10.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
onThemeChange()
</script>

<template>
  <section data-demo="demo-1">
    <app-type>{{ english ? 'Basic Usage' : '基本使用' }}</app-type>
    <Demo1Demo />
  </section>

  <section data-demo="demo-2">
    <app-type>{{ english ? 'Range' : '取值范围' }}</app-type>
    <Demo2Demo />
  </section>

  <section data-demo="demo-3">
    <app-type>{{ english ? 'Mode' : '模式' }}</app-type>
    <Demo3Demo />
  </section>

  <section data-demo="demo-4">
    <app-type>{{ english ? 'Size' : '尺寸' }}</app-type>
    <Demo4Demo />
  </section>

  <section data-demo="demo-5">
    <app-type>{{ english ? 'Step And Precision' : '步长和精度' }}</app-type>
    <Demo5Demo />
  </section>

  <section data-demo="demo-6">
    <app-type>{{ english ? 'Prefix And Suffix' : '前缀和后缀' }}</app-type>
    <Demo6Demo />
  </section>

  <section data-demo="demo-7">
    <app-type>{{ english ? 'Custom Icon' : '自定义图标' }}</app-type>
    <Demo7Demo />
  </section>

  <section data-demo="demo-8">
    <app-type>{{ english ? 'Format' : '格式化展示' }}</app-type>
    <Demo8Demo />
  </section>

  <section data-demo="demo-9">
    <app-type>{{ english ? 'Input Mode' : '纯输入模式' }}</app-type>
    <Demo9Demo />
  </section>

  <section data-demo="demo-10">
    <app-type>{{ english ? 'Update On Input' : '输入时更新' }}</app-type>
    <Demo10Demo />
  </section>
</template>
