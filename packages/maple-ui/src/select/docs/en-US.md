# Select

In multiple mode, the inline dropdown contains options only; the field owns selected values, removal and clearing. The popup editor retains the selected-items summary and clear action, and commits its draft on confirmation.

## Reading direction

Select inherits source `dir`. Standalone fields align to inline start; FormItem content-align still takes precedence when inherited. Explicit left/right alignment remains physical. Tags keep their array order and empty-search Backspace removes the last closable value. Dropdowns and picker panels retain source direction, including in a custom popup-container.

## Basic examples

### Basic usage

Open the options, select a value to close the menu, or clear it to choose again. This example demonstrates single selection only.

```demo
../example/demos/standard.vue
```

## Appearance and states

### Appearance configuration comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                                                 | Related examples                                                  |
| ------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `options`     | Primitive, object or grouped options; one source for every presentation | Appearance configuration comparison, Form control size comparison |
| `clearable`   | Allow clearing; preserve disabled selections                            | Appearance configuration comparison, Form control size comparison |
| `disabled`    | Whether to disable                                                      | Form control size comparison                                      |
| `edit-mode`   | Field presentation; inherits FormItem/Form when omitted                 | Form control size comparison                                      |
| `size`        | Supports all five sizes; inherits group/form settings                   | Form control size comparison                                      |
| `variant`     | filled, outline, standard; inherits InputGroup                          | Form control size comparison                                      |

<!-- demo-config-notes:end -->

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for single selection from a known list. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

## Selection modes and options

### Multiple selection

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                                                 | Related examples                                                                         |
| ------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `placeholder` | Placeholder                                                             | Multiple selection, Identical labels, distinct values, Labels and values                 |
| `variant`     | filled, outline, standard; inherits InputGroup                          | Multiple selection, Identical labels, distinct values, Labels and values                 |
| `multiple`    | Multiple selection; enables search by default                           | Multiple selection, Identical labels, distinct values, Option declarations and selection |
| `options`     | Primitive, object or grouped options; one source for every presentation | Identical labels, distinct values, Group spacing, Option data                            |
| `show-tags`   | Show tags; false displays separated text                                | Multiple selection, Identical labels, distinct values                                    |
| `clearable`   | Allow clearing; preserve disabled selections                            | Identical labels, distinct values, Option declarations and selection                     |

<!-- demo-config-notes:end -->

```demo
../example/demos/multiple.vue
```

### Identical labels, distinct values

Labels may repeat, but values must be unique. Removing the second selected tag removes only its value, in all three presentations.

```demo
../example/demos/same-label.vue
```

### Intro

Display and select the content through the drop-down menu.

### Labels and values

```demo
../example/demos/value-mapping.vue
```

### Group spacing

```demo
../example/demos/group-spacing.vue
```

### Manage selected items

Multi-select panels include a selection summary and Clear. Cedar shows removable tags above list options. Maple opens selected-item details from the count row, with per-item removal and a way back to options. Popup/popover and dialog use the same behavior. Removal and Clear edit the draft; Cancel restores the value and Confirm publishes it. Disabled items remain selected, and confirmation locks selection actions. The panel Clear action is independent of the field clear icon.

### Option declarations and selection

Compare options supplied as data with child-option declarations. Select or clear values and inspect the model, including disabled options and customized option content.

```demo
../example/demos/options-review.vue
```

### Option data

```demo
../example/demos/options.vue
```

### Field mapping

```demo
../example/demos/field-names.vue
```

## Search and filtering

### Search matching rules

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration    | Purpose                                                                 | Related examples      |
| ---------------- | ----------------------------------------------------------------------- | --------------------- |
| `options`        | Primitive, object or grouped options; one source for every presentation | Search matching rules |
| `case-sensitive` | Case-sensitive built-in filtering; custom filters take priority         | Search matching rules |
| `search-delay`   | Search debounce delay in ms                                             | Search matching rules |
| `filterable`     | Enable search; optionally retainInputValue                              | Search matching rules |
| `placeholder`    | Placeholder                                                             | Search matching rules |

<!-- demo-config-notes:end -->

Search the same option data with different case sensitivity, search fields and delays. Compare which labels match; data mapping and asynchronous request handling remain separate.

```demo
../example/demos/search-matching.vue
```

## Content and dropdown customization

