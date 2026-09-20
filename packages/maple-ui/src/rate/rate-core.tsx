import { computed, defineComponent, h, markRaw, ref, toRaw, watch, withDirectives, type Component } from 'vue'
import {
  IconFaceFrownFill,
  IconFaceMehFill,
  IconFaceSmileFill,
  IconStar,
  IconStarFill,
  IconStarHalfFull,
} from '@maplejs/icons-vue'
import { useFormItem } from '../form/item-provide'
import { useForm } from '../form/provide'
import Icon from '../icon'
import Ripple from '../ripple'
import { createNamespace } from '../utils/components'
import { positiveLength } from '../utils/size-length'
import { rateProps, type RateColor, type RateIcon as RateIconValue } from './props'

const { name, n } = createNamespace('rate')
const defaultIcons = {
  full: IconStarFill,
  empty: IconStar,
  half: IconStarHalfFull,
  meh: IconFaceMehFill,
  smile: IconFaceSmileFill,
  frown: IconFaceFrownFill,
}

export default defineComponent({
  name,
  props: rateProps,
  emits: ['change', 'hover-change', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const innerValue = ref(props.defaultValue)
    const hoverValue = ref(0)
    const animation = ref(false)
    const count = computed(() => Math.max(1, Math.floor(Number(props.count) || 5)))
    const value = computed(() => props.modelValue ?? innerValue.value)
    const displayValue = computed(() => hoverValue.value || normalize(value.value))
    const { mergedDisabled, mergedError, eventHandlers } = useFormItem({ disabled: computed(() => props.disabled) })
    const { form } = useForm()
    const interactionDisabled = computed(() => mergedDisabled.value || props.readonly || form?.readonly.value)

    watch(
      () => props.modelValue,
      (next) => {
        if (next == null) {
          innerValue.value = 0
        }
      },
    )

    function normalize(next: number) {
      const step = props.allowHalf ? 0.5 : 1
      return Math.min(props.grading ? 5 : count.value, Math.max(0, Math.round(next / step) * step))
    }

    function setValue(next: number, event?: Event) {
      if (interactionDisabled.value) {
        return
      }
      const previous = value.value
      const normalized = normalize(next)
      const result = props.clearable && normalized === previous ? 0 : normalized
      animation.value = true
      innerValue.value = result
      emit('update:modelValue', result)
      if (result !== previous || props.clearable) {
        emit('change', result)
      }
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
      const step = props.allowHalf ? 0.5 : 1
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        setValue(value.value + step, event)
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        setValue(value.value - step, event)
      } else if (event.key === 'Home') {
        setValue(0, event)
      } else if (event.key === 'End') {
        setValue(props.grading ? 5 : count.value, event)
      } else {
        return
      }
      event.preventDefault()
    }

    return () =>
      h(
        'div',
        {
          class: [
            n(),
            {
              [n('--readonly')]: props.readonly,
              [n('--disabled')]: mergedDisabled.value,
              [n('--error')]: mergedError.value,
            },
          ],
          style: { fontSize: positiveLength(props.size, '') },
          role: 'slider',
          tabindex: interactionDisabled.value ? undefined : 0,
          'aria-valuemin': 0,
          'aria-valuemax': props.grading ? 5 : count.value,
          'aria-valuenow': value.value,
          'aria-disabled': interactionDisabled.value || undefined,
          onKeydown: keydown,
          onMouseleave: resetHover,
        },
        Array.from({ length: props.grading ? 5 : count.value }, (_, offset) => {
          const index = offset + 1
          const half = props.allowHalf && index - 0.5 === displayValue.value
          const active = index <= displayValue.value
          const selectedColor = props.disabled ? props.disabledColor : colorAt(index, props.color)
          const emptyColor = props.disabled ? props.disabledColor : props.emptyColor
          return withDirectives(
            h(
              'div',
              {
                class: [
                  n('content'),
                  {
                    [n('--primary')]: active && !selectedColor,
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
                  setValue(props.allowHalf && event.clientX - rect.left <= rect.width / 2 ? index - 0.5 : index, event)
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
