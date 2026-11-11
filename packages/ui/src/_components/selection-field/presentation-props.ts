import type { PropType } from 'vue'
import type { PickerProps } from '../../picker'
import type { PopupProps } from '../../popup'

export const presentationProps = {
  pickerProps: { type: Object as PropType<PickerProps>, default: () => ({}) },
  popupProps: { type: Object as PropType<PopupProps>, default: () => ({}) },
}
