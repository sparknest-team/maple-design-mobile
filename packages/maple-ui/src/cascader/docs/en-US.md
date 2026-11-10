# Cascader

In multiple mode, the inline dropdown contains options only; the field owns selected values, removal and clearing. The popup editor retains the selected-items summary and clear action, and commits its draft on confirmation.

## Reading direction

Inherits source dir. Child columns, expansion icons and separators follow reading direction. Horizontal keys enter loaded children or return to the parent in the visible direction, skipping disabled children; vertical keys retain logical order. Search preserves native horizontal caret editing. Path and multiple-value arrays are not reversed. Clearing the last value while closed resets navigation before reopening.

`empty-value` / `emptyValue` sets the model value produced by clearing. It accepts a value in the component model type or a zero-argument factory. Omission preserves the existing default; use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on every clear; selected items that cannot be cleared remain. It does not redefine emptiness, alter Form reset defaults or treat 0/false as universally empty.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

The `options` prop accepts an array or `(query, { signal }) => array/Promise`. The component manages loading, cancellation and stale-result isolation; failures emit load-error. Single/multiple groups initialize with an empty-string query, searchable fields reload when the query changes, and root loading for tree fields remains independent of existing load-more child loading.

## Basic examples

### Please select a region

```demo
../example/demos/placeholder.vue
```

## Appearance and states

### Appearance combinations

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ------------------------------------------------------ | -------------------------- |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | Appearance combinations, Form control size comparison |
| `clearable` | Allow clearing; preserve disabled selections | Appearance combinations, Form control size comparison |
| `edit-mode` | Field presentation; inherits FormItem / Form when omitted. | Form control size comparison |
| `size` | Supports all five sizes; inherits group/form settings | Form control size comparison |
| `variant` | filled, outline, standard; inherits InputGroup | Form control size comparison |
| `placeholder` | Placeholder | Form control size comparison |

<!-- demo-config-notes:end -->


Use this example for hierarchical choices such as regions. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

```demo
../example/demos/appearance-lab.vue
```

### Form control size comparison

Compare selected, clearable and nowrap multiple values with Input and Button. Long labels use ellipsis; removal icons stay available and the tag row scrolls horizontally without moving clear or arrow controls.

```demo
../../field-decorator/example/demos/control-sizes.vue
```

## Selection modes and paths

### Multiple cascade

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ------------------------------------------------------ | --------------------------------- |
| `path-mode` | Return a complete path instead of a node value | Multiple cascade, Picker multiple, List multiple |
| `placeholder` | Placeholder | Multiple cascade, Picker multiple, List multiple |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | Multiple cascade, Picker multiple, List multiple |
| `multiple` | Multiple selection; enables search by default | Multiple cascade, Picker multiple, List multiple |
| `show-tags` | Show tags; false displays separated text | Multiple cascade, Picker multiple, List multiple |
| `edit-mode` | Field presentation; inherits FormItem / Form when omitted. | Picker multiple, List multiple |

<!-- demo-config-notes:end -->


```demo
../example/demos/placeholder-multiple.vue
```

### Picker multiple

```demo
../example/demos/placeholder-picker-multiple.vue
```

### List multiple

```demo
../example/demos/placeholder-list-multiple.vue
```

### Presentation and commit rules

Inline commits immediately. Popup and dialog edit a draft for both single and multiple values. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Search is inside the editor and keeps the existing filtering, search event and lazy loading API.

### Manage selected items

Multi-select panels include a selection summary and Clear. Cedar shows removable tags above list options. Maple opens selected-item details from the count row, with per-item removal and a way back to options. Popup/popover and dialog use the same behavior. Removal and Clear edit the draft; Cancel restores the value and Confirm publishes it. Disabled items remain selected, and confirmation locks selection actions. The panel Clear action is independent of the field clear icon.

### Non-path mode

```demo
../example/demos/placeholder-path-mode.vue
```

## Search and presentation

### List mode

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ---------------- | ------------------------------------------------------ | ------------------------------------- |
| `placeholder` | Placeholder | List mode, Case-sensitive search, Picker mode |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | List mode, Case-sensitive search, Picker mode |
| `path-mode` | Return a complete path instead of a node value | List mode, Picker mode |
| `edit-mode` | Field presentation; inherits FormItem / Form when omitted. | List mode, Picker mode |
| `case-sensitive` | Case-sensitive built-in filtering; custom filters take priority | Case-sensitive search |
| `filterable` | Enable search | Case-sensitive search |

