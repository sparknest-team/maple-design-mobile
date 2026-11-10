import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t } from '../locale/state'
import { defaultCloseText } from '../locale/zh-CN'

export {
  IconClose,
  IconInfoCircleFill,
  IconCheckboxMarkedCircleFill as IconCheckCircleFill,
  IconWarning as IconExclamationCircleFill,
  IconError as IconCloseCircleFill,
} from '@maple-design/icons-vue'
export const transitionName = 'mp-alert-leave'

export function useAlertLocale() {
  const { t: translate } = injectLocaleProvider()
  return computed(() =>
    String(translate?.('common.close') ?? t('common.close') ?? (defaultLocaleReady.value ? 'Close' : defaultCloseText)),
  )
}
