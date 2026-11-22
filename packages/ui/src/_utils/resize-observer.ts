import { onActivated, onBeforeUnmount, onDeactivated, onMounted, onUpdated, watch } from 'vue'

/** Observe current DOM targets only while the popup is active; coalesce layout reads. */
export function useElementResize(
  targets: () => (Element | null | undefined)[],
  enabled: () => boolean,
  update: (entries: readonly ResizeObserverEntry[]) => void,
  immediate = true,
) {
  let mounted = false
  let suspended = false
  let observer: ResizeObserver | undefined
  let view: Window | null | undefined
  let boundViewport: VisualViewport | null | undefined
  let onResize: (() => void) | undefined
  let frame: number | undefined
  let observed: Element[] = []
  const currentTargets = () => [...new Set(targets().filter((element): element is Element => !!element))]
  let pending: readonly ResizeObserverEntry[] = []
  let bindingGeneration = 0
  let frameGeneration = 0
  const schedule = (entries: readonly ResizeObserverEntry[] = [], binding = bindingGeneration) => {
    if (binding !== bindingGeneration || !mounted || suspended || !enabled() || !view) {
      return
    }
    pending = [...pending, ...entries]
    if (frame !== undefined || !view) {
      return
    }
    const currentFrame = ++frameGeneration
    frame = view.requestAnimationFrame(() => {
      if (binding !== bindingGeneration || currentFrame !== frameGeneration) {
        return
      }
      frameGeneration++
      frame = undefined
      const entries = pending
      pending = []
      if (mounted && !suspended && enabled()) {
        update(entries)
      }
    })
  }
  const clear = () => {
    bindingGeneration++
    frameGeneration++
    observer?.disconnect()
    observer = undefined
    observed = []
    if (onResize) {
      view?.removeEventListener('resize', onResize)
      boundViewport?.removeEventListener('resize', onResize)
      boundViewport?.removeEventListener('scroll', onResize)
    }
    onResize = undefined
    boundViewport = undefined
    if (frame !== undefined) {
      view?.cancelAnimationFrame(frame)
    }
    frame = undefined
    pending = []
    view = undefined
  }
  const bind = () => {
    clear()
    if (!mounted || suspended || !enabled()) {
      return
    }
    const elements = currentTargets()
    observed = elements
    view = elements[0]?.ownerDocument.defaultView
    const Observer = (view as (Window & { ResizeObserver?: typeof ResizeObserver }) | undefined)?.ResizeObserver
    const binding = bindingGeneration
    onResize = () => schedule([], binding)
    boundViewport = view?.visualViewport
    if (Observer) {
      observer = new Observer((entries) => schedule(entries, binding))
      for (const element of elements) {
        observer.observe(element, { box: 'border-box' })
      }
    }
    view?.addEventListener('resize', onResize, { passive: true })
    boundViewport?.addEventListener('resize', onResize, { passive: true })
    boundViewport?.addEventListener('scroll', onResize, { passive: true })
    if (immediate) {
      schedule()
    }
  }
  watch(() => [enabled(), ...targets()], bind, { flush: 'post' })
  onUpdated(() => {
    if (!enabled()) {
      return
    }
    const elements = currentTargets()
    if (elements.length !== observed.length || elements.some((element, index) => element !== observed[index])) {
      bind()
    }
  })
  onMounted(() => {
    mounted = true
    bind()
  })
  onActivated(() => {
    suspended = false
    bind()
  })
  onDeactivated(() => {
    suspended = true
    clear()
  })
  onBeforeUnmount(() => {
    mounted = false
    clear()
  })
}
