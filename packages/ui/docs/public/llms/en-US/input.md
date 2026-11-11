<!-- Source: src/input/docs/en-US.md; locale: en-US; page: /en-US/input -->

# Input

## Reading direction

The input inherits `dir` from its page or local scope. Affixes, clear actions and input groups follow reading order. Runtime changes retain the native editor, focus and selection; the browser handles caret movement, mixed text and composition without swapping editing keys. Parent rerenders preserve the native composition buffer; older selection-restoration tasks do not overwrite a newer composition.

## Basic examples

### Basic Usage

Default length counts UTF-16 code units (an emoji usually uses 2). Default truncation never splits a valid surrogate pair; a character that does not fit is omitted entirely. For grapheme-cluster counting and slicing, provide matching `word-length` and `word-slice` functions; custom slicing remains application-controlled.

Example source: src/input/example/demos/en-US/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const basicValue = ref('')
const clearableValue = ref('Maple Design')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="basicValue" placeholder="Enter content" />
    <mp-input v-model="clearableValue" clearable placeholder="Clearable text" />
    <div class="input-example__value">Current value：{{ basicValue || '-' }}</div>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
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

### Introduction

Use Input for single-line text entry. It supports multiple variants, floating hints, input types, states, and prefix or suffix content.

## Appearance and states

### Appearance configuration comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ------------------------------------------ | ------------------ |
| `placeholder` | Placeholder or floating hint text | Form Feedback, Hint |
| `hint` | Use the placeholder as a floating hint | Form Feedback, Hint |
| `clearable` | Show a persistent clear icon while editable and nonempty | Form Feedback |
| `variant` | `filled`, `outline`, or `standard` | Hint |

<!-- demo-config-notes:end -->


Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for single-line form inputs. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

Example source: src/input/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref('示例内容')
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
        <mp-input v-model="value" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"></mp-input>
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

### Form Feedback

Use FormItem `feedback` and `validate-status` for validation feedback. An outer FormItem label disables the Input floating hint to avoid duplicate labels.

Example source: src/input/example/demos/en-US/form-feedback.vue

```vue
<template>
  <mp-form :model="model">
    <mp-form-item
      field="account"
      label="Account"
      feedback
      :validate-status="status"
      :help="status === 'error' ? 'Enter an account and retry' : undefined"
    >
      <mp-input v-model="model.account" placeholder="An outer label disables the floating hint" hint clearable />
    </mp-form-item>
    <mp-button status="primary" :loading="status === 'validating'" @click="validate"
      >Simulate async validation</mp-button
    >
  </mp-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ account: '' })
const status = ref<'validating' | 'success' | 'error'>()
let request = 0
async function validate() {
  const current = ++request
  const value = model.account
  status.value = 'validating'
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (current === request) {
    status.value = value.trim() ? 'success' : 'error'
  }
}
</script>
```

### Hint

With `hint`, the placeholder floats on focus or when a value exists. Disable it for native placeholder behavior.

Example source: src/input/example/demos/en-US/hint.vue

```vue
<template>
  <div class="input-example__caption">Hint enabled: the label floats on focus</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" placeholder="Username" />
    <mp-input variant="outline" placeholder="Username" />
    <mp-input variant="standard" placeholder="Username" />
  </mp-space>
  <div class="input-example__caption">Hint disabled: the text remains a placeholder</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" :hint="false" placeholder="Username" />
    <mp-input variant="outline" :hint="false" placeholder="Username" />
    <mp-input variant="standard" :hint="false" placeholder="Username" />
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

## Input content and layout

### Character Limit

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ---------------------------------------------------------- | -------------------------------------- |
| `placeholder` | Placeholder or floating hint text | Character Limit, Prefix and Suffix, Custom Clear Icon |
| `clearable` | Show a persistent clear icon while editable and nonempty | Character Limit, Custom Clear Icon, Group State Inheritance |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | Character Limit |
| `hint` | Use the placeholder as a floating hint | Input Group |
| `default-value` | Uncontrolled initial value; read only at creation, never written into the parent | Group State Inheritance |
| `disabled` | Whether disabled | Group State Inheritance |

<!-- demo-config-notes:end -->


Example source: src/input/example/demos/en-US/max-length.vue

```vue
<script setup>
import { ref } from 'vue'

const maxLengthValue = ref('Maple')
</script>

<template>
  <mp-input v-model="maxLengthValue" :max-length="10" clearable placeholder="Up to 10 characters" />
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

