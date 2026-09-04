<script setup>
import { onThemeChange, watchLang } from '@maplejs/maple-cli/client'
import { t, use } from './locale'

const items = [
  { label: 'System', value: 24, color: '#64748b', tip: 'System · 24 GB' },
  { label: 'Apps', value: 8, color: '#f53f3f' },
  { label: 'Media', value: 42, color: '#00b42a' },
]
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const trackOnlyItems = [{ value: 16 }, { value: 22, color: '#722ed1' }, { value: 28, color: '#0fc6c2' }]

watchLang(use)
onThemeChange()
</script>

<template>
  <app-type>{{ t('basic') }}</app-type>
  <mp-progress-group :items="items" :max="128" status />

  <app-type>{{ t('size') }}</app-type>
  <mp-space direction="column" size="md">
    <div v-for="size in sizes" :key="size" class="progress-group-example__size-row">
      <span>{{ size }}</span>
      <mp-progress-group :items="trackOnlyItems" :size="size" />
    </div>
  </mp-space>

  <app-type>{{ t('orientation') }}</app-type>
  <div class="progress-group-example__orientations">
    <mp-progress-group :items="items" status />
    <mp-progress-group
      :items="items"
      orientation="vertical"
      size="lg"
      status
      class="progress-group-example__vertical"
    />
  </div>

  <app-type>{{ t('circle') }}</app-type>
  <div class="progress-group-example__circles">
    <mp-progress-group mode="circle" :items="items" status />
    <mp-progress-group mode="circle" :items="items" circle-size="42vw" :stroke-width="12" status>
      <template #status="{ value, max }">
        <div class="progress-group-example__circle-status">
          <strong>{{ value }}</strong
          ><small>/ {{ max }} GB</small>
        </div>
      </template>
    </mp-progress-group>
  </div>

  <app-type>{{ t('color') }}</app-type>
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

  <app-type>{{ t('custom') }}</app-type>
  <mp-progress-group :items="items" :max="128" status>
    <template #status="{ value, max }">{{ t('used') }} {{ value }} / {{ max }} GB</template>
    <template #item-trailing="{ item }">{{ item.value }} GB</template>
    <template #tooltip="{ item, percent }"
      >{{ item.label }} · {{ item.value }} GB · {{ Math.round(percent) }}%</template
    >
  </mp-progress-group>
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
