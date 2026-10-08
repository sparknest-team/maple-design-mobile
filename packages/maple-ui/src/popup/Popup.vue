<template>
  <teleport :to="popupContainerTarget" :disabled="popupContainer === false || teleportDisabled">
    <transition :name="overlayAnimationName || n('$-fade')" @after-enter="opened" @after-leave="closed">
      <div
        v-if="!unmountOnClose || transition.shouldRender.value"
        v-show="mergedOpen"
        ref="popupRoot"
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
            :class="contentClasses"
            :style="{ zIndex: mergedZIndex }"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            v-bind="$attrs"
          >
            <slot />
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createNamespace } from '../utils/components'
import { useModalSurface } from '../utils/modal-surface'
import { popupProps } from './props'
import { usePopupItems } from './provide'
import './style'

defineOptions({
  name: createNamespace('popup').name,
  inheritAttrs: false,
})

const props = defineProps(popupProps)
const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'open' | 'opened' | 'close' | 'closed'): void
  (event: 'click-overlay', value: MouseEvent): void
  (event: 'key-escape', value: KeyboardEvent): void
}>()

const { n, classes } = createNamespace('popup')
const popupRoot = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const { bindPopupItems } = usePopupItems()

const surface = useModalSurface({
  open: () => props.open,
  defaultOpen: () => props.defaultOpen,
  unmountOnClose: () => props.unmountOnClose,
  lockScroll: () => props.lockScroll,
  overlayClosable: () => props.overlayClosable,
  escToClose: () => props.escToClose,
  closeOnRouteChange: () => props.closeOnRouteChange,
  popupContainer: () => props.popupContainer,
  zIndex: () => props.zIndex,
  root: popupRoot,
  emit,
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

const transitionName = computed(() => props.transition || n(`$-pop-${props.placement}`))
const contentClasses = computed(() =>
  classes(
    n('content'),
    n(`--${props.placement}`),
    [!props.unstyled, n('--content-background-color')],
    [!props.unstyled, n('$-elevation--3')],
    [props.safeAreaInsetBottom, n('--safe-area-inset-bottom')],
    [props.safeAreaInsetTop, n('--safe-area-inset-top')],
  ),
)

bindPopupItems({ open: mergedOpen })
</script>
