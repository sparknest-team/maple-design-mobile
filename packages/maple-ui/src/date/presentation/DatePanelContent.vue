<template>
  <RangeContent
    v-if="range && !options.range"
    v-bind="{ ...$attrs, ...bindings }"
    :model-value="rangeValue"
    @update:model-value="select"
    @update:picker-value="navigate"
  >
    <template v-for="name in forwardedSlots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </RangeContent>
  <CalendarContent
    v-else
    v-bind="{ ...$attrs, ...bindings }"
    :model-value="calendarValue"
    @update:model-value="select"
    @update:picker-value="navigate"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </CalendarContent>
</template>
<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useRangeFieldIndex } from '../../_components/picker-field/range-field-context'
import { props as rangeProps } from '../../date-range/presentation-props'
import RangeContent from '../../date-range/presentation/RangeContent.vue'
import { createNamespace } from '../../utils/components'
import { calendarValueFormat, fromCalendarValue, toCalendarValue } from '../calendar-value'
import { isDateDisabled } from '../date-rules'
import { dateTimeDisabledRules } from '../date-time-rules'
import { dateUsesSeconds, dateValueFormat, outputDateValue, parseDateValue } from '../date-value'
import type { DatePanelContentProps } from '../panel-state'
import { datePresentationOptions } from '../presentation-options'
import { props as calendarProps } from '../presentation-props'
import CalendarContent from './CalendarContent.vue'

defineOptions({ name: createNamespace('date-panel-content').name, inheritAttrs: false })
const props = defineProps<DatePanelContentProps>()
const { n } = createNamespace('date-picker')
const slots = useSlots()
const forwardedSlots = computed(() => Object.keys(slots).filter((name) => name !== 'actions'))
const emit = defineEmits(['select', 'confirm', 'navigate'])
const activeIndex = useRangeFieldIndex()
const calendarValue = computed(() => {
  const value = toCalendarValue(props.value, props.options)
  return Array.isArray(value) ? value.map((part) => part ?? '') : value
})
const rangeValue = computed(() => (Array.isArray(calendarValue.value) ? calendarValue.value : []))
const bindings = computed(() => {
  const { modelValue: _model, defaultValue: _default, ...options } = props.options
  const value = toCalendarValue(props.value, options)
  const side = props.range && activeIndex.value === 1 ? 'end' : 'start'
  const current = Array.isArray(props.value) ? props.value[activeIndex.value] : props.value
  const base = parseDateValue(current, options)?.toDate() ?? new Date()
  const timeRules = dateTimeDisabledRules(base, options, side)
  return {
    ...Object.fromEntries(
      Object.entries(options).filter(
        ([key]) => key in (props.range && !props.options.range ? rangeProps : calendarProps),
      ),
    ),
    ...(props.range && !props.options.range
      ? {
          datePickerProps: datePresentationOptions(
            'datePickerProps' in options ? (options.datePickerProps as Record<string, unknown>) : undefined,
          ),
          pickerProps: datePresentationOptions(
            'pickerProps' in options ? (options.pickerProps as Record<string, unknown>) : undefined,
          ),
        }
      : {}),
    pickerValue: (() => {
      const viewport = toCalendarValue(props.pickerValue, props.options)
      return Array.isArray(viewport) ? viewport.map((part) => part ?? '') : viewport
    })(),
    useSeconds: dateUsesSeconds(options),
    timePickerProps: datePresentationOptions(
      'timePickerProps' in options ? (options.timePickerProps as Record<string, unknown>) : undefined,
    ),
    type: (options.type === 'year' || options.type === 'month' ? options.type : 'date') as 'year' | 'month' | 'date',
    readonly:
      options.readonly || (Array.isArray(options.disabled) ? options.disabled[activeIndex.value] : options.disabled),
    min: options.min === undefined ? undefined : parseDateValue(options.min, options)?.format('YYYY-MM-DD'),
    max: options.max === undefined ? undefined : parseDateValue(options.max, options)?.format('YYYY-MM-DD'),
    disabledDate: (text: string) => {
      const precision = text.length === 4 ? 'year' : text.length === 7 ? 'month' : 'date'
      if (precision !== (options.type ?? 'date')) {
        return false
      }
      const format =
        precision === 'year'
          ? 'YYYY'
          : precision === 'month'
            ? 'YYYY-MM'
            : text.length === 9
              ? 'YYYY-MM-D'
              : 'YYYY-MM-DD'
      const parsed = parseDateValue(text, { valueFormat: format })
      return (
        !parsed ||
        isDateDisabled(
          outputDateValue(parsed.toDate(), options),
          { ...options, valueFormat: dateValueFormat(options), showTime: false },
          side,
        )
      )
    },
    disabledTime: {
      hours: (value: number) => Boolean(timeRules.disabledHours?.().includes(value)),
      minutes: (value: number, hour = base.getHours()) => Boolean(timeRules.disabledMinutes?.(hour).includes(value)),
      seconds: (value: number, hour = base.getHours(), minute = base.getMinutes()) =>
        Boolean(timeRules.disabledSeconds?.(hour, minute).includes(value)),
    },
  }
})
function navigate(value: string | string[] | undefined) {
  emit('navigate', fromCalendarValue(value, props.options))
}
function select(value: string | string[] | undefined) {
  emit('select', fromCalendarValue(value, props.options))
}
</script>
