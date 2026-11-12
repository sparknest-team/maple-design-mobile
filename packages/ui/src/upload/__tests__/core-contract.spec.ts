import { defineComponent, h, KeepAlive, nextTick, ref } from 'vue'
import type { PropType } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useUploader } from '../composables/use-uploader'
import type { UseUploaderOptions } from '../composables/use-uploader'
import type { UploadFileItem, UploadRequestOptions } from '../interfaces'
import { uploadRequest } from '../utils/request'

const wrappers: Array<{ exists(): boolean; unmount(): void }> = []
const OriginalURL = URL
const OriginalXHR = XMLHttpRequest
let serial = 0
beforeEach(() => {
  serial = 0
  class TestURL extends OriginalURL {
    static createObjectURL = vi.fn(() => 'blob:owned-' + ++serial)
    static revokeObjectURL = vi.fn()
  }
  vi.stubGlobal('URL', TestURL)
})
afterEach(() => {
  for (const wrapper of wrappers.splice(0)) {
    if (wrapper.exists()) {
      wrapper.unmount()
    }
  }
  vi.stubGlobal('URL', OriginalURL)
  vi.stubGlobal('XMLHttpRequest', OriginalXHR)
  vi.restoreAllMocks()
})
function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((yes, no) => {
    resolve = yes
    reject = no
  })
  return { promise, resolve, reject }
}
function item(uid: string, file = new File(['x'], uid + '.txt', { type: 'text/plain' })): UploadFileItem {
  return { uid, file, name: file.name, type: file.type, size: file.size, percent: 0, status: 'ready' }
}
function host(options: UseUploaderOptions = {}, initial?: UploadFileItem[]) {
  let api!: ReturnType<typeof useUploader>
  const wrapper = mount(
    defineComponent({
      props: { modelValue: { type: Array as PropType<UploadFileItem[]>, default: undefined } },
      setup(props) {
        api = useUploader({ ...options, modelValue: () => props.modelValue })
        return () => h('div')
      },
    }),
    { props: { modelValue: initial } },
  )
  wrappers.push(wrapper)
  return { api, wrapper }
}

