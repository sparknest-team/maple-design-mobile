# Slider

Select a value or non-crossing interval within finite bounds.

## Basic examples

### basic-usage

```demo
../example/demos/basic-usage.vue
```

## Layout and arrangement

### Vertical

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration  | Purpose                                                                                                                 | Related examples |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `orientation`  | Horizontal/vertical axis of the slider track and interaction, default horizontal; not the direction of value increments | Vertical         |
| `aria-label`   | Name, or separate names for range thumbs                                                                                | Vertical         |
| `range`        | Fixed low/high thumbs; initial reversed values are sorted                                                               | Vertical         |
| `show-tooltip` | true on hover/focus/drag, false hidden, always persistent                                                               | Vertical         |

<!-- demo-config-notes:end -->

The parent provides a 300px height. Moving up increases the value; moving down decreases it. Range endpoints cannot cross. There is no separate reverse prop.

```demo
../example/demos/vertical.vue
```

## Content and presentation

### Tooltips and Custom Handles

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration  | Purpose                                                   | Related examples                                            |
| -------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| `show-tooltip` | true on hover/focus/drag, false hidden, always persistent | Tooltips and Custom Handles, Slider thumbs and value labels |
| `range`        | Fixed low/high thumbs; initial reversed values are sorted | slider-size, Slider thumbs and value labels                 |
| `aria-label`   | Name, or separate names for range thumbs                  | Tooltips and Custom Handles                                 |

<!-- demo-config-notes:end -->

```demo
../example/demos/touch-and-labels.vue
```

### slider-size

```demo
../example/demos/slider-size.vue
```

### custom-style

```demo
../example/demos/custom-style.vue
```

### Slider thumbs and value labels

Drag the sliders to compare custom thumbs and value labels independently of steps, ranges and keyboard models.

```demo
../example/demos/thumb-label-comparison.vue
```

## Interaction and control

### Interaction state comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration  | Purpose                                                    | Related examples                                                              |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `range`        | Fixed low/high thumbs; initial reversed values are sorted  | Ticks, Marks and Numeric Input, Controlled and Non-crossing Range, dual-thumb |
| `step`         | Positive finite step aligned to min; max remains reachable | Ticks, Marks and Numeric Input, step-size                                     |
| `aria-label`   | Name, or separate names for range thumbs                   | Ticks, Marks and Numeric Input, Controlled and Non-crossing Range             |
| `show-tooltip` | true on hover/focus/drag, false hidden, always persistent  | Controlled and Non-crossing Range, range                                      |
| `marks`        | Map positions within the finite range to text              | Ticks, Marks and Numeric Input                                                |
| `show-ticks`   | Show step ticks; dense ticks are reduced, up to 1000       | Ticks, Marks and Numeric Input                                                |

<!-- demo-config-notes:end -->

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for adjusting values within a continuous range. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

```demo
../example/demos/state-lab.vue
```

### Ticks, Marks and Numeric Input

Numeric input follows the slider step and bounds. Range endpoints cannot cross each other.

```demo
../example/demos/keyboard-input.vue
```

### step-size

```demo
../example/demos/step-size.vue
```

### Controlled and Non-crossing Range

The range accepts model updates. The fixed-value slider records proposals without accepting them; readonly and disabled sliders keep their values.

```demo
../example/demos/controlled-range.vue
```

### dual-thumb

```demo
../example/demos/dual-thumb.vue
```

### range

