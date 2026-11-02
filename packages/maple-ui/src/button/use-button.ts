import { computed, onActivated, onBeforeUnmount, onDeactivated, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import type { ButtonProps } from './props'
import { useButtonGroup } from './provide'

/** Shared state and event contract; group registration stays platform-local. */
export function useButton(
  props: Readonly<ButtonProps>,
  emit: { (event: 'click', value: MouseEvent): void; (event: 'touchstart', value: TouchEvent): void },
) {
  const { n } = createNamespace('button')
  const { buttonGroup: group } = useButtonGroup()
  let active = true
  let invoking = false
  onBeforeUnmount(() => {
    active = false
  })
  onDeactivated(() => {
    active = false
  })
  onActivated(() => {
    active = true
  })
  const states = computed(() => ({
    status: props.status ?? group?.status.value ?? 'default',
    variant: props.variant ?? group?.variant.value ?? 'default',
    size: props.size ?? group?.size.value ?? 'md',
    color: props.color ?? group?.color.value,
    textColor: props.textColor ?? group?.textColor.value,
    disabled: props.disabled ?? group?.disabled.value ?? false,
    stacked: props.stacked ?? group?.stacked.value ?? false,
    block: props.block,
    // Use one normalization instead of different platform elevation helpers.
    elevation:
      group || props.elevation === false
        ? undefined
        : n(
            `$-elevation--${props.elevation === true || props.elevation == null ? 2 : Math.min(24, Math.max(0, Math.round(Number(props.elevation) || 0)))}`,
          ),
  }))
  const busy = computed(() => !!props.loading)
  const blocked = computed(() => !!(states.value.disabled || busy.value))
  const computedStyle = computed<CSSProperties>(() => {
    if (states.value.disabled) {
      return {}
    }
    const { color, textColor, variant } = states.value
    return {
      color: textColor || (variant !== 'default' ? color : undefined),
      background:
        variant === 'default'
          ? color
          : variant === 'tonal' && color
            ? `color-mix(in srgb, ${color} 16%, transparent)`
            : undefined,
      borderColor: variant === 'outline' ? textColor || color : undefined,
    }
  })
  function handleClick(event: MouseEvent) {
    if (blocked.value || invoking || !active) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    invoking = true
    try {
      emit('click', event)
    } finally {
      invoking = false
    }
  }
  function handleTouchstart(event: TouchEvent) {
    if (!blocked.value && active) {
      emit('touchstart', event)
    }
  }

  return {
    states,
    busy,
    blocked,
    computedStyle,
    handleClick,
    handleTouchstart,
  }
}
