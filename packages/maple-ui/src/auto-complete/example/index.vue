<script setup>
import { computed, ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'
import EnglishDemo9 from './demos/en-US/accessibility.vue'
import EnglishDemo0 from './demos/en-US/basic.vue'
import EnglishDemo8 from './demos/en-US/decorator.vue'
import EnglishDemo4 from './demos/en-US/footer.vue'
import EnglishDemo1 from './demos/en-US/opening-policy.vue'
import EnglishDemo3 from './demos/en-US/remote.vue'
import EnglishDemo6 from './demos/en-US/size.vue'
import EnglishDemo7 from './demos/en-US/state.vue'
import EnglishDemo2 from './demos/en-US/strict.vue'
import EnglishDemo5 from './demos/en-US/virtual-list.vue'
import Demo9 from './demos/zh-CN/accessibility.vue'
import Demo0 from './demos/zh-CN/basic.vue'
import Demo8 from './demos/zh-CN/decorator.vue'
import Demo4 from './demos/zh-CN/footer.vue'
import Demo1 from './demos/zh-CN/opening-policy.vue'
import Demo3 from './demos/zh-CN/remote.vue'
import Demo6 from './demos/zh-CN/size.vue'
import Demo7 from './demos/zh-CN/state.vue'
import Demo2 from './demos/zh-CN/strict.vue'
import Demo5 from './demos/zh-CN/virtual-list.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})
</script>
<template>
  <section data-demo="basic">
    <app-type>{{ english ? 'Input and selection' : '基础输入与选择' }}</app-type>
    <EnglishDemo0 v-if="english" /><Demo0 v-else />
  </section>
  <section data-demo="opening-policy">
    <app-type>{{ english ? 'Opening and filtering' : '展开条件与过滤' }}</app-type>
    <EnglishDemo1 v-if="english" /><Demo1 v-else />
  </section>
  <section data-demo="strict">
    <app-type>{{ english ? 'Case sensitivity' : '大小写匹配' }}</app-type>
    <EnglishDemo2 v-if="english" /><Demo2 v-else />
  </section>
  <section data-demo="remote">
    <app-type>{{ english ? 'Async suggestions' : '异步建议' }}</app-type>
    <EnglishDemo3 v-if="english" /><Demo3 v-else />
  </section>
  <section data-demo="footer">
    <app-type>{{ english ? 'Field names and slots' : '自定义字段与内容' }}</app-type>
    <EnglishDemo4 v-if="english" /><Demo4 v-else />
  </section>
  <section data-demo="virtual-list">
    <app-type>{{ english ? 'Virtual list' : '虚拟列表' }}</app-type>
    <EnglishDemo5 v-if="english" /><Demo5 v-else />
  </section>
  <section data-demo="size">
    <app-type>{{ english ? 'Sizes' : '五档尺寸' }}</app-type>
    <EnglishDemo6 v-if="english" /><Demo6 v-else />
  </section>
  <section data-demo="state">
    <app-type>{{ english ? 'Disabled and readonly' : '禁用与只读' }}</app-type>
    <EnglishDemo7 v-if="english" /><Demo7 v-else />
  </section>
  <section data-demo="decorator">
    <app-type>{{ english ? 'Variants and hints' : '外观与浮动提示' }}</app-type>
    <EnglishDemo8 v-if="english" /><Demo8 v-else />
  </section>
  <section data-demo="accessibility">
    <app-type>{{ english ? 'Keyboard and accessibility' : '键盘与无障碍' }}</app-type>
    <EnglishDemo9 v-if="english" /><Demo9 v-else />
  </section>
</template>
