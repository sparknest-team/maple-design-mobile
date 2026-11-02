<!-- Source: src/time-range/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/time-range -->

# TimeRange 时间范围

## 案例

### 基本使用

点击任一输入打开同屏双组滚轮。编辑只改草稿，确认后才提交。起止输入之间的焦点移动不触发整个字段的 blur。

Example source: src/time-range/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="range" format="HH:mm" placeholder="请选择时间范围" clearable />
  </mp-space>
</template>
```

### 禁用

Example source: src/time-range/example/demos/disabled.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const disabledRange = ref(['09:00', '18:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="disabledRange" format="HH:mm" disabled />
  </mp-space>
</template>
```

### 手输与面板选择

`input-editable` 默认为 `false`（Cedar 为 `true`）。开启后点击输入区手输，点击时钟按钮或按 ↓ 打开 picker 面板。回车或失焦提交，Esc 撤销；格式、步长、边界和禁用规则与面板一致。无效输入或父级拒绝受控更新时回到模型值。切换为不可编辑、只读或禁用会丢弃未提交输入；输入法组合期间以及范围两端切换焦点时不提交。

Example source: src/time-range/example/demos/text-entry.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '10:00'])
const editable = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="editable">允许手输</mp-checkbox>
    <p>回车或失焦提交，Esc 撤销。合法范围为 08:00–18:00。点击时钟按钮或按 ↓ 打开面板。</p>
    <mp-time-range v-model="value" :input-editable="editable" format="HH:mm" min="08:00" max="18:00" clearable />
    <span>{{ value }}</span>
  </mp-space>
</template>
```

### 介绍

表单时间范围**字段**，点击后底部弹出选择面板。交互与 `Time` 一致：取消丢弃草稿，确认后才写回 `v-model`。

弹层内使用 [`TimeRangePicker`](../../zh-CN/time-range-picker) 作为选择面板。不显示顶部摘要，左右两组滚轮同时编辑开始和结束时间。

- 默认使用列滚轮面板（时 / 分 / 秒）

### 列滚轮含秒

Example source: src/time-range/example/demos/picker-seconds.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const range = ref([])
const rangePickerSeconds = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="rangePickerSeconds" format="HH:mm:ss" placeholder="列滚轮含秒" clearable />
  </mp-space>
</template>
```

### 24 小时制与秒

Example source: src/time-range/example/demos/hour24.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const range = ref([])
const range24 = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="range24" format="HH:mm:ss" placeholder="含秒的时间范围" clearable />
  </mp-space>
</template>
```

### 自定义分隔符

Example source: src/time-range/example/demos/separator.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const customSeparator = ref(['09:00', '18:00'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time-range v-model="customSeparator" format="HH:mm" separator=" 至 " placeholder="自定义分隔符" clearable />
  </mp-space>
</template>
```

### 次日标记

当结束时间早于开始时间时，开启 `show-next-day` 会按次日处理并显示「次日」，保持起止顺序。未开启时保留草稿，在底部显示红色提示并禁用确认。“此刻”只更新当前操作的一端，不交换起止。独立面板、内嵌和弹层行为一致。

Example source: src/time-range/example/demos/next-day.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const language = ref('zh-CN')
const english = computed(() => language.value === 'en-US')
watchLang((value) => {
  language.value = value
})

const range = ref<string[] | undefined>(['22:00', '06:00'])
const reset = () => {
  range.value = ['22:00', '06:00']
}
</script>

<template>
  <section class="time-overnight-demo">
    <mp-time-range v-model="range" format="HH:mm" input-editable show-next-day clearable />
    <output aria-label="Overnight model">{{ range === undefined ? 'undefined' : JSON.stringify(range) }}</output>
    <mp-button @click="reset">{{ english ? 'Reset' : '重置' }}</mp-button>
  </section>
</template>

<style scoped>
.time-overnight-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 360px;
}
</style>
```

此示例开启文本编辑并显示模型，保留 22:00→次日06:00 的端点顺序；清除为 `undefined`，可通过重置按钮恢复。`show-next-day` 表示时间顺序与标签，不将模型自动转换为下一日日期。

### 搭配 FormItem

Example source: src/time-range/example/demos/with-form-item.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const form = ref(null)
const formData = reactive({
  period: [],
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-form ref="form" :model="formData">
      <mp-form-item field="period" label="时段" required>
        <mp-time-range v-model="formData.period" format="HH:mm" placeholder="请选择" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```


