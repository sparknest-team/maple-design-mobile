import { defineComponent, h, renderSlot } from 'vue'

export default defineComponent({
  name: 'OptionalSlotBody',
  render() {
    // Vue filters comment-only fragments and keeps intentional text nodes.
    const { children } = renderSlot(this.$slots, 'default')
    return Array.isArray(children) && children.length ? h('div', children) : null
  },
})
