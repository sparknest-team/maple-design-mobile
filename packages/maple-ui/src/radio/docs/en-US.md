# Radio

### Intro

Basic demos follow the site language without changing business values or selection. Group demos cover accepted/rejected updates, readonly state and asynchronous option labels; removing options does not clear the model. Use `direction="column"` on the outer Space and `orientation="vertical"` on the choice group itself.

Single selection among multiple options.

## Reading direction

Radio groups inherit source dir. Horizontal keys follow visible direction in RTL and skip disabled options; vertical keys and Home/End keep logical order. Radio and button variants retain one Tab entry. Changing direction does not change the selected value.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Appearance and states

### Disabled

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                              | Related examples |
| ------------- | ------------------------------------ | ---------------- |
| `disabled`    | Disabled; inherits Form when omitted | Disabled         |
| `readonly`    | Readonly; inherits Form when omitted | Readonly         |

<!-- demo-config-notes:end -->

```demo
../example/demos/disabled.vue
```

### Readonly

```demo
../example/demos/readonly.vue
```

## Groups and layout

### Radio group declarations

Compare child and options declarations, then select items to inspect the group model.

<details>
<summary>Configuration details and limits</summary>

#### RadioGroup

In the radio group, you must set the `value` to identify the `radio`,
The radio group bind group checked identifiers.

#### Options API

Setting child elements via the `options` prop.

</details>

```demo
../example/demos/group-declaration-comparison.vue
```

### Vertical Direction

> For form validation of radio and radio group, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/vertical.vue
```

### Group state and readonly

A defined `model-value` is controlled: rejected updates do not change the selection. `default-value` initializes uncontrolled state only. Only Group emits `update:model-value → change(value, event?)` and notifies FormItem once; children do not duplicate these notifications.
Native checked values, ARIA state and selection styles stay synchronized with the model. A rejected group selection restores both the previous and clicked inputs; label, Enter and Space activation each propose one update.
Group inherits `disabled`, `readonly` and `error` from the form when omitted. An explicit `false` overrides the form; children cannot bypass a locked group.

```demo
../example/demos/en-US/group-state.vue
```

### Button sizes

Both libraries support `variant="button"`. RadioGroup supports `xs / sm / md / lg / xl`; size changes button height, not circular icons. Unset size inherits the form/global setting and finally defaults to md. The group variant takes precedence over its children.

```demo
../example/demos/en-US/button-sizes.vue
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

Radio accepts string, number, boolean or null; null means unselected. Selecting an already selected radio does not deselect it; the parent can clear it with null.
Use `default-value` only to initialize uncontrolled state. Rejected controlled proposals preserve the current selection. The event order is `update:model-value → change(value, event?)`; imperative calls have no native event.
Methods are `select()`, `focus(options?)` and `blur()`. Disabled controls cannot select or focus; readonly controls can focus but cannot change value. Enter on keydown and Space on keyup activate only the local control. Repeated Enter is ignored; blur/deactivation cancels pending Space activation.

```demo
../example/demos/en-US/control-value.vue
```

### Option data and labels

Both libraries accept primitive options or objects. `field-names` maps `label/value/disabled/readonly/indeterminate`; read-only options remain focusable but cannot change the value. Checkbox indeterminate is presentation only.
The `label` slot receives `{ data, checked }` and takes precedence over a label render function `(data, checked) => VNodeChild`. Data is normalized and retains business fields; source objects are not mutated. Missing labels fall back to the value's text.
Providing `options` replaces the default slot, including `[]`; omit it to use the default slot. Values must be strings, finite numbers or booleans; missing/invalid values and duplicate values of the same type are skipped (first occurrence wins). `false`, `0`, `''` and `'0'` remain distinct. Option changes never rewrite the model.
RadioGroup defaults to `null` (no selection). Set `model-value` to `null` to clear; `''` is a valid option, not an empty-state marker.

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

## Interaction and keyboard

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                 | Related examples   |
| ------------- | --------------------------------------- | ------------------ |
| `value`       | Option identity                         | Interaction states |
| `disabled`    | Disabled; inherits Form when omitted    | Interaction states |
| `readonly`    | Readonly; inherits Form when omitted    | Interaction states |
| `error`       | Error state; inherits Form when omitted | Interaction states |

<!-- demo-config-notes:end -->

