# 复选框

### 介绍

在一组备选项中进行多选。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 设置状态值

```demo
../example/demos/set-state.vue
```

### 修改图标和颜色

```demo
../example/demos/set-style.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

### 不确定状态

```demo
../example/demos/indeterminate.vue
```

### 复选框组

在复选框组中，必须给 `checkbox` 设置 `value` 用来标识，
复选框组会收集所有选择的标识。

```demo
../example/demos/checkbox-group.vue
```

### 选项式 API

通过 `options` 属性设置子元素。

```demo
../example/demos/checkbox-group-options.vue
```

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

```demo
../example/demos/custom-fields.vue
```

### 垂直布局

```demo
../example/demos/vertical.vue
```

### 最大选中数量

在复选框组中，可以通过设置 `max` 属性来限制最大选中数量。

> 复选框及复选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/max.vue
```

## API

### 属性

#### CheckboxGroup Props

| 参数                   | 说明                                       | 类型                                       | 默认值       |
| ---------------------- | ------------------------------------------ | ------------------------------------------ | ------------ |
| `v-model`              | 绑定的值                                   | _any[]_                                    | `[]`         |
| `max`                  | 最大选择的数量                             | _string \| number_                         | `-`          |
| `direction`            | 布局方向，可选值为 `horizontal` `vertical` | _string_                                   | `horizontal` |
| `options` _**3.2.11**_ | 指定可选项                                 | _CheckboxGroupOption[]_                    | `[]`         |
| `field-names`          | 自定义 `options` 字段映射                  | _{ label?, value?, children?, disabled? }_ | `-`          |

#### CheckboxGroupOption

| 参数       | 说明       | 类型                                                                               | 默认值 |
| ---------- | ---------- | ---------------------------------------------------------------------------------- | ------ |
| `label`    | 选项的标签 | _string \| VNode \| (option: CheckboxGroupOption, checked: boolean) => VNodeChild_ | `-`    |
| `value`    | 选项的值   | _any_                                                                              | `-`    |
| `disabled` | 是否禁用   | _boolean_                                                                          | `-`    |

#### Checkbox Props

| 参数              | 说明                               | 类型               | 默认值  |
| ----------------- | ---------------------------------- | ------------------ | ------- |
| `v-model`         | 绑定的值                           | _any_              | `false` |
| `value`           | 选项值                             | _any_              | `true`  |
| `checked-color`   | 选中状态的颜色                     | _string_           | `-`     |
| `unchecked-color` | 未选中状态的颜色                   | _string_           | `-`     |
| `icon-size`       | 图标尺寸                           | _string \| number_ | `-`     |
| `disabled`        | 是否禁用                           | _boolean_          | `false` |
| `readonly`        | 是否只读                           | _boolean_          | `false` |
| `indeterminate`   | 是否为不确定状态（样式优先级最高） | _boolean_          | `false` |
| `ripple`          | 是否开启水波纹                     | _boolean_          | `true`  |

### 方法

#### CheckboxGroup Methods

| 方法名       | 说明 | 参数 | 返回值         |
| ------------ | ---- | ---- | -------------- |
| `checkAll`   | 全选 | `-`  | `value: any[]` |
| `inverseAll` | 反选 | `-`  | `value: any[]` |

#### Checkbox Methods

| 方法名   | 说明                                                                       | 参数          | 返回值 |
| -------- | -------------------------------------------------------------------------- | ------------- | ------ |
| `toggle` | 切换选中状态，传 `value` 为选中， `false` 为取消选中，不传或其他情况为取反 | `value?: any` | `-`    |

### 事件

#### CheckboxGroup Events

| 事件名   | 说明       | 参数           |
| -------- | ---------- | -------------- |
| `change` | 变更时触发 | `value: any[]` |

#### Checkbox Events

| 事件名   | 说明           | 参数         |
| -------- | -------------- | ------------ |
| `click`  | 点击时触发     | `e: Event`   |
| `change` | 状态变更时触发 | `value: any` |

### 插槽

#### CheckboxGroup Slots

| 插槽名    | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 复选框组的内容 | `-`  |

#### Checkbox Slots

| 插槽名               | 说明           | 参数                        |
| -------------------- | -------------- | --------------------------- |
| `checked-icon`       | 选中图标       | `-`                         |
| `unchecked-icon`     | 未选中图标     | `-`                         |
| `indeterminate-icon` | 不确定状态图标 | `-`                         |
| `default`            | 显示的文本     | `checked: boolean` 是否选中 |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                 | 默认值                                |
| -------------------------------------- | ------------------------------------- |
| `--checkbox-control-color`             | `#555`                                |
| `--checkbox-control-color-checked`     | `var(--color-primary)`                |
| `--checkbox-control-color-disabled`    | `var(--color-text-disabled)`          |
| `--checkbox-control-color-error`       | `var(--sys-color-status-danger)`      |
| `--checkbox-control-size`              | `24px`                                |
| `--checkbox-action-padding`            | `6px`                                 |
| `--checkbox-label-text-color`          | `#555`                                |
| `--checkbox-label-text-color-disabled` | `var(--color-text-disabled)`          |
| `--checkbox-label-font-size`           | `var(--font-size-md)`                 |
| `--checkbox-label-gap`                 | `0`                                   |
| `--checkbox-group-gap`                 | `0`                                   |
| `--checkbox-animation-duration`        | `var(--sys-motion-duration-standard)` |

### API

### 属性

| 参数              | 说明                               | 类型               | 默认值  |
| ----------------- | ---------------------------------- | ------------------ | ------- |
| `v-model`         | 绑定的值                           | _any_              | `false` |
| `value`           | 选项值                             | _any_              | `true`  |
| `checked-color`   | 选中状态的颜色                     | _string_           | `-`     |
| `unchecked-color` | 未选中状态的颜色                   | _string_           | `-`     |
| `icon-size`       | 图标尺寸                           | _string \| number_ | `-`     |
| `disabled`        | 是否禁用                           | _boolean_          | `false` |
| `readonly`        | 是否只读                           | _boolean_          | `false` |
| `indeterminate`   | 是否为不确定状态（样式优先级最高） | _boolean_          | `false` |
| `ripple`          | 是否开启水波纹                     | _boolean_          | `true`  |

### 事件

| 事件名   | 说明           | 参数                                 |
| -------- | -------------- | ------------------------------------ |
| `click`  | 点击时触发     | `e: Event`                           |
| `change` | 状态变更时触发 | `value: any, indeterminate: boolean` |

### 插槽

| 插槽名               | 说明           | 参数                        |
| -------------------- | -------------- | --------------------------- |
| `checked-icon`       | 选中图标       | `-`                         |
| `unchecked-icon`     | 未选中图标     | `-`                         |
| `indeterminate-icon` | 不确定状态图标 | `-`                         |
| `default`            | 显示的文本     | `checked: boolean` 是否选中 |