禁用 API 与 Cedar 一致：`disabled-hours`、`disabled-minutes`、`disabled-seconds`，不再支持旧 `disabled-time`。两种面板均遵守包含边界的同日 `min/max`；跨日范围使用 `show-next-day`。不显示秒时按秒为 0 判断。打开字段时草稿对齐到最近合法候选，不自动写回外部值；确认前再次校验。无候选时不可确认，运行中修改限制后非法草稿不会提交。

### 滚轮约束与动态禁用

Example source: src/time-range/example/demos/wheel-limits.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['10:30:40', '11:00:00'])
const locked = ref(false)
const disabledHours = () => (locked.value ? Array.from({ length: 24 }, (_, hour) => hour) : [])
const disabledMinutes = (hour) => (hour === 10 ? [45] : [])
const disabledSeconds = (hour, minute) => (hour === 10 && minute === 30 ? [41, 43, 45] : [])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>可选范围 10:30:38–11:30:02。切换小时后分钟和秒联动；禁用全部小时后无法确认。</p>
    <mp-button @click="locked = !locked">{{ locked ? '恢复可选' : '禁用全部小时' }}</mp-button>
    <mp-time-range
      v-model="value"
      format="HH:mm:ss"
      panel-type="picker"
      min="10:30:38"
      max="11:30:02"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
```

### AM/PM 与午夜/中午

Example source: src/time-range/example/demos/ampm.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['11:30 pm', '12:30 am'])
const workday = ref(['09:00 AM', '06:00 PM'])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>分别切换起止端的 AM/PM；12 AM 是午夜，12 PM 是中午。</p>
    <mp-time-range v-model="value" format="hh:mm a" use12-hours show-next-day style="width: 100%; max-width: 360px" />

    <mp-time-range v-model="workday" format="hh:mm A" use12-hours />
    <mp-time-range-picker v-model="value" format="hh:mm a" use12-hours show-next-day />
    <span>当前值: {{ value }}</span>
  </mp-space>
</template>
```

### 时分秒步长

Example source: src/time-range/example/demos/step.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['09:30:00', '17:00:00'])
const step = { hour: 1, minute: 15, second: 10 }
const use12Hours = ref(false)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>小时步长 1，分钟步长 15，秒步长 10。</p>
    <mp-checkbox v-model="use12Hours" presentation="inline">12 小时面板，模型仍为 HH:mm:ss</mp-checkbox>
    <mp-time-range
      v-model="value"
      presentation="inline"
      format="HH:mm:ss"
      :use12-hours="use12Hours"
      :step="step"
      style="width: 100%; max-width: 360px"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
```

可切换十二小时面板，分钟/秒步长保持不变；显式 `HH:mm:ss` 仍决定模型格式，AM/PM 选择转换为对应的 24 小时值。

`format` 与 Cedar 一致：用于字符串模型的解析、显示和提交格式。默认 `HH:mm:ss`；仅开启 `use12-hours` 时默认 `hh:mm:ss a`。不选秒使用 `HH:mm`，大写 AM/PM 使用 `hh:mm A`，固定文字使用 `[Time] HH:mm`。模型支持格式化字符串、按本地时间读取的 Date 和毫秒时间戳；输出始终为格式化字符串（范围为数组）。非法输入不自动纠正或回写。`min/max` 仍使用 24 小时 `HH:mm[:ss]` 字符串，禁用回调始终接收真实的 0–23 小时。Time 旧 `use-seconds` 和 format 枚举已删除，不保留别名。

### 模型类型与固定文字

Example source: src/time-range/example/demos/format-model.vue

```vue
<script setup>
import { ref } from 'vue'

const date = new Date(2026, 8, 23, 13, 5, 9)
const later = new Date(2026, 8, 23, 18, 30, 0)
const value = ref([date, later.getTime()])
const literal = ref(['Time 09:30', 'Time 18:00'])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Date 和时间戳按本地时间反显；选择后返回格式化字符串。</p>
    <mp-time-range v-model="value" format="hh:mm A" style="width: 100%; max-width: 360px" />
    <span>当前模型: {{ value }}</span>
    <mp-time-range v-model="literal" format="[Time] HH:mm" style="width: 100%; max-width: 360px" />
    <span>固定文字格式: {{ literal }}</span>
  </mp-space>
