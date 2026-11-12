<!-- Source: src/input-number/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/input-number -->

# InputNumber

InputNumber 用于编辑和提交业务数字。

- `model-value !== undefined` 表示受控；`default-value` 仅初始化非受控值。编辑草稿允许暂时不同于业务值；提交后若父组件拒绝更新，恢复到父组件值。外部回填不触发用户事件或校验。
- 默认在 Enter / 失焦时更新；`model-event="input"` 输入完整数字时更新，但 `change` 仍在提交时触发。Enter 后再失焦不会重复提交。
- 清空获准后按 **clear → input → update:modelValue → change** 通知；clear 表示动作通知，审批拒绝时不发出。清空目标与当前模型相同时不虚构 change。默认清空值为 undefined，显式 empty-value 可输出 null 或其他受支持数值。
- `-`、`.`、`1.` 等输入中间态暂时保留；提交 `1.` 得到数字 1，单独符号恢复之前的业务值。非法文本、NaN、Infinity 不会写入业务值。IME 组合输入结束后只处理一次。
- 范围优先于精度：舍入后仍限制在 min/max 内，非对齐边界保留实际值。两端采用独立配置的 Decimal 运算，不受应用修改 Decimal 全局配置影响；模型仍是 JavaScript number，不承诺任意精度的大数存储。
- 禁用/只读/尺寸从 InputGroup、FormItem、Form 继承，显式 false 可以覆盖；Cedar 的缺省尺寸再读取 ConfigProvider，Maple 使用现有默认系统。字段外观与 hint 可继承 InputGroup；外层已有 FormItem 标题时不重复显示浮动标签。
- 鼠标、触控都支持长按；释放、取消、移出、窗口失焦、组件停用/卸载或状态变化时停止。移动端建议用 button 布局增加触控面积；↑/↓ 步进，Enter 提交。

所有原生输入统一使用 `autocomplete="off"`，传入原生属性也不会开启自动填充。

## 阅读方向

数字输入继承来源 `dir`，增减按钮随阅读顺序排列。数值、精度和上下键语义保持不变：ArrowUp 增加，ArrowDown 减少；不对数值或显示字符串做反转。

## 基础示例

### 基础与状态

Example source: src/input-number/example/demos/field-basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | undefined>(12)
const disabled = ref(false)
const readonly = ref(false)
const clearable = ref(true)
const hint = ref(false)
</script>
<template>
  <div class="number-demo">
    <div class="number-demo__options">
      <mp-checkbox v-model="disabled" edit-mode="direct">禁用</mp-checkbox>
      <mp-checkbox v-model="readonly" edit-mode="direct">只读</mp-checkbox>
      <mp-checkbox v-model="clearable" edit-mode="direct">可清空</mp-checkbox>
      <mp-checkbox v-model="hint" edit-mode="direct">浮动提示</mp-checkbox>
    </div>
    <mp-input-number
      v-model="value"
      :disabled="disabled"
      :readonly="readonly"
      :clearable="clearable"
      :hint="hint"
      placeholder="数量"
    />
    <output>业务数值：{{ value ?? '空值' }}</output>
  </div>
