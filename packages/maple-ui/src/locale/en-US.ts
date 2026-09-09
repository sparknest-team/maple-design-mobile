import { Message } from './index'

export default {
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
  timeRangeEnd: 'End',
  timeRangeNextDay: 'Next day',
} satisfies Message
