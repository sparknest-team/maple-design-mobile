<!-- Source: src/input/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/input -->

# 输入框

## 阅读方向

输入框继承页面或局部容器的 `dir`；前后缀、清除操作和输入框组按阅读顺序排列。运行时切换方向保留原生输入节点、焦点和选区；光标、选区、混合文字与输入法组合由浏览器处理，不交换左右编辑键。父级重绘时保留正在组合的原生文本；旧选区恢复任务不会覆盖新的组合缓冲。

## 基础示例

### 基础用法

Example source: src/input/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const basicValue = ref('')
const clearableValue = ref('Maple Design')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="basicValue" placeholder="请输入内容" />
    <mp-input v-model="clearableValue" clearable placeholder="可清除文本" />
    <div class="input-example__value">当前值：{{ basicValue || '-' }}</div>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 表单控件尺寸对照

切换五档 size 和三种字段变体，比较 Input、Button、Select、日期时间及其他单行表单控件的高度。Button 在这里固定使用 outline。DatePicker/TimePicker 是面板，此处使用带输入框的 Date/Time 字段。示例同时展示有值、可清空、标签删除与长标签多选；Select/Cascader 设置 tag-nowrap 时保持同档高度，长标签文字省略、删除图标保留；标签行可横向滚动，清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。可清空后恢复选中值重复比较。多行文本和允许换行的多选内容按内容撑高。

Example source: src/field-decorator/example/demos/control-sizes.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['outline', 'filled', 'standard'] as const
const disabled = ref(false)
const readonly = ref(false)
const error = ref(false)
const size = ref<(typeof sizes)[number]>('md')
const variant = ref<(typeof variants)[number]>('outline')
const options = [
  { value: 'beijing', label: 'Beijing' },
  { value: 'shanghai', label: 'Shanghai' },
]
const cascaderOptions = [{ value: 'china', label: 'China', children: options }]

