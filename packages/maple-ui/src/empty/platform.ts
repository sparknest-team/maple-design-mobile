import { computed, type Ref } from 'vue'
import { IconEmpty as DefaultEmptyIcon } from '@maple-design/icons-vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultEmptyDescription } from '../locale/zh-CN'

export { DefaultEmptyIcon }

export function useDefaultDescription() {
  const { t: pt } = injectLocaleProvider()
  return computed(() => {
    if (pt) {
      return pt('emptyDescription')
    }
    const description = t('emptyDescription')
    return defaultLocaleReady.value ? description : (description ?? defaultEmptyDescription)
  })
}

export function useConfigEmpty(_hasCustomContent: Readonly<Ref<boolean>>) {
  return computed(() => null as unknown)
}

export function provideSkipConfigEmpty() {}
