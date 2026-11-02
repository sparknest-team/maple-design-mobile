<!-- Source: src/textarea/docs/en-US.md; locale: en-US; page: /en-US/textarea -->

# Textarea

Native inputs always use `autocomplete="off"`; native attribute bags cannot enable autofill.

## Examples

### Introduction

A multiline plain-text editor for comments, feedback, and other longer content.

### Basic usage and value models

Use `v-model` for a controlled value and `default-value` for an uncontrolled initial value. The third textarea uses `v-model.trim`: blur to commit the trimmed value, then inspect the value below it.

Default length counts UTF-16 code units (an emoji usually uses 2). Default truncation never splits a valid surrogate pair; a character that does not fit is omitted entirely. For grapheme-cluster counting and slicing, provide matching `word-length` and `word-slice` functions; custom slicing remains application-controlled.

Example source: src/textarea/example/demos/en-US/demo-1.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const trimmed = ref('')
</script>
<template>
  <mp-space direction="column">
    <mp-textarea v-model="value" clearable placeholder="Enter multiple lines" aria-label="Controlled text" />
    <p role="status">Current value: {{ value || '(empty)' }}</p>
    <mp-textarea default-value="An uncontrolled initial value" aria-label="非Controlled text" />
    <mp-textarea
      v-model.trim="trimmed"
      placeholder="Enter surrounding whitespace, then blur"
      aria-label="Trimmed text"
    />
    <p role="status">Trimmed value: {{ JSON.stringify(trimmed) }}</p>
  </mp-space>
</template>
```

### Variants

Example source: src/textarea/example/demos/en-US/demo-2.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const filledValue = ref('')
const outlineValue = ref('')
const standardValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="filledValue" :rows="3" variant="filled" placeholder="Filled" />
    <mp-textarea v-model="outlineValue" :rows="3" variant="outline" placeholder="Outline" />
    <mp-textarea v-model="standardValue" :rows="3" variant="standard" placeholder="Standard" />
  </mp-space>
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Hint

Example source: src/textarea/example/demos/en-US/demo-3.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const hintValue = ref('')
const noHintValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="hintValue" hint :rows="3" placeholder="Floats on focus or with content" />
    <mp-textarea v-model="noHintValue" :hint="false" :rows="3" placeholder="Native placeholder" />
  </mp-space>
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Sizes

Example source: src/textarea/example/demos/en-US/demo-4.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const sizeValues = reactive(Object.fromEntries(sizes.map((size) => [size, ''])))
</script>

<template>
  <template v-for="size in sizes" :key="size">
    <div class="textarea-example__caption">{{ size }}</div>
    <mp-textarea v-model="sizeValues[size]" :rows="2" :size="size" variant="outline" :placeholder="`${size} size`" />
  </template>
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Length and resize

Example source: src/textarea/example/demos/en-US/demo-5.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const limitedValue = ref('')
</script>

<template>
  <p>Length counts UTF-16 code units. An emoji that does not fit is omitted without splitting its surrogate pair.</p>
  <mp-textarea
    v-model="limitedValue"
    clearable
    :max-length="100"
    show-word-limit
    placeholder="Up to 100 characters"
    resize
    :rows="4"
    variant="outline"
  />
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### States

Example source: src/textarea/example/demos/en-US/demo-6.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea model-value="Readonly" readonly :rows="3" />
    <mp-textarea model-value="Disabled" disabled :rows="3" />
  </mp-space>

  <div class="textarea-example__bottom-space" />
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Body and event contract

The two libraries maintain independent copies of the body. Input emits input before update:modelValue. Clearing emits clear → input → update:modelValue → change once each; Form receives each semantic once. Readonly/disabled/composing controls cannot clear. A rejected controlled value is restored, including input types without selection APIs.

Example source: src/textarea/example/demos/en-US/body-contract.vue

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
  <div class="textarea-body-demo">
    <mp-textarea
      v-model="value"
      hint
      clearable
      placeholder="Work notes"
      :auto-size="{ minRows: 2, maxRows: 5 }"
      :max-length="100"
      show-word-limit
      @clear="record('clear')"
      @input="record('input')"
      @update:model-value="record('update:modelValue')"
      @change="record('change')"
    />
    <mp-textarea :line="false" hint placeholder="Borderless hint" focus-color="#137547" :rows="2" />
    <p>Enter inserts a newline; blur commits; clearing notifies each semantic once.</p>
    <output>{{ events.join(' → ') || 'Waiting for interaction' }}</output>
  </div>
</template>
<style scoped>
.textarea-body-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.textarea-body-demo p {
  margin: 0;
}
</style>
```

### Appearance combinations

Use this example for notes and multi-line descriptions. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/textarea/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('这是一段可以编辑的多行内容。')
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
    <mp-textarea v-model="value" v-bind="__demoAppearance"></mp-textarea>
  </mp-space>
</template>
```

### Interaction states

Use this example for notes and multi-line descriptions. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/textarea/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('这是一段可以编辑的多行内容。')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-textarea v-model="value" v-bind="__demoState"></mp-textarea>
  </mp-space>
</template>
```

## API

### Props

