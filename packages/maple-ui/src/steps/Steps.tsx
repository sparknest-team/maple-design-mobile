import type { VNode } from 'vue'
import { cloneVNode, Comment, computed, defineComponent, h, isVNode, provide, ref } from 'vue'
import { createNamespace } from '../utils/components'
import { flatChildren as flatFragment } from './children'
import { stepsInjectionKey } from './context'
import { stepsProps, type StepStatus } from './props'

const { name, n } = createNamespace('steps')

export default defineComponent({
  name,
  props: stepsProps,
  emits: {
    'update:current': (_current: number) => true,
    change: (_current: number, _previous: number, _event: Event) => true,
  },
  setup(props, { emit, slots }) {
    const uncontrolledCurrent = ref(props.defaultCurrent)
    const current = computed(() => props.current ?? uncontrolledCurrent.value)
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
      emit('update:current', index)
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
      const steps = children.map((child, index) =>
        cloneVNode(child, {
          internalIndex: index + 1,
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
          role: 'list',
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
