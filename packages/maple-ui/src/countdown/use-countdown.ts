import { onActivated, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue'
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
      format = format.replaceAll(scannedFormat, String(scannedTimes[index]).padStart(2, '0'))
    }
  })

  if (format.includes('S')) {
    const ms = String(scannedTimes[scannedTimes.length - 1]).padStart(3, '0')

    format = format.replace(/SSS|SS|S/g, (token) => (token === 'SSS' ? ms : ms.slice(0, token.length)))
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
  let suspended = false
  let resumeOnActivate = false
  let generation = 0
  let handle: number | undefined

  function display() {
    timeData.value = splitTime(remaining)
    showTime.value = parseFormat(props.format, timeData.value)
    emit('change', timeData.value)
  }
  function cancel() {
    generation += 1
    if (handle !== undefined) {
      cancelAnimationFrame(handle)
    }
    handle = undefined
  }
  function tick(expectedGeneration = generation) {
    if (expectedGeneration !== generation || !running || suspended || !mounted) {
      return
    }
    handle = undefined
    const currentGeneration = ++generation
    remaining = Math.max(0, deadline - performance.now())
    display()
    // A change listener can pause/reset/start another run.
    if (currentGeneration !== generation || !running || suspended || !mounted) {
      return
    }
    if (remaining === 0) {
      running = false
      if (!ended) {
        ended = true
        emit('end')
      }
    } else {
      handle = requestAnimationFrame(() => tick(currentGeneration))
    }
  }
  function start() {
    if (!mounted || suspended || running || ended) {
      return
    }
    running = true
    deadline = performance.now() + remaining
    tick()
  }
  function pause() {
    resumeOnActivate = false
    if (running) {
      remaining = Math.max(0, deadline - performance.now())
    }
    running = false
    cancel()
  }
  function reset() {
    if (!mounted) {
      return
    }
    pause()
    remaining = duration()
    ended = false
    const currentGeneration = generation
    display()
    if (currentGeneration !== generation || !mounted) {
      return
    }
    if (props.autoStart) {
      if (suspended) {
        resumeOnActivate = true
      } else {
        start()
      }
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
    const shouldResume = running
    pause()
    suspended = true
    resumeOnActivate = shouldResume
  })
  onActivated(() => {
    suspended = false
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
