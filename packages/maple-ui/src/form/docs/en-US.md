# Form

### Intro

Provides the ability to control all form components. Use with `FormItem`.

- With `FormItem.label`: outer label (vertical / horizontal); floating placeholder on Input / Select is turned off automatically.
- Without `FormItem.label`: controls keep floating placeholder (`placeholder` + `hint`).


### Form Example

```html
<script setup>
import { reactive, ref } from 'vue'

const formData = reactive({
  username: '',
  password: '',
  email: '',
  department: '',
  gender: undefined,
  license: false,
  range: 10,
  count: 0,
  group: [],
  score: 0,
  like: [],
  files: []
})
const form = ref(null)
const disabled = ref(false)
const readonly = ref(false)

const emailSuggestions = computed(() =>
  ['@qq.com', '@163.com', '@gmail.com'].map((suffix) => {
    const [prefix] = formData.email.split('@')
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
)
</script>

<template>
  <mp-form
    ref="form"
    :model="formData"
    :disabled="disabled"
    :readonly="readonly"
    scroll-to-error="start"
  >
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="v => !!v || 'The username cannot be empty'">
        <mp-input placeholder="Please input username" v-model="formData.username" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[v => !!v || 'The password cannot be empty', (v) => v.length >= 8 || 'The password cannot be less than 8 characters']"
      >
        <mp-input type="password" placeholder="Please input password" v-model="formData.password" />
      </mp-form-item>
      <mp-form-item field="email" :rules="v => !!v || 'The email cannot be empty'">
        <mp-auto-complete
          placeholder="Please input email"
          :options="emailSuggestions"
          v-model="formData.email"
        />
      </mp-form-item>
      <mp-form-item field="department" :rules="v => !!v || 'The select cannot be empty'">
        <mp-select placeholder="Please select department" v-model="formData.department">
          <mp-option label="Eat department" />
          <mp-option label="Sleep department" />
          <mp-option label="Play game department" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="group" :rules="v => v.length >= 1 || 'The select cannot be empty'">
        <mp-select multiple placeholder="Please select group" v-model="formData.group">
          <mp-option label="Eat group" />
          <mp-option label="Sleep group" />
          <mp-option label="Play game group" />
        </mp-select>
      </mp-form-item>
      <mp-form-item field="gender" :rules="v => !!v || 'The gender cannot be empty'">
        <mp-radio-group v-model="formData.gender">
          <mp-radio :checked-value="1">Male</mp-radio>
          <mp-radio :checked-value="2">Female</mp-radio>
        </mp-radio-group>
      </mp-form-item>
      <mp-form-item field="like" :rules="v => v.length > 0 || 'The select cannot be empty'">
        <mp-checkbox-group v-model="formData.like">
          <mp-checkbox :checked-value="1">Eat</mp-checkbox>
          <mp-checkbox :checked-value="2">Sleep</mp-checkbox>
          <mp-checkbox :checked-value="3">Play game</mp-checkbox>
        </mp-checkbox-group>
      </mp-form-item>
      <mp-form-item field="score" :rules="v => v >= 3 || 'It has to be greater than 2'">
        <mp-rate v-model="formData.score" />
      </mp-form-item>
      <mp-form-item field="license" :rules="v => !!v || 'You must turn on'">
        <mp-switch variant v-model="formData.license" />
      </mp-form-item>
      <mp-form-item field="count" :rules="v => v > 10 || 'It has to be greater than 10'">
        <mp-counter v-model="formData.count" />
      </mp-form-item>
      <mp-form-item field="range" :rules="v => v > 10 || 'It has to be greater than 10'">
        <mp-slider v-model="formData.range" />
      </mp-form-item>
      <mp-form-item field="files" :rules="v => v.length >= 1 || 'Upload at least one picture'">
        <mp-uploader v-model="formData.files" />
      </mp-form-item>

      <mp-space direction="column" :size="[14, 0]">
        <mp-button block type="danger" @click="form.resetFields()">
          Empty form
        </mp-button>
        <mp-button block type="warning" @click="form.clearValidate()">
          Empty the validation
        </mp-button>
        <mp-button block type="success" @click="form.validate()">
          Trigger validation
        </mp-button>
        <mp-button block type="info" @click="disabled = !disabled">
          Form disabled
        </mp-button>
        <mp-button block type="primary" @click="readonly = !readonly">
          Form readonly
        </mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
</template>
```

### Form Events

You can also use form events to handle form behavior.