describe('Upload controller concurrency and ownership', () => {
  test('a refusing parent keeps a frozen file model unchanged throughout request proposals', async () => {
    let requestOptions!: UploadRequestOptions
    const frozen = Object.freeze(item('a'))
    const accepted = Object.freeze([frozen]) as unknown as UploadFileItem[]
    const proposals: UploadFileItem[][] = []
    const result = host(
      {
        customRequest: () => (options) => {
          requestOptions = options
          return {}
        },
        onUpdateModelValue: (files) => proposals.push(files),
      },
      accepted,
    )
    await result.api.submit()
    requestOptions.onSuccess({ ok: true })
    await nextTick()
    expect(frozen.status).toBe('ready')
    expect(frozen.percent).toBe(0)
    expect(result.api.getFiles()[0]).toBe(frozen)
    expect(proposals.at(-1)?.[0].status).toBe('success')
    expect(proposals.at(-1)?.[0]).not.toBe(frozen)
  })
  test('a preview lease delays owned URL revocation until its idempotent release', async () => {
    const result = host({ autoUpload: () => false })
    await result.api.addFiles([item('a').file!])
    const file = result.api.getFiles()[0]
    const release = result.api.retainUrls([file.uid])
    await result.api.remove(file)
    await nextTick()
    expect(URL.revokeObjectURL).not.toHaveBeenCalled()
    release()
    release()
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:owned-1')
    result.wrapper.unmount()
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
  })

  test('request callbacks never restore stale externally replaced metadata on the same File', async () => {
    let requestOptions!: UploadRequestOptions
    const initial = { ...item('a'), url: 'https://example.test/old' }
    const result = host(
      {
        customRequest: () => (options) => {
          requestOptions = options
          return { abort: vi.fn() }
        },
        onUpdateModelValue: (files) => {
          void result.wrapper.setProps({ modelValue: files })
        },
      },
      [initial],
    )
    await result.api.submit()
    await result.wrapper.setProps({
      modelValue: [{ ...result.api.getFiles()[0], name: 'renamed.txt', url: 'https://example.test/new' }],
    })
    requestOptions.onSuccess('ok')
    await nextTick()
    expect(result.api.getFiles()[0].name).toBe('renamed.txt')
    expect(result.api.getFiles()[0].url).toBe('https://example.test/new')
  })

  test.each(['file', 'blob'] as const)('valid beforeUpload %s replacement remains a live request', async (kind) => {
    const replacement =
      kind === 'file' ? new File(['new'], 'new.txt', { type: 'text/plain' }) : new Blob(['new'], { type: 'text/plain' })
    let requestOptions!: UploadRequestOptions
    const abort = vi.fn()
    const success = vi.fn()
    const result = host({
      defaultValue: () => [item('a')],
      beforeUpload: () => () => replacement,
      onSuccess: success,
      customRequest: () => (options) => {
        requestOptions = options
        return { abort }
      },
    })
    await result.api.submit()
    await nextTick()
    expect(abort).not.toHaveBeenCalled()
    expect(requestOptions.file.file?.size).toBe(3)
    requestOptions.onSuccess('ok')
    await nextTick()
    expect(success).toHaveBeenCalledTimes(1)
    expect(result.api.getFiles()[0].status).toBe('success')
  })
  test('concurrent controlled replacement sizes reserve the combined total', async () => {
    const request = vi.fn()
    const rejected = vi.fn()
    const result = host(
      {
        maxTotalSize: () => 3,
        beforeUpload: () => () => new File(['xx'], 'new.txt', { type: 'text/plain' }),
        customRequest: () => request,
        onRejected: rejected,
        onUpdateModelValue: (files) => {
          void result.wrapper.setProps({ modelValue: files })
        },
      },
      [item('a'), item('b')],
    )
    await result.api.submit()
    await nextTick()
    expect(request).toHaveBeenCalledTimes(1)
    expect(rejected.mock.calls.flatMap((call) => call[0]).map((file) => file.reason)).toContain('max-total-size')
    expect(result.api.getFiles().reduce((total, file) => total + (file.size ?? 0), 0)).toBeLessThanOrEqual(3)
  })
  test.each(['reset', 'disabled'] as const)(
    'a %s-interrupted removal does not lock future removal',
    async (interruption) => {
      const gate = deferred<boolean>()
      let calls = 0
      const disabled = ref(false)
      const result = host(
        { disabled: () => disabled.value, beforeRemove: () => () => (++calls === 1 ? gate.promise : true) },
        [item('a')],
      )
      const first = result.api.remove(result.api.getFiles()[0])
      if (interruption === 'reset') {
        result.api.reset()
      } else {
        disabled.value = true
      }
      gate.resolve(true)
      await first
      disabled.value = false
      await result.api.remove(result.api.getFiles()[0])
      expect(calls).toBe(2)
    },
  )

  test('KeepAlive deactivation invalidates preparation before a custom request can start', async () => {
    const shown = ref(true)
    const gate = deferred<boolean>()
    const request = vi.fn()
    let api!: ReturnType<typeof useUploader>
    const Child = defineComponent({
      setup() {
        api = useUploader({
          defaultValue: () => [item('a')],
          beforeUpload: () => () => gate.promise,
          customRequest: () => request,
        })
        return () => h('div')
      },
    })
    wrappers.push(mount({ render: () => h(KeepAlive, null, () => (shown.value ? h(Child) : null)) }))
    const submitting = api.submit()
    await flushPromises()
    shown.value = false
    await nextTick()
    gate.resolve(true)
    await submitting
    expect(request).not.toHaveBeenCalled()
    shown.value = true
    await nextTick()
    await api.submit()
    expect(request).toHaveBeenCalledTimes(1)
  })

  test('a synchronous parent abort on uploading proposal prevents the custom transport', async () => {
    const request = vi.fn()
    const result = host({
      defaultValue: () => [item('a')],
      customRequest: () => request,
      onUpdateModelValue: (files) => {
        if (files[0]?.status === 'uploading') {
          result.api.abort(files[0])
        }
      },
    })
    const api = result.api
    await api.submit()
    expect(request).not.toHaveBeenCalled()
    expect(api.getFiles()[0].status).toBe('canceled')
  })
  test('same-tick controlled state proposals compose rather than restore another file', async () => {
    const proposals: UploadFileItem[][] = []
    const request = vi.fn(() => ({ abort: vi.fn() }))
    const result = host(
      {
        customRequest: () => request,
        onUpdateModelValue: (files) => {
          proposals.push(files)
          void result.wrapper.setProps({ modelValue: files })
        },
      },
      [item('a'), item('b')],
    )
    await result.api.submit()
    await nextTick()
    expect(request).toHaveBeenCalledTimes(2)
    expect(proposals.at(-1)?.map((file) => file.status)).toEqual(['uploading', 'uploading'])
    expect(result.api.getFiles().map((file) => file.status)).toEqual(['uploading', 'uploading'])
  })
  test('serialized adds recheck the accepted list and enforce maxFiles', async () => {
    const rejected = vi.fn()
    const result = host(
      {
        autoUpload: () => false,
        maxFiles: () => 1,
        onRejected: rejected,
        onUpdateModelValue: (files) => {
          void result.wrapper.setProps({ modelValue: files })
        },
      },
      [],
    )
    await Promise.all([result.api.addFiles([item('a').file!]), result.api.addFiles([item('b').file!])])
    await nextTick()
    expect(result.api.getFiles()).toHaveLength(1)
    expect(rejected.mock.calls.flatMap((call) => call[0]).map((file) => file.reason)).toContain('max-files')
  })
  test('a rejected controlled append does not start work; later acceptance starts exactly once', async () => {
    const proposals: UploadFileItem[][] = []
    const request = vi.fn()
    const result = host({ customRequest: () => request, onUpdateModelValue: (files) => proposals.push(files) }, [])
    await result.api.addFiles([item('a').file!])
    expect(result.api.getFiles()).toEqual([])
    expect(request).not.toHaveBeenCalled()
    await result.wrapper.setProps({ modelValue: proposals[0] })
    await flushPromises()
    expect(request).toHaveBeenCalledTimes(1)
    await result.wrapper.setProps({ modelValue: [...proposals[0]] })
    await flushPromises()
    expect(request).toHaveBeenCalledTimes(1)
  })
  test('concurrent removes of one uid commit and emit once', async () => {
    const gate = deferred<boolean>()
    const removed = vi.fn()
    const changes = vi.fn()
    const result = host({
      defaultValue: () => [item('a')],
      beforeRemove: () => () => gate.promise,
      onRemove: removed,
      onChange: changes,
    })
    const file = result.api.getFiles()[0]
    const first = result.api.remove(file)
    const second = result.api.remove(file)
    gate.resolve(true)
    await Promise.all([first, second])
    expect(result.api.getFiles()).toEqual([])
    expect(removed).toHaveBeenCalledTimes(1)
    expect(changes).toHaveBeenCalledTimes(1)
  })
  test('a pending remove cannot remove an external same-uid replacement', async () => {
    const gate = deferred<boolean>()
    const removed = vi.fn()
    const old = item('a')
    const fresh = item('a', new File(['replacement'], 'new.txt', { type: 'text/plain' }))
    const result = host({ beforeRemove: () => () => gate.promise, onRemove: removed }, [old])
    const removing = result.api.remove(old)
    await result.wrapper.setProps({ modelValue: [fresh] })
    gate.resolve(true)
    await removing
    expect(result.api.getFiles()[0].file).toBe(fresh.file)
    expect(removed).not.toHaveBeenCalled()
  })
  test('old request callbacks cannot overwrite an external same-uid replacement', async () => {
    let requestOptions!: UploadRequestOptions
    const abort = vi.fn()
    const success = vi.fn()
    const proposals: UploadFileItem[][] = []
    const old = item('a')
    const fresh = item('a', new File(['new'], 'new.txt', { type: 'text/plain' }))
    const result = host(
      {
        customRequest: () => (options) => {
          requestOptions = options
          return { abort }
        },
        onSuccess: success,
        onUpdateModelValue: (files) => proposals.push(files),
      },
      [old],
    )
    await result.api.submit()
    await result.wrapper.setProps({ modelValue: [fresh] })
    const count = proposals.length
    requestOptions.onSuccess('stale')
    expect(abort).toHaveBeenCalledTimes(1)
    expect(success).not.toHaveBeenCalled()
    expect(proposals).toHaveLength(count)
    expect(result.api.getFiles()[0].file).toBe(fresh.file)
  })
  test('a late custom request handle is aborted after cancellation and its callbacks are inert', async () => {
    const gate = deferred<{ abort(): void }>()
    const abort = vi.fn()
    const success = vi.fn()
    let requestOptions!: UploadRequestOptions
    const result = host({
      defaultValue: () => [item('a')],
      onSuccess: success,
      customRequest: () => (options) => {
        requestOptions = options
        return gate.promise
      },
    })
    const uploading = result.api.submit()
    await flushPromises()
    result.api.abort()
    gate.resolve({ abort })
    await uploading
    requestOptions.onSuccess('late')
    expect(abort).toHaveBeenCalledTimes(1)
    expect(success).not.toHaveBeenCalled()
    expect(result.api.getFiles()[0].status).toBe('canceled')
  })
  test('removing a rejected proposal releases its owned URL but never an external URL', async () => {
    const proposals: UploadFileItem[][] = []
    const result = host({ autoUpload: () => false, onUpdateModelValue: (files) => proposals.push(files) }, [])
    await result.api.addFiles([item('a').file!])
    const proposal = proposals[0][0]
    expect(proposal.url).toBe('blob:owned-1')
    await result.api.remove(proposal)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:owned-1')
    await result.wrapper.setProps({ modelValue: [{ ...item('external'), url: 'blob:external' }] })
    await result.api.remove(result.api.getFiles()[0])
    result.wrapper.unmount()
    expect(URL.revokeObjectURL).not.toHaveBeenCalledWith('blob:external')
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
  })
  test('same-uid external URL replacement releases a superseded owned URL', async () => {
    const result = host(
      {
        autoUpload: () => false,
        onUpdateModelValue: (files) => {
          void result.wrapper.setProps({ modelValue: files })
        },
      },
      [],
    )
    await result.api.addFiles([item('a').file!])
    await result.wrapper.setProps({
      modelValue: [{ ...result.api.getFiles()[0], url: 'https://example.test/a', thumbnailUrl: undefined }],
    })
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:owned-1')
    result.wrapper.unmount()
    expect(URL.revokeObjectURL).not.toHaveBeenCalledWith('https://example.test/a')
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
  })
  test.each(['accept', 'max-file-size', 'max-total-size'] as const)(
    'beforeUpload replacement is revalidated: %s',
    async (reason) => {
      const request = vi.fn()
      const rejected = vi.fn()
      const replacement = new File(['too large'], 'new.bin', { type: 'application/octet-stream' })
      const result = host({
        defaultValue: () => [item('a')],
        customRequest: () => request,
        accept: () => (reason === 'accept' ? 'text/plain' : undefined),
        maxFileSize: () => (reason === 'max-file-size' ? 2 : undefined),
        maxTotalSize: () => (reason === 'max-total-size' ? 2 : undefined),
        beforeUpload: () => () => replacement,
        onRejected: rejected,
      })
      await result.api.submit()
      expect(request).not.toHaveBeenCalled()
      expect(rejected.mock.calls.flatMap((call) => call[0]).map((file) => file.reason)).toContain(reason)
    },
  )
  test('KeepAlive deactivation invalidates reading and request preparation, then permits fresh work', async () => {
    const shown = ref(true)
    const gate = deferred<boolean>()
    const read = vi.fn()
    const request = vi.fn()
    let api!: ReturnType<typeof useUploader>
    let first = true
    const Child = defineComponent({
      setup() {
        api = useUploader({
          beforeRead: () => () => {
            if (first) {
              first = false
              return gate.promise
            }
            return true
          },
          onRead: read,
          customRequest: () => request,
        })
        return () => h('div')
      },
    })
    wrappers.push(mount({ render: () => h(KeepAlive, null, () => (shown.value ? h(Child) : null)) }))
    const adding = api.addFiles([item('a').file!])
    await flushPromises()
    shown.value = false
    await nextTick()
    expect(read).not.toHaveBeenCalled()
    expect(request).not.toHaveBeenCalled()
    shown.value = true
    await nextTick()
    const fresh = api.addFiles([item('b').file!])
    await flushPromises()
    expect(read).toHaveBeenCalledTimes(1)
    expect(request).toHaveBeenCalledTimes(1)
    gate.resolve(true)
    await adding
    await fresh
    expect(read).toHaveBeenCalledTimes(1)
    expect(request).toHaveBeenCalledTimes(1)
  })
})

