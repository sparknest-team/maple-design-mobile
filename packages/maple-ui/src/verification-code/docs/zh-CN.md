# VerificationCode 验证码输入

### 介绍

用于输入短信验证码、邮箱验证码等多位短码。公共 API 与 Cedar `VerificationCode` 对齐，`v-model` 始终是完整字符串。

### 基本使用

```html
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <mp-verification-code v-model="value" />
</template>
```

### 密码模式

通过 `masked` 开启掩码显示。

```html
<script setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <mp-verification-code v-model="value" masked />
</template>
```

### 输入类型

通过 `type` 切换数字、字母和字母数字混合（Maple 端能力，默认 `digit`）。

```html
<template>
  <mp-space direction="column" size="lg">
    <mp-verification-code v-model="digitValue" type="digit" />
    <mp-verification-code v-model="textValue" type="text" />
    <mp-verification-code v-model="mixedValue" type="alphanumeric" />
  </mp-space>
</template>
```

### 自定义分隔符

可用 `separator` prop 或 `#separator` 插槽。

```html
<script setup>
import { h, ref } from 'vue'

const value = ref('')
</script>

<template>
  <mp-verification-code
    v-model="value"
    type="alphanumeric"
    :separator="(index) => (index === 2 ? h('span', '-') : null)"
  />

  <mp-verification-code v-model="value" type="alphanumeric" style="margin-top: 16px">
    <template #separator="{ index }">
      <span v-if="index === 2">-</span>
    </template>
  </mp-verification-code>
</template>
```

### 格式化输入

通过 `formatter` 校验或改写输入（与 Cedar 一致）。

```html
<template>
  <mp-verification-code
    v-model="value"
    type="text"
    :formatter="(inputValue) => (/^\d*$/.test(inputValue) ? inputValue : false)"
  />
</template>
```

### 完成事件

填满 `length` 时触发 `finish`。

```html
<script setup>
import { Message } from '@maplejs/maple-ui'
import { ref } from 'vue'

const value = ref('')

function handleFinish(code) {
  Message.success(`输入完成：${code}`)
}
</script>

<template>
  <mp-verification-code v-model="value" @finish="handleFinish" />
</template>
```

### 配合数字键盘

```html
<script setup>
import { ref } from 'vue'

const value = ref('')
const show = ref(false)
</script>

<template>
  <mp-verification-code v-model="value" readonly @click="show = true" />
  <mp-number-keyboard v-model="value" v-model:open="open" :max-length="6" />
</template>
```

### 配合表单

```html
<script setup>
import { ref } from 'vue'

const form = ref({ code: '' })
</script>

<template>
  <mp-form>
    <mp-form-item
      field="code"
      label="验证码"
      :rules="[(v) => (v && v.length === 6) || '请输入 6 位验证码']"
    >
      <mp-verification-code v-model="form.code" />
    </mp-form-item>
  </mp-form>
</template>
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
| `variant` | 风格，可选值为 `standard` `outlined`（Maple） | _string_ | `outlined` |
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