`max-length` accepts a finite nonnegative number or `{ length, errorOnly? }`; `0` means unlimited. Object `length` follows the same numeric constraint and `errorOnly` is an optional boolean. Invalid values use Vue prop-validation diagnostics and fall back to no limit; null is treated as unset. Default slicing counts UTF-16 code units. Supply `word-length / word-slice` together for custom counting and slicing.

### Password Input

`mp-input-password` adds visibility toggling with `visibility` / `default-visibility`, `visibility-toggle`, and `visibility-change`. Other Input props and events are forwarded.

Example source: src/input/example/demos/en-US/password.vue

```vue
<template>
  <mp-input-password placeholder="Password" default-value="Maple2026" />
</template>
```

### Prefix and Suffix

Example source: src/input/example/demos/en-US/prefix-suffix.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input placeholder="Enter phone number"><template #prefix>+86</template></mp-input>
    <mp-input placeholder="Enter an amount"><template #suffix>RMB</template></mp-input>
    <mp-input placeholder="Enter search text">
      <template #prefix><m-icon-search /></template>
      <template #suffix><m-icon-close-circle-fill /></template>
    </mp-input>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Custom Clear Icon

Example source: src/input/example/demos/en-US/custom-clear-icon.vue

```vue
<script setup>
import { ref } from 'vue'

const customClearValue = ref('Clear me')
</script>

<template>
  <mp-input v-model="customClearValue" clearable placeholder="Clearable text">
    <template #clear-icon="{ clear }"><m-icon-error @click="clear" /></template>
  </mp-input>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Input Group

`mp-input-group` passes `size`, `variant`, `disabled`, `readonly`, and `hint` to child inputs unless overridden locally. Use `mp-input-group-label` for attached text.

Example source: src/input/example/demos/en-US/group.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input-group variant="outline">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input placeholder="Domain" :hint="false" />
    </mp-input-group>
    <mp-input-group size="sm" variant="filled">
      <mp-input placeholder="First name" :hint="false" />
      <mp-input placeholder="Last name" :hint="false" />
    </mp-input-group>
  </mp-space>
</template>
```

`InputGroupLabel` renders a span for content attached outside the input. Associate a visible name by matching FormItem `label-attrs.for` to the Input `id`, or use a native label with for/id. You can also provide `aria-label` explicitly.

### Group State Inheritance

Explicit child props override group defaults, including `false`. Nested groups inherit unspecified values.

Example source: src/input/example/demos/en-US/group-state.vue

```vue
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space>
      <mp-button variant="outline" @click="disabled = !disabled">{{
        disabled ? 'Enable group' : 'Disable group'
      }}</mp-button>
      <mp-button variant="outline" @click="readonly = !readonly">{{
        readonly ? 'Allow editing' : 'Make group readonly'
      }}</mp-button>
    </mp-space>
    <mp-input-group variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input v-model="domain" placeholder="Domain" clearable />
      <mp-input-group-label>.com</mp-input-group-label>
    </mp-input-group>
    <mp-input-group variant="filled" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input v-model="first" placeholder="Inherit group state" clearable />
      <mp-input default-value="Independent override" :disabled="false" :readonly="false" clearable />
    </mp-input-group>
    <mp-input-group size="lg" variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>Password</mp-input-group-label>
      <mp-input-password v-model="password" placeholder="Password toggle inherits disabled" clearable />
    </mp-input-group>
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
const readonly = ref(false)
const domain = ref('example')
const first = ref('Inherited state')
const password = ref('CedarMaple')
</script>
```

## Content and presentation

### Input Types

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ---------------------------------------------- | -------- |
| `type` | `text`, `password`, `number`, `tel`, or `email` | Input Types |
| `placeholder` | Placeholder or floating hint text | Input Types |

<!-- demo-config-notes:end -->


Example source: src/input/example/demos/en-US/type.vue

