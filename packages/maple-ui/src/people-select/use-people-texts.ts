import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

export function usePeopleTexts() {
  const { t: translate } = injectLocaleProvider()
  return {
    call: computed(() => translate?.('peopleSelect.call') ?? t('peopleSelect.call')),
    chat: computed(() => translate?.('peopleSelect.chat') ?? t('peopleSelect.chat')),
  }
}
