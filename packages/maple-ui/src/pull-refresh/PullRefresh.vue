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
} from '@maplejs/icons-vue'
import { getRect, getScrollTop, isNumber, isString, preventDefault, toNumber } from '@maplejs/maple-shared'
import { useTouch } from '@maplejs/maple-use'
import MpIcon from '../icon'
import { createNamespace } from '../utils/components'
import { getParentScroller, getTarget } from '../utils/elements'
import { pullRefreshProps, type PullRefreshStatus } from './props'
import { acquireScrollLock } from './scroll-lock'

const { name, n, classes } = createNamespace('pull-refresh')

const ICON_TRANSITION = 150

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
    const controlPosition = ref(0)
    const freshNode = ref<HTMLElement | null>(null)
    const controlNode = ref<HTMLElement | null>(null)
    const startPosition = ref(0)
    const distance = ref<number | string>('-125%')
    const iconName = ref<PullRefreshIconName>('arrow-down')
    const refreshStatus = ref<PullRefreshStatus>('default')
    const isEnd = ref(false)
    const maxDistance = computed(() => Math.abs(2 * controlPosition.value))
    const isSuccess = computed(() => refreshStatus.value === 'success')
    const isTouchable = computed(
      () => refreshStatus.value !== 'loading' && refreshStatus.value !== 'success' && !props.disabled,
    )
    const controlStyle = computed(() => ({
      transform: `translate3d(0px, ${
        isString(distance.value) ? distance.value : `${distance.value}px`
      }, 0px) translate(-50%, 0)`,
      transition: isEnd.value ? `transform ${props.animationDuration}ms` : undefined,
      background: isSuccess.value ? props.successBgColor : props.bgColor,
      color: isSuccess.value ? props.successColor : props.color,
    }))
    const { startTouch, moveTouch, endTouch, isReachTop, resetTouch } = useTouch()

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
        setScroller()
        bindListeners()
      }
    }

    function settleCurrentModel() {
      refreshStatus.value = props.modelValue ? 'loading' : 'default'
      iconName.value = props.modelValue ? 'refresh' : 'arrow-down'
      isEnd.value = props.modelValue
      distance.value = props.modelValue ? maxDistance.value * 0.3 : controlPosition.value
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
      () => props.modelValue,
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
            toNumber(props.successDuration),
            version,
          )
        }
      },
      { flush: 'sync' },
    )

    onMounted(refreshBinding)
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
        const { width } = getRect(control as HTMLElement)
        if (!eligible()) {
          return
        }
        controlPosition.value = -(width + width * 0.25)
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
          toNumber(props.animationDuration),
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
        toNumber(props.animationDuration),
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
