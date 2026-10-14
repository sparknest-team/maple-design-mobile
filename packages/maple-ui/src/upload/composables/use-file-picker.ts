import { ref } from 'vue'
import type { UploadRejectedFile } from '../interfaces'
import { isAcceptedFile } from '../utils/accept'

export function useFilePicker(options: {
  accept?: () => string | undefined
  directory?: () => boolean
  disabled?: () => boolean
  onFiles: (files: File[], rejected: UploadRejectedFile[], event?: Event) => void
}) {
  const inputRef = ref<HTMLInputElement>()
  const dragOver = ref(false)

  function chooseFile() {
    if (!options.disabled?.()) {
      inputRef.value?.click()
    }
  }

  function normalizeFiles(files: File[]) {
    const accepted: File[] = []
    const rejected: UploadRejectedFile[] = []

    files.forEach((file) => {
      if (isAcceptedFile(file, options.accept?.())) {
        accepted.push(file)
      } else {
        rejected.push({ file, reason: 'accept' })
      }
    })

    return { accepted, rejected }
  }

  function handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement
    const files = Array.from(target.files || [])
    const { accepted, rejected } = normalizeFiles(files)
    options.onFiles(accepted, rejected, event)
    target.value = ''
  }

  function handleDragOver(event: DragEvent) {
    if (options.disabled?.()) {
      return
    }

    event.preventDefault()
    dragOver.value = true
  }

  function handleDragLeave() {
    dragOver.value = false
  }

  function handleDrop(event: DragEvent) {
    if (options.disabled?.()) {
      return
    }

    event.preventDefault()
    dragOver.value = false

    const files = Array.from(event.dataTransfer?.files || [])
    const { accepted, rejected } = normalizeFiles(files)
    options.onFiles(accepted, rejected, event)
  }

  return {
    inputRef,
    dragOver,
    chooseFile,
    handleInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
