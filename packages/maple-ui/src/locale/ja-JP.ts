import { Message } from './index'

export default {
  'fieldPresentation.selectionCount': '{count} selected',
  'fieldPresentation.selectionRemove': 'Remove',
  'fieldPresentation.selectionBack': 'Back to options',
  'fieldPresentation.selectionEmpty': 'No selected options',
  'fieldPresentation.edit': 'Edit',
  'fieldPresentation.close': 'Close',
  'fieldPresentation.search': 'Search options',
  'fieldPresentation.selected': 'Selected',
  'fieldPresentation.limit': 'Select at most',

  datePickerPreviousWeek: '前の週',
  datePickerNextWeek: '次の週',
  datePickerPreviousMonth: '前の月',
  datePickerNextMonth: '次の月',
  datePickerPreviousYear: '前の年',
  datePickerNextYear: '次の年',
  datePickerPreviousPeriod: '前の年の範囲',
  datePickerNextPeriod: '次の年の範囲',
  'carousel.label': 'カルーセル',
  'carousel.previous': '前のスライド',
  'carousel.next': '次のスライド',
  'carousel.slide': '{total} 枚中 {index} 枚目',
  'carousel.goto': 'スライド {index} に移動',
  'upload.replace': '置き換え',
  'upload.duration': '動画の長さ',
  'upload.buttonText': 'アップロード',
  'upload.drag': 'ここにファイルをドロップ',
  'upload.preview': 'プレビュー',
  'upload.download': 'ダウンロード',
  'upload.cancel': 'キャンセル',
  'upload.retry': '再試行',
  'upload.delete': '削除',
  'upload.close': '閉じる',
  'search.history': '検索履歴',
  'search.search': '検索',
  'search.cancel': 'キャンセル',
  'common.increase': '値を増やす',
  'common.decrease': '値を減らす',
  'common.clear': 'クリア',
  'common.showPassword': 'パスワードを表示',
  'common.hidePassword': 'パスワードを隠す',
  // Dialog
  dialogTitle: '確認',
  dialogConfirmButtonText: '確認',
  dialogCancelButtonText: 'キャンセル',
  // ActionSheet
  actionSheetTitle: 'いずれかを選択',
  // Empty
  emptyDescription: 'データがありません',
  // InfiniteScroll
  infiniteScrollLoadingText: '読み込み中',
  infiniteScrollFinishedText: '以上です',
  infiniteScrollErrorText: '読み込みに失敗しました。タップして再試行',
  // Picker
  pickerTitle: '選択してください',
  pickerConfirmButtonText: '確認',
  pickerCancelButtonText: 'キャンセル',
  // Cascader
  cascaderPickerAddButtonText: '追加',
  cascaderPickerDoneButtonText: '完了',
  // date-picker
  datePickerMonthDict: {
    '01': {
      name: '1月',
      abbr: '1月',
    },
    '02': {
      name: '2月',
      abbr: '2月',
    },
    '03': {
      name: '3月',
      abbr: '3月',
    },
    '04': {
      name: '4月',
      abbr: '4月',
    },
    '05': {
      name: '5月',
      abbr: '5月',
    },
    '06': {
      name: '6月',
      abbr: '6月',
    },
    '07': {
      name: '7月',
      abbr: '7月',
    },
    '08': {
      name: '8月',
      abbr: '8月',
    },
    '09': {
      name: '9月',
      abbr: '9月',
    },
    '10': {
      name: '10月',
      abbr: '10月',
    },
    '11': {
      name: '11月',
      abbr: '11月',
    },
    '12': {
      name: '12月',
      abbr: '12月',
    },
  },
  datePickerWeekDict: {
    '0': {
      name: '日曜日',
      abbr: '日',
    },
    '1': {
      name: '月曜日',
      abbr: '月',
    },
    '2': {
      name: '火曜日',
      abbr: '火',
    },
    '3': {
      name: '水曜日',
      abbr: '水',
    },
    '4': {
      name: '木曜日',
      abbr: '木',
    },
    '5': {
      name: '金曜日',
      abbr: '金',
    },
    '6': {
      name: '土曜日',
      abbr: '土',
    },
  },
  datePickerSelected: '件選択済み',
  dateRangeOrderError: '終了日は開始日以降にしてください。',
  dateTimeRangeOrderError: '終了時刻は開始時刻以降にしてください。',
  timeRangeOrderError: '終了時刻は開始時刻以降にしてください。',
  datePickerNowButtonText: '現在',
  datePickerHint: '日付を選択',
  datePickerColumnYear: '年',
  datePickerColumnMonth: '月',
  datePickerColumnDay: '日',
  datePickerColumnHour: '時',
  datePickerColumnMinute: '分',
  datePickerColumnSecond: '秒',
  // pagination
  paginationItem: '件',
  paginationPage: 'ページ',
  paginationNavigation: 'ページネーション',
  paginationPrevious: '前のページ',
  paginationNext: '次のページ',
  paginationJump: 'ジャンプ',
  paginationTotal: '全 {0} 件',
  // time-picker
  timePickerHint: '時間を選択',
  // time-range
  rangeStartPlaceholder: '開始を選択',
  rangeEndPlaceholder: '終了を選択',
  timeRangeStart: '開始時刻',
  dateRangeStart: '開始日',
  dateRangeEnd: '終了日',
  timeRangeEnd: '終了時刻',
  timeRangeNextDay: '翌日',
} satisfies Message
