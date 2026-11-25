import { computed } from 'vue'
import { fieldGlobalText as globalTranslate } from '../_components/field-presentation/default-texts'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultFieldCommonClear } from '../locale/zh-CN'

// Field controls use the application's global / LocaleProvider locale.
export function useFieldLocale() {
  const { t: providerTranslate } = injectLocaleProvider()
  return { t: (key: string): string => providerTranslate?.(key) ?? globalTranslate(key) ?? key }
}

export function useFieldClearLabel() {
  const { t: translate } = injectLocaleProvider()
  const key = 'common.clear'
  return computed(() => translate?.(key) ?? t(key) ?? (defaultLocaleReady.value ? key : defaultFieldCommonClear))
}
