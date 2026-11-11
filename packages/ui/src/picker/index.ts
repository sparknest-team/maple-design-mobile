import { nextTick, reactive } from 'vue'
import { call, isArray } from '@maple-design/shared-vue'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import type { PopupContainer } from '../utils/popup-container'
import VarPicker from './Picker.vue'
import { props as pickerProps, type PickerColumnOption } from './props'

export interface PickerOptions {
  modelValue?: (string | number)[]
  defaultValue?: (string | number)[]
  disabled?: boolean
  selectedValues?: (string | number)[]
  columns?: PickerColumnOption[] | PickerColumnOption[][]
  title?: string
  fieldNames?: { label?: string; value?: string; children?: string }
  toolbar?: boolean
  cascade?: boolean
  optionHeight?: number | string
  optionCount?: number | string
  columnsCount?: number | string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonTextColor?: string
  cancelButtonTextColor?: string
  safeArea?: boolean
  overlayClosable?: boolean
  escToClose?: boolean
  popupContainer?: PopupContainer
  onClickOverlay?: (event: MouseEvent) => void
  onOpen?: () => void
  onOpened?: () => void
  onClose?: () => void
  onClosed?: () => void
  onChange?: (values: (string | number)[], indexes: number[], options: PickerColumnOption[]) => void
  onConfirm?: (values: (string | number)[], indexes: number[], options: PickerColumnOption[]) => void
  onCancel?: (values: (string | number)[], indexes: number[], options: PickerColumnOption[]) => void
  onKeyEscape?: (event: KeyboardEvent) => void
}

export type PickerResolvedState = 'confirm' | 'cancel' | 'close'

export interface PickerResolvedData {
  state: PickerResolvedState
  values?: (string | number)[]
  indexes?: number[]
  options?: PickerColumnOption[]
}

type PickerServiceOptions = PickerOptions & { open?: boolean; dynamic: boolean }
let singletonOptions: PickerServiceOptions | null

function Picker(options: PickerOptions | PickerColumnOption[] | PickerColumnOption[][]): Promise<PickerResolvedData> {
  return new Promise((resolve) => {
    Picker.close()

    const pickerOptions: PickerOptions = isArray(options) ? { columns: options } : options
    const reactivePickerOptions: PickerServiceOptions = reactive({
      ...pickerOptions,
      dynamic: true,
      popupContainer: pickerOptions.popupContainer ?? 'body',
    })
    singletonOptions = reactivePickerOptions

    function resetSingletonOptions() {
      singletonOptions === reactivePickerOptions && (singletonOptions = null)
    }

    const { unmountInstance } = mountInstance(VarPicker, reactivePickerOptions, {
      onConfirm: (values: (string | number)[], indexes: number[], options: PickerColumnOption[]) => {
        resolve({
          state: 'confirm',
          values,
          indexes,
          options,
        })
        reactivePickerOptions.open = false
        resetSingletonOptions()
        return call(reactivePickerOptions.onConfirm, values, indexes, options)
      },
      onCancel: (values: (string | number)[], indexes: number[], options: PickerColumnOption[]) => {
        resolve({
          state: 'cancel',
          values,
          indexes,
          options,
        })
        reactivePickerOptions.open = false
        resetSingletonOptions()
        return call(reactivePickerOptions.onCancel, values, indexes, options)
      },
      onClose: () => {
        resolve({
          state: 'close',
        })
        resetSingletonOptions()
        return call(reactivePickerOptions.onClose)
      },
      onClosed: () => {
        try {
          return call(reactivePickerOptions.onClosed)
        } finally {
          unmountInstance()
          resetSingletonOptions()
        }
      },
      'onUpdate:open': (value: boolean) => {
        reactivePickerOptions.open = value
      },
    })

    reactivePickerOptions.open = true
  })
}

Picker.close = function () {
  if (singletonOptions == null) {
    return
  }

  const prevSingletonOptions = singletonOptions
  singletonOptions = null
  nextTick().then(() => {
    prevSingletonOptions.open = false
  })
}

Picker.Component = withInstall(VarPicker)
const InstalledPicker = withInstall(VarPicker, Picker)
withPropsDefaultsSetter(Picker, pickerProps)

export { pickerProps }
export type { PickerColumnOption } from './props'
export type { PickerEmits, PickerSlots, PickerSelection } from './types'

export type PickerInstance = InstanceType<typeof VarPicker>
export const _PickerComponent: typeof VarPicker = VarPicker

export default InstalledPicker
export type PickerProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
