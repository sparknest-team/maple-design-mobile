import { nextTick, reactive, type ComponentPublicInstance } from 'vue'
import { mountInstance } from '../utils/components'
import LoadingBarComponent from './LoadingBar'
import { props as loadingBarProps } from './props'

interface LoadingBarOptions {
  color?: string
  errorColor?: string
  height?: string | number
  top?: string | number
  finishDelay?: number
}

interface InternalProps {
  value: number
  opacity: number
  error: boolean
  transitionDuration?: number
}

interface LoadingBar {
  start(): void

  finish(): void

  error(): void

  setDefaultOptions(options: LoadingBarOptions): void

  resetDefaultOptions(): void
}

const OPACITY_DELAY = 200

const timers = new Set<number>()
let generation = 0
let finishPending = false
let unmountInstance: (() => void) | undefined
let element: HTMLElement | undefined
let internalOptions: LoadingBarOptions = {}

const internalProps: InternalProps = {
  value: 0,
  opacity: 0,
  error: false,
}

const ctx: LoadingBarOptions & InternalProps = reactive(internalProps)

function setDefaultOptions(options: LoadingBarOptions) {
  resetDefaultOptions()
  Object.assign(ctx, options)
  internalOptions = { ...options }
}

const resetDefaultOptions = () => {
  Object.keys(internalOptions).forEach((key) => {
    if (ctx[key as keyof LoadingBarOptions] !== undefined) {
      ctx[key as keyof LoadingBarOptions] = undefined
    }
  })
  internalOptions = {}
}

const mount = () => {
  if (!unmountInstance) {
    unmountInstance = mountInstance(LoadingBarComponent, ctx, {
      ref: (instance: ComponentPublicInstance | null) => {
        element = instance?.$el as HTMLElement | undefined
      },
    }).unmountInstance
  }
}

const schedule = (task: () => void, delay: number) => {
  const version = generation
  const timer = window.setTimeout(() => {
    timers.delete(timer)
    if (version === generation) {
      task()
    }
  }, delay)
  timers.add(timer)
}

// Read resolved transitions on the service node, not unresolved CSS variables.
const transitionTime = (property: string) => {
  const style = element?.ownerDocument.defaultView?.getComputedStyle(element)
  if (!style) {
    return 0
  }
  const durations = style.transitionDuration.split(',')
  const delays = style.transitionDelay.split(',')
  const time = (value: string) => {
    const match = value.trim().match(/^(-?\d*\.?\d+)(ms|s)$/)
    return match ? Number(match[1]) * (match[2] === 's' ? 1000 : 1) : 0
  }
  let result = 0
  style.transitionProperty.split(',').forEach((name, index) => {
    if (name.trim() === property || name.trim() === 'all') {
      result = Math.max(0, time(durations[index % durations.length]) + time(delays[index % delays.length]))
    }
  })
  return result
}

const tick = () => {
  schedule(() => {
    ctx.transitionDuration = undefined

    if (ctx.value >= 95) {
      return
    }

    ctx.value += ctx.value < 70 ? Math.round(5 * Math.random()) : Math.random()
    tick()
  }, 200)
}

const clearTimer = () => {
  generation += 1
  timers.forEach((timer) => window.clearTimeout(timer))
  timers.clear()
  finishPending = false
}

const finishTask = () => {
  clearTimer()
  finishPending = true
  ctx.value = 100

  const version = generation
  void nextTick(() => {
    if (version !== generation) {
      return
    }
    schedule(
      () => {
        ctx.opacity = 0
        void nextTick(() => {
          if (version !== generation) {
            return
          }
          schedule(
            () => {
              ctx.error = false
              unmountInstance?.()
              unmountInstance = undefined
              element = undefined
              finishPending = false
            },
            Math.max(250, transitionTime('opacity')),
          )
        })
      },
      Math.max(OPACITY_DELAY + 100, transitionTime('width')),
    )
  })
}

const start = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }
  clearTimer()
  ctx.error = false
  ctx.value = 0
  ctx.transitionDuration = 0

  mount()

  schedule(() => {
    ctx.opacity = 1
  }, OPACITY_DELAY)

  tick()
}

const finish = () => {
  if (!unmountInstance || finishPending) {
    return
  }
  finishPending = true
  const delay = Number(ctx.finishDelay ?? 0)
  schedule(finishTask, Number.isFinite(delay) ? Math.max(0, delay) : 0)
}

const error = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }
  clearTimer()
  ctx.error = true

  if (ctx.value === 100) {
    ctx.value = 0
    ctx.transitionDuration = 0
  }

  mount()

  schedule(() => {
    ctx.opacity = 1
  }, OPACITY_DELAY)

  tick()
  schedule(finishTask, 300)
}

const LoadingBar: LoadingBar = {
  start,
  finish,
  error,
  setDefaultOptions,
  resetDefaultOptions,
}

export { loadingBarProps }

export type LoadingBarInstance = typeof LoadingBar
export const _LoadingBarComponent: typeof LoadingBar = LoadingBar

export default LoadingBar
export type LoadingBarProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
