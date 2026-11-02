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

#### CheckboxGroup

In the checkbox group, you must set the `value` to identify the `checkbox`,
The checkbox group collects all checked identifiers.

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

| Configuration   | Purpose                              | Related examples                               |
| --------------- | ------------------------------------ | ---------------------------------------------- |
| `value`         | Option identity                      | Standalone values and methods, Set State Value |
| `default-value` | Initial uncontrolled value           | Standalone values and methods                  |
| `readonly`      | Readonly; inherits Form when omitted | Standalone values and methods                  |
| `disabled`      | Disabled; inherits Form when omitted | Standalone values and methods                  |

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

| Configuration   | Purpose                                       | Related examples             |
| --------------- | --------------------------------------------- | ---------------------------- |
| `value`         | Option identity                               | Maximum Number Of Checked    |
| `indeterminate` | Indeterminate state; highest style precedence | Indeterminate                |
| `disabled`      | Disabled; inherits Form when omitted          | Interaction state comparison |
| `readonly`      | Readonly; inherits Form when omitted          | Interaction state comparison |
| `error`         | Error state; inherits Form when omitted       | Interaction state comparison |

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

| Configuration     | Purpose                                       | Related examples                               |
| ----------------- | --------------------------------------------- | ---------------------------------------------- |
| `unchecked-color` | Unchecked color                               | Modify The Icon And Color, Custom control slot |
| `checked-color`   | Checked color                                 | Modify The Icon And Color, Custom control slot |
| `name`            | Native input name within the group            | Native controls and appearance                 |
| `indeterminate`   | Indeterminate state; highest style precedence | Native controls and appearance                 |
| `aria-label`      | Accessible group name                         | Native controls and appearance                 |
| `default-value`   | Initial uncontrolled value                    | Native controls and appearance                 |

<!-- demo-config-notes:end -->

Both libraries use independently copied native checkbox and label bodies. Tab focuses, Space/Enter toggles. A readonly control stays focusable; a disabled control is not focusable. Mixed state is exposed as aria-checked="mixed". A label click triggers one activation. Use aria-label when no visible label is supplied; name is forwarded to native inputs and inherited from the group.

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

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[]`；`RadioModel = ChoiceValue | null`。

### Props

#### CheckboxGroup Props

| Arguments             | Description                                                                                               | Type                                                                                                       | Default      |
| --------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------ |
| model-value (v-model) | Controlled value                                                                                          | ChoiceValue[]                                                                                              | undefined    |
| default-value         | Initial uncontrolled value                                                                                | ChoiceValue[]                                                                                              | []           |
| `disabled`            | Disabled; inherits Form when omitted                                                                      | _boolean_                                                                                                  | `undefined`  |
| `readonly`            | Readonly; inherits Form when omitted                                                                      | _boolean_                                                                                                  | `undefined`  |
| `error`               | Error state; inherits Form when omitted                                                                   | _boolean_                                                                                                  | `undefined`  |
| max                   | Maximum selection count                                                                                   | number                                                                                                     | undefined    |
| `orientation`         | Horizontal/vertical arrangement of checkbox-group options, default horizontal; not text reading direction | _string_                                                                                                   | `horizontal` |
| options               | Options; replaces default slot when supplied                                                              | Array<ChoiceValue \| CheckboxOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined`  |
| field-names           | Option field mapping                                                                                      | ChoiceFieldNames                                                                                           | undefined    |
| name                  | Native input name within the group                                                                        | string                                                                                                     | undefined    |
| aria-label            | Accessible group name                                                                                     | string                                                                                                     | undefined    |

#### CheckboxOption

| Field         | Description                      | Type                                                                 |
| ------------- | -------------------------------- | -------------------------------------------------------------------- |
| value         | Option identity                  | ChoiceValue                                                          |
| label         | Label or render function         | VNodeChild \| (data: CheckboxOption, checked: boolean) => VNodeChild |
| disabled      | Disable interaction              | boolean                                                              |
| readonly      | Read-only interaction            | boolean                                                              |
| indeterminate | Display-only indeterminate state | boolean                                                              |

#### Checkbox Props

