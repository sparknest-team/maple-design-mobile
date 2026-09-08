# Input

Input is a single-line text control for mobile interfaces. It brings together consistent variants, controlled and uncontrolled value models, length handling, clear actions, and form integration.

The interactive example page covers value models, floating placeholders, input types, sizes, states, slots, events, native attributes, and accessible labeling.

## Design notes

- The default variant is `outlined`. Use `filled` or `standard` when the visual hierarchy calls for it.
- `clearable` is off by default. Enable it when resetting a search or filter is a frequent action.
- Use `v-model` for live state and `default-value` for an initial value that does not need continuous synchronization.
- Maple supports both floating and static placeholders. Cedar (desktop) does not float placeholders; cross-platform products should follow each platform's interaction conventions.

## Basic usage

```html
<mp-input v-model="value" placeholder="Please enter content" />
<mp-input v-model="clearableValue" clearable placeholder="Clearable text" />
```

## Value model

### Controlled and uncontrolled values

Use `v-model` when the parent needs the current value for search, form state, or live previews. Use `default-value` when the component only needs an initial value and can manage subsequent edits internally.

```html
<mp-input v-model="keyword" placeholder="Controlled input" />
<mp-input default-value="Initial content" placeholder="Uncontrolled input" />
```

Do not use both models at the same time. The value is always a `string`. Even with `type="number"`, Input does not coerce the value into a JavaScript number.

## Variants and hints

### Variants

```html
<mp-input variant="filled" placeholder="Filled" />
<mp-input variant="outlined" placeholder="Outlined" />
<mp-input variant="standard" placeholder="Standard" />
```

### Floating and static placeholders

`hint` is enabled by default. When enabled, the placeholder floats while the input is focused or populated. When disabled, it behaves like a native placeholder. `line` independently controls the separator line at the bottom of the mobile field.

```html
<!-- Floating hint -->
<mp-input hint placeholder="Username" />

<!-- Native, static placeholder -->
<mp-input :hint="false" placeholder="Username" />

<!-- Hide the separator line -->
<mp-input :line="false" placeholder="No separator" />
```

## Input types

```html
<mp-input v-model="text" type="text" placeholder="Text" />
<mp-input v-model="amount" type="number" placeholder="Number" />
<mp-input v-model="phone" type="tel" placeholder="Phone number" />
<mp-input v-model="email" type="email" placeholder="Email" />
<mp-input v-model="password" type="password" placeholder="Password" />
```

`number` primarily selects a suitable keyboard and communicates input intent. If the business logic needs numeric calculations, convert explicitly at the submit or validation boundary and handle empty, decimal, and invalid values.

## Sizes and states

```html
<mp-input size="xs" placeholder="Extra small" />
<mp-input size="sm" placeholder="Small" />
<mp-input size="md" placeholder="Medium" />
<mp-input size="lg" placeholder="Large" />
<mp-input size="xl" placeholder="Extra large" />

<mp-input model-value="Maple Design" readonly />
<mp-input model-value="Maple Design" disabled />
<mp-input model-value="Invalid value" error />
```

`readonly` remains focusable and copyable. `disabled` removes the control from the current interaction flow. `error` only expresses visual state; FormItem should own validation rules and messages.

## Prefix, suffix, and clear actions

```html
<mp-input placeholder="Phone number">
  <template #prefix>+86</template>
</mp-input>

<mp-input placeholder="Amount">
  <template #suffix>RMB</template>
</mp-input>

<mp-input v-model="keyword" clearable placeholder="Search">
  <template #prefix><m-icon-magnify /></template>
</mp-input>
```

The clear button appears only when `clearable` is enabled, the input has a value, and the control is editable. Keep custom clear content keyboard-operable:

```html
<mp-input v-model="value" clearable>
  <template #clear-icon="{ clear }">
    <button type="button" aria-label="Clear" @click="clear">×</button>
  </template>
</mp-input>
```

## Character limits

The numeric form truncates input at the limit. With `{ errorOnly: true }`, Input keeps the complete value and only marks the control as invalid. `show-word-limit` displays the counter and is off by default.

```html
<!-- Truncate after 10 characters -->
<mp-input v-model="title" :max-length="10" show-word-limit />

<!-- Keep the value and show an error after 100 characters -->
<mp-input v-model="description" :max-length="{ length: 100, errorOnly: true }" show-word-limit />
```

For grapheme-aware or business-specific counting, provide both a calculator and a slicing function:

```html
<mp-input
  v-model="value"
  :max-length="20"
  :word-length="(text) => [...text].length"
  :word-slice="(text, max) => [...text].slice(0, max).join('')"
  show-word-limit
/>
```

## Event semantics

| Event               | When it fires                                         | Recommended use                      |
| ------------------- | ----------------------------------------------------- | ------------------------------------ |
| `update:modelValue` | The value model changes                               | Sync `v-model`                       |
| `input`             | Every user input                                      | Live search, linking, feedback       |
| `change`            | Blur or Enter commits the edit; deduplicated per edit | Submit search or validation          |
| `press-enter`       | Enter is pressed                                      | Keyboard submit action               |
| `keydown`           | Any keydown, retained for compatibility               | Low-level shortcuts                  |
| `clear`             | The user clears the value                             | Reset search, filters, or validation |
| `focus` / `blur`    | Focus enters or leaves the control                    | Focus state or validation timing     |

