<template>
  <teleport :to="popupContainerTarget" :disabled="popupContainer === false || teleportDisabled">
    <div
      v-if="!unmountOnClose || transition.shouldRender.value"
      v-show="mergedOpen || transition.leaving.value"
      ref="dialogRoot"
      :class="classes(n('$--box'), popupN(), n('popup'), [!overlay, popupN('--pointer-events-none')])"
      :style="{ zIndex: mergedZIndex - 2 }"
    >
      <transition :name="overlayAnimationName" appear>
        <div
          v-if="overlay"
          v-show="mergedOpen"
          :class="classes(popupN('overlay'), overlayClass)"
          :style="{ zIndex: mergedZIndex - 1, ...overlayStyle }"
          role="presentation"
          @pointerdown="handleOverlayPointerDown"
          @click="handleOverlayClick"
        />
      </transition>
      <transition :name="dialogAnimationName" appear @after-enter="opened" @after-leave="handleClosed">
        <div
          v-show="mergedOpen"
          ref="dialogRef"
          data-modal-focus-root
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :aria-label="ariaLabel || (!$slots.title ? title : undefined)"
          :class="dialogClasses"
          :style="mergedDialogStyle"
          v-bind="$attrs"
        >
          <div
            v-if="!hideTitle && ($slots.title || title || closable)"
            :class="classes(n('title'), n(`title--${titleAlign}`))"
            @pointerdown="drag.handlePointerDown"
          >
            <div v-if="$slots.title || title" :class="n('title-content')">
              <mp-icon v-if="type" :class="n('title-icon')" :size="20">
                <MIconInfoCircleFill v-if="type === 'info'" />
                <MIconCheckboxMarkedCircleFill v-else-if="type === 'success'" />
                <MIconWarning v-else-if="type === 'warning'" />
                <MIconError v-else />
              </mp-icon>
              <slot name="title">{{ title }}</slot>
            </div>
            <button
              v-if="closable"
              type="button"
              :aria-label="closeButtonAriaLabel"
              :class="n('close-button')"
              @click="handleClose"
            >
              <MIconClose />
            </button>
          </div>

          <div :class="[n('message'), bodyClass]" :style="[{ textAlign: messageAlign }, bodyStyle]">
            <slot>{{ message }}</slot>
          </div>

          <slot v-if="showFooter" name="footer" :cancel="handleCancel" :confirm="handleConfirm" :close="handleClose">
            <div :class="n('actions')">
              <mp-button
                v-if="cancelButton"
                variant="text"
                v-bind="cancelButtonProps"
                :loading="mergedCancelButtonLoading"
                :disabled="mergedCancelButtonDisabled"
                :class="classes(n('button'), n('cancel-button'), [cancelButtonProps != null, n('--with-button-props')])"
                mp-dialog-cover
                @click="handleCancel"
              >
                {{ cancelButtonText ?? (pt ? pt : t)('dialogCancelButtonText') }}
              </mp-button>
              <mp-button
                v-if="confirmButton"
                variant="text"
                v-bind="confirmButtonProps"
                :loading="mergedConfirmButtonLoading"
                :disabled="mergedConfirmButtonDisabled"
                :class="
                  classes(n('button'), n('confirm-button'), [confirmButtonProps != null, n('--with-button-props')])
                "
                mp-dialog-cover
                @click="handleConfirm"
              >
                {{ confirmButtonText ?? (pt ? pt : t)('dialogConfirmButtonText') }}
              </mp-button>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, useSlots, type CSSProperties } from 'vue'
import {
  IconCheckboxMarkedCircleFill as MIconCheckboxMarkedCircleFill,
  IconClose as MIconClose,
  IconError as MIconError,
  IconInfoCircleFill as MIconInfoCircleFill,
  IconWarning as MIconWarning,
} from '@maplejs/icons-vue'
import MpButton from '../button'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { useModalSurface, type ModalSurfaceCloseRequest } from '../utils/modal-surface'
import { dialogProps } from './props'
import type { DialogAction } from './types'
import { useDialog } from './use-dialog'
import { useDialogDrag } from './use-dialog-drag'

