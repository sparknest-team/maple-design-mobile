<template>
  <div
    :class="
      classes(
        n(),
        formatElevation(elevation, 2),
        [showTime, n('--with-time')],
        [resolvedPresentation !== 'picker', n('--calendar')],
      )
    "
    @keydown="onColumnsKeydown"
  >
    <div :class="n('summaries')">
      <button
        v-for="(display, index) in summaryDisplays"
        :key="index"
        type="button"
        :aria-describedby="`${summaryId}-${index}`"
        :aria-pressed="activeIndex === index"
        :disabled="disabledParts()[index]"
        :class="classes(n('summary'), [activeIndex === index, n('summary--active')])"
        @click="selectEndpoint(index)"
      >
        <span :id="`${summaryId}-${index}`" :class="n('summary-label')" hidden>{{ summaryLabels[index] }}</span>
        <span :class="n('summary-date')">{{ display.date }}</span>
        <span v-if="showTime && display.time" :class="n('summary-time')">{{ display.time }}</span>
      </button>
    </div>

    <DateRangeQuickPanel v-if="quick?.open.value" />
    <div
      v-if="!quick?.open.value && focusKind === 'date'"
      :class="classes(n('date-content'), [showTime, n('date-content--with-time')])"
    >
      <div :class="n('date-main')">
        <template v-if="resolvedPresentation === 'picker'">
          <div :class="n('column-labels')">
            <span v-for="label in dateColumnLabels" :key="label" :class="n('column-label')">{{ label }}</span>
          </div>
          <mp-picker
            :key="`date-${activeIndex}-${type}`"
            :class="n('date-wheel')"
            v-bind="pickerBindingProps"
            :toolbar="false"
            :disabled="readonly || currentLocked"
            :columns="dateColumns"
            :model-value="datePickerValue"
            @change="handleDatePickerChange"
          />
        </template>
        <CalendarViewport
          v-else-if="interactiveMode !== 'page' && type === 'date'"
          :locale="calendarLocale"
          :mode="interactiveMode"
          :use-virtual-scroll="useVirtualScroll"
          :model-value="endpointEditor ? calendarValues[activeIndex] : calendarValues"
          :picker-value="pickerValue"
          :range="!endpointEditor"
          :range-endpoint="endpointEditor ? undefined : activeIndex === 1 ? 1 : 0"
          :min="min"
          :max="max"
          :day-start-of-week="dayStartOfWeek"
          :today="currentDate"
          :readonly="readonly || currentLocked"
          :disabled-date="currentDisabledDate"
          @select="handleViewportEndpoint"
          @navigate="emitPickerViewport"
        />
        <CalendarContent
          v-else
          ref="calendar"
          v-bind="datePickerBindingProps"
          :range="!endpointEditor"
          :range-endpoint="endpointEditor ? undefined : activeIndex === 1 ? 1 : 0"
          :model-value="endpointEditor ? calendarValues[activeIndex] : calendarValues"
          :picker-value="pickerValue"
          :type="type"
          :empty-selection="endpointEditor && !calendarValues[activeIndex]"
          :min="min"
          :max="max"
          :disabled-date="currentDisabledDate"
          :readonly="readonly || currentLocked"
          :elevation="false"
          @endpoint-candidate="handleCalendarEndpoint"
          @change="endpointEditor && handleCalendarEndpoint($event)"
          @update:picker-value="emitPickerViewport"
        />
      </div>
      <div v-if="showTime" :class="[n('quick-time'), customTimeFields && n('quick-time--fields')]">
        <div v-if="customTimeFields" :class="n('column-labels')">
          <span v-for="label in timeColumnLabels" :key="label" :class="n('column-label')">{{ label }}</span>
        </div>
        <mp-picker
          :key="`quick-${activeIndex}`"
          :class="n('quick-time-wheel')"
          v-bind="pickerBindingProps"
          :toolbar="false"
          :title="translate('timePickerHint')"
          :option-count="pickerBindingProps.optionCount ?? 7"
          :disabled="
            readonly ||
            currentLocked ||
            (customTimeFields ? timeColumns.some((column) => !column.length) : !quickTimeOptions.length)
          "
          :columns="customTimeFields ? timeColumns : [quickTimeColumns]"
          :model-value="customTimeFields ? timePickerValue : quickTimeValue"
          @change="customTimeFields ? handleTimePickerChange($event) : handleQuickTimeChange($event)"
        />
      </div>
    </div>

    <div v-if="!quick?.open.value && showTime && focusKind === 'time'" :class="n('datetime-picker')">
      <div :class="n('column-labels')">
        <span v-for="label in timeColumnLabels" :key="label" :class="n('column-label')">{{ label }}</span>
      </div>
      <mp-picker
        :key="`detail-${activeIndex}-${timeFields?.join()}`"
        :class="n('time-wheel')"
        v-bind="pickerBindingProps"
        :toolbar="false"
        :disabled="readonly || currentLocked"
        :columns="timeColumns"
        :model-value="timePickerValue"
        @change="handleTimePickerChange"
      />
    </div>

    <TemporalCurrent
      v-if="!quick?.open.value"
      prefix="date-range-picker"
      :label="summaryLabels[activeIndex]"
      :date="summaryDisplays[activeIndex].date"
      :time="summaryDisplays[activeIndex].time"
      :show-time="showTime"
      :view="focusKind"
      @update:view="selectView"
    />
    <div v-if="$slots.actions" :class="n('actions')"><slot name="actions" /></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useId, watch, type PropType } from 'vue'
