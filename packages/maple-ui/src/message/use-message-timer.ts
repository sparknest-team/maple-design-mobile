import { onMounted, onUnmounted, watch } from 'vue'

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

  const clear = () => {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
  }
  const start = (delay = options.duration()) => {
    clear()
    remaining = Math.max(0, delay)
    if (!options.open() || remaining === 0) {
      return
    }
    startedAt = Date.now()
    timer = setTimeout(() => {
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
    paused = true
    clear()
  }
  const resume = () => {
    if (!paused) {
      return
    }
    paused = false
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
  onMounted(() => {
    if (options.open()) {
      start()
    }
  })
  onUnmounted(clear)

  const restart = () => {
    if (!options.open() || !options.resetOnUpdate()) {
      return
    }
    if (paused) {
      remaining = Math.max(0, options.duration())
      clear()
    } else {
      start()
    }
  }

  return { pause, resume, restart, clear }
}
