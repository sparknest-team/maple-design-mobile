import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Pagination from '..'

test('auto adjust reacts to later boundary changes, not initial defaults', async () => {
  const wrapper = mount(Pagination, { props: { total: 50, defaultValue: 99, simple: true, responsive: false } })
  try {
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('99')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ total: 40 })
    expect(wrapper.emitted('update:modelValue')).toEqual([[4]])
  } finally {
    wrapper.unmount()
  }
})

test('controlled parents may reject later adjustment requests', async () => {
  const wrapper = mount(Pagination, { props: { total: 50, modelValue: 99, simple: true, responsive: false } })
  try {
    await wrapper.setProps({ total: 40 })
    expect(wrapper.emitted('update:modelValue')).toEqual([[4]])
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('99')
  } finally {
    wrapper.unmount()
  }
})
