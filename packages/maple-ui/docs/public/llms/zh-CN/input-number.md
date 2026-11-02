<!-- Source: src/input-number/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/input-number -->

# InputNumber

InputNumber 用于编辑和提交业务数字。两端主体、数值控制器、样式及公开 API 按独立源码复制维护，不共享运行时实例。

- `model-value !== undefined` 表示受控；`default-value` 仅初始化非受控值。编辑草稿允许暂时不同于业务值；提交后若父组件拒绝更新，恢复到父组件值。外部回填不触发用户事件或校验。
- 默认在 Enter / 失焦时更新；`model-event="input"` 输入完整数字时更新，但 `change` 仍在提交时触发。Enter 后再失焦不会重复提交。
- 清空顺序为 **input → update:model-value → change → clear**，值为 `undefined`。这次改造移除了旧的“清空不触发 input/change”行为，不提供兼容分支。
- `-`、`.`、`1.` 等输入中间态暂时保留；提交 `1.` 得到数字 1，单独符号恢复之前的业务值。非法文本、NaN、Infinity 不会写入业务值。IME 组合输入结束后只处理一次。
- 范围优先于精度：舍入后仍限制在 min/max 内，非对齐边界保留实际值。两端采用独立配置的 Decimal 运算，不受应用修改 Decimal 全局配置影响；模型仍是 JavaScript number，不承诺任意精度的大数存储。
- 禁用/只读/尺寸从 InputGroup、FormItem、Form 继承，显式 false 可以覆盖；Cedar 的缺省尺寸再读取 ConfigProvider，Maple 使用现有默认系统。字段外观与 hint 可继承 InputGroup；外层已有 FormItem 标题时不重复显示浮动标签。
- 鼠标、触控都支持长按；释放、取消、移出、窗口失焦、组件停用/卸载或状态变化时停止。移动端建议用 button 布局增加触控面积；↑/↓ 步进，Enter 提交。

所有原生输入统一使用 `autocomplete="off"`，传入原生属性也不会开启自动填充。

## 案例

### 数量控制与提交拦截

`disable-input` 只禁止手输与清空，按钮和方向键仍可步进。`disable-increment` / `disable-decrement` 分别禁用方向；`increment-button` / `decrement-button` 控制显示，隐藏的方向同样不能通过键盘触发。`press=false` 关闭连续长按。

`before-commit(value, { previousValue, signal })` 复用字段提交协议，返回 `false` 拒绝，返回 `void` 允许；可返回 Promise。inline 的输入提交、步进与清空均经过拦截，`model-event="input"` 也需先审批后回填。等待期间公开 `aria-busy`、锁定操作，外部回填、禁用、只读、配置变化、停用或卸载会取消旧请求。不要把 signal 取消当作成功。抛错保留原值并触发 `commit-error(error)`。popup 在最终确认时拦截一次，内部草稿不重复审批；错误使用面板现有反馈。启用拦截时，长按不会连续发起审批。

`step(value, direction, event)` 只在已允许且实际改变的步进发生时触发，direction 为 `plus` 或 `minus`。外部回填、拒绝、边界、隐藏或禁用的方向均不触发。



| Prop | Type | Default |
| --- | --- | --- |
| `disable-input` | `boolean` | `false` |
| `disable-increment` / `disable-decrement` | `boolean` | `false` |
| `increment-button` / `decrement-button` | `boolean` | `true` |
| `press` | `boolean` | `true` |

Example source: src/input-number/example/demos/quantity-controls.vue

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef } from 'vue'

