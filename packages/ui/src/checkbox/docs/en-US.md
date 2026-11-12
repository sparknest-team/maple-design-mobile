# Checkbox

Standalone Checkbox modelValue is a boolean checked state, or an array of selected option values in array mode. The value prop identifies this option; it is not the checked state. CheckboxGroup modelValue is the selected values array. defaultValue initializes uncontrolled state only and does not write into the parent.

### Intro

Basic demos follow the site language without changing business values or selection. Group demos cover accepted/rejected updates, readonly state and asynchronous option labels; removing options does not clear the model. Use `direction="column"` on the outer Space and `orientation="vertical"` on the choice group itself.

A group of options for multiple choices.

## Reading direction

Checkbox labels and groups follow source dir without reversing value arrays. Space keeps its toggle meaning; disabled and readonly behavior remains effective. Changing direction does not select or clear options.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Groups and layout

### Option declaration comparison

Compare child-component declarations with options data. Both use a group model; field mapping and asynchronous data are separate.

<details>
<summary>Configuration details and limits</summary>

#### Options API

Setting child elements via the `options` prop.

</details>

```demo
../example/demos/group-declaration-comparison.vue
```

### Group state and readonly

A defined `model-value` is controlled: rejected updates do not change the selection. `default-value` initializes uncontrolled state only. Only Group emits `update:model-value → change(value, event?)` and notifies FormItem once; children do not duplicate these notifications.
Group inherits `disabled`, `readonly` and `error` from the form when omitted. An explicit `false` overrides the form; children cannot bypass a locked group.

```demo
../example/demos/en-US/group-state.vue
```

### Vertical Direction

```demo
../example/demos/vertical.vue
```

## Options and value model

### Standalone values and methods

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ---------------------- | ---------------------------- |
| `value` | Option identity | Standalone values and methods, Set State Value |
| `default-value` | Initial uncontrolled value | Standalone values and methods |
| `readonly` | Readonly; inherits Form when omitted | Standalone values and methods |
| `disabled` | Disabled; inherits Form when omitted | Standalone values and methods |

<!-- demo-config-notes:end -->


Checkbox boolean models emit booleans. Array models add/remove the option value without mutating the input array. indeterminate is presentation-only and must be derived by the application.
Use `default-value` only to initialize uncontrolled state. Rejected controlled proposals preserve the current selection. The event order is `update:model-value → change(value, event?)`; imperative calls have no native event.
Methods are `toggle(checked?: boolean)`, `focus(options?)` and `blur()`. Disabled controls cannot select or focus; readonly controls can focus but cannot change value. Enter on keydown and Space on keyup activate only the local control. Repeated Enter is ignored; blur/deactivation cancels pending Space activation.

```demo
../example/demos/en-US/control-value.vue
```

### Option data and labels

Both libraries accept primitive options or objects. `field-names` maps `label/value/disabled/readonly/indeterminate`; read-only options remain focusable but cannot change the value. Checkbox indeterminate is presentation only.
The `label` slot receives `{ data, checked }` and takes precedence over a label render function `(data, checked) => VNodeChild`. Data is normalized and retains business fields; source objects are not mutated. Missing labels fall back to the value's text.
Providing `options` replaces the default slot, including `[]`; omit it to use the default slot. Values must be strings, finite numbers or booleans; missing/invalid values and duplicate values of the same type are skipped (first occurrence wins). `false`, `0`, `''` and `'0'` remain distinct. Option changes never rewrite the model.
CheckboxGroup uses `ChoiceValue[]`; `max` is a number (use `:max="2"`).

```demo
../example/demos/en-US/option-data.vue
```

### Custom Fields

Customize the format of the data in `options` through the `field-names` attribute.

```demo
../example/demos/custom-fields.vue
```

### Set State Value

```demo
../example/demos/set-state.vue
```

## Selection and bulk actions

### Maximum Number Of Checked

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ---------------------------------- | ------------ |
| `value` | Option identity | Maximum Number Of Checked |
| `indeterminate` | Indeterminate state; highest style precedence | Indeterminate |
| `disabled` | Disabled; inherits Form when omitted | Interaction state comparison |
| `readonly` | Readonly; inherits Form when omitted | Interaction state comparison |
| `error` | Error state; inherits Form when omitted | Interaction state comparison |

<!-- demo-config-notes:end -->


In a checkbox group, you can limit the maximum number of selections by setting `max`.

