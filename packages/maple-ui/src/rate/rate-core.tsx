import { computed, defineComponent, h, markRaw, ref, toRaw, watch, withDirectives, type Component } from 'vue'
import {
  IconFaceFrownFill,
  IconFaceMehFill,
  IconFaceSmileFill,
  IconStar,
  IconStarFill,
  IconStarHalfFull,
} from '@maple-design/icons-vue'
import Icon from '../icon'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { positiveLength } from '../utils/size-length'
import { rateProps, type RateColor, type RateIcon as RateIconValue } from './props'
import { useRateForm } from './use-rate-form'

const { n, classes } = createNamespace('rate')
const defaultIcons = {
  full: IconStarFill,
  empty: IconStar,
  half: IconStarHalfFull,
  meh: IconFaceMehFill,
  smile: IconFaceSmileFill,
  frown: IconFaceFrownFill,
}

export default defineComponent({
  name: createNamespace('rate').name,
  props: rateProps,
  emits: ['change', 'hover-change', 'update:modelValue'],
  setup(props, { emit, slots, expose }) {
    const root = ref<HTMLElement>()
    expose({ focus: () => root.value?.focus(), blur: () => root.value?.blur() })
    const innerValue = ref(props.defaultValue)
    const hoverValue = ref(0)
    const animation = ref(false)
    const count = computed(() =>
      props.grading
        ? 5
        : Number.isFinite(Number(props.count)) && Number(props.count) > 0
          ? Math.max(1, Math.floor(Number(props.count)))
          : 5,
    )
    const value = computed(() => normalize(props.modelValue !== undefined ? props.modelValue : innerValue.value))
    const displayValue = computed(() => normalize(hoverValue.value || value.value))
    const { mergedDisabled, mergedReadonly, mergedError, eventHandlers } = useRateForm(props)
    const interactionDisabled = computed(() => mergedDisabled.value || mergedReadonly.value)

    watch(interactionDisabled, (disabled) => {
      if (disabled) {
        resetHover()
      }
    })

    function normalize(next: number) {
      const step = props.allowHalf ? 0.5 : 1
      return Math.min(count.value, Math.max(0, Math.round((Number.isFinite(next) ? next : 0) / step) * step))
    }

    function setValue(next: number, clear = false) {
      if (interactionDisabled.value) {
        return
      }
      const previous = value.value
      const normalized = normalize(next)
      const result = clear && props.clearable && normalized === previous ? 0 : normalized
      if (result === previous) {
        return
      }
      animation.value = true
      if (props.modelValue === undefined) {
        innerValue.value = result
      }
      emit('update:modelValue', result)
      emit('change', result)
      eventHandlers.value?.onChange?.()
    }

    function colorAt(index: number, source: RateColor | undefined) {
      if (typeof source === 'string') {
        return source
      }
      if (!source) {
        return undefined
      }
      const threshold = Object.keys(source)
        .map(Number)
        .filter(Number.isFinite)
        .sort((a, b) => a - b)
        .find((key) => index <= key)
      return threshold == null ? undefined : source[String(threshold)]
    }

    function iconAt(index: number): { icon?: RateIconValue; fallback: 'full' | 'empty' | 'half' } {
      if (index <= displayValue.value) {
        return { icon: props.icon, fallback: 'full' }
      }
      if (props.allowHalf && index - 0.5 === displayValue.value) {
        return { icon: props.halfIcon || props.icon, fallback: 'half' }
      }
      return { icon: props.emptyIcon, fallback: 'empty' }
    }

    function renderSymbol(index: number) {
      if (props.grading) {
        const fallback =
          index > displayValue.value
            ? 'meh'
            : displayValue.value <= 2
              ? 'frown'
              : displayValue.value <= 3
                ? 'meh'
                : 'smile'
        return renderIcon(undefined, fallback)
      }
      if (slots.character) {
        return slots.character({ index: index - 1, value: index, active: index <= displayValue.value })
      }
      const state = iconAt(index)
      return renderIcon(state.icon, state.fallback)
    }

    function renderIcon(icon: RateIconValue | undefined, fallback: keyof typeof defaultIcons) {
      const attrs = { class: n('content-icon'), style: { fontSize: positiveLength(props.size, '') } }
      if (typeof icon === 'string') {
        return h(Icon, { ...attrs, name: icon })
      }
      const component = icon ? markRaw(toRaw(icon as Component)) : defaultIcons[fallback]
      return h(Icon, attrs, { default: () => h(component) })
    }

    function hover(index: number, event: MouseEvent) {
      if (interactionDisabled.value) {
        return
      }
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      const next = props.allowHalf && event.clientX - rect.left <= rect.width / 2 ? index - 0.5 : index
      if (hoverValue.value !== next) {
        hoverValue.value = next
        emit('hover-change', next)
      }
    }

    function resetHover() {
      if (hoverValue.value) {
        hoverValue.value = 0
        emit('hover-change', 0)
      }
    }

    function keydown(event: KeyboardEvent) {
      if (
        interactionDisabled.value ||
        event.target !== event.currentTarget ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return
      }
      const step = props.allowHalf ? 0.5 : 1
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        setValue(value.value + step)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        setValue(value.value - step)
      } else if (event.key === 'Home') {
        setValue(0)
      } else if (event.key === 'End') {
        setValue(count.value)
      } else {
        return
      }
      event.preventDefault()
    }

    return () =>
      h(
        'div',
        {
          ref: root,
          class: classes(
            n(),
            [mergedReadonly.value, n('--readonly')],
            [mergedDisabled.value, n('--disabled')],
            [mergedError.value, n('--error')],
          ),
          style: { fontSize: positiveLength(props.size, '') },
          role: 'slider',
          tabindex: mergedDisabled.value ? undefined : 0,
          'aria-valuemin': 0,
          'aria-valuemax': props.grading ? 5 : count.value,
          'aria-valuenow': value.value,
          'aria-disabled': mergedDisabled.value || undefined,
          'aria-readonly': mergedReadonly.value || undefined,
          'aria-invalid': mergedError.value || undefined,
          'aria-label': props.ariaLabel || undefined,
          onFocus: () => eventHandlers.value?.onFocus?.(),
          onBlur: () => {
            resetHover()
            eventHandlers.value?.onBlur?.()
          },
          onKeydown: keydown,
          onMouseleave: resetHover,
        },
        Array.from({ length: props.grading ? 5 : count.value }, (_, offset) => {
          const index = offset + 1
          const half = props.allowHalf && index - 0.5 === displayValue.value
          const active = index <= displayValue.value
          const selectedColor = mergedDisabled.value ? props.disabledColor : colorAt(index, props.color)
          const emptyColor = mergedDisabled.value ? props.disabledColor : props.emptyColor
          return withDirectives(
            h(
              'div',
              {
                class: [
                  n('content'),
                  {
                    [n('--primary')]: (active || half) && !selectedColor,
                    [n('content-half')]: half,
                    [n('content-full')]: active,
                    [n('content-scale')]: animation.value && index <= value.value,
                  },
                ],
                style: {
                  color: active || half ? selectedColor : emptyColor,
                  marginRight: index < count.value ? positiveLength(props.gap, '') : undefined,
                },
                onMousemove: (event: MouseEvent) => hover(index, event),
                onClick: (event: MouseEvent) => {
                  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
                  setValue(props.allowHalf && event.clientX - rect.left <= rect.width / 2 ? index - 0.5 : index, true)
                },
                onAnimationend: () => {
                  animation.value = false
                },
              },
              [renderSymbol(index)],
            ),
            [[Ripple, { disabled: interactionDisabled.value || !props.ripple }]],
          )
        }),
      )
  },
})
