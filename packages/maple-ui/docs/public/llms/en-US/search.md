<!-- Source: src/search/docs/en-US.md; locale: en-US; page: /en-US/search -->

# Search

## Examples

Start with keyword submission, then field models, then controlled history and presentation. Requests stay in application code.

### Intro

Search is used to enter keywords and trigger queries in lists, result pages, or top toolbars. It includes a search icon, clear button, and optional cancel action.

### Basic Usage

Example source: src/search/example/demos/en-US/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('')
function handleSearch(result) {
  console.log('search', result)
}
</script>

<template>
  <mp-search v-model="value" label="Address" placeholder="Search" @search="handleSearch" />
</template>
```

### Search Button

Example source: src/search/example/demos/en-US/search-button.vue

```vue
<script setup>
import { ref } from 'vue'

const searchButtonValue = ref('')
const menuHistoryValue = ref('')
const menuRecentSearches = ref(['Device name', 'Order number', 'Operator'])
function handleSearch(result) {
  console.log('search', result)
}
function handleMenuHistorySearch(result) {
  menuRecentSearches.value = result.recentSearches
  handleSearch(result)
}
</script>

<template>
  <mp-search
    v-model="searchButtonValue"
    placeholder="Search"
    show-action
    action-type="search"
    action-text="Search"
    @search="handleSearch"
  />

  <mp-search
    v-model="menuHistoryValue"
    placeholder="Search"
    :recent-searches="menuRecentSearches"
    presentation="inline"
    show-action
    action-type="search"
    action-text="Search"
    @search="handleMenuHistorySearch"
  />
</template>
```

### States

Example source: src/search/example/demos/en-US/state.vue

```vue
<script setup>
import { ref } from 'vue'

const disabledValue = ref('Disabled')
</script>

<template>
  <mp-search v-model="disabledValue" placeholder="Search" disabled />
</template>
```

### Search Shape

Example source: src/search/example/demos/en-US/shape.vue

```vue
<script setup>
import { ref } from 'vue'

const squareValue = ref('')
</script>

<template>
  <mp-search v-model="squareValue" placeholder="Search" shape="square" />
</template>
```

### Cancel Button

Example source: src/search/example/demos/en-US/action.vue

```vue
<script setup>
import { ref } from 'vue'

const actionValue = ref('')
</script>

<template>
  <mp-search v-model="actionValue" placeholder="Search" show-action action-text="Cancel" />
</template>
```

### Interaction states

Use this example for keyword input and search submission. Adjust disabled, read-only and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/search/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const squareValue = ref('')
const __demoState = __demoReactive({ disabled: false, readonly: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
    </mp-space>
    <mp-search v-model="squareValue" placeholder="搜索" shape="square" v-bind="__demoState" />
  </mp-space>
</template>
```

### Field Select

Example source: src/search/example/demos/en-US/fields.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui'

const field = ref('name')
const model = ref<Record<string, unknown>>({ name: 'Device A', tenant: 'demo' })
const accepted = ref(true)
const history = ref(['Device A', '42'])
const result = ref<SearchResult>()
const fields = [
  { value: 'name', label: 'Device name', placeholder: 'Enter name' },
  { value: 'id', label: 'Device ID', placeholder: 'Enter ID' },
]
function updateModel(proposal: Record<string, unknown>) {
  if (accepted.value) {
    model.value = proposal
  }
}
function updateField(proposal: string) {
  if (accepted.value) {
    field.value = proposal
  }
}
function search(next: SearchResult) {
  result.value = next
  history.value = next.recentSearches
}
</script>
<template>
  <div class="search-demo">
    <mp-checkbox v-model="accepted">Accept updates (uncheck to demonstrate controlled rejection)</mp-checkbox>
    <mp-search
      :model="model"
      :model-field="field"
      :fields="fields"
      :recent-searches="history"
      presentation="inline"
      search-button
      button-text="Search"
      clearable
      @update:model="updateModel"
      @update:model-field="updateField"
      @search="search"
    />
    <mp-button variant="text" @click="model = { name: 'External value', tenant: 'demo' }"
      >Replace model externally</mp-button
    >
    <div>Accepted model：{{ model }}</div>
    <pre v-if="result">{{ JSON.stringify(result, null, 2) }}</pre>
  </div>
</template>
<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
}
.search-demo pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
```

### Search History

Persistence is application-owned; save `result.recentSearches` from the `search` event when needed.

Example source: src/search/example/demos/en-US/history.vue

```vue
<script setup>
import { ref } from 'vue'

const historyValue = ref('')
const recentSearches = ref(['Maple', 'Cedar', 'InputNumber'])
function handleSearch(result) {
  console.log('search', result)
}
function handleHistorySearch(result) {
  recentSearches.value = result.recentSearches
  handleSearch(result)
}
</script>

