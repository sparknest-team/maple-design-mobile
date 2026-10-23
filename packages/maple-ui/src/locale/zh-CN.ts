import { Message } from './index'

export default {
  'fieldPresentation.input': '请输入',
  'fieldPresentation.selectionCount': '已选 {count} 个',
  'fieldPresentation.selectionRemove': '移除',
  'fieldPresentation.selectionBack': '返回可选项',
  'fieldPresentation.selectionEmpty': '暂无已选项',
  'fieldPresentation.edit': '编辑',
  'fieldPresentation.close': '关闭',
  'fieldPresentation.search': '搜索选项',
  'fieldPresentation.selected': '已选择',
  'fieldPresentation.limit': '最多选择',

  datePickerPreviousMonth: '上一月',
  datePickerNextMonth: '下一月',
  datePickerPreviousYear: '上一年',
  datePickerNextYear: '下一年',
  datePickerPreviousPeriod: '上一组年份',
  datePickerNextPeriod: '下一组年份',
  'carousel.label': '轮播',
  'carousel.previous': '上一页',
  'carousel.next': '下一页',
  'carousel.slide': '第 {index} 页，共 {total} 页',
  'carousel.goto': '切换到第 {index} 页',
  'upload.buttonText': '上传',
  'upload.drag': '将文件拖拽到此处',
  'upload.preview': '预览',
  'upload.download': '下载',
  'upload.cancel': '取消',
  'upload.retry': '重试',
  'upload.delete': '删除',
  'upload.close': '关闭',
  'search.history': '搜索历史',
  'search.search': '搜索',
  'search.cancel': '取消',
  'common.increase': '增加数值',
  'common.decrease': '减少数值',
  'common.clear': '清空',
  'common.showPassword': '显示密码',
  'common.hidePassword': '隐藏密码',
  // Dialog
  dialogTitle: '提示',
  dialogConfirmButtonText: '确认',
  dialogCancelButtonText: '取消',
  // ActionSheet
  actionSheetTitle: '请选择',
  // Empty
  emptyDescription: '暂无数据',
  // InfiniteScroll
  infiniteScrollLoadingText: '加载中',
  infiniteScrollFinishedText: '没有更多了',
  infiniteScrollErrorText: '加载失败，点击重试',
  // Picker
  pickerTitle: '请选择',
  pickerConfirmButtonText: '确认',
  pickerCancelButtonText: '取消',
  // Cascader
  cascaderPickerAddButtonText: '添加',
  cascaderPickerDoneButtonText: '完成',
  // date-picker
  datePickerMonthDict: {
    '01': {
      name: '一月',
      abbr: '一月',
    },
    '02': {
      name: '二月',
      abbr: '二月',
    },
    '03': {
      name: '三月',
      abbr: '三月',
    },
    '04': {
      name: '四月',
      abbr: '四月',
    },
    '05': {
      name: '五月',
      abbr: '五月',
    },
    '06': {
      name: '六月',
      abbr: '六月',
    },
    '07': {
      name: '七月',
      abbr: '七月',
    },
    '08': {
      name: '八月',
      abbr: '八月',
    },
    '09': {
      name: '九月',
      abbr: '九月',
    },
    '10': {
      name: '十月',
      abbr: '十月',
    },
    '11': {
      name: '十一月',
      abbr: '十一月',
    },
    '12': {
      name: '十二月',
      abbr: '十二月',
    },
  },
  datePickerWeekDict: {
    '0': {
      name: '星期日',
      abbr: '日',
    },
    '1': {
      name: '星期一',
      abbr: '一',
    },
    '2': {
      name: '星期二',
      abbr: '二',
    },
    '3': {
      name: '星期三',
      abbr: '三',
    },
    '4': {
      name: '星期四',
      abbr: '四',
    },
    '5': {
      name: '星期五',
      abbr: '五',
    },
    '6': {
      name: '星期六',
      abbr: '六',
    },
  },
  datePickerSelected: '个被选择',
  dateRangeOrderError: '结束日期不能早于开始日期，请调整起止日期',
  dateTimeRangeOrderError: '结束时间不能早于开始时间，请调整起止时间',
  timeRangeOrderError: '结束时间不能早于开始时间，请调整起止时间',
  datePickerNowButtonText: '此刻',
  datePickerHint: '选择日期',
  datePickerColumnYear: '年',
  datePickerColumnMonth: '月',
  datePickerColumnDay: '日',
  datePickerColumnHour: '时',
  datePickerColumnMinute: '分',
  datePickerColumnSecond: '秒',
  // pagination
  paginationItem: '条',
  paginationPage: '页',
  paginationNavigation: '分页',
  paginationPrevious: '上一页',
  paginationNext: '下一页',
  paginationJump: '前往',
  paginationTotal: '共 {0} 条',
  // time-picker
  timePickerHint: '选择时间',
  // time-range
  timeRangeStart: '开始时间',
  dateRangeStart: '开始日期',
  dateRangeEnd: '结束日期',
  timeRangeEnd: '结束时间',
  timeRangeNextDay: '次日',
} satisfies Message
