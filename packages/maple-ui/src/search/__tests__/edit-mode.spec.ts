import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import HistoryPresentation from '../history-presentation.vue'
import Search from '../Search.vue'

it('uses only direct and popup edit modes', async () => {
  const wrapper = mount(Search, { props: { editMode: 'direct', recentSearches: ['Saved'] } })
  try {
    expect(Search.props).not.toHaveProperty('presentation')
    expect(wrapper.props('editMode')).toBe('direct')
    expect(wrapper.findComponent(HistoryPresentation).exists()).toBe(false)
    await wrapper.setProps({ editMode: 'popup' })
    await wrapper.find('input').trigger('focus')
    await flushPromises()
    expect(wrapper.getComponent(HistoryPresentation).props('open')).toBe(true)
    await wrapper.setProps({ editMode: 'direct' })
    await flushPromises()
    expect(wrapper.findComponent(HistoryPresentation).exists()).toBe(false)
  } finally {
    wrapper.unmount()
  }
})
