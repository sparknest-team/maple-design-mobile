<!-- Source: src/input-number/docs/en-US.md; locale: en-US; page: /en-US/input-number -->

# InputNumber



Long-press stepping stops on release, cancellation, deactivation or unmounting. Starting a new hold replaces the previous one. Reactivation requires a new gesture instead of resuming an old hold. CSS motion variables do not control the repeat cadence.

InputNumber edits and commits numeric values.

- A defined model-value is controlled; default-value only initializes uncontrolled state. Drafts may differ while editing. A rejected proposal restores the parent value after commit. External updates never emit user events or trigger validation.
- By default, Enter or blur commits. With model-event="input", complete numeric edits update immediately; change still represents a commit. Enter followed by blur does not commit twice.
- Approved clearing notifies **clear → input → update:modelValue → change**. Clear is an action notification and is not emitted after a veto. A target equal to the current model does not invent change. The default clear value is undefined; explicit empty-value may provide null or another supported numeric value.
- Intermediate signs and decimal points are preserved while editing. A trailing decimal point commits as a number; a lone sign/dot restores the previous value. Invalid text and non-finite numbers are never published. IME input is processed once after composition.
- Range limits win over precision. Both copies use isolated Decimal configuration; the public model remains a JavaScript number, not arbitrary-precision storage.
- disabled/readonly/size inherit from InputGroup and Form. Explicit false overrides inheritance. variant/hint inherit InputGroup. An outer FormItem label suppresses a duplicate floating label. Cedar also reads ConfigProvider for fallback size; Maple uses its existing defaults.
- Mouse/touch long press stops on release, cancel, leave, window blur, deactivation, disposal or state changes. Button mode offers larger touch targets. Arrow keys step; Enter commits.

Native inputs always use `autocomplete="off"`; native attribute bags cannot enable autofill.

## Reading direction

The numeric input inherits its source `dir`; step buttons follow reading order. Values, precision and vertical keys retain their meaning: ArrowUp increases and ArrowDown decreases. Neither values nor display strings are reversed.

## Basic examples

### Basic states

Example source: src/input-number/example/demos/en-US/field-basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | undefined>(12)
const disabled = ref(false)
const readonly = ref(false)
const clearable = ref(true)
const hint = ref(false)
</script>
<template>
  <div class="number-demo">
    <div class="number-demo__options">
      <mp-checkbox v-model="disabled" edit-mode="direct">Disabled</mp-checkbox>
      <mp-checkbox v-model="readonly" edit-mode="direct">Read-only</mp-checkbox>
      <mp-checkbox v-model="clearable" edit-mode="direct">Clearable</mp-checkbox>
      <mp-checkbox v-model="hint" edit-mode="direct">Floating hint</mp-checkbox>
    </div>
    <mp-input-number
      v-model="value"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      :hint="hint"
      placeholder="Quantity"
    />
    <output>Numeric value：{{ value ?? 'Empty' }}</output>
  </div>