```vue
<script setup>
import { ref } from 'vue'

const textValue = ref('')
const numberValue = ref('')
const telValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="textValue" type="text" placeholder="Enter text" />
    <mp-input v-model="numberValue" type="number" placeholder="Enter a number" />
    <mp-input v-model="telValue" type="tel" placeholder="Enter phone number" />
    <mp-input v-model="emailValue" type="email" placeholder="Enter your email" />
    <mp-input v-model="passwordValue" type="password" placeholder="Enter password" />
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

## Value model and interaction

### Default value and v-model

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------- | ---------------------------------------------------------- | ------------------------------------ |
| `placeholder` | Placeholder or floating hint text | Model Modifier, Body and event contract, Native Attributes |
| `aria-label` | Accessible label | Default value and v-model, Native Attributes |
| `clearable` | Show a persistent clear icon while editable and nonempty | Body and event contract, Clear icon and manual deletion |
| `default-value` | Uncontrolled initial value; read only at creation, never written into the parent | Default value and v-model |
| `disabled` | Whether disabled | Interaction state comparison |
| `readonly` | Whether readonly | Interaction state comparison |

<!-- demo-config-notes:end -->


`modelValue` is the controlled value bound through ordinary `v-model`. It takes precedence, including an empty string. `defaultValue` initializes uncontrolled state only when the component is created; subsequent user input is stored internally. Changing `defaultValue` does not reset existing text. Remounting reads it again. Initialization emits no `update:modelValue` and does not write to a parent form.

`v-model.trim` follows Vue model event rules: `update:modelValue` is trimmed during input, while `input` reports the original text after length normalization. An uncontrolled editor may retain surrounding whitespace while editing and normalizes its local display on commit; committing does not repeat the same model proposal already reported. Controlled display follows the final parent value, and `change` still denotes a commit.

For a form default, initialize the bound field, for example `const text = ref('Beijing')`, then use `<mp-input v-model="text" />`.

Example source: src/input/example/demos/en-US/default-value.vue

```vue
<script setup>
import Demo from '../default-value.vue'
</script>

<template>
  <Demo english />
</template>
```

### Clear icon and manual deletion

Set clear output to null. Clear with the icon, restore the initial value, then delete all text with Backspace. The model shows null for the icon and an empty string for manual deletion.

Example source: src/input/example/demos/en-US/empty-value.vue

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ text: 'Hello' as string | null })
</script>
<template>
  <mp-space direction="column">
    <p>The clear icon produces null; Backspace to empty produces an empty string.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="text" label="Keyword">
        <mp-input v-model="model.text" edit-mode="direct" clearable :empty-value="null" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.text = 'Hello'">Restore initial value</mp-button>
    <p>
      Current model: <output>{{ JSON.stringify(model.text) }}</output>
    </p>
  </mp-space>
</template>
```

### Model Modifier

Example source: src/input/example/demos/en-US/model-modifier.vue

```vue
<script setup>
import { ref } from 'vue'

const trimValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model.trim="trimValue" placeholder="Enter text with surrounding spaces" />
    <div class="input-example__value">Current value：“{{ trimValue }}”</div>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Interaction state comparison

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for single-line form inputs. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

Example source: src/input/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('示例内容')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-input v-model="value" v-bind="__demoState"></mp-input>
  </mp-space>
</template>
```

### Body and event contract

Input notifies input → update:modelValue. Clearing notifies clear → input → update:modelValue → change once each, with one corresponding Form notification. Clearing is blocked while readonly, disabled or composing. Rejected controlled proposals restore the native content, including input types without cursor APIs.

Example source: src/input/example/demos/en-US/event-pipeline.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Editable content')
const events = ref<string[]>([])
const record = (name: string) => {
  events.value = [...events.value.slice(-7), name]
}
</script>
<template>
  <div class="input-pipeline-demo">
    <mp-input
      v-model="value"
      clearable
      placeholder="Type and clear"
      @clear="record('clear')"
      @input="record('input')"
      @update:model-value="record('update:modelValue')"
      @change="record('change')"
    />
    <p>Typing: input → update; clearing: clear → input → update → change.</p>
    <output>{{ events.join(' → ') || 'Waiting for interaction' }}</output>
  </div>
</template>
<style scoped>
.input-pipeline-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.input-pipeline-demo p {
  margin: 0;
}
</style>
```

### Native Attributes

Example source: src/input/example/demos/en-US/native-attrs.vue

```vue
<template>
  <mp-input
    enterkeyhint="next"
    aria-label="Enter your email"
    :input-attrs="{ name: 'email', autocomplete: 'off', autocapitalize: 'none' }"
    placeholder="Enter your email"
    type="email"
  />

  <div class="input-example__bottom-space" />
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Commit approval

Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

Example source: src/input/example/demos/en-US/commit-protocol.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | null>('Project A')
const message = ref('')
async function beforeCommit(
  { value: next, previousValue }: { value: unknown; previousValue: unknown },
  _done: (allow?: boolean) => void,
  { signal }: { signal: AbortSignal },
) {
  if (next === previousValue) {
    return true
  }
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (signal.aborted) {
    return false
  }
  message.value = `Saved: ${String(next)}`
  return true
}
</script>
<template>
  <mp-space direction="column">
    <mp-input v-model="value" edit-mode="popup" clearable :empty-value="null" :before-commit="beforeCommit" />
    <p role="status">{{ message }}</p>
  </mp-space>
