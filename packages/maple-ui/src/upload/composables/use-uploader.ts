import { computed, nextTick, onActivated, onBeforeUnmount, onDeactivated, reactive, watch } from 'vue'
import type {
  UploadBeforeRead,
  UploadBeforeRemove,
  UploadBeforeUpload,
  UploadCapture,
  UploadCreateThumbnailUrl,
  UploadCustomRequest,
  UploadData,
  UploadFileItem,
  UploadHeaders,
  UploadIsSuccessResponse,
  UploadListType,
  UploadRejectedFile,
  UploadRequest,
  UploadResolveType,
} from '../interfaces'
import { isAcceptedFile } from '../utils/accept'
import { uploadRequest } from '../utils/request'
import { resolveThumbnailUrl } from '../utils/thumbnail'
import { createUploadUid } from '../utils/uid'
import { useFilePicker } from './use-file-picker'
import { useUploadQueue } from './use-upload-queue'

export interface UseUploaderOptions {
  modelValue?: () => UploadFileItem[] | undefined
  defaultValue?: () => UploadFileItem[] | undefined
  accept?: () => string | undefined
  capture?: () => UploadCapture
  multiple?: () => boolean
  directory?: () => boolean
  draggable?: () => boolean
  disabled?: () => boolean
  readonly?: () => boolean
  action?: () => string | undefined
  method?: () => string
  headers?: () => UploadHeaders | undefined
  data?: () => UploadData | undefined
  name?: () => string | ((file: UploadFileItem) => string)
  withCredentials?: () => boolean
  customRequest?: () => UploadCustomRequest | undefined
  autoUpload?: () => boolean
  maxFiles?: () => number | undefined
  maxFileSize?: () => number | undefined
  maxTotalSize?: () => number | undefined
  resolveType?: () => UploadResolveType
  createThumbnailUrl?: () => UploadCreateThumbnailUrl | undefined
  beforeAdd?: (files: File[]) => File[] | Promise<File[]>
  beforeRead?: () => UploadBeforeRead | undefined
  onRead?: (file: UploadFileItem) => void
  beforeUpload?: () => UploadBeforeUpload | undefined
  beforeRemove?: () => UploadBeforeRemove | undefined
  isSuccessResponse?: () => UploadIsSuccessResponse | undefined
  onUpdateModelValue?: (files: UploadFileItem[]) => void
  onChange?: (files: UploadFileItem[], file?: UploadFileItem) => void
  onRejected?: (files: UploadRejectedFile[]) => void
  onExceed?: (files: File[], fileList: UploadFileItem[]) => void
  onProgress?: (file: UploadFileItem, event?: ProgressEvent) => void
  onSuccess?: (file: UploadFileItem) => void
  onError?: (file: UploadFileItem) => void
  onRemove?: (file: UploadFileItem) => void
  onPreview?: (file: UploadFileItem, event: import('../interfaces').UploadPreviewEvent) => void
  listType?: () => UploadListType
}

