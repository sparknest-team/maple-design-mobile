import { ref, type Ref } from 'vue'
import { hasOwn } from '@maple-design/shared'
import { type Month, type Week } from '../date/picker-props'
import enUS from './en-US'
import faIR from './fa-IR'
import jaJP from './ja-JP'
import zhCN from './zh-CN'
import zhHK from './zh-HK'
import zhTW from './zh-TW'

export type Message = {
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
  timeRangeStart: string
  timeRangeEnd: string
  timeRangeNextDay: string
  // internal
  lang?: string
  [key: PropertyKey]: any
}

type ValueOf<T> = T[keyof T]

function useLocale<T = Message>() {
  const messages = ref<Record<string, Partial<T>>>({})
  const currentMessage: Ref<Partial<T>> = ref({})

  const add = (lang: string, message: Partial<T> & { lang?: string }) => {
    message.lang = lang
    messages.value[lang] = message
  }

  const use = (lang: string) => {
    if (!messages.value[lang]) {
      console.warn(`The ${lang} does not exist. You can mount a language message using the add method`)
      return {}
    }

    currentMessage.value = messages.value[lang]
  }

  const merge = (lang: string, message: Partial<T>) => {
    if (!messages.value[lang]) {
      console.warn(`The ${lang} does not exist. You can mount a language message using the add method`)
      return
    }

    messages.value[lang] = { ...messages.value[lang], ...message }

    use(lang)
  }

  const t = (id: string): ValueOf<T> | undefined => {
    if (hasOwn(currentMessage.value, id)) {
      return currentMessage.value[id]
    }
  }

  return {
    messages,
    currentMessage,
    add,
    use,
    merge,
    t,
  }
}

const { messages, currentMessage, add, use, merge, t } = useLocale()

add('zh-CN', zhCN)
use('zh-CN')

export { zhCN, enUS, zhTW, zhHK, faIR, messages, currentMessage, add, use, merge, t, useLocale }

export const _LocaleComponent = {
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

export default {
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
