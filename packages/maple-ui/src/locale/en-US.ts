import { Message } from './index'

export default {
  'fieldPresentation.input': 'Please enter',
  'fieldPresentation.selectionCount': '{count} selected',
  'fieldPresentation.selectionRemove': 'Remove',
  'fieldPresentation.selectionBack': 'Back to options',
  'fieldPresentation.selectionEmpty': 'No selected options',
  'fieldPresentation.edit': 'Edit',
  'fieldPresentation.close': 'Close',
  'fieldPresentation.search': 'Search options',
  'fieldPresentation.selected': 'Selected',
  'fieldPresentation.limit': 'Select at most',

  datePickerPreviousMonth: 'Previous month',
  datePickerNextMonth: 'Next month',
  datePickerPreviousYear: 'Previous year',
  datePickerNextYear: 'Next year',
  datePickerPreviousPeriod: 'Previous years',
  datePickerNextPeriod: 'Next years',
  'carousel.label': 'Carousel',
  'carousel.previous': 'Previous slide',
  'carousel.next': 'Next slide',
  'carousel.slide': '{index} of {total}',
  'carousel.goto': 'Go to slide {index}',
  'upload.buttonText': 'Upload',
  'upload.drag': 'Drop files here',
  'upload.preview': 'Preview',
  'upload.download': 'Download',
  'upload.cancel': 'Cancel',
  'upload.retry': 'Retry',
  'upload.delete': 'Remove',
  'upload.close': 'Close',
  'search.history': 'Search history',
  'search.search': 'Search',
  'search.cancel': 'Cancel',
  'common.increase': 'Increase value',
  'common.decrease': 'Decrease value',
  'common.clear': 'Clear',
  'common.showPassword': 'Show password',
  'common.hidePassword': 'Hide password',
  // Dialog
  dialogTitle: 'Hint',
  dialogConfirmButtonText: 'Confirm',
  dialogCancelButtonText: 'Cancel',
  // ActionSheet
  actionSheetTitle: 'Select One',
  // Empty
  emptyDescription: 'No Data',
  // InfiniteScroll
  infiniteScrollLoadingText: 'Loading',
  infiniteScrollFinishedText: 'No more',
  infiniteScrollErrorText: 'Load failed. Tap to retry',
  // Picker
  pickerTitle: 'Pick it',
  pickerConfirmButtonText: 'Confirm',
  pickerCancelButtonText: 'Cancel',
  // Cascader
  cascaderPickerAddButtonText: 'Add',
  cascaderPickerDoneButtonText: 'Done',
  // date-picker
  datePickerMonthDict: {
    '01': {
      name: 'January',
      abbr: 'JAN',
    },
    '02': {
      name: 'February',
      abbr: 'FEB',
    },
    '03': {
      name: 'March',
      abbr: 'MAR',
    },
    '04': {
      name: 'April',
      abbr: 'APR',
    },
    '05': {
      name: 'May',
      abbr: 'MAY',
    },
    '06': {
      name: 'June',
      abbr: 'JUN',
    },
    '07': {
      name: 'July',
      abbr: 'JUL',
    },
    '08': {
      name: 'August',
      abbr: 'AUG',
    },
    '09': {
      name: 'September',
      abbr: 'SEP',
    },
    '10': {
      name: 'October',
      abbr: 'OCT',
    },
    '11': {
      name: 'November',
      abbr: 'NOV',
    },
    '12': {
      name: 'December',
      abbr: 'DEC',
    },
  },
  datePickerWeekDict: {
    '0': {
      name: 'Sunday',
      abbr: 'S',
    },
    '1': {
      name: 'Monday',
      abbr: 'M',
    },
    '2': {
      name: 'Tuesday',
      abbr: 'T',
    },
    '3': {
      name: 'Wednesday',
      abbr: 'W',
    },
    '4': {
      name: 'Thursday',
      abbr: 'T',
    },
    '5': {
      name: 'Friday',
      abbr: 'F',
    },
    '6': {
      name: 'Saturday',
      abbr: 'S',
    },
  },
  datePickerSelected: ' selected',
  dateRangeOrderError: 'The end date cannot be earlier than the start date. Adjust the range.',
  dateTimeRangeOrderError: 'The end time cannot be earlier than the start time. Adjust the range.',
  timeRangeOrderError: 'The end time cannot be earlier than the start time. Adjust the range.',
  datePickerNowButtonText: 'Now',
  datePickerHint: 'SELECT DATE',
  datePickerColumnYear: 'Y',
  datePickerColumnMonth: 'M',
  datePickerColumnDay: 'D',
  datePickerColumnHour: 'H',
  datePickerColumnMinute: 'M',
  datePickerColumnSecond: 'S',
  // pagination
  paginationItem: '',
  paginationPage: 'page',
  paginationNavigation: 'Pagination',
  paginationPrevious: 'Previous page',
  paginationNext: 'Next page',
  paginationJump: 'Go to',
  paginationTotal: 'Total: {0}',
  // time-picker
  timePickerHint: 'SELECT TIME',
  // time-range
  timeRangeStart: 'Start',
  dateRangeStart: 'Start date',
  dateRangeEnd: 'End date',
  timeRangeEnd: 'End',
  timeRangeNextDay: 'Next day',
} satisfies Message
