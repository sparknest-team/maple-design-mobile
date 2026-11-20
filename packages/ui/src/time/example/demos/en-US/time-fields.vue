<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TimePickerField } from '@maple-design/ui-vue'

const props = defineProps<{ range?: boolean }>()
const preset = ref('hour-minute')
const fields = computed<TimePickerField[]>(() =>
  preset.value === 'minute-hour' ? ['minute', 'hour'] : preset.value === 'second' ? ['second'] : ['hour', 'minute'],
)
const time = ref('09:30:17')
const times = ref(['09:30:17', '18:00:23'])
</script>
<template>
  <mp-space direction="column" align="stretch">
    <mp-form-item layout="vertical" size="sm" label="Visible wheel fields">
      <mp-radio-group
        v-model="preset"
        aria-label="Visible wheel fields"
        :options="[
          { label: 'Hour / minute', value: 'hour-minute' },
          { label: 'Minute / hour', value: 'minute-hour' },
          { label: 'Second only', value: 'second' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-time-range v-if="props.range" v-model="times" :time-fields="fields" format="HH:mm:ss" />
    <mp-time v-else v-model="time" :time-fields="fields" format="HH:mm:ss" />
    <p>Hidden fields retain their values: {{ props.range ? times : time }}</p>
  </mp-space>
</template>