<!-- demo-config-notes:end -->


```demo
../example/demos/placeholder-list.vue
```

### Case-sensitive search

Compare matching with case sensitivity enabled and disabled using the same option labels. Search for the same word with different capitalization and inspect the candidate list.

```demo
../example/demos/case-sensitive.vue
```

### Picker mode

```demo
../example/demos/placeholder-picker.vue
```

### Panel data and customization

Compare panel options, selection and custom content. Select a node or clear the selection and inspect the displayed value; panel behavior is separate from the field opening protocol.

```demo
../example/demos/panel-review.vue
```

## Interaction and control

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------- | ------------------------------------------------------ | ------------ |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | Interaction states |
| `clearable` | Allow clearing; preserve disabled selections | Interaction states |

<!-- demo-config-notes:end -->


Use this example for hierarchical choices such as regions. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

## Configuration and composition

### Typed passthrough configuration

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `edit-mode` | Field presentation; inherits FormItem / Form when omitted. | Typed passthrough configuration, Copying and editing |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | Typed passthrough configuration, Copying and editing |
| `trigger-props` | Menu Trigger props; field owns open state | Typed passthrough configuration |
| `open-trigger-target` | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | Copying and editing |
| `filterable` | Enable search | Copying and editing |

<!-- demo-config-notes:end -->


Use `CascaderTriggerOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

```demo
../example/demos/passthrough-options.vue
```

### Copying and editing

Use open-trigger-target to control pointer opening independently. In icon mode, clicking, focusing and typing do not automatically open the panel. input-editable / filterable still controls editing or search. The suffix button, explicit keyboard commands and controlled open can open it.

```demo
../example/demos/open-trigger-target.vue
```

## Async loading and value resolution

### Callback lazy loading

```demo
../example/demos/load-more.vue
```

### Async device labels

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------ | ------------------------------------------------------ | ------------------ |
| `edit-mode` | Field presentation; inherits FormItem / Form when omitted. | Async device labels |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | Async device labels |
| `loading` | Loading state; blocks selection and confirmation | Async device labels |
| `path-mode` | Return a complete path instead of a node value | Async device labels |
| `filterable` | Enable search | Async device labels |
| `clearable` | Allow clearing; preserve disabled selections | Async device labels |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/async-devices.vue
```

### Intro

Cascading selection via dropdown menu or bottom popup picker.

Single selection uses the built-in check icon on the right. Multiple selection uses Checkbox controls: no checked descendants is unchecked, some is indeterminate, and all selectable leaf descendants is checked. Disabled leaves are excluded from select-all. With checkStrictly, parent and child selections are independent. Panel selections remain drafts until confirmation.

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

### Lazy-loading completion and errors

When an expandable option has unloaded children, Enter, Space, or the forward arrow starts lazy loading and displays its pending state. The forward arrow moves into children only if focus remains on the input or option that received the key. Search results do not expand children.

`loadMore(option, done)` keeps a callback-only contract in the field and standalone panel. Call `done(children)` to accept children or `done()` to end waiting and allow retry. Only the first callback is accepted; return values, including a resolved Promise, do not replace `done`. A synchronous loader exception releases waiting and reaches Vue's `errorCaptured` / application `errorHandler`. The `load-error` event remains specific to the `options` data source; it does not report `loadMore` exceptions. Handle asynchronous callback-based request failures in business code and call `done()`.

Replacing options (including nested mutations), field names, or the loader invalidates old work and cached lazy children. Unmount/deactivation invalidates pending callbacks; an old result cannot change a replacement node or clear a newer wait.

## Usage notes

### Editing mode
Use `edit-mode` to choose direct editing or a mobile editor panel.

