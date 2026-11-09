import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Breadcrumb from '..'

test('collapse preserves first and current and reports integer omitted ranges', async () => {
  const routes = ['Home', 'One', 'Two', 'Three', 'Current'].map((label, i) => ({ label, path: `#${i}` }))
  const wrapper = mount(Breadcrumb, {
    props: { routes, maxCount: 1 },
    slots: {
      'more-icon': (data: any) =>
        h(
          'span',
          {
            'data-count': data.count,
            'data-start': data.start,
            'data-end': data.end,
            'data-length': data.omittedItems.length,
          },
          'more',
        ),
    },
  })
  try {
    expect(wrapper.get('[aria-current=page]').text()).toBe('Current')
    expect(wrapper.text()).toContain('Home')
    const more = () => wrapper.get('[data-count]')
    expect(more().attributes()).toMatchObject({
      'data-count': '3',
      'data-start': '1',
      'data-end': '3',
      'data-length': '3',
    })
    await wrapper.setProps({ maxCount: 2.5 })
    expect(more().attributes('data-count')).toBe('3')
    expect(more().attributes('data-length')).toBe('3')
    await wrapper.setProps({ maxCount: 0 })
    expect(wrapper.find('[data-count]').exists()).toBe(false)
    expect(wrapper.get('[aria-current=page]').text()).toBe('Current')
  } finally {
    wrapper.unmount()
  }
})
