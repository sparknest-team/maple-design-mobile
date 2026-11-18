import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'

test.each(['style', 'class'] as const)(
  'updates trigger semantics when an outside ancestor changes inherited visibility via %s',
  async (mode) => {
    const stylesheet = document.createElement('style')
    stylesheet.textContent = '.upload-ancestor-hidden { visibility: hidden }'
    document.head.append(stylesheet)
    const setHidden = (element: HTMLElement, hidden: boolean) => {
      if (mode === 'style') {
        element.style.visibility = hidden ? 'hidden' : 'visible'
      } else {
        element.classList.toggle('upload-ancestor-hidden', hidden)
      }
    }
    const ancestor = document.createElement('div')
    setHidden(ancestor, true)
    document.body.append(ancestor)
    const wrapper = mount(Upload, {
      attachTo: ancestor,
      props: { editMode: 'direct', ripple: false },
      slots: { trigger: () => h('button', 'Choose') },
    })
    try {
      await flushPromises()
      const trigger = () => wrapper.get('[class*="upload__trigger"]')
      expect(trigger().attributes('role')).toBe('button')
      setHidden(ancestor, false)
      await flushPromises()
      expect(trigger().attributes('role')).toBeUndefined()
      setHidden(ancestor, true)
      await flushPromises()
      expect(trigger().attributes('role')).toBe('button')
    } finally {
      wrapper.unmount()
      ancestor.remove()
      stylesheet.remove()
    }
  },
)

test('follows trigger ancestor when moved to a different connected container', async () => {
  const first = document.createElement('div')
  const second = document.createElement('div')
  const host = document.createElement('div')
  first.style.visibility = 'hidden'
  second.style.visibility = 'visible'
  first.append(host)
  document.body.append(first, second)
  const wrapper = mount(Upload, {
    attachTo: host,
    props: { editMode: 'direct', ripple: false },
    slots: { trigger: () => h('button', 'Choose') },
  })
  try {
    await flushPromises()
    const trigger = () => wrapper.get('[class*="upload__trigger"]')
    expect(trigger().attributes('role')).toBe('button')
    second.append(host)
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
    second.style.visibility = 'hidden'
    await flushPromises()
    expect(trigger().attributes('role')).toBe('button')
    second.style.visibility = 'visible'
    await flushPromises()
    expect(trigger().attributes('role')).toBeUndefined()
  } finally {
    wrapper.unmount()
    first.remove()
    second.remove()
  }
})

test('ignores unrelated ancestor child mutations', async () => {
  const host = document.createElement('div')
  document.body.append(host)
  const wrapper = mount(Upload, {
    attachTo: host,
    props: { editMode: 'direct', ripple: false },
    slots: { trigger: () => h('button', 'Choose') },
  })
  const spy = vi.spyOn(window, 'getComputedStyle')
  try {
    await flushPromises()
    spy.mockClear()
    const sibling = document.createElement('div')
    document.body.append(sibling)
    sibling.remove()
    await flushPromises()
    expect(spy).not.toHaveBeenCalled()
  } finally {
    spy.mockRestore()
    wrapper.unmount()
    host.remove()
  }
})
