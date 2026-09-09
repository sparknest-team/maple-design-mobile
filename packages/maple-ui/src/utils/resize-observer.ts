import { onActivated, onBeforeUnmount, onDeactivated, onMounted, onUpdated, watch } from 'vue'

/** Observe current DOM targets only while the popup is active; coalesce layout reads. */
export function useElementResize(
  targets: () => (Element | null | undefined)[],
  enabled: () => boolean,
  update: (entries: readonly ResizeObserverEntry[]) => void,
  fallback?: typeof ResizeObserver,
  immediate = true,
) {
  let mounted = false
  let suspended = false
  let observer: ResizeObserver | undefined
  let view: Window | null | undefined
  let frame: number | undefined
  let observed: Element[] = []
  const currentTargets = () => [...new Set(targets().filter((element): element is Element => !!element))]
  let pending: readonly ResizeObserverEntry[] = []
  const schedule = (entries: readonly ResizeObserverEntry[] = []) => {
    pending = [...pending, ...entries]
    if (frame !== undefined || !view) {
      return
    }
    frame = view.requestAnimationFrame(() => {
      frame = undefined
      const entries = pending
      pending = []
      if (mounted && !suspended && enabled()) {
        update(entries)
      }
    })
  }
  const onResize = () => schedule()
  const clear = () => {
    observer?.disconnect()
    observer = undefined
    observed = []
    view?.removeEventListener('resize', onResize)
    view?.visualViewport?.removeEventListener('resize', onResize)
    view?.visualViewport?.removeEventListener('scroll', onResize)
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
    const Observer =
      (view as (Window & { ResizeObserver?: typeof ResizeObserver }) | undefined)?.ResizeObserver ?? fallback
    if (Observer) {
      observer = new Observer((entries) => schedule(entries))
      for (const element of elements) {
        // The polyfill requires SVG measurement; partial DOM hosts may omit it.
        if (
          Observer === fallback &&
          element.namespaceURI === 'http://www.w3.org/2000/svg' &&
          typeof (element as SVGGraphicsElement).getBBox !== 'function'
        ) {
          continue
        }
        observer.observe(element, { box: 'border-box' })
      }
    }
    view?.addEventListener('resize', onResize, { passive: true })
    view?.visualViewport?.addEventListener('resize', onResize, { passive: true })
    view?.visualViewport?.addEventListener('scroll', onResize, { passive: true })
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
