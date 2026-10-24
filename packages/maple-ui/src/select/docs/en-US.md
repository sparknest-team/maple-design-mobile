# Select

## Examples

### Basic usage

Open the options, select a value to close the menu, or clear it to choose again. This example demonstrates single selection only.

```demo
../example/demos/standard.vue
```

### Candidate highlighting and form data flow

Both fields start with `undefined`. Opening or highlighting a candidate does not emit `update:modelValue` or `change`. Inline selection commits on click or Enter. Popup selection edits a draft; Confirm publishes it, while cancel discards it. Each example shows the committed value, update count and actual event log (newest first).

```demo
../example/demos/en-US/selection-data-flow.vue
```

### Disabled and readonly

```demo
../example/demos/state.vue
```

### Small size

```demo
../example/demos/size.vue
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

### Outlined variant

```demo
../example/demos/outline.vue
```

### Labels and values

```demo
../example/demos/value-mapping.vue
```

### Clearing

```demo
../example/demos/clearable.vue
```

### Multiple selection

```demo
../example/demos/multiple.vue
```

### Option data

```demo
../example/demos/options.vue
```

### Field mapping

```demo
../example/demos/field-names.vue
```

### Custom icons

```demo
../example/demos/custom-icons.vue
```

### Identical labels, distinct values

Labels may repeat, but values must be unique. Removing the second selected tag removes only its value, in all three presentations.

```demo
../example/demos/same-label.vue
```

### Intro

Display and select the content through the drop-down menu.

### Overlay presentations

Use inline for the standard field, popup for a bottom list, dialog for a dialog, and read for value-only content. See the combined Form demonstration for inheritance and confirmation.

```demo
../example/demos/dialog.vue
```

```demo
../example/demos/popup.vue
```

### Presentation and commit rules

Inline commits immediately by default. Popup and dialog confirm a draft. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Cedar supports inline/click/dblclick; Maple supports inline/popup. No shared runtime or state.

### Group spacing

```demo
../example/demos/group-spacing.vue
```

### Manage selected items

Multi-select panels include a selection summary and Clear. Cedar shows removable tags above list options. Maple opens selected-item details from the count row, with per-item removal and a way back to options. Popup/popover and dialog use the same behavior. Removal and Clear edit the draft; Cancel restores the value and Confirm publishes it. Disabled items remain selected, and confirmation locks selection actions. The panel Clear action is independent of the field clear icon.

### Appearance combinations

Use this example for single selection from a known list. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Interaction states

Use this example for single selection from a known list. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Async device labels

```demo
../example/demos/en-US/async-devices.vue
```

The field, controller, option algorithms, Menu and styles are independently copied from Cedar. Maple uses the shared internal field presentation host for popup; neither library imports the other at runtime.

### Thumb drag lifecycle / 滑块拖动生命周期

Each primary-button start owns a session: generation, track/thumb nodes, immutable axis/start and thumb.ownerDocument.defaultView. Register mousemove/mouseup/contextmenu/blur on that original window. Release the full set and dragging/mouseOffset on normal end, context cancellation, blur, effective geometry/direction change, deactivation or disposal. This repairs leaked contextmenu, missing suspension/disposal cleanup and global-window iframe binding. Old move cannot drive a new gesture; old end cannot release one. Activation allows only fresh starts.

Changing direction/max/thumbSize/ratio cancels the gesture; replacing data with equal primitive geometry does not. Parent measurement/setOffset still settles final position. Recheck ownership after geometry/reactive writes to reject reentrant disposal. Inactive/disposed retained start/track/setOffset are inert without preventDefault; nonprimary clicks do not drag/page. Active setOffset clamping, drag-time suppression and one-thumb track paging remain. No Pointer/touch protocol migration or rollback of native scrolling.

```demo
../example/demos/en-US/thumb-lifecycle.vue
```

### Scrollbar consumer lifecycle / 滚动条消费者生命周期

Lifecycle availability gates retained native methods, thumb commands, scroll notifications and measurement. Suspension/disposal invalidate operation and binding epochs; activation remeasures current geometry and accepts only fresh binding deliveries. After geometry getters/reactive commits/thumb callbacks, operation/node/lifecycle checks reject reentrant disposal or newer measurement ownership. Logical cancellation cannot undo native scrolling already handed to the browser; native smooth interpolation/cancellation is not certified.

Zero is a valid coordinate, including scrollTo(0,0); measurement resets thumbs at zero. Horizontal measurement uses horizontal rather than vertical ratio. Zero/invalid viewport yields finite nonnegative metrics and no scrollbar on that zero-sized axis. Existing20px minimum thumb/15px track strategy remains. Hidden/disabled-axis thumb delivery is inert, but disabling the bar does not forbid content/public native scrolling. Options are forwarded without JS animation. Public signatures and CSS variables unchanged.

```demo
../example/demos/en-US/scrollbar-lifecycle.vue
```

Render-settled active-option scrolling is not CSS animation completion. Close/reopen, newer navigation, deactivation or disposal invalidate old work; consumed callbacks never replay, including empty options. Inactive/disposed retained selection/keyboard/scroll entries are inert; activation accepts fresh commands. Late dropdown registration remains supported. Virtual callbacks are rechecked before DOM scrolling. Scoped14 each/shared consumer regression Cedar93/Maple96 pass with controlled queues, not native browser/OS or full downstream proof. No API/CSS token change.

### Interaction Scheduling Lifecycle

```demo
../example/demos/en-US/scheduler-lifecycle.vue
```

Grouped option lists share Menu spacing: a 20px title line with 4px vertical padding (28px total), an extra 8px before subsequent groups, and no extra group gap before the first title. Labels align with option text; AutoComplete labels follow its option horizontal padding.

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

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
| `tag-nowrap` | Keep tags on one line with ellipsis and preserved removal icons; overflow scrolls horizontally; hover, focus or tap truncated text to preview it | `boolean` | `false` |
| `popup-container` | Selector, element, element resolver, or false for inline rendering | `PopupContainer` | `—` |
| `trigger-props` | Menu Trigger props; field owns open state | `TriggerProps` | `—` |
| `virtual-list-props` | Virtual list settings for option panels | `VirtualListProps` | `—` |
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
| `default-active-first-option` | On opening, activate the first enabled candidate if no valid selected option exists. Highlighting does not update modelValue or emit change; an existing valid selection takes priority | `boolean` | `true` |
| `unmount-on-close` | Unmount Menu content when closed | `boolean` | `false` |
| `scrollbar` | option panels scrollbar settings | `boolean 或 ScrollbarProps` | `true` |
| `show-header-on-empty / show-footer-on-empty` | Display header/footer in empty state | `boolean` | `false` |
| `presentation` | 字段展示；未指定时继承 FormItem/Form | `inline / popup` | `inline` |
| `before-commit` | 确认校验后可等待的保存拦截钩子 | `(value, context) => void / false / Promise` | — |

Selected options show a primary-color check on the right in both single and multiple mode. Candidate highlighting alone shows no check. In popup/edit panels the check represents the draft selection until confirmation; disabled selections keep their disabled appearance.

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
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` |
| `--mp-select-popup-group-title-padding-top` | `var(--mp-sys-space-4)` |
| `--mp-select-popup-group-title-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-select-popup-group-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-loading-min-height` | `50px` |
| `--mp-select-popup-option-icon-margin-right` | `var(--mp-sys-space-4)` |

Single and multiple options share popup-option-padding-horizontal. There is no implicit search-highlight element; custom option slots own any highlighted substring styling. Unconsumed multi-popup-option-padding-horizontal and popup-option-highlight-* variables have been removed.

### Field and mobile presentation styles

Presentation containers use internal `src/_components/field-presentation/token.less`, with system surface, spacing and size tokens. Option lists retain the existing Select tokens.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Selection check tokens

| Token | Default |
| --- | --- |
| `--mp-select-popup-option-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-select-popup-option-check-size` | `var(--mp-sys-font-size-md)` |
| `--mp-select-popup-option-check-gap` | `var(--mp-sys-space-4)` |
