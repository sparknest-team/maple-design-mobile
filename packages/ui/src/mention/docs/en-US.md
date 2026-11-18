# Mention

Text input with mention suggestions supplied by the application.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

### Atomic mentions and display fallback

With `atomic`, selected mentions are edited and deleted as units. The model stores identity as `@[encoded ID]`. Supply unresolved names synchronously through `fallback-option`; the component does not request display data. Atomic values support strings, finite numbers and booleans with their types preserved; object values are unsupported. Literal `@[` and backslashes are escaped. `atomic` is off by default, so existing plain text is not automatically reinterpreted.

For example, string ID `shuai.meng` is stored as `@[shuai.meng]`; numeric `0` is `@[!n:0]`, distinct from string `@[0]`. A non-`@` prefix is encoded as well: a `##` mention of `topic` is `@[%23%23|topic]`. Labels resolve from current options, then `fallback-option`, then the component's selected-item cache, and finally the original value. The per-instance cache is shared by editing and read-pretty presentations, and entries are removed when mentions are removed. Applications must still supply names for unresolved initial values and own data requests and persistent storage.

Local candidates are matched case-insensitively against both `value` and `label`. For example, typing `@xiaoming` or `@小明` finds the same candidate; choosing it displays `@小明` and stores `@[xiaoming]`. In atomic mode, when there are no candidates, Enter also creates a mention if `fallback-option` returns an object for the typed ID. Unconfirmed text is not converted. Remote loaders receive the query and their results are not filtered again locally. During requests the field and suggestion dropdown show loading feedback; stale responses cannot replace the latest results.

```demo
../example/demos/atomic-mention.vue
```

After confirming a mention, a space is added unless whitespace already follows; the space is part of the saved value. Mention text uses the primary brand foreground without a background.

## Data and options

### Filtering and async search

With a local array, type `@小` or `@xiaoming` to match a name or ID. The async example passes the query to application code and shows loading in the dropdown. Quickly change `@xi` to `@lisi` to see only the latest result. It uses mock data; a real loader can pass `signal` to `fetch`.

```demo
../example/demos/search-options.vue
```

### Async search and read-pretty display

Type `@xiaoming` and select the person, then search for `@lisi`. The selected name remains visible in read-pretty mode and when returning to the editor; the model retains its ID. This example uses a mock request for candidates and `fallback-option` for the initial ID.

```demo
../example/demos/async-read-pretty.vue
```

### Restore saved values asynchronously

This example simulates saving the model in memory, remounts the component, then loads names asynchronously. IDs appear while loading; the synchronous `fallback-option` resolves names when data arrives without changing the saved value. Applications own persistence and fetching display data by ID.

```demo
../example/demos/async-fallback-restore.vue
```

## Customization and slots

### Prefix

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| -------- | -------------------- | -------------- |
| `options` | Data for automatic completion | Prefix |
| `prefix` | Keywords that trigger auto-completion | Prefix |

<!-- demo-config-notes:end -->


- `options`: Data for automatic completion
- `prefix`: Keywords that trigger auto-completion

```demo
../example/demos/prefix.vue
```

## Lifecycle and edge cases

### Mirror Lifecycle

```demo
../example/demos/mirror-lifecycle.vue
```

## Loading and waiting

### Controlled loading

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `loading` | Explicit business loading state | `boolean` | `false` |


Set loading explicitly to display feedback. Ordinary event return values do not drive loading. Before hooks retain their documented pending behavior.

```demo
../example/demos/loading.vue
```

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](/en/guide/empty-values/).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Mention Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value (v-model) | Controlled text; null displays as empty | string \| null | undefined |
| atomic | Enable encoded, indivisible mentions | boolean | false |
| fallback-option | Synchronously resolve an unmatched ID for display | `(value: string \| number \| boolean) => SelectOptionData \| null \| undefined` | undefined |
| default-value | Initial uncontrolled text | string | '' |
| options | Candidate array or explicit loader, including nested groups | readonly (string \| number \| SelectOptionData \| SelectOptionGroup)[] \| ((query: string, context: { signal: AbortSignal }) => Array \| `Promise<Array>`) | undefined |
| min-search-length | Minimum number of characters required to start searching | number | 0 |
| search-delay | Remote search debounce delay in milliseconds | number | 0 |
| auto-commit-single | Automatically commit the sole enabled result | boolean | false |
| prefix | Trigger prefix; supports multiple characters and multiple prefixes | string \| string[] | '@' |
| split | Separator before and after a mention | string | ' ' |
| type | Input presentation | input \| textarea | input |
| disabled | Inherit Form when omitted; explicit false overrides it | boolean | undefined |
| readonly | Inherit Form when omitted; explicit false overrides it | boolean | undefined |
| clearable | Allow clearing text or the editor draft | boolean | false |
| loading | Manual waiting feedback; does not implicitly disable text editing | boolean | false |
| edit-mode | Editing mode, inherited from FormItem and Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | Independent read presentation; explicit false overrides the parent | `boolean` | `false` |
| empty-value | Clear output; explicit null is submitted unchanged | `string \| null \| (() => string \| null)` | `''` |
| empty-values | Empty-value recognition; field takes precedence over FormItem and Form | `readonly unknown[]` | `-` |
| empty-text | Read empty text; an explicit empty string is valid | `string` | `'-'` |
| before-commit | Guard before saving a deferred edit; return a boolean or Promise, or complete via done | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | Controlled editor visibility, separate from native input focus | `boolean` | `-` |
| default-open | Initial visibility of an uncontrolled editor | `boolean` | `false` |
| popup-container | Editor mount container | `string \| HTMLElement \| false` | `-` |

