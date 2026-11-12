import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Panel from '../CascaderPanel.vue'

test.each([
  [false, 'open'],
  [true, 'open'],
  [false, 'closed'],
  [true, 'closed'],
] as const)('keyboard focus moves inside shadow DOM: multiple=%s mode=%s', async (multiple, mode) => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = host.attachShadow({ mode })
  const wrapper = mount(Panel, {
    attachTo: root as unknown as Element,
    props: {
      multiple,
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const options = wrapper.findAll('[data-cascader-key]')
    ;(options[0].element as HTMLElement).focus()
    expect(root.activeElement).toBe(options[0].element)
    await options[0].trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    expect(root.activeElement).toBe(options[1].element)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('pointer leave restores the focused option in shadow DOM', async () => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = host.attachShadow({ mode: 'open' })
  const wrapper = mount(Panel, {
    attachTo: root as unknown as Element,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const [first, second] = wrapper.findAll('[data-cascader-key]')
    ;(second.element as HTMLElement).focus()
    await first.trigger('mouseenter')
    await first.trigger('mouseleave')
    await nextTick()
    expect(second.classes()).toContain('mp-cascader-option-active')
  } finally {
    wrapper.unmount()
    host.remove()
  }
})

test('does not recover pending shadow focus after the user focuses another control', async () => {
  const host = document.createElement('div')
  const outside = document.createElement('button')
  document.body.append(host, outside)
  const root = host.attachShadow({ mode: 'open' })
  const wrapper = mount(Panel, {
    attachTo: root as unknown as Element,
    props: {
      options: [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
      ],
    },
  })
  try {
    const options = wrapper.findAll('[data-cascader-key]')
    ;(options[0].element as HTMLElement).focus()
    options[0].element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }))
    outside.focus()
    await nextTick()
    expect(document.activeElement).toBe(outside)
  } finally {
    wrapper.unmount()
    host.remove()
    outside.remove()
  }
})

test('keyboard focus follows a virtual option across a shadow-root viewport', async () => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const root = host.attachShadow({ mode: 'open' })
  const options = Array.from({ length: 50 }, (_, index) => ({ value: String(index), label: `Item ${index}` }))
  const wrapper = mount(Panel, {
    attachTo: root as unknown as Element,
    props: { options, virtualListProps: { height: 60, estimatedSize: 30, fixedSize: true, buffer: 0 } },
  })
  try {
    await flushPromises()
    const rendered = wrapper.findAll('[data-cascader-key]')
    const last = rendered[rendered.length - 1]
    const current = Number(last.attributes('title')!.replace('Item ', ''))
    expect(current).toBeLessThan(options.length - 1)
    ;(last.element as HTMLElement).focus()
    await last.trigger('keydown', { key: 'ArrowDown' })
    await flushPromises()
    const next = wrapper
      .findAll('[data-cascader-key]')
      .find((item) => item.attributes('title') === `Item ${current + 1}`)
    expect(next).toBeDefined()
    expect(root.activeElement).toBe(next!.element)
  } finally {
    wrapper.unmount()
    host.remove()
  }
})