```html
<script setup>
import { reactive } from 'vue'
import { Message } from '@maplejs/maple-ui'

const formData = reactive({
  username: '',
  password: '',
})

function handleSubmit(valid) {
  Message(`onSubmit: ${valid}`)
}

function handleReset() {
  Message('onReset')
}
</script>

<template>
  <mp-form :model="formData" @submit="handleSubmit" @reset="handleReset">
    <mp-space direction="column" :size="[14, 0]">
      <mp-form-item field="username" :rules="v => !!v || 'The username cannot be empty'">
        <mp-input placeholder="Please input username" v-model="formData.username" />
      </mp-form-item>
      <mp-form-item
        field="password"
        :rules="[v => !!v || 'The password cannot be empty', (v) => v.length <= 8 || 'The password cannot be less than 8 characters']"
      >
        <mp-input type="password" placeholder="Please input password" v-model="formData.password" />
      </mp-form-item>

      <mp-space>
        <mp-button type="primary" native-type="submit">
          Submit
        </mp-button>
        <mp-button type="primary" native-type="reset">
          Reset
        </mp-button>
      </mp-space>
    </mp-space>
  </mp-form>
</template>
```

### Custom Form Component

If you want to customize a component and hook it into the form's validation ability, call `useFormItem` inside the
component to get `mergedError` and `eventHandlers`, then wrap the component with `FormItem` and declare `rules` on it.
There is no need to handle any validation logic inside the custom component itself, as shown below.

```html
// playground-ignore
<script setup>
import { Form } from '@maplejs/maple-ui'

const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  readonly: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const { useForm, useFormItem } = Form
const { form } = useForm()
const { mergedError, eventHandlers } = useFormItem()

function handleClick() {
  if (props.readonly || props.disabled || form?.readonly.value || form?.disabled.value) {
    return
  }

  emit('update:modelValue', !props.modelValue)
  eventHandlers.value.onChange?.()
}
</script>

<template>
  <div
    class="mp-custom-form-component"
    :class="{
      'mp-custom-form-component--disabled': disabled || form?.disabled.value,
      'mp-custom-form-component--error': mergedError,
    }"
  >
    <div class="mp-custom-form-component__container" @click="handleClick">
      <m-icon-checkbox-marked-circle v-if="modelValue" class="mp-custom-form-component__icon" />
      <m-icon-close-circle v-else class="mp-custom-form-component__icon" />
      <slot />
    </div>
  </div>
</template>

<style>
.mp-custom-form-component {
  cursor: pointer;
}

.mp-custom-form-component__container {
  display: flex;
  align-items: center;
}

.mp-custom-form-component__icon {
  margin-right: 6px;
  font-size: 24px;
}

.mp-custom-form-component--disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.mp-custom-form-component--error {
  color: var(--color-danger);
}
</style>
```

Wrap it with `FormItem` to hook it into validation:

```html
// playground-ignore
<mp-form-item field="custom" :rules="v => !!v || 'Cannot be empty'">
  <mp-custom-form-component v-model="formData.custom">
    Custom component
  </mp-custom-form-component>
</mp-form-item>
```

## API

### Props

#### Form Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model` | The form data object, `FormItem` reads and writes to it using `field` | _Record<string, any>_ | `-` |
| `layout` | Form item layout, `vertical` or `horizontal`; can be overridden by `FormItem.layout` | _'vertical' \| 'horizontal'_ | `'vertical'` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `scroll-to-error` | Whether to scroll to the failed form item when the validation fails, the optional value is `start` `end` | _string_ | `-` |
| `scroll-to-error-offset-y` | Scroll to the position offset of the form item that fails validation | _number \| string_ | `0` |

### Methods

#### Form Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `validate` | Trigger validation for the form items, validates all items when `field` is omitted | `field?: string \| string[]` | `valid: Promise<boolean>` |
| `validateField` | Trigger validation for the given form item(s) | `field: string \| string[]` | `valid: Promise<boolean>` |
| `resetFields` | Reset the value and validation message of the form item(s) to their initial value, resets all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `clearValidate` | Clear the validation message of the form item(s), clears all items when `field` is omitted | `field?: string \| string[]` | `-` |
| `scrollToField` | Scroll to the given form item | `field: string` | `-` |

### Events

#### Form Events

| Event | Description  | Arguments  |
| --- | --- | --- |
| `submit` | Triggered when the form is submitted | `valid: boolean` Whether to pass the form verification |
| `reset` | Fired when the form is reset | `-` |

### Slots

#### Form Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Form content | `-` |

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