</template>
```

### 默认值与受控值

`defaultValue` 初始化字段/纯面板的非受控值，仅读取一次；后续选择保存在各自实例。传入 `modelValue` 后以父级值为准。字段 `defaultOpen` 只初始化一次；受控 `open` 需父级接收 `update:open`，`open-change(open: boolean)` 通知显隐请求。`clear` 不携带参数。纯面板支持 `disabled`，同时禁用范围两端。

Example source: src/time-range/example/demos/default-state.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '10:00'])
const open = ref(false)
const acceptValue = ref(true)
const acceptOpen = ref(true)
const acceptClose = ref(true)
const commits = ref(0)
const proposal = ref()
const openProposal = ref()
const updateValue = (next) => {
  proposal.value = next
  if (acceptValue.value) {
    value.value = next
  }
}
const updateOpen = (next) => {
  openProposal.value = next
  if (acceptOpen.value && (next || acceptClose.value)) {
    open.value = next
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <p>非受控初始值，无需绑定 v-model</p>
    <mp-time-range presentation="inline" :default-value="['09:00', '10:00']" format="HH:mm" clearable />
    <p>受控值与展开状态</p>
    <mp-checkbox v-model="acceptValue" presentation="inline">接受值更新</mp-checkbox>
    <mp-checkbox v-model="acceptOpen" presentation="inline">接受展开更新</mp-checkbox>
    <mp-time-range
      presentation="inline"
      :model-value="value"
      :open="open"
      format="HH:mm"
      clearable
      @update:model-value="updateValue"
      @update:open="updateOpen"
      @change="commits++"
    />
    <span>{{ value }} / {{ open }}</span>
    <mp-checkbox v-model="acceptClose" presentation="inline">接受关闭请求</mp-checkbox>
    <output aria-label="Commit count">{{ commits }}</output>
    <output aria-label="Controlled proposals">{{ JSON.stringify({ value: proposal, open: openProposal }) }}</output>
  </div>
</template>
```

示例可分别拒绝值更新与展开更新：拒绝时保留父级模型/显隐，提案单独显示；重新打开从父级模型恢复。关闭请求不代表父级已接受。

父级拒绝关闭、面板保持展开时，没有新选择的重复确认不会重复提交；再次选择新时间会开启新事务，可重新确认提交。

### 选择与提交

字段的 `focus` / `blur` 事件均无参数，同一次聚焦或失焦只通知一次；范围两端切换不产生额外整字段事件。只读字段仍可聚焦，但不能展开修改；禁用字段不能聚焦，已聚焦时动态禁用会释放焦点状态并通知失焦。

字段和纯面板提交时按当前格式、步长及禁用规则重新校验；手动输入也遵守相同规则。规则变化不会自动改写已提交值。范围始终保留起止顺序；结束早于开始时仅在开启 `show-next-day` 后允许提交，否则底部红字提示并禁用确认。清空仍提交 `undefined`，不受候选时间限制，但遵守只读/禁用状态。

`select(value, date)` 表示用户选择草稿，`change(value, date)` 表示提交。单值和范围字段清除均返回 `undefined`，对应 Date 参数也为 `undefined`，`clear` 不带参数。Date 参数是本地时间表示（不自动进行次日日期运算）。字段默认确认后提交；`disable-confirm` 开启后仅有效选择立即提交并请求关闭，不允许次日时的逆序草稿仍不能提交。受控 `open` 仍需父级接受更新。独立纯面板同样默认确认后提交；开启 disable-confirm 后有效选择立即提交，但不会关闭面板。

