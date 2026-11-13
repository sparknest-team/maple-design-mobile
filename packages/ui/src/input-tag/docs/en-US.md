# InputTag

Editable tag values with controlled array models. FormItem error messages are associated with the input alongside any existing `aria-describedby`.

## Reading direction

Tags follow reading order while their source array stays unchanged. With empty input, Backspace removes the last closable value; Enter adds a tag. Composition does not submit or delete tags.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## Appearance and states

### Tag input size and state

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | -------------------- | ------------------ |
| `default-value` | Default value (uncontrolled state) | Tag input size and state |
| `placeholder` | Placeholder | Tag input size and state |
| `size` | The size of the input | Tag input size and state |
| `clearable` | Enables the clear action | Tag input size and state |
| `disabled` | Whether disabled | Tag input size and state |
| `readonly` | Whether it is read-only mode | Tag input size and state |

<!-- demo-config-notes:end -->


Compare sizes and disabled, read-only or error appearance while keeping the empty-value protocol separate.

```demo
../example/demos/appearance-state-comparison.vue
```

## Content and presentation

### Max

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ---------------------------------- | ---------------- |
| `default-value` | Default value (uncontrolled state) | Max |
| `placeholder` | Placeholder | Max |
| `max-tag-count` | The maximum number of tags displayed, `0` means unlimited | Max |
| `clearable` | Enables the clear action | Max |

<!-- demo-config-notes:end -->


- `default-value`: Default value (uncontrolled state)
- `placeholder`: Placeholder
- `max-tag-count`: The maximum number of tags displayed, `0` means unlimited
- `clearable`: Whether to allow clear

