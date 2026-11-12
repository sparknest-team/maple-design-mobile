import { flushPromises, mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import Dialog from '../Dialog.vue'

it('keeps an already focused external control when the dialog changes container', async () => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  const wrapper = mount(Dialog, {
    attachTo: document.body,
    props: { open: true, popupContainer: false, title: 'Dialog', lockScroll: false },
  })
  try {
    await flushPromises()
    input.focus()
    expect(document.activeElement).toBe(input)
    await wrapper.setProps({ popupContainer: document.body })
    await flushPromises()
    expect(document.activeElement).toBe(input)
  } finally {
    wrapper.unmount()
    input.remove()
  }
})

it('restores modal focus when its focused child is blurred during a container move', async () => {
  const wrapper = mount(Dialog, {
    attachTo: document.body,
    props: { open: true, popupContainer: false, title: 'Dialog', lockScroll: false },
    slots: { default: '<input data-inner-focus />' },
  })
  try {
    await flushPromises()
    const input = document.querySelector<HTMLInputElement>('[data-inner-focus]')!
    input.focus()
    expect(document.activeElement).toBe(input)
    await wrapper.setProps({ popupContainer: document.body })
    await flushPromises()
    expect(document.activeElement?.getAttribute('role')).toBe('dialog')
  } finally {
    wrapper.unmount()
  }
})

it('does not steal focus already in the destination document', async () => {
  const frame = document.createElement('iframe')
  document.body.appendChild(frame)
  const doc = frame.contentDocument!
  const external = doc.createElement('button')
  const target = doc.createElement('div')
  doc.body.append(external, target)
  const wrapper = mount(Dialog, {
    attachTo: document.body,
    props: { open: true, popupContainer: false, title: 'Dialog', lockScroll: false },
  })
  try {
    await flushPromises()
    external.focus()
    expect(doc.activeElement).toBe(external)
    await wrapper.setProps({ popupContainer: target })
    await flushPromises()
    expect(doc.activeElement).toBe(external)
  } finally {
    wrapper.unmount()
    frame.remove()
  }
})