const props = defineProps<{ english?: boolean }>()
const value = ref<number | undefined>(2)
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
const approved = ref<number | undefined>(2)
const blocked = ref(false)
const pending = ref(false)
const status = ref('—')
const decision = shallowRef<((allowed: boolean) => void) | undefined>()
const fail = shallowRef<(() => void) | undefined>()
function beforeCommit(next: unknown, { signal }: { signal: AbortSignal }) {
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
      <mp-checkbox v-model="disableInput" presentation="inline">{{
        english ? 'Buttons only' : '禁止手输'
      }}</mp-checkbox>
      <mp-checkbox v-model="disableIncrement" presentation="inline">{{
        english ? 'Disable increase' : '禁用增加'
      }}</mp-checkbox>
      <mp-checkbox v-model="disableDecrement" presentation="inline">{{
        english ? 'Disable decrease' : '禁用减少'
      }}</mp-checkbox>
      <mp-checkbox v-model="incrementButton" presentation="inline">{{
        english ? 'Show increase' : '显示增加'
      }}</mp-checkbox>
      <mp-checkbox v-model="decrementButton" presentation="inline">{{
        english ? 'Show decrease' : '显示减少'
      }}</mp-checkbox>
      <mp-checkbox v-model="press" presentation="inline">{{ english ? 'Long press' : '开启长按' }}</mp-checkbox>
    </mp-space>
    <mp-input-number
      v-model="value"
      presentation="inline"
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
      presentation="inline"
      mode="button"
      clearable
      aria-label="异步数量示例"
      :before-commit="beforeCommit"
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
      <mp-checkbox v-model="disabled" presentation="inline">禁用</mp-checkbox>
      <mp-checkbox v-model="readonly" presentation="inline">只读</mp-checkbox>
      <mp-checkbox v-model="clearable" presentation="inline">可清空</mp-checkbox>
      <mp-checkbox v-model="hint" presentation="inline">浮动提示</mp-checkbox>
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

### 外观组合

适用于数量、配额等数值输入。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/input-number/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(3)
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
    <mp-input-number v-model="value" :min="0" :max="10" v-bind="__demoAppearance"></mp-input-number>
  </mp-space>
</template>
```

### 交互状态切换

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

## API

### Props

| 属性          | 说明                                         | 类型                            | 默认值           |
| ------------- | -------------------------------------------- | ------------------------------- | ---------------- |
| model-value   | 受控值；undefined 表示空值/非受控            | `number`                        | —                |
| default-value | 非受控初始值                                 | `number`                        | —                |
| mode          | 步进按钮布局                                 | `embed \| button \| input`      | `embed`          |
| precision     | 小数位数 0–100，不小于 step 的小数位         | `number`                        | —                |
| step          | 正的有限步长，支持科学计数法                 | `number`                        | `1`              |
| disabled      | 禁用；未设置时继承                           | `boolean`                       | 继承，否则 false |
| error         | 错误态；未设置时继承 FormItem                | `boolean`                       | 继承，否则 false |
| max           | 最大值                                       | `number`                        | `Infinity`       |
| min           | 最小值                                       | `number`                        | `-Infinity`      |
| formatter     | 只格式化展示，不改变业务数字                 | `(text: string) => string`      | —                |
| parser        | 每次编辑解析一次原始输入                     | `(text: string) => string`      | —                |
| placeholder   | 输入提示                                     | `string`                        | —                |
| size          | 五档均完整实现，可继承                       | `xs \| sm \| md \| lg \| xl`    | 继承，否则 md    |
| variant       | 字段外观，可继承 InputGroup                  | `outline \| filled \| standard` | `outline`        |
| hint          | 浮动提示，可继承 InputGroup / FieldDecorator | `boolean`                       | 库默认           |
| clearable     | 允许清空可编辑字段                           | `boolean`                       | `false`          |
| model-event   | model 更新时机；change 仍只在提交时触发      | `change \| input`               | `change`         |
| readonly      | 只读；允许聚焦复制，禁止改值                 | `boolean`                       | 继承，否则 false |
| input-attrs   | 原生 input 补充属性                          | `Record<string, unknown>`       | —                |

### Events

| 事件               | 参数                                                       | 说明                                         |
| ------------------ | ---------------------------------------------------------- | -------------------------------------------- |
| input              | `(value: number \| undefined, text: string, event: Event)` | 编辑后解析值与展示文本                       |
| update:model-value | `(value: number \| undefined)`                             | 请求修改业务值                               |
| change             | `(value: number \| undefined, event: Event)`               | 提交、步进或清空                             |
| clear              | `(event: Event)`                                           | 主动清空                                     |
| focus              | `(event: FocusEvent)`                                      | 获取焦点                                     |
| blur               | `(event: FocusEvent)`                                      | 失去焦点                                     |
| keydown            | `(event: KeyboardEvent)`                                   | 原生键盘事件，可 preventDefault 拦截默认操作 |

### Slots

| 插槽             | 参数                                 | 说明           |
| ---------------- | ------------------------------------ | -------------- |
| prefix / suffix  | —                                    | 字段内部前后缀 |
| prepend / append | —                                    | 字段外部标签   |
| plus / minus     | —                                    | 步进按钮图标   |
| clear-icon       | `{ clear: (event?: Event) => void }` | 自定义清除按钮 |

### Methods

| 方法 / 属性 | 类型                               | 说明             |
| ----------- | ---------------------------------- | ---------------- |
| focus       | `(options?: FocusOptions) => void` | 聚焦，禁用时无效 |
| blur        | `() => void`                       | 失焦             |
| select      | `() => void`                       | 选中输入内容     |
| inputRef    | `HTMLInputElement \| undefined`    | 原生输入元素     |

## 类型定义 / Types

```ts
import type {
  InputNumberFormatter,
  InputNumberInstance,
  InputNumberMode,
  InputNumberModelEvent,
  InputNumberParser,
  InputNumberProps,
  InputNumberSize,
  InputNumberVariant,
} from '@maple-design/ui'
```

## 样式变量

| Token                                               | Default                                 |
| --------------------------------------------------- | --------------------------------------- |
| `--mp-input-number-step-button-width`               | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-step-button-color`               | `var(--mp-sys-color-content-secondary)` |
| `--mp-input-number-step-button-disabled-color`      | `var(--mp-sys-color-content-disabled)`  |
| `--mp-input-number-step-button-border-color`        | `var(--mp-sys-color-border-subtle)`     |
| `--mp-input-number-step-button-background`          | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-step-button-hover-background`    | `var(--mp-sys-color-state-hover)`       |
| `--mp-input-number-step-button-active-background`   | `var(--mp-sys-color-state-selected)`    |
| `--mp-input-number-step-button-icon-size`           | `14px`                                  |
| `--mp-input-number-step-button-transition-duration` | `0.2s`                                  |
| `--mp-input-number-addon-background`                | `var(--mp-sys-color-surface-muted)`     |
| `--mp-input-number-addon-color`                     | `var(--mp-sys-color-content-primary)`   |
| `--mp-input-number-addon-border-color`              | `var(--mp-sys-color-border-default)`    |
| `--mp-input-number-border-width`                    | `1px`                                   |
| `--mp-input-number-border-radius`                   | `var(--mp-field-border-radius)`         |
| `--mp-input-number-size-xs-step-button-width`       | `var(--mp-sys-control-height-xs)`       |
| `--mp-input-number-size-sm-step-button-width`       | `var(--mp-sys-control-height-sm)`       |
| `--mp-input-number-size-md-step-button-width`       | `var(--mp-sys-control-height-md)`       |
| `--mp-input-number-size-lg-step-button-width`       | `var(--mp-sys-control-height-lg)`       |
| `--mp-input-number-size-xl-step-button-width`       | `var(--mp-sys-control-height-xl)`       |

字段通用外观继续使用 FieldDecorator 的 `--mp-field-*` Token。旧 step-layer-border-radius 已移除，不保留别名。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留直接编辑。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

统一光标色通过 `--mp-field-caret-color` 设置（默认 `currentColor`）；本组件可用 `--mp-input-number-caret-color` 单独覆盖，默认 `var(--mp-field-caret-color)`。

## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。
