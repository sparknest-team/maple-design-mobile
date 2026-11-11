import { h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Popup from '../../popup'
import SwipeCell from '../../swipe-cell'
import TabBar, { TabBarItem } from '../../tab-bar'

const task = () => {
  let resolve!: (v: boolean) => void
  let reject!: (e: unknown) => void
  const promise = new Promise<boolean>((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
test('Popup manual loading and before-close share feedback but not model changes', async () => {
  const gate = task()
  const beforeClose = vi.fn(() => gate.promise)
  const w = mount(Popup, {
    props: { defaultOpen: true, loading: true, beforeClose, popupContainer: false },
    global: { stubs: { teleport: true } },
  })
  try {
    expect(w.find('.mp-pending-feedback').exists()).toBe(true)
    expect(await w.vm.requestClose()).toBe(false)
    expect(beforeClose).not.toHaveBeenCalled()
    await w.setProps({ loading: false })
    const work = w.vm.requestClose()
    await flushPromises()
    expect(w.find('[role="dialog"]').attributes('aria-busy')).toBe('true')
    expect(w.find('.mp-pending-feedback').exists()).toBe(true)
    gate.resolve(false)
    expect(await work).toBe(false)
    await flushPromises()
    expect(w.find('.mp-pending-feedback').exists()).toBe(false)
  } finally {
    w.unmount()
  }
})
test('SwipeCell recovers on rejected hook and ignores repeated close requests', async () => {
  const gate = task()
  const beforeClose = vi.fn(() => gate.promise)
  const w = mount(SwipeCell, { props: { rightWidth: 80, beforeClose }, slots: { default: 'Cell', right: 'Delete' } })
  try {
    w.vm.open('right')
    const work = w.vm.close()
    await flushPromises()
    expect(w.attributes('aria-busy')).toBe('true')
    expect(w.find('.mp-pending-feedback').exists()).toBe(true)
    await w.vm.close()
    expect(beforeClose).toHaveBeenCalledTimes(1)
    const error = new Error('not allowed')
    gate.reject(error)
    await work
    await flushPromises()
    expect(w.attributes('aria-busy')).toBeUndefined()
    expect(w.emitted('guard-error')?.[0]?.[0]).toBe(error)
    expect(w.emitted('close')).toBeUndefined()
  } finally {
    w.unmount()
  }
})
test('TabBar shows pending feedback without committing, and external loading blocks switching', async () => {
  const gate = task()
  const beforeChange = vi.fn(() => gate.promise)
  const w = mount(TabBar, {
    props: { defaultValue: 'a', beforeChange },
    slots: { default: () => [h(TabBarItem, { name: 'a', label: 'A' }), h(TabBarItem, { name: 'b', label: 'B' })] },
  })
  try {
    await flushPromises()
    const target = w.findAll('.mp-tab-bar-item')[1]
    await target.trigger('click')
    await flushPromises()
    expect(w.find('.mp-pending-feedback').exists()).toBe(true)
    expect(w.emitted('change')).toBeUndefined()
    await target.trigger('click')
    expect(beforeChange).toHaveBeenCalledTimes(1)
    gate.resolve(false)
    await flushPromises()
    expect(w.find('.mp-pending-feedback').exists()).toBe(false)
    await w.setProps({ loading: true })
    await target.trigger('click')
    expect(beforeChange).toHaveBeenCalledTimes(1)
    expect(target.attributes('disabled')).toBeDefined()
    expect(w.find('.mp-pending-feedback').exists()).toBe(true)
  } finally {
    w.unmount()
  }
})
