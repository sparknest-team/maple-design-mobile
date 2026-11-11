import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import PeopleSelect from '../../people-select'
import Search from '../../search'
import Upload from '../../upload'
import VerificationCode from '../../verification-code'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

async function setError(wrapper: any) {
  wrapper.vm.setFields({ value: { message: 'Invalid value' } })
  await nextTick()
  return wrapper.get('[role=alert]').element.closest('[id]').id as string
}

test('verification code describes the group without repeating the error on every digit', async () => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Code' }, () =>
          h(VerificationCode, { editMode: 'direct', 'aria-describedby': 'external' }),
        ),
    },
  })
  try {
    const errorId = await setError(wrapper)
    const group = wrapper.get('[role=group]')
    expect(group.attributes('aria-describedby')?.split(/\s+/)).toEqual(['external', errorId])
    expect(wrapper.findAll('input').length).toBeGreaterThan(1)
    for (const input of wrapper.findAll('input')) {
      expect(input.attributes('aria-describedby')?.split(/\s+/) ?? []).not.toContain(errorId)
    }
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(group.attributes('aria-describedby')).toBe('external')
  } finally {
    wrapper.unmount()
  }
})

test.each([false, true])('upload describes its trigger (custom=%s)', async (custom) => {
  const wrapper = mount(Form, {
    attachTo: document.body,
    props: { editMode: 'direct', model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'File' }, () =>
          h(
            Upload,
            { editMode: 'direct', 'aria-describedby': 'external' },
            custom
              ? {
                  trigger: ({ describedBy }: { describedBy: string | undefined }) =>
                    h('button', { type: 'button', 'aria-describedby': describedBy }, 'Choose'),
                }
              : {},
          ),
        ),
    },
  })
  try {
    const errorId = await setError(wrapper)
    await nextTick()
    const trigger = wrapper.get(custom ? '[role=group]' : '[role=button]')
    expect(trigger.attributes('aria-describedby')?.split(/\s+/)).toEqual(['external', errorId])
    if (custom) {
      expect(trigger.get('button').attributes('aria-describedby')?.split(/\s+/)).toEqual(['external', errorId])
    }
    ;(wrapper.vm as any).clearValidate()
    await nextTick()
    expect(trigger.attributes('aria-describedby')).toBe('external')
    if (custom) {
      expect(trigger.get('button').attributes('aria-describedby')).toBe('external')
    }
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['search', Search, { inputAttrs: { 'aria-describedby': 'external' } }],
  ['people select', PeopleSelect, { options: [{ label: 'A', value: 'a' }], 'aria-describedby': 'external' }],
] as const)('%s reuses error description on its editable input', async (_name, component, extra) => {
  const wrapper = mount(Form, {
    props: { editMode: 'direct', model: { value: '' } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () => h(component as any, { ...extra, editMode: 'direct' })),
    },
  })
  try {
    const errorId = await setError(wrapper)
    const input = wrapper.get('input')
    expect(input.attributes('aria-describedby')?.split(/\s+/)).toEqual(['external', errorId])
  } finally {
    wrapper.unmount()
  }
})