### Mention Events

| Event | Description and arguments |
| --- | --- |
| update:modelValue | value: string \| null |
| change | value: string \| null; no native Event argument |
| search | query: string, prefix: string |
| select | value: SelectOptionValue \| undefined; from the actual leaf candidate |
| clear | event: Event |
| focus / blur | event: FocusEvent |
| load-error | error: unknown; preserves the original loader error |
| update:open / open-change | open: boolean; field editor only |

options is an explicit loader. search, change, select and load-error only notify; listener Promises are not collected. Direct input emits update:modelValue / change, and selection emits select / update:modelValue / change. Deferred editing updates a draft and submits the final model on confirmation.

### Mention Methods

| Method | Description | Returns |
| --- | --- | --- |
| focus | Focus the current target; deferred mode follows the field editing protocol | void |
| blur | Blur the current target without opening the editor | void |
| refresh | Retry the current options query with cancellation and failure handling, without opening the editor; static arrays issue no request | `Promise<void>` |

### Mention Slots

| Slot | Description and arguments |
| --- | --- |
| option | Candidates in both input presentations; data: SelectOptionInfo, including key, raw, value and label |
| read | Reading content in both input presentations; value: string \| null, text: string |
| prefix / suffix | Input prefix and suffix for type=input only |
| clear-icon | Clear node in both input presentations; clear(event?: Event): void |

clear-icon replaces the entire clear node. A custom node must call clear and provide an accessible button. There is no default input replacement, empty or loader-error slot; option does not replace the field input.

## Types

The component exports the following types

```ts
import type { MentionProps, MentionInstance, MentionEmits, MentionSlots, MentionExpose } from "@maple-design/ui-vue";
```

Mention reuses Input/Textarea typography and spacing; its measurement mirror copies computed native input styles. Override the corresponding input variables. 

### Editing and confirmation

Maple uses edit-mode="popup" to open an editor popup near the field. Enter/F2 also opens it; cancel/Escape discards the draft, and confirmation commits it. readPretty is an independent reading setting, separate from readonly and disabled.

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

The `options` prop accepts an array or `(query, { signal }) => array/Promise`. The component manages loading, cancellation and stale-result isolation; failures emit load-error. Single/multiple groups initialize with an empty-string query, searchable fields reload when the query changes, and root loading for tree fields remains independent of existing load-more child loading.

Both input and textarea show manual loading and waiting for the current explicit options loader. Displaying waiting does not disable editing. A search notification's returned Promise does not start a task. An old options request cannot clear a newer request's indicator, and load-error preserves the original error.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

### Mention ranges and grouped options

prefix accepts single characters, multiple characters and arrays of strings. Selection replaces only the matched prefix and query before the caret, preserving the trailing text; the textarea mirror uses the matched prefix. Nested option groups render nonselectable titles and only leaves may be selected; disabled leaves do not submit. The option slot receives normalized candidates, including the valid identities zero and empty string.

### Candidate feedback and instance boundaries

Explicit options loading appears in the current Input/Textarea field, whose native input announces aria-busy. Manual loading combines with request loading and text remains editable. With no available candidates the mention menu stays closed. Failure ends current waiting and emits the original load-error; business code chooses error presentation. Error strings are not inserted into candidates or text. refresh waits for one read attempt; failures notify through load-error without awaiting error-listener Promises.

disabled/readonly pause requests; deactivation, unmount and stale responses cannot update data. refresh may read while the field editor is closed without opening it. The candidate menu belongs to the internal input; public open/default-open controls only the deferred field editor. MentionProps, MentionEmits, MentionSlots and MentionExpose are exported consistently from root and mention subentries; MeasureInfo remains internal measurement state.

Mention is available in both Cedar and Maple.

### Input and candidate relationships

input uses combobox, while textarea retains a multiline textbox. Both link to the actual listbox and active candidate with aria-autocomplete, aria-controls and aria-activedescendant. Closing suggestions or making the field readonly removes active references; arrow navigation keeps DOM focus in the native input.

Follow-up acceptance testing (not yet completed): use real screen readers, such as VoiceOver and NVDA, with supported browsers to verify spoken names when atomic mentions are initialized, suggestion navigation and selection, editing, and deletion of an entire mention.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-mention-token-color` | `var(--mp-sys-color-content-brand)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-mention-token-color: var(--mp-sys-color-content-brand);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
