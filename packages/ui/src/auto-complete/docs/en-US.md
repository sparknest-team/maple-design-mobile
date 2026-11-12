# AutoComplete

Free-text input with suggestions. Both libraries independently maintain the same component, props, Menu and styles. Local Input/Form integration supplies hover versus touch behavior; no shared runtime or platform configuration.

Opening and filtering are independent: shouldOpen controls opening, filterOption filters candidates. Empty results, disabled and readonly keep the menu closed. No list/picker presentation is provided.

## Reading direction

The editor and suggestion popup inherit source dir, including in custom containers. Horizontal caret keys keep native editing behavior; vertical keys navigate candidates, Enter selects and Escape closes. Candidate updates preserve the native composition buffer until composition ends instead of repainting the previous model value.

## Basic examples

### Input and selection

```demo
../example/demos/en-US/basic.vue
```

### Custom text submission

Choose a suggestion to commit immediately, or confirm custom text.

```demo
../example/demos/en-US/custom-draft.vue
```

## Appearance and states

### Appearance configuration comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------- | -------------------------------------------- | ------------ |
| `options` | Suggestions, including groups; unique values become strings on selection | Appearance configuration comparison |
| `clearable` | Allow clearing a nonempty editable value | Appearance configuration comparison |

<!-- demo-config-notes:end -->


Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for suggestions while allowing free text. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

```demo
../example/demos/appearance-lab.vue
```

## Matching and suggestions

### Opening and filtering

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ---------------- | --------------------------------------------------- | ------------------------------------ |
| `options` | Suggestions, including groups; unique values become strings on selection | Opening and filtering, Case sensitivity, Group spacing |
| `placeholder` | Placeholder or floating hint text | Opening and filtering, Case sensitivity, Group spacing |
| `should-open` | Opening policy; does not filter candidates | Opening and filtering, Group spacing, Virtual list |
| `filter-option` | Filter by label; false for remote filtering | Opening and filtering |
| `case-sensitive` | Case-sensitive built-in matching | Case sensitivity |
| `trigger-props` | Trigger configuration; cannot override owned opening and disabled state | Group spacing |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/opening-policy.vue
```

### Case sensitivity

```demo
../example/demos/en-US/case-sensitive.vue
```

### Group spacing

```demo
../example/demos/en-US/group-spacing.vue
```

### Virtual list

```demo
../example/demos/en-US/virtual-list.vue
```

## Content and field customization

### Field names and slots

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | -------------------------------------------- | -------------------------------- |
| `options` | Suggestions, including groups; unique values become strings on selection | Field names and slots, Variants and hints |
| `placeholder` | Placeholder or floating hint text | Field names and slots, Variants and hints |
| `field-names` | Map value, label, disabled and other fields | Field names and slots |
| `variant` | Input variant; inherits Group when unset | Variants and hints |
| `hint` | Enable Input floating hint | Variants and hints |
| `clearable` | Allow clearing a nonempty editable value | Variants and hints |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/footer.vue
```

### Variants and hints

```demo
../example/demos/en-US/decorator.vue
```

## Interaction and keyboard

### Interaction state comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | -------------------------------------------- | -------------------------- |
| `options` | Suggestions, including groups; unique values become strings on selection | Interaction state comparison, Keyboard and accessibility |
| `clearable` | Allow clearing a nonempty editable value | Interaction state comparison |
| `disabled` | Disabled; inherited when unset, explicit false overrides | Interaction state comparison |
| `readonly` | Readonly; focus/copy allowed, suggestions stay closed | Interaction state comparison |
| `error` | Error state; inherits FormItem when unset | Interaction state comparison |
| `input-attrs` | Native input attributes; combobox state is owned by the component | Keyboard and accessibility |

<!-- demo-config-notes:end -->


Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for suggestions while allowing free text. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### Keyboard and accessibility

```demo
../example/demos/en-US/accessibility.vue
```

Grouped option lists share Menu spacing: a 20px title line with 4px vertical padding (28px total), an extra 8px before subsequent groups, and no extra group gap before the first title. Labels align with option text; AutoComplete labels follow its option horizontal padding.

## Async data and configuration