</template>
<style scoped>
.number-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.number-demo__options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
```

## Appearance and layout

### Appearance combinations

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | --------------------------- | ------------------------------------ |
| `size` | All five sizes implemented; inheritable | Form control size comparison, Sizes and variants |
| `variant` | Field variant; inherits InputGroup | Form control size comparison, Sizes and variants |
| `placeholder` | Placeholder | Form control size comparison, Sizes and variants |
| `min` | Minimum | Appearance combinations |
| `max` | Maximum | Appearance combinations |
| `disabled` | Disabled; inherits when omitted | Form control size comparison |

<!-- demo-config-notes:end -->


Use this example for quantities and numeric limits. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/input-number/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref(3)
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
const demoCompareFields = [
  { name: 'variant', values: ['filled', 'outline', 'standard'] },
  { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-radio-group
          v-model="__demoAppearance['variant']"
          aria-label="variant"
          :options="[
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-input-number
          v-model="value"
          :min="0"
          :max="10"
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        ></mp-input-number>
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

Example source: src/field-decorator/example/demos/control-sizes.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['outline', 'filled', 'standard'] as const
const disabled = ref(false)
const readonly = ref(false)
const error = ref(false)
const size = ref<(typeof sizes)[number]>('md')
const variant = ref<(typeof variants)[number]>('outline')
const options = [
  { value: 'beijing', label: 'Beijing' },
  { value: 'shanghai', label: 'Shanghai' },
]
const cascaderOptions = [{ value: 'china', label: 'China', children: options }]

const inputValue = ref('Beijing')
const textareaValue = ref('Textarea value')
const selectValue = ref('beijing')
const cascaderValue = ref('beijing')
const selectMultiple = ref(['beijing', 'shanghai'])
const cascaderMultiple = ref(['beijing', 'shanghai'])
const selectOverflow = ref(['long', 'beijing', 'shanghai'])
const cascaderOverflow = ref(['long', 'beijing', 'shanghai'])
const selectedOptions = [
  ...options,
  {
    value: 'long',
    label:
      'A very long selected option label for overflow comparison — full text preview keeps the selected value unchanged.',
  },
]
const selectedCascaderOptions = [{ value: 'china', label: 'China', children: selectedOptions }]
function resetSelections() {
  inputValue.value = 'Beijing'
  selectValue.value = 'beijing'
  cascaderValue.value = 'beijing'
  selectMultiple.value = ['beijing', 'shanghai']
  cascaderMultiple.value = ['beijing', 'shanghai']
  selectOverflow.value = ['long', 'beijing', 'shanghai']
  cascaderOverflow.value = ['long', 'beijing', 'shanghai']
}
</script>
<template>
  <section aria-label="Form control size comparison" class="control-size-comparison">
    <mp-space wrap :size="12">
      <mp-radio-group v-model="size" edit-mode="direct" aria-label="Comparison size">
        <mp-radio v-for="item in sizes" :key="item" edit-mode="direct" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="variant" edit-mode="direct" aria-label="Comparison variant">
        <mp-radio v-for="item in variants" :key="item" edit-mode="direct" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
    </mp-space>
    <mp-space wrap>
      <mp-checkbox v-model="disabled" edit-mode="direct">Disabled / 禁用对照</mp-checkbox>
      <mp-checkbox v-model="readonly" edit-mode="direct">Readonly / 只读对照</mp-checkbox>
      <mp-checkbox v-model="error" edit-mode="direct">Error / 错误对照</mp-checkbox>
    </mp-space>
    <div class="control-size-comparison__grid">
      <div data-control="Input">
        <p>Input</p>
        <mp-input
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Input"
        />
      </div>
      <div data-control="Textarea">
        <p>Textarea</p>
        <mp-textarea
          v-model="textareaValue"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          placeholder="Textarea"
          :rows="2"
        />
      </div>
      <div data-control="Button">
        <p>Button</p>
        <mp-button :size="size" variant="outline">Button</mp-button>
      </div>
      <div data-control="Select">
        <p>Select</p>
        <mp-select
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :options="options"
          placeholder="Select"
        />
      </div>
      <div data-control="Date">
        <p>Date</p>
        <mp-date
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Date"
        />
      </div>
      <div data-control="Time">
        <p>Time</p>
        <mp-time
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Time"
        />
      </div>
      <div data-control="InputNumber">
        <p>InputNumber</p>
        <mp-input-number
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Number"
        />
      </div>
      <div data-control="AutoComplete">
        <p>AutoComplete</p>
        <mp-auto-complete
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :options="options"
          placeholder="AutoComplete"
        />
      </div>
      <div data-control="Cascader">
        <p>Cascader</p>
        <mp-cascader
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :options="cascaderOptions"
          placeholder="Cascader"
        />
      </div>
      <div data-control="DateRange">
        <p>DateRange</p>
        <mp-date-range
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :placeholder="['Start', 'End']"
        />
      </div>
      <div data-control="TimeRange">
        <p>TimeRange</p>
        <mp-time-range
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :placeholder="['Start', 'End']"
        />
      </div>
    </div>

    <section aria-label="Selected control size comparison" class="control-size-comparison__states">
      <mp-space wrap align="center" :size="12">
        <span>Selected / Clearable / Multiple — 有值、可清空与多选不换行</span>
        <span
          >Hover or focus truncated text; tap on touch screens /
          悬停或聚焦省略正文查看全文；触屏点按查看，点外部关闭</span
        >
        <mp-button size="sm" variant="outline" @click="resetSelections">Reset / 恢复选中值</mp-button>
      </mp-space>
      <div class="control-size-comparison__grid">
        <div data-control="InputValue">
          <p>Input · clearable</p>
          <mp-input
            v-model="inputValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            clearable
            placeholder="Input value"
          />
        </div>
        <div data-control="ButtonReference">
          <p>Button · reference</p>
          <mp-button :size="size" variant="outline">Button</mp-button>
        </div>
        <div data-control="SelectValue">
          <p>Select · clearable</p>
          <mp-select
            v-model="selectValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            clearable
            placeholder="Select value"
          />
        </div>
        <div data-control="CascaderValue">
          <p>Cascader · clearable</p>
          <mp-cascader
            v-model="cascaderValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            clearable
            placeholder="Cascader value"
          />
        </div>
        <div data-control="SelectMultiple">
          <p>Select · multiple / nowrap</p>
          <mp-select
            v-model="selectMultiple"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Select multiple"
          />
        </div>
        <div data-control="CascaderMultiple">
          <p>Cascader · multiple / nowrap</p>
          <mp-cascader
            v-model="cascaderMultiple"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Cascader multiple"
          />
        </div>
        <div data-control="SelectOverflow">
          <p>Select · long values / nowrap</p>
          <mp-select
            v-model="selectOverflow"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Select long values"
          />
        </div>
        <div data-control="CascaderOverflow">
          <p>Cascader · long values / nowrap</p>
          <mp-cascader
            v-model="cascaderOverflow"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Cascader long values"
          />
        </div>
      </div>
    </section>
  </section>
</template>
<style scoped>
.control-size-comparison,
.control-size-comparison__states {
  display: grid;
  gap: 24px;
}
.control-size-comparison__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-items: start;
  gap: 24px 16px;
}
.control-size-comparison__grid > div {
  min-width: 0;
}
.control-size-comparison__grid p {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 20px;
}
.control-size-comparison__grid :deep(.mp-input-number),
.control-size-comparison__grid :deep(.mp-auto-complete) {
  width: 100%;
}
</style>
```

