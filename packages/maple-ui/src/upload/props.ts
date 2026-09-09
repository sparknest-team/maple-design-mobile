import { InputHTMLAttributes, type PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export type UploadStatus = 'ready' | 'reading' | 'uploading' | 'success' | 'error' | 'canceled' | 'removed'

export interface UploadFileItem {
  uid: string
  file?: File
  name?: string
  size?: number
  type?: string
  url?: string
  thumbnailUrl?: string
  percent: number
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  status: UploadStatus
  response?: unknown
  error?: unknown
}

export type UploadResolveType = 'object-url' | 'file' | 'data-url'

export const props = {
  modelValue: {
    type: Array as PropType<UploadFileItem[]>,
    default: () => [],
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  capture: {
    type: [String, Boolean] as PropType<InputHTMLAttributes['capture']>,
    default: undefined,
  },
  multiple: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  elevation: {
    type: [Boolean, Number],
    default: true,
  },
  resolveType: {
    type: String as PropType<UploadResolveType>,
    default: 'object-url',
  },
  showRemoveButton: {
    type: Boolean,
    default: true,
  },
  maxFiles: [Number, String],
  maxFileSize: [Number, String],
  preview: {
    type: Boolean,
    default: true,
  },
  ripple: {
    type: Boolean,
    default: true,
  },
  showFileList: { type: Boolean, default: true },
  preventDefaultPreview: Boolean,
  onClickAction: defineListenerProp<(chooseFile: () => void, event: Event) => void>(),
  beforeAdd: Function as PropType<(files: File[]) => File[] | Promise<File[]>>,
  beforeRead: Function as PropType<(file: File) => boolean | File | Promise<boolean | File>>,
  beforeRemove: Function as PropType<(file: UploadFileItem, fileList: UploadFileItem[]) => boolean | Promise<boolean>>,
}
