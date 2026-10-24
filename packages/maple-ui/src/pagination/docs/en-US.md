# Pagination

Pagination with a shared API and container-responsive layout.

## Examples

### Basic and two-way binding

```demo
../example/demos/basic.vue
```

### Five sizes and elevation

```demo
../example/demos/size.vue
```

### Disabled and hide on single page

```demo
../example/demos/disabled.vue
```

### Page window and ellipsis

```demo
../example/demos/more-page-size.vue
```

### Page size and shared selector options

```demo
../example/demos/show-page-size.vue
```

### Jumper and prefix/suffix slots

```demo
../example/demos/show-jumper.vue
```

### Simple mode

```demo
../example/demos/simple.vue
```

### Custom total slot

```demo
../example/demos/show-total.vue
```

### Full feature controls

```demo
../example/demos/all.vue
```

### Custom page slots and styles

```demo
../example/demos/custom-page-button.vue
```

### Data changes and auto adjustment

```demo
../example/demos/auto-adjust.vue
```

### Container width and compact layout

```demo
../example/demos/responsive.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

Use ordinary `v-model` for the primary value: `modelValue` is the current page number, starting at 1; pageSize controls the page size separately. `defaultValue` initializes uncontrolled state only at creation; later changes do not reset it. Initialization emits no `update:modelValue`. A supplied `modelValue` takes precedence and remains parent-controlled.

<!-- same-source-api:start -->
### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| total | Total records (required) | `number` | `—` |
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
| page-size-props | Shared selector configuration; cannot override value, options or size | `PaginationPageSizeProps` | `—` |
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

Containers at or below compact-breakpoint use simple mode automatically, including desktop sidebars. Total and page-size controls remain available and wrap. Previous/next buttons follow size without forced enlargement on narrow screens (36px by default). Set responsive=false to retain full pagination; only the page list scrolls horizontally if necessary.

The simple page input also serves as the jumper. Numeric page, ellipsis and separate jumper prefix/suffix slots render only with their corresponding full-mode controls.

Buttons support Tab, Enter and Space; the active page exposes aria-current=page. The jumper requests a numeric keyboard and commits on Enter or blur. Empty, fractional and non-numeric values do not navigate. Integers are clamped to the valid range. Disabled controls cannot submit.

Auto adjustment preserves the first visible record when page size changes and clamps pages when total shrinks. An empty dataset resets to page 1. Controlled state waits for parent updates; an explicit current update in the same batch takes priority.

The jump input displays the current page in both full and simple modes. Page navigation, external current updates and automatic page-size adjustment keep it in sync; invalid input restores the current page.

### PaginationPageSizeProps

The page-size selector fits the selected label and dropdown arrow, with only the item gap between them. Its width updates with the selection or locale. Customize it with `--mp-pagination-select-width`. The menu fits its option content independently of the trigger width.

Shared fields: disabled?: boolean; placement?: top / top-start / top-end / bottom / bottom-start / bottom-end; popupContainer?: string | HTMLElement | false; class?: string; style?: CSSProperties. Parent disabled takes priority. Placement defaults to bottom-start.

Arbitrary SelectProps/MenuProps are no longer forwarded. Use page-size, page-size-options and size for pagination-owned fields.

## Types

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
