<template>
  <!-- Keep an inline Teleport inside a fragment for Vue 3.2 hydration. -->
  <template v-if="false" />
  <teleport :to="popupContainerTarget" :disabled="popupContainer === false || teleportDisabled">
    <template v-if="true">
      <transition :name="n('--fade')" @after-enter="transition.opened" @after-leave="transition.closed">
        <div
          v-if="shouldRender"
          v-show="mergedOpen"
          ref="overlayRoot"
          :dir="readingDirection"
          :class="n()"
          :style="{ zIndex: mergedZIndex }"
          v-bind="mergeProps(themeScope, $attrs)"
        >
          <div
            :class="n('backdrop')"
            role="presentation"
            @pointerdown="handleBackdropPointerDown"
            @click="handleBackdropClick"
          />
          <div :class="n('content')">
            <slot />
          </div>
        </div>
      </transition>
      <template v-if="false" />
    </template>
  </teleport>
</template>

<script setup lang="ts">
import { computed, mergeProps, onActivated, onDeactivated, ref, useAttrs } from 'vue'
import { useEventListener } from '@maple-design/use-vue'
import { useDirection } from '../_utils/direction'
import { useZIndex } from '../context/zIndex'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace } from '../utils/components'
import { usePopupContainer } from '../utils/popup-container'
import { usePopupLayer } from '../utils/popup-layer'
import { usePopupTransition } from '../utils/popup-transition'
import { useScrollLock } from '../utils/scroll-lock'
import { overlayProps } from './props'

const themeScope = useThemeScope()

defineOptions({
  name: createNamespace('overlay').name,
  inheritAttrs: false,
})

const props = defineProps(overlayProps)
const directionAttrs = useAttrs()
const { dir: readingDirection } = useDirection(undefined, () => directionAttrs.dir)
const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'open' | 'opened' | 'close' | 'closed'): void
  (event: 'click', value: MouseEvent): void
  (event: 'key-escape', value: KeyboardEvent): void
}>()

const { n } = createNamespace('overlay')
const localOpen = ref(props.defaultOpen)
const overlayRoot = ref<HTMLElement>()
const teleportDisabled = ref(false)
let backdropPointerDown = false

const mergedOpen = computed({
  get: () => props.open ?? localOpen.value,
  set: (value: boolean) => {
    if (props.open === undefined) {
      localOpen.value = value
    }
    emit('update:open', value)
  },
})
const transition = usePopupTransition(
  () => mergedOpen.value,
  () => props.unmountOnClose,
  (event) => emit(event),
)
const { shouldRender } = transition
const popupContainerTarget = usePopupContainer(() => props.popupContainer)
const popupDocument = computed(() => {
  const target = popupContainerTarget.value
  if (typeof target !== 'string') {
    return target.ownerDocument
  }
  return typeof document === 'undefined' ? undefined : document
})
const scrollLockTarget = computed(() => {
  const target = popupContainerTarget.value
  return typeof target === 'string' ? popupDocument.value?.body : target
})
const layerActive = () => mergedOpen.value && !teleportDisabled.value
const { zIndex } = useZIndex(layerActive, 3)
const mergedZIndex = computed(() => props.zIndex ?? zIndex.value)
const { onStackTop } = usePopupLayer(
  layerActive,
  mergedZIndex,
  () => overlayRoot.value?.ownerDocument ?? popupDocument.value,
)

// Private ownership query for components that delegate keyboard shortcuts to this layer.
defineExpose({ _isTopLayer: onStackTop })

useScrollLock(
  () => scrollLockTarget.value,
  () => (mergedOpen.value || transition.leaving.value) && props.lockScroll,
  { reserveScrollBar: true },
)
useEventListener(() => popupDocument.value, 'keydown', handleKeydown)

function handleBackdropPointerDown(event: PointerEvent) {
  backdropPointerDown = event.target === event.currentTarget
}

function handleBackdropClick(event: MouseEvent) {
  const isBackdropClick = backdropPointerDown && event.target === event.currentTarget
  backdropPointerDown = false
  if (!isBackdropClick || !onStackTop(event)) {
    return
  }
  emit('click', event)
  if (props.overlayClosable) {
    mergedOpen.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (
    !mergedOpen.value ||
    event.defaultPrevented ||
    event.isComposing ||
    event.keyCode === 229 ||
    event.key !== 'Escape' ||
    !onStackTop(event)
  ) {
    return
  }
  emit('key-escape', event)
  if (props.escToClose) {
    event.preventDefault()
    mergedOpen.value = false
  }
}

onActivated(() => {
  teleportDisabled.value = false
})
onDeactivated(() => {
  teleportDisabled.value = true
  backdropPointerDown = false
})
</script>