### Custom icons

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                                                 | Related examples                                               |
| ------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `placeholder` | Placeholder                                                             | Custom icons, Overlay presentations, Selection and popup slots |
| `options`     | Primitive, object or grouped options; one source for every presentation | Overlay presentations, Selection and popup slots               |
| `multiple`    | Multiple selection; enables search by default                           | Overlay presentations, Selection and popup slots               |
| `clearable`   | Allow clearing; preserve disabled selections                            | Overlay presentations, Selection and popup slots               |
| `variant`     | filled, outline, standard; inherits InputGroup                          | Custom icons                                                   |
| `edit-mode`   | Field presentation; inherits FormItem/Form when omitted                 | Overlay presentations                                          |

<!-- demo-config-notes:end -->

```demo
../example/demos/custom-icons.vue
```

### Overlay presentations

Use inline for the standard field, popup for a bottom list, dialog for a dialog, and read for value-only content. See the combined Form demonstration for inheritance and confirmation.

```demo
../example/demos/dialog.vue
```

```demo
../example/demos/popup.vue
```

### Presentation and commit rules

Inline commits immediately by default. Popup confirms a draft. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Cedar supports direct / click/dblclick; Maple supports direct / popup. No shared runtime or state.

### Selection and popup slots

Select and clear options to compare customized labels, option content and popup slots. The model remains the option value while the slots change its presentation.

```demo
../example/demos/slots-review.vue
```

## Value model and linked fields

### Candidate highlighting and form data flow

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration                 | Purpose                                                                                                                                                                                 | Related examples                                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `options`                     | Primitive, object or grouped options; one source for every presentation                                                                                                                 | Candidate highlighting and form data flow, Empty recognition and clear output, Interaction state comparison |
| `clearable`                   | Allow clearing; preserve disabled selections                                                                                                                                            | Empty recognition and clear output, Clearing, Interaction state comparison                                  |
| `placeholder`                 | Placeholder                                                                                                                                                                             | Candidate highlighting and form data flow, Clearing                                                         |
| `edit-mode`                   | Field presentation; inherits FormItem/Form when omitted                                                                                                                                 | Candidate highlighting and form data flow                                                                   |
| `default-active-first-option` | On opening, activate the first enabled candidate if no valid selected option exists. Highlighting does not update modelValue or emit change; an existing valid selection takes priority | Candidate highlighting and form data flow                                                                   |
| `empty-value`                 | Clear output override; return an array for multiple selection and preserve protected items                                                                                              | Empty recognition and clear output                                                                          |

<!-- demo-config-notes:end -->

Both fields start with `undefined`. Opening or highlighting a candidate does not emit `update:modelValue` or `change`. Inline selection commits on click or Enter. Popup selection edits a draft; Confirm publishes it, while cancel discards it. Each example shows the committed value, update count and actual event log (newest first).

```demo
../example/demos/en-US/selection-data-flow.vue
```

### Empty recognition and clear output

This example keeps an empty string as the valid All option and clears to null. Compare the selected All option with the cleared state in the model output. Deleting the search query does not remove the selected value. The additional fields show multiple selection clearing to [] and a factory explicitly producing undefined, each with its own model output.

```demo
../example/demos/en-US/empty-value.vue
```

### Clearing

```demo
../example/demos/clearable.vue
```

### Interaction state comparison

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for single selection from a known list. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

## Async data and search

### Loading

Toggle loading to compare the default indicator and bottom line. The selected value remains visible; selection and confirmation resume after loading.

```demo
../example/demos/loading.vue
```

