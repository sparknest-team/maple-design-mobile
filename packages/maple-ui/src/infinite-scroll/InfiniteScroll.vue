<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import Loading from '../loading'
import { createNamespace } from '../utils/components'
import { getParentScroller, isDisplayNoneElement } from '../utils/elements'
import { useInfiniteScrollLocale } from './locale'
import { infiniteScrollProps, type InfiniteScrollStatus } from './props'

defineOptions({ name: createNamespace('infinite-scroll').name })

const props = defineProps(infiniteScrollProps)
const emit = defineEmits<{
  (event: 'update:status', status: InfiniteScrollStatus): void
  (event: 'load' | 'retry'): void
}>()

const { n, classes } = createNamespace('infinite-scroll')
const translate = useInfiniteScrollLocale()
const rootEl = ref<HTMLElement | null>(null)
const detectorEl = ref<HTMLElement | null>(null)
const lengthProbeEl = ref<HTMLElement | null>(null)
const internalStatus = ref<InfiniteScrollStatus>(props.status)

let mounted = false
let active = true
let locked = props.status === 'loading'
let acceptedLoading = locked
let lockOriginStatus: InfiniteScrollStatus | undefined = locked ? 'loading' : undefined
let scroller: HTMLElement | Window | null = null
let resizeObserver: ResizeObserver | null = null
let contentObserver: MutationObserver | null = null
let visibilityObserver: MutationObserver | null = null
let frameId: number | null = null
let timeoutId: number | null = null

watch(
  () => props.status,
  (status) => {
    if (locked) {
      if (status === 'loading') {
        acceptedLoading = true
        internalStatus.value = 'loading'
        return
      }
      if (acceptedLoading || status !== lockOriginStatus) {
        locked = false
        acceptedLoading = false
        lockOriginStatus = undefined
        internalStatus.value = status
      }
    } else {
      internalStatus.value = status
    }
    if (internalStatus.value === 'idle') {
      scheduleCheck()
    }
  },
  { flush: 'sync' },
)

watch(
  () => props.target,
  () => bindScroller(),
  { flush: 'post' },
)
watch(
  () => props.disabled,
  (disabled, previous) => {
    if (previous && !disabled) {
      scheduleCheck()
    }
  },
)
watch(() => props.bottomOffset, scheduleCheck)

onMounted(() => {
  mounted = true
  createLengthProbe()
  bindScroller(true)
})
onActivated(() => {
  if (active) {
    return
  }
  active = true
  if (mounted) {
    bindScroller()
    scheduleCheck()
  }
})
onDeactivated(() => {
  active = false
  cleanupBindings()
})
onBeforeUnmount(() => {
  mounted = false
  cleanupBindings()
  lengthProbeEl.value?.remove()
  lengthProbeEl.value = null
})

function createLengthProbe() {
  if (!rootEl.value || typeof document === 'undefined') {
    return
  }
  const probe = document.createElement('div')
  probe.setAttribute('aria-hidden', 'true')
  Object.assign(probe.style, {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    height: '0',
    overflow: 'hidden',
  })
  rootEl.value.appendChild(probe)
  lengthProbeEl.value = probe
}

function resolveScroller(): HTMLElement | Window | null {
  if (!rootEl.value || typeof window === 'undefined' || typeof document === 'undefined') {
    return null
  }
  if (typeof props.target === 'string') {
    try {
      const target = document.querySelector(props.target)
      return target instanceof HTMLElement ? target : null
    } catch {
      return null
    }
  }
  if (props.target) {
    return typeof HTMLElement !== 'undefined' && props.target instanceof HTMLElement ? props.target : null
  }
  return getParentScroller(rootEl.value)
}

function bindScroller(initial = false) {
  cleanupBindings()
  if (!mounted || !active || typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }
  scroller = resolveScroller()
  if (!scroller) {
    return
  }

  scroller.addEventListener('scroll', scheduleCheck, { passive: true })
  window.addEventListener('resize', scheduleCheck, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)

  if (typeof ResizeObserver !== 'undefined') {
    let skipInitialNotification = initial && !props.immediate
    resizeObserver = new ResizeObserver(() => {
      if (skipInitialNotification) {
        skipInitialNotification = false
        return
      }
      scheduleCheck()
    })
    resizeObserver.observe(rootEl.value!)
    if (scroller instanceof HTMLElement && scroller !== rootEl.value) {
      resizeObserver.observe(scroller)
    }
  }

  if (typeof MutationObserver !== 'undefined') {
    contentObserver = new MutationObserver(scheduleCheck)
    contentObserver.observe(rootEl.value!, { childList: true, subtree: true, characterData: true })
    visibilityObserver = new MutationObserver(scheduleCheck)
    let ancestor = rootEl.value!.parentElement
    while (ancestor && ancestor !== document.body) {
      visibilityObserver.observe(ancestor, {
        attributes: true,
        attributeFilter: ['class', 'style', 'hidden', 'aria-hidden'],
      })
      ancestor = ancestor.parentElement
    }
  }
  if (!initial || props.immediate) {
    scheduleCheck()
  }
}

