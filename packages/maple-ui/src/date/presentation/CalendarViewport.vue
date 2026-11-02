<template>
  <section
    class="mp-calendar-viewport"
    :data-mode="mode"
    :data-total-months="total"
    :data-rendered-months="months.length"
  >
    <template v-if="mode === 'line'">
      <nav class="mp-calendar-viewport__navigation" aria-label="Calendar navigation">
        <button
          type="button"
          :aria-label="translate('datePickerPreviousWeek')"
          :disabled="weekEnd.subtract(7, 'day').isBefore(minimum, 'day')"
          @click="moveWeek(-1)"
        >
          <IconChevronLeft aria-hidden="true" />
        </button>
        <span class="mp-calendar-viewport__period" aria-live="polite">{{ weekCaption }}</span>
        <button
          type="button"
          :aria-label="translate('datePickerNextWeek')"
          :disabled="weekStart.add(7, 'day').isAfter(maximum, 'day')"
          @click="moveWeek(1)"
        >
          <IconChevronRight aria-hidden="true" />
        </button>
      </nav>
      <div class="mp-calendar-viewport__weekdays" aria-hidden="true">
        <span v-for="day in week" :key="day.day()" class="mp-calendar-viewport__weekday">{{ day.format('dd') }}</span>
      </div>
      <div class="mp-calendar-viewport__grid">
        <button
          v-for="day in week"
          :key="day.format('YYYY-MM-DD')"
          type="button"
          v-bind="dayAttrs(day)"
          @click="choose(day)"
        >
          <span class="mp-calendar-viewport__day-value">{{ day.date() }}</span>
        </button>
      </div>
    </template>
    <div v-else ref="scroller" class="mp-calendar-viewport__scroll" tabindex="0" @scroll="onScroll">
      <div :style="{ height: `${first * monthHeight}px` }" aria-hidden="true" />
      <section
        v-for="month in months"
        :key="month.index"
        class="mp-calendar-viewport__month"
        :data-month="month.date.format('YYYY-MM')"
      >
        <h4>{{ month.date.format('YYYY-MM') }}</h4>
        <div class="mp-calendar-viewport__grid">
          <span v-for="index in 7" :key="`label-${index}`" class="mp-calendar-viewport__weekday">{{
            month.date.day((weekStartsOn + index - 1) % 7).format('dd')
          }}</span>
          <template v-for="day in month.days" :key="day.format('YYYY-MM-DD')">
            <button v-if="day.month() === month.date.month()" type="button" v-bind="dayAttrs(day)" @click="choose(day)">
              {{ day.date() }}
            </button>
            <span v-else aria-hidden="true" />
          </template>
        </div>
      </section>
      <div :style="{ height: `${Math.max(0, total - first - months.length) * monthHeight}px` }" aria-hidden="true" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { IconChevronLeft, IconChevronRight } from '@maple-design/icons-vue'
import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { createNamespace } from '../../utils/components'
import type { CalendarInteractiveMode } from '../calendar-viewport-props'

defineOptions({ name: createNamespace('calendar-viewport').name })
dayjs.extend(utc)

