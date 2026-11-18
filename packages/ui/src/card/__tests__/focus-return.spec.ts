import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Card from '../Card.vue'

test.each([true, false])('restore opening focus only if the hidden content still owns focus: %s', async (inside) => {
  const opener = document.createElement('button')
  const outside = document.createElement('button')
  document.body.append(opener, outside)
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: false, ripple: false },
    slots: { 'floating-content': () => h('input', { 'aria-label': 'Draft' }) },
  })
  try {
    opener.focus()
    await wrapper.setProps({ floating: true })
    const draft = wrapper.get('input').element as HTMLInputElement
    draft.focus()
    if (!inside) {
      outside.focus()
    }
    await wrapper.setProps({ floating: false })
    expect(document.activeElement).toBe(inside ? opener : outside)
  } finally {
    wrapper.unmount()
    opener.remove()
    outside.remove()
  }
})

test('Escape requests close only for the expanded card and respects nested handling', async () => {
  const wrapper = mount(Card, {
    attachTo: document.body,
    props: { floating: false, ripple: false },
    slots: { default: () => h('input', { 'aria-label': 'Draft' }) },
  })
  try {
    const input = wrapper.get('input')
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:floating')).toBeUndefined()
    await wrapper.setProps({ floating: true })
    await input.trigger('keydown', { key: 'Escape', isComposing: true })
    expect(wrapper.emitted('update:floating')).toBeUndefined()
    await input.trigger('keydown', { key: 'Escape', keyCode: 229 })
    expect(wrapper.emitted('update:floating')).toBeUndefined()
    const consumed = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
    consumed.preventDefault()
    input.element.dispatchEvent(consumed)
    expect(wrapper.emitted('update:floating')).toBeUndefined()
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:floating')).toEqual([[false]])
    expect(wrapper.props('floating')).toBe(true)
  } finally {
    wrapper.unmount()
  }
})

test('Escape does not request close for row direction', async () => {
  const wrapper = mount(Card, {
    props: { floating: true, direction: 'row', ripple: false },
    slots: { default: () => h('input') },
  })
  try {
    await wrapper.get('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:floating')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([true, false])(
  'switching away from column restores focus only when floating content owns it: %s',
  async (inside) => {
    const opener = document.createElement('button')
    const outside = document.createElement('button')
    document.body.append(opener, outside)
    const wrapper = mount(Card, {
      attachTo: document.body,
      props: { floating: false, direction: 'column', ripple: false },
      slots: { 'floating-content': () => h('input', { 'aria-label': 'Draft' }) },
    })
    try {
      opener.focus()
      await wrapper.setProps({ floating: true })
      const draft = wrapper.get('input').element as HTMLInputElement
      draft.focus()
      if (!inside) {
        outside.focus()
      }
      await wrapper.setProps({ direction: 'row' })
      expect(document.activeElement).toBe(inside ? opener : outside)
      expect(wrapper.find('input').exists()).toBe(false)
      expect(wrapper.emitted('update:floating')).toBeUndefined()
    } finally {
      wrapper.unmount()
      opener.remove()
      outside.remove()
    }
  },
)
