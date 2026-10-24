# Cascader

## 案例

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

### Form control size comparison

Compare selected, clearable and nowrap multiple values with Input and Button. Long labels use ellipsis; removal icons stay available and the tag row scrolls horizontally without moving clear or arrow controls.

```demo
../../field-decorator/example/demos/control-sizes.vue
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

Inline commits immediately. Popup and dialog edit a draft for both single and multiple values. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Search is inside the editor and keeps the existing filtering, search event and lazy loading API.

### Manage selected items

Multi-select panels include a selection summary and Clear. Cedar shows removable tags above list options. Maple opens selected-item details from the count row, with per-item removal and a way back to options. Popup/popover and dialog use the same behavior. Removal and Clear edit the draft; Cancel restores the value and Confirm publishes it. Disabled items remain selected, and confirmation locks selection actions. The panel Clear action is independent of the field clear icon.

### Appearance combinations

Use this example for hierarchical choices such as regions. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Interaction states

Use this example for hierarchical choices such as regions. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Async device labels

```demo
../example/demos/en-US/async-devices.vue
```

### Intro

Cascading selection via dropdown menu or bottom popup picker.

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

Single selection uses the built-in check icon on the right. Multiple selection uses Checkbox controls: no checked descendants is unchecked, some is indeterminate, and all selectable leaf descendants is checked. Disabled leaves are excluded from select-all. With checkStrictly, parent and child selections are independent. Panel selections remain drafts until confirmation.

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
| `tag-nowrap` | Keep tags on one line with ellipsis and preserved removal icons; overflow scrolls horizontally; hover, focus or tap truncated text to preview it | `boolean` | `false` |
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
| `presentation` | 字段展示；未指定时继承 FormItem / Form | `inline / popup` | `inline` |
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

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

The former menu/list/picker presentation values are replaced by inline/popup. Overlay editors retain the existing option index, search, lazy loading and virtual scrolling.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Selection check tokens

| Token | Default |
| --- | --- |
| `--mp-cascader-item-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-cascader-item-check-size` | `var(--mp-sys-font-size-md)` |
