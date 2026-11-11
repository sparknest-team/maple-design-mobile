import type { PropType } from 'vue'
import { blockTriggerReferenceClick } from '../../trigger/reference-click'

export type OpenTriggerTarget = 'field' | 'icon'

/** 打开选择面板的点击区域；不影响手输、复制、键盘操作或受控 open。 */
export const openTriggerTargetProp = {
  type: String as PropType<OpenTriggerTarget>,
  default: 'field' as const,
  validator: (value: string) => value === 'field' || value === 'icon',
}

/** Explicit trigger buttons open even when text is selected; other actions remain independent. */
export function isFieldOpenClick(event: Event, target: OpenTriggerTarget = 'field') {
  if (event.defaultPrevented) {
    return false
  }
  const element = event.target as HTMLElement | null
  if (!element?.closest) {
    return false
  }
  if (element.closest('[data-field-open-trigger]')) {
    return true
  }
  if (target === 'icon' || element.closest('button,a,[role="button"]')) {
    return false
  }
  if (element instanceof HTMLInputElement && element.selectionStart !== element.selectionEnd) {
    return false
  }
  const selection = element.ownerDocument.getSelection()
  return !selection || selection.isCollapsed || !selection.containsNode(element, true)
}

/** Keep native field actions local, including when Trigger binds to the same component root. */
export function blockFieldOpenClick(event: Event) {
  event.stopPropagation()
  blockTriggerReferenceClick(event)
}
