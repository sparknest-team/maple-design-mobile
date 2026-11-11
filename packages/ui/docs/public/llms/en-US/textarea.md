<!-- Source: src/textarea/docs/en-US.md; locale: en-US; page: /en-US/textarea -->

# Textarea

Native inputs always use `autocomplete="off"`; native attribute bags cannot enable autofill.

### Introduction

A multiline plain-text editor for comments, feedback, and other longer content.

## Reading direction

The textarea inherits source `dir`, aligns text to inline start and its counter to inline end. Runtime direction changes retain the native editor, focus and selection; native caret and newline keys keep their meanings.

## Basic examples

### Basic usage and value models

Use `v-model` for a controlled value and `default-value` for an uncontrolled initial value.

`v-model.trim` follows Vue model event rules: `update:modelValue` is trimmed during input, while `input` reports the original text after length normalization. An uncontrolled editor may retain surrounding whitespace while editing and normalizes its local display on commit; committing does not repeat the same model proposal already reported. Controlled display follows the final parent value, and `change` still denotes a commit.

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
      placeholder="Enter surrounding whitespace and inspect the model"
      aria-label="Trimmed text"
    />
    <p role="status">Trimmed value: {{ JSON.stringify(trimmed) }}</p>
  </mp-space>
</template>
```

## Appearance and states

### Hint

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ---------------------------------------- | ---------------- |
| `rows` | Native visible row count | Hint, Sizes, States |
| `placeholder` | Placeholder text | Hint, Sizes |
| `hint` | Floating hint; inherits Group/library default | Hint |
| `size` | `xs \\ | sm \\ | md \\ | lg \\ | xl` | Size |
| `variant` | `filled \\ | outline \\ | standard` | Size |
| `readonly` | Whether readonly | States |

<!-- demo-config-notes:end -->


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

### Appearance configuration comparison

Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for notes and multi-line descriptions. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

Example source: src/textarea/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref('这是一段可以编辑的多行内容。')
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
        <mp-textarea v-model="value" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"></mp-textarea>
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

## Content and presentation

### Length and resize

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------------- | ---------------------------------------- | ---------------- |
| `clearable` | Enables the clear action | Length and resize |
| `max-length` | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | Length and resize |
| `show-word-limit` | Show the character counter | Length and resize |
| `placeholder` | Placeholder text | Length and resize |
| `resize` | Allows vertical manual resizing | Length and resize |
| `rows` | Native visible row count | Length and resize |

<!-- demo-config-notes:end -->


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

`max-length` accepts a finite nonnegative number or `{ length, errorOnly? }`; `0` means unlimited. Object `length` follows the same numeric constraint and `errorOnly` is an optional boolean. Invalid values use Vue prop-validation diagnostics and fall back to no limit; null is treated as unset. Default slicing counts UTF-16 code units. Supply `word-length / word-slice` together for custom counting and slicing.

## Interaction and control

### Interaction states

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | --------------------------------- | -------------- |
| `disabled` | Whether disabled | Interaction states |
| `readonly` | Whether readonly | Interaction states |
| `error` | Show the error state | Interaction states |
| `hint` | Floating hint; inherits Group/library default | Body and event contract |
| `clearable` | Enables the clear action | Body and event contract |
| `placeholder` | Placeholder text | Body and event contract |

<!-- demo-config-notes:end -->


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

### Auto Size

Auto sizing converts the measured box to the actual CSS box model, counting padding and the top/bottom borders once. Explicit `minRows / maxRows` override the theme minimum; excess content scrolls within the row cap. Turning auto size off restores native height and the platform resize default. Compare both box models, fill six lines, and switch the cap.

Example source: src/textarea/example/demos/auto-size.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const content = ref('第一行 / First line')
const boundedContent = ref('第一行 / First line\n第二行 / Second line')
const maxRows = ref(5)
function fill() {
  boundedContent.value = 'one\ntwo\nthree\nfour\nfive\nsix'
}
</script>
<template>
  <mp-space direction="column" size="lg" fill>
    <mp-textarea default-value="原生三行 / Native three rows" :rows="3" aria-label="Native rows" />
    <mp-textarea v-model="content" auto-size placeholder="随内容增高 / Grow with content" />
    <mp-space wrap>
      <mp-button @click="fill">填入六行 / Fill six lines</mp-button>
      <mp-button @click="maxRows = maxRows === 5 ? 2 : 5">切换行数上限 / Toggle row limit: {{ maxRows }}</mp-button>
    </mp-space>
    <template v-for="box in ['border-box', 'content-box']" :key="box">
      <p>{{ box }} · 2–{{ maxRows }} rows</p>
      <mp-textarea
        v-model="boundedContent"
        :auto-size="{ minRows: 2, maxRows }"
        :textarea-attrs="{
          'aria-label': 'Bounded ' + box,
          style: {
            boxSizing: box,
            lineHeight: '20px',
            padding: '4px',
            borderStyle: 'solid',
            borderWidth: '1px 2px 3px 4px',
          },
        }"
      />
    </template>
  </mp-space>
</template>
```