> For form validation of checkbox and checkbox group, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/max.vue
```

### Indeterminate

```demo
../example/demos/indeterminate.vue
```

### Group bulk methods

Both libraries expose `checkAll()` and `inverseAll()`, returning a detached array. They operate on mounted, editable children only and preserve selected disabled, read-only or unloaded values. A duplicate value is locked if any child with that value is locked.
`checkAll` preserves the existing model order and appends missing values in current DOM order; `inverseAll` removes editable selected values before adding previously unselected values. Both enforce `max` without pruning external over-limit values.
Controlled groups return proposals and require parent updates; rejected proposals are not saved. Disabled/read-only groups return a copy of the current value. Actual changes notify `update:model-value → change(value, undefined) → FormItem` once; no-op calls stay silent.
Reordering, mounting, unmounting and KeepAlive activation are read correctly; call methods after `nextTick` when the rendered children change.

```demo
../example/demos/en-US/group-methods.vue
```

### Interaction state comparison

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for agreement and independent checks. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

## Control and slot customization

### Native controls and appearance

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------------- | ---------------------------------- | ------------------------------ |
| `unchecked-color` | Unchecked color | Modify The Icon And Color, Custom control slot |
| `checked-color` | Checked color | Modify The Icon And Color, Custom control slot |
| `name` | Native input name within the group | Native controls and appearance |
| `indeterminate` | Indeterminate state; highest style precedence | Native controls and appearance |
| `aria-label` | Accessible group name | Native controls and appearance |
| `default-value` | Initial uncontrolled value | Native controls and appearance |

<!-- demo-config-notes:end -->


Both libraries use independently copied native checkbox and label bodies. Tab focuses, Space/Enter toggles. A readonly control stays focusable; a disabled control is not focusable. The native input exposes the mixed state through its `indeterminate` property after hydration; the component manages the native checked state and ignores a supplied `aria-checked`. The server-rendered first view cannot guarantee that assistive technologies receive the mixed state. A label click triggers one activation. Use aria-label when no visible label is supplied; name is forwarded to native inputs and inherited from the group.

The icon-size prop is a pixel number or CSS length string, not a ComponentSize preset. The default control size is 14px in Cedar and 24px in Maple. Instance colors apply to ordinary states; error and disabled colors take precedence. The checkbox slot overrides the whole visual control (including the group's checkbox slot), while checked-icon, unchecked-icon and indeterminate-icon replace only each icon. These slots are decorative: do not put independent focusable controls inside them.

```demo
../example/demos/en-US/native-control.vue
```

### Modify The Icon And Color

```demo
../example/demos/set-style.vue
```

### Custom control slot

Replace the appearance while retaining the same value model and keyboard interaction.

```demo
../example/demos/en-US/custom-control.vue
```

## Async options

### Asynchronous options

Enable manual responses to create local Promises and resolve the oldest or newest load in either order. The demo loader uses a version guard: obsolete responses cannot finish a newer load, clear selections, release a `max=2` slot, or increment user changes. Removing options invalidates in-flight results; a fresh load reflects the retained model. Deactivation or unmount settles waiting jobs and cancels timers. This is demo business logic, not automatic network-race handling by the component; no external service is used.

Loading/removing options or updating the external value never emits reverse updates. Selected values absent from the current options are retained. This demo simulates a request with an 800ms local delay; removing options while loading cancels the pending result so stale options do not reappear. The selected remote value occupies one slot; selecting Device A reaches `max=2` and disables Device B. Deselecting either item frees a slot. External over-limit values are not truncated.

Use Space or Enter on existing options while waiting. Reloading the same values preserves keyboard focus and the latest selection. Keep the loading-status node stable to avoid remounting the group; deselecting an item still frees a slot for another choice.

```demo
../example/demos/en-US/async-options.vue
```

## Native input attributes and keyboard cancellation

Native `id`, `form`, `required`, constraints, aria/data attributes and keyboard listeners belong to the actual input. Class/`style` and other shell attributes remain on the label. Generated native IDs are stable and unique, and an external label can target an explicit `id`. HTML `required` participates in native browser `form` validation, separately from Form business rules.

Once / Capture / Passive native listener modifiers stay on the input rather than firing from interactive slot children. Native preventDefault can veto Enter / Space activation and RadioGroup arrow navigation; canceled Space leaves no delayed release action. Checked, disabled, input type and group Tab navigation remain component-managed.

The nullable Checkbox model is preserved. checked in default / checkbox slots is always boolean, with null shown as false; rendering alone never proposes a new model.

## Usage notes

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(payload, done, context)` can guard saving the editor. FormItem validates the candidate first; invalid candidates keep the editor open. `open / default-open / update:open` control the editor. `#read="{ value, text }"` customizes read content. See the unified field presentation examples in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

The `options` prop accepts an array or `(query, { signal }) => array/Promise`. The component manages loading, cancellation and stale-result isolation; failures emit load-error. Single/multiple groups initialize with an empty-string query, searchable fields reload when the query changes, and root loading for tree fields remains independent of existing load-more child loading.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

