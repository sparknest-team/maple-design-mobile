import { nextTick, reactive, type Component, type TeleportProps } from 'vue'
import { call, isArray } from '@maplejs/maple-shared'
import { mountInstance, withInstall, withPropsDefaultsSetter } from '../utils/components'
import VarPicker from './Picker.vue'
import { props as pickerProps, type PickerColumnOption } from './props'

interface PickerOptions {
  modelValue?: (string | number)[]
  columns?: PickerColumnOption[] | PickerColumnOption[][]
  open?: boolean
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
  popupContainer?: TeleportProps['to']
  dynamic?: boolean
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

type PickerResolvedState = 'confirm' | 'cancel' | 'close'

interface PickerResolvedData {
  state: PickerResolvedState
  values?: (string | number)[]
  indexes?: number[]
  options?: PickerColumnOption[]
}

let singletonOptions: PickerOptions | null

function Picker(options: PickerOptions | PickerColumnOption[] | PickerColumnOption[][]): Promise<PickerResolvedData> {
  return new Promise((resolve) => {
    Picker.close()

    const pickerOptions: PickerOptions = isArray(options) ? { columns: options } : options
    const reactivePickerOptions: PickerOptions = reactive(pickerOptions)
    reactivePickerOptions.dynamic = true
    reactivePickerOptions.popupContainer = 'body'
    singletonOptions = reactivePickerOptions

    function resetSingletonOptions() {
      singletonOptions === reactivePickerOptions && (singletonOptions = null)
    }

    const { unmountInstance } = mountInstance(VarPicker, reactivePickerOptions, {
      onConfirm: (values: (string | number)[], indexes: number[], options: PickerColumnOption[]) => {
        call(reactivePickerOptions.onConfirm, values, indexes, options)
        resolve({
          state: 'confirm',
          values,
          indexes,
          options,
        })
        reactivePickerOptions.open = false
        resetSingletonOptions()
      },
      onCancel: (values: (string | number)[], indexes: number[], options: PickerColumnOption[]) => {
        call(reactivePickerOptions.onCancel, values, indexes, options)
        resolve({
          state: 'cancel',
          values,
          indexes,
          options,
        })
        reactivePickerOptions.open = false
        resetSingletonOptions()
      },
      onClose: () => {
        call(reactivePickerOptions.onClose)
        resolve({
          state: 'close',
        })
        resetSingletonOptions()
      },
      onClosed: () => {
        call(reactivePickerOptions.onClosed)
        unmountInstance()
        resetSingletonOptions()
      },
      onRouteChange: () => {
        unmountInstance()
        resetSingletonOptions()
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

Picker.Component = VarPicker as Component
withInstall(VarPicker)
withInstall(VarPicker, Picker)
withPropsDefaultsSetter(Picker, pickerProps)

export { pickerProps }

export type PickerInstance = InstanceType<typeof VarPicker>
export const _PickerComponent: typeof VarPicker = VarPicker

export default Picker
export type PickerProps = import('vue').ExtractPublicPropTypes<typeof import('./props').props>
