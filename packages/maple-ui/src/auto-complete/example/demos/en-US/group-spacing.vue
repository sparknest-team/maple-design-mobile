<script setup lang="ts">
const options = [
  {
    isGroup: true,
    label: 'Northern China',
    options: [
      { value: 'beijing', label: 'Beijing' },
      { value: 'tianjin', label: 'Tianjin' },
    ],
  },
  {
    isGroup: true,
    label: 'Eastern China',
    options: [
      { value: 'shanghai', label: 'Shanghai' },
      { value: 'hangzhou', label: 'Hangzhou' },
    ],
  },
]
</script>

<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      :options="options"
      :should-open="() => true"
      placeholder="Grouped suggestions"
      :style="{ width: '280px' }"
    />
    <mp-auto-complete
      :options="options"
      :should-open="() => true"
      placeholder="Grouped suggestions with custom inset"
      :style="{ width: '280px' }"
      :trigger-props="{ popupStyle: { '--mp-auto-complete-option-padding-horizontal': '20px' } }"
    />
  </mp-space>
</template>
