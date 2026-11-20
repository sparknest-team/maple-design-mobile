# 表格

通过 columns 定义列、data 提供行记录。

## 基础展示

### 基础表格

```demo
../example/demos/basic.vue
```

### 列宽自适应

```demo
../example/demos/column-sizing.vue
```

### 分组表头

```demo
../example/demos/columns-children.vue
```

## 冻结与滚动

### 标签页内横滑与冻结列

```demo
../example/demos/tabs-frozen.vue
```

### 固定列和表头

```demo
../example/demos/fixed-column-and-header.vue
```

### 千行虚拟滚动

```demo
../example/demos/virtual-list-props.vue
```

### 虚拟滚动与展开详情

```demo
../example/demos/virtual-details.vue
```

## 数据操作与状态

### 排序与分页

```demo
../example/demos/sort-pagination.vue
```

### 跨页行选择

```demo
../example/demos/paged-selection.vue
```

### 订单状态与金额汇总

```demo
../example/demos/order-summary.vue
```

### 空数据

```demo
../example/demos/empty-state.vue
```

### 加载中

```demo
../example/demos/loading.vue
```

## API

移动端默认使用原生滚动。传入 virtual-list-props 启用虚拟行。可通过业务控件控制筛选值，首版不展示桌面筛选弹层。

### Table Props

