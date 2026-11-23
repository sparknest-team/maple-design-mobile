import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test } from 'vitest'
import Select, { Option } from '../index'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach((wrapper) => wrapper.unmount()))

describe('Select trailing selection check', () => {
  for (const multiple of [false, true]) {
    test(`${multiple ? 'multiple' : 'single'}: only selected rows show a trailing SVG check`, async () => {
      const wrapper = mount(Select, {
        attachTo: document.body,
        props: {
          multiple,
          defaultOpen: true,
          popupContainer: false,
          modelValue: multiple ? ['b'] : 'b',
          options: [
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Beta' },
          ],
        },
      })
      wrappers.push(wrapper)
      await nextTick()
      const rows = wrapper.findAllComponents(Option)
      expect(rows).toHaveLength(2)
      expect(rows[0].find('.mp-select-option-check').exists()).toBe(false)
      expect(rows[1].get('.mp-select-option-check').attributes('aria-hidden')).toBe('true')
      expect(rows[1].find('.mp-select-option-check svg').exists()).toBe(true)
      expect(rows[1].element.lastElementChild?.classList.contains('mp-select-option-check')).toBe(true)
      expect(rows[1].find('.mp-selection-indicator').exists()).toBe(false)
      await rows[0].trigger('pointerenter', { pointerType: 'mouse' })
      expect(rows[0].find('.mp-select-option-check').exists()).toBe(false)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await wrapper.setProps({ modelValue: multiple ? ['a'] : 'a' })
      expect(rows[0].find('.mp-select-option-check svg').exists()).toBe(true)
      expect(rows[1].find('.mp-select-option-check').exists()).toBe(false)
    })
  }

  test('a canceled swipe does not select and one completed touch selects without a browser click', async () => {
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: {
        editMode: 'direct',
        filterable: true,
        defaultOpen: true,
        popupContainer: false,
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ],
      },
    })
    wrappers.push(wrapper)
    await nextTick()
    const row = wrapper.findAllComponents(Option)[1]
    await row.trigger('pointerenter', { pointerType: 'touch' })
    await row.trigger('mouseenter')
    expect(row.classes()).not.toContain('mp-select-option-active')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    const text = row.get('.mp-select-option-content')
    const touch = { identifier: 1, clientX: 20, clientY: 30 }
    const start = { touches: [touch], changedTouches: [touch] }
    const end = { touches: [], changedTouches: [touch] }
    await text.trigger('touchstart', start)
    await text.trigger('pointercancel')
    await text.trigger('touchend', end)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await text.trigger('touchstart', start)
    await text.trigger('touchmove', { ...start, changedTouches: [{ ...touch, clientY: 55 }] })
    await text.trigger('touchend', end)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await text.trigger('touchstart', start)
    const release = Object.assign(new Event('touchend', { bubbles: true, cancelable: true }), end)
    text.element.dispatchEvent(release)
    expect(release.defaultPrevented).toBe(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })

  test('custom suffix stays before the check and the SVG adds no label text', async () => {
    const wrapper = mount(Select, {
      attachTo: document.body,
      props: { defaultOpen: true, popupContainer: false, modelValue: 'a' },
      slots: {
        default: () =>
          h(
            Option,
            { value: 'a', label: 'Alpha' },
            {
              default: () => 'Alpha',
              suffix: () => h('span', 'Details'),
            },
          ),
      },
    })
    wrappers.push(wrapper)
    await nextTick()
    const row = wrapper.findComponent(Option)
    expect(row.text()).toBe('AlphaDetails')
    expect(row.element.lastElementChild?.classList.contains('mp-select-option-check')).toBe(true)
    expect(row.get('[aria-hidden="true"]').find('svg').exists()).toBe(true)
  })
})
