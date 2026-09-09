# Search

### Intro

Search accepts a keyword and submits a query. Its core data, events, and result shape match Cedar Search, while full-screen history and cancel actions remain Maple-specific mobile capabilities.

### Basic Usage

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const latestResult = ref()
</script>

<template>
  <mp-search
    v-model="value"
    label="Address"
    placeholder="Search keywords"
    search-button
    button-text="Search"
    clearable
    @search="latestResult = $event"
  />
</template>
```

`input` is emitted for live edits. `change` is emitted when the input commits on blur or Enter. Clearing only updates the value and emits `clear`; it does not emit `input`, `change`, or `search`.

### Mobile Cancel Action

```html
<mp-search v-model="value" placeholder="Search" show-action action-text="Cancel" />
```

`show-action`, `action-type`, and `action-text` are Maple mobile extensions. Prefer `search-button`, `button-text`, and `button-props` for the shared search button API.

### Field Select

```html
<script setup>
  import { ref } from 'vue'

  const model = ref({})
  const modelField = ref('address')
  const value = ref('')
  const fields = [
    { label: 'Address', value: 'address', placeholder: 'Search address' },
    { label: 'Name', value: 'name', placeholder: 'Search name' },
  ]
</script>

<template>
  <mp-search
    v-model="value"
    v-model:model-field="modelField"
    v-model:model="model"
    :fields="fields"
    search-button
    button-text="Search"
  />
</template>
```

Changing fields updates the field, clears the keyword, updates `model` once, emits one `change`, and then refocuses the input.

### Search History

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
  const recentSearches = ref(['Maple', 'Cedar', 'InputNumber'])

  function handleSearch(result) {
    recentSearches.value = result.recentSearches
  }
</script>

<template>
  <mp-search v-model="value" :recent-searches="recentSearches" @search="handleSearch" />
</template>
```

Search does not persist history. `modelValue` in the result preserves the raw input, while history keys are trimmed, deduplicated, moved to the front, and limited by `max-search-history-count`. Set `history-popup="false"` to use a same-width Menu instead of the full-screen Popup.

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
| `history-popup`            | Whether to show history in a full-screen Popup     | _boolean_                 | `true`     |
| `search-button`            | Whether to show the shared search button           | _boolean_                 | `false`    |
| `button-text`              | Shared search button text                          | _string_                  | `-`        |
| `button-props`             | Shared search button props                         | _ButtonProps_             | `-`        |
| `loading`                  | Loading state; submission is blocked while loading | _boolean_                 | `false`    |
| `clearable`                | Whether the value can be cleared                   | _boolean_                 | `false`    |
| `variant`                  | Input variant: `filled`, `outlined`, or `standard` | _string_                  | `outlined` |
| `size`                     | Input size                                         | _string_                  | `md`       |
| `placeholder`              | Placeholder                                        | _string_                  | `-`        |
| `disabled`                 | Whether Search is disabled                         | _boolean_                 | `false`    |
| `readonly`                 | Whether Search is readonly                         | _boolean_                 | `false`    |
| `label`                    | Left label                                         | _string_                  | `-`        |
| `shape`                    | Inner field shape: `round` or `square`             | _string_                  | `round`    |
| `background`               | Outer background color                             | _string_                  | `-`        |
| `input-background`         | Inner field background color                       | _string_                  | `-`        |
| `show-action`              | Whether to show the mobile action                  | _boolean_                 | `false`    |
| `action-text`              | Mobile action text                                 | _string_                  | `取消`     |
| `action-type`              | Mobile action type: `cancel` or `search`           | _string_                  | `cancel`   |
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
| `action`         | Mobile action content                          | `-`         |

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
