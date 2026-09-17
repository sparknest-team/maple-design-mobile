# 选择框

### 介绍

通过下拉菜单展示并选择内容。

### 标准外观

```demo
../example/demos/standard.vue
```

### 外边框外观

```demo
../example/demos/outline.vue
```

### Picker 模式

将 `presentation` 设置为 `picker` 即可使用底部弹窗的滚轮选择器。



> Picker 模式仅支持 `options` 属性方式传入选项，插槽方式传入的 `<mp-option>` 暂不支持。

```demo
../example/demos/picker.vue
```

### Picker 多选

与 Cascader 一致：弹层内用「添加」把当前项放入草稿，点「完成」才写回 `v-model`；「取消」丢弃草稿。

```html
<script setup>
  import { ref } from 'vue'

  const pickerMultiple = ref([])
  const pickerOptions = ref([
    { label: '吃饭', value: 1 },
    { label: '睡觉', value: 2 },
    { label: '打游戏', value: 3 },
    { label: '写文档', value: 4 },
  ])
</script>

<template>
  <mp-select
    presentation="picker"
    multiple
    tag
    clearable
    placeholder="请选择多个选项"
    v-model="pickerMultiple"
    :options="pickerOptions"
  />
</template>
```

### List 模式

将 `presentation` 设置为 `list`，底部弹窗以列表展示选项，选中项右侧显示对号。

单选：点击即选中并关闭。多选：点击切换勾选（草稿），点「完成」提交，「取消」丢弃。



> List 模式仅支持 `options` 属性方式传入选项，插槽方式传入的 `<mp-option>` 暂不支持。

```demo
../example/demos/list.vue
```

## API

### 属性

#### Select Props

| 参数                        | 说明                                                | 类型                                       | 默认值      |
| --------------------------- | --------------------------------------------------- | ------------------------------------------ | ----------- |
| `v-model`                   | 绑定的值                                            | _any \| any[]_                             | `-`         |
| `size`                      | 选择框尺寸，可选值 `xs` `sm` `md` `lg` `xl`         | _ComponentSize_                            | `md`        |
| `variant`                   | 选择框风格, 可选值为 `filled` `outline` `standard` | _string_                                   | `standard`  |
| `presentation` _**3.18.0**_ | 展示模式，可选值为 `menu` `picker` `list`           | _string_                                   | `menu`      |
| `show` _**3.18.0**_         | 显隐受控                                            | _boolean_                                  | `undefined` |
| `placeholder`               | 占位符                                              | _string_                                   | `-`         |
| `multiple`                  | 是否开启多选                                        | _boolean_                                  | `false`     |
| `offset-y`                  | 下拉菜单的垂直偏移量                                | _string \| number_                         | `0`         |
| `tag`                       | 是否使用标签风格（仅限多选）                        | _boolean_                                  | `false`     |
| `line`                      | 是否显示分割线                                      | _boolean_                                  | `true`      |
| `hint`                      | 是否使用占位符作为提示                              | _boolean_                                  | `true`      |
| `text-color`                | 文字颜色                                            | _string_                                   | `-`         |
| `focus-color`               | 聚焦时的主要颜色                                    | _string_                                   | `-`         |
| `blur-color`                | 失焦时的主要颜色                                    | _string_                                   | `-`         |
| `readonly`                  | 是否只读                                            | _boolean_                                  | `false`     |
| `disabled`                  | 是否禁用                                            | _boolean_                                  | `false`     |
| `clearable`                 | 是否可清除                                          | _boolean_                                  | `false`     |
| `options` _**3.3.4**_       | 指定可选项                                          | _SelectOption[]_                           | `[]`        |
| `field-names`               | 自定义 `options` 字段映射                           | _{ label?, value?, children?, disabled? }_ | `-`         |
| `picker-props` _**3.18.0**_ | picker 模式透传给 `mp-picker` 的属性                | _Partial\<PickerProps\>_                   | `{}`        |
| auto-fit-popup-width | 菜单是否与触发框等宽；false 时按内容自适应（菜单展示模式）。 | `boolean` | `true` |
| `popup-props` _**3.18.0**_  | 透传给弹窗的属性                                    | _Partial\<PopupProps\>_                    | `{}`        |

校验规则现在配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

#### SelectOption

| 参数       | 说明       | 类型                                                                         | 默认值 |
| ---------- | ---------- | ---------------------------------------------------------------------------- | ------ |
| `label`    | 选项的标签 | _string \| VNode \| (option: SelectOption, selected: boolean) => VNodeChild_ | `-`    |
| `value`    | 选项的值   | _any_                                                                        | `-`    |
| `disabled` | 是否禁用   | _boolean_                                                                    | `-`    |

