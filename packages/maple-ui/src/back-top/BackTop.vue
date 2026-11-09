<template>
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
      <slot><IconToTop aria-hidden="true" /></slot>
    </button>
  </Teleport>
</template>

<script setup lang="ts">
import { mergeProps, useAttrs } from 'vue'
import { IconToTop } from '@maple-design/icons-vue'
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
