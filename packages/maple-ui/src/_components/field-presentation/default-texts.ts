import { defaultLocaleReady, t } from '../../locale/state'
import {
  defaultFieldCommonClear,
  defaultFieldCommonDecrease,
  defaultFieldCommonHidePassword,
  defaultFieldCommonIncrease,
  defaultFieldCommonShowPassword,
  defaultFieldFieldPresentationClose,
  defaultFieldFieldPresentationEdit,
  defaultFieldFieldPresentationInput,
  defaultFieldFieldPresentationLimit,
  defaultFieldFieldPresentationSearch,
  defaultFieldFieldPresentationSelected,
  defaultFieldFieldPresentationSelectionBack,
  defaultFieldFieldPresentationSelectionCount,
  defaultFieldFieldPresentationSelectionEmpty,
  defaultFieldFieldPresentationSelectionRemove,
  defaultFieldPickerConfirmButtonText,
  defaultFieldPickerTitle,
} from '../../locale/zh-CN'

const defaults: Record<string, string> = {
  'fieldPresentation.input': defaultFieldFieldPresentationInput,
  'fieldPresentation.selectionCount': defaultFieldFieldPresentationSelectionCount,
  'fieldPresentation.selectionRemove': defaultFieldFieldPresentationSelectionRemove,
  'fieldPresentation.selectionBack': defaultFieldFieldPresentationSelectionBack,
  'fieldPresentation.selectionEmpty': defaultFieldFieldPresentationSelectionEmpty,
  'fieldPresentation.edit': defaultFieldFieldPresentationEdit,
  'fieldPresentation.close': defaultFieldFieldPresentationClose,
  'fieldPresentation.search': defaultFieldFieldPresentationSearch,
  'fieldPresentation.selected': defaultFieldFieldPresentationSelected,
  'fieldPresentation.limit': defaultFieldFieldPresentationLimit,
  'common.increase': defaultFieldCommonIncrease,
  'common.decrease': defaultFieldCommonDecrease,
  'common.clear': defaultFieldCommonClear,
  'common.showPassword': defaultFieldCommonShowPassword,
  'common.hidePassword': defaultFieldCommonHidePassword,
  pickerTitle: defaultFieldPickerTitle,
  pickerConfirmButtonText: defaultFieldPickerConfirmButtonText,
}

/** Keep the public locale's missing-key behavior after initialization. */
export function fieldGlobalText(key: string): ReturnType<typeof t> {
  const value = t(key)
  return defaultLocaleReady.value
    ? value
    : (value ?? (Object.prototype.hasOwnProperty.call(defaults, key) ? defaults[key] : undefined))
}
