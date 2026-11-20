# Table

Use columns to define the headers and data to supply the records.

## Basic tables

### Basic table

```demo
../example/demos/basic.vue
```

### Adaptive column widths

```demo
../example/demos/en-US/column-sizing.vue
```

### Grouped headers

```demo
../example/demos/columns-children.vue
```

## Fixed columns and scrolling

### Frozen column inside swipeable tabs

```demo
../example/demos/en-US/tabs-frozen.vue
```

### Fixed columns and header

```demo
../example/demos/fixed-column-and-header.vue
```

### Virtual scrolling

```demo
../example/demos/virtual-list-props.vue
```

### Virtual scrolling with expandable rows

```demo
../example/demos/en-US/virtual-details.vue
```

## Data and states

### Sorting and pagination

```demo
../example/demos/sort-pagination.vue
```

### Selection across pages

```demo
../example/demos/en-US/paged-selection.vue
```

### Order status and totals

```demo
../example/demos/en-US/order-summary.vue
```

### Empty state

```demo
../example/demos/empty-state.vue
```

### Loading

```demo
../example/demos/loading.vue
```

## API

Native scrolling is the default. Set virtual-list-props to render a window of rows. Use application controls for filter values on mobile.

### Table Props

| Parameter | Description | Type | Default |
| --------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------: |
| columns | Column info of the table | `TableColumnData[]` | `[]` |
| data | Table data | `TableData[]` | `[]` |
| bordered | Whether to show border | `boolean \| TableBorder` | `true` |
| hoverable | Whether to show the hover effect | `boolean` | `true` |
| stripe | Whether to enable the stripe effect | `boolean` | `false` |
| size | The size of the table | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| table-layout | Table layout algorithm, matching CSS `table-layout`. Defaults to `fixed`; calculated column widths are not expanded by content | `'fixed' \| 'auto'` | `'fixed'` |
| loading | Loading state | `boolean\|object` | `false` |
| row-selection | Table row selector configuration | `TableRowSelection` | `-` |
| expandable | Expand row configuration of the table | `TableExpandable` | `-` |
| height | Table height; fixes the header and scrolls the body. Numbers are px | `number \| string` | `-` |
| max-height | Maximum table height; shrinks for short content and scrolls the body on overflow. Numbers are px | `number \| string` | `-` |
| fit | Remaining-space allocation; the table always fills at least its parent `width`. `true` assigns it to flexible columns without `width`; `false` expands columns proportionally to their base widths | `boolean` | `true` |
| pagination | Pagination properties configuration | `boolean \| TablePaginationConfig` | `true` |
| indent-size | The indentation distance of the tree table | `number` | `16` |
| row-key | Value field of table row `key` | `string` | `'key'` |
| show-header | Whether to show the header | `boolean` | `true` |
| virtual-list-props | Virtual-list props; providing them enables virtual scrolling. See VirtualListProps | `VirtualListProps` | `-` |
| span-method | Cell merge method (The index starts counting from the data item) | `(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void` | `-` |
| span-all | Whether to make the index of the span method contain all | `boolean` | `false` |
| components | Configure operation columns; see TableComponents | `TableComponents` | `-` |
| row-number | Reserved prop; currently does not generate row numbers | `boolean \| object` | `-` |
| load-more | Load children asynchronously; call done(children), or done() to allow retry | `(record: TableData, done: (children?: TableData[]) => void) => void` | `-` |
| hide-expand-button-on-empty | Whether to hide expand button when subtree is empty | `boolean` | `false` |
| row-class | Class for table-row elements | `string\| any[]\| Record<string, any>\| ((record: TableData, rowIndex: number) => any)` | `-` |
| draggable | Table drag and drop sorting configuration | `TableDraggable` | `-` |
| column-resizable | Whether columns can be resized; drag handles render only under `table-layout: fixed` | `boolean` | `false` |
| summary | Show footer summary row | `boolean\| ((params: {    columns: TableColumnData[];    data: TableData[];  }) => TableData[])` | `-` |
| summary-text | The first column of text in the summary line | `string` | `'Summary'` |
| summary-span-method | Cell Merge Method for Summarizing Rows | `(data: {  record: TableData;  column: TableColumnData \| TableOperationColumn;  rowIndex: number;  columnIndex: number;}) => { rowspan?: number; colspan?: number } \| void` | `-` |
| selected-keys | Selected row (controlled mode) takes precedence over `rowSelection` | `(string \| number)[]` | `-` |
| default-selected-keys | The selected row by default (uncontrolled mode) takes precedence over `rowSelection` | `(string \| number)[]` | `-` |
| expanded-keys | Displayed Expanded Row, Subtree (Controlled Mode) takes precedence over `expandable` | `(string \| number)[]` | `-` |
| default-expanded-keys | Expand row, Subtree displayed by default (Uncontrolled mode) takes precedence over `expandable` | `(string \| number)[]` | `-` |
| default-expand-all-rows | Whether to expand all rows by default | `boolean` | `false` |
| sticky-header | Sticky header relative to the page/outer scroller; numeric values are top offsets in px | `boolean \| number` | `false` |
| sticky-pagination | Sticky pagination relative to the page/outer scroller; numeric values are bottom offsets in px | `boolean \| number` | `false` |
| scrollbar | Whether to enable virtual scroll bar | `boolean \| ScrollbarProps` | `false` |
| show-empty-tree | Whether to display empty subtrees | `boolean` | `false` |
| extra-column | Append an extra final column, e.g. settings; slots supply its content | `boolean \| TableExtraColumnConfig` | `false` |

