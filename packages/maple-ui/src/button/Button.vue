<script setup lang="ts">
import { ref } from 'vue'
import vHover, { HoverOverlay as BaseHoverOverlay, useHoverOverlay } from '../hover'
import BaseLoading from '../loading'
import vRipple from '../ripple'
import { createNamespace } from '../utils/components'
import { buttonProps } from './props'
import { useButton } from './use-button'

defineOptions({ name: createNamespace('button').name })
const props = defineProps(buttonProps)
const { n, classes } = createNamespace('button')
const { states, busy, blocked, computedStyle, handleClick, handleTouchstart } = useButton(props)
const { hovering, handleHovering } = useHoverOverlay()
const focusing = ref(false)
</script>

<template>
  <component
    :is="component"
    v-ripple="{ disabled: blocked || !ripple }"
    v-hover:desktop="handleHovering"
    :class="
      classes(
        n(),
        n(`--size-${states.size}`),
        n(`--status-${states.status}`),
        n(`--variant-${states.variant}`),
        [block, n('--block')],
        [round, n('--round')],
        [states.stacked, n('--stacked')],
        [states.iconContainer, n('--icon-container')],
        [states.iconContainer && states.variant === 'default', n(`--icon-container-${states.status}`)],
        [states.variant === 'default' && !states.iconContainer, states.elevation],
        [busy, n('--loading')],
        [busy, n(`--loading-${loadingMode}`)],
        [states.disabled, n('--disabled')],
        [!blocked && focusing && focusable, n('--focus')],
        [!blocked && hovering, n('--hovering')],
      )
    "
    :style="computedStyle"
    :type="component === 'button' ? htmlType : undefined"
    :disabled="component === 'button' ? blocked : undefined"
    :aria-disabled="component === 'a' && blocked ? true : undefined"
    :aria-busy="busy || undefined"
    :tabindex="!focusable || (component === 'a' && blocked) ? -1 : undefined"
    :autofocus="autofocus"
    @click="handleClick"
    @touchstart="handleTouchstart"
    @focus="focusing = true"
    @blur="focusing = false"
  >
    <span
      v-if="busy && !(loadingMode === 'default' && $slots.icon)"
      :class="n('loading')"
      aria-hidden="true"
      :style="{ color: loadingColor }"
    >
      <span v-if="loadingMode === 'line'" :class="n('loading-line')" />
      <BaseLoading
        v-else
        :type="loadingType"
        :size="loadingSize ?? states.size"
        :color="loadingColor"
        :radius="loadingRadius"
      />
    </span>
    <span v-if="$slots.icon" :class="classes(n('--icon'), [busy && loadingMode === 'fill', n('--hidden')])">
      <slot name="icon" />
      <span
        v-if="busy && loadingMode === 'default'"
        :class="n('loading')"
        aria-hidden="true"
        :style="{ color: loadingColor }"
      >
        <BaseLoading :type="loadingType" :size="loadingSize ?? 'xs'" :color="loadingColor" :radius="loadingRadius" />
      </span>
    </span>
    <span v-if="$slots.default" :class="classes(n('content'), [busy && loadingMode === 'fill', n('--hidden')])"
      ><slot
    /></span>
    <BaseHoverOverlay :hovering="!blocked && hovering" />
  </component>
</template>
