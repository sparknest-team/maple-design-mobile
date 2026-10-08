# 文本域

### 介绍

多行纯文本编辑控件，适用于评论、反馈等较长内容的输入。

### 基础用法

```demo
../example/demos/demo-1.vue
```

### 外边框与字数限制

```demo
../example/demos/demo-5.vue
```

### 外观

```demo
../example/demos/demo-2.vue
```

### Hint

```demo
../example/demos/demo-3.vue
```

### 尺寸

```demo
../example/demos/demo-4.vue
```

### 状态

```demo
../example/demos/demo-6.vue
```

## API

### 属性

| 参数              | 说明                               | 类型                                                | 默认值     |
| ----------------- | ---------------------------------- | --------------------------------------------------- | ---------- |
| `v-model`         | 受控绑定值                         | _string_                                            | `-`        |
| `default-value`   | 非受控模式初始值                   | _string_                                            | `''`       |
| `model-modifiers` | v-model 修饰符；支持 `trim`        | _object_                                            | `{}`       |
| `placeholder`     | 占位提示文字                       | _string_                                            | `-`        |
| `variant`         | `filled \| outline \| standard`    | _string_                                            | `outline`  |
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

在 Form/FormItem 内未显式设置时，`size`、`disabled`、`readonly` 和 `error` 会继承表单状态；组件本地传入的值（包括 `false`）优先。

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

| 变量名                                         | 默认值                           |
| ---------------------------------------------- | -------------------------------- |
| `--mp-textarea-height`                         | `auto`                           |
| `--mp-textarea-min-height`                     | `96px`                           |
| `--mp-textarea-font-size`                      | `16px`                           |
| `--mp-textarea-line-height`                    | `1.5`                            |
| `--mp-textarea-padding-horizontal`             | `0`                              |
| `--mp-textarea-padding-vertical`               | `0`                              |
| `--mp-textarea-placeholder-color`              | `--mp-sys-color-content-secondary`|
| `--mp-textarea-counter-color`                  | `--mp-sys-color-content-secondary`|
| `--mp-textarea-counter-font-size`              | `--mp-sys-font-size-xs`          |
| `--mp-textarea-counter-margin-top`              | `--mp-sys-space-2`               |

计数器布局为显式平台差异：Cedar 内置计数器使用 counter-inset-inline-end、counter-inset-block-end 与 scrollbar-offset；Maple 外置计数行使用 counter-margin-top。仅公开本端真实生效的布局变量，颜色与字号语义仍保持共享。
