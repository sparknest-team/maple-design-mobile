<template>
  <button
    v-ripple="{ disabled }"
    type="button"
    :disabled="disabled"
    :class="classes(n('action-item'), className, [disabled, n('--disabled')])"
    :style="{ color }"
    @mouseenter="hovering = !inMobile()"
    @mouseleave="hovering = false"
  >
    <mp-registered-icon v-if="icon" mp-action-sheet-cover :class="n('action-icon')" :name="icon" :size="iconSize" />
    <div :class="n('action-name')">{{ name }}</div>

    <mp-hover-overlay :hovering="disabled ? false : hovering" />
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { inMobile } from '@maple-design/shared-vue'
import MpHoverOverlay from '../hover/HoverOverlay.vue'
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
  directives: { Ripple },
  props: {
    name: String,
    className: String,
    disabled: Boolean,
    color: String,
    iconSize: [String, Number],
    icon: String,
  },
  setup() {
    const hovering = ref(false)

    return {
      hovering,
      n,
      classes,
      inMobile,
    }
  },
})
</script>