<template>
  <mp-search
    v-model="historyValue"
    placeholder="Search"
    :recent-searches="recentSearches"
    show-action
    action-type="search"
    action-text="Search"
    @search="handleHistorySearch"
  />
</template>
```

### History presentation and slots

Example source: src/search/example/demos/en-US/presentation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '@maple-design/ui'

const keyword = ref('')
const popup = ref(false)
const history = ref(['Project A', 'Device B'])
const lastAction = ref('No search yet')
function recordSearch(result: SearchResult) {
  history.value = result.recentSearches
  lastAction.value = result.modelValue ?? ''
}
function recordAction(result: SearchResult) {
  lastAction.value = result.modelValue ?? ''
}
</script>
<template>
  <div class="search-demo">
    <mp-checkbox v-model="popup">popup fullscreen search (uncheck for inline)</mp-checkbox>
    <mp-search
      v-model="keyword"
      :presentation="popup ? 'popup' : 'inline'"
      :recent-searches="history"
      label="Resource"
      placeholder="Enter resource name"
      clearable
      show-action
      action-text="Cancel"
      @cancel="lastAction = 'Cancelled'"
      @search="recordSearch"
    />
    <mp-search
      v-model="keyword"
      search-button
      :button-props="{ variant: 'outline' }"
      placeholder="Custom button slots"
      @search="recordAction"
    >
      <template #button-icon><span aria-hidden="true">⌕</span></template>
      <template #button-default>Find</template>
    </mp-search>
    <div>Last action：{{ lastAction }}</div>
  </div>
</template>
<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 100%;
}
</style>
```

## API

### Props

| Prop                       | Description                                        | Type                      | Default    |
| -------------------------- | -------------------------------------------------- | ------------------------- | ---------- |
| `v-model`                  | Search keyword                                     | _string_                  | `-`        |
| `default-value`            | Uncontrolled default keyword                       | _string_                  | `''`       |
| `v-model:model-field`      | Current search field                               | _string_                  | `-`        |
| `default-field`            | Uncontrolled default field                         | _string_                  | `-`        |
| `v-model:model`            | Object updated by field in field-search mode       | _Record<string, unknown>_ | `-`        |
| `fields`                   | Search field options                               | _SearchField[]_           | `[]`       |
| `select-style`             | Field selector style                               | _StyleValue_              | `-`        |
| `recent-searches`          | Controlled search history                          | _string[]_                | `[]`       |
| `max-search-history-count` | Maximum items in the next history list             | _number_                  | `5`        |
| `presentation` | Search display: inline history menu or popup fullscreen search | `'inline' \| 'popup'` | `'inline'` |
| `search-button`            | Whether to show the shared search button           | _boolean_                 | `false`    |
| `button-text`              | Shared search button text                          | _string_                  | `-`        |
| `button-props`             | Shared search button props                         | _ButtonProps_             | `-`        |
| `loading`                  | Loading state; submission is blocked while loading | _boolean_                 | `false`    |
| `clearable`                | Whether the value can be cleared                   | _boolean_                 | `false`    |
| `variant`                  | Input variant: `filled`, `outline`, or `standard`  | _string_                  | `outline`  |
| `size` | Input size inherited from Form / ConfigProvider | `xs / sm / md / lg / xl` | `md` |
| `placeholder`              | Placeholder                                        | _string_                  | `-`        |
| `disabled`                 | Whether Search is disabled                         | _boolean_                 | `false`    |
| `readonly`                 | Whether Search is readonly                         | _boolean_                 | `false`    |
| `label`                    | Left label                                         | _string_                  | `-`        |
| `shape`                    | Inner field shape: `round` or `square`             | _string_                  | `round`    |
| `background`               | Outer background color                             | _string_                  | `-`        |
| `input-background`         | Inner field background color                       | _string_                  | `-`        |
| `show-action`              | Whether to show the mobile action                  | _boolean_                 | `false`    |
| `action-text` | Action text | `string` | Global locale for action-type |
| `action-type`              | Action type: `cancel` or `search`           | _string_                  | `cancel`   |
| `search-icon`              | Search icon name                                   | _string_                  | `magnify`  |
| `max-length`               | Maximum length                                     | _string \| number_        | `-`        |
| `enterkeyhint`             | Virtual keyboard Enter hint                        | _string_                  | `search`   |

### Events