Example source: src/time-range/example/demos/selection-events.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '18:00'])
const immediate = ref(false)
const readonly = ref(false)
const disabled = ref(false)
const events = ref([])
function record(name, value, dates) {
  const times = Array.isArray(dates) ? dates.map((date) => date?.toLocaleTimeString()) : dates?.toLocaleTimeString()
  events.value = [JSON.stringify({ event: name, value: value ?? null, time: times ?? null }), ...events.value].slice(
    0,
    5,
  )
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <mp-checkbox v-model="readonly">只读：可聚焦，不可修改</mp-checkbox>
    <mp-checkbox v-model="disabled">禁用：释放焦点，不可修改</mp-checkbox>
    <mp-checkbox v-model="immediate">选择后立即提交</mp-checkbox>
    <p>select 记录草稿，change 记录提交；取消不改模型，清除返回 undefined。</p>
    <mp-time-range
      v-model="value"
      :disable-confirm="immediate"
      :readonly="readonly"
      :disabled="disabled"
      format="HH:mm"
      clearable
      @select="(value, dates) => record('select', value, dates)"
      @change="(value, dates) => record('change', value, dates)"
      @clear="record('clear')"
      @click="record('click')"
      @open-change="(open) => record('open-change', open)"
      @focus="record('focus')"
      @blur="record('blur')"
    />
    <span>模型: {{ value === undefined ? 'undefined' : value }}</span>
    <mp-button variant="outline" @click="value = ['15:30', '18:00']">从外部替换模型</mp-button>
    <small>外部替换会更新反显，不触发 select 或 change。</small>
    <div v-for="(event, index) in events" :key="index" style="overflow-wrap: anywhere">{{ event }}</div>
  </div>
</template>
```

父级直接替换模型会重置草稿，但不会触发 `select` 或 `change`。示例提供“外部更新”按钮，可与用户选择、确认提交分别观察。

### 纯面板确认与禁用选项

纯面板默认确认后提交：选择时仅发 select，确认后才更新模型并发 change；disable-confirm 开启后有效选择立即提交。hide-disabled-options 默认 false，开启后隐藏禁用项；时钟保留原刻度角度。字段和日期组件内部显式跳过子面板确认，由外层负责提交。外部模型替换会重置草稿，不主动派发事件。

Example source: src/time-range/example/demos/panel-behavior.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['09:30', '18:00'])
const immediate = ref(false)
const readonly = ref(false)
const confirmations = ref(0)
const hideDisabled = ref(false)
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <mp-checkbox v-model="immediate">跳过确认，选择即提交</mp-checkbox>
    <mp-checkbox v-model="hideDisabled">隐藏禁用小时（00–07）</mp-checkbox>
    <mp-checkbox v-model="readonly">只读（草稿不可提交）</mp-checkbox>
    <mp-button variant="outline" @click="value = ['11:00', '20:00']">外部替换模型</mp-button>
    <mp-time-range-picker
      v-model="value"
      format="HH:mm"
      :disable-confirm="immediate"
      :readonly="readonly"
      :hide-disabled-options="hideDisabled"
      :disabled-hours="disabledHours"
      @confirm="confirmations++"
    >
      <template #extra><p>双组滚轮共用一份草稿，确认后统一提交。</p></template>
    </mp-time-range-picker>
    <span>有效确认次数: {{ confirmations }}</span>
    <span>已提交值: {{ value }}</span>
    <p>默认选择只修改草稿，点击确认后上方的已提交值才会更新。</p>
  </div>
</template>
```

切换只读、隐藏禁用项或开启 `disable-confirm` 不会自动提交此前的草稿；解除只读也不会自动回写。开启立即提交后，下一次合法用户选择才触发提交。只读期间保留当前草稿，禁用项隐藏仅改变候选展示，不代表清空模型。

Maple 在滚轮之间切换时保留起止草稿和当前编辑端，不隐式确认；切换后的展示仍遵守只读。外部替换模型会同步到两种展示，不能保留替换前的旧草稿。

独立面板直接管理自己的草稿与提交状态。外部替换模型会重置草稿，不触发选择或变更事件；只读、禁用均阻止选择和确认。Cedar 使用列表，Maple 使用滚轮，展示层不另建一份草稿。

### 交互状态切换

适用于营业时段等时间范围。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/time-range/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(['09:30', '18:00'])
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-time-range v-model="value" format="HH:mm" v-bind="__demoState"></mp-time-range>
  </mp-space>
</template>
```

## API


`popup-props` 配置锚定字段的 Trigger popover 定位和外观（两端一致）；两端都不能通过它替换 open、disabled 或触发方式，顶层 popup-container（包括 false）优先。面板配置与浮层配置分开。`click(event)` 在非禁用字段点击时通知一次，只读可通知但不展开。关闭统一监听 `open-change(false)`，表示请求而非受控状态已改变；字段 close 事件已移除，不保留别名。

字段图标插槽为 `suffix-icon`，参数为 `focus: boolean`、`popupOpen: boolean`，不再使用 arrow-icon。实例方法 `focus(index = 0)` 聚焦起点（0）或终点（1）而不提交值；`blur()` 失焦并请求关闭。

`placeholder` 支持 `string | string[]`：字符串用于两端；数组分别指定起止文案，缺项为空；显式空字符串不会回退默认文案。

### 字段外壳与配置边界

`hint` 控制浮动提示（Cedar 默认 false，Maple 默认 true），有 Form 外置标签时不启用。`line` 默认 true；`text-color / focus-color / blur-color` 为可选颜色字符串。`error` 未设置时继承 Form，显式 false 覆盖错误态。TimeRange 的 `separator` 默认 ` ~ `，允许空字符串。默认 variant 保留 Cedar filled、Maple standard，可显式指定同一变体。

字段顶层负责值、默认值、展开、格式、步长、边界、禁用规则和只读/禁用状态。请直接在字段上设置这些属性，不放进 timeRangePickerProps。嵌套配置只允许对应面板的展示属性；不能通过模型/确认/选择事件替换字段流程。类型会拒绝此类配置，运行时也过滤，且不会把嵌套规则作为顶层未设置时的回退。

Maple 的 pickerProps 可配置 optionHeight/optionCount 等外观，不可替换 columns、fieldNames、选中值、toolbar 或展开状态。popupProps 可设置定位、外观和生命周期回调，但不能设置 open/defaultOpen 或覆盖展开更新事件；顶层 popupContainer（包括 false）优先。纯时间面板内部的嵌套配置遵循相同规则。

Example source: src/time-range/example/demos/field-appearance.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['09:00', '18:00'])
const hint = ref(true)
const error = ref(false)
const line = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="hint">浮动提示</mp-checkbox>
    <mp-checkbox v-model="error">显式错误状态</mp-checkbox>
    <mp-checkbox v-model="line">边框 / 底线</mp-checkbox>
    <mp-time-range
      v-model="value"
      format="HH:mm"
      variant="outline"
      :placeholder="['开始时间', '结束时间']"
      :hint="hint"
      :error="error"
      :line="line"
      focus-color="#6750a4"
      separator=" → "
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
```


字段交互由本库的一份实例控制器编排：select 暂存草稿，确认时按当前规则校验后提交并通知 Form。清除通过相同提交路径写入 undefined，再通知 clear；只读、禁用或未开启 clearable 时不能清除。只读仍可聚焦，focus/blur 去重；受控关闭请求尚未被接受时，不会重复提交。

面板主体统一管理草稿和确认，展示内容只渲染这一份状态。上方示例展示 extra 插槽及有效确认次数；重复确认相同值会触发 confirm，不会重复触发 change。

### 时间上下限

`min` / `max` 的类型为 `string`，默认不限制；格式固定为 24 小时制 `HH:mm` 或 `HH:mm:ss`，不受 `format` 或 `use12Hours` 影响，包含端点。`HH:mm` 的秒视为 00。范围的两个端点分别校验；`showNextDay` 不把边界变成跨午夜区间。`min > max` 时没有可提交时间。无法解析的边界按未设置处理。

动态修改边界不会改写外部模型。提交须同时满足边界、步长和禁用回调；不显示秒时按秒为 00 校验。列表粗粒度列在整个小时/分钟都越界时禁用，最终确认仍校验完整时间。隐藏禁用项使用 `hide-disabled-options`。

Example source: src/time-range/example/demos/bounds.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['10:30:38', '10:31:02'])
const narrow = ref(false)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>包含边界：10:30:38–10:31:02。收紧边界不会改写已有模型，但越界值无法确认。</p>
    <mp-checkbox v-model="narrow">将下限调整为 10:30:40</mp-checkbox>
    <mp-time-range
      v-model="value"
      input-editable
      format="HH:mm:ss"
      :min="narrow ? '10:30:40' : '10:30:38'"
      max="10:31:02"
    />
    <mp-time-range-picker v-model="value" format="HH:mm:ss" :min="narrow ? '10:30:40' : '10:30:38'" max="10:31:02" />
    <span>{{ value }}</span>
  </mp-space>
