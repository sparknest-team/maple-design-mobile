import type { CSSProperties, InputHTMLAttributes, VNodeChild } from 'vue'

export type UploadStatus = 'ready' | 'reading' | 'uploading' | 'success' | 'error' | 'canceled' | 'removed'

export type UploadListType = 'text' | 'picture' | 'picture-card'

export type UploadTriggerPosition = 'before' | 'after'

export type UploadImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export type UploadResolveType = 'file' | 'data-url' | 'object-url'

export type UploadCapture = InputHTMLAttributes['capture']

export type UploadRejectedReason =
  'accept' | 'before-add' | 'max-file-size' | 'max-total-size' | 'max-files' | 'before-read' | 'read-error'

export interface UploadFileItem {
  fit?: UploadImageFit
  uid: string
  name?: string
  size?: number
  type?: string
  file?: File
  url?: string
  /** Video duration in seconds; unknown duration is omitted. */
  duration?: number
  thumbnailUrl?: string
  response?: unknown
  error?: unknown
  status: UploadStatus
  percent: number
}

export interface UploadRejectedFile {
  file: File
  reason: UploadRejectedReason
  message?: string
}

export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export type UploadData =
  | Record<string, string | Blob | number | boolean | undefined | null>
  | ((
      file: UploadFileItem,
    ) =>
      | Record<string, string | Blob | number | boolean | undefined | null>
      | Promise<Record<string, string | Blob | number | boolean | undefined | null>>)

export type UploadHeaders =
  | Record<string, string | number | undefined | null>
  | ((
      file: UploadFileItem,
    ) =>
      Record<string, string | number | undefined | null> | Promise<Record<string, string | number | undefined | null>>)

export interface UploadRequestOptions {
  action?: string
  method: string
  headers?: UploadHeaders
  data?: UploadData
  name: string | ((file: UploadFileItem) => string)
  file: UploadFileItem
  withCredentials: boolean
  isSuccessResponse?: (xhr: XMLHttpRequest, file: UploadFileItem) => boolean
  onProgress: (event: UploadProgressEvent) => void
  onSuccess: (response?: unknown, event?: ProgressEvent) => void
  onError: (error?: unknown, event?: ProgressEvent) => void
}

export interface UploadRequest {
  abort?: () => void
}

export type UploadCustomRequest = (
  options: UploadRequestOptions,
) => UploadRequest | Promise<UploadRequest | void> | void

export interface UploadThumbnailOptions {
  file: File
  fileItem: UploadFileItem
  resolveType: UploadResolveType
}

export type UploadCreateThumbnailUrl = (
  options: UploadThumbnailOptions,
) => string | Promise<string | undefined> | undefined

export type UploadBeforeRead = (file: File) => boolean | File | Promise<boolean | File>

export type UploadBeforeUpload = (file: UploadFileItem) => boolean | File | Blob | Promise<boolean | File | Blob>

export type UploadBeforeRemove = (file: UploadFileItem, fileList: UploadFileItem[]) => boolean | Promise<boolean>

export type UploadIsSuccessResponse = (xhr: XMLHttpRequest, file: UploadFileItem) => boolean

export type UploadRenderFile = (file: UploadFileItem, index: number) => VNodeChild

export interface UploadPublicMethods {
  replace: (file: UploadFileItem, replacement?: File) => Promise<void>
  chooseFile: () => Promise<void>
  submit: (file?: UploadFileItem) => Promise<void>
  abort: (file?: UploadFileItem) => void
  retry: (file: UploadFileItem) => Promise<void>
  remove: (file: UploadFileItem) => Promise<void>
  reset: () => void
  clearSuccess: () => void
  clearError: () => void
  getFiles: (status?: UploadStatus) => UploadFileItem[]
}

export interface UploadTriggerSlotProps {
  chooseFile: () => Promise<void>
  dragOver: boolean
  disabled: boolean
  describedBy: string | undefined
}

export interface UploadItemSlotProps {
  file: UploadFileItem
  index: number
  remove: () => Promise<void>
  retry: () => Promise<void>
  abort: () => void
  replace: () => Promise<void>
}

export interface UploadStyleProps {
  class?: string
  style?: string | CSSProperties
}

export interface UploadPreviewEvent {
  readonly defaultPrevented: boolean
  preventDefault: () => void
  originalEvent?: MouseEvent
}
export type UploadRequestChoose = (chooseFile: () => Promise<void>, event: Event) => void | Promise<void>
export interface UploadEmits {
  'update:modelValue': [files: UploadFileItem[] | null]
  read: [file: UploadFileItem]
  change: [files: UploadFileItem[] | null, file?: UploadFileItem]
  rejected: [files: UploadRejectedFile[]]
  exceed: [files: File[], fileList: UploadFileItem[]]
  progress: [file: UploadFileItem, event?: ProgressEvent]
  success: [file: UploadFileItem]
  error: [file: UploadFileItem]
  replace: [file: UploadFileItem, previous: UploadFileItem]
  remove: [file: UploadFileItem]
  preview: [file: UploadFileItem, event: UploadPreviewEvent]
}
export interface UploadSlots {
  read?: (scope: { value: UploadFileItem[] | null; text: string }) => VNodeChild
  trigger?: (scope: UploadTriggerSlotProps) => VNodeChild
  item?: (scope: UploadItemSlotProps) => VNodeChild
  'remove-button'?: (scope: UploadItemSlotProps) => VNodeChild
}
export interface UploadExpose extends UploadPublicMethods {
  closePreview: () => void
  preview: (file: UploadFileItem) => void
}
