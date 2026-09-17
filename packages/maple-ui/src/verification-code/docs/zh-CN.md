# VerificationCode 验证码输入

### 介绍

用于输入短信验证码、邮箱验证码等多位短码。公共 API 与 Cedar `VerificationCode` 对齐，`v-model` 始终是完整字符串。

### 基本使用

```demo
../example/demos/basic.vue
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定值 | _string_ | `-` |
| `default-value` | 默认值（非受控） | _string_ | `''` |
| `length` | 验证码位数 | _number_ | `6` |
| `size` | 尺寸，可选值为 `xs` `sm` `md` `lg` `xl` | _string_ | `md` |
| `type` | 输入类型，可选值为 `digit` `text` `alphanumeric`（Maple） | _string_ | `digit` |
| `variant` | 风格，可选值为 `standard` `outline`（Maple） | _string_ | `outline` |
| `masked` | 是否密码模式 | _boolean_ | `false` |
| `mask-symbol` | 掩码字符（Maple） | _string_ | `•` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `readonly` | 是否只读 | _boolean_ | `false` |
| `error` | 是否为错误状态 | _boolean_ | `false` |
| `autofocus` | 初始化后是否自动聚焦（Maple） | _boolean_ | `false` |
| `gutter` | 格子间距（Maple） | _string \| number_ | `8` |
| `align` | 对齐方式，可选值为 `start` `center` `end`（Maple） | _string_ | `center` |
| `allow-paste` | 是否允许粘贴（Maple） | _boolean_ | `true` |
| `paste-transform` | 粘贴内容转换器（Maple） | _(value: string) => string_ | `-` |
| `separator` | 分隔符渲染函数 | _(index: number, character: string) => VNode \| string \| null_ | `-` |
| `formatter` | 格式化函数 | _(inputValue: string, index: number, value: string) => string \| boolean_ | `-` |
| `aria-label` | 无障碍标签 | _string_ | `-` |
| `text-color` | 文字颜色（Maple） | _string_ | `-` |
| `focus-color` | 聚焦颜色（Maple） | _string_ | `-` |
| `blur-color` | 失焦颜色（Maple） | _string_ | `-` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `change` | 值变化时触发 | `value: string` |
| `finish` | 填满时触发 | `value: string` |
| `input` | 单格输入时触发 | `inputValue: string`, `index: number`, `ev: Event` |
| `click` | 点击根节点时触发（Maple） | `event: Event` |
| `paste` | 粘贴时触发（Maple） | `value: string`, `event: ClipboardEvent` |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `focus` | 聚焦到首个空位或指定位置 | `index?: number` |
| `blur` | 失焦 | `-` |
| `reset` | 清空值 | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `separator` | 自定义分隔位 | `index: number`, `character: string` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-verification-code-gutter` | `8px` |
| `--mp-verification-code-cell-height` | `48px` |
| `--mp-verification-code-cell-max-width` | `48px` |
| `--mp-verification-code-input-font-size` | `20px` |
