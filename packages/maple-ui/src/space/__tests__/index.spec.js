import { createApp, Fragment, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Space from '..'
import VarSpace from '../Space'

test('space use', () => {
  const app = createApp({}).use(Space)
  expect(app.component(Space.name)).toBeTruthy()
})

describe('test space component props', () => {
  test('space align', () => {
    ;['stretch', 'center', 'flex-start', 'flex-end', 'baseline'].forEach((align) => {
      const wrapper = mount(VarSpace, {
        props: { align },
      })

      expect(wrapper.find('.mp-space').attributes('style')).toContain('align-items: ' + align)
      wrapper.unmount()
    })
  })

  test('space justify', () => {
    ;['flex-start', 'flex-end', 'center', 'space-around', 'space-between', 'space-evenly'].forEach((justify) => {
      const wrapper = mount(VarSpace, {
        props: { justify },
        slots: {
          default: () => h(Fragment, [h('div', 'child'), h('div', 'child'), h('div', 'child')]),
        },
      })

      expect(wrapper.find('.mp-space').attributes('style')).toContain('justify-content: ' + justify)
      wrapper.unmount()
    })
  })

  test('space wrap', async () => {
    const wrapper = mount(VarSpace, {
      props: {
        wrap: true,
      },
    })

    expect(wrapper.find('.mp-space').attributes('style')).toContain('flex-wrap: wrap;')
    await wrapper.setProps({ wrap: false })
    expect(wrapper.find('.mp-space').attributes('style')).toContain('flex-wrap: nowrap;')
    wrapper.unmount()
  })

  test('space direction', async () => {
    const wrapper = mount(VarSpace, {
      props: {
        direction: 'row',
      },
    })

    expect(wrapper.find('.mp-space').attributes('style')).toContain('flex-direction: row;')
    await wrapper.setProps({ direction: 'column' })
    expect(wrapper.find('.mp-space').attributes('style')).toContain('flex-direction: column;')
    wrapper.unmount()
  })

  test('space block', async () => {
    const wrapper = mount(VarSpace, {
      props: { block: true },
    })

    expect(wrapper.find('.mp-space--block').exists()).toBe(true)
    await wrapper.setProps({ block: false })
    expect(wrapper.find('.mp-space--block').exists()).toBe(false)
    wrapper.unmount()
  })

  test('space split slot', () => {
    const wrapper = mount(VarSpace, {
      slots: {
        default: () => [h('div', 'a'), h('div', 'b'), h('div', 'c')],
        split: () => h('span', { class: 'sp' }, '|'),
      },
    })
    // 3 children -> 2 splits
    expect(wrapper.findAll('.mp-space__item').length).toBe(3)
    expect(wrapper.findAll('.mp-space__item-split').length).toBe(2)
    expect(wrapper.findAll('.sp').length).toBe(2)
    wrapper.unmount()
  })

  test('space gap with internal size', () => {
    const wrapper = mount(VarSpace, { props: { size: 'md' } })
    expect(wrapper.find('.mp-space').attributes('style')).toContain('gap: var(--mp-space-size-md-row-gap) var(--mp-space-size-md-column-gap)')
    wrapper.unmount()
  })

  test('space gap with array size', () => {
    const wrapper = mount(VarSpace, { props: { size: [10, 20] } })
    expect(wrapper.find('.mp-space').attributes('style')).toContain('gap: 10px 20px')
    wrapper.unmount()
  })
})

test('space default slots', () => {
  const wrapper = mount(VarSpace, {
    slots: {
      default: 'This is default slots',
    },
  })

  expect(wrapper.find('.mp-space').html()).toContain('This is default slots')
  wrapper.unmount()
})
