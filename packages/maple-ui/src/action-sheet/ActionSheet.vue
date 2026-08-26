<template>
  <mp-popup
    v-model:open="open"
    position="bottom"
    :class="n('popup-radius')"
    :mask="mask"
    :mask-class="maskClass"
    :mask-style="maskStyle"
    :lock-scroll="lockScroll"
    :mask-closable="maskClosable"
    :esc-to-close="escToClose"
    :popup-container="popupContainer"
    :safe-area="safeArea"
    @open="$emit('open')"
    @close="$emit('close')"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
    @route-change="$emit('route-change')"
    @key-escape="$emit('key-escape')"
  >
    <div :class="classes(n(), n('$--box'))" v-bind="$attrs">
      <slot name="title">
        <div :class="n('title')">{{ title ?? (pt ? pt : t)('actionSheetTitle') }}</div>
      </slot>

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
          @click="handleSelect(action)"
        />
      </slot>
    </div>
  </mp-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { call } from '@maplejs/maple-shared'
import { useVModel } from '@maplejs/maple-use'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'
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
  emits: ['select', 'update:open', 'open', 'opened', 'close', 'closed', 'route-change', 'key-escape'],
  setup(props, { emit }) {
    const open = useVModel(props, 'open', { emit, eventName: 'update:open' })
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
      pt,
      t,
      n,
      classes,
      handleSelect,
    }
  },
})
</script>

<style lang="less">
@import '../styles/common';
@import '../icon/icon';
@import '../ripple/ripple';
@import '../popup/popup';
@import './actionSheet';
</style>
