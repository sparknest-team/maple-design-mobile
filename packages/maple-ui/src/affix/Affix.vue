<template>
  <div
    ref="affixEl"
    :class="classes(n(), [enableCSSMode, n('--css-mode')])"
    :style="{
      zIndex: toNumber(zIndex),
      top: enableCSSMode && offsetBottom == null ? toSizeUnit(offsetTop) : undefined,
      bottom: enableCSSMode && offsetBottom != null ? toSizeUnit(offsetBottom) : undefined,
      width: enableFixedMode ? fixedWidth : undefined,
      height: enableFixedMode ? fixedHeight : undefined,
    }"
  >
    <div
      ref="wrapperEl"
      :class="n('wrapper')"
      :style="{
        zIndex: toNumber(zIndex),
        position: enableFixedMode ? 'fixed' : undefined,
        width: enableFixedMode ? fixedWrapperWidth : undefined,
        height: enableFixedMode ? fixedWrapperHeight : undefined,
        left: enableFixedMode ? fixedLeft : undefined,
        top: enableFixedMode ? fixedTop : undefined,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { doubleRaf, getRect, raf, toNumber } from '@maple-design/shared'
import { onSmartMounted, onSmartUnmounted, onWindowResize, useEventListener } from '@maple-design/use'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTarget, toPxNum, toSizeUnit } from '../utils/elements'
import { affixProps } from './props'

defineOptions({ name: createNamespace('affix').name })
const { n, classes } = createNamespace('affix')
const props = defineProps(affixProps)
const emit = defineEmits<{ change: [fixed: boolean, offset: number] }>()
const affixEl = ref<HTMLElement | null>(null)
const wrapperEl = ref<HTMLElement | null>(null)
const isFixed = ref(false)
const fixedTop = ref('0px')
const fixedLeft = ref('0px')
const fixedWidth = ref('auto')
const fixedHeight = ref('auto')
const fixedWrapperWidth = ref('auto')
const fixedWrapperHeight = ref('auto')
const enableCSSMode = computed(() => !props.disabled && props.cssMode)
const enableFixedMode = computed(() => !props.disabled && !props.cssMode && isFixed.value)
let active = true
let lifecycle = 0
let resizeVersion = 0
let observer: ResizeObserver | undefined
let container: HTMLElement | Window | undefined
let scroller: HTMLElement | Window
let lastFixed = false

watch(
  () => [props.disabled, props.cssMode, props.target, props.targetContainer, props.offsetTop, props.offsetBottom],
  resize,
)

onSmartMounted(async () => {
  active = true
  const cycle = ++lifecycle
  await doubleRaf()
  if (!active || cycle !== lifecycle) {
    return
  }
  setupScroller()
  handleScroll()
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(() => {
      if (active && cycle === lifecycle) {
        handleScroll()
      }
    })
    if (affixEl.value) {
      observer.observe(affixEl.value)
    }
    if (wrapperEl.value) {
      observer.observe(wrapperEl.value)
    }
  }
})

onSmartUnmounted(() => {
  active = false
  lifecycle++
  resizeVersion++
  observer?.disconnect()
  removeScrollListener()
})

onWindowResize(resize)

useEventListener(() => window, 'scroll', handleScroll)

function emitChange(fixed: boolean, currentOffsetTop: number) {
  if (fixed === lastFixed) {
    return
  }

  lastFixed = fixed
  emit('change', fixed, currentOffsetTop)
}

function computeFixedParams() {
  if (!active || !affixEl.value || !wrapperEl.value) {
    return
  }
  const offsetTop = toPxNum(props.offsetTop)
  const offsetBottom = props.offsetBottom == null ? undefined : toPxNum(props.offsetBottom)
  const { cssMode, disabled } = props

  if (disabled) {
    isFixed.value = false
    emitChange(false, 0)
    return
  }

  if (!active || !affixEl.value || !wrapperEl.value) {
    return
  }

  let scrollerTop = 0
  let scrollerBottom = window.innerHeight

  if (scroller && scroller !== window) {
    const rect = getRect(scroller as HTMLElement)
    scrollerTop = rect.top
    scrollerBottom = rect.bottom
  }

  const wrapper = wrapperEl.value as HTMLElement
  const sticky = affixEl.value as HTMLElement
  const { top: stickyTop, left: stickyLeft, bottom: stickyBottom } = getRect(sticky)
  const currentOffsetTop = offsetBottom == null ? stickyTop - scrollerTop : scrollerBottom - stickyBottom
  const threshold = offsetBottom ?? offsetTop

  if (currentOffsetTop <= threshold) {
    if (!cssMode) {
      fixedWidth.value = `${sticky.offsetWidth}px`
      fixedHeight.value = `${sticky.offsetHeight}px`
      fixedTop.value = `${offsetBottom == null ? scrollerTop + offsetTop : scrollerBottom - offsetBottom - wrapper.offsetHeight}px`
      fixedLeft.value = `${stickyLeft}px`
      fixedWrapperWidth.value = `${wrapper.offsetWidth}px`
      fixedWrapperHeight.value = `${wrapper.offsetHeight}px`
      isFixed.value = true
    }

    emitChange(true, threshold)
    return
  }

  isFixed.value = false
  emitChange(false, currentOffsetTop)
}

function setupScroller() {
  removeScrollListener()

  if (props.target) {
    scroller = props.target === window ? window : (getTarget(props.target as string | HTMLElement, 'Affix') ?? window)
  } else {
    scroller = getParentScroller(affixEl.value as HTMLElement)
  }

  if (scroller !== window) {
    scroller.addEventListener('scroll', handleScroll)
  }
  container =
    props.targetContainer === window
      ? window
      : props.targetContainer
        ? (getTarget(props.targetContainer as string | HTMLElement, 'Affix') ?? undefined)
        : undefined
  if (container && container !== window && container !== scroller) {
    container.addEventListener('scroll', handleScroll)
  }
}

function handleScroll() {
  computeFixedParams()
}

function removeScrollListener() {
  if (container && container !== window && container !== scroller) {
    container.removeEventListener('scroll', handleScroll)
  }
  if (!scroller || scroller === window) {
    return
  }

  scroller.removeEventListener('scroll', handleScroll)
}

async function resize() {
  if (!active) {
    return
  }
  const cycle = lifecycle
  const version = ++resizeVersion
  isFixed.value = false
  await raf()
  if (!active || cycle !== lifecycle || version !== resizeVersion || !affixEl.value || !wrapperEl.value) {
    return
  }
  setupScroller()
  computeFixedParams()
}

defineExpose({ updatePosition: resize })
</script>