</template>
<style scoped>
.number-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.number-demo__options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
```

## 外观与布局

### 外观组合

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                        | 相关示例                             |
| ------------- | --------------------------- | ------------------------------------ |
| `size`        | 五档均完整实现，可继承      | 表单控件尺寸对照、五档尺寸与字段外观 |
| `variant`     | 字段外观，可继承 InputGroup | 表单控件尺寸对照、五档尺寸与字段外观 |
| `placeholder` | 输入提示                    | 表单控件尺寸对照、五档尺寸与字段外观 |
| `min`         | 最小值                      | 外观组合                             |
| `max`         | 最大值                      | 外观组合                             |
| `disabled`    | 禁用；未设置时继承          | 表单控件尺寸对照                     |

<!-- demo-config-notes:end -->

适用于数量、配额等数值输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/input-number/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref(3)
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
        <mp-input-number
          v-model="value"
          :min="0"
          :max="10"
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        ></mp-input-number>
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

### 三种布局

Example source: src/input-number/example/demos/field-modes.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const embed = ref(1)
const button = ref(1)
const input = ref(1)
</script>
<template>
  <div class="number-demo">
    <label>内嵌步进<mp-input-number v-model="embed" mode="embed" /></label>
    <label>左右按钮（便于触控）<mp-input-number v-model="button" mode="button" /></label>
    <label>纯输入<mp-input-number v-model="input" mode="input" /></label>
    <p>按钮可长按；输入框内使用 ↑ / ↓ 步进，Enter 或失焦提交。</p>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

### 五档尺寸与字段外观

Example source: src/input-number/example/demos/field-options.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['outline', 'filled', 'standard'] as const
</script>
<template>
  <div class="number-demo">
    <label v-for="size in sizes" :key="size">{{ size }}<mp-input-number :size="size" :default-value="12" /></label>
    <label v-for="variant in variants" :key="variant"
      >{{ variant }}<mp-input-number :variant="variant" hint placeholder="金额" :default-value="12"
    /></label>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

## 数值输入与格式

### 数量控制与提交拦截

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置        | 作用                         | 相关示例                                           |
| ----------- | ---------------------------- | -------------------------------------------------- |
| `clearable` | 允许清空可编辑字段           | 数量控制与提交拦截、格式化与插槽、小步长与范围边界 |
| `mode`      | 步进按钮布局                 | 数量控制与提交拦截、格式化与插槽                   |
| `min`       | 最小值                       | 数量控制与提交拦截、小步长与范围边界               |
| `max`       | 最大值                       | 数量控制与提交拦截、小步长与范围边界               |
| `step`      | 正的有限步长，支持科学计数法 | 数量控制与提交拦截、小步长与范围边界               |
| `formatter` | 只格式化展示，不改变业务数字 | 格式化与插槽、小步长与范围边界                     |

<!-- demo-config-notes:end -->

`disable-input` 只禁止手输与清空，按钮和方向键仍可步进。`disable-increment` / `disable-decrement` 分别禁用方向；`increment-button` / `decrement-button` 控制显示，隐藏的方向同样不能通过键盘触发。`press=false` 关闭连续长按。



`step(value, direction, event)` 只在已允许且实际改变的步进发生时触发，direction 为 `plus` 或 `minus`。外部回填、拒绝、边界、隐藏或禁用的方向均不触发。

| Prop                                      | Type      | Default |
| ----------------------------------------- | --------- | ------- |
| `disable-input`                           | `boolean` | `false` |
| `disable-increment` | `boolean` | `false` |
| `disable-decrement` | `boolean` | `false` |
| `increment-button` | `boolean` | `true` |
| `decrement-button` | `boolean` | `true` |
| `press`                                   | `boolean` | `true`  |

Example source: src/input-number/example/demos/quantity-controls.vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'

const props = defineProps<{ english?: boolean }>()
const value = ref<number | null | undefined>(2)
const disableInput = ref(true)
const disableIncrement = ref(false)
const disableDecrement = ref(false)
const incrementButton = ref(true)
const decrementButton = ref(true)
const press = ref(true)
const lastStep = ref('—')
function handleStep(next: number, direction: string) {
  lastStep.value = `${direction}: ${next}`
}
const approved = ref<number | null | undefined>(2)
const blocked = ref(false)
const pending = ref(false)
const status = ref('—')
const decision = shallowRef<((allowed: boolean) => void) | undefined>()
const fail = shallowRef<(() => void) | undefined>()
function beforeCommit(
  { value: next }: { value: unknown },
  _done: (allow?: boolean) => void,
  { signal }: { signal: AbortSignal },
) {
  pending.value = true
  status.value = props.english ? `Waiting to commit ${next ?? 'empty'}` : `等待提交 ${next ?? '空值'}`
  return new Promise<void | false>((resolve, reject) => {
    const cleanup = () => {
      signal.removeEventListener('abort', cancel)
      pending.value = false
      decision.value = undefined
      fail.value = undefined
    }
    const cancel = () => {
      cleanup()
      status.value = props.english ? 'Cancelled; old result ignored' : '已取消，旧结果不再生效'
      resolve(false)
    }
    signal.addEventListener('abort', cancel, { once: true })
    decision.value = (allowed) => {
      cleanup()
      status.value = allowed ? (props.english ? 'Approved' : '已允许') : props.english ? 'Rejected' : '已拒绝'
      resolve(allowed ? undefined : false)
    }
    fail.value = () => {
      cleanup()
      status.value = props.english ? 'Request failed; value preserved' : '请求失败，保留原值'
      reject(new Error(props.english ? 'Quantity request failed' : '数量提交失败'))
    }
  })
}
onBeforeUnmount(() => decision.value?.(false))
</script>

<template>
  <div class="quantity-controls-demo">
    <h4>{{ english ? 'Quantity controls and step direction' : '数量控制与步进方向' }}</h4>
    <mp-space wrap>
      <mp-checkbox v-model="disableInput" edit-mode="direct">{{ english ? 'Buttons only' : '禁止手输' }}</mp-checkbox>
      <mp-checkbox v-model="disableIncrement" edit-mode="direct">{{
        english ? 'Disable increase' : '禁用增加'
      }}</mp-checkbox>
      <mp-checkbox v-model="disableDecrement" edit-mode="direct">{{
        english ? 'Disable decrease' : '禁用减少'
      }}</mp-checkbox>
      <mp-checkbox v-model="incrementButton" edit-mode="direct">{{
        english ? 'Show increase' : '显示增加'
      }}</mp-checkbox>
      <mp-checkbox v-model="decrementButton" edit-mode="direct">{{
        english ? 'Show decrease' : '显示减少'
      }}</mp-checkbox>
      <mp-checkbox v-model="press" edit-mode="direct">{{ english ? 'Long press' : '开启长按' }}</mp-checkbox>
    </mp-space>
    <mp-input-number
      v-model="value"
      edit-mode="direct"
      mode="button"
      aria-label="数量控制示例"
      :disable-input="disableInput"
      :disable-increment="disableIncrement"
      :disable-decrement="disableDecrement"
      :increment-button="incrementButton"
      :decrement-button="decrementButton"
      :press="press"
      :min="0"
      :max="10"
      @step="handleStep"
    />
    <p role="status">{{ english ? 'Accepted step' : '已接受的步进' }}：{{ lastStep }}</p>
    <h4>{{ english ? 'Approve, reject or cancel an asynchronous commit' : '异步允许、拒绝与取消提交' }}</h4>
    <p>
      {{
        english
          ? 'Step, type or clear the value, then choose an approval result below. Pending operations cannot overlap. External updates and disabling cancel the old request.'
          : '加减、输入或清空后，在下方手动选择审批结果。等待时不能重复提交；外部回填或禁用会取消旧请求。'
      }}
    </p>
    <mp-input-number
      v-model="approved"
      edit-mode="direct"
      mode="button"
      clearable
      aria-label="异步数量示例"
      :before-commit="beforeCommit"
      loading-mode="line"
      :disabled="blocked"
    />
    <mp-space wrap>
      <mp-button :disabled="!pending" @click="decision?.(true)">{{ english ? 'Approve' : '允许本次变更' }}</mp-button>
      <mp-button :disabled="!pending" @click="decision?.(false)">{{ english ? 'Reject' : '拒绝本次变更' }}</mp-button>
      <mp-button :disabled="!pending" @click="fail?.()">{{ english ? 'Simulate failure' : '模拟失败' }}</mp-button>
      <mp-button @click="approved = 10">{{ english ? 'Set external value to 10' : '外部回填 10' }}</mp-button>
      <mp-button @click="blocked = !blocked">{{
        blocked ? (english ? 'Enable' : '恢复可用') : english ? 'Disable' : '禁用控件'
      }}</mp-button>
    </mp-space>
    <p role="status">{{ status }}；{{ english ? 'Committed value' : '已提交值' }}：{{ approved ?? '—' }}</p>
  </div>
</template>
```

