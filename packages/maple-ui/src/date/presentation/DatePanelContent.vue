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
    :model-value="renderedCalendarValue"
    @update:model-value="select"
    @update:picker-value="navigate"
  >
    <template v-for="(_, name) in $slots" #[name]="scope"><slot :name="name" v-bind="scope || {}" /></template>
  </CalendarContent>
</template>
<script setup lang="ts">
import { computed, shallowRef, useSlots, watch } from 'vue'
import {
  provideRangeDisabledParts,
  useRangeFieldIndex,
} from '../../_components/picker-field/mobile-range-field-context'
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
const disabledParts = provideRangeDisabledParts(() =>
  (props.range || props.options.range) && Array.isArray(props.options.disabled) ? props.options.disabled : [],
)
const activeIndex = useRangeFieldIndex(disabledParts)
const calendarValue = computed(() => {
  const value = toCalendarValue(props.value, props.options)
  return Array.isArray(value) ? value.map((part) => part ?? '') : value
})
// The calendar owns its pending click; partial drafts only gate outer confirmation.
const renderedCalendarValue = shallowRef(calendarValue.value)
watch(calendarValue, (value) => {
  if (
    !(props.range || props.options.range) ||
    !Array.isArray(value) ||
    value.length === 0 ||
    (value.length === 2 && value.every(Boolean))
  ) {
    renderedCalendarValue.value = value
  }
})
const rangeValue = computed(() =>
  Array.isArray(calendarValue.value) ? calendarValue.value.map((value) => value ?? '') : [],
)
const bindings = computed(() => {
  const { modelValue: _model, defaultValue: _default, ...options } = props.options
  const value = toCalendarValue(props.value, options)
  const side = props.range && activeIndex.value === 1 ? 'end' : 'start'
  const current = Array.isArray(props.value) ? props.value[activeIndex.value] : props.value
  const base = parseDateValue(current, options)?.toDate() ?? new Date()
  const timeRules = dateTimeDisabledRules(base, options, side)
  const disabledDate = (text: string, endpoint: 'start' | 'end') => {
    if (options.readonly || (Array.isArray(options.disabled) ? options.disabled.every(Boolean) : options.disabled)) {
      return true
    }
    const precision = text.length === 4 ? 'year' : text.length === 7 ? 'month' : 'date'
    if (precision !== (options.type ?? 'date')) {
      return false
    }
    const format =
      precision === 'year' ? 'YYYY' : precision === 'month' ? 'YYYY-MM' : text.length === 9 ? 'YYYY-MM-D' : 'YYYY-MM-DD'
    const parsed = parseDateValue(text, { valueFormat: format })
    return (
      !parsed ||
      isDateDisabled(
        outputDateValue(parsed.toDate(), options),
        { ...options, valueFormat: dateValueFormat(options), showTime: false },
        endpoint,
      )
    )
  }
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
    type: (options.type === 'year' || options.type === 'month' ? options.type : 'date') as 'year' | 'month' | 'date',
    readonly:
      options.readonly ||
      (Array.isArray(options.disabled)
        ? props.range && !props.options.range
          ? options.disabled.every(Boolean)
          : options.disabled[activeIndex.value]
        : options.disabled),
    min: options.min === undefined ? undefined : parseDateValue(options.min, options)?.format('YYYY-MM-DD'),
    max: options.max === undefined ? undefined : parseDateValue(options.max, options)?.format('YYYY-MM-DD'),
    disabledDate: (text: string) => disabledDate(text, side),
    ...(props.range && !props.options.range
      ? {
          rangeDisabledDate: ['start', 'end'].map(
            (endpoint) => (text: string) => disabledDate(text, endpoint as 'start' | 'end'),
          ),
          rangeDisabledTime: ['start', 'end'].map((endpoint, index) => {
            const value = Array.isArray(props.value) ? props.value[index] : undefined
            const date = parseDateValue(value, options)?.toDate() ?? new Date()
            const rules = dateTimeDisabledRules(date, options, endpoint as 'start' | 'end')
            return {
              hours: (hour: number) => Boolean(rules.disabledHours?.().includes(hour)),
              minutes: (minute: number, hour = date.getHours()) =>
                Boolean(rules.disabledMinutes?.(hour).includes(minute)),
              seconds: (second: number, hour = date.getHours(), minute = date.getMinutes()) =>
                Boolean(rules.disabledSeconds?.(hour, minute).includes(second)),
            }
          }),
        }
      : {}),
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
