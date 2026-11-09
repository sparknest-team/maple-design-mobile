import { nextTick } from 'vue'
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