### Body and event contract

Input notifies input → update:modelValue. Clearing notifies clear → input → update:modelValue → change once each, with one corresponding Form notification. Clearing is blocked while readonly, disabled or composing. Rejected controlled proposals restore the native content, including input types without cursor APIs.

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

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Value model and interaction

### Dynamic empty values

Changing empty-value (including its factory) affects the next clear operation. Changing empty-values reformats the existing model without emitting a model update. Direct clear publishes immediately; deferred clear remains a draft until confirmation.

Example source: src/textarea/example/demos/empty-policy.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const sentinel = ref(false)
const emptyValue = computed(() => (sentinel.value ? 'CLEARED' : null))
const emptyValues = [undefined, null, '', 'CLEARED']
const direct = ref('Direct draft')
const deferred = ref('Deferred draft')
function reset() {
  direct.value = 'Direct draft'
  deferred.value = 'Deferred draft'
}
</script>
<template>
  <mp-space direction="column">
    <mp-space>
      <mp-button @click="sentinel = !sentinel">切换清空值 / Toggle empty value</mp-button>
      <mp-button @click="reset">重置示例 / Reset values</mp-button>
    </mp-space>
    <p role="status">empty-value: {{ JSON.stringify(emptyValue) }}</p>
    <mp-textarea
      v-model="direct"
      edit-mode="direct"
      :empty-value="emptyValue"
      :empty-values="emptyValues"
      clearable
      aria-label="Direct text"
      placeholder="直接编辑 / Direct"
    />
    <mp-textarea
      v-model="deferred"
      edit-mode="popup"
      :empty-value="emptyValue"
      :empty-values="emptyValues"
      clearable
      aria-label="Deferred text"
      placeholder="确认后保存 / Deferred"
    />
    <p>
      先切换清空值再清空；延迟编辑确认后回写。Change the policy before clearing; deferred changes publish on confirm.
    </p>
    <pre class="empty-policy-model">{{ JSON.stringify({ direct, deferred }) }}</pre>
  </mp-space>
