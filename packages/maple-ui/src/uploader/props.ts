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

export type UploaderValidateTrigger = 'onChange' | 'onRemove'

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
  maxlength: [Number, String],
  maxsize: [Number, String],
  previewed: {
    type: Boolean,
    default: true,
  },
  ripple: {
    type: Boolean,
    default: true,
  },
  validateTrigger: {
    type: Array as PropType<Array<UploaderValidateTrigger>>,
    default: () => ['onChange', 'onRemove'],
  },
  rules: [Array, Function, Object] as PropType<any>,
  hideList: Boolean,
  preventDefaultPreview: Boolean,
  onClickAction: defineListenerProp<(chooseFile: () => void, event: Event) => void>(),
  onBeforeFilter: defineListenerProp<(files: MpFile[]) => Promise<MpFile[]> | MpFile[]>(),
  onBeforeRead: defineListenerProp<(file: MpFile) => Promise<any> | any>(),
  onAfterRead: defineListenerProp<(file: MpFile) => any>(),
  onBeforeRemove: defineListenerProp<(file: MpFile) => any>(),
  onRemove: defineListenerProp<(file: MpFile) => any>(),
  onOversize: defineListenerProp<(file: MpFile) => any>(),
  onPreview: defineListenerProp<(file: MpFile) => void>(),
  'onUpdate:modelValue': defineListenerProp<(files: MpFile[]) => any>(),
}
