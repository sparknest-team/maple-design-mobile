import { fieldGlobalText as globalTranslate } from '../_components/field-presentation/default-texts'
import { injectLocaleProvider } from '../locale-provider/provide'

// Field controls use the application's global / LocaleProvider locale.
export function useFieldLocale() {
  const { t: providerTranslate } = injectLocaleProvider()
  return { t: (key: string): string => providerTranslate?.(key) ?? globalTranslate(key) ?? key }
}
