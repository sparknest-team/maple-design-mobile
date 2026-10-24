<script setup>
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const selected = ref([])
</script>
<template>
  <mp-checkbox v-model="selected" :value="1"
    >{{ english ? 'Option 1, selected values: ' : '选项 1，当前选中值：' }}{{ selected }}</mp-checkbox
  >
</template>
