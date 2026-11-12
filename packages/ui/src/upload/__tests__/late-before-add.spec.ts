import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'

test.each(['reset', 'disabled'] as const)(
  'a late beforeAdd error after %s does not reach the component',
  async (interruption) => {
    let reject!: (reason: Error) => void
    const beforeAdd = vi.fn(
      () =>
        new Promise<File[]>((_resolve, rejectPromise) => {
          reject = rejectPromise
        }),
    )
    const wrapper = mount(Upload, { props: { editMode: 'direct', autoUpload: false, beforeAdd } })
    try {
      const input = wrapper.get('input[type="file"]')
      Object.defineProperty(input.element, 'files', { configurable: true, value: [new File(['x'], 'test.txt')] })
      await input.trigger('change')
      await flushPromises()
      expect(wrapper.get('.mp-upload').attributes('aria-busy')).toBe('true')
      if (interruption === 'reset') {
        await wrapper.vm.reset()
      } else {
        await wrapper.setProps({ disabled: true })
      }
      reject(new Error('late'))
      await flushPromises()
      expect(wrapper.emitted('rejected')).toBeUndefined()
      expect(wrapper.vm.getFiles()).toEqual([])
      expect(wrapper.get('.mp-upload').attributes('aria-busy')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  },
)
