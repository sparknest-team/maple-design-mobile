<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { inMobile } from '@maple-design/shared-vue'
import BaseHoverOverlay from '../hover/HoverOverlay.vue'
import BaseLoading from '../loading/Loading.vue'
import vRipple from '../ripple'
import { createNamespace } from '../utils/components'
import { buttonProps } from './props'
import { useButton } from './use-button'

defineOptions({ name: createNamespace('button').name, inheritAttrs: false })
const props = defineProps(buttonProps)
const attrs = useAttrs()
const rootAttrs = () => Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'))
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { n, classes } = createNamespace('button')
const { states, busy, blocked, computedStyle, handleClick } = useButton(props, emit)
const hovering = ref(false)
const focusing = ref(false)
// Button indicators use a compact square for every animation and icon layout.
const indicatorSize = computed(() => {
  const size = props.loadingSize ?? states.value.size
  return typeof size === 'number' ? size : { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 }[size]
})
</script>

<template>
  <component
    :is="component"
    v-bind="rootAttrs()"
    v-ripple="{ disabled: blocked || !ripple }"
    :href="component === 'a' && !blocked ? attrs.href : undefined"
    :role="component === 'a' && blocked ? 'link' : attrs.role"
    :class="[
      classes(
        n(),
        n(`--size-${states.size}`),
        n(`--status-${states.status}`),
        n(`--variant-${states.variant}`),
        [block, n('--block')],
        [round, n('--round')],
        [states.stacked, n('--stacked')],
        [$slots.icon && !$slots.default, n('--icon-only')],
        [states.variant === 'default', states.elevation],
        [busy, n('--loading')],
        [busy, n(`--loading-${loadingMode}`)],
        [states.disabled, n('--disabled')],
        [!blocked && focusing && focusable, n('--focus')],
        [!blocked && hovering, n('--hovering')],
      ),
      attrs.class,
    ]"
    :style="[computedStyle, attrs.style]"
    :type="component === 'button' ? htmlType : undefined"
    :disabled="component === 'button' ? blocked : undefined"
    :aria-disabled="component === 'a' && blocked ? true : undefined"
    :aria-busy="busy || undefined"
    :tabindex="!focusable || (component === 'a' && blocked) ? -1 : attrs.tabindex"
    @mouseenter="hovering = !inMobile()"
    :autofocus="autofocus"
    @mouseleave="hovering = false"
    @click="handleClick"
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
      <BaseLoading v-else :type="loadingType" :size="indicatorSize" :color="loadingColor ?? 'currentColor'" />
    </span>
    <span v-if="$slots.icon" :class="classes(n('--icon'), [busy && loadingMode === 'fill', n('--hidden')])">
      <slot name="icon" />
      <span
        v-if="busy && loadingMode === 'default'"
        :class="n('loading')"
        aria-hidden="true"
        :style="{ color: loadingColor }"
      >
        <BaseLoading :type="loadingType" :size="indicatorSize" :color="loadingColor ?? 'currentColor'" />
      </span>
    </span>
    <span v-if="$slots.default" :class="classes(n('content'), [busy && loadingMode === 'fill', n('--hidden')])"
      ><slot
    /></span>
    <BaseHoverOverlay :hovering="!blocked && hovering" />
  </component>
</template>
