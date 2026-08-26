# 输入框

### 介绍

用于输入单行文本。组件支持多种外观、浮动提示、输入类型、状态以及前后缀内容。

### 基础用法

```html
<mp-input v-model="value" placeholder="请输入内容" />
<mp-input v-model="clearableValue" clearable placeholder="可清除文本" />
```

### 外观变体

```html
<mp-input variant="filled" placeholder="填充外观" />
<mp-input variant="outlined" placeholder="描边外观" />
<mp-input variant="standard" placeholder="标准外观" />
```

### 提示文字

`hint` 不依赖特定外观。开启时，placeholder 会在输入框聚焦或有值时作为提示文字上浮；关闭时保持原生占位符行为。

```html
<mp-input variant="filled" placeholder="用户名" />
<mp-input variant="outlined" placeholder="用户名" />
<mp-input variant="standard" placeholder="用户名" />

<mp-input variant="filled" :hint="false" placeholder="用户名" />
<mp-input variant="outlined" :hint="false" placeholder="用户名" />
<mp-input variant="standard" :hint="false" placeholder="用户名" />
```

### 输入类型

```html
<mp-input type="text" placeholder="请输入文本" />
<mp-input type="number" placeholder="请输入数字" />
<mp-input type="tel" placeholder="请输入手机号" />
<mp-input type="email" placeholder="请输入邮箱" />
<mp-input type="password" placeholder="请输入密码" />
```

### 尺寸

```html
<template v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size">
  <mp-input v-for="variant in ['filled', 'outlined', 'standard']" :key="variant" :size="size" :variant="variant" />
</template>
```

### 状态

```html
<mp-input model-value="Maple Design" readonly /> <mp-input model-value="Maple Design" disabled />
```

### 前缀和后缀

```html
<mp-input placeholder="请输入手机号"><template #prefix>+86</template></mp-input>
<mp-input placeholder="请输入金额"><template #suffix>RMB</template></mp-input>
```

### 字数限制

```html
<mp-input v-model="value" :max-length="10" clearable />
```

### 自定义清除图标

```html
<mp-input v-model="value" clearable>
  <template #clear-icon="{ clear }">
    <m-icon-error @click="clear" />
  </template>
</mp-input>
```

### 输入修饰符与原生属性

```html
<mp-input v-model.trim="value" />
<mp-input
  type="email"
  autocomplete="email"
  enterkeyhint="next"
  aria-label="邮箱"
  :input-attrs="{ name: 'email', autocapitalize: 'none' }"
/>
```

## API

### 属性

| 参数           | 说明                                                        | 类型               | 默认值     |
| -------------- | ----------------------------------------------------------- | ------------------ | ---------- |
| `v-model`      | 绑定值                                                      | _string_           | `-`        |
| `type`         | 输入类型，可选值为 `text` `password` `number` `tel` `email` | _string_           | `text`     |
| `placeholder`  | 占位符，也可作为浮动提示文字                                | _string_           | `-`        |
| `size`         | 尺寸，可选值为 `xs` `sm` `md` `lg` `xl`                     | _ComponentSize_    | `md`       |
| `variant`      | 外观，可选值为 `filled` `outlined` `standard`               | _string_           | `standard` |
| `hint`         | 是否将 placeholder 用作浮动提示文字                         | _boolean_          | `true`     |
| `line`         | 是否显示分割线                                              | _boolean_          | `true`     |
| `max-length`   | 最大输入长度并显示字数统计                                  | _string \| number_ | `-`        |
| `readonly`     | 是否只读                                                    | _boolean_          | `false`    |
| `disabled`     | 是否禁用                                                    | _boolean_          | `false`    |
| `clearable`    | 是否可清除                                                  | _boolean_          | `false`    |
| `autofocus`    | 是否自动聚焦                                                | _boolean_          | `false`    |
| `enterkeyhint` | 移动端回车键提示                                            | _string_           | `-`        |
| `autocomplete` | 原生自动填充策略                                            | _string_           | `off`      |
| `aria-label`   | 输入框无障碍标签                                            | _string_           | `-`        |
| `input-attrs`  | 透传给原生 input 的属性                                     | _object_           | `-`        |
| `text-color`   | 文字颜色                                                    | _string_           | `-`        |
| `focus-color`  | 聚焦颜色                                                    | _string_           | `-`        |
| `blur-color`   | 失焦颜色                                                    | _string_           | `-`        |

校验规则配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 事件

| 事件名    | 说明             | 参数                          |
| --------- | ---------------- | ----------------------------- |
| `focus`   | 聚焦时触发       | `event: FocusEvent`           |
| `blur`    | 失焦时触发       | `event: FocusEvent`           |
| `click`   | 点击时触发       | `event: Event`                |
| `clear`   | 清除时触发       | `value: string`               |
| `input`   | 输入时触发       | `value: string, event: Event` |
| `change`  | 值提交变更时触发 | `value: string, event: Event` |
| `keydown` | 按键时触发       | `event: KeyboardEvent`        |

### 插槽

| 插槽名       | 说明     | 参数                |
| ------------ | -------- | ------------------- |
| `prefix`     | 前缀     | `-`                 |
| `suffix`     | 后缀     | `-`                 |
| `clear-icon` | 清除图标 | `clear: () => void` |

### 样式变量

Input 自身提供以下变量；容器外观相关变量请参考 [FieldDecorator](#/zh-CN/field-decorator)。

| 变量名                    | 默认值 |
| ------------------------- | ------ |
| `--input-input-height`    | `24px` |
| `--input-input-font-size` | `16px` |
