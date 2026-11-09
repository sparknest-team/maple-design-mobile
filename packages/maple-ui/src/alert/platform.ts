import { computed } from 'vue'
import { t } from '../locale'
import { injectLocaleProvider } from '../locale-provider/provide'

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
  return computed(() => String(translate?.('common.close') ?? t('common.close') ?? 'Close'))
}
