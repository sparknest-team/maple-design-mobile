<template>
  <!-- Keep an inline Teleport inside a fragment for Vue 3.2 hydration. -->
  <template v-if="false" />
  <Teleport :to="popupTarget" :disabled="!mounted || popupContainer === false">
    <button
      v-show="visible"
      v-bind="mergeProps(themeScope, $attrs)"
      type="button"
      :dir="readingDirection"
      :class="
        classes(n(), formatElevation(elevation, 2), [visible, n('--active')], [popupContainer === false, n('--inline')])
      "
      :style="{ right: toSizeUnit(right), bottom: toSizeUnit(bottom) }"
      :aria-label="ariaLabel"
      @click="handleClick"
    >
      <slot>
        <svg
          class="mp-svg-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          role="img"
          aria-hidden="true"
        >
          <path d="M43 7H5M24 20v23M24 13.96 30.453 21H17.546zm.736-.804Z" />
          <path fill="currentColor" stroke="none" d="m24 14-6 7h12z" />
        </svg>
      </slot>
    </button>
  </Teleport>
</template>

<script setup lang="ts">
import { mergeProps, useAttrs } from 'vue'
import { useDirection } from '../_utils/direction'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace, formatElevation } from '../utils/components'
import { toSizeUnit } from '../utils/elements'
import { usePopupContainer } from '../utils/popup-container'
import { backTopProps } from './props'
import { useBackTop } from './use-back-top'

const themeScope = useThemeScope()

defineOptions({ name: createNamespace('back-top').name, inheritAttrs: false })
const props = defineProps(backTopProps)
const directionAttrs = useAttrs()
const { dir: readingDirection } = useDirection(undefined, () => directionAttrs.dir)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { n, classes } = createNamespace('back-top')
const popupTarget = usePopupContainer(() => props.popupContainer)
const { visible, mounted, scrollToTop } = useBackTop(props)
function handleClick(event: MouseEvent) {
  scrollToTop()
  emit('click', event)
}
defineExpose({ scrollToTop })
</script>