### 格式化与插槽

Example source: src/input-number/example/demos/format-slots.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(12)
const formatter = (text: string) => text.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const parser = (text: string) => text.replace(/,/g, '')
</script>
<template>
  <mp-input-number v-model="value" :formatter="formatter" :parser="parser" clearable mode="button">
    <template #prepend>预算</template>
    <template #prefix>¥</template>
    <template #suffix>元</template>
    <template #append>含税</template>
    <template #plus>＋</template>
    <template #minus>－</template>
    <template #clear-icon="{ clear }"
      ><mp-button html-type="button" aria-label="清空金额" @click="clear">×</mp-button></template
    >
  </mp-input-number>
</template>
```

### 小步长与范围边界

Example source: src/input-number/example/demos/number-boundaries.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const tiny = ref(0)
const negative = ref<number>()
const bounded = ref(0.1)
const amount = ref(12)
const formatter = (value: string) => '$' + value
const parser = (value: string) => value.replace(/^\$/, '')
</script>

<template>
  <div class="number-boundaries-demo">
    <label>
      <span>科学计数法步长：1e-7</span>
      <mp-input-number v-model="tiny" :step="1e-7" :precision="0" />
      <output>{{ tiny }}</output>
    </label>
    <label>
      <span>空值开始，最大值为 -1</span>
      <mp-input-number v-model="negative" :max="-1" clearable />
      <output>{{ negative ?? '空值' }}</output>
    </label>
    <label>
      <span>边界优先：最大值 0.15，精度 1</span>
      <mp-input-number v-model="bounded" :min="0" :max="0.15" :step="0.1" :precision="1" />
      <output>{{ bounded }}</output>
    </label>
    <label>
      <span>格式化展示与业务数字分离</span>
      <mp-input-number v-model="amount" :formatter="formatter" :parser="parser" model-event="input" />
      <output>{{ amount }}</output>
    </label>
  </div>
</template>

<style scoped>
.number-boundaries-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.number-boundaries-demo label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.number-boundaries-demo output {
  font-variant-numeric: tabular-nums;
}
</style>
```