</template>
```

### 纯面板事件与插槽边界

`TimePicker` / `TimeRangePicker` 不管理字段或弹层；`open`、`size`、`variant`、清除和浮层配置应传给 `Time` / `TimeRange`。

- `select(value, date)`：修改草稿。
- `change(value, date)`：有效确认且值变化时触发，并更新模型。
- `confirm(value, date)`：每次有效确认均触发，包括值未变化；`disableConfirm` 模式在有效选择提交时也触发。禁用、只读或无效草稿不会触发。
- `extra`：附加说明内容。
- `actions({ confirm, canConfirm, value })`：替换默认操作栏；`value` 是草稿，调用 `confirm()` 提交，并根据 `canConfirm` 禁用按钮。

单时间事件值为格式化字符串及 Date；范围事件值为对应数组。纯面板不再派发 `open-change`、`update:open` 或 `clear`。


字段使用两端独立同源的 PickerField → FieldDecorator。面板编辑草稿，确认才写回；取消或关闭不写回，清除立即提交空值并关闭。移动端字段不唤起软键盘。四类字段的组合示例见 Date 文档“统一字段与提交”。

### 属性

| 参数                      | 说明                                                                                                   | 类型                              | 默认值     |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------- | ---------- |
| `v-model` | 绑定值 | _TimeValue[]_ | `-` |
| `default-value` | 非受控初始值 | _TimeValue[]_ | `-` |
| `hide-disabled-options` | 隐藏禁用时间选项，时钟保留刻度位置 | _boolean_ | `false` |
| `open`                    | 弹层显隐受控                                                                                           | _boolean_                         | `-`        |
| `default-open` | 初始显隐 | _boolean_ | `false` |
| `disable-confirm` | 有效选择后立即提交并请求关闭 | _boolean_ | `false` |
| `panel-type`            | 面板模式，可选值 `picker`                                                                      | _string_                          | `picker`   |
| `format` | 字符串解析、显示及输出格式 | _string_ | `HH:mm:ss` |
| `use12-hours` | 十二小时面板；未传 format 时默认 hh:mm:ss a | _boolean_ | `false` |
| `step` | 候选步长以 0 点为起点；无效值回退为 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`                     | 可选最小时间                                                                                           | _string_                          | `-`        |
| `max`                     | 可选最大时间                                                                                           | _string_                          | `-`        |
| `disabled-hours` | 返回禁用小时（0–23） | `() => number[]` | `-` |
| `disabled-minutes` | 根据小时返回禁用分钟 | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | 根据小时、分钟返回禁用秒 | `(hour?: number, minute?: number) => number[]` | `-` |
| `separator`               | 展示分隔符                                                                                             | _string_                          | `~`        |
| `show-next-day`           | 允许结束早于开始并按次日处理；关闭时逆序草稿显示红字提示并禁用确认，起止始终不交换 | _boolean_                         | `false`    |
| `picker-props`            | 透传给 `mp-picker`（picker 模式）                                                                      | _Partial\<PickerProps\>_          | `{}`       |
| `time-range-picker-props` | 透传给 `mp-time-range-picker`                                                                          | _Partial\<TimeRangePickerProps\>_ | `{}`       |
| `popup-props`             | 透传给弹窗的属性                                                                                       | _Partial\<TriggerProps\>_           | `{}`       |
| `input-editable` | 是否允许手输；关闭后仍可面板选择 | _boolean_ | `false` |
| `placeholder` | 起止占位符；字符串用于两端，数组分别设置 | _string \| string[]_ | `-` |
| `clearable`               | 是否可清除                                                                                             | _boolean_                         | `false`    |
| `disabled`                | 是否禁用                                                                                               | _boolean_                         | `false`    |
| `readonly`                | 是否只读                                                                                               | _boolean_                         | `false`    |
| `size`                    | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                                                  | _ComponentSize_                   | `md`       |
| `variant`                 | 风格，可选值 `filled` `standard` `outline`                                                            | _string_                          | `standard` |