```demo
../example/demos/max.vue
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

### Paste a link and fetch its title

Paste a URL or type one and press Enter to simulate fetching its title. The input displays a loading state while waiting. The model contains only URLs; `fallback-option` reads titles from reactive application data. Submit displays the URL data without sending a request.

```demo
../example/demos/link-title.vue
```

### Field state and native input

Unset disabled, readonly and error inherit from FormItem / Form. InputGroup supplies disabled, readonly, size and variant; explicit field values, including false, take precedence. The standalone variant defaults to outline. Deferred editors follow the same state and discard their draft when disabled or readonly.

Native id, name, aria/data attributes, constraints and keyboard listeners belong to the actual input; class/style stay on the shell. The name submits the separate input draft, not the tag array. Controlled input drafts restore the accepted value. Composition publishes once and canceled sessions cannot publish later.

Manual loading supports loading-mode="default" (default) or "line" and keeps the input editable. The default clear control is a named native button. The clear-icon slot receives clear(event?) for a custom control. Clearing tags preserves the separate input draft and retains the update:modelValue, change, clear notification order. The clear event accepts Event, including custom control events; a programmatic deferred change may omit its source event.

### Display labels for primitive values

Use `fallback-option` to synchronously read application-managed display data. The model contains only URLs; clicking the button simulates labels arriving without changing the model.

```demo
../example/demos/fallback-option.vue
```

### Restore saved values asynchronously

This example simulates saving the ID array in memory, remounts the component, then loads names asynchronously. IDs appear while loading; the synchronous `fallback-option` resolves names when data arrives without changing the saved values. Applications own persistence and fetching display data by ID.

```demo
../example/demos/async-fallback-restore.vue
```

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](/en/guide/empty-values/).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

`unique-value` compares normalized object and string tag values using the merged `field-names.value` mapping. Numeric `1` and string `"1"` are distinct. Duplicates remain legal by default, with a stable private identity per occurrence and a separate overflow key. Folding affects display only; it does not truncate the model.

Public Props exclude the internal composition controls `baseCls`, `focused`, `disabledInput` and `uninjectFormItemContext`. A synchronous undefined return from before-commit waits for done; ordinary change / press-enter listeners do not await Promises. A deferred change may omit its source DOM event. Clearing defaults to [], while explicit empty-value=null preserves null.

### InputTag Props

| Parameter | Description | Type | Default |
| ------------------------- | ---------------------------------- | ------------------------------------------------- | :--------: |
| model-value **(v-model)** | Bound value | `(string \| number \| TagData)[] \| null` | `-` |
| default-value | Default value (uncontrolled state) | `(string \| number \| TagData)[]` | `[]` |
| input-value **(v-model)** | The value of the input | `string` | `-` |
| default-input-value | The default value of the input (uncontrolled state) | `string` | `''` |
| placeholder | Placeholder | `string` | `-` |
| disabled | Whether disabled | `boolean` | `-` |
| error | Whether it is an error state | `boolean` | `-` |
| readonly | Whether it is read-only mode | `boolean` | `-` |
| clearable | Enables the clear action | `boolean` | `false` |
| size | The size of the input | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| variant | The variant of the input | `'filled' \| 'outline' \| 'standard'` | `'outline'` |
| max-tag-count | Finite nonnegative integer; 0 is unlimited, invalid values diagnose and fall back to unlimited display | `number` | `0` |
| retain-input-value | Whether to keep the content of the input box | `boolean \| { create?: boolean; blur?: boolean }` | `false` |
| format-tag | Format tag content | `(data: TagData) => string` | `-` |
| fallback-option | Synchronously resolve display data for primitive values; show the value when unresolved | `(value: string \| number) => TagData \| null \| undefined` | `-` |
| unique-value | Whether to create only unique values | `boolean` | `false` |
| field-names | Customize fields in `TagData` | `InputTagFieldNames` | `-` |
| tag-nowrap | Tag content does not wrap | `boolean` | `false` |

| loading | Business-controlled loading state; does not block input | `boolean` | `false` |
| loading-mode | Shared field feedback appearance, independent of Loading animation types | `'default' \| 'line'` | `'default'` |
| empty-value | Clear output; defaults to an empty array and accepts explicit null | `InputTagValue \| (() => InputTagValue)` | `[]` |
| empty-values | Empty-value recognition; field takes precedence over FormItem and Form | `readonly unknown[]` | `-` |
| empty-text | Read empty text; an explicit empty string is valid | `string` | `'-'` |
| edit-mode | Editing mode; field takes precedence over FormItem and Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | Independent read presentation; explicit false overrides the parent | `boolean` | `false` |
| before-commit | Guard before saving a deferred edit; return a boolean or Promise, or complete via done | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | Controlled editor visibility, separate from native input focus | `boolean` | `-` |
| default-open | Initial visibility of an uncontrolled editor | `boolean` | `false` |
| popup-container | Editor mount container | `string \| HTMLElement \| false` | `-` |

### InputTag Events

| Event | Description | Arguments |
| ------------------ | ------------------------ | ------------------------------------------------------- |
| update:modelValue | Tag model update proposal; deferred mode notifies after saving | value: `InputTagValue` |
| update:inputValue | Separate input draft update proposal | inputValue: `string` |
| update:open | Controlled editor visibility update | open: `boolean` |
| open-change | Actual editor visibility change | open: `boolean` |
| change | Emitted when the value changes | value: `InputTagValue`<br>ev?: `Event` |
| input-value-change | Emitted when the input value changes | inputValue: `string`<br>ev: `Event` |
| press-enter | Emitted when Enter is pressed | inputValue: `string`<br>ev: `KeyboardEvent` |
| remove | Emitted when a tag's remove button is clicked | removed: `string \| number`<br>ev: `Event` |
| clear | Emitted when the clear action is invoked | ev: `Event` |
| focus | Emitted when the input gains focus | ev: `FocusEvent` |
| blur | Emitted when the input loses focus | ev: `FocusEvent` |

### InputTag Methods

| Method | Description | Arguments | Returns |
| ------ | ---------------- | ---- | ------ |
| focus | Focus the current editor; deferred mode first opens an editable panel | - | - |
| blur | Blur the current input | - | - |

Public methods remain callable from initial component mount. Stored methods resolve the current editor on every call and never use an old input after closure, reopening, or mode changes. Native input references are undefined while no editor is mounted.

### InputTag Slots

| Slot | Description | Prop |
| ------ | :------------------: | --------------- |
| tag | Displayed input-tag content | data: `TagData` |
| prefix | Prefix content | - |
| suffix | Suffix content | - |
| clear-icon | Custom clear control | clear: `(event?: Event) => void` |
| read | Custom read content, taking precedence over empty-text | value: `InputTagValue`<br>text: `string` |

## Types

### TagData

| Parameter | Description | Type | Default |
| -------- | ---------- | ------------------ | :-----: |
| value | Tag value | `string \| number` | `-` |
| label | Tag content | `string` | `-` |
| closable | Whether closable | `boolean` | `false` |
| tagProps | Tag props | `TagProps` | `-` |

The component exports the following types

```ts
import type { InputTagProps, InputTagValue, InputTagEmits, InputTagSlots, InputTagExpose, InputTagInstance, InputTagFieldNames, TagData } from "@maple-design/ui-vue";
```

## Tags and close buttons

Tag controls tag and close-button appearance. Disabled, readonly and nonclosable tags cannot be removed with the close button.

The accessible name of each close button combines the localized close action with the displayed tag label. For custom tag slots that do not render plain text, the item label is used; set `tagProps.closeButtonAriaLabel` to provide the full name explicitly.

## InputTag wrapper and content responsibilities

InputTag uses FieldDecorator variables for its outline, filled and standard appearance. The filled backgrounds use fill-1, fill-2 and fill-3 for default, hover and focus. Form manages validation messages.

input-tag-* controls content density, default tag backgrounds and disabled text. Disabled styles take precedence over focus. Sizes xs/sm/md/lg/xl are supported. xl uses 32px tags, 16px input text and 4px vertical padding.

Removed 33 legacy wrapper variables with no CSS consumers: size-{xs,sm,md,lg}-height; color-text-error; color-placeholder, color-icon-clear, color-icon-clear-bg-hover; color-border-{default,error,disabled} (and their -hover / -focus variants); color-bg-{default,error} (and their -hover / -focus variants), color-bg-disabled (and -hover); color-shadow-{default,error}-focus, size-shadow-{default,error}-focus; border-radius, border-width, size-icon-clear, size-icon-clear-hover. All suffixes use the --mp-input-tag- prefix. No compatibility aliases are provided.

Use field-variant-{variant}-background for field backgrounds, field-border-radius for corners, field-placeholder-text-color for placeholders, and field-clear-icon-color / field-clear-icon-size for clear icons. Prefer `size` for dimensions and InputTag variables for tag content.

Default text, disabled text, tag backgrounds and focus backgrounds use the corresponding system semantic colors. Disabled state does not override explicit color / status; keep text readable when supplying custom colors. Parent disabled / readonly takes precedence over tagProps.closable / checkable. Loading or explicitly nonclosable tags cannot be removed with Backspace.

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open an editor popup near the field. Enter/F2 also opens it; cancel/Escape discards the draft, and confirmation commits it. readPretty is an independent reading setting, separate from readonly and disabled.

`before-commit(payload, done, context)` can guard saving the editor. FormItem validates the candidate first; invalid candidates keep the editor open. `open / default-open / update:open` control the editor. `#read="{ value, text }"` customizes read content. See the unified field presentation examples in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-input-tag-color-text-default` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-input-tag-color-text-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-input-tag-padding-x` | `4px` | `padding-inline-end`, `padding-inline-start` |
| `--mp-input-tag-size-lg-font-size` | `14px` | `font-size` |
| `--mp-input-tag-size-lg-padding-y` | `2px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-lg-tag-height` | `28px` | `line-height`, `min-height` |
| `--mp-input-tag-size-md-font-size` | `14px` | `font-size` |
| `--mp-input-tag-size-md-padding-y` | `2px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-md-tag-height` | `24px` | `line-height`, `min-height` |
| `--mp-input-tag-size-sm-font-size` | `14px` | `font-size` |
| `--mp-input-tag-size-sm-padding-y` | `2px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-sm-tag-height` | `20px` | `line-height`, `min-height` |
| `--mp-input-tag-size-xl-font-size` | `16px` | `font-size` |
| `--mp-input-tag-size-xl-padding-y` | `4px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xl-tag-height` | `32px` | `line-height`, `min-height` |
| `--mp-input-tag-size-xs-font-size` | `12px` | `font-size` |
| `--mp-input-tag-size-xs-padding-y` | `0px` | `padding-bottom`, `padding-top` |
| `--mp-input-tag-size-xs-tag-height` | `20px` | `line-height`, `min-height` |
| `--mp-input-tag-tag-color-bg` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-input-tag-tag-color-bg-disabled` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-input-tag-tag-color-bg-focus` | `var(--mp-sys-color-state-hover)` | `background-color` |
| `--mp-input-tag-tag-color-border` | `var(--mp-color-fill-3)` | `border-color` |
| `--mp-input-tag-tag-color-border-disabled` | `var(--mp-color-fill-3)` | `border-color` |
| `--mp-input-tag-tag-color-border-focus` | `var(--mp-sys-color-state-hover)` | `border-color` |
| `--mp-input-tag-tag-font-size` | `12px` | `font-size` |
| `--mp-input-tag-tag-margin-right` | `4px` | `margin-inline-end` |
| `--mp-input-tag-tag-margin-y` | `2px` | `margin-bottom`, `margin-top` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-input-tag-color-text-default: var(--mp-sys-color-content-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

Pending acceptance: use actual screen readers (such as VoiceOver and NVDA) with supported browsers to verify input naming, tag names, creation and removal, keyboard operation, and form error announcements. This acceptance has not yet been completed.
