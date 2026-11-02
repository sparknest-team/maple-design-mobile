<!-- Source: src/input/docs/en-US.md; locale: en-US; page: /en-US/input -->

# Input

## Examples

### Default value and v-model

`modelValue` is the controlled value bound through ordinary `v-model`. It takes precedence, including an empty string. `defaultValue` initializes uncontrolled state only when the component is created; subsequent user input is stored internally. Changing `defaultValue` does not reset existing text. Remounting reads it again. Initialization emits no `update:modelValue` and does not write to a parent form.

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

### Variants

Example source: src/input/example/demos/en-US/variant.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" placeholder="Filled" />
    <mp-input variant="outline" placeholder="Outline" />
    <mp-input variant="standard" placeholder="Standard" />
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

### Sizes

Example source: src/input/example/demos/en-US/size.vue

```vue
<script setup>
import { reactive } from 'vue'

const demoText = {
  filled: 'Filled',
  outline: 'Outline',
  standard: 'Standard',
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const variants = ['filled', 'outline', 'standard']
const sizeValues = reactive(
  Object.fromEntries(sizes.flatMap((size) => variants.map((variant) => [`${size}-${variant}`, '']))),
)
</script>

<template>
  <template v-for="size in sizes" :key="size">
    <div class="input-example__caption">{{ size }}</div>
    <mp-space direction="column" :size="[12, 0]">
      <mp-input
        v-for="variant in variants"
        :key="variant"
        v-model="sizeValues[`${size}-${variant}`]"
        :size="size"
        :variant="variant"
        :placeholder="demoText[variant] ?? String(variant)"
      />
    </mp-space>
  </template>
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

### States

Example source: src/input/example/demos/en-US/state.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input model-value="Maple Design" readonly placeholder="Readonly" />
    <mp-input model-value="Maple Design" disabled placeholder="Disabled" />
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

### Introduction

Use Input for single-line text entry. It supports multiple variants, floating hints, input types, states, and prefix or suffix content.

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

### Input Types

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

### Password Input

`mp-input-password` adds visibility toggling with `visibility` / `default-visibility`, `visibility-toggle`, and `visibility-change`. Other Input props and events are forwarded.

Example source: src/input/example/demos/en-US/password.vue

```vue
<template>
  <mp-input-password placeholder="Password" default-value="Maple2026" />
</template>
```

### Character Limit

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

### Body and event contract

The two libraries maintain independent copies of the body. Input emits input before update:modelValue. Clearing emits clear → input → update:modelValue → change once each; Form receives each semantic once. Readonly/disabled/composing controls cannot clear. A rejected controlled value is restored, including input types without selection APIs.

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

### Appearance combinations

Use this example for single-line form inputs. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/input/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('示例内容')
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
    <mp-input v-model="value" v-bind="__demoAppearance"></mp-input>
  </mp-space>
</template>
```

### Interaction states

Use this example for single-line form inputs. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

## API

### Props

| Name              | Description                                                                | Type               |  Default  |
| ----------------- | -------------------------------------------------------------------------- | ------------------ | :-------: |
| `v-model`         | Controlled value                                                           | `string`           |    `-`    |
| `model-modifiers` | `v-model` modifiers; supports `trim`                                       | `object`           |   `{}`    |
| `default-value`   | Uncontrolled initial value; read only at creation, never written into the parent                                         | `string`           |   `''`    |
| `type`            | `text`, `password`, `number`, `tel`, or `email`                            | `InputType`        |  `text`   |
| `placeholder`     | Placeholder or floating hint text                                          | `string`           |    `-`    |
| `size`            | `xs`, `sm`, `md`, `lg`, or `xl`                                            | `ComponentSize`    |   `md`    |
| `variant`         | `filled`, `outline`, or `standard`                                         | `string`           | `outline` |
| `hint`            | Use the placeholder as a floating hint                                     | `boolean`          |  `true`   |
| `line`            | Show the border or bottom separator                                                  | `boolean`          |  `true`   |
| `max-length`      | Maximum length; truncates by default, or reports an error with `errorOnly` | `number \| object` |    `0`    |
| `show-word-limit` | Show the character counter                                                 | `boolean`          |  `false`  |
| `word-length`     | Custom length calculator                                                   | `function`         |    `-`    |
| `word-slice`      | Custom truncation function                                                 | `function`         |    `-`    |
| `readonly`        | Read-only state                                                            | `boolean`          |  `false`  |
| `disabled`        | Disabled state                                                             | `boolean`          |  `false`  |
| `error`           | Show the error state                                                       | `boolean`          |  `false`  |
| `clearable`       | Show a persistent clear icon while editable and nonempty                  | `boolean`          |  `false`  |
| `autofocus`       | Focus automatically after mount                                            | `boolean`          |  `false`  |
| `enterkeyhint`    | Mobile enter-key hint                                                      | `string`           |    `-`    |
| `aria-label`      | Accessible label                                                           | `string`           |    `-`    |
| `input-attrs`     | Native attributes such as name; `autocomplete` is fixed to `off`                                   | `object`           |    `-`    |
| `text-color`      | Text color                                                                 | `string`           |    `-`    |
| `focus-color`     | Focus color                                                                | `string`           |    `-`    |
| `blur-color`      | Blur color                                                                 | `string`           |    `-`    |

