<template>
  <div :class="n('clock')">
    <div :class="n('clock-hand')" :style="handStyle"></div>
    <div
      v-for="(timeScale, index) in timeScales"
      v-show="!hideDisabledOptions || !isDisable(timeScale)"
      :key="timeScale"
      :class="
        classes(
          n('clock-item'),
          [isActive(index, false), n('clock-item--active')],
          [isDisable(timeScale), n('clock-item--disable')],
        )
      "
      :style="getStyle(index, timeScale, false)"
    >
      {{ timeScale }}
    </div>
    <div v-if="format === '24hr' && type === 'hour'" ref="inner" :class="n('clock-inner')">
      <div
        v-for="(hour, index) in hours24"
        v-show="!hideDisabledOptions || !isDisable(hour)"
        :key="hour"
        :class="
          classes(
            n('clock-item'),
            [isActive(index, true), n('clock-item--active')],
            [isDisable(hour), n('clock-item--disable')],
          )
        "
        :style="getStyle(index, hour, true)"
      >
        {{ hour }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type ComputedRef, type PropType, type Ref } from 'vue'
import { getRect, toNumber } from '@maplejs/maple-shared'
import dayjs from 'dayjs/esm/index.js'
import { createNamespace } from '../utils/components'
import { padStart } from '../utils/shared'
import { timeDisabledProps } from './disabled-props'
import { hours24, hoursAmpm, minSec, type AmPm, type ClockFormat, type Time } from './picker-props'
import { convertHour, getIsDisableMinute, getIsDisableSecond } from './picker-utils'
import { timeStepProp } from './step-prop'
import { getTimeChoices } from './time-rules'

const { n, classes } = createNamespace('time-picker')

