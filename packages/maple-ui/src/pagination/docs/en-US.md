# Pagination

### Intro

Pagination is used when you need to handle a large amount of data.

The API is aligned with Cedar Pagination. `simple` is enabled by default on mobile.

## Demo

### Basic Usage

```html
<template>
  <mp-pagination :current="1" :total="50" />
</template>
```

### More Pages

When there are many pages, an ellipsis style is used.

```html
<template>
  <mp-pagination :simple="false" :current="1" :total="200" />
</template>
```

### Page Size

Use `show-page-size` to show the page size selector.

```html
<template>
  <mp-pagination :simple="false" :current="1" :total="50" show-page-size />
</template>
```

### Page Jumper

Use `show-jumper` to show the page jumper input.

```html
<template>
  <mp-pagination :simple="false" :current="1" :total="50" show-jumper />
</template>
```

### Simple Mode

Simple mode is enabled by default and recommended for small screens. Disable it with `simple`.

```html
<template>
  <mp-pagination :current="1" :total="50" />
</template>
```

### Show Total

Use `show-total` to display the total. Customize the text with the `#total` slot.

```html
<template>
  <mp-pagination :current="1" :total="50" show-total />

  <mp-pagination :current="1" :total="50" show-total>
    <template #total="{ total }">Total {{ total }} items</template>
  </mp-pagination>
</template>
```

### Disabled

```html
<template>
  <mp-pagination :current="1" :total="50" disabled />
</template>
```

### All Options

```html
<template>
  <mp-pagination :simple="false" :current="1" :total="50" show-total show-jumper show-page-size />
</template>
```

### Custom Page Buttons

Customize page button content with slots.

```html
<template>
  <mp-pagination :simple="false" :current="1" :total="50">
    <template #page-item="{ page }">{{ page }}</template>
    <template #page-item-step="{ type }"> {{ type === 'previous' ? 'Prev' : 'Next' }} </template>
    <template #page-item-ellipsis>···</template>
  </mp-pagination>
</template>
```

## API

### Props

| Prop                     | Description                                                                   | Type                          | Default                |
| ------------------------ | ----------------------------------------------------------------------------- | ----------------------------- | ---------------------- |
| `total`                  | Total number of data items                                                    | _number \| string_            | `0`                    |
| `v-model:current`        | Current page                                                                  | _number \| string_            | `-`                    |
| `default-current`        | Default current page                                                          | _number_                      | `1`                    |
| `v-model:page-size`      | Number of items per page                                                      | _number \| string_            | `-`                    |
| `default-page-size`      | Default page size (uncontrolled)                                              | _number_                      | `10`                   |
| `disabled`               | Whether to disable pagination                                                 | _boolean_                     | `false`                |
| `hide-on-single-page`    | Whether to hide pagination when there is only one page                        | _boolean_                     | `false`                |
| `simple`                 | Whether to use simple mode (enabled by default on mobile)                     | _boolean_                     | `true`                 |
| `show-total`             | Whether to show total                                                         | _boolean_                     | `false`                |
| `show-more`              | Whether to show the more button                                               | _boolean_                     | `false`                |
| `show-jumper`            | Whether to show the jumper input                                              | _boolean_                     | `false`                |
| `show-page-size`         | Whether to show the page size selector                                        | _boolean_                     | `false`                |
| `page-size-options`      | Options for the page size selector                                            | _number[]_                    | `[10, 20, 30, 40, 50]` |
| `page-size-props`        | Props passed to the page size selector                                        | _object_                      | `-`                    |
| `page-item-style`        | Style of page items                                                           | _CSSProperties_               | `-`                    |
| `active-page-item-style` | Style of the active page item                                                 | _CSSProperties_               | `-`                    |
| `base-size`              | Base count for ellipsis calculation: `baseSize + 2 * bufferSize`              | _number_                      | `6`                    |
| `buffer-size`            | Number of pages shown on each side of the current page when ellipsis is shown | _number_                      | `2`                    |
| `auto-adjust`            | Whether to auto-adjust the current page when page size changes                | _boolean_                     | `true`                 |
| `elevation`              | Elevation level: `true`, `false`, or `0-24`                                   | _boolean \| string \| number_ | `true`                 |

### Events

| Event              | Description                        | Arguments          |
| ------------------ | ---------------------------------- | ------------------ |
| `change`           | Emitted when the page changes      | `current: number`  |
| `page-size-change` | Emitted when the page size changes | `pageSize: number` |

### Slots

| Slot                 | Description   | Arguments                    |
| -------------------- | ------------- | ---------------------------- |
| `total`              | Total text    | `total: number`              |
| `page-item`          | Page item     | `page: number`               |
| `page-item-step`     | Step item     | `type: 'previous' \| 'next'` |
| `page-item-ellipsis` | Ellipsis item | `-`                          |
| `jumper-prepend`     | Jumper prefix | `-`                          |
| `jumper-append`      | Jumper suffix | `-`                          |

### Style Variables

| Variable                                 | Default                      |
| ---------------------------------------- | ---------------------------- |
| `--pagination-text-color`                | `#555`                       |
| `--pagination-font-size`                 | `var(--font-size-md)`        |
| `--pagination-active-color`              | `var(--color-on-primary)`    |
| `--pagination-active-bg-color`           | `var(--color-primary)`       |
| `--pagination-hover-bg-color`            | `rgba(85, 85, 85, 0.15)`     |
| `--pagination-total-margin`              | `0 10px`                     |
| `--pagination-total-line-height`         | `24px`                       |
| `--pagination-item-width`                | `32px`                       |
| `--pagination-item-height`               | `32px`                       |
| `--pagination-item-margin`               | `0 6px`                      |
| `--pagination-item-border-radius`        | `4px`                        |
| `--pagination-item-background`           | `#fff`                       |
| `--pagination-item-simple-border-radius` | `50%`                        |
| `--pagination-input-width`               | `32px`                       |
| `--pagination-disabled-color`            | `var(--color-text-disabled)` |
| `--pagination-bg-disabled-color`         | `var(--color-disabled)`      |
| `--pagination-size-line-height`          | `24px`                       |
| `--pagination-size-padding`              | `0 4px`                      |
| `--pagination-quick-jumper-margin`       | `0 10px`                     |
