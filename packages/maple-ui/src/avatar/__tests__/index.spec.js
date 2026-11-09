import { Fragment, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { Avatar, AvatarGroup, avatarGroupProps, avatarProps } from '../index'
import { avatarTriggerTypes } from '../props'

const avatarPropNames = [
  'shape',
  'imageUrl',
  'alt',
  'size',
  'autoFixFontSize',
  'triggerType',
  'triggerAriaLabel',
  'triggerIconStyle',
  'objectFit',
  'color',
  'bordered',
  'borderColor',
  'loading',
  'error',
  'lazy',
  'hoverable',
]

const avatarGroupPropNames = [
  'shape',
  'size',
  'autoFixFontSize',
  'maxCount',
  'zIndexAscend',
  'maxStyle',
  'maxPopoverProps',
  'offset',
  'vertical',
]

describe('Avatar', () => {
  test('keeps the shared Avatar contract', () => {
    expect(Object.keys(avatarProps)).toEqual(avatarPropNames)
    expect(Object.keys(avatarGroupProps)).toEqual(avatarGroupPropNames)
  })

  test('renders text, shape and numeric size', async () => {
    const wrapper = mount(Avatar, {
      props: { shape: 'square', size: 48 },
      slots: { default: 'Maple' },
    })

    expect(wrapper.classes()).toContain('mp-avatar--square')
    expect(wrapper.attributes('style')).toContain('width: 48px')
    expect(wrapper.text()).toContain('Maple')
  })

  test('renders an accessible image and emits image events', async () => {
    const onLoad = vi.fn()
    const onError = vi.fn()
    const wrapper = mount(Avatar, {
      props: { imageUrl: '/avatar.png', alt: 'Ada Lovelace', onLoad, onError },
    })

    expect(wrapper.get('img').attributes()).toMatchObject({
      src: '/avatar.png',
      alt: 'Ada Lovelace',
    })
    await wrapper.get('img').trigger('load')
    await wrapper.get('img').trigger('error')
    expect(onLoad).toHaveBeenCalledOnce()
    expect(onError).toHaveBeenCalledOnce()
  })

  test('emits click', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Avatar, { props: { onClick } })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledOnce()
  })

  test('renders trigger icon variants', () => {
    expect(avatarTriggerTypes).toEqual(['button', 'overlay'])
    const wrapper = mount(Avatar, {
      props: { triggerType: 'overlay' },
      slots: { 'trigger-icon': 'edit' },
    })
    expect(wrapper.find('.mp-avatar__trigger-icon-overlay').exists()).toBe(true)
    expect(wrapper.classes()).toContain('mp-avatar--with-trigger')
  })

  test('applies color, bordered, css size and lazy', () => {
    const wrapper = mount(Avatar, {
      props: {
        color: '#00bebe',
        bordered: true,
        borderColor: '#111',
        imageUrl: '/avatar.png',
        lazy: true,
        hoverable: true,
        size: '3rem',
      },
    })

    expect(wrapper.classes()).toContain('mp-avatar--bordered')
    expect(wrapper.classes()).toContain('mp-avatar--hoverable')
    expect(wrapper.attributes('style')).toContain('background-color')
    expect(wrapper.attributes('style')).toContain('border-color')
    expect(wrapper.attributes('style')).toContain('width: 3rem')
    expect(wrapper.get('img').attributes('loading')).toBe('lazy')
  })
})

describe('AvatarGroup', () => {
  const avatars = () => h(Fragment, [h(Avatar), h(Avatar), h(Avatar), h(Avatar)])

  test('renders children and applies group size', () => {
    const wrapper = mount(AvatarGroup, {
      props: { size: 48 },
      slots: { default: avatars },
    })
    expect(wrapper.findAll('.mp-avatar')).toHaveLength(4)
    expect(wrapper.find('.mp-avatar').attributes('style')).toContain('width: 48px')
  })

  test('collapses avatars over maxCount', () => {
    const wrapper = mount(AvatarGroup, {
      props: { maxCount: 2 },
      slots: { default: avatars },
      global: { stubs: { MpPopover: { template: '<div class="mp-popover"><slot /></div>' } } },
    })
    expect(wrapper.text()).toContain('+2')
    expect(wrapper.findAll('.mp-avatar')).toHaveLength(3)
  })

  test('stacks vertically and applies offset', () => {
    const wrapper = mount(AvatarGroup, {
      props: { vertical: true, offset: -12 },
      slots: { default: avatars },
    })
    expect(wrapper.classes()).toContain('mp-avatar-group--vertical')
    expect(wrapper.attributes('style')).toContain('--mp-avatar-group-offset: -12px')
  })
})