class FakeXHR {
  static instances: FakeXHR[] = []
  upload = { onprogress: null as ((event: ProgressEvent) => void) | null }
  onload: ((event: ProgressEvent) => void) | null = null
  onerror: ((event: ProgressEvent) => void) | null = null
  status = 200
  responseText = '{}'
  response = ''
  withCredentials = false
  open = vi.fn()
  send = vi.fn()
  abort = vi.fn()
  setRequestHeader = vi.fn()
  getResponseHeader = vi.fn(() => 'application/json')
  constructor() {
    FakeXHR.instances.push(this)
  }
}
function nativeOptions(overrides: Partial<UploadRequestOptions> = {}): UploadRequestOptions {
  return {
    file: item('a'),
    action: '/upload',
    method: 'post',
    name: 'file',
    withCredentials: false,
    onProgress: vi.fn(),
    onSuccess: vi.fn(),
    onError: vi.fn(),
    ...overrides,
  }
}
describe('Upload native request terminal and cancellation guards', () => {
  test('consumer success exceptions do not cause a second terminal error notification', async () => {
    const error = new Error('consumer success')
    const options = nativeOptions({
      onSuccess: vi.fn(() => {
        throw error
      }),
    })
    uploadRequest(options)
    await flushPromises()
    const xhr = FakeXHR.instances[0]
    expect(() => xhr.onload?.(new ProgressEvent('load'))).toThrow(error)
    expect(options.onSuccess).toHaveBeenCalledTimes(1)
    expect(options.onError).not.toHaveBeenCalled()
    xhr.onerror?.(new ProgressEvent('error'))
    expect(options.onError).not.toHaveBeenCalled()
  })
  test('consumer error exceptions are not recursively reported as another error', async () => {
    const error = new Error('consumer error')
    const options = nativeOptions({
      isSuccessResponse: () => false,
      onError: vi.fn(() => {
        throw error
      }),
    })
    uploadRequest(options)
    await flushPromises()
    expect(() => FakeXHR.instances[0].onload?.(new ProgressEvent('load'))).toThrow(error)
    expect(options.onError).toHaveBeenCalledTimes(1)
  })

  beforeEach(() => {
    FakeXHR.instances = []
    vi.stubGlobal('XMLHttpRequest', FakeXHR)
  })
  test.each(['headers', 'data', 'name'] as const)(
    'abort while %s resolves prevents xhr.open/send and callbacks',
    async (key) => {
      const gate = deferred<never>()
      const options = nativeOptions({ [key]: () => gate.promise } as Partial<UploadRequestOptions>)
      const request = uploadRequest(options)
      request.abort?.()
      gate.resolve(undefined as never)
      await flushPromises()
      const xhr = FakeXHR.instances[0]
      expect(xhr.open).not.toHaveBeenCalled()
      expect(xhr.send).not.toHaveBeenCalled()
      expect(options.onError).not.toHaveBeenCalled()
      expect(options.onSuccess).not.toHaveBeenCalled()
    },
  )
  test.each(['headers', 'data', 'name'] as const)(
    'synchronous %s hook throws become one request error',
    async (key) => {
      const error = new Error('hook failed')
      const options = nativeOptions({
        [key]: () => {
          throw error
        },
      })
      expect(() => uploadRequest(options)).not.toThrow()
      await flushPromises()
      expect(options.onError).toHaveBeenCalledTimes(1)
      expect(options.onError).toHaveBeenCalledWith(error)
      expect(FakeXHR.instances[0].send).not.toHaveBeenCalled()
    },
  )
  test('a throwing success predicate terminates through onError exactly once', async () => {
    const error = new Error('predicate failed')
    const options = nativeOptions({
      isSuccessResponse: () => {
        throw error
      },
    })
    uploadRequest(options)
    await flushPromises()
    const xhr = FakeXHR.instances[0]
    expect(() => xhr.onload?.(new ProgressEvent('load'))).not.toThrow()
    expect(options.onError).toHaveBeenCalledTimes(1)
    expect(options.onSuccess).not.toHaveBeenCalled()
    xhr.onerror?.(new ProgressEvent('error'))
    expect(options.onError).toHaveBeenCalledTimes(1)
  })
  test('success is terminal: repeated load/error/progress are ignored', async () => {
    const options = nativeOptions()
    uploadRequest(options)
    await flushPromises()
    const xhr = FakeXHR.instances[0]
    xhr.onload?.(new ProgressEvent('load'))
    xhr.onload?.(new ProgressEvent('load'))
    xhr.onerror?.(new ProgressEvent('error'))
    xhr.upload.onprogress?.(new ProgressEvent('progress'))
    expect(options.onSuccess).toHaveBeenCalledTimes(1)
    expect(options.onError).not.toHaveBeenCalled()
    expect(options.onProgress).not.toHaveBeenCalled()
  })
  test('failure is terminal: a subsequent successful load is ignored', async () => {
    const options = nativeOptions()
    uploadRequest(options)
    await flushPromises()
    const xhr = FakeXHR.instances[0]
    xhr.onerror?.(new ProgressEvent('error'))
    xhr.onload?.(new ProgressEvent('load'))
    expect(options.onError).toHaveBeenCalledTimes(1)
    expect(options.onSuccess).not.toHaveBeenCalled()
  })
})

