<template>
  <CalendarViewport
    v-if="
      !('presentation' in options && options.presentation === 'picker') &&
      options.interactiveMode &&
      options.interactiveMode !== 'page' &&
      !options.showTime &&
      (options.type ?? 'date') === 'date' &&
      !range &&
      !options.range
    "
    v-bind="bindings"
    :mode="options.interactiveMode"
    :locale="dateLocaleName(options)"
    :use-virtual-scroll="options.useVirtualScroll"
    :model-value="calendarValue"
    :picker-value="bindings.pickerValue"
    :range="range || options.range"
    :multiple="options.multiple"
    :day-start-of-week="options.dayStartOfWeek"
    :show-current="options.showCurrent"
    :today="parseDateValue(new Date(), options)?.format('YYYY-MM-DD')"
    @select="select"
    @navigate="navigate"
  />
  <RangeContent
    v-else-if="range && !options.range"
    v-bind="{ ...$attrs, ...bindings }"
    :endpoint-editor="endpointEditor"
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
import type { DatePickerField, TimePickerField } from '../../_components/picker-field/fields'
import {
  provideRangeDisabledParts,
  useRangeFieldIndex,
} from '../../_components/picker-field/mobile-range-field-context'
import { props as rangeProps } from '../../date-range/presentation-props'
import RangeContent from '../../date-range/presentation/RangeContent.vue'
import { createNamespace } from '../../utils/components'
import { calendarValueFormat, fromCalendarValue, toCalendarValue } from '../calendar-value'
import { dateLocaleName } from '../date-locale'
import { isCalendarDateDisabled } from '../date-rules'
import { dateTimeDisabledPredicates } from '../date-time-rules'
import { dateValueFormat, parseDateValue } from '../date-value'
import type { DatePanelContentProps } from '../panel-state'
import { datePresentationOptions } from '../presentation-options'
import { props as calendarProps } from '../presentation-props'
import CalendarContent from './CalendarContent.vue'
import CalendarViewport from './CalendarViewport.vue'

defineOptions({ name: createNamespace('date-panel-content').name, inheritAttrs: false })
const props = defineProps<DatePanelContentProps & { endpointEditor?: boolean }>()
const { n } = createNamespace('date-picker')
const slots = useSlots()
const forwardedSlots = computed(() => Object.keys(slots).filter((name) => name !== 'actions'))
const emit = defineEmits(['select', 'confirm', 'navigate'])
const disabledParts = provideRangeDisabledParts(() =>
  (props.range || props.options.range) && Array.isArray(props.options.disabled) ? props.options.disabled : [],
)
const activeIndex = useRangeFieldIndex(disabledParts)
// Keep complete civil values internally; display format never controls wheel precision.
const valueOptions = computed(() => ({
  ...props.options,
  format: undefined,
  valueFormat: dateValueFormat(props.options),
}))
const calendarValue = computed(() => {
  const value = toCalendarValue(props.value, valueOptions.value)
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
// Keep each endpoint's rules stable while switching endpoints or paging the calendar.
const timeRules = computed(() =>
  [0, 1].map((index) => {
    const options = props.options
    const current = Array.isArray(props.value) ? props.value[index] : props.value
    const date = parseDateValue(current, options)?.toDate() ?? new Date()
    return dateTimeDisabledPredicates(date, options, index === 1 ? 'end' : 'start')
  }),
)
const bindings = computed(() => {
  const { modelValue: _model, defaultValue: _default, ...options } = props.options
  const value = toCalendarValue(props.value, valueOptions.value)
  const side = props.range && activeIndex.value === 1 ? 'end' : 'start'
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
    const parsed = parseDateValue(text, { ...options, valueFormat: format })
    return !parsed || isCalendarDateDisabled(parsed.toDate(), options, endpoint)
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
      const viewport = toCalendarValue(props.pickerValue, valueOptions.value)
      return Array.isArray(viewport) ? viewport.map((part) => part ?? '') : viewport
    })(),
    dateFields: (options as typeof options & { dateFields?: readonly DatePickerField[] }).dateFields,
    timeFields: (options as typeof options & { timeFields?: readonly TimePickerField[] }).timeFields,
    calendarLocale: dateLocaleName(options),
    currentDate: parseDateValue(new Date(), options)?.format('YYYY-MM-D'),
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
          rangeDisabledTime: timeRules.value,
        }
      : {}),
    disabledTime: timeRules.value[props.range && activeIndex.value === 1 ? 1 : 0],
  }
})
function navigate(value: string | string[] | undefined) {
  emit('navigate', fromCalendarValue(value, valueOptions.value))
}
function select(value: string | string[] | undefined) {
  emit('select', fromCalendarValue(value, valueOptions.value, props.value))
}
</script>
