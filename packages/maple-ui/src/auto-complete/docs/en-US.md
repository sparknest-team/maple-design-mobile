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

## Appearance and states

### Appearance configuration comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                                                  | Related examples                    |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------- |
| `options`     | Suggestions, including groups; unique values become strings on selection | Appearance configuration comparison |
| `clearable`   | Allow clearing a nonempty editable value                                 | Appearance configuration comparison |

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

| Configuration    | Purpose                                                                  | Related examples                                       |
| ---------------- | ------------------------------------------------------------------------ | ------------------------------------------------------ |
| `options`        | Suggestions, including groups; unique values become strings on selection | Opening and filtering, Case sensitivity, Group spacing |
| `placeholder`    | Placeholder or floating hint text                                        | Opening and filtering, Case sensitivity, Group spacing |
| `should-open`    | Opening policy; does not filter candidates                               | Opening and filtering, Group spacing, Virtual list     |
| `filter-option`  | Filter by label; false for remote filtering                              | Opening and filtering                                  |
| `case-sensitive` | Case-sensitive built-in matching                                         | Case sensitivity                                       |
| `trigger-props`  | Trigger configuration; cannot override owned opening and disabled state  | Group spacing                                          |

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

| Configuration | Purpose                                                                  | Related examples                          |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| `options`     | Suggestions, including groups; unique values become strings on selection | Field names and slots, Variants and hints |
| `placeholder` | Placeholder or floating hint text                                        | Field names and slots, Variants and hints |
| `field-names` | Map value, label, disabled and other fields                              | Field names and slots                     |
| `variant`     | Input variant; inherits Group when unset                                 | Variants and hints                        |
| `hint`        | Enable Input floating hint                                               | Variants and hints                        |
| `clearable`   | Allow clearing a nonempty editable value                                 | Variants and hints                        |

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

| Configuration | Purpose                                                                  | Related examples                                         |
| ------------- | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| `options`     | Suggestions, including groups; unique values become strings on selection | Interaction state comparison, Keyboard and accessibility |
| `clearable`   | Allow clearing a nonempty editable value                                 | Interaction state comparison                             |
| `disabled`    | Disabled; inherited when unset, explicit false overrides                 | Interaction state comparison                             |
| `readonly`    | Readonly; focus/copy allowed, suggestions stay closed                    | Interaction state comparison                             |
| `error`       | Error state; inherits FormItem when unset                                | Interaction state comparison                             |
| `input-attrs` | Native input attributes; combobox state is owned by the component        | Keyboard and accessibility                               |

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

| Configuration   | Purpose                                                                  | Related examples                                   |
| --------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| `options`       | Suggestions, including groups; unique values become strings on selection | Async suggestions, Typed passthrough configuration |
| `filter-option` | Filter by label; false for remote filtering                              | Async suggestions                                  |
| `placeholder`   | Placeholder or floating hint text                                        | Async suggestions                                  |
| `disabled`      | Disabled; inherited when unset, explicit false overrides                 | Typed passthrough configuration                    |
| `should-open`   | Opening policy; does not filter candidates                               | Typed passthrough configuration                    |
| `trigger-props` | Trigger configuration; cannot override owned opening and disabled state  | Typed passthrough configuration                    |

<!-- demo-config-notes:end -->

```demo
../example/demos/en-US/remote.vue
```

### Typed passthrough configuration

Use `AutoCompleteTriggerOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. AutoComplete visibility is internal, driven by focus/input and shouldOpen; it has no public open/defaultOpen/update:open API. Disabled state belongs to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

```demo
../example/demos/passthrough-options.vue
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

### Props

