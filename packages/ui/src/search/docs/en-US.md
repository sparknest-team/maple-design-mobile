# Search

Start with keyword submission, then field models, then controlled history and presentation. Requests stay in application code.

### Intro

Search is used to enter keywords and trigger queries in lists, result pages, or top toolbars. It includes a search icon, clear button, and optional cancel action.

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

## Basic examples

### Basic Usage

```demo
../example/demos/en-US/basic.vue
```

## Appearance and states

### Search Shape

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ------------------------------------- | ---------- |
| `placeholder` | Placeholder | Search Shape |
| `shape` | Inner field shape: `round` or `square` | Search Shape |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/shape.vue
```

## Data and options

### Search Button

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------------- | ------------------------------------------------- | ---------------------------------- |
| `recent-searches` | Controlled search history | Search Button, Field Select, Search History |
| `placeholder` | Placeholder | Search Button, Search History |
| `show-action` | Whether to show the mobile action | Search Button, Search History |
| `action-type` | Action type: `cancel` or `search` | Search Button, Search History |
| `action-text` | Action button text | Search Button, Search History |
| `edit-mode` | Search editing mode: direct searches in place; popup opens the search editor in a popup | Search Button, Field Select |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/search-button.vue
```

### Field Select

```demo
../example/demos/en-US/fields.vue
```

### Search History

Persistence is application-owned; save `result.recentSearches` from the `search` event when needed.

```demo
../example/demos/en-US/history.vue
```

## Customization and slots