### Table Events

| Event | Description | Arguments |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| expand | Emitted when an expandable row is clicked | rowKey: `string \| number`<br>record: `TableData` |
| expanded-change | Emitted when expanded rows change | rowKeys: `(string \| number)[]` |
| select | Emitted when a row selector is clicked | rowKeys: `(string \| number)[]`<br>rowKey: `string \| number`<br>record: `TableData` |
| select-all | Emitted when the select-all control is clicked | checked: `boolean` |
| selection-change | Emitted when selected rows change | rowKeys: `(string \| number)[]` |
| sorter-change | Emitted when sorting changes | dataIndex: `string`<br>direction: `string` |
| filter-change | Emitted when filtering changes | dataIndex: `string`<br>filteredValues: `string[]` |
| page-change | Emitted when table page changes | page: `number` |
| page-size-change | Emitted when table page size changes | pageSize: `number` |
| change | Emitted when table data changes | data: `TableData[]`<br>extra: `TableChangeExtra`<br>currentData: `TableData[]` |
| update:columns | Emitted when column configuration changes; supports v-model:columns | columns: `TableColumnData[]` |
| cell-mouse-enter | Emitted on cell hover enter | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event` |
| cell-mouse-leave | Emitted on cell hover leave | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event` |
| cell-click | Emitted when a cell is clicked | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event` |
| row-click | Emitted when a row is clicked | record: `TableData`<br>ev: `Event` |
| header-click | Emitted when a header is clicked | column: `TableColumnData`<br>ev: `Event` |
| column-resize | Emitted when a column is resized | dataIndex: `string`<br>width: `number` |
| row-dblclick | Emitted when a row is double-clicked | record: `TableData`<br>ev: `Event` |
| cell-dblclick | Emitted when a cell is double-clicked | record: `TableData`<br>column: `TableColumnData`<br>ev: `Event` |
| row-contextmenu | Emitted when a row is right-clicked | record: `TableData`<br>ev: `Event` |
| cell-contextmenu | Emitted when a cell is right-clicked | record: `TableData`column: `TableColumnData`<br>ev: `Event` |
| row-touchstart | Emitted for the touched row with the original native event. | record: `TableData`, event: `TouchEvent` |
| row-touchend | Emitted for the touched row with the original native event. | record: `TableData`, event: `TouchEvent` |
| row-touchcancel | Emitted for the touched row with the original native event. | record: `TableData`, event: `TouchEvent` |

### Table Methods

| Method | Description | Arguments | Returns |
| ------------ | ---------------- | ------------------------------------------------------------------------ | ------ |
| selectAll | Set select-all state | checked: `boolean` | - |
| select | Set row-selection state | rowKey: `string \| number \| (string \| number)[]`<br>checked: `boolean` | - |
| expandAll | Set all rows’ expansion state | checked: `boolean` | - |
| expand | Set expansion state | rowKey: `string \| number \| (string \| number)[]`<br>checked: `boolean` | - |
| resetFilters | Reset column filters | dataIndex: `string \| string[]` | - |
| clearFilters | Clear column filters | dataIndex: `string \| string[]` | - |
| resetSorters | Reset column sorting | - | - |
| clearSorters | Clear column sorting | - | - |

When columns are specified, `clearFilters` and `resetFilters` preserve other columns' filter state. Omitting the argument or passing an empty array applies to all filterable columns. The parent continues to own controlled filter values.

In radio mode, `select(keys, true)` selects only the first supplied key; an empty array does nothing. `select(keys, false)` removes the specified keys. `selectAll(true)` does nothing; `selectAll(false)` removes the keys of enabled rows on the current page. For controlled selection, the parent must receive and update `selectedKeys`.

The state argument of `select`, `selectAll`, `expand`, and `expandAll` defaults to `true`. `expand` accepts one or more keys and does not add duplicates when called repeatedly; `expandAll` applies to all data rows. `resetSorters` restores column defaults and `clearSorters` clears sorting; the parent continues to own controlled sorting.

### Table Slots

| Slot | Description | Prop |
| ---------------- | :-----------------------------------: | ---------------------------------------------------------------------- |
| th | Custom th element | column: `TableColumnData` |
| thead | Custom thead element | - |
| empty | Empty content | - |
| summary-cell | Summary row | column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number` |
| pagination-right | Content to the right of pagination | - |
| pagination-left | Content to the left of pagination | - |
| td | Custom td element | column: `TableColumnData`<br>record: `TableData`<br>rowIndex: `number` |
| tr | Custom tr element | record: `TableData`<br>rowIndex: `number` |
| tbody | Custom tbody element | - |
| drag-handle-icon | Drag-anchor icon | - |
| footer | Table footer | - |
| expand-row | Expanded-row content | record: `TableData` |
| expand-icon | Expanded-row icon | expanded: `boolean`<br>record: `TableData` |
| columns | Declarative columns; when used, override columns | - |
| extra-column-header | Extra final-column header content | - |
| extra-column-cell | Extra final-column cell content | record / rowIndex, etc. |
| header-cell-actions | Header-side actions for leaf columns; entirely controlled by the caller | column / dataIndex |

