import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import FieldPresentation from '../FieldPresentation.vue'
import { withFieldPresentation } from '../with-field-presentation'

it.each([false, true])(
  'preserves an own __proto__ data property during deferred commit (accept=%s)',
  async (accept) => {
    const next = JSON.parse('{"__proto__":{"name":"record"},"value":"new","nested":[{"__proto__":{"name":"child"}}]}')
    next.self = next
    const beforeCommit = vi.fn((_payload: unknown) => accept)
    const Base = defineComponent({
      props: {
        modelValue: Object,
        beforeCommit: Function,
        editMode: String,
        defaultOpen: Boolean,
        popupContainer: { type: [Boolean, String, Object, Function], default: undefined },
      },
      emits: ['update:modelValue', 'change'],
      setup:
        (_props, { emit }) =>
        () =>
          h('button', { 'data-update': '', onClick: () => emit('update:modelValue', next) }, 'Update'),
    })
    const Field = withFieldPresentation(Base, { text: () => 'Value' })
    const wrapper = mount(Field, {
      attachTo: document.body,
      props: {
        modelValue: { value: 'old' },
        editMode: 'popup',
        defaultOpen: true,
        popupContainer: false,
        beforeCommit,
      },
    })
    try {
      await flushPromises()
      await wrapper.get('[data-update]').trigger('click')
      await (wrapper.getComponent(FieldPresentation).props('commit') as () => Promise<unknown>)()
      await flushPromises()
      expect(beforeCommit).toHaveBeenCalledTimes(1)
      const value = (beforeCommit.mock.calls[0][0] as any).value
      expect(Object.getPrototypeOf(value)).toBe(Object.prototype)
      expect(Object.prototype.hasOwnProperty.call(value, '__proto__')).toBe(true)
      expect(value.__proto__).toEqual({ name: 'record' })
      expect(value.self).toBe(value)
      expect(Object.getPrototypeOf(value.nested[0])).toBe(Object.prototype)
      expect(Object.prototype.hasOwnProperty.call(value.nested[0], '__proto__')).toBe(true)
      expect(value.nested[0].__proto__).toEqual({ name: 'child' })
      if (accept) {
        const emitted = wrapper.emitted('update:modelValue')?.[0][0] as any
        expect(Object.prototype.hasOwnProperty.call(emitted, '__proto__')).toBe(true)
        expect(emitted.__proto__).toEqual({ name: 'record' })
      } else {
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      }
    } finally {
      wrapper.unmount()
    }
  },
)
