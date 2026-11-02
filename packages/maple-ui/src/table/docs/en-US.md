# Table

### Intro

A minimal table, when you need to display some data in the form of a table, you may use it.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Scrolling and sticky positioning

### Fixed Table Headers

Scroll the Table's own body container to keep the header at its local top; footer pagination stays outside that scrolling body. Maple Table is a lightweight slot container, not Cedar Table's sorting, row-selection or remote-data API. Local pagination does not imply those features are implemented.

```demo
../example/demos/fixed-header.vue
```

## Content and slots

### Footer Slots

The local synthetic-data examples bind current and pageSize separately with v-model:current and v-model:page-size. The change event supplies only the page number, not the old pair of page and size; do not hardcode current to 1. Page-size updates follow Pagination's item-position rule, and the two Table instances keep independent models.

You can insert something in the tail slot, the most common is to insert a `Pagination`.

```demo
../example/demos/slot.vue
```

## Business workflows

### Task filtering and linked data

Search tasks/departments, filter by status and complete tasks. Statistics/results update together, including empty results and recovery.

```demo
../example/demos/task-workbench.vue
```

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean / Partial<LoadingProps>` | `false` |


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

```demo
../example/demos/loading.vue
```

## API

### Props

| Arguments | Description | Type | Default |
| -------------- | -------------- | -------- | ---------- |
| `full-width` | The width of the `table` (including the scrollable part) | _string \| number_ | `100%` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_ | `true` |
| `scroller-height` ***3.2.0*** | The height of the scroll container, which can be used to implement functions such as longitudinal partial scrolling and fixed table headers. | _string \| number_ | `-` |

### Slots

| Name | Description | Arguments |
| ----- | -------------- | -------- |
| `default` | Content of `table` | `-` |
| `footer` | Footer of `table` | `-` |

### Style variables

The following CSS variables support customization with [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--mp-table-background` | `#fff` |
| `--mp-table-border-radius` | `2px` |
| `--mp-table-thead-border-bottom` | `thin solid var(--color-border-2)` |
| `--mp-table-thead-th-text-color` | `rgba(0, 0, 0, 0.6)` |
| `--mp-table-thead-th-text-align` | `start` |
| `--mp-table-thead-th-font-size` | `14px` |
| `--mp-table-thead-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--mp-table-tbody-tr-hover-background` | `#eee` |
| `--mp-table-tbody-tr-border-bottom` | `thin solid var(--color-border-2)` |
| `--mp-table-tbody-td-text-color` | `#555` |
| `--mp-table-tbody-td-font-size` | `16px` |
| `--mp-table-tbody-td-text-align` | `start` |
| `--mp-table-row-height` | `46px` |
| `--mp-table-row-padding` | `0 16px` |
| `--mp-table-footer-border-top` | `thin solid var(--color-border-2)` |


### Boundary with Cedar Table's typed configuration

Maple Table keeps its native-table slot API without data/columns. Cedar `defineTableConfig<Row>` applies only to its data table. F08-A adds no Maple data-column/sorting/filtering APIs; slots and dimensions/scrolling/elevation remain.


## Reading direction and scrolling

The native table inherits reading direction and defaults to start alignment. Its focusable viewport supports arrows and Home/End; live direction changes preserve normalized inline scroll distance. Custom alignment tokens may still use physical left/right. This slot-based table does not add Cedar data-column, freezing or resizing APIs.

For object loading options, set `{ loading: true, size: 24 }` explicitly; an object without loading does not activate the indicator.