Native input attributes, `aria-*` and `data-*` are forwarded to the input; class/style remain on the root. `input-attrs` takes precedence for native attributes, but cannot override the controlled value, readonly, disabled or length-normalization behavior.

Validation rules belong on `mp-form-item`. See the [Form component](#/en-US/form).

### Methods

| Name    | Description     | Parameters | Return value |
| ------- | --------------- | ---------- | ------------ |
| `focus` | Focus the input | `-`        | `-`          |
| `blur`  | Blur the input  | `-`        | `-`          |
| `select` | Select all text | `-` | `-` |

### Events

| Name          | Description                                     | Parameters                    |
| ------------- | ----------------------------------------------- | ----------------------------- |
| `focus`       | Emitted on focus                                | `event: FocusEvent`           |
| `blur`        | Emitted on blur                                 | `event: FocusEvent`           |
| `clear`       | Emitted after clearing                          | `event: Event`                |
| `input`       | Emitted on input                                | `value: string, event: Event` |
| `change`      | Emitted only when blur or Enter commits a value | `value: string, event: Event` |
| `press-enter` | Emitted when Enter is pressed                   | `event: KeyboardEvent`        |
| `keydown`     | Emitted on keydown            | `event: KeyboardEvent`        |

When `max-length` is exceeded, `update:model-value` and `input` emit the truncated value. Clearing emits `clear → input → update:model-value → change` once each; the following blur does not repeat `change`.

### Slots

| Name         | Description          | Parameters          |
| ------------ | -------------------- | ------------------- |
| `prefix`     | Prefix content       | `-`                 |
| `suffix`     | Suffix content       | `-`                 |
| `clear-icon` | Clear icon or button | `clear: () => void` |

### InputPassword and InputGroup

| Component | Prop / event | Description |
| --------- | ------------ | ----------- |
| `mp-input-password` | `visibility`, `default-visibility`, `visibility-toggle` | Password visibility; uncontrolled by default with a visible toggle |
| `mp-input-password` | `visibility-change`, `update:visibility` | Emitted with the new `boolean` visibility |
| `mp-input-group` | `size`, `variant`, `disabled`, `readonly`, `hint` | Child Input defaults; `variant` defaults to `filled` |
| `mp-input-group-label` | Default slot | Text attachment for grouped inputs |

### Style variables

Input provides the variables below. See [FieldDecorator](#/en-US/field-decorator) for container appearance variables.

| Variable                                | Default                           |
| --------------------------------------- | --------------------------------- |
| `--mp-input-control-height` | `auto` |
| `--mp-input-control-font-size` | `inherit` |
| `--mp-input-control-line-height` | `inherit` |
| `--mp-input-control-padding-horizontal` | `0`                               |
| `--mp-input-counter-color` | `--mp-field-suffix-text-color` |
| `--mp-input-counter-font-size` | `12px` |
| `--mp-input-feedback-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-input-feedback-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-input-feedback-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-input-feedback-validating-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-input-feedback-duration` | `1s` |

公开类型 / Public types: `InputEmits`, `InputSlots`, `InputExpose`, `InputGroupSlots`, `InputPasswordEmits`, `InputPasswordSlots`, `InputPasswordExpose`.

### 表单展示继承

支持 presentation：`inline / popup`，默认 inline。可继承 FormItem/Form；readPretty 以纯文本阅读，其他弹层默认确认后更新 v-model。可选 before-commit 在候选校验通过后拦截保存。使用方式与对比 Demo 统一见 Form 文档。


## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.
Text and person-ID models remain strings; use an empty string or another string sentinel.


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.


Field commits also accept `beforeCommit(value, context, done)`, preserving the second context argument. The third done callback allows/rejects the commit; Promise and boolean forms remain supported. A callback-style hook must complete through done or a boolean/Promise result.
