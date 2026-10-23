import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Picker from '../Picker.vue'

afterEach(() => vi.unstubAllGlobals())

describe('Picker keyboard and reduced-motion', () => {
  const columns = [[{ text: 'A' }, { text: 'B', disabled: true }, { text: 'C' }]]
  it('skips disabled options, keeps focus after controlled updates and exposes its active option', async () => {
    const wrapper = mount(Picker, {
      attachTo: document.body,
      props: {
        columns,
        modelValue: ['A'],
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
      },
    })
    const column = wrapper.get('[role="listbox"]')
    column.element.focus()
    await column.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.props('modelValue')).toEqual(['C'])
    expect(document.activeElement).toBe(column.element)
    const active = column.attributes('aria-activedescendant')
    expect(wrapper.get('#' + active).attributes('aria-selected')).toBe('true')
    await column.trigger('keydown', { key: 'Home' })
    expect(wrapper.props('modelValue')).toEqual(['A'])
    await column.trigger('keydown', { key: 'End' })
    expect(wrapper.props('modelValue')).toEqual(['C'])
    await wrapper.findAll('[role="option"]')[1].trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(3)
    wrapper.unmount()
  })
  it('keeps empty/all-disabled columns outside the tab order', () => {
    const wrapper = mount(Picker, { props: { columns: [[], [{ text: 'off', disabled: true }]] } })
    for (const column of wrapper.findAll('[role="listbox"]')) {
      expect(column.attributes('tabindex')).toBe('-1')
      expect(column.attributes('aria-disabled')).toBe('true')
      expect(column.attributes('aria-activedescendant')).toBeUndefined()
    }
    wrapper.unmount()
  })
  it('blocks clicks and keyboard selection while disabled, then restores interaction', async () => {
    const wrapper = mount(Picker, { props: { columns, modelValue: ['A'], disabled: true } })
    const column = wrapper.get('[role="listbox"]')
    expect(column.attributes('tabindex')).toBe('-1')
    expect(column.attributes('aria-disabled')).toBe('true')
    await wrapper.findAll('[role="option"]')[2].trigger('click')
    await column.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.findAll('[role="option"]')[0].attributes('aria-selected')).toBe('true')
    expect(wrapper.emitted('change')).toBeUndefined()
    await wrapper.setProps({ disabled: false })
    expect(column.attributes('tabindex')).toBe('0')
    await column.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
  it('commits without transitionend in reduce mode and releases its preference listener', async () => {
    const media = { matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    )
    const wrapper = mount(Picker, { props: { columns } })
    await wrapper.findAll('[role="option"]')[2].trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(['C'])
    expect(wrapper.get('.mp-picker__scroller').element.style.transitionDuration).toBe('0ms')
    expect(media.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    wrapper.unmount()
    expect(media.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
  it('settles a pending selection when the preference changes to reduce', async () => {
    const media = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => media),
    )
    const wrapper = mount(Picker, { props: { columns } })
    await wrapper.findAll('[role="option"]')[2].trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
    media.matches = true
    media.addEventListener.mock.calls[0][1]()
    await nextTick()
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(['C'])
    await wrapper.get('.mp-picker__scroller').trigger('transitionend')
    expect(wrapper.emitted('change')).toHaveLength(1)
    wrapper.unmount()
  })
})