### Control layouts

Example source: src/input-number/example/demos/en-US/field-modes.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const embed = ref(1)
const button = ref(1)
const input = ref(1)
</script>
<template>
  <div class="number-demo">
    <label>Embedded controls<mp-input-number v-model="embed" mode="embed" /></label>
    <label>Split buttons (touch friendly)<mp-input-number v-model="button" mode="button" /></label>
    <label>Input only<mp-input-number v-model="input" mode="input" /></label>
    <p>Hold a button to repeat. Use arrows to step; Enter or blur commits.</p>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

### Sizes and variants

Example source: src/input-number/example/demos/en-US/field-options.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['outline', 'filled', 'standard'] as const
</script>
<template>
  <div class="number-demo">
    <label v-for="size in sizes" :key="size">{{ size }}<mp-input-number :size="size" :default-value="12" /></label>
    <label v-for="variant in variants" :key="variant"
      >{{ variant }}<mp-input-number :variant="variant" hint placeholder="Amount" :default-value="12"
    /></label>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

## Numeric input and formatting

### Quantity controls and commit guards

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------- | ---------------------------- | -------------------------------------------------- |
| `clearable` | Allow clearing an editable field | Quantity controls and commit guards, Formatting and slots, Small steps and boundaries |
| `mode` | Step-button layout | Quantity controls and commit guards, Formatting and slots |
| `min` | Minimum | Quantity controls and commit guards, Small steps and boundaries |
| `max` | Maximum | Quantity controls and commit guards, Small steps and boundaries |
| `step` | Positive finite step; scientific notation supported | Quantity controls and commit guards, Small steps and boundaries |
| `formatter` | Display formatting only; does not change the number | Formatting and slots, Small steps and boundaries |

<!-- demo-config-notes:end -->


