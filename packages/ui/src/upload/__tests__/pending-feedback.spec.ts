import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'
import type { UploadFileItem } from '../interfaces'

const task = () => {
  let resolve!: (v: any) => void
  const promise = new Promise<any>((yes) => {
    resolve = yes
  })
  return { promise, resolve }
}
test.each(['beforeAdd', 'beforeRead', 'beforeUpload', 'beforeRemove'])(
  '%s has visible pending and restores after rejection',
  async (key) => {
    const gate = task()
    const hook = vi.fn(() => gate.promise)
    const file = new File(['a'], 'a.txt', { type: 'text/plain' })
    const initial: UploadFileItem = { uid: 'file-a', name: 'a.txt', file, status: 'ready', percent: 0 }
    const w = mount(Upload, {
      props: {
        [key]: hook,
        autoUpload: false,
        customRequest: () => undefined,
        ...(key === 'beforeUpload' || key === 'beforeRemove' ? { defaultValue: [initial] } : {}),
      },
    })
    try {
      let work
      if (key === 'beforeRemove') {
        work = w.vm.remove(initial)
      } else if (key === 'beforeUpload') {
        work = w.vm.submit()
      } else {
        const input = w.get('input[type="file"]')
        Object.defineProperty(input.element, 'files', { configurable: true, value: [file] })
        await input.trigger('change')
      }
      await flushPromises()
      expect(hook).toHaveBeenCalledTimes(1)
      expect(w.find('.mp-pending-feedback').exists()).toBe(true)
      gate.resolve(key === 'beforeAdd' ? [] : false)
      await work
      await flushPromises()
      expect(w.find('.mp-pending-feedback').exists()).toBe(false)
      expect(w.emitted('success')).toBeUndefined()
    } finally {
      w.unmount()
    }
  },
)
