# AutoComplete

### Intro

Autocomplete function of input field.

### Standard Variant

```demo
../example/demos/standard.vue
```

### Outlined Variant

```demo
../example/demos/outline.vue
```

## API

### Props

#### AutoComplete Props

| Prop           | Description                                                                                                                | Type                                       | Default    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| `v-model`      | The value of the binding                                                                                                   | _string_                                   | `-`        |
| `variant`      | Input variants, The optional value is `filled` `standard` `outline`                                                       | _string_                                   | `standard` |
| `size`         | Input size: `xs` `sm` `md` `lg` `xl`                                                                                       | _ComponentSize_                            | `md`       |
| `placeholder`  | placeholder                                                                                                                | _string_                                   | `-`        |
| `options`      | Specifies options                                                                                                          | _AutoCompleteOption[]_                     | `[]`       |
| `field-names`  | Custom field mapping for `options`                                                                                         | _{ label?, value?, children?, disabled? }_ | `-`        |
| `max-length`    | Maxlength                                                                                                                  | _string \| number_                         | `-`        |
| `readonly`     | Whether the readonly                                                                                                       | _boolean_                                  | `false`    |
| `disabled`     | Whether the disabled                                                                                                       | _boolean_                                  | `false`    |
| `enterkeyhint` | Customize the enter key style, See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint) | _string_                                   | `-`        |
| `clearable`    | Whether the clearable                                                                                                      | _boolean_                                  | `false`    |
| `line`         | Whether to display a dividing line                                                                                         | _boolean_                                  | `true`     |
| `hint`         | Whether to use placeholder as hint                                                                                         | _boolean_                                  | `true`     |
| `text-color`   | Text color                                                                                                                 | _string_                                   | `-`        |
| `focus-color`  | The primary color in focus                                                                                                 | _string_                                   | `-`        |
| `blur-color`   | The primary color in blur                                                                                                  | _string_                                   | `-`        |
| `should-open`     | Determine whether the menu is displayed according to the input value                                                       | _(v: string) => boolean_                   | Non-empty input        |

Validation rules are now configured on `mp-form-item`, see [Form](#/en-US/form).

#### AutoCompleteOption

| Prop       | Description               | Type                                                                              | Default |
| ---------- | ------------------------- | --------------------------------------------------------------------------------- | ------- |
| `label`    | The text of option        | _string \| VNode \| (option: AutoCompleteOption, checked: boolean) => VNodeChild_ | `-`     |
| `value`    | The value of option       | _any_                                                                             | `-`     |
| `disabled` | Whether to disable option | _boolean_                                                                         | `-`     |

### Methods

| Method  | Description | Arguments | Return |
| ------- | ----------- | --------- | ------ |
| `focus` | Focus       | `-`       | `-`    |
| `blur`  | Blur        | `-`       | `-`    |

### Events

| Event    | Description                 | Arguments                       |
| -------- | --------------------------- | ------------------------------- |
| `focus`  | Triggered while focusing    | `-`                             |
| `blur`   | Triggered when out of focus | `-`                             |
| `click`  | Triggered on Click          | `event: Event`                  |
| `clear`  | Triggered on Clearance      | `value: string`                 |
| `input`  | Triggered on input          | `value: string`, `event: Event` |
| `change` | Triggered on change         | `value: string`                 |

### Slots

| Name         | Description | SlotProps                                                                                             |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| `prefix`     | Prefix      | `-`                                                                                                   |
| `suffix`     | Suffix      | `-`                                                                                                   |
| `clear-icon` | Clear Icon  | `clear: (e: Event) => void` clear function (can be used to clear input box contents when using slots) |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                          | Default |
| --------------------------------- | ------- |
| `--auto-complete-options-padding` | `6px 0` |

### Opening and filtering

`should-open(inputValue)` only permits opening and defaults to non-empty input. `filter-option` defaults to `true`: match the label (falling back to value), ignoring case. `strict` defaults to `false`; set it to `true` for case-sensitive matching. Set `filter-option=false` for server-filtered results, or supply `(inputValue, option) => boolean` (empty input preserves all options). Disabled, readonly, unfocused, or empty-result menus cannot open.

Migration: rename `get-show` to `should-open`; set `:filter-option="false"` to preserve the previous no-local-filtering behavior.