### History presentation and slots

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------------- | ------------------------------------------------- | -------------- |
| `edit-mode` | Search editing mode: direct searches in place; popup opens the search editor in a popup | History presentation and slots |
| `recent-searches` | Controlled search history | History presentation and slots |
| `label` | Label contents; the outer label associates with the keyword input | History presentation and slots |
| `placeholder` | Placeholder | History presentation and slots |
| `clearable` | Whether the value can be cleared | History presentation and slots |
| `show-action` | Whether to show the mobile action | History presentation and slots |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/presentation.vue
```

## Content and presentation

### Cancel Button

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ---------------- | -------- |
| `placeholder` | Placeholder | Cancel Button |
| `show-action` | Whether to show the mobile action | Cancel Button |
| `action-text` | Action button text | Cancel Button |

<!-- demo-config-notes:end -->


```demo
../example/demos/en-US/action.vue
```

## Interaction and control

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ------------------------------------- | ------------------ |
| `placeholder` | Placeholder | Interaction states, States |
| `disabled` | Whether disabled | Interaction states, States |
| `shape` | Inner field shape: `round` or `square` | Interaction states |
| `readonly` | Whether readonly | Interaction states |

<!-- demo-config-notes:end -->


Use this example for keyword input and search submission. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### States

```demo
../example/demos/en-US/state.vue
```

### Shared field loading

`loading-mode="line"` uses FieldDecorator's shared loading line; default mode retains the component's existing indicator. Loading does not imply disabled or readonly.

### Native form and popup ownership

The active keyword input exclusively owns its configured id. References and cached closed editors use distinct internal ids and leave the accessibility/Tab order. Visible labels associate with their input; ariaLabel takes precedence over label text. Field selectors describe field choice, while keyword inputs have their own accessible name.

The reference supplies one native FormData name/value. Popup edits immediately update the same model without duplicating name submission. To use native required and other HTML constraints inside the popup, give the form an id and explicitly associate inputAttrs.form. Closing releases editor constraint ownership so cached inputs cannot block later submission.

Popup input immediately updates v-model. cancel ends the history interface; business code cancels its own requests. A nonempty recent-searches list is required to open history. Switching to reading releases history state. Business state controls loading: editing stays available and repeat searches are blocked. Ordinary search/change listener Promises do not control waiting.

```demo
../example/demos/en-US/native-form.vue
```

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Search Props

| Prop | Description | Type | Default |
| -------------------------- | ------------------------------------------------- | ------------------------- | -------------------------- |
| `v-model` | Search keyword | `string \| null` | `-` |
| `default-value` | Uncontrolled default keyword | _string_ | `''` |
| `v-model:model-field` | Current search field | _string_ | `-` |
| `default-field` | Uncontrolled default field | _string_ | `-` |
| `v-model:model` | Object updated by field in field-search mode | _Record<string, unknown>_ | `-` |
| `fields` | Search field options | _SearchField[]_ | `[]` |
| `select-style` | Field selector style | _StyleValue_ | `-` |
| `recent-searches` | Controlled search history | _string[]_ | `[]` |
| `max-search-history-count` | Maximum items in the next history list | _number_ | `5` |
| `edit-mode` | Search editing mode: direct searches in place; popup opens the search editor in a popup | `'direct' \| 'popup'` | `'direct'` |
| `search-button` | Whether to show the shared search button | _boolean_ | `false` |
| `button-text` | Shared search button text | _string_ | `-` |
| `button-props` | Shared search button props | _ButtonProps_ | `-` |
| `loading` | Manual waiting feedback; keeps editing available and blocks repeat search | _boolean_ | `false` |
| `clearable` | Whether the value can be cleared | _boolean_ | `false` |
| `variant` | Input variant: `filled`, `outline`, or `standard` | _string_ | `outline` |
| `size` | Input size inherited from Form / ConfigProvider | `xs / sm / md / lg / xl` | `md` |
| `placeholder` | Placeholder | _string_ | `-` |
| `disabled` | Inherits FormItem/Form when omitted; explicit false overrides | _boolean_ | `undefined` |
| `readonly` | Inherits FormItem/Form when omitted; explicit false overrides | _boolean_ | `undefined` |
| `label` | Keyword label; supplies a name fallback in field-selector mode | _string_ | `-` |
| `shape` | Inner field shape: `round` or `square` | _string_ | `round` |
| `background` | Outer background color | _string_ | `-` |
| `input-background` | Inner field background color | _string_ | `-` |
| `show-action` | Whether to show the mobile action | _boolean_ | `false` |
| `action-text` | Action button text | `string` | Follows global locale and action-type |
| `action-type` | Action type: `cancel` or `search` | _string_ | `cancel` |
| `search-icon` | Search icon name | _string_ | `search` |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | `InputMaxLength` | `0` |
| `enterkeyhint` | Virtual keyboard Enter hint | _string_ | `search` |
| `read-pretty` | Reading presentation; inherits FormItem/Form | `boolean` | `undefined` |
| `loading-mode` | Editing indicator or bottom loading line; reading mode uses shared waiting feedback | `default / line` | `default` |
| `model-modifiers` | Model modifiers; follows Input trim behavior | `{ trim?: boolean }` | `{}` |
| `type` | Keyword input type; follows Input type constraints | `InputType`<br>`'number' \| 'text' \| 'email' \| 'tel' \| 'password'` | `text` |
| `aria-label` | Accessible keyword name; takes precedence over label | `string` | `undefined` |
| `autofocus` | Initially focus the input | `boolean` | `false` |
| `text-color` | Keyword text color | `string` | `undefined` |
| `focus-color` | Focused hint and supported border color | `string` | `undefined` |
| `blur-color` | Unfocused hint color | `string` | `undefined` |
| `input-attrs` | Native input attributes; component manages editor identity and a single form value | `Record<string, unknown>` | `undefined` |
| `error` | Error state; inherits FormItem | `boolean` | `undefined` |
| `empty-value` | Clear output; omission uses an empty string, null or a factory is supported | `string \| null \| (() => string \| null)` | `undefined` |

### Search Events

| Event | Description | Callback arguments |
| ------------------- | ---------------------------------------- | ------------------------------------ |
| `update:modelValue` | Emitted when the keyword updates | `value: string \| null` |
| `update:modelField` | Emitted when the field updates | `field: string` |
| `update:model` | Emitted when the field model updates | `model: Record<string, unknown>` |
| `input` | Emitted during live editing | `value: string, event: Event` |
| `change` | Emitted on blur, Enter commit, or field change | `value: string \| null, event: Event` |
| `clear` | Emitted when clearing | `event: Event` |
| `search` | Emitted by the icon, button, Enter, or history selection | `result: SearchResult, event: Event` |
| `focus` | Emitted on focus | `event: FocusEvent` |
| `blur` | Emitted on blur | `event: FocusEvent` |
| `cancel` | Emitted by the mobile cancel action | `event: Event` |

### Search Slots

| Name | Description | Arguments |
| ---------------- | ------------------------------------ | ----------- |
| `prefix` | Input prefix; replaces the default search icon | `-` |
| `suffix` | Input suffix | `-` |
| `clear-icon` | Clear icon | `{ clear: (event?: Event) => void }` |
| `button-default` | Shared search button content | `-` |
| `button-icon` | Shared search button icon | `-` |
| `label` | Label contents; the outer label associates with the keyword input | `-` |
| `action` | Action content | `-` |
| `read` | Custom reading content | `{ value: string \| null, text: string }` |

### Search Methods

| Method | Description | Arguments | Returns |
| ------- | ---- | ---- | ------ |
| `focus` | Focus | `-` | `-` |
| `blur` | Blur | `-` | `-` |

## Types

### SearchField

| Prop | Description | Type |
| ------------- | ------------------------------------------ | -------- |
| `label` | Label contents; the outer label associates with the keyword input | _string_ |
| `value` | Field value | _string_ |
| `placeholder` | Field `placeholder`; overrides Search `placeholder` | _string_ |

### SearchResult

| Prop | Description | Type |
| ---------------- | -------------- | -------------------------------------- |
| `modelField` | Search field | _string \| undefined_ |
| `modelValue` | Raw search keyword | `string \| null` |
| `model` | Field model object | _Record<string, unknown> \| undefined_ |
| `recentSearches` | Next search history | _string[]_ |

Input event contract: editing emits `input` before `update:modelValue`; committing on blur emits `change` only for a changed value. Clearing emits `clear → input → update:modelValue → change` once, updates the search field model once, and does not submit a search.

input fires before model updates. Enter waits for Input submission and controlled-value reconciliation before producing search results. If the parent rejects a trim proposal, search still uses the actual controlled value. Clearing notifies clear → input → update:modelValue → change without automatically searching.

## Controlled-model protocol

Value precedence is `modelValue` > `model`[current field] > uncontrolled `defaultValue`. With `model` and a current field, missing/null values display an empty string. Keep simultaneously bound models consistent in the parent. `modelField` overrides `defaultField` and the first field. Internal logic never forcibly overrides controlled values.

`model` is not mutated in place. Every logical update emits a new `update:model` object, clearing other declared fields while retaining undeclared properties. Use `v-model:model` or explicitly accept proposals. Switching fields produces one `update:modelField → update:modelValue → update:model → change` sequence. Parents can reject proposals. Enter/button/history searches wait one update cycle, then read the actually accepted field, keyword and `model`.

History is neither filtered by current input nor persisted internally. New history returned by `search` is trimmed, emptied entries removed, deduplicated and limited to the configured maximum. Empty keywords are not added. Nonfinite/negative limits are treated as 0. Clearing does not `search`; cancel proposes an empty string and emits cancel/change without searching.

Editing emits `input → update:modelValue`; changed commits emit `change`. Clear emits `clear → input → update:modelValue → change` once. Disabled, readonly and loading block search, cancel, history and field actions. Form / FormItem / InputGroup state is inherited. Deactivation or unmount cancels pending asynchronous search.

### Platform differences

Both platforms default to edit-mode=direct. Cedar defaults to shape=square, while Maple defaults to shape=round. Cedar retains an outer InputGroup; Maple uses a mobile search-bar layout and touch spacing. Input supports five sizes, and Search CSS variables control the outer density.

### Public types

`SearchEditMode`、`SearchProps`, `SearchEmits`, `SearchSlots`, `SearchExpose`, `SearchField`, `SearchResult`.

### Forwarded Input props

Native name, form, ARIA and data attributes in inputAttrs follow editor ownership. autocomplete retains Input off behavior. The component manages id, name, tabindex, aria-hidden and busy state so active and cached inputs do not compete for native identity.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-search-action-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-action-font-size` | `16px` | `font-size` |
| `--mp-search-action-spacing-inline-start` | `16px` | `margin-inline-start` |
| `--mp-search-color-bg` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-search-color-icon` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-search-field-color-bg` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-search-field-radius` | `4px` | `border-radius` |
| `--mp-search-field-size-min-height` | `36px` | `border-radius`, `line-height`, `min-height` |
| `--mp-search-field-spacing-padding` | `0 12px` | `padding` |
| `--mp-search-history-item-color-border` | `var(--mp-sys-color-border-default)` | `border-bottom` |
| `--mp-search-history-item-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-history-item-size-min-height` | `44px` | `min-height` |
| `--mp-search-history-spacing-padding` | `8px 16px 24px` | `padding` |
| `--mp-search-icon-spacing` | `8px` | `margin-inline-end` |
| `--mp-search-label-color-text` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-search-label-font-size` | `16px` | `font-size` |
| `--mp-search-label-spacing-inline-end` | `10px` | `margin-inline-end` |
| `--mp-search-opacity-disabled` | `0.6` | `opacity` |
| `--mp-search-select-icon-size` | `18px` | `font-size` |
| `--mp-search-select-icon-spacing` | `2px` | `margin-inline-start` |
| `--mp-search-select-size-max-width` | `120px` | `max-width` |
| `--mp-search-select-size-min-width` | `96px` | `min-width` |
| `--mp-search-size-icon` | `20px` | `font-size` |
| `--mp-search-size-min-height` | `48px` | `min-height` |
| `--mp-search-spacing-padding` | `8px 16px` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-search-action-color-text: var(--mp-sys-color-content-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
