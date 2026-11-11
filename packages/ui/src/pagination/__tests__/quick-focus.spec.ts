import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Pagination from '..'

test('removed focused quick jump restores focus to accepted current page', async () => {
  const wrapper = mount(Pagination, {
    attachTo: document.body,
    props: { total: 1000, defaultValue: 95, responsive: false },
  })
  try {
    const button = wrapper.findAll('.mp-pagination__item-ellipsis').at(-1)!
    ;(button.element as HTMLElement).focus()
    await button.trigger('click')
    await nextTick()
    await nextTick()
    const current = wrapper.get('[aria-current=page]')
    expect(current.text()).toBe('100')
    expect(document.activeElement).toBe(current.element)
  } finally {
    wrapper.unmount()
  }
})