const inputValue = ref('Beijing')
const textareaValue = ref('Textarea value')
const selectValue = ref('beijing')
const cascaderValue = ref('beijing')
const selectMultiple = ref(['beijing', 'shanghai'])
const cascaderMultiple = ref(['beijing', 'shanghai'])
const selectOverflow = ref(['long', 'beijing', 'shanghai'])
const cascaderOverflow = ref(['long', 'beijing', 'shanghai'])
const selectedOptions = [
  ...options,
  {
    value: 'long',
    label:
      'A very long selected option label for overflow comparison — full text preview keeps the selected value unchanged.',
  },
]
const selectedCascaderOptions = [{ value: 'china', label: 'China', children: selectedOptions }]
function resetSelections() {
  inputValue.value = 'Beijing'
  selectValue.value = 'beijing'
  cascaderValue.value = 'beijing'
  selectMultiple.value = ['beijing', 'shanghai']
  cascaderMultiple.value = ['beijing', 'shanghai']
  selectOverflow.value = ['long', 'beijing', 'shanghai']
  cascaderOverflow.value = ['long', 'beijing', 'shanghai']
}
</script>
<template>
  <section aria-label="Form control size comparison" class="control-size-comparison">
    <mp-space wrap :size="12">
      <mp-radio-group v-model="size" edit-mode="direct" aria-label="Comparison size">
        <mp-radio v-for="item in sizes" :key="item" edit-mode="direct" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="variant" edit-mode="direct" aria-label="Comparison variant">
        <mp-radio v-for="item in variants" :key="item" edit-mode="direct" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
    </mp-space>
    <mp-space wrap>
      <mp-checkbox v-model="disabled" edit-mode="direct">Disabled / 禁用对照</mp-checkbox>
      <mp-checkbox v-model="readonly" edit-mode="direct">Readonly / 只读对照</mp-checkbox>
      <mp-checkbox v-model="error" edit-mode="direct">Error / 错误对照</mp-checkbox>
    </mp-space>
    <div class="control-size-comparison__grid">
      <div data-control="Input">
        <p>Input</p>
        <mp-input
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Input"
        />
      </div>
      <div data-control="Textarea">
        <p>Textarea</p>
        <mp-textarea
          v-model="textareaValue"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          placeholder="Textarea"
          :rows="2"
        />
      </div>
      <div data-control="Button">
        <p>Button</p>
        <mp-button :size="size" variant="outline">Button</mp-button>
      </div>
      <div data-control="Select">
        <p>Select</p>
        <mp-select
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :options="options"
          placeholder="Select"
        />
      </div>
      <div data-control="Date">
        <p>Date</p>
        <mp-date
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Date"
        />
      </div>
      <div data-control="Time">
        <p>Time</p>
        <mp-time
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Time"
        />
      </div>
      <div data-control="InputNumber">
        <p>InputNumber</p>
        <mp-input-number
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          placeholder="Number"
        />
      </div>
      <div data-control="AutoComplete">
        <p>AutoComplete</p>
        <mp-auto-complete
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :options="options"
          placeholder="AutoComplete"
        />
      </div>
      <div data-control="Cascader">
        <p>Cascader</p>
        <mp-cascader
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :options="cascaderOptions"
          placeholder="Cascader"
        />
      </div>
      <div data-control="DateRange">
        <p>DateRange</p>
        <mp-date-range
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :placeholder="['Start', 'End']"
        />
      </div>
      <div data-control="TimeRange">
        <p>TimeRange</p>
        <mp-time-range
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          edit-mode="direct"
          :size="size"
          :variant="variant"
          :placeholder="['Start', 'End']"
        />
      </div>
    </div>

    <section aria-label="Selected control size comparison" class="control-size-comparison__states">
      <mp-space wrap align="center" :size="12">
        <span>Selected / Clearable / Multiple — 有值、可清空与多选不换行</span>
        <span
          >Hover or focus truncated text; tap on touch screens /
          悬停或聚焦省略正文查看全文；触屏点按查看，点外部关闭</span
        >
        <mp-button size="sm" variant="outline" @click="resetSelections">Reset / 恢复选中值</mp-button>
      </mp-space>
      <div class="control-size-comparison__grid">
        <div data-control="InputValue">
          <p>Input · clearable</p>
          <mp-input
            v-model="inputValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            clearable
            placeholder="Input value"
          />
        </div>
        <div data-control="ButtonReference">
          <p>Button · reference</p>
          <mp-button :size="size" variant="outline">Button</mp-button>
        </div>
        <div data-control="SelectValue">
          <p>Select · clearable</p>
          <mp-select
            v-model="selectValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            clearable
            placeholder="Select value"
          />
        </div>
        <div data-control="CascaderValue">
          <p>Cascader · clearable</p>
          <mp-cascader
            v-model="cascaderValue"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            clearable
            placeholder="Cascader value"
          />
        </div>
        <div data-control="SelectMultiple">
          <p>Select · multiple / nowrap</p>
          <mp-select
            v-model="selectMultiple"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Select multiple"
          />
        </div>
        <div data-control="CascaderMultiple">
          <p>Cascader · multiple / nowrap</p>
          <mp-cascader
            v-model="cascaderMultiple"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Cascader multiple"
          />
        </div>
        <div data-control="SelectOverflow">
          <p>Select · long values / nowrap</p>
          <mp-select
            v-model="selectOverflow"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Select long values"
          />
        </div>
        <div data-control="CascaderOverflow">
          <p>Cascader · long values / nowrap</p>
          <mp-cascader
            v-model="cascaderOverflow"
            :disabled="disabled"
            :readonly="readonly"
            :error="error"
            edit-mode="direct"
            :size="size"
            :variant="variant"
            :options="selectedCascaderOptions"
            multiple
            tag-nowrap
            clearable
            placeholder="Cascader long values"
          />
        </div>
      </div>
    </section>
  </section>
