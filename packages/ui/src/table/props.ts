import type { PropType } from "vue";
import type { ComponentSize } from "../_utils/constant";
import type {
  TableBorder,
  TableColumnData,
  TableComponents,
  TableData,
  TableDraggable,
  TableExpandable,
  TableOperationColumn,
  TablePaginationConfig,
  TableRowSelection,
} from "./types";
import type { TableExtraColumnConfig } from "./extra-column";
import type { ScrollbarProps } from "../_components/selection-scrollbar";
import type { VirtualListProps } from "../_components/virtual-list-v2/interface";
import type { BaseType } from "../_utils/types";

export const tableProps = {
    /**
     * @zh 表格的列描述信息
     * @en Column info of the table
     */
    columns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => [],
    },
    /**
     * @zh 表格的数据
     * @en Table data
     */
    data: {
      type: Array as PropType<TableData[]>,
      default: () => [],
    },
    /**
     * @zh 是否显示边框
     * @en Whether to show the border
     */
    bordered: {
      type: [Boolean, Object] as PropType<boolean | TableBorder>,
      default: true,
    },
    /**
     * @zh 是否显示选中效果
     * @en Whether to show the hover effect
     */
    hoverable: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 是否开启斑马纹效果
     * @en Whether to enable the stripe effect
     */
    stripe: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表格的大小
     * @en The size of the table
     * @values 'xs','sm','md','lg','xl'
     * @default-value 'md'
     */
    size: {
      type: String as PropType<ComponentSize>,
      default: "md",
    },
    /**
     * @zh 表格布局算法，同 CSS `table-layout`。默认 `fixed`，列宽由 JS 计算后写入，不被单元格内容撑开
     * @en Table layout algorithm, same as CSS `table-layout`. Defaults to `fixed`; column widths are computed in JS and not stretched by cell content
     */
    tableLayout: {
      type: String as PropType<"fixed" | "auto">,
      default: "fixed",
    },
    /**
     * @zh 是否为加载中状态
     * @en Whether it is loading state
     */
    loading: {
      type: [Boolean, Object],
      default: false,
    },
    /**
     * @zh 表格的行选择器配置
     * @en Table row selector configuration
     */
    rowSelection: {
      type: Object as PropType<TableRowSelection>,
    },
    /**
     * @zh 表格的展开行配置
     * @en Expand row configuration of the table
     */
    expandable: {
      type: Object as PropType<TableExpandable>,
    },
    /**
     * @zh 表格高度。设置后表头固定，表体区域滚动。数字单位为 px
     * @en Table height. Fixes the header and scrolls the body when set. Number values are in px
     */
    height: {
      type: [Number, String] as PropType<number | string>,
    },
    /**
     * @zh 表格最大高度。内容不足时表格收缩，超出后表体滚动。数字单位为 px
     * @en Table max height. Table shrinks when content is short; body scrolls when exceeded. Number values are in px
     */
    maxHeight: {
      type: [Number, String] as PropType<number | string>,
    },
    /**
     * @zh 列宽如何撑满容器。表格宽度始终至少为父容器宽度（列宽之和超出时开启横向滚动）。为 true 时，未设置 `width` 的弹性列吸收全部剩余空间（显式 `width` 的列保持原宽）；为 false 时，剩余空间按各列基础宽度比例放大分摊（extra-column 等钉死列除外）
     * @en How column widths fill the container. The table is always at least as wide as its parent (horizontal scroll when columns overflow). When true, flexible columns without `width` absorb all remaining space (explicit-`width` columns stay exact); when false, remaining space scales all columns proportionally to their base widths (pinned columns like extra-column excluded)
     */
    fit: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 分页的属性配置
     * @en Pagination properties configuration
     */
    pagination: {
      type: [Boolean, Object] as PropType<boolean | TablePaginationConfig>,
      default: true,
    },
    /**
     * @zh 树形表格的缩进距离
     * @en The indentation distance of the tree table
     */
    indentSize: {
      type: Number,
      default: 16,
    },
    /**
     * @zh 表格行 `key` 的取值字段
     * @en Value field of table row `key`
     */
    rowKey: {
      type: String,
      default: "key",
    },
    /**
     * @zh 是否显示表头
     * @en Whether to show the header
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * @zh 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#VirtualListProps)
     * @en Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps)
     * @type VirtualListProps
     */
    virtualListProps: {
      type: Object as PropType<VirtualListProps>,
    },
    /**
     * @zh 单元格合并方法（索引从数据项开始计数）
     * @en Cell merge method (The index starts counting from the data item)
     */
    spanMethod: {
      type: Function as PropType<
        (data: {
          record: TableData;
          column: TableColumnData | TableOperationColumn;
          rowIndex: number;
          columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void
      >,
    },
    /**
     * @zh 是否让合并方法的索引包含所有
     * @en Whether to make the index of the span method contain all
     */
    spanAll: {
      type: Boolean,
      default: false,
    },
    components: {
      type: Object as PropType<TableComponents>,
    },
    /**
     * @zh 数据懒加载函数，传入时开启懒加载功能
     * @en Data lazy loading function, open the lazy loading function when it is passed in
     */
    loadMore: {
      type: Function as PropType<
        (record: TableData, done: (children?: TableData[]) => void) => void
      >,
    },
    /**
     * @zh 筛选图标是否左对齐
     * @en Whether the filter icon is aligned to the left
     */
    filterIconAlignLeft: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否在子树为空时隐藏展开按钮
     * @en Whether to hide expand button when subtree is empty
     */
    hideExpandButtonOnEmpty: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 表格行元素的类名。`2.34.0` 版本增加函数值支持
     * @en The class name of the table row element. The `2.34.0` version adds support for function values.
     */
    rowClass: {
      type: [String, Array, Object, Function] as PropType<
        | string
        | any[]
        | Record<string, any>
        | ((record: TableData, rowIndex: number) => any)
      >,
    },
    /**
     * @zh 表格拖拽排序的配置
     * @en Table drag and drop sorting configuration
     */
    draggable: {
      type: Object as PropType<TableDraggable>,
    },
    rowNumber: {
      type: [Boolean, Object],
    },
    /**
     * @zh 是否允许调整列宽
     * @en Whether to allow the column width to be adjusted
     */
    columnResizable: {
      type: Boolean,
    },
    /**
     * @zh 显示表尾总结行
     * @en Show footer summary row
     */
    summary: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((params: {
            columns: TableColumnData[];
            data: TableData[];
          }) => TableData[])
      >,
    },
    /**
     * @zh 总结行的首列文字
     * @en The first column of text in the summary line
     */
    summaryText: {
      type: String,
      default: "Summary",
    },
    /**
     * @zh 总结行的单元格合并方法
     * @en Cell Merge Method for Summarizing Rows
     */
    summarySpanMethod: {
      type: Function as PropType<
        (data: {
          record: TableData;
          column: TableColumnData | TableOperationColumn;
          rowIndex: number;
          columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void
      >,
    },
    /**
     * @zh 已选择的行（受控模式）优先于 `rowSelection`
     * @en Selected row (controlled mode) takes precedence over `rowSelection`
     */
    selectedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 默认已选择的行（非受控模式）优先于 `rowSelection`
     * @en The selected row by default (uncontrolled mode) takes precedence over `rowSelection`
     */
    defaultSelectedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 显示的展开行、子树（受控模式）优先于 `expandable`
     * @en Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable`
     */
    expandedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 默认显示的展开行、子树（非受控模式）优先于 `expandable`
     * @en Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable`
     */
    defaultExpandedKeys: {
      type: Array as PropType<(string | number)[]>,
    },
    /**
     * @zh 是否默认展开所有的行
     * @en Whether to expand all rows by default
     */
    defaultExpandAllRows: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 是否开启表头吸顶。相对**页面/外层滚动容器**吸顶，不是表格内部滚动。数字为距离滚动容器顶部的偏移（px）
     * @en Sticky header relative to the page/outer scroll container (not table body scroll). Number is top offset in px
     */
    stickyHeader: {
      type: [Boolean, Number],
      default: false,
    },
    /**
     * @zh 是否开启分页条吸底。相对**页面/外层滚动容器**吸底，不是表格内部滚动。数字为距离滚动容器底部的偏移（px）
     * @en Sticky pagination relative to the page/outer scroll container. Number is bottom offset in px
     */
    stickyPagination: {
      type: [Boolean, Number],
      default: false,
    },
    /**
     * @zh 是否开启虚拟滚动条
     * @en Whether to enable virtual scroll bar
     */
    scrollbar: {
      type: [Object, Boolean] as PropType<boolean | ScrollbarProps>,
      default: false,
    },
    /**
     * @zh 是否展示空子树
     * @en Whether to display empty subtrees
     */
    showEmptyTree: {
      type: Boolean,
      default: false,
    },
    /**
     * @zh 在表格末尾插入扩展列（如设置按钮），内容由 #extra-column-header / #extra-column-cell 提供
     * @en Insert an extra column at the end of the table (e.g. settings button). Content is provided via #extra-column-header / #extra-column-cell
     */
    extraColumn: {
      type: [Boolean, Object] as PropType<boolean | TableExtraColumnConfig>,
      default: false,
    },
  }

export { tableProps as props }
