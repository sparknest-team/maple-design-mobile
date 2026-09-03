<template>
  <div
    :class="
      classes(n(), formatElevation(elevation, 2), [showTime, n('--with-time')], [isCalendarTime, n('--calendar-time')])
    "
  >
    <template v-if="isPickerPresentation">
      <div v-if="showTime" :class="n('datetime-title')">
        <div :class="n('datetime-hint')">{{ hint ?? (pt ? pt : t)('datePickerHint') }}</div>
        <div :class="n('datetime-display')">
          <div :class="n('datetime-date')">{{ displayDateTimeParts.date }}</div>
          <div :class="n('datetime-time')">{{ displayDateTimeParts.time }}</div>
        </div>
      </div>
      <div :class="n('column-labels')">
        <div v-for="label in dateTimeColumnLabels" :key="label" :class="n('column-label')">
          {{ label }}
        </div>
      </div>
      <mp-picker
        :toolbar="false"
        :columns="dateTimeColumns"
        :model-value="dateTimePickerValue"
        @change="handleDateTimePickerChange"
      />
    </template>
    <template v-else>
      <div
        v-if="isCalendarTime"
        :class="classes(n('datetime-title'), [datetimeView === 'date', n('datetime-title--active')])"
        @click="datetimeView = 'date'"
      >
        <div :class="n('datetime-hint')">{{ hint ?? (pt ? pt : t)('datePickerHint') }}</div>
        <div :class="n('datetime-display')">
          <div :class="n('datetime-date')">{{ displayDateTimeParts.date }}</div>
        </div>
      </div>
      <div v-else :class="n('title')" :style="{ background: titleColor || color }">
        <div :class="n('title-select')">
          <div :class="n('title-hint')">{{ hint ?? (pt ? pt : t)('datePickerHint') }}</div>
          <div
            v-if="type !== 'year'"
            :class="classes(n('title-year'), [isYearPanel, n('title-year--active')])"
            @click="clickEl('year')"
          >
            <slot name="year" :year="chooseYear">
              {{ chooseYear }}
            </slot>
          </div>
        </div>

        <div
          :class="
            classes(
              n('title-date'),
              [!isYearPanel || type === 'year', n('title-date--active')],
              [range, n('title-date--range')],
            )
          "
          @click="clickEl('date')"
        >
          <transition :name="multiple ? '' : `${n()}${reverse ? '-reverse' : ''}-translatey`">
            <div v-if="type === 'year'" :key="`${chooseYear}`">
              <slot v-if="range" name="range" :choose="getChoose.chooseRangeYear">
                {{ getYearTitle }}
              </slot>
              <slot v-else-if="multiple" name="multiple" :choose="getChoose.chooseYears">
                {{ getYearTitle }}
              </slot>
              <slot v-else name="year" :year="chooseYear">
                {{ getYearTitle }}
              </slot>
            </div>
            <div v-else-if="type === 'month'" :key="`${chooseYear}${chooseMonth}`">
              <slot v-if="range" name="range" :choose="getChoose.chooseRangeMonth">
                {{ getMonthTitle }}
              </slot>
              <slot v-else-if="multiple" name="multiple" :choose="getChoose.chooseMonths">
                {{ getMonthTitle }}
              </slot>
              <slot v-else name="month" :month="chooseMonth" :year="chooseYear">
                {{ getMonthTitle }}
              </slot>
            </div>
            <div v-else :key="`${chooseYear}${chooseMonth}${chooseDay}`">
              <slot v-if="range" name="range" :choose="formatRange">
                {{ getDateTitle }}
              </slot>
              <slot v-else-if="multiple" name="multiple" :choose="getChoose.chooseDays">
                {{ getDateTitle }}
              </slot>
              <slot v-else name="date" v-bind="slotProps">
                {{ getDateTitle }}
              </slot>
            </div>
          </transition>
        </div>
      </div>
      <div
        v-show="!isCalendarTime || datetimeView === 'date'"
        :class="n('body')"
        @touchstart="handleTouchstart"
        @touchmove="handleTouchmove"
        @touchend="handleTouchend"
      >
        <transition :name="`${n()}-panel-fade`">
          <year-picker-panel
            v-if="getPanelType === 'year'"
            ref="yearPanelEl"
            :choose="getChoose"
            :current="currentDate"
            :component-props="componentProps"
            :preview="previewYear"
            @choose-year="getChooseYear"
          />
          <month-picker-panel
            v-else-if="getPanelType === 'month'"
            ref="monthPanelEl"
            :current="currentDate"
            :choose="getChoose"
            :preview="getPreview"
            :click-year="() => clickEl('year')"
            :component-props="componentProps"
            @choose-month="getChooseMonth"
            @check-preview="checkPreview"
          />
          <day-picker-panel
            v-else-if="getPanelType === 'date'"
            ref="dayPanelEl"
            :current="currentDate"
            :choose="getChoose"
            :preview="getPreview"
            :component-props="componentProps"
            :click-month="() => clickEl('month')"
            @choose-day="getChooseDay"
            @check-preview="checkPreview"
          />
        </transition>
      </div>
      <div v-if="resolvedPresentation === 'calendarClock' && datetimeView === 'time'" :class="n('datetime-clock')">
        <mp-time-picker
          :model-value="displayDateTimeParts.time"
          v-bind="timePickerBindingProps"
          format="24hr"
          :use-seconds="useSeconds"
          :disabled-time="disabledTime"
          :readonly="readonly"
          :elevation="false"
          @update:model-value="handleDateTimeClockChange"
        />
      </div>
      <template v-if="resolvedPresentation === 'calendarPicker' && datetimeView === 'time'">
        <div :class="n('column-labels')">
          <div v-for="label in timeOnlyColumnLabels" :key="label" :class="n('column-label')">
            {{ label }}
          </div>
        </div>
        <mp-picker
          :toolbar="false"
          :columns="timeOnlyColumns"
          :model-value="timeOnlyPickerValue"
          @change="handleTimeOnlyPickerChange"
        />
      </template>
      <div v-if="isCalendarTime" :class="n('view-tabs')">
        <div
          :class="classes(n('view-tab'), [datetimeView === 'time', n('view-tab--active')])"
          @click="datetimeView = 'time'"
        >
          <span :class="n('view-tab-text')">{{ displayDateTimeParts.time }}</span>
        </div>
      </div>
    </template>
    <div v-if="$slots.actions" :class="n('actions')">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type RendererNode } from 'vue'