| Prop                 | Description                                                              | Type                                                                                     | Default                                                      |
| -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `model-value`        | Controlled text                                                          | `string`                                                                                 | `—`                                                          |
| `default-value`      | Initial uncontrolled text                                                | `string`                                                                                 | `''`                                                         |
| `options`            | Suggestions, including groups; unique values become strings on selection | `(AutoCompleteOption \| SelectOptionGroup)[]` / `(query, { signal }) => Array / Promise` | `undefined`                                                  |
| `field-names`        | Map value, label, disabled and other fields                              | `AutoCompleteFieldNames`                                                                 | `—`                                                          |
| `should-open`        | Opening policy; does not filter candidates                               | `(value: string) => boolean`                                                             | `value.length > 0`                                           |
| `filter-option`      | Filter by label; false for remote filtering                              | `AutoCompleteFilterOption`                                                               | Automatic: enabled for arrays, disabled for loader functions |
| `case-sensitive`     | Case-sensitive built-in matching                                         | `boolean`                                                                                | `false`                                                      |
| `popup-container`    | Popup container; same contract as Trigger                                | `PopupContainer`                                                                         | `—`                                                          |
| `trigger-props`      | Trigger configuration; cannot override owned opening and disabled state  | `TriggerProps`                                                                           | `—`                                                          |
| `virtual-list-props` | Enable and configure virtual scrolling                                   | `VirtualListProps`                                                                       | `—`                                                          |
| `size`               | Five sizes; inherit Group / Form / global configuration when unset       | `xs \| sm \| md \| lg \| xl`                                                             | `md`                                                         |
| `variant`            | Input variant; inherits Group when unset                                 | `filled \| outline \| standard`                                                          | `outline`                                                    |
| `disabled`           | Disabled; inherited when unset, explicit false overrides                 | `boolean`                                                                                | `undefined`                                                  |
| `readonly`           | Readonly; focus/copy allowed, suggestions stay closed                    | `boolean`                                                                                | `undefined`                                                  |
| `error`              | Error state; inherits FormItem when unset                                | `boolean`                                                                                | `undefined`                                                  |
| `clearable`          | Allow clearing a nonempty editable value                                 | `boolean`                                                                                | `false`                                                      |
| `placeholder`        | Placeholder or floating hint text                                        | `string`                                                                                 | `—`                                                          |
| `hint`               | Enable Input floating hint                                               | `boolean`                                                                                | `undefined`                                                  |
| `line`               | Show border or underline                                                 | `boolean`                                                                                | `true`                                                       |
| `text-color`         | Instance text color                                                      | `string`                                                                                 | `—`                                                          |
| `focus-color`        | Instance focus color                                                     | `string`                                                                                 | `—`                                                          |
| `blur-color`         | Instance unfocused hint color                                            | `string`                                                                                 | `—`                                                          |
| `enterkeyhint`       | Virtual keyboard action hint                                             | `InputHTMLAttributes['enterKeyHint']`                                                    | `—`                                                          |
| `aria-label`         | Accessible input name                                                    | `string`                                                                                 | `—`                                                          |
| `max-length`         | Same length normalization for typing and selecting                       | `number \| { length: number; errorOnly?: boolean }`                                      | `0`                                                          |
| `show-word-limit`    | Display word count                                                       | `boolean`                                                                                | `false`                                                      |
| `word-length`        | Custom length calculation                                                | `(value: string) => number`                                                              | `—`                                                          |
| `word-slice`         | Custom slicing                                                           | `(value: string, maxLength: number) => string`                                           | `—`                                                          |
| `input-attrs`        | Native input attributes; combobox state is owned by the component        | `Record<string, unknown>`                                                                | `—`                                                          |

### Events

| Event                                     | Arguments                                                     |
| ----------------------------------------- | ------------------------------------------------------------- |
| `update:model-value`                      | `value: string`                                               |
| `input / search / change`                 | `value: string, event: Event`                                 |
| `select`                                  | `value: string, option: AutoCompleteOptionInfo, event: Event` |
| `clear`                                   | `event: Event`                                                |
| `focus / blur`                            | `event: FocusEvent`                                           |
| `dropdown-scroll / dropdown-reach-bottom` | `event: Event`                                                |

Typing: `input → update:modelValue → search`; selection: `update:modelValue → select → change`; clear: `clear → input → update:modelValue → change`. Selecting the same value emits only select. change is a commit on blur, Enter or selection. Input owns typing/focus/clear Form notifications; AutoComplete notifies Form once for suggestion commits. Selection applies maxLength; select.value is the committed string, while option.value retains the original suggestion. clear receives an event, not a string.

### Slots

| Slot              | Description                        |
| ----------------- | ---------------------------------- |
| `option`          | `{ data: AutoCompleteOptionInfo }` |
| `footer`          | Menu footer                        |
| `prefix / suffix` | Input prefix / suffix              |
| `clear-icon`      | `{ clear }`                        |

### Methods

`focus()` / `blur()`

label is text. Use the option slot or an option render function for complex candidates; function/VNode labels are not supported. Arrow keys browse, Enter selects, Escape closes, and Tab retains native focus navigation. Vue useId keeps SSR identifiers stable.

## Type definitions

```ts
import type {
  AutoCompleteFieldNames,
  AutoCompleteFilterOption,
  AutoCompleteInstance,
  AutoCompleteOption,
  AutoCompleteOptionData,
  AutoCompleteOptionInfo,
  AutoCompleteProps,
} from '@maple-design/ui'
```

## Style variables

