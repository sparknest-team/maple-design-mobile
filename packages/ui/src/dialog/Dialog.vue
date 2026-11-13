<template>
  <!-- Keep an inline Teleport inside a fragment for Vue 3.2 hydration. -->
  <template v-if="false" />
  <teleport :to="popupContainerTarget" :disabled="popupContainer === false || teleportDisabled">
    <div
      v-if="!unmountOnClose || transition.shouldRender.value"
      v-show="mergedOpen || transition.leaving.value"
      v-bind="themeScope"
      ref="dialogRoot"
      :dir="readingDirection"
      :class="classes(n('$--box'), popupN(), n('popup'), [!overlay, popupN('--pointer-events-none')])"
      :style="{ zIndex: mergedZIndex }"
    >
      <component :is="Transition" :name="overlayAnimationName" :appear="!hydrating">
        <div
          v-if="overlay"
          v-show="mergedOpen"
          :class="classes(popupN('overlay'), overlayClass)"
          :style="{ zIndex: mergedZIndex - 1, ...overlayStyle }"
          role="presentation"
          @pointerdown="handleOverlayPointerDown"
          @click="handleOverlayClick"
        />
      </component>
      <component
        :is="Transition"
        :name="dialogAnimationName"
        appear
        persisted
        @after-enter="opened"
        @after-leave="handleClosed"
      >
        <div
          v-show="mergedOpen"
          ref="dialogRef"
          data-modal-focus-root
          role="dialog"
          :aria-busy="dialog.pending.value || undefined"
          aria-modal="true"
          tabindex="-1"
          :aria-label="ariaLabel || (!$slots.title ? title : undefined)"
          :class="dialogClasses"
          :style="mergedDialogStyle"
          v-bind="$attrs"
        >
          <div
            v-if="!hideTitle && ($slots.title || title || closable)"
            :class="classes(n('title'), n(`title--${titleAlign}`), [topDivider, n('title--divider')])"
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

          <div
            :class="[n('message'), bodyClass, { [n('message--bottom-divider')]: bottomDivider && showFooter }]"
            :style="[{ textAlign: messageAlign }, bodyStyle]"
          >
            <PendingFeedback
              :loading="
                dialog.pending.value && (dialog.pendingAction.value === 'close' || !showFooter || !!$slots.footer)
              "
            /><slot>{{ message }}</slot>
          </div>

          <div v-if="showFooter" :class="n('actions')">
            <slot name="footer" :cancel="handleCancel" :confirm="handleConfirm" :close="handleClose">
              <mp-button
                v-if="cancelButton"
                variant="outline"
                v-bind="cancelButtonProps"
                :loading="mergedCancelButtonLoading"
                :disabled="mergedCancelButtonDisabled"
                :class="classes(n('button'), n('cancel-button'), [cancelButtonProps != null, n('--with-button-props')])"
                mp-dialog-cover
                @click="handleCancel"
              >
                {{ cancelButtonText ?? dialogText('dialogCancelButtonText', defaultDialogCancel) }}
              </mp-button>
              <mp-button
                v-if="confirmButton"
                status="primary"
                variant="default"
                v-bind="confirmButtonProps"
                :loading="mergedConfirmButtonLoading"
                :disabled="mergedConfirmButtonDisabled"
                :class="
                  classes(n('button'), n('confirm-button'), [confirmButtonProps != null, n('--with-button-props')])
                "
                mp-dialog-cover
                @click="handleConfirm"
              >
                {{ confirmButtonText ?? dialogText('dialogConfirmButtonText', defaultDialogConfirm) }}
              </mp-button>
            </slot>
          </div>
        </div>
      </component>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, mergeProps, ref, toRef, Transition, useSlots, type CSSProperties } from 'vue'
import {
  IconCheckboxMarkedCircleFill as MIconCheckboxMarkedCircleFill,
  IconClose as MIconClose,
  IconError as MIconError,
  IconInfoCircleFill as MIconInfoCircleFill,
  IconWarning as MIconWarning,
} from '@maple-design/icons-vue'
import PendingFeedback from '../_components/pending-feedback/PendingFeedback.vue'
import { useDirection } from '../_utils/direction'
import MpButton from '../button/base'
import MpIcon from '../icon'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultDialogCancel, defaultDialogConfirm } from '../locale/zh-CN'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { useModalSurface, type ModalSurfaceCloseRequest } from '../utils/modal-surface'
import { dialogProps } from './props'
import type { DialogAction } from './types'
import { useDialog } from './use-dialog'
import { useDialogDrag } from './use-dialog-drag'

// An existing host node indicates hydration; its visible overlay must not
// receive appear classes before Vue has checked the server-rendered class.
const hydrating = !!getCurrentInstance()?.vnode.el
const themeScope = useThemeScope()

defineOptions({ name: createNamespace('dialog').name, inheritAttrs: false })

const { n, classes } = createNamespace('dialog')
const { n: popupN } = createNamespace('popup')
const props = defineProps(dialogProps)
const { dir: readingDirection } = useDirection(undefined, () => props.dir)
const emit = defineEmits<{
  (event: 'guard-error', error: unknown, action: DialogAction): void
  (event: 'update:open', value: boolean): void
  (event: 'open' | 'opened' | 'close' | 'closed'): void
  (event: 'confirm' | 'cancel', value: Event): void
  (event: 'click-overlay', value: MouseEvent): void
  (event: 'key-escape', value: KeyboardEvent): void
}>()
const slots = useSlots()
const { t: pt } = injectLocaleProvider()
function dialogText(key: 'dialogCancelButtonText' | 'dialogConfirmButtonText', initial: string) {
  return (pt ? pt(key) : t(key)) ?? (defaultLocaleReady.value ? undefined : initial)
}
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
  onGuardError: (error, action) => emit('guard-error', error, action),
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
const drag = useDialogDrag({
  enabled: computed(() => draggable.value && mergedOpen.value),
  fullscreen: toRef(props, 'fullscreen'),
})
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
