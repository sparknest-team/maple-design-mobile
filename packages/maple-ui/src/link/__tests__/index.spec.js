import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Link from '..'
import { trigger } from '../../utils/test'
import VarLink from '../Link'

const HREF = 'https://maplejs.org/'

const TARGET = '_blank'

test('link plugin', () => {
  const app = createApp({}).use(Link)
  expect(app.component(Link.name)).toBeTruthy()
})

describe('test link component props', () => {
  test('link status', () => {
    ;['default', 'primary', 'info', 'success', 'warning', 'danger'].forEach((status) => {
      const wrapper = mount(VarLink, {
        props: { status },
      })

      expect(wrapper.find('a').classes()).toContain('mp-link--' + status)
      wrapper.unmount()
    })
  })

  test('link rel', () => {
    const wrapper = mount(VarLink, {
      props: {
        href: HREF,
        target: TARGET,
        rel: 'noopener noreferrer',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })

  test('link href target', () => {
    const wrapper = mount(VarLink, {
      props: {
        href: HREF,
        target: TARGET,
      },
    })

    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.attributes('href')).toMatch(HREF)
    expect(wrapper.attributes('target')).toMatch(TARGET)
    expect(wrapper.attributes('href')).toBe(HREF)
    wrapper.unmount()
  })

  test('link underline', () => {
    ;['always', 'hover', 'none'].forEach((underline) => {
      const wrapper = mount(VarLink, {
        props: { underline },
      })

      if (underline !== 'none') {
        expect(wrapper.find('a').classes()).toContain('mp-link--underline-' + underline)
      } else {
        expect(wrapper.find('a').classes()).not.toContain(/underline/)
      }

      wrapper.unmount()
    })
  })

  test('link disabled', async () => {
    const onClick = vi.fn()

    const wrapper = mount(VarLink, {
      props: {
        disabled: true,
        onClick,
      },
    })

    await trigger(wrapper, 'click')
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.classes()).toContain('mp-link--disabled')
    expect(onClick).toHaveBeenCalledTimes(0)
    wrapper.unmount()
  })

  test('link loading semantics', async () => {
    const onClick = vi.fn()
    const wrapper = mount(VarLink, {
      props: {
        href: HREF,
        loading: true,
        onClick,
      },
    })

    expect(wrapper.attributes()).toMatchObject({
      'aria-disabled': 'true',
      'aria-busy': 'true',
      tabindex: '-1',
    })
    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.find('svg').attributes('fill')).toBe('none')
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  test('link icon slot', () => {
    const wrapper = mount(VarLink, {
      slots: {
        icon: '<span class="custom-icon" />',
      },
    })

    expect(wrapper.find('.custom-icon').exists()).toBe(true)

    wrapper.unmount()
  })
})

describe('test link component events', () => {
  test('link onClick', async () => {
    const onClick = vi.fn()

    const wrapper = mount(VarLink, {
      props: {
        onClick,
      },
    })

    await trigger(wrapper, 'click')
    expect(onClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})

describe('test link component slots', () => {
  test('link default slot', () => {
    const wrapper = mount(VarLink, {
      slots: {
        default: () => 'test',
      },
    })

    expect(wrapper.find('.mp-link').element.textContent).toBe('test')
    wrapper.unmount()
  })
})
