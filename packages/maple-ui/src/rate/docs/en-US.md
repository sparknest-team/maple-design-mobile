# Rate

## Examples

### Intro

Used to rate things.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Customize Total Rating

Set the total rating through the `count` attribute.

```demo
../example/demos/custom-total-rating.vue
```

### Customize Rating Icon Style

Set the selected and unselected icons through the `icon` and `empty-icon` properties.
Set the selected and unselected colors through the `color` and `empty-color` properties.

```demo
../example/demos/custom-rating-icon-style.vue
```

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

### Disabled And Readonly

The `disabled` property sets the score to the no-click state, and `disabled-color` sets the icon color when disabled.
The score is set to read-only via the `readonly` property.

```demo
../example/demos/disabled-and-readonly.vue
```

### Can Be Cleared

The `clearable` property allows users to clear score.

```demo
../example/demos/clearable.vue
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

### Sizes and symbols

```demo
../example/demos/sizes-and-symbols.en-US.vue
```

### Interaction states

Use this example for rating feedback. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

```demo
../example/demos/state-lab.vue
```

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value | Controlled value, including zero; external updates emit no events | number | undefined |
| default-value | Initial uncontrolled value; subsequent changes do not reset it | number | 0 |
| count | Positive finite number, rounded down; invalid values fall back to 5 | number \| string | 5 |
| allow-half | Enable half-point steps | boolean | false |
| clearable | Click the current score again to clear; keyboard boundaries do not clear | boolean | false |
| grading | Fixed five-face rating; overrides slots and icon props | boolean | false |
| disabled | Disable interaction; inherits Form when omitted | boolean | undefined |
| readonly | Focusable but not editable; inherits Form when omitted | boolean | undefined |
| aria-label | Accessible business label | string | undefined |
| size | Icon dimension: number/numeric string in px, otherwise CSS length | number \| string | Theme default |
| gap | Icon spacing: number/numeric string in px, otherwise CSS length | number \| string | Theme default |
| color | Active color or increasing per-icon threshold color map | string \| Record<string, string> | undefined |
| empty-color | Inactive color | string | undefined |
| disabled-color | Disabled color, overriding active/inactive colors | string | undefined |
| icon | Active icon | string \| Component | Star |
| half-icon | Half icon | string \| Component | Half star |
| empty-icon | Inactive icon | string \| Component | Empty star |
| ripple | Click ripple | boolean | true |

size/gap do not accept xs/sm/md/lg/xl. Missing, invalid and non-positive values retain theme defaults. CSS var/calc/min/max/clamp lengths are supported. Values normalize to the 1 or 0.5 step and the 0–count range without writing back to the controlled model; non-finite values display zero.

### Events

| Event | Arguments | Description |
| --- | --- | --- |
| update:model-value | value: number | User produces a new value |
| change | value: number | Confirmed new value; no duplicate for equal values |
| hover-change | value: number | Hover preview; resets to zero on leave/blur/disabled/readonly |

### Slots and methods

character receives { index, value, active }; index is zero-based, value is one-based. Priority: grading > character > icon/half-icon/empty-icon > defaults. String icons require registration; component icons do not.

focus() focuses the control; blur() removes focus. Readonly remains focusable; disabled leaves the Tab sequence. Arrow keys adjust, Home resets and End selects maximum. Child controls and Alt/Ctrl/Meta shortcuts retain keyboard ownership. Touch taps follow the same half-point and clearable rules as mouse clicks.

### Types

RateProps, RateColor, RateIcon, RateInstance, RateExpose, RateEmits, RateCharacterSlotProps.

### Style tokens

| Token | Default |
| --- | --- |
| `--mp-rate-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-rate-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-rate-active-scale` | `1.2` |
| `--mp-rate-focus-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-rate-focus-width` | `2px` |
| `--mp-rate-focus-offset` | `2px` |
| `--mp-rate-size` | `24px` |
| `--mp-rate-gap` | `0px` |
| `--mp-rate-min-height` | `0px` |
| `--mp-rate-action-padding` | `4px` |
| `--mp-rate-empty-color` | `var(--mp-color-text)` |
| `--mp-rate-active-color` | `var(--mp-color-primary)` |
| `--mp-rate-transition-duration` | `250ms` |
| `--mp-rate-scale-duration` | `250ms` |
| `--mp-rate-transition-timing-function` | `ease` |

Both libraries expose the same token suffixes. Cedar retains gold stars and compact spacing; Maple retains primary-color stars and touch padding. Only token defaults and local Form integration differ. Tokens are independently maintained; no runtime is shared.

`transition-duration` controls hover/color transitions, `scale-duration` controls selection animation, and `transition-timing-function` controls easing. Reduced motion disables these animations. `size` and `gap` props override the corresponding tokens for a single instance.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
