<template>
  <button
    v-ripple="{ disabled }"
    v-hover:desktop="handleHovering"
    type="button"
    :disabled="disabled"
    :class="classes(n('action-item'), className, [disabled, n('--disabled')])"
    :style="{ color }"
  >
    <mp-registered-icon v-if="icon" mp-action-sheet-cover :class="n('action-icon')" :name="icon" :size="iconSize" />
    <div :class="n('action-name')">{{ name }}</div>

    <mp-hover-overlay :hovering="disabled ? false : hovering" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import MpRegisteredIcon from '../icon/RegisteredIcon.vue'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'

const { name, n, classes } = createNamespace('action-sheet')

export default defineComponent({
  name,
  components: {
    MpHoverOverlay,
    MpRegisteredIcon,
  },
  directives: { Ripple, Hover },
  props: {
    name: String,
    className: String,
    disabled: Boolean,
    color: String,
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
