import { getCurrentInstance, ref, watch } from 'vue'
import { createFrame } from '../_utils/animation-frame'
import type { CompatiblePublicProps as ExtractPublicPropTypes } from '../_utils/public-props'
import { onActiveLifecycle } from '../utils/active-target'
import type { BackTopEasing, backTopProps } from './props'

export function useBackTop(props: ExtractPublicPropTypes<typeof backTopProps>) {
  const visible = ref(false)
  const mounted = ref(false)
  const instance = getCurrentInstance()!
  let target: HTMLElement | undefined
  const scrollFrame = createFrame()
  const animationFrame = createFrame()
  let animationGeneration = 0

  function cancelAnimation() {
    animationGeneration++
    animationFrame.cancel()
  }
  function update() {
    const height = Number(props.visibleHeight ?? 200)
    visible.value = !!target && target.scrollTop >= (Number.isFinite(height) ? Math.max(0, height) : 200)
  }
  function resolveContainer(): HTMLElement | Document | undefined {
    const doc: Document = instance.vnode.el!.ownerDocument
    const source = props.targetContainer
    if (source == null) {
      return doc
    }
    try {
      if (typeof source === 'string') {
        return doc.querySelector<HTMLElement>(source) ?? undefined
      }
      return typeof source === 'function' ? (source() ?? undefined) : source
    } catch {
      return undefined
    }
  }

  function bind(container: HTMLElement | Document | undefined, _: unknown, cleanup: (fn: () => void) => void) {
    if (!container) {
      return
    }
    const doc = container.nodeType === 9 ? (container as Document) : undefined
    const element = doc ? ((doc.scrollingElement ?? doc.documentElement) as HTMLElement) : (container as HTMLElement)
    const listener = doc?.defaultView ?? container
    let bound = true
    const onScroll = () => {
      const view = element.ownerDocument.defaultView
      if (bound && view) {
        scrollFrame.request(view, update)
      }
    }
    target = element
    listener.addEventListener('scroll', onScroll, { passive: true })
    cleanup(() => {
      bound = false
      listener.removeEventListener('scroll', onScroll)
      cancelAnimation()
      scrollFrame.cancel()
      target = undefined
      visible.value = false
    })
    update()
  }
  function scrollToTop() {
    if (!target) {
      return
    }
    cancelAnimation()
    const element = target
    const generation = animationGeneration
    const isCurrent = () => generation === animationGeneration
    const start = element.scrollTop
    const duration = Number(props.duration ?? 200)
    const reduced = prefersReducedMotion(element)
    if (!isCurrent()) {
      return
    }
    if (reduced || !Number.isFinite(duration) || duration <= 0 || start <= 0) {
      element.scrollTop = 0
      update()
      return
    }
    const view = element.ownerDocument.defaultView
    if (!view) {
      return
    }
    const easing = props.easing ?? 'quartOut'
    const begin = view.performance.now()
    const step = (now: number) => {
      if (!isCurrent()) {
        return
      }
      const reduced = prefersReducedMotion(element)
      if (!isCurrent()) {
        return
      }
      const progress = Math.min(1, Math.max(0, (now - begin) / duration))
      const next = reduced || progress === 1 ? 0 : start * (1 - ease(progress, easing))
      // User easing/scroll setters can synchronously cancel or dispose this request.
      if (!isCurrent()) {
        return
      }
      element.scrollTop = next
      if (!isCurrent()) {
        return
      }
      update()
      if (!reduced && progress < 1 && isCurrent()) {
        animationFrame.request(view, step)
      }
    }
    animationFrame.request(view, step)
  }

  let stopWatching: (() => void) | undefined
  onActiveLifecycle(
    () => {
      mounted.value = true
      stopWatching ??= watch(resolveContainer, bind, { immediate: true, flush: 'post' })
    },
    () => {
      stopWatching?.()
      stopWatching = undefined
    },
  )
  watch(() => props.visibleHeight, update)
  return { visible, mounted, scrollToTop }
}
function prefersReducedMotion(element: HTMLElement) {
  const view = element.ownerDocument.defaultView
  return (
    (view?.matchMedia
      ? view.matchMedia('(prefers-reduced-motion: reduce)')
      : window.matchMedia?.('(prefers-reduced-motion: reduce)')
    )?.matches ?? false
  )
}
export function ease(progress: number, easing: BackTopEasing) {
  if (typeof easing === 'function') {
    const result = easing(progress)
    return Number.isFinite(result) ? Math.min(1, Math.max(0, result)) : progress
  }
  if (easing === 'linear') {
    return progress
  }
  if (easing === 'easeInOutCubic') {
    return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
  }
  return 1 - (1 - progress) ** 4
}
