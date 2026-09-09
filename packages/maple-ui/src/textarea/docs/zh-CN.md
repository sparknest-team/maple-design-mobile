# 文本域

### 介绍

多行纯文本编辑控件，适用于评论、反馈和说明等较长内容。默认使用 `outlined` 外观，`clearable` 默认关闭。

### 基础用法与值模型

`v-model` 用于受控值；`default-value` 只提供非受控初始值。`v-model.trim` 会在失焦提交时去除首尾空白。

```html
<script setup>
  import { ref } from 'vue'

  const value = ref('')
</script>

<template>
  <mp-textarea v-model="value" placeholder="请输入多行文本" />
  <mp-textarea default-value="初始内容" />
  <mp-textarea v-model.trim="value" />
</template>
```

### 长度限制

数字形式会截断用户输入；`errorOnly: true` 保留超长内容并进入错误态。通过 `show-word-limit` 控制计数显示。

```html
<mp-textarea v-model="value" :max-length="100" show-word-limit />
<mp-textarea v-model="value" :max-length="{ length: 100, errorOnly: true }" show-word-limit />
```

### 行数与自动高度

`rows` 使用原生可见行数语义。Maple 默认禁止手动调整高度；开启 `auto-size` 后由内容决定高度，并可限制最小/最大行数。

```html
<mp-textarea :rows="4" />
<mp-textarea auto-size />
<mp-textarea :auto-size="{ minRows: 2, maxRows: 6 }" />
```

### 事件语义

`update:modelValue` 先于 `input`。IME 输入在 composition 结束后才触发；`change` 只在失焦且值变化时触发；Enter 保持换行语义。清空只触发值更新和 `clear(event)`，不会额外触发 `input/change`。

## API

### 属性

| 参数              | 说明                               | 类型                                                | 默认值     |
| ----------------- | ---------------------------------- | --------------------------------------------------- | ---------- |
| `v-model`         | 受控绑定值                         | _string_                                            | `-`        |
| `default-value`   | 非受控模式初始值                   | _string_                                            | `''`       |
| `model-modifiers` | v-model 修饰符；支持 `trim`        | _object_                                            | `{}`       |
| `placeholder`     | 占位提示文字                       | _string_                                            | `-`        |
| `variant`         | `filled \| outlined \| standard`   | _string_                                            | `outlined` |
| `size`            | `xs \| sm \| md \| lg \| xl`       | _string_                                            | `md`       |
| `clearable`       | 是否允许清空                       | _boolean_                                           | `false`    |
| `disabled`        | 是否禁用                           | _boolean_                                           | `false`    |
| `readonly`        | 是否只读                           | _boolean_                                           | `false`    |
| `error`           | 是否显示错误状态                   | _boolean_                                           | `false`    |
| `rows`            | 原生可见行数                       | _string \| number_                                  | `-`        |
| `resize`          | 是否允许纵向拖动调整尺寸           | _boolean_                                           | `false`    |
| `auto-size`       | 自动高度，可设置最小/最大行数      | _boolean \| { minRows?: number; maxRows?: number }_ | `false`    |
| `max-length`      | 最大长度；对象形式可启用仅错误模式 | _number \| { length: number; errorOnly?: boolean }_ | `0`        |
| `show-word-limit` | 是否显示字数统计                   | _boolean_                                           | `false`    |
| `word-length`     | 自定义长度计算方法                 | _(value: string) => number_                         | `-`        |
| `word-slice`      | 自定义截取方法                     | _(value: string, maxLength: number) => string_      | `-`        |
| `aria-label`      | 无可见标签时提供的可访问名称       | _string_                                            | `-`        |
| `autofocus`       | 是否自动聚焦                       | _boolean_                                           | `false`    |
| `enterkeyhint`    | 虚拟键盘回车键提示                 | _string_                                            | `-`        |
| `textarea-attrs`  | 内部 textarea 元素的补充原生属性   | _object_                                            | `-`        |
| `hint`            | 是否使用移动端浮动 placeholder     | _boolean_                                           | `true`     |
| `line`            | 是否显示装饰线                     | _boolean_                                           | `true`     |
| `text-color`      | 自定义文字颜色                     | _string_                                            | `-`        |
| `focus-color`     | 自定义聚焦颜色                     | _string_                                            | `-`        |
| `blur-color`      | 自定义失焦颜色                     | _string_                                            | `-`        |

### 事件

| 事件名    | 说明                                | 参数                          |
| --------- | ----------------------------------- | ----------------------------- |
| `input`   | IME 完成后的用户输入                | `value: string, event: Event` |
| `change`  | 失焦提交且值变化时触发              | `value: string, event: Event` |
| `keydown` | 用户按键时触发；Enter 不提交 change | `event: KeyboardEvent`        |
| `clear`   | 用户清空时触发，不伴随 input/change | `event: Event`                |
| `focus`   | 获得焦点时触发                      | `event: FocusEvent`           |
| `blur`    | 失去焦点时触发                      | `event: FocusEvent`           |

### 插槽

| 插槽名       | 说明           | 参数                             |
| ------------ | -------------- | -------------------------------- |
| `prefix`     | 前缀元素       | `-`                              |
| `suffix`     | 后缀元素       | `-`                              |
| `clear-icon` | 清除图标或按钮 | `clear: (event?: Event) => void` |

### 方法

| 方法名  | 说明                     |
| ------- | ------------------------ |
| `focus` | 使内部 textarea 获取焦点 |
| `blur`  | 使内部 textarea 失去焦点 |

### 类型定义

```ts
import type {
  TextareaAutoSize,
  TextareaMaxLength,
  TextareaProps,
  TextareaVariant,
  WordLength,
  WordSlice,
} from '@maplejs/maple-ui'
```

### 样式变量

| 变量                              | 默认值 |
| --------------------------------- | ------ |
| `--mp-textarea-height`            | `auto` |
| `--mp-textarea-min-height`        | `96px` |
| `--mp-textarea-font-size`         | `16px` |
| `--mp-textarea-length-margin-top` | `4px`  |
| `--mp-textarea-length-font-size`  | `12px` |
