<!-- Source: src/input-number/docs/en-US.md; locale: en-US; page: /en-US/input-number -->

# InputNumber

One real IAB default/light repeat lifecycle case passes per platform: actual first/subsequent repeat, stable after cancellation, fresh hold unmounted before800ms and stable beyond deadline, final nodes0. Entry click is native but internal pointerdown/pointercancel is scripted; not native long press/touch, dequeued-race, cross-window or OS evidence.

Each long-press timer validates and consumes its generation before stepping. Old callbacks after stop, replacement, release, deactivation or disposal cannot change the value; a reentrant step that starts another hold cannot cancel that replacement through its return value. Inactive owners reject new holds; reactivation requires a new gesture rather than resuming the old one. Initial800ms/repeat150ms are interaction cadence, not CSS motion tokens. Eight controlled-timer/stale-callback tests pass per platform (seven fail before repair); full InputNumber Cedar45/Maple48 pass. This is not real browser or OS acceptance.

InputNumber edits and commits JavaScript numbers. The libraries own independent copies of the view, controller, styles and API; no runtime instance is shared.

- A defined model-value is controlled; default-value only initializes uncontrolled state. Drafts may differ while editing. A rejected proposal restores the parent value after commit. External updates never emit user events or trigger validation.
- By default, Enter or blur commits. With model-event="input", complete numeric edits update immediately; change still represents a commit. Enter followed by blur does not commit twice.
- Clearing emits **input → update:model-value → change → clear**, with an undefined value. The former clear-only behavior is removed without an alias or compatibility branch.
- Intermediate signs and decimal points are preserved while editing. A trailing decimal point commits as a number; a lone sign/dot restores the previous value. Invalid text and non-finite numbers are never published. IME input is processed once after composition.
- Range limits win over precision. Both copies use isolated Decimal configuration; the public model remains a JavaScript number, not arbitrary-precision storage.
- disabled/readonly/size inherit from InputGroup and Form. Explicit false overrides inheritance. variant/hint inherit InputGroup. An outer FormItem label suppresses a duplicate floating label. Cedar also reads ConfigProvider for fallback size; Maple uses its existing defaults.
- Mouse/touch long press stops on release, cancel, leave, window blur, deactivation, disposal or state changes. Button mode offers larger touch targets. Arrow keys step; Enter commits.

Native inputs always use `autocomplete="off"`; native attribute bags cannot enable autofill.

## Examples

### Quantity controls and commit guards

`disable-input` prevents typing and clearing while keeping buttons and arrow keys usable. `disable-increment` / `disable-decrement` block one direction; `increment-button` / `decrement-button` control visibility and also block the hidden direction on the keyboard. `press=false` disables repeat.

`before-commit(value, { previousValue, signal })` returns false to reject or void to allow, synchronously or through a Promise. Inline typing, live model input, stepping and clearing wait for approval. Pending operations expose aria-busy and cannot overlap. External values, blocking, configuration changes, deactivation and disposal cancel stale results. Rejection restores the committed value; failures emit commit-error(error). Popup confirmation owns the guard and does not approve every inner draft. Guarded steps do not auto-repeat approval requests.

`step(value, direction, event)` reports accepted changes only, with direction plus or minus. No event is emitted for rejected, blocked, hidden-direction or boundary operations, or external updates.



| Prop | Type | Default |
| --- | --- | --- |
| `disable-input` | `boolean` | `false` |
| `disable-increment` / `disable-decrement` | `boolean` | `false` |
| `increment-button` / `decrement-button` | `boolean` | `true` |
| `press` | `boolean` | `true` |

Example source: src/input-number/example/demos/en-US/quantity-controls.vue

```vue
<script setup>
import Demo from '../quantity-controls.vue'
</script>
<template><Demo english /></template>
```

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
      <mp-checkbox v-model="disabled" presentation="inline">Disabled</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">Read-only</mp-checkbox>
      <mp-checkbox v-model="clearable" presentation="inline">Clearable</mp-checkbox>
      <mp-checkbox v-model="hint" presentation="inline">Floating hint</mp-checkbox>
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
      <mp-radio-group v-model="size" presentation="inline" aria-label="Comparison size">
        <mp-radio v-for="item in sizes" :key="item" presentation="inline" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="variant" presentation="inline" aria-label="Comparison variant">
        <mp-radio v-for="item in variants" :key="item" presentation="inline" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
    </mp-space>
    <mp-space wrap>
      <mp-checkbox v-model="disabled" presentation="inline">Disabled / 禁用对照</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">Readonly / 只读对照</mp-checkbox>
      <mp-checkbox v-model="error" presentation="inline">Error / 错误对照</mp-checkbox>
    </mp-space>
    <div class="control-size-comparison__grid">
      <div data-control="Input">
        <p>Input</p>
        <mp-input
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          placeholder="Input"
        />
      </div>
      <div data-control="Textarea">
        <p>Textarea</p>
        <mp-textarea
          v-model="textareaValue"
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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

### Appearance combinations

Use this example for quantities and numeric limits. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/input-number/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(3)
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-input-number v-model="value" :min="0" :max="10" v-bind="__demoAppearance"></mp-input-number>
  </mp-space>
