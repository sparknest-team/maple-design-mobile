import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Dialog from '../../dialog'
import Popup from '../../popup'
import Trigger from '../../trigger'
import { popupContainerProp, resolvePopupContainer } from '../../utils/popup-container'

const surfaces = [
  ['trigger', Trigger],
  ['dialog', Dialog],
  ['popup', Popup],
]
const tick = async () => {
  await nextTick()
  await nextTick()
}
const Probe = defineComponent({
  setup() {
    const draft = ref('draft')
    return () =>
      h('input', {
        'data-portal-scope-probe': '',
        value: draft.value,
        onInput: (event) => {
          draft.value = event.target.value
        },
      })
  },
})
const probe = () => h(Probe)
const slots = (kind) =>
  kind === 'trigger' ? { default: () => h('button', 'reference'), content: probe } : { default: probe }

describe('real Teleport scope and target ownership', () => {
  for (const [kind, Component] of [
    ['dialog', Dialog],
    ['panel', Popup],
  ]) {
    test(kind + ' inline in another document owns that document and can move to body', async () => {
      const frame = document.createElement('iframe')
      document.body.append(frame)
      const foreignDocument = frame.contentDocument
      const caller = foreignDocument.createElement('div')
      foreignDocument.body.append(caller)
      const update = vi.fn()
      const initialOverflow = document.body.style.overflow
      const wrapper = mount(Component, {
        attachTo: caller,
        props: { open: true, popupContainer: false, 'onUpdate:open': update },
        slots: { default: probe },
      })
      try {
        await tick()
        const input = caller.querySelector('[data-portal-scope-probe]')
        expect(input).toBeTruthy()
        expect(document.body.style.overflow).toBe(initialOverflow)
        expect(foreignDocument.body.style.overflow).toBe('hidden')
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        expect(update).not.toHaveBeenCalled()
        foreignDocument.dispatchEvent(
          new frame.contentWindow.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
        )
        expect(update).toHaveBeenCalledTimes(1)
        await wrapper.setProps({ popupContainer: undefined })
        await tick()
        expect(input.ownerDocument).toBe(document)
        expect(document.body.contains(input)).toBe(true)
        expect(foreignDocument.body.style.overflow).toBe('')
        const oldTab = new frame.contentWindow.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
        foreignDocument.dispatchEvent(oldTab)
        expect(oldTab.defaultPrevented).toBe(false)
        const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
        document.dispatchEvent(tab)
        expect(tab.defaultPrevented).toBe(true)
      } finally {
        wrapper.unmount()
        expect(document.body.style.overflow).toBe(initialOverflow)
        expect(foreignDocument.body.style.overflow).toBe('')
        frame.remove()
      }
    })
  }
  for (const [kind, Component] of [
    ['dialog', Dialog],
    ['panel', Popup],
  ]) {
    test(kind + ' moves document listeners and stack ownership with an open panel', async () => {
      const frame = document.createElement('iframe')
      const caller = document.createElement('div')
      const first = document.createElement('div')
      document.body.append(frame, caller, first)
      const foreignDocument = frame.contentDocument
      const destination = foreignDocument.createElement('div')
      foreignDocument.body.append(destination)
      const update = vi.fn()
      const remainingUpdate = vi.fn()
      // Mount both apps before moving: VTU replaces its global vnode
      // transformer on mount, which can otherwise remount slot probes.
      const remaining = mount(Dialog, {
        attachTo: caller,
        props: { open: false, zIndex: 100, 'onUpdate:open': remainingUpdate },
      })
      const wrapper = mount(Component, {
        attachTo: caller,
        props: { open: true, popupContainer: first, zIndex: 400, 'onUpdate:open': update },
        slots: { default: probe },
      })
      try {
        await tick()
        const input = first.querySelector('[data-portal-scope-probe]')
        input.value = 'cross-document draft'
        input.dispatchEvent(new Event('input', { bubbles: true }))
        await tick()
        await wrapper.setProps({ popupContainer: destination })
        await tick()
        expect(destination.querySelector('[data-portal-scope-probe]')).toBe(input)
        expect(input.ownerDocument).toBe(foreignDocument)
        const foreignTab = new frame.contentWindow.KeyboardEvent('keydown', {
          key: 'Tab',
          bubbles: true,
          cancelable: true,
        })
        foreignDocument.dispatchEvent(foreignTab)
        expect(foreignTab.defaultPrevented).toBe(true)
        const oldTab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
        document.dispatchEvent(oldTab)
        expect(oldTab.defaultPrevented).toBe(false)
        await remaining.setProps({ open: true })
        await tick()
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        expect(remainingUpdate).toHaveBeenCalledTimes(1)
        expect(update).not.toHaveBeenCalled()
        foreignDocument.dispatchEvent(
          new frame.contentWindow.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
        )
        expect(update).toHaveBeenCalledTimes(1)
        expect(wrapper.props('open')).toBe(true)
        expect(destination.querySelector('[data-portal-scope-probe]')).toBe(input)
        await wrapper.setProps({ popupContainer: first })
        await tick()
        expect(first.querySelector('[data-portal-scope-probe]')).toBe(input)
        expect(input.value).toBe('cross-document draft')
        foreignDocument.dispatchEvent(
          new frame.contentWindow.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
        )
        expect(update).toHaveBeenCalledTimes(1)
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
        expect(update).toHaveBeenCalledTimes(2)
        expect(remainingUpdate).toHaveBeenCalledTimes(1)
      } finally {
        remaining?.unmount()
        wrapper.unmount()
        expect(first.style.overflow).toBe('')
        expect(destination.style.overflow).toBe('')
        caller.remove()
        first.remove()
        frame.remove()
      }
    })
  }
  for (const [kind, Component] of surfaces) {
    test.each(['body', 'selector', 'element', 'inline'])(
      kind + ' mounts in %s without copying caller tokens',
      async (mode) => {
        const caller = document.createElement('div')
        const host = document.createElement('div')
        const sibling = document.createElement('div')
        const token =
          kind === 'trigger'
            ? '--mp-trigger-arrow-background'
            : kind === 'dialog'
              ? '--mp-dialog-background'
              : '--mp-popup-content-background-color'
        caller.setAttribute('data-portal-owner', 'caller')
        host.setAttribute('data-portal-owner', 'host')
        host.id = 'portal-scope-target'
        caller.style.setProperty(token, '#123456')
        host.style.setProperty(token, '#654321')
        document.body.append(caller, host, sibling)
        const popupContainer =
          mode === 'selector'
            ? '#portal-scope-target'
            : mode === 'element'
              ? host
              : mode === 'inline'
                ? false
                : undefined
        const wrapper = mount(Component, {
          attachTo: caller,
          props: { open: true, popupContainer },
          slots: slots(kind),
        })
        try {
          await tick()
          const panel = document.querySelector('[data-portal-scope-probe]')
          expect(panel).toBeTruthy()
          const expected = mode === 'inline' ? caller : mode === 'body' ? document.body : host
          expect(expected.contains(panel)).toBe(true)
          expect(panel.closest('[data-portal-owner]')).toBe(mode === 'inline' ? caller : mode === 'body' ? null : host)
          for (let node = panel; node && node !== expected; node = node.parentElement) {
            expect(node.style.getPropertyValue(token)).toBe('')
          }
          expect(sibling.style.getPropertyValue(token)).toBe('')
          expect(sibling.childElementCount).toBe(0)
        } finally {
          wrapper.unmount()
          expect(document.querySelector('[data-portal-scope-probe]')).toBeNull()
          caller.remove()
          host.remove()
          sibling.remove()
        }
      },
    )

    test(kind + ' moves the same content between hosts, inline and body and releases locks', async () => {
      const caller = document.createElement('div')
      const first = document.createElement('div')
      const second = document.createElement('div')
      first.style.overflow = 'auto'
      second.style.overflow = 'scroll'
      document.body.append(caller, first, second)
      const wrapper = mount(Component, {
        attachTo: caller,
        props: { open: true, popupContainer: first },
        slots: slots(kind),
      })
      try {
        await tick()
        const panel = first.querySelector('[data-portal-scope-probe]')
        expect(panel).toBeTruthy()
        panel.value = 'uncommitted draft'
        panel.dispatchEvent(new Event('input', { bubbles: true }))
        panel.focus()
        await tick()
        await wrapper.setProps({ popupContainer: second })
        await tick()
        expect(second.querySelector('[data-portal-scope-probe]')).toBe(panel)
        expect(first.querySelector('[data-portal-scope-probe]')).toBeNull()
        expect(first.style.overflow).toBe('auto')
        if (kind !== 'trigger') {
          expect(panel.closest('[role="dialog"]').contains(document.activeElement)).toBe(true)
        }
        await wrapper.setProps({ popupContainer: false })
        await tick()
        expect(caller.querySelector('[data-portal-scope-probe]')).toBe(panel)
        expect(second.style.overflow).toBe('scroll')
        if (kind !== 'trigger') {
          expect(panel.closest('[role="dialog"]').contains(document.activeElement)).toBe(true)
        }
        if (kind !== 'trigger') {
          expect(document.body.style.overflow).toBe('hidden')
        }
        await wrapper.setProps({ popupContainer: undefined })
        await tick()
        expect(document.body.contains(panel)).toBe(true)
        expect(caller.contains(panel)).toBe(false)
        expect(first.contains(panel)).toBe(false)
        expect(second.contains(panel)).toBe(false)
        expect(panel.value).toBe('uncommitted draft')
        if (kind !== 'trigger') {
          expect(panel.closest('[role="dialog"]').contains(document.activeElement)).toBe(true)
        }
        await wrapper.setProps({ open: false, popupContainer: second })
        await tick()
        await wrapper.setProps({ popupContainer: false })
        await tick()
        await wrapper.setProps({ popupContainer: undefined, open: true })
        await tick()
        const reopened = document.querySelector('[data-portal-scope-probe]')
        expect(document.body.contains(reopened)).toBe(true)
        expect(caller.contains(reopened)).toBe(false)
        expect(first.contains(reopened)).toBe(false)
        expect(second.contains(reopened)).toBe(false)
      } finally {
        wrapper.unmount()
        expect(first.style.overflow).toBe('auto')
        expect(second.style.overflow).toBe('scroll')
        expect(document.querySelector('[data-portal-scope-probe]')).toBeNull()
        caller.remove()
        first.remove()
        second.remove()
      }
    })
  }

  test('accepts iframe HTMLElements but rejects SVG and plain objects', () => {
    const frame = document.createElement('iframe')
    document.body.append(frame)
    try {
      const host = frame.contentDocument.createElement('div')
      expect(host instanceof HTMLElement).toBe(false)
      expect(popupContainerProp.validator(host)).toBe(true)
      expect(resolvePopupContainer(host)).toBe(host)
      document.body.append(host)
      try {
        expect(host.ownerDocument).toBe(document)
        expect(popupContainerProp.validator(host)).toBe(true)
      } finally {
        host.remove()
      }
      expect(popupContainerProp.validator(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))).toBe(false)
      expect(popupContainerProp.validator({ ownerDocument: document })).toBe(false)
      expect(
        popupContainerProp.validator({ ownerDocument: document, namespaceURI: 'http://www.w3.org/1999/xhtml' }),
      ).toBe(false)
    } finally {
      frame.remove()
    }
  })

  test('modal in another document listens there and cleans up without locking the caller body', async () => {
    const frame = document.createElement('iframe')
    const caller = document.createElement('div')
    document.body.append(frame, caller)
    const foreignDocument = frame.contentDocument
    const host = foreignDocument.createElement('div')
    foreignDocument.body.append(host)
    const update = vi.fn()
    const initialOverflow = document.body.style.overflow
    const wrapper = mount(Popup, {
      attachTo: caller,
      props: { open: true, popupContainer: host, 'onUpdate:open': update },
      slots: { default: probe },
    })
    try {
      await tick()
      expect(host.querySelector('[data-portal-scope-probe]')).toBeTruthy()
      expect(document.querySelector('[data-portal-scope-probe]')).toBeNull()
      expect(document.body.style.overflow).toBe(initialOverflow)
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      expect(update).not.toHaveBeenCalled()
      foreignDocument.dispatchEvent(new frame.contentWindow.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
      expect(update).toHaveBeenCalledTimes(1)
      expect(update).toHaveBeenCalledWith(false)
    } finally {
      wrapper.unmount()
      expect(host.querySelector('[data-portal-scope-probe]')).toBeNull()
      expect(host.style.overflow).toBe('')
      expect(document.body.style.overflow).toBe(initialOverflow)
      caller.remove()
      frame.remove()
    }
  })
})