</template>
<style scoped>
.control-size-comparison,
.control-size-comparison__states {
  display: grid;
  gap: 24px;
}
.control-size-comparison__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-items: start;
  gap: 24px 16px;
}
.control-size-comparison__grid > div {
  min-width: 0;
}
.control-size-comparison__grid p {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 20px;
}
.control-size-comparison__grid :deep(.mp-input-number),
.control-size-comparison__grid :deep(.mp-auto-complete) {
  width: 100%;
}
</style>
```

### 介绍

用于输入单行文本。组件支持多种外观、浮动提示、输入类型、状态以及前后缀内容。

默认长度按 UTF-16 码元计算（emoji 通常占 2）；默认截断不会拆开有效的代理对，边界不足时舍去整个字符。若需按用户感知字符（字素簇）计数和裁剪，请配套提供 `word-length` 与 `word-slice`；自定义裁剪结果由业务负责。

## 外观与状态

### 外观配置对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                       | 相关示例           |
| ------------- | ------------------------------------------ | ------------------ |
| `placeholder` | 占位符，也可作为浮动提示文字               | 表单反馈、提示文字 |
| `hint`        | 是否将 placeholder 用作浮动提示文字        | 表单反馈、提示文字 |
| `clearable`   | 是否可清除；有值且可编辑时清除图标常驻显示 | 表单反馈           |
| `variant`     | `filled`、`outline` 或 `standard`          | 提示文字           |

<!-- demo-config-notes:end -->

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于表单中的单行文本输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

Example source: src/input/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref('示例内容')
const __demoAppearance = __demoReactive({ variant: 'filled', size: 'md' })
const demoCompareFields = [
  { name: 'variant', values: ['filled', 'outline', 'standard'] },
  { name: 'size', values: ['xs', 'sm', 'md', 'lg', 'xl'] },
]
const demoCompareAxis = demoRef('variant')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="variant">
        <mp-radio-group
          v-model="__demoAppearance['variant']"
          aria-label="variant"
          :options="[
            { label: 'filled', value: 'filled' },
            { label: 'outline', value: 'outline' },
            { label: 'standard', value: 'standard' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-input v-model="value" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"></mp-input>
      </section>
    </div>
  </mp-space>
</template>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

### 表单反馈

FormItem 的 `feedback` 配合 `validate-status` 显示校验反馈。有外置 FormItem 标签时自动关闭内部浮动提示。

Example source: src/input/example/demos/form-feedback.vue

```vue
<template>
  <mp-form :model="model">
    <mp-form-item
      field="account"
      label="账户"
      feedback
      :validate-status="status"
      :help="status === 'error' ? '请输入账户后重试' : undefined"
    >
      <mp-input v-model="model.account" placeholder="外置标签会关闭内部浮动提示" hint clearable />
    </mp-form-item>
    <mp-button status="primary" :loading="status === 'validating'" @click="validate">模拟异步校验</mp-button>
  </mp-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ account: '' })
const status = ref<'validating' | 'success' | 'error'>()
let request = 0
async function validate() {
  const current = ++request
  const value = model.account
  status.value = 'validating'
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (current === request) {
    status.value = value.trim() ? 'success' : 'error'
  }
}
</script>
```

### 提示文字

`hint` 开启时，placeholder 会在聚焦或有值时上浮；关闭后保持原生占位符行为。

Example source: src/input/example/demos/hint.vue

```vue
<template>
  <div class="input-example__caption">启用 hint：聚焦后提示文字上浮</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" placeholder="用户名" />
    <mp-input variant="outline" placeholder="用户名" />
    <mp-input variant="standard" placeholder="用户名" />
  </mp-space>
  <div class="input-example__caption">关闭 hint：提示文字保持为占位符</div>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" :hint="false" placeholder="用户名" />
    <mp-input variant="outline" :hint="false" placeholder="用户名" />
    <mp-input variant="standard" :hint="false" placeholder="用户名" />
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

## 输入内容与布局

### 字数限制

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                                       | 相关示例                               |
| --------------- | ---------------------------------------------------------- | -------------------------------------- |
| `placeholder`   | 占位符，也可作为浮动提示文字                               | 字数限制、前缀和后缀、自定义清除图标   |
| `clearable`     | 是否可清除；有值且可编辑时清除图标常驻显示                 | 字数限制、自定义清除图标、组合状态继承 |
| `max-length`    | 有限非负长度或 `{ length, errorOnly? }`；0 不限；非法值提示并回退不限 | 字数限制                               |
| `hint`          | 是否将 placeholder 用作浮动提示文字                        | 输入框组合                             |
| `default-value` | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级 | 组合状态继承                           |
| `disabled`      | 是否禁用                                                   | 组合状态继承                           |

<!-- demo-config-notes:end -->

Example source: src/input/example/demos/max-length.vue

```vue
<script setup>
import { ref } from 'vue'

const maxLengthValue = ref('Maple')
</script>

<template>
  <mp-input v-model="maxLengthValue" :max-length="10" clearable placeholder="最多输入 10 个字符" />
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

`max-length` 为有限非负数或 `{ length, errorOnly? }`，`0` 表示不限。对象的 `length` 同样须为有限非负数，`errorOnly` 为可选布尔值；非法值沿 Vue Prop 校验提示并按不限长度回退，传入 null 按未设置处理。默认截断按 UTF-16 码元计算；自定义计数与裁剪请配套提供 `word-length / word-slice`。

### 密码输入框

`mp-input-password` 增加可见性切换，支持 `visibility` / `default-visibility`、`visibility-toggle` 和 `visibility-change`；其余 Input 属性与事件直接透传。

Example source: src/input/example/demos/password.vue

```vue
<template>
  <mp-input-password placeholder="输入密码" default-value="Maple2026" />
