<template>
  <div
    v-ripple="{ disabled }"
    v-hover:desktop="handleHovering"
    :class="classes(n('action-item'), className, [disabled, n('--disabled')])"
    :style="{ color }"
  >
    <mp-icon
      v-if="icon"
      mp-action-sheet-cover
      :class="n('action-icon')"
      :namespace="namespace"
      :name="icon"
      :size="iconSize"
    />
    <div :class="n('action-name')">{{ name }}</div>

    <mp-hover-overlay :hovering="disabled ? false : hovering" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hover from '../hover'
import MpHoverOverlay, { useHoverOverlay } from '../hover-overlay'
import MpIcon from '../icon'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'

const { name, n, classes } = createNamespace('action-sheet')

export default defineComponent({
  name,
  components: {
    MpHoverOverlay,
    MpIcon,
  },
  directives: { Ripple, Hover },
  props: {
    name: String,
    className: String,
    disabled: Boolean,
    color: String,
    namespace: String,
    iconSize: [String, Number],
    icon: String,
  },
  setup() {
    const { hovering, handleHovering } = useHoverOverlay()

    return {
      hovering,
      n,
      classes,
      handleHovering,
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
