import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Dialog from '../Dialog.vue'

test('a footerless close guard has visible feedback, blocks reentry and recovers', async () => {
  let resolve!: (v: boolean) => void
  const hook = vi.fn(
    () =>
      new Promise<boolean>((yes) => {
        resolve = yes
      }),
  )
  const w = mount(Dialog, {
    props: { defaultOpen: true, footer: false, beforeClose: hook, popupContainer: false },
    global: { stubs: { teleport: true } },
  })
  try {
    const close = w.find('button[aria-label]')
    await close.trigger('click')
    await flushPromises()
    expect(hook).toHaveBeenCalledTimes(1)
    expect(w.find('[role="dialog"]').attributes('aria-busy')).toBe('true')
    expect(w.find('.mp-pending-feedback').exists()).toBe(true)
    await close.trigger('click')
    expect(hook).toHaveBeenCalledTimes(1)
    resolve(false)
    await flushPromises()
    expect(w.find('[role="dialog"]').attributes('aria-busy')).toBeUndefined()
    expect(w.find('.mp-pending-feedback').exists()).toBe(false)
  } finally {
    w.unmount()
  }
})