</template>
```

### 前缀和后缀

Example source: src/input/example/demos/prefix-suffix.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input placeholder="请输入手机号"><template #prefix>+86</template></mp-input>
    <mp-input placeholder="请输入金额"><template #suffix>RMB</template></mp-input>
    <mp-input placeholder="请输入搜索内容">
      <template #prefix><m-icon-search /></template>
      <template #suffix><m-icon-close-circle-fill /></template>
    </mp-input>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 自定义清除图标

Example source: src/input/example/demos/custom-clear-icon.vue

```vue
<script setup>
import { ref } from 'vue'

const customClearValue = ref('Clear me')
</script>

<template>
  <mp-input v-model="customClearValue" clearable placeholder="可清除文本">
    <template #clear-icon="{ clear }"><m-icon-error @click="clear" /></template>
  </mp-input>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 输入框组合

`mp-input-group` 统一传递 `size`、`variant`、`disabled`、`readonly`、`hint`，子输入框显式设置的值（包括 `false`）优先。`mp-input-group-label` 可作为前后附加内容。

Example source: src/input/example/demos/group.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input-group variant="outline">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input placeholder="输入域名" :hint="false" />
    </mp-input-group>
    <mp-input-group size="sm" variant="filled">
      <mp-input placeholder="姓" :hint="false" />
      <mp-input placeholder="名" :hint="false" />
    </mp-input-group>
  </mp-space>
</template>
```

`InputGroupLabel` 的根节点为 span，用于输入框外侧的附加内容。可使用 FormItem 的 `label-attrs.for` 对应 Input 的 `id`，或使用原生 label 的 for/id 关联可见字段名；也可显式提供 `aria-label`。

### 组合状态继承

密码切换和清除按钮也遵循合并后的禁用状态；只读输入不会显示清除按钮。

Example source: src/input/example/demos/group-state.vue

```vue
<template>
  <mp-space direction="column" style="width: 100%">
    <mp-space>
      <mp-button variant="outline" @click="disabled = !disabled">{{ disabled ? '启用组合' : '禁用组合' }}</mp-button>
      <mp-button variant="outline" @click="readonly = !readonly">{{ readonly ? '允许编辑' : '组合只读' }}</mp-button>
    </mp-space>
    <mp-input-group variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>https://</mp-input-group-label>
      <mp-input v-model="domain" placeholder="输入域名" clearable />
      <mp-input-group-label>.com</mp-input-group-label>
    </mp-input-group>
    <mp-input-group variant="filled" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input v-model="first" placeholder="继承组合状态" clearable />
      <mp-input default-value="可独立编辑" :disabled="false" :readonly="false" clearable />
    </mp-input-group>
    <mp-input-group size="lg" variant="outline" :disabled="disabled" :readonly="readonly" :hint="false">
      <mp-input-group-label>密码</mp-input-group-label>
      <mp-input-password v-model="password" placeholder="密码切换继承禁用状态" clearable />
    </mp-input-group>
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref(false)
const readonly = ref(false)
const domain = ref('example')
const first = ref('继承状态')
const password = ref('CedarMaple')
</script>
```

## 内容与展示

### 输入类型

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                           | 相关示例 |
| ------------- | ---------------------------------------------- | -------- |
| `type`        | `text`、`password`、`number`、`tel` 或 `email` | 输入类型 |
| `placeholder` | 占位符，也可作为浮动提示文字                   | 输入类型 |

<!-- demo-config-notes:end -->

Example source: src/input/example/demos/type.vue

```vue
<script setup>
import { ref } from 'vue'

const textValue = ref('')
const numberValue = ref('')
const telValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model="textValue" type="text" placeholder="请输入文本" />
    <mp-input v-model="numberValue" type="number" placeholder="请输入数字" />
    <mp-input v-model="telValue" type="tel" placeholder="请输入手机号" />
    <mp-input v-model="emailValue" type="email" placeholder="请输入邮箱" />
    <mp-input v-model="passwordValue" type="password" placeholder="请输入密码" />
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

## 值模型与交互

### 默认值与双向绑定

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                                       | 相关示例                             |
| --------------- | ---------------------------------------------------------- | ------------------------------------ |
| `placeholder`   | 占位符，也可作为浮动提示文字                               | 输入修饰符、主体与事件契约、原生属性 |
| `aria-label`    | 输入框无障碍标签                                           | 默认值与双向绑定、原生属性           |
| `clearable`     | 是否可清除；有值且可编辑时清除图标常驻显示                 | 主体与事件契约、清空按钮与手动删空   |
| `default-value` | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级 | 默认值与双向绑定                     |
| `disabled`      | 是否禁用                                                   | 交互状态对比                         |
| `readonly`      | 是否只读                                                   | 交互状态对比                         |

<!-- demo-config-notes:end -->

