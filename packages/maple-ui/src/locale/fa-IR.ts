import { Message } from './index'

export default {
  // Dialog
  dialogTitle: 'اشاره',
  dialogConfirmButtonText: 'تایید',
  dialogCancelButtonText: 'لغو',
  // ActionSheet
  actionSheetTitle: 'انتخاب یک مورد',
  // Empty
  emptyDescription: 'داده‌ای وجود ندارد',
  // InfiniteScroll
  infiniteScrollLoadingText: 'در حال بارگزاری',
  infiniteScrollFinishedText: 'مورد دیگری وجود ندارد',
  infiniteScrollErrorText: 'بارگزاری ناموفق، برای تلاش مجدد ضربه بزنید',
  // Picker
  pickerTitle: 'انتخاب کنید',
  pickerConfirmButtonText: 'تایید',
  pickerCancelButtonText: 'لغو',
  // Cascader
  cascaderPickerAddButtonText: 'افزودن',
  cascaderPickerDoneButtonText: 'تمام',
  // date-picker
  datePickerMonthDict: {
    '01': {
      name: 'ژانویه',
      abbr: 'JAN',
    },
    '02': {
      name: 'فوریه',
      abbr: 'FEB',
    },
    '03': {
      name: 'مارس',
      abbr: 'MAR',
    },
    '04': {
      name: 'آوریل',
      abbr: 'APR',
    },
    '05': {
      name: 'مه',
      abbr: 'MAY',
    },
    '06': {
      name: 'ژوئن',
      abbr: 'JUN',
    },
    '07': {
      name: 'جولای',
      abbr: 'JUL',
    },
    '08': {
      name: 'آگوست',
      abbr: 'AUG',
    },
    '09': {
      name: 'سپتامبر',
      abbr: 'SEP',
    },
    '10': {
      name: 'اوکتبر',
      abbr: 'OCT',
    },
    '11': {
      name: 'نوامبر',
      abbr: 'NOV',
    },
    '12': {
      name: 'دسامبر',
      abbr: 'DEC',
    },
  },
  datePickerWeekDict: {
    '0': {
      name: 'یکشنبه',
      abbr: 'S',
    },
    '1': {
      name: 'دوشنبه',
      abbr: 'M',
    },
    '2': {
      name: 'سه‌شنبه',
      abbr: 'T',
    },
    '3': {
      name: 'چهارشنبه',
      abbr: 'W',
    },
    '4': {
      name: 'پنجشنبه',
      abbr: 'T',
    },
    '5': {
      name: 'جمعه',
      abbr: 'F',
    },
    '6': {
      name: 'شنبه',
      abbr: 'S',
    },
  },
  datePickerSelected: ' انتخاب شده',
  datePickerHint: 'انتخاب تاریخ',
  datePickerColumnYear: 'سال',
  datePickerColumnMonth: 'ماه',
  datePickerColumnDay: 'روز',
  datePickerColumnHour: 'ساعت',
  datePickerColumnMinute: 'دقیقه',
  datePickerColumnSecond: 'ثانیه',
  // pagination
  paginationItem: '',
  paginationPage: 'صفحه',
  paginationJump: 'برو به',
  paginationTotal: 'Total: {0}',
  // time-picker
  timePickerHint: 'انتخاب زمان',
  // time-range
  timeRangeStart: 'شروع',
  timeRangeEnd: 'پایان',
  timeRangeNextDay: 'روز بعد',
} satisfies Message
