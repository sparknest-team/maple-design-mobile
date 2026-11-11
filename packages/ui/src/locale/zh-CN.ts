import type { Message } from './index'

export const defaultCloseText = '关闭'
export const defaultLoadingText = '加载中'
export const defaultEmptyDescription = '暂无数据'
export const defaultBackText = '返回'
export const defaultBreadcrumbLabel = '面包屑导航'
export const defaultBreadcrumbEllipsis = '省略的路径'
export const defaultMoreActions = '更多操作'
export const defaultIndexNavigation = '索引导航'
export const defaultTableScrollable = '可滚动表格'
export const defaultDialogConfirm = '确认'
export const defaultDialogCancel = '取消'
export const defaultInfiniteFinishedText = '没有更多了'
export const defaultInfiniteErrorText = '加载失败，点击重试'

export const defaultImageImagePreviewPrev = '上一张图片'
export const defaultImageImagePreviewNext = '下一张图片'
export const defaultImageImagePreviewFullScreen = '全屏'
export const defaultImageImagePreviewRotateLeft = '向左旋转'
export const defaultImageImagePreviewRotateRight = '向右旋转'
export const defaultImageImagePreviewOriginalSize = '原始尺寸'
export const defaultImageImagePreviewZoomOut = '缩小'
export const defaultImageImagePreviewZoomIn = '放大'
export const defaultImageImagePreviewDownload = '下载图片'
export const defaultImageImagePreviewClose = '关闭图片预览'
export const defaultImageImagePreview = '预览图片'

export const defaultFieldRangeStart = '开始'
export const defaultFieldRangeEnd = '结束'
export const defaultFieldFieldPresentationInput = '请输入'
export const defaultFieldFieldPresentationSelectionCount = '已选 {count} 个'
export const defaultFieldFieldPresentationSelectionRemove = '移除'
export const defaultFieldFieldPresentationSelectionBack = '返回可选项'
export const defaultFieldFieldPresentationSelectionEmpty = '暂无已选项'
export const defaultFieldFieldPresentationEdit = '编辑'
export const defaultFieldFieldPresentationClose = '关闭'
export const defaultFieldFieldPresentationSearch = '搜索选项'
export const defaultFieldFieldPresentationSelected = '已选择'
export const defaultFieldFieldPresentationLimit = '最多选择'
export const defaultFieldCommonIncrease = '增加数值'
export const defaultFieldCommonDecrease = '减少数值'
export const defaultFieldCommonClear = '清空'
export const defaultFieldCommonShowPassword = '显示密码'
export const defaultFieldCommonHidePassword = '隐藏密码'
export const defaultFieldDateRangeStart = '开始日期'
export const defaultFieldDateRangeEnd = '结束日期'
export const defaultFieldTimeRangeStart = '开始时间'
export const defaultFieldTimeRangeEnd = '结束时间'
export const defaultFieldPickerTitle = '请选择'
export const defaultFieldPickerConfirmButtonText = '确认'

export const defaultPaginationItem = '条'
export const defaultPaginationPage = '页'
export const defaultPaginationNavigation = '分页'
export const defaultPaginationPrevious = '上一页'
export const defaultPaginationNext = '下一页'
export const defaultPaginationJump = '前往'
export const defaultPaginationTotal = '共 {0} 条'

export const defaultPeopleSelectCall = '拨打电话'
export const defaultPeopleSelectChat = '聊天'
export const defaultSearchSearch = '搜索'
export const defaultSearchCancel = '取消'
export const defaultSearchHistory = '搜索历史'

