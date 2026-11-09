import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import Upload from '..'
import type { UploadBeforeUpload, UploadFileItem, UploadRequestOptions } from '../interfaces'

const owners: ReturnType<typeof mount>[] = []
afterEach(() => owners.splice(0).forEach((owner) => owner.unmount()))
function fixture(beforeUpload: UploadBeforeUpload) {
  const file = new File(['payload'], 'a.txt', { type: 'text/plain' })
  const item: UploadFileItem = {
    uid: 'a',
    file,
    name: file.name,
    type: file.type,
    size: file.size,
    status: 'ready',
    percent: 0,
  }
  const customRequest = vi.fn((options: UploadRequestOptions) => {
    options.onSuccess('accepted')
    return {}
  })
  const onError = vi.fn(() => new Promise(() => {}))
  const owner = mount(Upload, {
    props: { autoUpload: false, defaultValue: [item], beforeUpload, customRequest, onError },
  })
  owners.push(owner)
  return { owner, customRequest, onError }
}
for (const asynchronous of [false, true]) {
  test(`beforeUpload ${asynchronous ? 'resolved' : 'returned'} false is a retryable veto without an error`, async () => {
    const hook = vi.fn(() => (asynchronous ? Promise.resolve(false) : false))
    const { owner, customRequest, onError } = fixture(hook)
    await owner.vm.submit()
    await flushPromises()
    expect(owner.vm.getFiles()[0].status).toBe('ready')
    expect(customRequest).not.toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
    expect(owner.emitted('error')).toBeUndefined()
    expect(owner.emitted('rejected')).toBeUndefined()
    await owner.setProps({ beforeUpload: () => true })
    await owner.vm.submit()
    await flushPromises()
    expect(customRequest).toHaveBeenCalledTimes(1)
    expect(owner.vm.getFiles()[0].status).toBe('success')
  })
  test(`beforeUpload ${asynchronous ? 'reject' : 'throw'} reports the original preparation error once and permits retry`, async () => {
    const cause = new Error('preparation failed')
    const hook = () => {
      if (asynchronous) {
        return Promise.reject(cause)
      }
      throw cause
    }
    const { owner, customRequest, onError } = fixture(hook)
    await owner.vm.submit()
    await flushPromises()
    const item = owner.vm.getFiles()[0]
    expect(item.status).toBe('error')
    expect(item.error).toBe(cause)
    expect(customRequest).not.toHaveBeenCalled()
    expect(owner.emitted('error')).toHaveLength(1)
    expect(owner.emitted('error')?.[0][0]).toEqual(item)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(owner.emitted('rejected')).toBeUndefined()
    await owner.setProps({ beforeUpload: () => true })
    await owner.vm.submit()
    await flushPromises()
    expect(customRequest).toHaveBeenCalledTimes(1)
    expect(owner.vm.getFiles()[0].status).toBe('success')
    expect(owner.emitted('error')).toHaveLength(1)
  })
}
