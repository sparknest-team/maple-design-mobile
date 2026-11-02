<!-- Source: src/textarea/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/textarea -->

# 文本域

所有原生输入统一使用 `autocomplete="off"`，传入原生属性也不会开启自动填充。

## 案例

### 介绍

多行纯文本编辑控件，适用于评论、反馈等较长内容的输入。

默认长度按 UTF-16 码元计算（emoji 通常占 2）；默认截断不会拆开有效的代理对，边界不足时舍去整个字符。若需按用户感知字符（字素簇）计数和裁剪，请配套提供 `word-length` 与 `word-slice`；自定义裁剪结果由业务负责。

### 基础用法与值模型

`v-model` 用于受控值；`default-value` 只提供非受控初始值。第三个输入框使用 `v-model.trim`，失焦后去除首尾空白。下方文字分别显示受控值和去除空白后的值。

Example source: src/textarea/example/demos/demo-1.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const trimmed = ref('')
</script>
<template>
  <mp-space direction="column">
    <mp-textarea v-model="value" clearable placeholder="请输入多行文本" aria-label="受控文本" />
    <p role="status">当前值：{{ value || '（空）' }}</p>
    <mp-textarea default-value="这是一段非受控初始文本" aria-label="非受控文本" />
    <mp-textarea v-model.trim="trimmed" placeholder="输入首尾空白，失焦后去除" aria-label="去除首尾空白" />
    <p role="status">去除空白后的值：{{ JSON.stringify(trimmed) }}</p>
  </mp-space>
</template>
```

### 外边框与字数限制

Example source: src/textarea/example/demos/demo-5.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const limitedValue = ref('')
</script>

<template>
  <p>长度按 UTF-16 码元计算；边界不足时舍去整个 emoji，不拆开代理对。</p>
  <mp-textarea
    v-model="limitedValue"
    clearable
    :max-length="100"
    show-word-limit
    placeholder="最多输入 100 个字符"
    resize
    :rows="4"
    variant="outline"
  />
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 外观

Example source: src/textarea/example/demos/demo-2.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const filledValue = ref('')
const outlineValue = ref('')
const standardValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="filledValue" :rows="3" variant="filled" placeholder="填充外观" />
    <mp-textarea v-model="outlineValue" :rows="3" variant="outline" placeholder="描边外观" />
    <mp-textarea v-model="standardValue" :rows="3" variant="standard" placeholder="标准外观" />
  </mp-space>
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### Hint

Example source: src/textarea/example/demos/demo-3.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const hintValue = ref('')
const noHintValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea v-model="hintValue" hint :rows="3" placeholder="聚焦或有值时上浮" />
    <mp-textarea v-model="noHintValue" :hint="false" :rows="3" placeholder="作为原生占位符展示" />
  </mp-space>
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 尺寸

Example source: src/textarea/example/demos/demo-4.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const sizeValues = reactive(Object.fromEntries(sizes.map((size) => [size, ''])))
</script>

<template>
  <template v-for="size in sizes" :key="size">
    <div class="textarea-example__caption">{{ size }}</div>
    <mp-textarea v-model="sizeValues[size]" :rows="2" :size="size" variant="outline" :placeholder="`${size} 尺寸`" />
  </template>
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 状态

Example source: src/textarea/example/demos/demo-6.vue

```vue
<script setup></script>

<template>
  <mp-space direction="column" :size="[16, 0]">
    <mp-textarea model-value="只读状态" readonly :rows="3" />
    <mp-textarea model-value="禁用状态" disabled :rows="3" />
  </mp-space>

  <div class="textarea-example__bottom-space" />
</template>

<style lang="less" scoped>
.textarea-example {
  &__caption {
    margin: 16px 0 8px;
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 主体与事件契约

两端维护独立复制的主体。输入按 input → update:modelValue 通知；清空按 clear → input → update:modelValue → change 通知，各一次，Form 对应语义也各接收一次。只读、禁用和组合输入期间禁止清空。受控提议被拒绝后恢复原生内容，包括不支持光标 API 的输入类型。

Example source: src/textarea/example/demos/body-contract.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('可编辑内容')
const events = ref<string[]>([])
const record = (name: string) => {
  events.value = [...events.value.slice(-7), name]
}
</script>
<template>
  <div class="textarea-body-demo">
    <mp-textarea
      v-model="value"
      hint
      clearable
      placeholder="工作备注"
      :auto-size="{ minRows: 2, maxRows: 5 }"
      :max-length="100"
      show-word-limit
      @clear="record('clear')"
      @input="record('input')"
      @update:model-value="record('update:modelValue')"
      @change="record('change')"
    />
    <mp-textarea :line="false" hint placeholder="无边框提示" focus-color="#137547" :rows="2" />
    <p>Enter 保持换行；失焦提交 change；清空完整通知一次。</p>
    <output>{{ events.join(' → ') || '等待操作' }}</output>
  </div>
</template>
<style scoped>
.textarea-body-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.textarea-body-demo p {
  margin: 0;
}
</style>
```

### 外观组合

适用于备注、说明等多行输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/textarea/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('这是一段可以编辑的多行内容。')
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>variant</span
        ><mp-select
          v-model="__demoAppearance['variant']"
          :clearable="false"
          :options="[
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          aria-label="variant"
        />
      </div>
      <div>
        <span>size</span
        ><mp-select
          v-model="__demoAppearance['size']"
          :clearable="false"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          aria-label="size"
        />
      </div>
    </mp-space>
    <mp-textarea v-model="value" v-bind="__demoAppearance"></mp-textarea>
  </mp-space>
</template>
```

### 交互状态切换

适用于备注、说明等多行输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/textarea/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('这是一段可以编辑的多行内容。')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-textarea v-model="value" v-bind="__demoState"></mp-textarea>
  </mp-space>
</template>
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
| `disabled`        | 是否禁用                           | _boolean_                                           | `undefined` |
| `readonly`        | 是否只读                           | _boolean_                                           | `undefined` |
| `error`           | 是否显示错误状态                   | _boolean_                                           | `undefined` |
| `rows`            | 原生可见行数，仍受 min-height Token 约束                       | _string \| number_                                  | `-`        |
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
| `hint` | 浮动提示；未设置时继承分组/库默认 | _boolean_ | `undefined` |
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
| `clear`   | 用户清空时触发，按 clear → input → update:model-value → change 通知 | `event: Event`                |
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
} from '@maple-design/ui'
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


### 原生布局与公开类型

size 支持 xs/sm/md/lg/xl 的 FieldDecorator 外壳密度；文本域高度/文字度量仍由 rows、auto-size 和 Textarea Token 控制。Cedar 默认允许手动 resize，Maple 默认关闭。继承 InputGroup 与 Form 状态，子项显式值优先；提供 focus(options?)、blur()、select() 和 textareaRef。

`TextareaProps`、`TextareaVariant`、`TextareaMaxLength`、`TextareaAutoSize`、`TextareaEmits`、`TextareaSlots`、`TextareaExpose`、`TextareaInstance`。

原生方法：`focus(options?: FocusOptions)`、`blur()`、`select()`；`textareaRef` 为原生元素。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留直接编辑。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-textarea-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。


## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。
文本与人员 ID 模型仍为字符串，使用空字符串或业务约定的字符串哨兵值。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。
