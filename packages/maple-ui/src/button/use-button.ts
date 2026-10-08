import { computed, onActivated, onBeforeUnmount, onDeactivated, ref, type CSSProperties } from 'vue'
import { createNamespace } from '../utils/components'
import type { ButtonHandler, ButtonProps } from './props'
import { useButtonGroup } from './provide'

/** Shared state and event contract; group registration stays platform-local. */
export function useButton(props: Readonly<ButtonProps>) {
  const { n } = createNamespace('button')
  const { buttonGroup: group } = useButtonGroup()
  const pending = ref(false)
  let active = true
  let generation = 0
  let invoking = false
  const invalidate = () => {
    active = false
    generation++
    pending.value = false
  }
  onBeforeUnmount(invalidate)
  onDeactivated(invalidate)
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
    iconContainer: props.iconContainer,
    block: props.block,
    // Use one normalization instead of different platform elevation helpers.
    elevation:
      group || props.elevation === false
        ? undefined
        : n(
            `$-elevation--${props.elevation === true || props.elevation == null ? 2 : Math.min(24, Math.max(0, Math.round(Number(props.elevation) || 0)))}`,
          ),
  }))
  const busy = computed(() => !!(props.loading || pending.value))
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
  function invoke(event: Event, handlers?: ButtonHandler | ButtonHandler[]) {
    if (blocked.value || invoking || !active) {
      if (event.type === 'click') {
        event.preventDefault()
        event.stopPropagation()
      }
      return
    }
    if (!handlers) {
      return
    }
    const results: PromiseLike<unknown>[] = []
    invoking = true
    try {
      for (const handler of Array.isArray(handlers) ? handlers : [handlers]) {
        const result = handler(event)
        if (result && typeof result.then === 'function') {
          results.push(result)
        }
      }
    } finally {
      invoking = false
      // A synchronous handler never flashes loading. allSettled keeps the button
      // blocked until every listener finishes, including after an early rejection.
      if (results.length) {
        const ticket = ++generation
        if (props.autoLoading && active) {
          pending.value = true
        }
        void Promise.allSettled(results).then(() => {
          if (active && ticket === generation) {
            pending.value = false
          }
        })
      }
    }
  }
  return {
    states,
    busy,
    blocked,
    computedStyle,
    handleClick: (event: Event) => invoke(event, props.onClick),
    handleTouchstart: (event: Event) => invoke(event, props.onTouchstart),
  }
}
