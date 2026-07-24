# Form Item

### Intro

Form item for labels, validation rules, and error messages. Use with `Form` and form controls.

- With `label`: outer label layout; Input / Select automatically disable floating `hint`.
- Without `label`: no outer label; controls keep floating placeholder mode.

### Outer Label (aligned with Cedar)

```html
<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({
  username: '',
  password: '',
})
</script>

<template>
  <mp-form ref="form" :model="formData" layout="vertical">
    <mp-form-item
      field="username"
      label="Username"
      required
      :rules="[(v) => !!v || 'Username is required']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="Please input" />
    </mp-form-item>

    <mp-form-item
      field="password"
      label="Password"
      :rules="[
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
      ]"
    >
      <mp-input v-model="formData.password" type="password" placeholder="Please input" />
    </mp-form-item>

    <mp-button block type="primary" @click="form.validate()">Submit</mp-button>
  </mp-form>
</template>
```

### Horizontal Layout

```html
<mp-form :model="formData" layout="horizontal">
  <mp-form-item field="username" label="Username" required>
    <mp-input v-model="formData.username" placeholder="Please input" />
  </mp-form-item>
</mp-form>
```

### Floating Placeholder (no label)

Without `label`, no outer label is rendered and Input keeps the floating placeholder (`hint` defaults to on).

```html
<script setup>
import { reactive, ref } from 'vue'

const form = ref(null)
const formData = reactive({
  username: '',
  password: '',
})
</script>

<template>
  <mp-form ref="form" :model="formData" layout="vertical">
    <mp-form-item
      field="username"
      required
      :rules="[(v) => !!v || 'Username is required']"
      :validate-trigger="['input', 'change']"
    >
      <mp-input v-model="formData.username" placeholder="Username" />
    </mp-form-item>

    <mp-form-item
      field="password"
      :rules="[
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
      ]"
    >
      <mp-input v-model="formData.password" type="password" placeholder="Password" />
    </mp-form-item>
  </mp-form>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `field` | Field path in `Form.model`, supports `a.b` | _string_ | `''` |
| `label` | Label text; when set, renders outer label and disables floating hint | _string_ | `-` |
| `layout` | Layout, `vertical` or `horizontal`; inherits `Form.layout` when omitted | _'vertical' \| 'horizontal'_ | `-` |
| `required` | Required (asterisk + auto required rule) | _boolean_ | `false` |
| `hide-label` | Hide label | _boolean_ | `false` |
| `hide-asterisk` | Hide required asterisk | _boolean_ | `false` |
| `asterisk-position` | Asterisk position | _'start' \| 'end'_ | `'start'` |
| `help` | Help text (shown when no error) | _string_ | `-` |
| `extra` | Extra text | _string_ | `-` |
| `disabled` | Disabled | _boolean_ | `false` |
| `no-style` | Remove label/error UI, keep validation | _boolean_ | `false` |
| `rules` | Validation rules (function / Zod / array) | _any_ | `-` |
| `validate-trigger` | Triggers for validation | _FormItemValidateTrigger \| FormItemValidateTrigger[]_ | `'change'` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `validate` | Emitted after validation | `valid: boolean` |

### Slots

| Slot | Description |
| --- | --- |
| `default` | Form control |
| `label` | Custom label |
| `help` | Custom help |
| `extra` | Custom extra |

### Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Validate the field | `-` | `Promise<boolean>` |
| `clearValidate` | Clear validation status | `-` | `-` |
| `resetField` | Reset value to initial and clear validation | `-` | `-` |

### Type Definitions

```ts
type FormItemValidateTrigger = 'change' | 'input' | 'focus' | 'blur' | 'clear'
type FormItemLayout = 'vertical' | 'horizontal'
```
