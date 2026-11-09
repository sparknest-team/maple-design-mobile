<template>
  <div
    :class="
      classes(n(), formatElevation(elevation, 2), [showTime, n('--with-time')], [isCalendarTime, n('--calendar-time')])
    "
    @keydown="onColumnsKeydown"
  >
    <div
      :class="
        classes(n('editor'), [showTime && !range && !multiple && datetimeView === 'date', n('editor--with-time')])
      "
    >
      <div :class="n('editor-main')">
        <template v-if="isPickerPresentation">
          <div :class="n('column-labels')">
            <div v-for="label in dateTimeColumnLabels" :key="label" :class="n('column-label')">
              {{ label }}
            </div>
          </div>
          <mp-picker
            v-bind="pickerBindingProps"
            :toolbar="false"
            :disabled="readonly"
            :columns="dateTimeColumns"
            :model-value="dateTimePickerValue"
            @change="handleDateTimePickerChange"
          />
        </template>
        <template v-else>
          <div
            v-if="!isCalendarTime && (range || multiple || $slots.date || $slots.month || $slots.year)"
            :class="n('title')"
            :style="{ background: titleColor || color }"
          >
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
              v-if="range || multiple || $slots.date || $slots.month || $slots.year"
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
            :class="classes(n('body'), [interactiveMode !== 'page', n('body--viewport')])"
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
                :range-pending="range && rangeEndpoint === undefined && !rangeDone"
                :readonly="readonly"
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
                :range-pending="range && rangeEndpoint === undefined && !rangeDone"
                :readonly="readonly"
                @choose-month="getChooseMonth"
                @check-preview="checkPreview"
              />
              <CalendarViewport
                v-else-if="getPanelType === 'date' && interactiveMode !== 'page'"
                :locale="calendarLocale"
                :mode="interactiveMode"
                :use-virtual-scroll="useVirtualScroll"
                :model-value="modelValue"
                :picker-value="pickerValue"
                :min="min"
                :max="max"
                :readonly="readonly"
                :multiple="multiple"
                :range="range"
                :range-endpoint="rangeEndpoint"
                :day-start-of-week="dayStartOfWeek"
                :today="currentDate"
                :show-current="showCurrent"
                :disabled-date="disabledDate"
                @select="handleViewportSelect"
                @navigate="handleViewportNavigate"
              />
              <day-picker-panel
                v-else-if="getPanelType === 'date'"
                ref="dayPanelEl"
                :current="currentDate"
                :choose="getChoose"
                :preview="getPreview"
                :component-props="componentProps"
                :range-pending="range && rangeEndpoint === undefined && !rangeDone"
                :readonly="readonly"
                :click-month="() => clickEl('month')"
                @choose-day="getChooseDay"
                @check-preview="checkPreview"
              />
            </transition>
          </div>
          <div
            v-if="resolvedPresentation === 'calendarPicker' && datetimeView === 'time'"
            :class="n('datetime-picker')"
          >
            <div :class="n('column-labels')">
              <div v-for="label in timeOnlyColumnLabels" :key="label" :class="n('column-label')">
                {{ label }}
              </div>
            </div>
            <mp-picker
              v-bind="pickerBindingProps"
              :toolbar="false"
              :disabled="readonly"
              :columns="timeOnlyColumns"
              :model-value="timeOnlyPickerValue"
              @change="handleTimeOnlyPickerChange"
            />
          </div>
        </template>
      </div>
      <div
        v-if="showTime && !range && !multiple && datetimeView === 'date'"
        :class="[n('quick-time'), customTimeFields && n('quick-time--fields')]"
      >
        <div v-if="customTimeFields" :class="n('column-labels')">
          <span v-for="label in timeOnlyColumnLabels" :key="label" :class="n('column-label')">{{ label }}</span>
        </div>
        <mp-picker
          :class="n('quick-time-wheel')"
          v-bind="pickerBindingProps"
          :toolbar="false"
          :title="(pt ?? t)('timePickerHint')"
          :option-count="pickerBindingProps.optionCount ?? 7"
          :disabled="
            readonly || (customTimeFields ? timeOnlyColumns.some((column) => !column.length) : !quickTimeOptions.length)
          "
          :columns="customTimeFields ? timeOnlyColumns : [quickTimeColumns]"
          :model-value="customTimeFields ? timeOnlyPickerValue : quickTimeValue"
          @change="customTimeFields ? handleTimeOnlyPickerChange($event) : handleQuickTimeChange($event)"
        />
      </div>
    </div>
    <TemporalCurrent
      v-if="showTime && !range && !multiple"
      :date="emptyEndpoint ? (pt ?? t)('datePickerHint') : displayDateTimeParts.date"
      :time="
        emptyEndpoint
          ? ''
          : timeFieldIndexes.includes(2)
            ? displayDateTimeParts.time
            : displayDateTimeParts.time.slice(0, 5)
      "
      show-time
      :view="datetimeView"
      @update:view="$event === 'date' ? showDateSummary() : (datetimeView = 'time')"
    />
    <div v-if="$slots.actions" :class="n('actions')">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch, type PropType, type RendererNode } from 'vue'
