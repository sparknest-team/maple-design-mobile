<script setup>
import { computed, reactive } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const values = reactive({ inline: [1, 2], dialog: [1, 2], popup: [1, 2] })
const options = computed(() => [
  { value: 1, label: english.value ? 'Device' : '设备' },
  { value: 2, label: english.value ? 'Device' : '设备' },
  { value: 3, label: english.value ? 'Spare device' : '备用设备' },
])
</script>

<template>
  <mp-space direction="column" :size="16">
    <section v-for="editMode in ['inline', 'popup', 'popup']" :key="editMode" style="width: 100%">
      <mp-select
        v-model="values[editMode]"
        :edit-mode="editMode"
        :options="options"
        :placeholder="editMode"
        variant="outline"
        multiple
        show-tags
        clearable
      />
      <p>{{ editMode }} · ID：{{ values[editMode].join(', ') || '—' }}</p>
    </section>
  </mp-space>
</template>
