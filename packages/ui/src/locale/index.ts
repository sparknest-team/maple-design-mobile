import { type Month, type Week } from '../date/picker-props'
import enUS from './en-US'
import faIR from './fa-IR'
import jaJP from './ja-JP'
import { add, currentMessage, defaultLocaleReady, merge, messages, t, use, useLocale } from './state'
import zhCN from './zh-CN'
import zhHK from './zh-HK'
import zhTW from './zh-TW'

export type Message = {
  'numberKeyboard.label': string
  'numberKeyboard.delete': string
  'numberKeyboard.done': string
  'imagePreview.prev': string
  'imagePreview.next': string
  'imagePreview.fullScreen': string
  'imagePreview.rotateLeft': string
  'imagePreview.rotateRight': string
  'imagePreview.originalSize': string
  'imagePreview.zoomOut': string
  'imagePreview.zoomIn': string
  'imagePreview.download': string
  'imagePreview.close': string
  'image.preview': string
  'fab.actions': string
  'indexBar.navigation': string
  'common.close': string
  'common.back'?: string
  'splitButton.moreActions': string
  'tabs.close': string
  'tabs.add': string
  'tabs.previous': string
  'tabs.next': string
  'breadcrumb.label': string
  'breadcrumb.ellipsis': string
  'loading.text': string
  'table.scrollable': string
  'peopleSelect.call': string
  'peopleSelect.chat': string
  'fieldPresentation.rangeStart'?: string
  'fieldPresentation.rangeEnd'?: string
  'fieldPresentation.selectionCount': string
  'fieldPresentation.selectionRemove': string
  'fieldPresentation.selectionBack': string
  'fieldPresentation.selectionEmpty': string

  'fieldPresentation.edit': string
  'fieldPresentation.close': string
  'fieldPresentation.search': string
  'fieldPresentation.selected': string
  'fieldPresentation.limit': string

  'carousel.label': string
  'carousel.previous': string
  'carousel.next': string
  'carousel.slide': string
  'carousel.goto': string
  'upload.replace': string
  'upload.duration': string
  'upload.buttonText': string
  'upload.drag': string
  'upload.preview': string
  'upload.download': string
  'upload.cancel': string
  'upload.retry': string
  'upload.delete': string
  'upload.close': string
  'search.history': string
  'search.search': string
  'search.cancel': string
  // Dialog
  dialogTitle: string
  dialogConfirmButtonText: string
  dialogCancelButtonText: string
  // ActionSheet
  actionSheetTitle: string
  // Empty
  emptyDescription: string
  // InfiniteScroll
  infiniteScrollLoadingText: string
  infiniteScrollFinishedText: string
  infiniteScrollErrorText: string
  // Picker
  pickerTitle: string
  pickerConfirmButtonText: string
  pickerCancelButtonText: string
  // Cascader
  cascaderPickerAddButtonText: string
  cascaderPickerDoneButtonText: string
  // date-picker
  datePickerPreviousWeek: string
  datePickerNextWeek: string
  datePickerPreviousMonth: string
  datePickerNextMonth: string
  datePickerPreviousYear: string
  datePickerNextYear: string
  datePickerPreviousPeriod: string
  datePickerNextPeriod: string
  datePickerMonthDict: Record<Month, { name: string; abbr: string }>
  datePickerWeekDict: Record<Week, { name: string; abbr: string }>
  datePickerSelected: string
  dateRangeOrderError: string
  dateTimeRangeOrderError: string
  timeRangeOrderError: string
  datePickerNowButtonText: string
  datePickerHint: string
  datePickerColumnYear: string
  datePickerColumnMonth: string
  datePickerColumnDay: string
  datePickerColumnHour: string
  datePickerColumnMinute: string
  datePickerColumnSecond: string
  // pagination
  paginationItem: string
  paginationPage: string
  paginationNavigation?: string
  paginationPrevious?: string
  paginationNext?: string
  paginationJump: string
  paginationTotal: string
  // time-picker
  timePickerHint: string
  dateRangeStart: string
  dateRangeEnd: string
  // time-range
  rangeStartPlaceholder: string
  rangeEndPlaceholder: string
  timeRangeStart: string
  timeRangeEnd: string
  timeRangeNextDay: string
  // internal
  lang?: string
  [key: PropertyKey]: any
}

add('zh-CN', zhCN)
use('zh-CN')
defaultLocaleReady.value = true

export { zhCN, enUS, zhTW, zhHK, faIR, messages, currentMessage, add, use, merge, t, useLocale }

type LocaleAPI = {
  zhCN: typeof zhCN
  enUS: typeof enUS
  zhTW: typeof zhTW
  zhHK: typeof zhHK
  faIR: typeof faIR
  jaJP: typeof jaJP
  messages: typeof messages
  currentMessage: typeof currentMessage
  add: typeof add
  use: typeof use
  merge: typeof merge
  t: typeof t
  useLocale: typeof useLocale
}

export const _LocaleComponent: LocaleAPI = {
  zhCN,
  enUS,
  zhTW,
  zhHK,
  faIR,
  jaJP,
  messages,
  currentMessage,
  add,
  use,
  merge,
  t,
  useLocale,
}

const defaultLocale: LocaleAPI = {
  zhCN,
  enUS,
  zhTW,
  zhHK,
  faIR,
  jaJP,
  messages,
  currentMessage,
  add,
  use,
  merge,
  t,
  useLocale,
}

export default defaultLocale