```demo
../example/demos/range.vue
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

| Prop                                     | Description                                                                                                             | Type                             | Default        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------- | -------------- |
| model-value                              | Controlled value; range uses a tuple                                                                                    | `SliderValue`                    | —              |
| default-value                            | Initial uncontrolled value                                                                                              | `SliderValue`                    | `0`            |
| min / max                                | Finite bounds; numeric strings are accepted. Invalid values fall back to 0/100. max<=min blocks interaction             | `number \| string`               | `0 / 100`      |
| step                                     | Positive finite step aligned to min; max remains reachable                                                              | `number \| string`               | `1`            |
| range                                    | Fixed low/high thumbs; initial reversed values are sorted                                                               | `boolean`                        | `false`        |
| orientation                              | Horizontal/vertical axis of the slider track and interaction, default horizontal; not the direction of value increments | `horizontal \| vertical`         | `horizontal`   |
| disabled / readonly / error              | Inherits applicable FormItem/Form state when omitted; readonly is focusable but cannot change values                    | `boolean`                        | Inherited      |
| show-ticks                               | Show step ticks; dense ticks are reduced, up to 1000                                                                    | `boolean`                        | `false`        |
| marks                                    | Map positions within the finite range to text                                                                           | `Record<number,string>`          | —              |
| show-input                               | InputNumber; Enter or blur commits via the same model                                                                   | `boolean`                        | `false`        |
| show-tooltip                             | true on hover/focus/drag, false hidden, always persistent                                                               | `boolean \| 'always'`            | `true`         |
| format-tooltip                           | Formats tooltip and aria-valuetext                                                                                      | `(value:number)=>string\|number` | Original value |
| aria-label                               | Name, or separate names for range thumbs                                                                                | `string \| [string,string]`      | —              |
| active-color / track-color / thumb-color | Active track/background/thumb fill colors                                                                               | `string`                         | CSS variable   |
| label-color / label-text-color           | Tooltip background/text colors                                                                                          | `string`                         | CSS variable   |
| track-height / thumb-size                | Track thickness/thumb diameter in numeric px or CSS lengths; invalid values retain theme defaults                       | `number \| string`               | CSS variable   |

### Behavior and keyboard

Arrows adjust by step, PageUp/PageDown by 10 steps, Home/End reach available endpoints. Range-thumb ARIA min/max follow the other thumb. When overlapping, clicks left/down separate the lower thumb, right/up the upper thumb. Keyboard events inside interactive thumb content are not intercepted. Readonly retains focus/tooltips; disabled leaves the Tab sequence.

Pointer Events unify mouse, touch and pen. pointerup commits final coordinates; pointercancel/lost capture ends the latest proposal. Disabling, unmounting or KeepAlive deactivation cleans listeners/capture and stops value events. Horizontal sliders allow vertical page scrolling; vertical sliders allow horizontal scrolling.

Controlled display changes only after parent updates; normalization does not emit automatically. change/update:model-value report distinct proposals; end includes the final proposal without guaranteeing acceptance. Each keyboard/numeric-input operation has start/end; a drag has one pair. Internal InputNumber does not duplicate Form validation. label-visible is removed; use show-tooltip without a compatibility alias.

### Events

| Event              | Arguments     | Meaning                                               |
| ------------------ | ------------- | ----------------------------------------------------- |
| update:model-value | `SliderValue` | Request an update                                     |
| change             | `SliderValue` | Distinct numeric proposal paired with the model event |
| start              | —             | Interaction starts                                    |
| end                | `SliderValue` | Final proposal when interaction ends                  |

### Slots / Methods

The button slot receives `{ currentValue:number,index:number }`. Custom content retains keyboard, ARIA and tooltip behavior. focus(index=0) focuses thumbs in display order; blur() removes focus.

Exports SliderProps, SliderValue, SliderOrientation, SliderTooltipFormatter, SliderTooltipVisibility, SliderEmits, SliderSlots, SliderExpose, SliderInstance and runtime sliderProps. Component bodies/styles are independently copied; installation/Form integration remain local to each library.

### Style variables

| Variable                          | Default                                 |
| --------------------------------- | --------------------------------------- |
| `--mp-slider-active-color`        | `var(--mp-sys-color-content-brand)`     |
| `--mp-slider-track-color`         | `var(--mp-sys-color-state-hover)`       |
| `--mp-slider-thumb-color`         | `var(--mp-sys-color-surface-default)`   |
| `--mp-slider-thumb-border-color`  | `var(--mp-sys-color-content-brand)`     |
| `--mp-slider-text-color`          | `var(--mp-sys-color-content-secondary)` |
| `--mp-slider-tooltip-background`  | `var(--mp-sys-color-surface-tooltip)`   |
| `--mp-slider-tooltip-color`       | `var(--mp-sys-color-content-on-dark)`   |
| `--mp-slider-error-color`         | `var(--mp-sys-color-content-danger)`    |
| `--mp-slider-disabled-color`      | `var(--mp-sys-color-content-disabled)`  |
| `--mp-slider-track-height`        | `4px`                                   |
| `--mp-slider-thumb-size`          | `16px`                                  |
| `--mp-slider-control-height`      | `var(--mp-sys-control-height-md)`       |
| `--mp-slider-font-size`           | `var(--mp-sys-font-size-sm)`            |
| `--mp-slider-gap`                 | `var(--mp-sys-space-4)`                 |
| `--mp-slider-radius`              | `var(--mp-sys-radius-md)`               |
| `--mp-slider-transition-duration` | `var(--mp-sys-motion-duration-fast)`    |
| `--mp-slider-input-width`         | `80px`                                  |

### Form field presentation and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-`direct` modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