`disable-input` prevents typing and clearing while keeping buttons and arrow keys usable. `disable-increment` / `disable-decrement` block one direction; `increment-button` / `decrement-button` control visibility and also block the hidden direction on the keyboard. `press=false` disables repeat.



`step(value, direction, event)` reports accepted changes only, with direction plus or minus. No event is emitted for rejected, blocked, hidden-direction or boundary operations, or external updates.

| Prop | Type | Default |
| ----------------------------------------- | --------- | ------- |
| `disable-input` | `boolean` | `false` |
| `disable-increment` | `boolean` | `false` |
| `disable-decrement` | `boolean` | `false` |
| `increment-button` | `boolean` | `true` |
| `decrement-button` | `boolean` | `true` |
| `press` | `boolean` | `true` |

Example source: src/input-number/example/demos/en-US/quantity-controls.vue

```vue
<script setup>
import Demo from '../quantity-controls.vue'
</script>
<template><Demo english /></template>
```

### Formatting and slots

Example source: src/input-number/example/demos/en-US/format-slots.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(12)
const formatter = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const parser = (text: string) => text.replace(/,/g, '')
</script>
<template>
  <mp-input-number v-model="value" :formatter="formatter" :parser="parser" clearable mode="button">
    <template #prepend>Budget</template>
    <template #prefix>¥</template>
    <template #suffix>CNY</template>
    <template #append>Tax included</template>
    <template #plus>＋</template>
    <template #minus>－</template>
    <template #clear-icon="{ clear }"
      ><mp-button html-type="button" aria-label="Clear amount" @click="clear">×</mp-button></template
    >
  </mp-input-number>
</template>
```

### Small steps and boundaries

Example source: src/input-number/example/demos/en-US/number-boundaries.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const tiny = ref(0)
const negative = ref<number>()
const bounded = ref(0.1)
const amount = ref(12)
const formatter = (value: string) => '$' + value
const parser = (value: string) => value.replace(/^\$/, '')
</script>

<template>
  <div class="number-boundaries-demo">
    <label>
      <span>Scientific step: 1e-7</span>
      <mp-input-number v-model="tiny" :step="1e-7" :precision="0" />
      <output>{{ tiny }}</output>
    </label>
    <label>
      <span>Start empty, maximum -1</span>
      <mp-input-number v-model="negative" :max="-1" clearable />
      <output>{{ negative ?? 'Empty' }}</output>
    </label>
    <label>
      <span>Boundary first: maximum 0.15, precision 1</span>
      <mp-input-number v-model="bounded" :min="0" :max="0.15" :step="0.1" :precision="1" />
      <output>{{ bounded }}</output>
    </label>
    <label>
      <span>Formatted display, numeric value</span>
      <mp-input-number v-model="amount" :formatter="formatter" :parser="parser" model-event="input" />
      <output>{{ amount }}</output>
    </label>
  </div>
</template>

<style scoped>
.number-boundaries-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.number-boundaries-demo label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.number-boundaries-demo output {
  font-variant-numeric: tabular-nums;
}
</style>
```

### Empty markers and valid zero

Configure empty-values and empty-value when an API uses -1 for missing data. Initially the input is blank while the model remains -1. Set it to 0 to see a valid zero; clearing returns -1. A second field clears to a valid 0, showing that clear output need not mean missing data.