</template>
```

## Composition input

IME composition preserves the native text being entered; external model updates do not replace it before composition completes. Existing formatting and controlled-owner acceptance apply after completion. Queued restoration from an earlier input cannot replace the text or caret of a later edit or composition. Length limits and modifiers retain their existing post-composition input/commit timing.

## Usage notes

### Sizing and native methods

size supports five FieldDecorator densities: xs/sm/md/lg/xl. rows, auto-size and Textarea tokens still control textarea height/text metrics. Cedar allows manual resize by default; Maple does not. InputGroup/Form state is inherited, with explicit child values taking precedence. Exposes focus(options?), blur(), select() and textareaRef.

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

Native methods: `focus(options?: FocusOptions)`, `blur()`, `select()`; `textareaRef` is the native element.

### Editing and confirmation

This component supports `edit-mode` with field > FormItem > Form precedence. When unset, it defaults to `direct` and preserves `direct` editing. Supported values: `direct / popup`. Non-direct modes open the editor through the field value trigger and keep one draft; v-model updates only after confirmation. Cancel, reset or enabling readPretty discards the draft.

Maple uses edit-mode="popup" to open the editor when the value area is clicked; direct edits immediately. readPretty is a reading-only setting, independent of readonly and disabled.

FormItem validates the candidate first and keeps editing open on failure; before-commit approval runs after validation succeeds. See the property section above for approval parameters and completion rules.

`open / default-open / update:open / open-change` control and report editor visibility; `#read="{ value, text }"` customizes reading content. See Form for composed examples.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

`--mp-field-caret-color` defaults to `currentColor` and sets shared caret color. `--mp-textarea-caret-color` overrides this component, default `var(--mp-field-caret-color)`.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Textarea Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| empty-value | Clear output; omission clears to an empty string and manual deletion is unchanged | `string \| null \| (() => string \| null)` | `undefined` |
| model-value | Controlled value | `string \| null` | `-` |
| model-modifiers | `v-model` modifiers; supports `trim` | `object` | `{}` |
| default-value | Uncontrolled initial value; read only at creation, never written into the parent | `string` | `''` |
| placeholder | Placeholder or floating hint text | `string` | `-` |
| disabled | Whether disabled | `boolean` | `false` |
| readonly | Whether readonly | `boolean` | `false` |
| variant | `filled`, `outline`, or `standard` | `string` | `outline` |
| size | `xs`, `sm`, `md`, `lg`, or `xl` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| error | Show the error state | `boolean` | `false` |
| max-length | Finite nonnegative length or `{ length, errorOnly? }`; 0 is unlimited; invalid values diagnose and fall back to no limit | `number \| object` | `0` |
| show-word-limit | Show the character counter | `boolean` | `false` |
| clearable | Show a persistent clear icon while editable and nonempty | `boolean` | `false` |
| word-length | Custom length calculator | `function` | `-` |
| word-slice | Custom truncation function | `function` | `-` |
| aria-label | Accessible label | `string` | `-` |
| autofocus | Focus automatically after mount | `boolean` | `false` |
| enterkeyhint | Mobile enter-key hint | `string` | `-` |
| hint | Use the placeholder as a floating hint | `boolean` | `true` |
| line | Show the border or bottom separator | `boolean` | `true` |
| text-color | Text color | `string` | `-` |
| focus-color | Focus color | `string` | `-` |
| blur-color | Blur color | `string` | `-` |
| rows | Positive integer native rows, including numeric strings; invalid values diagnose and restore native default rows. Theme constraints still affect visual height | `string \| number` | Native default `2` |
| resize | Allow vertical resizing; ignored while a valid automatic-height policy is active | `boolean` | `false` |
| auto-size | Automatic height; row budgets must be positive and finite, with minRows no greater than maxRows. Invalid configurations diagnose and disable measurement | `boolean \| { minRows?: number; maxRows?: number }` | `false` |
| textarea-attrs | Additional native textarea attributes; cannot override controlled value, state, rows, length policy, or component events | `Record<string, unknown>` | `undefined` |
| edit-mode | Editor mode; inherits FormItem/Form | `direct / popup` | `undefined` |
| read-pretty | Reading presentation; inherits FormItem/Form | `boolean` | `undefined` |
| empty-values | Empty-value recognition set; an explicit value replaces the inherited set | `readonly unknown[]` | Inherited component-family policy |
| empty-text | Empty reading text; inherits FormItem/Form | `string` | `'-'` |
| before-commit | Deferred save approval: (payload, done, context) | `BeforeFieldCommit` | `undefined` |
| open | Controlled editor visibility in deferred modes | `boolean` | `undefined` |
| default-open | Uncontrolled initial editor visibility; creation-only | `boolean` | `false` |
| popup-container | Deferred editor portal target; false renders in place | `PopupContainer` | `undefined` |
| loading | Manual loading presentation; remains editable | `boolean` | `false` |
| loading-mode | Indicator layout | `default / line` | `default` |

