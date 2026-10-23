# Search

## Examples

### Intro

Search is used to enter keywords and trigger queries in lists, result pages, or top toolbars. It includes a search icon, clear button, and optional cancel action.

### Basic Usage

```demo
../example/demos/en-US/basic.vue
```

### States

```demo
../example/demos/en-US/state.vue
```

### Cancel Button

```demo
../example/demos/en-US/action.vue
```

### Search Button

```demo
../example/demos/en-US/search-button.vue
```

### Search History

Persistence is application-owned; save `result.recentSearches` from the `search` event when needed.

```demo
../example/demos/en-US/history.vue
```

### Field Select

```demo
../example/demos/en-US/fields.vue
```

### Search Shape

```demo
../example/demos/en-US/shape.vue
```

### Interaction states

Use this example for keyword input and search submission. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### History presentation and slots

```demo
../example/demos/en-US/presentation.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop                       | Description                                        | Type                      | Default    |
| -------------------------- | -------------------------------------------------- | ------------------------- | ---------- |
| `v-model`                  | Search keyword                                     | _string_                  | `-`        |
| `default-value`            | Uncontrolled default keyword                       | _string_                  | `''`       |
| `v-model:model-field`      | Current search field                               | _string_                  | `-`        |
| `default-field`            | Uncontrolled default field                         | _string_                  | `-`        |
| `v-model:model`            | Object updated by field in field-search mode       | _Record<string, unknown>_ | `-`        |
| `fields`                   | Search field options                               | _SearchField[]_           | `[]`       |
| `select-style`             | Field selector style                               | _StyleValue_              | `-`        |
| `recent-searches`          | Controlled search history                          | _string[]_                | `[]`       |
| `max-search-history-count` | Maximum items in the next history list             | _number_                  | `5`        |
| `history-popup`            | Whether to show history in a full-screen Popup     | _boolean_                 | `true`     |
| `search-button`            | Whether to show the shared search button           | _boolean_                 | `false`    |
| `button-text`              | Shared search button text                          | _string_                  | `-`        |
| `button-props`             | Shared search button props                         | _ButtonProps_             | `-`        |
| `loading`                  | Loading state; submission is blocked while loading | _boolean_                 | `false`    |
| `clearable`                | Whether the value can be cleared                   | _boolean_                 | `false`    |
| `variant`                  | Input variant: `filled`, `outline`, or `standard`  | _string_                  | `outline`  |
| `size` | Input size inherited from Form / ConfigProvider | `xs / sm / md / lg / xl` | `md` |
| `placeholder`              | Placeholder                                        | _string_                  | `-`        |
| `disabled`                 | Whether Search is disabled                         | _boolean_                 | `false`    |
| `readonly`                 | Whether Search is readonly                         | _boolean_                 | `false`    |
| `label`                    | Left label                                         | _string_                  | `-`        |
| `shape`                    | Inner field shape: `round` or `square`             | _string_                  | `round`    |
| `background`               | Outer background color                             | _string_                  | `-`        |
| `input-background`         | Inner field background color                       | _string_                  | `-`        |
| `show-action`              | Whether to show the mobile action                  | _boolean_                 | `false`    |
| `action-text` | Action text | `string` | Global locale for action-type |
| `action-type`              | Action type: `cancel` or `search`           | _string_                  | `cancel`   |
| `search-icon`              | Search icon name                                   | _string_                  | `magnify`  |
| `max-length`               | Maximum length                                     | _string \| number_        | `-`        |
| `enterkeyhint`             | Virtual keyboard Enter hint                        | _string_                  | `search`   |

### Events

| Event               | Description                                              | Arguments                            |
| ------------------- | -------------------------------------------------------- | ------------------------------------ |
| `update:modelValue` | Emitted when the keyword updates                         | `value: string`                      |
| `update:modelField` | Emitted when the field updates                           | `field: string`                      |
| `update:model`      | Emitted when the field model updates                     | `model: Record<string, unknown>`     |
| `input`             | Emitted during live editing                              | `value: string, event: Event`        |
| `change`            | Emitted on blur, Enter commit, or field change           | `value: string, event: Event`        |
| `clear`             | Emitted when clearing                                    | `event: Event`                       |
| `search`            | Emitted by the icon, button, Enter, or history selection | `result: SearchResult, event: Event` |
| `focus`             | Emitted on focus                                         | `event: FocusEvent`                  |
| `blur`              | Emitted on blur                                          | `event: FocusEvent`                  |
| `cancel`            | Emitted by the mobile cancel action                      | `event: Event`                       |

### Slots

| Name             | Description                                    | Scope       |
| ---------------- | ---------------------------------------------- | ----------- |
| `prefix`         | Input prefix; replaces the default search icon | `-`         |
| `suffix`         | Input suffix                                   | `-`         |
| `clear-icon`     | Clear icon                                     | `{ clear }` |
| `button-default` | Shared search button content                   | `-`         |
| `button-icon`    | Shared search button icon                      | `-`         |
| `label`          | Left label                                     | `-`         |
| `action`         | Action content                          | `-`         |

### Methods

| Method  | Description     | Arguments | Return |
| ------- | --------------- | --------- | ------ |
| `focus` | Focus the input | `-`       | `-`    |
| `blur`  | Blur the input  | `-`       | `-`    |

### SearchField

| Prop          | Description                                       | Type     |
| ------------- | ------------------------------------------------- | -------- |
| `label`       | Field label                                       | _string_ |
| `value`       | Field value                                       | _string_ |
| `placeholder` | Field placeholder; overrides Search `placeholder` | _string_ |

### SearchResult

| Prop             | Description         | Type                                   |
| ---------------- | ------------------- | -------------------------------------- |
| `modelField`     | Search field        | _string \| undefined_                  |
| `modelValue`     | Raw search keyword  | _string_                               |
| `model`          | Field model object  | _Record<string, unknown> \| undefined_ |
| `recentSearches` | Next search history | _string[]_                             |

Input event contract: editing emits `input` before `update:modelValue`; committing on blur emits `change` only for a changed value. Clearing emits `clear → input → update:modelValue → change` once, updates the search field model once, and does not submit a search.

Input notifications precede model updates. Enter waits for the Input commit and accepted controlled model before constructing its search result; rejected trim proposals do not replace the actual controlled value. Clear emits clear → input → update:modelValue → change without submitting a search.

## Controlled model contract

Value precedence is `modelValue` > `model[currentField]` > uncontrolled `defaultValue`. A missing/null field in a supplied model renders an empty string. Keep multiple controlled bindings consistent in the parent. `modelField` takes precedence over `defaultField` and the first field.

The supplied model is **never mutated**. Each logical edit emits a fresh `update:model` proposal, clears other declared fields, and preserves unrelated keys. Bind with `v-model:model` or explicitly accept proposals. Switching fields emits one `update:modelField → update:modelValue → update:model → change` sequence. Enter, button and history search wait for the parent update, then report the actual accepted field, value and model—not rejected proposals.

History is neither filtered by input nor persisted internally. The returned history is trimmed, emptied entries removed, deduplicated and bounded. Empty keywords do not add records; negative/non-finite limits produce an empty list. Clear never searches. Cancel proposes an empty value and emits cancel/change without searching.

Editing emits `input → update:modelValue`; changed commits emit `change`. Clear emits `clear → input → update:modelValue → change` once. Disabled, readonly and loading block search, cancel, history and field actions. Form / FormItem / InputGroup state is inherited. Deactivation or unmount cancels pending asynchronous search.

### Platform boundaries

The controller, public API and history content are independently copied. Cedar defaults to `historyPopup=false, shape=square`; Maple defaults to `historyPopup=true, shape=round`. Fullscreen history uses local Drawer / Popup instances. Desktop InputGroup and mobile search-bar layout/touch spacing remain independent. Input supports `xs/sm/md/lg/xl`; outer bar density is configured by Search tokens rather than scaled by size.

### Public types

`SearchProps`, `SearchEmits`, `SearchSlots`, `SearchExpose`, `SearchField`, `SearchResult`.

### Input forwarding

Explicit Input props include `modelModifiers`, `type`, `ariaLabel`, `placeholder`, `maxLength`, `readonly`, `disabled`, `autofocus`, `enterkeyhint`, `textColor`, `focusColor`, `blurColor`, `size`, `variant`, `clearable`, `inputAttrs` and `error`. `inputAttrs` carries native name/autocomplete/ARIA attributes to both outer and fullscreen Input; `error` overrides inherited error state. Search actions, popup cancellation and dialog labels follow the global locale. Programmatic cancel, field and history selection notify Form change once; native edits retain the Input event pipeline.
