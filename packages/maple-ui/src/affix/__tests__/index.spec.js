import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Affix from '..'
import { delay, trigger } from '../../utils/test'
import VarAffix from '../Affix'

const mockRect = (top) => {
  const origin = HTMLElement.prototype.getBoundingClientRect
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({ top, left: 0 }),
  })

  return {
    restore() {
      Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
        configurable: true,
        value: origin,
      })
    },
  }
}

test('affix use', () => {
  const app = createApp({}).use(Affix)
  expect(app.component(Affix.name)).toBeTruthy()
})

describe('test affix component props', () => {
  let rect = mockRect(200)

  test('affix offset-top', async () => {
    const wrapper = mount(VarAffix, {
      props: {
        offsetTop: 100,
      },
    })
    await delay(60)
    expect(wrapper.find('.mp-affix__wrapper').attributes('style')).not.toContain('top: 100px;')
    rect.restore()

    rect = mockRect(99)
    await trigger(window, 'scroll')
    expect(wrapper.find('.mp-affix__wrapper').attributes('style')).toContain('top: 100px;')
    wrapper.unmount()
    rect.restore()
  })

  test('affix z-index', async () => {
    const wrapper = mount(VarAffix, {
      props: {
        zIndex: 200,
      },
    })
    await delay(60)

    expect(wrapper.find('.mp-affix').attributes('style')).toContain('z-index: 200;')
    expect(wrapper.find('.mp-affix__wrapper').attributes('style')).toContain('z-index: 200;')
    await wrapper.setProps({ zIndex: '100' })
    expect(wrapper.find('.mp-affix').attributes('style')).toContain('z-index: 100;')
    expect(wrapper.find('.mp-affix__wrapper').attributes('style')).toContain('z-index: 100;')
    wrapper.unmount()
  })

  test('affix css-mode', async () => {
    const wrapper = mount(VarAffix, {
      props: {
        cssMode: true,
      },
    })
    await delay(60)

    expect(wrapper.find('.mp-affix--css-mode').exists()).toBe(true)
    await wrapper.setProps({ cssMode: false })
    expect(wrapper.find('.mp-affix--css-mode').exists()).toBe(false)
    wrapper.unmount()
  })

  test('affix disabled', async () => {
    let rect = mockRect(200)

    const wrapper = mount(VarAffix, {
      props: {
        offsetTop: 100,
        disabled: false,
      },
    })
    await delay(60)

    expect(wrapper.find('.mp-affix__wrapper').attributes('style')).not.toContain('top: 100px;')
    rect.restore()
    rect = mockRect(99)
    await trigger(window, 'scroll')
    expect(wrapper.find('.mp-affix__wrapper').attributes('style')).toContain('top: 100px;')
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.mp-affix__wrapper').attributes('style')).not.toContain('top: 100px;')
    wrapper.unmount()
    rect.restore()
  })
})
