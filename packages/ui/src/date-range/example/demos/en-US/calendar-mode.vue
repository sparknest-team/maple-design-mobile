<script setup>
import { computed, ref } from 'vue'

const mode = ref('calendar')
const showTime = ref(false)
const hideYear = ref(false)
const dateFields = computed(() => (hideYear.value ? ['month', 'day'] : ['year', 'month', 'day']))
const dateRange = ref([])
const dateTimeRange = ref([])
const range = computed({
  get: () => (showTime.value ? dateTimeRange.value : dateRange.value),
  set: (value) => {
    if (showTime.value) {
      dateTimeRange.value = value
    } else {
      dateRange.value = value
    }
  },
})
</script>

<template>
  <mp-space direction="column" align="stretch" size="lg">
    <mp-form-item layout="vertical" size="sm" label="Selection mode">
      <mp-radio-group
        v-model="mode"
        aria-label="Selection mode"
        :options="[
          { label: 'Calendar selection', value: 'calendar' },
          { label: 'Column selection', value: 'picker' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-space align="center">
      <span>Include time</span>
      <mp-switch v-model="showTime" aria-label="Include time" />
    </mp-space>
    <mp-space v-if="mode === 'picker'" align="center">
      <span>Hide year column</span>
      <mp-switch v-model="hideYear" aria-label="Hide year column" />
    </mp-space>
    <p>
      Switch between calendar and wheels; enable time to compare date-time ranges. Selections are kept when switching
      modes.
    </p>
    <mp-date-range
      v-model="range"
      :date-fields="dateFields"
      :time-fields="['hour', 'minute']"
      :format="showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
      :value-format="showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'"
      :panel-type="mode"
      :show-time="showTime"
      :disable-confirm="false"
    />
  </mp-space>
</template>