defineOptions({ name: createNamespace('dialog').name, inheritAttrs: false })

const { n, classes } = createNamespace('dialog')
const { n: popupN } = createNamespace('popup')
const props = defineProps(dialogProps)
const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'open' | 'opened' | 'close' | 'closed'): void
  (event: 'confirm' | 'cancel', value: Event): void
  (event: 'click-overlay', value: MouseEvent): void
  (event: 'key-escape', value: KeyboardEvent): void
}>()
const slots = useSlots()
const { t: pt } = injectLocaleProvider()
const dialogRoot = ref<HTMLElement>()
const dialogRef = ref<HTMLElement>()

const surface = useModalSurface({
  open: () => props.open,
  defaultOpen: () => props.defaultOpen,
  unmountOnClose: () => props.unmountOnClose,
  lockScroll: () => props.lockScroll,
  overlayClosable: () => props.overlay && props.overlayClosable,
  escToClose: () => props.escToClose,
  closeOnRouteChange: () => props.closeOnRouteChange,
  popupContainer: () => props.popupContainer,
  zIndex: () => props.zIndex,
  root: dialogRoot,
  emit,
  onRequestClose: handleSurfaceClose,
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

const dialog = useDialog({
  open: mergedOpen,
  beforeClose: () => props.beforeClose,
  confirmButtonLoading: () => props.confirmButtonLoading || Boolean(props.confirmButtonProps?.loading),
  cancelButtonLoading: () => props.cancelButtonLoading || Boolean(props.cancelButtonProps?.loading),
  confirmButtonDisabled: () => props.confirmButtonDisabled || Boolean(props.confirmButtonProps?.disabled),
  cancelButtonDisabled: () => props.cancelButtonDisabled || Boolean(props.cancelButtonProps?.disabled),
  commitOpen: (open) => {
    mergedOpen.value = open
  },
  emitAction(action: DialogAction, event?: Event) {
    if (action === 'confirm') {
      emit('confirm', event ?? new Event('confirm'))
    }
    if (action === 'cancel') {
      emit('cancel', event ?? new Event('cancel'))
    }
  },
})
const {
  mergedConfirmButtonLoading,
  mergedCancelButtonLoading,
  mergedConfirmButtonDisabled,
  mergedCancelButtonDisabled,
  requestClose,
  close,
} = dialog

const draggable = computed(() => props.draggable && !props.fullscreen)
const drag = useDialogDrag({ enabled: draggable, fullscreen: toRef(props, 'fullscreen') })
const showFooter = computed(() => props.footer && (props.confirmButton || props.cancelButton || Boolean(slots.footer)))
const dialogClasses = computed(() =>
  classes(
    n('$--box'),
    n(),
    props.dialogClass as any,
    [props.type, n(`--type-${props.type}`)],
    [props.simple, n('--simple')],
    [props.alignCenter, n('--align-center')],
    [draggable.value, n('--draggable')],
    [props.fullscreen, n('--fullscreen')],
  ),
)
const mergedDialogStyle = computed<CSSProperties>(() => ({
  width: props.fullscreen ? undefined : toSizeUnit(props.width),
  top: !props.alignCenter && !props.fullscreen ? toSizeUnit(props.top) : undefined,
  transform: drag.x.value || drag.y.value ? `translate(${drag.x.value}px, ${drag.y.value}px)` : undefined,
  ...props.dialogStyle,
  zIndex: mergedZIndex.value,
}))

function handleSurfaceClose(request: ModalSurfaceCloseRequest) {
  requestClose('close', request.event)
}
function handleClose(event?: Event) {
  requestClose('close', event)
}
function handleConfirm(event?: Event) {
  requestClose('confirm', event)
}
function handleCancel(event?: Event) {
  requestClose('cancel', event)
}
function handleClosed() {
  if (!mergedOpen.value) {
    drag.reset()
  }
  closed()
}

defineExpose({ close, confirm: handleConfirm, cancel: handleCancel })
</script>