### TableColumn Props

| Parameter | Description | Type | Default |
| ------------------ | ----------------------------------- | --------------------------------------------------------- | :-----: |
| data-index | Column identifier matching a TableData field | `string` | `-` |
| title | Column title | `string` | `-` |
| width | Column width | `number` | `-` |
| min-width | Minimum column width | `number` | `80` |
| align | Alignment | `TableColumnData['align']` | `-` |
| fixed | Fixed position | `TableColumnData['fixed']` | `-` |
| ellipsis | Whether to truncate with an ellipsis | `boolean` | `false` |
| sortable | Sorting options | `TableSortable` | `-` |
| filterable | Filtering options | `TableFilterable` | `-` |
| cell-class | Custom cell class | `ClassName` | `-` |
| header-cell-class | Custom header-cell class | `ClassName` | `-` |
| body-cell-class | Custom body-cell class | `ClassName \| ((record: TableData) => ClassName)` | `-` |
| summary-cell-class | Custom summary-cell class | `ClassName \| ((record: TableData) => ClassName)` | `-` |
| cell-style | Custom cell style | `CSSProperties` | `-` |
| header-cell-style | Custom header-cell style | `CSSProperties` | `-` |
| body-cell-style | Custom body-cell style | `CSSProperties \| ((record: TableData) => CSSProperties)` | `-` |
| summary-cell-style | Custom summary-cell style | `CSSProperties \| ((record: TableData) => CSSProperties)` | `-` |
| index | Manually specify the option index | `number` | `-` |
| tooltip | Whether to show a text tooltip when truncated | `boolean\|object` | `false` |

### TableColumn Slots

