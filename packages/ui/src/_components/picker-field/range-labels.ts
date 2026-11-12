import { computed } from 'vue'
import { injectLocaleProvider } from '../../locale-provider/provide'
import { t as globalLocaleText } from '../../locale/state'
import { defaultFieldRangeEnd, defaultFieldRangeStart } from '../../locale/zh-CN'

export function usePickerRangeLabels(kind: () => 'date' | 'time') {
  const { t: translateEndpoint } = injectLocaleProvider()
  return computed(() => {
    const keys = ['fieldPresentation.rangeStart', 'fieldPresentation.rangeEnd']
    const legacyKeys = kind() === 'time' ? ['timeRangeStart', 'timeRangeEnd'] : ['dateRangeStart', 'dateRangeEnd']
    const fallback = [defaultFieldRangeStart, defaultFieldRangeEnd]
    return keys.map(
      (key, index) =>
        translateEndpoint?.(key) ??
        translateEndpoint?.(legacyKeys[index]) ??
        globalLocaleText(key) ??
        globalLocaleText(legacyKeys[index]) ??
        fallback[index],
    )
  })
}
