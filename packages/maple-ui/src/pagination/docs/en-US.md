# Pagination

Pagination with a shared API and container-responsive layout.

## Basic examples

### Basic and two-way binding

```demo
../example/demos/basic.vue
```

## Appearance and states

### Five sizes and elevation

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Five sizes and elevation, Disabled and hide on single page |
| `show-page-size` | Show page size selector | Five sizes and elevation, Disabled and hide on single page |
| `show-jumper` | Show separate jumper in full mode; simple mode includes input | Five sizes and elevation, Disabled and hide on single page |
| `size` | Size of all controls | Five sizes and elevation |
| `elevation` | Page button shadow; true uses level 2 | Five sizes and elevation |
| `disabled` | Disable all interactions | Disabled and hide on single page |
<!-- demo-config-notes:end -->


```demo
../example/demos/size.vue
```

### Disabled and hide on single page

```demo
../example/demos/disabled.vue
```

## Pagination modes and information

### Simple mode

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Simple mode, Page window and ellipsis, Totals, page sizes and jumpers |
| `show-total` | Show total | Simple mode, Totals, page sizes and jumpers |
| `show-page-size` | Show page size selector | Simple mode, Totals, page sizes and jumpers |
| `responsive` | Automatically use simple mode by container width | Page window and ellipsis, Totals, page sizes and jumpers |
| `simple` | Explicit simple mode | Simple mode |
| `default-value` | Initial uncontrolled page | Page window and ellipsis |
<!-- demo-config-notes:end -->


```demo
../example/demos/simple.vue
```

### Page window and ellipsis

```demo
../example/demos/more-page-size.vue
```

### Totals, page sizes and jumpers

Compare total labels, page-size selection and page jumpers. Change the available controls and observe their output.

```demo
../example/demos/auxiliary-controls-comparison.vue
```

## Page size, navigation and buttons

### Custom page slots and styles

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Custom page slots and styles |
| `default-value` | Initial uncontrolled page | Custom page slots and styles |
| `buffer-size` | Pages on either side of current page | Custom page slots and styles |
| `responsive` | Automatically use simple mode by container width | Custom page slots and styles |
| `page-item-style` | Base numeric page style | Custom page slots and styles |
| `active-page-item-style` | Additional active numeric page style | Custom page slots and styles |
<!-- demo-config-notes:end -->


```demo
../example/demos/custom-page-button.vue
```

## Responsive layout and data changes

### Container width and compact layout

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `total` | Total item count; required | Container width and compact layout, Data changes and auto adjustment, Full feature controls |
| `show-total` | Show total | Container width and compact layout, Data changes and auto adjustment, Full feature controls |
| `show-page-size` | Show page size selector | Container width and compact layout, Data changes and auto adjustment, Full feature controls |
| `show-jumper` | Show separate jumper in full mode; simple mode includes input | Container width and compact layout, Full feature controls |
| `responsive` | Automatically use simple mode by container width | Container width and compact layout |
| `auto-adjust` | Preserve first record on size change; clamp after total shrinks | Data changes and auto adjustment |
<!-- demo-config-notes:end -->


```demo
../example/demos/responsive.vue
```

### Data changes and auto adjustment

```demo
../example/demos/auto-adjust.vue
```

### Full feature controls

```demo
../example/demos/all.vue
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"` and supports runtime and nested overrides. Page numbers and previous/next semantics remain unchanged. Default navigation icons follow reading direction; page input, disabled boundaries and selection are preserved. Custom icon slots own their direction.

## API

Use ordinary `v-model`: `modelValue` is the current page, starting at 1; pageSize independently controls items per page. `defaultValue` initializes uncontrolled state once without later resets or initialization `update:modelValue`. When `modelValue` is supplied, the parent value controls the display.

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| total | Total item count; required | `number` | `—` |
| model-value | Current page; v-model | `number` | `—` |
| default-value | Initial uncontrolled page | `number` | `1` |
| page-size | Page size; v-model:page-size | `number` | `—` |
| default-page-size | Initial uncontrolled page size | `number` | `10` |
| disabled | Disable all interactions | `boolean` | `false` |
| hide-on-single-page | Hide with at most one page | `boolean` | `false` |
| simple | Explicit simple mode | `boolean` | `false` |
| show-total | Show total | `boolean` | `false` |
| show-more | Append forward jump in full mode | `boolean` | `false` |
| show-jumper | Show separate jumper in full mode; simple mode includes input | `boolean` | `false` |
| show-page-size | Show page size selector | `boolean` | `false` |
| page-size-options | Positive integer size options | `number[]` | `[10, 20, 30, 40, 50]` |
| page-size-props | Optional restricted configuration for the page-size Select. Placement defaults to bottom-start and reaches Trigger through Select.triggerProps for automatic positioning; cannot override pagination values, options or size | `PaginationPageSizeProps` | `—` |
| size | Size of all controls | `'xs' / 'sm' / 'md' / 'lg' / 'xl'` | `'md'` |
| page-item-style | Base numeric page style | `CSSProperties` | `—` |
| active-page-item-style | Additional active numeric page style | `CSSProperties` | `—` |
| base-size | Base threshold for ellipsis in full mode | `number` | `6` |
| buffer-size | Pages on either side of current page | `number` | `2` |
| elevation | Page button shadow; true uses level 2 | `boolean / number` | `false` |
| responsive | Automatically use simple mode by container width | `boolean` | `true` |
| compact-breakpoint | Maximum container width for compact mode, in px | `number` | `480` |
| auto-adjust | Preserve first record on size change; clamp after total shrinks | `boolean` | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:model-value | Request current page update | `number` |
| change | Committed page change; paired with update:modelValue | `number` |
| update:page-size | Request page size update | `number` |
| page-size-change | Committed size change; paired with update:page-size | `number` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| total | Total | `{ total: number }` |
| page-item | Numeric page | `{ page: number }` |
| page-item-step | Previous / next | `{ type: 'previous' / 'next' }` |
| page-item-ellipsis | Ellipsis jump | `—` |
| jumper-prepend | Separate jumper prefix | `—` |
| jumper-append | Separate jumper suffix | `—` |

