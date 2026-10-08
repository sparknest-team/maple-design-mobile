# Select

### Async device labels

```demo
../example/demos/en-US/async-devices.vue
```

The field, controller, option algorithms, Menu and styles are independently copied from Cedar. Maple adds list/picker presentations in separate files; neither library imports the other at runtime.

### Identical labels, distinct values

Labels may repeat, but values must be unique. Removing the second selected tag removes only its value, in all three presentations.

```demo
../example/demos/same-label.vue
```


### Intro

Display and select the content through the drop-down menu.

### Standard Variant

```demo
../example/demos/standard.vue
```

### Outlined Variant

```demo
../example/demos/outline.vue
```

### Picker Mode

Set `presentation` to `picker` to use a bottom-sheet wheel picker.





```demo
../example/demos/picker.vue
```

### Picker Multiple

Same cart flow as Cascader: tap **Add** to push the current wheel value into a draft, **Done** commits to `v-model`, **Cancel** discards the draft.

```html
<script setup>
  import { ref } from 'vue'

  const pickerMultiple = ref([])
  const pickerOptions = ref([
    { label: 'Eat', value: 1 },
    { label: 'Sleep', value: 2 },
    { label: 'Play game', value: 3 },
    { label: 'Write documentation', value: 4 },
  ])
</script>

<template>
  <mp-select
    presentation="picker"
    multiple show-tags
    clearable
    placeholder="Please select multiple options"
    v-model="pickerMultiple"
    :options="pickerOptions"
  />
</template>
```

### List Mode

Set `presentation` to `list` to show options in a bottom-sheet list. Selected items show a checkmark on the right.

Single: tap to select and close. Multiple: tap to toggle draft selection, **Done** commits, **Cancel** discards.





```demo
../example/demos/list.vue
```


### Presentation and commit rules

Menu commits immediately. List commits single values immediately; multiple values use a draft. Picker always uses a draft. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Cedar only supports Menu; Maple adds independently implemented List and Picker extensions to copied controllers and Menu code. No shared runtime or state.

## API

### Select props

