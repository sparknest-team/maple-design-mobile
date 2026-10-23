import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Table from '..'
import Pagination from '../../pagination'
import FixedDemo from '../example/demos/fixed-header.vue'
import FooterDemo from '../example/demos/slot.vue'

test.each([FooterDemo, FixedDemo])('table Demo keeps pagination model and local rows synchronized', async (Demo) => {
  const wrapper = mount(Demo, { global: { components: { MpTable: Table, MpPagination: Pagination } } })
  try {
    const rows = () => wrapper.findAll('tbody tr')
    expect(rows()).toHaveLength(10)
    for (const page of [2, 3]) {
      await wrapper.get('button[aria-label="下一页"]').trigger('click')
      await flushPromises()
      expect(wrapper.findComponent(Pagination).props('current')).toBe(page)
      expect(rows()).toHaveLength(10)
      expect(rows()[0].text()).toContain(`Name ${(page - 1) * 10 + 1}`)
    }
    wrapper.findComponent(Pagination).vm.$emit('update:current', 5)
    wrapper.findComponent(Pagination).vm.$emit('update:pageSize', 5)
    await flushPromises()
    expect(rows()).toHaveLength(5)
    expect(rows()[0].text()).toContain('Name 21')
    expect(rows()[4].text()).toContain('Name 25')
  } finally {
    wrapper.unmount()
  }
})
