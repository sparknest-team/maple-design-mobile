import { computed } from 'vue'
import { defaultLocaleReady, t } from '../locale/state'
import {
  defaultUploadButtonText,
  defaultUploadCancel,
  defaultUploadClose,
  defaultUploadDelete,
  defaultUploadDownload,
  defaultUploadDrag,
  defaultUploadDuration,
  defaultUploadPreview,
  defaultUploadReplace,
  defaultUploadRetry,
} from '../locale/zh-CN'

function text(key: string, fallback: string) {
  const value = t(key)
  return String(defaultLocaleReady.value ? value : (value ?? fallback))
}

export function useUploadLocale() {
  return computed(() => ({
    replace: text('upload.replace', defaultUploadReplace),
    duration: text('upload.duration', defaultUploadDuration),
    upload: text('upload.buttonText', defaultUploadButtonText),
    dropFiles: text('upload.drag', defaultUploadDrag),
    preview: text('upload.preview', defaultUploadPreview),
    download: text('upload.download', defaultUploadDownload),
    cancel: text('upload.cancel', defaultUploadCancel),
    retry: text('upload.retry', defaultUploadRetry),
    remove: text('upload.delete', defaultUploadDelete),
    close: text('upload.close', defaultUploadClose),
  }))
}