### 空值标记与有效的 0

接口用 -1 表示未填写时，同时配置 empty-values 与 empty-value。初始输入框为空而模型仍为 -1；点击“设为 0”后应显示 0；清空再次返回 -1。另一字段清空恢复为 0，演示清空输出不一定代表缺失。

Example source: src/input-number/example/demos/empty-value.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ quantity: -1 as number | null | undefined })
const restored = ref<number | null | undefined>(12)
</script>
<template>
  <mp-space direction="column">
    <p>-1 表示未填写，输入框显示空白；0 仍显示为有效数字。清空返回 -1。</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="quantity" label="数量">
        <mp-input-number
          v-model="model.quantity"
          edit-mode="direct"
          clearable
          :empty-values="[null, undefined, -1]"
          :empty-value="-1"
        />
      </mp-form-item>
    </mp-form>
    <mp-space wrap>
      <mp-button @click="model.quantity = 0">设为 0</mp-button>
      <mp-button @click="model.quantity = -1">设为 -1</mp-button>
    </mp-space>
    <p>
      当前模型: <output>{{ String(model.quantity) }}</output>
    </p>
    <p>此字段清空后恢复为 0，0 仍是有效值，不会显示为空。</p>
    <mp-form layout="vertical">
      <mp-form-item label="清空恢复有效的 0">
        <mp-input-number v-model="restored" edit-mode="direct" clearable :empty-value="0" />
        <output>{{ String(restored) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

## 交互与表单

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置        | 作用                          | 相关示例                   |
| ----------- | ----------------------------- | -------------------------- |
| `disabled`  | 禁用；未设置时继承            | 交互状态切换、表单继承     |
| `readonly`  | 只读；允许聚焦复制，禁止改值  | 交互状态切换、表单继承     |
| `clearable` | 允许清空可编辑字段            | 受控值与事件顺序、表单继承 |
| `min`       | 最小值                        | 交互状态切换               |
| `max`       | 最大值                        | 交互状态切换               |
| `error`     | 错误态；未设置时继承 FormItem | 交互状态切换               |

<!-- demo-config-notes:end -->

适用于数量、配额等数值输入。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/input-number/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(3)
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-input-number v-model="value" :min="0" :max="10" v-bind="__demoState"></mp-input-number>
  </mp-space>
</template>
```

### 受控值与事件顺序

Example source: src/input-number/example/demos/controlled-events.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number | undefined>(1)
const logs = ref<string[]>([])
function log(name: string, next?: number) {
  logs.value = [name + ': ' + (next ?? '空值'), ...logs.value].slice(0, 6)
}
</script>
<template>
  <div class="number-demo">
    <label
      >父组件接受更新
      <mp-input-number
        v-model="value"
        clearable
        model-event="input"
        @input="(next: number | undefined) => log('input', next)"
        @update:model-value="(next: number | undefined) => log('update', next)"
        @change="(next: number | undefined) => log('change', next)"
        @clear="() => log('clear')"
      />
    </label>
    <label
      >固定受控值，父组件不接受更新
      <mp-input-number :model-value="5" @update:model-value="(next: number | undefined) => log('rejected', next)" />
    </label>
    <p>第二个输入框允许编辑草稿，提交后恢复为 5。外部回填不会触发用户 change。</p>
    <ol aria-live="polite">
      <li v-for="(entry, index) in logs" :key="index">{{ entry }}</li>
    </ol>
  </div>
</template>
<style scoped>
.number-demo,
.number-demo label {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

### 表单继承

Example source: src/input-number/example/demos/form-inheritance.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ quantity: 2, editable: 3 })
const disabled = ref(false)
const readonly = ref(false)
</script>
<template>
  <div class="number-demo">
    <mp-checkbox v-model="disabled">表单禁用</mp-checkbox>
    <mp-checkbox v-model="readonly">表单只读</mp-checkbox>
    <mp-form :model="model" :disabled="disabled" :readonly="readonly" size="lg">
      <mp-form-item field="quantity" label="继承状态">
        <mp-input-number v-model="model.quantity" clearable />
      </mp-form-item>
      <mp-form-item field="editable" label="显式覆盖">
        <mp-input-number v-model="model.editable" :disabled="false" :readonly="false" size="sm" />
      </mp-form-item>
    </mp-form>
  </div>
</template>
<style scoped>
.number-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

### 共享字段加载

`loading` 控制共享字段加载状态；`loading-mode` 为 `default`（指示器）或 `line`（底部不定进度线），默认 `default`。渲染统一由 FieldDecorator 负责，不隐式改变 disabled/readonly；需要禁止编辑时单独设置。

## 组合输入

使用输入法组合文字时保留正在输入的文本，组合完成前外部模型更新不替换这段文本。组合结束后再按原有格式化和受控接受规则处理；旧输入的排队回填不会改写后续编辑或组合的文本与光标。数值更新仍遵守 model-event，失焦或 Enter 的提交时机不变。

## 使用说明

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。



`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-input-number-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。

显式 beforeCommit 等待会沿用现有 loadingMode 指示器并设置实际输入的 aria-busy。手动 loading 保持业务所有权，不会隐式只读；beforeCommit 守卫保留已有输入锁定规则。change/step 等通知返回 Promise 不控制等待。

延迟编辑的 `change` 在有来源时保留真实确认事件，例如保存按钮事件；程序触发的编辑器接力没有 DOM 事件，第二个参数可缺省。事件 target 可能是确认控件，不保证是输入元素。`change` 只通知，不等待监听器返回的 Promise；异步审批请使用 `before-commit`。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### 清空输出

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

### InputNumber Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| empty-value | 清空动作输出值，省略时为 undefined | `number \| null \| undefined \| (() => number \| null \| undefined)` | `undefined` |
| model-value | 受控业务数值，包含 null；未设置时使用内部状态 | `number \| null` | `undefined` |
| default-value | 非受控初始数值，仅创建时读取 | `number` | `undefined` |
| disable-input | 禁止手输，仍可使用步进按钮和方向键 | `boolean` | `false` |
| disable-increment | 独立禁止增加，按钮和方向键均遵守 | `boolean` | `false` |
| disable-decrement | 独立禁止减少，按钮和方向键均遵守 | `boolean` | `false` |
| increment-button | 显示增加按钮 | `boolean` | `true` |
| decrement-button | 显示减少按钮 | `boolean` | `true` |
| press | 长按连续步进；启用审批时不重复请求 | `boolean` | `true` |
| mode | 步进按钮布局 | `'embed' \| 'button' \| 'input'` | `'embed'` |
| precision | 指定精度为 0–100 整数，不低于步长所需的小数位 | `number` | `undefined` |
| step | 正的有限步长 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 是否显示错误状态 | `boolean` | `false` |
| max | 最大提交边界，允许正无穷 | `number` | `Infinity` |
| min | 最小提交边界，允许负无穷 | `number` | `-Infinity` |
| formatter | 编辑器展示格式，不修改业务数值 | `InputNumberFormatter` | `undefined` |
| parser | 解析用户编辑文本，每次编辑调用一次 | `InputNumberParser` | `undefined` |
| placeholder | 占位符，也可作为浮动提示文字 | `string` | `-` |
| size | `xs`、`sm`、`md`、`lg` 或 `xl` | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| variant | `filled`、`outline` 或 `standard` | `string` | `outline` |
| hint | 是否将 placeholder 用作浮动提示文字 | `boolean` | `true` |
| clearable | 是否可清除；有值且可编辑时清除图标常驻显示 | `boolean` | `false` |
| model-event | 模型通知时机；change 始终表示提交 | `'change' \| 'input'` | `'change'` |
| readonly | 是否只读 | `boolean` | `false` |
| input-attrs | 原生补充属性；受控值、状态、ARIA 范围和组件事件由组件管理 | `Record<string, unknown>` | `undefined` |
| edit-mode | 编辑模式；继承 FormItem/Form | `direct / popup` | `undefined` |
| read-pretty | 纯阅读展示；继承 FormItem/Form | `boolean` | `undefined` |
| empty-values | 空值识别集合，显式配置完整替换继承值 | `readonly unknown[]` | 继承组件族策略 |
| empty-text | 纯阅读空值文案，继承 FormItem/Form | `string` | `'-'` |
| before-commit | 直接提交与延迟保存审批：(payload, done, context) | `BeforeFieldCommit` | `undefined` |
| open | 延迟编辑层的受控打开状态 | `boolean` | `undefined` |
| default-open | 非受控编辑层初始打开状态；仅创建时读取 | `boolean` | `false` |
| popup-container | 延迟编辑层挂载目标；false 原地渲染 | `PopupContainer` | `undefined` |
| loading | 手动加载展示；保持可编辑 | `boolean` | `false` |
| loading-mode | 加载呈现布局 | `default / line` | `default` |

min 可为有限数或 -Infinity，max 可为有限数或 Infinity；负数和 0 合法。非法单边界经 Vue Prop 校验提示后回退到对应无界值；min 大于 max 时两端提示并按整体无界处理，不自动交换边界。输入提交、步进和 ARIA 范围共用生效边界，清空标记仍遵循 empty-value。

清空获准后按 **clear → input → update:modelValue → change** 通知；clear 表示动作通知，审批拒绝时不发出。清空目标与当前模型相同时不虚构 change。默认清空值为 undefined，显式 empty-value 可输出 null 或其他受支持数值。

`before-commit(payload, done, context)` 的 payload 为 `{ value, previousValue }`，context 提供 `signal`。同步 void 等待 done；true、done() 或兑现的 `Promise<void>` 允许，false、done(false)、`Promise<false>`、抛错或拒绝取消。direct 模式在不同模型值的提交、步进或清空前审批；`model-event="input"` 也先审批后回填，同值不重复审批。等待期间 aria-busy 为 true，输入和步进操作锁定；外部模型、配置、禁用/只读变化或停用/卸载取消旧请求。direct 审批异常保留原值并通知 `commit-error`；延迟编辑只在最终确认时审批一次，错误使用现有面板反馈。启用审批时长按不连续发起请求，普通事件返回 Promise 不承担审批任务。

### InputNumber Events

| 事件 | 参数 / 类型 | 说明 |
| --- | --- | --- |
| update:modelValue | `number \| null \| undefined` | 模型更新提议 |
| update:open | `boolean` | 编辑层开关请求 |
| open-change | `boolean` | 编辑层开关变化通知 |
| input | `value: number \| null \| undefined, text: string, event: Event` | 用户编辑产生的解析值与展示文本 |
| change | `value: number \| null \| undefined, event?: Event` | 数值提交；延迟来源事件可缺省 |
| clear | `event: Event` | 获准清空的动作通知，先于值通知 |
| step | `value: number, direction: 'plus' \| 'minus', event: Event` | 成功改变数值的步进通知 |
| commit-error | `error: unknown` | direct 审批异常通知；非拒绝布尔值 |
| keydown | `event: KeyboardEvent` | 原生键盘通知，可同步 preventDefault |
| focus | `event: FocusEvent` | 原生输入获得焦点 |
| blur | `event: FocusEvent` | 原生输入失去焦点 |

### InputNumber Slots

| 插槽 | 参数 / 类型 | 说明 |
| --- | --- | --- |
| read | `{ value: number \| null \| undefined; text: string }` | 自定义纯阅读内容 |
| prefix | `-` | 内部前缀 |
| suffix | `-` | 内部后缀 |
| prepend | `-` | 外部前置内容 |
| append | `-` | 外部后置内容 |
| plus | `-` | 增加按钮内容 |
| minus | `-` | 减少按钮内容 |
| clear-icon | `{ clear(event?: Event): void }` | 清除图标或按钮 |

### InputNumber Methods

| 方法 / 属性 | 参数 / 类型 | 说明 |
| --- | --- | --- |
| focus | `focus(options?: FocusOptions): void` | 聚焦已挂载编辑器 |
| blur | `blur(): void` | 使已挂载编辑器失焦 |
| select | `select(): void` | 全选已挂载编辑器的文本 |
| inputRef | `HTMLInputElement \| undefined` | 已挂载的原生数值输入引用 |

## Types

```ts
import type {
  InputNumberFormatter,
  InputNumberInstance,
  InputNumberMode,
  InputNumberModelEvent,
  InputNumberParser,
  InputNumberEmits,
  InputNumberSlots,
  InputNumberExpose,
  InputNumberInstance,
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
} from '@maple-design/ui-vue'
```

## CSS Variables

共享字段外观仍使用 FieldDecorator 的 `--mp-field-*` 变量。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-input-number-addon-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-input-number-addon-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-input-number-addon-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-input-number-border-radius` | `var(--mp-field-border-radius)` | `border-end-end-radius`, `border-end-start-radius`, `border-start-end-radius`, `border-start-start-radius` |
| `--mp-input-number-border-width` | `1px` | `border`, `border-inline-end`, `border-inline-start`, `border-top`, `outline`, `outline-offset` |
| `--mp-input-number-caret-color` | `var(--mp-field-caret-color)` | `caret-color` |
| `--mp-input-number-size-lg-step-button-width` | `var(--mp-sys-control-height-lg)` | `width` |
| `--mp-input-number-size-md-step-button-width` | `var(--mp-sys-control-height-md)` | `width` |
| `--mp-input-number-size-sm-step-button-width` | `var(--mp-sys-control-height-sm)` | `width` |
| `--mp-input-number-size-xl-step-button-width` | `var(--mp-sys-control-height-xl)` | `width` |
| `--mp-input-number-size-xs-step-button-width` | `var(--mp-sys-control-height-xs)` | `width` |
| `--mp-input-number-step-button-active-background` | `var(--mp-sys-color-state-selected)` | `background` |
| `--mp-input-number-step-button-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-input-number-step-button-border-color` | `var(--mp-sys-color-border-subtle)` | `border-inline-end`, `border-inline-start`, `border-top` |
| `--mp-input-number-step-button-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-input-number-step-button-disabled-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-input-number-step-button-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-input-number-step-button-icon-size` | `14px` | `font-size` |
| `--mp-input-number-step-button-transition-duration` | `0.2s` | `transition` |
| `--mp-input-number-step-button-width` | `var(--mp-sys-control-height-md)` | `width` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-input-number-addon-background: var(--mp-sys-color-surface-muted);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
