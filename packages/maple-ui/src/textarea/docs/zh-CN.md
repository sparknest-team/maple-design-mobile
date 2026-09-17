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

| 参数             | 说明                       | 类型                            | 默认值     |
| ---------------- | -------------------------- | ------------------------------- | ---------- |
| `v-model`        | 绑定值                     | _string_                        | `-`        |
| `placeholder`    | 占位符                     | _string_                        | `-`        |
| `rows`           | 显示行数                   | _string \| number_              | `8`        |
| `max-length`     | 最大输入长度               | _string \| number_              | `-`        |
| `size`           | 尺寸                       | `xs \| sm \| md \| lg \| xl`    | `md`       |
| `variant`        | 外观                       | `filled \| outline \| standard` | `standard` |
| `readonly`       | 是否只读                   | _boolean_                       | `false`    |
| `disabled`       | 是否禁用                   | _boolean_                       | `false`    |
| `clearable`      | 是否可清除                 | _boolean_                       | `false`    |
| `resize`         | 是否允许垂直拖动调整尺寸   | _boolean_                       | `false`    |
| `autofocus`      | 是否自动聚焦               | _boolean_                       | `false`    |
| `textarea-attrs` | 透传给原生 textarea 的属性 | _object_                        | `-`        |

### 事件

| 事件名   | 说明         | 参数                          |
| -------- | ------------ | ----------------------------- |
| `focus`  | 聚焦时触发   | `event: FocusEvent`           |
| `blur`   | 失焦时触发   | `event: FocusEvent`           |
| `input`  | 输入时触发   | `value: string, event: Event` |
| `change` | 值变化时触发 | `value: string, event: Event` |
| `clear`  | 清空时触发   | `value: string`               |

### 方法

| 方法名  | 说明 |
| ------- | ---- |
| `focus` | 聚焦 |
| `blur`  | 失焦 |

### 样式变量

| 变量                              | 默认值 |
| --------------------------------- | ------ |
| `--mp-textarea-height`            | `auto` |
| `--mp-textarea-min-height`        | `96px` |
| `--mp-textarea-font-size`         | `16px` |
| `--mp-textarea-length-margin-top` | `4px`  |
| `--mp-textarea-length-font-size`  | `12px` |