### 事件

| 事件名   | 说明         | 参数              |
| -------- | ------------ | ----------------- |
| `focus`  | 获得焦点     | `-`               |
| `blur`   | 失去焦点     | `-`               |
| `change` | 值提交 | _value: string[] \| undefined, date: Date[] \| undefined_ |
| `select` | 用户选择草稿 | _value: string[], date: Date[]_ |
| `clear` | 清除 | `-` |
| `open-change` | 显隐请求 | _open: boolean_ |
| `click` | 非禁用字段点击（只读可通知） | `event: Event` |

### 样式变量

| 变量                                     | 默认值                                                          |
| ---------------------------------------- | --------------------------------------------------------------- |
| `--mp-time-range-label-font-size`           | `16px`                                                          |
| `--mp-time-range-arrow-size`                | `20px`                                                          |
| `--mp-time-range-toolbar-height`            | `var(--mp-picker-toolbar-height, 44px)`                            |
| `--mp-time-range-toolbar-padding`           | `var(--mp-picker-toolbar-padding, 0 4px)`                          |
| `--mp-time-range-title-text-color`          | `var(--mp-picker-title-text-color, #555)`                          |
| `--mp-time-range-title-font-size`           | `var(--mp-picker-title-font-size, 16px)`                           |

面板样式变量见 [`TimeRangePicker`](../../zh-CN/time-range-picker)。

