import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Loading from '../Loading.vue'

const wrappers = []
const render = (component, options = {}) => {
  const wrapper = mount(component, options)
  wrappers.push(wrapper)
  return wrapper
}
const animations = ['circle', 'wave', 'cube', 'rect', 'disappear']
const customIcon = () => h('svg', { 'data-custom-indicator': '', 'aria-hidden': 'true' })
const animationCount = (wrapper, type) =>
  wrapper.findAll('*').filter((node) => node.classes().some((name) => name.endsWith(`loading__${type}`))).length

afterEach(() => {
  wrappers.splice(0).forEach((wrapper) => wrapper.unmount())
})

describe('Loading custom indicator precedence', () => {
  it.each(animations)('replaces the built-in %s animation with one custom icon', (type) => {
    const wrapper = render(Loading, { props: { type }, slots: { icon: customIcon } })
    expect(wrapper.findAll('[data-custom-indicator]')).toHaveLength(1)
    for (const animation of animations) {
      expect(animationCount(wrapper, animation)).toBe(0)
    }
  })

  it('restores the selected built-in animation when a reactive custom slot is removed', async () => {
    const customized = ref(true)
    const type = ref('wave')
    const Host = defineComponent({
      setup: () => () => h(Loading, { type: type.value }, customized.value ? { icon: customIcon } : {}),
    })
    const wrapper = render(Host)
    expect(wrapper.findAll('[data-custom-indicator]')).toHaveLength(1)
    expect(animationCount(wrapper, 'wave')).toBe(0)
    customized.value = false
    await nextTick()
    expect(wrapper.find('[data-custom-indicator]').exists()).toBe(false)
    expect(animationCount(wrapper, 'wave')).toBe(1)
    type.value = 'circle'
    await nextTick()
    expect(animationCount(wrapper, 'wave')).toBe(0)
    expect(animationCount(wrapper, 'circle')).toBe(1)
    customized.value = true
    await nextTick()
    expect(wrapper.findAll('[data-custom-indicator]')).toHaveLength(1)
    expect(animationCount(wrapper, 'circle')).toBe(0)
  })

  it('respects hideIcon and wrapped loading state while preserving content and tip', async () => {
    const wrapper = render(Loading, {
      props: { type: 'cube', loading: true, tip: 'Please wait' },
      slots: { default: () => h('span', { 'data-content': '' }, 'Content'), icon: customIcon },
    })
    expect(wrapper.findAll('[data-custom-indicator]')).toHaveLength(1)
    expect(wrapper.text()).toContain('Please wait')
    await wrapper.setProps({ hideIcon: true })
    expect(wrapper.find('[data-custom-indicator]').exists()).toBe(false)
    expect(animationCount(wrapper, 'cube')).toBe(0)
    expect(wrapper.text()).toContain('Please wait')
    await wrapper.setProps({ hideIcon: false, loading: false })
    expect(wrapper.find('[data-custom-indicator]').exists()).toBe(false)
    expect(wrapper.find('[data-content]').text()).toBe('Content')
    await wrapper.setProps({ loading: true })
    expect(wrapper.findAll('[data-custom-indicator]')).toHaveLength(1)
    expect(animationCount(wrapper, 'cube')).toBe(0)
  })
})
