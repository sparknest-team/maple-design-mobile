import { h, reactive } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import InputTag from '..'
import Form from '../../form/Form.vue'
import FormItem from '../../form/FormItem.vue'
import { formHost } from '../../input-number/__tests__/form-host'

test('form errors override and then restore explicit boolean aria-invalid', async () => {
  const owner = mount(Form, {
    props: { editMode: 'direct', model: { value: [] } },
    slots: {
      default: () =>
        h(FormItem, { field: 'value', label: 'Value' }, () =>
          h(InputTag, { editMode: 'direct', 'aria-invalid': false }),
        ),
    },
  })
  try {
    const input = owner.getComponent(InputTag).get('input')
    expect(input.attributes('aria-invalid')).toBe('false')
    ;(owner.vm as any).setFields({ value: { message: 'Invalid value' } })
    await flushPromises()
    expect(input.attributes('aria-invalid')).toBe('true')
    ;(owner.vm as any).clearValidate()
    await flushPromises()
    expect(input.attributes('aria-invalid')).toBe('false')
  } finally {
    owner.unmount()
  }
})

test('private uninject still excludes Form state and callbacks', async () => {
  const handlers = { onChange: vi.fn(), onClear: vi.fn() }
  const state = reactive({ disabled: true, readonly: true, error: true, size: 'xl' })
  const owner = mount(
    formHost(state, handlers, () =>
      h(InputTag, { editMode: 'direct', uninjectFormItemContext: true, clearable: true, defaultValue: ['a'] }),
    ),
  )
  try {
    const field = owner.getComponent(InputTag)
    expect(field.get('input').attributes('disabled')).toBeUndefined()
    expect(field.get('input').attributes('readonly')).toBeUndefined()
    expect(field.get('input').attributes('aria-invalid')).toBeUndefined()
    await field.get('button[class*=clear]').trigger('click')
    await flushPromises()
    expect(field.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([])
    expect(handlers.onChange).not.toHaveBeenCalled()
    expect(handlers.onClear).not.toHaveBeenCalled()
  } finally {
    owner.unmount()
  }
})
test('one field owner reports model change and clear once', async () => {
  const handlers = { onChange: vi.fn(), onClear: vi.fn() }
  const owner = mount(
    formHost(reactive({ disabled: false, readonly: false, error: false, size: 'md' }), handlers, () =>
      h(InputTag, { editMode: 'direct', clearable: true, defaultValue: ['a'] }),
    ),
  )
  try {
    await owner.getComponent(InputTag).get('button[class*=clear]').trigger('click')
    expect(handlers.onChange).toHaveBeenCalledTimes(1)
    expect(handlers.onClear).toHaveBeenCalledTimes(1)
  } finally {
    owner.unmount()
  }
})
