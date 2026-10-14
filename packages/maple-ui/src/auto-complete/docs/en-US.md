# AutoComplete

Free-text input with suggestions. Both libraries independently maintain the same component, props, Menu and styles. Local Input/Form integration supplies hover versus touch behavior; no shared runtime or platform configuration.

Opening and filtering are independent: shouldOpen controls opening, filterOption filters candidates. Empty results, disabled and readonly keep the menu closed. No list/picker presentation is provided.

### Input and selection

```demo
../example/demos/en-US/basic.vue
```

### Opening and filtering

```demo
../example/demos/en-US/opening-policy.vue
```

### Case sensitivity

```demo
../example/demos/en-US/strict.vue
```

### Async suggestions

```demo
../example/demos/en-US/remote.vue
```

### Field names and slots

```demo
../example/demos/en-US/footer.vue
```

### Virtual list

```demo
../example/demos/en-US/virtual-list.vue
```

### Sizes

```demo
../example/demos/en-US/size.vue
```

### Disabled and readonly

```demo
../example/demos/en-US/state.vue
```

### Variants and hints

```demo
../example/demos/en-US/decorator.vue
```

### Keyboard and accessibility

```demo
../example/demos/en-US/accessibility.vue
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` | Controlled text | `string` | `—` |
| `default-value` | Initial uncontrolled text | `string` | `''` |
| `options` | Suggestions, including groups; unique values become strings on selection | `(AutoCompleteOption \| SelectOptionGroup)[]` | `[]` |
| `field-names` | Map value, label, disabled and other fields | `AutoCompleteFieldNames` | `—` |
| `should-open` | Opening policy; does not filter candidates | `(value: string) => boolean` | `value.length > 0` |
| `filter-option` | Filter by label; false for remote filtering | `AutoCompleteFilterOption` | `true` |
| `strict` | Case-sensitive built-in matching | `boolean` | `false` |
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
| `max-length` | Same length normalization for typing and selecting | `number \| { length: number; errorOnly?: boolean }` | `0` |
| `show-word-limit` | Display word count | `boolean` | `false` |
| `word-length` | Custom length calculation | `(value: string) => number` | `—` |
| `word-slice` | Custom slicing | `(value: string, maxLength: number) => string` | `—` |
| `input-attrs` | Native input attributes; combobox state is owned by the component | `Record<string, unknown>` | `—` |

### Events

| Event | Payload |
| --- | --- |
| `update:model-value` | `value: string` |
| `input / search / change` | `value: string, event: Event` |
| `select` | `value: string, option: AutoCompleteOptionInfo, event: Event` |
| `clear` | `event: Event` |
| `focus / blur` | `event: FocusEvent` |
| `dropdown-scroll / dropdown-reach-bottom` | `event: Event` |

Typing: `input → update:modelValue → search`; selection: `update:modelValue → select → change`; clear: `clear → input → update:modelValue → change`. Selecting the same value emits only select. change is a commit on blur, Enter or selection. Input owns typing/focus/clear Form notifications; AutoComplete notifies Form once for suggestion commits. Selection applies maxLength; select.value is the committed string, while option.value retains the original suggestion. clear receives an event, not a string.

### Slots

| Slot | Description |
| --- | --- |
| `option` | `{ data: AutoCompleteOptionInfo }` |
| `footer` | Menu footer |
| `prefix / suffix` | Input prefix / suffix |
| `clear-icon` | `{ clear }` |

### Methods

`focus()` / `blur()`

Use text labels and the option slot or option.render for rich content. Legacy function/VNode labels are removed. Arrow keys navigate, Enter selects, Escape closes, and Tab keeps native focus navigation. Vue useId provides SSR-stable IDs.

## Types

```ts
import type { AutoCompleteProps, AutoCompleteInstance, AutoCompleteOption, AutoCompleteOptionData,
  AutoCompleteOptionInfo, AutoCompleteFieldNames, AutoCompleteFilterOption } from '@maplejs/maple-ui'
```

## Style variables

| Token | Default |
| --- | --- |
| `--mp-auto-complete-popup-max-height` | `200px` |
| `--mp-auto-complete-popup-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-auto-complete-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-auto-complete-popup-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-auto-complete-popup-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-auto-complete-popup-box-shadow` | `0 4px 10px rgba(0, 0, 0, 0.1)` |
| `--mp-auto-complete-option-height` | `36px` |
| `--mp-auto-complete-option-font-weight-selected` | `var(--mp-sys-font-weight-medium)` |
| `--mp-auto-complete-option-padding-horizontal` | `var(--mp-sys-space-5)` |
| `--mp-auto-complete-option-bg-default` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-option-bg-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-auto-complete-option-bg-selected` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-option-bg-disabled` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-option-text-color-default` | `var(--mp-sys-color-content-primary)` |
| `--mp-auto-complete-option-text-color-hover` | `var(--mp-sys-color-content-primary)` |
| `--mp-auto-complete-option-text-color-selected` | `var(--mp-sys-color-content-primary)` |
| `--mp-auto-complete-option-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |

Clear does not emit search or reopen suggestions, including when keyboard focus returns from the clear button. Controlled values remain authoritative: repeated rejected clear/selection proposals still emit their own change events. Accepted selections notify Form only once.
