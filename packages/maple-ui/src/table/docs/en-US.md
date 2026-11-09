# Table

### Intro

A minimal table, when you need to display some data in the form of a table, you may use it.

The scrollable region name follows the active language and can be overridden locally with the `table.scrollable` LocaleProvider message.

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

## Usage notes

### Table data and slots

Use table slots to compose headers, rows and cells. Table has no `data`, `columns`, sorting or filtering configuration.

## API

### Table Props

| Prop | Description | Type | Default |
| -------------- | -------------- | -------- | ---------- |
| `loading` | Explicit loading state; an object requires `loading: true` | _boolean \| `Partial<LoadingProps>`_ | `false` |
| `full-width` | The width of the `table` (including the scrollable part) | _string \| number_ | `100%` |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _number \| boolean_ | `true` |
| `scroller-height` ***3.2.0*** | The height of the scroll container, which can be used to implement functions such as longitudinal partial scrolling and fixed table headers. | _string \| number_ | `-` |

### Table Slots

| Name | Description | Prop |
| ----- | -------------- | -------- |
| `default` | Content of `table` | `-` |
| `footer` | Footer of `table` | `-` |

## Reading direction and scrolling

Table inherits native reading direction, with headers/cells defaulting to inline-start alignment. Custom alignment tokens may still specify physical left/right. The native scroll viewport is focusable: Left/Right scrolls visually, and Home/End reaches reading boundaries. Direction changes preserve the distance from inline start, clamped to the new range. Maple Table is a native slotted table and does not add Cedar data-column freezing, column resizing or grouped-header APIs.

Object syntax must explicitly include `{ loading: true, size: 24 }`. A configuration object without loading does not enable it, matching Cedar Table.

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-table-background` | `#fff` | `background` |
| `--mp-table-border-radius` | `2px` | `border-radius` |
| `--mp-table-footer-border-top` | `thin solid var(--mp-color-border-2)` | `border-top` |
| `--mp-table-row-height` | `46px` | `height`, `min-height` |
| `--mp-table-row-padding` | `0 16px` | `padding` |
| `--mp-table-tbody-td-font-size` | `16px` | `font-size` |
| `--mp-table-tbody-td-text-align` | `start` | `text-align` |
| `--mp-table-tbody-td-text-color` | `#555` | `color` |
| `--mp-table-tbody-tr-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |
| `--mp-table-tbody-tr-hover-background` | `#eee` | `background` |
| `--mp-table-thead-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |
| `--mp-table-thead-th-font-size` | `14px` | `font-size` |
| `--mp-table-thead-th-text-align` | `start` | `text-align` |
| `--mp-table-thead-th-text-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-table-thead-tr-border-bottom` | `thin solid var(--mp-color-border-2)` | `border-bottom` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-table-background: #fff;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
