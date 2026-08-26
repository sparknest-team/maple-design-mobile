import { InputHTMLAttributes, type PropType } from 'vue'
import { defineListenerProp } from '../utils/components'

export interface MpFile {
  id: number
  file?: File
  name?: string
  url?: string
  cover?: string
  progress?: number
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  state?: 'loading' | 'success' | 'error'
}

export type UploaderResolveType = 'default' | 'file' | 'data-url'

export const props = {
  modelValue: {
    type: Array as PropType<MpFile[]>,
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
    type: [Boolean, Number, String],
    default: true,
  },
  resolveType: {
    type: String as PropType<UploaderResolveType>,
    default: 'default',
  },
  removable: {
    type: Boolean,
    default: true,
  },
  maxFiles: [Number, String],
  maxFileSize: [Number, String],
  previewed: {
    type: Boolean,
    default: true,
  },
  ripple: {
    type: Boolean,
    default: true,
  },
  hideList: Boolean,
  preventDefaultPreview: Boolean,
  onClickAction: defineListenerProp<(chooseFile: () => void, event: Event) => void>(),
  beforeAdd: defineListenerProp<(files: MpFile[]) => Promise<MpFile[]> | MpFile[]>(),
  beforeRead: defineListenerProp<(file: MpFile) => Promise<any> | any>(),
  beforeRemove: defineListenerProp<(file: MpFile) => any>(),
}