import { call, doubleRaf, error, isArray, toNumber } from '@maple-design/shared'
import dayjs from 'dayjs'
import { mergePickerFields, pickerFieldIndexes, timeFields } from '../../_components/picker-field/fields'
import { useRangeDisabledParts, useRangeFieldIndex } from '../../_components/picker-field/mobile-range-field-context'
import TemporalCurrent from '../../_components/picker-field/TemporalCurrent.vue'
import { navigateTemporalColumns } from '../../_utils/temporal-keyboard'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { _PickerComponent as MpPicker } from '../../picker'
import MpTimePicker from '../../time/TimePicker.vue'
import { createNamespace, formatElevation } from '../../utils/components'
import { padStart } from '../../utils/shared'
import { useDateCurrent } from '../date-current'
import { dateWheelFieldIndexes, mergeDateWheelFields } from '../date-wheel-fields'
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
} from '../datetime'
import DayPickerPanel from '../picker-panels/DayPickerPanel.vue'
import MonthPickerPanel from '../picker-panels/MonthPickerPanel.vue'
import YearPickerPanel from '../picker-panels/YearPickerPanel.vue'
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
} from '../presentation-props'
import { useQuickTime } from '../quick-time'
import { dateWheelOptions } from '../wheel-options'
import CalendarViewport from './CalendarViewport.vue'

const { name, n, classes } = createNamespace('date-picker')

