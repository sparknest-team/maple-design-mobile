import type { ComponentPublicInstance, CSSProperties, PropType, Slot, VNode } from 'vue'
import {
  cloneVNode,
  computed,
  defineComponent,
  Fragment,
  getCurrentInstance,
  inject,
  isVNode,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef,
  Teleport,
  toRaw,
  toRefs,
  watch,
  watchEffect,
  watchPostEffect,
} from 'vue'
import { IconMinus } from '@maple-design/icons-vue/icon-minus'
import { IconPlus } from '@maple-design/icons-vue/icon-plus'
import ClientOnly from '../_components/client-only'
import Scrollbar, { ScrollbarProps } from '../_components/selection-scrollbar'
// Keep the existing published declaration binding for virtualListProps.
import { VirtualListProps } from '../_components/virtual-list-v2/interface'
import { useChildrenComponents } from '../_hooks/use-children-components'
import { useComponentRef } from '../_hooks/use-component-ref'
import { useScrollbar } from '../_hooks/use-scrollbar'
import type { ComponentSize } from '../_utils/constant'
import { debounce } from '../_utils/debounce'
import { inlineScrollLeft, physicalScrollLeft, setInlineScrollLeft, useDirection } from '../_utils/direction'
import { getValueByPath } from '../_utils/get-value-by-path'
import { isArray, isFunction, isNumber, isObject, isString, isUndefined } from '../_utils/is'
import { omit } from '../_utils/omit'
import { useElementResize } from '../_utils/resize-observer'
import type { BaseType } from '../_utils/types'
import { getComponentsFromVNode } from '../_utils/vue-utils'
import Empty from '../empty'
import Loading from '../loading/Loading.vue'
import Pagination, { PaginationProps } from '../pagination'
import { useThemeScope } from '../theme-provider/context'
import { createNamespace, getPrefixCls } from '../utils/components'
import { useId } from '../utils/vue-compat'
import { tableInjectionKey } from './context'
import {
  getColumnLayoutKey,
  getExtraColumnWidth,
  isTableExtraColumn,
  markTableExtraColumn,
  resolveExtraColumnConfig,
  type TableExtraColumnConfig,
} from './extra-column'
import { useDrag } from './features/drag/use-drag'
import { useExpand } from './features/expansion/state'
import { useLazyData } from './features/expansion/use-lazy-data'
import { filterTableRows, matchesRecord } from './features/filter/compute'
import { useFilter } from './features/filter/state'
import { pageTableRows } from './features/pagination/compute'
import { usePagination } from './features/pagination/state'
import { useColumnResize } from './features/resize/use-column-resize'
import { useRowSelection } from './features/selection/state'
import { sortRecords } from './features/sort/compute'
import { useSorter } from './features/sort/state'
import { useSpan } from './features/span/use-span'
import { useSummaryData } from './features/summary/use-summary-data'
import { useSummaryRender } from './features/summary/use-summary-render'
import { createVirtualBody } from './features/virtual/render-body'
import type { VirtualRowPositions as VirtualPositions } from './features/virtual/row-plan'
import { forwardTableSlot } from './forward-table-slot'
import { buildHeaderAssociations } from './header-association'
import { updateColumnsWidth } from './hooks/use-columns-layout'
import { useI18n } from './mobile-locale'
import ResizeObserver from './MobileResizeObserver'
import { tableProps } from './props'
import { firstStructuralNode } from './structural-slot'
import OperationTd from './table-operation-td'
import OperationTh from './table-operation-th'
import Tbody from './table-tbody'
import Td from './table-td'
import Th from './table-th'
import Thead from './table-thead'
import Tr from './table-tr'
import ColGroup from './TableColGroup.vue'
import TableColumnSlot from './TableColumnSlot.vue'
import TableSlot from './TableSlot.vue'
import type {
  TableBorder,
  TableChangeExtra,
  TableColumnData,
  TableComponents,
  TableData,
  TableDataWithRaw,
  TableDraggable,
  TableExpandable,
  TableOperationColumn,
  TablePaginationConfig,
  TablePaginationScope,
  TableRowSelection,
} from './types'
import { getGroupColumns, mapArrayWithChildren, mapRawTableData } from './utils'

const DEFAULT_BORDERED = {
  wrapper: true,
  cell: false,
  headerCell: false,
  bodyCell: false,
}

const { name } = createNamespace('table')

