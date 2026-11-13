import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import FieldPresentation from '../FieldPresentation.vue'
import { withFieldPresentation } from '../with-field-presentation'

it('does not submit an unchanged draft containing an invalid Date', async () => {
  const beforeCommit = vi.fn(() => true)
  const Base = defineComponent({
    props: {
      modelValue: Object,
      beforeCommit: Function,
      editMode: String,
      defaultOpen: Boolean,
      popupContainer: Boolean,
    },
    emits: ['update:modelValue', 'change'],
    setup: () => () => h('span', 'Editor'),
  })
  const Field = withFieldPresentation(Base, { text: () => 'Value' })
  const wrapper = mount(Field, {
    attachTo: document.body,
    props: {
      modelValue: { date: new Date(NaN) },
      editMode: 'popup',
      defaultOpen: true,
      popupContainer: false,
      beforeCommit,
    },
  })
  try {
    await flushPromises()
    await (wrapper.getComponent(FieldPresentation).props('commit') as () => Promise<unknown>)()
    await flushPromises()
    expect(beforeCommit).not.toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

it('still submits a change from an invalid Date to a valid Date', async () => {
  const beforeCommit = vi.fn(() => true)
  const Base = defineComponent({
    props: {
      modelValue: Object,
      beforeCommit: Function,
      editMode: String,
      defaultOpen: Boolean,
      popupContainer: Boolean,
    },
    emits: ['update:modelValue', 'change'],
    setup:
      (_props, { emit }) =>
      () =>
        h('button', { 'data-update': '', onClick: () => emit('update:modelValue', { date: new Date(0) }) }, 'Update'),
  })
  const Field = withFieldPresentation(Base, { text: () => 'Value' })
  const wrapper = mount(Field, {
    attachTo: document.body,
    props: {
      modelValue: { date: new Date(NaN) },
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
    expect((wrapper.emitted('update:modelValue')?.[0][0] as { date: Date }).date.getTime()).toBe(0)
  } finally {
    wrapper.unmount()
  }
})
