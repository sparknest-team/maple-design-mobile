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
