# Rate

### Intro

Used to rate things.

## Basic examples

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

## Appearance and states

### Disabled And Readonly

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                                | Related examples      |
| ------------- | ------------------------------------------------------ | --------------------- |
| `disabled`    | Disable interaction; inherits Form when omitted        | Disabled And Readonly |
| `readonly`    | Focusable but not editable; inherits Form when omitted | Disabled And Readonly |

<!-- demo-config-notes:end -->

The `disabled` property sets the score to the no-click state, and `disabled-color` sets the icon color when disabled.
The score is set to read-only via the `readonly` property.

```demo
../example/demos/disabled-and-readonly.vue
```

## Content and presentation

### Customize Rating Icon Size And Gap

Use the `size` property to set the size of the score icon.
Set the interval between scores via the `gap` property.

```demo
../example/demos/custom-rating-icon-size-and-gap.vue
```

### Allow Half Rating

The `allow-half` attribute is used to set the rating to semi selective, and the `half-icon` attribute is used to set the style of semi selective.

```demo
../example/demos/half-star.vue
```

### Rating count and clearing

Compare rating totals and clearing the current selection, separately from half steps, keyboards and controlled values.

<details>
<summary>Configuration details and limits</summary>

#### Can Be Cleared

The `clearable` property allows users to clear score.

#### Customize Total Rating

Set the total rating through the `count` attribute.

</details>

```demo
../example/demos/value-rules-comparison.vue
```

### Sizes and symbols

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration   | Purpose                                                             | Related examples                                                |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| `allow-half`    | Enable half-point steps                                             | Sizes and symbols, Allow Half Rating, Rating count and clearing |
| `size`          | Icon dimension: number/numeric string in px, otherwise CSS length   | Sizes and symbols, Customize Rating Icon Size And Gap           |
| `gap`           | Icon spacing: number/numeric string in px, otherwise CSS length     | Sizes and symbols, Customize Rating Icon Size And Gap           |
| `count`         | Positive finite number, rounded down; invalid values fall back to 5 | Allow Half Rating, Rating count and clearing                    |
| `default-value` | Initial uncontrolled value; subsequent changes do not reset it      | Sizes and symbols                                               |
| `aria-label`    | Accessible business label                                           | Sizes and symbols                                               |

<!-- demo-config-notes:end -->

```demo
../example/demos/sizes-and-symbols.en-US.vue
```

## Customization and slots

### Customize Rating Icon Style

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose                                                 | Related examples            |
| ------------- | ------------------------------------------------------- | --------------------------- |
| `icon`        | Checked icon                                            | Customize Rating Icon Style |
| `empty-icon`  | Unchecked icon                                          | Customize Rating Icon Style |
| `color`       | Active color or increasing per-icon threshold color map | Customize Rating Icon Style |
| `empty-color` | Inactive color                                          | Customize Rating Icon Style |

<!-- demo-config-notes:end -->

Set the selected and unselected icons through the `icon` and `empty-icon` properties.
Set the selected and unselected colors through the `color` and `empty-color` properties.

```demo
../example/demos/custom-rating-icon-style.vue
```

## Interaction and control

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration   | Purpose                                                                  | Related examples                       |
| --------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| `disabled`      | Disable interaction; inherits Form when omitted                          | Interaction states, Keyboard and state |
| `readonly`      | Focusable but not editable; inherits Form when omitted                   | Interaction states, Keyboard and state |
| `allow-half`    | Enable half-point steps                                                  | Keyboard and state                     |
| `clearable`     | Click the current score again to clear; keyboard boundaries do not clear | Keyboard and state                     |
| `aria-label`    | Accessible business label                                                | Keyboard and state                     |
| `default-value` | Initial uncontrolled value; subsequent changes do not reset it           | Keyboard and state                     |

<!-- demo-config-notes:end -->

Use this example for rating feedback. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

### Listen Event

Other interaction logic is completed by calling the `change` event.

