import { computed, defineComponent, provide, reactive, toRefs } from 'vue'
import { useChildrenComponents } from '../_hooks/use-children-components'
import Loading from '../loading/Loading.vue'
import { createNamespace } from '../utils/components'
import { timelineInjectionKey } from './context'
import Item from './Item.vue'
import { timelineProps } from './props'

const { name } = createNamespace('timeline')

export default defineComponent({
  name,
  components: {
    Item,
    Loading,
  },
  props: timelineProps,
  /**
   * @zh 幽灵节点
   * @en Custom dot
   * @slot dot
   */
  setup(props, { slots }) {
    const prefixCls = createNamespace('timeline').n()
    const { children, components } = useChildrenComponents(Item.name!)
    const {
      reverse: reverseRef,
      orientation: directionRef,
      labelPosition: labelPositionRef,
      mode: modeRef,
    } = toRefs(props)

    const timelineContext = reactive({
      items: components,
      orientation: directionRef,
      reverse: reverseRef,
      labelPosition: labelPositionRef,
      mode: modeRef,
    })
    provide(timelineInjectionKey, timelineContext)

    const cls = computed(() => {
      return [
        prefixCls,
        `${prefixCls}-${props.mode}`,
        `${prefixCls}-direction-${props.orientation}`,
        {
          [`${prefixCls}-is-reverse`]: props.reverse,
        },
      ]
    })

    return () => {
      if (props.pending || slots.pending) {
        children.value = (slots.default?.() ?? []).concat(
          <Item
            v-slots={{
              dot: () => slots.dot?.() ?? <Loading size={12} />,
            }}
            lineType="dashed"
          >
            {slots.pending ? slots.pending() : props.pending !== true && <div>{props.pending}</div>}
          </Item>,
        )
      } else {
        children.value = slots.default?.()
      }

      return (
        <div role="list" class={cls.value}>
          {children.value}
        </div>
      )
    }
  },
})
