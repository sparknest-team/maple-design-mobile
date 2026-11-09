<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  watch,
} from 'vue'
import {
  IconArrowDown as MIconArrowDown,
  IconCheckboxMarkedCircleFill as MIconCheckboxMarkedCircleFill,
  IconRefresh as MIconRefresh,
} from '@maple-design/icons-vue'
import { getRect, getScrollTop, isNumber, isString, preventDefault, toNumber } from '@maple-design/shared'
import { useTouch } from '@maple-design/use'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTarget } from '../utils/elements'
import { pullRefreshProps, type PullRefreshStatus } from './props'
import { acquireScrollLock } from './scroll-lock'

const { name, n, classes } = createNamespace('pull-refresh')

const ICON_TRANSITION = 150

function safeDuration(value: number | string, fallback: number) {
  const duration = typeof value === 'string' && !value.trim() ? NaN : Number(value)
  return Number.isFinite(duration) && duration >= 0 ? duration : fallback
}

type PullRefreshIconName = 'arrow-down' | 'refresh' | 'checkbox-marked-circle-fill'

export default defineComponent({
  name,
  components: {
    MIconCheckboxMarkedCircleFill,
    MIconRefresh,
    MIconArrowDown,
    MpIcon,
  },
  props: pullRefreshProps,
  emits: ['update:modelValue', 'refresh'],
  setup(props, { emit }) {
    const internalLoading = ref(props.defaultValue)
    const loading = computed(() => props.modelValue ?? internalLoading.value)
    const controlPosition = ref(0)
    const freshNode = ref<HTMLElement | null>(null)
    const controlNode = ref<HTMLElement | null>(null)
    const startPosition = ref(0)
    const distance = ref<number | string>('-125%')
    const iconName = ref<PullRefreshIconName>('arrow-down')
    const refreshStatus = ref<PullRefreshStatus>('default')
    const isEnd = ref(false)
    const maxDistance = computed(() => Math.abs(2 * controlPosition.value))
    const animationDuration = computed(() => safeDuration(props.animationDuration, 300))
    const successDuration = computed(() => safeDuration(props.successDuration, 2000))
    const isSuccess = computed(() => refreshStatus.value === 'success')
    const isTouchable = computed(
      () => refreshStatus.value !== 'loading' && refreshStatus.value !== 'success' && !props.disabled,
    )
    const controlStyle = computed(() => ({
      transform: `translate3d(0px, ${
        isString(distance.value) ? distance.value : `${distance.value}px`
      }, 0px) translate(-50%, 0)`,
      transition: isEnd.value ? `transform ${animationDuration.value}ms` : undefined,
      background: isSuccess.value ? props.successBgColor : props.bgColor,
      color: isSuccess.value ? props.successColor : props.color,
    }))
    const { startTouch, moveTouch, endTouch, isReachTop, resetTouch, direction, deltaY } = useTouch()

    let scroller: HTMLElement | Window
    let eventTargetScroller: HTMLElement | Window | null
    let active = true
    let disposed = false
    let generation = 0
    let pendingRefresh = false
    let touching = false
    let gestureGeneration = 0
    let bindingGeneration = 0
    let unbind: (() => void) | undefined
    const timers = new Map<number, (() => void) | undefined>()
    const available = () => active && !disposed
    const current = (version: number) => available() && !props.disabled && version === generation

    function cancelWork() {
      generation += 1
      pendingRefresh = false
      const pending = [...timers]
      timers.clear()
      pending.forEach(([timer, cancel]) => {
        window.clearTimeout(timer)
        cancel?.()
      })
    }

    function schedule(task: () => void, delay: number, version: number, cancel?: () => void) {
      if (!current(version)) {
        cancel?.()
        return
      }
      const timer = window.setTimeout(() => {
        if (!timers.has(timer)) {
          return
        }
        timers.delete(timer)
        if (current(version)) {
          task()
        } else {
          cancel?.()
        }
      }, delay)
      timers.set(timer, cancel)
    }

    let lockOwner: HTMLElement | undefined
    let releaseScrollLock: (() => void) | undefined

    function stopGesture() {
      gestureGeneration += 1
      touching = false
      resetTouch()
      lockEvent('remove')
      eventTargetScroller = null
      if (refreshStatus.value === 'pulling' || refreshStatus.value === 'loosing') {
        refreshStatus.value = 'default'
        iconName.value = 'arrow-down'
        isEnd.value = false
        distance.value = controlPosition.value
      }
    }

    function clearBindings() {
      bindingGeneration += 1
      unbind?.()
      unbind = undefined
    }

    function bindListeners() {
      clearBindings()
      const element = freshNode.value
      if (!available() || !element) {
        return
      }
      const version = bindingGeneration
      const eligible = () => available() && version === bindingGeneration && freshNode.value === element
      const start = (event: TouchEvent) => {
        if (eligible()) {
          handleTouchstart(event)
        }
      }
      const move = (event: TouchEvent) => {
        if (eligible()) {
          handleTouchmove(event)
        }
      }
      const end = () => {
        if (eligible()) {
          handleTouchend()
        }
      }
      const cancel = () => {
        if (eligible()) {
          handleTouchcancel()
        }
      }
      element.addEventListener('touchstart', start, { passive: true })
      element.addEventListener('touchmove', move, { passive: false })
      element.addEventListener('touchend', end)
      element.addEventListener('touchcancel', cancel)
      unbind = () => {
        element.removeEventListener('touchstart', start)
        element.removeEventListener('touchmove', move)
        element.removeEventListener('touchend', end)
        element.removeEventListener('touchcancel', cancel)
      }
    }

    function refreshBinding() {
      cancelWork()
      stopGesture()
      clearBindings()
      if (available() && freshNode.value) {
        measureControl()
        settleCurrentModel()
        setScroller()
        bindListeners()
      }
    }

    function settleCurrentModel() {
      refreshStatus.value = loading.value ? 'loading' : 'default'
      iconName.value = loading.value ? 'refresh' : 'arrow-down'
      isEnd.value = loading.value
      distance.value = loading.value ? maxDistance.value * 0.3 : controlPosition.value || '-125%'
    }

    function measureControl() {
      const node = controlNode.value
      if (!available() || !node) {
        return
      }
      const width = getRect(node).width
      if (!Number.isFinite(width) || width <= 0) {
        return
      }
      const previous = controlPosition.value
      controlPosition.value = -width * 1.25
      if (refreshStatus.value === 'loading' || refreshStatus.value === 'success') {
        distance.value = maxDistance.value * 0.3
      } else if (touching && typeof distance.value === 'number') {
        distance.value += controlPosition.value - previous
      } else {
        distance.value = controlPosition.value
      }
    }

    onDeactivated(() => {
      active = false
      cancelWork()
      stopGesture()
      clearBindings()
    })
    onActivated(() => {
      if (!active) {
        active = true
        settleCurrentModel()
        refreshBinding()
      } else {
        bindListeners()
      }
    })
    onBeforeUnmount(() => {
      disposed = true
      cancelWork()
      stopGesture()
      clearBindings()
    })

    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled) {
          cancelWork()
          stopGesture()
          settleCurrentModel()
        }
      },
      { flush: 'sync' },
    )

    watch(
      () => loading.value,
      (newValue) => {
        if (newValue && pendingRefresh && refreshStatus.value === 'loading') {
          return
        }
        cancelWork()
        stopGesture()
        if (!available()) {
          return
        }
        if (props.disabled) {
          settleCurrentModel()
          return
        }
        if (newValue) {
          settleCurrentModel()
        }
        if (newValue === false) {
          isEnd.value = true
          refreshStatus.value = 'success'
          iconName.value = 'checkbox-marked-circle-fill'
          const version = generation
          schedule(
            () => {
              distance.value = controlPosition.value
              reset(version)
            },
            successDuration.value,
            version,
          )
        }
      },
      { flush: 'sync' },
    )

    let controlObserver: ResizeObserver | undefined
    onMounted(() => {
      refreshBinding()
      const node = controlNode.value
      const Observer = node?.ownerDocument.defaultView?.ResizeObserver
      if (node && Observer) {
        controlObserver = new Observer(measureControl)
        controlObserver.observe(node)
      }
    })
    onBeforeUnmount(() => controlObserver?.disconnect())
    watch(freshNode, refreshBinding, { flush: 'sync' })
    watch(() => props.target, refreshBinding, { flush: 'sync' })

    function startIconTransition(nextName: PullRefreshIconName, version = generation) {
      if (iconName.value === nextName) {
        return true
      }

      iconName.value = nextName
      return new Promise<boolean>((resolve) => {
        schedule(
          () => resolve(true),
          ICON_TRANSITION,
          version,
          () => resolve(false),
        )
      })
    }

    function lockEvent(action: 'add' | 'remove') {
      if (action === 'remove') {
        releaseScrollLock?.()
        releaseScrollLock = undefined
        lockOwner = undefined
        return
      }
      if (!scroller) {
        return
      }
      const el = 'classList' in scroller ? scroller : scroller.document.body
      if (lockOwner !== el) {
        lockEvent('remove')
        const version = generation
        const release = acquireScrollLock(el, n('--lock'))
        if (!current(version)) {
          release()
          return
        }
        releaseScrollLock = release
        lockOwner = el
      }
    }

    function handleTouchstart(event: TouchEvent) {
      if (!available() || !isTouchable.value) {
        return
      }
      cancelWork()
      stopGesture()
      touching = event.touches.length > 0
      if (!touching) {
        return
      }
      const version = gestureGeneration
      const root = freshNode.value
      const control = controlNode.value
      const owner = scroller
      const eligible = () =>
        available() &&
        isTouchable.value &&
        touching &&
        gestureGeneration === version &&
        freshNode.value === root &&
        controlNode.value === control &&
        scroller === owner
      startTouch(event)

      if (controlPosition.value === 0) {
        measureControl()
        if (!eligible()) {
          return
        }
      }

      const target = event.target as HTMLElement
      if (!eligible()) {
        return
      }
      const targetScroller = getParentScroller(target)
      if (!eligible()) {
        return
      }
      eventTargetScroller = targetScroller
      distance.value = controlPosition.value
    }

    function handleTouchmove(event: TouchEvent) {
      if (!available() || !isTouchable.value || !touching || !event.touches.length) {
        return
      }
      const version = gestureGeneration
      const owner = scroller
      const root = freshNode.value
      const eligible = () =>
        available() &&
        isTouchable.value &&
        touching &&
        version === gestureGeneration &&
        scroller === owner &&
        freshNode.value === root
      moveTouch(event)

      if (direction.value !== 'vertical' || deltaY.value <= 0) {
        return
      }
      if (!isTouchable.value || !eventTargetScroller) {
        return
      }

      const nestedScrollTop = eventTargetScroller !== scroller ? getScrollTop(eventTargetScroller) : 0
      if (!eligible() || nestedScrollTop > 0) {
        return
      }

      const scrollTop = getScrollTop(scroller)
      if (!eligible() || scrollTop > 0) {
        return
      }

      const reachTop = isReachTop(scroller)
      if (!eligible()) {
        return
      }
      if (reachTop) {
        preventDefault(event)
      }
      if (!eligible()) {
        return
      }

      if (refreshStatus.value !== 'pulling') {
        refreshStatus.value = 'pulling'
        startPosition.value = event.touches[0].clientY
      }

      if (reachTop && isNumber(distance.value) && distance.value > controlPosition.value) {
        lockEvent('add')
      }
      if (!eligible()) {
        return
      }

      const moveDistance = (event.touches[0].clientY - startPosition.value) / 2 + controlPosition.value
      distance.value = moveDistance >= maxDistance.value ? maxDistance.value : moveDistance
      startIconTransition(distance.value >= maxDistance.value * 0.2 ? 'refresh' : 'arrow-down')
    }

    async function handleTouchend() {
      if (!available() || !isTouchable.value || !touching) {
        return
      }
      if (refreshStatus.value !== 'pulling') {
        stopGesture()
        return
      }
      touching = false
      cancelWork()
      const version = generation
      endTouch()

      if (!isTouchable.value) {
        return
      }

      isEnd.value = true

      if (toNumber(distance.value) >= maxDistance.value * 0.2) {
        const completed = await startIconTransition('refresh', version)
        if (!completed || !current(version) || !isTouchable.value) {
          return
        }
        refreshStatus.value = 'loading'
        distance.value = maxDistance.value * 0.3

        pendingRefresh = true
        if (props.modelValue === undefined) {
          internalLoading.value = true
        }
        emit('update:modelValue', true)
        nextTick(() => {
          if (!current(version) || !pendingRefresh || props.disabled || refreshStatus.value !== 'loading') {
            return
          }
          pendingRefresh = false
          emit('refresh')
        })
        lockEvent('remove')
      } else {
        refreshStatus.value = 'loosing'
        iconName.value = 'arrow-down'
        distance.value = controlPosition.value

        schedule(
          () => {
            isEnd.value = false
            lockEvent('remove')
          },
          animationDuration.value,
          version,
        )
      }

      eventTargetScroller = null
    }

    function setScroller() {
      const root = freshNode.value
      const version = generation
      const next = props.target ? getTarget(props.target, name) : getParentScroller(root!)
      if (available() && freshNode.value === root && generation === version) {
        scroller = next
      }
    }

    function handleTouchcancel() {
      if (!available() || !touching) {
        return
      }
      cancelWork()
      stopGesture()
    }

    function reset(version: number) {
      schedule(
        () => {
          refreshStatus.value = 'default'
          iconName.value = 'arrow-down'
          isEnd.value = false
        },
        animationDuration.value,
        version,
      )
    }

    return {
      ICON_TRANSITION,
      refreshStatus,
      freshNode,
      controlNode,
      iconName,
      controlStyle,
      isSuccess,
      n,
      classes,
      handleTouchstart,
      handleTouchmove,
      handleTouchend,
      handleTouchcancel,
    }
  },
})
</script>

<template>
  <div ref="freshNode" :class="classes(n(), n('$--box'))">
    <div
      ref="controlNode"
      :class="classes(n('control'), n('$-elevation--2'), [isSuccess, n('control--success')])"
      :style="controlStyle"
    >
      <mp-icon
        :transition="ICON_TRANSITION"
        :class="classes(n('icon'), [refreshStatus === 'loading', n('icon--spin')])"
      >
        <MIconCheckboxMarkedCircleFill v-if="iconName === 'checkbox-marked-circle-fill'" />
        <MIconRefresh v-else-if="iconName === 'refresh'" />
        <MIconArrowDown v-else />
      </mp-icon>
    </div>
    <slot />
  </div>
</template>
