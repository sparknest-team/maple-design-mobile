<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalendarInteractiveMode } from '@maple-design/ui-vue'

const zone = ref('America/New_York')
const mode = ref<CalendarInteractiveMode>('page')
const instant = ref<number>()
const civil = ref('2026-03-08 01:30:00')
const presets = [
  ['NY spring gap', 'America/New_York', '2026-03-08T06:30:00Z'],
  ['NY first 01:30', 'America/New_York', '2026-11-01T05:30:00Z'],
  ['NY second 01:30', 'America/New_York', '2026-11-01T06:30:00Z'],
  ['Half-hour DST', 'Australia/Lord_Howe', '2026-10-03T15:00:00Z'],
]
function preset(index: number) {
  zone.value = presets[index][1]
  instant.value = Date.parse(presets[index][2])
}
preset(0)
const description = computed(() => {
  if (instant.value == null) {
    return 'Empty'
  }
  const date = new Date(instant.value)
  return `${date.toISOString()} · ${new Intl.DateTimeFormat('en-US', {
    timeZone: zone.value,
    dateStyle: 'short',
    timeStyle: 'long',
  }).format(date)}`
})
</script>

<template>
  <mp-space direction="column" align="stretch" size="lg" class="zone-views-demo">
    <mp-form-item layout="vertical" size="sm" label="Demo time zone">
      <mp-radio-group
        v-model="zone"
        aria-label="Demo time zone"
        :options="['Asia/Shanghai', 'America/New_York', 'UTC', 'Australia/Lord_Howe']"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="Demo calendar mode">
      <mp-radio-group
        v-model="mode"
        aria-label="Demo calendar mode"
        :options="[
          { label: 'Page', value: 'page' },
          { label: 'Virtual months', value: 'scroll' },
          { label: 'Week line', value: 'line' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-space wrap>
      <mp-button v-for="(item, index) in presets" :key="item[2]" @click="preset(index)">{{ item[0] }}</mp-button>
    </mp-space>
    <output data-result="mode">Current mode：{{ mode }} · {{ zone }}</output>
    <p>Timestamp: switching zones changes its display. Confirm saves; cancel preserves the value.</p>
    <mp-date
      v-model="instant"
      aria-label="Zoned appointment"
      value-format="timestamp"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      :input-editable="false"
      edit-mode="direct"
      min="2000-01-01 00:00:00"
      max="2100-12-31 23:59:59"
    />
    <output data-result="instant">{{ description }}</output>
    <p>
      Civil string: New York 2026-03-08 02:30:00 does not exist and must be rejected. A repeated civil time chooses the
      first occurrence.
    </p>
    <mp-date
      v-model="civil"
      aria-label="Civil time string"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      edit-mode="direct"
    />
    <output data-result="civil">{{ civil }}</output>
  </mp-space>
</template>

<style scoped>
.zone-views-demo {
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
