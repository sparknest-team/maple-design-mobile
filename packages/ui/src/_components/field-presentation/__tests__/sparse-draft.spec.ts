import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import FieldPresentation from '../FieldPresentation.vue'
import { withFieldPresentation } from '../with-field-presentation'

it('preserves sparse array length and commits a change consisting only of trailing holes', async () => {
  const original = { values: ['a'] as string[] }
  const next = { values: ['a'] as string[] }
  next.values.length = 3
  const beforeCommit = vi.fn((_payload: unknown) => true)
  const Base = defineComponent({
    props: {
      modelValue: Object,
      beforeCommit: Function,
      editMode: String,
      defaultOpen: Boolean,
      popupContainer: [Boolean, String, Object, Function],
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
    props: { modelValue: original, editMode: 'popup', defaultOpen: true, popupContainer: false, beforeCommit },
  })
  try {
    await flushPromises()
    await wrapper.get('[data-update]').trigger('click')
    await (wrapper.getComponent(FieldPresentation).props('commit') as () => Promise<unknown>)()
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    const draft = (beforeCommit.mock.calls[0][0] as any).value.values
    expect(draft.length).toBe(3)
    expect(1 in draft).toBe(false)
    expect(2 in draft).toBe(false)
    const emitted = (wrapper.emitted('update:modelValue')?.[0][0] as any).values
    expect(emitted.length).toBe(3)
    expect(1 in emitted).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