| 参数名                      | 描述                                                                                       | 类型                                                                                                                                                                          |   默认值    |
| --------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
| columns                     | 表格的列描述信息                                                                           | `TableColumnData[]`                                                                                                                                                           |    `[]`     |
| data                        | 表格的数据                                                                                 | `TableData[]`                                                                                                                                                                 |    `[]`     |
| bordered                    | 是否显示边框                                                                               | `boolean \| TableBorder`                                                                                                                                                      |   `true`    |
| hoverable                   | 是否显示选中效果                                                                           | `boolean`                                                                                                                                                                     |   `true`    |
| stripe                      | 是否开启斑马纹效果                                                                         | `boolean`                                                                                                                                                                     |   `false`   |
| size                        | 表格的大小                                                                                 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                                                                                                        |   `'md'`    |
| table-layout                | 表格布局算法，同 CSS `table-layout`。默认 `fixed`，列宽由计算决定不被内容撑开           | `'fixed' \| 'auto'`                                                                                                                                                           |  `'fixed'`  |
| loading                     | 是否为加载中状态                                                                           | `boolean\|object`                                                                                                                                                             |   `false`   |
| row-selection               | 表格的行选择器配置                                                                         | `TableRowSelection`                                                                                                                                                           |     `-`     |
| expandable                  | 表格的展开行配置                                                                           | `TableExpandable`                                                                                                                                                             |     `-`     |
| height                      | 表格高度。设置后表头固定，表体滚动。数字单位为 px                                          | `number \| string`                                                                                                                                                            |     `-`     |
| max-height                  | 表格最大高度。内容不足时收缩，超出后表体滚动。数字单位为 px                                | `number \| string`                                                                                                                                                            |     `-`     |
| fit                         | 剩余空间的分配方式（表格始终至少铺满父容器）。`true`：全给未设 `width` 的弹性列；`false`：按各列基础宽度比例放大分摊 | `boolean`                                                                                                                                                                     |   `true`    |
| pagination                  | 分页的属性配置                                                                             | `boolean \| TablePaginationConfig`                                                                                                                                                  |   `true`    |
| indent-size                 | 树形表格的缩进距离                                                                         | `number`                                                                                                                                                                      |    `16`     |
| row-key                     | 表格行 `key` 的取值字段                                                                    | `string`                                                                                                                                                                      |   `'key'`   |
| show-header                 | 是否显示表头                                                                               | `boolean`                                                                                                                                                                     |   `true`    |
| virtual-list-props          | 传递虚拟列表属性，传入此参数以开启虚拟滚动 [VirtualListProps](#virtuallistprops)           | `VirtualListProps`                                                                                                                                                            |     `-`     |
| span-method                 | 单元格合并方法（索引从数据项开始计数）                                                     | `(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void` |     `-`     |
| span-all                    | 是否让合并方法的索引包含所有                                                               | `boolean`                                                                                                                                                                     |   `false`   |
| components                  | 配置操作列，详见 TableComponents                                                           | `TableComponents`                                                                                                                                                             |     `-`     |
| row-number                  | 保留属性；当前不生成行号                                                                   | `boolean \| object`                                                                                                                                                           |     `-`     |
| load-more                   | 数据懒加载函数，传入时开启懒加载功能                                                       | `(record: TableData, done: (children?: TableData[]) => void) => void`                                                                                                         |     `-`     |
| hide-expand-button-on-empty | 是否在子树为空时隐藏展开按钮                                                               | `boolean`                                                                                                                                                                     |   `false`   |
| row-class                   | 表格行元素的类名。                                                                         | `string\| any[]\| Record<string, any>\| ((record: TableData, rowIndex: number) => any)`                                                                                       |     `-`     |
| draggable                   | 表格拖拽排序的配置                                                                         | `TableDraggable`                                                                                                                                                              |     `-`     |
| column-resizable            | 是否允许调整列宽（仅 `table-layout: fixed` 下渲染拖拽把手）                                | `boolean`                                                                                                                                                                     |   `false`   |
| summary                     | 显示表尾总结行                                                                             | `boolean\| ((params: {    columns: TableColumnData[];    data: TableData[];  }) => TableData[])`                                                                              |     `-`     |
| summary-text                | 总结行的首列文字                                                                           | `string`                                                                                                                                                                      | `'Summary'` |
| summary-span-method         | 总结行的单元格合并方法                                                                     | `(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void` |     `-`     |
| selected-keys               | 已选择的行（受控模式）优先于 `rowSelection`                                                | `(string \| number)[]`                                                                                                                                                        |     `-`     |
| default-selected-keys       | 默认已选择的行（非受控模式）优先于 `rowSelection`                                          | `(string \| number)[]`                                                                                                                                                        |     `-`     |
| expanded-keys               | 显示的展开行、子树（受控模式）优先于 `expandable`                                          | `(string \| number)[]`                                                                                                                                                        |     `-`     |
| default-expanded-keys       | 默认显示的展开行、子树（非受控模式）优先于 `expandable`                                    | `(string \| number)[]`                                                                                                                                                        |     `-`     |
| default-expand-all-rows     | 是否默认展开所有的行                                                                       | `boolean`                                                                                                                                                                     |   `false`   |
| sticky-header               | 表头相对页面/外层滚动容器吸顶；数字为距顶部偏移（px）                                      | `boolean \| number`                                                                                                                                                           |   `false`   |
| sticky-pagination           | 分页相对页面/外层滚动容器吸底；数字为距底部偏移（px）                                      | `boolean \| number`                                                                                                                                                           |   `false`   |
| scrollbar                   | 是否开启虚拟滚动条                                                                         | `boolean \| ScrollbarProps`                                                                                                                                                   |   `false`    |
| show-empty-tree             | 是否展示空子树                                                                             | `boolean`                                                                                                                                                                     |   `false`   |
| extra-column                | 在表格末尾插入扩展列（如设置按钮）；内容由插槽提供                                         | `boolean \| TableExtraColumnConfig`                                                                                                                                           |   `false`   |

### Table Events

| 事件名           | 描述                           | 参数                                                                               |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| expand           | 点击展开行时触发               | rowKey: `string \| number`<br>record: `TableData`                                  |
| expanded-change  | 已展开的数据行发生改变时触发   | rowKeys: `(string \| number)[]`                                                    |
| select           | 点击行选择器时触发             | rowKeys: `(string \| number)[]`<br>rowKey: `string \| number`<br>record: `TableData` |
| select-all       | 点击全选选择器时触发           | checked: `boolean`                                                                 |
| selection-change | 已选择的数据行发生改变时触发   | rowKeys: `(string \| number)[]`                                                    |
| sorter-change    | 排序规则发生改变时触发         | dataIndex: `string`<br>direction: `string`                                         |
| filter-change    | 过滤选项发生改变时触发         | dataIndex: `string`<br>filteredValues: `string[]`                                  |
| page-change      | 表格分页发生改变时触发         | page: `number`                                                                     |
| page-size-change | 表格每页数据数量发生改变时触发 | pageSize: `number`                                                                 |
| change           | 表格数据发生变化时触发         | data: `TableData[]`<br>extra: `TableChangeExtra`<br>currentData: `TableData[]`     |
| update:columns   | 列配置变更时触发（配合 v-model:columns） | columns: `TableColumnData[]`                                                       |
| cell-mouse-enter | 单元格hover进入时触发          | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`                    |
| cell-mouse-leave | 单元格hover退出时触发          | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`                    |
| cell-click       | 点击单元格时触发               | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`                    |
| row-click        | 点击行数据时触发               | record: `TableData`<br>ev: `Event`                                                 |
| header-click     | 点击表头数据时触发             | column: `TableColumnData`<br>ev: `Event`                                           |
| column-resize    | 调整列宽时触发                 | dataIndex: `string`<br>width: `number`                                             |
| row-dblclick     | 双击行数据时触发               | record: `TableData`<br>ev: `Event`                                                 |
| cell-dblclick    | 双击单元格时触发               | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event`                    |
| row-contextmenu  | 右击行数据时触发               | record: `TableData`<br>ev: `Event`                                                 |
| cell-contextmenu | 右击单元格时触发               | record: `TableData`column: `TableColumnData`<br>ev: `Event`                        |
| row-touchstart | 由原生触摸事件触发，传递当前行及原始事件。 | record: `TableData`, event: `TouchEvent` |
| row-touchend | 由原生触摸事件触发，传递当前行及原始事件。 | record: `TableData`, event: `TouchEvent` |
| row-touchcancel | 由原生触摸事件触发，传递当前行及原始事件。 | record: `TableData`, event: `TouchEvent` |

### Table Methods

| 方法名       | 描述             | 参数                                                                     | 返回值 |
| ------------ | ---------------- | ------------------------------------------------------------------------ | ------ |
| selectAll    | 设置全选状态     | checked: `boolean`                                                       | -      |
| select       | 设置行选择器状态 | rowKey: `string \| number \| (string \| number)[]`<br>checked: `boolean` | -      |
| expandAll    | 设置全部展开状态 | checked: `boolean`                                                       | -      |
| expand       | 设置展开状态     | rowKey: `string \| number \| (string \| number)[]`<br>checked: `boolean` | -      |
| resetFilters | 重置列的筛选器   | dataIndex: `string \| string[]`                                          | -      |
| clearFilters | 清空列的筛选器   | dataIndex: `string \| string[]`                                          | -      |
| resetSorters | 重置列的排序     | -                                                                        | -      |
| clearSorters | 清空列的排序     | -                                                                        | -      |

`clearFilters` 和 `resetFilters` 指定列时保留其他列的筛选状态；省略参数或传空数组时处理全部可筛选列。受控列的实际值仍由父组件决定。

单选模式下，`select(keys, true)` 只选择传入的第一个键，空数组不操作；`select(keys, false)` 移除指定的键。`selectAll(true)` 不操作；`selectAll(false)` 移除当前页可选行的键。受控选择仍须由父组件接收并更新 `selectedKeys`。

`select`、`selectAll`、`expand` 和 `expandAll` 的状态参数省略时为 `true`。`expand` 接收一个或多个键，重复展开不会重复添加键；`expandAll` 处理所有数据行。`resetSorters` 恢复列的默认排序，`clearSorters` 清除排序；受控排序仍由父组件决定。

### Table Slots

| 插槽名           |                 描述                  | 参数                                                                   |
| ---------------- | :-----------------------------------: | ---------------------------------------------------------------------- |
| th               |            自定义 th 元素             | column: `TableColumnData`                                              |
| thead            |           自定义 thead 元素           | -                                                                      |
| empty            |               空白展示                | -                                                                      |
| summary-cell     |                总结行                 | column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number` |
| pagination-right |            分页器右侧内容             | -                                                                      |
| pagination-left  |            分页器左侧内容             | -                                                                      |
| td               |            自定义 td 元素             | column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number` |
| tr               |            自定义 tr 元素             | record: `TableData`<br>rowIndex: `number`                              |
| tbody            |           自定义 tbody 元素           | -                                                                      |
| drag-handle-icon |             拖拽锚点图标              | -                                                                      |
| footer           |               表格底部                | -                                                                      |
| expand-row       |              展开行内容               | record: `TableData`                                                    |
| expand-icon      |              展开行图标               | expanded: `boolean`<br>record: `TableData`                             |
| columns          | 表格列定义。启用时会屏蔽 columns 属性 | -                                                                      |
| extra-column-header | 末列扩展列表头内容 | - |
| extra-column-cell | 末列扩展列单元格内容 | record / rowIndex 等 |
| header-cell-actions | 表头右侧操作区（叶子列）；内容由外部完全控制 | column / dataIndex |

### TableColumn Props

| 参数名             | 描述                                | 类型                                                      | 默认值  |
| ------------------ | ----------------------------------- | --------------------------------------------------------- | :-----: |
| data-index         | 列信息的标识，对应TableData中的数据 | `string`                                                  |   `-`   |
| title              | 列标题                              | `string`                                                  |   `-`   |
| width              | 列宽度                              | `number`                                                  |   `-`   |
| min-width          | 最小列宽                            | `number`                                                  |   `80`  |
| align              | 对齐方向                            | `TableColumnData['align']`                                |   `-`   |
| fixed              | 固定位置                            | `TableColumnData['fixed']`                                |   `-`   |
| ellipsis           | 是否显示为省略                      | `boolean`                                                 | `false` |
| sortable           | 排序相关选项                        | `TableSortable`                                           |   `-`   |
| filterable         | 过滤相关选项                        | `TableFilterable`                                         |   `-`   |
| cell-class         | 自定义单元格类名                    | `ClassName`                                               |   `-`   |
| header-cell-class  | 自定义表头单元格类名                | `ClassName`                                               |   `-`   |
| body-cell-class    | 自定义内容单元格类名                | `ClassName \| ((record: TableData) => ClassName)`         |   `-`   |
| summary-cell-class | 自定义总结栏单元格类名              | `ClassName \| ((record: TableData) => ClassName)`         |   `-`   |
| cell-style         | 自定义单元格样式                    | `CSSProperties`                                           |   `-`   |
| header-cell-style  | 自定义表头单元格样式                | `CSSProperties`                                           |   `-`   |
| body-cell-style    | 自定义内容单元格样式                | `CSSProperties \| ((record: TableData) => CSSProperties)` |   `-`   |
| summary-cell-style | 自定义总结栏单元格样式              | `CSSProperties \| ((record: TableData) => CSSProperties)` |   `-`   |
| index              | 用于手动指定选项的 index。          | `number`                                                  |   `-`   |
| tooltip            | 在省略时是否显示文字提示            | `boolean\|object`                                         | `false` |

### TableColumn Slots

| 插槽名         |         描述         | 参数                                                                                                                                                                         |
| -------------- | :------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter-icon    |     筛选按钮图标     | -                                                                                                                                                                            |
| filter-content | 自定义筛选弹出框内容 | filterValue: `string[]`<br>setFilterValue: `(filterValue: string[]) => void`<br>handleFilterConfirm: `(event: Event) => void`<br>handleFilterReset: `(event: Event) => void` |
| default        | 声明分组表头的子列 | - |
| title          |         标题         | -                                                                                                                                                                            |
| cell           |        单元格        | record: `TableData`<br>column: `TableColumnData`<br>rowIndex: `number`                                                                                                       |

### 表格结构子组件

`Thead` 和 `Tbody` 分别渲染表头和表体，默认插槽提供内容；同名插槽可定制对应元素。`Tr`、`Th` 和 `Td` 是依赖 Table 上下文的底层渲染器，不是独立的数据表格。通常通过 Table 的 `tr`、`th`、`td` 插槽定制元素。

客户端渲染时，内容插槽和结构插槽都可以在列表项上组合 `v-for`、`:key` 和 `v-memo`。

**服务端渲染**时，Vue 3.5.45 编译使用方模板可能在业务页面的服务端构建产物中生成引用未声明 `_cache` 的插槽函数，导致首屏缺少内容。在 Table 发布入口已复现于标题、单元格、筛选图标与面板、空状态、页脚、展开行与图标、分页、汇总单元格、拖动手柄、扩展列和表头操作区。自定义 `thead`、`tbody`、`tr`、`th`、`td` 同样受影响，即使循环为空也可能报错。需要 SSR 时，在这些插槽的列表项上保留 `v-for` 和稳定的 `:key`，移除同一节点的 `v-memo`。

通过 `#columns` 声明的 `TableColumn` 支持服务端输出表头与数据单元格，包括分组列和动态列；也可以通过 `columns` 属性定义列。

`Tr` 的 `expand`、`empty`、`checked` 表示行状态，`rowIndex` 和 `record` 提供行上下文。`Th` 接收 `column`、`operations`、`dataColumns` 和 `resizable`。`Td` 接收 `rowIndex`、`record`、`column`、`type`、`operations`、`dataColumns`、`colSpan`、`rowSpan`、`isFixedExpand`、`containerWidth`、`showExpandBtn`、`indentSize`、`renderExpandBtn` 和 `summary`，这些字段用于 Table 内部布局及渲染。

### TableComponents

`components.operations` 接收当前的 `dragHandle`、`expand` 和 `selection` 操作列（未启用时相应值为空），返回要渲染的操作列数组。它用于调整操作列，不是任意表格元素的替换接口。

### TableOperationColumn Props

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| name | 操作列标识 | `string` |
| title | 列标题 | `string \| RenderFunction` |
| width | 列宽 | `number` |
| fixed | 是否固定 | `boolean` |
| render | 自定义操作单元格内容 | `(record: TableData) => VNodeChild` |

`isLastLeftFixed` 和 `_realWidth` 用于表格布局计算，业务代码通常无需设置。`TableComponents` 与 `TableOperationColumn` 类型可从根入口或 table 入口导入。

### 分页配置类型

`pagination.align` 支持 `start` 和 `end`，默认靠末端（LTR 居右，RTL 居左）。使用 `:pagination="{ align: 'start' }"` 可将分页条移至起始侧。分页条位于表格底部。

`TablePaginationConfig = Omit<PaginationProps, 'total'> & { total?: number; container?: string | HTMLElement; align?: 'start' | 'end' }`。表格省略 `pagination.total` 时由有效数据条数推导；远程分页可继续显式传入总数。原 `PaginationProps` 对象仍可直接传给表格，独立 `Pagination` 的 `total` 必填要求不变。根入口与 table 入口均导出 `TablePaginationConfig`。

### 透传配置优先级

列 filterable.triggerProps 中的嵌套 open 等字段可以覆盖筛选浮层状态。需要由业务控制筛选浮层时，应同时管理其打开状态与筛选条件。

## Types

### TableData

| 参数名   | 描述             | 类型                       | 默认值  |
| -------- | ---------------- | -------------------------- | :-----: |
| key      | 数据行的key      | `string`                   |   `-`   |
| expand   | 扩展行内容       | `string \| RenderFunction` |   `-`   |
| children | 子数据           | `TableData[]`              |   `-`   |
| disabled | 是否禁用行选择器 | `boolean`                  | `false` |
| isLeaf   | 是否是叶子节点   | `boolean`                  | `false` |

### TableSortable

自定义 `sorter(a, b, { direction })` 需自行根据 `direction` 返回升序或降序结果，Table 不会再次反转；`sorter: true` 关闭内部排序。未提供函数时使用内置比较，相同值保留原顺序。

| 参数名           | 描述                                     | 类型                                                                                                                                                 | 默认值 |
| ---------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | :----: |
| sortDirections   | 支持的排序方向                           | `('ascend' \| 'descend')[]`                                                                                                                          |  `-`   |
| sorter           | 排序函数。设置为 `true` 可关闭内部排序。 | `((        a: TableData,        b: TableData,        extra: { dataIndex: string; direction: 'ascend' \| 'descend' }      ) => number)    \| boolean` |  `-`   |
| sortOrder        | 排序方向                                 | `'ascend' \| 'descend' \| ''`                                                                                                                        |  `-`   |
| defaultSortOrder | 默认排序方向（非受控模式）               | `'ascend' \| 'descend' \| ''`                                                                                                                        |  `-`   |

### TableFilterData

| 参数名 | 描述               | 类型                       | 默认值 |
| ------ | ------------------ | -------------------------- | :----: |
| text   | 筛选数据选项的内容 | `string \| RenderFunction` |  `-`   |
| value  | 筛选数据选项的值   | `string`                   |  `-`   |

### TableFilterable

筛选内容依次使用列的 `filter-content` 插槽、`slotName` 指向且实际存在的 Table 具名插槽、`renderContent`，最后使用 `filters` 内置选项。指定的具名插槽不存在时会继续使用后续内容。

| 参数名               | 描述                                      | 类型                                                                                                                                                                                                     | 默认值  |
| -------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: |
| filters              | 筛选数据                                  | `TableFilterData[]`                                                                                                                                                                                      |   `-`   |
| filter               | 筛选函数,用法类似于Array.prototype.filter | `(filteredValue: string[], <br/>record:TableData)=> boolean`                                                                                                                                             |   `-`   |
| multiple             | 是否支持多选                              | `boolean`                                                                                                                                                                                                | `false` |
| filteredValue        | 筛选项                                    | `string[]`                                                                                                                                                                                               |   `-`   |
| defaultFilteredValue | 默认筛选项                                | `string[]`                                                                                                                                                                                               |   `-`   |
| renderContent        | 筛选框的内容                              | `(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNodeChild` |   `-`   |
| icon                 | 筛选按钮的图标                            | `RenderFunction`                                                                                                                                                                                         |   `-`   |
| triggerProps         | 筛选框的弹出框配置                        | `TriggerProps`                                                                                                                                                                                           |   `-`   |
| alignLeft            | 筛选图标是否左对齐                        | `boolean`                                                                                                                                                                                                | `false` |
| slotName             | Table 上自定义筛选内容的具名插槽           | `string`                                                                                                                                                                                                 | `-` |

### TableColumnData

| 参数名           | 描述                                                    | 类型                                                                                                | 默认值  |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | :-----: |
| dataIndex        | 列信息的标识，对应 `TableData` 中的数据                 | `string`                                                                                            |   `-`   |
| title            | 列标题                                                  | `string \| RenderFunction`                                                                          |   `-`   |
| width            | 列宽基准。有弹性列且 fit=true 时保持固定；全部定宽且不足容器时按比例放大            | `number`                                                                                            |   `-`   |
| minWidth         | 最小列宽。未设置 `width` 时按比例分配剩余空间；默认 80  | `number`                                                                                            |   `80`  |
| align            | 对齐方向                                                | `'left' \| 'center' \| 'right'`                                                                     |   `-`   |
| fixed            | 固定位置                                                | `'left' \| 'right'`                                                                                 |   `-`   |
| ellipsis         | 是否显示省略号                                          | `boolean`                                                                                           | `false` |
| tooltip          | 是否在显示省略号时显示文本提示。可填入 tooltip 组件属性 | `boolean \| Record<string, any>`                                                                    |   `-`   |
| sortable         | 排序相关选项                                            | `TableSortable`                                                                                     |   `-`   |
| filterable       | 过滤相关选项                                            | `TableFilterable`                                                                                   |   `-`   |
| children         | 表头子数据，用于表头分组                                | `TableColumnData[]`                                                                                 |   `-`   |
| cellClass        | 自定义单元格类名                                        | `ClassName`                                                                                         |   `-`   |
| headerCellClass  | 自定义表头单元格类名                                    | `ClassName`                                                                                         |   `-`   |
| bodyCellClass    | 自定义内容单元格类名                                    | `ClassName \| ((record: TableData) => ClassName)`                                                   |   `-`   |
| summaryCellClass | 自定义总结栏单元格类名                                  | `ClassName \| ((record: TableData) => ClassName)`                                                   |   `-`   |
| cellStyle        | 自定义单元格样式                                        | `CSSProperties`                                                                                     |   `-`   |
| headerCellStyle  | 自定义表头单元格样式                                    | `CSSProperties`                                                                                     |   `-`   |
| bodyCellStyle    | 自定义内容单元格样式                                    | `CSSProperties \| ((record: TableData) => CSSProperties)`                                           |   `-`   |
| summaryCellStyle | 自定义总结栏单元格样式                                  | `CSSProperties \| ((record: TableData) => CSSProperties)`                                           |   `-`   |
| render           | 自定义列单元格的渲染                                    | `(data: {    record: TableData;    column: TableColumnData;    rowIndex: number;  }) => VNodeChild` |   `-`   |
| slotName         | 设置当前列的渲染插槽的名字。插槽参数同 #cell            | `string`                                                                                            |   `-`   |
| titleSlotName    | 设置当前列的标题的渲染插槽的名字                        | `string`                                                                                            |   `-`   |

### TableBorder

| 参数名     | 描述                            | 类型      | 默认值  |
| ---------- | ------------------------------- | --------- | :-----: |
| wrapper    | 是否展示外边框                  | `boolean` | `false` |
| cell       | 是否展示单元格边框（表头+主体） | `boolean` | `false` |
| headerCell | 是否展示表头单元格边框          | `boolean` | `false` |
| bodyCell   | 是否展示主体单元格边框          | `boolean` | `false` |

### TableRowSelection

| 参数名                 | 描述                                           | 类型                    | 默认值  |
| ---------------------- | ---------------------------------------------- | ----------------------- | :-----: |
| type                   | 行选择器的类型                                 | `'checkbox' \| 'radio'` |   `-`   |
| selectedRowKeys        | 已选择的行（受控模式）                         | `BaseType[]`            |   `-`   |
| defaultSelectedRowKeys | 默认已选择的行（非受控模式）                   | `BaseType[]`            |   `-`   |
| showCheckedAll         | 是否显示全选选择器                             | `boolean`               | `false` |
| title                  | 列标题                                         | `string`                |   `-`   |
| width                  | 列宽度                                         | `number`                |   `-`   |
| fixed                  | 是否固定                                       | `boolean`               | `false` |
| checkStrictly          | 是否开启严格选择模式                           | `boolean`               | `true`  |
| onlyCurrent            | 是否仅展示当前页的 keys（切换分页时清空 keys） | `boolean`               | `false` |

### TableExpandable

| 参数名                 | 描述                           | 类型                                                   | 默认值  |
| ---------------------- | ------------------------------ | ------------------------------------------------------ | :-----: |
| expandedRowKeys        | 显示的展开行（受控模式）       | `BaseType[]`                                           |   `-`   |
| defaultExpandedRowKeys | 默认显示的展开行（非受控模式） | `BaseType[]`                                           |   `-`   |
| defaultExpandAllRows   | 是否默认展开所有的行           | `boolean`                                              | `false` |
| expandedRowRender      | 自定义展开行内容               | `(record: TableData) => VNodeChild`                    |   `-`   |
| icon                   | 展开图标                       | `(expanded: boolean, record: TableData) => VNodeChild` |   `-`   |
| title                  | 列标题                         | `string`                                               |   `-`   |
| width                  | 列宽度                         | `number`                                               |   `-`   |
| fixed                  | 是否固定                       | `boolean`                                              | `false` |

### TableDraggable

| 参数名 | 描述     | 类型                | 默认值  |
| ------ | -------- | ------------------- | :-----: |
| type   | 拖拽类型 | `'row' \| 'handle'` |   `-`   |
| title  | 列标题   | `string`            |   `-`   |
| width  | 列宽度   | `number`            |   `-`   |
| fixed  | 是否固定 | `boolean`           | `false` |

### TableChangeExtra

| 参数名     | 描述       | 类型                                             | 默认值 |
| ---------- | ---------- | ------------------------------------------------ | :----: |
| type       | 触发类型   | `'pagination' \| 'sorter' \| 'filter' \| 'drag'` |  `-`   |
| page       | 页码       | `number`                                         |  `-`   |
| pageSize   | 每页数据数 | `number`                                         |  `-`   |
| sorter     | 排序信息   | `Sorter`                                         |  `-`   |
| filters    | 筛选信息   | `Filters`                                        |  `-`   |
| dragTarget | 拖拽信息   | `TableData`                                      |  `-`   |

### VirtualListProps

| 参数名             | 描述                                                               | 类型               | 默认值  |
| :----------------- | ------------------------------------------------------------------ | ------------------ | :-----: |
| height             | 可视区域高度                                                       | `number \| string` |   `-`   |
| threshold          | 开启虚拟滚动的元素数量阈值，当数据数量小于阈值时不会开启虚拟滚动。 | `number`           |   `-`   |
| fixedSize          | 元素高度是否是固定的。                                             | `boolean`          | `false` |
| estimatedSize      | 元素高度不固定时的预估高度。                                       | `number`           |   `-`   |
| buffer             | 视口边界外提前挂载的元素数量。                                     | `number`           |  `10`   |

### TableExtraColumnConfig

| 参数名 | 描述 | 类型 | 默认值 |
| :----- | ---- | ---- | :----: |
| width | 列宽；未传按表格 size | `number` | xs 28 / sm 32 / md·lg·xl 36 |
| fixed | 固定位置 | `'left' \| 'right'` | `'right'` |
| align | 对齐 | `'left' \| 'center' \| 'right'` | `'center'` |
| dataIndex | 列标识 | `string` | `__cedar_table_extra__` |

## CSS Variables

表格颜色、间距和边框继承 Maple 主题。

| Token | Default |
| --- | --- |
| `--mp-table-sticky-scrollbar-height` | `16px` |
| `--mp-table-size-md-padding-horizontal` | `var(--mp-sys-space-6)` |
| `--mp-table-size-md-padding-vertical` | `9px` |
| `--mp-table-size-sm-padding-horizontal` | `var(--mp-sys-space-6)` |
| `--mp-table-size-sm-padding-vertical` | `5px` |
| `--mp-table-size-xs-padding-horizontal` | `var(--mp-sys-space-6)` |
| `--mp-table-size-xs-padding-vertical` | `2px` |
| `--mp-table-size-lg-padding-horizontal` | `var(--mp-table-size-md-padding-horizontal)` |
| `--mp-table-size-lg-padding-vertical` | `var(--mp-table-size-md-padding-vertical)` |
| `--mp-table-size-md-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-table-size-sm-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-table-size-xs-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-table-size-lg-font-size` | `var(--mp-table-size-md-font-size)` |
| `--mp-table-size-md-header-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-table-size-sm-header-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-table-size-xs-header-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-table-size-lg-header-font-size` | `var(--mp-table-size-md-header-font-size)` |
| `--mp-table-size-xs-extra-padding-horizontal` | `var(--mp-sys-space-1)` |
| `--mp-table-size-sm-extra-padding-horizontal` | `var(--mp-sys-space-1)` |
| `--mp-table-size-md-extra-padding-horizontal` | `var(--mp-sys-space-2)` |
| `--mp-table-size-lg-extra-padding-horizontal` | `var(--mp-sys-space-2)` |
| `--mp-table-size-xs-extra-icon-font-size` | `14px` |
| `--mp-table-size-sm-extra-icon-font-size` | `14px` |
| `--mp-table-size-md-extra-icon-font-size` | `16px` |
| `--mp-table-size-lg-extra-icon-font-size` | `16px` |
| `--mp-table-border-width` | `1px` |
| `--mp-table-border-style` | `solid` |
| `--mp-table-border-color` | `rgb(var(--mp-gray-3))` |
| `--mp-table-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-table-resizing-border-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-table-expand-button-size` | `14px` |
| `--mp-table-expand-button-margin-right` | `var(--mp-sys-space-2)` |
| `--mp-table-expand-button-font-size` | `12px` |
| `--mp-table-expand-button-border-radius` | `2px` |
| `--mp-table-expand-icon-color` | `var(--mp-color-text-2)` |
| `--mp-table-expand-icon-hover-color` | `var(--mp-color-text-1)` |
| `--mp-table-expand-icon-border-color` | `transparent` |
| `--mp-table-expand-icon-hover-border-color` | `transparent` |
| `--mp-table-expand-icon-bg` | `rgb(var(--mp-gray-3))` |
| `--mp-table-expand-icon-hover-bg` | `rgb(var(--mp-gray-4))` |
| `--mp-table-expand-icon-border-width` | `1px` |
| `--mp-table-expand-content-bg` | `var(--mp-color-fill-1)` |
| `--mp-table-expand-content-hover-bg` | `var(--mp-color-fill-1)` |
| `--mp-table-expand-loading-icon-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-table-header-cell-text-color` | `rgb(var(--mp-gray-10))` |
| `--mp-table-header-cell-bg` | `rgb(var(--mp-gray-2))` |
| `--mp-table-header-sorted-cell-bg` | `rgb(var(--mp-gray-3))` |
| `--mp-table-header-sorted-cell-hover-bg` | `rgba(var(--mp-gray-4), 0.5)` |
| `--mp-table-header-text-font-weight` | `var(--mp-sys-font-weight-medium)` |
| `--mp-table-header-cell-action-color` | `var(--mp-color-text-3)` |
| `--mp-table-header-cell-action-hover-color` | `var(--mp-color-text-1)` |
| `--mp-table-header-cell-action-margin-left` | `2px` |
| `--mp-table-th-actions-margin-left` | `8px` |
| `--mp-table-header-filters-icon-color` | `var(--mp-color-text-2)` |
| `--mp-table-header-filters-icon-active-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-table-header-filters-icon-hover-bg` | `rgb(var(--mp-gray-4))` |
| `--mp-table-filters-icon-font-size` | `16px` |
| `--mp-table-filters-width` | `24px` |
| `--mp-table-filters-icon-hover-bg` | `var(--mp-color-fill-4)` |
| `--mp-table-header-sorter-icon-color` | `rgb(var(--mp-gray-5))` |
| `--mp-table-header-sorter-icon-next-color` | `rgb(var(--mp-gray-6))` |
| `--mp-table-header-sorter-icon-active-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-table-header-sorter-icon-margin-left` | `var(--mp-sys-space-4)` |
| `--mp-table-header-sorter-icon-height` | `8px` |
| `--mp-table-header-sorter-icon-width` | `14px` |
| `--mp-table-header-sorter-icon-font-size` | `12px` |
| `--mp-table-header-sorter-icon-up-top` | `-2px` |
| `--mp-table-header-sorter-icon-down-top` | `-3px` |
| `--mp-table-header-sorter-icon-left` | `1px` |
| `--mp-table-body-cell-text-color` | `rgb(var(--mp-gray-10))` |
| `--mp-table-body-cell-bg` | `var(--mp-color-bg-2)` |
| `--mp-table-body-sorted-cell-bg` | `var(--mp-color-fill-1)` |
| `--mp-table-body-stripe-row-bg` | `var(--mp-color-fill-1)` |
| `--mp-table-body-row-hover-bg` | `var(--mp-color-fill-1)` |
| `--mp-table-body-row-active-bg` | `var(--mp-color-fill-1)` |
| `--mp-table-body-row-active-dark-bg` | `rgb(var(--mp-gray-2))` |
| `--mp-table-body-bg` | `var(--mp-color-bg-2)` |
| `--mp-table-body-min-height` | `40px` |
| `--mp-table-empty-height` | `240px` |
| `--mp-table-empty-image-size` | `48px` |
| `--mp-table-tfoot-bg` | `rgb(var(--mp-gray-2))` |
| `--mp-table-editable-body-cell-border-color` | `var(--mp-color-white)` |
| `--mp-table-filters-popup-bg` | `var(--mp-color-bg-5)` |
| `--mp-table-filters-popup-border-color` | `rgb(var(--mp-gray-3))` |
| `--mp-table-filters-popup-min-width` | `100px` |
| `--mp-table-filters-popup-max-height` | `200px` |
| `--mp-table-filters-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-table-filters-popup-box-shadow` | `0 2px 5px rgba(0,0,0,.1)` |
| `--mp-table-filters-list-padding` | `4px 0` |
| `--mp-table-filters-item-height` | `32px` |
| `--mp-table-filters-item-padding` | `0 12px` |
| `--mp-table-filters-item-font-size` | `14px` |
| `--mp-table-filters-item-line-height` | `32px` |
| `--mp-table-filters-text-max-width` | `160px` |
| `--mp-table-filters-text-height` | `34px` |
| `--mp-table-filters-text-padding-left` | `10px` |
| `--mp-table-filters-text-line-height` | `32px` |
| `--mp-table-filters-bottom-height` | `38px` |
| `--mp-table-filters-bottom-padding` | `0 12px` |
| `--mp-table-filters-bottom-line-height` | `38px` |
| `--mp-table-filters-bottom-gap` | `8px` |
| `--mp-table-shadow-left` | `inset 6px 0 8px -3px rgba(0, 0, 0, 0.15)` |
| `--mp-table-shadow-right` | `inset -6px 0 8px -3px rgba(0, 0, 0, 0.15)` |
| `--mp-table-shadow-wrapper-width` | `10px` |
| `--mp-table-selection-col-width` | `40px` |
| `--mp-table-expand-icon-col-width` | `40px` |
| `--mp-table-drag-handle-col-width` | `40px` |
| `--mp-table-column-handle-width` | `8px` |
| `--mp-table-column-handle-right` | `-4px` |
| `--mp-table-pagination-margin` | `var(--mp-sys-space-5)` |
| `--mp-table-pagination-sticky-padding` | `12px 0` |
| `--mp-table-sticky-scrollbar-opacity` | `0.8` |
| `--mp-table-pagination-sticky-bg` | `var(--mp-color-bg-1)` |
| `--mp-table-extra-column-icon-color` | `var(--mp-color-text-2)` |
| `--mp-table-extra-column-icon-hover-color` | `var(--mp-color-text-1)` |
| `--mp-table-column-insert-max-height` | `calc(100vh - 160px)` |
| `--mp-table-column-insert-padding` | `16px 20px` |
| `--mp-table-column-insert-empty-text-color` | `var(--mp-color-text-3)` |
| `--mp-table-column-insert-empty-font-size` | `14px` |
| `--mp-table-column-insert-empty-line-height` | `22px` |
| `--mp-table-column-insert-group-margin-top` | `16px` |
| `--mp-table-column-insert-group-title-margin-bottom` | `8px` |
| `--mp-table-column-insert-group-title-text-color` | `var(--mp-color-text-3)` |
| `--mp-table-column-insert-group-title-font-size` | `12px` |
| `--mp-table-column-insert-group-title-line-height` | `20px` |
| `--mp-table-column-insert-item-min-height` | `32px` |
| `--mp-table-line-height` | `var(--mp-line-height)` |
| `--mp-table-transition-duration` | `var(--mp-sys-motion-duration-fast)` |
| `--mp-table-transition-timing-function` | `linear` |
