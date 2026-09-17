<script setup>
const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-progress-group
      :items="[
        { label: 'Docs', value: 20 },
        { label: 'Tests', value: 35 },
      ]"
      color="#ff7d00"
      status
    />
    <mp-progress-group :items="trackOnlyItems" size="lg" />
  </mp-space>
</template>

<style scoped>
.progress-group-example__size-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.progress-group-example__orientations {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 24px;
}

.progress-group-example__vertical {
  height: 220px;
}

.progress-group-example__circles {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 16px;
}

.progress-group-example__circle-status {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