export default defineComponent({
  name,
  props: tableProps,
  emits: {
    'update:selectedKeys': (rowKeys: (string | number)[]) => true,
    'update:expandedKeys': (rowKeys: (string | number)[]) => true,
    'update:columns': (columns: TableColumnData[]) => true,
    /**
     * @zh 点击展开行时触发
     * @en Triggered when a row is clicked to expand
     * @param {string | number} rowKey
     * @param {TableData} record
     */
    expand: (rowKey: string | number, record: TableData) => true,
    /**
     * @zh 已展开的数据行发生改变时触发
     * @en Triggered when the expanded data row changes
     * @param {(string | number)[]} rowKeys
     */
    'expanded-change': (rowKeys: (string | number)[]) => true,
    /**
     * @zh 点击行选择器时触发
     * @en Triggered when the row selector is clicked
     * @param {string | number[]} rowKeys
     * @param {string | number} rowKey
     * @param {TableData} record
     */
    select: (rowKeys: (string | number)[], rowKey: string | number, record: TableData) => true,
    /**
     * @zh 点击全选选择器时触发
     * @en Triggered when the select all selector is clicked
     * @param {boolean} checked
     */
    'select-all': (checked: boolean) => true,
    /**
     * @zh 已选择的数据行发生改变时触发
     * @en Triggered when the selected data row changes
     * @param {(string | number)[]} rowKeys
     */
    'selection-change': (rowKeys: (string | number)[]) => true,
    /**
     * @zh 排序规则发生改变时触发
     * @en Triggered when the collation changes
     * @param {string} dataIndex
     * @param {string} direction
     */
    'sorter-change': (dataIndex: string, direction: string) => true,
    /**
     * @zh 过滤选项发生改变时触发
     * @en Triggered when the filter options are changed
     * @param {string} dataIndex
     * @param {string[]} filteredValues
     */
    'filter-change': (dataIndex: string, filteredValues: string[]) => true,
    /**
     * @zh 表格分页发生改变时触发
     * @en Triggered when the table pagination changes
     * @param {number} page
     */
    'page-change': (page: number) => true,
    /**
     * @zh 表格每页数据数量发生改变时触发
     * @en Triggered when the number of data per page of the table changes
     * @param {number} pageSize
     */
    'page-size-change': (pageSize: number) => true,
    /**
     * @zh 表格数据发生变化时触发
     * @en Triggered when table data changes
     * @param {TableData[]} data
     * @param {TableChangeExtra} extra
     * @param {TableData[]} currentData
     */
    change: (data: TableData[], extra: TableChangeExtra, currentData: TableData[]) => true,
    /**
     * @zh 单元格 hover 进入时触发
     * @en Triggered when hovering into a cell
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cell-mouse-enter': (record: TableData, column: TableColumnData, ev: Event) => true,
    /**
     * @zh 单元格 hover 退出时触发
     * @en Triggered when hovering out of a cell
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cell-mouse-leave': (record: TableData, column: TableColumnData, ev: Event) => true,
    /**
     * @zh 点击单元格时触发
     * @en Triggered when a cell is clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cell-click': (record: TableData, column: TableColumnData, ev: Event) => true,
    /**
     * @zh 点击行数据时触发
     * @en Triggered when row data is clicked
     * @param {TableData} record
     * @param {Event} ev
     */
    'row-touchstart': (record: TableData, event: TouchEvent) => true,
    'row-touchend': (record: TableData, event: TouchEvent) => true,
    'row-touchcancel': (record: TableData, event: TouchEvent) => true,
    'row-click': (record: TableData, ev: Event) => true,
    /**
     * @zh 点击表头数据时触发
     * @en Triggered when the header data is clicked
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'header-click': (column: TableColumnData, ev: Event) => true,
    /**
     * @zh 调整列宽时触发
     * @en Triggered when column width is adjusted
     * @param {string} dataIndex
     * @param {number} width
     */
    'column-resize': (dataIndex: string, width: number) => true,
    /**
     * @zh 双击行数据时触发
     * @en Triggered when row data is double clicked
     * @param {TableData} record
     * @param {Event} ev
     */
    'row-dblclick': (record: TableData, ev: Event) => true,
    /**
     * @zh 双击单元格时触发
     * @en Triggered when a cell is double clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cell-dblclick': (record: TableData, column: TableColumnData, ev: Event) => true,
    /**
     * @zh 右击行数据时触发
     * @en Triggered when row data is right clicked
     * @param {TableData} record
     * @param {Event} ev
     */
    'row-contextmenu': (record: TableData, ev: Event) => true,
    /**
     * @zh 右击单元格时触发
     * @en Triggered when a cell is right clicked
     * @param {TableData} record
     * @param {TableColumnData} column
     * @param {Event} ev
     */
    'cell-contextmenu': (record: TableData, column: TableColumnData, ev: Event) => true,
  },
  /**
   * @zh 表格列定义。启用时会屏蔽 columns 属性
   * @en Table column definitions. When enabled, the columns attribute is masked
   * @slot columns
   */
  /**
   * @zh 展开行图标
   * @en Expand row icon
   * @slot expand-icon
   * @binding {boolean} expanded
   * @binding {TableData} record
   */
  /**
   * @zh 展开行内容
   * @en Expand row content
   * @slot expand-row
   * @binding {TableData} record
   */
  /**
   * @zh 表格底部
   * @en Table Footer
   * @slot footer
   */
  /**
   * @zh 拖拽锚点图标
   * @en Drag handle icon
   * @slot drag-handle-icon
   */
  /**
   * @zh 自定义 tbody 元素
   * @en Custom tbody element
   * @slot tbody
   */
  /**
   * @zh 自定义 tr 元素
   * @en Custom tr element
   * @slot tr
   * @binding {TableData} record
   * @binding {number} rowIndex
   */
  /**
   * @zh 自定义 td 元素
   * @en Custom td element
   * @slot td
   * @binding {TableColumnData} column
   * @binding {TableData} record
   * @binding {number} rowIndex
   */
  /**
   * @zh 自定义完整分页内容，保留 Table 吸底与横向滚动布局
   * @en Custom pagination content inside the managed sticky footer
   * @slot pagination
   * @binding {TablePaginationScope} scope
   */
  /**
   * @zh 分页器左侧内容
   * @en Content on the left side of the pagination
   * @slot pagination-left
   */
  /**
   * @zh 分页器右侧内容
   * @en Content on the right side of the pagination
   * @slot pagination-right
   */
  /**
   * @zh 总结行
   * @en Content on the right side of the pagination
   * @slot summary-cell
   * @binding {TableColumnData} column
   * @binding {TableData} record
   * @binding {number} rowIndex
   */
  /**
   * @zh 空白展示
   * @en Empty
   * @slot empty
   */
  /**
   * @zh 自定义 thead 元素
   * @en Custom thead element
   * @slot thead
   */
  /**
   * @zh 自定义 th 元素
   * @en Custom th element
   * @slot th
   * @binding {TableColumnData} column
   */
  /**
   * @zh 扩展列表头内容
   * @en Extra column header content
   * @slot extra-column-header
   */
  /**
   * @zh 扩展列单元格内容
   * @en Extra column cell content
   * @slot extra-column-cell
   * @binding {TableData} record
   */
  /**
   * @zh 表头单元格操作区（如列管理菜单）
   * @en Header cell actions area (e.g. column manager menu)
   * @slot header-cell-actions
   * @binding {TableColumnData} column
   * @binding {string} dataIndex
   */
  setup(props, { attrs, emit, slots }) {
    const themeScope = useThemeScope()
    const { t, i18nMessage } = useI18n()
    const {
      columns,
      rowKey,
      rowSelection,
      expandable,
      loadMore,
      filterIconAlignLeft,
      selectedKeys,
      defaultSelectedKeys,
      expandedKeys,
      defaultExpandedKeys,
      defaultExpandAllRows,
      spanMethod,
      draggable,
      summarySpanMethod,
      scrollbar,
      showEmptyTree,
    } = toRefs(props)
    const prefixCls = getPrefixCls('table')
    const extraColumnConfig = computed(() => resolveExtraColumnConfig(props.extraColumn))

    const bordered = computed(() => {
      if (isObject(props.bordered)) {
        return { ...DEFAULT_BORDERED, ...props.bordered }
      }
      return { ...DEFAULT_BORDERED, wrapper: props.bordered }
    })
    const { children, components, getComponents } = useChildrenComponents(createNamespace('table-column').name)
    const checkStrictly = computed(() => rowSelection.value?.checkStrictly ?? true)

    const { displayScrollbar, scrollbarProps } = useScrollbar(scrollbar)

    const tableWidth = ref(0)
    const tableHovered = ref(false)
    const tableFocused = ref(false)
    const tableInteractionEvents = {
      onMouseenter: () => {
        tableHovered.value = true
      },
      onMouseleave: () => {
        tableHovered.value = false
      },
      onFocusin: () => {
        tableFocused.value = true
      },
      onFocusout: (event: FocusEvent) => {
        tableFocused.value =
          event.relatedTarget instanceof Node && (event.currentTarget as HTMLElement).contains(event.relatedTarget)
      },
    }
    const hasHorizontalOverflow = ref(false)
    const bodyWidth = ref(0)

    const columnRealWidth = reactive<Record<string, number>>({})

    // Height constraints split the header/body; horizontal overflow comes from column sizing.
    const hasBodyHeightConstraint = computed(() => props.height != null || props.maxHeight != null)

    // const theadRef = ref<HTMLElement>();
    const summaryRef = ref<HTMLElement>()
    const thRefs = ref<Record<string, HTMLElement>>({})

    const { componentRef: contentComRef, elementRef: contentRef } = useComponentRef('containerRef')
    const { componentRef: tbodyComRef, elementRef: tbodyRef } = useComponentRef('containerRef')
    const { componentRef: theadComRef, elementRef: theadRef } = useComponentRef('containerRef')
    const containerElement = computed(() => {
      // Vue 3.2 can evaluate direction watchers synchronously during SSR setup.
      // Both container refs are empty until mounting, before splitTable is ready.
      if (!contentRef.value && !tbodyRef.value) {
        return undefined
      }
      if (splitTable.value) {
        return tbodyRef.value
      }
      return contentRef.value
    })

    const { dir: readingDirection } = useDirection(
      () => containerElement.value,
      () => attrs.dir,
    )

    const splitTable = computed(
      () =>
        hasBodyHeightConstraint.value ||
        props.stickyHeader !== false ||
        isVirtualList.value ||
        flattenData.value.length === 0,
    )

    const toCssSize = (value: number | string) => (isNumber(value) ? `${value}px` : value)

    const bodyMaxHeight = computed(() => {
      if (props.maxHeight != null) {
        return toCssSize(props.maxHeight)
      }
      if (props.height != null) {
        return isNumber(props.height) ? `${props.height}px` : '100%'
      }
      return undefined
    })

    const tableContainerRef = ref<HTMLElement>()
    // 祖先链存在「宽度由内容决定」的元素时，root 会被 inline 钉在第一个
    // 宽度不依赖内容的祖先的内容宽上（见 updateTableWidth），正常布局下为 undefined
    const rootMaxWidth = ref<string>()

    const updateTableWidth = () => {
      // 必须量 container：边框画在 container 上，根节点 clientWidth 会偏大，
      // 列宽按根节点铺满后 scrollWidth > clientWidth，虚拟滚动条会一直出现
      const el = tableContainerRef.value
      if (!el) {
        return
      }
      const root = el.closest(`.${prefixCls}`) as HTMLElement | null
      // 探测：钉住期间 root 尺寸不再随容器变化（RO 不触发），且钉住本身会掩盖
      // 祖先链从「追逐」恢复「健康」的变化（中间层 shrink-wrap 的是被钉住的
      // root，量不出真实约束）。先解开 inline 钉宽，同步量出自然宽度再判定。
      // 解开—测量—恢复在同一同步块内完成，中间态不会被绘制。
      if (root && rootMaxWidth.value != null) {
        root.style.maxWidth = ''
      }
      let width = Math.floor(el.clientWidth)
      // container 的边框（offsetWidth 与 clientWidth 之差，与尺寸无关）：
      // 钉住后 container clientWidth = 诚实宽度 - chrome，引擎须按后者铺满，
      // 否则铺满后 scrollWidth 比 clientWidth 大出边框宽，虚拟滚动条误出现
      const chrome = el.offsetWidth - el.clientWidth
      let pinned = false
      if (width > 0) {
        // 祖先链含「宽度由内容决定」的元素时（width:max-content、shrink-to-fit
        // 的 inline-block 等），容器宽会追逐表格像素宽：引擎永远量到
        // 容器 ≈ 内容，判定不溢出 → 不出现内部滚动条、页面被一路撑大。
        // 正常 block 链中祖先内容宽不会窄于容器（width:100% 逐层向下解析），
        // 一旦出现更窄的祖先，说明中间层被内容撑大，可用宽度应以最窄祖先的
        // 内容宽为准，同时把 root inline 钉在该宽度上阻止 CSS 侧继续追逐。
        // body/html 不参与：body 宽收敛于视口，会把「有意比视口宽的面板」误判为
        // 追逐（整页无约束的追逐由 CSS max-width:min(100%,100vw) 兜底）。
        let honest = width
        let node = el.parentElement
        while (node && node !== document.body) {
          const style = getComputedStyle(node)
          const contentWidth = Math.floor(
            node.clientWidth - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0),
          )
          if (contentWidth > 0 && contentWidth < honest - 1) {
            honest = contentWidth
            pinned = true
          }
          node = node.parentElement
        }
        if (pinned) {
          width = Math.max(0, honest - chrome)
        }
      }
      const nextPin = pinned ? `${width + chrome}px` : undefined
      // 立即恢复 inline 钉宽（Vue 之后也会按 rootMaxWidth 应用同值，幂等）；
      // 不能靠 Vue 补写：钉宽未变化时 Vue 不会重新 patch，探测清掉的值就丢了
      if (root) {
        root.style.maxWidth = nextPin ?? ''
      }
      rootMaxWidth.value = nextPin
      if (width > 0 && width !== tableWidth.value) {
        tableWidth.value = width
      }
    }

    onMounted(() => {
      // 钉住期间 root 尺寸不变、RO 不触发，窗口变化时需主动重探诚实宽度
      window.addEventListener('resize', updateTableWidth)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateTableWidth)
    })

    const handleTableResize = () => {
      updateTableWidth()
    }

    const slotColumnMap = reactive(new Map<number, TableColumnData>())
    const slotColumns = ref<TableColumnData[]>()

    watch(
      [components, slotColumnMap],
      ([components, slotColumnMap]) => {
        if (components.length === 0 && slotColumnMap.size > 0) {
          slotColumns.value = [...slotColumnMap.values()]
        } else if (components.length > 0) {
          const columns: TableColumnData[] = []
          components.forEach((id) => {
            const column = slotColumnMap.get(id)
            if (column) {
              columns.push(column)
            }
          })
          slotColumns.value = columns
        } else {
          slotColumns.value = undefined
        }
      },
      { flush: 'sync' },
    )

    // 拆解分组后的数据表头信息
    const dataColumnMap = new Map<string, TableColumnData>()
    const dataColumns = ref<TableColumnData[]>([])
    const groupColumns = ref<TableColumnData[][]>([])

    const { resizingColumn, columnWidth, handleThMouseDown, handleThMouseUp, handleThKeydown } = useColumnResize(
      thRefs,
      emit,
    )

    watch(
      [columns, slotColumns, columnWidth, () => extraColumnConfig.value, () => props.size, readingDirection],
      ([columns, slotColumns, , extraConfig, size, direction]) => {
        const baseColumns = [...(slotColumns ?? columns ?? [])]
        if (extraConfig.enabled) {
          const extraCls = `${prefixCls}-extra-column-cell`
          baseColumns.push(
            markTableExtraColumn({
              dataIndex: extraConfig.dataIndex,
              title: '',
              width: getExtraColumnWidth(size, extraConfig.width),
              fixed: extraConfig.fixed,
              align: extraConfig.align,
              headerCellClass: extraCls,
              cellClass: extraCls,
              slotName: 'extra-column-cell',
              render: () => null,
            }),
          )
        }
        const result = getGroupColumns(baseColumns, dataColumnMap, columnWidth, direction)
        dataColumns.value = result.dataColumns
        groupColumns.value = result.groupColumns
      },
      { immediate: true, deep: true, flush: 'sync' },
    )

    const hasLeftFixedColumn = ref(false)
    const hasRightFixedColumn = ref(false)
    const hasLeftFixedDataColumns = ref(false)

    watchEffect(() => {
      let _hasLeftFixedColumn = false
      let _hasRightFixedColumn = false
      let _hasLeftFixedDataColumns = false
      if (props.rowSelection?.fixed || props.expandable?.fixed || props.draggable?.fixed) {
        _hasLeftFixedColumn = true
      }
      for (const column of dataColumns.value) {
        if (column.fixed === 'left') {
          _hasLeftFixedColumn = true
          _hasLeftFixedDataColumns = true
        } else if (column.fixed === 'right') {
          _hasRightFixedColumn = true
        }
      }
      if (_hasLeftFixedColumn !== hasLeftFixedColumn.value) {
        hasLeftFixedColumn.value = _hasLeftFixedColumn
      }
      if (_hasRightFixedColumn !== hasRightFixedColumn.value) {
        hasRightFixedColumn.value = _hasRightFixedColumn
      }
      if (_hasLeftFixedDataColumns !== hasLeftFixedDataColumns.value) {
        hasLeftFixedDataColumns.value = _hasLeftFixedDataColumns
      }
    })

    const hasEllipsis = computed(() => {
      for (const col of dataColumns.value) {
        if (col.ellipsis) {
          return true
        }
      }
      return false
    })

    const handleChange = (type: 'pagination' | 'sorter' | 'filter' | 'drag') => {
      const extra: TableChangeExtra = {
        type,
        page: page.value,
        pageSize: pageSize.value,
        sorter: computedSorter.value,
        filters: computedFilters.value,
        dragTarget: type === 'drag' ? dragState.data : undefined,
      }
      emit('change', flattenRawData.value, extra, sortedData.value)
    }

    const handleFilterChange = (dataIndex: string, filteredValues: string[]) => {
      _filters.value = {
        ...computedFilters.value,
        [dataIndex]: filteredValues,
      }

      emit('filter-change', dataIndex, filteredValues)
      handleChange('filter')
    }

    const handleSorterChange = (dataIndex: string, direction: 'ascend' | 'descend' | '') => {
      _sorter.value = direction
        ? {
            field: dataIndex,
            direction,
          }
        : undefined

      emit('sorter-change', dataIndex, direction)
      handleChange('sorter')
    }

    const { _filters, computedFilters, resetFilters, clearFilters } = useFilter({
      columns: dataColumns,
      onFilterChange: handleFilterChange,
    })
    const { _sorter, computedSorter, resetSorters, clearSorters } = useSorter({
      columns: dataColumns,
      onSorterChange: handleSorterChange,
    })

    const disabledKeys = new Set()

    const allRowKeys = computed(() => {
      const allRowKeys: BaseType[] = []
      disabledKeys.clear()
      const travelData = (data: TableData[]) => {
        if (isArray(data) && data.length > 0) {
          for (const record of data) {
            allRowKeys.push(record[rowKey.value])
            if (record.disabled) {
              disabledKeys.add(record[rowKey.value])
            }
            if (record.children) {
              travelData(record.children)
            }
          }
        }
      }

      travelData(props.data)

      return allRowKeys
    })

    const currentAllRowKeys = computed(() => {
      const keys: BaseType[] = []
      const travel = (data: TableDataWithRaw[]) => {
        for (const record of data) {
          keys.push(record.key)
          if (record.children) {
            travel(record.children)
          }
        }
      }
      travel(flattenData.value)

      return keys
    })

    const currentAllEnabledRowKeys = computed(() => {
      const keys: BaseType[] = []

      const travel = (data: TableDataWithRaw[]) => {
        for (const record of data) {
          if (!record.disabled) {
            keys.push(record.key)
          }
          if (record.children) {
            travel(record.children)
          }
        }
      }
      travel(flattenData.value)

      return keys
    })

    const {
      isRadio,
      selectedRowKeys,
      currentSelectedRowKeys,
      handleSelect,
      handleSelectAllLeafs,
      handleSelectAll,
      select,
      selectAll,
      clearSelected,
    } = useRowSelection({
      selectedKeys,
      defaultSelectedKeys,
      rowSelection,
      currentAllRowKeys,
      currentAllEnabledRowKeys,
      emit,
    })

    const { expandedRowKeys, handleExpand, expand, expandAll } = useExpand({
      expandedKeys,
      defaultExpandedKeys,
      defaultExpandAllRows,
      expandable,
      allRowKeys,
      emit,
    })

    const { lazyLoadRevision, getLazyChildren, addLazyLoadData } = useLazyData(props)

    const isValidRecord = (record: TableDataWithRaw) =>
      matchesRecord(
        record.raw,
        () => computedFilters.value,
        (field) => dataColumnMap.get(field),
      )

    const {
      dragType,
      dragState,
      handleDragStart,
      handleDragEnter,
      handleDragLeave,
      handleDragover,
      handleDragEnd,
      handleDrop,
    } = useDrag(draggable)

    const processedData = computed(() => {
      void lazyLoadRevision.value
      const travel = (data: TableData[]) => {
        const result: TableDataWithRaw[] = []

        for (const _record of data) {
          const record: TableDataWithRaw = {
            raw: _record,
            key: _record[props.rowKey],
            disabled: _record.disabled,
            expand: _record.expand,
            isLeaf: _record.isLeaf,
          }
          if (_record.children) {
            record.isLeaf = false
            record.children = travel(_record.children)
          } else if (props.loadMore && !_record.isLeaf) {
            record.isLeaf = false
            const children = getLazyChildren(_record)
            if (children) {
              record.children = travel(children)
            }
          } else {
            record.isLeaf = true
          }
          record.hasSubtree = Boolean(
            record.children
              ? props.hideExpandButtonOnEmpty
                ? record.children.length > 0
                : true
              : props.loadMore && !record.isLeaf,
          )

          result.push(record)
        }
        return result
      }

      return travel(props.data ?? [])
    })

    const validData = computed(() =>
      Object.keys(computedFilters.value).length > 0
        ? filterTableRows(processedData.value, isValidRecord)
        : processedData.value,
    )

    const sortedData = computed(() => {
      const data = mapArrayWithChildren(validData.value)
      if (data.length > 0) {
        sortRecords(
          data,
          computedSorter.value,
          dataColumnMap.get(computedSorter.value?.field ?? ''),
          (record) => record.raw,
        )

        const { sourcePath, targetPath } = dragState
        // drag row to another row
        if (dragState.dragging && targetPath.length && targetPath.toString() !== sourcePath.toString()) {
          // same level drag
          if (
            sourcePath.length === targetPath.length &&
            sourcePath.slice(0, -1).toString() === targetPath.slice(0, -1).toString()
          ) {
            let children = data
            for (let i = 0; i < sourcePath.length; i++) {
              const sourceIndex = sourcePath[i]
              const isLast = i >= sourcePath.length - 1
              if (isLast) {
                const sourceChild = children[sourceIndex]
                const targetIndex = targetPath[i]
                if (targetIndex > sourceIndex) {
                  // move down
                  children.splice(targetIndex + 1, 0, sourceChild)
                  children.splice(sourceIndex, 1)
                } else {
                  // move up
                  children.splice(targetIndex, 0, sourceChild)
                  children.splice(sourceIndex + 1, 1)
                }
              } else {
                children = children[sourceIndex].children ?? []
              }
            }
          }
        }
      }
      return data
    })

    const { page, pageSize, handlePageChange, handlePageSizeChange } = usePagination(props, emit)

    const onlyCurrent = computed(() => rowSelection.value?.onlyCurrent ?? false)

    watch(page, (cur, pre) => {
      if (cur !== pre && onlyCurrent.value) {
        clearSelected()
      }
    })

    const flattenData = computed(() => pageTableRows(sortedData.value, props.pagination, page.value, pageSize.value))

    const flattenRawData = computed(() => mapRawTableData(flattenData.value))

    const summaryData = useSummaryData({ props, dataColumns, flattenData, flattenRawData })

    const containerScrollLeft = ref(0)
    let readingOffset = 0

    const alignLeft = ref(true)
    const alignRight = ref(true)

    const setAlignPosition = () => {
      let _alignLeft = true
      let _alignRight = true

      const scrollContainer = containerElement.value

      if (scrollContainer) {
        const left = physicalScrollLeft(scrollContainer)
        _alignLeft = left === 0
        _alignRight = Math.ceil(left + scrollContainer.clientWidth) >= scrollContainer.scrollWidth
      }

      if (_alignLeft !== alignLeft.value) {
        alignLeft.value = _alignLeft
      }
      if (_alignRight !== alignRight.value) {
        alignRight.value = _alignRight
      }
    }
    watch(
      readingDirection,
      () => {
        const container = containerElement.value
        if (container) {
          setInlineScrollLeft(container, readingOffset)
        }
        syncHorizontalPanels()
        setAlignPosition()
      },
      { flush: 'post' },
    )

    const getTableScrollCls = () => {
      if (alignLeft.value && alignRight.value) {
        return `${prefixCls}-scroll-position-both`
      }
      if (alignLeft.value) {
        return `${prefixCls}-scroll-position-left`
      }
      if (alignRight.value) {
        return `${prefixCls}-scroll-position-right`
      }
      return `${prefixCls}-scroll-position-middle`
    }

    const getTableFixedCls = () => {
      const cls: string[] = []
      if (hasLeftFixedColumn.value) {
        cls.push(`${prefixCls}-has-fixed-col-left`)
      }
      if (hasRightFixedColumn.value) {
        cls.push(`${prefixCls}-has-fixed-col-right`)
      }
      return cls
    }

    const handleScroll = (e: Event) => {
      if ((e.target as HTMLDivElement).scrollLeft !== containerScrollLeft.value) {
        containerScrollLeft.value = (e.target as HTMLDivElement).scrollLeft
      }
      if (containerElement.value) {
        readingOffset = inlineScrollLeft(containerElement.value)
      }
      setAlignPosition()
    }

    function syncHorizontalPanels() {
      const body = containerElement.value
      if (!body) {
        return
      }
      const offset = inlineScrollLeft(body)
      if (theadRef.value) {
        setInlineScrollLeft(theadRef.value, offset)
      }
      if (summaryRef.value) {
        setInlineScrollLeft(summaryRef.value, offset)
      }
    }
    // Replacing the body does not emit a scroll event for its initial position.
    watch(
      containerElement,
      (body) => {
        if (!body) {
          return
        }
        containerScrollLeft.value = body.scrollLeft
        readingOffset = inlineScrollLeft(body)
        syncHorizontalPanels()
        setAlignPosition()
      },
      { flush: 'post' },
    )
    const onTbodyScroll = (event: Event) => {
      handleScroll(event)
      syncHorizontalPanels()
    }

    const handleRowClick = (record: TableDataWithRaw, ev: Event) => {
      emit('row-click', record.raw, ev)
    }

    const handleRowDblclick = (record: TableDataWithRaw, ev: Event) => {
      emit('row-dblclick', record.raw, ev)
    }

    const handleRowContextMenu = (record: TableDataWithRaw, ev: Event) => {
      emit('row-contextmenu', record.raw, ev)
    }

    const handleCellClick = (record: TableDataWithRaw, column: TableColumnData, ev: Event) => {
      emit('cell-click', record.raw, column, ev)
    }

    const handleCellMouseEnter = debounce((record: TableDataWithRaw, column: TableColumnData, ev: Event) => {
      emit('cell-mouse-enter', record.raw, column, ev)
    }, 30)

    const handleCellMouseLeave = debounce((record: TableDataWithRaw, column: TableColumnData, ev: Event) => {
      emit('cell-mouse-leave', record.raw, column, ev)
    }, 30)

    const handleCellDblclick = (record: TableDataWithRaw, column: TableColumnData, ev: Event) => {
      emit('cell-dblclick', record.raw, column, ev)
    }

    const handleCellContextmenu = (record: TableDataWithRaw, column: TableColumnData, ev: Event) => {
      emit('cell-contextmenu', record.raw, column, ev)
    }

    const handleHeaderClick = (column: TableColumnData, ev: Event) => {
      emit('header-click', column, ev)
    }

    const operations = computed(() => {
      const operations: TableOperationColumn[] = []
      const hasFixedColumn = hasLeftFixedColumn.value || hasRightFixedColumn.value
      let dragHandle: TableOperationColumn | undefined
      let expand: TableOperationColumn | undefined
      let selection: TableOperationColumn | undefined

      if (props.draggable?.type === 'handle') {
        dragHandle = {
          name: 'drag-handle',
          title: props.draggable.title,
          width: props.draggable.width,
          fixed: props.draggable.fixed || hasFixedColumn,
        }
        operations.push(dragHandle)
      }

      if (props.expandable) {
        expand = {
          name: 'expand',
          title: props.expandable.title,
          width: props.expandable.width,
          fixed: props.expandable.fixed || hasFixedColumn,
        }
        operations.push(expand)
      }

      if (props.rowSelection) {
        selection = {
          name: props.rowSelection.type === 'radio' ? 'selection-radio' : 'selection-checkbox',
          title: props.rowSelection.title,
          width: props.rowSelection.width,
          fixed: props.rowSelection.fixed || hasFixedColumn,
        }
        operations.push(selection)
      }
      if (!hasLeftFixedDataColumns.value && operations.length > 0 && operations[operations.length - 1].fixed) {
        operations[operations.length - 1].isLastLeftFixed = true
      }
      if (readingDirection.value === 'rtl') {
        operations.forEach((operation) => {
          operation.isLastLeftFixed = false
        })
        const first = operations.find((operation) => operation.fixed)
        if (first) {
          first.isLastLeftFixed = true
        }
      }
      const operationsFn = props.components?.operations

      return isFunction(operationsFn) ? operationsFn({ dragHandle, expand, selection }) : operations
    })

    // Operation columns still need a header row when all data columns are hidden.
    const displayHeaderRows = computed<TableColumnData[][]>(() =>
      groupColumns.value.length ? groupColumns.value : operations.value.length ? [[]] : [],
    )

    // 与 Element 一致：默认 fixed；仅 max-height（以及 ellipsis）会强制 fixed
    const resolvedTableLayout = computed<'fixed' | 'auto'>(() => {
      if (props.maxHeight != null) {
        return 'fixed'
      }
      if (hasEllipsis.value) {
        return 'fixed'
      }
      return props.tableLayout
    })
    watch([resolvedTableLayout, () => props.columnResizable], handleThMouseUp, { flush: 'sync' })

    const syncColumnsLayout = () => {
      // fixed 模式下宽度由引擎接管：清掉 auto 模式量宽回写到操作列的值，
      // 避免过时的 _realWidth 继续参与冻结偏移（数据列由引擎整体覆写，无需清理）
      for (const operation of operations.value) {
        if (operation._realWidth !== undefined) {
          delete operation._realWidth
        }
      }
      const result = updateColumnsWidth({
        containerWidth: tableWidth.value,
        dataColumns: dataColumns.value,
        operations: operations.value,
        fit: props.fit,
        // extra-column 钉死（默认 28px），不参与铺满容器的比例放大
        exactDataIndexes: extraColumnConfig.value.enabled ? [extraColumnConfig.value.dataIndex] : undefined,
      })
      hasHorizontalOverflow.value = result.hasHorizontalOverflow
      bodyWidth.value = result.bodyWidth
      Object.keys(columnRealWidth).forEach((key) => {
        if (!(key in result.columnRealWidth)) {
          delete columnRealWidth[key]
        }
      })
      Object.assign(columnRealWidth, result.columnRealWidth)
    }

    watch(
      [
        dataColumns,
        operations,
        tableWidth,
        () => props.fit,
        resolvedTableLayout,
        () =>
          Object.keys(columnWidth)
            .map((key) => `${key}:${columnWidth[key]}`)
            .join('|'),
      ],
      () => {
        syncColumnsLayout()
      },
      { immediate: true },
    )

    /**
     * auto 布局下 colgroup 不渲染 col，浏览器按内容分配列宽，与引擎写入的
     * _realWidth 不一致会导致冻结列 sticky 偏移错位。对齐 Element IconPlus 的
     * saveIndexSelection/updateFixedColumnStyle：渲染后测量叶子单元格的实际
     * 宽度回写 _realWidth，让 getFixedNumber 的偏移基于真实宽度。
     * 优先量表头（非拆分表头表体同一张 table，宽度一致）；无表头时量首行 td。
     * 回写不触发布局变化（auto 无 col），量到相同值时不写，避免更新循环。
     */
    const syncAutoLayoutRealWidths = () => {
      if (resolvedTableLayout.value !== 'auto') {
        return
      }
      if (!hasLeftFixedColumn.value && !hasRightFixedColumn.value) {
        return
      }
      const root = tableContainerRef.value
      if (!root) {
        return
      }

      let cells = Array.from(root.querySelectorAll<HTMLElement>('th[data-column-key]'))
      if (cells.length === 0) {
        const firstRow = root.querySelector('tbody tr')
        cells = firstRow ? Array.from(firstRow.querySelectorAll<HTMLElement>('td[data-column-key]')) : []
      }
      if (cells.length > 0) {
        const columnByKey = new Map(dataColumns.value.map((column) => [getColumnLayoutKey(column), column]))
        for (const cell of cells) {
          const key = cell.getAttribute('data-column-layout-key') ?? cell.getAttribute('data-column-key')
          const column = key ? columnByKey.get(key) : undefined
          if (!column) {
            continue
          }
          const width = cell.getBoundingClientRect().width
          if (width > 0 && column._realWidth !== width) {
            column._realWidth = width
          }
        }
      }

      const operationCells = root.querySelectorAll<HTMLElement>('th[data-operation-key]')
      if (operationCells.length > 0) {
        const operationByKey = new Map(operations.value.map((operation) => [operation.name, operation]))
        operationCells.forEach((cell) => {
          const key = cell.getAttribute('data-operation-key')
          const operation = key ? operationByKey.get(key) : undefined
          if (!operation) {
            return
          }
          const width = cell.getBoundingClientRect().width
          if (width > 0 && operation._realWidth !== width) {
            operation._realWidth = width
          }
        })
      }
    }

    // 量宽回写的触发点：布局结果 / 列结构 / 数据变化后（post，确保 DOM 已 patch）。
    // 不能用 onMounted/onUpdated：th/td 是子组件，它们的 computed 重渲染不会触发
    // Table 自身的 updated；引擎重算又发生在 watch 回调里，post effect 时机最可靠。
    // 回写不会改变下列依赖（引用不变），且相同值不写，不会形成循环。
    watchPostEffect(() => {
      void bodyWidth.value
      void dataColumns.value
      void operations.value
      void resolvedTableLayout.value
      void flattenData.value
      syncAutoLayoutRealWidths()
    })

    const tableContentWidthStyle = computed(() => {
      // 与 Element IconPlus 一致：始终给 <table> 元素设置计算后的像素宽度，
      // 避免显式 width 的列在容器较宽时被浏览器拉宽
      if (bodyWidth.value > 0) {
        return { width: `${bodyWidth.value}px` } as CSSProperties
      }
      return undefined
    })

    const headerStyle = computed(() => tableContentWidthStyle.value)

    const contentStyle = computed(() => tableContentWidthStyle.value)

    const addColumn = (id: number, column: TableColumnData) => {
      slotColumnMap.set(id, column)
    }

    const removeColumn = (id: number) => {
      slotColumnMap.delete(id)
    }

    provide(
      tableInjectionKey,
      reactive({
        readingDirection,
        physicalDataColumns: dataColumns,
        hasPhysicalLeftOperations: computed(() => operations.value.some((operation) => operation.fixed)),
        loadMore,
        addLazyLoadData,
        slots,
        sorter: computedSorter,
        filters: computedFilters,
        filterIconAlignLeft,
        resizingColumn,
        checkStrictly,
        currentAllEnabledRowKeys,
        currentSelectedRowKeys,
        addColumn,
        removeColumn,
        onSelectAll: handleSelectAll,
        onSelect: handleSelect,
        onSelectAllLeafs: handleSelectAllLeafs,
        onSorterChange: handleSorterChange,
        onFilterChange: handleFilterChange,
        onThMouseDown: handleThMouseDown,
        onThKeydown: handleThKeydown,
        tableLayout: resolvedTableLayout,
        extraColumnDataIndex: computed(() =>
          extraColumnConfig.value.enabled ? extraColumnConfig.value.dataIndex : undefined,
        ),
      }),
    )

    const cls = computed(() => [
      prefixCls,
      `${prefixCls}-size-${props.size}`,
      {
        [`${prefixCls}-border`]: bordered.value.wrapper,
        [`${prefixCls}-border-cell`]: bordered.value.cell,
        [`${prefixCls}-border-header-cell`]: !bordered.value.cell && bordered.value.headerCell,
        [`${prefixCls}-border-body-cell`]: !bordered.value.cell && bordered.value.bodyCell,
        [`${prefixCls}-stripe`]: props.stripe,
        [`${prefixCls}-hover`]: props.hoverable,
        [`${prefixCls}-dragging`]: dragState.dragging,
        [`${prefixCls}-type-selection`]: Boolean(props.rowSelection),
        [`${prefixCls}-empty`]: props.data && flattenData.value.length === 0,
        [`${prefixCls}-layout-fixed`]: resolvedTableLayout.value === 'fixed',
        // sticky 依赖祖先可滚动且不能有 overflow:hidden；开启吸顶/吸底时放开裁剪
        [`${prefixCls}-scrollport-visible`]: Boolean(props.stickyHeader !== false || props.stickyPagination !== false),
      },
    ])

    const paginationCls = computed(() => {
      const align = isObject(props.pagination) ? props.pagination.align : undefined
      return [`${prefixCls}-pagination`, `${prefixCls}-pagination-${align === 'start' ? 'left' : 'right'}`]
    })

    const tableCls = computed(() => {
      const cls = getTableFixedCls()

      if (hasHorizontalOverflow.value) {
        cls.push(`${prefixCls}-scroll-x`)
        cls.push(getTableScrollCls())
      }

      if (splitTable.value) {
        cls.push(`${prefixCls}-split`)
      }

      return cls
    })

    const isVirtualList = computed(() => Boolean(props.virtualListProps as VirtualListProps | undefined))

    const thWidth = ref<Record<string, number>>({})

    const getThWidth = () => {
      const width: Record<string, number> = {}
      for (const key of Object.keys(thRefs.value)) {
        width[key] = thRefs.value[key].offsetWidth
      }
      thWidth.value = width
    }

    useElementResize(
      () => Object.values(thRefs.value),
      () => isVirtualList.value,
      getThWidth,
    )

    const hasScrollBar = ref(false)

    const isTbodyHasScrollBar = () => {
      if (tbodyRef.value) {
        return tbodyRef.value.offsetWidth > tbodyRef.value.clientWidth
      }
      return false
    }

    const handleTbodyResize = () => {
      const _hasScrollBar = isTbodyHasScrollBar()
      if (hasScrollBar.value !== _hasScrollBar) {
        hasScrollBar.value = _hasScrollBar
      }
      setAlignPosition()
      getThWidth()
    }

    onMounted(() => {
      hasScrollBar.value = isTbodyHasScrollBar()
      getThWidth()
    })

    const loadingProps = computed(() => (isObject(props.loading) ? props.loading : { loading: props.loading }))

    const renderEmptyContent = (compact = false) =>
      slots.empty ? (
        <TableSlot v-slots={forwardTableSlot(slots.empty)} />
      ) : (
        <Empty imageSize={compact ? 'var(--mp-table-empty-image-size)' : undefined} />
      )

    const renderEmpty = (rowPosition?: number) => {
      return (
        <Tr empty aria-rowindex={rowPosition}>
          <Td colSpan={dataColumns.value.length + operations.value.length}>{renderEmptyContent()}</Td>
        </Tr>
      )
    }

    const renderExpandContent = (record: TableDataWithRaw) => {
      if (record.expand) {
        return isFunction(record.expand) ? record.expand() : record.expand
      }
      if (slots['expand-row']) {
        return <TableSlot slotProps={{ record: record.raw }} v-slots={forwardTableSlot(slots['expand-row'])} />
      }
      if (props.expandable?.expandedRowRender) {
        return props.expandable.expandedRowRender(record.raw)
      }

      return undefined
    }

    const allColumns = computed(() =>
      ([] as (TableColumnData | TableOperationColumn)[]).concat(operations.value, dataColumns.value),
    )

    const semanticId = `mp-table-header-${useId()}`
    const visibleHeaderId = (row: number, index: number) => `${semanticId}-visible-${row}-${index}`
    const visibleOperationId = (index: number) => `${semanticId}-visible-operation-${index}`
    const activeHeaderSlot = shallowRef(slots.th)
    const customHeaders = computed(() =>
      displayHeaderRows.value.map((row) =>
        row.map((column) => firstStructuralNode(activeHeaderSlot.value?.({ column }))),
      ),
    )
    const explicitHeaderName = (value: unknown) => (typeof value === 'string' && value.trim() ? value : undefined)
    const explicitHeaderReference = (value: unknown) =>
      typeof value === 'string' && /[^ \t\n\f\r]/.test(value) ? value : undefined
    const semanticRows = (surface: 'body' | 'summary') =>
      displayHeaderRows.value.map((row, rowIndex) => [
        ...(rowIndex === 0
          ? operations.value.map((_, index) => ({
              id: `${semanticId}-${surface}-operation-${index}`,
              source: visibleOperationId(index),
              colSpan: undefined,
              rowSpan: displayHeaderRows.value.length,
            }))
          : []),
        ...row.map((column, index) => ({
          id: `${semanticId}-${surface}-${rowIndex}-${index}`,
          source: visibleHeaderId(rowIndex, index),
          label: explicitHeaderName(customHeaders.value[rowIndex]?.[index]?.props?.['aria-label']),
          labelledby: explicitHeaderReference(customHeaders.value[rowIndex]?.[index]?.props?.['aria-labelledby']),
          sortOrder:
            surface === 'body' &&
            !isTableExtraColumn(column) &&
            column.dataIndex &&
            column.dataIndex === computedSorter.value?.field
              ? computedSorter.value.direction
              : undefined,
          colSpan: column.colSpan,
          rowSpan: column.rowSpan,
        })),
      ])
    const bodyHeaderMap = computed(() => buildHeaderAssociations(semanticRows('body')))
    const summaryHeaderMap = computed(() => buildHeaderAssociations(semanticRows('summary')))
    const cellHeaders = (surface: 'body' | 'summary', start: number, span: number) => {
      if (!splitTable.value || !props.showHeader) {
        return undefined
      }
      const map = surface === 'body' ? bodyHeaderMap.value : summaryHeaderMap.value
      return map.headersForSpan(start, span).join(' ') || undefined
    }
    type VirtualRowPositions = VirtualPositions<ReturnType<typeof renderExpandContent>>
    const renderSemanticHeader = (surface: 'body' | 'summary', positions?: VirtualRowPositions) =>
      props.showHeader && (
        <thead
          style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clipPath: 'inset(50%)' }}
        >
          {semanticRows(surface).map((row, rowIndex) => (
            <tr key={rowIndex} aria-rowindex={surface === 'body' && positions ? rowIndex + 1 : undefined}>
              {row.map((cell) => (
                <th
                  key={cell.id}
                  id={cell.id}
                  aria-label={
                    'label' in cell && cell.labelledby
                      ? undefined
                      : 'label' in cell && cell.label
                        ? cell.label
                        : undefined
                  }
                  aria-labelledby={
                    'labelledby' in cell && cell.labelledby
                      ? cell.labelledby
                      : 'label' in cell && cell.label
                        ? undefined
                        : cell.source
                  }
                  aria-sort={
                    'sortOrder' in cell && cell.sortOrder === 'ascend'
                      ? 'ascending'
                      : 'sortOrder' in cell && cell.sortOrder === 'descend'
                        ? 'descending'
                        : undefined
                  }
                  colspan={cell.colSpan || undefined}
                  rowspan={cell.rowSpan || undefined}
                />
              ))}
            </tr>
          ))}
        </thead>
      )

    const spanColumns = computed(() => (props.spanAll ? allColumns.value : dataColumns.value))

    const { tableSpan, removedCells } = useSpan({
      spanMethod,
      data: flattenData,
      columns: spanColumns,
    })

    const getVirtualColumnStyle = (name: string | undefined) => {
      if (!isVirtualList.value || !name || !thWidth.value[name]) {
        return undefined
      }

      return { width: `${thWidth.value[name]}px` }
    }

    const renderColGroup = () => (
      <ColGroup
        dataColumns={dataColumns.value}
        operations={operations.value}
        columnWidth={columnWidth}
        columnRealWidth={columnRealWidth}
        tableLayout={resolvedTableLayout.value}
      />
    )
    const cellEvents = (record: TableDataWithRaw, column: TableColumnData) => ({
      onClick: (ev: Event) => handleCellClick(record, column, ev),
      onDblclick: (ev: Event) => handleCellDblclick(record, column, ev),
      onMouseenter: (ev: Event) => handleCellMouseEnter(record, column, ev),
      onMouseleave: (ev: Event) => handleCellMouseLeave(record, column, ev),
      onContextmenu: (ev: Event) => handleCellContextmenu(record, column, ev),
    })
    const summaryView = useSummaryRender(
      {
        props,
        slots,
        prefixCls,
        summaryData,
        dataColumns,
        operations,
        allColumns,
        summarySpanMethod,
        getVirtualColumnStyle,
        cellHeaders,
        handleRowClick,
        summaryRef,
        hasScrollBar,
        contentStyle,
        renderSemanticHeader,
      },
      cellEvents,
      renderColGroup,
    )

    const renderExpandBtn = (record: TableDataWithRaw, stopPropagation = true) => {
      const currentKey = record.key
      const expanded = expandedRowKeys.value.includes(currentKey)

      return (
        <button
          type="button"
          class={`${prefixCls}-expand-btn`}
          aria-label={expanded ? i18nMessage.value.table?.collapseRow : i18nMessage.value.table?.expandRow}
          aria-expanded={expanded}
          onClick={(ev: Event) => {
            handleExpand(currentKey, record.raw)
            if (stopPropagation) {
              ev.stopPropagation()
            }
          }}
        >
          {slots['expand-icon'] ? (
            <TableSlot slotProps={{ expanded, record: record.raw }} v-slots={forwardTableSlot(slots['expand-icon'])} />
          ) : (
            (props.expandable?.icon?.(expanded, record.raw) ?? (expanded ? <IconMinus /> : <IconPlus />))
          )}
        </button>
      )
    }

    const renderExpand = (
      record: TableDataWithRaw,
      {
        indentSize,
        indexPath,
        allowDrag,
        expandContent,
        positions,
      }: {
        indentSize: number
        indexPath: number[]
        allowDrag: boolean
        expandContent: any
        positions?: VirtualRowPositions
      },
    ) => {
      if (record.hasSubtree) {
        if (record.children?.length === 0 && showEmptyTree.value) {
          return renderEmpty(positions?.extraIndices.get(record.key))
        }

        return record.children?.map((item, index) =>
          renderRecord(item, index, {
            indentSize,
            indexPath,
            allowDrag,
            positions,
          }),
        )
      }

      if (expandContent) {
        const scrollContainer = containerElement.value

        return (
          <Tr key={`${record.key}-expand`} expand aria-rowindex={positions?.extraIndices.get(record.key)}>
            <Td
              isFixedExpand={hasLeftFixedColumn.value || hasRightFixedColumn.value}
              containerWidth={scrollContainer?.clientWidth}
              colSpan={dataColumns.value.length + operations.value.length}
            >
              {expandContent}
            </Td>
          </Tr>
        )
      }

      return null
    }

    const renderRecord = (
      record: TableDataWithRaw,
      rowIndex: number,
      {
        indentSize = 0,
        indexPath,
        allowDrag = true,
        positions,
      }: {
        indentSize?: number
        indexPath?: number[]
        allowDrag?: boolean
        positions?: VirtualRowPositions
      } = {},
    ): VNode => {
      const currentKey = record.key
      const currentPath = (indexPath ?? []).concat(rowIndex)
      const expandContent = positions?.details.has(record.key)
        ? positions.details.get(record.key)
        : renderExpandContent(record)
      const showExpand = expandedRowKeys.value.includes(currentKey)

      const isDragTarget = dragState.sourceKey === record.key

      const dragSourceEvent = dragType.value
        ? {
            draggable: allowDrag,
            onDragstart: (ev: DragEvent) => {
              if (!allowDrag) {
                return
              }
              handleDragStart(ev, record.key, currentPath, record.raw)
            },
            onDragend: (ev: DragEvent) => {
              if (!allowDrag) {
                return
              }
              handleDragEnd(ev)
            },
          }
        : {}

      const dragTargetEvent = dragType.value
        ? {
            onDragenter: (ev: DragEvent) => {
              if (!allowDrag) {
                return
              }
              handleDragEnter(ev, currentPath)
            },
            onDragover: (ev: DragEvent) => {
              if (!allowDrag) {
                return
              }
              handleDragover(ev)
            },
            onDrop: (ev: DragEvent) => {
              if (!allowDrag) {
                return
              }
              handleChange('drag')
              handleDrop(ev)
            },
          }
        : {}

      return (
        <Fragment key={currentKey}>
          <Tr
            v-slots={{
              tr: slots.tr,
            }}
            key={currentKey}
            aria-rowindex={positions?.indices.get(record.key)}
            class={[
              {
                [`${prefixCls}-tr-draggable`]: dragType.value === 'row',
                [`${prefixCls}-tr-drag`]: isDragTarget,
              },
              isFunction(props.rowClass) ? props.rowClass(record.raw, rowIndex) : props.rowClass,
            ]}
            rowIndex={rowIndex}
            record={record}
            checked={props.rowSelection && selectedRowKeys.value?.includes(currentKey)}
            // @ts-expect-error TSX 事件名大小写与 DOM 属性签名不一致
            onTouchstart={(ev: TouchEvent) => emit('row-touchstart', record.raw, ev)}
            onTouchend={(ev: TouchEvent) => emit('row-touchend', record.raw, ev)}
            onTouchcancel={(ev: TouchEvent) => emit('row-touchcancel', record.raw, ev)}
            onClick={(ev: Event) => handleRowClick(record, ev)}
            onDblclick={(ev: Event) => handleRowDblclick(record, ev)}
            onContextmenu={(ev: Event) => handleRowContextMenu(record, ev)}
            {...(dragType.value === 'row' ? dragSourceEvent : {})}
            {...dragTargetEvent}
          >
            {operations.value.map((operation, index) => {
              const cellId = `${rowIndex}-${index}-${record.key}`
              const [rowspan, colspan] = props.spanAll ? (tableSpan.value[cellId] ?? [1, 1]) : [1, 1]

              if (props.spanAll && removedCells.value.includes(cellId)) {
                return null
              }

              const style = getVirtualColumnStyle(operation.name)

              return (
                <OperationTd
                  headers={cellHeaders('body', index, colspan)}
                  v-slots={{
                    'drag-handle-icon': slots['drag-handle-icon'],
                    // Preserve the compiled SSR slot while forwarding it to OperationTd.
                    _: 2,
                  }}
                  key={`operation-td-${index}`}
                  style={style}
                  operationColumn={operation}
                  operations={operations.value}
                  record={record}
                  hasExpand={Boolean(expandContent)}
                  selectedRowKeys={currentSelectedRowKeys.value}
                  rowSpan={rowspan}
                  colSpan={colspan}
                  renderExpandBtn={renderExpandBtn}
                  {...(dragType.value === 'handle' ? dragSourceEvent : {})}
                />
              )
            })}
            {dataColumns.value.map((column, index) => {
              const cellId = `${rowIndex}-${props.spanAll ? operations.value.length + index : index}-${record.key}`
              const [rowspan, colspan] = tableSpan.value[cellId] ?? [1, 1]

              if (removedCells.value.includes(cellId)) {
                return null
              }

              const extraProps =
                index === 0
                  ? {
                      showExpandBtn: record.hasSubtree,
                      indentSize: record.hasSubtree ? indentSize - 20 : indentSize,
                    }
                  : {}

              const style = getVirtualColumnStyle(getColumnLayoutKey(column))

              return (
                <Td
                  headers={cellHeaders('body', operations.value.length + index, colspan)}
                  v-slots={{
                    td: slots.td,
                  }}
                  key={`td-${index}`}
                  style={style}
                  rowIndex={rowIndex}
                  record={record}
                  column={column}
                  operations={operations.value}
                  dataColumns={dataColumns.value}
                  rowSpan={rowspan}
                  renderExpandBtn={renderExpandBtn}
                  colSpan={colspan}
                  {...extraProps}
                  {...cellEvents(record, column)}
                />
              )
            })}
          </Tr>
          {showExpand &&
            renderExpand(record, {
              indentSize: indentSize + props.indentSize,
              indexPath: currentPath,
              allowDrag: allowDrag && !isDragTarget,
              expandContent,
              positions,
            })}
        </Fragment>
      )
    }

    const renderBody = () => {
      const hasSubData = flattenData.value.some((record) => Boolean(record.hasSubtree))

      return (
        <Tbody
          v-slots={{
            tbody: slots.tbody,
          }}
        >
          {flattenData.value.length > 0
            ? flattenData.value.map((record, index) =>
                renderRecord(record, index, {
                  indentSize: hasSubData ? 20 : 0,
                }),
              )
            : renderEmpty()}
        </Tbody>
      )
    }

    const renderHeader = () => (
      <Thead v-slots={{ thead: slots.thead }}>
        {displayHeaderRows.value.map((row, rowIndex) => (
          <Tr key={`header-row-${rowIndex}`}>
            {rowIndex === 0 &&
              operations.value.map((operation, index) => (
                <OperationTh
                  key={`operation-th-${index}`}
                  id={splitTable.value ? visibleOperationId(index) : undefined}
                  // @ts-expect-error 函数 ref 与组件实例类型不兼容
                  ref={(ins: ComponentPublicInstance) => {
                    if (ins?.$el && operation.name) {
                      thRefs.value[operation.name] = ins.$el
                    } else if (operation.name) {
                      delete thRefs.value[operation.name]
                    }
                  }}
                  operationColumn={operation}
                  operations={operations.value}
                  selectAll={Boolean(operation.name === 'selection-checkbox' && props.rowSelection?.showCheckedAll)}
                  rowSpan={displayHeaderRows.value.length}
                />
              ))}
            {row.map((column, index) => {
              const layoutKey = getColumnLayoutKey(column)
              // 仅 fixed 布局允许拖拽调宽：auto 布局下 colgroup 不渲染 col，
              // 列宽由浏览器按内容分配，拖拽写入的 _resizeWidth 到不了 DOM，
              // 还会在冻结偏移计算中优先于测量回写值导致 sticky 错位
              const resizable =
                props.columnResizable &&
                resolvedTableLayout.value === 'fixed' &&
                Boolean(column.dataIndex) &&
                index < row.length - 1

              return (
                <Th
                  key={`th-${index}`}
                  semanticLabelId={splitTable.value ? visibleHeaderId(rowIndex, index) : undefined}
                  // @ts-expect-error 函数 ref 与组件实例类型不兼容
                  ref={(ins: ComponentPublicInstance) => {
                    if (ins?.$el && layoutKey) {
                      thRefs.value[layoutKey] = ins.$el
                    } else if (layoutKey) {
                      delete thRefs.value[layoutKey]
                    }
                  }}
                  customHeader={customHeaders.value[rowIndex]?.[index]}
                  column={column}
                  operations={operations.value}
                  dataColumns={dataColumns.value}
                  resizable={resizable}
                  onClick={(ev: Event) => handleHeaderClick(column, ev)}
                />
              )
            })}
          </Tr>
        ))}
      </Thead>
    )

    const virtualBody = createVirtualBody({
      props,
      slots,
      prefixCls,
      flattenData,
      tbodyComRef,
      contentStyle,
      displayHeaderRows,
      expandedRowKeys,
      showEmptyTree,
      renderExpandContent,
      renderSemanticHeader,
      renderRecord,
      onTbodyScroll,
    })

    const managedStickyFooter = computed(
      () =>
        props.pagination !== false &&
        props.stickyPagination !== false &&
        (flattenData.value.length > 0 || sortedData.value.length > 0),
    )
    const renderContent = () => {
      // Slots can change without invalidating a computed value. Capture once
      // per render so slot changes are observed without per-row scans in SSR.
      const { positions, prepareRange } = virtualBody.plan() ?? {}
      if (splitTable.value) {
        const stickyTop = isNumber(props.stickyHeader) ? `${props.stickyHeader}px` : undefined
        const Component = displayScrollbar.value ? Scrollbar : 'div'

        const renderHeaderPanel = () => (
          <Component
            ref={theadComRef}
            class={`${prefixCls}-header`}
            style={{
              overflowY: hasScrollBar.value ? 'scroll' : undefined,
            }}
            {...(scrollbar.value
              ? {
                  disableVertical: true,
                  ...scrollbarProps.value,
                  hide: true,
                  disableHorizontal: managedStickyFooter.value || !hasHorizontalOverflow.value,
                }
              : undefined)}
          >
            <table class={`${prefixCls}-element`} style={headerStyle.value} cellpadding={0} cellspacing={0}>
              {renderColGroup()}
              {renderHeader()}
            </table>
          </Component>
        )

        return (
          <>
            {props.showHeader &&
              (props.stickyHeader !== false ? (
                // sticky 单独包一层，避免与 .mp-scrollbar { position: relative } 互相覆盖
                <div class={`${prefixCls}-header-sticky`} style={stickyTop ? { top: stickyTop } : undefined}>
                  {renderHeaderPanel()}
                </div>
              ) : (
                renderHeaderPanel()
              ))}
            <ResizeObserver onResize={handleTbodyResize}>
              {flattenData.value.length === 0 ? (
                <div class={`${prefixCls}-empty-body`} style={{ maxHeight: bodyMaxHeight.value }}>
                  <Component
                    ref={tbodyComRef}
                    role="region"
                    tabindex={0}
                    aria-label={t('table.scrollable')}
                    class={`${prefixCls}-body`}
                    {...(scrollbar.value
                      ? {
                          outerStyle: { height: '100%', minHeight: '0' },
                          ...scrollbarProps.value,
                          disableHorizontal: managedStickyFooter.value || !hasHorizontalOverflow.value,
                        }
                      : undefined)}
                    onScroll={onTbodyScroll}
                  >
                    <table
                      class={`${prefixCls}-element`}
                      style={{ ...contentStyle.value, height: '100%' }}
                      cellpadding={0}
                      cellspacing={0}
                    >
                      {renderSemanticHeader('body')}
                      <Tbody v-slots={{ tbody: slots.tbody }}>
                        <Tr empty>
                          <Td colSpan={dataColumns.value.length + operations.value.length} />
                        </Tr>
                      </Tbody>
                    </table>
                  </Component>
                  {/* Keep the empty state outside the horizontal scroll container. */}
                  <div class={`${prefixCls}-empty-overlay`}>
                    <div class={`${prefixCls}-empty-content`}>{renderEmptyContent(true)}</div>
                  </div>
                </div>
              ) : isVirtualList.value ? (
                virtualBody.render(positions, prepareRange)
              ) : (
                <Component
                  ref={tbodyComRef}
                  role="region"
                  tabindex={0}
                  aria-label={t('table.scrollable')}
                  class={`${prefixCls}-body`}
                  style={{
                    maxHeight: bodyMaxHeight.value,
                  }}
                  {...(scrollbar.value
                    ? {
                        outerStyle: { display: 'flex', minHeight: '0' },
                        ...scrollbarProps.value,
                        disableHorizontal: managedStickyFooter.value || !hasHorizontalOverflow.value,
                      }
                    : undefined)}
                  onScroll={onTbodyScroll}
                >
                  <table class={`${prefixCls}-element`} style={contentStyle.value} cellpadding={0} cellspacing={0}>
                    {flattenData.value.length !== 0 && renderColGroup()}
                    {renderSemanticHeader('body')}
                    {renderBody()}
                  </table>
                </Component>
              )}
            </ResizeObserver>
            {summaryView.panel()}
          </>
        )
      }

      return (
        <ResizeObserver onResize={() => setAlignPosition()}>
          <table class={`${prefixCls}-element`} cellpadding={0} cellspacing={0} style={contentStyle.value}>
            {renderColGroup()}
            {props.showHeader && renderHeader()}
            {renderBody()}
            {summaryData.value && summaryData.value.length > 0 && summaryView.render()}
          </table>
        </ResizeObserver>
      )
    }

    const renderTable = (content?: Slot) => {
      const Component = displayScrollbar.value ? Scrollbar : 'div'

      return (
        <>
          <div
            ref={tableContainerRef}
            data-tabs-no-swipe={hasHorizontalOverflow.value ? '' : undefined}
            class={[`${prefixCls}-container`, tableCls.value]}
          >
            <Component
              ref={contentComRef}
              role={splitTable.value ? undefined : 'region'}
              tabindex={splitTable.value ? undefined : 0}
              aria-label={splitTable.value ? undefined : t('table.scrollable')}
              class={[
                `${prefixCls}-content`,
                {
                  // 仅在确实需要横滚时开启，避免列宽铺满后的亚像素溢出一直露出滚动条
                  [`${prefixCls}-content-scroll-x`]: !splitTable.value && hasHorizontalOverflow.value,
                },
              ]}
              {...(scrollbar.value
                ? {
                    outerStyle: { height: '100%' },
                    ...scrollbarProps.value,
                    disableHorizontal: managedStickyFooter.value || !hasHorizontalOverflow.value,
                  }
                : undefined)}
              onScroll={handleScroll}
            >
              {content ? (
                <table class={`${prefixCls}-element`} style={contentStyle.value} cellpadding={0} cellspacing={0}>
                  {content()}
                </table>
              ) : (
                renderContent()
              )}
            </Component>
          </div>
          {slots.footer && (
            <div class={`${prefixCls}-footer`}>
              <TableSlot v-slots={forwardTableSlot(slots.footer)} />
            </div>
          )}
        </>
      )
    }

    const renderPagination = (inStickyFooter = false) => {
      const paginationProps: Partial<TablePaginationConfig> = isObject(props.pagination)
        ? omit(props.pagination, ['container', 'align', 'modelValue', 'pageSize', 'defaultValue', 'defaultPageSize'])
        : {}

      const stickyStyle: CSSProperties | undefined = isNumber(props.stickyPagination)
        ? { bottom: `${props.stickyPagination}px` }
        : undefined

      const scope: TablePaginationScope = {
        page: page.value,
        pageSize: pageSize.value,
        total: paginationProps.total ?? validData.value.length,
        onChange: (next) => {
          handlePageChange(next)
          handleChange('pagination')
        },
        onPageSizeChange: (next) => {
          handlePageSizeChange(next)
          handleChange('pagination')
        },
      }

      return (
        <div
          {...themeScope.value}
          dir={readingDirection.value}
          class={[
            paginationCls.value,
            {
              [`${prefixCls}-pagination-sticky`]: props.stickyPagination !== false,
            },
          ]}
          style={[themeScope.value.style, inStickyFooter ? undefined : stickyStyle]}
        >
          {slots['pagination-left'] && <TableSlot v-slots={forwardTableSlot(slots['pagination-left'])} />}
          {slots.pagination ? (
            <TableSlot slotProps={{ ...scope }} v-slots={forwardTableSlot(slots.pagination)} />
          ) : (
            <Pagination
              total={scope.total}
              modelValue={scope.page}
              pageSize={scope.pageSize}
              onChange={scope.onChange}
              onPage-size-change={scope.onPageSizeChange}
              {...paginationProps}
            />
          )}
          {slots['pagination-right'] && <TableSlot v-slots={forwardTableSlot(slots['pagination-right'])} />}
        </div>
      )
    }

    const paginationTarget = computed(() => (isObject(props.pagination) ? props.pagination.container : undefined))
    const readyPaginationTarget = shallowRef<string | HTMLElement | null>()
    // Give the disabled Teleport a table-local destination for its empty anchors.
    // The visible inline content stays at the Teleport's source, including during SSR.
    const inlinePaginationId = encodeURIComponent(semanticId)
    const inlinePaginationSelector = `[data-pagination-anchor="${inlinePaginationId}"]`
    let paginationTargetEpoch = 0
    watch(
      paginationTarget,
      (target) => {
        const epoch = ++paginationTargetEpoch
        if (!target || typeof target !== 'string' || typeof document === 'undefined') {
          readyPaginationTarget.value = target || null
          return
        }
        const resolve = () => {
          try {
            return document.querySelector(target)
          } catch {
            return null
          }
        }
        if (resolve()) {
          readyPaginationTarget.value = target
          return
        }
        // The selector may be rendered later in the same update. Vue 3.2 does
        // not support Teleport's defer prop, so wait until that update finishes.
        void nextTick(() => {
          if (epoch !== paginationTargetEpoch) {
            return
          }
          if (resolve()) {
            readyPaginationTarget.value = target
          } else if (process.env.NODE_ENV !== 'production') {
            console.warn(`[Table] Pagination target not found: ${target}`)
          }
        })
      },
      { immediate: true },
    )
    onBeforeUnmount(() => {
      paginationTargetEpoch++
    })

    const renderPaginationArea = () => {
      const content =
        props.stickyPagination !== false ? (
          <div
            {...themeScope.value}
            dir={readingDirection.value}
            class={`${prefixCls}-footer-sticky`}
            style={[
              themeScope.value.style,
              isNumber(props.stickyPagination) ? { bottom: `${props.stickyPagination}px` } : undefined,
            ]}
          >
            {renderPagination(true)}
          </div>
        ) : (
          renderPagination()
        )
      const target = readyPaginationTarget.value
      if (target === undefined) {
        return null
      }
      return (
        <Fragment>
          <span hidden data-pagination-anchor={inlinePaginationId} />
          <Teleport to={target ?? inlinePaginationSelector} disabled={!target}>
            {content}
          </Teleport>
        </Fragment>
      )
    }

    const style = computed<CSSProperties | undefined>(() => {
      const result: CSSProperties = {}
      if (isString(props.height)) {
        result.height = props.height
      }
      // 祖先链宽度追逐时 inline 钉住诚实宽度（优先级高于 less 里的
      // max-width:min(100%,100vw) 兜底），正常布局下不输出
      if (rootMaxWidth.value != null) {
        result.maxWidth = rootMaxWidth.value
      }
      return Object.keys(result).length > 0 ? result : undefined
    })

    // Vue may recreate normalized slot wrappers even for unchanged input slots.
    // Compare the incoming slot values so unrelated renders retain the snapshot.
    const tableInstance = getCurrentInstance()!
    let slotSnapshot: unknown[] = []
    const currentSlotSnapshot = () => {
      const incoming = tableInstance.vnode.children
      const raw =
        incoming && !Array.isArray(incoming) && typeof incoming === 'object'
          ? (incoming as Record<string, unknown>)
          : {}
      const next = Object.keys(raw)
        .filter((key) => key !== '_' && key !== '$stable')
        .sort()
        .flatMap((key) => [key, raw[key]])
      if (next.length !== slotSnapshot.length || next.some((value, index) => value !== slotSnapshot[index])) {
        slotSnapshot = next
        activeHeaderSlot.value = slots.th
      }
      return slotSnapshot
    }
    const DeferredTable = defineComponent({
      props: { rowSlotState: Number, slotSnapshot: Array },
      setup: () => () => renderTable(),
    })

    const onColumnsChanged = (subTree?: VNode) => {
      if (!subTree) {
        return getComponents()
      }
      const next = getComponentsFromVNode(subTree, createNamespace('table-column').name)
      if (next.length !== components.value.length || next.some((id, index) => id !== components.value[index])) {
        components.value = next
      }
    }
    const normalizeColumnSlotNodes = (value: any): any => {
      if (Array.isArray(value)) {
        return value.map(normalizeColumnSlotNodes)
      }
      if (!isVNode(value)) {
        return value
      }
      if (value.type === Fragment) {
        const node = cloneVNode(value)
        node.patchFlag = -2
        ;(node as any).dynamicChildren = null
        node.children = normalizeColumnSlotNodes(value.children)
        return node
      }
      if ((value.type as any)?.name === createNamespace('table-column').name) {
        const node = cloneVNode(value)
        node.patchFlag = 16
        return node
      }
      return value
    }
    let cachedColumnsSlot: Slot | undefined
    let cachedColumnsVNode: VNode | undefined
    let columnsKey = 0
    const render = () => {
      const snapshot = currentSlotSnapshot()
      if (slots.default) {
        return (
          <ResizeObserver onResize={handleTableResize}>
            <div
              class={cls.value}
              aria-busy={loadingProps.value.loading || undefined}
              {...tableInteractionEvents}
              // 该分支历来不应用 height，仅补宽度追逐时的 inline 钉宽
              style={rootMaxWidth.value != null ? { maxWidth: rootMaxWidth.value } : undefined}
            >
              <Loading {...loadingProps.value}>{renderTable(slots.default)}</Loading>
            </div>
          </ResizeObserver>
        )
      }
      if (slots.columns !== cachedColumnsSlot) {
        cachedColumnsSlot = slots.columns
        cachedColumnsVNode = slots.columns ? (
          <TableColumnSlot
            revision={++columnsKey}
            onChanged={onColumnsChanged}
            v-slots={
              {
                default: (...args: any[]) => normalizeColumnSlotNodes((cachedColumnsSlot as any)(...args)),
                $stable: true,
              } as any
            }
          />
        ) : undefined
      }
      children.value = cachedColumnsVNode ? [cachedColumnsVNode] : undefined
      // fix #1724 sortedData.value.length > 0
      return (
        <ResizeObserver onResize={handleTableResize}>
          <div
            class={cls.value}
            style={style.value}
            aria-busy={loadingProps.value.loading || undefined}
            {...tableInteractionEvents}
          >
            {children.value}
            <Loading {...loadingProps.value}>
              <DeferredTable
                rowSlotState={(slots.tr ? 1 : 0) | (slots['expand-row'] ? 2 : 0)}
                slotSnapshot={snapshot}
              />
              {props.pagination !== false &&
                (flattenData.value.length > 0 || sortedData.value.length > 0) &&
                renderPaginationArea()}
            </Loading>
          </div>
        </ResizeObserver>
      )
    }

    return {
      render,
      selfExpand: expand,
      selfExpandAll: expandAll,
      selfSelect: select,
      selfSelectAll: selectAll,
      selfResetFilters: resetFilters,
      selfClearFilters: clearFilters,
      selfResetSorters: resetSorters,
      selfClearSorters: clearSorters,
    }
  },
  methods: {
    /**
     * @zh 设置全选状态
     * @en Set select all state
     * @param { boolean } checked
     * @public
     */
    selectAll(checked?: boolean) {
      return this.selfSelectAll(checked)
    },
    /**
     * @zh 设置行选择器状态
     * @en Set row selector state
     * @param { string | number | (string | number)[] } rowKey
     * @param { boolean } checked
     * @public
     */
    select(rowKey: string | number | (string | number)[], checked?: boolean) {
      return this.selfSelect(rowKey, checked)
    },
    /**
     * @zh 设置全部展开状态
     * @en Set all expanded state
     * @param { boolean } checked
     * @public
     */
    expandAll(checked?: boolean) {
      return this.selfExpandAll(checked)
    },
    /**
     * @zh 设置展开状态
     * @en Set select all state
     * @param { string | number | (string | number)[] } rowKey
     * @param { boolean } checked
     * @public
     */
    expand(rowKey: string | number | (string | number)[], checked?: boolean) {
      return this.selfExpand(rowKey, checked)
    },
    /**
     * @zh 重置列的筛选器
     * @en Reset the filter for columns
     * @param { string | string[] } dataIndex
     * @public
     */
    resetFilters(dataIndex?: string | string[]) {
      return this.selfResetFilters(dataIndex)
    },
    /**
     * @zh 清空列的筛选器
     * @en Clear the filter for columns
     * @param { string | string[] } dataIndex
     * @public
     */
    clearFilters(dataIndex?: string | string[]) {
      return this.selfClearFilters(dataIndex)
    },
    /**
     * @zh 重置列的排序
     * @en Reset the order of columns
     * @public
     */
    resetSorters() {
      return this.selfResetSorters()
    },
    /**
     * @zh 清空列的排序
     * @en Clear the order of columns
     * @public
     */
    clearSorters() {
      return this.selfClearSorters()
    },
  },
  render() {
    return this.render()
  },
})
