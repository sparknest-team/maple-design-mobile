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
    <mp-form-item layout="vertical" size="sm" label="滚轮可见字段">
      <mp-radio-group
        v-model="preset"
        aria-label="滚轮可见字段"
        :options="[
          { label: '时 / 分', value: 'hour-minute' },
          { label: '分 / 时', value: 'minute-hour' },
          { label: '仅秒', value: 'second' },
        ]"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-time-range v-if="props.range" v-model="times" :time-fields="fields" format="HH:mm:ss" />
    <mp-time v-else v-model="time" :time-fields="fields" format="HH:mm:ss" />
    <p>隐藏字段保留原值： {{ props.range ? times : time }}</p>
  </mp-space>
</template>
