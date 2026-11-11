<!-- Source: docs/emptyValues.en-US.md; locale: en-US; page: /en-US/emptyValues -->

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

Example source: src/input/example/demos/en-US/empty-value.vue

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ text: 'Hello' as string | null })
</script>
<template>
  <mp-space direction="column">
    <p>The clear icon produces null; Backspace to empty produces an empty string.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="text" label="Keyword">
        <mp-input v-model="model.text" edit-mode="direct" clearable :empty-value="null" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.text = 'Hello'">Restore initial value</mp-button>
    <p>
      Current model: <output>{{ JSON.stringify(model.text) }}</output>
    </p>
  </mp-space>
</template>
```

Manual deletion is an input event and does not invoke emptyValue. Form reset restores recorded initial values. See [Input value model and interaction](#/en-US/input).

### Valid empty-string option

All has value `''` and remains selected. emptyValues excludes it with `[null, undefined]`, while emptyValue independently clears to null. Clear, then choose All again and compare model outputs.

Example source: src/select/example/demos/en-US/empty-value.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ status: '' as string | null })
const multiple = ref(['active'])
const optional = ref<string | undefined>('active')
const options = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
]
</script>
<template>
  <mp-space direction="column">
    <p>All uses an empty string as a valid option value. Clearing produces null.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="status" label="Status">
        <mp-select
          v-model="model.status"
          :options="options"
          edit-mode="direct"
          clearable
          :empty-values="[null, undefined]"
          :empty-value="null"
        />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.status = ''">Choose All</mp-button>
    <p>
      Current model: <output>{{ JSON.stringify(model.status) }}</output>
    </p>
    <mp-form layout="vertical">
      <mp-form-item label="Multiple: clear to []">
        <mp-select
          v-model="multiple"
          :options="options"
          edit-mode="direct"
          multiple
          clearable
          :empty-value="() => []"
        />
        <output>{{ JSON.stringify(multiple) }}</output>
      </mp-form-item>
      <mp-form-item label="Single: clear to undefined">
        <mp-select v-model="optional" :options="options" edit-mode="direct" clearable :empty-value="() => undefined" />
        <output>{{ String(optional) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

Select preserves empty-string options by default. Explicit settings align field and required semantics. Deleting the search query does not delete selection. See [Select value model and linked fields](#/en-US/select).

### Empty markers and valid zero

Include -1 in emptyValues when an API uses it for missing data; also set emptyValue=-1 if clearing should emit it. The initial input is blank while the model stays -1. Set it to 0 to see a valid zero, then clear back to -1.

Example source: src/input-number/example/demos/en-US/empty-value.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ quantity: -1 as number | null | undefined })
const restored = ref<number | null | undefined>(12)
</script>
<template>
  <mp-space direction="column">
    <p>-1 means missing and renders blank; 0 remains a valid number. Clearing produces -1.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="quantity" label="Quantity">
        <mp-input-number
          v-model="model.quantity"
          edit-mode="direct"
          clearable
          :empty-values="[null, undefined, -1]"
          :empty-value="-1"
        />
      </mp-form-item>
    </mp-form>
    <mp-space wrap>
      <mp-button @click="model.quantity = 0">Set to 0</mp-button>
      <mp-button @click="model.quantity = -1">Set to -1</mp-button>
    </mp-space>
    <p>
      Current model: <output>{{ String(model.quantity) }}</output>
    </p>
    <p>This field clears to 0 without treating 0 as missing.</p>
    <mp-form layout="vertical">
      <mp-form-item label="Clear restores valid zero">
        <mp-input-number v-model="restored" edit-mode="direct" clearable :empty-value="0" />
        <output>{{ String(restored) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

0 and false are valid by default; do not classify both with `!value`. InputNumber manual empty commits retain numeric parsing rules and may emit undefined. See [InputNumber numeric input and formatting](#/en-US/input-number).

### Empty markers and required validation

Form provides `[null, undefined, -1]` to its fields, while Select defines clear output -1. Validate the initial value, select a department and validate again, then clear and validate the missing value.

Example source: src/form/example/demos/en-US/empty-values-validation.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ department: -1 as number | null | undefined })
const form = ref()
const result = ref('Not validated')
const options = [
  { value: 1, label: 'Engineering' },
  { value: 2, label: 'Product' },
]
async function validate() {
  const errors = await form.value.validate()
  result.value = errors ? 'Required error' : 'Valid'
}
</script>
<template>
  <mp-space direction="column">
    <p>Validate the initial -1, then select a department and validate again. Clearing restores -1.</p>
    <mp-form ref="form" :model="model" layout="vertical" :empty-values="[null, undefined, -1]">
      <mp-form-item field="department" label="Department" required>
        <mp-select v-model="model.department" :options="options" edit-mode="direct" clearable :empty-value="-1" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="validate">Validate</mp-button>
    <p role="status">{{ result }}</p>
    <p>
      Current model: <output>{{ String(model.department) }}</output>
    </p>
  </mp-space>
</template>
```

emptyValue=-1 alone does not identify -1 as empty; emptyValues alone does not change clear output. Required runs on validation calls or configured triggers, not merely because an input looks blank. See [Form validation and submission](#/en-US/form).

### Reading placeholders and inheritance

Initially, Name inherits Form's default `'-'`, Code uses the FormItem override, Nickname uses the field override, and Quantity remains 0. Change Form's text to No data: only inheriting empty fields change. Toggle reading/editing and observe the unchanged model.

Example source: src/form/example/demos/en-US/empty-text.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const reading = ref(true)
const emptyText = ref('-')
const model = reactive({
  name: null as string | null,
  code: null as string | null,
  nickname: null as string | null,
  quantity: 0 as number | null | undefined,
})
</script>
<template>
  <mp-space direction="column">
    <p>
      Initially, reading mode shows “-” for Name, overrides for Code and Nickname, and the valid number 0 for Quantity.
    </p>
    <mp-space wrap>
      <mp-button @click="reading = !reading">Toggle reading/editing</mp-button>
      <mp-button @click="emptyText = 'No data'">Use “No data”</mp-button>
      <mp-button @click="emptyText = '-'">Use default “-”</mp-button>
    </mp-space>
    <mp-form :model="model" layout="vertical" :read-pretty="reading" :empty-text="emptyText">
      <mp-form-item field="name" label="Name: inherits Form"><mp-input v-model="model.name" /></mp-form-item>
      <mp-form-item field="code" label="Code: FormItem override" empty-text="Unassigned"
        ><mp-input v-model="model.code"
      /></mp-form-item>
      <mp-form-item field="nickname" label="Nickname: field override" empty-text="Unassigned"
        ><mp-input v-model="model.nickname" empty-text="Anonymous"
      /></mp-form-item>
      <mp-form-item field="quantity" label="Quantity"><mp-input-number v-model="model.quantity" /></mp-form-item>
    </mp-form>
    <p>
      Current model: <output>{{ JSON.stringify(model) }}</output>
    </p>
  </mp-space>
</template>
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
