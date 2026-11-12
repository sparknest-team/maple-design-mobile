import { defaultLocaleReady, t } from './state'
import {
  defaultActionSheetTitle,
  defaultCascaderDone,
  defaultCloseText,
  defaultDialogCancel,
  defaultFabActions,
  defaultKeyboardDelete,
  defaultKeyboardDone,
  defaultKeyboardLabel,
  defaultTabsAdd,
  defaultTabsClose,
  defaultTabsNext,
  defaultTabsPrevious,
} from './zh-CN'

const defaults: Record<string, string> = {
  'fab.actions': defaultFabActions,
  'tabs.close': defaultTabsClose,
  'tabs.add': defaultTabsAdd,
  'tabs.previous': defaultTabsPrevious,
  'tabs.next': defaultTabsNext,
  actionSheetTitle: defaultActionSheetTitle,
  cascaderPickerDoneButtonText: defaultCascaderDone,
  'common.close': defaultCloseText,
  'numberKeyboard.label': defaultKeyboardLabel,
  'numberKeyboard.delete': defaultKeyboardDelete,
  'numberKeyboard.done': defaultKeyboardDone,
  dialogCancelButtonText: defaultDialogCancel,
}
export function miscText(key: string): ReturnType<typeof t> {
  const value = t(key)
  return defaultLocaleReady.value
    ? value
    : (value ?? (Object.prototype.hasOwnProperty.call(defaults, key) ? defaults[key] : undefined))
}
