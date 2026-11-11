import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Message from '..'

const owners = []
afterEach(() => {
  owners.splice(0).forEach((w) => w.unmount())
  vi.restoreAllMocks()
})
test.each([false, 'body'])(
  'public component routes attrs to the semantic region without duplicate lifecycle listeners: %s',
  async (popupContainer) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const click = vi.fn(),
      opened = vi.fn()
    const w = mount(Message.Component, {
      attachTo: document.body,
      props: { open: true, duration: 0, popupContainer, onOpen: opened },
      attrs: {
        id: 'notification',
        dir: 'rtl',
        class: 'business-message',
        style: { '--notification-probe': '123' },
        'aria-label': 'Saved notice',
        onClick: click,
      },
    })
    owners.push(w)
    const region = document.querySelector('[role=alert]')
    expect(region?.id).toBe('notification')
    expect(region.classList.contains('business-message')).toBe(true)
    expect(region.style.getPropertyValue('--notification-probe')).toBe('123')
    expect(region.getAttribute('aria-label')).toBe('Saved notice')
    expect(document.querySelectorAll('#notification')).toHaveLength(1)
    expect(region.closest('[dir]').getAttribute('dir')).toBe('rtl')
    expect(document.querySelectorAll('[dir=rtl]')).toHaveLength(1)
    region.click()
    expect(click).toHaveBeenCalledTimes(1)
    expect(opened).toHaveBeenCalledTimes(1)
    region.dispatchEvent(new region.ownerDocument.defaultView.Event('open'))
    expect(opened).toHaveBeenCalledTimes(1)
    expect(warn).not.toHaveBeenCalled()
  },
)
test('dynamic attrs update the same semantic node while its built-in role and classes remain', async () => {
  const w = mount(Message.Component, {
    attachTo: document.body,
    props: { open: true, duration: 0, popupContainer: false },
    attrs: { id: 'first-notice', class: 'before', 'aria-label': 'Before' },
  })
  owners.push(w)
  const region = document.querySelector('[role=alert]')
  await w.setProps({ id: 'second-notice', class: 'after', 'aria-label': undefined, role: 'presentation' })
  expect(document.querySelector('#second-notice')).toBe(region)
  expect(region.classList.contains('before')).toBe(false)
  expect(region.classList.contains('after')).toBe(true)
  expect(region.getAttribute('aria-label')).toBeNull()
  expect(region.className).toContain('mp-message')
  expect(region.getAttribute('role')).toBe('alert')
})
