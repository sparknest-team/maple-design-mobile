import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import List from '..'

test('virtual item slots preserve multiple list items', () => {
  const wrapper = mount(List, {
    props: { data: [{ id: 1 }], virtualListProps: { height: 100, itemKey: 'id' } },
    slots: {
      item: () => [h('div', { role: 'listitem' }, 'First'), h('div', { role: 'listitem' }, 'Second')],
    },
  })
  try {
    expect(wrapper.findAll('[role="listitem"]').map((item) => item.text())).toEqual(['First', 'Second'])
  } finally {
    wrapper.unmount()
  }
})