</template>
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Loading and waiting

### Loading

Toggle loading to compare the default indicator and bottom line. Input remains editable while loading.

Example source: src/input/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(true)
const value = ref('加载时仍可编辑')
</script>
<template>
  <mp-space direction="column" :size="16" style="width: 100%">
    <mp-form layout="vertical">
      <mp-form-item label="加载状态 / Loading"><mp-switch v-model="busy" /></mp-form-item>
      <mp-form-item label="默认指示器 / Default"
        ><mp-input
          v-model="value"
          :loading="busy"
          placeholder="加载时仍可编辑 / Editable while loading"
          loading-mode="default"
      /></mp-form-item>
      <mp-form-item label="底部加载线 / Line"
        ><mp-input
          v-model="value"
          :loading="busy"
          placeholder="加载时仍可编辑 / Editable while loading"
          loading-mode="line"
      /></mp-form-item>
    </mp-form>
    <p>切换加载状态；加载时仍可输入和清空。Loading keeps the input editable.</p>
  </mp-space>
</template>
```

## Composition input

IME composition preserves the native text being entered; external model updates do not replace it before composition completes. Existing formatting and controlled-owner acceptance apply after completion. Queued restoration from an earlier input cannot replace the text or caret of a later edit or composition. Length limits and modifiers retain their existing post-composition input/commit timing.

## Usage notes

### Form presentation inheritance

Supports `edit-mode`: `direct / popup`. Inherits FormItem/Form when unset; standalone usage defaults to direct. readPretty displays plain text; popup editing updates v-model after confirmation by default. Optional before-commit can intercept saving after candidate validation. See the Form documentation for usage and comparison demos.

### Native busy metadata

When neither loading nor commit waiting is active, Input preserves native aria-busy metadata. Internal busy takes precedence over an external false hint. Setting aria-busy alone does not create an indicator or async task.
### Configuration

Input exposes these variables; see [FieldDecorator](#/en-US/field-decorator) for container appearance.

Public types: `InputEmits`, `InputSlots`, `InputExpose`, `InputGroupSlots`, `InputPasswordEmits`, `InputPasswordSlots`, `InputPasswordExpose`.

### Input caret theme

Deferred `change` preserves the real confirmation event when available (for example, the save button). Programmatic editor handoff has no DOM event, so its second argument is optional. The event target can be the confirmation control rather than the input. `change` is a notification: its returned Promise is not awaited; use `before-commit` to approve asynchronous saves.

InputPassword forwards all Input props, events and slots. `open` controls only the deferred editor; direct mode has no editor. Initial `open`/default-`open` does not request an initialization close, and later default-`open` changes do not reopen the editor.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Input Props

| Prop | Description | Type | Default |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------ | :---------: |
| `v-model` | Controlled value | `string \| null` | `-` |
| `model-modifiers` | `v-model` modifiers; supports `trim` | `object` | `{}` |
| `default-value` | Uncontrolled initial value; read only at creation, never written into the parent | `string` | `''` |
| `type` | `text`, `password`, `number`, `tel`, or `email` | `InputType`<br>`'number' \| 'text' \| 'email' \| 'tel' \| 'password'` | `text` |
| `placeholder` | Placeholder or floating hint text | `string` | `-` |
| `size` | `xs`, `sm`, `md`, `lg`, or `xl` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| `variant` | `filled`, `outline`, or `standard` | `string` | `outline` |
| `hint` | Use the placeholder as a floating hint | `boolean` | `true` |
| `line` | Show the border or bottom separator | `boolean` | `true` |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | `number \| object` | `0` |
| `show-word-limit` | Show the character counter | `boolean` | `false` |
| `word-length` | Custom length calculator | `function` | `-` |
| `word-slice` | Custom truncation function | `function` | `-` |
| `readonly` | Whether readonly | `boolean` | `false` |
| `disabled` | Whether disabled | `boolean` | `false` |
| `error` | Show the error state | `boolean` | `false` |
| `clearable` | Show a persistent clear icon while editable and nonempty | `boolean` | `false` |
| empty-value | Clear output; omission clears to an empty string and manual deletion is unchanged | `string \| null \| (() => string \| null)` | `undefined` |
| `autofocus` | Focus automatically after mount | `boolean` | `false` |
| `enterkeyhint` | Mobile enter-key hint | `string` | `-` |
| `aria-label` | Accessible label | `string` | `-` |
| `input-attrs` | Native attributes such as name; `autocomplete` is fixed to `off` | `object` | `-` |
| `text-color` | Text color | `string` | `-` |
| `focus-color` | Focus color | `string` | `-` |
| `blur-color` | Blur color | `string` | `-` |
| `edit-mode` | Editor mode; inherits FormItem/Form | `direct / popup` | `undefined` |
| `read-pretty` | Reading presentation; inherits FormItem/Form | `boolean` | `undefined` |
| `open` | Controlled editor visibility in deferred modes | `boolean` | `undefined` |
| `default-open` | Uncontrolled initial editor visibility; creation-only | `boolean` | `false` |
| `before-commit` | Deferred save approval: (payload, done, context) | `BeforeFieldCommit` | `undefined` |
| `popup-container` | Deferred editor portal target; false renders in place | `PopupContainer` | `undefined` |
| `loading` | Manual loading presentation; remains editable | `boolean` | `false` |
| `loading-mode` | Indicator layout | `default / line` | `default` |

Configure validation rules on `mp-form-item`; see [Form](#/en-US/form).

size/disabled/readonly inherit from child → InputGroup → FormItem/Form → library defaults. All five sizes work. `hint` defaults on but is disabled by an external label. name/id/aria-*/data-* reach native input; class/style stay on the wrapper. `input-attrs` cannot override controlled value, type, disabled/readonly or length policy.

### Input Methods

| Method | Description | Arguments | Returns |
| -------- | ------------ | ---- | ------ |
| `focus` | Focus | `-` | `-` |
| `blur` | Blur | `-` | `-` |
| `select` | Select all text | `-` | `-` |

### Input Events

| Event | Description | Arguments |
| ------------- | ------------------------------- | ----------------------------- |
| `focus` | Emitted on focus | `event: FocusEvent` |
| `blur` | Emitted on blur | `event: FocusEvent` |
| `clear` | Emitted when clearing | `event: Event` |
| `input` | Emitted on input | `value: string, event: Event` |
| `change` | Emitted only when blur or Enter commits a value | `value: string \| null, event?: Event` |
| `press-enter` | Emitted when Enter is pressed | `event: KeyboardEvent` |
| `keydown` | Emitted on keydown | `event: KeyboardEvent` |
| `update:modelValue` | Model proposal; includes explicit null | `value: string \| null` |
| `update:open` | Editor visibility request | `open: boolean` |
| `click` | Native input click notification | `event: MouseEvent` |

`errorOnly: true` retains over-limit text and shows an error. Other active length limits truncate; `input` reports normalized text and model notifications follow Vue modifiers. Clearing notifies `clear → input → update:model-value → change`; the following blur does not repeat `change`.

### Input Slots

| Slot | Description | Prop |
| ------------ | -------------- | ------------------- |
| `prefix` | Prefix content | `-` |
| `suffix` | Suffix content | `-` |
| `clear-icon` | Clear icon or button | `clear: (event?: Event) => void` |
| `read` | Custom reading content | `{ value: string \| null }` |

### InputPassword and InputGroup

| Component | Prop / event | Description |
| ---------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `mp-input-password` | `visibility`, `default-visibility`, `visibility-toggle` | Password visibility; uncontrolled by default, with a visible toggle |
| `mp-input-password` | `visibility-change`, `update:visibility` | Emitted on visibility changes with a `boolean` argument |
| `mp-input-group` | `size`, `variant`, `disabled`, `readonly`, `hint` | Child Input defaults; `variant` defaults to `filled` |
| `mp-input-group-label` | Default slot | Text attachment for grouped inputs |

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-input-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-input-control-font-size` | `inherit` | `font-size` |
| `--mp-input-control-height` | `auto` | `height` |
| `--mp-input-control-line-height` | `inherit` | `line-height` |
| `--mp-input-control-padding-horizontal` | `0` | `padding` |
| `--mp-input-counter-color` | `var(--mp-field-suffix-text-color)` | `color` |
| `--mp-input-counter-font-size` | `12px` | `font-size` |
| `--mp-input-feedback-duration` | `1s` | `animation` |
| `--mp-input-feedback-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-input-feedback-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-input-feedback-validating-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-input-feedback-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-input-caret-color: var(--mp-field-caret-color);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->

### Input caret theme

`--mp-field-caret-color` defaults to `currentColor` and sets shared caret color. `--mp-input-caret-color` overrides this component, default `var(--mp-field-caret-color)`.
