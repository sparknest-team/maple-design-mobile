# Cascader

### Async device labels

```demo
../example/demos/en-US/async-devices.vue
```


### Intro

Cascading selection via dropdown menu or bottom popup picker.

### Please select a region

```demo
../example/demos/placeholder.vue
```

### Non-path mode

```demo
../example/demos/placeholder-path-mode.vue
```

### Multiple cascade

```demo
../example/demos/placeholder-multiple.vue
```

### Picker mode

```demo
../example/demos/placeholder-picker.vue
```

### Picker multiple

```demo
../example/demos/placeholder-picker-multiple.vue
```

### List mode

```demo
../example/demos/placeholder-list.vue
```

### List multiple

```demo
../example/demos/placeholder-list-multiple.vue
```


### Presentation and commit rules

Menu commits immediately. List commits single values immediately; multiple values use a draft. Picker always uses a draft. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Cedar only supports Menu; Maple adds independently implemented List and Picker extensions to copied controllers and Menu code. No shared runtime or state.

## API

### Cascader props

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
| `clearable` | Allow clearing; preserve disabled selections | `boolean` | `false` |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | `CascaderOption[]` | `[]` |
| `field-names` | Map value, label, disabled, children, isLeaf, tagProps, render | `CascaderFieldNames` | `—` |
| `path-mode` | Return a complete path instead of a node value | `boolean` | `false` |
| `check-strictly` | Allow parent selection; unlink parent/child checks | `boolean` | `false` |
| `filterable` | Enable search | `boolean` | `单选 false / 多选 true` |
| `filter-option` | Receives query and raw node | `(input, option) => boolean` | `—` |
| `expand-trigger` | Menu / List expansion: click or hover | `string` | `click` |
| `expand-child` | Expand to first child | `boolean` | `false` |
| `load-more` | Load children asynchronously; call done(children), or done() to allow retry | `(option, done) => void` | `—` |
| `fallback` | Display unresolved values | `boolean 或 (value) => string` | `true` |
| `search-option-only-label` | Show node label only in search results | `boolean` | `false` |
| `auto-fit-popup-width` | Match Menu width to field | `boolean` | `false` |
| `presentation` | Presentation mode | `menu / list / picker` | `menu` |
| `picker-props` | Wheel appearance and toolbar texts; selected values, columns, field mapping and toolbar are owned by the extension | `PickerProps` | `{}` |
| `popup-props` | Popup appearance; open state, bottom placement and mounting are owned by the extension | `PopupProps` | `{}` |

### Events and methods

- `update:modelValue`, `change(value)`: published on commit, never on draft edits.
- `update:open`, `open-change(open)`: requests to change the open state.
- `update:inputValue`, `input-value-change(text)`, `search(text)`: search state.
- `focus(event)`, `blur(event)`, `clear(event)`: native field events. The field alone notifies Form.
- Methods: `focus()`, `blur()`.

### Slots and option data

Use `label({ data })` for custom selected labels; `selected` replaces the whole selection area. Also supports `prefix`, `suffix`, `clear-icon({ clear })`, `arrow-icon`, `loading-icon`, `search-icon`, `empty`, and `option({ data })`.

Option `label` is searchable plain text. Use `render` or the `option` slot for custom option content, and `format-label` or `label` slot for selected content. Values identify selections; labels never do. `disabled` blocks selection/removal, and `tagProps` customizes selected tags.

### CSS tokens

| Token | Default |
| --- | --- |
| `--mp-cascader-popup-max-height` | `200px` |
| `--mp-cascader-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-cascader-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-cascader-popup-color-border` | `var(--mp-color-fill-3)` |
| `--mp-cascader-popup-box-shadow` | `0 4px 10px rgb(0 0 0 / 10%)` |
| `--mp-cascader-size-item-height` | `36px` |
| `--mp-cascader-font-item-size` | `var(--mp-sys-font-size-md)` |
| `--mp-cascader-margin-item-icon-left` | `var(--mp-sys-space-5)` |
| `--mp-cascader-item-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-cascader-item-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-cascader-padding-item-left` | `var(--mp-sys-space-5)` |
| `--mp-cascader-padding-item-right` | `var(--mp-sys-space-5)` |
| `--mp-cascader-size-item-icon` | `12px` |
| `--mp-cascader-item-text-color-hover` | `var(--mp-cascader-item-text-color)` |
| `--mp-cascader-item-text-color-active` | `var(--mp-cascader-item-text-color)` |
| `--mp-cascader-item-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-cascader-item-text-color-disabled-active` | `var(--mp-sys-color-content-disabled)` |
| `--mp-cascader-item-bg-active` | `var(--mp-color-fill-2)` |
| `--mp-cascader-item-bg-hover` | `var(--mp-cascader-item-bg-active)` |
| `--mp-cascader-item-bg-disabled` | `transparent` |
| `--mp-cascader-item-bg-disabled-active` | `var(--mp-color-fill-2)` |
| `--mp-cascader-checkbox-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-cascader-margin-checkbox-right` | `var(--mp-sys-space-4)` |
| `--mp-cascader-panel-column-min-width` | `120px` |
| `--mp-cascader-panel-column-max-height` | `200px` |
| `--mp-cascader-option-min-width` | `100px` |
| `--mp-cascader-slide-margin` | `120px` |


### CascaderPanel

Use CascaderPanel (mp-cascader-panel), also exposed as Cascader.CascaderPanel, for a standalone Menu panel without a field or popup. It supports options, modelValue/defaultValue, multiple, pathMode, checkStrictly, fieldNames, loadMore, disabled, expandTrigger and expandChild; emits update:modelValue, and change; and provides an empty slot.

### Field and mobile presentation styles

The copied field shell keeps the same token declarations as Cedar. Mobile presentation-only variables are declared separately in `src/_components/selection-field/presentation/style/token.less` and loaded with the local presentation stylesheet. Their names and defaults remain unchanged: `--mp-selection-presentation-max-height` (`65vh`), `--mp-selection-presentation-bg` (`var(--mp-sys-color-surface-overlay)`) and `--mp-selection-presentation-padding` (`var(--mp-sys-space-5)`). They do not add mobile presentation behavior to Cedar.
