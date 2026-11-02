# Empty recognition, clear output and reading placeholders

## Choose the setting for your task

| Task                                                       | Setting                                    | Example                               |
| ---------------------------------------------------------- | ------------------------------------------ | ------------------------------------- |
| Emit null, -1 or another supported value when clearing     | empty-value / emptyValue                   | Clear icon and manual deletion        |
| Treat API marker -1 as unselected and missing for required | empty-values / emptyValues                 | Empty markers and required validation |
| Keep an empty string as a valid All option                 | Exclude the empty string from empty-values | Valid empty-string option             |
| Show '-' or No data for empty reading content              | empty-text / emptyText                     | Reading placeholders and inheritance  |

Each prop has one job. emptyValue defines clear output, emptyValues defines empty identity, and emptyText defines reading text. They do not derive one another. Rendering or configuration changes do not write the model or change controlled ownership.

## Learn by scenario

### Clear icon and manual deletion

Clear with the icon to produce null. Restore the initial value and delete all text with Backspace to produce `''`. The model output quotes strings so the two outcomes are visible.

```demo
../src/input/example/demos/en-US/empty-value.vue
```

Manual deletion is an input event and does not invoke emptyValue. Form reset restores recorded initial values. See [Input value model and interaction](#/en-US/input).

### Valid empty-string option

All has value `''` and remains selected. emptyValues excludes it with `[null, undefined]`, while emptyValue independently clears to null. Clear, then choose All again and compare model outputs.

```demo
../src/select/example/demos/en-US/empty-value.vue
```

Select preserves empty-string options by default. Explicit settings align field and required semantics. Deleting the search query does not delete selection. See [Select value model and linked fields](#/en-US/select).

### Empty markers and valid zero

Include -1 in emptyValues when an API uses it for missing data; also set emptyValue=-1 if clearing should emit it. The initial input is blank while the model stays -1. Set it to 0 to see a valid zero, then clear back to -1.

```demo
../src/input-number/example/demos/en-US/empty-value.vue
```

0 and false are valid by default; do not classify both with `!value`. InputNumber manual empty commits retain numeric parsing rules and may emit undefined. See [InputNumber numeric input and formatting](#/en-US/input-number).

### Empty markers and required validation

Form provides `[null, undefined, -1]` to its fields, while Select defines clear output -1. Validate the initial value, select a department and validate again, then clear and validate the missing value.

```demo
../src/form/example/demos/en-US/empty-values-validation.vue
```

emptyValue=-1 alone does not identify -1 as empty; emptyValues alone does not change clear output. Required runs on validation calls or configured triggers, not merely because an input looks blank. See [Form validation and submission](#/en-US/form).

### Reading placeholders and inheritance

Initially, Name inherits Form's default `'-'`, Code uses the FormItem override, Nickname uses the field override, and Quantity remains 0. Change Form's text to No data: only inheriting empty fields change. Toggle reading/editing and observe the unchanged model.

```demo
../src/form/example/demos/en-US/empty-text.vue
```

Precedence is **Field > FormItem > Form > '-'**. Explicit emptyText=`''` renders blank; custom read slots win. This text is separate from an input placeholder and never becomes validation or submitted data. See [Form field presentation and interaction](#/en-US/form).

## Rules and boundaries

### emptyValues: recognize the current model

Field settings override FormItem, which overrides Form. Lists replace rather than merge. Unconfigured text fields recognize null, undefined and the empty string; Select and numeric fields retain their nullish defaults.

Scalars use includes; 0 and false remain valid by default. Objects use reference identity. Empty arrays always mean an empty collection; nonempty `[null]` does not. An explicit empty list removes additional scalar markers without turning an empty collection into a selection.

Fixed state controls and Upload consume the policy for reading and required without rewriting checked state, bounds or transport. Invalid dates and unfinished numeric drafts retain domain rules.

### emptyValue: define clear output

Omission preserves component defaults. Check each component's supported types: Input declares string/null and corresponding factories. Where undefined output is supported, such as InputNumber and date/time fields, use `:empty-value="() => undefined"`; a directly bound undefined leaves the fallback in place.

Factories run during actual clear actions, not initialization, reading or validation. Arrays follow existing independent-result rules. Output is not automatically classified as empty: clearing to 0 can restore valid data.

Some shared editing panels fall back to defaultValue. Their clear action updates a draft; confirmation commits and cancellation discards it. Clear icons, manual deletion, removing the last item and reset retain component-specific behavior.

### Required and custom rules

With explicit emptyValues, built-in required follows the primary field policy. Unconfigured validation retains each library's behavior; Cedar b-validate and Maple function/Zod validation need not agree on every boundary value.

Custom validators, Zod, min/max and enum receive raw values. A UI marker -1 does not make `number().positive()` accept it; business schemas define optional handling. Recognition also does not imply business validity.

false is valid by default, so required does not mean must agree. Classify false explicitly or require true in a custom agreement rule. Prefer one primary field per FormItem and separate independently validated values.

### Controlled ownership

Business emptiness differs from ownership. Adding -1 or removing undefined from emptyValues does not change existing controlled predicates. Do not replace every internal undefined check with isEmpty: ownership, failed parsing, invalid dates and business markers have distinct meanings.

## Relationship to Element Plus

The separation follows [Element Plus configuration](https://element-plus.org/en-US/component/config-provider.html#empty-values-configurations) and [useEmptyValues](https://github.com/element-plus/element-plus/blob/dev/packages/hooks/use-empty-values/index.ts). Our emptyValue serves the role of valueOnClear; no synonym is added.

We use Form/FormItem inheritance and action-time factories, preserving component defaults and collection rules. Array deep equality, clear-output warnings and ConfigProvider integration are not copied.