export default defineComponent({
  name: createNamespace('clock').name,
  props: {
    hideDisabledOptions: Boolean,
    isInner: {
      type: Boolean,
      required: true,
    },
    rad: {
      type: Number,
    },
    format: {
      type: String as PropType<ClockFormat>,
      default: 'ampm',
    },
    ...timeDisabledProps,
    step: timeStepProp,
    time: {
      type: Object as PropType<Time>,
      required: true,
    },
    useSeconds: {
      type: Boolean,
    },
    preventNextUpdate: {
      type: Boolean,
    },
    type: {
      type: String as PropType<keyof Time>,
      default: 'hour',
    },
    ampm: {
      type: String as PropType<AmPm>,
      default: 'am',
    },
    color: {
      type: String,
    },
    min: {
      type: String,
    },
    max: {
      type: String,
    },
  },
  emits: ['update', 'change-prevent-update'],
  setup(props, { emit }) {
    const inner: Ref<HTMLElement | null> = ref(null)
    const disableHour = computed(() => {
      const allowed = getTimeChoices(undefined, props).columns[0]
      return Array.from({ length: 24 }, (_, hour) => hour)
        .filter((hour) => !allowed.includes(hour))
        .flatMap((hour) => [String(hour), String(hour).padStart(2, '0')])
    })

    const handStyle = computed(() => ({
      transform: `rotate(${toNumber(props.rad)}deg)`,
      height: props.isInner && props.type === 'hour' ? 'calc(50% - 40px)' : 'calc(50% - 4px)',
      backgroundColor: getHandleColor(),
      borderColor: getHandleColor(),
    }))

    const activeItemIndex: ComputedRef<number | undefined> = computed(() => {
      if (props.rad === undefined) {
        return
      }
      const value = props.rad / 30
      return value >= 0 ? value : value + 12
    })

    const timeScales: ComputedRef<Array<string>> = computed(() => {
      if (props.type === 'hour') {
        return hoursAmpm
      }

      return minSec
    })

    const isDisableMinSec = (time?: string, isDisable?: boolean): boolean => {
      time = time ?? (props.type === 'minute' ? props.time.minute : props.time.second)

      const disableMethod = props.type === 'minute' ? getIsDisableMinute : getIsDisableSecond

      const values = {
        time: toNumber(time),
        format: props.format,
        ampm: props.ampm,
        hour: props.time.hour,
        minute: toNumber(props.time.minute),
        max: props.max,
        min: props.min,
        useSeconds: props.useSeconds,
        step: props.step,
        disabledHours: props.disabledHours,
        disabledMinutes: props.disabledMinutes,
        disabledSeconds: props.disabledSeconds,
        disableHour: disableHour.value,
      }

      if (isDisable && props.type === 'minute') {
        Reflect.deleteProperty(values, 'minute')
      }

      return disableMethod(values)
    }

    const getHandleColor = () => {
      if (activeItemIndex.value === undefined) {
        return props.color
      }
      const hour = props.isInner ? hours24[activeItemIndex.value] : timeScales.value[activeItemIndex.value]

      if (timeScales.value === minSec) {
        return isDisableMinSec() ? 'var(--mp-time-picker-clock-item-disable-background)' : props.color
      }

      return isDisable(hour) ? 'var(--mp-time-picker-clock-item-disable-background)' : props.color
    }

    const isActive = (index: number, inner: boolean): boolean => {
      if (inner) {
        return activeItemIndex.value === index && props.isInner
      }

      return activeItemIndex.value === index && (!props.isInner || props.type !== 'hour')
    }

    const isDisable = (time: string) => {
      if (props.type === 'hour') {
        const { hourNum } = convertHour(props.format, props.ampm, time)
        return disableHour.value.some((hour) => Number(hour) === hourNum)
      }

      return isDisableMinSec(time, true)
    }

    const getStyle = (index: number, hour: string, inner: boolean) => {
      const rad = ((2 * Math.PI) / 12) * index - Math.PI / 2
      const left = 50 * (1 + Math.cos(rad))
      const top = 50 * (1 + Math.sin(rad))

      const computedColor = () => {
        if (!isActive(index, inner)) {
          return {
            backgroundColor: undefined,
            color: undefined,
          }
        }
        if (isDisable(hour)) {
          return {
            backgroundColor: 'var(--mp-time-picker-clock-item-disable-background)',
            color: 'var(--mp-time-picker-clock-item-disable-color)',
          }
        }

        return {
          backgroundColor: props.color,
          color: undefined,
        }
      }

      const { backgroundColor, color } = computedColor()

      return {
        left: `${left}%`,
        top: `${top}%`,
        backgroundColor,
        color,
      }
    }

    const getSize = () => {
      const { width, height } = getRect(inner.value as HTMLElement)

      return {
        width,
        height,
      }
    }

    const getHour = (): string | undefined => {
      if (activeItemIndex.value === undefined) {
        return undefined
      }
      const hours = props.ampm === 'am' ? hoursAmpm : hours24

      return padStart(hours[activeItemIndex.value], 2, '0')
    }

    watch([activeItemIndex, () => props.isInner], ([index, inner], [oldIndex, oldInner]) => {
      const isSame = index === oldIndex && inner === oldInner
      if (isSame || props.type !== 'hour' || activeItemIndex.value === undefined) {
        return
      }

      const newHour = inner ? hours24[activeItemIndex.value] : getHour()
      const second = props.useSeconds ? `:${props.time.second}` : ''
      const newTime = `${newHour}:${props.time.minute}${second}`

      if (!props.preventNextUpdate) {
        emit('update', newTime)
      }

      emit('change-prevent-update')
    })

    watch(
      () => props.rad,
      (rad, oldRad) => {
        if (props.preventNextUpdate || props.type === 'hour' || rad === undefined || oldRad === undefined) {
          return
        }

        const radToMinSec = rad / 6 >= 0 ? rad / 6 : rad / 6 + 60
        const oldRadToMinSec = oldRad / 6 >= 0 ? oldRad / 6 : oldRad / 6 + 60

        if (radToMinSec === oldRadToMinSec) {
          return
        }

        let newTime
        const { hourStr } = convertHour(props.format, props.ampm, props.time.hour)

        if (props.type === 'minute') {
          const newMinute = dayjs().minute(radToMinSec).format('mm')
          const second = props.useSeconds ? `:${props.time.second}` : ''

          newTime = `${hourStr}:${newMinute}${second}`
        }

        if (props.type === 'second') {
          const newSecond = dayjs().second(radToMinSec).format('ss')
          const second = props.useSeconds ? `:${newSecond}` : ''

          newTime = `${hourStr}:${props.time.minute}${second}`
        }

        emit('update', newTime)
      },
    )

    return {
      n,
      classes,
      hours24,
      timeScales,
      inner,
      handStyle,
      disableHour,
      isActive,
      isDisable,
      getSize,
      getStyle,
      activeItemIndex,
    }
  },
})
</script>