const props = defineProps<{
  locale?: string
  mode: CalendarInteractiveMode
  useVirtualScroll?: boolean
  modelValue?: string | string[]
  pickerValue?: string | string[]
  min?: string
  max?: string
  dayStartOfWeek?: number
  readonly?: boolean
  multiple?: boolean
  rangeEndpoint?: 0 | 1
  range?: boolean
  showTime?: boolean
  showCurrent?: boolean
  today?: string
  disabledDate?: (text: string) => boolean
}>()
const emit = defineEmits<{
  (event: 'select', value: string | string[]): void
  (event: 'navigate', value: string | string[]): void
}>()
// UTC civil arithmetic prevents host DST from skipping/duplicating calendar cells.
const civil = (value?: string) => dayjs.utc((value || '').slice(0, 10)).locale(props.locale || 'en')
const anchor = computed(() => {
  const value = Array.isArray(props.pickerValue) ? props.pickerValue[0] : props.pickerValue
  const date = civil(value)
  return date.isValid() ? date : dayjs.utc().startOf('day')
})
const initialAnchor = anchor.value
const minimum = computed(() =>
  props.min && civil(props.min).isValid() ? civil(props.min) : initialAnchor.subtract(12, 'month').startOf('month'),
)
const maximum = computed(() =>
  props.max && civil(props.max).isValid() ? civil(props.max) : initialAnchor.add(12, 'month').endOf('month'),
)
const base = computed(() => minimum.value.startOf('month'))
const total = computed(() => Math.max(0, maximum.value.startOf('month').diff(base.value, 'month') + 1))
const weekStartsOn = computed(() => props.dayStartOfWeek ?? 0)
const weekStart = computed(() => anchor.value.subtract((anchor.value.day() - weekStartsOn.value + 7) % 7, 'day'))
const weekEnd = computed(() => weekStart.value.add(6, 'day'))
const { t: provided } = injectLocaleProvider()
const translate = (key: 'datePickerPreviousWeek' | 'datePickerNextWeek') => (provided ?? t)(key)
const weekCaption = computed(() => {
  const start = weekStart.value
  const end = weekEnd.value
  const endFormat = start.year() !== end.year() ? 'YYYY.MM.DD' : start.month() !== end.month() ? 'MM.DD' : 'DD'
  return `${start.format('YYYY.MM.DD')} – ${end.format(endFormat)}`
})
const week = computed(() => Array.from({ length: 7 }, (_, index) => weekStart.value.add(index, 'day')))
const scroller = ref<HTMLElement>()
const monthHeight = ref(320)
const scrollTop = ref(0)
const viewportHeight = ref(320)
const first = computed(() =>
  props.useVirtualScroll === false ? 0 : Math.max(0, Math.floor(scrollTop.value / monthHeight.value) - 1),
)
const months = computed(() => {
  const count = props.useVirtualScroll === false ? total.value : Math.ceil(viewportHeight.value / monthHeight.value) + 3
  return Array.from({ length: Math.min(count, Math.max(0, total.value - first.value)) }, (_, offset) => {
    const index = first.value + offset
    const date = base.value.add(index, 'month')
    const start = date.subtract((date.day() - weekStartsOn.value + 7) % 7, 'day')
    return { index, date, days: Array.from({ length: 42 }, (_, day) => start.add(day, 'day')) }
  })
})
const selected = computed(
  () => (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]).filter(Boolean) as string[],
)
function dayAttrs(day: Dayjs) {
  const text = day.format('YYYY-MM-DD')
  const chosen = selected.value.some((value) => value.slice(0, 10) === text)
  const between =
    props.range &&
    selected.value.length === 2 &&
    text > selected.value[0].slice(0, 10) &&
    text < selected.value[1].slice(0, 10)
  return {
    'aria-label': text,
    'aria-pressed': chosen,
    'aria-current':
      props.showCurrent !== false && text === civil(props.today).format('YYYY-MM-DD') ? ('date' as const) : undefined,
    'data-in-range': between || undefined,
    disabled:
      props.readonly ||
      day.isBefore(minimum.value, 'day') ||
      day.isAfter(maximum.value, 'day') ||
      props.disabledDate?.(text),
  }
}
function choose(day: Dayjs) {
  if (dayAttrs(day).disabled) {
    return
  }
  const text = day.format('YYYY-MM-DD')
  const previous = selected.value[0]
  const value = text + (props.showTime ? previous?.slice(10) || ' 00:00:00' : '')
  if (props.range && props.rangeEndpoint !== undefined) {
    emit('select', text)
  } else if (props.range) {
    emit('select', selected.value.length === 1 ? [selected.value[0], value].sort() : [value])
  } else if (props.multiple) {
    emit(
      'select',
      selected.value.some((part) => part.slice(0, 10) === text)
        ? selected.value.filter((part) => part.slice(0, 10) !== text)
        : [...selected.value, value],
    )
  } else {
    emit('select', value)
  }
}
function navigate(date: Dayjs) {
  const first = date.format('YYYY-MM-DD')
  emit('navigate', props.range ? [first, date.add(1, 'month').format('YYYY-MM-DD')] : first)
}
function moveWeek(direction: number) {
  const next = anchor.value.add(direction * 7, 'day')
  const bounded = next.isBefore(minimum.value) ? minimum.value : next.isAfter(maximum.value) ? maximum.value : next
  navigate(bounded)
}
let observedIndex = -1
function onScroll() {
  scrollTop.value = scroller.value?.scrollTop ?? 0
  const index = Math.min(total.value - 1, Math.max(0, Math.floor(scrollTop.value / monthHeight.value)))
  if (index >= 0 && index !== observedIndex) {
    observedIndex = index
    const date = base.value.add(index, 'month')
    navigate(date.isBefore(minimum.value) ? minimum.value : date)
    void nextTick(locate)
  }
}
function locate() {
  if (!scroller.value) {
    return
  }
  const index = Math.max(0, Math.min(total.value - 1, anchor.value.startOf('month').diff(base.value, 'month')))
  if (observedIndex !== index) {
    observedIndex = index
    scroller.value.scrollTop = index * monthHeight.value
    scrollTop.value = scroller.value.scrollTop
  }
}
let observer: ResizeObserver | undefined
async function measure() {
  await nextTick()
  const row = scroller.value?.querySelector<HTMLElement>('.mp-calendar-viewport__month')
  if (row?.offsetHeight) {
    monthHeight.value = row.offsetHeight
  }
  viewportHeight.value = scroller.value?.clientHeight || 320
  observedIndex = -1
  locate()
}
onMounted(() => {
  void measure()
  if (typeof ResizeObserver !== 'undefined' && scroller.value) {
    observer = new ResizeObserver(() => {
      void measure()
    })
    observer.observe(scroller.value)
  }
})
onBeforeUnmount(() => observer?.disconnect())
watch(
  () => [props.pickerValue, props.min, props.max, props.mode],
  () => {
    void nextTick(locate)
  },
)
watch(scroller, (element) => {
  observer?.disconnect()
  if (element) {
    observer?.observe(element)
    void measure()
  }
})
defineExpose({ scrollToSelection: locate })
</script>