### Async device labels

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration        | Purpose                                                                            | Related examples                                                                   |
| -------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `options`            | Primitive, object or grouped options; one source for every presentation            | Async device labels, Asynchronous source replacement, Public async data composable |
| `filterable`         | Enable search; optionally retainInputValue                                         | Async device labels, Asynchronous source replacement, Public async data composable |
| `loading`            | Loading state; blocks selection and confirmation                                   | Async device labels, Asynchronous source replacement                               |
| `edit-mode`          | Field presentation; inherits FormItem/Form when omitted                            | Async device labels                                                                |
| `field-names`        | Map value, label, disabled, tagProps, render; object values need a unique ID field | Async device labels                                                                |
| `virtual-list-props` | Virtual list settings for option panels                                            | Async device labels                                                                |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/async-devices.vue
```

The field, controller, option algorithms, Menu and styles are independently copied from Cedar. Maple uses the shared internal field presentation host for popup; neither library imports the other at runtime.

### Asynchronous source replacement

Use the request controls to resolve requests in different orders. Compare applied and ignored results and observe loading, error and current selection feedback.

```demo
../example/demos/async-source.vue
```

### Public async data composable

Normal integration passes a loader directly to the options prop; the component owns asynchronous state. The public useAsyncData composable is optional for advanced cases that share one result across several components. Existing array-based options remain supported.

```demo
../example/demos/en-US/async-data.vue
```

## Configuration and lifecycle

### Typed passthrough configuration

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration         | Purpose                                                                                                                                                                                     | Related examples                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `edit-mode`           | Field presentation; inherits FormItem/Form when omitted                                                                                                                                     | Typed passthrough configuration, Interaction Scheduling Lifecycle, Thumb drag lifecycle |
| `options`             | Primitive, object or grouped options; one source for every presentation                                                                                                                     | Typed passthrough configuration, Interaction Scheduling Lifecycle, Thumb drag lifecycle |
| `trigger-props`       | Optional dropdown Trigger settings. Placement defaults to bottom-start and automatically adjusts when space is limited. The field owns open state; there is no top-level placement prop     | Typed passthrough configuration                                                         |
| `scrollbar`           | option panels scrollbar settings                                                                                                                                                            | Thumb drag lifecycle                                                                    |
| `open-trigger-target` | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | Copying and editing                                                                     |
| `filterable`          | Enable search; optionally retainInputValue                                                                                                                                                  | Copying and editing                                                                     |

<!-- demo-config-notes:end -->

Use `SelectTriggerOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

```demo
../example/demos/passthrough-options.vue
```

### Interaction Scheduling Lifecycle

```demo
../example/demos/en-US/scheduler-lifecycle.vue
```

Grouped option lists share Menu spacing: a 20px title line with 4px vertical padding (28px total), an extra 8px before subsequent groups, and no extra group gap before the first title. Labels align with option text; AutoComplete labels follow its option horizontal padding.

### Clear values and 1.x compatibility

`SelectValue` includes `undefined`. By default, single-select clear emits `''`; if the current options contain a `value: ''` option, it emits `undefined` to distinguish clearing from selecting that option. This published behavior is preserved. Both `change` and `update:modelValue` use `SelectValue`.

`empty-value` defines clear output; omission preserves the existing fallback. Single selection can use `() => undefined` to explicitly return undefined; multiple selection should return an array matching its model shape. Protected disabled selections take priority and prevent the clear override from running. Controlled mode still requires parent acceptance.

Root and component entries export `SelectValue` and `SelectEmptyValue`.

### Thumb drag lifecycle

Each primary-button start owns a session: generation, track/thumb nodes, immutable axis/start and thumb.ownerDocument.defaultView. Register mousemove/mouseup/contextmenu/blur on that original window. Release the full set and dragging/mouseOffset on normal end, context cancellation, blur, effective geometry/direction change, deactivation or disposal. This repairs leaked contextmenu, missing suspension/disposal cleanup and global-window iframe binding. Old move cannot drive a new gesture; old end cannot release one. Activation allows only fresh starts.

Changing direction/max/thumbSize/ratio cancels the gesture; replacing data with equal primitive geometry does not. Parent measurement/setOffset still settles final position. Recheck ownership after geometry/reactive writes to reject reentrant disposal. Inactive/disposed retained start/track/setOffset are inert without preventDefault; nonprimary clicks do not drag/page. Active setOffset clamping, drag-time suppression and one-thumb track paging remain. No Pointer/touch protocol migration or rollback of native scrolling.

```demo
../example/demos/en-US/thumb-lifecycle.vue
```

### Scrollbar consumer lifecycle

Lifecycle availability gates retained native methods, thumb commands, scroll notifications and measurement. Suspension/disposal invalidate operation and binding epochs; activation remeasures current geometry and accepts only fresh binding deliveries. After geometry getters/reactive commits/thumb callbacks, operation/node/lifecycle checks reject reentrant disposal or newer measurement ownership. Logical cancellation cannot undo native scrolling already handed to the browser; native smooth interpolation/cancellation is not certified.

