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

| Configuration | Purpose | Related examples |
| -------------- | --------------------------------------------------------- | -------- |
| `orientation` | Horizontal/vertical axis of the slider track and interaction, default horizontal; not the direction of value increments | Vertical |
| `aria-label` | Name, or separate names for range thumbs | Vertical |
| `range` | Fixed low/high thumbs; initial reversed values are sorted | Vertical |
| `show-tooltip` | true on hover/focus/drag, false hidden, always persistent | Vertical |

<!-- demo-config-notes:end -->


The parent provides a 300px height. Moving up increases the value; moving down decreases it. Range endpoints cannot cross. There is no separate reverse prop.

```demo
../example/demos/vertical.vue
```

## Content and presentation

### Tooltips and Custom Handles

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| -------------- | --------------------------------------------- | ---------------------------------- |
| `show-tooltip` | true on hover/focus/drag, false hidden, always persistent | Tooltips and Custom Handles, Slider thumbs and value labels |
| `range` | Fixed low/high thumbs; initial reversed values are sorted | slider-size, Slider thumbs and value labels |
| `aria-label` | Name, or separate names for range thumbs | Tooltips and Custom Handles |

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

| Configuration | Purpose | Related examples |
| -------------- | ----------------------------------------------- | -------------------------------------------- |
| `range` | Fixed low/high thumbs; initial reversed values are sorted | Ticks, Marks and Numeric Input, Controlled and Non-crossing Range, dual-thumb |
| `step` | Positive finite step aligned to min; max remains reachable | Ticks, Marks and Numeric Input, step-size |
| `aria-label` | Name, or separate names for range thumbs | Ticks, Marks and Numeric Input, Controlled and Non-crossing Range |
| `show-tooltip` | true on hover/focus/drag, false hidden, always persistent | Controlled and Non-crossing Range, range |
| `marks` | Map positions within the finite range to text | Ticks, Marks and Numeric Input |
| `show-ticks` | Show step ticks; dense ticks are reduced, up to 1000 | Ticks, Marks and Numeric Input |

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

### Pointer session cancellation

```demo
../example/demos/interaction-session.vue
```

## Usage notes

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

