import { h, nextTick, ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import PeopleSelect from '../../people-select'
import Search from '../../search'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

for (const kind of ['search', 'people'] as const) {
  test(`${kind} preserves caller invalid state and description across dynamic Form errors`, async () => {
    const invalid = ref<boolean | string>(false)
    const description = ref('external-one')
    const wrapper = mount(Form, {
      props: { editMode: 'direct', model: { value: '' } },
      slots: {
        default: () =>
          h(FormItem, { field: 'value', label: 'Value' }, () =>
            kind === 'search'
              ? h(Search, {
                  editMode: 'direct',
                  inputAttrs: { 'aria-invalid': invalid.value, 'aria-describedby': description.value },
                })
              : h(PeopleSelect, {
                  editMode: 'direct',
                  options: [{ label: 'Alice', value: 'a' }],
                  'aria-invalid': invalid.value,
                  'aria-describedby': description.value,
                }),
          ),
      },
    })
    try {
      const input = () => wrapper.get('input')
      expect(input().attributes('aria-invalid')).toBe('false')
      expect(input().attributes('aria-describedby')).toBe('external-one')
      ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
      await nextTick()
      const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
      expect(input().attributes('aria-invalid')).toBe('true')
      expect(input().attributes('aria-describedby')?.split(/\s+/)).toEqual(['external-one', errorId])
      invalid.value = 'grammar'
      description.value = 'external-two'
      await nextTick()
      expect(input().attributes('aria-invalid')).toBe('true')
      expect(input().attributes('aria-describedby')?.split(/\s+/)).toEqual(['external-two', errorId])
      ;(wrapper.vm as any).clearValidate()
      await nextTick()
      expect(input().attributes('aria-invalid')).toBe('grammar')
      expect(input().attributes('aria-describedby')).toBe('external-two')
    } finally {
      wrapper.unmount()
    }
  })
}

test('Search popup input follows dynamic caller descriptions and Form errors', async () => {
  const invalid = ref<boolean | string>(false)
  const description = ref('external-one')
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { editMode: 'direct', model: { value: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(Search, {
            editMode: 'popup',
            recentSearches: ['previous'],
            inputAttrs: { 'aria-invalid': invalid.value, 'aria-describedby': description.value },
          }),
        ),
    },
  })
  try {
    await wrapper.get('input').trigger('focus')
    await flushPromises()
    const input = () => document.querySelector<HTMLInputElement>('.mp-search__popup-content input')!
    expect(input()).toBeTruthy()
    expect(input().getAttribute('aria-invalid')).toBe('false')
    expect(input().getAttribute('aria-describedby')).toBe('external-one')
    ;(wrapper.vm as any).setFields({ value: { message: 'Invalid value' } })
    await nextTick()
    const errorId = wrapper.get('[role=alert]').element.closest('[id]')!.id
    expect(input().getAttribute('aria-invalid')).toBe('true')
    expect(input().getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['external-one', errorId])
    invalid.value = 'grammar'
    description.value = 'external-two'
    await nextTick()
    expect(input().getAttribute('aria-invalid')).toBe('true')
    expect(input().getAttribute('aria-describedby')?.split(/\s+/)).toEqual(['external-two', errorId])
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(input().getAttribute('aria-invalid')).toBe('grammar')
    expect(input().getAttribute('aria-describedby')).toBe('external-two')
  } finally {
    wrapper.unmount()
  }
})
