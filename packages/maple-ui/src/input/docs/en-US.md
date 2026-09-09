# Input

### Introduction

Use Input for single-line text entry. It supports multiple variants, floating hints, input types, states, and prefix or suffix content.

### Basic Usage

```html
<mp-input v-model="value" placeholder="Please enter content" />
<mp-input v-model="clearableValue" clearable placeholder="Clearable text" />
```

### Variants

```html
<mp-input variant="filled" placeholder="Filled" />
<mp-input variant="outline" placeholder="Outlined" />
<mp-input variant="standard" placeholder="Standard" />
```

### Hint

`hint` works with every variant. When enabled, the placeholder floats while focused or populated. When disabled, it behaves like a native placeholder.

```html
<mp-input variant="filled" placeholder="Username" />
<mp-input variant="outline" placeholder="Username" />
<mp-input variant="standard" placeholder="Username" />

<mp-input variant="filled" :hint="false" placeholder="Username" />
<mp-input variant="outline" :hint="false" placeholder="Username" />
<mp-input variant="standard" :hint="false" placeholder="Username" />
```

### Input Types

```html
<mp-input type="text" placeholder="Text" />
<mp-input type="number" placeholder="Number" />
<mp-input type="tel" placeholder="Phone number" />
<mp-input type="email" placeholder="Email" />
<mp-input type="password" placeholder="Password" />
```

### Sizes

```html
<template v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size">
  <mp-input v-for="variant in ['filled', 'outline', 'standard']" :key="variant" :size="size" :variant="variant" />
</template>
```

### States

```html
<mp-input model-value="Maple Design" readonly /> <mp-input model-value="Maple Design" disabled />
```

### Prefix and Suffix

```html
<mp-input placeholder="Phone number"><template #prefix>+86</template></mp-input>
<mp-input placeholder="Amount"><template #suffix>RMB</template></mp-input>
```

### Character Limit

```html
<mp-input v-model="value" :max-length="10" clearable />
```

### Custom Clear Icon

```html
<mp-input v-model="value" clearable>
  <template #clear-icon="{ clear }"><m-icon-error @click="clear" /></template>
</mp-input>
```

### Model Modifier and Native Attributes

```html
<mp-input v-model.trim="value" />
<mp-input
  type="email"
  autocomplete="email"
  enterkeyhint="next"
  aria-label="Email"
  :input-attrs="{ name: 'email', autocapitalize: 'none' }"
/>
```

## API

### Props

| Name           | Description                                 | Type               | Default    |
| -------------- | ------------------------------------------- | ------------------ | ---------- |
| `v-model`      | Bound value                                 | _string_           | `-`        |
| `type`         | `text` `password` `number` `tel` or `email` | _string_           | `text`     |
| `placeholder`  | Placeholder or floating hint text           | _string_           | `-`        |
| `size`         | `xs` `sm` `md` `lg` or `xl`                 | _ComponentSize_    | `md`       |
| `variant`      | `filled` `outline` or `standard`           | _string_           | `standard` |
| `hint`         | Use the placeholder as a floating hint      | _boolean_          | `true`     |
| `line`         | Show the separator line                     | _boolean_          | `true`     |
| `max-length`   | Maximum length and character counter        | _string \| number_ | `-`        |
| `readonly`     | Whether the input is readonly               | _boolean_          | `false`    |
| `disabled`     | Whether the input is disabled               | _boolean_          | `false`    |
| `clearable`    | Whether the value can be cleared            | _boolean_          | `false`    |
| `autofocus`    | Focus automatically after mount             | _boolean_          | `false`    |
| `enterkeyhint` | Mobile enter-key hint                       | _string_           | `-`        |
| `autocomplete` | Native autocomplete policy                  | _string_           | `off`      |
| `aria-label`   | Accessible label                            | _string_           | `-`        |
| `input-attrs`  | Attributes forwarded to the native input    | _object_           | `-`        |
| `text-color`   | Text color                                  | _string_           | `-`        |
| `focus-color`  | Focus color                                 | _string_           | `-`        |
| `blur-color`   | Blur color                                  | _string_           | `-`        |

Validation rules belong on `mp-form-item`. See the [Form component](#/en-US/form).

### Methods

| Name    | Description     | Parameters | Return value |
| ------- | --------------- | ---------- | ------------ |
| `focus` | Focus the input | `-`        | `-`          |
| `blur`  | Blur the input  | `-`        | `-`          |

### Events

| Name      | Description                              | Parameters                    |
| --------- | ---------------------------------------- | ----------------------------- |
| `focus`   | Emitted on focus                         | `event: FocusEvent`           |
| `blur`    | Emitted on blur                          | `event: FocusEvent`           |
| `click`   | Emitted on click                         | `event: Event`                |
| `clear`   | Emitted after clearing                   | `value: string`               |
| `input`   | Emitted on input                         | `value: string, event: Event` |
| `change`  | Emitted when a value change is committed | `value: string, event: Event` |
| `keydown` | Emitted on keydown                       | `event: KeyboardEvent`        |

### Slots

| Name         | Description    | Parameters          |
| ------------ | -------------- | ------------------- |
| `prefix`     | Prefix content | `-`                 |
| `suffix`     | Suffix content | `-`                 |
| `clear-icon` | Clear icon     | `clear: () => void` |

### Style Variables

Input provides the variables below. See [FieldDecorator](#/en-US/field-decorator) for container appearance variables.

| Variable                  | Default |
| ------------------------- | ------- |
| `--input-input-height`    | `24px`  |
| `--input-input-font-size` | `16px`  |
