import { Comment, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Space from '..'

describe('space reading direction', () => {
  it.each(['row', 'column'] as const)('preserves keyed children and gaps in %s layout', async (direction) => {
    const wrapper = mount(Space, {
      props: { direction, size: [8, 20], wrap: true },
      attrs: { dir: 'ltr' },
      slots: {
        default: () => [h('button', { key: 'a' }, 'A'), h(Comment), h('button', { key: 'b' }, 'B')],
        split: () => h('span', '|'),
      },
    })
    const buttons = wrapper.findAll('button').map((button) => button.element)
    wrapper.element.setAttribute('dir', 'rtl')
    await nextTick()
    expect(wrapper.findAll('button').map((button) => button.element)).toEqual(buttons)
    expect(wrapper.element.style.gap).toBe('8px 20px')
    expect(wrapper.element.style.flexDirection).toBe(direction)
    expect(wrapper.findAll('.mp-space__item-split')).toHaveLength(1)
    wrapper.unmount()
  })
})