Example source: src/input-number/example/demos/en-US/empty-value.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ quantity: -1 as number | null | undefined })
const restored = ref<number | null | undefined>(12)
</script>
<template>
  <mp-space direction="column">
    <p>-1 means missing and renders blank; 0 remains a valid number. Clearing produces -1.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="quantity" label="Quantity">
        <mp-input-number
          v-model="model.quantity"
          edit-mode="direct"
          clearable
          :empty-values="[null, undefined, -1]"
          :empty-value="-1"
        />
      </mp-form-item>
    </mp-form>
    <mp-space wrap>
      <mp-button @click="model.quantity = 0">Set to 0</mp-button>
      <mp-button @click="model.quantity = -1">Set to -1</mp-button>
    </mp-space>
    <p>
      Current model: <output>{{ String(model.quantity) }}</output>
    </p>
    <p>This field clears to 0 without treating 0 as missing.</p>
    <mp-form layout="vertical">
      <mp-form-item label="Clear restores valid zero">
        <mp-input-number v-model="restored" edit-mode="direct" clearable :empty-value="0" />
        <output>{{ String(restored) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

## Interaction and forms

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------- | ----------------------------- | -------------------------- |
| `disabled` | Disabled; inherits when omitted | Interaction states, Form inheritance |
| `readonly` | Read-only; allows focus/copy but no mutations | Interaction states, Form inheritance |
| `clearable` | Allow clearing an editable field | Controlled values and events, Form inheritance |
| `min` | Minimum | Interaction states |
| `max` | Maximum | Interaction states |
| `error` | Error state; inherits FormItem when omitted | Interaction states |

<!-- demo-config-notes:end -->


Use this example for quantities and numeric limits. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/input-number/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(3)
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-input-number v-model="value" :min="0" :max="10" v-bind="__demoState"></mp-input-number>
  </mp-space>
</template>
```

### Controlled values and events

Example source: src/input-number/example/demos/en-US/controlled-events.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | undefined>(1)
const logs = ref<string[]>([])
function log(name: string, next?: number) {
  logs.value = [name + ': ' + (next ?? 'Empty'), ...logs.value].slice(0, 6)
}
</script>
<template>
  <div class="number-demo">
    <label
      >Parent accepts updates
      <mp-input-number
        v-model="value"
        clearable
        model-event="input"
        @input="(next: number | undefined) => log('input', next)"
        @update:model-value="(next: number | undefined) => log('update', next)"
        @change="(next: number | undefined) => log('change', next)"
        @clear="() => log('clear')"
      />
    </label>
    <label
      >Fixed controlled value; parent rejects updates
      <mp-input-number :model-value="5" @update:model-value="(next: number | undefined) => log('rejected', next)" />
    </label>
    <p>The second input allows a draft, then restores 5 on commit. External updates never emit change.</p>
    <ol aria-live="polite">
      <li v-for="(entry, index) in logs" :key="index">{{ entry }}</li>
    </ol>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

### Form inheritance

Example source: src/input-number/example/demos/en-US/form-inheritance.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ quantity: 2, editable: 3 })
const disabled = ref(false)
const readonly = ref(false)
</script>
<template>
  <div class="number-demo">
    <mp-checkbox v-model="disabled">Disable form</mp-checkbox>
    <mp-checkbox v-model="readonly">Read-only form</mp-checkbox>
    <mp-form :model="model" :disabled="disabled" :readonly="readonly" size="lg">
      <mp-form-item field="quantity" label="Inherited state">
        <mp-input-number v-model="model.quantity" clearable />
      </mp-form-item>
      <mp-form-item field="editable" label="Explicit override">
        <mp-input-number v-model="model.editable" :disabled="false" :readonly="false" size="sm" />
      </mp-form-item>
    </mp-form>
  </div>
</template>
<style scoped>
.number-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Composition input

IME composition preserves the native text being entered; external model updates do not replace it before completion. Existing formatting and controlled-owner acceptance apply afterward. Queued restoration from an earlier input cannot replace a later edit's text or caret. Numeric updates still follow model-event, with unchanged blur/Enter commit timing.

## Usage notes

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.



`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`--mp-field-caret-color` defaults to `currentColor` and sets shared caret color. `--mp-input-number-caret-color` overrides this component, default `var(--mp-field-caret-color)`.

Explicit beforeCommit waiting uses the existing loadingMode indicator and sets aria-busy on the actual input. Manual loading remains business-owned and does not imply readonly; beforeCommit guards retain their existing interaction lock. Notification return Promises, including change/step, do not control waiting.

Deferred `change` preserves the real confirmation event when available (for example, the save button). Programmatic editor handoff has no DOM event, so its second argument is optional. The event target can be the confirmation control rather than the input. `change` is a notification: its returned Promise is not awaited; use `before-commit` to approve asynchronous saves.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Clear output

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

### InputNumber Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| empty-value | Clear output, falling back to undefined when omitted | `number \| null \| undefined \| (() => number \| null \| undefined)` | `undefined` |
| model-value | Controlled numeric value including null; uses internal state when omitted | `number \| null` | `undefined` |
| default-value | Initial uncontrolled numeric value, read at creation | `number` | `undefined` |
| disable-input | Disable typing while retaining step buttons and arrow-key stepping | `boolean` | `false` |
| disable-increment | Disable incrementing through buttons and arrow keys | `boolean` | `false` |
| disable-decrement | Disable decrementing through buttons and arrow keys | `boolean` | `false` |
| increment-button | Show the increment button | `boolean` | `true` |
| decrement-button | Show the decrement button | `boolean` | `true` |
| press | Repeat stepping while held; approval-enabled operations do not repeat requests | `boolean` | `true` |
| mode | Step-button layout | `'embed' \| 'button' \| 'input'` | `'embed'` |
| precision | Explicit precision is an integer from 0 to 100, at least the decimal places required by step | `number` | `undefined` |
| step | Positive finite step size | `number` | `1` |
| disabled | Whether disabled | `boolean` | `false` |
| error | Show the error state | `boolean` | `false` |
| max | Maximum commit bound, allowing positive infinity | `number` | `Infinity` |
| min | Minimum commit bound, allowing negative infinity | `number` | `-Infinity` |
| formatter | Editor display formatter without changing the numeric model | `InputNumberFormatter` | `undefined` |
| parser | Parse user-edited text once per edit | `InputNumberParser` | `undefined` |
| placeholder | Placeholder or floating hint text | `string` | `-` |
| size | `xs`, `sm`, `md`, `lg`, or `xl` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| variant | `filled`, `outline`, or `standard` | `string` | `outline` |
| hint | Use the placeholder as a floating hint | `boolean` | `true` |
| clearable | Show a persistent clear icon while editable and nonempty | `boolean` | `false` |
| model-event | Model notification timing; change always denotes a commit | `'change' \| 'input'` | `'change'` |
| readonly | Whether readonly | `boolean` | `false` |
| input-attrs | Additional native attributes; the component owns controlled value, state, ARIA bounds, and component events | `Record<string, unknown>` | `undefined` |
| edit-mode | Editor mode; inherits FormItem/Form | `direct / popup` | `undefined` |
| read-pretty | Reading presentation; inherits FormItem/Form | `boolean` | `undefined` |
| empty-values | Empty-value recognition set; an explicit set replaces inherited values | `readonly unknown[]` | Inherited component-family policy |
| empty-text | Empty reading text, inherited from FormItem/Form | `string` | `'-'` |
| before-commit | Direct commit and deferred save approval: (payload, done, context) | `BeforeFieldCommit` | `undefined` |
| open | Controlled editor visibility in deferred modes | `boolean` | `undefined` |
| default-open | Uncontrolled initial editor visibility; creation-only | `boolean` | `false` |
| popup-container | Deferred editor portal target; false renders in place | `PopupContainer` | `undefined` |
| loading | Manual loading presentation; remains editable | `boolean` | `false` |
| loading-mode | Indicator layout | `default / line` | `default` |

Min may be finite or -Infinity; max may be finite or Infinity. Negative values and 0 are valid. Invalid individual bounds use Vue prop-validation diagnostics and fall back to their unbounded defaults. An inverted range diagnoses both bounds and becomes unbounded, without swapping values. Input commits, stepping, and ARIA share the effective bounds; clear markers still follow empty-value.

Approved clearing notifies **clear → input → update:modelValue → change**. Clear is an action notification and is not emitted after a veto. A target equal to the current model does not invent change. The default clear value is undefined; explicit empty-value may provide null or another supported numeric value.

`before-commit(payload, done, context)` receives `{ value, previousValue }`; context provides `signal`. Synchronous void waits for done; true, done(), or fulfilled `Promise<void>` allows the operation. False, done(false), `Promise<false>`, throwing, or rejection cancels. Direct mode approves changed model values before committing, stepping, or clearing; `model-event="input"` also approves before publishing, without repeated approval for the same value. Pending work announces aria-busy and locks typing/stepping. External model/configuration/state changes or deactivation/unmount cancel stale work. Direct approval errors preserve the value and notify `commit-error`; deferred editing approves once at final confirmation and uses the existing panel feedback. With approval enabled, holding a button does not start repeated requests. Ordinary listener Promises are not approval tasks.

### InputNumber Events

| Event | Parameters / Type | Description |
| --- | --- | --- |
| update:modelValue | `number \| null \| undefined` | Model update proposal |
| update:open | `boolean` | Editor visibility request |
| open-change | `boolean` | Editor visibility change notification |
| input | `value: number \| null \| undefined, text: string, event: Event` | Parsed numeric value and display text from user editing |
| change | `value: number \| null \| undefined, event?: Event` | Numeric commit; deferred source event may be absent |
| clear | `event: Event` | Approved clear action notification, preceding value notifications |
| step | `value: number, direction: 'plus' \| 'minus', event: Event` | Step notification after changing the value |
| commit-error | `error: unknown` | Direct approval error notification; a boolean veto is not an error |
| keydown | `event: KeyboardEvent` | Native keyboard notification with synchronous preventDefault support |
| focus | `event: FocusEvent` | Native editor receives focus |
| blur | `event: FocusEvent` | Native editor loses focus |

### InputNumber Slots

| Slot | Parameters / Type | Description |
| --- | --- | --- |
| read | `{ value: number \| null \| undefined; text: string }` | Custom reading content |
| prefix | `-` | Inner prefix |
| suffix | `-` | Inner suffix |
| prepend | `-` | Outer leading content |
| append | `-` | Outer trailing content |
| plus | `-` | Increment button content |
| minus | `-` | Decrement button content |
| clear-icon | `{ clear(event?: Event): void }` | Clear icon or button |

### InputNumber Methods

| Method / property | Parameters / Type | Description |
| --- | --- | --- |
| focus | `focus(options?: FocusOptions): void` | Focus the mounted editor |
| blur | `blur(): void` | Blur the mounted editor |
| select | `select(): void` | Select all text in the mounted editor |
| inputRef | `HTMLInputElement \| undefined` | Reference to the mounted native numeric input |

## Types

```ts
import type {
  InputNumberFormatter,
  InputNumberInstance,
  InputNumberMode,
  InputNumberModelEvent,
  InputNumberParser,
  InputNumberEmits,
  InputNumberSlots,
  InputNumberExpose,
  InputNumberInstance,
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
} from '@maple-design/ui-vue'
```

## CSS Variables

Shared field appearance still uses FieldDecorator `--mp-field-*` tokens.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-input-number-addon-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-input-number-addon-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-input-number-addon-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-input-number-border-radius` | `var(--mp-field-border-radius)` | `border-end-end-radius`, `border-end-start-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-input-number-border-width` | `1px` | `border`, `border-inline-end`, `border-inline-start`, `border-top`, `outline`, `outline-offset` |
| `--mp-input-number-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-input-number-size-lg-step-button-width` | `var(--mp-sys-control-height-lg)` | `width` |
| `--mp-input-number-size-md-step-button-width` | `var(--mp-sys-control-height-md)` | `width` |
| `--mp-input-number-size-sm-step-button-width` | `var(--mp-sys-control-height-sm)` | `width` |
| `--mp-input-number-size-xl-step-button-width` | `var(--mp-sys-control-height-xl)` | `width` |
| `--mp-input-number-size-xs-step-button-width` | `var(--mp-sys-control-height-xs)` | `width` |
| `--mp-input-number-step-button-active-background` | `var(--mp-sys-color-state-selected)` | `background` |
| `--mp-input-number-step-button-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-input-number-step-button-border-color` | `var(--mp-sys-color-border-subtle)` | `border-inline-end`, `border-inline-start`, `border-top` |
| `--mp-input-number-step-button-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-input-number-step-button-disabled-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-input-number-step-button-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-input-number-step-button-icon-size` | `14px` | `font-size` |
| `--mp-input-number-step-button-transition-duration` | `0.2s` | `transition` |
| `--mp-input-number-step-button-width` | `var(--mp-sys-control-height-md)` | `width` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-input-number-addon-background: var(--mp-sys-color-surface-muted);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