import { call, doubleRaf, error, isArray, toNumber } from '@maplejs/maple-shared'
import dayjs from 'dayjs/esm/index.js'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../picker'
import MpTimePicker from '../time/TimePicker.vue'
import { createNamespace, formatElevation } from '../utils/components'
import { padStart } from '../utils/shared'
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
} from './datetime'
import DayPickerPanel from './picker-panels/day-picker-panel.vue'
import MonthPickerPanel from './picker-panels/month-picker-panel.vue'
import YearPickerPanel from './picker-panels/year-picker-panel.vue'
import {
  MONTH_LIST,
  props,
  WEEK_HEADER,
  type Choose,
  type ComponentProps,
  type Month,
  type Preview,
  type TouchDirection,
  type Week,
} from './picker-props'

const { name, n, classes } = createNamespace('date-picker')

export default defineComponent({
  name,
  components: {
    MonthPickerPanel,
    YearPickerPanel,
    DayPickerPanel,
    MpPicker,
    MpTimePicker,
  },
  props,
  emits: ['change', 'update:modelValue', 'preview'],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const datetimeView = ref<'date' | 'time'>('date')
    const currentDate = dayjs().format('YYYY-MM-D')
    const [currentYear, currentMonth] = currentDate.split('-')
    const monthDes = MONTH_LIST.find((month) => month === currentMonth) as Month
    const isYearPanel = ref(false)
    const isMonthPanel = ref(false)
    const rangeDone = ref(true)
    const chooseMonth = ref<Month | undefined>()
    const chooseYear = ref<string | undefined>()
    const chooseDay = ref<string | undefined>()
    const previewMonth = ref<Month>(monthDes)
    const previewYear = ref(currentYear)
    const reverse = ref(false)
    const chooseYears = ref<string[]>([])
    const chooseMonths = ref<string[]>([])
    const chooseDays = ref<string[]>([])
    const chooseRangeYear = ref<string[]>([])
    const chooseRangeMonth = ref<string[]>([])
    const chooseRangeDay = ref<string[]>([])
    const yearPanelEl = ref<RendererNode | null>(null)
    const monthPanelEl = ref<RendererNode | null>(null)
    const dayPanelEl = ref<RendererNode | null>(null)
    const componentProps = computed<ComponentProps>(() => ({
      disabledDate: props.disabledDate,
      type: props.type,
      color: props.color,
      firstDayOfWeek: props.firstDayOfWeek,
      min: props.min,
      max: props.max,
      showCurrent: props.showCurrent,
      multiple: props.multiple,
      range: props.range,
      buttonElevation: props.buttonElevation,
    }))
    const getChoose = computed<Choose>(() => ({
      chooseMonth: chooseMonth.value,
      chooseYear: chooseYear.value,
      chooseDay: chooseDay.value,
      chooseYears: chooseYears.value,
      chooseMonths: chooseMonths.value,
      chooseDays: chooseDays.value,
      chooseRangeYear: chooseRangeYear.value,
      chooseRangeMonth: chooseRangeMonth.value,
      chooseRangeDay: chooseRangeDay.value,
    }))
    const getPreview = computed<Preview>(() => ({
      previewMonth: previewMonth.value,
      previewYear: previewYear.value,
    }))

    const getYearTitle = computed<string>(() => {
      const { multiple, range } = props

      if (range) {
        return chooseRangeYear.value.length ? `${chooseRangeYear.value[0]} ~ ${chooseRangeYear.value[1]}` : ''
      }

      return multiple ? `${chooseYears.value.length}${(pt || t)('datePickerSelected')}` : (chooseYear.value ?? '')
    })

    const getMonthTitle = computed<string>(() => {
      const { multiple, range } = props

      if (range) {
        return chooseRangeMonth.value.length ? `${chooseRangeMonth.value[0]} ~ ${chooseRangeMonth.value[1]}` : ''
      }

      let monthName = ''
      if (chooseMonth.value) {
        monthName = (pt || t)('datePickerMonthDict')?.[chooseMonth.value].name ?? ''
      }
      return multiple ? `${chooseMonths.value.length}${(pt || t)('datePickerSelected')}` : monthName
    })

    const getDateTitle = computed<string>(() => {
      const { multiple, range } = props

      if (range) {
        const formatRangeDays = chooseRangeDay.value.map((date) => dayjs(date).format('YYYY-MM-DD'))

        return formatRangeDays.length ? `${formatRangeDays[0]} ~ ${formatRangeDays[1]}` : ''
      }

      if (multiple) {
        return `${chooseDays.value.length}${(pt || t)('datePickerSelected')}`
      }

      if (!chooseYear.value || !chooseMonth.value || !chooseDay.value) {
        return ''
      }
      const weekIndex = dayjs(`${chooseYear.value}-${chooseMonth.value}-${chooseDay.value}`).day()
      const week: Week = WEEK_HEADER.find((value) => value === `${weekIndex}`) as Week
      const weekName = (pt || t)('datePickerWeekDict')?.[week].name ?? ''

      const monthName = (pt || t)('datePickerMonthDict')?.[chooseMonth.value].name ?? ''
      const showDay = padStart(chooseDay.value, 2, '0')

      if ((pt || t)('lang') === 'zh-CN') {
        return `${chooseMonth.value}-${showDay} ${weekName.slice(0, 3)}`
      }
      return `${weekName.slice(0, 3)}, ${monthName.slice(0, 3)} ${chooseDay.value}`
    })
    const getPanelType = computed<string>(() => {
      if (props.type === 'year' || isYearPanel.value) {
        return 'year'
      }

      if (props.type === 'month' || isMonthPanel.value) {
        return 'month'
      }

      if (props.type === 'date') {
        return 'date'
      }

      return ''
    })
    const isUntouchable = computed(() => !props.touchable || !getPanelType.value)
    const slotProps = computed<Record<string, string>>(() => {
      const weekIndex = dayjs(`${chooseYear.value}-${chooseMonth.value}-${chooseDay.value}`).day()
      const date = chooseDay.value ? padStart(chooseDay.value, 2, '0') : ''

      return {
        week: `${weekIndex}`,
        year: chooseYear.value ?? '',
        month: chooseMonth.value ?? '',
        date,
      }
    })
    const formatRange = computed<string[]>(() =>
      getChoose.value.chooseRangeDay.map((choose) => dayjs(choose).format('YYYY-MM-DD')),
    )
    const isSameYear = computed(() => chooseYear.value === previewYear.value)
    const isSameMonth = computed(() => chooseMonth.value === previewMonth.value)

    let startX = 0
    let startY = 0
    let checkType = ''
    let touchDirection: TouchDirection | undefined

    watch(
      () => props.modelValue,
      (value) => {
        if (!checkValue() || invalidFormatDate(value)) {
          return
        }

        if (props.range) {
          if (!isArray(value)) {
            return
          }

          rangeDone.value = value.length !== 1
          rangeInit(value, props.type)
        } else if (props.multiple) {
          if (!isArray(value)) {
            return
          }

          multipleInit(value, props.type)
        } else {
          dateInit(value as string)
        }
      },
      { immediate: true },
    )

    watch(getPanelType, resetState)

    function clickEl(type: string) {
      if (type === 'year') {
        isYearPanel.value = true
      } else if (type === 'month') {
        isMonthPanel.value = true
      } else {
        isYearPanel.value = false
        isMonthPanel.value = false
      }
    }

    function handleTouchstart(event: TouchEvent) {
      if (isUntouchable.value) {
        return
      }

      const { clientX, clientY } = event.touches[0]
      startX = clientX
      startY = clientY
    }

    function getDirection(x: number, y: number): TouchDirection {
      return x >= y && x > 20 ? 'x' : 'y'
    }

    function handleTouchmove(event: TouchEvent) {
      if (isUntouchable.value) {
        return
      }

      const { clientX, clientY } = event.touches[0]
      const x = clientX - startX
      const y = clientY - startY

      touchDirection = getDirection(Math.abs(x), Math.abs(y))
      checkType = x > 0 ? 'prev' : 'next'
    }

    async function handleTouchend() {
      if (isUntouchable.value || touchDirection !== 'x') {
        return
      }

      const componentRef =
        getPanelType.value === 'year' ? yearPanelEl : getPanelType.value === 'month' ? monthPanelEl : dayPanelEl
      await doubleRaf()
      componentRef.value!.forwardRef(checkType)
      resetState()
    }

    function updateRange(date: string, type: string) {
      const rangeDate = type === 'year' ? chooseRangeYear : type === 'month' ? chooseRangeMonth : chooseRangeDay
      rangeDate.value = rangeDone.value ? [date, date] : [rangeDate.value[0], date]
      rangeDone.value = !rangeDone.value

      if (rangeDone.value) {
        const isChangeOrder = dayjs(rangeDate.value[0]).isAfter(rangeDate.value[1])
        const date = isChangeOrder ? [rangeDate.value[1], rangeDate.value[0]] : [...rangeDate.value]

        emit('update:modelValue', date)
        emit('change', date)
      }
    }

    function updateMultiple(date: string, type: string) {
      const multipleDates = type === 'year' ? chooseYears : type === 'month' ? chooseMonths : chooseDays
      const formatType = type === 'year' ? 'YYYY' : type === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'
      const formatDates = multipleDates.value.map((date) => dayjs(date).format(formatType))

      const index = formatDates.findIndex((choose) => choose === date)

      if (index === -1) {
        formatDates.push(date)
      } else {
        formatDates.splice(index, 1)
      }

      emit('update:modelValue', formatDates)
      emit('change', formatDates)
    }

    function getReverse(dateType: string, date: Month | number) {
      if (!chooseYear.value || !chooseMonth.value) {
        return false
      }
      if (!isSameYear.value) {
        return chooseYear.value > previewYear.value
      }

      if (dateType === 'year') {
        return (date as number) < toNumber(chooseYear.value)
      }

      if (dateType === 'month') {
        return (date as Month) < chooseMonth.value
      }

      return isSameMonth.value ? (date as number) < toNumber(chooseDay.value) : chooseMonth.value > previewMonth.value
    }

    function getChooseDay(day: number) {
      const { readonly, range, multiple, showTime } = props
      if (day < 0 || readonly) {
        return
      }

      reverse.value = getReverse('day', day)

      const date = `${previewYear.value}-${previewMonth.value}-${day}`
      const formatDate = dayjs(date).format('YYYY-MM-DD')

      if (showTime && !range && !multiple) {
        const next = combineDateAndTime(formatDate, displayDateTimeParts.value.time, props.useSeconds)
        emit('update:modelValue', next)
        emit('change', next)
        return
      }

      if (range) {
        updateRange(formatDate, 'day')
      } else if (multiple) {
        updateMultiple(formatDate, 'day')
      } else {
        emit('update:modelValue', formatDate)
        emit('change', formatDate)
      }
    }

    function getChooseMonth(month: Month) {
      const { type, readonly, range, multiple } = props
      reverse.value = getReverse('month', month)

      if (type === 'month' && !readonly) {
        const date = `${previewYear.value}-${month}`

        if (range) {
          updateRange(date, 'month')
        } else if (multiple) {
          updateMultiple(date, 'month')
        } else {
          emit('update:modelValue', date)
          emit('change', date)
        }
      } else {
        previewMonth.value = month
        emit(
          'preview',
          toNumber(previewYear.value),
          toNumber(previewMonth.value),
          type === 'date' ? toNumber(chooseDay.value) : undefined,
        )
      }

      isMonthPanel.value = false
    }

    function getChooseYear(year: number) {
      const { type, readonly, range, multiple } = props
      reverse.value = getReverse('year', year)

      if (type === 'year' && !readonly) {
        if (range) {
          updateRange(`${year}`, 'year')
        } else if (multiple) {
          updateMultiple(`${year}`, 'year')
        } else {
          emit('update:modelValue', `${year}`)
          emit('change', `${year}`)
        }
      } else {
        previewYear.value = `${year}`
        emit(
          'preview',
          toNumber(previewYear.value),
          toNumber(previewMonth.value),
          type === 'date' ? toNumber(chooseDay.value) : undefined,
        )
      }

      isYearPanel.value = false
    }

    function checkPreview(type: string, checkType: string) {
      const changeValue = checkType === 'prev' ? -1 : 1

      if (type === 'year') {
        previewYear.value = `${toNumber(previewYear.value) + changeValue}`
      } else {
        let checkIndex = toNumber(previewMonth.value) + changeValue

        if (checkIndex < 1) {
          previewYear.value = `${toNumber(previewYear.value) - 1}`
          checkIndex = 12
        }

        if (checkIndex > 12) {
          previewYear.value = `${toNumber(previewYear.value) + 1}`
          checkIndex = 1
        }

        previewMonth.value = MONTH_LIST.find((month) => toNumber(month) === checkIndex) as Month
      }

      call(
        (...args: any[]) => emit('preview', ...args),
        toNumber(previewYear.value),
        toNumber(previewMonth.value),
        props.type === 'date' ? toNumber(chooseDay.value) : undefined,
      )
    }

    function checkValue() {
      if ((props.multiple || props.range) && !isArray(props.modelValue)) {
        error('DatePicker', 'type of prop "modelValue" should be an Array')
        return false
      }

      if (!props.multiple && !props.range && isArray(props.modelValue)) {
        error('DatePicker', 'type of prop "modelValue" should be a String')
        return false
      }

      return true
    }

    function invalidFormatDate(date: string | Array<string> | undefined): boolean {
      if (isArray(date)) {
        return false
      }

      if (date === 'Invalid Date') {
        error('DatePicker', '"modelValue" is an Invalid Date')
        return true
      }

      return false
    }

    function rangeInit(value: Array<string>, type: string) {
      const rangeDate = type === 'year' ? chooseRangeYear : type === 'month' ? chooseRangeMonth : chooseRangeDay
      const formatType = type === 'year' ? 'YYYY' : type === 'month' ? 'YYYY-MM' : 'YYYY-MM-D'
      const formatDateList = value.map((choose) => dayjs(choose).format(formatType)).slice(0, 2)

      const isValid = rangeDate.value.some((date) => invalidFormatDate(date))
      if (isValid) {
        return
      }

      rangeDate.value = formatDateList

      const isChangeOrder = dayjs(rangeDate.value[0]).isAfter(rangeDate.value[1])

      if (rangeDate.value.length === 2 && isChangeOrder) {
        rangeDate.value = [rangeDate.value[1], rangeDate.value[0]]
      }
    }

    function multipleInit(value: Array<string>, type: string) {
      const rangeDate = type === 'year' ? chooseYears : type === 'month' ? chooseMonths : chooseDays
      const formatType = type === 'year' ? 'YYYY' : type === 'month' ? 'YYYY-MM' : 'YYYY-MM-D'

      // need uniq
      const formatDateList = Array.from(new Set(value.map((choose) => dayjs(choose).format(formatType))))
      rangeDate.value = formatDateList.filter((date) => date !== 'Invalid Date')
    }

    function dateInit(value: string | undefined) {
      const handleValue = value ? dayjs(value) : dayjs()
      const formatDate = handleValue.format('YYYY-MM-D')

      if (invalidFormatDate(formatDate)) {
        return
      }

      const [yearValue, monthValue, dayValue] = formatDate.split('-')

      const monthDes: Month = MONTH_LIST.find((month) => month === monthValue) as Month

      chooseMonth.value = monthDes
      chooseYear.value = yearValue
      chooseDay.value = dayValue
      previewMonth.value = monthDes
      previewYear.value = yearValue
    }

    function resetState() {
      startY = 0
      startX = 0
      checkType = ''
      touchDirection = undefined
    }

    const displayDateTime = computed(() => {
      if (typeof props.modelValue === 'string' && props.modelValue) {
        return props.modelValue
      }
      return defaultDateTime(props.useSeconds)
    })

    const displayDateTimeParts = computed(() => splitDateTimeDisplay(displayDateTime.value, props.useSeconds))

    const resolvedPresentation = computed(() => resolveDateTimePresentation(props.presentation, props.showTime))
    const isCalendarTime = computed(() => isCalendarTimePresentation(resolvedPresentation.value))
    const isPickerPresentation = computed(
      () => resolvedPresentation.value === 'picker' && !props.multiple && !props.range,
    )

    const dateTimeColumnLabels = computed(() => {
      const translate = (key: string) => (pt ? pt : t)(key as any)
      const dateLabels = [
        translate('datePickerColumnYear'),
        translate('datePickerColumnMonth'),
        translate('datePickerColumnDay'),
      ]

      if (!props.showTime) {
        return dateLabels.slice(0, props.type === 'year' ? 1 : props.type === 'month' ? 2 : 3)
      }

      const labels = [...dateLabels, translate('datePickerColumnHour'), translate('datePickerColumnMinute')]
      if (props.useSeconds) {
        labels.push(translate('datePickerColumnSecond'))
      }
      return labels
    })

    const timeOnlyColumnLabels = computed(() => {
      const translate = (key: string) => (pt ? pt : t)(key as any)
      const labels = [translate('datePickerColumnHour'), translate('datePickerColumnMinute')]
      if (props.useSeconds) {
        labels.push(translate('datePickerColumnSecond'))
      }
      return labels
    })

    const dateTimeColumns = computed(() =>
      buildDateOrDateTimeColumns({
        type: props.type,
        showTime: props.showTime,
        useSeconds: props.useSeconds,
        min: props.min,
        max: props.max,
        disabledDate: props.disabledDate,
        disabledTime: props.disabledTime,
        current: displayDateTime.value,
      }),
    )

    const timeOnlyColumns = computed(() => buildTimeOnlyColumns(props.useSeconds, props.disabledTime))

    const dateTimePickerValue = computed(() =>
      props.showTime
        ? parseDateTimeParts(displayDateTime.value, props.useSeconds)
        : parseDateParts(
            typeof props.modelValue === 'string' && props.modelValue ? props.modelValue : defaultDate(props.type),
            props.type,
          ),
    )
    const timeOnlyPickerValue = computed(() => parseTimeParts(displayDateTimeParts.value.time, props.useSeconds))

    const timePickerBindingProps = computed(() => ({ ...props.timePickerProps }))

    function handleDateTimePickerChange(values: (string | number)[]) {
      if (props.readonly) {
        return
      }
      const next = props.showTime ? joinDateTimeParts(values, props.useSeconds) : joinDateParts(values, props.type)
      emit('update:modelValue', next)
      emit('change', next)
    }

    function handleTimeOnlyPickerChange(values: (string | number)[]) {
      if (props.readonly) {
        return
      }
      const time = joinTimeParts(values, props.useSeconds)
      const next = combineDateAndTime(displayDateTimeParts.value.date, time, props.useSeconds)
      emit('update:modelValue', next)
      emit('change', next)
    }

    function handleDateTimeClockChange(time: string) {
      if (props.readonly) {
        return
      }
      const next = combineDateAndTime(displayDateTimeParts.value.date, time, props.useSeconds)
      emit('update:modelValue', next)
      emit('change', next)
    }

    return {
      yearPanelEl,
      monthPanelEl,
      dayPanelEl,
      reverse,
      currentDate,
      chooseMonth,
      chooseYear,
      chooseDay,
      previewYear,
      isYearPanel,
      isMonthPanel,
      getMonthTitle,
      getDateTitle,
      getYearTitle,
      getPanelType,
      getChoose,
      getPreview,
      componentProps,
      slotProps,
      formatRange,
      datetimeView,
      resolvedPresentation,
      isPickerPresentation,
      isCalendarTime,
      displayDateTimeParts,
      dateTimeColumnLabels,
      timeOnlyColumnLabels,
      dateTimeColumns,
      timeOnlyColumns,
      dateTimePickerValue,
      timeOnlyPickerValue,
      timePickerBindingProps,
      handleDateTimePickerChange,
      handleTimeOnlyPickerChange,
      handleDateTimeClockChange,
      pt,
      t,
      n,
      classes,
      clickEl,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      getChooseDay,
      getChooseMonth,
      getChooseYear,
      checkPreview,
      formatElevation,
    }
  },
})
</script>
