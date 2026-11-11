<template>
  <TimePanelContent v-bind="$attrs" :options="options" :state="content">
    <template v-if="$slots.extra" #extra><slot name="extra" /></template>
    <template v-if="$slots.actions" #actions="scope"><slot name="actions" v-bind="scope" /></template>
  </TimePanelContent>
</template>

<script setup lang="ts">
import { provideRangePanel } from '../_components/picker-field/range-field-context'
import { timeRangePanelEmits as timePanelEmits } from '../time/panel-emits'
import type { TimeRangePickerSlots } from '../time/picker-contract'
import type { TimeValue } from '../time/time-value'
import { useTimePanel } from '../time/use-time-panel'
import { createNamespace } from '../utils/components'
import { props as panelProps } from './picker-props'
import TimePanelContent from './presentation/TimePanelContent.vue'
import { useMobileRangePanel } from './presentation/use-mobile-range-panel'

defineOptions({ name: createNamespace('time-range-picker').name, inheritAttrs: false })
const options = defineProps(panelProps)
const emit = defineEmits(timePanelEmits)
defineSlots<TimeRangePickerSlots>()
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
provideRangePanel()
const mobile = useMobileRangePanel(options, panel.draft, panel.select, (value) => {
  if (panel.initialize(value)) {
    emit('draft-initialize', value)
  }
})
const content = {
  ...panel,
  ...mobile,
  confirm: () => {
    const committed = panel.confirm()
    if (committed) {
      mobile.confirmationRequired.value = false
    }
    return committed
  },
}
</script>