`rows` accepts a positive integer or a numeric string convertible to one. Invalid values use Vue prop-validation diagnostics and restore native default `rows`. `auto-size` minRows/maxRows accept positive finite line-height multiples, including fractions; minRows must not exceed maxRows. Invalid objects disable automatic measurement and clear its previous calculated styles. Null is treated as unset.

`before-commit(payload, done, context)` approves saving. Payload contains `{ value, previousValue }`; context provides `signal`. Synchronous void waits for done; true, done(), or fulfilled `Promise<void>` allows saving. False, done(false), `Promise<false>`, throwing, or rejection cancels. Ordinary events only notify and do not await Promises; the DOM source of `change` may be absent.

### Textarea Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:modelValue | Model update proposal during input, clearing, or confirmed saving | `value: string \| null` |
| update:open | Editor visibility request | `open: boolean` |
| open-change | Editor visibility change notification | `open: boolean` |
| input | Length-normalized user input, emitted after composition completes | `value: string, event: Event` |
| change | Commit on blur, clear, or deferred saving; the source event is optional | `value: string \| null, event?: Event` |
| keydown | Native keyboard notification; Enter keeps its newline behavior in direct mode | `event: KeyboardEvent` |
| clear | Clear request, followed by input, model update, and change notifications | `event: Event` |
| focus | Native editor receives focus | `event: FocusEvent` |
| blur | Native editor loses focus | `event: FocusEvent` |

### Textarea Slots

| Slot | Description | Prop |
| --- | --- | --- |
| read | Reading content with the raw value and formatted text | `{ value: string \| null; text: string }` |
| prefix | Prefix content | `-` |
| suffix | Suffix content | `-` |
| clear-icon | Clear icon or button | `{ clear(event?: Event): void }` |

### Textarea Methods

| Method | Description | Arguments |
| --- | --- | --- |
| focus | Focus the mounted editor | `focus(options?: FocusOptions): void` |
| blur | Blur the mounted editor | `blur(): void` |
| select | Select all text in the mounted editor | `select(): void` |
| textareaRef | Reference to the mounted native textarea | `HTMLTextAreaElement \| undefined` |

## Types

```ts
import type {
  TextareaEmits,
  TextareaSlots,
  TextareaExpose,
  TextareaInstance,
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from '@maple-design/ui-vue'
```

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omitted values preserve the existing default. Editors render `null` as blank without converting ordinary empty-string input to `null`. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.

Deferred `change` preserves the real confirmation event when available (for example, the save button). Programmatic editor handoff has no DOM event, so its second argument is optional. The event target can be the confirmation control rather than the input. `change` is a notification: its returned Promise is not awaited; use `before-commit` to approve asynchronous saves.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-textarea-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-textarea-counter-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-textarea-counter-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-textarea-counter-margin-top` | `var(--mp-sys-space-2)` | `margin-block-start` |
| `--mp-textarea-font-size` | `16px` | `font-size` |
| `--mp-textarea-height` | `auto` | `height` |
| `--mp-textarea-line-height` | `1.5` | `line-height` |
| `--mp-textarea-min-height` | `96px` | `min-height` |
| `--mp-textarea-padding-horizontal` | `0` | `padding` |
| `--mp-textarea-padding-vertical` | `0` | `padding` |
| `--mp-textarea-placeholder-color` | `var(--mp-sys-color-content-secondary)` | `color` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-textarea-caret-color: var(--mp-field-caret-color);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
