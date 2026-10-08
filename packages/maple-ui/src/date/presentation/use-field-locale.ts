import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'

export function useDateFieldLocale() {
  const { t: provided } = injectLocaleProvider()
  return {
    placeholder: (_range: boolean, _type = 'date') => '',
    nextDay: () => (provided ?? t)('timeRangeNextDay'),
    title: () => (provided ?? t)('pickerTitle'),
    cancel: () => (provided ?? t)('pickerCancelButtonText'),
    confirm: () => (provided ?? t)('pickerConfirmButtonText'),
  }
}