function cleanupBindings() {
  cancelScheduledCheck()
  scroller?.removeEventListener('scroll', scheduleCheck)
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', scheduleCheck)
  }
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
  resizeObserver?.disconnect()
  contentObserver?.disconnect()
  visibilityObserver?.disconnect()
  resizeObserver = null
  contentObserver = null
  visibilityObserver = null
  scroller = null
}

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    scheduleCheck()
  }
}
function cancelScheduledCheck() {
  if (frameId !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame?.(frameId)
  }
  if (timeoutId !== null && typeof window !== 'undefined') {
    window.clearTimeout(timeoutId)
  }
  frameId = null
  timeoutId = null
}
function scheduleCheck() {
  if (!mounted || !active || frameId !== null || timeoutId !== null || typeof window === 'undefined') {
    return
  }
  const run = () => {
    frameId = null
    timeoutId = null
    check()
  }
  if (typeof window.requestAnimationFrame === 'function') {
    frameId = window.requestAnimationFrame(run)
  } else {
    timeoutId = window.setTimeout(run, 0)
  }
}

function getBottomOffsetPx() {
  if (typeof props.bottomOffset === 'number') {
    return Number.isFinite(props.bottomOffset) ? props.bottomOffset : 0
  }
  const value = props.bottomOffset.trim()
  const probe = lengthProbeEl.value
  if (!value || !probe) {
    return 0
  }
  if (window.CSS?.supports && !window.CSS.supports('width', value)) {
    return 0
  }
  probe.style.width = ''
  probe.style.width = value
  if (!probe.style.width) {
    return 0
  }
  const width = probe.getBoundingClientRect().width
  if (Number.isFinite(width) && width !== 0) {
    return width
  }
  const computedWidth = window.getComputedStyle(probe).width
  const pixels = Number.parseFloat(computedWidth)
  return computedWidth.endsWith('px') && Number.isFinite(pixels) ? pixels : 0
}

function isMeasurable() {
  const root = rootEl.value
  return Boolean(root && !isDisplayNoneElement(root))
}
function isReachBottom() {
  const root = rootEl.value
  const detector = detectorEl.value
  if (!root || !detector || !scroller || !isMeasurable()) {
    return false
  }
  const bottomOffset = getBottomOffsetPx()
  if (scroller instanceof HTMLElement && root.contains(scroller)) {
    if (scroller.clientHeight <= 0) {
      return false
    }
    return scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= bottomOffset
  }
  const scrollerBottom =
    scroller instanceof HTMLElement
      ? scroller.getBoundingClientRect().bottom
      : window.innerHeight || document.documentElement.clientHeight
  return detector.getBoundingClientRect().bottom - scrollerBottom <= bottomOffset
}

function startRequest(event: 'load' | 'retry') {
  lockOriginStatus = internalStatus.value
  locked = true
  acceptedLoading = false
  internalStatus.value = 'loading'
  emit('update:status', 'loading')
  emit(event)
}
function check() {
  if (!mounted || !active || props.disabled || locked || internalStatus.value !== 'idle' || !isReachBottom()) {
    return
  }
  startRequest('load')
}
function retry() {
  if (!mounted || !active || props.disabled || locked || internalStatus.value !== 'error') {
    return
  }
  startRequest('retry')
}

defineExpose({ check, retry })
</script>

<template>
  <div ref="rootEl" :class="classes(n(), n('$--box'))">
    <slot />
    <div ref="detectorEl" :class="n('detector')" aria-hidden="true"></div>
    <div v-if="internalStatus === 'loading'" :class="classes(n('status'), n('loading'))" role="status">
      <slot name="loading">
        <Loading size="xs" />
        <span :class="n('loading-text')">{{ translate('loading') }}</span>
      </slot>
    </div>
    <div v-else-if="internalStatus === 'error'" :class="classes(n('status'), n('error'))">
      <slot name="error" :retry="retry">
        <button type="button" :class="n('retry')" @click="retry">{{ translate('error') }}</button>
      </slot>
    </div>
    <div v-else-if="internalStatus === 'finished'" :class="classes(n('status'), n('finished'))" role="status">
      <slot name="finished">{{ translate('finished') }}</slot>
    </div>
  </div>
</template>