CheckboxGroup checkAll/inverseAll change values only through an active editor. When a deferred editor is closed, deactivated, or unmounted, calls return an independent array copy of the current business value without opening the editor or publishing model changes.

## API

### Parameters, presentation clearing and mount-time boundaries

orientation accepts horizontal / vertical and falls back to horizontal after invalid-value diagnostics. max belongs to CheckboxGroup: valid values are finite nonnegative integers, zero forbids new choices, and omission is unlimited. Existing external values are never truncated. Invalid JavaScript callers retain the existing normalization after diagnostics: negatives become zero, fractions are floored, NaN is unlimited, and Infinity remains unlimited.

icon-size accepts positive lengths. Numbers and numeric strings use px, including positive fractions such as 0.5. Invalid, nonpositive or nonfinite values diagnose and fall back to the theme; the Divider minimum of 1 does not apply. Business styles determine the final resolved value of CSS expressions.

uninject-group-context decides group participation at mount. Changing it later does not reinject; change the key or remount. An isolated control still participates in Form. clearable / empty-value apply only to explicit presentation-layer clearing; native unchecking still proposes false or removes the array value and never uses empty-value. Ordinary event Promises do not participate in waiting; before-commit uses payload / done / context only when saving a deferred edit.

During an explicit options request both group roots announce aria-busy and emit one load-error on failure. No loading prop or extra graphic is added, and loading/failure never proposes a new model.

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[] | null`；`RadioModel = ChoiceValue | null`。

### Checkbox Props

| Prop | Description | Type | Default |
| ---------------------- | ---------------------------------- | ------------------------ | --------- |
| model-value (v-model) | Controlled value | CheckboxModel | undefined |
| default-value | Initial uncontrolled value | CheckboxModel | false |
| value | Option identifier in array/group mode | string\|number\|boolean | true |
| disabled | Disabled state; inherits from the form/group when omitted | boolean | undefined |
| readonly | Readonly state; inherits from the form/group when omitted | boolean | undefined |
| error | Error state; inherits from the form/group when omitted | boolean | undefined |
| indeterminate | Whether to display an indeterminate state | boolean | false |
| checked-color | Instance checked color; error/disabled states take precedence | string | undefined |
| unchecked-color | Instance unchecked color; error/disabled states take precedence | string | undefined |
| icon-size | Positive length; invalid values diagnose and fall back to the theme | number \| string | undefined |
| ripple | Whether to enable ripple feedback | boolean | true |
| uninject-group-context | Ignore surrounding CheckboxGroup; form state still applies | boolean | false |
| name | Native field name; inherits from Group when omitted | string | undefined |
| aria-label | Accessible name when no visible label exists | string | undefined |
| edit-mode | Editing mode, inherited from FormItem and Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | Independent read presentation; explicit false overrides the parent | `boolean` | `false` |
| clearable | Deferred editor clearing; does not change native deselection | `boolean` | `false` |
| empty-value | Explicit presentation clear output; does not control native unchecking | `CheckboxModel \| (() => CheckboxModel)` | `false` |
| empty-values | Empty-value recognition; field takes precedence over FormItem and Form | `readonly unknown[]` | `-` |
| empty-text | Read empty text; an explicit empty string is valid | `string` | `'-'` |
| before-commit | Guard before saving a deferred edit; return a boolean or Promise, or complete via done | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | Controlled editor visibility, separate from native input focus | `boolean` | `-` |
| default-open | Initial visibility of an uncontrolled editor | `boolean` | `false` |
| popup-container | Editor mount container | `string \| HTMLElement \| false` | `-` |

### CheckboxGroup Props

| Prop | Description | Type | Default |
| --------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------ |
| model-value (v-model) | Controlled value | ChoiceValue[] \| null | undefined |
| default-value | Initial uncontrolled value | ChoiceValue[] | [] |
| max | Maximum selection count | number | undefined |
| options | Options; replaces default slot when supplied | Array<ChoiceValue \| CheckboxOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined` |
| orientation | Horizontal/vertical arrangement of checkbox-group options, default horizontal; not text reading direction | Orientation<br>`'horizontal' \| 'vertical'` | 'horizontal' |
| disabled | Disabled state; inherits from the form/group when omitted | boolean | undefined |
| readonly | Readonly state; inherits from the form/group when omitted | boolean | undefined |
| error | Error state; inherits from the form/group when omitted | boolean | undefined |
| field-names | Option field mapping | ChoiceFieldNames | undefined |
| name | Native input name within the group | string | undefined |
| aria-label | Accessible group name | string | undefined |
| edit-mode | Editing mode, inherited from FormItem and Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | Independent read presentation; explicit false overrides the parent | `boolean` | `false` |
| clearable | Deferred editor clearing; does not change native deselection | `boolean` | `false` |
| empty-value | Explicit presentation clear output; does not control native unchecking | `ChoiceValue[] \| null \| (() => ChoiceValue[] \| null)` | `[]` |
| empty-values | Empty-value recognition; field takes precedence over FormItem and Form | `readonly unknown[]` | `-` |
| empty-text | Read empty text; an explicit empty string is valid | `string` | `'-'` |
| before-commit | Guard before saving a deferred edit; return a boolean or Promise, or complete via done | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | Controlled editor visibility, separate from native input focus | `boolean` | `-` |
| default-open | Initial visibility of an uncontrolled editor | `boolean` | `false` |
| popup-container | Editor mount container | `string \| HTMLElement \| false` | `-` |

