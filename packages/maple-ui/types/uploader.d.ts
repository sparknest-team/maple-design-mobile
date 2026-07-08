import { InputHTMLAttributes, VNode } from 'vue'
import { BasicAttributes, ListenerProp, SetPropsDefaults, Rules as UploaderRules, VarComponent } from './varComponent'

export declare const uploaderProps: Record<keyof UploaderProps, any>

export type MpFileFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

export type MpFileState = 'loading' | 'success' | 'error'

export interface MpFile {
  id?: number | string
  file?: File
  name?: string
  url?: string
  cover?: string
  fit?: MpFileFit
  state?: MpFileState
  progress?: number
}

export type UploaderResolveType = 'default' | 'file' | 'data-url'

export type UploaderValidateTrigger = 'onChange' | 'onRemove'

export type UploaderMpFileUtils = {
  getLoading(): MpFile[]
  getSuccess(): MpFile[]
  getError(): MpFile[]
}

export type UploaderCapture = boolean | 'user' | 'environment'

export interface UploaderProps extends BasicAttributes {
  modelValue?: MpFile[]
  accept?: string
  capture?: InputHTMLAttributes['capture']
  multiple?: boolean
  readonly?: boolean
  disabled?: boolean
  elevation?: boolean | string | number
  removable?: boolean
  maxlength?: string | number
  maxsize?: string | number
  previewed?: boolean
  hideList?: boolean
  ripple?: boolean
  preventDefaultPreview?: boolean
  resolveType?: UploaderResolveType
  validateTrigger?: Array<UploaderValidateTrigger>
  rules?: UploaderRules
  onClickAction?: ListenerProp<(chooseFile: () => void, event: Event) => void>
  onBeforeFilter?: ListenerProp<(files: MpFile[]) => Promise<MpFile[]> | MpFile[]>
  onBeforeRead?: ListenerProp<(file: MpFile) => Promise<any> | any>
  onAfterRead?: ListenerProp<(file: MpFile) => any>
  onOversize?: ListenerProp<(file: MpFile) => any>
  onBeforeRemove?: ListenerProp<(file: MpFile) => any>
  onRemove?: ListenerProp<(file: MpFile) => any>
  onPreview?: ListenerProp<(file: MpFile) => void>
  'onUpdate:modelValue'?: ListenerProp<(files: MpFile[]) => any>
}

export class Uploader extends VarComponent {
  static setPropsDefaults: SetPropsDefaults<UploaderProps>

  $props: UploaderProps

  $slots: {
    default(): VNode[]
    'extra-message'(): VNode[]
    'remove-button'(remove: () => void): VNode[]
  }

  getLoading(): MpFile[]

  getSuccess(): MpFile[]

  getError(): MpFile[]

  validate(): Promise<boolean>

  resetValidation(): void

  reset(): void

  chooseFile(): void

  closePreview(): void
}

export class _UploaderComponent extends Uploader {}
