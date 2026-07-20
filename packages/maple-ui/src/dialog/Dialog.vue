<template>
  <mp-popup
    v-if="!unmountOnClose || popupShow || mounted"
    :class="n('popup')"
    mp-dialog-cover
    :show="popupShow"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :lock-scroll="lockScroll"
    :close-on-click-overlay="popupCloseOnClickOverlay"
    :close-on-key-escape="false"
    :teleport="teleport"
    @open="onOpen"
    @close="onClose"
    @closed="handleClosed"
    @opened="onOpened"
    @key-escape="handleKeyEscape"
    @route-change="onRouteChange"
    @click-overlay="handleClickOverlay"
  >
    <div
      :class="classes(n('$--box'), n(), dialogClass, type && n(`--type-${type}`))"
      :style="{ width: toSizeUnit(width), ...dialogStyle }"
      v-bind="$attrs"
    >
      <div v-if="!hideTitle" :class="n('title')">
        <mp-icon v-if="typeIcon" :class="n('title-icon')" :name="typeIcon" :size="20" />
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
import { call } from '@maplejs/maple-shared'
import { useVModel } from '@maplejs/maple-use'
import MpButton from '../button'
import MpIcon from '../icon'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
import MpPopup from '../popup'
import { createNamespace } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { DIALOG_TYPE_ICON, props } from './props'

const { name, n, classes } = createNamespace('dialog')

export default defineComponent({
  name,
  components: {
    MpPopup,
    MpButton,
    MpIcon,
  },
  inheritAttrs: false,
  props,
  setup(props) {
    const { t: pt } = injectLocaleProvider()
    const slots = useSlots()

    const popupShow = ref(false)
    const mounted = ref(Boolean(props.show))
    const popupCloseOnClickOverlay = ref(false)
    const confirmButtonLoading = useVModel(props, 'confirmButtonLoading')
    const cancelButtonLoading = useVModel(props, 'cancelButtonLoading')
    const confirmButtonDisabled = useVModel(props, 'confirmButtonDisabled')
    const cancelButtonDisabled = useVModel(props, 'cancelButtonDisabled')

    const typeIcon = computed(() => (props.type ? DIALOG_TYPE_ICON[props.type] : undefined))

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
      () => props.show,
      (newValue) => {
        popupShow.value = newValue

        if (newValue) {
          mounted.value = true
        }
      },
      { immediate: true },
    )

    watch(
      () => props.closeOnClickOverlay,
      (newValue) => {
        if (props.onBeforeClose != null) {
          popupCloseOnClickOverlay.value = false
          return
        }

        popupCloseOnClickOverlay.value = newValue
      },
      { immediate: true },
    )

    function done() {
      return call(props['onUpdate:show'], false)
    }

    function handleClosed() {
      if (props.unmountOnClose && !props.show) {
        mounted.value = false
      }

      call(props.onClosed)
    }

    function handleClickOverlay() {
      const { closeOnClickOverlay, onClickOverlay, onBeforeClose } = props

      call(onClickOverlay)

      if (!closeOnClickOverlay) {
        return
      }

      if (onBeforeClose != null) {
        call(onBeforeClose, 'close', done, exposedRefs)
        return
      }

      call(props['onUpdate:show'], false)
    }

    function confirm() {
      const { onBeforeClose, onConfirm } = props

      call(onConfirm)

      if (onBeforeClose != null) {
        call(onBeforeClose, 'confirm', done, exposedRefs)
        return
      }

      call(props['onUpdate:show'], false)
    }

    function cancel() {
      const { onBeforeClose, onCancel } = props

      call(onCancel)

      if (onBeforeClose != null) {
        call(onBeforeClose, 'cancel', done, exposedRefs)
        return
      }

      call(props['onUpdate:show'], false)
    }

    function handleKeyEscape() {
      call(props.onKeyEscape)

      if (!props.closeOnKeyEscape) {
        return
      }

      cancel()
    }

    return {
      popupShow,
      mounted,
      popupCloseOnClickOverlay,
      confirmButtonLoading,
      cancelButtonLoading,
      confirmButtonDisabled,
      cancelButtonDisabled,
      typeIcon,
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

<style lang="less">
@import '../styles/common';
@import '../popup/popup';
@import '../button/button';
@import '../icon/icon';
@import './dialog';
</style>