| Slot | Description | Prop |
| -------------- | :------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter-icon | Filter-button icon | - |
| filter-content | Custom filter-popup content | filterValue: `string[]`<br>setFilterValue: `(filterValue: string[]) => void`<br>handleFilterConfirm: `(event: Event) => void`<br>handleFilterReset: `(event: Event) => void` |
| default | Declare child columns for a grouped header | - |
| title | Title | - |
| cell | Cell | record: `TableData`<br>column: `TableColumnData`<br>rowIndex: `number` |

### Table structure components

`Thead` and `Tbody` render the header and body, respectively, with content from the default slot; their named slots customize the corresponding elements. `Tr`, `Th`, and `Td` are low-level renderers that depend on Table context, not standalone data tables. Usually, customize elements through the Table `tr`, `th`, and `td` slots.

During client rendering, list items in content and structural slots can combine `v-for`, `:key`, and `v-memo`.

**Server rendering** with the Vue 3.5.45 template compiler can generate a slot function in the application’s server bundle that references an undeclared `_cache`, leaving content out of the initial HTML. The published Table entry reproduces this for titles, cells, filter icons and panels, empty states, footers, expanded rows and icons, pagination, summary cells, drag handles, extra columns, and header actions. Custom `thead`, `tbody`, `tr`, `th`, and `td` slots are also affected, even when the list is empty. For SSR, keep `v-for` and a stable `:key` on the list item and remove `v-memo` from that node.

`TableColumn` entries declared in `#columns`, including grouped and dynamic columns, render their headers and data cells on the server. Columns can also be defined with the `columns` prop.

For `Tr`, `expand`, `empty`, and `checked` describe row state; `rowIndex` and `record` provide row context. `Th` accepts `column`, `operations`, `dataColumns`, and `resizable`. `Td` accepts `rowIndex`, `record`, `column`, `type`, `operations`, `dataColumns`, `colSpan`, `rowSpan`, `isFixedExpand`, `containerWidth`, `showExpandBtn`, `indentSize`, `renderExpandBtn`, and `summary`; these fields support Table layout and rendering.

### TableComponents

`components.operations` receives the current `dragHandle`, `expand`, and `selection` operation columns (undefined when disabled) and returns the operation columns to render. It configures operation columns rather than replacing arbitrary table elements.

### TableOperationColumn Props

| Field | Description | Type |
| --- | --- | --- |
| name | Operation column identifier | `string` |
| title | Column title | `string \| RenderFunction` |
| width | Column width | `number` |
| fixed | Whether fixed | `boolean` |
| render | Custom operation cell content | `(record: TableData) => VNodeChild` |

`isLastLeftFixed` and `_realWidth` are used for table layout and normally need not be set by application code. Import `TableComponents` and `TableOperationColumn` from the root or table entry.

### Pagination configuration type

`pagination.align` accepts `start` or `end`. The default is the inline end (right in LTR, left in RTL). Use `:pagination="{ align: 'start' }"` to align the bar to the inline start. The pagination bar appears below the table.

`TablePaginationConfig = Omit<PaginationProps, 'total'> & { total?: number; container?: string | HTMLElement; align?: 'start' | 'end' }`. When `pagination.total` is omitted, Table derives it from the effective data count. Remote pagination can still provide `total` explicitly. Existing `PaginationProps` objects remain accepted by Table; standalone `Pagination` still requires `total`. `TablePaginationConfig` is exported from root/table entries.

### Forwarded configuration precedence

Nested fields such as open in column filterable.triggerProps can override the filter popup state. Manage both popup visibility and filter conditions when controlling it from the application.

## Types

### TableData

| Parameter | Description | Type | Default |
| -------- | ---------------- | -------------------------- | :-----: |
| key | Row key | `string` | `-` |
| expand | Expanded-row content | `string \| RenderFunction` | `-` |
| children | Child data | `TableData[]` | `-` |
| disabled | Whether row selection is disabled | `boolean` | `false` |
| isLeaf | Whether this is a leaf node | `boolean` | `false` |

### TableSortable

