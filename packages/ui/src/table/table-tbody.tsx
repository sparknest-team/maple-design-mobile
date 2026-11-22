import { createVNode, defineComponent } from 'vue'
import { createNamespace } from '../utils/components'
import { firstStructuralNode } from './structural-slot'

const { name } = createNamespace('tbody')

export default defineComponent({
  name,
  setup(_, { slots }) {
    return () => {
      return createVNode(firstStructuralNode(slots.tbody?.()) ?? 'tbody', null, {
        default: slots.default,
      })
    }
  },
})
