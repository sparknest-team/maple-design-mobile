import { computed } from 'vue'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'

export function usePanelActionsLocale() {
  const { t: provided } = injectLocaleProvider()
  return {
    orderErrorText: (showTime: boolean) =>
      (provided ?? t)(showTime ? 'dateTimeRangeOrderError' : 'dateRangeOrderError'),
    nowText: computed(() => (provided ?? t)('datePickerNowButtonText')),
    confirmText: computed(() => (provided ?? t)('pickerConfirmButtonText')),
  }
}