describe('atomic file replacement', () => {
  test('replacement excludes the old file from count/total limits and invalidates its late request', async () => {
    const calls: UploadRequestOptions[] = []
    const abort = vi.fn()
    const previous = item('old')
    const result = host({
      defaultValue: () => [previous],
      maxFiles: () => 1,
      maxTotalSize: () => 3,
      customRequest: () => (request) => {
        calls.push(request)
        return { abort }
      },
    })
    await result.api.submit(previous)
    await result.api.replace(previous, new File(['new'], 'new.txt', { type: 'text/plain' }))
    await flushPromises()
    expect(result.api.getFiles()).toHaveLength(1)
    expect(result.api.getFiles()[0].name).toBe('new.txt')
    expect(abort).toHaveBeenCalledTimes(1)
    calls[0].onSuccess('late old success')
    calls[1].onSuccess('new success')
    await flushPromises()
    expect(result.api.getFiles()[0]).toMatchObject({ name: 'new.txt', status: 'success', response: 'new success' })
  })
  test('validation failure and an asynchronous removal veto preserve the original file and release prepared URLs', async () => {
    const previous = item('old')
    const guard = deferred<boolean>()
    const result = host({
      defaultValue: () => [previous],
      maxFileSize: () => 3,
      beforeRemove: () => () => guard.promise,
    })
    await result.api.replace(previous, new File(['large'], 'oversize.txt'))
    expect(result.api.getFiles()[0].uid).toBe(previous.uid)
    const replacing = result.api.replace(previous, new File(['ok'], 'ok.txt'))
    await flushPromises()
    expect(result.api.getFiles()[0].uid).toBe(previous.uid)
    guard.resolve(false)
    await replacing
    expect(result.api.getFiles()[0].uid).toBe(previous.uid)
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
  })
  test('controlled refusal keeps the original transport active and discards replacement resources', async () => {
    const previous = item('old')
    const abort = vi.fn()
    const request = vi.fn(() => ({ abort }))
    const result = host({ customRequest: () => request }, [previous])
    await result.api.submit(previous)
    await result.api.replace(previous, new File(['new'], 'new.txt'))
    await flushPromises()
    expect(result.api.getFiles()[0].uid).toBe(previous.uid)
    expect(abort).not.toHaveBeenCalled()
    expect(request).toHaveBeenCalledTimes(1)
    result.wrapper.unmount()
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
  })
  test('an externally removed target cannot be restored by a late replacement read', async () => {
    const previous = item('old')
    const read = deferred<boolean>()
    const result = host({ beforeRead: () => () => read.promise }, [previous])
    const replacing = result.api.replace(previous, new File(['new'], 'new.txt'))
    await flushPromises()
    await result.wrapper.setProps({ modelValue: [] })
    read.resolve(true)
    await replacing
    expect(result.api.getFiles()).toHaveLength(0)
  })
  test('readonly and canceled native replacement choices preserve the original file', async () => {
    let readonly = true
    const previous = item('old')
    const result = host({ defaultValue: () => [previous], readonly: () => readonly })
    await result.api.replace(previous, new File(['new'], 'new.txt'))
    expect(result.api.getFiles()[0].uid).toBe(previous.uid)
    readonly = false
    await result.api.replace(previous)
    result.api.cancelChoose()
    expect(result.api.replacementTarget.value).toBeUndefined()
    expect(result.api.getFiles()[0].uid).toBe(previous.uid)
  })
})

