import type { VNode } from 'vue'
import { cloneVNode, Comment, computed, defineComponent, h, isVNode, provide, ref } from 'vue'
import { useDirection } from '@maple-design/use'
import { createNamespace } from '../utils/components'
import { flatChildren as flatFragment } from './children'
import { stepsInjectionKey } from './context'
import { stepsProps, type StepStatus } from './props'

const { name, n } = createNamespace('steps')

export default defineComponent({
  name,
  props: stepsProps,
  emits: {
    'update:modelValue': (_current: number) => true,
    change: (_current: number, _previous: number, _event: Event) => true,
  },
  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>()
    const { isRtl } = useDirection(() => root.value)
    const focusedStep = ref<number>()
    function onKeydown(event: KeyboardEvent) {
      if (!props.changeable || event.defaultPrevented) {
        return
      }
      const target = event.target as HTMLElement
      if (!target.matches('[data-step-index]')) {
        return
      }
      const items = Array.from(
        root.value?.querySelectorAll<HTMLElement>('[data-step-index]:not([aria-disabled="true"])') ?? [],
      )
      const index = items.indexOf(target)
      if (index < 0) {
        return
      }
      const next = orientation.value === 'vertical' ? 'ArrowDown' : isRtl.value ? 'ArrowLeft' : 'ArrowRight'
      const previous = orientation.value === 'vertical' ? 'ArrowUp' : isRtl.value ? 'ArrowRight' : 'ArrowLeft'
      if (!['Home', 'End', next, previous].includes(event.key)) {
        return
      }
      event.preventDefault()
      const position =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : Math.max(0, Math.min(items.length - 1, index + (event.key === next ? 1 : -1)))
      items[position]?.focus()
    }
    const uncontrolledCurrent = ref(props.defaultValue)
    const current = computed(() => props.modelValue ?? uncontrolledCurrent.value)
    const orientation = computed(() =>
      ['arrow', 'navigation'].includes(props.type) ? 'horizontal' : props.orientation,
    )
    const contentPlacement = computed(() => {
      if (props.type === 'dot') {
        return orientation.value === 'vertical' ? 'right' : 'bottom'
      }
      if (props.type === 'navigation') {
        return 'right'
      }
      return props.contentPlacement
    })
    const size = computed(() => props.size)
    const type = computed(() => props.type)
    const showLine = computed(() => props.showLine)
    const changeable = computed(() => props.changeable)

    const getStatus = (index: number, ownStatus?: StepStatus): StepStatus => {
      if (ownStatus) {
        return ownStatus
      }
      if (index < current.value) {
        return 'finish'
      }
      if (index > current.value) {
        return 'wait'
      }
      return props.status
    }

    const select = (index: number, event: Event) => {
      if (!props.changeable || index === current.value) {
        return
      }
      const previous = current.value
      uncontrolledCurrent.value = index
      emit('update:modelValue', index)
      emit('change', index, previous, event)
    }

    provide(stepsInjectionKey, {
      current,
      orientation,
      contentPlacement,
      size,
      type,
      showLine,
      changeable,
      slots,
      getStatus,
      select,
    })

    return () => {
      const children = (flatFragment(slots.default?.() ?? []) as VNode[]).filter(
        (child) => isVNode(child) && child.type !== Comment,
      )
      const enabled = children
        .map((child, index) => (child.props?.disabled !== true && child.props?.disabled !== '' ? index + 1 : -1))
        .filter((index) => index > 0)
      const tabStop =
        [focusedStep.value, current.value].find((index) => index !== undefined && enabled.includes(index)) ?? enabled[0]
      const steps = children.map((child, index) =>
        cloneVNode(child, {
          internalIndex: index + 1,
          'data-step-index': index + 1,
          tabindex: changeable.value && tabStop === index + 1 ? 0 : -1,
          onFocus: () => {
            focusedStep.value = index + 1
          },
          internalNextStatus:
            index < children.length - 1
              ? getStatus(index + 2, children[index + 1].props?.status as StepStatus | undefined)
              : undefined,
        }),
      )
      const labelPlacement = contentPlacement.value === 'bottom' ? 'vertical' : 'horizontal'

      return h(
        'div',
        {
          ref: root,
          onKeydown,
          role: changeable.value ? 'group' : 'list',
          class: [
            n(),
            `${n()}-${orientation.value}`,
            `${n()}-label-${labelPlacement}`,
            `${n()}-mode-${type.value}`,
            `${n()}-size-${size.value}`,
            {
              [`${n()}-changeable`]: changeable.value,
              [`${n()}-show-line`]: showLine.value,
            },
          ],
        },
        steps,
      )
    }
  },
})
