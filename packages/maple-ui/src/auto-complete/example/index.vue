<script setup>
import { computed, ref } from 'vue'
import { AppType, watchLang } from '@maplejs/maple-cli/client'
import OutlineDemo from './demos/outline.vue'
import StandardDemo from './demos/standard.vue'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((value) => {
  language.value = value
})
</script>

<template>
  <section data-demo="standard">
    <app-type>{{ english ? 'Standard Variant' : '标准外观' }}</app-type>
    <StandardDemo />
  </section>

  <section data-demo="outline">
    <app-type>{{ english ? 'Outlined Variant' : '外边框外观' }}</app-type>
    <OutlineDemo />
  </section>
</template>
