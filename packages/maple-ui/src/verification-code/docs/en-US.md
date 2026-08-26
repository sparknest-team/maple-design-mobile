# VerificationCode

### Intro

Multi-box short code input for SMS / email verification. Public API aligns with Cedar `VerificationCode`. `v-model` is always a full string.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <mp-verification-code v-model="value" />
</template>
```

### Masked Mode

```html
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <mp-verification-code v-model="value" masked />
</template>
```

### Input Type

Use `type` for digit / text / alphanumeric (Maple-only, default `digit`).

```html
<template>
  <mp-space direction="column" size="large">
    <mp-verification-code v-model="digitValue" type="digit" />
    <mp-verification-code v-model="textValue" type="text" />
    <mp-verification-code v-model="mixedValue" type="alphanumeric" />
  </mp-space>
</template>
```

### Separator

Use the `separator` prop or `#separator` slot.

```html
<script setup>
import { h, ref } from 'vue'

const value = ref('')
</script>

<template>
  <mp-verification-code
    v-model="value"
    type="alphanumeric"
    :separator="(index) => (index === 2 ? h('span', '-') : null)"
  />
</template>
```

### Formatter

```html
<template>
  <mp-verification-code
    v-model="value"
    type="text"
    :formatter="(inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false)"
  />
</template>
```

### Finish Event

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
import { ref } from 'vue'

const value = ref('')

function handleFinish(code) {
  Message.success(`Done: ${code}`)
}
</script>

<template>
  <mp-verification-code v-model="value" @finish="handleFinish" />
</template>
```

### With NumberKeyboard

```html
<script setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>

<template>
  <mp-verification-code v-model="value" readonly @click="show = true" />
  <mp-number-keyboard v-model="value" v-model:open="open" :max-length="6" />
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | Bound value | _string_ | `-` |
| `default-value` | Default value (uncontrolled) | _string_ | `''` |
| `length` | Number of cells | _number_ | `6` |
| `size` | Size: `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `type` | `digit` `text` `alphanumeric` (Maple) | _string_ | `digit` |
| `variant` | `standard` `outlined` (Maple) | _string_ | `outlined` |
| `masked` | Mask mode | _boolean_ | `false` |
| `mask-symbol` | Mask character (Maple) | _string_ | `•` |
| `disabled` | Disabled | _boolean_ | `false` |
| `readonly` | Readonly | _boolean_ | `false` |
| `error` | Error state | _boolean_ | `false` |
| `autofocus` | Autofocus (Maple) | _boolean_ | `false` |
| `gutter` | Cell gutter (Maple) | _string \| number_ | `8` |
| `align` | `start` `center` `end` (Maple) | _string_ | `center` |
| `allow-paste` | Allow paste (Maple) | _boolean_ | `true` |
| `paste-transform` | Paste transformer (Maple) | _(value: string) => string_ | `-` |
| `separator` | Separator renderer | _(index: number, character: string) => VNode \| string \| null_ | `-` |
| `formatter` | Input formatter | _(inputValue: string, index: number, value: string) => string \| boolean_ | `-` |
| `aria-label` | Aria label | _string_ | `-` |
| `text-color` | Text color (Maple) | _string_ | `-` |
| `focus-color` | Focus color (Maple) | _string_ | `-` |
| `blur-color` | Blur color (Maple) | _string_ | `-` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Value changed | `value: string` |
| `finish` | All cells filled | `value: string` |
| `input` | Cell input | `inputValue: string`, `index: number`, `ev: Event` |
| `click` | Root click (Maple) | `event: Event` |
| `paste` | Paste (Maple) | `value: string`, `event: ClipboardEvent` |

### Methods

| Method | Description | Arguments |
| --- | --- | --- |
| `focus` | Focus first empty or given index | `index?: number` |
| `blur` | Blur all cells | `-` |
| `reset` | Clear value | `-` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `separator` | Custom separator | `index: number`, `character: string` |

### CSS Variables

| Variable | Default |
| --- | --- |
| `--mp-verification-code-gutter` | `8px` |
| `--mp-verification-code-cell-height` | `48px` |
| `--mp-verification-code-cell-max-width` | `48px` |
| `--mp-verification-code-input-font-size` | `20px` |
