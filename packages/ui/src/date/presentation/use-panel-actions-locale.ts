import { computed } from 'vue'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { dateText as t } from '../../locale/date-text'

export function usePanelActionsLocale() {
  const { t: provided } = injectLocaleProvider()
  return {
    orderErrorText: (showTime: boolean) =>
      (provided ?? t)(showTime ? 'dateTimeRangeOrderError' : 'dateRangeOrderError'),
    nowText: computed(() => (provided ?? t)('datePickerNowButtonText')),
    confirmText: computed(() => (provided ?? t)('pickerConfirmButtonText')),
  }
}