Zero is a valid coordinate, including scrollTo(0,0); measurement resets thumbs at zero. Horizontal measurement uses horizontal rather than vertical ratio. Zero/invalid viewport yields finite nonnegative metrics and no scrollbar on that zero-sized axis. Existing20px minimum thumb/15px track strategy remains. Hidden/disabled-axis thumb delivery is inert, but disabling the bar does not forbid content/public native scrolling. Options are forwarded without JS animation. Public signatures and CSS variables unchanged.

```demo
../example/demos/en-US/scrollbar-lifecycle.vue
```

Render-settled active-option scrolling is not CSS animation completion. Close/reopen, newer navigation, deactivation or disposal invalidate old work; consumed callbacks never replay, including empty options. Inactive/disposed retained selection/keyboard/scroll entries are inert; activation accepts fresh commands. Late dropdown registration remains supported. Virtual callbacks are rechecked before DOM scrolling. Scoped14 each/shared consumer regression Cedar93/Maple96 pass with controlled queues, not native browser/OS or full downstream proof. No API/CSS token change.

### Copying and editing

Use open-trigger-target to control pointer opening independently. In icon mode, clicking, focusing and typing do not automatically open the panel. input-editable / filterable still controls editing or search. The suffix button, explicit keyboard commands and controlled open can open it.

