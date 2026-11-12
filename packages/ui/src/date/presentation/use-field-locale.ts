import { injectLocaleProvider } from '../../locale-provider/provide'
import { dateText as t } from '../../locale/date-text'

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
