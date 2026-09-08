# 输入框

Input 是用于单行文本输入的基础控件。它在移动端输入体验的基础上，统一了外观、值模型、长度限制、清除操作和表单联动方式。

组件示例页提供了完整的可交互演示，覆盖受控与非受控值、浮动占位符、输入类型、尺寸、状态、插槽、事件、原生属性和无障碍关联。

## 设计要点

- 默认外观为 `outlined`；`filled` 和 `standard` 适合有明确层级需求的场景。
- `clearable` 默认关闭。需要快速重置搜索、筛选条件时再开启。
- `v-model` 适合实时联动；`default-value` 适合只需要提供初始内容的独立控件。
- Maple 支持 placeholder 浮动和不浮动两种模式；Cedar（PC）不提供浮动 placeholder，跨端业务应以各端交互习惯为准。

## 基础用法

```html
<mp-input v-model="value" placeholder="请输入内容" />
<mp-input v-model="clearableValue" clearable placeholder="可清除文本" />
```

## 值模型

### 受控值与非受控初始值

使用 `v-model` 时，父组件持有当前值，适用于搜索、表单联动和实时预览。使用 `default-value` 时，组件读取初始值后自行维护内部状态，适用于不需要持续同步的轻量输入。

```html
<mp-input v-model="keyword" placeholder="受控输入" />
<mp-input default-value="初始内容" placeholder="非受控输入" />
```

两种模式不要同时使用。值模型始终是 `string`：即使 `type="number"`，也不会把输入强制转换为 JavaScript number。

## 外观与提示

### 外观变体

```html
<mp-input variant="filled" placeholder="填充外观" />
<mp-input variant="outlined" placeholder="描边外观" />
<mp-input variant="standard" placeholder="标准外观" />
```

### 浮动与不浮动的 placeholder

`hint` 默认开启。开启时，placeholder 会在聚焦或已有值时上浮为提示文字；关闭时，placeholder 保持原生占位符行为。`line` 控制移动端输入区域底部分割线，可独立于 `hint` 设置。

```html
<!-- 浮动提示 -->
<mp-input hint placeholder="用户名" />

<!-- 原生占位符，不浮动 -->
<mp-input :hint="false" placeholder="用户名" />

<!-- 无底部分割线 -->
<mp-input :line="false" placeholder="无分割线" />
```

## 输入类型

```html
<mp-input v-model="text" type="text" placeholder="请输入文本" />
<mp-input v-model="amount" type="number" placeholder="请输入数字" />
<mp-input v-model="phone" type="tel" placeholder="请输入手机号" />
<mp-input v-model="email" type="email" placeholder="请输入邮箱" />
<mp-input v-model="password" type="password" placeholder="请输入密码" />
```

`number` 主要用于唤起适合数字输入的键盘并提供输入语义；如果业务需要数值计算，请在提交或校验边界显式转换，并处理空值、小数和非法输入。

## 尺寸与状态

```html
<mp-input size="xs" placeholder="Extra small" />
<mp-input size="sm" placeholder="Small" />
<mp-input size="md" placeholder="Medium" />
<mp-input size="lg" placeholder="Large" />
<mp-input size="xl" placeholder="Extra large" />

<mp-input model-value="Maple Design" readonly />
<mp-input model-value="Maple Design" disabled />
<mp-input model-value="Invalid value" error />
```

`readonly` 仍可聚焦和复制，`disabled` 不参与当前交互流程。`error` 只表达错误视觉状态，业务校验规则和错误文案应由 FormItem 负责。

## 前缀、后缀与清除

```html
<mp-input placeholder="请输入手机号">
  <template #prefix>+86</template>
</mp-input>

<mp-input placeholder="请输入金额">
  <template #suffix>RMB</template>
</mp-input>

<mp-input v-model="keyword" clearable placeholder="请输入搜索内容">
  <template #prefix><m-icon-magnify /></template>
</mp-input>
```

清除按钮只在 `clearable` 开启、输入框有值且可编辑时出现。自定义清除内容时，优先使用可聚焦、可按 Enter/Space 操作的按钮：

```html
<mp-input v-model="value" clearable>
  <template #clear-icon="{ clear }">
    <button type="button" aria-label="清除" @click="clear">×</button>
  </template>
</mp-input>
```

## 字数限制与统计

数字形式是默认截断模式；对象形式配合 `errorOnly: true` 时保留超出内容，仅标记错误。`show-word-limit` 负责显示统计信息，默认关闭。

```html
<!-- 超出后截断 -->
<mp-input v-model="title" :max-length="10" show-word-limit />

<!-- 允许继续编辑，超出后显示错误 -->
<mp-input v-model="description" :max-length="{ length: 100, errorOnly: true }" show-word-limit />
```

当长度规则不是 JavaScript 的字符串长度时，同时提供计算和截取方法：

```html
<mp-input
  v-model="value"
  :max-length="20"
  :word-length="(text) => [...text].length"
  :word-slice="(text, max) => [...text].slice(0, max).join('')"
  show-word-limit
/>
```

## 事件语义

| 事件                | 触发时机                                    | 建议用途                 |
| ------------------- | ------------------------------------------- | ------------------------ |
| `update:modelValue` | 值模型更新时                                | 同步 `v-model`           |
| `input`             | 用户每次输入时                              | 实时搜索、联动、字数反馈 |
| `change`            | 失焦或按下 Enter 提交编辑时；同一轮编辑去重 | 搜索提交、提交校验       |
| `press-enter`       | 用户按下 Enter 时                           | 移动端键盘提交动作       |
| `keydown`           | 任意按键时，保留作原生兼容事件              | 快捷键等低层交互         |
| `clear`             | 用户触发清除时                              | 清除后的搜索、筛选或校验 |
| `focus` / `blur`    | 获得/失去焦点时                             | 聚焦态、埋点或校验时机   |