| Arguments              | Description                                                | Type                        | Default     |
| ---------------------- | ---------------------------------------------------------- | --------------------------- | ----------- |
| model-value (v-model)  | Controlled value                                           | boolean \| ChoiceValue[]    | undefined   |
| default-value          | Initial uncontrolled value                                 | boolean \| ChoiceValue[]    | false       |
| value                  | Option identity                                            | string \| number \| boolean | true        |
| `checked-color`        | Checked color                                              | _string_                    | `-`         |
| `unchecked-color`      | Unchecked color                                            | _string_                    | `-`         |
| `icon-size`            | Icon size                                                  | _string \| number_          | `-`         |
| `disabled`             | Inherit group/form when omitted                            | _boolean_                   | `undefined` |
| `readonly`             | Inherit group/form when omitted                            | _boolean_                   | `undefined` |
| `error`                | Error state; inherits group/form                           | _boolean_                   | `undefined` |
| `indeterminate`        | Indeterminate state; highest style precedence              | _boolean_                   | `false`     |
| uninject-group-context | Ignore surrounding CheckboxGroup; form state still applies | boolean                     | false       |
| name                   | Native field name; inherits from Group when omitted        | string                      | undefined   |
| aria-label             | Accessible name when no visible label exists               | string                      | undefined   |
| `ripple`               | Whether to open ripple                                     | _boolean_                   | `true`      |

### Methods

#### CheckboxGroup Methods

| Method     | Arguments | Returns       |
| ---------- | --------- | ------------- |
| checkAll   | -         | ChoiceValue[] |
| inverseAll | -         | ChoiceValue[] |

#### Checkbox Methods

| Method | Description                                  | Arguments              | Returns |
| ------ | -------------------------------------------- | ---------------------- | ------- |
| toggle | Request a selection; obeys disabled/readonly | checked?: boolean      | void    |
| focus  | Focus the control                            | options?: FocusOptions | void    |
| blur   | Blur the control                             | -                      | void    |

### Events

#### CheckboxGroup Events

| Event                | Description                         | Arguments                             |
| -------------------- | ----------------------------------- | ------------------------------------- |
| `update:model-value` | Proposes a new value                | `value: ChoiceValue[]`                |
| `change`             | Value change; emitted only by Group | `value: ChoiceValue[], event?: Event` |

#### Checkbox Events

| Event              | Description                        | Arguments                           |
| ------------------ | ---------------------------------- | ----------------------------------- |
| `click`            | Triggered when the cell is clicked | `e: Event`                          |
| update:model-value | Proposes a new value               | value: CheckboxModel                |
| change             | Value change                       | value: CheckboxModel, event?: Event |
| focus              | Focus                              | event: FocusEvent                   |
| blur               | Blur                               | event: FocusEvent                   |

### Slots

#### CheckboxGroup Slots

| Slot    | Description                      | Arguments                              |
| ------- | -------------------------------- | -------------------------------------- |
| default | Children when options is omitted | -                                      |
| label   | Option label                     | data: CheckboxOption, checked: boolean |

#### Checkbox Slots

Controls/groups support a checkbox slot with { checked, disabled, indeterminate }.

| Slot                 | Description        | Arguments                           |
| -------------------- | ------------------ | ----------------------------------- |
| `checked-icon`       | Checked icon       | `-`                                 |
| `unchecked-icon`     | Unchecked icon     | `-`                                 |
| `indeterminate-icon` | Indeterminate icon | `-`                                 |
| `default`            | Displayed text     | `checked: boolean`; whether checked |

### Style variables

| Variable                                  | Default                                  |
| ----------------------------------------- | ---------------------------------------- |
| `--mp-checkbox-control-color`             | `var(--mp-sys-color-content-secondary)`  |
| `--mp-checkbox-control-color-checked`     | `var(--mp-sys-color-content-brand)`      |
| `--mp-checkbox-mark-color`                | `var(--mp-sys-color-content-on-bright)`  |
| `--mp-checkbox-control-color-disabled`    | `var(--mp-sys-color-content-disabled)`   |
| `--mp-checkbox-control-color-error`       | `var(--mp-sys-color-content-danger)`     |
| `--mp-checkbox-control-size`              | `24px`                                   |
| `--mp-checkbox-label-text-color`          | `var(--mp-sys-color-content-primary)`    |
| `--mp-checkbox-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)`   |
| `--mp-checkbox-label-font-size`           | `var(--mp-font-size-md)`                 |
| `--mp-checkbox-label-gap`                 | `0`                                      |
| `--mp-checkbox-action-padding`            | `6px`                                    |
| `--mp-checkbox-group-gap`                 | `0`                                      |
| `--mp-checkbox-animation-duration`        | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

Exported types：`CheckboxOption`、`ChoiceFieldNames`。

Public method type：`CheckboxGroupMethods`；`CheckboxGroupInstance` includes these methods.

### Reduced motion

Built-in CSS transitions follow `prefers-reduced-motion: reduce`. Removing transitions does not change final visibility, selected/expanded state or event semantics. Applications control custom animations inside slots.

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

The `options` prop accepts an array or `(query, { signal }) => array/Promise`. The component manages loading, cancellation and stale-result isolation; failures emit load-error. Single/multiple groups initialize with an empty-string query, searchable fields reload when the query changes, and root loading for tree fields remains independent of existing load-more child loading.