</template>
```

### Interaction states

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

## API

### Props

| Prop          | Description                                                      | Type                            | Default                    |
| ------------- | ---------------------------------------------------------------- | ------------------------------- | -------------------------- |
| model-value   | Controlled number; undefined denotes an empty/uncontrolled value | `number`                        | —                          |
| default-value | Initial uncontrolled value                                       | `number`                        | —                          |
| mode          | Step-button layout                                               | `embed \| button \| input`      | `embed`                    |
| precision     | Decimal places (0–100), at least the step precision              | `number`                        | —                          |
| step          | Positive finite step; scientific notation supported              | `number`                        | `1`                        |
| disabled      | Disabled; inherits when omitted                                  | `boolean`                       | Inherited, otherwise false |
| error         | Error state; inherits FormItem when omitted                      | `boolean`                       | Inherited, otherwise false |
| max           | Maximum                                                          | `number`                        | `Infinity`                 |
| min           | Minimum                                                          | `number`                        | `-Infinity`                |
| formatter     | Display formatting only; does not change the number              | `(text: string) => string`      | —                          |
| parser        | Parse the original text once per edit                            | `(text: string) => string`      | —                          |
| placeholder   | Placeholder                                                      | `string`                        | —                          |
| size          | All five sizes implemented; inheritable                          | `xs \| sm \| md \| lg \| xl`    | Inherited, otherwise md    |
| variant       | Field variant; inherits InputGroup                               | `outline \| filled \| standard` | `outline`                  |
| hint          | Floating hint; inherits InputGroup / FieldDecorator              | `boolean`                       | Library default            |
| clearable     | Allow clearing an editable field                                 | `boolean`                       | `false`                    |
| model-event   | Model update timing; change only reports commits                 | `change \| input`               | `change`                   |
| readonly      | Read-only; allows focus/copy but no mutations                    | `boolean`                       | Inherited, otherwise false |
| input-attrs   | Additional native input attributes                               | `Record<string, unknown>`       | —                          |

### Events

| Event              | Arguments                                                  | Description                                                      |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| input              | `(value: number \| undefined, text: string, event: Event)` | Parsed value and display text while editing                      |
| update:model-value | `(value: number \| undefined)`                             | Proposed model update                                            |
| change             | `(value: number \| undefined, event: Event)`               | Commit, step or clear                                            |
| clear              | `(event: Event)`                                           | Explicit clear                                                   |
| focus              | `(event: FocusEvent)`                                      | Focus                                                            |
| blur               | `(event: FocusEvent)`                                      | Blur                                                             |
| keydown            | `(event: KeyboardEvent)`                                   | Native keyboard event; preventDefault intercepts default actions |

### Slots

| Slot             | Arguments                            | Description         |
| ---------------- | ------------------------------------ | ------------------- |
| prefix / suffix  | —                                    | Inside the field    |
| prepend / append | —                                    | Outside the field   |
| plus / minus     | —                                    | Step-button icons   |
| clear-icon       | `{ clear: (event?: Event) => void }` | Custom clear button |

### Methods

| Method / Property | Type                               | Description                  |
| ----------------- | ---------------------------------- | ---------------------------- |
| focus             | `(options?: FocusOptions) => void` | Focus; ignored when disabled |
| blur              | `() => void`                       | Blur                         |
| select            | `() => void`                       | Select input text            |
| inputRef          | `HTMLInputElement \| undefined`    | Native input element         |

## Types

```ts
import type {
  InputNumberFormatter,
  InputNumberInstance,
  InputNumberMode,
  InputNumberModelEvent,
  InputNumberParser,
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
} from '@maple-design/ui'
```

## Style tokens

| Token                                               | Default                                 |
| --------------------------------------------------- | --------------------------------------- |
| `--mp-input-number-step-button-width`               | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-step-button-color`               | `var(--mp-sys-color-content-secondary)` |
| `--mp-input-number-step-button-disabled-color`      | `var(--mp-sys-color-content-disabled)`  |
| `--mp-input-number-step-button-border-color`        | `var(--mp-sys-color-border-subtle)`     |
| `--mp-input-number-step-button-background`          | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-step-button-hover-background`    | `var(--mp-sys-color-state-hover)`       |
| `--mp-input-number-step-button-active-background`   | `var(--mp-sys-color-state-selected)`    |
| `--mp-input-number-step-button-icon-size`           | `14px`                                  |
| `--mp-input-number-step-button-transition-duration` | `0.2s`                                  |
| `--mp-input-number-addon-background`                | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-addon-color`                     | `var(--mp-sys-color-content-primary)`   |
| `--mp-input-number-addon-border-color`              | `var(--mp-sys-color-border-default)`    |
| `--mp-input-number-border-width`                    | `1px`                                   |
| `--mp-input-number-border-radius`                   | `var(--mp-field-border-radius)`         |
| `--mp-input-number-size-xs-step-button-width`       | `var(--mp-sys-control-height-xs)`       |
| `--mp-input-number-size-sm-step-button-width`       | `var(--mp-sys-control-height-sm)`       |
| `--mp-input-number-size-md-step-button-width`       | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-size-lg-step-button-width`       | `var(--mp-sys-control-height-lg)`       |
| `--mp-input-number-size-xl-step-button-width`       | `var(--mp-sys-control-height-xl)`       |

Shared field visuals use FieldDecorator tokens. The former step-layer-border-radius token is removed without an alias.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
