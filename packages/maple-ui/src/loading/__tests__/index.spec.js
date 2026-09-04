import { createApp, defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Loading, { vLoading } from '..'
import VarLoading from '../Loading'

test('loading use', () => {
  const app = createApp({}).use(Loading)
  expect(app.component(Loading.name)).toBeTruthy()
  expect(app.directive('mp-loading')).toBe(vLoading)
  expect(app.directive('loading')).toBeUndefined()
})

test('v-mp-loading renders the built-in loading component without changing content layout', async () => {
  const Host = defineComponent({
    directives: { 'mp-loading': vLoading },
    data: () => ({ active: true }),
    template: '<div v-mp-loading="active"><span>content</span></div>',
  })
  const wrapper = mount(Host)

  expect(wrapper.find('.mp-loading-directive .mp-loading').exists()).toBe(true)
  expect(wrapper.find('.mp-loading-directive .mp-loading__content--active').exists()).toBe(true)
  expect(wrapper.find('.mp-loading-directive .mp-loading__content-mask').exists()).toBe(true)
  expect(wrapper.find('.mp-loading-directive .mp-loading__inside').exists()).toBe(true)
  expect(wrapper.find('.mp-loading-directive').element.firstElementChild).toBe(wrapper.find('.mp-loading').element)
  expect(wrapper.find('.mp-loading-directive').element.parentElement).toBe(wrapper.element)

  await wrapper.setData({ active: false })
  await nextTick()
  expect(wrapper.find('.mp-loading-directive').exists()).toBe(false)
})

test('v-mp-loading supports an options object with loading and tip', async () => {
  const Host = defineComponent({
    directives: { 'mp-loading': vLoading },
    data: () => ({ options: { loading: true, tip: 'Loading...', type: 'wave' } }),
    template: '<div v-mp-loading="options"><span>content</span></div>',
  })
  const wrapper = mount(Host)

  expect(wrapper.find('.mp-loading__tip').text()).toBe('Loading...')
  expect(wrapper.find('.mp-loading__wave').exists()).toBe(true)

  await wrapper.setData({ options: { loading: false, tip: 'Loading...', type: 'wave' } })
  await nextTick()
  expect(wrapper.find('.mp-loading-directive').exists()).toBe(false)
})

describe('test loading component props', () => {
  test('loading color', () => {
    const wrapper = mount(VarLoading, {
      props: { color: 'red' },
    })

    expect(wrapper.find('.mp-loading__circle-block').attributes('style')).toContain('color: red;')
    wrapper.unmount()
  })

  test('loading type', () => {
    ;['circle', 'wave', 'cube', 'rect', 'disappear'].forEach((type) => {
      const wrapper = mount(VarLoading, {
        props: { type },
      })

      expect(wrapper.find('.mp-loading__' + type).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('loading size', () => {
    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
      const wrapper = mount(VarLoading, {
        props: { size },
      })

      expect(wrapper.find('.mp-loading__circle-block').classes()).toContain(`mp-loading__circle-block--${size}`)
      wrapper.unmount()
    })
  })

  test('loading numeric size', () => {
    const wrapper = mount(VarLoading, { props: { size: 20 } })
    expect(wrapper.find('.mp-loading__circle-block').attributes('style')).toContain('width: 20px; height: 20px;')
    wrapper.unmount()
  })

  test('loading tip', () => {
    const wrapper = mount(VarLoading, {
      props: {
        tip: 'This is tip',
      },
    })

    expect(wrapper.find('.mp-loading__tip').element.textContent).toBe('This is tip')
    wrapper.unmount()
  })

  test('loading loading', async () => {
    const wrapper = mount(VarLoading, {
      props: { loading: true },
      slots: {
        default: () => 'This is default slots',
      },
    })

    expect(wrapper.find('.mp-loading__content-mask').exists()).toBe(true)
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.mp-loading__content-mask').exists()).toBe(false)
    wrapper.unmount()
  })

  test('loading radius', () => {
    ;['circle', 'wave', 'cube', 'rect', 'disappear'].forEach(async (type) => {
      const wrapper = mount(VarLoading, {
        props: {
          radius: '20px',
          type,
        },
      })

      type === 'circle'
        ? expect(wrapper.find('.mp-loading__circle-block').attributes('style')).toContain('width: 40px; height: 40px;')
        : expect(wrapper.find('.mp-loading__circle-block').exists()).toBe(false)
      await wrapper.setProps({ radius: 30 })
      type === 'circle'
        ? expect(wrapper.find('.mp-loading__circle-block').attributes('style')).toContain('width: 60px; height: 60px;')
        : expect(wrapper.find('.mp-loading__circle-block').exists()).toBe(false)
      wrapper.unmount()
    })
  })
})

describe('test loading component slots', () => {
  test('loading default slots', () => {
    const wrapper = mount(VarLoading, {
      slots: {
        default: () => 'This is default slots',
      },
    })

    expect(wrapper.find('.mp-loading__content').element.textContent).toBe('This is default slots')
    wrapper.unmount()
  })

  test('loading tip slots', () => {
    const wrapper = mount(VarLoading, {
      slots: {
        tip: () => 'This is tip slots',
      },
    })

    expect(wrapper.find('.mp-loading__tip').element.textContent).toBe('This is tip slots')
    wrapper.unmount()
  })
})