## TimeRangePicker 时间范围面板

> 源码已并入 `time-range/`，安装父组件时一并注册。静态成员：`TimeRange.Picker`。

### 介绍

时间范围选择**面板**，可单独嵌入页面使用。不显示顶部摘要，左右两组滚轮同时编辑开始和结束时间。

- 默认使用列滚轮面板（时 / 分 / 秒）

表单字段请使用 [`TimeRange`](time-range.md)；单时间面板请使用 [`TimePicker`](../../zh-CN/time-picker)。

### 基本使用

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" />
</template>
```


### 24小时格式与秒

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00:00', '18:00:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm:ss" v-model="range" />
</template>
```

### 只读

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" readonly />
</template>
```

### 次日标记

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['22:00', '06:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range" show-next-day />
</template>
```

开启 `show-next-day` 后，结束早于开始时按次日处理并显示「次日」。关闭时在底部红字提示并禁用确认。选择和确认均不交换起止；“此刻”只更新当前端。

### 操作栏

```html
<script setup>
  import { ref } from 'vue'

  const range = ref(['09:00', '18:00'])
</script>

<template>
  <mp-time-range-picker format="HH:mm" v-model="range">
    <template #actions="{ confirm, canConfirm }">
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">确认</mp-button>
    </template>
  </mp-time-range-picker>
</template>
```

### API

纯面板属性 `disable-confirm: boolean = false`：跳过确认并立即提交。`actions` 插槽替换默认确认按钮时，请调用插槽提供的 `confirm()`，并使用 `canConfirm` 禁用无效提交。

### 属性

