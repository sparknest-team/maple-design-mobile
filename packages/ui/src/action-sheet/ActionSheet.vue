<template>
  <mp-popup
    v-model:open="open"
    placement="bottom"
    :class="n('popup-radius')"
    :before-close="beforeClose"
    :swipe-to-close="swipeToClose"
    :swipe-threshold="swipeThreshold"
    :overlay="overlay"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    :lock-scroll="lockScroll"
    :overlay-closable="overlayClosable"
    :esc-to-close="escToClose"
    :popup-container="popupContainer"
    :safe-area-inset-bottom="safeArea"
    :safe-area-inset-left="safeArea"
    :safe-area-inset-right="safeArea"
    :aria-label="dialogLabel"
    :aria-labelledby="dialogLabelledby"
    close-on-route-change
    @close-error="(error, reason) => $emit('close-error', error, reason)"
    @open="$emit('open')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
    @key-escape="$emit('key-escape', $event)"
    @click-overlay="$emit('click-overlay', $event)"
  >
    <template #default="{ close, pending }">
      <div :class="classes(n(), n('$--box'))" v-bind="contentAttrs">
        <div data-popup-swipe-handle :class="n('header')">
          <div :id="titleId">
            <slot name="title">
              <div :class="n('title')">{{ title ?? (pt ? pt : t)('actionSheetTitle') }}</div>
            </slot>
          </div>
          <button type="button" :class="n('close')" :disabled="pending" @click="close('close', $event)">
            {{ (pt ? pt : t)('dialogCancelButtonText') }}
          </button>
        </div>

        <slot name="actions">
          <mp-action-item
            v-for="action in actions"
            :key="action.name"
            :name="action.name"
            :namespace="action.namespace"
            :icon="action.icon"
            :icon-size="action.iconSize"
            :class-name="action.className"
            :color="action.color"
            :disabled="action.disabled"
            @click="handleSelect(action)"
          />
        </slot>
      </div>
    </template>
  </mp-popup>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useId, watch } from 'vue'
import { call } from '@maple-design/shared-vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { miscText as t } from '../locale/misc-text'
import MpPopup from '../popup'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import MpActionItem from './ActionItem.vue'
import { type ActionItem } from './index'
import { props } from './props'

const { name, n, classes } = createNamespace('action-sheet')

export default defineComponent({
  name,
  directives: { Ripple },
  components: {
    MpPopup,
    MpActionItem,
  },
  inheritAttrs: false,
  props,
  emits: ['select', 'update:open', 'open', 'opened', 'close', 'closed', 'key-escape', 'click-overlay', 'close-error'],
  setup(props, { attrs, emit }) {
    const titleId = `mp-action-sheet-title-${useId()}`
    const dialogLabel = computed(() => attrs['aria-label'])
    const dialogLabelledby = computed(() => attrs['aria-labelledby'] ?? (dialogLabel.value ? undefined : titleId))
    const contentAttrs = computed(() =>
      Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'aria-label' && key !== 'aria-labelledby')),
    )
    const internalOpen = ref(props.open ?? props.defaultOpen)
    watch(
      () => props.open,
      (value) => {
        if (value !== undefined) {
          internalOpen.value = value
        }
      },
      { flush: 'sync' },
    )
    const open = computed({
      get: () => props.open ?? internalOpen.value,
      set: (value: boolean) => {
        if (props.open === undefined) {
          internalOpen.value = value
        }
        emit('update:open', value)
      },
    })
    const { t: pt } = injectLocaleProvider()

    function handleSelect(action: ActionItem) {
      if (action.disabled) {
        return
      }

      const { closeOnClickAction } = props
      emit('select', action)

      if (closeOnClickAction) {
        open.value = false
      }
    }

    return {
      open,
      titleId,
      dialogLabel,
      dialogLabelledby,
      contentAttrs,
      pt,
      t,
      n,
      classes,
      handleSelect,
    }
  },
})
</script>
