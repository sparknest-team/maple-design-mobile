import { onActivated, onDeactivated, onScopeDispose } from 'vue'

/** Each component instance owns its timer. No DOM event redispatch. */
export function useStepRepeat() {
  let timer: ReturnType<typeof setTimeout> | undefined
  let owner: Window | undefined
  let generation = 0
  let disposed = false
  let suspended = false

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
    if (disposed || suspended) {
      return
    }
    owner = targetWindow ?? (typeof window === 'undefined' ? undefined : window)
    if (!owner) {
      return
    }
    owner.addEventListener('mouseup', stop)
    owner.addEventListener('pointerup', stop)
    owner.addEventListener('pointercancel', stop)
    owner.addEventListener('blur', stop)
    const createRepeat = (): (() => void) => {
      const currentGeneration = ++generation
      return () => {
        if (disposed || suspended || currentGeneration !== generation) {
          return
        }
        timer = undefined
        // Consume before user code: reentrant start/stop owns a different generation.
        const consumedGeneration = ++generation
        const shouldRepeat = step()
        if (consumedGeneration !== generation) {
          return
        }
        if (!shouldRepeat) {
          stop()
          return
        }
        timer = setTimeout(createRepeat(), 150)
      }
    }
    timer = setTimeout(createRepeat(), 800)
  }

  onActivated(() => {
    suspended = false
  })
  onDeactivated(() => {
    suspended = true
    stop()
  })
  onScopeDispose(() => {
    disposed = true
    stop()
  })
  return { start, stop }
}