| 参数                | 说明                                                                                                        | 类型                          | 默认值   |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------- | -------- |
| `v-model` | 绑定值 | _TimeValue[]_ | `-` |
| `default-value` | 非受控初始值 | _TimeValue[]_ | `-` |
| `hide-disabled-options` | 隐藏禁用时间选项，时钟保留刻度位置 | _boolean_ | `false` |
| `disabled` | 禁用面板编辑 | _boolean_ | `false` |
| `disable-confirm` | 不显示确认按钮，有效选择立即提交 | _boolean_ | `false` |
| `presentation`      | 面板模式，可选值 `picker`                                                                           | _string_                      | `picker` |
| `format` | 字符串解析、显示及输出格式 | _string_ | `HH:mm:ss` |
| `use12-hours` | 十二小时面板；未传 format 时默认 hh:mm:ss a | _boolean_ | `false` |
| `step` | 候选步长以 0 点为起点；无效值回退为 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`               | 可选最小时间                                                                                                | _string_                      | `-`      |
| `max`               | 可选最大时间                                                                                                | _string_                      | `-`      |
| `disabled-hours` | 返回禁用小时（0–23） | `() => number[]` | `-` |
| `disabled-minutes` | 根据小时返回禁用分钟 | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | 根据小时、分钟返回禁用秒 | `(hour?: number, minute?: number) => number[]` | `-` |
| `show-next-day`     | 允许结束早于开始并按次日处理；关闭时逆序草稿显示红字提示并禁用确认 | _boolean_                     | `false`  |
| `picker-props`      | 透传给 `mp-picker`（picker 模式）                                                                           | _Partial\<PickerProps\>_      | `{}`     |
| `readonly`          | 是否只读                                                                                                    | _boolean_                     | `false`  |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级                                                          | _number \| boolean_ | `false`  |

### 禁用规则

时钟和滚轮使用相同的三个回调，返回禁用值数组；小时始终为 0–23。无合法下级候选的小时/分钟不出现在滚轮中。

### 事件

| 事件名   | 说明               | 回调参数          |
| -------- | ------------------ | ----------------- |
| `change` | 值提交 | _value: string[] \| undefined, date: Date[] \| undefined_ |
| `select` | 用户选择草稿 | _value: string[], date: Date[]_ |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `actions` | 替换面板确认操作 | _{ confirm: () => void, canConfirm: boolean, value }_ |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                   | 默认值                                  |
| ---------------------------------------- | --------------------------------------- |
| `--mp-time-range-picker-values-height`      | `56px`                                  |
| `--mp-time-range-picker-values-font-size`   | `20px`                                  |
| `--mp-time-range-picker-values-font-weight` | `500`                                   |
| `--mp-time-range-picker-value-color`        | `var(--mp-color-text-3)`                   |
| `--mp-time-range-picker-value-active-color` | `var(--mp-color-primary)`                  |
| `--mp-time-range-picker-value-arrow-color`  | `var(--mp-color-border-2)`                 |
| `--mp-time-range-picker-value-arrow-size`   | `18px`                                  |
| `--mp-time-range-picker-next-day-color`     | `var(--mp-sys-color-content-secondary)`                 |
| `--mp-time-range-picker-column-label-height` | `var(--mp-temporal-panel-column-label-height)` |
| `--mp-time-range-picker-border-radius`      | `var(--mp-time-picker-border-radius, 4px)` |
| `--mp-time-range-picker-background`         | `var(--mp-sys-color-surface-overlay)`                   |


### 值类型

```ts
export type TimeValue = string | number | Date
```

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

日期／时间字段在 inline 下沿用原确认策略；在 popover/popup 中，内部纯面板隐藏确认工具栏，由编辑层提供唯一一组确认／取消。独立 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 保留原有面板 API 和确认行为，不继承 Form 的字段展示。

移动端字段原日历／滚轮的选择迁至 `panel-type`，支持集合和缺省内容不变；`presentation` 仅表示字段展示。纯 Picker 的 `presentation` 仍表示面板内容。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


### 移动端统一面板


滚轮上方按实际格式显示时、分、秒列名，并与两组滚轮对齐；十二小时制额外显示 AM/PM。不显示顶部摘要和可视的起止提示；左组编辑开始时间，右组编辑结束时间，跨日时在右组滚轮下方显示“次日”。

共享样式变量：

| Token | Default |
| --- | --- |
| `--mp-temporal-panel-inset` | `12px` |
| `--mp-temporal-panel-column-label-height` | `36px` |
| `--mp-temporal-panel-column-label-font-size` | `13px` |
| `--mp-temporal-panel-radius` | `12px` |
| `--mp-temporal-panel-group-gap` | `24px` |
| `--mp-temporal-panel-touch-height` | `44px` |
| `--mp-temporal-panel-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-temporal-panel-active-background` | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |

范围面板默认提供“此刻”，初次打开编辑开始时间；操作右侧滚轮后改为编辑结束时间。点击只修改当前端的草稿，另一端保留；即使开启 `disable-confirm`，点击此刻及后续调整仍需确认，取消则丢弃草稿。遵守格式、步长和禁用规则，次日提示与起止校验实时更新。字段、独立面板及弹层行为一致，均可用顶层 `:show-now-button="false"` 隐藏。自定义 `actions` 插槽可使用 `selectNow()` 和 `nowDisabled`。


### 透传配置边界核对（F07）

现有 TimePopupPresentationProps 与运行时过滤保持；open/defaultOpen、disabled、trigger、closeOnClickReference、preventFocus 和对应展开更新归字段管理。顶层 popup-container 明确设置时优先，否则嵌套回退，popupClass 合并内部类。inline 展示层固定 popupOffset=4；Maple 还固定 unmountOnClose=true，这些旧类型中的字段不保证能控制最终值。本轮不收窄既有 Time 类型，也不改变运行行为。


## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。

## 滚轮可见字段

`time-fields` 控制时间滚轮列的显隐及顺序，范围起止两端共用配置，字段与独立面板使用相同属性。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `time-fields` | readonly TimePickerField[] | 时、分、秒 | 可选 hour、minute、second；也控制日历内的时间滚轮。 |

数组需非空、无重复，显式数组严格决定可见列与顺序；未传属性时采用默认列。两组字段各自校验，不能混用。隐藏字段保留已有值，编辑合并回完整草稿；更改字段配置不会提交主值。嵌套展示配置不能覆盖根属性。

Time/TimeRange 的 format 沿用时间字符串解析、显示、输出协议；time-fields 只控制面板列，不改变该协议。隐藏但存在于模型中的单位保留原值。十二小时制显示 hour 时自动附带 AM/PM。

```vue
../../time/example/demos/time-fields.vue
```
