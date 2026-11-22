import { createVNode, defineComponent } from 'vue'
import { createNamespace } from '../utils/components'
import { firstStructuralNode } from './structural-slot'

const { name } = createNamespace('thead')

export default defineComponent({
  name,
  setup(_, { slots }) {
    return () => {
      return createVNode(firstStructuralNode(slots.thead?.()) ?? 'thead', null, {
        default: slots.default,
      })
    }
  },
})
