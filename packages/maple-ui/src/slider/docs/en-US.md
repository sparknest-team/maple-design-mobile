# Slider

Select a value or non-crossing interval within finite bounds.

## 案例

### basic-usage

```demo
../example/demos/basic-usage.vue
```

### readonly

```demo
../example/demos/readonly.vue
```

### step-size

```demo
../example/demos/step-size.vue
```

### dual-thumb

```demo
../example/demos/dual-thumb.vue
```

### range

```demo
../example/demos/range.vue
```

### disable

```demo
../example/demos/disable.vue
```

### slider-size

```demo
../example/demos/slider-size.vue
```

### custom-style

```demo
../example/demos/custom-style.vue
```

### custom-btn

```demo
../example/demos/custom-btn.vue
```

### show-label

```demo
../example/demos/show-label.vue
```

### Vertical

The parent provides a 300px height. Moving up increases the value; moving down decreases it. Range endpoints cannot cross. There is no separate reverse prop.

```demo
../example/demos/vertical.vue
```

### Ticks, Marks and Numeric Input

Numeric input follows the slider step and bounds. Range endpoints cannot cross each other.

```demo
../example/demos/keyboard-input.vue
```

### Tooltips and Custom Handles

```demo
../example/demos/touch-and-labels.vue
```

### Controlled and Non-crossing Range

The range accepts model updates. The fixed-value slider records proposals without accepting them; readonly and disabled sliders keep their values.

```demo
../example/demos/controlled-range.vue
```

### Interaction states

Use this example for adjusting values within a continuous range. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

| Prop | Meaning | Type | Default |
| --- | --- | --- | --- |
| model-value / default-value | Controlled value / initial uncontrolled value | `SliderValue` | undefined / 0 |
| min / max | Bounds; invalid values use 0/100, max<=min disables interaction | `number\|string` | 0 / 100 |
| step | Positive finite step aligned to min; max remains reachable | `number\|string` | 1 |
| range | Fixed low/high thumbs; initial reversed values are sorted | `boolean` | false |
| orientation | Vertical requires parent height | `horizontal\|vertical` | horizontal |
| disabled / readonly / error | Inherit applicable Form state when omitted | `boolean` | inherited |
| show-ticks / marks | Step ticks (up to 1000) / labels at numeric positions | `boolean / Record<number,string>` | false / undefined |
| show-input | InputNumber; Enter or blur commits via the same model | `boolean` | false |
| show-tooltip | true on hover/focus/drag, false hidden, always persistent | `boolean\|'always'` | true |
| format-tooltip | Formats tooltip and aria-valuetext | `(number)=>string\|number` | raw value |
| aria-label | Name, or separate names for range thumbs | `string\|[string,string]` | — |
| active-color / track-color / thumb-color | Fill, track and thumb colors | `string` | tokens |
| label-color / label-text-color | Tooltip colors | `string` | tokens |
| track-height / thumb-size | CSS lengths; numbers are px; invalid values leave token defaults | `number\|string` | tokens |

### Interaction

Arrows move one step; PageUp/PageDown ten steps; Home/End reach the available endpoints. Range ARIA bounds follow the other thumb. Coincident thumbs can be separated by clicking below/above their value. Readonly retains focus; disabled is removed from Tab order. Embedded interactive slot content retains its keyboard handling.

Pointer Events cover mouse/touch/pen; pointerup applies final coordinates. Cancel/lost capture ends the latest proposal. Disabling, unmounting or KeepAlive deactivation removes listeners/capture. Controlled values change only after parent acceptance; normalization does not emit. InputNumber does not duplicate parent Form validation.

### Events, slots and methods

update:model-value and change carry SliderValue once per distinct proposal. start has no payload; end carries the final proposal, not a guarantee of controlled acceptance. Keyboard and number-input actions each emit a start/end pair; a pointer drag emits one pair.

button slot receives `{ currentValue,index }`; custom content retains tooltip/keyboard/ARIA. Exposes focus(index=0) in displayed order and blur(). Removed label-visible is replaced directly by show-tooltip; no alias.

Exports SliderProps, SliderValue, SliderOrientation, SliderTooltipFormatter, SliderTooltipVisibility, SliderEmits, SliderSlots, SliderExpose, SliderInstance and sliderProps. Libraries maintain independent copies; only installation/Form wiring differ.

### Style variables

| Variable | Default |
| --- | --- |
| `--mp-slider-active-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-slider-track-color` | `var(--mp-sys-color-state-hover)` |
| `--mp-slider-thumb-color` | `var(--mp-sys-color-surface-default)` |
| `--mp-slider-thumb-border-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-slider-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-slider-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` |
| `--mp-slider-tooltip-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-slider-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-slider-disabled-color` | `var(--mp-sys-color-content-disabled)` |
| `--mp-slider-track-height` | `4px` |
| `--mp-slider-thumb-size` | `16px` |
| `--mp-slider-control-height` | `var(--mp-sys-control-height-md)` |
| `--mp-slider-font-size` | `var(--mp-sys-font-size-sm)` |
| `--mp-slider-gap` | `var(--mp-sys-space-4)` |
| `--mp-slider-radius` | `var(--mp-sys-radius-md)` |
| `--mp-slider-transition-duration` | `var(--mp-sys-motion-duration-fast)` |
| `--mp-slider-input-width` | `80px` |

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。
