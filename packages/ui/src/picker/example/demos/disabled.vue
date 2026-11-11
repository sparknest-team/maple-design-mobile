<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

const disabled = ref(true)
const value = ref<(string | number)[]>(['A'])
const columns = [[{ text: 'A' }, { text: 'B' }, { text: 'C' }]]
const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')

watchLang((next) => {
  language.value = next
})
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="disabled" edit-mode="direct">{{ english ? 'Disable picker' : '禁用选择器' }}</mp-checkbox>
    <mp-picker v-model="value" :columns="columns" :disabled="disabled" :toolbar="false" />
    <output aria-label="Picker value">{{ value[0] }}</output>
  </mp-space>
</template>
