import { defineComponent } from 'vue'
import { useFirstElement } from '../_hooks/use-first-element'
import { createNamespace } from '../utils/components'
import { useElementResize } from '../utils/resize-observer'

export default defineComponent({
  name: createNamespace('resize-observer').name,
  props: {
    watchOnUpdated: Boolean,
  },
  emits: [
    /**
     * resize 事件
     * @property {ResizeObserverEntry} entry 触发 resize 的 dom 元素
     */
    'resize',
  ],
  setup(props, { emit, slots }) {
    const { children, firstElement } = useFirstElement()
    useElementResize(
      () => [firstElement.value],
      () => true,
      (entries) => {
        const entry = entries.find((entry) => entry.target === firstElement.value)
        if (entry) {
          emit('resize', entry)
        }
      },
      undefined,
      false,
    )

    return () => {
      children.value = slots.default?.()
      return children.value
    }
  },
})
