<template>
  <TimePanelContent v-bind="$attrs" :options="options" :state="content">
    <template v-for="(_, slotName) in $slots" #[slotName]="scope">
      <slot :name="slotName" v-bind="scope || {}" />
    </template>
  </TimePanelContent>
</template>

<script setup lang="ts">
import { timeRangePanelEmits as timePanelEmits } from '../time/panel-emits'
import type { TimeValue } from '../time/time-value'
import { useTimePanel } from '../time/use-time-panel'
import { createNamespace } from '../utils/components'
import { props as panelProps } from './picker-props'
import TimePanelContent from './presentation/TimePanelContent.vue'
import { useMobileRangePanel } from './presentation/use-mobile-range-panel'

defineOptions({ name: createNamespace('time-range-picker').name, inheritAttrs: false })
const options = defineProps(panelProps)
const emit = defineEmits(timePanelEmits)
const panel = useTimePanel<TimeValue[]>(
  options,
  {
    select: (value, dates) => emit('select', value, dates),
    confirm: (value, dates) => emit('confirm', value, dates),
    change: (value, dates) => {
      emit('update:modelValue', value)
      emit('change', value, dates)
    },
  },
  () => true,
)
const content = { ...panel, ...useMobileRangePanel(options, panel.draft, panel.select) }
</script>