test.each([
  ['remove', 'disabled'],
  ['upload', 'disabled'],
  ['remove', 'readonly'],
  ['upload', 'readonly'],
] as const)('%s guard survives reset while %s', async (kind, restriction) => {
  const disabled = ref(false)
  const gate = deferred<boolean>()
  const file = item('pending')
  const request = vi.fn(() => ({}))
  const result = host({
    disabled: () => restriction === 'disabled' && disabled.value,
    readonly: () => restriction === 'readonly' && disabled.value,
    defaultValue: () => [file],
    beforeRemove: () => () => gate.promise,
    beforeUpload: () => () => gate.promise,
    customRequest: () => request,
  })
  const work = kind === 'remove' ? result.api.remove(file) : result.api.submit()
  await flushPromises()
  expect(result.api.guardPending.value).toBe(true)
  disabled.value = true
  result.api.reset()
  expect(result.api.guardPending.value).toBe(true)
  disabled.value = false
  expect(result.api.editorPending.value).toBe(true)
  gate.resolve(true)
  await work
  await flushPromises()
  expect(result.api.guardPending.value).toBe(false)
  if (kind === 'remove') {
    expect(result.api.getFiles()).toEqual([])
  } else {
    expect(request).toHaveBeenCalledTimes(1)
  }
})