`modelValue` 是受控值，通过普通 `v-model` 绑定；父级提供的值优先，包括空字符串。`defaultValue` 是非受控初始值，仅在组件创建时读取；之后由组件内部保存用户输入。修改 `defaultValue` 不会重置现有文字，重新挂载才会重新读取，也不会在初始化时触发 `update:modelValue` 或写入父级表单。

`v-model.trim` 遵循 Vue 模型事件规则：输入时的 `update:modelValue` 已去除首尾空白；`input` 仍通知经过长度归一化的原始文本。非受控输入可在编辑时保留空白，提交时归一化本地显示；提交不重复发布已通知的同一个模型值。受控显示始终由父级最终值决定，`change` 仍表示提交。

需要表单默认值时，直接初始化绑定字段，例如 `const text = ref('北京')`，然后使用 `<mp-input v-model="text" />`。

Example source: src/input/example/demos/default-value.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{ english?: boolean }>(), { english: false })
const seed = ref('A: initial text')
const instanceKey = ref(0)
const lastUpdate = ref<string | null>(null)
const updateCount = ref(0)
const controlled = ref('')
function record(value: string) {
  lastUpdate.value = value
  updateCount.value += 1
}
function remount() {
  instanceKey.value += 1
  lastUpdate.value = null
  updateCount.value = 0
}
</script>

<template>
  <div>
    <p>
      {{
        english
          ? '1. Uncontrolled: defaultValue supplies the initial text. Typing updates the component itself; the seed below stays unchanged.'
          : '1. 非受控：defaultValue 提供初始文字。输入后由组件自己保存新值，下方的默认值变量不会随之变化。'
      }}
    </p>
    <mp-input
      :key="instanceKey"
      edit-mode="direct"
      :default-value="seed"
      aria-label="Uncontrolled input"
      @update:model-value="record"
    />
    <p>
      defaultValue = <code>{{ seed }}</code>
    </p>
    <p role="status">
      update:modelValue × {{ updateCount }}; {{ english ? 'last emitted value' : '最近一次用户更新' }} =
      <code>{{ lastUpdate === null ? (english ? '(none)' : '（尚未触发）') : JSON.stringify(lastUpdate) }}</code>
    </p>
    <mp-space wrap>
      <mp-button @click="seed = seed.startsWith('A:') ? 'B: new default' : 'A: initial text'">{{
        english ? 'Change defaultValue only' : '仅修改 defaultValue'
      }}</mp-button>
      <mp-button @click="remount">{{ english ? 'Remount input' : '重新挂载输入框' }}</mp-button>
    </mp-space>
    <p>
      {{
        english
          ? 'Try typing, then change defaultValue: the current text stays. Remount to read the latest defaultValue. Initialization never emits update:modelValue.'
          : '操作顺序：先输入，再修改 defaultValue，当前文字不会被覆盖；点击重新挂载后，才读取最新的默认值。初始化不会触发 update:modelValue。'
      }}
    </p>
    <p>
      {{
        english
          ? '2. Controlled: v-model is the source of truth. Its initial empty string takes precedence over defaultValue.'
          : '2. 受控：v-model 是数据来源。这里初始值为空字符串，仍优先于 defaultValue，不会自动填入默认文字。'
      }}
    </p>
    <mp-input
      v-model="controlled"
      edit-mode="direct"
      default-value="This default is ignored"
      aria-label="Controlled input"
    />
    <p role="status">
      v-model = <code>{{ JSON.stringify(controlled) }}</code>
    </p>
    <mp-space wrap>
      <mp-button @click="controlled = 'Parent supplied text'">{{
        english ? 'Update parent value' : '从父级设置值'
      }}</mp-button>
      <mp-button @click="controlled = ''">{{ english ? 'Clear parent value' : '清空父级值' }}</mp-button>
    </mp-space>
    <p>
      {{
        english
          ? 'For a form, initialize the bound field in the parent. defaultValue does not write an initial value into the parent form.'
          : '表单需要初始值时，请初始化父级绑定字段。defaultValue 不会把初始值写入父级表单。'
      }}
    </p>
  </div>
</template>
```

### 清空按钮与手动删空

将清空输出设为 null。先点击清空图标，观察模型为 null；恢复初值后用 Backspace 删光，观察模型为空字符串。普通输入不会自动套用 empty-value。

Example source: src/input/example/demos/empty-value.vue

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({ text: 'Hello' as string | null })
</script>
<template>
  <mp-space direction="column">
    <p>点击清空图标得到 null；用 Backspace 删光得到空字符串。</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="text" label="关键词">
        <mp-input v-model="model.text" edit-mode="direct" clearable :empty-value="null" />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.text = 'Hello'">恢复初值</mp-button>
    <p>
      当前模型: <output>{{ JSON.stringify(model.text) }}</output>
    </p>
  </mp-space>
</template>
```

