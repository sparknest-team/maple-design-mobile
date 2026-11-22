import { cloneVNode, defineComponent, ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { useElementResize } from '../_utils/resize-observer'
import { getFirstComponent } from '../_utils/vue-utils'

/** Forward the original table element and observe it without a DOM wrapper. */
export default defineComponent({
  emits: ['resize'],
  setup(_, { emit, slots }) {
    const target = ref<HTMLElement | ComponentPublicInstance>()
    useElementResize(
      () => {
        const node = target.value
        return [node && '$el' in node ? node.$el : node]
      },
      () => true,
      () => emit('resize'),
    )
    return () => {
      const child = getFirstComponent(slots.default?.() ?? [])
      return child ? cloneVNode(child, { ref: target }, true) : null
    }
  },
})
