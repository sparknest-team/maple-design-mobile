<script setup>
import { computed, ref } from 'vue'
import { watchLang } from '@maplejs/maple-cli/client'
import appearance from './demos/appearance.vue'
import basic from './demos/basic.vue'
import appearanceEn from './demos/en-US/appearance.vue'
import basicEn from './demos/en-US/basic.vue'
import formattingEn from './demos/en-US/formatting.vue'
import statesEn from './demos/en-US/states.vue'
import formatting from './demos/formatting.vue'
import states from './demos/states.vue'

const language = ref('zh-CN')
watchLang((lang) => {
  language.value = lang
})
const english = computed(() => language.value === 'en-US')
</script>
<template>
  <section data-demo="basic"><component :is="english ? basicEn : basic" /></section>
  <section data-demo="formatting"><component :is="english ? formattingEn : formatting" /></section>
  <section data-demo="appearance"><component :is="english ? appearanceEn : appearance" /></section>
  <section data-demo="states"><component :is="english ? statesEn : states" /></section>
</template>
