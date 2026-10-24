<script setup lang="ts">
import { ref } from 'vue'
import type { DateShortcut } from '@maple-design/ui'

const selected = ref(['2025-01-15', '2025-01-20'])
const viewport = ref(['2025-01-01', '2025-02-01'])
const acceptNavigation = ref(true)
const notice = ref('')
const shortcutNotice = ref('')
const shortcuts: DateShortcut[] = [
  { label: 'Next month', value: ['2025-02-15', '2025-02-20'] },
  { label: 'Disabled', value: ['2025-03-01', '2025-03-05'], disabled: true },
]
function navigate(value: unknown) {
  if (
    acceptNavigation.value &&
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((part) => typeof part === 'string')
  ) {
    viewport.value = value
  }
}
function observe(_value: unknown, _dates: unknown, texts: unknown) {
  notice.value = String(texts)
}
function choose(shortcut: DateShortcut) {
  shortcutNotice.value = String(shortcut.label)
}
</script>

<template>
  <mp-checkbox v-model="acceptNavigation">Accept viewport requests</mp-checkbox>
  <mp-date-range
    v-model="selected"
    panel-type="calendar"
    :input-editable="false"
    format="DD/MM/YYYY"
    :date-range-picker-props="{ pickerValue: viewport, shortcuts }"
    @update:picker-value="navigate"
    @picker-value-change="observe"
    @select-shortcut="choose"
  />
  <p>Selected model: {{ selected }}；Controlled viewport: {{ viewport }}</p>
  <p>Viewport event: {{ notice }}；Shortcut event: {{ shortcutNotice }}</p>
  <p>
    Navigation does not change selection. Rejected requests keep the previous viewport. Shortcuts select a draft;
    Confirm commits it.
  </p>
</template>
