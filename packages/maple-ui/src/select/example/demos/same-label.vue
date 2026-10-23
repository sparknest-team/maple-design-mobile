<script setup>
import { computed, reactive, ref } from 'vue'
import { watchLang } from '@maplejs/maple-cli/client'

const values = reactive({ inline: [1, 2], dialog: [1, 2], popup: [1, 2] })
const language = ref('zh-CN')
watchLang((value) => {
  language.value = value
})
const options = computed(() => [
  { value: 1, label: language.value === 'en-US' ? 'Device' : '设备' },
  { value: 2, label: language.value === 'en-US' ? 'Device' : '设备' },
  { value: 3, label: language.value === 'en-US' ? 'Spare device' : '备用设备' },
])
</script>

<template>
  <mp-space direction="column" :size="16">
    <section v-for="presentation in ['inline', 'popup', 'popup']" :key="presentation" style="width: 100%">
      <mp-select
        v-model="values[presentation]"
        :presentation="presentation"
        :options="options"
        :placeholder="presentation"
        variant="outline"
        multiple
        show-tags
        clearable
      />
      <p>{{ presentation }} · ID：{{ values[presentation].join(', ') || '—' }}</p>
    </section>
  </mp-space>
</template>
