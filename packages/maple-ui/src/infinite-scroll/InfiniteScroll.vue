<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { call } from '@maplejs/maple-shared'
import MpLoading from '../loading'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { getParentScroller, isDisplayNoneElement } from '../utils/elements'
import { infiniteScrollProps, type InfiniteScrollStatus } from './props'
import { useTabItem } from './provide'

const { name, n, classes } = createNamespace('infinite-scroll')

export default defineComponent({
  name,
  directives: { Ripple },
  components: { MpLoading },
  props: infiniteScrollProps,
  emits: ['update:status', 'load', 'retry'],
  setup(props, { emit }) {
    const rootEl = ref<HTMLElement | null>(null)
    const detectorEl = ref<HTMLElement | null>(null)
    const lengthProbeEl = ref<HTMLElement | null>(null)
    const internalStatus = ref<InfiniteScrollStatus>(props.status)
    const { tabItem, bindTabItem } = useTabItem()
    const { t: pt } = injectLocaleProvider()

    let mounted = false
    let locked = false
    let acceptedLoading = false
    let lockOriginStatus: InfiniteScrollStatus | undefined
    let scroller: HTMLElement | Window | null = null
    let resizeObserver: ResizeObserver | null = null
    let mutationObserver: MutationObserver | null = null
    let frameId: number | null = null

    call(bindTabItem, {})

    watch(
      () => props.status,
      (value) => {
        if (locked) {
          if (value === 'loading') {
            acceptedLoading = true
            internalStatus.value = 'loading'
            return
          }

          if (acceptedLoading || value !== lockOriginStatus) {
            locked = false
            acceptedLoading = false
            lockOriginStatus = undefined
            internalStatus.value = value
          }
        } else {
          internalStatus.value = value
        }

        if (internalStatus.value === 'idle') {
          queueCheck()
        }
      },
    )

    watch(
      () => props.target,
      () => {
        if (!mounted) {
          return
        }
        bindScroller()
        queueCheck()
      },
    )

    watch(
      () => props.disabled,
      (value, oldValue) => {
        if (oldValue && !value) {
          queueCheck()
        }
      },
    )

    if (tabItem) {
      watch(
        () => tabItem.current.value,
        (current) => {
          if (current) {
            queueCheck()
          } else {
            cancelQueuedCheck()
          }
        },
      )
    }

    onMounted(() => {
      mounted = true
      createLengthProbe()
      bindScroller()
      if (props.immediate) {
        queueCheck()
      }
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
      probe.style.position = 'absolute'
      probe.style.visibility = 'hidden'
      probe.style.pointerEvents = 'none'
      probe.style.height = '0'
      probe.style.overflow = 'hidden'
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
          console.warn(`[${name}] target must be a valid CSS selector`)
          return null
        }
      }

      if (props.target) {
        return typeof HTMLElement !== 'undefined' && props.target instanceof HTMLElement ? props.target : null
      }

      return getParentScroller(rootEl.value)
    }

    function bindScroller() {
      cleanupBindings()
      if (!mounted) {
        return
      }

      scroller = resolveScroller()
      if (!scroller) {
        return
      }

      scroller.addEventListener('scroll', queueCheck, { passive: true })
      window.addEventListener('resize', queueCheck, { passive: true })
      document.addEventListener('visibilitychange', handleVisibilityChange)

      if (typeof ResizeObserver !== 'undefined') {
        let initialized = false
        resizeObserver = new ResizeObserver(() => {
          if (!initialized) {
            initialized = true
            return
          }
          queueCheck()
        })
        resizeObserver.observe(rootEl.value!)
        if (scroller instanceof HTMLElement && scroller !== rootEl.value) {
          resizeObserver.observe(scroller)
        }
      }

      if (typeof MutationObserver !== 'undefined') {
        mutationObserver = new MutationObserver(queueCheck)
        mutationObserver.observe(rootEl.value!, { childList: true, subtree: true, characterData: true })
      }
    }

    function cleanupBindings() {
      cancelQueuedCheck()
      scroller?.removeEventListener('scroll', queueCheck)
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', queueCheck)
      }
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
      resizeObserver?.disconnect()
      mutationObserver?.disconnect()
      resizeObserver = null
      mutationObserver = null
      scroller = null
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        queueCheck()
      }
    }

    function cancelQueuedCheck() {
      if (frameId !== null && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(frameId)
      }
      frameId = null
    }

    function queueCheck() {
      if (!mounted || frameId !== null || typeof requestAnimationFrame === 'undefined') {
        return
      }
      frameId = requestAnimationFrame(() => {
        frameId = null
        void check()
      })
    }

    function getBottomOffsetPx() {
      if (typeof props.bottomOffset === 'number') {
        return Number.isFinite(props.bottomOffset) ? props.bottomOffset : 0
      }

      const value = props.bottomOffset.trim()
      if (!value || value === '0') {
        return 0
      }

      const probe = lengthProbeEl.value
      if (!probe) {
        return 0
      }
      probe.style.width = ''
      probe.style.width = value
      if (!probe.style.width) {
        console.warn(`[${name}] bottomOffset must be a valid CSS length`)
        return 0
      }

      const width = probe.getBoundingClientRect().width
      if (Number.isFinite(width) && width !== 0) {
        return width
      }

      const computedWidth = window.getComputedStyle(probe).width
      return computedWidth.endsWith('px') && Number.isFinite(Number.parseFloat(computedWidth))
        ? Number.parseFloat(computedWidth)
        : 0
    }

    function getScrollerBottom() {
      if (!scroller) {
        return undefined
      }
      return scroller instanceof HTMLElement
        ? scroller.getBoundingClientRect().bottom
        : window.innerHeight || document.documentElement.clientHeight
    }

    function isReachBottom() {
      const root = rootEl.value
      const bottomOffset = getBottomOffsetPx()

      if (root && scroller instanceof HTMLElement && root.contains(scroller)) {
        return scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= bottomOffset
      }

      const detector = detectorEl.value
      const scrollerBottom = getScrollerBottom()
      if (!detector || scrollerBottom == null) {
        return false
      }
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

    async function check() {
      await nextTick()
      if (
        !mounted ||
        !rootEl.value ||
        !scroller ||
        props.disabled ||
        locked ||
        internalStatus.value !== 'idle' ||
        tabItem?.current.value === false ||
        isDisplayNoneElement(rootEl.value) ||
        !isReachBottom()
      ) {
        return
      }

      startRequest('load')
    }

    function retry() {
      if (!mounted || props.disabled || locked || internalStatus.value !== 'error') {
        return
      }
      startRequest('retry')
    }

    return {
      rootEl,
      detectorEl,
      internalStatus,
      pt,
      t,
      retry,
      check,
      n,
      classes,
    }
  },
})
</script>

<template>
  <div ref="rootEl" :class="classes(n(), n('$--box'))">
    <slot />
    <div ref="detectorEl" :class="n('detector')" aria-hidden="true"></div>

    <slot v-if="internalStatus === 'loading'" name="loading">
      <div :class="n('loading')">
        <span :class="n('loading-text')">{{ (pt ? pt : t)('infiniteScrollLoadingText') }}</span>
        <mp-loading size="mini" :radius="10" />
      </div>
    </slot>

    <slot v-else-if="internalStatus === 'error'" name="error" :retry="retry">
      <button v-ripple type="button" :class="n('error')" @click="retry">
        {{ (pt ? pt : t)('infiniteScrollErrorText') }}
      </button>
    </slot>

    <slot v-else-if="internalStatus === 'finished'" name="finished">
      <div :class="n('finished')">{{ (pt ? pt : t)('infiniteScrollFinishedText') }}</div>
    </slot>
  </div>
</template>
