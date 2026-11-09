import {
  defineComponent,
  h,
  onBeforeUnmount,
  render,
  shallowRef,
  watch,
  type AppContext,
  type PropType,
  type VNode,
} from 'vue'

// Create message refs and slots during an actual render in the captured context.
const MessageScope = defineComponent({
  name: 'MessageScope',
  props: { renderVNode: { type: Function as PropType<() => VNode>, required: true } },
  setup: (props) => () => props.renderVNode(),
})

// Independent Vue roots preserve each call's full app context within one visual stack.
export default defineComponent({
  name: 'MessageContextRoot',
  props: {
    appContext: { type: Object as PropType<AppContext | null>, default: null },
    renderVNode: { type: Function as PropType<() => VNode>, required: true },
  },
  setup(props) {
    const root = shallowRef<HTMLElement>()
    watch(
      [root, () => props.renderVNode, () => props.appContext],
      ([container, makeVNode, appContext]) => {
        if (!container) {
          return
        }
        const vnode = h(MessageScope, { renderVNode: makeVNode })
        vnode.appContext = appContext
        render(vnode, container)
      },
      { flush: 'post', immediate: true },
    )
    onBeforeUnmount(() => {
      if (root.value) {
        render(null, root.value)
      }
    })
    return () => h('div', { ref: root, style: { display: 'contents' } })
  },
})