Use `v-model`, `v-model:open` and `v-model:input-value` for controlled state. Clear values are `''` for single selection and `[]` for multiple selection. Select uses `undefined` when an actual empty-string option exists.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value / default-value` | Controlled value / uncontrolled initial value | `Value` | `单选 ''，多选 []` |
| `open / default-open` | Controlled / initial open state | `boolean` | `undefined / false` |
| `input-value / default-input-value` | Search text, independent of selected values | `string` | `undefined / ''` |
| `multiple` | Multiple selection; enables search by default | `boolean` | `false` |
| `size` | Supports all five sizes; inherits group/form settings | `ComponentSize` | `md` |
| `variant` | filled, outline, standard; inherits InputGroup | `FormControlVariant` | `filled` |
| `disabled / readonly / error` | Inherits form state unless explicitly overridden | `boolean` | `undefined` |
| `placeholder` | Placeholder | `string` | `—` |
| `hint / line` | Floating hint / standard variant underline | `boolean` | `true` |
| `text-color / focus-color / blur-color` | Field colors | `string` | `—` |
| `loading` | Loading state; blocks selection and confirmation | `boolean` | `false` |
| `show-tags` | Show tags; false displays separated text | `boolean` | `true` |
| `separator` | Separator when show-tags=false | `string` | `,` |
| `text-align` | left, center, right | `string` | `left` |
| `max-tag-count` | Maximum visible tags; 0 means unlimited | `number` | `0` |
| `tag-nowrap` | Prevent tag text wrapping | `boolean` | `false` |
| `popup-container` | Selector, element, element resolver, or false for inline rendering | `PopupContainer` | `—` |
| `trigger-props` | Menu Trigger props; field owns open state | `TriggerProps` | `—` |
| `virtual-list-props` | Virtual list settings for Menu / List | `VirtualListProps` | `—` |
| `search-delay` | Search debounce delay in ms | `number` | `500` |
| `format-label` | Format selected labels; use label slot for VNodes | `function` | `—` |
| `clearable` | Allow clearing; preserve disabled selections | `boolean` | `true` |
| `options` | Primitive, object or grouped options; one source for every presentation | `SelectOption[]` | `[]` |
| `field-names` | Map value, label, disabled, tagProps, render; object values need a unique ID field | `SelectFieldNames` | `—` |
| `filterable` | Enable search; optionally retainInputValue | `boolean 或 { retainInputValue?: boolean }` | `单选 false / 多选 true` |
| `filter-option` | false disables local filtering; callback receives query and raw option | `boolean 或 (input, option) => boolean` | `true` |
| `creatable` | Allow creating missing options | `boolean` | `false` |
| `fallback-option` | Display unresolved values or return a complete fallback option | `boolean 或 (value) => SelectOptionData` | `true` |
| `show-extra-options` | Display fallback/created options in the panel | `boolean` | `true` |
| `limit` | Selection limit; 0 means unlimited | `number` | `0` |
| `auto-fit-popup-width` | Match Menu width to the field | `boolean` | `true` |
| `default-active-first-option` | Highlight first enabled option without committing it | `boolean` | `true` |
| `unmount-on-close` | Unmount Menu content when closed | `boolean` | `false` |
| `scrollbar` | Menu / List scrollbar settings | `boolean 或 ScrollbarProps` | `true` |
| `show-header-on-empty / show-footer-on-empty` | Display header/footer in empty state | `boolean` | `false` |
| `presentation` | Presentation mode | `menu / list / picker` | `menu` |
| `picker-props` | Wheel appearance and toolbar texts; selected values, columns, field mapping and toolbar are owned by the extension | `PickerProps` | `{}` |
| `popup-props` | Popup appearance; open state, bottom placement and mounting are owned by the extension | `PopupProps` | `{}` |

### Events and methods

- `update:modelValue`, `change(value)`: published on commit, never on draft edits.
- `update:open`, `open-change(open)`: requests to change the open state.
- `update:inputValue`, `input-value-change(text)`, `search(text)`: search state.
- `focus(event)`, `blur(event)`, `clear(event)`: native field events. The field alone notifies Form.
- Methods: `focus()`, `blur()`.

Select also emits `remove(value)`, `exceed-limit(value, event)`, `dropdown-scroll(event)`, and `dropdown-reach-bottom(event)`.

### Slots and option data

Use `label({ data })` for custom selected labels; `selected` replaces the whole selection area. Also supports `prefix`, `suffix`, `clear-icon({ clear })`, `arrow-icon`, `loading-icon`, `search-icon`, `empty`, and `option({ data })`.

Option `label` is searchable plain text. Use `render` or the `option` slot for custom option content, and `format-label` or `label` slot for selected content. Values identify selections; labels never do. `disabled` blocks selection/removal, and `tagProps` customizes selected tags.

Select additionally supports `header`, `footer`, `trigger`, and default `Option / Optgroup` children. Option props: `value`, `label`, `disabled`, `tagProps`, `index`; its default slot receives `selected`. Group data uses `{ isGroup: true, label, options }`. List and Picker also accept slot options; Picker displays their text labels.

### CSS tokens

| Token | Default |
| --- | --- |
| `--mp-select-popup-max-height` | `200px` |
| `--mp-select-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-select-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-select-popup-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-select-popup-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-select-popup-box-shadow` | `0 4px 10px rgb(0 0 0 / 10%)` |
| `--mp-select-popup-option-height` | `36px` |
| `--mp-select-popup-option-font-weight-selected` | `var(--mp-sys-font-weight-medium)` |
| `--mp-select-popup-option-padding-horizontal` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-option-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-bg-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-select-popup-option-bg-selected` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-bg-disabled` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-hover` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-selected` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-select-popup-group-title-height` | `20px` |
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-group-title-padding-top` | `var(--mp-sys-space-4)` |
| `--mp-select-popup-group-title-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-select-popup-group-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-loading-min-height` | `50px` |
| `--mp-select-popup-option-icon-margin-right` | `var(--mp-sys-space-4)` |

Single and multiple options share popup-option-padding-horizontal. There is no implicit search-highlight element; custom option slots own any highlighted substring styling. Unconsumed multi-popup-option-padding-horizontal and popup-option-highlight-* variables have been removed.
