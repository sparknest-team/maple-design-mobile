<template>
  <teleport :to="popupContainerTarget" :disabled="popupContainer === false || teleportDisabled">
    <transition :name="overlayAnimationName || n('$-fade')" @after-enter="opened" @after-leave="closed">
      <div
        v-if="!unmountOnClose || transition.shouldRender.value"
        v-show="mergedOpen"
        ref="popupRoot"
        :dir="readingDirection"
        :class="classes(n('$--box'), n(), [!overlay, n('--pointer-events-none')])"
        :style="{ zIndex: mergedZIndex - 2 }"
      >
        <div
          v-if="overlay"
          :class="classes(n('overlay'), overlayClass)"
          :style="{ zIndex: mergedZIndex - 1, ...overlayStyle }"
          role="presentation"
          @pointerdown="handleOverlayPointerDown"
          @click="handleOverlayClick"
        />
        <transition :name="transitionName">
          <div
            v-show="mergedOpen"
            ref="contentRef"
            data-modal-focus-root
            :class="contentClasses"
            :style="{
              zIndex: mergedZIndex,
              transform: swipeOffset ? `translateY(${swipeOffset}px)` : undefined,
              transitionDuration: swiping ? '0ms' : undefined,
            }"
            tabindex="-1"
            role="dialog"
            :aria-busy="pending || undefined"
            aria-modal="true"
            v-bind="$attrs"
            v-on="swipeHandlers"
          >
            <PendingFeedback :loading="pending" />
            <slot :close="requestClose" :pending="pending" />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onDeactivated, ref, watch } from 'vue'
import PendingFeedback from '../_components/pending-feedback/PendingFeedback.vue'
import { invokeBeforeHook, useActionGuard } from '../_hooks/use-action-guard'
import { useDirection } from '../_utils/direction'
import { createNamespace } from '../utils/components'
import { useModalSurface } from '../utils/modal-surface'
import type { PopupCloseReason } from './props'
import { popupProps } from './props'
import { usePopupItems } from './provide'
import { useSwipeClose } from './use-swipe-close'

defineOptions({
  name: createNamespace('popup').name,
  inheritAttrs: false,
})

const props = defineProps(popupProps)
const { dir: readingDirection } = useDirection(undefined, () => props.dir)
const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'open' | 'opened' | 'close' | 'closed'): void
  (event: 'swipe-close', value: PointerEvent): void
  (event: 'close-error', error: unknown, reason: PopupCloseReason): void
  (event: 'click-overlay', value: MouseEvent): void
  (event: 'key-escape', value: KeyboardEvent): void
}>()

const { n, classes } = createNamespace('popup')
const popupRoot = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const { bindPopupItems } = usePopupItems()

const visible = ref(props.open ?? props.defaultOpen)
const guard = useActionGuard()
const pending = computed(() => props.loading || guard.pending.value)
watch(
  () => props.open,
  (open) => {
    if (open === undefined) {
      return
    }
    if (open) {
      guard.cancel()
      visible.value = true
    } else if (visible.value && props.beforeClose) {
      void requestClose('model')
    } else {
      visible.value = false
    }
  },
)
watch(
  () => [props.beforeClose, props.loading],
  () => guard.cancel(),
)
onDeactivated(guard.cancel)
async function requestClose(reason: PopupCloseReason = 'close', event?: Event): Promise<boolean> {
  if (!mergedOpen.value || pending.value) {
    if (pending.value && reason === 'model' && props.open === false) {
      emit('update:open', true)
    }
    return false
  }
  if (props.beforeClose) {
    const outcome = await guard.run(
      reason,
      (current, context) => invokeBeforeHook((done) => props.beforeClose!({ reason: current }, done, context), context),
      event,
    )
    if (outcome.status !== 'allowed') {
      if (outcome.status === 'error') {
        emit('close-error', outcome.error, reason)
      }
      if (reason === 'model' && props.open === false && outcome.status !== 'cancelled') {
        emit('update:open', true)
      }
      return false
    }
    visible.value = false
  }
  mergedOpen.value = false
  if (reason === 'swipe' && event) {
    emit('swipe-close', event as PointerEvent)
  }
  return true
}
defineExpose({ close: (event?: Event) => requestClose('api', event), requestClose, pending })
const surface = useModalSurface({
  open: () => (props.beforeClose ? visible.value : props.open),
  defaultOpen: () => props.defaultOpen,
  unmountOnClose: () => props.unmountOnClose,
  lockScroll: () => props.lockScroll,
  overlayClosable: () => props.overlayClosable,
  escToClose: () => props.escToClose,
  closeOnRouteChange: () => props.closeOnRouteChange,
  popupContainer: () => props.popupContainer,
  zIndex: () => props.zIndex,
  root: popupRoot,
  emit: (event, ...args) => {
    if (event === 'update:open' && args[0] === false && props.beforeClose && visible.value) {
      void requestClose('close')
    } else {
      // Guarded state is independent of a parent temporarily holding the old model.
      if (event === 'update:open' && args[0] === true) {
        visible.value = true
      }
      ;(emit as (...args: any[]) => void)(event, ...args)
    }
  },
  onRequestClose: ({ reason, event }) => {
    void requestClose(reason, event)
  },
})
const {
  mergedOpen,
  mergedZIndex,
  popupContainerTarget,
  teleportDisabled,
  transition,
  handleOverlayPointerDown,
  handleOverlayClick,
  opened,
  closed,
} = surface

const {
  offset: swipeOffset,
  dragging: swiping,
  handlers: swipeHandlers,
} = useSwipeClose({
  enabled: () => props.swipeToClose && props.placement === 'bottom' && mergedOpen.value && !pending.value,
  threshold: () => props.swipeThreshold,
  element: contentRef,
  close: (event) => {
    void requestClose('swipe', event)
  },
})
const transitionName = computed(() => props.transition || n(`$-pop-${props.placement}`))
const contentClasses = computed(() =>
  classes(
    n('content'),
    [props.swipeToClose && props.placement === 'bottom', n('--swipe-to-close')],
    n(`--${props.placement}`),
    [!props.unstyled, n('--content-background-color')],
    [!props.unstyled, n('$-elevation--3')],
    [props.safeAreaInsetBottom, n('--safe-area-inset-bottom')],
    [props.safeAreaInsetTop, n('--safe-area-inset-top')],
    [props.safeAreaInsetRight, n('--safe-area-inset-right')],
    [props.safeAreaInsetLeft, n('--safe-area-inset-left')],
  ),
)

bindPopupItems({ open: mergedOpen })
</script>
