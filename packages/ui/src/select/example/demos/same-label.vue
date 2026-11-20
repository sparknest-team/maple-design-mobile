<script setup>
import { computed, reactive } from 'vue'

const values = reactive({ inline: [1, 2], dialog: [1, 2], popup: [1, 2] })
const options = computed(() => [
  { value: 1, label: '设备' },
  { value: 2, label: '设备' },
  { value: 3, label: '备用设备' },
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
