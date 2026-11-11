import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import type { ExtractPublicPropTypes } from 'vue'
import type { BackTopEasing, backTopProps } from './props'

export function useBackTop(props: ExtractPublicPropTypes<typeof backTopProps>) {
  const visible = ref(false)
  const mounted = ref(false)
  let active = false
  let target: HTMLElement | undefined
  let listener: HTMLElement | Window | undefined
  let scrollFrame: number | undefined
  let animationFrame: number | undefined
  let animationGeneration = 0
  let animationFrameGeneration = 0
  let scrollGeneration = 0
  let bindingGeneration = 0
  let scrollOwner: Window | undefined
  let animationOwner: Window | undefined
  let scrollListener: (() => void) | undefined

  function cancelAnimation() {
    animationGeneration += 1
    animationFrameGeneration += 1
    if (animationFrame !== undefined) {
      animationOwner?.cancelAnimationFrame(animationFrame)
    }
    animationFrame = undefined
    animationOwner = undefined
  }
  function update() {
    const height = Number(props.visibleHeight ?? 200)
    visible.value = !!target && target.scrollTop >= (Number.isFinite(height) ? Math.max(0, height) : 200)
  }
  function onScroll() {
    if (!active || !target || scrollFrame !== undefined) {
      return
    }
    const element = target
    const view = element.ownerDocument.defaultView
    if (!view) {
      return
    }
    const generation = ++scrollGeneration
    scrollOwner = view
    scrollFrame = view.requestAnimationFrame(() => {
      if (!active || target !== element || generation !== scrollGeneration) {
        return
      }
      scrollGeneration++
      scrollFrame = undefined
      scrollOwner = undefined
      update()
    })
  }
  function cleanup() {
    bindingGeneration++
    scrollGeneration++
    if (scrollListener) {
      listener?.removeEventListener('scroll', scrollListener)
    }
    scrollListener = undefined
    listener = undefined
    cancelAnimation()
    if (scrollFrame !== undefined) {
      scrollOwner?.cancelAnimationFrame(scrollFrame)
    }
    scrollFrame = undefined
    scrollOwner = undefined
    target = undefined
    visible.value = false
  }
  function bind() {
    if (!active) {
      return
    }
    let nextTarget: HTMLElement | undefined
    let nextListener: HTMLElement | Window | undefined
    const source = props.targetContainer
    if (source == null) {
      nextTarget = (document.scrollingElement ?? document.documentElement) as HTMLElement
      nextListener = window
    } else {
      try {
        const value = typeof source === 'function' ? source() : source
        nextTarget = (typeof value === 'string' ? document.querySelector<HTMLElement>(value) : value) ?? undefined
      } catch {
        nextTarget = undefined
      }
      nextListener = nextTarget
    }
    if (target === nextTarget && listener === nextListener) {
      update()
      return
    }
    cleanup()
    target = nextTarget
    listener = nextListener
    const generation = bindingGeneration
    scrollListener = () => {
      if (generation === bindingGeneration) {
        onScroll()
      }
    }
    listener?.addEventListener('scroll', scrollListener, { passive: true })
    update()
  }
  function scrollToTop() {
    if (!active || !target) {
      return
    }
    cancelAnimation()
    const element = target
    const generation = animationGeneration
    const start = element.scrollTop
    const duration = Number(props.duration ?? 200)
    const reduced = prefersReducedMotion(element)
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
    const isCurrent = () => active && target === element && generation === animationGeneration
    const schedule = () => {
      if (!isCurrent()) {
        return
      }
      const frameGeneration = ++animationFrameGeneration
      animationOwner = view
      animationFrame = view.requestAnimationFrame((now) => {
        if (!isCurrent() || frameGeneration !== animationFrameGeneration) {
          return
        }
        animationFrameGeneration++
        animationFrame = undefined
        step(now)
      })
    }
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
      if (!reduced && progress < 1) {
        schedule()
      } else {
        animationOwner = undefined
      }
    }
    schedule()
  }

  function activate() {
    active = true
    bind()
  }
  onMounted(() => {
    mounted.value = true
    activate()
  })
  onActivated(activate)
  onDeactivated(() => {
    active = false
    cleanup()
  })
  onBeforeUnmount(() => {
    active = false
    cleanup()
  })
  watch(
    () =>
      !mounted.value
        ? undefined
        : typeof props.targetContainer === 'function'
          ? props.targetContainer()
          : props.targetContainer,
    bind,
    { flush: 'post' },
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