### Async suggestions

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | --------------------------------------------------- | ------------------------------ |
| `options` | Suggestions, including groups; unique values become strings on selection | Async suggestions, Typed passthrough configuration |
| `filter-option` | Filter by label; false for remote filtering | Async suggestions |
| `placeholder` | Placeholder or floating hint text | Async suggestions |
| `disabled` | Disabled; inherited when unset, explicit false overrides | Typed passthrough configuration |
| `should-open` | Opening policy; does not filter candidates | Typed passthrough configuration |
| `trigger-props` | Trigger configuration; cannot override owned opening and disabled state | Typed passthrough configuration |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/remote.vue
```

### Typed passthrough configuration

AutoCompleteTriggerOptions is an opt-in configuration subset that excludes internally owned Trigger fields, consistent with Select and Cascader. The host trigger-props property intentionally retains TriggerProps, with internal state taking precedence. Candidate visibility follows focus/input and should-open; public open/default-open/update:open/open-change belong to the deferred field editor. Top-level popup-container wins when defined, including false; otherwise the nested container applies.

```demo
../example/demos/passthrough-options.vue
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Usage notes

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `popup` and opens an editor when the value area is clicked. Supported values: `direct / popup`. Non-direct modes open an editor through the field value trigger. Choosing a suggestion commits immediately by default; custom text uses confirmation. need-confirm also requires confirmation for suggestions. Cancel, reset or enabling readPretty discards an uncommitted draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(payload, done, context)` can guard saving the editor. FormItem validates the candidate first; invalid candidates keep the editor open. `open / default-open / update:open` control the editor. `#read="{ value, text }"` customizes read content. See the unified field presentation examples in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

Asynchronous search should clear old candidates when requests start and accept only the latest response for the current query. Popup arrows/Enter operate current candidates; confirmation mode saves with the bottom button, while immediate single selection commits on choice. Failed validation in confirmation mode preserves drafts. Confirmation locks editing/closing; Form reset closes Popup and aborts submission. Closing/reset invalidates request ownership. See Form’s unified field-presentation examples.

The candidate list shares group, selected and disabled styling with Select, and AutoComplete variables follow their Select counterparts by default. In direct mode the list opens below the input and updates while scrolling; trigger-props can change placement or enable automatic flipping. The field presentation owns the deferred editor while the internal input owns suggestions; each platform retains its public edit-mode values.

### Search fields

`searchFields` / `search-fields` is a readonly `('label' | 'value')[]`, defaulting to `['label']`. Multiple fields use OR matching, case-insensitive by default. `['value', 'label']` searches codes and names; fieldNames maps semantic fields to business fields. An empty array matches no items for a nonempty query. Values are compared as strings; object traversal, object values and pinyin matching require a custom callback. A custom callback takes precedence and decides case handling itself. Remote results use the existing protocol for disabling local filtering. Cascader retains path semantics and checks the configured fields on each path node.

### Configuration

Clearing does not emit search or reopen candidates, including when focus returns from a keyboard-focused clear button to the input. The parent controls the value: each rejected clear or selection still emits a change proposal; an accepted candidate selection notifies Form once.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### AutoComplete Props