export default defineComponent({
  name,
  components: {
    MonthPickerPanel,
    YearPickerPanel,
    DayPickerPanel,
    MpPicker,
    CalendarViewport,
    TemporalCurrent,
  },
  props: {
    ...props,
    calendarLocale: String,
    rangeEndpoint: Number as PropType<0 | 1>,
    emptySelection: Boolean,
  },
  emits: ['change', 'update:modelValue', 'preview', 'range-candidate', 'endpoint-candidate', 'update:pickerValue'],
  setup(props, { emit }) {
    const activeIndex = useRangeFieldIndex()
    const disabledParts = useRangeDisabledParts()
    const { t: pt } = injectLocaleProvider()
    const datetimeView = ref<'date' | 'time'>('date')
    const currentDate = computed(() => props.currentDate || dayjs().format('YYYY-MM-D'))
    const [currentYear, currentMonth] = currentDate.value.split('-')
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
    const showCurrent = useDateCurrent(() => props.showCurrent)
    const componentProps = computed<ComponentProps>(() => ({
      disabledDate: props.disabledDate,
      type: props.type,
      color: props.color,
      dayStartOfWeek: props.dayStartOfWeek,
      min: props.min,
      max: props.max,
      abbreviation: props.abbreviation,
      showCurrent: showCurrent.value,
      multiple: props.multiple,
      range: props.range && props.rangeEndpoint === undefined,
      buttonElevation: props.buttonElevation,
    }))
    const emptyEndpoint = computed(
      () =>
        props.emptySelection ||
        (!props.range && !props.multiple && !props.modelValue) ||
        (props.rangeEndpoint !== undefined &&
          Array.isArray(props.modelValue) &&
          !props.modelValue[props.rangeEndpoint]),
    )
    const getChoose = computed<Choose>(() => ({
      chooseMonth: emptyEndpoint.value ? undefined : chooseMonth.value,
      chooseYear: emptyEndpoint.value ? undefined : chooseYear.value,
      chooseDay: emptyEndpoint.value ? undefined : chooseDay.value,
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
        return chooseRangeYear.value.length
          ? `${chooseRangeYear.value[0]} ~ ${rangeDone.value ? (chooseRangeYear.value[1] ?? '—') : '—'}`
          : ''
      }

      return multiple ? `${chooseYears.value.length}${(pt || t)('datePickerSelected')}` : (chooseYear.value ?? '')
    })

    const getMonthTitle = computed<string>(() => {
      const { multiple, range } = props

      if (range) {
        return chooseRangeMonth.value.length
          ? `${chooseRangeMonth.value[0]} ~ ${rangeDone.value ? (chooseRangeMonth.value[1] ?? '—') : '—'}`
          : ''
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

        return formatRangeDays.length
          ? `${formatRangeDays[0]} ~ ${rangeDone.value ? (formatRangeDays[1] ?? '—') : '—'}`
          : ''
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
    const isUntouchable = computed(
      () =>
        !props.touchable || !getPanelType.value || (getPanelType.value === 'date' && props.interactiveMode !== 'page'),
    )
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
      // Range adapters create a fresh array on render. An equal model must not
      // erase the first click while the user is choosing the second endpoint.
      [
        () => (isArray(props.modelValue) ? JSON.stringify(props.modelValue) : props.modelValue),
        () => props.rangeEndpoint,
      ],
      () => {
        const value = props.modelValue
        if (!checkValue() || invalidFormatDate(value)) {
          return
        }

        if (props.rangeEndpoint !== undefined && isArray(value)) {
          const viewport = { year: previewYear.value, month: previewMonth.value }
          dateInit(value[props.rangeEndpoint] || undefined)
          previewYear.value = viewport.year
          previewMonth.value = viewport.month
        } else if (props.range) {
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

    function syncPickerViewport() {
      const candidate = Array.isArray(props.pickerValue) ? props.pickerValue[0] : props.pickerValue
      const date = candidate ? dayjs(candidate) : undefined
      if (date?.isValid()) {
        previewYear.value = date.format('YYYY')
        previewMonth.value = date.format('MM') as Month
      }
    }
    watch([() => props.pickerValue, () => props.modelValue], syncPickerViewport, {
      immediate: true,
      deep: true,
      flush: 'post',
    })
    function notifyPickerViewport() {
      const anchor =
        props.type === 'year'
          ? previewYear.value
          : props.type === 'month'
            ? `${previewYear.value}-${previewMonth.value}`
            : `${previewYear.value}-${previewMonth.value}-01${props.showTime ? ' 00:00:00' : ''}`
      const value = Array.isArray(props.pickerValue)
        ? [
            anchor,
            dayjs(anchor)
              .add(1, props.type === 'year' ? 'year' : 'month')
              .format(
                props.type === 'year'
                  ? 'YYYY'
                  : props.type === 'month'
                    ? 'YYYY-MM'
                    : props.showTime
                      ? 'YYYY-MM-DD HH:mm:ss'
                      : 'YYYY-MM-DD',
              ),
          ]
        : anchor
      emit('update:pickerValue', value)
      nextTick(syncPickerViewport)
    }
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

    function showDateSummary() {
      datetimeView.value = 'date'
      clickEl('date')
      // Equal endpoint years do not change preview, so reset the local century page explicitly.
      if (props.type === 'year') {
        yearPanelEl.value?.resetPage()
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
      const locked = disabledParts()
      if (props.rangeEndpoint !== undefined) {
        if (!locked[props.rangeEndpoint]) {
          emit('endpoint-candidate', date)
        }
        return
      }
      if (locked[0] || locked[1]) {
        if (locked[0] && locked[1]) {
          return
        }
        const candidate = Array.isArray(props.modelValue) ? [...props.modelValue] : []
        candidate[locked[0] ? 1 : 0] = date
        emit('range-candidate', candidate)
        emit('update:modelValue', candidate)
        emit('change', candidate)
        return
      }
      const rangeDate = type === 'year' ? chooseRangeYear : type === 'month' ? chooseRangeMonth : chooseRangeDay
      rangeDate.value = rangeDone.value ? [date, date] : [rangeDate.value[0], date]
      rangeDone.value = !rangeDone.value
      activeIndex.value = rangeDone.value ? 0 : 1

      if (!rangeDone.value) {
        const partial = [date]
        emit('range-candidate', partial)
        emit('update:modelValue', partial)
      }
      if (rangeDone.value) {
        emit('range-candidate', [...rangeDate.value])
        const date = [...rangeDate.value]
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

    function handleViewportSelect(value: string | string[]) {
      if (Array.isArray(value)) {
        emit('update:modelValue', value)
        emit('change', value)
        return
      }
      const date = dayjs(value)
      previewYear.value = date.format('YYYY')
      previewMonth.value = date.format('MM') as Month
      getChooseDay(date.date())
    }
    function handleViewportNavigate(value: string | string[]) {
      const viewport = (part: string) => (props.showTime ? combineDateAndTime(part, '00:00:00', true) : part)
      emit('update:pickerValue', Array.isArray(value) ? value.map(viewport) : viewport(value))
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
        const next = combineDateAndTime(formatDate, displayDateTimeParts.value.time, true)
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

      notifyPickerViewport()
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

      notifyPickerViewport()
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

      notifyPickerViewport()
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
      return defaultDateTime(true)
    })

    const displayDateTimeParts = computed(() => splitDateTimeDisplay(displayDateTime.value, true))

    const resolvedPresentation = computed(() => resolveDateTimePresentation(props.presentation, props.showTime))
    const isCalendarTime = computed(() => isCalendarTimePresentation(resolvedPresentation.value))
    const isPickerPresentation = computed(
      () => resolvedPresentation.value === 'picker' && !props.multiple && !props.range,
    )

    const dateFieldIndexes = computed(() =>
      dateWheelFieldIndexes(props.dateFields, props.showTime ? 'date' : props.type),
    )
    const dateTimeColumnLabels = computed(() => {
      const translate = (key: string) => (pt ? pt : t)(key as any)
      const dateLabels = [
        translate('datePickerColumnYear'),
        translate('datePickerColumnMonth'),
        translate('datePickerColumnDay'),
      ]

      if (!props.showTime) {
        return dateFieldIndexes.value.map((index) => dateLabels[index])
      }

      const labels = [...dateLabels, translate('datePickerColumnHour'), translate('datePickerColumnMinute')]
      labels.push(translate('datePickerColumnSecond'))
      return datetimeView.value === 'date'
        ? dateFieldIndexes.value.map((index) => labels[index])
        : timeFieldIndexes.value.map((index) => labels[index + 3])
    })

    const timeFieldIndexes = computed(() => pickerFieldIndexes(props.timeFields, timeFields, [0, 1, 2]))
    const customTimeFields = computed(() => props.timeFields !== undefined)
    const timeOnlyColumnLabels = computed(() => {
      const translate = (key: string) => (pt ? pt : t)(key as any)
      const labels = [translate('datePickerColumnHour'), translate('datePickerColumnMinute')]
      labels.push(translate('datePickerColumnSecond'))
      return timeFieldIndexes.value.map((index) => labels[index])
    })

    const dateTimeColumns = computed(() => {
      const columns = buildDateOrDateTimeColumns({
        type: props.type,
        showTime: props.showTime,
        useSeconds: true,
        min: props.min,
        max: props.max,
        disabledDate: props.disabledDate,
        disabledTime: props.disabledTime,
        current: displayDateTime.value,
      })
      return !props.showTime || datetimeView.value === 'date'
        ? dateFieldIndexes.value.map((index) => columns[index])
        : timeFieldIndexes.value.map((index) => columns[index + 3])
    })

    const timeOnlyColumns = computed(() => {
      const columns = buildTimeOnlyColumns(true, props.disabledTime)
      return timeFieldIndexes.value.map((index) => columns[index])
    })

    const dateTimePickerValue = computed(() => {
      const parts = props.showTime
        ? parseDateTimeParts(displayDateTime.value, true)
        : parseDateParts(
            typeof props.modelValue === 'string' && props.modelValue ? props.modelValue : defaultDate(props.type),
            props.type,
          )
      return props.showTime && datetimeView.value === 'time'
        ? timeFieldIndexes.value.map((index) => parts[index + 3])
        : dateFieldIndexes.value.map((index) => parts[index])
    })
    const timeOnlyPickerValue = computed(() => {
      const parts = parseTimeParts(displayDateTimeParts.value.time, true)
      return timeFieldIndexes.value.map((index) => parts[index])
    })

    const {
      options: quickTimeOptions,
      columns: quickTimeColumns,
      value: quickTimeValue,
    } = useQuickTime(
      computed(() => displayDateTimeParts.value.time),
      computed(() => props.disabledTime),
    )
    function handleQuickTimeChange(values: (string | number)[]) {
      const time = String(values[0])
      if (!quickTimeOptions.value.some((option) => option.value === time)) {
        return
      }
      handleTimeOnlyPickerChange([...time.split(':'), '00'])
    }
    watch(
      () => props.showTime,
      (showTime) => {
        if (!showTime) {
          datetimeView.value = 'date'
        }
      },
    )
    const pickerBindingProps = computed(() => dateWheelOptions(props.pickerProps))

    function handleDateTimePickerChange(values: (string | number)[]) {
      if (props.readonly) {
        return
      }
      const parts = parseDateTimeParts(displayDateTime.value, true)
      const dateParts = mergeDateWheelFields(parts.slice(0, 3), dateFieldIndexes.value, values)
      const next = props.showTime
        ? joinDateTimeParts(
            datetimeView.value === 'date'
              ? [...dateParts, ...parts.slice(3)]
              : [...parts.slice(0, 3), ...mergePickerFields(parts.slice(3), timeFieldIndexes.value, values)],
            true,
          )
        : joinDateParts(dateParts, props.type)
      emit('update:modelValue', next)
      emit('change', next)
    }

    function handleTimeOnlyPickerChange(values: (string | number)[]) {
      if (props.readonly) {
        return
      }
      const time = joinTimeParts(
        mergePickerFields(parseTimeParts(displayDateTimeParts.value.time, true), timeFieldIndexes.value, values),
        true,
      )
      const next = combineDateAndTime(displayDateTimeParts.value.date, time, true)
      emit('update:modelValue', next)
      emit('change', next)
    }

    return {
      onColumnsKeydown: (event: KeyboardEvent) => navigateTemporalColumns(event, '.mp-picker__column[role=listbox]'),
      quickTimeOptions,
      quickTimeColumns,
      quickTimeValue,
      handleQuickTimeChange,
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
      rangeDone,
      slotProps,
      formatRange,
      datetimeView,
      resolvedPresentation,
      isPickerPresentation,
      isCalendarTime,
      displayDateTimeParts,
      emptyEndpoint,
      dateTimeColumnLabels,
      timeOnlyColumnLabels,
      timeFieldIndexes,
      customTimeFields,
      dateTimeColumns,
      timeOnlyColumns,
      dateTimePickerValue,
      timeOnlyPickerValue,
      pickerBindingProps,
      handleDateTimePickerChange,
      handleTimeOnlyPickerChange,
      pt,
      t,
      n,
      classes,
      clickEl,
      showDateSummary,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      getChooseDay,
      handleViewportSelect,
      handleViewportNavigate,
      getChooseMonth,
      getChooseYear,
      checkPreview,
      formatElevation,
    }
  },
})
</script>
