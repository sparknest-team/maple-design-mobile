import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import FieldPresentation from '../FieldPresentation.vue'
import { withFieldPresentation } from '../with-field-presentation'

test.each([
  [1, 2, true],
  [2, 1, true],
  [1, 1, false],
  [2, 2, false],
] as const)('deferred confirmation compares cycles of length %i and %i', async (oldLength, nextLength, changed) => {
  const cycle = (length: number) => {
    const nodes = Array.from({ length }, () => ({}) as any)
    nodes.forEach((node, index) => {
      node.next = nodes[(index + 1) % length]
    })
    return nodes[0]
  }
  const old = cycle(oldLength)
  const next = cycle(nextLength)
  const Base = defineComponent({
    props: {
      modelValue: Object,
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
    props: { modelValue: old, editMode: 'popup', defaultOpen: true, popupContainer: false },
  })
  try {
    await flushPromises()
    await wrapper.get('[data-update]').trigger('click')
    await (wrapper.getComponent(FieldPresentation).props('commit') as () => Promise<unknown>)()
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')?.length ?? 0).toBe(changed ? 1 : 0)
  } finally {
    wrapper.unmount()
  }
})

test('shared acyclic values and equal copies do not publish a change', async () => {
  const shared = { value: 1 }
  const old = { first: shared, second: shared }
  const next = { first: { value: 1 }, second: { value: 1 } }
  const Base = defineComponent({
    props: {
      modelValue: Object,
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
    props: { modelValue: old, editMode: 'popup', defaultOpen: true, popupContainer: false },
  })
  try {
    await flushPromises()
    await wrapper.get('[data-update]').trigger('click')
    await (wrapper.getComponent(FieldPresentation).props('commit') as () => Promise<unknown>)()
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
