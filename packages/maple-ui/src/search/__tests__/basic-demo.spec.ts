import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Search from '..'
import Demo from '../example/demos/basic.vue'

test('the introductory Search demo has one field and submits its keyword', async () => {
  const wrapper = mount(Demo, { global: { components: { MpSearch: Search } } })
  try {
    expect(wrapper.findAllComponents(Search)).toHaveLength(1)
    const input = wrapper.get('input')
    await input.setValue('Project Alpha')
    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(wrapper.get('[role="status"]').text()).toContain('Project Alpha')
  } finally {
    wrapper.unmount()
  }
})
