import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultPeopleSelectCall, defaultPeopleSelectChat } from '../locale/zh-CN'

export function usePeopleTexts() {
  const { t: translate } = injectLocaleProvider()
  const globalText = (key: string, fallback: string) => {
    const value = t(key)
    return defaultLocaleReady.value ? value : (value ?? fallback)
  }
  return {
    call: computed(() => translate?.('peopleSelect.call') ?? globalText('peopleSelect.call', defaultPeopleSelectCall)),
    chat: computed(() => translate?.('peopleSelect.chat') ?? globalText('peopleSelect.chat', defaultPeopleSelectChat)),
  }
}