export function useUploader(options: UseUploaderOptions) {
  let active = true
  let inactive = false
  let generation = 0
  let adding = Promise.resolve()
  const owned = new Map<string, string>()
  const leases = new Map<string, number>()
  const deferredRelease = new Set<string>()
  const accepted = new Set<string>()
  const pendingAuto = new Set<string>()
  const attempts = new Map<string, { request?: UploadRequest; resolvedFile?: File; reservedSize?: number }>()
  const removals = new Map<string, object>()
  const identities = new Map<string, File | undefined>()
  const disabled = computed(() => !active || inactive || Boolean(options.disabled?.() || options.readonly?.()))
  const queue = useUploadQueue({
    modelValue: options.modelValue,
    defaultValue: options.defaultValue,
    onChange: options.onChange,
    onUpdateModelValue: options.onUpdateModelValue,
  })
  const picker = useFilePicker({
    accept: options.accept,
    directory: options.directory,
    disabled: () => disabled.value,
    onFiles: addFiles,
  })
  const maxReached = computed(
    () => (options.maxFiles?.() ?? 0) > 0 && queue.fileList.value.length >= options.maxFiles!()!,
  )
  const valid = (epoch: number) => active && generation === epoch && !disabled.value
  function release(uid: string) {
    if (leases.get(uid)) {
      deferredRelease.add(uid)
      return
    }
    deferredRelease.delete(uid)
    const url = owned.get(uid)
    if (url) {
      URL.revokeObjectURL(url)
    }
    owned.delete(uid)
  }
  function retainUrls(uids: string[]) {
    uids.forEach((uid) => leases.set(uid, (leases.get(uid) ?? 0) + 1))
    let released = false
    return () => {
      if (released) {
        return
      }
      released = true
      uids.forEach((uid) => {
        leases.set(uid, Math.max(0, (leases.get(uid) ?? 0) - 1))
        if (deferredRelease.has(uid)) {
          release(uid)
        }
      })
    }
  }
  function cancelAttempt(uid: string) {
    const attempt = attempts.get(uid)
    attempts.delete(uid)
    try {
      attempt?.request?.abort?.()
    } catch {
      /* An abort failure cannot resurrect an obsolete attempt. */
    }
  }
  watch(
    () => queue.fileList.value.map((file) => [file.uid, file.file, file.url, file.thumbnailUrl] as const),
    (entries) => {
      const uids = entries.map(([uid]) => uid)
      if (!active) {
        return
      }
      for (const uid of accepted) {
        if (!uids.includes(uid)) {
          cancelAttempt(uid)
          release(uid)
          pendingAuto.delete(uid)
          accepted.delete(uid)
          identities.delete(uid)
          removals.delete(uid)
        }
      }
      for (const file of queue.fileList.value) {
        if (
          identities.has(file.uid) &&
          identities.get(file.uid) !== file.file &&
          attempts.get(file.uid)?.resolvedFile !== file.file
        ) {
          cancelAttempt(file.uid)
          removals.delete(file.uid)
        }
        if (
          accepted.has(file.uid) &&
          owned.has(file.uid) &&
          file.url !== owned.get(file.uid) &&
          file.thumbnailUrl !== owned.get(file.uid)
        ) {
          release(file.uid)
        }
        identities.set(file.uid, file.file)
        accepted.add(file.uid)
        if (
          pendingAuto.delete(file.uid) &&
          options.autoUpload?.() !== false &&
          (options.action?.() || options.customRequest?.())
        ) {
          void submit(file)
        }
      }
    },
    { immediate: true, flush: 'post' },
  )
  function reject(files: UploadRejectedFile[]) {
    if (active && files.length) {
      options.onRejected?.(files)
    }
  }
  function addFiles(files: File[], initialRejected: UploadRejectedFile[] = []) {
    const epoch = generation
    adding = adding.then(() => prepareFiles(files, initialRejected, epoch)).catch(() => {})
    return adding
  }
  async function prepareFiles(files: File[], initialRejected: UploadRejectedFile[], epoch: number) {
    if (!valid(epoch)) {
      return
    }
    const rejected = [...initialRejected]
    let candidates = files
    if (options.beforeAdd) {
      try {
        candidates = await options.beforeAdd(files)
        for (const file of files) {
          if (!candidates.includes(file)) {
            rejected.push({ file, reason: 'before-add' })
          }
        }
      } catch {
        reject([...rejected, ...files.map((file) => ({ file, reason: 'before-add' as const }))])
        return
      }
    }
    if (!valid(epoch)) {
      return
    }
    const items: UploadFileItem[] = []
    for (const original of candidates) {
      if (!valid(epoch)) {
        break
      }
      let file = original
      try {
        const result = await options.beforeRead?.()?.(file)
        if (result === false) {
          rejected.push({ file, reason: 'before-read' })
          continue
        }
        if (typeof File !== 'undefined' && result instanceof File) {
          file = result
        }
      } catch {
        rejected.push({ file, reason: 'before-read' })
        continue
      }
      if (!valid(epoch)) {
        break
      }
      let reason: UploadRejectedFile['reason'] | undefined
      const total = [...queue.fileList.value, ...items].reduce((sum, item) => sum + (item.size ?? 0), 0)
      if (!isAcceptedFile(file, options.accept?.())) {
        reason = 'accept'
      } else if (options.maxFileSize?.() !== undefined && file.size > options.maxFileSize!()!) {
        reason = 'max-file-size'
      } else if (options.maxTotalSize?.() !== undefined && total + file.size > options.maxTotalSize!()!) {
        reason = 'max-total-size'
      } else if (
        (options.maxFiles?.() ?? 0) > 0 &&
        queue.fileList.value.length + items.length >= options.maxFiles!()!
      ) {
        reason = 'max-files'
      }
      if (reason) {
        rejected.push({ file, reason })
        continue
      }
      const item: UploadFileItem = {
        uid: createUploadUid(),
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        status: 'ready',
        percent: 0,
      }
      try {
        const url = await resolveThumbnailUrl({
          file,
          fileItem: item,
          resolveType: options.resolveType?.() ?? 'object-url',
          createThumbnailUrl: options.createThumbnailUrl?.(),
          onOwnedUrl: (url) => owned.set(item.uid, url),
        })
        if (!valid(epoch)) {
          release(item.uid)
          break
        }
        item.url = url
        if (file.type.startsWith('image/')) {
          item.thumbnailUrl = url
        }
        items.push(item)
      } catch {
        release(item.uid)
        rejected.push({ file, reason: 'read-error' })
      }
    }
    if (!valid(epoch)) {
      items.forEach((item) => release(item.uid))
      return
    }
    reject(rejected)
    if (rejected.some((file) => file.reason === 'max-files')) {
      options.onExceed?.(candidates, queue.fileList.value)
    }
    if (!items.length) {
      return
    }
    items.forEach((file) => pendingAuto.add(file.uid))
    queue.append(items)
    items.forEach((file) => options.onRead?.(reactive(file)))
    await nextTick()
  }
  async function submit(file?: UploadFileItem) {
    if (disabled.value || !(options.action?.() || options.customRequest?.())) {
      return
    }
    const targets = file
      ? queue.fileList.value.filter((item) => item.uid === file.uid)
      : queue.fileList.value.filter((item) => ['ready', 'error', 'canceled'].includes(item.status))
    await Promise.all(targets.map(uploadFile))
  }
  async function uploadFile(file: UploadFileItem) {
    if (attempts.has(file.uid)) {
      return
    }
    const attempt: { request?: UploadRequest; resolvedFile?: File; reservedSize?: number } = {}
    attempts.set(file.uid, attempt)
    const current = () =>
      active &&
      !inactive &&
      attempts.get(file.uid) === attempt &&
      queue.fileList.value.some(
        (entry) => entry.uid === file.uid && (entry.file === file.file || entry.file === item.file),
      )
    let item = file
    try {
      const result = await options.beforeUpload?.()?.(file)
      if (!current() || disabled.value) {
        if (attempts.get(file.uid) === attempt) {
          cancelAttempt(file.uid)
        }
        return
      }
      if (result === false) {
        attempts.delete(file.uid)
        return
      }
      if (typeof Blob !== 'undefined' && result instanceof Blob) {
        const raw = result instanceof File ? result : new File([result], file.name ?? 'file', { type: result.type })
        const total = queue.fileList.value
          .filter((entry) => entry.uid !== file.uid)
          .reduce((sum, entry) => sum + (attempts.get(entry.uid)?.reservedSize ?? entry.size ?? 0), 0)
        const reason = !isAcceptedFile(raw, options.accept?.())
          ? 'accept'
          : options.maxFileSize?.() !== undefined && raw.size > options.maxFileSize!()!
            ? 'max-file-size'
            : options.maxTotalSize?.() !== undefined && total + raw.size > options.maxTotalSize!()!
              ? 'max-total-size'
              : undefined
        if (reason) {
          attempts.delete(file.uid)
          reject([{ file: raw, reason }])
          return
        }
        attempt.resolvedFile = raw
        attempt.reservedSize = raw.size
        item = { ...file, file: raw, size: raw.size, type: raw.type }
      }
      queue.patch(file.uid, { ...item, status: 'uploading', percent: 0, error: undefined })
      if (!current() || disabled.value) {
        if (attempts.get(file.uid) === attempt) {
          cancelAttempt(file.uid)
        }
        return
      }
      const handleProgress = (event: import('../interfaces').UploadProgressEvent) => {
        if (!current()) {
          return
        }
        const changed = { ...item, status: 'uploading' as const, percent: event.percent }
        queue.patch(file.uid, { status: changed.status, percent: changed.percent })
        options.onProgress?.(changed, event)
      }
      const handleSuccess = (response?: unknown) => {
        if (!current()) {
          return
        }
        attempts.delete(file.uid)
        const changed = { ...item, status: 'success' as const, percent: 100, response }
        queue.patch(file.uid, { status: changed.status, percent: changed.percent, response })
        options.onSuccess?.(changed)
      }
      const handleError = (error?: unknown) => {
        if (!current()) {
          return
        }
        attempts.delete(file.uid)
        const changed = { ...item, status: 'error' as const, percent: 0, error }
        queue.patch(file.uid, { status: changed.status, percent: changed.percent, error })
        options.onError?.(changed)
      }
      const requestOptions = {
        action: options.action?.(),
        method: options.method?.() ?? 'post',
        headers: options.headers?.(),
        data: options.data?.(),
        name: options.name?.() ?? 'file',
        withCredentials: Boolean(options.withCredentials?.()),
        isSuccessResponse: options.isSuccessResponse?.(),
        file: item,
        onProgress: handleProgress,
        onSuccess: handleSuccess,
        onError: handleError,
      }
      const request = await (options.customRequest?.()?.(requestOptions) ??
        (options.customRequest?.() ? undefined : uploadRequest(requestOptions)))
      if (request) {
        if (current()) {
          attempt.request = request
        } else {
          try {
            request.abort?.()
          } catch {
            /* Obsolete transport is already detached. */
          }
        }
      }
    } catch (error) {
      if (!current()) {
        return
      }
      attempts.delete(file.uid)
      const changed = { ...item, status: 'error' as const, percent: 0, error }
      queue.patch(file.uid, changed)
      options.onError?.(changed)
    }
  }
  function abort(file?: UploadFileItem) {
    if (disabled.value) {
      return
    }
    const targets = file ? [file.uid] : [...attempts.keys()]
    targets.forEach((uid) => {
      pendingAuto.delete(uid)
      cancelAttempt(uid)
      queue.patch(uid, { status: 'canceled', percent: 0 })
    })
  }
  async function remove(file: UploadFileItem) {
    if (disabled.value || removals.has(file.uid)) {
      return
    }
    if (!queue.fileList.value.some((item) => item.uid === file.uid)) {
      pendingAuto.delete(file.uid)
      release(file.uid)
      return
    }
    const token = {}
    removals.set(file.uid, token)
    const epoch = generation
    try {
      if ((await options.beforeRemove?.()?.(file, queue.fileList.value)) === false) {
        return
      }
      if (
        !valid(epoch) ||
        removals.get(file.uid) !== token ||
        !queue.fileList.value.some((item) => item.uid === file.uid)
      ) {
        return
      }
      cancelAttempt(file.uid)
      pendingAuto.delete(file.uid)
      queue.remove(file)
      options.onRemove?.(file)
    } catch {
      /* Rejected removal leaves the accepted list intact. */
    } finally {
      if (removals.get(file.uid) === token) {
        removals.delete(file.uid)
      }
    }
  }
  function retry(file: UploadFileItem) {
    return submit(file)
  }
  function preview(file: UploadFileItem, originalEvent?: MouseEvent) {
    if (!active || options.disabled?.()) {
      return
    }
    let prevented = false
    options.onPreview?.(file, {
      originalEvent,
      get defaultPrevented() {
        return prevented
      },
      preventDefault() {
        prevented = true
      },
    })
  }
  function reset() {
    if (disabled.value) {
      return
    }
    generation++
    adding = Promise.resolve()
    removals.clear()
    for (const uid of attempts.keys()) {
      cancelAttempt(uid)
    }
    pendingAuto.clear()
    for (const uid of owned.keys()) {
      if (!accepted.has(uid)) {
        release(uid)
      }
    }
    queue.reset()
  }
  onActivated(() => {
    inactive = false
  })
  onDeactivated(() => {
    inactive = true
    generation++
    adding = Promise.resolve()
    removals.clear()
    for (const uid of attempts.keys()) {
      cancelAttempt(uid)
      queue.patch(uid, { status: 'canceled', percent: 0 })
    }
  })
  onBeforeUnmount(() => {
    active = false
    generation++
    removals.clear()
    for (const uid of attempts.keys()) {
      cancelAttempt(uid)
    }
    for (const uid of owned.keys()) {
      release(uid)
    }
    pendingAuto.clear()
  })
  return {
    fileList: queue.fileList,
    maxReached,
    disabled,
    ...picker,
    retainUrls,
    addFiles,
    submit,
    abort,
    retry,
    remove,
    preview,
    reset,
    clearSuccess: () => {
      if (!disabled.value) {
        queue.clearByStatus('success')
      }
    },
    clearError: () => {
      if (!disabled.value) {
        queue.clearByStatus('error')
      }
    },
    getFiles: queue.getFiles,
  }
}
