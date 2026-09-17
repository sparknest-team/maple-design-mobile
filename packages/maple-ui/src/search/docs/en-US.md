# Search

### Intro

Search is used to enter keywords and trigger queries in lists, result pages, or top toolbars. It includes a search icon, clear button, and optional cancel action.

### Basic Usage

```demo
../example/demos/en-US/basic.vue
```

### Cancel Button

```demo
../example/demos/en-US/action.vue
```

### Search Button

```demo
../example/demos/en-US/search-button.vue
```

### Search History

Persistence is application-owned; save `result.recentSearches` from the `search` event when needed.

```demo
../example/demos/en-US/history.vue
```

### Field Select

```demo
../example/demos/en-US/fields.vue
```

### Search Shape

```demo
../example/demos/en-US/shape.vue
```

### States

```demo
../example/demos/en-US/state.vue
```

## API

### Props

| Prop                       | Description                                                                              | Type               | Default   |
| -------------------------- | ---------------------------------------------------------------------------------------- | ------------------ | --------- |
| `v-model`                  | Search keyword                                                                           | _string_           | `-`       |
| `v-model:model-field`      | Current search field                                                                     | _string_           | `-`       |
| `v-model:search-text`      | Search keyword, compatible field-search name                                             | _string_           | `-`       |
| `v-model:search-field`     | Current search field, compatible field-search name                                       | _string_           | `-`       |
| `v-model:model`            | Form model object, written by field in field mode                                        | _object_           | `-`       |
| `default-value`            | Default search keyword                                                                   | _string_           | `-`       |
| `default-field`            | Default search field                                                                     | _string_           | `-`       |
| `fields`                   | Search field options                                                                     | _SearchField[]_    | `[]`      |
| `recent-searches`          | Search history list shown fully                                                          | _string[]_         | `[]`      |
| `max-search-history-count` | Max items kept when generating next history                                              | _number_           | `5`       |
| `history-popup`            | Whether history is shown in a full-screen Popup; when `false`, a auto-fit-popup-width Menu is used | _boolean_          | `true`    |
| `placeholder`              | Placeholder                                                                              | _string_           | `-`       |
| `label`                    | Left label                                                                               | _string_           | `-`       |
| `shape`                    | Inner search field shape, can be `round` `square`                                        | _string_           | `round`   |
| `background`               | Outer background color                                                                   | _string_           | `-`       |
| `input-background`         | Inner search field background color                                                      | _string_           | `-`       |
| `show-action`              | Whether to show the action button                                                        | _boolean_          | `false`   |
| `action-text`              | Action button text                                                                       | _string_           | `取消`    |
| `action-type`              | Action button type, can be `cancel` `search`                                             | _string_           | `cancel`  |
| `search-icon`              | Search icon name                                                                         | _string_           | `magnify` |
| `clearable`                | Whether to show clear icon                                                               | _boolean_          | `true`    |
| `disabled`                 | Whether to disable search                                                                | _boolean_          | `false`   |
| `readonly`                 | Whether to be readonly                                                                   | _boolean_          | `false`   |
| `max-length`                | Max length                                                                               | _string \| number_ | `-`       |
| `enterkeyhint`             | Custom enter key hint                                                                    | _string_           | `search`  |

### Events

| Event    | Description                                                                    | Arguments                             |
| -------- | ------------------------------------------------------------------------------ | ------------------------------------- |
| `search` | Emitted when clicking the search icon, action search button, or pressing enter | `result: SearchResult, event?: Event` |
| `cancel` | Emitted when clicking the cancel button                                        | `-`                                   |
| `input`  | Emitted while typing                                                           | `value: string, event: Event`         |
| `change` | Emitted when search field or keyword changes                                   | `value: string, event?: Event`        |
| `clear`  | Emitted when clearing                                                          | `value: string`                       |

### Methods

| Method  | Description | Arguments | Return |
| ------- | ----------- | --------- | ------ |
| `focus` | Focus input | `-`       | `-`    |
| `blur`  | Blur input  | `-`       | `-`    |

### SearchField

| Prop          | Description                                                           | Type     | Default |
| ------------- | --------------------------------------------------------------------- | -------- | ------- |
| `label`       | Field label                                                           | _string_ | `-`     |
| `value`       | Field value                                                           | _any_    | `-`     |
| `placeholder` | Placeholder for this field, higher priority than Search `placeholder` | _string_ | `-`     |

### SearchResult

| Prop             | Description              | Type                  |
| ---------------- | ------------------------ | --------------------- |
| `modelField`     | Search field             | _string_              |
| `modelValue`     | Search keyword           | _string_              |
| `searchField`    | Search field             | _string_              |
| `searchText`     | Search keyword           | _string_              |
| `model`          | Form model object        | _Record<string, any>_ |
| `recentSearches` | Next search history list | _string[]_            |
