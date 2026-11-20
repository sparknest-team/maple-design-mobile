<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalendarInteractiveMode } from '@maple-design/ui-vue'

const zone = ref('America/New_York')
const mode = ref<CalendarInteractiveMode>('page')
const lock = ref('none')
const locked = computed(() => [
  lock.value === 'start' || lock.value === 'both',
  lock.value === 'end' || lock.value === 'both',
])
const range = ref<number[]>([])
const days = ref(['2026-10-01', '2026-10-03'])
const presets = [
  ['Cross-month range', 'America/New_York', '2026-10-31T14:30:00Z', '2026-11-02T15:00:00Z'],
  ['Spring gap', 'America/New_York', '2026-03-08T06:30:00Z', '2026-03-08T07:30:00Z'],
  ['Second 01:30', 'America/New_York', '2026-11-01T06:30:00Z', '2026-11-01T07:30:00Z'],
  ['Half-hour DST', 'Australia/Lord_Howe', '2026-10-03T15:00:00Z', '2026-10-03T16:00:00Z'],
]
function preset(index: number) {
  zone.value = presets[index][1]
  range.value = presets[index].slice(2).map(Date.parse)
}
preset(0)
const description = computed(() =>
  range.value
    .map((value) => {
      const date = new Date(value)
      return `${date.toISOString()} · ${new Intl.DateTimeFormat('en-US', {
        timeZone: zone.value,
        dateStyle: 'short',
        timeStyle: 'long',
      }).format(date)}`
    })
    .join(' → '),
)
</script>

<template>
  <mp-space direction="column" align="stretch" size="lg" class="zoned-range-demo">
    <p>
      Existing date range: check the complete month and confirm action. The panel must not be limited to half the
      viewport.
    </p>
    <mp-date-range
      v-model="days"
      aria-label="Plain date range"
      :interactive-mode="mode"
      :time-zone="zone"
      :disabled="locked"
      :input-editable="false"
      edit-mode="direct"
    />
    <output data-result="days">{{ days }}</output>
    <mp-form-item layout="vertical" size="sm" label="Range time zone">
      <mp-radio-group
        v-model="zone"
        aria-label="Range time zone"
        :options="['Asia/Shanghai', 'America/New_York', 'UTC', 'Australia/Lord_Howe']"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="Range calendar mode">
      <mp-radio-group
        v-model="mode"
        aria-label="Range calendar mode"
        :options="[
          { label: 'Page', value: 'page' },
          { label: 'Virtual months', value: 'scroll' },
          { label: 'Week line', value: 'line' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="Range locks">
      <mp-radio-group
        v-model="lock"
        aria-label="Range locks"
        :options="[
          { label: 'Both editable', value: 'none' },
          { label: 'Lock start', value: 'start' },
          { label: 'Lock end', value: 'end' },
          { label: 'Lock both', value: 'both' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <output data-result="mode">Current mode：{{ mode }} · {{ zone }} · {{ lock }}</output>
    <p>Mode, zone and locks apply to both range fields. Click a date field to open its calendar.</p>
    <mp-space wrap
      ><mp-button v-for="(item, index) in presets" :key="item[2]" @click="preset(index)">{{
        item[0]
      }}</mp-button></mp-space
    >
    <p>
      Keep the start/end summaries above the current endpoint summary. Each opening selects the start and returns to its
      date, or edits the end if the start is locked. Locked endpoints cannot change; confirm saves and cancel preserves
      committed values.
    </p>
    <mp-space wrap>
      <mp-button @click="days = ['2026-08-01', '2026-08-03']">Six-week month</mp-button>
      <mp-button @click="days = ['2026-10-01', '2026-10-03']">Screenshot month</mp-button>
    </mp-space>
    <mp-date-range
      v-model="range"
      aria-label="Zoned trip"
      value-format="timestamp"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      :disabled="locked"
      :input-editable="false"
      edit-mode="direct"
      min="2000-01-01 00:00:00"
      max="2100-12-31 23:59:59"
    />
    <output data-result="range">{{ description }}</output>
  </mp-space>
</template>

<style scoped>
.zoned-range-demo {
  width: 100%;
}
output {
  overflow-wrap: anywhere;
}
p {
  margin: 0;
  line-height: 1.6;
}
</style>
