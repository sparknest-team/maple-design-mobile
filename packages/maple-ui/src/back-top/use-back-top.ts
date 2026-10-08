import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import type { BackTopEasing, BackTopProps } from './props'

export function useBackTop(props: BackTopProps) {
  const visible = ref(false)
  const mounted = ref(false)
  let active = false
  let target: HTMLElement | undefined
  let listener: HTMLElement | Window | undefined
  let scrollFrame: number | undefined
  let animationFrame: number | undefined

  function cancelAnimation() {
    if (animationFrame !== undefined) {
      cancelAnimationFrame(animationFrame)
    }
    animationFrame = undefined
  }
  function update() {
    const height = Number(props.visibleHeight ?? 200)
    visible.value = !!target && target.scrollTop >= (Number.isFinite(height) ? Math.max(0, height) : 200)
  }
  function onScroll() {
    if (scrollFrame !== undefined) {
      return
    }
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = undefined
      update()
    })
  }
  function cleanup() {
    listener?.removeEventListener('scroll', onScroll)
    listener = undefined
    cancelAnimation()
    if (scrollFrame !== undefined) {
      cancelAnimationFrame(scrollFrame)
    }
    scrollFrame = undefined
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
    listener?.addEventListener('scroll', onScroll, { passive: true })
    update()
  }
  function scrollToTop() {
    if (!active || !target) {
      return
    }
    cancelAnimation()
    const element = target
    const start = element.scrollTop
    const duration = Number(props.duration ?? 200)
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || !Number.isFinite(duration) || duration <= 0 || start <= 0) {
      element.scrollTop = 0
      update()
      return
    }
    const easing = props.easing ?? 'quartOut'
    const begin = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - begin) / duration))
      element.scrollTop = progress === 1 ? 0 : start * (1 - ease(progress, easing))
      update()
      animationFrame = progress < 1 ? requestAnimationFrame(step) : undefined
    }
    animationFrame = requestAnimationFrame(step)
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
export function ease(progress: number, easing: BackTopEasing) {
  if (typeof easing === 'function') {
    return easing(progress)
  }
  if (easing === 'linear') {
    return progress
  }
  if (easing === 'easeInOutCubic') {
    return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
  }
  return 1 - (1 - progress) ** 4
}