import dayjs from 'dayjs/esm/index.js'
import { mergePickerFields, pickerFieldIndexes, timeFields } from '../../_components/picker-field/fields'
import { useRangeDisabledParts, useRangeFieldIndex } from '../../_components/picker-field/mobile-range-field-context'
import TemporalCurrent from '../../_components/picker-field/TemporalCurrent.vue'
import { navigateTemporalColumns } from '../../_utils/temporal-keyboard'
import { dateWheelFieldIndexes, mergeDateWheelFields } from '../../date/date-wheel-fields'
import DateRangeQuickPanel from '../../date/DateRangeQuickPanel.vue'
import {
  buildDateOrDateTimeColumns,
  buildTimeOnlyColumns,
  combineDateAndTime,
  defaultDate,
  defaultDateTime,
  joinDateParts,
  joinTimeParts,
  parseDateParts,
  parseTimeParts,
  splitDateTimeDisplay,
} from '../../date/datetime'
import CalendarContent from '../../date/presentation/CalendarContent.vue'
import CalendarViewport from '../../date/presentation/CalendarViewport.vue'
import { useQuickTime } from '../../date/quick-time'
import { useRangeQuickPanel } from '../../date/range-quick-selection'
import type { DisabledTime } from '../../date/time-constraints'
import { dateWheelOptions } from '../../date/wheel-options'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../../picker'
import { createNamespace, formatElevation } from '../../utils/components'
import { dateRangeCalendarOptions } from '../calendar-options'
import { props } from '../presentation-props'