| Token                                            | Default                                              |
| ------------------------------------------------ | ---------------------------------------------------- |
| `--mp-auto-complete-popup-max-height`            | `var(--mp-select-popup-max-height)`                  |
| `--mp-auto-complete-popup-bg`                    | `var(--mp-select-popup-bg)`                          |
| `--mp-auto-complete-popup-border-radius`         | `var(--mp-select-popup-border-radius)`               |
| `--mp-auto-complete-popup-padding-vertical`      | `var(--mp-select-popup-padding-vertical)`            |
| `--mp-auto-complete-popup-font-size`             | `var(--mp-select-popup-font-size)`                   |
| `--mp-auto-complete-popup-border-color`          | `var(--mp-select-popup-border-color)`                |
| `--mp-auto-complete-popup-box-shadow`            | `var(--mp-select-popup-box-shadow)`                  |
| `--mp-auto-complete-option-height`               | `var(--mp-select-popup-option-height)`               |
| `--mp-auto-complete-option-font-weight-selected` | `var(--mp-select-popup-option-font-weight-selected)` |
| `--mp-auto-complete-option-padding-horizontal`   | `var(--mp-select-popup-option-padding-horizontal)`   |
| `--mp-auto-complete-option-bg-default`           | `var(--mp-select-popup-option-bg)`                   |
| `--mp-auto-complete-option-bg-hover`             | `var(--mp-select-popup-option-bg-hover)`             |
| `--mp-auto-complete-option-bg-selected`          | `var(--mp-select-popup-option-bg-selected)`          |
| `--mp-auto-complete-option-bg-disabled`          | `var(--mp-select-popup-option-bg-disabled)`          |
| `--mp-auto-complete-option-text-color-default`   | `var(--mp-select-popup-option-text-color)`           |
| `--mp-auto-complete-option-text-color-hover`     | `var(--mp-select-popup-option-text-color-hover)`     |
| `--mp-auto-complete-option-text-color-selected`  | `var(--mp-select-popup-option-text-color-selected)`  |
| `--mp-auto-complete-option-text-color-disabled`  | `var(--mp-select-popup-option-text-color-disabled)`  |

Clearing does not emit search or reopen candidates, including when focus returns from a keyboard-focused clear button to the input. The parent controls the value: each rejected clear or selection still emits a change proposal; an accepted candidate selection notifies Form once.

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `popup` and opens an editor when the value area is clicked. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

Asynchronous search should clear old candidates when requests start and accept only the latest response for the current query. Popup arrows/Enter operate only current candidates; the bottom confirm button saves. Failed validation preserves drafts. Confirmation locks editing/closing; Form reset closes Popup and aborts submission. Closing/reset invalidates request ownership. See Form's unified field-presentation examples.

Suggestions share Select’s list, group, selected and disabled styles. AutoComplete style variables follow the corresponding Select variables by default. In `inline` mode, the list opens below the input and follows scrolling; use `trigger-props` to explicitly change placement or enable automatic flipping. In `popup` mode, candidates use the same full editor surface as Select.

### Public type exports

Root and component entries export `AutoCompleteEmits`、`AutoCompleteSlots`、`AutoCompleteExpose` alongside Props and Instance. Emits are event argument tuples derived from the runtime validators; Expose contains focus/blur.

`case-sensitive` only makes built-in local filtering `case-sensitive`: `ap` matches `Apple` when false, but not when true. It does not require choosing an option or validate the value. A custom `filterOption` takes priority; `filterOption=false` disables local filtering and makes `case-sensitive` irrelevant.

### Migrating strict / Migration

The old `strict` prop is removed. Use `case-sensitive` (`caseSensitive` in TypeScript) instead; boolean meanings and the default false remain unchanged. This removal is marked for the next major release, without a compatibility alias.

### Built-in search fields

`searchFields` / `search-fields` is a readonly `('label' | 'value')[]`, defaulting to `['label']`. Multiple fields use OR matching, case-insensitive by default. `['value', 'label']` searches codes and names; fieldNames maps semantic fields to business fields. An empty array matches no items for a nonempty query. Values are compared as strings; object traversal, object values and pinyin matching require a custom callback. A custom callback takes precedence and decides case handling itself. Remote results use the existing protocol for disabling local filtering. Cascader retains path semantics and checks the configured fields on each path node.

## Configuring the cleared value

`empty-value` / `emptyValue` configures the model value produced by clearing. It accepts a value in the component model type, null, or a zero-argument factory. Omitting it preserves the existing default. Use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on each clear; selected items that cannot be cleared remain. It does not redefine empty values, change Form reset defaults, or treat 0/false as universally empty.
Text and person-ID models remain strings; use an empty string or a business-defined string sentinel.

## Loading options through a function prop

Pass options(query, { signal }) directly; useAsyncData is unnecessary. options still accepts arrays, and an explicit array, including [], takes precedence. The component manages loading, stale-result isolation and cancellation. load-error reports failures, and the instance refresh() method retries. A business loader may accept only query and ignore the second argument.

filterable enables entering a search query. filterOption controls only local matching and never sends requests. With an options loader, remote results are not filtered again by default; with only an array, local matching is enabled by default. Most callers do not need filter-option.

```vue
<mp-auto-complete v-model="text" :options="loadSuggestions" />
```

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
