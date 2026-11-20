<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { SectionVariant } from '@maple-design/ui-vue'

const variants = { 'heading-line': 'Heading line', plain: 'Title only', outline: 'Outlined section' }
const variant = ref<SectionVariant>('heading-line')
const showMarker = ref(true)
const variantOptions = computed(() =>
  (['heading-line', 'plain', 'outline'] as const).map((value) => ({ value, label: variants[value] })),
)
const model = reactive({
  event: 'abnormal',
  level: '3',
  tags: [],
  remote: ['review'],
  onsite: ['review'],
  safety: '1',
  points: '1',
  skill: 'L3',
  certificates: ['electric', 'entry', 'height', 'high'],
})
const certificateOptions = computed(() => [
  { value: 'electric', label: 'Low voltage' },
  { value: 'entry', label: 'Entry permit' },
  { value: 'height', label: 'Work at height' },
  { value: 'high', label: 'High voltage' },
])
</script>

<template>
  <div data-section-demo="variants">
    <mp-form layout="vertical">
      <mp-form-item label="Section style">
        <mp-radio-group v-model="variant" :options="variantOptions" aria-label="Section style" />
      </mp-form-item>
      <mp-form-item label="Display options">
        <mp-space wrap>
          <mp-checkbox v-model="showMarker">Title marker</mp-checkbox>
        </mp-space>
      </mp-form-item>
    </mp-form>
    <p>Switching styles preserves your entries. An outlined section uses its border to mark the section boundary.</p>

    <mp-form :model="model" layout="horizontal" label-col-flex="7rem" edit-mode="direct">
      <mp-form-item field="event" label="Event type" required>
        <mp-select v-model="model.event" :options="[{ value: 'abnormal', label: 'Multiple anomalies' }]" />
      </mp-form-item>
      <mp-form-item field="level" label="Event level" required>
        <mp-select v-model="model.level" :options="[{ value: '3', label: 'Level 3' }]" />
      </mp-form-item>
      <mp-form-item field="tags" label="Tags">
        <mp-select v-model="model.tags" multiple :options="[{ value: 'review', label: 'Review' }]" />
      </mp-form-item>
      <mp-form-item field="remote" label="Remote SOP">
        <mp-select v-model="model.remote" multiple :options="[{ value: 'review', label: 'Review' }]" />
      </mp-form-item>

      <mp-section title="Onsite handling" :variant="variant" :show-marker="showMarker">
        <mp-form-item field="onsite" label="Onsite SOP">
          <mp-select v-model="model.onsite" multiple :options="[{ value: 'review', label: 'Review' }]" />
        </mp-form-item>
        <mp-form-item field="safety" label="Safety notice">
          <mp-textarea v-model="model.safety" :max-length="200" show-word-limit />
        </mp-form-item>
        <mp-form-item field="points" label="Key points">
          <mp-textarea v-model="model.points" :max-length="200" show-word-limit />
        </mp-form-item>
      </mp-section>
      <mp-divider v-if="variant !== 'outline'" />

      <mp-form-item field="skill" label="Skill level">
        <mp-select v-model="model.skill" :options="[{ value: 'L3', label: 'L3' }]" />
      </mp-form-item>
      <mp-form-item field="certificates" label="Certificates">
        <mp-select v-model="model.certificates" multiple :options="certificateOptions" />
      </mp-form-item>
    </mp-form>
  </div>
</template>
