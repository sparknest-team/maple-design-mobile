import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Table from '..'
import Demo from '../example/demos/sort-pagination.vue'
import '../../pagination/Pagination.vue'

test('Cedar salary demo sorts the full dataset before moving to the next page', async () => {
  const wrapper = mount(Demo, { global: { components: { MpTable: Table } } })
  try {
    await wrapper.findAll('th [role="button"]')[1].trigger('click')
    expect(wrapper.get('tbody tr').text()).toContain('Ed Hellen')
    await vi.waitFor(() => expect(wrapper.find('button[aria-label="下一页"]').exists()).toBe(true))
    await wrapper.get('button[aria-label="下一页"]').trigger('click')
    expect(wrapper.get('tbody tr').text()).toContain('Jane Doe')
  } finally {
    wrapper.unmount()
  }
})