A custom `sorter(a, b, { direction })` must return ascending or descending results according to `direction`; Table does not reverse the result again. `sorter: true` disables internal sorting. Without a function, the built-in comparison preserves the original order of equal values.

| Parameter | Description | Type | Default |
| ---------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | :----: |
| sortDirections | Supported sort directions | `('ascend' \| 'descend')[]` | `-` |
| sorter | Sort comparator; `true` disables internal sorting | `((        a: TableData,        b: TableData,        extra: { dataIndex: string; direction: 'ascend' \| 'descend' }      ) => number)    \| boolean` | `-` |
| sortOrder | Sort direction | `'ascend' \| 'descend' \| ''` | `-` |
| defaultSortOrder | Default sort direction in uncontrolled mode | `'ascend' \| 'descend' \| ''` | `-` |

### TableFilterData

| Parameter | Description | Type | Default |
| ------ | ------------------ | -------------------------- | :----: |
| text | Filter-option content | `string \| RenderFunction` | `-` |
| value | Filter-option value | `string` | `-` |

### TableFilterable

Filter content uses the column `filter-content` slot first, then the Table named slot identified by `slotName` when present, then `renderContent`, and finally the built-in `filters` options. If the named slot does not exist, the next source is used.

| Parameter | Description | Type | Default |
| -------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: |
| filters | Filter data | `TableFilterData[]` | `-` |
| filter | Filter callback, similar to Array.prototype.filter | `(filteredValue: string[], <br/>record:TableData)=> boolean` | `-` |
| multiple | Whether to support multiple selection | `boolean` | `false` |
| filteredValue | Selected filters | `string[]` | `-` |
| defaultFilteredValue | Default selected filters | `string[]` | `-` |
| renderContent | Filter-popup content | `(data: {    filterValue: string[];    setFilterValue: (filterValue: string[]) => void;    handleFilterConfirm: (event: Event) => void;    handleFilterReset: (event: Event) => void;  }) => VNodeChild` | `-` |
| icon | Filter-button icon | `RenderFunction` | `-` |
| triggerProps | Filter-popup configuration | `TriggerProps` | `-` |
| alignLeft | Whether the filter icon is aligned to the left | `boolean` | `false` |
| slotName | Named Table slot for custom filter content | `string` | `-` |

### TableColumnData

| Parameter | Description | Type | Default |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | :-----: |
| dataIndex | Column identifier matching data in `TableData` | `string` | `-` |
| title | Column title | `string \| RenderFunction` | `-` |
| width | Base column width. Fixed when flexible columns exist and fit=true; if all columns are fixed and narrower than the container, expanded proportionally | `number` | `-` |
| minWidth | Minimum `width`. Columns without `width` share remaining space proportionally. Default 80 | `number` | `80` |
| align | Alignment | `'left' \| 'center' \| 'right'` | `-` |
| fixed | Fixed position | `'left' \| 'right'` | `-` |
| ellipsis | Whether to show an ellipsis | `boolean` | `false` |
| tooltip | Whether truncation shows a tooltip; accepts Tooltip props | `boolean \| Record<string, any>` | `-` |
| sortable | Sorting options | `TableSortable` | `-` |
| filterable | Filtering options | `TableFilterable` | `-` |
| children | Child header data for grouped headers | `TableColumnData[]` | `-` |
| cellClass | Custom cell class | `ClassName` | `-` |
| headerCellClass | Custom header-cell class | `ClassName` | `-` |
| bodyCellClass | Custom body-cell class | `ClassName \| ((record: TableData) => ClassName)` | `-` |
| summaryCellClass | Custom summary-cell class | `ClassName \| ((record: TableData) => ClassName)` | `-` |
| cellStyle | Custom cell style | `CSSProperties` | `-` |
| headerCellStyle | Custom header-cell style | `CSSProperties` | `-` |
| bodyCellStyle | Custom body-cell style | `CSSProperties \| ((record: TableData) => CSSProperties)` | `-` |
| summaryCellStyle | Custom summary-cell style | `CSSProperties \| ((record: TableData) => CSSProperties)` | `-` |
| render | Custom column-cell renderer | `(data: {    record: TableData;    column: TableColumnData;    rowIndex: number;  }) => VNodeChild` | `-` |
| slotName | Named render slot for this column; same arguments as #cell | `string` | `-` |
| titleSlotName | Named title-rendering slot for this column | `string` | `-` |