`change` is not a live input event. It commits once at the end of an edit, so pressing Enter and then blurring does not produce a duplicate change. `clear` clears the value and updates the model, but does not fabricate an extra `input` or `change` event.

```html
<mp-input
  v-model="keyword"
  clearable
  @input="handleInput"
  @change="handleChange"
  @press-enter="submit"
  @clear="resetSearch"
/>
```

## Form validation boundary

Input owns input interaction, not business rules. Put rules on `mp-form-item` so the form item controls validation timing and messages:

```html
<mp-form :model="form">
  <mp-form-item
    field="email"
    label="Email"
    :rules="[{ required: true, message: 'Please enter an email' }]"
    :validate-trigger="['blur', 'change']"
  >
    <mp-input v-model="form.email" type="email" />
  </mp-form-item>
</mp-form>
```

Use `error` for a visual state only. Use Form/FormItem when the rule, message, or submit blocking behavior matters.

## Native attributes and accessibility

Use the public `autofocus`, `enterkeyhint`, and `autocomplete` props directly. Forward other native attributes with `input-attrs`:

```html
<label for="email">Email address</label>
<mp-input
  id="email"
  type="email"
  autocomplete="email"
  enterkeyhint="next"
  :input-attrs="{
    name: 'email',
    autocapitalize: 'none',
    'aria-describedby': 'email-help',
  }"
/>
<p id="email-help">Used for sign-in and notification emails</p>
```

Prefer a visible `label` associated with the input id. If there is no visible label, provide `aria-label`. Associate help and error text through `aria-describedby`. Custom clear controls must remain keyboard-operable and have an explicit accessible name.

## API

### Props

| Name              | Description                                                                | Type               |  Default   |
| ----------------- | -------------------------------------------------------------------------- | ------------------ | :--------: |
| `v-model`         | Controlled value                                                           | `string`           |    `-`     |
| `default-value`   | Initial value in uncontrolled mode                                         | `string`           |    `''`    |
| `type`            | `text`, `password`, `number`, `tel`, or `email`                            | `InputType`        |   `text`   |
| `placeholder`     | Placeholder or floating hint text                                          | `string`           |    `-`     |
| `size`            | `xs`, `sm`, `md`, `lg`, or `xl`                                            | `ComponentSize`    |    `md`    |
| `variant`         | `filled`, `outlined`, or `standard`                                        | `string`           | `outlined` |
| `hint`            | Use the placeholder as a floating hint                                     | `boolean`          |   `true`   |
| `line`            | Show the bottom separator                                                  | `boolean`          |   `true`   |
| `max-length`      | Maximum length; truncates by default, or reports an error with `errorOnly` | `number \| object` |    `0`     |
| `show-word-limit` | Show the character counter                                                 | `boolean`          |  `false`   |
| `word-length`     | Custom length calculator                                                   | `function`         |    `-`     |
| `word-slice`      | Custom truncation function                                                 | `function`         |    `-`     |
| `readonly`        | Read-only state                                                            | `boolean`          |  `false`   |
| `disabled`        | Disabled state                                                             | `boolean`          |  `false`   |
| `error`           | Show the error state                                                       | `boolean`          |  `false`   |
| `clearable`       | Allow clearing the value                                                   | `boolean`          |  `false`   |
| `autofocus`       | Focus automatically after mount                                            | `boolean`          |  `false`   |
| `enterkeyhint`    | Mobile enter-key hint                                                      | `string`           |    `-`     |
| `autocomplete`    | Native autocomplete policy                                                 | `string`           |   `off`    |
| `aria-label`      | Accessible label                                                           | `string`           |    `-`     |
| `input-attrs`     | Attributes forwarded to the native input                                   | `object`           |    `-`     |
| `text-color`      | Text color                                                                 | `string`           |    `-`     |
| `focus-color`     | Focus color                                                                | `string`           |    `-`     |
| `blur-color`      | Blur color                                                                 | `string`           |    `-`     |

Validation rules belong on `mp-form-item`. See the [Form component](#/en-US/form).

### Methods

| Name    | Description     | Parameters | Return value |
| ------- | --------------- | ---------- | ------------ |
| `focus` | Focus the input | `-`        | `-`          |
| `blur`  | Blur the input  | `-`        | `-`          |

### Events

| Name          | Description                                     | Parameters                    |
| ------------- | ----------------------------------------------- | ----------------------------- |
| `focus`       | Emitted on focus                                | `event: FocusEvent`           |
| `blur`        | Emitted on blur                                 | `event: FocusEvent`           |
| `clear`       | Emitted after clearing                          | `event: Event`                |
| `input`       | Emitted on input                                | `value: string, event: Event` |
| `change`      | Emitted only when blur or Enter commits a value | `value: string, event: Event` |
| `press-enter` | Emitted when Enter is pressed                   | `event: KeyboardEvent`        |
| `keydown`     | Emitted on keydown for compatibility            | `event: KeyboardEvent`        |

### Slots

| Name         | Description          | Parameters          |
| ------------ | -------------------- | ------------------- |
| `prefix`     | Prefix content       | `-`                 |
| `suffix`     | Suffix content       | `-`                 |
| `clear-icon` | Clear icon or button | `clear: () => void` |

### Style variables

Input provides the variables below. See [FieldDecorator](#/en-US/field-decorator) for container appearance variables.

| Variable                  | Default |
| ------------------------- | ------- |
| `--input-input-height`    | `24px`  |
| `--input-input-font-size` | `16px`  |
