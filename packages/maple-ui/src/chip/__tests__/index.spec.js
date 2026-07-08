import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Chip from '..'
import VarChip from '../Chip'

test('chip plugin', () => {
  const app = createApp({}).use(Chip)
  expect(app.component(Chip.name)).toBeTruthy()
})

test('chip close', async () => {
  const onClose = vi.fn()
  const wrapper = mount(VarChip, {
    props: {
      onClose,
      closeable: true,
    },
  })

  const closeEl = wrapper.find('.mp-chip--close')

  expect(closeEl.exists()).toBe(true)
  await closeEl.trigger('click')
  expect(onClose).toHaveBeenCalledTimes(1)

  wrapper.unmount()
})

describe('test chip component props', () => {
  test('chip type', () => {
    ;['default', 'primary', 'info', 'success', 'warning', 'danger'].forEach((type) => {
      const wrapper = mount(VarChip, {
        props: { type },
      })

      expect(wrapper.find('.mp-chip--' + type).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('chip size', () => {
    ;['normal', 'mini', 'small', 'large'].forEach((size) => {
      const wrapper = mount(VarChip, {
        props: { size },
      })

      expect(wrapper.find('.mp-chip--' + size).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('chip plain', async () => {
    const wrapper = mount(VarChip, {
      props: {
        plain: true,
      },
    })

    expect(wrapper.find('.mp-chip__plain').exists()).toBe(true)
    await wrapper.setProps({ plain: false })
    expect(wrapper.find('.mp-chip__plain').exists()).toBe(false)
    wrapper.unmount()
  })

  test('chip elevation', async () => {
    const wrapper = mount(VarChip)

    expect(wrapper.find('.mp-elevation--1').exists()).toBe(false)

    await wrapper.setProps({
      elevation: true,
    })

    expect(wrapper.find('.mp-elevation--1').exists()).toBe(true)

    await wrapper.setProps({
      elevation: 3,
    })
    expect(wrapper.find('.mp-elevation--3').exists()).toBe(true)

    wrapper.unmount()
  })

  test('chip round', async () => {
    const wrapper = mount(VarChip, {
      props: {
        round: true,
      },
    })

    expect(wrapper.find('.mp-chip--round').exists()).toBe(true)
    await wrapper.setProps({ round: false })
    expect(wrapper.find('.mp-chip--round').exists()).toBe(false)
    wrapper.unmount()
  })

  test('chip block', async () => {
    const wrapper = mount(VarChip, {
      props: {
        block: true,
      },
    })

    expect(wrapper.find('.mp--flex').exists()).toBe(true)
    await wrapper.setProps({ block: false })
    expect(wrapper.find('.mp--inline-flex').exists()).toBe(true)
    wrapper.unmount()
  })

  test('chip closeable', async () => {
    const wrapper = mount(VarChip, {
      props: {
        closeable: true,
      },
    })

    expect(wrapper.find('.mp-chip--close').exists()).toBeTruthy()
    await wrapper.setProps({
      closeable: false,
    })
    expect(wrapper.find('.mp-chip--close').exists()).toBeFalsy()

    wrapper.unmount()
  })

  test('chip iconName', async () => {
    const wrapper = mount(VarChip, {
      props: {
        closeable: true,
      },
    })

    expect(wrapper.find('.mp-icon-close-circle').exists()).toBe(true)
    await wrapper.setProps({
      iconName: 'delete',
    })
    expect(wrapper.find('.mp-icon-delete').exists()).toBe(true)

    wrapper.unmount()
  })

  test('chip color', async () => {
    const wrapper = mount(VarChip, {
      props: {
        color: 'red',
      },
    })

    expect(wrapper.find('.mp-chip').attributes('style')).toContain('background: red;')
    await wrapper.setProps({
      color: 'green',
    })
    expect(wrapper.find('.mp-chip').attributes('style')).toContain('background: green;')

    wrapper.unmount()
  })

  test('chip text color', async () => {
    const wrapper = mount(VarChip, {
      props: {
        textColor: 'red',
      },
    })

    expect(wrapper.find('.mp-chip').attributes('style')).toContain('color: red;')
    await wrapper.setProps({
      textColor: 'green',
    })
    expect(wrapper.find('.mp-chip').attributes('style')).toContain('color: green;')

    wrapper.unmount()
  })
})

describe('test chip component slots', () => {
  test('chip default slots', () => {
    const wrapper = mount(VarChip, {
      slots: {
        default: () => 'This is default slots',
      },
    })

    expect(wrapper.find('.mp-chip__text-normal').element.textContent).toBe('This is default slots')
    wrapper.unmount()
  })

  test('chip left slots', () => {
    const wrapper = mount(VarChip, {
      slots: {
        left: () => 'This is left slots',
      },
    })

    expect(wrapper.find('.mp-chip').html()).toContain('This is left slots<span class="mp-chip__text-normal"></span>')
    wrapper.unmount()
  })

  test('chip right slots', () => {
    const wrapper = mount(VarChip, {
      slots: {
        right: () => 'This is right slots',
      },
    })

    expect(wrapper.find('.mp-chip').html()).toContain('<span class="mp-chip__text-normal"></span>This is right slots')
    wrapper.unmount()
  })
})
