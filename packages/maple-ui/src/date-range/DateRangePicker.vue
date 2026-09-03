<template>
  <div
    :class="
      classes(n(), formatElevation(elevation, 2), [showTime, n('--with-time')], [isCalendarTime, n('--calendar-time')])
    "
  >
    <template v-if="resolvedPresentation === 'picker'">
      <div :class="n('values')">
        <div :class="classes(n('value'), [activeTab === 'start', n('value--active')])" @click="activeTab = 'start'">
          <template v-if="showTime">
            <div :class="n('value-date')">{{ startDisplay.date }}</div>
            <div :class="n('value-time')">{{ startDisplay.time }}</div>
          </template>
          <template v-else>
            {{ startValue }}
          </template>
        </div>
        <mp-icon :class="n('value-arrow')" mp-date-range-picker-cover><MIconChevronRight /></mp-icon>
        <div :class="classes(n('value'), [activeTab === 'end', n('value--active')])" @click="activeTab = 'end'">
          <template v-if="showTime">
            <div :class="n('value-date')">{{ endDisplay.date }}</div>
            <div :class="n('value-time')">{{ endDisplay.time }}</div>
          </template>
          <template v-else>
            {{ endValue }}
          </template>
        </div>
      </div>

      <div v-if="columnLabels.length" :class="n('column-labels')">
        <div v-for="label in columnLabels" :key="label" :class="n('column-label')">
          {{ label }}
        </div>
      </div>

      <mp-picker
        :key="`${activeTab}-${type}-${showTime}-${useSeconds}`"
        v-bind="pickerBindingProps"
        :toolbar="false"
        :columns="pickerColumns"
        :model-value="pickerValue"
        @change="handlePickerChange"
      />
    </template>

    <template v-else-if="isCalendarTime">
      <div :class="classes(n('values'), [focusKind === 'date', n('values--active')])" @click="focusKind = 'date'">
        <div :class="n('value')">{{ startDisplay.date }}</div>
        <mp-icon :class="n('value-arrow')" mp-date-range-picker-cover><MIconChevronRight /></mp-icon>
        <div :class="n('value')">{{ endDisplay.date }}</div>
      </div>

      <mp-date-picker
        v-show="focusKind === 'date'"
        :model-value="calendarModelValue"
        v-bind="datePickerBindingProps"
        range
        :type="type"
        :min="min"
        :max="max"
        :disabled-date="disabledDate"
        :readonly="readonly"
        :elevation="false"
        @update:model-value="handleCalendarDateUpdate"
      />

      <div v-if="focusKind === 'time' && resolvedPresentation === 'calendarClock'" :class="n('datetime-clock')">
        <mp-time-picker
          :key="`clock-${activeTab}`"
          :model-value="activeDisplay.time"
          v-bind="timePickerBindingProps"
          format="24hr"
          :use-seconds="useSeconds"
          :disabled-time="disabledTime"
          :readonly="readonly"
          :elevation="false"
          @update:model-value="handleActiveTimeUpdate"
        />
      </div>

      <template v-if="focusKind === 'time' && resolvedPresentation === 'calendarPicker'">
        <div :class="n('column-labels')">
          <div v-for="label in timeOnlyColumnLabels" :key="label" :class="n('column-label')">
            {{ label }}
          </div>
        </div>
        <mp-picker
          :key="`time-${activeTab}-${useSeconds}`"
          v-bind="pickerBindingProps"
          :toolbar="false"
          :columns="timeOnlyColumns"
          :model-value="timeOnlyPickerValue"
          @change="handleTimeOnlyPickerChange"
        />
      </template>

      <div :class="n('view-tabs')">
        <div
          :class="classes(n('view-tab'), [focusKind === 'time' && activeTab === 'start', n('view-tab--active')])"
          @click="selectTimeSide('start')"
        >
          <span :class="n('view-tab-text')">{{ startDisplay.time }}</span>
        </div>
        <div
          :class="classes(n('view-tab'), [focusKind === 'time' && activeTab === 'end', n('view-tab--active')])"
          @click="selectTimeSide('end')"
        >
          <span :class="n('view-tab-text')">{{ endDisplay.time }}</span>
        </div>
      </div>
    </template>

    <mp-date-picker
      v-else
      :model-value="modelValue"
      v-bind="datePickerBindingProps"
      range
      :type="type"
      :min="min"
      :max="max"
      :disabled-date="disabledDate"
      :readonly="readonly"
      :elevation="false"
      @update:model-value="handleCalendarUpdate"
    />

    <div v-if="$slots.actions" :class="n('actions')">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { IconChevronRight as MIconChevronRight } from '@maplejs/icons-vue'
import { call, isArray } from '@maplejs/maple-shared'
import MpDatePicker from '../date/DatePicker.vue'
import {
  buildDateOrDateTimeColumns,
  buildTimeOnlyColumns,
  combineDateAndTime,
  defaultDate,
  defaultDateTime,
  isCalendarTimePresentation,
  joinDateParts,
  joinDateTimeParts,
  joinTimeParts,
  parseDateParts,
  parseDateTimeParts,
  parseTimeParts,
  resolveDateTimePresentation,
  splitDateTimeDisplay,
} from '../date/datetime'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../picker'
import MpTimePicker from '../time/TimePicker.vue'
import { createNamespace, formatElevation } from '../utils/components'
import { props } from './picker-props'

const { name, n, classes } = createNamespace('date-range-picker')

