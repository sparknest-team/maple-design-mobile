import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import FieldPresentation from '../FieldPresentation.vue'
import { withFieldPresentation } from '../with-field-presentation'

const metadata = Symbol('metadata')
it.each([
  { key: 'value', accept: false },
  { key: 'value', accept: true },
  { key: metadata, accept: false },
  { key: metadata, accept: true },
])('isolates null-prototype records during deferred editing ($key, accept=$accept)', async ({ key, accept }) => {
  const record = Object.assign(Object.create(null), { [key]: 'old' })
  record.self = record
  const original = { record }
  const beforeCommit = vi.fn(() => accept)
  const Base = defineComponent({
    props: {
      modelValue: Object,
      editMode: String,
      defaultOpen: Boolean,
      popupContainer: [Boolean, String, Object, Function],
      beforeCommit: Function,
    },
    emits: ['update:modelValue', 'change'],
    setup:
      (props, { emit }) =>
      () =>
        h(
          'button',
          {
            'data-update': '',
            onClick: () => {
              const value = props.modelValue as typeof original
              value.record[key] = 'new'
              emit('update:modelValue', value)
            },
          },
          'Update',
        ),
  })
  const Field = withFieldPresentation(Base, { text: () => 'Value' })
  const wrapper = mount(Field, {
    attachTo: document.body,
    props: { modelValue: original, editMode: 'popup', defaultOpen: true, popupContainer: false, beforeCommit },
  })
  try {
    await flushPromises()
    await wrapper.get('[data-update]').trigger('click')
    expect(original.record[key]).toBe('old')
    await (wrapper.getComponent(FieldPresentation).props('commit') as () => Promise<unknown>)()
    await flushPromises()
    expect(beforeCommit).toHaveBeenCalledTimes(1)
    const draft = (beforeCommit.mock.calls[0] as any)[0].value.record
    expect(Object.getPrototypeOf(draft)).toBeNull()
    expect(draft[key]).toBe('new')
    expect(draft.self).toBe(draft)
    expect(wrapper.emitted('update:modelValue')?.length ?? 0).toBe(accept ? 1 : 0)
    expect(original.record[key]).toBe('old')
  } finally {
    wrapper.unmount()
  }
})
