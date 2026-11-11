<!-- Source: src/slider/docs/en-US.md; locale: en-US; page: /en-US/slider -->

# Slider

Select a value or non-crossing interval within finite bounds.

## Basic examples

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
        <mp-slider v-model="value" edit-mode="direct" orientation="vertical" aria-label="Vertical value" />
      </div>
      <div class="slider-vertical-demo__track">
        <mp-slider
          v-model="pair"
          edit-mode="direct"
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


Example source: src/slider/example/demos/touch-and-labels.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(45)
</script>
<template>
  <mp-space direction="column" size="36px" style="padding: 32px 12px">
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
  </mp-space>
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

### Slider thumbs and value labels

Drag the sliders to compare custom thumbs and value labels independently of steps, ranges and keyboard models.

Example source: src/slider/example/demos/thumb-label-comparison.vue

```vue
<script setup lang="ts">
import { proxyRefs as demoProxyRefs, reactive } from 'vue'

const scene1 = demoProxyRefs(
  (() => {
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
    return { values }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
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
    return { values }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="custom-btn">
      <h4><span lang="zh-CN">自定义拇指</span><span lang="en-US">custom-btn</span></h4>
      <mp-slider v-model="scene1.values.value9" range active-color="#52af77">
        <template #button="{ currentValue }">
          <div class="slider-example__block">{{ currentValue }}</div>
        </template>
      </mp-slider>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="show-label">
      <h4><span lang="zh-CN">提示</span><span lang="en-US">show-label</span></h4>
      <mp-slider v-model="scene2.values.value5" :show-tooltip="false" />
      <mp-slider v-model="scene2.values.value6" />
      <mp-slider v-model="scene2.values.value7" show-tooltip="always" />
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
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
}
.demo-comparison-case--2 {
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
}
</style>
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
  <mp-space direction="column" size="32px" style="padding: 24px 12px">
    <mp-slider v-model="value" :step="5" :marks="marks" show-ticks show-input aria-label="Volume" />
    <mp-slider
      v-model="pair"
      range
      show-input
      :aria-label="['Minimum', 'Maximum']"
      :format-tooltip="(value) => value + '%'"
    />
  </mp-space>
</template>
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
  <mp-space direction="column" size="28px" style="padding: 24px 12px">
    <mp-slider v-model="accepted" range show-tooltip="always" :aria-label="['Minimum', 'Maximum']" />
    <mp-slider :model-value="50" aria-label="Controlled rejection" @update:model-value="proposed = $event" />
    <output>{{ proposed }}</output>
    <mp-slider :default-value="40" readonly aria-label="Read only" />
    <mp-slider :default-value="40" disabled aria-label="Disabled" />
  </mp-space>
</template>
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

### Pointer session cancellation

Example source: src/slider/example/demos/interaction-session.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SliderValue } from '../..'

const value = ref(20)
const disabled = ref(false)
const readonly = ref(false)
const max = ref(100)
const starts = ref(0)
const ends = ref<SliderValue[]>([])
function recordEnd(next: SliderValue) {
  ends.value.push(next)
}
function keyboard(event: KeyboardEvent) {
  const key = event.key.toLowerCase()
  if (!['d', 'r', 'm'].includes(key)) {
    return
  }
  event.preventDefault()
  if (key === 'd') {
    disabled.value = !disabled.value
  }
  if (key === 'r') {
    readonly.value = !readonly.value
  }
  if (key === 'm') {
    max.value = max.value === 100 ? 80 : 100
  }
}
function restore() {
  disabled.value = false
  readonly.value = false
  max.value = 100
}
</script>
<template>
  <div style="width: 100%; padding: 24px 0" @keydown="keyboard">
    <p>
      拖动滑块时按 D 禁用、R 只读、M 改上限。取消后仍会收到一次 end。While dragging, press D, R or M to cancel by
      changing the configuration.
    </p>
    <mp-slider
      v-model="value"
      edit-mode="direct"
      :disabled="disabled"
      :readonly="readonly"
      :max="max"
      aria-label="交互收尾 / Session end"
      @start="starts++"
      @end="recordEnd"
    />
    <p role="status">
      start: {{ starts }}；end: {{ ends.length }}；最后提案 / Last proposal: {{ JSON.stringify(ends.at(-1)) ?? '—' }}
    </p>
    <p>value: {{ value }}；disabled: {{ disabled }}；readonly: {{ readonly }}；max: {{ max }}</p>
    <mp-button @click="restore">恢复可交互 / Restore controls</mp-button>
  </div>
</template>
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
| show-input | boolean | false | Show attached InputNumber controls, two in range mode. |
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
| `--mp-slider-active-color` | `var(--mp-sys-color-content-brand)` | `background`, `outline` |
| `--mp-slider-control-height` | `var(--mp-sys-control-height-md)` | `height`, `min-height`, `padding-bottom`, `padding-inline-end`, `width` |
| `--mp-slider-disabled-color` | `var(--mp-sys-color-content-disabled)` | `background`, `border-color` |
| `--mp-slider-error-color` | `var(--mp-sys-color-content-danger)` | `background`, `border-color` |
| `--mp-slider-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-slider-gap` | `var(--mp-sys-space-4)` | `bottom`, `gap`, `left`, `padding` |
| `--mp-slider-input-width` | `80px` | `width` |
| `--mp-slider-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-slider-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-slider-thumb-border-color` | `var(--mp-sys-color-content-brand)` | `border` |
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
  --mp-slider-active-color: var(--mp-sys-color-content-brand);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
