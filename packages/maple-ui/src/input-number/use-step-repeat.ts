import { onDeactivated, onScopeDispose } from 'vue'

/** Each component instance owns its timer. No DOM event redispatch. */
export function useStepRepeat() {
  let timer: ReturnType<typeof setTimeout> | undefined
  let owner: Window | undefined
  let generation = 0
  let disposed = false

  function stop() {
    generation += 1
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = undefined
    owner?.removeEventListener('mouseup', stop)
    owner?.removeEventListener('pointerup', stop)
    owner?.removeEventListener('pointercancel', stop)
    owner?.removeEventListener('blur', stop)
    owner = undefined
  }

  function start(step: () => boolean, targetWindow?: Window | null) {
    stop()
    if (disposed) {
      return
    }
    const currentGeneration = generation
    owner = targetWindow ?? (typeof window === 'undefined' ? undefined : window)
    if (!owner) {
      return
    }
    owner.addEventListener('mouseup', stop)
    owner.addEventListener('pointerup', stop)
    owner.addEventListener('pointercancel', stop)
    owner.addEventListener('blur', stop)
    const repeat = () => {
      if (!step()) {
        stop()
        return
      }
      if (currentGeneration === generation) {
        timer = setTimeout(repeat, 150)
      }
    }
    timer = setTimeout(repeat, 800)
  }

  onDeactivated(stop)
  onScopeDispose(() => {
    disposed = true
    stop()
  })
  return { start, stop }
}
