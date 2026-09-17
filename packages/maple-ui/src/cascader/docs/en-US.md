# Cascader

### Intro

Cascading selection via dropdown menu or bottom popup picker.

### Please select a region

```demo
../example/demos/placeholder.vue
```

### Non-path mode

```demo
../example/demos/placeholder-path-mode.vue
```

### Multiple cascade

```demo
../example/demos/placeholder-multiple.vue
```

### Picker mode

```demo
../example/demos/placeholder-picker.vue
```

### Picker multiple

```demo
../example/demos/placeholder-picker-multiple.vue
```

### List mode

```demo
../example/demos/placeholder-list.vue
```

### List multiple

```demo
../example/demos/placeholder-list-multiple.vue
```

## API

### Props

#### Cascader Props

| Prop              | Description                                                                                                                      | Type                     | Default     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------- |
| `v-model`         | Binding value                                                                                                                    | _any \| any[]_           | `-`         |
| `options`         | Cascading option data                                                                                                            | _CascaderOption[]_       | `[]`        |
| `presentation`    | Display style, optional `menu` `picker` `list`                                                                                   | _string_                 | `menu`      |
| `open`            | Visibility control                                                                                                               | _boolean_                | `undefined` |
| `field-names`     | Custom field mapping for `options`                                                                                               | _FieldNames_             | `-`         |
| `multiple`        | Enable multi-select (menu: checkbox panel; picker: temporary cart with Add / Done / Cancel; list: tap to toggle + Done / Cancel) | _boolean_                | `false`     |
| `check-strictly`  | Allow selecting non-leaf nodes                                                                                                   | _boolean_                | `false`     |
| `path-mode`       | Return full path array vs leaf value                                                                                             | _boolean_                | `true`      |
| `filterable`      | Enable search                                                                                                                    | _boolean_                | `false`     |
| `clearable`       | Allow clear                                                                                                                      | _boolean_                | `false`     |
| `placeholder`     | Placeholder text                                                                                                                 | _string_                 | `-`         |
| `disabled`        | Disabled state                                                                                                                   | _boolean_                | `false`     |
| `readonly`        | Readonly state                                                                                                                   | _boolean_                | `false`     |
| `loading`         | Loading state                                                                                                                    | _boolean_                | `false`     |
| `size`            | Size: `xs` `sm` `md` `lg` `xl`                                                                                                   | _ComponentSize_          | `md`        |
| `variant`         | Variant, optional `filled` `standard` `outline`                                                                                 | _string_                 | `standard`  |
| `tag`             | Tag style (multi-select only)                                                                                                    | _boolean_                | `false`     |
| `separator`       | Multi-select separator                                                                                                           | _string_                 | `,`         |
| `close-on-select` | Auto close on select (menu single-select only; multiple never auto-closes)                                                       | _boolean_                | `true`      |
| `picker-props`    | Props passed to `mp-picker` in picker mode                                                                                       | _Partial\<PickerProps\>_ | `{}`        |
| `popup-props`     | Props passed to popup                                                                                                            | _Partial\<PopupProps\>_  | `{}`        |

#### CascaderOption

| Prop       | Description   | Type               | Default |
| ---------- | ------------- | ------------------ | ------- |
| `label`    | Option label  | _string_           | `-`     |
| `value`    | Option value  | _any_              | `-`     |
| `disabled` | Disabled      | _boolean_          | `-`     |
| `children` | Child options | _CascaderOption[]_ | `-`     |

### Events

#### Cascader Events

| Event    | Description         | Arguments             |
| -------- | ------------------- | --------------------- |
| `focus`  | Triggered on focus  | `-`                   |
| `blur`   | Triggered on blur   | `-`                   |
| `click`  | Triggered on click  | `event: Event`        |
| `clear`  | Triggered on clear  | `value: any \| any[]` |
| `close`  | Triggered on close  | `value: any \| any[]` |
| `change` | Triggered on change | `value: any \| any[]` |

### Methods

#### Cascader Methods

| Method  | Description | Arguments | Returns |
| ------- | ----------- | --------- | ------- |
| `focus` | Focus       | `-`       | `-`     |
| `blur`  | Blur        | `-`       | `-`     |

### Slots

#### Cascader Slots

| Slot         | Description           | Props                                     |
| ------------ | --------------------- | ----------------------------------------- |
| `selected`   | Selected content      | `-`                                       |
| `option`     | Custom option content | `option: CascaderOption, active: boolean` |
| `prefix`     | Prefix                | `-`                                       |
| `clear-icon` | Clear icon            | `clear: (e: Event) => void`               |
| `suffix`     | Suffix                | `-`                                       |
| `arrow-icon` | Arrow icon            | `focus: boolean, menu-open: boolean`      |

### CSS Variables

Use [StyleProvider](#/en-US/style-provider) to customize.

| Variable                                   | Default                         |
| ------------------------------------------ | ------------------------------- |
| `--mp-cascader-panel-background`           | `var(--color-fill-2)`           |
| `--mp-cascader-panel-padding`              | `6px 0`                         |
| `--mp-cascader-panel-max-height`           | `278px`                         |
| `--mp-cascader-panel-border-radius`        | `2px`                           |
| `--mp-cascader-column-width`               | `140px`                         |
| `--mp-cascader-option-height`              | `38px`                          |
| `--mp-cascader-option-padding`             | `0 12px`                        |
| `--mp-cascader-option-font-size`           | `16px`                          |
| `--mp-cascader-option-selected-color`      | `var(--mp-color-primary)`       |
| `--mp-cascader-option-selected-background` | `var(--mp-color-primary)`       |
| `--mp-cascader-option-text-color`          | `#555`                          |
| `--mp-cascader-option-disabled-color`      | `var(--mp-color-text-disabled)` |
| `--mp-cascader-option-arrow-size`          | `18px`                          |
| `--mp-cascader-label-font-size`            | `16px`                          |
| `--mp-cascader-arrow-size`                 | `20px`                          |