export default defineComponent({
  name,
  components: {
    MIconChevronRight,
    MpIcon,
    MpPicker,
    MpDatePicker,
    MpTimePicker,
  },
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const translate = (key: string) => (pt ? pt : t)(key as any)
    const activeTab = ref<'start' | 'end'>('start')
    const focusKind = ref<'date' | 'time'>('date')

    const resolvedPresentation = computed(() => resolveDateTimePresentation(props.presentation, props.showTime))
    const isCalendarTime = computed(() => isCalendarTimePresentation(resolvedPresentation.value))

    function fallbackValue() {
      if (props.showTime) {
        return defaultDateTime(props.useSeconds)
      }
      return defaultDate(props.type)
    }

    const startValue = computed(() => {
      const value = props.modelValue
      return isArray(value) && value[0] ? value[0] : fallbackValue()
    })

    const endValue = computed(() => {
      const value = props.modelValue
      return isArray(value) && value[1] ? value[1] : fallbackValue()
    })

    const startDisplay = computed(() => splitDateTimeDisplay(startValue.value, props.useSeconds))
    const endDisplay = computed(() => splitDateTimeDisplay(endValue.value, props.useSeconds))
    const activeDisplay = computed(() => (activeTab.value === 'start' ? startDisplay.value : endDisplay.value))
    const calendarModelValue = computed(() => [startDisplay.value.date, endDisplay.value.date])

    const datePickerBindingProps = computed(() => ({ ...props.datePickerProps }))
    const pickerBindingProps = computed(() => ({ ...props.pickerProps }))
    const timePickerBindingProps = computed(() => ({ ...props.timePickerProps }))

    const columnLabels = computed(() => {
      if (resolvedPresentation.value !== 'picker') {
        return []
      }
      if (props.showTime) {
        const labels = [
          translate('datePickerColumnYear'),
          translate('datePickerColumnMonth'),
          translate('datePickerColumnDay'),
          translate('datePickerColumnHour'),
          translate('datePickerColumnMinute'),
        ]
        if (props.useSeconds) {
          labels.push(translate('datePickerColumnSecond'))
        }
        return labels
      }
      if (props.type === 'year') {
        return [translate('datePickerColumnYear')]
      }
      if (props.type === 'month') {
        return [translate('datePickerColumnYear'), translate('datePickerColumnMonth')]
      }
      return [translate('datePickerColumnYear'), translate('datePickerColumnMonth'), translate('datePickerColumnDay')]
    })

    const timeOnlyColumnLabels = computed(() => {
      const labels = [translate('datePickerColumnHour'), translate('datePickerColumnMinute')]
      if (props.useSeconds) {
        labels.push(translate('datePickerColumnSecond'))
      }
      return labels
    })

    const pickerColumns = computed(() => {
      const current = activeTab.value === 'start' ? startValue.value : endValue.value
      return buildDateOrDateTimeColumns({
        type: props.type,
        showTime: props.showTime,
        useSeconds: props.useSeconds,
        min: props.min,
        max: props.max,
        disabledDate: props.disabledDate,
        disabledTime: props.disabledTime,
        current,
      })
    })

    const timeOnlyColumns = computed(() => buildTimeOnlyColumns(props.useSeconds, props.disabledTime))

    const pickerValue = computed(() => {
      const current = activeTab.value === 'start' ? startValue.value : endValue.value
      if (props.showTime) {
        return parseDateTimeParts(current, props.useSeconds)
      }
      return parseDateParts(current, props.type)
    })

    const timeOnlyPickerValue = computed(() => parseTimeParts(activeDisplay.value.time, props.useSeconds))

    function emitValue(next: string[]) {
      emit('update:modelValue', next)
      emit('change', next)
    }

    function updateSide(side: 'start' | 'end', date: string) {
      if (props.readonly) {
        return
      }
      const next = [startValue.value, endValue.value]
      next[side === 'start' ? 0 : 1] = date
      emitValue(next)
    }

    function selectTimeSide(side: 'start' | 'end') {
      activeTab.value = side
      focusKind.value = 'time'
    }

    function handlePickerChange(values: (string | number)[]) {
      if (props.readonly) {
        return
      }
      const next = props.showTime ? joinDateTimeParts(values, props.useSeconds) : joinDateParts(values, props.type)
      updateSide(activeTab.value, next)
    }

    function handleTimeOnlyPickerChange(values: (string | number)[]) {
      if (props.readonly) {
        return
      }
      const time = joinTimeParts(values, props.useSeconds)
      updateSide(activeTab.value, combineDateAndTime(activeDisplay.value.date, time, props.useSeconds))
    }

    function handleCalendarUpdate(value: string | string[]) {
      if (props.readonly) {
        return
      }
      emitValue(isArray(value) ? [...value] : [])
    }

    function handleCalendarDateUpdate(value: string | string[]) {
      if (props.readonly || !isArray(value)) {
        return
      }
      emitValue([
        combineDateAndTime(value[0] || startDisplay.value.date, startDisplay.value.time, props.useSeconds),
        combineDateAndTime(value[1] || endDisplay.value.date, endDisplay.value.time, props.useSeconds),
      ])
    }

    function handleActiveTimeUpdate(time: string) {
      if (props.readonly) {
        return
      }
      updateSide(activeTab.value, combineDateAndTime(activeDisplay.value.date, time, props.useSeconds))
    }

    return {
      n,
      classes,
      formatElevation,
      activeTab,
      focusKind,
      resolvedPresentation,
      isCalendarTime,
      startValue,
      endValue,
      startDisplay,
      endDisplay,
      activeDisplay,
      calendarModelValue,
      columnLabels,
      timeOnlyColumnLabels,
      datePickerBindingProps,
      pickerBindingProps,
      timePickerBindingProps,
      pickerColumns,
      timeOnlyColumns,
      pickerValue,
      timeOnlyPickerValue,
      selectTimeSide,
      handlePickerChange,
      handleTimeOnlyPickerChange,
      handleCalendarUpdate,
      handleCalendarDateUpdate,
      handleActiveTimeUpdate,
    }
  },
})
</script>
