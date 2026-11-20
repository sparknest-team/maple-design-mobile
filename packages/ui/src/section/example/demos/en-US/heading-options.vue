<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SectionMarkerPlacement, SectionStatus, SectionVariant } from '@maple-design/ui-vue'

const variants = ['plain', 'heading-line', 'tonal', 'outline'] as const
const variant = ref<SectionVariant>('outline')
const statuses = ['default', 'info', 'success', 'warning', 'danger'] as const
const status = ref<SectionStatus>('default')
const withTitle = ref(false)
const withDescription = ref(false)
const showMarker = ref(false)
const preferredPlacement = ref<SectionMarkerPlacement>('title')
const markerPlacement = computed({
  get: () => withTitle.value ? preferredPlacement.value : 'section',
  set: (value: SectionMarkerPlacement) => { preferredPlacement.value = value },
})
</script>

<template>
  <mp-space direction="column" align="stretch">
    <mp-radio-group v-model="variant" aria-label="Section style">
      <mp-radio v-for="value in variants" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-radio-group v-model="status" aria-label="Section status">
      <mp-radio v-for="value in statuses" :key="value" :value="value">{{ value }}</mp-radio>
    </mp-radio-group>
    <mp-space wrap>
      <mp-checkbox v-model="withTitle">Show heading</mp-checkbox>
      <mp-checkbox v-model="withDescription">Show description</mp-checkbox>
      <mp-checkbox v-model="showMarker">Show marker</mp-checkbox>
    </mp-space>
    <mp-radio-group v-model="markerPlacement" :disabled="!showMarker" aria-label="Marker placement">
      <mp-radio value="title" :disabled="!withTitle">Heading</mp-radio>
      <mp-radio value="section">Entire section</mp-radio>
    </mp-radio-group>
    <mp-section
      :marker-placement="markerPlacement"
      :variant="variant"
      :status="status"
      :show-marker="showMarker"
      :title="withTitle ? 'Member permissions' : undefined"
      :description="withDescription ? 'Permission changes apply to all project members.' : undefined"
    >
      <dl>
        <dt>Administrator</dt>
        <dd>Manage members and project settings</dd>
        <dt>Member</dt>
        <dd>View the project and update tasks</dd>
      </dl>
    </mp-section>
  </mp-space>
</template>
