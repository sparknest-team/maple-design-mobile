import { injectLocaleProvider } from '../../locale-provider/provide'
import { temporalText as t } from '../../locale/temporal-text'

export function useTimeFieldLocale() {
  const { t: provided } = injectLocaleProvider()
  return {
    placeholder: (_range: boolean) => '',
    nextDay: () => (provided ?? t)('timeRangeNextDay'),
    title: () => (provided ?? t)('pickerTitle'),
    cancel: () => (provided ?? t)('pickerCancelButtonText'),
    confirm: () => (provided ?? t)('pickerConfirmButtonText'),
  }
}
