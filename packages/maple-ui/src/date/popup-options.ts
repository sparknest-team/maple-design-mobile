import type { TriggerPresentationOptions } from '../trigger/presentation-options'

/** Shared safe subset for desktop/mobile date popups. Existing popupProps remains the legacy wide type. */
type DatePopupOwnedKey =
  | 'modelValue'
  | 'defaultValue'
  | 'readonly'
  | 'type'
  | 'mode'
  | 'presentation'
  | 'format'
  | 'valueFormat'
  | 'timeZone'
  | 'showTime'
  | 'min'
  | 'max'
  | 'disabledDate'
  | 'disabledTime'
  | 'multiple'
  | 'range'
  | 'disableConfirm'
  | 'showConfirmBtn'
  | 'trigger'
  | 'closeOnClickReference'
  | 'preventFocus'
  | 'popupOffset'
  | 'unmountOnClose'

/** Popup appearance and positioning only; all event listeners are outside this opt-in contract. */
export type DatePopupOptions = TriggerPresentationOptions<DatePopupOwnedKey> & {
  [Listener in `on${string}`]?: never
}
