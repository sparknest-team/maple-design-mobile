import {
  computed,
  nextTick,
  reactive,
  ref,
  watch,
  type DefineComponent,
  type ExtractPropTypes,
  type ShallowRef,
} from 'vue'
import { getRect, preventDefault, toNumber } from '@maplejs/maple-shared'
import dayjs from 'dayjs/esm/index.js'
import { parseClock } from '../../utils/picker-data'
import { getTimePickerChange, getTimePickerState } from '../picker-columns'
import { hours24, hoursAmpm, props as pickerProps, type AmPm, type Time } from '../picker-props'
import { convertHour, getIsDisableMinute, getIsDisableSecond, getNumberTime } from '../picker-utils'
import { getTimeWheelPresentationProps } from '../presentation-props'
import { resolveTimeFormat } from '../time-format'
import { getTimeChoices, isTimeAllowed } from '../time-rules'
import { fromClockValue, getTimeConstraints, toClockValue, type TimeValue } from '../time-value'

/** Mobile-only renderer state: wheel columns, clock coordinates and touch gestures. */
export function useMobileTimePanel(
  props: Readonly<ExtractPropTypes<typeof pickerProps>>,
  draft: ShallowRef<TimeValue | undefined>,
  select: (value: TimeValue) => boolean,
) {
  const formatConfig = computed(() => resolveTimeFormat(props))
  const clockFormat = computed(() => (formatConfig.value.use12Hours ? 'ampm' : '24hr'))
  const useSeconds = computed(() => formatConfig.value.useSeconds)
  const constraints = computed(() => getTimeConstraints(props))
  const showHours = computed(() => formatConfig.value.columns.some((unit) => unit === 'H' || unit === 'h'))
  const showMinutes = computed(() => formatConfig.value.columns.includes('m'))
  const container = ref<HTMLElement | null>(null)
  const picker = ref<HTMLElement | null>(null)
  const inner = ref<DefineComponent | null>(null)
  const isInner = ref(false)
  const isPreventNextUpdate = ref(false)
  const syncingClock = ref(false)
  const isActualInner = ref(false)
  const isChosenUsableHour = ref(false)
  const isChosenUsableMinute = ref(false)
  const isDisableHour = ref(false)
  const isDisableMinute = ref(false)
  const minuteRad = ref(0)
  const secondRad = ref(0)
  const hourRad = ref<number | undefined>()
  const type = ref<keyof Time>('hour')
  watch(
    formatConfig,
    () => {
      if (
        (type.value === 'hour' && !showHours.value) ||
        (type.value === 'minute' && !showMinutes.value) ||
        (type.value === 'second' && !useSeconds.value)
      ) {
        type.value = showHours.value ? 'hour' : showMinutes.value ? 'minute' : 'second'
      }
    },
    { immediate: true },
  )
  const ampm = ref<AmPm>('am')
  const time = ref<Time>({
    hour: '00',
    minute: '00',
    second: '00',
  })
  const center = reactive<Record<string, number>>({
    x: 0,
    y: 0,
  })
  const innerRange = reactive<Record<string, number[]>>({
    x: [],
    y: [],
  })
  const getRad = computed(() => {
    if (type.value === 'hour') {
      return hourRad.value
    }
    if (type.value === 'minute') {
      return minuteRad.value
    }

    return secondRad.value
  })
  const pickerBindingProps = computed(() => getTimeWheelPresentationProps(props.pickerProps))
  const pickerState = computed(() => getTimePickerState(draft.value, props))
  const pickerColumns = computed(() => pickerState.value.columns)
  const pickerValue = computed(() => pickerState.value.value)

  function handlePickerChange(values: (string | number)[]) {
    if (props.disabled || props.readonly) {
      return
    }
    const value = getTimePickerChange(values, props)
    if (value !== undefined) {
      const clock = toClockValue(value, props)
      if (clock) {
        update(clock)
      }
    }
  }

  watch(
    () => [toClockValue(draft.value, props), clockFormat.value] as const,
    ([value]) => {
      // Updating clock coordinates from a model/format is not a user selection.
      syncingClock.value = true
      nextTick(() => {
        syncingClock.value = false
      })
      if (value === undefined || value === '') {
        resetTime()
        return
      }

      const { hour, minute, second } = getNumberTime(value)

      const formatHour12 = dayjs().hour(hour).format('hh')
      const formatHour24 = dayjs().hour(hour).format('HH')
      const formatMinute = dayjs().minute(minute).format('mm')
      const formatSecond = dayjs().second(second).format('ss')

      hourRad.value = (formatHour12 === '12' ? 0 : toNumber(formatHour12)) * 30
      minuteRad.value = toNumber(formatMinute) * 6
      secondRad.value = toNumber(formatSecond) * 6

      time.value = getTime(value)

      if (clockFormat.value !== '24hr') {
        ampm.value = hour >= 12 ? 'pm' : 'am'
      }

      isInner.value = clockFormat.value === '24hr' && hours24.includes(formatHour24)
    },
    { immediate: true },
  )

  function resetTime() {
    hourRad.value = undefined
    minuteRad.value = 0
    secondRad.value = 0
    time.value = {
      hour: '00',
      minute: '00',
      second: '00',
    }
    ampm.value = 'am'
  }

  function update(newTime: string) {
    if (props.disabled || props.readonly || parseClock(newTime) === null) {
      return
    }
    const value = getTimeChoices(newTime, constraints.value).value
    if (!value || !isTimeAllowed(value, constraints.value)) {
      return
    }
    const formatted = fromClockValue(value, props)
    if (formatted !== undefined) {
      select(formatted)
    }
  }

  function rad2deg(rad: number): number {
    return rad * 57.29577951308232
  }

  function checkPanel(panelType: keyof Time) {
    isChosenUsableHour.value = false
    isDisableMinute.value = false
    type.value = panelType
  }

  function checkAmpm(period: AmPm) {
    if (props.disabled || props.readonly) {
      return
    }
    const hour = (Number(time.value.hour) % 12) + (period === 'pm' ? 12 : 0)
    const raw = `${hour}:${time.value.minute}${useSeconds.value ? ':' + time.value.second : ''}`
    const next = getTimeChoices(raw, {
      ...constraints.value,
      disabledHours: () => [
        ...(props.disabledHours?.() ?? []),
        ...Array.from({ length: 12 }, (_, index) => index + (period === 'am' ? 12 : 0)),
      ],
    }).value
    if (!next) {
      return
    }
    ampm.value = period
    update(next)
  }

  function getInner(clientX: number, clientY: number): boolean {
    const xIsInRange = clientX >= innerRange.x[0] && clientX <= innerRange.x[1]
    const yIsInRange = clientY >= innerRange.y[0] && clientY <= innerRange.y[1]

    return xIsInRange && yIsInRange
  }

  function getTime(value: string): Time {
    const hourFormat = clockFormat.value === '24hr' ? 'HH' : 'hh'
    const { hour, minute, second } = getNumberTime(value)

    return {
      hour: dayjs().hour(hour).format(hourFormat),
      minute: dayjs().minute(minute).format('mm'),
      second: dayjs().second(second).format('ss'),
    }
  }

  function getHourIndex(rad: number): number {
    const value = rad / 30
    return value >= 0 ? value : value + 12
  }

  function getRangeSize() {
    const { width: innerWidth, height: innerHeight } = (inner.value as DefineComponent).getSize()

    const rangeXMin = center.x - innerWidth / 2 - 8
    const rangeXMax = center.x + innerWidth / 2 + 8

    const rangeYMin = center.y - innerHeight / 2 - 8
    const rangeYMax = center.y + innerHeight / 2 + 8

    return {
      rangeXMin,
      rangeXMax,
      rangeYMin,
      rangeYMax,
    }
  }

  function setHourRad(clientX: number, clientY: number, roundDeg: number) {
    const { disableHour } = inner.value as DefineComponent
    isActualInner.value = getInner(clientX, clientY)
    const rad = Math.round(roundDeg / 30) * 30 + 90
    const index = getHourIndex(rad)

    const anotherHour = isInner.value ? hoursAmpm[index] : hours24[index]
    if (!disableHour.includes(anotherHour)) {
      isInner.value = clockFormat.value === '24hr' ? getInner(clientX, clientY) : false
    }
    if (isInner.value !== isActualInner.value) {
      return
    }

    const newHour = isInner.value || ampm.value === 'pm' ? hours24[index] : hoursAmpm[index]
    const { hourNum } = convertHour(clockFormat.value, ampm.value, newHour)
    isDisableHour.value = disableHour.some((hour: string) => Number(hour) === hourNum)
    if (isDisableHour.value) {
      return
    }
    hourRad.value = rad
    isChosenUsableHour.value = true
  }

  function setMinuteRad(roundDeg: number) {
    const { disableHour } = inner.value as DefineComponent
    const rad = Math.round(roundDeg / 6) * 6 + 90
    const radToMin = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60

    const values = {
      time: radToMin,
      format: clockFormat.value,
      ampm: ampm.value,
      hour: time.value.hour,
      max: props.max,
      min: props.min,
      disableHour,
      useSeconds: useSeconds.value,
      step: props.step,
      disabledHours: props.disabledHours,
      disabledMinutes: props.disabledMinutes,
      disabledSeconds: props.disabledSeconds,
    }
    isDisableMinute.value = getIsDisableMinute(values)

    if (isDisableMinute.value) {
      return
    }
    minuteRad.value = rad
    isChosenUsableMinute.value = true
  }

  function setSecondRad(roundDeg: number) {
    const { disableHour } = inner.value as DefineComponent
    const rad = Math.round(roundDeg / 6) * 6 + 90
    const radToSec = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60

    const values = {
      time: radToSec,
      format: clockFormat.value,
      ampm: ampm.value,
      hour: time.value.hour,
      minute: toNumber(time.value.minute),
      max: props.max,
      min: props.min,
      disableHour,
      useSeconds: useSeconds.value,
      step: props.step,
      disabledHours: props.disabledHours,
      disabledMinutes: props.disabledMinutes,
      disabledSeconds: props.disabledSeconds,
    }

    if (!getIsDisableSecond(values)) {
      secondRad.value = rad
    }
  }

  function setCenterAndRange() {
    const { left, top, width, height } = getRect(container.value as HTMLElement)

    center.x = left + width / 2
    center.y = top + height / 2

    if (type.value === 'hour' && clockFormat.value === '24hr') {
      const { rangeXMin, rangeXMax, rangeYMin, rangeYMax } = getRangeSize()

      innerRange.x = [rangeXMin, rangeXMax]
      innerRange.y = [rangeYMin, rangeYMax]
    }
  }

  function moveHand(event: TouchEvent) {
    preventDefault(event)
    if (props.disabled || props.readonly) {
      return
    }

    setCenterAndRange()

    const { clientX, clientY } = event.touches[0]

    const x = clientX - center.x
    const y = clientY - center.y
    const roundDeg = Math.round(rad2deg(Math.atan2(y, x)))

    if (type.value === 'hour') {
      setHourRad(clientX, clientY, roundDeg)
    } else if (type.value === 'minute') {
      setMinuteRad(roundDeg)
    } else {
      setSecondRad(roundDeg)
    }
  }

  function end() {
    if (props.disabled || props.readonly) {
      return
    }

    if (type.value === 'hour' && isChosenUsableHour.value) {
      type.value = showMinutes.value ? 'minute' : useSeconds.value ? 'second' : 'hour'
      return
    }

    if (type.value === 'minute' && useSeconds.value && isChosenUsableMinute.value) {
      type.value = 'second'
    }
  }

  function changePreventUpdate() {
    isPreventNextUpdate.value = false
  }

  return {
    clockFormat,
    showHours,
    showMinutes,
    useSeconds,
    getRad,
    time,
    container,
    inner,
    picker,
    isInner,
    type,
    ampm,
    isPreventNextUpdate,
    syncingClock,
    moveHand,
    checkPanel,
    checkAmpm,
    end,
    update,
    changePreventUpdate,
    pickerBindingProps,
    pickerColumns,
    pickerValue,
    handlePickerChange,
  }
}