### Editing and confirmation
This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `popup` and opens an editor when the value area is clicked. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit({ value, previousValue }, done, { signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Field editing uses edit-mode: Cedar supports direct/click/dblclick, and Maple supports direct/popup. The old menu/list/picker editing values are not retained. Popup editors reuse the existing option index, search, asynchronous loading and virtual-list algorithms.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Search fields
`searchFields` / `search-fields` is a readonly `('label' | 'value')[]`, defaulting to `['label']`. Multiple fields use OR matching, case-insensitive by default. `['value', 'label']` searches codes and names; fieldNames maps semantic fields to business fields. An empty array matches no items for a nonempty query. Values are compared as strings; object traversal, object values and pinyin matching require a custom callback. A custom callback takes precedence and decides case handling itself. Remote results use the existing protocol for disabling local filtering. Cascader retains path semantics and checks the configured fields on each path node.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

Refresh can retry the component-owned asynchronous option source before the editor opens, using the existing AbortSignal, loading, and load-error protocol without opening the editor; static arrays do not create extra requests.

### Selection actions during loading
While manual loading or the current candidate request is active, selection fields preserve existing values and pause selection, clearing and tag removal. Blocked actions neither notify nor submit a model. Search text remains editable and disabled/readonly are not changed; set them separately to prevent searching.

Deferred editor clearing and confirmation are unavailable while loading; cancellation and closing remain available. Actions return to their normal state after both the manual flag and current request finish, still respecting disabled options. Loading on free-text fields such as Input and AutoComplete continues to allow text editing and clearing.

option({ data }) receives normalized CascaderOptionInfo; data.raw is the original option and data.path is the normalized root-to-current path. label({ data }) receives the field display item key/value/label/closable/tagProps. arrow-icon({ focus, menuOpen }) receives the real field focus and open state. read({ value, text }) retains null/undefined and the original model shape.

Public types include CascaderBaseValue, CascaderOptionInfo, CascaderReadScope, CascaderEmits, CascaderSlots and CascaderExpose from the root and cascader entry points. Standalone CascaderPanel accepts option arrays and does not own a root candidate loader.

## API

A panel branch’s `aria-expanded` indicates whether its child column is actually visible; focus or hover does not mark it expanded before that column opens. Leaf options have no `aria-expanded`. Search results do not advertise submenus that are not displayed. Direct single-select search uses a `listbox` with `option` elements, and the input references the popup and active option. Editor single-select search uses `menuitemradio` with `aria-checked` and one Tab stop. Multiple-select search retains its checkboxes. In direct single-select search, the popup icon is excluded from the Tab sequence; click the icon or press Arrow Down in the input to open it.

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Cascader Props

Use `v-model`, `v-model:open` and `v-model:input-value` for controlled state. Clear values are `''` for single selection and `[]` for multiple selection. Select uses `undefined` when an actual empty-string option exists.

| Prop | Description | Type | Default |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------ |
| `model-value / default-value` | Controlled value / uncontrolled initial value | `CascaderBaseValue` | `Single: ''; multiple: []` |
| `open / default-open` | Controlled / initial open state | `boolean` | `undefined / false` |
| `open-trigger-target` | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | `'field' \| 'icon'` | `'field'` |
| `input-value / default-input-value` | Search text, independent of selected values | `string` | `undefined / ''` |
| `multiple` | Multiple selection; enables search by default | `boolean` | `false` |
| `size` | Supports all five sizes; inherits group/form settings | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| `variant` | filled, outline, standard; inherits InputGroup | `FieldDecoratorVariant`<br>`'filled' \| 'outline' \| 'standard'` | `filled` |
| `disabled / readonly / error` | Inherits form state unless explicitly overridden | `boolean` | `undefined` |
| `placeholder` | Placeholder | `string` | `—` |
| `hint / line` | Floating hint / standard variant underline | `boolean` | `true` |
| `text-color / focus-color / blur-color` | Field colors | `string` | `—` |
| `loading` | Loading pauses selection, clearing, tag removal and confirmation; retains values while search and closing remain available. | `boolean` | `false` |
| `loading-mode` | Field loading presentation: default indicator or bottom indeterminate line. | `default / line` | `default` |
| `search-fields` | Fields used by built-in path search; defaults to label; custom filtering callbacks take precedence. | `readonly OptionSearchField[]`<br>`OptionSearchField: 'label' \| 'value'` | `['label']` |
| `read-pretty` | Common pure-reading state, inherited from FormItem / Form when omitted; independent of readonly and disabled. | `boolean` | `undefined` |
| `empty-value` | Clear output override; does not change empty-value recognition. | `CascaderProps['emptyValue']` | `undefined` |
| `before-commit` | Before confirmation, calls ({ value, previousValue }, done, { signal }); complete with a boolean, Promise or done; synchronous undefined waits for done. | `BeforeFieldCommit` | `undefined` |
| `show-tags` | Show tags; false displays separated text | `boolean` | `true` |
| `separator` | Separator when show-tags=false | `string` | `,` |
| `text-align` | Physical text alignment: left / center / right. When omitted, inherits FormItem content-align; standalone fields default to logical start | `'left' \| 'center' \| 'right'` | `-` |
| `max-tag-count` | Finite nonnegative integer; 0 leaves the displayed tag count unlimited. | `number` | `0` |
| `tag-nowrap` | Keep tags on one line with ellipsis and preserved removal icons; overflow scrolls horizontally; hover, focus or tap truncated text to preview it | `boolean` | `false` |
| `popup-container` | Selector, element, element resolver, or false for inline rendering | `PopupContainer` | `—` |
| `trigger-props` | Menu Trigger props; field owns open state | `TriggerProps` | `—` |
| `virtual-list-props` | Pass the virtual list attribute, pass in this parameter to turn on virtual scrolling [VirtualListProps](#VirtualListProps) | `VirtualListProps` | `—` |
| `search-delay` | Finite nonnegative search debounce delay in milliseconds. | `number` | `500` |
| `format-label` | Format selected labels; use label slot for VNodes | `function` | `—` |
| `clearable` | Allow clearing; preserve disabled selections | `boolean` | `false` |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | `CascaderOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | Map value, label, disabled, children, isLeaf, tagProps, render | `CascaderFieldNames` | `—` |
| `path-mode` | Return a complete path instead of a node value | `boolean` | `false` |
| `check-strictly` | Allow parent selection; unlink parent/child checks | `boolean` | `false` |
| `filterable` | Enable search | `boolean` | `Single: false; multiple: true` |
| case-sensitive | Case-sensitive built-in filtering; custom filters take priority | boolean | false |
| `filter-option` | Receives query and raw node | `(input, option) => boolean` | `—` |
| `expand-trigger` | Menu / List expansion: click or hover | `string` | `click` |
| `expand-child` | Expand to first child | `boolean` | `false` |
| `load-more` | Load children asynchronously; call done(children), or done() to allow retry | `(option, done) => void` | `—` |
| `fallback-option` | Display unresolved values | `boolean or (value) => string` | `true` |
| `search-option-only-label` | Show node label only in search results | `boolean` | `false` |
| `auto-fit-popup-width` | Match Menu width to field | `boolean` | `false` |
| `edit-mode` | Field presentation; inherits FormItem / Form when omitted. | `direct / popup` | `popup` |
| `popup-props` | Popup appearance; open state, bottom placement and mounting are owned by the extension | `PopupProps` | `{}` |

### Cascader Events / Methods

In direct mode, Arrow Down requests opening when the field is closed. Once opened, the first enabled option becomes active if no option is already active and focus remains in the field, including when options arrive asynchronously. Losing focus, closing, or interacting again cancels the pending activation. A controlled `open` changes only when the parent accepts the request.

When a menu option has focus, Enter or Space activates it. Search inputs and nested checkboxes keep their own keyboard behavior.

- `keydown(event)`: keyboard event from the field, candidate menu, or editor panel; `preventDefault()` suppresses internal keyboard handling.

- `update:modelValue`, `change(value)`: emitted on commit, not while editing a draft.
- `update:open`, `open-change(open)`: request an expanded-state change.
- `update:inputValue`, `input-value-change(text)`, `search(text)`: search state.
- `focus(event)`, `blur(event)`, `clear(event)`: native field events; only the field owner notifies Form.
- `load-error(error)`: current options source failure notification; listener Promises are not collected.
- Methods: `focus()`, `blur()` and `refresh(): Promise<void>`; refresh does not open the editor.

### Slots and option data

Use `label({ data })` for custom `selected` labels; `selected` replaces the whole selection area. Also supports `prefix`, `suffix`, `clear-icon({ clear })`, `arrow-icon`, `loading-icon`, `search-icon`, `empty`, and `option({ data })`.

Option `label` is searchable plain text. Use `render` or the `option` slot for custom `option` content, and `format-label` or `label` slot for selected content. Values identify selections; labels never do. `disabled` blocks selection/removal, and `tagProps` customizes selected tags.

`CascaderPanel` (`mp-cascader-panel`), also `Cascader.CascaderPanel`, works independently as a Menu panel without input/popup. Supports options, modelValue/defaultValue, multiple, pathMode, checkStrictly, fieldNames, loadMore, disabled, expandTrigger and expandChild. Events are update:modelValue/change; empty customizes empty state.

### CascaderPanel Props

| Parameter | Description | Type | Default |
| ------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------: |
| path-mode | Return a complete path instead of a node value | `boolean` | `false` |
| multiple | Multiple selection; enables search by default | `boolean` | `false` |
| model-value **(v-model)** | Bound value | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` | `-` |
| default-value | Default value (uncontrolled state) | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` | `'' \| undefined \| []` |
| options | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | `CascaderOption[]` | `[]` |
| expand-trigger | Menu / List expansion: click or hover | `string` | `'click'` |
| check-strictly | Allow parent selection; unlink parent/child checks | `boolean` | `false` |
| load-more | Load children asynchronously; call done(children), or done() to allow retry | `(  option: CascaderOption,  done: (children?: CascaderOption[]) => void) => void` | `-` |
| field-names | Customize fields in `CascaderOption`; when option `value` is an object, `value` is also used as the key property | `CascaderFieldNames` | `-` |
| expand-child | Expand to first child | `boolean` | `false` |

### CascaderPanel Events

| Event | Description | Arguments |
| ------ | ---------------- | -------------------------------------------------------------------------------------- |
| change | Emitted when the selected value changes | value: `string \| number \| (string \| number \| (string \| number)[])[] \| undefined` |

### CascaderPanel Slots

| Slot | Description | Prop |
| ------ | :------------------: | ---- |
| empty | Content displayed when no options are available | - |

Async search should clear old candidates when requests start and accept only the latest current-query response. `update:input-value` can react immediately; `loading`/`filter-option` can display remote results. Popup arrows/Enter operate current candidates only; bottom confirmation saves. Validation failure preserves drafts, confirmation locks editing/closing, and Form reset closes Popup and aborts submission. Closing/reset invalidates request ownership. See Form's unified field-presentation examples.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-cascader-checkbox-bg-hover` | `var(--mp-color-fill-3)` | `background-color` |
| `--mp-cascader-font-item-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-cascader-item-bg-active` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-cascader-item-bg-disabled` | `transparent` | `background-color` |
| `--mp-cascader-item-bg-disabled-active` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-cascader-item-bg-hover` | `var(--mp-cascader-item-bg-active)` | `background-color` |
| `--mp-cascader-item-check-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-cascader-item-check-size` | `var(--mp-sys-font-size-md)` | `height`, `width` |
| `--mp-cascader-item-icon-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-cascader-item-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-cascader-item-text-color-active` | `var(--mp-cascader-item-text-color)` | `color` |
| `--mp-cascader-item-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-cascader-item-text-color-disabled-active` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-cascader-item-text-color-hover` | `var(--mp-cascader-item-text-color)` | `color` |
| `--mp-cascader-margin-checkbox-right` | `var(--mp-sys-space-4)` | `margin-inline-end` |
| `--mp-cascader-margin-item-icon-left` | `var(--mp-sys-space-5)` | `margin-inline-start` |
| `--mp-cascader-option-min-width` | `100px` | `min-width` |
| `--mp-cascader-padding-item-left` | `var(--mp-sys-space-5)` | `padding-inline-end`, `padding-inline-start` |
| `--mp-cascader-padding-item-right` | `var(--mp-sys-space-5)` | `margin-inline-end`, `padding-inline-end` |
| `--mp-cascader-panel-column-max-height` | `200px` | `max-height` |
| `--mp-cascader-panel-column-min-width` | `120px` | `min-width` |
| `--mp-cascader-popup-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-cascader-popup-box-shadow` | `0 4px 10px rgb(0 0 0%)` | `box-shadow` |
| `--mp-cascader-popup-color-border` | `var(--mp-color-fill-3)` | `border`, `border-inline-end`, `border-top` |
| `--mp-cascader-popup-max-height` | `200px` | `height` |
| `--mp-cascader-popup-padding-vertical` | `var(--mp-sys-space-2)` | `padding` |
| `--mp-cascader-size-item-height` | `36px` | `height`, `line-height` |
| `--mp-cascader-size-item-icon` | `12px` | `height`, `width` |
| `--mp-cascader-slide-margin` | `120px` | `margin-inline-start` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-cascader-font-item-size: var(--mp-sys-font-size-md);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