export default {
  'imagePreview.prev': defaultImageImagePreviewPrev,
  'imagePreview.next': defaultImageImagePreviewNext,
  'imagePreview.fullScreen': defaultImageImagePreviewFullScreen,
  'imagePreview.rotateLeft': defaultImageImagePreviewRotateLeft,
  'imagePreview.rotateRight': defaultImageImagePreviewRotateRight,
  'imagePreview.originalSize': defaultImageImagePreviewOriginalSize,
  'imagePreview.zoomOut': defaultImageImagePreviewZoomOut,
  'imagePreview.zoomIn': defaultImageImagePreviewZoomIn,
  'imagePreview.download': defaultImageImagePreviewDownload,
  'imagePreview.close': defaultImageImagePreviewClose,
  'image.preview': defaultImageImagePreview,
  'fab.actions': '操作',
  'numberKeyboard.label': '数字键盘',
  'numberKeyboard.delete': '删除',
  'numberKeyboard.done': '完成',

  'tabs.close': '关闭',
  'tabs.add': '新增标签',
  'tabs.previous': '上一组标签',
  'tabs.next': '下一组标签',
  'breadcrumb.label': defaultBreadcrumbLabel,
  'breadcrumb.ellipsis': defaultBreadcrumbEllipsis,
  'splitButton.moreActions': defaultMoreActions,
  'common.back': defaultBackText,
  'indexBar.navigation': defaultIndexNavigation,
  'common.close': defaultCloseText,
  'loading.text': defaultLoadingText,
  'table.scrollable': defaultTableScrollable,
  'peopleSelect.call': defaultPeopleSelectCall,
  'peopleSelect.chat': defaultPeopleSelectChat,
  'fieldPresentation.rangeStart': defaultFieldRangeStart,
  'fieldPresentation.rangeEnd': defaultFieldRangeEnd,
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

  datePickerPreviousWeek: '上一周',
  datePickerNextWeek: '下一周',
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
  'upload.replace': '替换',
  'upload.duration': '视频时长',
  'upload.buttonText': '上传',
  'upload.drag': '将文件拖拽到此处',
  'upload.preview': '预览',
  'upload.download': '下载',
  'upload.cancel': '取消',
  'upload.retry': '重试',
  'upload.delete': '删除',
  'upload.close': '关闭',
  'search.history': defaultSearchHistory,
  'search.search': defaultSearchSearch,
  'search.cancel': defaultSearchCancel,
  'common.increase': defaultFieldCommonIncrease,
  'common.decrease': defaultFieldCommonDecrease,
  'common.clear': defaultFieldCommonClear,
  'common.showPassword': defaultFieldCommonShowPassword,
  'common.hidePassword': defaultFieldCommonHidePassword,
  // Dialog
  dialogTitle: '提示',
  dialogConfirmButtonText: defaultDialogConfirm,
  dialogCancelButtonText: defaultDialogCancel,
  // ActionSheet
  actionSheetTitle: '请选择',
  // Empty
  emptyDescription: defaultEmptyDescription,
  // InfiniteScroll
  infiniteScrollLoadingText: defaultLoadingText,
  infiniteScrollFinishedText: defaultInfiniteFinishedText,
  infiniteScrollErrorText: defaultInfiniteErrorText,
  // Picker
  pickerTitle: defaultFieldPickerTitle,
  pickerConfirmButtonText: defaultFieldPickerConfirmButtonText,
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
  paginationItem: defaultPaginationItem,
  paginationPage: defaultPaginationPage,
  paginationNavigation: defaultPaginationNavigation,
  paginationPrevious: defaultPaginationPrevious,
  paginationNext: defaultPaginationNext,
  paginationJump: defaultPaginationJump,
  paginationTotal: defaultPaginationTotal,
  // time-picker
  timePickerHint: '选择时间',
  // time-range
  rangeStartPlaceholder: '选择开始',
  rangeEndPlaceholder: '选择结束',
  timeRangeStart: defaultFieldTimeRangeStart,
  dateRangeStart: defaultFieldDateRangeStart,
  dateRangeEnd: defaultFieldDateRangeEnd,
  timeRangeEnd: defaultFieldTimeRangeEnd,
  timeRangeNextDay: '次日',
} satisfies Message
