<template>
  <mp-popup
    v-if="!unmountOnClose || popupOpen || mounted"
    :class="n('popup')"
    mp-dialog-cover
    :open="popupOpen"
    :mask="mask"
    :mask-class="maskClass"
    :mask-style="maskStyle"
    :lock-scroll="lockScroll"
    :mask-closable="popupCloseOnClickOverlay"
    :esc-to-close="false"
    :popup-container="popupContainer"
    @open="$emit('open')"
    @close="$emit('close')"
    @closed="handleClosed"
    @opened="$emit('opened')"
    @key-escape="handleKeyEscape"
    @route-change="$emit('route-change')"
    @click-overlay="handleClickOverlay"
  >
    <div
      :class="classes(n('$--box'), n(), dialogClass, type && n(`--type-${type}`))"
      :style="{ width: toSizeUnit(width), ...dialogStyle }"
      v-bind="$attrs"
    >
      <div v-if="!hideTitle" :class="n('title')">
        <mp-icon v-if="type" :class="n('title-icon')" :size="20">
          <MIconInformation v-if="type === 'info'" />
          <MIconCheckboxMarkedCircle v-else-if="type === 'success'" />
          <MIconWarning v-else-if="type === 'warning'" />
          <MIconError v-else />
        </mp-icon>
        <slot name="title">{{ title ?? (pt ? pt : t)('dialogTitle') }}</slot>
      </div>
      <div :class="classes(n('message'), bodyClass)" :style="mergedBodyStyle">
        <slot>
          {{ message }}
        </slot>
      </div>

      <slot v-if="showFooter" name="footer" :slot-class="n('actions')" :cancel="cancel" :confirm="confirm">
        <div :class="n('actions')">
          <mp-button
            v-if="cancelButton"
            v-bind="cancelButtonNormalizedProps"
            :class="classes(n('button'), n('cancel-button'), [cancelButtonProps != null, n('--with-button-props')])"
            mp-dialog-cover
            @click="cancel"
          >
            {{ cancelButtonText ?? (pt ? pt : t)('dialogCancelButtonText') }}
          </mp-button>
          <mp-button
            v-if="confirmButton"
            v-bind="confirmButtonNormalizedProps"
            :class="classes(n('button'), n('confirm-button'), [confirmButtonProps != null, n('--with-button-props')])"
            mp-dialog-cover
            @click="confirm"
          >
            {{ confirmButtonText ?? (pt ? pt : t)('dialogConfirmButtonText') }}
          </mp-button>
        </div>
      </slot>
    </div>
  </mp-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useSlots, watch } from 'vue'
import {
  IconCheckboxMarkedCircle as MIconCheckboxMarkedCircle,
  IconError as MIconError,
  IconInformation as MIconInformation,
  IconWarning as MIconWarning,
} from '@maplejs/icons-vue'
import { call } from '@maplejs/maple-shared'
import { useVModel } from '@maplejs/maple-use'
import MpButton from '../button'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import MpPopup from '../popup'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { props } from './props'

const { name, n, classes } = createNamespace('dialog')

export default defineComponent({
  name,
  components: {
    MIconInformation,
    MIconCheckboxMarkedCircle,
    MIconWarning,
    MIconError,
    MpPopup,
    MpButton,
    MpIcon,
  },
  inheritAttrs: false,
  props,
  emits: [
    'update:open',
    'open',
    'opened',
    'close',
    'closed',
    'route-change',
    'key-escape',
    'confirm',
    'cancel',
    'click-overlay',
  ],
  setup(props, { emit }) {
    const { t: pt } = injectLocaleProvider()
    const slots = useSlots()

    const popupOpen = ref(false)
    const mounted = ref(Boolean(props.open))
    const popupCloseOnClickOverlay = ref(false)
    const confirmButtonLoading = useVModel(props, 'confirmButtonLoading')
    const cancelButtonLoading = useVModel(props, 'cancelButtonLoading')
    const confirmButtonDisabled = useVModel(props, 'confirmButtonDisabled')
    const cancelButtonDisabled = useVModel(props, 'cancelButtonDisabled')

    const mergedBodyStyle = computed(() => ({
      textAlign: props.messageAlign,
      ...props.bodyStyle,
    }))

    const showFooter = computed(() => {
      if (!props.footer) {
        return false
      }

      return props.confirmButton || props.cancelButton || Boolean(slots.footer)
    })

    const confirmButtonNormalizedProps = computed(() => ({
      text: true,
      ...props.confirmButtonProps,
      textColor: props.confirmButtonTextColor ?? props.confirmButtonProps?.textColor,
      color: props.confirmButtonColor ?? props.confirmButtonProps?.color,
      loading: confirmButtonLoading.value || props.confirmButtonProps?.loading,
      disabled: confirmButtonDisabled.value || props.confirmButtonProps?.disabled,
    }))

    const cancelButtonNormalizedProps = computed(() => ({
      text: true,
      ...props.cancelButtonProps,
      textColor: props.cancelButtonTextColor ?? props.cancelButtonProps?.textColor,
      color: props.cancelButtonColor ?? props.cancelButtonProps?.color,
      loading: cancelButtonLoading.value || props.cancelButtonProps?.loading,
      disabled: cancelButtonDisabled.value || props.cancelButtonProps?.disabled,
    }))

    const exposedRefs = {
      confirmButtonLoading,
      cancelButtonLoading,
      confirmButtonDisabled,
      cancelButtonDisabled,
    }

    watch(
      () => props.open,
      (newValue) => {
        popupOpen.value = newValue

        if (newValue) {
          mounted.value = true
        }
      },
      { immediate: true },
    )

    watch(
      () => props.maskClosable,
      (newValue) => {
        if (props.beforeClose != null) {
          popupCloseOnClickOverlay.value = false
          return
        }

        popupCloseOnClickOverlay.value = newValue
      },
      { immediate: true },
    )

    function done() {
      return emit('update:open', false)
    }

    function handleClosed() {
      if (props.unmountOnClose && !props.open) {
        mounted.value = false
      }

      emit('closed')
    }

    function handleClickOverlay() {
      const { maskClosable, beforeClose } = props

      emit('click-overlay')

      if (!maskClosable) {
        return
      }

      if (beforeClose != null) {
        call(beforeClose, 'close', done, exposedRefs)
        return
      }

      emit('update:open', false)
    }

    function confirm() {
      const { beforeClose } = props

      emit('confirm')

      if (beforeClose != null) {
        call(beforeClose, 'confirm', done, exposedRefs)
        return
      }

      emit('update:open', false)
    }

    function cancel() {
      const { beforeClose } = props

      emit('cancel')

      if (beforeClose != null) {
        call(beforeClose, 'cancel', done, exposedRefs)
        return
      }

      emit('update:open', false)
    }

    function handleKeyEscape() {
      emit('key-escape')

      if (!props.escToClose) {
        return
      }

      cancel()
    }

    return {
      popupOpen,
      mounted,
      popupCloseOnClickOverlay,
      confirmButtonLoading,
      cancelButtonLoading,
      confirmButtonDisabled,
      cancelButtonDisabled,
      mergedBodyStyle,
      showFooter,
      confirmButtonNormalizedProps,
      cancelButtonNormalizedProps,
      pt,
      t,
      n,
      classes,
      handleClickOverlay,
      handleClosed,
      confirm,
      cancel,
      toSizeUnit,
      handleKeyEscape,
    }
  },
})
</script>