### TableBorder

| Parameter | Description | Type | Default |
| ---------- | ------------------------------- | --------- | :-----: |
| wrapper | Whether to show the outer border | `boolean` | `false` |
| cell | Whether to show header/body cell borders | `boolean` | `false` |
| headerCell | Whether to show header-cell borders | `boolean` | `false` |
| bodyCell | Whether to show body-cell borders | `boolean` | `false` |

### TableRowSelection

| Parameter | Description | Type | Default |
| ---------------------- | ---------------------------------------------- | ----------------------- | :-----: |
| type | Row-selection type | `'checkbox' \| 'radio'` | `-` |
| selectedRowKeys | Selected rows in controlled mode | `BaseType[]` | `-` |
| defaultSelectedRowKeys | Default selected rows in uncontrolled mode | `BaseType[]` | `-` |
| showCheckedAll | Whether to show select all | `boolean` | `false` |
| title | Column title | `string` | `-` |
| width | Column width | `number` | `-` |
| fixed | Whether fixed | `boolean` | `false` |
| checkStrictly | Allow parent selection; unlink parent/child checks | `boolean` | `true` |
| onlyCurrent | Keep only current-page keys; clear them when changing pages | `boolean` | `false` |

### TableExpandable

| Parameter | Description | Type | Default |
| ---------------------- | ------------------------------ | ------------------------------------------------------ | :-----: |
| expandedRowKeys | Expanded rows in controlled mode | `BaseType[]` | `-` |
| defaultExpandedRowKeys | Default expanded rows in uncontrolled mode | `BaseType[]` | `-` |
| defaultExpandAllRows | Whether to expand all rows by default | `boolean` | `false` |
| expandedRowRender | Custom expanded-row content | `(record: TableData) => VNodeChild` | `-` |
| icon | Expand icon | `(expanded: boolean, record: TableData) => VNodeChild` | `-` |
| title | Column title | `string` | `-` |
| width | Column width | `number` | `-` |
| fixed | Whether fixed | `boolean` | `false` |

### TableDraggable

| Parameter | Description | Type | Default |
| ------ | -------- | ------------------- | :-----: |
| type | Drag type | `'row' \| 'handle'` | `-` |
| title | Column title | `string` | `-` |
| width | Column width | `number` | `-` |
| fixed | Whether fixed | `boolean` | `false` |

### TableChangeExtra

| Parameter | Description | Type | Default |
| ---------- | ---------- | ------------------------------------------------ | :----: |
| type | Trigger type | `'pagination' \| 'sorter' \| 'filter' \| 'drag'` | `-` |
| page | Page number | `number` | `-` |
| pageSize | Items per page | `number` | `-` |
| sorter | Sorting information | `Sorter` | `-` |
| filters | Filtering information | `Filters` | `-` |
| dragTarget | Drag information | `TableData` | `-` |

### VirtualListProps

| Parameter | Description | Type | Default |
| :----------------- | ------------------------------------------------------------------ | ------------------ | :-----: |
| height | Viewport height | `number \| string` | `-` |
| threshold | Item-count threshold for virtual scrolling; counts below it do not enable virtualization | `number` | `-` |
| fixedSize | Whether item heights are fixed | `boolean` | `false` |
| estimatedSize | Estimated item height when heights vary | `number` | `-` |
| buffer | Number of items premounted beyond viewport boundaries | `number` | `10` |

### TableExtraColumnConfig

| Parameter | Description | Type | Default |
| :----- | ---- | ---- | :----: |
| width | Column width; follows table size when omitted | `number` | xs 28 / sm 32 / md·lg·xl 36 |
| fixed | Fixed position | `'left' \| 'right'` | `'right'` |
| align | Alignment | `'left' \| 'center' \| 'right'` | `'center'` |
| dataIndex | Column identifier | `string` | `__cedar_table_extra__` |

## CSS Variables

Table colors, spacing and borders inherit the Maple theme.

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
