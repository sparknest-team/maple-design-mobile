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
) {
  const duration = () => Math.max(0, toNumber(props.time))
  const timeData = ref<TimeData>(splitTime(duration()))
  const showTime = ref(parseFormat(props.format, timeData.value))
  let remaining = duration()
  let deadline = 0
  let running = false
  let ended = false
  let mounted = false
  let resumeOnActivate = false
  let handle: number | undefined

  function display() {
    timeData.value = splitTime(remaining)
    showTime.value = parseFormat(props.format, timeData.value)
    emit('change', timeData.value)
  }
  function cancel() {
    if (handle !== undefined) {
      cancelAnimationFrame(handle)
    }
    handle = undefined
  }
  function tick() {
    handle = undefined
    if (!running) {
      return
    }
    remaining = Math.max(0, deadline - performance.now())
    display()
    if (remaining === 0) {
      running = false
      if (!ended) {
        ended = true
        emit('end')
      }
    } else if (running) {
      handle = requestAnimationFrame(tick)
    }
  }
  function start() {
    if (!mounted || running || ended) {
      return
    }
    running = true
    deadline = performance.now() + remaining
    tick()
  }
  function pause() {
    if (running) {
      remaining = Math.max(0, deadline - performance.now())
    }
    running = false
    cancel()
  }
  function reset() {
    pause()
    remaining = duration()
    ended = false
    display()
    if (props.autoStart) {
      start()
    }
  }
  watch(() => props.time, reset)
  watch(
    () => props.format,
    () => {
      showTime.value = parseFormat(props.format, timeData.value)
    },
  )
  onMounted(() => {
    mounted = true
    reset()
  })
  onDeactivated(() => {
    resumeOnActivate = running
    pause()
  })
  onActivated(() => {
    if (resumeOnActivate) {
      resumeOnActivate = false
      start()
    }
  })
  onUnmounted(() => {
    mounted = false
    pause()
  })
  return { showTime, timeData, start, pause, reset }
}