> For form validation of the rate, please use the [FormItem component](#/en-US/form-item).

```demo
../example/demos/listen-event.vue
```

### Keyboard and state

```demo
../example/demos/keyboard.en-US.vue
```

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit empty-values, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop         | Type               | Default and scope                                                           |
| ------------ | ------------------ | --------------------------------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text   | string             | Field > FormItem > Form > '-'; explicit '' is valid                         |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Props

| Prop           | Description                                                              | Type                             | Default       |
| -------------- | ------------------------------------------------------------------------ | -------------------------------- | ------------- |
| model-value    | Controlled value, including zero; external updates emit no events        | number                           | undefined     |
| default-value  | Initial uncontrolled value; subsequent changes do not reset it           | number                           | 0             |
| count          | Positive finite number, rounded down; invalid values fall back to 5      | number \| string                 | 5             |
| allow-half     | Enable half-point steps                                                  | boolean                          | false         |
| clearable      | Click the current score again to clear; keyboard boundaries do not clear | boolean                          | false         |
| grading        | Fixed five-face rating; overrides slots and icon props                   | boolean                          | false         |
| disabled       | Disable interaction; inherits Form when omitted                          | boolean                          | undefined     |
| readonly       | Focusable but not editable; inherits Form when omitted                   | boolean                          | undefined     |
| aria-label     | Accessible business label                                                | string                           | undefined     |
| size           | Icon dimension: number/numeric string in px, otherwise CSS length        | number \| string                 | Style default |
| gap            | Icon spacing: number/numeric string in px, otherwise CSS length          | number \| string                 | Style default |
| color          | Active color or increasing per-icon threshold color map                  | string \| Record<string, string> | undefined     |
| empty-color    | Inactive color                                                           | string                           | undefined     |
| disabled-color | Disabled color, overriding active/inactive colors                        | string                           | undefined     |
| icon           | Checked icon                                                             | string \| Component              | Filled star   |
| half-icon      | Half icon                                                                | string \| Component              | Half star     |
| empty-icon     | Unchecked icon                                                           | string \| Component              | Empty star    |
| ripple         | Click ripple                                                             | boolean                          | true          |

size/gap do not accept xs/sm/md/lg/xl presets. Omitted, invalid or nonpositive values retain style defaults. CSS var/calc/min/max/clamp lengths are supported. Ratings normalize to 0–count in steps of 1 or 0.5. Nonfinite ratings display 0 without rewriting the external value.

### Events

| Event              | Arguments     | Description                                                   |
| ------------------ | ------------- | ------------------------------------------------------------- |
| update:model-value | value: number | User produces a new value                                     |
| change             | value: number | Confirmed new value; no duplicate for equal values            |
| hover-change       | value: number | Hover preview; resets to zero on leave/blur/disabled/readonly |

### Slots

| Slot      | Arguments                | Description                                                   |
| --------- | ------------------------ | ------------------------------------------------------------- |
| character | { index, value, active } | index starts at 0; value starts at 1. Replaces rating symbols |

Precedence: grading > character > icon/half-icon/empty-icon > default icon. String icons require global registration; component values do not.

### Methods

focus() focuses the rating; blur() removes focus. Readonly remains focusable, while disabled leaves the Tab sequence. Arrow keys adjust, Home clears and End selects the maximum. Keyboard events from interactive children and Alt/Ctrl/Meta combinations are not intercepted. Touch and mouse share half-selection/clearing rules.

### Type definitions

Exports RateProps, RateColor, RateIcon, RateInstance, RateExpose, RateEmits and RateCharacterSlotProps.

### Style variables

| Token                                  | Default                                |
| -------------------------------------- | -------------------------------------- |
| `--mp-rate-disabled-color`             | `var(--mp-sys-color-content-disabled)` |
| `--mp-rate-error-color`                | `var(--mp-sys-color-content-danger)`   |
| `--mp-rate-active-scale`               | `1.2`                                  |
| `--mp-rate-focus-color`                | `var(--mp-sys-color-content-brand)`    |
| `--mp-rate-focus-width`                | `2px`                                  |
| `--mp-rate-focus-offset`               | `2px`                                  |
| `--mp-rate-size`                       | `24px`                                 |
| `--mp-rate-gap`                        | `0px`                                  |
| `--mp-rate-min-height`                 | `0px`                                  |
| `--mp-rate-action-padding`             | `4px`                                  |
| `--mp-rate-empty-color`                | `var(--mp-color-text)`                 |
| `--mp-rate-active-color`               | `var(--mp-color-primary)`              |
| `--mp-rate-transition-duration`        | `250ms`                                |
| `--mp-rate-scale-duration`             | `250ms`                                |
| `--mp-rate-transition-timing-function` | `ease`                                 |

Public token suffixes/meanings match across platforms. Cedar retains gold stars and compact spacing; Maple retains primary-color stars and touch padding. Defaults are recorded in the theme contract. Sources are maintained independently without a shared runtime.

`transition-duration` controls hover/color transitions, `scale-duration` controls selection animation, and `transition-timing-function` controls easing. Reduced motion disables these animations. `size` and `gap` props override the corresponding tokens for a single instance.

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

## Configuring the cleared value

`empty-value` / `emptyValue` sets the model value produced by clearing. It accepts a value in the component model type or a zero-argument factory. Omission preserves the existing default; use `() => undefined` to distinguish omission from returning undefined. Arrays are shallow-copied on every clear; selected items that cannot be cleared remain. It does not redefine emptiness, alter Form reset defaults or treat 0/false as universally empty.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
