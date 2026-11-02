import { computed } from 'vue'
import { t } from '../locale'

export function useUploadLocale() {
  return computed(() => ({
    replace: String(t('upload.replace')),
    duration: String(t('upload.duration')),
    upload: String(t('upload.buttonText')),
    dropFiles: String(t('upload.drag')),
    preview: String(t('upload.preview')),
    download: String(t('upload.download')),
    cancel: String(t('upload.cancel')),
    retry: String(t('upload.retry')),
    remove: String(t('upload.delete')),
    close: String(t('upload.close')),
  }))
}
