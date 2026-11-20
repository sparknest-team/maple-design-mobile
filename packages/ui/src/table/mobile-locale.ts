import { computed } from 'vue'
import { injectLocaleProvider } from '../locale-provider/provide'
import { defaultLocaleReady, t as translate } from '../locale/state'
import { defaultTableScrollable } from '../locale/zh-CN'

const labels: Record<string, [string, string]> = {
  'table.scrollable': [defaultTableScrollable, 'Scrollable table'],
  'table.selectRow': ['选择行 {0}', 'Select row {0}'],
  'table.selectAll': ['选择全部', 'Select all'],
  'table.selectionColumn': ['选择', 'Selection'],
  'table.resizeColumn': ['调整列宽 {0}', 'Resize column {0}'],
  'table.expandRow': ['展开行', 'Expand row'],
  'table.collapseRow': ['收起行', 'Collapse row'],
}
export function useI18n() {
  const { t: local } = injectLocaleProvider()
  const t = (key: string, ...args: (string | undefined)[]) => String(local?.(key) ?? translate(key) ?? labels[key]?.[defaultLocaleReady.value ? 1 : 0] ?? key).replace('{0}', args[0] ?? '')
  return { t, i18nMessage: computed(() => ({ table: { expandRow: t('table.expandRow'), collapseRow: t('table.collapseRow') } })) }
}