### Methods

| Method | Description |
| --- | --- |

<!-- same-source-api:end -->

## Behavior

Containers at or below `compact-breakpoint` automatically use compact mode, consistently in desktop sidebars and mobile. Totals/page-size selectors remain; auxiliary controls wrap. Previous/next sizes follow size without forced narrow-screen enlargement (formerly 36px). `responsive=false` retains full page numbers; extremely narrow page lists scroll internally without widening the page.

The compact current-page input also serves as the jumper, so no duplicate jumper appears. `page-item`, `page-item-ellipsis`, `jumper-prepend` and `jumper-append` render only in their full-mode controls.

Page buttons support Tab/Enter/Space, with `aria-current=page` on the current page. The jumper requests a numeric keyboard and submits on Enter/blur. Empty, nonnumeric or fractional values do not navigate; out-of-range integers clamp to valid pages. Disabled blocks all commits.

`auto-adjust` tries to preserve the previous page's first item when page size changes, clamps to the last page after total reductions and returns to page 1 for zero items. Controlled mode proposes updates only; the parent decides the display. An explicit parent modelValue in the same update batch takes precedence.

Both full and compact jumper inputs show the current page. Navigation, external modelValue changes and page-size adjustments update them together. Invalid input restores the current page number.

### PaginationPageSizeProps

Page-size selectors fit selected text/arrow with only item spacing, updating on option/locale changes. `--mp-pagination-select-width` overrides width. Popup menus size independently from option contents.

Both platforms support `disabled?: boolean`, `placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'`, `popupContainer?: string | HTMLElement | false`, `class?: string` and `style?: CSSProperties`. Outer disabled takes precedence. Default placement is bottom-start.

This configuration no longer forwards arbitrary SelectProps/MenuProps. page-size, page-size-options and size control the pagination value, options and dimensions.

## Type definitions

```ts
import type { PaginationProps, PaginationInstance, PaginationPageSizeProps } from '@maple-design/ui'
```

## Style variables

| Token | Default |
| --- | --- |
| `--mp-pagination-text-color` | `var(--mp-color-text-1)` |
| `--mp-pagination-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-pagination-gap` | `var(--mp-sys-space-5)` |
| `--mp-pagination-item-gap` | `var(--mp-sys-space-2)` |
| `--mp-pagination-focus-space` | `3px` |
| `--mp-pagination-size-xs` | `24px` |
| `--mp-pagination-size-sm` | `28px` |
| `--mp-pagination-size-md` | `36px` |
| `--mp-pagination-size-lg` | `44px` |
| `--mp-pagination-size-xl` | `52px` |
| `--mp-pagination-item-padding` | `var(--mp-sys-space-4)` |
| `--mp-pagination-item-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-pagination-icon-size` | `16px` |
| `--mp-pagination-input-width` | `32px` |
| `--mp-pagination-select-width` | `max-content` |
| `--mp-pagination-touch-size` | `44px` |
| `--mp-pagination-focus-width` | `2px` |
| `--mp-pagination-focus-offset` | `1px` |
| `--mp-pagination-focus-color` | `var(--mp-color-primary)` |
| `--mp-pagination-item-background` | `transparent` |
| `--mp-pagination-hover-background` | `var(--mp-color-fill-1)` |
| `--mp-pagination-active-background` | `var(--mp-color-primary-light-1)` |
| `--mp-pagination-active-color` | `var(--mp-color-primary)` |
| `--mp-pagination-disabled-color` | `var(--mp-color-text-disabled)` |
| `--mp-pagination-disabled-background` | `var(--mp-color-fill-1)` |


### Placement semantics and configuration

No placement configuration is required for normal use: bottom-start is preferred and the underlying Trigger automatically flips/constrains the popup. pageSizeProps.placement is only a restricted override for the page-size Select: Pagination → Select.triggerProps.placement → Trigger. It does not position the pagination itself.