```demo
../example/demos/open-trigger-target.vue
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Cleared values and 1.x compatibility

`SelectValue` includes `undefined`. By default, single-select clear emits `''`; if the current options contain a `value: ''` option, it emits `undefined` to distinguish clearing from selecting that option. This published behavior is preserved. Both `change` and `update:modelValue` use `SelectValue`.

Root and component entries export `SelectValue` and `SelectEmptyValue`.

### Select props

Use `v-model`, `v-model:open` and `v-model:input-value` for controlled state. Clear values are `''` for single selection and `[]` for multiple selection. Select uses `undefined` when an actual empty-string option exists.

| Prop                                          | Description                                                                                                                                                                                 | Type                                                        | Default                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| `model-value / default-value`                 | Controlled value / uncontrolled initial value                                                                                                                                               | `Value`                                                     | `Single: ''; multiple: []`                                   |
| `open / default-open`                         | Controlled / initial open state                                                                                                                                                             | `boolean`                                                   | `undefined / false`                                          |
| `open-trigger-target`                         | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | `'field' \| 'icon'`                                         | `'field'`                                                    |
| `input-value / default-input-value`           | Search text, independent of selected values                                                                                                                                                 | `string`                                                    | `undefined / ''`                                             |
| `multiple`                                    | Multiple selection; enables search by default                                                                                                                                               | `boolean`                                                   | `false`                                                      |
| `size`                                        | Supports all five sizes; inherits group/form settings                                                                                                                                       | `ComponentSize`                                             | `md`                                                         |
| `variant`                                     | filled, outline, standard; inherits InputGroup                                                                                                                                              | `FormControlVariant`                                        | `filled`                                                     |
| `disabled / readonly / error`                 | Inherits form state unless explicitly overridden                                                                                                                                            | `boolean`                                                   | `undefined`                                                  |
| `placeholder`                                 | Placeholder                                                                                                                                                                                 | `string`                                                    | `—`                                                          |
| `hint / line`                                 | Floating hint / standard variant underline                                                                                                                                                  | `boolean`                                                   | `true`                                                       |
| `text-color / focus-color / blur-color`       | Field colors                                                                                                                                                                                | `string`                                                    | `—`                                                          |
| `loading`                                     | Loading state; blocks selection and confirmation                                                                                                                                            | `boolean`                                                   | `false`                                                      |
| `loading-mode` | Loading layout: default indicator or bottom line | `default / line` | `default` |
| `show-tags`                                   | Show tags; false displays separated text                                                                                                                                                    | `boolean`                                                   | `true`                                                       |
| `separator`                                   | Separator when show-tags=false                                                                                                                                                              | `string`                                                    | `,`                                                          |
| `text-align`                                  | Text alignment: left / center / right. Inherits FormItem content-align when unset; standalone fields default to inline start                                                                        | `'left' \| 'center' \| 'right'`                             | `-`                                                          |
| `max-tag-count`                               | Maximum visible tags; 0 means unlimited                                                                                                                                                     | `number`                                                    | `0`                                                          |
| `tag-nowrap`                                  | Keep tags on one line with ellipsis and preserved removal icons; overflow scrolls horizontally; hover, focus or tap truncated text to preview it                                            | `boolean`                                                   | `false`                                                      |
| `popup-container`                             | Selector, element, element resolver, or false for inline rendering                                                                                                                          | `PopupContainer`                                            | `—`                                                          |
| `trigger-props`                               | Optional dropdown Trigger settings. Placement defaults to bottom-start and automatically adjusts when space is limited. The field owns open state; there is no top-level placement prop     | `TriggerProps`                                              | `—`                                                          |
| `virtual-list-props`                          | Virtual list settings for option panels                                                                                                                                                     | `VirtualListProps`                                          | `—`                                                          |
| `search-delay`                                | Search debounce delay in ms                                                                                                                                                                 | `number`                                                    | `500`                                                        |
| `format-label`                                | Format selected labels; use label slot for VNodes                                                                                                                                           | `function`                                                  | `—`                                                          |
| `clearable`                                   | Allow clearing; preserve disabled selections                                                                                                                                                | `boolean`                                                   | `true`                                                       |
| `empty-value`                                 | Clear output override; return an array for multiple selection and preserve protected items                                                                                                  | `SelectEmptyValue`                                          | `undefined`                                                  |
| `options`                                     | Primitive, object or grouped options; one source for every presentation                                                                                                                     | `SelectOption[]` / `(query, { signal }) => Array / Promise` | `undefined`                                                  |
| `field-names`                                 | Map value, label, disabled, tagProps, render; object values need a unique ID field                                                                                                          | `SelectFieldNames`                                          | `—`                                                          |
| `filterable`                                  | Enable search; optionally retainInputValue                                                                                                                                                  | `boolean or { retainInputValue?: boolean }`                 | `Single: false; multiple: true`                              |
| case-sensitive                                | Case-sensitive built-in filtering; custom filters take priority                                                                                                                             | boolean                                                     | false                                                        |
| `filter-option`                               | false disables local filtering; callback receives query and raw option                                                                                                                      | `boolean or (input, option) => boolean`                     | Automatic: enabled for arrays, disabled for loader functions |
| `creatable`                                   | Allow creating missing options                                                                                                                                                              | `boolean`                                                   | `false`                                                      |
| `fallback-option`                             | Display unresolved values or return a complete fallback option                                                                                                                              | `boolean or (value) => SelectOptionData`                    | `true`                                                       |
| `show-extra-options`                          | Display fallback/created options in the panel                                                                                                                                               | `boolean`                                                   | `true`                                                       |
| `limit`                                       | Selection limit; 0 means unlimited                                                                                                                                                          | `number`                                                    | `0`                                                          |
| `auto-fit-popup-width`                        | Match Menu width to the field                                                                                                                                                               | `boolean`                                                   | `true`                                                       |
| `default-active-first-option`                 | On opening, activate the first enabled candidate if no valid selected option exists. Highlighting does not update modelValue or emit change; an existing valid selection takes priority     | `boolean`                                                   | `true`                                                       |
| `unmount-on-close`                            | Unmount Menu content when closed                                                                                                                                                            | `boolean`                                                   | `false`                                                      |
| `scrollbar`                                   | option panels scrollbar settings                                                                                                                                                            | `boolean or ScrollbarProps`                                 | `true`                                                       |
| `show-header-on-empty / show-footer-on-empty` | Display header/footer in empty state                                                                                                                                                        | `boolean`                                                   | `false`                                                      |
| `edit-mode`                                   | Field presentation; inherits FormItem/Form when omitted                                                                                                                                     | `direct / popup`                                            | `popup`                                                      |
| `before-commit`                               | Asynchronous before-commit hook after validation                                                                                                                                            | `(value, context) => void / false / Promise`                | —                                                            |

### Events and methods

- `update:modelValue`, `change(value)`: emitted on commit, not while editing a draft.
- `update:open`, `open-change(open)`: request an expanded-state change.
- `update:inputValue`, `input-value-change(text)`, `search(text)`: search state.
- `focus(event)`, `blur(event)`, `clear(event)`: native field events; only the field owner notifies Form.
- Methods: `focus()`, `blur()`.

Select also emits `remove(value)`, `exceed-limit(value, event)`, `dropdown-scroll(event)`, and `dropdown-reach-bottom(event)`.

### Slots and option data

Use `label({ data })` for custom `selected` labels; `selected` replaces the whole selection area. Also supports `prefix`, `suffix`, `clear-icon({ clear })`, `arrow-icon`, `loading-icon`, `search-icon`, `empty`, and `option({ data })`.

Option `label` is searchable plain text. Use `render` or the `option` slot for custom `option` content, and `format-label` or `label` slot for selected content. Values identify selections; labels never do. `disabled` blocks selection/removal, and `tagProps` customizes selected tags.

Select additionally supports `header`, `footer`, `trigger`, and default `Option / Optgroup` children. Option props: `value`, `label`, `disabled`, `tagProps`, `index`; its default slot receives `selected`. Group data uses `{ isGroup: true, label, options }`. List and Picker also accept slot options; Picker displays their text labels.

### CSS variables

| Token                                              | Default                                            |
| -------------------------------------------------- | -------------------------------------------------- |
| `--mp-select-popup-max-height`                     | `200px`                                            |
| `--mp-select-popup-border-radius`                  | `var(--mp-sys-radius-md)`                          |
| `--mp-select-popup-padding-vertical`               | `var(--mp-sys-space-2)`                            |
| `--mp-select-popup-font-size`                      | `var(--mp-sys-font-size-md)`                       |
| `--mp-select-popup-bg`                             | `var(--mp-sys-color-surface-overlay)`              |
| `--mp-select-popup-border-color`                   | `var(--mp-sys-color-border-default)`               |
| `--mp-select-popup-box-shadow`                     | `0 4px 10px rgb(0 0 0 / 10%)`                      |
| `--mp-select-popup-option-height`                  | `36px`                                             |
| `--mp-select-popup-option-font-weight-selected`    | `var(--mp-sys-font-weight-medium)`                 |
| `--mp-select-popup-option-padding-horizontal`      | `var(--mp-sys-space-5)`                            |
| `--mp-select-popup-option-bg`                      | `var(--mp-sys-color-surface-overlay)`              |
| `--mp-select-popup-option-bg-hover`                | `var(--mp-sys-color-state-hover)`                  |
| `--mp-select-popup-option-bg-selected`             | `var(--mp-sys-color-surface-overlay)`              |
| `--mp-select-popup-option-bg-disabled`             | `var(--mp-sys-color-surface-overlay)`              |
| `--mp-select-popup-option-text-color`              | `var(--mp-sys-color-content-primary)`              |
| `--mp-select-popup-option-text-color-hover`        | `var(--mp-sys-color-content-primary)`              |
| `--mp-select-popup-option-text-color-selected`     | `var(--mp-sys-color-content-primary)`              |
| `--mp-select-popup-option-text-color-disabled`     | `var(--mp-sys-color-content-disabled)`             |
| `--mp-select-popup-group-title-height`             | `20px`                                             |
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` |
| `--mp-select-popup-group-title-padding-top`        | `var(--mp-sys-space-4)`                            |
| `--mp-select-popup-group-title-font-size`          | `var(--mp-sys-font-size-xs)`                       |
| `--mp-select-popup-group-title-text-color`         | `var(--mp-sys-color-content-secondary)`            |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)`                            |
| `--mp-select-popup-loading-min-height`             | `50px`                                             |
| `--mp-select-popup-option-icon-margin-right`       | `var(--mp-sys-space-4)`                            |

Single/multiple options both use popup-option-padding-horizontal. There is no implicit search-highlight DOM; custom option slots style their own highlighted fragments. Unused multi-popup-option-padding-horizontal and popup-option-highlight-* variables are removed.

### Field and mobile-presentation style boundaries

Presentation containers use internal `src/_components/field-presentation/token.less` with system surfaces/spacing/dimensions. Option lists retain existing Select tokens.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Option Props

| Prop      | Description                                                 | Type                                                   | Default   |
| --------- | ----------------------------------------------------------- | ------------------------------------------------------ | --------- |
| value     | Option Value                                                | string \| number \| boolean \| Record<string, unknown> | undefined |
| label     | Option group title                                          | string                                                 | undefined |
| disabled  | Whether to disable                                          | boolean                                                | false     |
| tag-props | Props of the multi-select label corresponding to the option | TagProps                                               | undefined |
| index     | Explicit option order                                       | number                                                 | undefined |

### Option Slots

| Slot    | Description           | Arguments             |
| ------- | --------------------- | --------------------- |
| default | Custom option content | { selected: boolean } |
| icon    | Option icon           | -                     |
| suffix  | Option suffix         | -                     |

### Optgroup Props

| Prop  | Description        | Type   | Default   |
| ----- | ------------------ | ------ | --------- |
| label | Option group title | string | undefined |

### Optgroup Slots

| Slot    | Description                    | Arguments |
| ------- | ------------------------------ | --------- |
| label   | Option group title             | -         |
| default | Option children inside a group | -         |

### Select Slots

| Slot         | Description                             | Arguments       |
| ------------ | --------------------------------------- | --------------- |
| default      | Option / Optgroup children              | -               |
| option       | Custom option content                   | { data }        |
| label        | Option group title                      | { data }        |
| selected     | Replace the whole selected-value region | -               |
| header       | Menu header                             | -               |
| footer       | Menu footer                             | -               |
| trigger      | Custom field trigger                    | -               |
| prefix       | Field prefix                            | -               |
| suffix       | Field suffix                            | -               |
| clear-icon   | Custom clear action                     | { clear }       |
| arrow-icon   | Dropdown arrow                          | -               |
| search-icon  | Search icon                             | -               |
| loading-icon | Loading icon                            | -               |
| empty        | Empty-state content                     | -               |
| read         | Read-mode content                       | { value, text } |

### Select Events

| Event                 | Description                                              | Arguments    |
| --------------------- | -------------------------------------------------------- | ------------ |
| update:model-value    | Request a model value update                             | value        |
| change                | Option                                                   | value        |
| update:open           | Request popup visibility                                 | open         |
| open-change           | Popup visibility changes                                 | open         |
| update:input-value    | Request search text update                               | text         |
| input-value-change    | Search text changes                                      | text         |
| search                | Triggered when the user searches                         | text         |
| focus                 | Field gains focus                                        | event        |
| blur                  | Field loses focus                                        | event        |
| clear                 | Triggered when the value of the input changes            | event        |
| remove                | Triggered when the delete button of the label is clicked | value        |
| exceed-limit          | Selection would exceed the multiple-selection limit      | value, event |
| dropdown-scroll       | Menu scrolls                                             | event        |
| dropdown-reach-bottom | Menu reaches its bottom                                  | event        |

### Select Methods

| Method | Description            | Arguments |
| ------ | ---------------------- | --------- |
| focus  | Focus the actual field | -         |
| blur   | Blur the actual field  | -         |

Async search should clear old candidates when requests start and accept only the latest current-query response. Combine remote results with `loading`, `:filter-option="false"` and `show-extra-options="false"` to avoid treating ID display fallbacks as search results. Popup arrows/Enter operate current candidates only; bottom confirmation saves. Failed validation preserves drafts. Pending confirmation locks editing/closing; reset closes Popup and aborts submission. Closing/reset invalidates request ownership. See Form's unified field-presentation examples.

### Selected-checkmark style variables

| Variable                               | Default                              |
| -------------------------------------- | ------------------------------------ |
| `--mp-select-popup-option-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-select-popup-option-check-size`  | `var(--mp-sys-font-size-md)`         |
| `--mp-select-popup-option-check-gap`   | `var(--mp-sys-space-4)`              |

### Public type exports

Root and component entries export `SelectEmits`、`SelectSlots`、`SelectExpose` alongside Props and Instance. Emits are event argument tuples derived from the runtime validators; Expose contains focus/blur.

### Built-in search fields

`searchFields` / `search-fields` is a readonly `('label' | 'value')[]`, defaulting to `['label']`. Multiple fields use OR matching, case-insensitive by default. `['value', 'label']` searches codes and names; fieldNames maps semantic fields to business fields. An empty array matches no items for a nonempty query. Values are compared as strings; object traversal, object values and pinyin matching require a custom callback. A custom callback takes precedence and decides case handling itself. Remote results use the existing protocol for disabling local filtering. Cascader retains path semantics and checks the configured fields on each path node.

## Loading options through a function prop

Pass options(query, { signal }) directly; useAsyncData is unnecessary. options still accepts arrays, and an explicit array, including [], takes precedence. The component manages loading, stale-result isolation and cancellation. load-error reports failures, and the instance refresh() method retries. A business loader may accept only query and ignore the second argument.

filterable enables entering a search query. filterOption controls only local matching and never sends requests. With an options loader, remote results are not filtered again by default; with only an array, local matching is enabled by default. Most callers do not need filter-option.

```vue
<mp-select v-model="value" :options="loadOptions" filterable />
```

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.
