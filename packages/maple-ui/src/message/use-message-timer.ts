import { onActivated, onBeforeUnmount, onDeactivated, onMounted, watch } from 'vue'

interface MessageTimerOptions {
  open: () => boolean
  duration: () => number
  pauseOnHover: () => boolean
  resetOnUpdate: () => boolean
  close: () => void
}

export function useMessageTimer(options: MessageTimerOptions) {
  let timer: ReturnType<typeof setTimeout> | undefined
  let startedAt = 0
  let remaining = 0
  let paused = false
  let generation = 0
  let active = false
  let exhausted = false
  const normalize = (delay: number) => (Number.isFinite(delay) ? Math.max(0, delay) : 0)

  const clear = () => {
    generation += 1
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }
  const start = (delay = options.duration()) => {
    clear()
    remaining = normalize(delay)
    exhausted = false
    if (!active || !options.open() || remaining === 0) {
      return
    }
    startedAt = Date.now()
    const current = generation
    timer = setTimeout(() => {
      if (current !== generation || !active || !options.open()) {
        return
      }
      generation += 1
      timer = undefined
      remaining = 0
      options.close()
    }, remaining)
  }
  const pause = () => {
    if (!options.pauseOnHover() || timer === undefined) {
      return
    }
    remaining = Math.max(0, remaining - (Date.now() - startedAt))
    exhausted = remaining === 0
    paused = true
    clear()
  }
  const resume = () => {
    if (!active || !options.open() || !paused) {
      return
    }
    paused = false
    if (exhausted) {
      exhausted = false
      clear()
      options.close()
      return
    }
    start(remaining)
  }

  watch(options.open, (open) => {
    paused = false
    if (open) {
      start()
    } else {
      clear()
    }
  })
  const activate = () => {
    if (active) {
      return
    }
    active = true
    paused = false
    start()
  }
  const stop = () => {
    active = false
    paused = false
    exhausted = false
    clear()
  }
  onMounted(activate)
  onActivated(activate)
  onDeactivated(stop)
  onBeforeUnmount(stop)

  const restart = () => {
    if (!active || !options.open() || !options.resetOnUpdate()) {
      return
    }
    if (paused) {
      remaining = normalize(options.duration())
      exhausted = false
      clear()
    } else {
      start()
    }
  }

  return { pause, resume, restart, clear }
}