test.each([
  ['add', 'disabled'],
  ['read', 'disabled'],
  ['add', 'readonly'],
  ['read', 'readonly'],
] as const)('%s preparation survives reset while %s', async (kind, restriction) => {
  const blocked = ref(false)
  const addGate = deferred<File[]>()
  const readGate = deferred<boolean>()
  const file = new File(['x'], 'pending.txt', { type: 'text/plain' })
  const result = host({
    disabled: () => restriction === 'disabled' && blocked.value,
    readonly: () => restriction === 'readonly' && blocked.value,
    autoUpload: () => false,
    beforeAdd: kind === 'add' ? () => addGate.promise : undefined,
    beforeRead: kind === 'read' ? () => () => readGate.promise : undefined,
  })
  const work = result.api.addFiles([file])
  await flushPromises()
  expect(result.api.guardPending.value).toBe(true)
  blocked.value = true
  result.api.reset()
  expect(result.api.guardPending.value).toBe(true)
  blocked.value = false
  expect(result.api.editorPending.value).toBe(true)
  if (kind === 'add') {
    addGate.resolve([file])
  } else {
    readGate.resolve(true)
  }
  await work
  await flushPromises()
  expect(result.api.guardPending.value).toBe(false)
  expect(result.api.getFiles().map((item) => item.name)).toEqual(['pending.txt'])
})