| Prop              | Description                                  | Type                                                | Default    |
| ----------------- | -------------------------------------------- | --------------------------------------------------- | ---------- |
| `v-model`         | Controlled value                             | _string_                                            | `-`        |
| `default-value`   | Uncontrolled initial value                   | _string_                                            | `''`       |
| `model-modifiers` | Supports the `trim` model modifier           | _object_                                            | `{}`       |
| `placeholder`     | Placeholder text                             | _string_                                            | `-`        |
| `variant`         | `filled \| outline \| standard`              | _string_                                            | `outline`  |
| `size`            | `xs \| sm \| md \| lg \| xl`                 | _string_                                            | `md`       |
| `clearable`       | Enables the clear action                     | _boolean_                                           | `false`    |
| `disabled`        | Disables editing                             | _boolean_                                           | `undefined` |
| `readonly`        | Makes the value read-only                    | _boolean_                                           | `undefined` |
| `error`           | Enables the visual error state               | _boolean_                                           | `undefined` |
| `rows`            | Native visible row count                     | _string \| number_                                  | `-`        |
| `resize`          | Allows vertical manual resizing              | _boolean_                                           | `false`    |
| `auto-size`       | Grows with content with optional row bounds  | _boolean \| { minRows?: number; maxRows?: number }_ | `false`    |
| `max-length`      | Truncating or error-only length limit        | _number \| { length: number; errorOnly?: boolean }_ | `0`        |
| `show-word-limit` | Shows the length counter                     | _boolean_                                           | `false`    |
| `word-length`     | Custom length function                       | _(value: string) => number_                         | `-`        |
| `word-slice`      | Custom slice function                        | _(value: string, maxLength: number) => string_      | `-`        |
| `aria-label`      | Accessible name when no visible label exists | _string_                                            | `-`        |
| `autofocus`       | Focuses after mount                          | _boolean_                                           | `false`    |
| `enterkeyhint`    | Virtual-keyboard Enter hint                  | _string_                                            | `-`        |
| `textarea-attrs`  | Supplemental native textarea attributes      | _object_                                            | `-`        |
| `hint` | Floating hint; inherits Group/library default | _boolean_ | `undefined` |
| `line`            | Shows the decorator line                     | _boolean_                                           | `true`     |
| `text-color`      | Custom text color                            | _string_                                            | `-`        |
| `focus-color`     | Custom focus color                           | _string_                                            | `-`        |
| `blur-color`      | Custom blur color                            | _string_                                            | `-`        |

Inside Form/FormItem, omitted `size`, `disabled`, `readonly`, and `error` inherit form state. Explicit local values, including `false`, take precedence.

### Events

| Event     | Description                                    | Arguments                     |
| --------- | ---------------------------------------------- | ----------------------------- |
| `input`   | User input after IME composition               | `value: string, event: Event` |
| `change`  | Changed value committed on blur                | `value: string, event: Event` |
| `keydown` | Native keydown signal; Enter remains a newline | `event: KeyboardEvent`        |
| `clear`   | Clear → input → update:model-value → change    | `event: Event`                |
| `focus`   | Focus                                          | `event: FocusEvent`           |
| `blur`    | Blur                                           | `event: FocusEvent`           |

### Slots

| Slot         | Description          | Slot props                       |
| ------------ | -------------------- | -------------------------------- |
| `prefix`     | Prefix content       | `-`                              |
| `suffix`     | Suffix content       | `-`                              |
| `clear-icon` | Custom clear control | `clear: (event?: Event) => void` |

### Methods

| Method  | Description               |
| ------- | ------------------------- |
| `focus` | Focus the native textarea |
| `blur`  | Blur the native textarea  |

### Type definitions

```ts
import type {
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from '@maple-design/ui'
```

### Style variables

| Variable                          | Default |
| --------------------------------- | ------- |
| `--mp-textarea-height`                         | `auto`                            |
| `--mp-textarea-min-height`                     | `96px`                            |
| `--mp-textarea-font-size`                      | `16px`                            |
| `--mp-textarea-line-height`                    | `1.5`                             |
| `--mp-textarea-padding-horizontal`             | `0`                               |
| `--mp-textarea-padding-vertical`               | `0`                               |
| `--mp-textarea-placeholder-color`              | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-color`                  | `--mp-sys-color-content-secondary` |
| `--mp-textarea-counter-font-size`              | `--mp-sys-font-size-xs`           |
| `--mp-textarea-counter-margin-top`              | `--mp-sys-space-2`                |

Counter layout is platform-specific: Cedar positions the counter inside the field using counter-inset-inline-end, counter-inset-block-end and scrollbar-offset; Maple renders an external counter row using counter-margin-top. Only the variables relevant to each layout are exposed; color and font-size remain shared.

### Native layout and public types

size supports xs/sm/md/lg/xl for the FieldDecorator shell; textarea height and text metrics remain controlled by rows, auto-size and textarea Tokens. Default manual resize is true on Cedar and false on Maple. InputGroup defaults and Form state apply; a child's explicit value wins. focus(options?), blur(), select() and textareaRef are exposed.

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

Native methods: `focus(options?: FocusOptions)`, `blur()`, `select()`; `textareaRef` is the native element.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.
Text and person-ID models remain strings; use an empty string or another string sentinel.


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
