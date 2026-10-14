import { computed } from 'vue'
import { t } from '../../locale'
import { injectLocaleProvider } from '../../locale-provider/provide'

export function usePanelActionsLocale() {
  const { t: provided } = injectLocaleProvider()
  return {
    nowText: computed(() => (provided ?? t)('datePickerNowButtonText')),
    confirmText: computed(() => (provided ?? t)('pickerConfirmButtonText')),
  }
}
