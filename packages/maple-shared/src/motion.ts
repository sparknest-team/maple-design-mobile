import { cancelFrame, requestFrame } from './dom'
import { clamp } from './number'

export type MotionState = 'running' | 'paused' | 'pending' | 'finished'

interface MotionOptions {
  from: number
  to: number
  duration?: number
  frame?: (frame: { value: number; done: boolean }) => void
  timingFunction?: (progress: number) => number
  onStateChange?: (state: MotionState) => void
}

export function motion(options: MotionOptions) {
  const {
    from,
    to,
    duration = 300,
    frame = () => {},
    timingFunction = (value) => value,
    onStateChange = () => {},
  } = options
  // Invalid durations have the same bounded, next-frame completion as zero.
  const safeDuration = Number.isFinite(duration) && duration >= 0 ? duration : 0
  let state: MotionState = 'pending'
  let value = from
  const distance = to - from
  let ticker: number | undefined
  let startTime: number | undefined
  let pausedTime: number | undefined
  let sleepTime = 0

  function setState(next: MotionState) {
    state = next
    onStateChange(next)
  }

  function start() {
    if (state === 'running' || state === 'finished') {
      return
    }
    setState('running')
    const now = performance.now()
    startTime = startTime ?? now
    sleepTime += pausedTime != null ? now - pausedTime : 0
    pausedTime = undefined
    tick()
    function tick() {
      ticker = requestFrame(() => {
        const elapsed = performance.now() - startTime! - sleepTime
        const progress = safeDuration === 0 ? 1 : clamp(elapsed / safeDuration, 0, 1)
        value = distance * timingFunction(progress) + from
        if (progress >= 1) {
          setState('finished')
          frame({ value: to, done: true })
          return
        }
        frame({ value, done: false })
        tick()
      })
    }
  }

  function pause() {
    if (state !== 'running') {
      return
    }
    cancelFrame(ticker)
    setState('paused')
    pausedTime = performance.now()
  }

  function reset() {
    cancelFrame(ticker)
    setState('pending')
    value = from
    ticker = undefined
    startTime = undefined
    pausedTime = undefined
    sleepTime = 0
  }

  return { start, pause, reset, getState: (): MotionState => state }
}
