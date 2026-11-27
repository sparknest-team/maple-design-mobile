import { h, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Popup from '../Popup.vue'
import type { PopupCloseReason } from '../props'

it('keeps uncontrolled popup closed when a close guard is added or removed', async () => {
  const owner = mount(Popup, { attachTo: document.body, props: { defaultOpen: true, popupContainer: false } })
  try {
    expect(await owner.vm.close()).toBe(true)
    await nextTick()
    expect(owner.get('[role=dialog]').isVisible()).toBe(false)
    await owner.setProps({ beforeClose: () => true })
    await flushPromises()
    expect(owner.get('[role=dialog]').isVisible()).toBe(false)
    await owner.setProps({ beforeClose: undefined })
    await flushPromises()
    expect(owner.get('[role=dialog]').isVisible()).toBe(false)
    expect(owner.emitted('open')).toHaveLength(1)
  } finally {
    owner.unmount()
  }
})

it('keeps a controlled popup open until its parent accepts a close request', async () => {
  const owner = mount(Popup, { attachTo: document.body, props: { open: true, popupContainer: false } })
  try {
    await owner.vm.close()
    await nextTick()
    expect(owner.emitted('update:open')?.at(-1)).toEqual([false])
    expect(owner.get('[role=dialog]').isVisible()).toBe(true)
    await owner.setProps({ beforeClose: () => true })
    expect(owner.get('[role=dialog]').isVisible()).toBe(true)
    await owner.setProps({ beforeClose: undefined })
    await owner.setProps({ open: false })
    expect(owner.get('[role=dialog]').isVisible()).toBe(false)
  } finally {
    owner.unmount()
  }
})

it.each(['overlay', 'escape', 'route', 'swipe', 'close', 'api', 'model'] as PopupCloseReason[])(
  'awaits and vetoes %s without closing',
  async (reason) => {
    let settle!: (value: boolean) => void
    const check = vi.fn(
      () =>
        new Promise<boolean>((resolve) => {
          settle = resolve
        }),
    )
    const owner = mount(Popup, { props: { open: true, popupContainer: false, beforeClose: check } })
    const result = owner.vm.requestClose(reason)
    expect(owner.vm.pending).toBe(true)
    expect(owner.emitted('update:open')).toBeUndefined()
    expect(await owner.vm.requestClose('api')).toBe(false)
    expect(check).toHaveBeenCalledTimes(1)
    settle(false)
    expect(await result).toBe(false)
    expect(owner.vm.pending).toBe(false)
    owner.unmount()
  },
)
it('intercepts actual overlay, Escape, route, slot button, instance and external model requests', async () => {
  const check = vi.fn((_payload: { reason: PopupCloseReason }) => false)
  const owner = mount(Popup, {
    attachTo: document.body,
    props: { open: true, popupContainer: false, beforeClose: check, closeOnRouteChange: true },
    slots: { default: ({ close }: any) => h('button', { onClick: (event: Event) => close('close', event) }, 'close') },
  })
  const overlay = owner.get('.mp-popup__overlay')
  await overlay.trigger('pointerdown')
  await overlay.trigger('click')
  await flushPromises()
  expect(check.mock.calls.at(-1)?.[0]).toEqual({ reason: 'overlay' })
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await flushPromises()
  expect(check.mock.calls.at(-1)?.[0]).toEqual({ reason: 'escape' })
  window.dispatchEvent(new Event('popstate'))
  await flushPromises()
  expect(check.mock.calls.at(-1)?.[0]).toEqual({ reason: 'route' })
  await owner.get('button').trigger('click')
  await flushPromises()
  expect(check.mock.calls.at(-1)?.[0]).toEqual({ reason: 'close' })
  await owner.vm.close()
  expect(check.mock.calls.at(-1)?.[0]).toEqual({ reason: 'api' })
  await owner.setProps({ open: false })
  await flushPromises()
  expect(check.mock.calls.at(-1)?.[0]).toEqual({ reason: 'model' })
  expect(owner.emitted('update:open')?.at(-1)).toEqual([true])
  expect(owner.get('[role="dialog"]').isVisible()).toBe(true)
  owner.unmount()
})
it('errors preserve the popup and stale approvals cannot close a reopened instance', async () => {
  const error = new Error('blocked')
  const owner = mount(Popup, {
    props: {
      open: true,
      popupContainer: false,
      beforeClose: () => {
        throw error
      },
    },
  })
  expect(await owner.vm.close()).toBe(false)
  expect(owner.emitted('close-error')?.[0]).toEqual([error, 'api'])
  let settle!: (value: boolean) => void
  await owner.setProps({
    beforeClose: () =>
      new Promise<boolean>((resolve) => {
        settle = resolve
      }),
  })
  const request = owner.vm.close()
  await owner.setProps({ open: false })
  await owner.setProps({ open: true })
  expect(await request).toBe(false)
  settle(true)
  await nextTick()
  expect(owner.emitted('update:open')?.some((args) => args[0] === false)).not.toBe(true)
  owner.unmount()
})
