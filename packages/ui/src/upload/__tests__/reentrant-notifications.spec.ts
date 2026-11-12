import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import Upload from '..'
import type { UploadFileItem, UploadRequestOptions } from '../interfaces'

function initial(): UploadFileItem {
  const file = new File(['a'], 'a.txt', { type: 'text/plain' })
  return { uid: 'a', file, name: file.name, size: file.size, type: file.type, status: 'ready', percent: 0 }
}

test.each(
  (['progress', 'success', 'error', 'remove'] as const).flatMap((kind) =>
    (['reset', 'unmount', 'none'] as const).map((interruption) => [kind, interruption] as const),
  ),
)('%s notification after %s', async (kind, interruption) => {
  let request!: UploadRequestOptions
  const notify = vi.fn()
  let interrupted = false
  const wrapper = mount(Upload, {
    props: {
      editMode: 'direct',
      autoUpload: false,
      defaultValue: [initial()],
      customRequest: (options) => {
        request = options
        return {}
      },
      onProgress: kind === 'progress' ? notify : undefined,
      onSuccess: kind === 'success' ? notify : undefined,
      onError: kind === 'error' ? notify : undefined,
      onRemove: kind === 'remove' ? notify : undefined,
      'onUpdate:modelValue': (files) => {
        const file = files?.[0]
        const matches =
          kind === 'progress'
            ? file?.status === 'uploading' && file.percent === 30
            : kind === 'success'
              ? file?.status === 'success'
              : kind === 'error'
                ? file?.status === 'error'
                : files?.length === 0
        if (matches && !interrupted) {
          interrupted = true
          if (interruption === 'reset') {
            wrapper.vm.reset()
          } else if (interruption === 'unmount') {
            wrapper.unmount()
          }
        }
      },
    },
  })
  try {
    if (kind === 'remove') {
      await wrapper.vm.remove(wrapper.vm.getFiles()[0])
    } else {
      await wrapper.vm.submit()
      if (kind === 'progress') {
        request.onProgress(Object.assign(new ProgressEvent('progress'), { percent: 30 }))
      }
      if (kind === 'success') {
        request.onSuccess('ok')
      }
      if (kind === 'error') {
        request.onError(new Error('failed'))
      }
    }
    expect(interrupted).toBe(true)
    expect(notify).toHaveBeenCalledTimes(interruption === 'none' ? 1 : 0)
    if (interruption === 'reset') {
      expect(wrapper.vm.getFiles()).toEqual([])
    }
  } finally {
    if (interruption !== 'unmount' || !interrupted) {
      wrapper.unmount()
    }
  }
})