const { name, n, classes } = createNamespace('date-range-picker')
export default defineComponent({
  name,
  components: { MpPicker, CalendarContent, CalendarViewport, TemporalCurrent, DateRangeQuickPanel },
  props: {
    ...props,
    endpointEditor: Boolean,
    calendarLocale: String,
    currentDate: String,
    rangeDisabledTime: Array as PropType<DisabledTime[]>,
    rangeDisabledDate: Array as PropType<((value: string) => boolean)[]>,
  },
  emits: ['change', 'update:modelValue', 'update:pickerValue'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const translate = (key: string) => (pt ?? t)(key as any)
    const quick = useRangeQuickPanel()
    const disabledParts = useRangeDisabledParts()
    const activeIndex = useRangeFieldIndex()
    const currentLocked = computed(() => Boolean(disabledParts()[activeIndex.value]))
    const focusKind = ref<'date' | 'time'>('date')
    watch(
      () => props.showTime,
      (showTime) => {
        if (!showTime) {
          focusKind.value = 'date'
        }
      },
    )
    const calendar = ref<InstanceType<typeof CalendarContent>>()
    const summaryId = useId()
    const resolvedPresentation = computed(() => (props.presentation === 'picker' ? 'picker' : 'calendar'))
    const fallbackValue = () => (props.showTime ? defaultDateTime(true) : defaultDate(props.type))
    const endpointValues = computed(() => [0, 1].map((index) => props.modelValue[index] || ''))
    const currentValue = computed(() => endpointValues.value[activeIndex.value] || fallbackValue())
    const currentDisplay = computed(() => splitDateTimeDisplay(currentValue.value, true))
    const summaryDisplays = computed(() =>
      endpointValues.value.map((value, index) =>
        !value
          ? { date: translate(index === 0 ? 'rangeStartPlaceholder' : 'rangeEndPlaceholder'), time: '' }
          : props.showTime
            ? splitDateTimeDisplay(value, timeFieldIndexes.value.includes(2))
            : { date: value, time: '' },
      ),
    )
    const summaryLabels = computed(() =>
      props.showTime
        ? [translate('timeRangeStart'), translate('timeRangeEnd')]
        : [translate('dateRangeStart'), translate('dateRangeEnd')],
    )
    const calendarValues = computed(() =>
      endpointValues.value.map((value) =>
        props.showTime && value ? splitDateTimeDisplay(value, timeFieldIndexes.value.includes(2)).date : value,
      ),
    )
    const currentDisabledDate = computed(() => props.rangeDisabledDate?.[activeIndex.value] ?? props.disabledDate)
    const currentTimeRules = computed(() => props.rangeDisabledTime?.[activeIndex.value] ?? props.disabledTime)
    const datePickerBindingProps = computed(() => ({
      ...dateRangeCalendarOptions(props.datePickerProps),
      presentation: 'calendar' as const,
      dayStartOfWeek: props.dayStartOfWeek,
      abbreviation: props.abbreviation,
    }))
    const pickerBindingProps = computed(() => dateWheelOptions(props.pickerProps))
    const dateType = computed(() => (props.showTime ? 'date' : props.type))
    const dateFieldIndexes = computed(() => dateWheelFieldIndexes(props.dateFields, dateType.value))
    const dateColumnLabels = computed(() => {
      const labels = [
        translate('datePickerColumnYear'),
        translate('datePickerColumnMonth'),
        translate('datePickerColumnDay'),
      ]
      return dateFieldIndexes.value.map((index) => labels[index])
    })
    const datePickerValue = computed(() => {
      const parts = parseDateParts(currentValue.value, dateType.value)
      return dateFieldIndexes.value.map((index) => parts[index])
    })
    const allDateColumns = computed(() =>
      buildDateOrDateTimeColumns({
        type: dateType.value,
        showTime: false,
        current: currentValue.value,
        min: props.min,
        max: props.max,
        disabledDate: currentDisabledDate.value,
      }),
    )
    const dateColumns = computed(() => dateFieldIndexes.value.map((index) => allDateColumns.value[index]))
    const timeFieldIndexes = computed(() => pickerFieldIndexes(props.timeFields, timeFields, [0, 1, 2]))
    const customTimeFields = computed(() => props.timeFields !== undefined)
    const timeColumnLabels = computed(() => {
      const labels = [
        translate('datePickerColumnHour'),
        translate('datePickerColumnMinute'),
        translate('datePickerColumnSecond'),
      ]
      return timeFieldIndexes.value.map((index) => labels[index])
    })
    const timePickerValue = computed(() => {
      const parts = parseTimeParts(currentDisplay.value.time, true)
      return timeFieldIndexes.value.map((index) => parts[index])
    })
    const timeColumns = computed(() => {
      const rules = currentTimeRules.value
      const values = parseTimeParts(currentDisplay.value.time, true)
      const columns = buildTimeOnlyColumns(true, {
        hours: rules?.hours,
        minutes: (minute) => Boolean(rules?.minutes?.(minute, Number(values[0]))),
        seconds: (second) => Boolean(rules?.seconds?.(second, Number(values[0]), Number(values[1]))),
      })
      return timeFieldIndexes.value.map((index) => columns[index])
    })
    const {
      options: quickTimeOptions,
      columns: quickTimeColumns,
      value: quickTimeValue,
    } = useQuickTime(
      computed(() => currentDisplay.value.time),
      currentTimeRules,
    )
    function emitPickerViewport(value: string | string[]) {
      // The inner calendar emits dates; the range owner validates datetime viewports.
      // Adapt navigation only, leaving the selected endpoints and their times untouched.
      const viewport = (date: string) =>
        props.showTime && /^\d{4}-\d{2}-\d{2}$/.test(date) ? combineDateAndTime(date, '00:00:00', true) : date
      // Endpoint editors emit one visible date, while the range owner requires a viewport pair.
      const values = Array.isArray(value)
        ? value
        : [
            value,
            dayjs(value)
              .add(1, props.type === 'year' ? 'year' : 'month')
              .format(props.type === 'year' ? 'YYYY' : props.type === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'),
          ]
      emit('update:pickerValue', values.map(viewport))
    }
    function navigateToEndpoint() {
      if (resolvedPresentation.value === 'picker' || !endpointValues.value[activeIndex.value]) {
        return
      }
      calendar.value?.showDateSummary()
      const unit = props.type === 'date' || props.showTime ? 'month' : 'year'
      const date = dayjs(currentDisplay.value.date).startOf(unit)
      const format = props.showTime
        ? 'YYYY-MM-DD HH:mm:ss'
        : props.type === 'year'
          ? 'YYYY'
          : props.type === 'month'
            ? 'YYYY-MM'
            : 'YYYY-MM-DD'
      emitPickerViewport([date.format(format), date.add(1, unit).format(format)])
    }
    function selectEndpoint(index: number) {
      if (quick) {
        quick.open.value = false
      }
      activeIndex.value = index === 1 ? 1 : 0
      if (focusKind.value === 'date') {
        navigateToEndpoint()
      }
    }
    function selectView(kind: 'date' | 'time') {
      focusKind.value = kind
      if (kind === 'date') {
        navigateToEndpoint()
      }
    }
    function updateEndpoint(value: string) {
      if (props.readonly || currentLocked.value) {
        return
      }
      const next = [...endpointValues.value]
      next[activeIndex.value] = value

      if (disabledParts().some((locked, index) => locked && next[index] !== endpointValues.value[index])) {
        return
      }
      emit('update:modelValue', next)
      emit('change', next)
    }
    function handleViewportEndpoint(date: string | string[]) {
      if (typeof date === 'string') {
        handleCalendarEndpoint(date)
      }
    }
    function handleCalendarEndpoint(date: string) {
      if (currentDisabledDate.value?.(date)) {
        return
      }
      updateEndpoint(props.showTime ? combineDateAndTime(date, currentDisplay.value.time, true) : date)
    }
    function handleDatePickerChange(values: (string | number)[]) {
      const parts = mergeDateWheelFields(
        parseDateParts(currentValue.value, dateType.value),
        dateFieldIndexes.value,
        values,
      )
      handleCalendarEndpoint(joinDateParts(parts, dateType.value))
    }
    function handleTimePickerChange(values: (string | number)[]) {
      updateEndpoint(
        combineDateAndTime(
          currentDisplay.value.date,
          joinTimeParts(
            mergePickerFields(parseTimeParts(currentDisplay.value.time, true), timeFieldIndexes.value, values),
            true,
          ),
          true,
        ),
      )
    }
    function handleQuickTimeChange(values: (string | number)[]) {
      const time = String(values[0])
      if (!quickTimeOptions.value.some((option) => option.value === time)) {
        return
      }
      handleTimePickerChange([...time.split(':'), '00'])
    }
    return {
      onColumnsKeydown: (event: KeyboardEvent) => navigateTemporalColumns(event, '.mp-picker__column[role=listbox]'),
      n,
      quick,
      classes,
      formatElevation,
      translate,
      activeIndex,
      currentLocked,
      disabledParts,
      focusKind,
      calendar,
      summaryId,
      summaryDisplays,
      summaryLabels,
      resolvedPresentation,
      calendarValues,
      currentDisabledDate,
      datePickerBindingProps,
      pickerBindingProps,
      dateColumnLabels,
      dateColumns,
      datePickerValue,
      timeColumnLabels,
      customTimeFields,
      timeColumns,
      timePickerValue,
      quickTimeOptions,
      quickTimeColumns,
      quickTimeValue,
      emitPickerViewport,
      selectEndpoint,
      selectView,
      handleCalendarEndpoint,
      handleViewportEndpoint,
      handleDatePickerChange,
      handleTimePickerChange,
      handleQuickTimeChange,
    }
  },
})
</script>