### 输入修饰符

Example source: src/input/example/demos/model-modifier.vue

```vue
<script setup>
import { ref } from 'vue'

const trimValue = ref('')
</script>

<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input v-model.trim="trimValue" placeholder="输入内容并在两侧保留空格" />
    <div class="input-example__value">当前值：“{{ trimValue }}”</div>
  </mp-space>
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 交互状态对比

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于表单中的单行文本输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

Example source: src/input/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('示例内容')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-input v-model="value" v-bind="__demoState"></mp-input>
  </mp-space>
</template>
```

### 主体与事件契约

输入按 input → update:modelValue 通知；清空按 clear → input → update:modelValue → change 通知，各一次，Form 对应语义也各接收一次。只读、禁用和组合输入期间禁止清空。受控提议被拒绝后恢复原生内容，包括不支持光标 API 的输入类型。

Example source: src/input/example/demos/event-pipeline.vue

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
  <div class="input-pipeline-demo">
    <mp-input
      v-model="value"
      clearable
      placeholder="输入后尝试清空"
      @clear="record('clear')"
      @input="record('input')"
      @update:model-value="record('update:modelValue')"
      @change="record('change')"
    />
    <p>输入：input → update；清空：clear → input → update → change。</p>
    <output>{{ events.join(' → ') || '等待操作' }}</output>
  </div>
</template>
<style scoped>
.input-pipeline-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.input-pipeline-demo p {
  margin: 0;
}
</style>
```

### 原生属性

Example source: src/input/example/demos/native-attrs.vue

```vue
<template>
  <mp-input
    enterkeyhint="next"
    aria-label="请输入邮箱"
    :input-attrs="{ name: 'email', autocomplete: 'off', autocapitalize: 'none' }"
    placeholder="请输入邮箱"
    type="email"
  />

  <div class="input-example__bottom-space" />
</template>

<style lang="less" scoped>
.input-example {
  &__caption,
  &__value {
    color: var(--mp-field-blur-color);
    font-size: 12px;
  }

  &__caption {
    margin: 16px 0 8px;
  }

  &__bottom-space {
    height: 40px;
  }
}
</style>
```

### 提交前确认

字段提交也支持 `beforeCommit({ value, previousValue }, done, context)`：第二个参数 done 决定允许或拒绝，第三个参数 context 提供取消信号；Promise 和 boolean 写法继续支持。声明 done 的回调必须调用完成函数，或返回 boolean/Promise。

守卫统一使用 `(payload, done, context)`：关闭 payload 为 `{ action }`，切换和提交为 `{ value, previousValue }`，Popup 为 `{ reason }`。context 提供 `signal` 和可选原始 `event`。返回 boolean/Promise，或调用 done()/done(false)；同步 void 等待 done，Promise&lt;void&gt; 放行。首次完成生效。等待期间自动管理 loading/disabled，取消后旧结果失效，不暴露内部按钮 refs。

Example source: src/input/example/demos/commit-protocol.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | null>('Project A')
const message = ref('')
async function beforeCommit(
  { value: next, previousValue }: { value: unknown; previousValue: unknown },
  _done: (allow?: boolean) => void,
  { signal }: { signal: AbortSignal },
) {
  if (next === previousValue) {
    return true
  }
  await new Promise((resolve) => setTimeout(resolve, 500))
  if (signal.aborted) {
    return false
  }
  message.value = `已保存: ${String(next)}`
  return true
}
</script>
<template>
  <mp-space direction="column">
    <mp-input v-model="value" edit-mode="popup" clearable :empty-value="null" :before-commit="beforeCommit" />
    <p role="status">{{ message }}</p>
  </mp-space>
</template>
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## 加载与等待

### 加载状态

切换加载状态，对比默认指示器与底部加载线。加载期间仍可编辑输入；是否禁止编辑由 disabled / readonly 单独控制。

Example source: src/input/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(true)
const value = ref('加载时仍可编辑')
</script>
<template>
  <mp-space direction="column" :size="16" style="width: 100%">
    <mp-form layout="vertical">
      <mp-form-item label="加载状态 / Loading"><mp-switch v-model="busy" /></mp-form-item>
      <mp-form-item label="默认指示器 / Default"
        ><mp-input
          v-model="value"
          :loading="busy"
          placeholder="加载时仍可编辑 / Editable while loading"
          loading-mode="default"
      /></mp-form-item>
      <mp-form-item label="底部加载线 / Line"
        ><mp-input
          v-model="value"
          :loading="busy"
          placeholder="加载时仍可编辑 / Editable while loading"
          loading-mode="line"
      /></mp-form-item>
    </mp-form>
    <p>切换加载状态；加载时仍可输入和清空。Loading keeps the input editable.</p>
  </mp-space>
</template>
```