`before-commit({ value, previousValue }, done, { signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

### Pointer session cancellation

Every accepted pointer `start` has one `end`, including cancellation by disabling/readonly, bounds/step/orientation/range changes, capture loss, owner-window blur, KeepAlive deactivation, or unmount. `end` carries the last proposal from that gesture, or its initial value if it never proposed a `change`; changing range mode does not convert the old gesture's payload shape. Cancellation ends interaction, does not roll back earlier `change` proposals, and does not manufacture another model update. The parent still controls whether to accept proposals. A late pointerup/move cannot `end` the same gesture twice. Notification return Promises are not awaited.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

Steps align to a decimal grid anchored at min, retaining exact endpoints and range constraints; representable decimal and exponential steps are supported. The public model remains Number; increments below its representable spacing cannot be expressed. format-tooltip only changes display. Numeric inputs follow their normal blur commit and validation flow; Slider does not add another value publication.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Slider Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| model-value | SliderValue / null | undefined | Controlled number or range pair; null is explicitly empty. |
| default-value | SliderValue | 0 | Uncontrolled initial value; ranges normalize to an ascending pair. |
| min | number / string | 0 | Finite minimum, accepting decimal and exponential numeric strings. |
| max | number / string | 100 | Finite maximum; interaction is blocked when it does not exceed min. |
| step | number / string | 1 | Positive finite step anchored at min; invalid values fall back to 1. |
| range | boolean | false | Two-thumb range with ordered, noncrossing endpoints. |
| orientation | 'horizontal' / 'vertical' | 'horizontal' | Track orientation; invalid values produce a development diagnostic. |
| disabled | boolean | undefined | Disable interaction; inherited from the form when omitted. |
| readonly | boolean | undefined | Readonly retains focus and tooltips while blocking value changes. |
| error | boolean | undefined | Error appearance, inherited from the form when omitted. |
| marks | Record<number, string> | undefined | Text marks at positions within the range. |
| show-ticks | boolean | false | Display step ticks, capped at 1000. |
| show-input | boolean | false | Show an accompanying InputNumber, or two in range mode. The slider’s aria-describedby also applies to the number inputs and is combined with form error descriptions. An explicit aria-description is forwarded to both the slider and number inputs. Browsers prioritize a resolvable aria-describedby, so the two descriptions are not necessarily combined. |
| show-tooltip | boolean / 'always' | true | True shows on hover, focus or drag; false hides; always remains visible. |
| format-tooltip | SliderTooltipFormatter | undefined | Format tooltips and aria-valuetext without changing the model. |
| aria-label | string / [string, string] | undefined | Single-thumb name or names for the two range thumbs. |
| active-color | string | undefined | Selected track color. |
| track-color | string | undefined | Background track color. |
| thumb-color | string | undefined | Thumb color. |
| label-color | string | undefined | Tooltip background color. |
| label-text-color | string | undefined | Tooltip text color. |
| track-height | number / string | undefined | Track thickness, with numeric values in px; invalid lengths preserve theme defaults. |
| thumb-size | number / string | undefined | Thumb diameter, with numeric values in px; invalid lengths preserve theme defaults. |
| edit-mode | FieldEditMode<br>`'direct' \| 'popup'` | undefined | Field editing entry, inherited from the form when omitted, otherwise direct. |
| read-pretty | boolean | undefined | Common pure-reading state, independent of readonly and disabled. |
| before-commit | BeforeFieldCommit | undefined | Deferred confirmation protocol ({ value, previousValue }, done, { signal }); complete with a boolean, Promise or done; synchronous undefined waits for done. |
| open | boolean | undefined | Controlled deferred editor state. |
| default-open | boolean | false | Initial uncontrolled deferred editor state. |
| popup-container | PopupContainer | undefined | Deferred editor mount target: selector, HTMLElement or false. |
| clearable | boolean | false | Provide clearing in the deferred editor; does not add a clear button to the inline slider. |
| empty-value | SliderProps['emptyValue'] | undefined | Published clear override, including explicit null. |
| empty-values | readonly unknown[] | undefined | Empty-value recognition inherited through field, FormItem and Form. |
| empty-text | string | undefined | Default empty reading text; defaults to a dash after inheritance. |

In range mode, `aria-labelledby` names the range group; an `aria-label` array still names the two thumbs. An explicit `role` takes precedence.

### Behavior and keyboard

Arrows adjust by step, PageUp/PageDown by 10 steps, Home/End reach available endpoints. Range-thumb ARIA min/max follow the other thumb. When overlapping, clicks left/down separate the lower thumb, right/up the upper thumb. Keyboard events inside interactive thumb content are not intercepted. Readonly retains focus/tooltips; disabled leaves the Tab sequence.

Pointer Events unify mouse, touch and pen. pointerup commits final coordinates; pointercancel/lost capture ends the latest proposal. Disabling, unmounting or KeepAlive deactivation cleans listeners/capture and stops value events. Horizontal sliders allow vertical page scrolling; vertical sliders allow horizontal scrolling.

Controlled display changes only after parent updates; normalization does not emit automatically. change/update:model-value report distinct proposals; end includes the final proposal without guaranteeing acceptance. Each keyboard/numeric-input operation has start/end; a drag has one pair. Internal InputNumber does not duplicate Form validation.

### Slider Events

| Event | Arguments | Meaning |
| ------------------ | ------------- | ---------------------------- |
| update:model-value | `SliderValue` | Request an update |
| change | `SliderValue` | Distinct numeric proposal paired with the model event |
| start | — | Interaction starts |
| end | `SliderValue` | Final proposal when interaction ends |

### Slider Slots / Methods

The button slot receives { currentValue, index }; custom content retains keyboard behavior, ARIA and tooltips. The read slot receives { value, text }, retaining null/undefined and range models; text is the formatted value. focus(index=0) focuses the displayed thumb; blur() blurs the currently focused owned element, including show-input numeric controls, without affecting outside controls.

Exports SliderProps, SliderValue, SliderOrientation, SliderTooltipFormatter, SliderTooltipVisibility, SliderEmits, SliderSlots, SliderExpose, SliderInstance and runtime sliderProps.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-slider-active-color` | `var(--mp-sys-color-action-primary)` | `background`, `outline` |
| `--mp-slider-control-height` | `var(--mp-sys-control-height-md)` | `height`, `min-height`, `padding-bottom`, `padding-inline-end`, `width` |
| `--mp-slider-disabled-color` | `var(--mp-sys-color-content-disabled)` | `background`, `border-color` |
| `--mp-slider-error-color` | `var(--mp-sys-color-content-danger)` | `background`, `border-color` |
| `--mp-slider-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-slider-gap` | `var(--mp-sys-space-4)` | `bottom`, `gap`, `left`, `padding` |
| `--mp-slider-input-width` | `80px` | `width` |
| `--mp-slider-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-slider-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-slider-thumb-border-color` | `var(--mp-sys-color-action-primary)` | `border` |
| `--mp-slider-thumb-color` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-slider-thumb-size` | `16px` | `height`, `width` |
| `--mp-slider-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | `background` |
| `--mp-slider-tooltip-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-slider-track-color` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-slider-track-height` | `4px` | `height`, `width` |
| `--mp-slider-transition-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-slider-active-color: var(--mp-sys-color-action-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