#### Option Props

| 参数                 | 说明             | 类型      | 默认值  |
| -------------------- | ---------------- | --------- | ------- |
| `label`              | 选项显示的文本   | _any_     | `-`     |
| `value`              | 选项绑定的值     | _any_     | `-`     |
| `disabled`           | 是否禁用         | _boolean_ | `false` |
| `ripple` _**3.8.0**_ | 是否启用水波效果 | _boolean_ | `true`  |

### 方法

#### Select Methods

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 事件

#### Select Events

| 事件名   | 说明       | 参数                  |
| -------- | ---------- | --------------------- |
| `focus`  | 聚焦时触发 | `event: Event`        |
| `blur`   | 失焦时触发 | `event: Event`        |
| `click`  | 点击时触发 | `event: Event`        |
| `clear`  | 清除时触发 | `value: any \| any[]` |
| `close`  | 关闭时触发 | `value: any[]`        |
| `change` | 更新时触发 | `value: any \| any[]` |

### 插槽

#### Select Slots

| 插槽名       | 说明           | 参数                                                                     |
| ------------ | -------------- | ------------------------------------------------------------------------ |
| `selected`   | 选择区域的内容 | `-`                                                                      |
| `prefix`     | 前缀           | `-`                                                                      |
| `clear-icon` | 清除图标       | `clear: (e: Event) => void` 清除函数(在使用插槽时, 可用于清除选择框内容) |
| `suffix`     | 后缀           | `-`                                                                      |
| `arrow-icon` | 箭头图标       | `focus: boolean` 是否处于聚焦状态, `menu-open: boolean` 是否菜单被打开   |

#### Option Slots

| 插槽名    | 说明           | 参数                         |
| --------- | -------------- | ---------------------------- |
| `default` | 选项显示的内容 | `selected: boolean` 是否选中 |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

#### Select Variables

| 变量名                                        | 默认值                                                       |
| --------------------------------------------- | ------------------------------------------------------------ |
| `--mp-field-color-text`                       | `#555`                                                       |
| `--mp-field-color-error`                      | `var(--mp-color-danger)`                                     |
| `--mp-field-color-blur`                       | `#888`                                                       |
| `--mp-field-color-focus`                      | `var(--mp-color-primary)`                                    |
| `--mp-field-color-placeholder-text`           | `var(--mp-field-color-blur)`                                 |
| `--mp-field-color-text-disabled`              | `var(--mp-color-text-disabled)`                              |
| `--mp-field-size-placeholder`                 | `16px`                                                       |
| `--mp-field-size-icon`                        | `20px`                                                       |
| `--mp-field-border-radius`                    | `4px`                                                        |
| `--mp-field-variant-standard-line-size`       | `1px`                                                        |
| `--mp-field-variant-standard-line-size-focus` | `2px`                                                        |
| `--mp-field-variant-filled-bg`                | `var(--mp-color-fill-2)`                                     |
| `--mp-field-size-xs-height`                   | `32px`                                                       |
| `--mp-field-size-sm-height`                   | `40px`                                                       |
| `--mp-field-size-md-height`                   | `48px`                                                       |
| `--mp-field-size-lg-height`                   | `56px`                                                       |
| `--mp-field-size-xl-height`                   | `64px`                                                       |
| `--select-scroller-background`                | `var(--color-fill-2)`                                        |
| `--select-scroller-padding`                   | `6px 0`                                                      |
| `--select-scroller-max-height`                | `278px`                                                      |
| `--select-scroller-border-radius`             | `2px`                                                        |
| `--select-label-font-size`                    | `16px`                                                       |
| `--select-tags-margin`                        | `-5px 0 0 0`                                                 |
| `--select-tags-padding`                       | `2px 0`                                                      |
| `--select-tag-margin`                         | `5px 5px 0 0`                                                |
| `--select-arrow-size`                         | `20px`                                                       |
| `--select-standard-menu-margin`               | `calc(var(--mp-field-size-placeholder) * 0.75 + 14px) 0 0 0` |

#### Option Variables

| 变量名                         | 默认值                               |
| ------------------------------ | ------------------------------------ |
| `--option-height`              | `38px`                               |
| `--option-padding`             | `0 12px`                             |
| `--option-font-size`           | `16px`                               |
| `--option-selected-background` | `var(--input-decorator-focus-color)` |
| `--option-text-color`          | `#555`                               |

## Option

### API

#### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `label` | 选项显示的文本 | _any_ | `-` |
| `value` | 选项绑定的值 | _any_ | `-` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `ripple` ***3.8.0***  | 是否启用水波效果 | _boolean_ | `true` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 选项显示的内容 | `selected: boolean` 是否选中 |
