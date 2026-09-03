<template>
  <component
    :is="component"
    v-ripple="{ disabled: states.disabled || !ripple || loading || pending }"
    v-hover:desktop="handleHovering"
    :class="
      classes(
        n(),
        n('$--box'),
        n(`--size-${states.size}`),
        n(`--status-${states.status}`),
        n(`--variant-${states.variant}`),
        [block, `${n('$--flex')} ${n('--block')}`, n('$--inline-flex')],
        [states.variant === 'default' && !states.iconContainer, states.elevation],
        [states.iconContainer, `${n('--icon-container')} ${n(`--icon-container-${states.status}`)}`],
        [round, n('--round')],
        [states.stacked, n('--stacked')],
        [loading || pending, n('--loading')],
        [states.disabled, n('--disabled')],
      )
    "
    :tabindex="focusable ? undefined : '-1'"
    :style="{
      color: states.textColor,
      background: states.color,
    }"
    :type="component === 'button' ? htmlType : undefined"
    :disabled="component === 'button' ? states.disabled : undefined"
    @click="handleClick"
    @touchstart="handleTouchstart"
    @focus="handleFocus"
    @blur="isFocusing = false"
  >
    <mp-loading
      v-if="loading || pending"
      :class="n('loading')"
      mp-button-cover
      :color="loadingColor"
      :type="loadingType"
      :size="loadingSize || loadingSizeMap[states.size]"
      :radius="loadingRadius"
    />
    <div :class="classes(n('content'), [loading || pending, n('--hidden')])">
      <slot />
    </div>

    <mp-hover-overlay
      :hovering="states.disabled || loading || pending ? false : hovering"
      :focusing="states.disabled || loading || pending ? false : isFocusing"
    />
  </component>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { call, normalizeToArray } from '@maplejs/maple-shared'
import vHover, { HoverOverlay as MpHoverOverlay, useHoverOverlay } from '../hover'
import MpLoading from '../loading'
import vRipple from '../ripple'
import { createNamespace, formatElevation } from '../utils/components'
import { buttonProps } from './props'
import { useButtonGroup } from './provide'

defineOptions({
  name: createNamespace('button').name,
})

const { n, classes } = createNamespace('button')

const loadingSizeMap = {
  xs: 'mini',
  sm: 'small',
  md: 'normal',
  lg: 'large',
  xl: 'large',
} as const

const props = defineProps(buttonProps)

const isFocusing = ref(false)
const pending = ref(false)
const { buttonGroup } = useButtonGroup()
const { hovering, handleHovering } = useHoverOverlay()

const states = computed(() => {
  if (!buttonGroup) {
    return {
      elevation: formatElevation(props.elevation, 2),
      status: props.status ?? 'default',
      variant: props.variant ?? 'default',
      size: props.size ?? 'md',
      color: props.color,
      textColor: props.textColor,
      iconContainer: props.iconContainer,
      stacked: props.stacked ?? false,
      disabled: props.disabled ?? false,
    }
  }

  const { status, size, variant, color, textColor, disabled, stacked } = buttonGroup

  return {
    elevation: '',
    status: props.status ?? status.value,
    size: props.size ?? size.value,
    variant: props.variant ?? variant.value,
    color: props.color ?? color.value,
    textColor: props.textColor ?? textColor.value,
    iconContainer: props.iconContainer,
    stacked: props.stacked ?? stacked.value,
    disabled: props.disabled ?? disabled.value,
  }
})

function attemptAutoLoading(result: any) {
  if (props.autoLoading) {
    pending.value = true

    Promise.all(normalizeToArray(result))
      .then(() => {
        pending.value = false
      })
      .catch(() => {
        pending.value = false
      })
  }
}

function handleClick(e: Event) {
  const { loading } = props

  if (!props.onClick || loading || states.value.disabled || pending.value) {
    return
  }

  attemptAutoLoading(call(props.onClick, e))
}

function handleTouchstart(e: Event) {
  const { loading } = props

  if (!props.onTouchstart || loading || states.value.disabled || pending.value) {
    return
  }

  attemptAutoLoading(call(props.onTouchstart, e))
}

function handleFocus() {
  if (!props.focusable) {
    return
  }

  isFocusing.value = true
}
</script>
