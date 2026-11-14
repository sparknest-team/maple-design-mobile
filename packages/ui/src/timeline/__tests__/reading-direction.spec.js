import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Timeline, { TimelineItem } from '..'

test('reading direction and reverse are independent; explicit vertical side stays physical', async () => {
  const host = document.createElement('div')
  host.dir = 'rtl'
  document.body.append(host)
  const wrapper = mount(Timeline, {
    attachTo: host,
    props: { mode: 'left' },
    slots: { default: () => [1, 2, 3].map((i) => h(TimelineItem, { label: String(i) }, () => `Event ${i}`)) },
  })
  try {
    const items = () => wrapper.findAll('.mp-timeline-item')
    expect(items().every((item) => item.classes().includes('mp-timeline-item-vertical-left'))).toBe(true)
    host.dir = 'ltr'
    await nextTick()
    expect(items().map((item) => item.text())).toEqual(['Event 11', 'Event 22', 'Event 33'])
    expect(wrapper.emitted()).toEqual({})
    await wrapper.setProps({ reverse: true, orientation: 'horizontal' })
    await nextTick()
    expect(wrapper.classes()).toContain('mp-timeline-is-reverse')
    expect(items()[0].classes()).toContain('mp-timeline-item-last')
    expect(items()[2].classes()).not.toContain('mp-timeline-item-last')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