| Prop | Description | Type | Default |
| -------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------- |
| need-confirm | Applies only to overlay editing. Choosing a suggestion commits and closes by default; true keeps a draft until confirmation. Submission still runs form validation and before-commit; rejection keeps the editor open. AutoComplete typing does not auto-submit; a changed text draft provides a confirmation button, while choosing a suggestion completes selection immediately. | `boolean` | `false` |
| `model-value` | Controlled text | `string \| null` | `—` |
| `default-value` | Initial uncontrolled text | `string` | `''` |
| `options` | Suggestions, including groups; unique values become strings on selection | `(AutoCompleteOption \| SelectOptionGroup)[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | Map value, label, disabled and other fields | `AutoCompleteFieldNames` | `—` |
| `should-open` | Opening policy; does not filter candidates | `(value: string) => boolean` | `value.length > 0` |
| `filter-option` | Filter by label; false for remote filtering | `AutoCompleteFilterOption` | Automatic: enabled for arrays, disabled for loader functions |
| `case-sensitive` | Case-sensitive built-in matching | `boolean` | `false` |
| `popup-container` | Popup container; same contract as Trigger | `PopupContainer` | `—` |
| `trigger-props` | Trigger configuration; cannot override owned opening and disabled state | `TriggerProps` | `—` |
| `virtual-list-props` | Enable and configure virtual scrolling | `VirtualListProps` | `—` |
| `size` | Five sizes; inherit Group / Form / global configuration when unset | `xs \| sm \| md \| lg \| xl` | `md` |
| `variant` | Input variant; inherits Group when unset | `filled \| outline \| standard` | `outline` |
| `disabled` | Disabled; inherited when unset, explicit false overrides | `boolean` | `undefined` |
| `readonly` | Readonly; focus/copy allowed, suggestions stay closed | `boolean` | `undefined` |
| `error` | Error state; inherits FormItem when unset | `boolean` | `undefined` |
| `clearable` | Allow clearing a nonempty editable value | `boolean` | `false` |
| `placeholder` | Placeholder or floating hint text | `string` | `—` |
| `hint` | Enable Input floating hint | `boolean` | `undefined` |
| `line` | Show border or underline | `boolean` | `true` |
| `text-color` | Instance text color | `string` | `—` |
| `focus-color` | Instance focus color | `string` | `—` |
| `blur-color` | Instance unfocused hint color | `string` | `—` |
| `enterkeyhint` | Virtual keyboard action hint | `InputHTMLAttributes['enterKeyHint']` | `—` |
| `aria-label` | Accessible input name | `string` | `—` |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | `number \| { length: number; errorOnly?: boolean }` | `0` |
| `show-word-limit` | Display word count | `boolean` | `false` |
| `word-length` | Custom length calculation | `(value: string) => number` | `—` |
| `word-slice` | Custom slicing | `(value: string, maxLength: number) => string` | `—` |
| `input-attrs` | Native input attributes; combobox state is owned by the component | `Record<string, unknown>` | `—` |
| edit-mode | Editing mode, inherited from FormItem and Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | Independent read presentation; explicit false overrides the parent | `boolean` | `false` |
| empty-value | Clear output; explicit null is submitted unchanged | `string \| null \| (() => string \| null)` | `''` |
| empty-values | Empty-value recognition; field takes precedence over FormItem and Form | `readonly unknown[]` | `-` |
| empty-text | Read empty text; an explicit empty string is valid | `string` | `'-'` |
| before-commit | Guard before saving a deferred edit; return a boolean or Promise, or complete via done | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | Controlled editor visibility, separate from native input focus | `boolean` | `-` |
| default-open | Initial visibility of an uncontrolled editor | `boolean` | `false` |
| search-delay | Query debounce in milliseconds for an explicit options loader; search notifications are not delayed | number | 250 |
| search-fields | Built-in search fields, mapped through field-names | `readonly ('label' \| 'value')[]` | `['label']` |
| loading | Manual waiting feedback; does not implicitly disable text editing | boolean | false |
| loading-mode | Field waiting feedback style | default \| line | default |

### AutoComplete Events

| Event | Arguments |
| --- | --- |
| keydown | event: KeyboardEvent |
| update:modelValue | value: string \| null |
| input | value: string, event: Event |
| search | value: string, event: Event |
| change | value: string \| null, event: Event |
| select | value: string, option: AutoCompleteOptionInfo, event: Event |
| clear | event: Event |
| focus / blur | event: FocusEvent |
| dropdown-scroll / dropdown-reach-bottom | event: Event |
| load-error | error: unknown |
| update:open / open-change | open: boolean |

`keydown` notifies before the internal keyboard action; call `preventDefault()` to suppress it.
When suggestions are embedded in the editor, Escape closes the editor. When suggestions are a separate popup, Escape closes that popup first.

Typing: `input → update:modelValue → search`; selection: `update:modelValue → select → change`; clear: `clear → input → update:modelValue → change`. Selecting the same value emits only select. change is a commit on blur, Enter or selection. Input owns typing/focus/clear Form notifications; AutoComplete notifies Form once for suggestion commits. Selection applies maxLength; select.value is the committed string, while option.value retains the original suggestion. clear receives an event, not a string.

options is an explicit data loader accepting query and { signal }; it may return an array or a Promise. Failures emit load-error, and refresh retries the current query. Ordinary events such as search only notify and do not collect listener Promises. open events refer only to the deferred field editor.

### AutoComplete Slots

| Slot | Description and arguments |
| --- | --- |
| option | data: AutoCompleteOptionInfo |
| empty | Empty candidate content inside the field editor; no arguments. Cedar shows it with its native input; Maple shows it in the editor candidate area. |
| footer | Menu footer |
| prefix / suffix | Input prefix / suffix |
| clear-icon | clear(event?: Event): void |
| read | value: string \| null, text: string; preserves the raw empty model |

default does not replace the input. option customizes candidates, read customizes reading content, and empty customizes the field editor with no candidates. Ordinary direct input closes the menu when no candidates match.

### AutoComplete Methods

| Method | Arguments | Returns |
| --- | --- | --- |
| focus | - | void |
| blur | - | void |
| refresh | - | `Promise<void>` |

Arrow keys reopen the popup after Escape closes it: ArrowDown activates the first enabled candidate and ArrowUp the last, without committing the model; Enter selects. Composition, canceled keyboard events, readonly/disabled and should-open conditions are respected; Tab retains native focus navigation. Vue useId provides stable SSR identifiers. While candidates are open, aria-controls links the input to the list; the reference is removed on close. When virtualization unmounts the active item, its reference is temporarily removed and restored after remounting.

## Types

```ts
import type {
  AutoCompleteFieldNames,
  AutoCompleteFilterOption,
  AutoCompleteInstance,
  AutoCompleteOption,
  AutoCompleteOptionData,
  AutoCompleteOptionInfo,
  AutoCompleteProps,
} from '@maple-design/ui-vue'
```

### Type imports

Root and component entries export `AutoCompleteEmits`、`AutoCompleteSlots`、`AutoCompleteExpose` alongside Props and Instance. Emits are event argument tuples derived from the runtime validators; Expose contains focus/blur.

`case-sensitive` only makes built-in local filtering `case-sensitive`: `ap` matches `Apple` when false, but not when true. It does not require choosing an option or validate the value. A custom `filterOption` takes priority; `filterOption=false` disables local filtering and makes `case-sensitive` irrelevant.

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

## Loading options through a function prop

Pass options(query, { signal }) directly; useAsyncData is unnecessary. options still accepts arrays, and an explicit array, including [], takes precedence. The component manages loading, stale-result isolation and cancellation. load-error reports failures, and the instance refresh() method retries. A business loader may accept only query and ignore the second argument.

AutoComplete text input always supports searching; filter-option only controls local matching and does not issue requests. Explicit options loaders disable secondary local filtering by default; arrays enable it. Business code usually does not need filter-option.

```vue
<mp-auto-complete v-model="text" :options="loadSuggestions" />
```

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omission preserves the existing default. The UI displays null as blank without converting ordinary empty-string input to null. In confirmation mode, clearing changes the draft and confirm commits it; without confirmation, clearing commits directly.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

Refresh can retry the component-owned asynchronous option source before the editor opens, using the existing AbortSignal, loading, and load-error protocol without opening the editor; static arrays do not create extra requests.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-auto-complete-option-bg-default` | `var(--mp-select-popup-option-bg)` | `background-color` |
| `--mp-auto-complete-option-bg-disabled` | `var(--mp-select-popup-option-bg-disabled)` | `background-color` |
| `--mp-auto-complete-option-bg-hover` | `var(--mp-select-popup-option-bg-hover)` | `background-color` |
| `--mp-auto-complete-option-bg-selected` | `var(--mp-select-popup-option-bg-selected)` | `background-color` |
| `--mp-auto-complete-option-font-weight-selected` | `var(--mp-select-popup-option-font-weight-selected)` | `font-weight` |
| `--mp-auto-complete-option-height` | `var(--mp-select-popup-option-height)` | `line-height` |
| `--mp-auto-complete-option-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` | `padding-inline` |
| `--mp-auto-complete-option-text-color-default` | `var(--mp-select-popup-option-text-color)` | `color` |
| `--mp-auto-complete-option-text-color-disabled` | `var(--mp-select-popup-option-text-color-disabled)` | `color` |
| `--mp-auto-complete-option-text-color-hover` | `var(--mp-select-popup-option-text-color-hover)` | `color` |
| `--mp-auto-complete-option-text-color-selected` | `var(--mp-select-popup-option-text-color-selected)` | `color` |
| `--mp-auto-complete-popup-bg` | `var(--mp-select-popup-bg)` | `background-color` |
| `--mp-auto-complete-popup-border-color` | `var(--mp-select-popup-border-color)` | `border` |
| `--mp-auto-complete-popup-border-radius` | `var(--mp-select-popup-border-radius)` | `border-radius` |
| `--mp-auto-complete-popup-box-shadow` | `var(--mp-select-popup-box-shadow)` | `box-shadow` |
| `--mp-auto-complete-popup-font-size` | `var(--mp-select-popup-font-size)` | `font-size` |
| `--mp-auto-complete-popup-max-height` | `var(--mp-select-popup-max-height)` | `max-height` |
| `--mp-auto-complete-popup-padding-vertical` | `var(--mp-select-popup-padding-vertical)` | `padding-block` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-auto-complete-option-padding-horizontal: var(--mp-select-popup-option-padding-horizontal);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
