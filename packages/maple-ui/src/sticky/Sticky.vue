<template>
  <div
    ref="stickyEl"
    :class="classes(n(), [enableCSSMode, n('--css-mode')])"
    :style="{
      zIndex: toNumber(zIndex),
      top: enableCSSMode ? `${offsetTop}px` : undefined,
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

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { call, doubleRaf, getRect, raf, toNumber } from '@maplejs/maple-shared'
import { onSmartMounted, onSmartUnmounted, onWindowResize, useEventListener } from '@maplejs/maple-use'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTarget, toPxNum } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('sticky')

export default defineComponent({
  name,
  props,
  setup(props) {
    const stickyEl = ref<HTMLElement | null>(null)
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
    const offsetTop = computed(() => toPxNum(props.offsetTop))

    let scroller: HTMLElement | Window
    let lastFixed = false

    watch(() => [props.disabled, props.cssMode, props.target, props.offsetTop], resize)

    onSmartMounted(async () => {
      await doubleRaf()
      setupScroller()
      handleScroll()
    })

    onSmartUnmounted(removeScrollListener)

    onWindowResize(resize)

    useEventListener(() => window, 'scroll', handleScroll)

    function emitChange(fixed: boolean, currentOffsetTop: number) {
      if (fixed === lastFixed) {
        return
      }

      lastFixed = fixed
      call(props.onChange, fixed, currentOffsetTop)
    }

    function computeFixedParams() {
      const { cssMode, disabled } = props

      if (disabled) {
        isFixed.value = false
        emitChange(false, 0)
        return
      }

      let scrollerTop = 0

      if (scroller && scroller !== window) {
        const { top } = getRect(scroller as HTMLElement)
        scrollerTop = top
      }

      const wrapper = wrapperEl.value as HTMLElement
      const sticky = stickyEl.value as HTMLElement
      const { top: stickyTop, left: stickyLeft } = getRect(sticky)
      const currentOffsetTop = stickyTop - scrollerTop

      if (currentOffsetTop <= offsetTop.value) {
        if (!cssMode) {
          fixedWidth.value = `${sticky.offsetWidth}px`
          fixedHeight.value = `${sticky.offsetHeight}px`
          fixedTop.value = `${scrollerTop + offsetTop.value}px`
          fixedLeft.value = `${stickyLeft}px`
          fixedWrapperWidth.value = `${wrapper.offsetWidth}px`
          fixedWrapperHeight.value = `${wrapper.offsetHeight}px`
          isFixed.value = true
        }

        emitChange(true, offsetTop.value)
        return
      }

      isFixed.value = false
      emitChange(false, currentOffsetTop)
    }

    function setupScroller() {
      removeScrollListener()

      if (props.target) {
        scroller =
          props.target === window ? window : (getTarget(props.target as string | HTMLElement, 'Sticky') ?? window)
      } else {
        scroller = getParentScroller(stickyEl.value as HTMLElement)
      }

      if (scroller !== window) {
        scroller.addEventListener('scroll', handleScroll)
      }
    }

    function handleScroll() {
      computeFixedParams()
    }

    function removeScrollListener() {
      if (!scroller || scroller === window) {
        return
      }

      scroller.removeEventListener('scroll', handleScroll)
    }

    async function resize() {
      isFixed.value = false
      lastFixed = false
      await raf()
      setupScroller()
      computeFixedParams()
    }

    return {
      stickyEl,
      wrapperEl,
      isFixed,
      offsetTop,
      fixedTop,
      fixedLeft,
      fixedWidth,
      fixedHeight,
      fixedWrapperWidth,
      fixedWrapperHeight,
      enableCSSMode,
      enableFixedMode,
      n,
      classes,
      resize,
      toNumber,
    }
  },
})
</script>
<style lang="less">
@import '../styles/common';
@import './sticky';
</style>
