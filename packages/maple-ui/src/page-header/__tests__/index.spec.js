import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import PageHeader from '..'
import MpPageHeader from '../PageHeader'

test('page header install', () => {
  const app = createApp({}).use(PageHeader)
  expect(PageHeader.name).toBe('MpPageHeader')
  expect(app.component(PageHeader.name)).toBeTruthy()
})

describe('page header', () => {
  test('renders title, subtitle and extra props', () => {
    const wrapper = mount(MpPageHeader, {
      props: { title: 'Title', subtitle: 'Subtitle', extra: 'Extra' },
    })

    expect(wrapper.find('.mp-page-header__title').text()).toBe('Title')
    expect(wrapper.find('.mp-page-header__subtitle').text()).toBe('Subtitle')
    expect(wrapper.find('.mp-page-header__extra').text()).toBe('Extra')
  })

  test('shows back only when a listener is provided', async () => {
    const onBack = vi.fn()
    const wrapper = mount(MpPageHeader, { props: { title: 'Title' } })

    expect(wrapper.find('.mp-page-header__back').exists()).toBe(false)
    await wrapper.setProps({ onBack })
    await wrapper.find('.mp-page-header__back').trigger('click')
    expect(onBack).toHaveBeenCalledOnce()
  })

  test('supports a custom back slot', () => {
    const wrapper = mount(MpPageHeader, {
      props: { onBack: () => undefined },
      slots: { back: () => 'Custom back' },
    })

    expect(wrapper.find('.mp-page-header__back').text()).toBe('Custom back')
  })

  test('renders all content slots', () => {
    const wrapper = mount(MpPageHeader, {
      slots: {
        header: () => 'Header',
        avatar: () => 'Avatar',
        title: () => 'Title',
        subtitle: () => 'Subtitle',
        extra: () => 'Extra',
        default: () => 'Content',
        footer: () => 'Footer',
      },
    })

    expect(wrapper.find('.mp-page-header__header').text()).toBe('Header')
    expect(wrapper.find('.mp-page-header__avatar').text()).toBe('Avatar')
    expect(wrapper.find('.mp-page-header__title').text()).toBe('Title')
    expect(wrapper.find('.mp-page-header__subtitle').text()).toBe('Subtitle')
    expect(wrapper.find('.mp-page-header__extra').text()).toBe('Extra')
    expect(wrapper.find('.mp-page-header__content').text()).toBe('Content')
    expect(wrapper.find('.mp-page-header__footer').text()).toBe('Footer')
  })

  test('forwards attributes to the wrapper', () => {
    const wrapper = mount(MpPageHeader, { attrs: { class: 'custom', 'aria-label': 'Page summary' } })

    expect(wrapper.find('.mp-page-header__wrapper').classes()).toContain('custom')
    expect(wrapper.find('.mp-page-header__wrapper').attributes('aria-label')).toBe('Page summary')
  })
})
