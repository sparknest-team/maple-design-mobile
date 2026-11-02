<!-- Source: src/slider/docs/en-US.md; locale: en-US; page: /en-US/slider -->

# Slider

Select a value or non-crossing interval within finite bounds.

## 案例

### basic-usage

Example source: src/slider/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### readonly

Example source: src/slider/example/demos/readonly.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value3" readonly />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### step-size

Example source: src/slider/example/demos/step-size.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value2" :step="10" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### dual-thumb

Example source: src/slider/example/demos/dual-thumb.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
function handleChange(v) {
  console.log(v)
}
</script>

<template>
  <mp-slider v-model="values.value1" range @change="handleChange" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### range

Example source: src/slider/example/demos/range.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value11" :max="210" :min="-50" show-tooltip="always" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### disable

Example source: src/slider/example/demos/disable.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value3" disabled />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### slider-size

Example source: src/slider/example/demos/slider-size.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value10" track-height="1.5vmin" range />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### custom-style

Example source: src/slider/example/demos/custom-style.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider
    v-model="values.value4"
    label-color="purple"
    active-color="#e0732c"
    track-color="#3a68b4"
    thumb-color="#e25241"
    label-text-color="#ededed"
  />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### custom-btn

Example source: src/slider/example/demos/custom-btn.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value9" range active-color="#52af77">
    <template #button="{ currentValue }">
      <div class="slider-example__block">{{ currentValue }}</div>
    </template>
  </mp-slider>
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### show-label

Example source: src/slider/example/demos/show-label.vue

```vue
<script setup>
import { reactive } from 'vue'

const values = reactive({
  value: 3,
  value1: [24, 50],
  value2: 25,
  value3: 40,
  value4: 20,
  value5: 20,
  value6: 70,
  value7: 50,
  value9: [5, 38],
  value10: [7, 64],
  value11: 0,
  value12: 50,
  value13: [7, 64],
})
</script>

<template>
  <mp-slider v-model="values.value5" :show-tooltip="false" />
  <mp-slider v-model="values.value6" />
  <mp-slider v-model="values.value7" show-tooltip="always" />
</template>

<style>
.slider-example__block {
  width: 24px;
  border: 1px solid #52af77;
  color: #52af77;
  height: 24px;
  margin: 0 -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: #fff;
}
</style>
```

### Vertical

The parent provides a 300px height. Moving up increases the value; moving down decreases it. Range endpoints cannot cross. There is no separate reverse prop.

Example source: src/slider/example/demos/vertical.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(50)
const pair = ref([7, 64])
</script>

<template>
  <section class="slider-vertical-demo">
    <mp-space justify="space-around">
      <div class="slider-vertical-demo__track">
        <mp-slider v-model="value" presentation="inline" orientation="vertical" aria-label="Vertical value" />
      </div>
      <div class="slider-vertical-demo__track">
        <mp-slider
          v-model="pair"
          presentation="inline"
          range
          show-tooltip="always"
          orientation="vertical"
          :aria-label="['Vertical minimum', 'Vertical maximum']"
        />
      </div>
    </mp-space>
    <output aria-label="Vertical values">{{ value }} / {{ pair[0] }}–{{ pair[1] }}</output>
  </section>
</template>

<style scoped>
.slider-vertical-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.slider-vertical-demo__track {
  height: 300px;
}
</style>
```

### Ticks, Marks and Numeric Input

Numeric input follows the slider step and bounds. Range endpoints cannot cross each other.

Example source: src/slider/example/demos/keyboard-input.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(30)
const pair = ref([20, 80])
const marks = { 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }
</script>
<template>
  <div style="display: grid; gap: 32px; padding: 24px 12px">
    <mp-slider v-model="value" :step="5" :marks="marks" show-ticks show-input aria-label="Volume" />
    <mp-slider
      v-model="pair"
      range
      show-input
      :aria-label="['Minimum', 'Maximum']"
      :format-tooltip="(value) => value + '%'"
    />
  </div>
</template>
```

### Tooltips and Custom Handles

Example source: src/slider/example/demos/touch-and-labels.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(45)
</script>
<template>
  <div style="display: grid; gap: 36px; padding: 32px 12px">
    <mp-slider v-model="value" show-tooltip="always" aria-label="Always visible" />
    <mp-slider
      v-model="value"
      :show-tooltip="false"
      active-color="#722ed1"
      thumb-color="#f4edff"
      :track-height="8"
      :thumb-size="24"
      aria-label="Custom size"
    />
    <mp-slider v-model="value" aria-label="Custom handle"
      ><template #button="{ currentValue }"
        ><span class="slider-custom-handle">{{ currentValue }}</span></template
      ></mp-slider
    >
  </div>
</template>
<style scoped>
.slider-custom-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: white;
  transform: translate(-6px, -6px);
}
</style>
```

### Controlled and Non-crossing Range

The range accepts model updates. The fixed-value slider records proposals without accepting them; readonly and disabled sliders keep their values.

Example source: src/slider/example/demos/controlled-range.vue

```vue
<script setup>
import { ref } from 'vue'

const accepted = ref([30, 70])
const proposed = ref(50)
</script>
<template>
  <div style="display: grid; gap: 28px; padding: 24px 12px">
    <mp-slider v-model="accepted" range show-tooltip="always" :aria-label="['Minimum', 'Maximum']" />
    <mp-slider :model-value="50" aria-label="Controlled rejection" @update:model-value="proposed = $event" />
    <output>{{ proposed }}</output>
    <mp-slider :default-value="40" readonly aria-label="Read only" />
    <mp-slider :default-value="40" disabled aria-label="Disabled" />
  </div>
</template>
```

### Interaction states

Use this example for adjusting values within a continuous range. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/slider/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(30)
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-slider v-model="value" v-bind="__demoState"></mp-slider>
  </mp-space>
</template>
```

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


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
