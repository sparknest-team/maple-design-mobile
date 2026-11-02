<!-- Source: src/input/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/input -->

# 输入框

## 案例

### 默认值与双向绑定

`modelValue` 是受控值，通过普通 `v-model` 绑定；父级提供的值优先，包括空字符串。`defaultValue` 是非受控初始值，仅在组件创建时读取；之后由组件内部保存用户输入。修改 `defaultValue` 不会重置现有文字，重新挂载才会重新读取，也不会在初始化时触发 `update:modelValue` 或写入父级表单。

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
      presentation="inline"
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
      presentation="inline"
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

### 外观变体

Example source: src/input/example/demos/variant.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input variant="filled" placeholder="填充外观" />
    <mp-input variant="outline" placeholder="描边外观" />
    <mp-input variant="standard" placeholder="标准外观" />
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

### 尺寸

Example source: src/input/example/demos/size.vue

```vue
<script setup>
import { reactive } from 'vue'

const demoText = {
  filled: '填充外观',
  outline: '描边外观',
  standard: '标准外观',
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const variants = ['filled', 'outline', 'standard']
const sizeValues = reactive(
  Object.fromEntries(sizes.flatMap((size) => variants.map((variant) => [`${size}-${variant}`, '']))),
)
</script>

<template>
  <template v-for="size in sizes" :key="size">
    <div class="input-example__caption">{{ size }}</div>
    <mp-space direction="column" :size="[12, 0]">
      <mp-input
        v-for="variant in variants"
        :key="variant"
        v-model="sizeValues[`${size}-${variant}`]"
        :size="size"
        :variant="variant"
        :placeholder="demoText[variant] ?? String(variant)"
      />
    </mp-space>
  </template>
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

### 状态

Example source: src/input/example/demos/state.vue

```vue
<template>
  <mp-space direction="column" :size="[12, 0]">
    <mp-input model-value="Maple Design" readonly placeholder="只读状态" />
    <mp-input model-value="Maple Design" disabled placeholder="禁用状态" />
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
      <mp-radio-group v-model="size" presentation="inline" aria-label="Comparison size">
        <mp-radio v-for="item in sizes" :key="item" presentation="inline" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
      <mp-radio-group v-model="variant" presentation="inline" aria-label="Comparison variant">
        <mp-radio v-for="item in variants" :key="item" presentation="inline" :value="item">{{ item }}</mp-radio>
      </mp-radio-group>
    </mp-space>
    <mp-space wrap>
      <mp-checkbox v-model="disabled" presentation="inline">Disabled / 禁用对照</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">Readonly / 只读对照</mp-checkbox>
      <mp-checkbox v-model="error" presentation="inline">Error / 错误对照</mp-checkbox>
    </mp-space>
    <div class="control-size-comparison__grid">
      <div data-control="Input">
        <p>Input</p>
        <mp-input
          :disabled="disabled"
          :readonly="readonly"
          :error="error"
          presentation="inline"
          :size="size"
          :variant="variant"
          placeholder="Input"
        />
      </div>
      <div data-control="Textarea">
        <p>Textarea</p>
        <mp-textarea
          v-model="textareaValue"
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
          presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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
            presentation="inline"
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

### 输入类型

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

### 密码输入框

`mp-input-password` 增加可见性切换，支持 `visibility` / `default-visibility`、`visibility-toggle` 和 `visibility-change`；其余 Input 属性与事件直接透传。

Example source: src/input/example/demos/password.vue

```vue
<template>
  <mp-input-password placeholder="输入密码" default-value="Maple2026" />
</template>
```

### 字数限制

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

### 主体与事件契约

两端维护独立复制的主体。输入按 input → update:modelValue 通知；清空按 clear → input → update:modelValue → change 通知，各一次，Form 对应语义也各接收一次。只读、禁用和组合输入期间禁止清空。受控提议被拒绝后恢复原生内容，包括不支持光标 API 的输入类型。

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

### 外观组合

适用于表单中的单行文本输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/input/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('示例内容')
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
    <mp-input v-model="value" v-bind="__demoAppearance"></mp-input>
  </mp-space>