test.each(['reset', 'disabled', 'readonly'] as const)(
  'late beforeAdd rejection is ignored after %s',
  async (interruption) => {
    const blocked = ref(false)
    const gate = deferred<File[]>()
    const rejected = vi.fn()
    const result = host({
      disabled: () => interruption === 'disabled' && blocked.value,
      readonly: () => interruption === 'readonly' && blocked.value,
      beforeAdd: () => gate.promise,
      onRejected: rejected,
    })
    const work = result.api.addFiles([new File(['x'], 'pending.txt', { type: 'text/plain' })])
    await flushPromises()
    expect(result.api.guardPending.value).toBe(true)
    if (interruption === 'reset') {
      result.api.reset()
    } else {
      blocked.value = true
    }
    gate.reject(new Error('late failure'))
    await work
    await flushPromises()
    expect(rejected).not.toHaveBeenCalled()
    expect(result.api.getFiles()).toEqual([])
    expect(result.api.guardPending.value).toBe(false)
  },
)

test('active beforeAdd rejection still reports before-add exactly once', async () => {
  const gate = deferred<File[]>()
  const rejected = vi.fn()
  const result = host({ beforeAdd: () => gate.promise, onRejected: rejected })
  const file = new File(['x'], 'pending.txt', { type: 'text/plain' })
  const work = result.api.addFiles([file])
  await flushPromises()
  gate.reject(new Error('active failure'))
  await work
  await flushPromises()
  expect(rejected).toHaveBeenCalledTimes(1)
  expect(rejected.mock.calls[0][0]).toEqual([{ file, reason: 'before-add' }])
  expect(result.api.guardPending.value).toBe(false)
})

test('a stale beforeAdd rejection does not notify or clear a newer pending operation', async () => {
  const first = deferred<File[]>()
  const second = deferred<File[]>()
  const rejected = vi.fn()
  let calls = 0
  const result = host({
    beforeAdd: () => (++calls === 1 ? first.promise : second.promise),
    onRejected: rejected,
    autoUpload: () => false,
  })
  const oldWork = result.api.addFiles([new File(['x'], 'old.txt', { type: 'text/plain' })])
  await flushPromises()
  result.api.reset()
  const newFile = new File(['x'], 'new.txt', { type: 'text/plain' })
  const newWork = result.api.addFiles([newFile])
  await flushPromises()
  expect(result.api.guardPending.value).toBe(true)
  first.reject(new Error('stale'))
  await oldWork
  await flushPromises()
  expect(rejected).not.toHaveBeenCalled()
  expect(result.api.guardPending.value).toBe(true)
  second.resolve([newFile])
  await newWork
  await flushPromises()
  expect(result.api.guardPending.value).toBe(false)
  expect(result.api.getFiles().map((item) => item.name)).toEqual(['new.txt'])
})

