import { h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Dialog from '../Dialog.vue'

const owners = []
afterEach(() => owners.splice(0).forEach((w) => w.unmount()))
test('numeric zero top is preserved when the dialog is not centered', () => {
  const w = mount(Dialog, { props: { open: true, popupContainer: false, alignCenter: false, top: 0 } })
  owners.push(w)
  expect(w.get('[role=dialog]').element.style.top).toBe('0px')
})
test.each(['input', 'textarea', 'button', 'a', 'editable'])(
  'interactive title %s keeps native pointer defaults and does not drag',
  async (kind) => {
    const node =
      kind === 'editable'
        ? h('div', { contenteditable: 'true', 'data-header-control': kind }, 'Edit')
        : h(
            kind,
            { 'data-header-control': kind, ...(kind === 'a' ? { href: '#target' } : {}) },
            kind === 'button' || kind === 'a' ? 'Action' : undefined,
          )
    const w = mount(Dialog, {
      attachTo: document.body,
      props: { open: true, draggable: true, popupContainer: false },
      slots: { title: () => node },
    })
    owners.push(w)
    const el = w.get('[data-header-control]').element
    const View = el.ownerDocument.defaultView
    const event = new View.MouseEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      button: 0,
      clientX: 20,
      clientY: 30,
    })
    Object.defineProperties(event, { pointerId: { value: 1 }, isPrimary: { value: true } })
    el.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(false)
    const move = new View.MouseEvent('pointermove', { bubbles: true, clientX: 80, clientY: 90 })
    Object.defineProperty(move, 'pointerId', { value: 1 })
    el.ownerDocument.dispatchEvent(move)
    await nextTick()
    expect(w.get('[role=dialog]').element.style.transform).toBe('')
  },
)
