import { computed, nextTick, ref } from 'vue'
import type { UploadFileItem, UploadStatus } from '../interfaces'

export function useUploadQueue(options: {
  modelValue?: () => UploadFileItem[] | undefined
  defaultValue?: () => UploadFileItem[] | undefined
  onChange?: (files: UploadFileItem[], file?: UploadFileItem) => void
  onUpdateModelValue?: (files: UploadFileItem[]) => void
  isActive?: () => boolean
}) {
  const inner = ref<UploadFileItem[]>((options.defaultValue?.() ?? []).map((file) => ({ ...file })))
  const fileList = computed(() => options.modelValue?.() ?? inner.value)
  let revision = 0
  let pending: UploadFileItem[] | undefined
  let pendingBase: UploadFileItem[] | undefined
  const mutationList = () => (pending && fileList.value === pendingBase ? pending : fileList.value)
  function commit(next: UploadFileItem[], changed?: UploadFileItem) {
    const currentRevision = ++revision
    const startedActive = options.isActive?.() ?? true
    pendingBase = fileList.value
    pending = next
    if (options.modelValue?.() === undefined) {
      inner.value = next
    }
    nextTick(() => {
      if (pending === next) {
        pending = undefined
        pendingBase = undefined
      }
    })
    options.onUpdateModelValue?.(next)
    if (revision === currentRevision && (!startedActive || (options.isActive?.() ?? true))) {
      options.onChange?.(next, changed)
    }
  }
  function append(files: UploadFileItem[]) {
    if (files.length) {
      commit([...mutationList(), ...files], files[0])
    }
  }
  function replace(previous: UploadFileItem, file: UploadFileItem) {
    if (mutationList().some((item) => item.uid === previous.uid)) {
      commit(
        mutationList().map((item) => (item.uid === previous.uid ? file : item)),
        file,
      )
    }
  }
  function patch(uid: string, values: Partial<UploadFileItem>) {
    const found = mutationList().find((file) => file.uid === uid)
    if (!found) {
      return
    }
    const changed = { ...found, ...values }
    commit(
      mutationList().map((file) => (file.uid === uid ? changed : file)),
      changed,
    )
  }
  function remove(file: UploadFileItem) {
    if (mutationList().some((item) => item.uid === file.uid)) {
      commit(
        mutationList().filter((item) => item.uid !== file.uid),
        { ...file, status: 'removed' },
      )
    }
  }
  function clearByStatus(status: UploadStatus) {
    const first = mutationList().find((file) => file.status === status)
    if (first) {
      commit(
        mutationList().filter((file) => file.status !== status),
        { ...first, status: 'removed' },
      )
    }
  }
  function reset() {
    if (fileList.value.length) {
      commit([])
    } else {
      revision++
      pending = undefined
      pendingBase = undefined
    }
  }
  return {
    fileList,
    append,
    replace,
    patch,
    remove,
    reset,
    clearByStatus,
    getFiles: (status?: UploadStatus) => fileList.value.filter((file) => !status || file.status === status),
  }
}
