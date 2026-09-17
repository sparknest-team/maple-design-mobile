# 级联选择器

### 介绍

通过下拉菜单或底部弹窗的形式进行级联选择。

### 请选择地区

```demo
../example/demos/placeholder.vue
```

### 非路径模式

```demo
../example/demos/placeholder-path-mode.vue
```

### 级联多选

```demo
../example/demos/placeholder-multiple.vue
```

### Picker 模式

```demo
../example/demos/placeholder-picker.vue
```

### Picker 多选

```demo
../example/demos/placeholder-picker-multiple.vue
```

### List 模式

```demo
../example/demos/placeholder-list.vue
```

### List 多选

```demo
../example/demos/placeholder-list-multiple.vue
```

## API

### 属性

#### Cascader Props

| 参数              | 说明                                                                                                           | 类型                     | 默认值      |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------- |
| `v-model`         | 绑定的值                                                                                                       | _any \| any[]_           | `-`         |
| `options`         | 级联选项数据                                                                                                   | _CascaderOption[]_       | `[]`        |
| `presentation`    | 展示风格，可选值 `menu` `picker` `list`                                                                        | _string_                 | `menu`      |
| `open`            | 显隐受控                                                                                                       | _boolean_                | `undefined` |
| `field-names`     | 自定义 `options` 字段映射                                                                                      | _FieldNames_             | `-`         |
| `multiple`        | 是否开启多选（menu 为面板勾选；picker 为临时购物车：添加 / 完成 / 取消；list 为点击勾选 / 取消 + 完成 / 取消） | _boolean_                | `false`     |
| `check-strictly`  | 是否允许选中非叶子节点                                                                                         | _boolean_                | `false`     |
| `path-mode`       | 返回值为路径数组还是叶子值                                                                                     | _boolean_                | `true`      |
| `filterable`      | 是否可搜索                                                                                                     | _boolean_                | `false`     |
| `clearable`       | 是否可清除                                                                                                     | _boolean_                | `false`     |
| `placeholder`     | 占位符                                                                                                         | _string_                 | `-`         |
| `disabled`        | 是否禁用                                                                                                       | _boolean_                | `false`     |
| `readonly`        | 是否只读                                                                                                       | _boolean_                | `false`     |
| `loading`         | 是否加载中                                                                                                     | _boolean_                | `false`     |
| `size`            | 选择框尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                                                    | _ComponentSize_          | `md`        |
| `variant`         | 选择框风格，可选值 `filled` `standard` `outline`                                                              | _string_                 | `standard`  |
| `tag`             | 是否使用标签风格（仅多选）                                                                                     | _boolean_                | `false`     |
| `separator`       | 多选展示分隔符                                                                                                 | _string_                 | `,`         |
| `close-on-select` | 选中后是否自动关闭（仅 menu 单选模式，多选不会自动关闭）                                                       | _boolean_                | `true`      |
| `picker-props`    | picker 模式透传给 `mp-picker` 的属性                                                                           | _Partial\<PickerProps\>_ | `{}`        |
| `popup-props`     | 透传给弹窗的属性                                                                                               | _Partial\<PopupProps\>_  | `{}`        |

#### CascaderOption

| 参数       | 说明       | 类型               | 默认值 |
| ---------- | ---------- | ------------------ | ------ |
| `label`    | 选项的标签 | _string_           | `-`    |
| `value`    | 选项的值   | _any_              | `-`    |
| `disabled` | 是否禁用   | _boolean_          | `-`    |
| `children` | 子选项     | _CascaderOption[]_ | `-`    |

### 事件

#### Cascader Events

| 事件名   | 说明       | 参数                  |
| -------- | ---------- | --------------------- |
| `focus`  | 聚焦时触发 | `-`                   |
| `blur`   | 失焦时触发 | `-`                   |
| `click`  | 点击时触发 | `event: Event`        |
| `clear`  | 清除时触发 | `value: any \| any[]` |
| `close`  | 关闭时触发 | `value: any \| any[]` |
| `change` | 更新时触发 | `value: any \| any[]` |

### 方法

#### Cascader Methods

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 插槽

#### Cascader Slots

| 插槽名       | 说明           | 参数                                      |
| ------------ | -------------- | ----------------------------------------- |
| `selected`   | 选择区域的内容 | `-`                                       |
| `option`     | 自定义选项内容 | `option: CascaderOption, active: boolean` |
| `prefix`     | 前缀           | `-`                                       |
| `clear-icon` | 清除图标       | `clear: (e: Event) => void`               |
| `suffix`     | 后缀           | `-`                                       |
| `arrow-icon` | 箭头图标       | `focus: boolean, menu-open: boolean`      |

### 样式变量

以下为组件使用的 CSS 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                     | 默认值                          |
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
