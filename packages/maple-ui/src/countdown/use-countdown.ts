// @sync-with: cedar-ui/src/countdown/use-countdown.ts
import { onActivated, onDeactivated, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import type { TimeData } from './props'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export interface CountdownEmits {
  (event: 'change', time: TimeData): void
  (event: 'end'): void
}

function toNumber(value: string | number) {
  const next = Number(value)
  return Number.isFinite(next) ? next : 0
}

export function parseFormat(format: string, time: TimeData): string {
  const scannedTimes = Object.values(time)
  const scannedFormats = ['DD', 'HH', 'mm', 'ss']
  const padValues = [24, 60, 60, 1000]

  scannedFormats.forEach((scannedFormat, index) => {
    if (!format.includes(scannedFormat)) {
      scannedTimes[index + 1] += scannedTimes[index] * padValues[index]
    } else {
      format = format.replace(scannedFormat, String(scannedTimes[index]).padStart(2, '0'))
    }
  })

  if (format.includes('S')) {
    const ms = String(scannedTimes[scannedTimes.length - 1]).padStart(3, '0')

    if (format.includes('SSS')) {
      format = format.replace('SSS', ms)
    } else if (format.includes('SS')) {
      format = format.replace('SS', ms.slice(0, 2))
    } else {
      format = format.replace('S', ms.slice(0, 1))
    }
  }

  return format
}

export function splitTime(durationTime: number): TimeData {
  return {
    days: Math.floor(durationTime / DAY),
    hours: Math.floor((durationTime % DAY) / HOUR),
    minutes: Math.floor((durationTime % HOUR) / MINUTE),
    seconds: Math.floor((durationTime % MINUTE) / SECOND),
    milliseconds: Math.floor(durationTime % SECOND),
  }
}

export function useCountdown(
  props: { time: string | number; format: string; autoStart: boolean },
  emit: CountdownEmits,
): {
  showTime: Ref<string>
  timeData: Ref<TimeData>
  start: (resume?: boolean) => void
  pause: () => void
  reset: () => void
} {
  const showTime = ref('')
  const timeData = ref<TimeData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })

  let endTime = 0
  let isStart = false
  let handle = 0
  let remainingTime = 0
  let cacheIsStart: boolean | undefined

  function displayTime(durationTime: number) {
    const time = splitTime(durationTime)
    timeData.value = time
    emit('change', timeData.value)
    showTime.value = parseFormat(props.format, time)
  }

  function countdown() {
    const now = performance.now()

    if (!endTime) {
      endTime = now + toNumber(props.time)
    }

    remainingTime = endTime - now
    if (remainingTime < 0) {
      remainingTime = 0
    }

    displayTime(remainingTime)

    if (remainingTime === 0) {
      emit('end')
      return
    }

    if (isStart) {
      handle = requestAnimationFrame(countdown)
    }
  }

  function start(resume = false) {
    if (isStart && !resume) {
      return
    }

    isStart = true
    endTime = performance.now() + (remainingTime || toNumber(props.time))
    countdown()
  }

  function pause() {
    isStart = false
    cancelAnimationFrame(handle)
  }

  function reset() {
    endTime = 0
    isStart = false
    cancelAnimationFrame(handle)
    countdown()
    if (props.autoStart) {
      start()
    }
  }

  watch(
    () => props.time,
    () => {
      reset()
    },
  )

  onMounted(reset)

  onActivated(() => {
    if (cacheIsStart == null) {
      return
    }

    isStart = cacheIsStart

    if (isStart === true) {
      start(true)
    }
  })

  onDeactivated(() => {
    cacheIsStart = isStart
    pause()
  })

  onUnmounted(pause)

  return {
    showTime,
    timeData,
    start,
    pause,
    reset,
  }
}