`change` 不是每次输入都会触发的实时事件。它只在一次编辑结束时提交，并且同一轮编辑不会因为 Enter 后紧接着失焦而重复触发。`clear` 会清空值并触发值模型更新，但不会额外伪造一次 `input` 或 `change`。

```html
<mp-input
  v-model="keyword"
  clearable
  @input="handleInput"
  @change="handleChange"
  @press-enter="submit"
  @clear="resetSearch"
/>
```

## 表单校验边界

Input 负责输入交互，不主动决定业务规则。将规则配置在 `mp-form-item` 上，由表单项统一处理校验时机和错误消息：

```html
<mp-form :model="form">
  <mp-form-item
    field="email"
    label="邮箱"
    :rules="[{ required: true, message: '请输入邮箱' }]"
    :validate-trigger="['blur', 'change']"
  >
    <mp-input v-model="form.email" type="email" />
  </mp-form-item>
</mp-form>
```

如果只需要视觉提示，可以使用 `error`；如果需要规则、消息和提交阻断，应使用 Form/FormItem。

## 原生属性与无障碍

组件公开的 `autofocus`、`enterkeyhint` 和 `autocomplete` 可直接使用；其他原生属性通过 `input-attrs` 透传：

```html
<label for="email">邮箱地址</label>
<mp-input
  id="email"
  type="email"
  autocomplete="email"
  enterkeyhint="next"
  :input-attrs="{
    name: 'email',
    autocapitalize: 'none',
    'aria-describedby': 'email-help',
  }"
/>
<p id="email-help">用于接收登录和通知邮件</p>
```

优先使用可见 `label` 与输入框 id 关联；没有可见标签时提供 `aria-label`。帮助文本和错误文本使用 `aria-describedby` 关联。自定义 `clear-icon` 时必须保留键盘可操作性和明确的辅助技术名称。

## API

### 属性

| 参数              | 说明                                                     | 类型               |   默认值   |
| ----------------- | -------------------------------------------------------- | ------------------ | :--------: |
| `v-model`         | 受控绑定值                                               | `string`           |    `-`     |
| `default-value`   | 非受控模式下的初始值                                     | `string`           |    `''`    |
| `type`            | `text`、`password`、`number`、`tel` 或 `email`           | `InputType`        |   `text`   |
| `placeholder`     | 占位符，也可作为浮动提示文字                             | `string`           |    `-`     |
| `size`            | `xs`、`sm`、`md`、`lg` 或 `xl`                           | `ComponentSize`    |    `md`    |
| `variant`         | `filled`、`outlined` 或 `standard`                       | `string`           | `outlined` |
| `hint`            | 是否将 placeholder 用作浮动提示文字                      | `boolean`          |   `true`   |
| `line`            | 是否显示底部分割线                                       | `boolean`          |   `true`   |
| `max-length`      | 最大输入长度；默认截断，`errorOnly` 时允许超出并显示错误 | `number \| object` |    `0`     |
| `show-word-limit` | 是否显示字数统计                                         | `boolean`          |  `false`   |
| `word-length`     | 自定义字数计算方法                                       | `function`         |    `-`     |
| `word-slice`      | 自定义超长截取方法                                       | `function`         |    `-`     |
| `readonly`        | 是否只读                                                 | `boolean`          |  `false`   |
| `disabled`        | 是否禁用                                                 | `boolean`          |  `false`   |
| `error`           | 是否显示错误状态                                         | `boolean`          |  `false`   |
| `clearable`       | 是否可清除                                               | `boolean`          |  `false`   |
| `autofocus`       | 是否自动聚焦                                             | `boolean`          |  `false`   |
| `enterkeyhint`    | 移动端回车键提示                                         | `string`           |    `-`     |
| `autocomplete`    | 原生自动填充策略                                         | `string`           |   `off`    |
| `aria-label`      | 输入框无障碍标签                                         | `string`           |    `-`     |
| `input-attrs`     | 透传给原生 input 的属性                                  | `object`           |    `-`     |
| `text-color`      | 文字颜色                                                 | `string`           |    `-`     |
| `focus-color`     | 聚焦颜色                                                 | `string`           |    `-`     |
| `blur-color`      | 失焦颜色                                                 | `string`           |    `-`     |

校验规则配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 事件

| 事件名        | 说明                            | 参数                          |
| ------------- | ------------------------------- | ----------------------------- |
| `focus`       | 聚焦时触发                      | `event: FocusEvent`           |
| `blur`        | 失焦时触发                      | `event: FocusEvent`           |
| `clear`       | 清除时触发                      | `event: Event`                |
| `input`       | 输入时触发                      | `value: string, event: Event` |
| `change`      | 仅在失焦或按下 Enter 时提交变更 | `value: string, event: Event` |
| `press-enter` | 按下 Enter 时触发               | `event: KeyboardEvent`        |
| `keydown`     | 按键时触发（兼容性事件）        | `event: KeyboardEvent`        |

### 插槽

| 插槽名       | 说明           | 参数                |
| ------------ | -------------- | ------------------- |
| `prefix`     | 前缀内容       | `-`                 |
| `suffix`     | 后缀内容       | `-`                 |
| `clear-icon` | 清除图标或按钮 | `clear: () => void` |

### 样式变量

Input 自身提供以下变量；容器外观相关变量请参考 [FieldDecorator](#/zh-CN/field-decorator)。

| 变量名                    | 默认值 |
| ------------------------- | ------ |
| `--input-input-height`    | `24px` |
| `--input-input-font-size` | `16px` |
