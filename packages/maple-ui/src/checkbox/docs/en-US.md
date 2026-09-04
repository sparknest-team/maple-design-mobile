# Checkbox

### Intro

A group of options for multiple choices.

### Basic Usage

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox v-model="value">Current value: {{ value }}</mp-checkbox>
</template>
```

### Set State Value

```html
<script setup>
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <mp-checkbox
    :value="1"
    v-model="value"
  >
    Current value: {{ value }}
  </mp-checkbox>
</template>
```

### Modify The Icon And Color

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox
    unchecked-color="var(--color-warning)" 
    checked-color="var(--color-danger)"
    v-model="value"
  >
    <template #unchecked-icon>
      <m-icon-heart-half-full size="24px"/>
    </template>
    <template #checked-icon>
      <m-icon-heart-fill size="24px"/>
    </template>
    <template #default>
      Current value: {{ value }}
    </template>
  </mp-checkbox>
</template>
```

### Disabled

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox disabled v-model="value">Current value: {{ value }}</mp-checkbox>
</template>
```

### Readonly

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
</script>

<template>
  <mp-checkbox readonly v-model="value">Current value: {{ value }}</mp-checkbox>
</template>
```

### Indeterminate

```html
<script setup>
import { ref } from 'vue'

const value = ref(false)
const indeterminate = ref(true)
</script>

<template>
  <mp-space :size="[0, 10]">
    <mp-checkbox v-model="value" v-model:indeterminate="indeterminate">
      Current value: {{ value }}
    </mp-checkbox>
    <mp-button status="primary" @click="indeterminate = !indeterminate">Toggle</mp-button>
  </mp-space>
</template>
```

### CheckboxGroup

In the checkbox group, you must set the `value` to identify the `checkbox`,
The checkbox group collects all checked identifiers.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
</script>

<template>
  <mp-checkbox-group ref="group" v-model="value">
    <mp-checkbox :value="0">Eat</mp-checkbox>
    <mp-checkbox :value="1">Sleep</mp-checkbox>
  </mp-checkbox-group>
  <mp-space :size="[0, 10]">
    <mp-button status="primary"
      @click="$refs.group.checkAll()"
    >
      Check All
    </mp-button>
    <mp-button status="primary"
      @click="$refs.group.inverseAll()"
    >
      Inverse All
    </mp-button>
  </mp-space>
  <div>Current value: {{ value }}</div>
</template>
```

### Options API

Setting child elements via the `options` prop.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = ref([
  { label: 'Eat', value: 0 },
  { label: 'Sleep', value: 1 },
  { label: 'Game', value: 2, disabled: true },
])
</script>

<template>
  <mp-checkbox-group v-model="value" :options="options" />
  <div>Current value: {{ value }}</div>
</template>
```

### Custom Fields

Customize the format of the data in `options` through the `field-names` attribute.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
const options = ref([
  { name: 'Eat', id: 0 },
  { name: 'Sleep', id: 1 },
  { name: 'Game', id: 2 },
])
</script>

<template>
  <mp-checkbox-group v-model="value" :options="options"
      :field-names="{ label: 'name', value: 'id' }" />
  <div>Current value: {{ value }}</div>
</template>
```

### Vertical Direction

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
</script>

<template>
  <mp-checkbox-group v-model="value" direction="vertical">
    <mp-checkbox :value="0">Eat</mp-checkbox>
    <mp-checkbox :value="1">Sleep</mp-checkbox>
  </mp-checkbox-group>
</template>
```

### Maximum Number Of Checked

In a checkbox group, you can limit the maximum number of selections by setting `max`.

```html
<script setup>
import { ref } from 'vue'

const value = ref([])
</script>

<template>
  <mp-checkbox-group v-model="value" :max="1">
    <mp-checkbox :value="0">Eat</mp-checkbox>
    <mp-checkbox :value="1">Sleep</mp-checkbox>
  </mp-checkbox-group>
</template>
```

> For form validation of checkbox and checkbox group, please use the [FormItem component](#/en-US/form-item).

## API

### Props

#### CheckboxGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _any[]_ | `[]` |
| `max` | Maximum number of checked | _string \| number_ | `-` |
| `direction` | The layout direction, optional value is `horizontal` `vertical` | _string_ | `horizontal` |
| `options` ***3.2.11*** | Specifies options | _CheckboxGroupOption[]_ | `[]` |
| `field-names` | Custom field mapping for `options` | _{ label?, value?, children?, disabled? }_ | `-` |

#### CheckboxGroupOption 

| Prop | Description | Type | Default |
| ------- | --- |----------------|-----------|
| `label`    |   The text of checkbox    | _string \| VNode \| (option: CheckboxGroupOption, checked: boolean) => VNodeChild_      | `-`   |
| `value`  |    The value of checkbox    | _any_      | `-`   |
| `disabled`    |    Whether to disable checkbox   | _boolean_      | `-`   |

#### Checkbox Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _any_ | `false` |
| `value` | Option value | _any_ | `true` |
| `checked-color` | Checked color | _string_ | `-` |
| `unchecked-color` | Unchecked color | _string_ | `-` |
| `icon-size` | Icon size | _string \| number_ | `-` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `indeterminate` | Whether indeterminate status(style has the highest priority) | _boolean_ | `false` |
| `ripple` | Whether to open ripple | _boolean_ | `true` |

### Methods

#### CheckboxGroup Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `checkAll` | Check all | `-` | `value: any[]` |
| `inverseAll` | Inverse all | `-` | `value: any[]` |

#### Checkbox Methods

| Method | Description | Arguments | Return |
| --- | --- | --- | --- |
| `toggle` | Toggle the checked state, pass `value` to check, `false` to uncheck, do not pass or other cases to reverse | `value?: any` | `-` |

### Events

#### CheckboxGroup Events

| Event | Description | Arguments |
| --- | --- | --- |
| `change` | Triggered on change | `value: any[]` |

#### Checkbox Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered on Click | `e: Event` |
| `change` | Triggered on change | `value: any` |

### Slots

#### CheckboxGroup Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Checkbox Group content | `-` |

#### Checkbox Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `checked-icon` | Checked icon | `-` |
| `unchecked-icon` | Unchecked icon | `-` |
| `indeterminate-icon` | Indeterminate icon | `-` |
| `default` | Displayed text | `checked: boolean` is checked |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--checkbox-checked-color` | `var(--color-primary)` |
| `--checkbox-unchecked-color` | `#555` |
| `--checkbox-disabled-color` | `var(--color-text-disabled)` |
| `--checkbox-error-color` | `var(--color-danger)` |
| `--checkbox-action-padding` | `6px` |
| `--checkbox-text-color` | `#555` |
| `--checkbox-icon-size` | `24px` |

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `v-model` | The value of the binding | _any_ | `false` |
| `value` | Option value | _any_ | `true` |
| `checked-color` | Checked color | _string_ | `-` |
| `unchecked-color` | Unchecked color | _string_ | `-` |
| `icon-size` | Icon size | _string \| number_ | `-` |
| `disabled` | Whether the disabled | _boolean_ | `false` |
| `readonly` | Whether the readonly | _boolean_ | `false` |
| `indeterminate` | Whether indeterminate status(style has the highest priority) | _boolean_ | `false` |
| `ripple` | Whether to open ripple | _boolean_ | `true` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered on Click | `e: Event` |
| `change` | Triggered on change | `value: any, indeterminate: boolean` |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `checked-icon` | Checked icon | `-` |
| `unchecked-icon` | Unchecked icon | `-` |
| `indeterminate-icon` | Indeterminate icon | `-` |
| `default` | Displayed text | `checked: boolean` is checked |
