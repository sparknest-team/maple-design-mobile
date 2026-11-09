import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Pagination from '..'

test('switching layouts preserves a focused draft without committing', async () => {
  const wrapper = mount(Pagination, {
    attachTo: document.body,
    props: { total: 100, defaultValue: 3, showJumper: true, responsive: false },
  })
  try {
    let input = wrapper.get('input')
    await input.setValue('7')
    ;(input.element as HTMLInputElement).focus()
    await wrapper.setProps({ simple: true })
    await nextTick()
    await nextTick()
    input = wrapper.get('input')
    expect((input.element as HTMLInputElement).value).toBe('7')
    expect(document.activeElement).toBe(input.element)
    expect(wrapper.emitted('change')).toBeUndefined()
    await input.trigger('blur')
    expect(wrapper.emitted('change')).toEqual([[7]])
  } finally {
    wrapper.unmount()
  }
})