## 组合输入

使用输入法组合文字时保留正在输入的文本，组合完成前外部模型更新不替换这段文本。组合结束后再按原有格式化和受控接受规则处理；旧输入的排队回填不会改写后续编辑或组合的文本与光标。长度限制和修饰符按组合结束后的既有输入/提交时机处理。

## 使用说明

### 表单展示继承

支持 `edit-mode`：`direct / popup`。未设置时继承 FormItem/Form，独立使用时默认 direct；readPretty 以纯文本阅读，编辑弹层默认确认后更新 v-model。可选 before-commit 在候选校验通过后拦截保存。使用方式与对比 Demo 统一见 Form 文档。

### 原生等待状态

当内部没有 loading 或提交等待时，Input 保留原生 aria-busy 提示；内部等待优先于外部 false。仅设置 aria-busy 不会创建加载图标或异步任务。
### 配置说明

Input 自身提供以下变量；容器外观相关变量请参考 [FieldDecorator](#/zh-CN/field-decorator)。

公开类型 / Public types: `InputEmits`, `InputSlots`, `InputExpose`, `InputGroupSlots`, `InputPasswordEmits`, `InputPasswordSlots`, `InputPasswordExpose`.

### 输入光标主题

延迟编辑的 `change` 在有来源时保留真实确认事件，例如保存按钮事件；程序触发的编辑器接力没有 DOM 事件，第二个参数可缺省。事件 target 可能是确认控件，不保证是输入元素。`change` 只通知，不等待监听器返回的 Promise；异步审批请使用 `before-commit`。

InputPassword 透传 Input 的全部属性、事件和插槽。`open` 仅控制延迟编辑层；direct 模式没有编辑层。初始 open/default-open 不触发初始化关闭，后续修改 default-open 不会重新打开编辑器。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Input Props

| 参数              | 说明                                                       | 类型                                       |   默认值    |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------ | :---------: |
| `v-model`         | 受控绑定值                                                 | `string \| null`                           |     `-`     |
| `model-modifiers` | `v-model` 修饰符，支持 `trim`                              | `object`                                   |    `{}`     |
| `default-value`   | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级 | `string`                                   |    `''`     |
| `type`            | `text`、`password`、`number`、`tel` 或 `email`             | `InputType`<br>`'number' \| 'text' \| 'email' \| 'tel' \| 'password'` |   `text`    |
| `placeholder`     | 占位符，也可作为浮动提示文字                               | `string`                                   |     `-`     |
| `size`            | `xs`、`sm`、`md`、`lg` 或 `xl`                             | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` |    `md`     |
| `variant`         | `filled`、`outline` 或 `standard`                          | `string`                                   |  `outline`  |
| `hint`            | 是否将 placeholder 用作浮动提示文字                        | `boolean`                                  |   `true`    |
| `line`            | 是否显示边框或底线                                         | `boolean`                                  |   `true`    |
| `max-length`      | 有限非负长度或 `{ length, errorOnly? }`；0 不限；非法值提示并回退不限 | `number \| object`                         |     `0`     |
| `show-word-limit` | 是否显示字数统计                                           | `boolean`                                  |   `false`   |
| `word-length`     | 自定义字数计算方法                                         | `function`                                 |     `-`     |
| `word-slice`      | 自定义超长截取方法                                         | `function`                                 |     `-`     |
| `readonly`        | 是否只读                                                   | `boolean`                                  |   `false`   |
| `disabled`        | 是否禁用                                                   | `boolean`                                  |   `false`   |
| `error`           | 是否显示错误状态                                           | `boolean`                                  |   `false`   |
| `clearable`       | 是否可清除；有值且可编辑时清除图标常驻显示                 | `boolean`                                  |   `false`   |
| empty-value       | 清空输出；省略时清空返回空字符串，不影响手动删除           | `string \| null \| (() => string \| null)` | `undefined` |
| `autofocus`       | 是否自动聚焦                                               | `boolean`                                  |   `false`   |
| `enterkeyhint`    | 移动端回车键提示                                           | `string`                                   |     `-`     |
| `aria-label`      | 输入框无障碍标签                                           | `string`                                   |     `-`     |
| `input-attrs`     | 透传 name 等原生属性；`autocomplete` 固定为 `off`          | `object`                                   |     `-`     |
| `text-color`      | 文字颜色                                                   | `string`                                   |     `-`     |
| `focus-color`     | 聚焦颜色                                                   | `string`                                   |     `-`     |
| `blur-color`      | 失焦颜色                                                   | `string`                                   |     `-`     |
| `edit-mode` | 编辑模式；继承 FormItem/Form | `direct / popup` | `undefined` |
| `read-pretty` | 纯阅读展示；继承 FormItem/Form | `boolean` | `undefined` |
| `open` | 延迟编辑层的受控打开状态 | `boolean` | `undefined` |
| `default-open` | 非受控编辑层初始打开状态；仅创建时读取 | `boolean` | `false` |
| `before-commit` | 延迟保存审批：(payload, done, context) | `BeforeFieldCommit` | `undefined` |
| `popup-container` | 延迟编辑层挂载目标；false 原地渲染 | `PopupContainer` | `undefined` |
| `loading` | 手动加载展示；保持可编辑 | `boolean` | `false` |
| `loading-mode` | 加载呈现布局 | `default / line` | `default` |

校验规则配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

`size / disabled / readonly` 按子项 → InputGroup → FormItem/Form → 库默认值继承，五种尺寸均完整支持。`hint` 默认开启，有外置标签时关闭。`name / id / aria-* / data-*` 直接透传原生 input；`class / style` 留在外壳。`input-attrs` 不能覆盖受控值、类型、禁用、只读和长度策略。

### Input Methods

| 方法名   | 说明         | 参数 | 返回值 |
| -------- | ------------ | ---- | ------ |
| `focus`  | 聚焦         | `-`  | `-`    |
| `blur`   | 失焦         | `-`  | `-`    |
| `select` | 选中输入内容 | `-`  | `-`    |

### Input Events

| 事件名        | 说明                            | 参数                          |
| ------------- | ------------------------------- | ----------------------------- |
| `focus`       | 聚焦时触发                      | `event: FocusEvent`           |
| `blur`        | 失焦时触发                      | `event: FocusEvent`           |
| `clear`       | 清除时触发                      | `event: Event`                |
| `input`       | 输入时触发                      | `value: string, event: Event` |
| `change`      | 仅在失焦或按下 Enter 时提交变更 | `value: string \| null, event?: Event` |
| `press-enter` | 按下 Enter 时触发               | `event: KeyboardEvent`        |
| `keydown`     | 按键时触发                      | `event: KeyboardEvent`        |
| `update:modelValue` | 模型更新提议，包含显式 null | `value: string \| null` |
| `update:open` | 编辑层打开状态请求 | `open: boolean` |
| `click` | 原生输入点击通知 | `event: MouseEvent` |

`errorOnly: true` 保留超限文本并显示错误；其余长度限制会截断，`input` 通知归一化文本，模型通知遵循 Vue 修饰符。清空按 `clear → input → update:model-value → change` 通知，随后失焦不会补发 `change`。

### Input Slots

| 插槽名       | 说明           | 参数                |
| ------------ | -------------- | ------------------- |
| `prefix`     | 前缀内容       | `-`                 |
| `suffix`     | 后缀内容       | `-`                 |
| `clear-icon` | 清除图标或按钮 | `clear: (event?: Event) => void` |
| `read` | 自定义阅读内容 | `{ value: string \| null }` |

### InputPassword 与 InputGroup

| 组件                   | 属性 / 事件                                             | 说明                                                  |
| ---------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| `mp-input-password`    | `visibility`, `default-visibility`, `visibility-toggle` | 密码可见性；默认非受控且显示切换按钮                  |
| `mp-input-password`    | `visibility-change`, `update:visibility`                | 可见性变化时触发，参数为 `boolean`                    |
| `mp-input-group`       | `size`, `variant`, `disabled`, `readonly`, `hint`       | 子 Input/Password 默认继承；`variant` 默认为 `filled` |
| `mp-input-group-label` | 默认插槽                                                | 组合输入框的文字附加项                                |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-input-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-input-control-font-size` | `inherit` | `font-size` |
| `--mp-input-control-height` | `auto` | `height` |
| `--mp-input-control-line-height` | `inherit` | `line-height` |
| `--mp-input-control-padding-horizontal` | `0` | `padding` |
| `--mp-input-counter-color` | `var(--mp-field-suffix-text-color)` | `color` |
| `--mp-input-counter-font-size` | `12px` | `font-size` |
| `--mp-input-feedback-duration` | `1s` | `animation` |
| `--mp-input-feedback-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-input-feedback-success-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-input-feedback-validating-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-input-feedback-warning-color` | `var(--mp-sys-color-content-warning)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-input-caret-color: var(--mp-field-caret-color);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 输入光标主题

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-input-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。