</template>
```

### 交互状态切换

适用于表单中的单行文本输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

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

## API

### 属性

| 参数              | 说明                                                     | 类型               |  默认值   |
| ----------------- | -------------------------------------------------------- | ------------------ | :-------: |
| `v-model`         | 受控绑定值                                               | `string`           |    `-`    |
| `model-modifiers` | `v-model` 修饰符，支持 `trim`                            | `object`           |   `{}`    |
| `default-value`   | 非受控初始值，仅创建时读取；后续修改不重置输入，不回写父级                                     | `string`           |   `''`    |
| `type`            | `text`、`password`、`number`、`tel` 或 `email`           | `InputType`        |  `text`   |
| `placeholder`     | 占位符，也可作为浮动提示文字                             | `string`           |    `-`    |
| `size`            | `xs`、`sm`、`md`、`lg` 或 `xl`                           | `ComponentSize`    |   `md`    |
| `variant`         | `filled`、`outline` 或 `standard`                        | `string`           | `outline` |
| `hint`            | 是否将 placeholder 用作浮动提示文字                      | `boolean`          |  `true`   |
| `line`            | 是否显示边框或底线                                       | `boolean`          |  `true`   |
| `max-length`      | 最大输入长度；默认截断，`errorOnly` 时允许超出并显示错误 | `number \| object` |    `0`    |
| `show-word-limit` | 是否显示字数统计                                         | `boolean`          |  `false`  |
| `word-length`     | 自定义字数计算方法                                       | `function`         |    `-`    |
| `word-slice`      | 自定义超长截取方法                                       | `function`         |    `-`    |
| `readonly`        | 是否只读                                                 | `boolean`          |  `false`  |
| `disabled`        | 是否禁用                                                 | `boolean`          |  `false`  |
| `error`           | 是否显示错误状态                                         | `boolean`          |  `false`  |
| `clearable`       | 是否可清除；有值且可编辑时清除图标常驻显示                 | `boolean`          |  `false`  |
| `autofocus`       | 是否自动聚焦                                             | `boolean`          |  `false`  |
| `enterkeyhint`    | 移动端回车键提示                                         | `string`           |    `-`    |
| `aria-label`      | 输入框无障碍标签                                         | `string`           |    `-`    |
| `input-attrs`     | 透传 name 等原生属性；`autocomplete` 固定为 `off`                        | `object`           |    `-`    |
| `text-color`      | 文字颜色                                                 | `string`           |    `-`    |
| `focus-color`     | 聚焦颜色                                                 | `string`           |    `-`    |
| `blur-color`      | 失焦颜色                                                 | `string`           |    `-`    |

校验规则配置在 `mp-form-item` 上，详见 [Form 组件](#/zh-CN/form)。

`size / disabled / readonly` 按子项 → InputGroup → FormItem/Form → 库默认值继承，五种尺寸均完整支持。`hint` 默认开启，有外置标签时关闭。`name / id / aria-* / data-*` 直接透传原生 input；`class / style` 留在外壳。`input-attrs` 不能覆盖受控值、类型、禁用、只读和长度策略。

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |
| `select` | 选中输入内容 | `-` | `-` |

### 事件

| 事件名        | 说明                            | 参数                          |
| ------------- | ------------------------------- | ----------------------------- |
| `focus`       | 聚焦时触发                      | `event: FocusEvent`           |
| `blur`        | 失焦时触发                      | `event: FocusEvent`           |
| `clear`       | 清除时触发                      | `event: Event`                |
| `input`       | 输入时触发                      | `value: string, event: Event` |
| `change`      | 仅在失焦或按下 Enter 时提交变更 | `value: string, event: Event` |
| `press-enter` | 按下 Enter 时触发               | `event: KeyboardEvent`        |
| `keydown`     | 按键时触发                     | `event: KeyboardEvent`        |

超过 `max-length` 时，`update:model-value` 和 `input` 传出截断后的值。清空按 `clear → input → update:model-value → change` 通知，随后失焦不会补发 `change`。

### 插槽

| 插槽名       | 说明           | 参数                |
| ------------ | -------------- | ------------------- |
| `prefix`     | 前缀内容       | `-`                 |
| `suffix`     | 后缀内容       | `-`                 |
| `clear-icon` | 清除图标或按钮 | `clear: () => void` |

### InputPassword 与 InputGroup

| 组件 | 属性 / 事件 | 说明 |
| ---- | ----------- | ---- |
| `mp-input-password` | `visibility`, `default-visibility`, `visibility-toggle` | 密码可见性；默认非受控且显示切换按钮 |
| `mp-input-password` | `visibility-change`, `update:visibility` | 可见性变化时触发，参数为 `boolean` |
| `mp-input-group` | `size`, `variant`, `disabled`, `readonly`, `hint` | 子 Input/Password 默认继承；`variant` 默认为 `filled` |
| `mp-input-group-label` | 默认插槽 | 组合输入框的文字附加项 |

### 样式变量

Input 自身提供以下变量；容器外观相关变量请参考 [FieldDecorator](#/zh-CN/field-decorator)。

| 变量名                                  | 默认值                            |
| --------------------------------------- | --------------------------------- |
| `--mp-input-control-height` | `auto` |
| `--mp-input-control-font-size` | `inherit` |
| `--mp-input-control-line-height` | `inherit` |
| `--mp-input-control-padding-horizontal` | `0`                               |
| `--mp-input-counter-color` | `--mp-field-suffix-text-color` |
| `--mp-input-counter-font-size` | `12px` |
| `--mp-input-feedback-success-color` | `var(--mp-sys-color-content-success)` |
| `--mp-input-feedback-warning-color` | `var(--mp-sys-color-content-warning)` |
| `--mp-input-feedback-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-input-feedback-validating-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-input-feedback-duration` | `1s` |

公开类型 / Public types: `InputEmits`, `InputSlots`, `InputExpose`, `InputGroupSlots`, `InputPasswordEmits`, `InputPasswordSlots`, `InputPasswordExpose`.

### 表单展示继承

支持 presentation：`inline / popup`，默认 inline。可继承 FormItem/Form；readPretty 以纯文本阅读，其他弹层默认确认后更新 v-model。可选 before-commit 在候选校验通过后拦截保存。使用方式与对比 Demo 统一见 Form 文档。

### 输入光标主题

| CSS 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `--mp-input-caret-color` | `var(--mp-field-caret-color)` | 输入光标颜色，可独立于文字色覆盖 |

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-input-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。


## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。
文本与人员 ID 模型仍为字符串，使用空字符串或业务约定的字符串哨兵值。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。


字段提交也支持 `beforeCommit(value, context, done)`：保留第二个 context 参数，第三个 done 可决定允许或拒绝；Promise 和 boolean 写法继续支持。声明 done 的回调必须调用完成函数，或返回 boolean/Promise。