Use this example for mutually exclusive choices. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Keyboard navigation

Tab enters the selected item, or the first enabled item. Arrow keys cycle; Home / End move to the first / last enabled item. Readonly items receive focus without changing the value. Navigation is local to the group and does not intercept embedded buttons.

```demo
../example/demos/en-US/keyboard-navigation.vue
```

## Control and content customization

### Native control and custom icons

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration     | Purpose                              | Related examples                                       |
| ----------------- | ------------------------------------ | ------------------------------------------------------ |
| `checked-color`   | Checked color                        | Native control and custom icons, Modify Icon And Color |
| `value`           | Option identity                      | Native control and custom icons                        |
| `icon-size`       | Icon size                            | Native control and custom icons                        |
| `readonly`        | Readonly; inherits Form when omitted | Native control and custom icons                        |
| `unchecked-color` | Unchecked color                      | Modify Icon And Color                                  |

<!-- demo-config-notes:end -->

Both libraries render a native radio input. Use name on the group for native form submission; aria-label/input-attrs address the input. Managed type, checked, disabled and tabindex take precedence over input-attrs. Icon slots replace only the icon; #radio replaces the complete visible content, so provide an accessible name.

```demo
../example/demos/en-US/native-control.vue
```

### Modify Icon And Color

```demo
../example/demos/set-style.vue
```

## Async options

### Asynchronous options

Enable Manual responses to start real local promises instead of the default timer. Load twice and resolve newest/oldest in either order: only the current request version may replace options or end loading. Removing options invalidates the outstanding version but preserves the selected business value; old tasks remain available to resolve manually. Applied/Ignored/Pending expose this behavior. Loading and responses do not count as user changes. Versioning and pending cleanup belong to this Demo's business loader, not an automatic Radio network-race guarantee; no external service is called.

Loading/removing options or updating the external value never emits reverse updates. Selected values absent from the current options are retained. Selecting the current value again does not emit change. false, zero and empty string retain their identity.

This demo simulates loading with an 800ms local delay. Set Device A or clear the selection while waiting: arriving options reflect the latest model without increasing the user-change count. Removing options while loading cancels the pending task so stale options do not reappear.

Arrow keys can still select existing options while loading. Reloading the same option values preserves focus. Keep the loading-status node stable to avoid remounting the group when the message changes; activating the current value again does not emit another change.

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

#### RadioGroup Props

