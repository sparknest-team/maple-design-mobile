import { createApp, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Tag from '..'
import VarTag from '../Tag.vue'

test('tag plugin', () => {
  const app = createApp({}).use(Tag)
  expect(app.component(Tag.name)).toBeTruthy()
})

describe('test tag component props', () => {
  test('tag status', () => {
    ;['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'].forEach((status) => {
      const wrapper = mount(VarTag, {
        props: { status },
      })

      expect(wrapper.find('.mp-tag--status-' + status).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('tag size', () => {
    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
      const wrapper = mount(VarTag, {
        props: { size },
      })

      expect(wrapper.find('.mp-tag--size-' + size).exists()).toBe(true)
      wrapper.unmount()
    })
  })

  test('tag variant outline', () => {
    const wrapper = mount(VarTag, { props: { variant: 'outline' } })
    expect(wrapper.find('.mp-tag--variant-outline').exists()).toBe(true)
    wrapper.unmount()
  })

  test('tag round', () => {
    const wrapper = mount(VarTag, { props: { round: true } })
    expect(wrapper.find('.mp-tag--round').exists()).toBe(true)
    wrapper.unmount()
  })

  test('tag closable', async () => {
    const onClose = vi.fn()
    const wrapper = mount(VarTag, {
      props: { closable: true, onClose },
    })
    const closeEl = wrapper.find('.mp-tag__close-btn')
    expect(closeEl.exists()).toBe(true)
    await closeEl.trigger('click')
    expect(onClose).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  test('tag show v-model', async () => {
    const wrapper = mount(VarTag, {
      props: {
        show: true,
        closable: true,
        'onUpdate:show': (val) => wrapper.setProps({ show: val }),
      },
    })
    expect(wrapper.find('.mp-tag').exists()).toBe(true)
    await wrapper.find('.mp-tag__close-btn').trigger('click')
    await nextTick()
    expect(wrapper.props('show')).toBe(false)
    wrapper.unmount()
  })

  test('tag checkable', async () => {
    const onCheck = vi.fn()
    const wrapper = mount(VarTag, {
      props: { checkable: true, defaultChecked: false, onCheck },
    })
    expect(wrapper.find('.mp-tag--checkable').exists()).toBe(true)
    await wrapper.find('.mp-tag').trigger('click')
    expect(onCheck).toHaveBeenCalledWith(true, expect.anything())
    expect(wrapper.find('.mp-tag--checked').exists()).toBe(true)
    wrapper.unmount()
  })

  test('tag loading', () => {
    const wrapper = mount(VarTag, { props: { loading: true, closable: true } })
    expect(wrapper.find('.mp-tag--loading').exists()).toBe(true)
    expect(wrapper.find('.mp-tag__loading-icon').exists()).toBe(true)
    expect(wrapper.find('.mp-tag__close-btn').exists()).toBe(false)
    wrapper.unmount()
  })

  test('supports keyboard interaction when checkable', async () => {
    const wrapper = mount(VarTag, {
      props: { checkable: true, defaultChecked: false },
    })

    const tag = wrapper.find('.mp-tag')
    expect(tag.attributes()).toMatchObject({ role: 'checkbox', 'aria-checked': 'false', tabindex: '0' })
    await tag.trigger('keydown', { key: ' ' })
    expect(tag.attributes('aria-checked')).toBe('true')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
    wrapper.unmount()
  })

  test('tag custom color', () => {
    const wrapper = mount(VarTag, {
      props: { color: '#ff0000', textColor: '#fff' },
    })
    const style = wrapper.find('.mp-tag').attributes('style') || ''
    expect(style).toContain('background')
    expect(style).toContain('color')
    wrapper.unmount()
  })

  test('tag custom color outline', () => {
    const wrapper = mount(VarTag, {
      props: { variant: 'outline', color: '#ff0000', textColor: '#ff0000' },
    })
    const style = wrapper.find('.mp-tag').attributes('style') || ''
    expect(style).toContain('border-color')
    expect(style).toContain('transparent')
    wrapper.unmount()
  })

  test('tag snapshot', () => {
    const wrapper = mount(VarTag, {
      slots: { default: 'Tag Text' },
    })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