| Event               | Description                                              | Arguments                            |
| ------------------- | -------------------------------------------------------- | ------------------------------------ |
| `update:modelValue` | Emitted when the keyword updates                         | `value: string`                      |
| `update:modelField` | Emitted when the field updates                           | `field: string`                      |
| `update:model`      | Emitted when the field model updates                     | `model: Record<string, unknown>`     |
| `input`             | Emitted during live editing                              | `value: string, event: Event`        |
| `change`            | Emitted on blur, Enter commit, or field change           | `value: string, event: Event`        |
| `clear`             | Emitted when clearing                                    | `event: Event`                       |
| `search`            | Emitted by the icon, button, Enter, or history selection | `result: SearchResult, event: Event` |
| `focus`             | Emitted on focus                                         | `event: FocusEvent`                  |
| `blur`              | Emitted on blur                                          | `event: FocusEvent`                  |
| `cancel`            | Emitted by the mobile cancel action                      | `event: Event`                       |

### Slots

| Name             | Description                                    | Scope       |
| ---------------- | ---------------------------------------------- | ----------- |
| `prefix`         | Input prefix; replaces the default search icon | `-`         |
| `suffix`         | Input suffix                                   | `-`         |
| `clear-icon`     | Clear icon                                     | `{ clear }` |
| `button-default` | Shared search button content                   | `-`         |
| `button-icon`    | Shared search button icon                      | `-`         |
| `label`          | Left label                                     | `-`         |
| `action`         | Action content                          | `-`         |

### Methods

| Method  | Description     | Arguments | Return |
| ------- | --------------- | --------- | ------ |
| `focus` | Focus the input | `-`       | `-`    |
| `blur`  | Blur the input  | `-`       | `-`    |

### SearchField

| Prop          | Description                                       | Type     |
| ------------- | ------------------------------------------------- | -------- |
| `label`       | Field label                                       | _string_ |
| `value`       | Field value                                       | _string_ |
| `placeholder` | Field placeholder; overrides Search `placeholder` | _string_ |

### SearchResult

| Prop             | Description         | Type                                   |
| ---------------- | ------------------- | -------------------------------------- |
| `modelField`     | Search field        | _string \| undefined_                  |
| `modelValue`     | Raw search keyword  | _string_                               |
| `model`          | Field model object  | _Record<string, unknown> \| undefined_ |
| `recentSearches` | Next search history | _string[]_                             |

Input event contract: editing emits `input` before `update:modelValue`; committing on blur emits `change` only for a changed value. Clearing emits `clear → input → update:modelValue → change` once, updates the search field model once, and does not submit a search.

Input notifications precede model updates. Enter waits for the Input commit and accepted controlled model before constructing its search result; rejected trim proposals do not replace the actual controlled value. Clear emits clear → input → update:modelValue → change without submitting a search.

## Controlled model contract

Value precedence is `modelValue` > `model[currentField]` > uncontrolled `defaultValue`. A missing/null field in a supplied model renders an empty string. Keep multiple controlled bindings consistent in the parent. `modelField` takes precedence over `defaultField` and the first field.

The supplied model is **never mutated**. Each logical edit emits a fresh `update:model` proposal, clears other declared fields, and preserves unrelated keys. Bind with `v-model:model` or explicitly accept proposals. Switching fields emits one `update:modelField → update:modelValue → update:model → change` sequence. Enter, button and history search wait for the parent update, then report the actual accepted field, value and model—not rejected proposals.

History is neither filtered by input nor persisted internally. The returned history is trimmed, emptied entries removed, deduplicated and bounded. Empty keywords do not add records; negative/non-finite limits produce an empty list. Clear never searches. Cancel proposes an empty value and emits cancel/change without searching.

Editing emits `input → update:modelValue`; changed commits emit `change`. Clear emits `clear → input → update:modelValue → change` once. Disabled, readonly and loading block search, cancel, history and field actions. Form / FormItem / InputGroup state is inherited. Deactivation or unmount cancels pending asynchronous search.

### Platform boundaries

The controller, public API and history content are independently copied. Both default to `presentation=inline`; Cedar defaults to `shape=square` and Maple to `shape=round`. Fullscreen history uses local Drawer / Popup instances. Desktop InputGroup and mobile search-bar layout/touch spacing remain independent. Input supports `xs/sm/md/lg/xl`; outer bar density is configured by Search tokens rather than scaled by size.

### Public types

`SearchPresentation`、`SearchProps`, `SearchEmits`, `SearchSlots`, `SearchExpose`, `SearchField`, `SearchResult`.

### Input forwarding

Explicit Input props include `modelModifiers`, `type`, `ariaLabel`, `placeholder`, `maxLength`, `readonly`, `disabled`, `autofocus`, `enterkeyhint`, `textColor`, `focusColor`, `blurColor`, `size`, `variant`, `clearable`, `inputAttrs` and `error`. `inputAttrs` carries native name/autocomplete/ARIA attributes to both outer and fullscreen Input; `error` overrides inherited error state. Search actions, popup cancellation and dialog labels follow the global locale. Programmatic cancel, field and history selection notify Form change once; native edits retain the Input event pipeline.


## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.
Text and person-ID models remain strings; use an empty string or another string sentinel.