test.each(['reactivated', 'unmounted'] as const)(
  'a beforeAdd rejection after %s does not notify',
  async (lifecycle) => {
    const shown = ref(true)
    const gate = deferred<File[]>()
    const rejected = vi.fn()
    let api!: ReturnType<typeof useUploader>
    const Child = defineComponent({
      setup() {
        api = useUploader({ beforeAdd: () => gate.promise, onRejected: rejected })
        return () => h('div')
      },
    })
    const wrapper = mount({ render: () => h(KeepAlive, null, () => (shown.value ? h(Child) : null)) })
    wrappers.push(wrapper)
    const work = api.addFiles([new File(['x'], 'pending.txt')])
    await flushPromises()
    expect(api.guardPending.value).toBe(true)
    if (lifecycle === 'unmounted') {
      wrapper.unmount()
    } else {
      shown.value = false
      await nextTick()
      shown.value = true
      await nextTick()
    }
    gate.reject(new Error('late'))
    await work
    await flushPromises()
    expect(rejected).not.toHaveBeenCalled()
    expect(api.guardPending.value).toBe(false)
  },
)

test.each(['rejected', 'exceed'] as const)('reset from %s stops the old mixed preparation', async (callback) => {
  const read = vi.fn()
  const exceeded = vi.fn(() => {
    if (callback === 'exceed') {
      result.api.reset()
    }
  })
  const rejected = vi.fn(() => {
    if (callback === 'rejected') {
      result.api.reset()
    }
  })
  const result = host({
    maxFiles: () => 1,
    autoUpload: () => false,
    onRejected: rejected,
    onExceed: exceeded,
    onRead: read,
  })
  const files = [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')]
  await result.api.addFiles(files)
  await flushPromises()
  expect(rejected).toHaveBeenCalledTimes(1)
  expect(exceeded).toHaveBeenCalledTimes(callback === 'rejected' ? 0 : 1)
  expect(read).not.toHaveBeenCalled()
  expect(result.api.getFiles()).toEqual([])
  expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1)
})

test.each(['update', 'change'] as const)('reset from %s stops stale queue notifications and read', async (callback) => {
  const changes: number[] = []
  const read = vi.fn()
  const result = host({
    autoUpload: () => false,
    onUpdateModelValue: (files) => {
      if (callback === 'update' && files.length) {
        result.api.reset()
      }
    },
    onChange: (files) => {
      changes.push(files.length)
      if (callback === 'change' && files.length) {
        result.api.reset()
      }
    },
    onRead: read,
  })
  await result.api.addFiles([new File(['a'], 'a.txt')])
  await flushPromises()
  expect(result.api.getFiles()).toEqual([])
  expect(changes).toEqual(callback === 'update' ? [0] : [1, 0])
  expect(read).not.toHaveBeenCalled()
})

test('reset during the first read stops notifications for the rest of the batch', async () => {
  const read = vi.fn(() => result.api.reset())
  const result = host({ autoUpload: () => false, onRead: read })
  await result.api.addFiles([new File(['a'], 'a.txt'), new File(['b'], 'b.txt')])
  await flushPromises()
  expect(read).toHaveBeenCalledTimes(1)
  expect(result.api.getFiles()).toEqual([])
})

test('reset during an unaccepted controlled proposal suppresses its old change', async () => {
  const change = vi.fn()
  const read = vi.fn()
  const result = host(
    {
      autoUpload: () => false,
      onUpdateModelValue: (files) => {
        if (files.length) {
          result.api.reset()
        }
      },
      onChange: change,
      onRead: read,
    },
    [],
  )
  await result.api.addFiles([new File(['a'], 'a.txt')])
  await flushPromises()
  expect(result.api.getFiles()).toEqual([])
  expect(change).not.toHaveBeenCalled()
  expect(read).not.toHaveBeenCalled()
})

test.each(['disabled', 'unmounted'] as const)(
  'update callback %s preserves committed change unless unmounted',
  async (lifecycle) => {
    const disabled = ref(false)
    const change = vi.fn()
    const read = vi.fn()
    const result = host({
      autoUpload: () => false,
      disabled: () => disabled.value,
      onUpdateModelValue: (files) => {
        if (!files.length) {
          return
        }
        if (lifecycle === 'disabled') {
          disabled.value = true
        } else {
          result.wrapper.unmount()
        }
      },
      onChange: change,
      onRead: read,
    })
    await result.api.addFiles([new File(['a'], 'a.txt')])
    await flushPromises()
    expect(change).toHaveBeenCalledTimes(lifecycle === 'disabled' ? 1 : 0)
    expect(read).not.toHaveBeenCalled()
  },
)
