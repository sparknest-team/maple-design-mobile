import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Select from '../select'

test('selected object labels update when options change without changing their count', async () => {
  const value = { id: 1 }
  const wrapper = mount(Select, {
    props: { modelValue: value, fieldNames: { value: 'id' }, options: [{ id: value, label: 'old' }] },
  })
  try {
    await nextTick()
    expect(wrapper.text()).toContain('old')
    await wrapper.setProps({ options: [{ id: { id: 1 }, label: 'edited' }] })
    expect(wrapper.text()).toContain('edited')
    await wrapper.setProps({ options: [{ id: { id: 1 }, label: 'replaced' }] })
    expect(wrapper.text()).toContain('replaced')
    expect(wrapper.emitted('change')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