### Checkbox Methods

| Method | Description | Arguments | Returns |
| ------ | --------------------------- | ---------------------- | ------ |
| toggle | Request a selection; obeys disabled/readonly | checked?: boolean | void |
| focus | Focus the control | options?: FocusOptions | void |
| blur | Blur the control | - | void |

### CheckboxGroup Methods

| Method | Arguments | Returns |
| ---------- | ---- | ------------- |
| checkAll | - | ChoiceValue[] |
| inverseAll | - | ChoiceValue[] |

### Checkbox Events

| Event | Description | Arguments |
| ------------------ | ---------------- | ----------------------------------- |
| update:modelValue | Proposes a new value | value: CheckboxModel |
| change | Value change | value: CheckboxModel, event?: Event |
| click | Click; not emitted while disabled | event: MouseEvent |
| focus | Focus | event: FocusEvent |
| blur | Blur | event: FocusEvent |
| update:open | Controlled editor visibility update | open: boolean |
| open-change | Actual editor visibility change | open: boolean |

### CheckboxGroup Events

| Event | Description | Arguments |
| ------------------ | --------------------------- | -------------------------------------------------- |
| update:modelValue | Proposes a new value | value: ChoiceValue[] \| null |
| change | Value change proposal | value: ChoiceValue[] \| null, event?: Event |
| update:open | Controlled editor visibility update | open: boolean |
| open-change | Actual editor visibility change | open: boolean |
| load-error | Explicit option loading failed; does not change the model | error: unknown |

### Checkbox Slots

| Slot | Description | Prop |
| ------------------ | ------------------ | ----------------------------------------------------------- |
| checkbox | Customize the complete control appearance | checked: boolean, disabled: boolean, indeterminate: boolean |
| checked-icon | Checked icon | - |
| unchecked-icon | Unchecked icon | - |
| indeterminate-icon | Half icon | - |
| default | Label | checked: boolean |
| read | Custom read content, taking precedence over empty-text | value: CheckboxModel, text: string |

### CheckboxGroup Slots

| Slot | Description | Prop |
| -------- | ----------------- | -------------------------------------- |
| checkbox | Custom checkbox | checked: boolean<br/>disabled: boolean<br/>indeterminate: boolean |
| label | Checkbox label content | data: CheckboxOption, checked: boolean |
| read | Custom read content, taking precedence over empty-text | value: ChoiceValue[] \| null, text: string |
| default | Native child options when options is omitted | - |

## Types

### CheckboxOption

| Field | Description | Type |
| ------------- | -------------- | -------------------------------------------------------------------- |
| value | Option identity | ChoiceValue |
| label | Label or render function | VNodeChild \| (data: CheckboxOption, checked: boolean) => VNodeChild |
| disabled | Disable interaction | boolean |
| readonly | Read-only interaction | boolean |
| indeterminate | Display-only indeterminate state | boolean |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

Public types: `CheckboxOption`, `ChoiceFieldNames`, `CheckboxSlots` and `CheckboxGroupSlots`, consistently exported from root and subentries.

Public method type：`CheckboxGroupMethods`；`CheckboxGroupInstance` includes these methods.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-checkbox-action-padding` | `6px` | `padding` |
| `--mp-checkbox-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-checkbox-control-border-radius` | `2px` | `border-radius` |
| `--mp-checkbox-control-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-checkbox-control-color-checked` | `var(--mp-sys-color-action-primary)` | `color`, `outline` |
| `--mp-checkbox-control-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-checkbox-control-color-error` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-checkbox-control-size` | `24px` | `height`, `width` |
| `--mp-checkbox-group-gap` | `0` | `gap` |
| `--mp-checkbox-label-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-checkbox-label-gap` | `0` | `margin-inline-start` |
| `--mp-checkbox-label-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-checkbox-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-checkbox-mark-color` | `var(--mp-sys-color-content-on-bright)` | `background-color`, `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-checkbox-action-padding: 6px;
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.
