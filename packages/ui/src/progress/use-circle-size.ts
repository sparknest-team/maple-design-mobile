import { computed, onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch, type Ref } from 'vue'

export function useCircleSize(
  element: Ref<HTMLElement | undefined>,
  length: () => string,
  stroke: () => number | string | undefined,
) {
  const measured = ref(0)
  const measuredStroke = ref(0)
  let active = false
  let observer: ResizeObserver | undefined
  let styleObserver: MutationObserver | undefined
  let probe: HTMLElement | undefined
  let owner: Window | undefined
  const fallback = computed(() => (/^\d+(\.\d+)?px$/.test(length()) ? parseFloat(length()) : 64))
  const diameter = computed(() => Math.max(1, measured.value || fallback.value))
  const strokeWidth = computed(() => {
    const value = stroke()
    const fallbackStroke =
      value == null ? 4 : typeof value === 'number' ? value : /^\d+(\.\d+)?px$/.test(value) ? parseFloat(value) : 4
    const px = measuredStroke.value || fallbackStroke
    return Math.min(diameter.value * 0.99, Number.isFinite(px) && px > 0 ? px : 4)
  })
  const measure = () => {
    const host = element.value
    if (!active || !host || !probe) {
      return
    }
    const view = host.ownerDocument.defaultView
    if (!view) {
      return
    }
    const width = parseFloat(view.getComputedStyle(host).width)
    const resolvedStroke = parseFloat(view.getComputedStyle(probe).width)
    measured.value = Number.isFinite(width) && width > 0 ? width : 0
    measuredStroke.value = Number.isFinite(resolvedStroke) && resolvedStroke > 0 ? resolvedStroke : 0
  }
  const updateProbe = () => {
    if (!probe) {
      return
    }
    const value = stroke()
    probe.style.width = typeof value === 'number' ? `${value}px` : (value ?? '4px')
    measure()
  }
  const disconnect = () => {
    observer?.disconnect()
    styleObserver?.disconnect()
    owner?.removeEventListener('resize', measure)
    probe?.remove()
    observer = undefined
    styleObserver = undefined
    owner = undefined
    probe = undefined
    measured.value = 0
    measuredStroke.value = 0
  }
  const observe = () => {
    disconnect()
    const host = element.value
    if (!active || !host) {
      return
    }
    const doc = host.ownerDocument
    owner = doc.defaultView ?? undefined
    probe = doc.createElement('span')
    Object.assign(probe.style, {
      position: 'absolute',
      visibility: 'hidden',
      pointerEvents: 'none',
      height: '0',
      minWidth: '0',
      maxWidth: 'none',
      margin: '0',
      padding: '0',
      border: '0',
      boxSizing: 'content-box',
    })
    probe.setAttribute('aria-hidden', 'true')
    host.appendChild(probe)
    updateProbe()
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      observer.observe(host)
      observer.observe(probe)
    }
    if (typeof MutationObserver !== 'undefined') {
      styleObserver = new MutationObserver(measure)
      for (let current: HTMLElement | null = host; current; current = current.parentElement) {
        styleObserver.observe(current, { attributes: true, attributeFilter: ['style', 'class'] })
      }
    }
    owner?.addEventListener('resize', measure)
  }
  const attach = () => {
    if (active) {
      return
    }
    active = true
    observe()
  }
  const detach = () => {
    active = false
    disconnect()
  }
  onMounted(attach)
  onActivated(attach)
  onDeactivated(detach)
  onBeforeUnmount(detach)
  watch(element, observe, { flush: 'post' })
  watch([length, stroke], updateProbe, { flush: 'post' })
  return { diameter, strokeWidth }
}