| Arguments                | Description                                                                                            | Type                                                                                                    | Default      |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------ |
| model-value (v-model)    | Controlled value                                                                                       | RadioModel                                                                                              | undefined    |
| default-value            | Initial uncontrolled value                                                                             | RadioModel                                                                                              | null         |
| `disabled`               | Disabled; inherits Form when omitted                                                                   | _boolean_                                                                                               | `undefined`  |
| `readonly`               | Readonly; inherits Form when omitted                                                                   | _boolean_                                                                                               | `undefined`  |
| `error`                  | Error state; inherits Form when omitted                                                                | _boolean_                                                                                               | `undefined`  |
| variant                  | Group appearance                                                                                       | radio \| button                                                                                         | radio        |
| size                     | Button height only                                                                                     | ComponentSize                                                                                           | undefined    |
| `orientation`            | Horizontal/vertical arrangement of radio-group options, default horizontal; not text reading direction | _string_                                                                                                | `horizontal` |
| options                  | Options; replaces default slot when supplied                                                           | Array<ChoiceValue \| RadioOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined`  |
| `aria-label` _**3.8.5**_ | The label of the radio group                                                                           | _string_                                                                                                | `-`          |
| field-names              | Option field mapping                                                                                   | ChoiceFieldNames                                                                                        | undefined    |

#### RadioOption

| Field    | Description              | Type                                                              |
| -------- | ------------------------ | ----------------------------------------------------------------- |
| value    | Option identity          | ChoiceValue                                                       |
| label    | Label or render function | VNodeChild \| (data: RadioOption, checked: boolean) => VNodeChild |
| disabled | Disable interaction      | boolean                                                           |
| readonly | Read-only interaction    | boolean                                                           |

#### Radio Props

| Arguments             | Description                                      | Type                        | Default     |
| --------------------- | ------------------------------------------------ | --------------------------- | ----------- |
| model-value (v-model) | Controlled value                                 | ChoiceValue \| null         | undefined   |
| default-value         | Initial uncontrolled value                       | ChoiceValue \| null         | null        |
| variant               | Appearance; group configuration takes precedence | radio \| button             | radio       |
| value                 | Option identity                                  | string \| number \| boolean | true        |
| `checked-color`       | Checked color                                    | _string_                    | `-`         |
| `unchecked-color`     | Unchecked color                                  | _string_                    | `-`         |
| `icon-size`           | Icon size                                        | _string \| number_          | `-`         |
| `disabled`            | Inherit group/form when omitted                  | _boolean_                   | `undefined` |
| `readonly`            | Inherit group/form when omitted                  | _boolean_                   | `undefined` |
| `error`               | Error state; inherits group/form                 | _boolean_                   | `undefined` |
| `ripple`              | Whether to open ripple                           | _boolean_                   | `true`      |

### Methods

#### Radio Methods

| Method | Description                                  | Arguments              | Returns |
| ------ | -------------------------------------------- | ---------------------- | ------- |
| select | Request a selection; obeys disabled/readonly | -                      | void    |
| focus  | Focus the control                            | options?: FocusOptions | void    |
| blur   | Blur the control                             | -                      | void    |

### Events

#### RadioGroup Events

| Event                | Description                         | Arguments                   |
| -------------------- | ----------------------------------- | --------------------------- |
| `update:model-value` | Proposes a new value                | `value: any`                |
| `change`             | Value change; emitted only by Group | `value: any, event?: Event` |

#### Radio Events

| Event              | Description                        | Arguments                         |
| ------------------ | ---------------------------------- | --------------------------------- |
| `click`            | Triggered when the cell is clicked | `e: Event`                        |
| update:model-value | Proposes a new value               | value: ChoiceValue                |
| change             | Value change                       | value: ChoiceValue, event?: Event |
| focus              | Focus                              | event: FocusEvent                 |
| blur               | Blur                               | event: FocusEvent                 |

### Slots

#### RadioGroup Slots

| Slot    | Description                      | Arguments                           |
| ------- | -------------------------------- | ----------------------------------- |
| default | Children when options is omitted | -                                   |
| label   | Option label                     | data: RadioOption, checked: boolean |

#### Radio Slots

| Slot             | Description    | Arguments |
| ---------------- | -------------- | --------- |
| `checked-icon`   | Checked icon   | `-`       |
| `unchecked-icon` | Unchecked icon | `-`       |
| `default`        | Displayed text | `-`       |

### Style variables

| Variable                               | Default                                  |
| -------------------------------------- | ---------------------------------------- |
| `--mp-radio-control-color-checked`     | `var(--mp-sys-color-content-brand)`      |
| `--mp-radio-control-color`             | `var(--mp-sys-color-content-secondary)`  |
| `--mp-radio-control-color-disabled`    | `var(--mp-sys-color-content-disabled)`   |
| `--mp-radio-control-color-error`       | `var(--mp-sys-color-content-danger)`     |
| `--mp-radio-control-size`              | `24px`                                   |
| `--mp-radio-action-padding`            | `6px`                                    |
| `--mp-radio-label-text-color`          | `var(--mp-sys-color-content-primary)`    |
| `--mp-radio-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)`   |
| `--mp-radio-label-font-size`           | `var(--mp-font-size-md)`                 |
| `--mp-radio-label-gap`                 | `0`                                      |
| `--mp-radio-group-gap`                 | `0`                                      |
| `--mp-radio-animation-duration`        | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

Exported types：`RadioOption`、`ChoiceFieldNames`。

### Native attributes and appearance

| Component          | Prop        | Description                              | Type                | Default   |
| ------------------ | ----------- | ---------------------------------------- | ------------------- | --------- |
| Radio / RadioGroup | name        | Native field name; child overrides group | string              | undefined |
| Radio              | aria-label  | Native control accessible name           | string              | undefined |
| Radio              | input-attrs | Native input attributes                  | InputHTMLAttributes | undefined |

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

The `options` prop accepts an array or `(query, { signal }) => array/Promise`. The component manages loading, cancellation and stale-result isolation; failures emit load-error. Single/multiple groups initialize with an empty-string query, searchable fields reload when the query changes, and root loading for tree fields remains independent of existing load-more child loading.
