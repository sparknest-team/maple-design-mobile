<template>
  <div :class="classes(n(), formatElevation(elevation, 2))">
    <div :class="n('values')">
      <div :class="classes(n('value'), [activeTab === 'start', n('value--active')])" @click="activeTab = 'start'">
        {{ startValue }}
      </div>
      <mp-icon :class="n('value-arrow')" mp-time-range-picker-cover><MIconChevronRight /></mp-icon>
      <div :class="classes(n('value'), [activeTab === 'end', n('value--active')])" @click="activeTab = 'end'">
        <span>{{ endValue }}</span>
        <span v-if="showNextDayLabel" :class="n('next-day')">{{ nextDayText }}</span>
      </div>
    </div>

    <template v-if="presentation === 'picker'">
      <mp-picker
        :key="activeTab"
        v-bind="pickerBindingProps"
        :toolbar="false"
        :columns="pickerColumns"
        :model-value="pickerValue"
        @change="handlePickerChange"
      />
    </template>
    <template v-else>
      <mp-time-picker
        v-show="activeTab === 'start'"
        presentation="clock"
        :model-value="startValue"
        v-bind="timePickerBindingProps"
        :format="format"
        :use-seconds="useSeconds"
        :min="min"
        :max="max"
        :disabled-time="disabledTime"
        :readonly="readonly"
        @update:model-value="(value) => updateSide('start', value)"
      />
      <mp-time-picker
        v-show="activeTab === 'end'"
        presentation="clock"
        :model-value="endValue"
        v-bind="timePickerBindingProps"
        :format="format"
        :use-seconds="useSeconds"
        :min="min"
        :max="max"
        :disabled-time="disabledTime"
        :readonly="readonly"
        @update:model-value="(value) => updateSide('end', value)"
      />
    </template>

    <div v-if="$slots.actions" :class="n('actions')">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { IconChevronRight as MIconChevronRight } from '@maplejs/icons-vue'
import { call, isArray, toNumber } from '@maplejs/maple-shared'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../picker'
import type { PickerColumnOption } from '../picker/props'
import MpTimePicker from '../time/TimePicker.vue'
import { createNamespace, formatElevation } from '../utils/components'
import { padStart } from '../utils/shared'
import { props } from './picker-props'
import { isTimeRangeNextDay } from './picker-utils'

const { name, n, classes } = createNamespace('time-range-picker')

function pad(value: number) {
  return padStart(`${value}`, 2, '0')
}

function buildColumn(count: number, filter?: (value: number) => boolean): PickerColumnOption[] {
  return Array.from({ length: count }, (_, index) => {
    if (filter && filter(index)) {
      return null
    }
    const text = pad(index)
    return { text, value: text }
  }).filter(Boolean) as PickerColumnOption[]
}

function parseTimeParts(time: string, useSeconds: boolean) {
  const [hour = '00', minute = '00', second = '00'] = time.split(':')
  const parts = [pad(toNumber(hour)), pad(toNumber(minute))]
  if (useSeconds) {
    parts.push(pad(toNumber(second)))
  }
  return parts
}

function joinTimeParts(values: (string | number)[], useSeconds: boolean) {
  const hour = pad(toNumber(values[0]))
  const minute = pad(toNumber(values[1]))
  if (useSeconds) {
    return `${hour}:${minute}:${pad(toNumber(values[2] ?? 0))}`
  }
  return `${hour}:${minute}`
}

export default defineComponent({
  name,
  components: {
    MIconChevronRight,
    MpIcon,
    MpPicker,
    MpTimePicker,
  },
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const translate = (key: string) => (pt ? pt : t)(key as any)
    const activeTab = ref<'start' | 'end'>('start')

    function defaultTime() {
      return props.useSeconds ? '00:00:00' : '00:00'
    }

    const startValue = computed(() => {
      const value = props.modelValue
      return isArray(value) && value[0] ? value[0] : defaultTime()
    })

    const endValue = computed(() => {
      const value = props.modelValue
      return isArray(value) && value[1] ? value[1] : defaultTime()
    })

    const showNextDayLabel = computed(() => props.showNextDay && isTimeRangeNextDay(startValue.value, endValue.value))
    const nextDayText = computed(() => translate('timeRangeNextDay'))

    const timePickerBindingProps = computed(() => ({ ...props.timePickerProps }))
    const pickerBindingProps = computed(() => ({ ...props.pickerProps }))

    const pickerColumns = computed(() => {
      const { disabledTime, useSeconds } = props
      const columns: PickerColumnOption[][] = [
        buildColumn(24, disabledTime?.hours ? (hour) => !!disabledTime.hours?.(hour) : undefined),
        buildColumn(60, disabledTime?.minutes ? (minute) => !!disabledTime.minutes?.(minute) : undefined),
      ]
      if (useSeconds) {
        columns.push(buildColumn(60, disabledTime?.seconds ? (second) => !!disabledTime.seconds?.(second) : undefined))
      }
      return columns
    })

    const pickerValue = computed(() => {
      const time = activeTab.value === 'start' ? startValue.value : endValue.value
      return parseTimeParts(time, props.useSeconds)
    })

    function emitValue(next: string[]) {
      emit('update:modelValue', next)
      emit('change', next)
    }

    function updateSide(side: 'start' | 'end', time: string) {
      if (props.readonly) {
        return
      }
      const next = [startValue.value, endValue.value]
      next[side === 'start' ? 0 : 1] = time
      emitValue(next)
    }

    function handlePickerChange(values: (string | number)[]) {
      if (props.readonly) {
        return
      }
      updateSide(activeTab.value, joinTimeParts(values, props.useSeconds))
    }

    return {
      n,
      classes,
      formatElevation,
      activeTab,
      startValue,
      endValue,
      showNextDayLabel,
      nextDayText,
      timePickerBindingProps,
      pickerBindingProps,
      pickerColumns,
      pickerValue,
      updateSide,
      handlePickerChange,
    }
  },
})
</script>
