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
  const { from, to, duration = 300, timingFunction, frame, onStateChange } = options
  const timed = duration > 0 && Number.isFinite(duration)
  let phase: MotionState = 'pending'
  let origin: number | undefined
  let pausedAt: number | undefined
  let inactive = 0
  let handle: number | undefined

  function transition(next: MotionState) {
    phase = next
    onStateChange?.(next)
  }

  function paint() {
    const elapsed = performance.now() - origin! - inactive
    const fraction = timed ? clamp(elapsed / duration, 0, 1) : 1
    const eased = timingFunction ? timingFunction(fraction) : fraction
    if (fraction === 1) {
      transition('finished')
      frame?.({ value: to, done: true })
      return
    }
    frame?.({ value: (to - from) * eased + from, done: false })
    handle = requestFrame(paint)
  }

  function start() {
    if (phase !== 'paused' && phase !== 'pending') {
      return
    }
    transition('running')
    const now = performance.now()
    origin ??= now
    if (pausedAt !== undefined) {
      inactive += now - pausedAt
    }
    pausedAt = undefined
    handle = requestFrame(paint)
  }

  function pause() {
    if (phase === 'running') {
      cancelFrame(handle)
      transition('paused')
      pausedAt = performance.now()
    }
  }

  function reset() {
    cancelFrame(handle)
    transition('pending')
    handle = pausedAt = origin = undefined
    inactive = 0
  }

  return { start, pause, reset, getState: (): MotionState => phase }
}
