import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Panel from '../CascaderPanel.vue'

test('a focused option remains active when the pointer leaves and Enter selects it', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const option = wrapper.findAll('[role="menuitem"]')[1]!
    ;(option.element as HTMLElement).focus()
    await option.trigger('mouseleave')
    await option.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
  } finally {
    wrapper.unmount()
  }
})

test('arrow navigation moves DOM focus and Enter selects the new option', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const [first, second] = wrapper.findAll('[role="menuitem"]')
    ;(first!.element as HTMLElement).focus()
    await first!.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(document.activeElement).toBe(second!.element)
    await second!.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['b'])
  } finally {
    wrapper.unmount()
  }
})

test('nested checkbox retains keyboard ownership', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: { multiple: true, options: [{ value: 'a', label: 'Alpha' }] },
  })
  try {
    const input = wrapper.get('input[type="checkbox"]')
    ;(input.element as HTMLElement).focus()
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[['a']]])
  } finally {
    wrapper.unmount()
  }
})

test('pending arrow update never steals focus moved outside the panel', async () => {
  const outside = document.createElement('button')
  document.body.append(outside)
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const first = wrapper.get('[role="menuitem"]')
    ;(first.element as HTMLElement).focus()
    first.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    outside.focus()
    await nextTick()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    outside.remove()
  }
})

test('pointer leaving another option restores the option that still owns focus', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const [first, second] = wrapper.findAll('[role="menuitem"]')
    ;(first!.element as HTMLElement).focus()
    await second!.trigger('mouseenter')
    await second!.trigger('mouseleave')
    await first!.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
  } finally {
    wrapper.unmount()
  }
})

test('another panel cannot adopt the focused option from a different panel', async () => {
  const first = mount(Panel, { attachTo: document.body, props: { options: [{ value: 'a', label: 'Alpha' }] } })
  const second = mount(Panel, { attachTo: document.body, props: { options: [{ value: 'b', label: 'Beta' }] } })
  try {
    const focused = first.get('[role="menuitem"]')
    const hovered = second.get('[role="menuitem"]')
    ;(focused.element as HTMLElement).focus()
    await hovered.trigger('mouseenter')
    await hovered.trigger('mouseleave')
    await second.trigger('keydown', { key: 'Enter' })
    expect(second.emitted('update:modelValue')).toBeUndefined()
    await focused.trigger('keydown', { key: 'Enter' })
    expect(first.emitted('update:modelValue')?.at(-1)).toEqual(['a'])
  } finally {
    first.unmount()
    second.unmount()
  }
})

test('Enter on a disabled focused option does not select a previously active option', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta', disabled: true },
      ],
    },
  })
  try {
    const [enabled, disabled] = wrapper.findAll('[role="menuitem"]')
    ;(enabled!.element as HTMLElement).focus()
    ;(disabled!.element as HTMLElement).focus()
    await disabled!.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['ltr', 'ArrowRight'],
  ['rtl', 'ArrowLeft'],
])('disabled option does not expand an old branch in %s', async (dir, key) => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    attrs: { dir },
    props: {
      options: [
        { value: 'a', label: 'Alpha', children: [{ value: 'a1', label: 'Child' }] },
        { value: 'b', label: 'Beta', disabled: true },
      ],
    },
  })
  try {
    const [enabled, disabled] = wrapper.findAll('[role="menuitem"]')
    ;(enabled!.element as HTMLElement).focus()
    ;(disabled!.element as HTMLElement).focus()
    await disabled!.trigger('keydown', { key })
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(2)
    expect(enabled!.attributes('aria-expanded')).toBe('false')
  } finally {
    wrapper.unmount()
  }
})

test.each([
  ['ArrowDown', 3, 2],
  ['ArrowUp', 0, 0],
])('vertical %s starts from disabled focused position', async (key, previous, expected) => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta', disabled: true },
        { value: 'c', label: 'Gamma' },
        { value: 'd', label: 'Delta' },
      ],
    },
  })
  try {
    const items = wrapper.findAll('[role="menuitem"]')
    ;(items[previous]!.element as HTMLElement).focus()
    ;(items[1]!.element as HTMLElement).focus()
    await items[1]!.trigger('keydown', { key })
    await nextTick()
    expect(document.activeElement).toBe(items[expected]!.element)
  } finally {
    wrapper.unmount()
  }
})

test('panel navigation does not focus a matching option in a nested panel', async () => {
  const wrapper = mount(Panel, {
    attachTo: document.body,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Outer Beta' },
      ],
    },
    slots: {
      option: ({ data }: any) =>
        data.value === 'a'
          ? h('div', [data.label, h(Panel, { options: [{ value: 'b', label: 'Inner Beta' }] })])
          : data.label,
    },
  })
  try {
    const alpha = wrapper.get('[role="menuitem"][title="Alpha"]')
    const inner = wrapper.get('[role="menuitem"][title="Inner Beta"]')
    const outer = wrapper.get('[role="menuitem"][title="Outer Beta"]')
    ;(alpha.element as HTMLElement).focus()
    await alpha.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(document.activeElement).toBe(outer.element)
    expect(document.activeElement).not.toBe(inner.element)
  } finally {
    wrapper.unmount()
  }
})
