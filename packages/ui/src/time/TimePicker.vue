<template>
  <TimePanelContent v-bind="$attrs" :options="options" :state="content">
    <template v-if="$slots.extra" #extra><slot name="extra" /></template>
    <template v-if="$slots.actions" #actions="scope"><slot name="actions" v-bind="scope" /></template>
  </TimePanelContent>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils/components'
import { timeSinglePanelEmits as timePanelEmits } from './panel-emits'
import type { TimePickerSlots } from './picker-contract'
import { props as panelProps } from './picker-props'
import TimePanelContent from './presentation/TimePanelContent.vue'
import { useMobileTimePanel } from './presentation/use-mobile-time-panel'
import type { TimeValue } from './time-value'
import { useTimePanel } from './use-time-panel'

defineOptions({ name: createNamespace('time-picker').name, inheritAttrs: false })
const options = defineProps(panelProps)
const emit = defineEmits(timePanelEmits)
defineSlots<TimePickerSlots>()
const panel = useTimePanel<TimeValue>(
  options,
  {
    select: (value, dates) => emit('select', value, dates),
    confirm: (value, dates) => emit('confirm', value, dates),
    change: (value, dates) => {
      emit('update:modelValue', value)
      emit('change', value, dates)
    },
  },
  () => false,
)
const mobile = useMobileTimePanel(options, panel.draft, panel.select, (value) => {
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
