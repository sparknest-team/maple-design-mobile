<!-- Source: src/date/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/date -->

# Date 日期

年份面板仅在内部滚动区域定位已选年份（无选中时定位当前年），不会滚动外层页面。定位在挂载完成后执行，并换算弹层缩放过渡中的布局坐标；卸载和停用取消待执行的定位。

展开时，原生 combobox 通过 `aria-controls` 关联当前实例的命名弹层；关闭后同步更新状态并移除关联。`aria-label`、`aria-describedby` 可传递给原生控件。自定义 selected/触发插槽需自行保留可访问名称、键盘操作和状态关联。

## 案例

浮动面板按可视视口限制高度，不再固定为半屏。正常高度完整展示日历；横屏或矮窗口仅在内容确实放不下时滚动，确认操作保持可见。可用 `--mp-date-picker-popover-max-height` 限制面板最大高度（默认 `100dvh - 32px`）。品牌样式通过主题变量注入，切回默认／Maple 时移除品牌覆盖。

### 时区、夏令时与三种日历视图

Example source: src/date/example/demos/time-zone-views.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalendarInteractiveMode } from '../../calendar-viewport-props'

const props = defineProps<{ english?: boolean }>()
const text = (zh: string, en: string) => (props.english ? en : zh)
const zone = ref('America/New_York')
const mode = ref<CalendarInteractiveMode>('page')
const instant = ref<number>()
const civil = ref('2026-03-08 01:30:00')
const presets = [
  ['纽约春季跳时', 'NY spring gap', 'America/New_York', '2026-03-08T06:30:00Z'],
  ['纽约秋季第一次 01:30', 'NY first 01:30', 'America/New_York', '2026-11-01T05:30:00Z'],
  ['纽约秋季第二次 01:30', 'NY second 01:30', 'America/New_York', '2026-11-01T06:30:00Z'],
  ['半小时夏令时', 'Half-hour DST', 'Australia/Lord_Howe', '2026-10-03T15:00:00Z'],
]
function preset(index: number) {
  zone.value = presets[index][2]
  instant.value = Date.parse(presets[index][3])
}
preset(0)
const description = computed(() => {
  if (instant.value == null) {
    return text('未选择', 'Empty')
  }
  const date = new Date(instant.value)
  return `${date.toISOString()} · ${new Intl.DateTimeFormat(props.english ? 'en-US' : 'zh-CN', {
    timeZone: zone.value,
    dateStyle: 'short',
    timeStyle: 'long',
  }).format(date)}`
})
</script>

<template>
  <mp-space direction="column" size="lg" class="zone-views-demo">
    <mp-select
      v-model="zone"
      :aria-label="text('示例时区', 'Demo time zone')"
      :clearable="false"
      presentation="inline"
      :options="['Asia/Shanghai', 'America/New_York', 'UTC', 'Australia/Lord_Howe']"
    />
    <mp-select
      v-model="mode"
      :aria-label="text('示例日历模式', 'Demo calendar mode')"
      :clearable="false"
      presentation="inline"
      :options="[
        { label: text('翻页', 'Page'), value: 'page' },
        { label: text('多月虚拟滚动', 'Virtual months'), value: 'scroll' },
        { label: text('单行周日历', 'Week line'), value: 'line' },
      ]"
    />
    <mp-space wrap>
      <mp-button v-for="(item, index) in presets" :key="item[3]" @click="preset(index)">{{
        english ? item[1] : item[0]
      }}</mp-button>
    </mp-space>
    <output data-result="mode">{{ text('当前模式', 'Current mode') }}：{{ mode }} · {{ zone }}</output>
    <p>
      {{
        text(
          '时间戳：切换时区只改变显示。选择后确认才保存；取消保留原值。',
          'Timestamp: switching zones changes its display. Confirm saves; cancel preserves the value.',
        )
      }}
    </p>
    <mp-date
      v-model="instant"
      :aria-label="text('时区预约', 'Zoned appointment')"
      value-format="timestamp"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      :input-editable="false"
      presentation="inline"
      min="2000-01-01 00:00:00"
      max="2100-12-31 23:59:59"
    />
    <output data-result="instant">{{ description }}</output>
    <p>
      {{
        text(
          '当地时间字符串：在纽约输入 2026-03-08 02:30:00（不存在）应被拒绝；秋季重复时间默认取第一次。',
          'Civil string: New York 2026-03-08 02:30:00 does not exist and must be rejected. A repeated civil time chooses the first occurrence.',
        )
      }}
    </p>
    <mp-date
      v-model="civil"
      :aria-label="text('当地时间字符串', 'Civil time string')"
      show-time
      :time-zone="zone"
      :interactive-mode="mode"
      presentation="inline"
    />
    <output data-result="civil">{{ civil }}</output>
  </mp-space>
</template>

<style scoped>
.zone-views-demo {
  width: 100%;
}
output {
  overflow-wrap: anywhere;
}
p {
  margin: 0;
  line-height: 1.6;
}
</style>
```

### 基本使用

Example source: src/date/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="date" placeholder="请选择日期" clearable />
  </mp-space>
</template>
```

### 禁用

Example source: src/date/example/demos/disabled.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const disabledDate = ref('2024-01-15')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="disabledDate" disabled />
  </mp-space>
</template>
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

### 日期值格式

两端使用独立复制的值、校验和提交逻辑。年、月、日模型默认格式为 `YYYY`、`YYYY-MM`、`YYYY-MM-DD`，日期时间默认包含秒；分钟精度设置 `time-fields="['hour', 'minute']"`。`format` 控制显示，`value-format` 控制模型，支持自定义格式、`Date` 与 `timestamp`。Maple 展示支持年/月/日及移动端日历和滚轮；周/季度面板仍是 Cedar 的展示能力。

### 介绍

表单日期字段。inline 使用锚定输入框的 popover；presentation="popup" / "dialog" 使用统一编辑外壳，关闭丢弃草稿，底部确认后写回模型。

### 统一字段与提交

Date / DateRange / Time / TimeRange 使用同源的 PickerField → FieldDecorator 字段层。Date/DateRange 默认允许手输（可关闭）；Time 是否手输由其 inputEditable 控制。面板编辑草稿，确认才写回，取消或外部关闭不改变值。清除立即写入空值并关闭面板，不恢复旧草稿。日期和时间范围显示两个独立输入位置，跨日时间保留“次日”提示。

Example source: src/date/example/demos/field-protocol.vue

```vue
<script setup>
import { ref } from 'vue'

const disabled = ref(false)
const date = ref('2026-09-22')
const dateRange = ref(['2026-09-22', '2026-09-24'])
const time = ref('09:00')
const timeRange = ref(['23:00', '01:00'])
</script>

<template>
  <mp-space direction="column">
    <p>范围字段：点击右侧输入可从结束端选择；面板切换起止端只修改草稿，确认后写回。</p>
    <span>禁用字段</span>
    <mp-switch v-model="disabled" aria-label="禁用字段" />
    <mp-date v-model="date" :disabled="disabled" clearable placeholder="日期" />
    <mp-date-range v-model="dateRange" :disabled="disabled" clearable placeholder="日期范围" />
    <mp-time v-model="time" format="HH:mm" :disabled="disabled" clearable placeholder="时间" />
    <mp-time-range
      v-model="timeRange"
      format="HH:mm"
      :disabled="disabled"
      clearable
      show-next-day
      placeholder="时间范围"
    />
    <p>日期：{{ date || '未选择' }}；日期范围：{{ dateRange }}</p>
    <p>时间：{{ time || '未选择' }}；时间范围：{{ timeRange }}</p>
  </mp-space>
</template>
```

### 受控关闭被拒绝

父级可以拒绝 `update:open(false)`，面板继续展开。同一选择重复确认不会再次提交或请求关闭；受控模型回写相同值不重置已确认状态。选择新日期后会开启新事务，可以再次确认。示例显示模型、提交次数和关闭请求次数。

Example source: src/date/example/demos/rejected-close.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('2026-09-22')
const open = ref(false)
const closeRequests = ref(0)
const commits = ref(0)

function requestOpen(next) {
  if (next) {
    open.value = true
  } else {
    closeRequests.value++
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <p>关闭请求会被父级拒绝；选择新日期后可再次确认，重复确认不应重复提交。</p>
    <mp-date v-model="value" :open="open" panel-type="calendar" @update:open="requestOpen" @change="commits++">
      <template #actions>
        <mp-button @click="open = false">允许关闭</mp-button>
      </template>
    </mp-date>
    <span data-test="date-transaction-state">值：{{ value }}；提交：{{ commits }}；拒绝关闭：{{ closeRequests }}</span>
  </div>
</template>
```

### 日历模式

Example source: src/date/example/demos/calendar-mode.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const calendarDate = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="calendarDate" panel-type="calendar" placeholder="使用日历选择日期" clearable />
  </mp-space>
</template>
```

### 选择类型

Example source: src/date/example/demos/type.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const year = ref()
const month = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="year" type="year" placeholder="选择年" clearable />
    <mp-date v-model="month" type="month" placeholder="选择月" clearable />
  </mp-space>
</template>
```

### 多选

Example source: src/date/example/demos/multiple.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const multiple = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="multiple" multiple placeholder="多选日期" clearable />
  </mp-space>
</template>
```

### 日期时间

Example source: src/date/example/demos/date-time.vue

```vue
<script setup>
import { ref } from 'vue'

const minute = ref()
const second = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <span>分钟列：时 / 分</span>
    <mp-date v-model="minute" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" clearable />
    <span>已提交值：{{ minute || '未选择' }}</span>
    <span>秒精度：两端的默认精度</span>
    <mp-date v-model="second" show-time :time-fields="['hour', 'minute', 'second']" clearable />
    <span>已提交值：{{ second || '未选择' }}</span>
  </mp-space>
</template>
```

### 搭配 FormItem

Example source: src/date/example/demos/with-form-item.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const form = ref(null)
const formData = reactive({
  birthday: undefined,
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-form ref="form" :model="formData">
      <mp-form-item field="birthday" label="生日" required>
        <mp-date v-model="formData.birthday" placeholder="请选择" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### 模型格式与显示格式

Example source: src/date/example/demos/value-formats.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timestamp = ref(new Date(2026, 8, 15).getTime())
const objectValue = ref(new Date(2026, 8, 16))
</script>
<template>
  <div class="date-contract-demo">
    <mp-date v-model="timestamp" value-format="timestamp" format="DD/MM/YYYY" />
    <p>时间戳模型：{{ timestamp }}</p>
    <mp-date v-model="objectValue" value-format="Date" format="YYYY年MM月DD日" />
    <p>Date 对象模型：{{ objectValue }}</p>
  </div>
</template>
<style scoped>
.date-contract-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.date-contract-demo p {
  margin: 0;
}
</style>
```

### 外观组合

适用于选择单个日期。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/date/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('2026-10-23')
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
    <mp-date v-model="value" value-format="YYYY-MM-DD" v-bind="__demoAppearance"></mp-date>
  </mp-space>
</template>
```

### 交互状态切换

适用于选择单个日期。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/date/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('2026-10-23')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-date v-model="value" value-format="YYYY-MM-DD" v-bind="__demoState"></mp-date>
  </mp-space>
</template>
```

### 字符串模型：年月日、年月与月日范围

`format` 决定显示，`value-format` 决定提交值。下面直接得到 `"2026-09-10"`、`"2026-09"` 或 `["09-10", "10-10"]`，无需将 Date 再转换。日期范围使用数组。`MM-DD` 没有年份，解析时使用当前年，不能表示跨年先后或某个明确年份的 2 月 29 日；有跨年、时区或闰年要求时保留 `YYYY-MM-DD`，在业务提交时单独映射月日。默认仍是 page，未指定 timeZone 使用浏览器本地时区。

Example source: src/date/example/demos/string-values.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-09-10')
const month = ref('2026-09')
const range = ref(['09-10', '10-10'])
</script>
<template>
  <mp-space direction="column">
    <mp-date v-model="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
    <p>String: {{ JSON.stringify(date) }}</p>
    <mp-date v-model="month" type="month" format="YYYY-MM" value-format="YYYY-MM" />
    <p>Month string: {{ JSON.stringify(month) }}</p>
    <mp-date-range v-model="range" format="MM-DD" value-format="MM-DD" />
    <p>Month/day array: {{ JSON.stringify(range) }}</p>
  </mp-space>
</template>
```

## API

### 同源规则与事件

`DateValue = Date | string | number`。无效日期、不完整或逆序范围不能提交。min/max 包含边界，字符串按 value-format 解析，也可直接传 Date 或时间戳。确认时重新校验规则。`disabledTime` 返回 `disabledHours()`、`disabledMinutes(hour)`、`disabledSeconds(hour, minute)` 数字列表。纯面板通过校验后触发 `confirm(value, date(s), text(s))`；字段展开使用 `update:open` / `open-change`，不再使用 close。嵌套面板和弹层 props 只配置展示，不能覆盖顶层模型、规则与状态事件。范围 disabled 支持 `[起点禁用, 终点禁用]`，锁定端点不能被清除或修改。


### 属性

| 参数                | 说明                                                                  | 类型                         | 默认值     |
| ------------------- | --------------------------------------------------------------------- | ---------------------------- | ---------- |
| `model-value` | 受控值 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | 非受控初始值，仅初始化读取 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `input-editable` | 是否允许手输；默认 true，函数 format/multiple 保持只读 | boolean | true |
| `format` | 展示格式或格式化函数 | string / (date: Date) => string | — |
| `value-format` | 模型格式、Date 或 timestamp | string | — |
| `disable-confirm` | 选择后立即提交 | boolean | 字段 false；面板 true |
| `open`              | 弹层显隐受控                                                          | _boolean_                    | `-`        |
| `default-open` | 非受控初始展开 | boolean | false |
| `popup-container` | 浮层挂载目标，顶层优先且支持 false | string / HTMLElement / (() => HTMLElement) / false | — |
| `panel-type`      | 面板模式，可选值 `picker` `calendar` `calendarPicker` | _string_                     | `calendar`   |
| `type`              | 选择类型，可选值 `year` `month` `date`                                | _string_                     | `date`     |
| `show-time`         | 是否选择时间                                                          | _boolean_                    | `false`    |
| `multiple`          | 是否多选                                                              | _boolean_                    | `false`    |
| `min`               | 可选最小日期                                                          | DateValue                     | `-`        |
| `max`               | 可选最大日期                                                          | DateValue                     | `-`        |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`         | 多选展示分隔符                                                        | _string_                     | `, `       |
| `date-picker-props` | 透传给 `mp-date-picker` 的属性                                        | _DatePickerOptions_ | `{}`       |
| `popup-props`       | 透传给弹窗的属性                                                      | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | 占位符                                                                | _string_                     | `-`        |
| `clearable`         | 是否可清除                                                            | _boolean_                    | `true`    |
| `disabled`          | 是否禁用                                                              | _boolean_                    | `false`    |
| `readonly`          | 是否只读                                                              | _boolean_                    | `false`    |
| `size`              | 尺寸，可选值 `xs` `sm` `md` `lg` `xl`                                 | _ComponentSize_              | `md`       |
| `variant`           | 风格，可选值 `filled` `standard` `outline`                           | _string_                     | `standard` |

### 事件

| 事件名   | 说明           | 参数           |
| -------- | -------------- | -------------- |
| `focus`  | 聚焦时触发     | `-`            |
| `blur`   | 失焦时触发     | `-`            |
| `click`  | 点击时触发     | `event: Event` |
| `clear` | 清除：单值为 undefined，多选/范围为 [] | — |
| `open-change` | 展开状态改变 | open: boolean |
| `change` | 通过校验并正式提交 | value, date(s), formatted text(s) |
| `select` | 选择草稿，不代表已提交 | value, date(s), formatted text(s) |

### 方法

| 方法名  | 说明 | 参数 | 返回值 |
| ------- | ---- | ---- | ------ |
| `focus` | 聚焦 | `-`  | `-`    |
| `blur`  | 失焦 | `-`  | `-`    |

### 插槽

| 插槽名       | 说明         | 参数                                 |
| ------------ | ------------ | ------------------------------------ |
| `selected`   | 选择区域内容 | `-`                                  |
| `prefix`     | 前缀         | `-`                                  |
| `clear-icon` | 清除图标     | `clear: (e: Event) => void`          |
| `suffix`     | 后缀         | `-`                                  |
| `suffix-icon` | 箭头图标     | `focus: boolean, popupOpen: boolean` |

### 字段与嵌入式面板

字段负责输入与浮层，纯面板直接嵌入页面。day-start-of-week 统一为数字 0～6，0 为周日；范围日历也支持动态更新。嵌套 Options 只配置展示，不覆盖顶层值、格式、边界或禁用规则。

本例纯面板显式设置 `:disable-confirm="false"`：点击日期只修改草稿，“已提交”在确认后更新。切换周起点或移除边界不提交新值；恢复边界不会清除已有模型，超出新边界的草稿不能确认，请重新选择合法日期。

日历面板箭头的可访问名称跟随全局 Locale，局部 LocaleProvider 可以覆盖对应文案，缺少的导航键回退全局语言。日面板为上一月/下一月，月份面板为上一年/下一年，年份列表为上一组/下一组年份；按钮仍遵守日期边界，预览变化不等于提交日期。

Example source: src/date/example/demos/entry-boundary.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateSelection } from '@maple-design/ui'

const limited = ref(true)
const fieldValue = ref<DateSelection>('2025-02-12')
const panelValue = ref<DateSelection>('2025-02-12')
const week = ref<0 | 1 | 6>(1)
const presentation = ref<'picker' | 'calendar'>('calendar')
</script>

<template>
  <div class="entry-demo">
    <p>仅允许选择 2025 年 2 月；移除限制不会改变已有选中值。</p>
    <mp-button @click="limited = !limited">{{ limited ? '移除日期限制' : '恢复日期限制' }}</mp-button>
    <p>根 presentation 选择展示模式；date-picker-props 只配置面板细节，不传嵌套 presentation。</p>
    <mp-space>
      <mp-button @click="presentation = 'picker'">滚轮</mp-button>
      <mp-button @click="presentation = 'calendar'">日历</mp-button>
    </mp-space>
    <p>切换周起始日时，表头与日期列一起更新，不改变选中值。</p>
    <mp-space wrap>
      <mp-button @click="week = 0">周日起始</mp-button>
      <mp-button @click="week = 1">周一起始</mp-button>
      <mp-button @click="week = 6">周六起始</mp-button>
    </mp-space>
    <div>
      <p>字段：管理输入与浮层；面板参数放在 date-picker-props。</p>
      <mp-date
        v-model="fieldValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :panel-type="presentation"
        :date-picker-props="{ dayStartOfWeek: week }"
        placeholder="选择日期"
      />
    </div>
    <div>
      <p>纯面板：直接嵌入页面，不使用 open / popup-container。</p>
      <mp-date-picker
        v-model="panelValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :presentation="presentation"
        :day-start-of-week="week"
        :disable-confirm="false"
      />
      <p>已提交：{{ panelValue }}</p>
    </div>
  </div>
</template>

<style scoped>
.entry-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
```

## DatePicker 日期面板
纯面板不接收 open/default-open、popup-container、placement、trigger-props、placeholder、variant、clearable。确认区由 disable-confirm 控制；actions 插槽提供 { confirm, disabled }。DatePicker/DateRangePicker 可以单独 app.use 安装，根入口和 date/date-range 子路径导出组件、Props、Instance、Type、Options、Emits；没有独立 date-picker/date-range-picker npm 子路径。


> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### 介绍

日期选择**面板**，可单独嵌入页面使用。本页聚合 DatePicker 示例，没有独立的 date-picker 文档路由。日期范围面板请参阅 [`DateRangePicker`](#/zh-CN/date-range) 所在的范围文档；表单字段请使用 [`Date`](#/zh-CN/date) / [`DateRange`](#/zh-CN/date-range)。

### 基本使用

Example source: src/date/example/demos/picker-basic.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" />
</template>
```

### 日历模式

独立面板和字段弹层默认使用日历；单值面板不显示顶部摘要。带时间时，日历右侧显示每半小时一项的快捷时间 Picker，底部显示当前日期、时间和一个时钟按钮。点击时钟打开详细时间 Picker，图标变为日历，点击可返回日期面板。设置 `presentation="picker"` 可显式使用日期列滚轮。

Example source: src/date/example/demos/picker-calendar.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" presentation="calendar" />
</template>
```

### 月份选择器

使用 `type` 属性切换选择器的类型，`type` 默认值为 `date`

Example source: src/date/example/demos/picker-month.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" type="month" elevation />
</template>
```

### 多选

通过 `multiple` 属性选择多个日期，此时 `date` 为一个数组。

Example source: src/date/example/demos/picker-multiple.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref([])
</script>

<template>
  <mp-date-picker v-model="date" multiple />
</template>
```

### 选择范围

通过 `range` 属性选择一个日期范围，此时 `date` 为 `[startDate, endDate]`。

Example source: src/date/example/demos/picker-range.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref(['2021-04-08', '2021-04-20'])
</script>

<template>
  <mp-date-picker v-model="date" type="date" range />
</template>
```

### 日期限制

通过 `min` 和 `max` 属性来控制可选择的日期范围，使用 `disabled-date` 属性禁用不可选择的日期。

Example source: src/date/example/demos/picker-limit.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('2020-11-11')

const disabledDate = (val) => val.getDate() % 2 === 0
</script>

<template>
  <mp-date-picker v-model="date" min="2020-10-15" max="2021-01-15" :disabled-date="disabledDate" />
</template>
```

### 日期时间

通过 `show-time` 开启日期+时间。`presentation` 决定形态：

-：底部左右按钮切换日历与时钟
- `calendarPicker`：底部左右按钮切换日历与时/分（秒）列
- `picker`：底部左右按钮切换年/月/日列与时/分（秒）列，编辑其中一部分会保留另一部分

Example source: src/date/example/demos/picker-date-time.vue

```vue
<script setup>
import { ref } from 'vue'

const calendarPicker = ref('2025-01-15 10:29')
const picker = ref('2025-01-15 10:29')
</script>

<template>
  <mp-date-picker v-model="calendarPicker" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" presentation="calendarPicker" />
  <mp-date-picker v-model="picker" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" presentation="picker" />
</template>
```

### API

### 属性

| 参数                | 说明                                                           | 类型                          | 默认值      |
| ------------------- | -------------------------------------------------------------- | ----------------------------- | ----------- |
| `model-value` | 受控值 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | 非受控初始值，仅初始化读取 | DateValue / DateValue[] (multiple/range) | `undefined` |
| `format` | 展示格式或格式化函数 | string / (date: Date) => string | — |
| `value-format` | 模型格式、Date 或 timestamp | string | — |
| `disable-confirm` | 选择后立即提交 | boolean | 字段 false；面板 true |
| `type`              | 选择器类型，可选值为 `date month year`                         | _string_                      | `date`      |
| `presentation`      | 面板形态：`calendar` `picker` `calendarPicker` | _string_                      | `calendarPicker`    |
| `show-time`         | 是否选择时间                                                   | _boolean_                     | `false`     |
| `disabled-date` | true 为禁用；side 为 start 或 end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | 当前日期和端点的禁用时分秒列表 | (date: Date, side: DateSide) => DateDisabledTime | — |
| `color`             | 选择器的颜色                                                   | _string_                      | `-`         |
| `title-color`       | 标题背景色。如果未指定，将使用 `color` 属性或默认颜色。        | _string_                      | `-`         |
| `hint`              | 选择器提示语                                                   | _string_                      | `选择日期`  |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级             | _number \| boolean_ | `false`     |
| `button-elevation`  | Button 的海拔高度                                              | _string \| number \| boolean_ | `true`      |
| `day-start-of-week` | 设置一周的第一天，从周日的 0 开始。                            | _DateWeekStart_            | `0`         |
| `min`               | 允许的最小日期/月份（ISO 8601格式）                            | DateValue                      | `-`         |
| `max`               | 允许的最大日期/月份（ISO 8601格式）                            | DateValue                      | `-`         |
| `show-current`      | 是否显示当前日期                                               | _boolean_                     | `true`      |
| `readonly`          | 是否只读                                                       | _boolean_                     | `false`     |
| `multiple`          | 是否支持选择多个日期                                           | _boolean_                     | `false`     |
| `range`             | 是否支持选择一个范围                                           | _boolean_                     | `false`     |
| `touchable`         | 是否支持拖动切换面板                                           | _boolean_                     | `true`      |

### 事件

| 事件名    | 说明           | 回调参数                                              |
| --------- | -------------- | ----------------------------------------------------- |
| `preview` | 日期切换时触发 | `year: number` <br>`month: number` <br>`day?: number` |
| `change` | 通过校验并正式提交 | value, date(s), formatted text(s) |
| `select` | 选择草稿，不代表已提交 | value, date(s), formatted text(s) |

### 插槽

`weekIndex` 表示一周的第 `n` 天，从周末的 `0` 开始

| 名称       | 说明               | 参数                                                                 |
| ---------- | ------------------ | -------------------------------------------------------------------- |
| `year`     | 自定义标题中的年   | `year: YYYY`                                                         |
| `month`    | 自定义标题中的月   | `year: YYYY` <br> `month: MM`                                        |
| `date`     | 自定义标题中的日期 | `year: YYYY` <br> `month: MM` <br> `date: DD` <br> `week: weekIndex` |
| `range`    | 自定义标题中的范围 | `choose: [startData, endDate]`                                       |
| `multiple` | 自定义标题中的多选 | `choose: ['YYYY-MM-DD' \| 'YYYY-MM']`                                |
| `actions`  | 自定义确认操作     | `{ confirm, disabled }`                                                                  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                       | 默认值                 |
| -------------------------------------------- | ---------------------- |
| `--mp-date-picker-border-radius`                | `4px`                  |
| `--mp-date-picker-font-size`                    | `var(--mp-font-size-md)`  |
| `--mp-date-picker-min-width`                    | `290px`                |
| `--mp-date-picker-main-color`                   | `rgba(0, 0, 0, .87)`   |
| `--mp-date-picker-title-hint-color` | `var(--mp-color-text-3)` |
| `--mp-date-picker-title-hint-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-height`                 | `105px`                |
| `--mp-date-picker-title-padding`                | `16px`                 |
| `--mp-date-picker-title-background` | `var(--mp-date-picker-body-background-color)` |
| `--mp-date-picker-title-color` | `var(--mp-color-text-1)` |
| `--mp-date-picker-title-year-font-size`         | `var(--mp-font-size-md)`  |
| `--mp-date-picker-title-year-font-weight`       | `500`                  |
| `--mp-date-picker-title-year-margin-bottom`     | `8px`                  |
| `--mp-date-picker-title-year-min-height`        | `21px`                 |
| `--mp-date-picker-title-date-height`            | `48px`                 |
| `--mp-date-picker-title-date-font-size`         | `34px`                 |
| `--mp-date-picker-title-date-font-weight`       | `500`                  |
| `--mp-date-picker-title-date-range-font-size`   | `20px`                 |
| `--mp-date-picker-title-date-justify-content`   | `normal`               |
| `--mp-date-picker-header-arrow-filter`          | `opacity(0.54)`        |
| `--mp-date-picker-body-background-color`        | `#fff`                 |
| `--mp-date-picker-body-height`                  | `280px`                |
| `--mp-date-picker-body-padding`                 | `0`                    |
| `--mp-date-picker-header-padding`               | `4px 16px`             |
| `--mp-date-picker-actions-padding`              | `0 8px 12px 8px`       |
| `--mp-date-picker-header-color`                 | `#555`                 |
| `--mp-month-picker-padding`                     | `0 12px`               |
| `--mp-month-picker-item-width`                  | `33%`                  |
| `--mp-month-picker-item-height`                 | `56px`                 |
| `--mp-month-picker-item-button-max-width`       | `140px`                |
| `--mp-year-picker-padding`                      | `0 12px`               |
| `--mp-year-picker-item-width`                   | `33%`                  |
| `--mp-year-picker-item-height`                  | `56px`                 |
| `--mp-year-picker-item-button-max-width`        | `140px`                |
| `--mp-day-picker-content-item-width`            | `14.28%`               |
| `--mp-day-picker-content-item-min-height`       | `21px`                 |
| `--mp-day-picker-content-item-font-size`        | `var(--mp-font-size-sm)`  |
| `--mp-day-picker-content-item-padding`          | `2px 0`                |
| `--mp-day-picker-content-item-button-width`     | `32px`                 |
| `--mp-day-picker-content-item-button-height`    | `32px`                 |
| `--mp-day-picker-content-item-button-font-size` | `var(--mp-font-size-sm)`  |
| `--mp-day-picker-head-item-color`               | `rgba(0, 0, 0, 0.38)`  |
| `--mp-day-picker-head-item-padding`             | `8px 0`                |
| `--mp-day-picker-head-item-font-weight`         | `600`                  |

### 快捷选项与日历视口

Example source: src/date/example/demos/panel-tools.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('2025-01-15')
const viewport = ref('2025-01-01')
const acceptNavigation = ref(true)
const shortcuts = [
  { label: '月初', value: '2025-01-01' },
  { label: '下个月', value: () => '2025-02-01' },
  { label: '不可选', value: '2025-03-01', disabled: true },
]
function navigate(value: unknown) {
  if (acceptNavigation.value && typeof value === 'string') {
    viewport.value = value
  }
}
</script>
<template>
  <div>
    <p>选择值：{{ selected }}；视口：{{ viewport }}</p>
    <mp-checkbox v-model="acceptNavigation">接受视口导航</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      :picker-value="viewport"
      :shortcuts="shortcuts"
      :disable-confirm="false"
      presentation="calendar"
      @update:picker-value="navigate"
    />
    <p>范围快捷项走同一套确认与校验。</p>
    <mp-date-range-picker
      :default-value="['2025-01-10', '2025-01-15']"
      :shortcuts="[{ label: '第一周', value: ['2025-01-01', '2025-01-07'] }]"
      :disable-confirm="false"
      presentation="calendar"
    />
  </div>
</template>
```

两端均导出 `DateShortcut`、`DateShortcutsPosition`。快捷项包含 `label`、`value`（值或按需执行的函数）、可选 `format`（快捷值的输入格式）与 `disabled`；输出使用面板的 `value-format`。悬停或聚焦只预览，不提交；点击走普通日期选择的校验与确认流程。设置 `preview-shortcut=false` 仅关闭预览。`shortcuts-position` 支持 left/bottom/right，移动端建议 bottom。

`picker-value` 管理日历视口，不是选中值；`default-picker-value` 仅初始化读取。范围视口为两个日期。导航发出 `update:picker-value` 和 `picker-value-change(value, dates, texts)`，不触发 `change` 或 `select`；受控更新不被接纳时保留原视口。`select-shortcut(shortcut)` 仅在快捷项通过校验并被接受后触发。移动端滚轮展示不提供日历月份导航。字段通过 `date-picker-props` 配置这些选项，转发上述三个事件。

### 当前日期与范围策略

Example source: src/date/example/demos/current-range.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const selected = ref(yesterday)
const showCurrent = ref(true)
const showNowButton = ref(true)
const range = ref(['2025-01-05 09:00', '2025-01-10 18:00'])
</script>
<template>
  <div>
    <p>今日高亮和选择当前是两个独立功能。</p>
    <mp-checkbox v-model="showCurrent">今日高亮</mp-checkbox>
    <mp-checkbox v-model="showNowButton">选择当前按钮</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      value-format="Date"
      :default-picker-value="new Date()"
      :show-current="showCurrent"
      :show-now-button="showNowButton"
      :disable-confirm="false"
      presentation="calendar"
    />
    <p>确认后选中：{{ selected }}</p>
    <p>切换顶部摘要修改起止值；结束早于开始时，底部提示并禁用确认。</p>
    <mp-date-range-picker
      v-model="range"
      show-time
      :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm"
      :disable-confirm="false"
      presentation="calendarPicker"
    />
    <p>确认后范围：{{ range }}</p>
  </div>
</template>
```

| 属性 | 说明 | 默认值 |
| --- | --- | --- |
| `show-current` | 日历中高亮当前日/月/年，不产生选择或提交 | true |
| `show-now-button` | 显示此刻按钮；多选不显示，范围更新当前端 | true |

“此刻”按面板 type、时间精度与 value-format 生成候选，遵守 disabled/readonly、min/max、日期和时间禁用规则。点击只更新草稿，即使开启 disable-confirm，后续调整也需确认才提交；取消会丢弃草稿。日期、日期时间及其范围的独立面板与弹层行为一致，范围仅更新当前端，不交换。挂载或改变高亮均不写模型。旧 showNowBtn 名称已删除，不保留别名。

actions 插槽提供 `{ confirm, disabled, selectNow, nowDisabled }`。自定义按钮应调用这两个受保护动作，不应直接写模型。

日期范围与日期时间范围始终只修改当前端：手动选择和“此刻”均不交换起止值。起止倒置时保留草稿，在底部显示红色提示并禁用确认；修正后提示消失，仍需显式确认。取消弹层会恢复已确认值。日期边界、禁用日期／时间和锁定端点限制仍生效。时间范围组件保留“次日”逻辑。

## 月份标签

字段通过 `date-picker-props` / `date-range-picker-props` 配置面板选项。

`abbreviation`（boolean，默认 `true`）控制日历月份网格的缩写；`false` 使用当前 Locale 的完整月份名。运行时修改立即生效，不改变值，也不触发选择事件。此开关不影响星期标签、标题、滚轮列或值格式。范围日历以顶层选项为准，嵌套日历参数不能覆盖。

Example source: src/date/example/demos/month-labels.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const abbreviation = ref(true)
</script>

<template>
  <mp-checkbox v-model="abbreviation">月份缩写</mp-checkbox>
  <mp-date-picker
    type="month"
    picker-value="2025-01"
    :abbreviation="abbreviation"
    :disable-confirm="false"
    presentation="calendar"
  />
  <mp-date-range-picker
    :date-picker-props="{ hint: '设备预订', touchable: false }"
    type="month"
    :abbreviation="abbreviation"
    presentation="calendar"
  />
</template>
```

### 语言与嵌套日历参数

日期标签、标题和动作接入各库的全局 Locale 与既有 Provider。Cedar 删除日期组件级 `locale`，不保留覆盖字典或兼容别名。切换语言不会选择或提交日期。

### 内嵌时间与滚轮展示


`picker-props` 使用 `DateWheelOptions`：`optionHeight`、`optionCount`、`class`、`style`，对单值/范围的日期和时间滚轮生效。不能覆盖内部生成的列、模型、工具条、字段映射或弹层状态。打开时间入口后明确展示时钟。

Example source: src/date/example/demos/time-presentation.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('2026-10-22 13:30')
</script>
<template>
  <mp-date-picker v-model="value" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" />
  <mp-date-picker presentation="picker" :picker-props="{ optionHeight: 36, optionCount: 4 }" />
</template>
```

### 真实端侧能力

Cedar 不公开 `Date.pickerProps`、`DateRange.pickerProps` 或 `DateRange.datePickerProps`：PC 字段不渲染移动滚轮或范围内部的移动日历插件，原无效参数已删除且无兼容别名。Maple 保留这些真实扩展，使用 DateWheelOptions 与 DateRangeCalendarOptions。两端通过 `Date.datePickerProps` / `DateRange.dateRangePickerProps` 配置完整面板，`timePickerProps` 配置内嵌时间展示。初始日期时间放在顶层 `defaultValue`，不要放在 `timePickerProps.defaultValue` 中。

### 日期语言的实例隔离

日期所有者读取本库全局 Locale/Provider，周起始日由各实例 `day-start-of-week` 管理。不切换宿主 Dayjs 默认语言，也不覆盖宿主基础语言配置；只在各库命名空间下注册日期语言元数据，组件实例与源码不跨库共享。

`value-format` 是稳定英文日期协议（包括月份名称 token），`format` 的显示及手输文本使用界面语言。切换语言不会改写模型，也不会令英文月份名称模型失效。默认数字协议、Date 对象、时间戳不变。中文核心语言与 Maple 内置语言数据已接入；其他日期格式优先使用已注册 Dayjs 语言数据，未加载的语言安全回退英文。

Example source: src/date/example/demos/locale-isolation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const monthModel = ref('2025 January 15')
const numericModel = ref('2025-01-15')
</script>

<template>
  <p>切换顶部语言，显示与手输文本跟随界面语言，模型协议保持不变。</p>
  <mp-date v-model="monthModel" value-format="YYYY MMMM DD" format="YYYY MMMM DD" panel-type="calendar" />
  <p>月份名称模型（稳定英文协议）：{{ monthModel }}</p>
  <mp-date v-model="numericModel" format="YYYY MMMM DD" panel-type="calendar" />
  <p>数字模型：{{ numericModel }}</p>
</template>
```

### 手输格式的边界

公共日期解析器按展示 `format` 严格解析，再以 `value-format` 序列化并执行原有禁用/范围校验。日期单值/范围字段已接入真实原生输入；默认允许手输，点击输入只编辑，日历按钮或 ArrowDown 打开面板，Enter/失焦提交。设置 `input-editable=false` 可仅使用面板；multiple 和函数 format 不提供文本逆解析，输入保持 readonly。`format` 为函数没有逆解析协议，应关闭 `input-editable` 并使用选择面板。Maple 暂无周/季度展示模式，不为保持解析逻辑同源而暴露无效类型。

### 手输与面板选择

Example source: src/date/example/demos/text-entry.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2025-01-15')
const range = ref(['2025-01-15', '2025-01-20'])
const panelOnly = ref(false)
</script>

<template>
  <p>输入 DD/MM/YYYY，Enter 或失焦提交；非法日期和范围外输入恢复模型显示。</p>
  <mp-date v-model="value" format="DD/MM/YYYY" min="2025-01-10" max="2025-01-25" :input-editable="!panelOnly" />
  <p>模型：{{ value }}</p>
  <mp-switch v-model="panelOnly" />
  <p>仅面板选择：{{ panelOnly }}</p>
  <mp-date-range v-model="range" format="DD/MM/YYYY" :disabled="[true, false]" :input-editable="!panelOnly" />
  <p>起点锁定，终点不能早于起点：{{ range }}</p>
</template>
```

移动日历按钮使用以下本地扩展变量：

| 变量 | 默认值 |
| --- | --- |
| `--mp-date-input-trigger-padding` | `0` |
| `--mp-date-input-trigger-outline-width` | `var(--mp-sys-space-1)` |
| `--mp-date-input-trigger-outline-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)` |

### 字段视口与快捷项事件

通过嵌套 `datePickerProps` / `dateRangePickerProps` 配置 pickerValue、defaultPickerValue 和快捷项；嵌套监听器会过滤，在字段组件上监听并回写嵌套视口。拒绝受控请求时保持原月份，导航不选择、不提交。有效快捷项仍按字段原确认策略进入草稿。

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| `update:picker-value` | 请求日历视口更新 | value: DateSelection |
| `picker-value-change` | 视口请求及展示通知 | value, date(s), formatted text(s) |
| `select-shortcut` | 接受的原快捷项对象 | shortcut: DateShortcut |

Example source: src/date/example/demos/field-panel-tools.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateShortcut } from '@maple-design/ui'

const selected = ref('2025-01-15')
const viewport = ref('2025-01-01')
const acceptNavigation = ref(true)
const notice = ref('')
const shortcutNotice = ref('')
const shortcuts: DateShortcut[] = [
  { label: '下个月', value: '2025-02-15' },
  { label: '不可选', value: '2025-03-01', disabled: true },
]
function navigate(value: unknown) {
  if (acceptNavigation.value && typeof value === 'string') {
    viewport.value = value
  }
}
function observe(_value: unknown, _dates: unknown, texts: unknown) {
  notice.value = String(texts)
}
function choose(shortcut: DateShortcut) {
  shortcutNotice.value = String(shortcut.label)
}
</script>

<template>
  <mp-checkbox v-model="acceptNavigation">接受视口请求</mp-checkbox>
  <mp-date
    v-model="selected"
    panel-type="calendar"
    :input-editable="false"
    format="DD/MM/YYYY"
    :date-picker-props="{ pickerValue: viewport, shortcuts }"
    @update:picker-value="navigate"
    @picker-value-change="observe"
    @select-shortcut="choose"
  />
  <p>选择模型：{{ selected }}；受控视口：{{ viewport }}</p>
  <p>视口通知：{{ notice }}；快捷项通知：{{ shortcutNotice }}</p>
  <p>导航不改变选择模型；拒绝视口请求后，日历仍显示原月份。快捷项先选择草稿，确认后提交。</p>
</template>
```

### 展示模式只在根设置

`Date` / `DateRange` 字段通过根 `panel-type` 选择内容，纯面板通过根 `presentation` 选择内容；独立面板内容默认 `calendarPicker`，不带时间时显示日历；字段的 popup 内容默认 `calendar`。字段的 `DatePickerOptions` / `DateRangePickerOptions` 已移除无效 `presentation`，JS 运行时也过滤，不能通过嵌套对象覆盖根模式。周起始、视口、快捷项和合法外观仍可嵌套配置。单值根支持 picker/calendar/calendarPicker，范围根支持 picker/calendar；Cedar 只有桌面日历，不提供这些空模式。

### 周起始日的响应式展示

`dayStartOfWeek` 更新时，日历表头与日期列位置同步更新，不改变选中值或提交草稿。纯面板使用根属性，字段通过 `datePickerProps` / `dateRangePickerProps` 配置；滚轮视图不使用星期列。

### 动态日期限制

更新或移除 `min` / `max` 只影响可选日期，不自动修改已有模型或草稿。日历的日/月/年导航状态根据当前视口和两端限制派生；移除一端限制只恢复对应方向，不释放另一端，也不触发选择或提交。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

日期／时间字段在 inline 下沿用原确认策略；在 popover/popup 中，内部纯面板隐藏确认工具栏，由编辑层提供唯一一组确认／取消。独立 DatePicker、DateRangePicker、TimePicker、TimeRangePicker 保留原有面板 API 和确认行为，不继承 Form 的字段展示。

移动端字段原日历／滚轮的选择迁至 `panel-type`，支持集合和缺省内容不变；`presentation` 仅表示字段展示。纯 Picker 的 `presentation` 仍表示面板内容。

### 独立面板窄屏与组合布局

面板随容器宽度收缩；可切换快捷项位置及时间形式，检查导航、时间与确认操作。

Example source: src/date/example/demos/responsive-panels.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('2026-10-20 09:30:00')
const selectedRange = ref(['2026-10-20 09:30:00', '2026-10-22 18:00:00'])
const position = ref<'left' | 'right' | 'bottom'>('left')
const positions = ['left', 'right', 'bottom'].map((value) => ({ label: value, value }))
const types = ['date', 'month', 'year'] as const
const shortcuts = [{ label: '本月工作日范围', value: '2026-10-20 09:30:00' }]
const rangeShortcuts = [{ label: '本月工作日范围', value: ['2026-10-20 09:30:00', '2026-10-22 18:00:00'] }]
const presentation = ref<'calendarPicker' | 'calendarPicker' | 'picker'>('calendarPicker')
const presentations = ['calendarPicker', 'calendarPicker', 'picker'].map((value) => ({ label: value, value }))
</script>
<template>
  <div>
    <mp-select v-model="position" aria-label="独立面板快捷位置" :options="positions" />
    <mp-select v-model="presentation" aria-label="独立面板时间形式" :options="presentations" />
    <section v-for="type in types" :key="type" :aria-label="'独立 ' + type + ' 面板'">
      <h4>{{ type }} · DatePicker / DateRangePicker</h4>
      <mp-date-picker :type="type" :disable-confirm="false" presentation="calendar" />
      <mp-date-range-picker :type="type" :disable-confirm="false" presentation="calendar" />
    </section>
    <section aria-label="独立日期时间面板">
      <h4>DatePicker · 时间与快捷项</h4>
      <mp-date-picker
        v-model="selected"
        show-time
        :shortcuts="shortcuts"
        :shortcuts-position="position"
        :disable-confirm="false"
        :presentation="presentation"
      />
    </section>
    <p role="status" aria-label="独立日期时间已提交">{{ selected }}</p>
    <section aria-label="独立日期时间范围面板">
      <h4>DateRangePicker · 时间与快捷项</h4>
      <mp-date-range-picker
        v-model="selectedRange"
        show-time
        :shortcuts="rangeShortcuts"
        :shortcuts-position="position"
        :disable-confirm="false"
        :presentation="presentation"
      />
    </section>
    <p role="status" aria-label="独立日期时间范围已提交">{{ selectedRange }}</p>
  </div>
</template>
```

### 编辑容器与面板复用

DatePicker / DateRangePicker 独立使用时自带表面背景和操作区；actions 插槽替换整个默认操作区。嵌入 Form 的弹层时，统一外壳负责标题、关闭与底部确认，日期面板只贡献此刻等辅助操作，避免重复确认。关闭放弃草稿，确认失败仍保留草稿。


独立 DatePicker / DateRangePicker 与 inline 共用面板尺寸：单个日历基准宽度为 265px，带时间时宽屏左右布局、窄屏换行。独立面板保留自身的确认按钮和 actions 插槽，不继承 Form 的 presentation。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


### 移动端统一面板

单值面板不显示顶部摘要；范围摘要保留浅灰底槽和白色当前项，点击起止摘要切换编辑对象。

摘要下方不再重复显示提示和年份。点击日历中间带下拉图标的年月标题，依次进入月份、年份选择；通过底部日历按钮返回日期面板。年月标题和底部按钮支持键盘操作，切换视图不会提交值。

共享样式变量：

| Token | Default |
| --- | --- |
| `--mp-temporal-panel-inset` | `12px` |
| `--mp-temporal-panel-column-label-height` | `36px` |
| `--mp-temporal-panel-column-label-font-size` | `13px` |
| `--mp-temporal-panel-radius` | `12px` |
| `--mp-temporal-panel-group-gap` | `24px` |
| `--mp-temporal-panel-touch-height` | `44px` |
| `--mp-temporal-panel-summary-background` | `var(--mp-color-fill-1)` |
| `--mp-temporal-panel-summary-height` | `56px` |
| `--mp-temporal-panel-quick-time-width` | `84px` |
| `--mp-temporal-panel-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-temporal-panel-active-background` | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |

单日期、单日期时间面板在独立面板、字段浮层和弹层中均不显示顶部摘要；日期时间的当前日期、时间和时钟／日历切换保留在底部。范围组件仍通过顶部摘要切换起止端。
# 时区与多月日历

`time-zone="Asia/Shanghai"` 使用 IANA 时区名。`Date`、毫秒时间戳表示真实时刻，切换时区只改变展示；字符串按目标时区的当地时间解释。`min`、`max`、手输、快捷项、事件和禁用规则使用相同协议；事件中的 `Date` 仍是真实时刻。未设置时保持浏览器本地时区行为。夏令时不存在的时间拒绝选择，重复出现的时间取第一次，非法时区禁止提交。

`interactive-mode` 支持 `page`（默认）、`scroll`、`line`。`scroll` 在 `min` / `max` 间展示多月，默认开启 `use-virtual-scroll`，只渲染视口附近月份；未提供边界时使用初始视口前后各一年。`line` 使用独立星期表头和一行日期，复用日历日期按钮的圆形选中态；标题显示本周起止日期，前后按钮按周切换。浏览和翻周不会提交表单；选择、取消、确认仍沿用 Maple 字段草稿机制。

这两个视图支持日精度日期与日期时间，日期时间继续使用原有快捷时间和详细时间滚轮；范围端点摘要、单端点锁定、反序反馈及确认／取消继续由原封装管理。年／月／周精度沿用原有面板。设置 `use-virtual-scroll="false"` 会渲染全部月份，大范围建议保持虚拟滚动。

布局可覆盖 `--mp-date-calendar-scroll-height`、`--mp-date-calendar-month-height`、`--mp-date-calendar-row-height` 和 `--mp-date-calendar-line-height`；月份使用固定六周网格。虚拟滚动要求月份等高，调整行高时同步调整月高度，避免内容溢出。颜色复用日历既有主题 token，支持 Alps / Firefly 亮暗主题。


## 透传配置边界与优先级

建议使用 `DatePopupOptions` 声明 popup-props；仅用于 inline 锚定弹层的允许展示/定位配置。open/defaultOpen、disabled/readonly、modelValue、值格式、日期规则及通知监听由字段管理，已有 datePresentationOptions 会过滤托管字段和 onXxx 监听。popup-container 顶层明确传入时优先（包括 false），否则回退 popupProps.popupContainer；popupClass 与内部类合并。trigger、closeOnClickReference、preventFocus、popupOffset 由字段展示层固定（偏移当前为 4）；Maple 还固定 unmountOnClose=true。新类型为两端共同的安全子集，不能设置这些固定项；Cedar 旧配置可透传的 unmountOnClose 不受本次影响。可使用 popupTranslate 定制附加平移。其他有效展示字段保持原透传。

本次仅新增可主动选用的专用类型，不收窄已发布的宽属性类型，不增加运行时过滤、不改变覆盖顺序；旧业务写法继续可编译。若直接使用旧宽属性，内部托管字段仍可能通过类型检查，但不代表能控制内部状态。

```ts
import type { DatePopupOptions } from '@maple-design/ui'
```

Example source: src/date/example/demos/passthrough-options.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DatePopupOptions } from '@maple-design/ui'

const open = ref(false)
const popupOptions: DatePopupOptions = { placement: 'top-start', popupTranslate: [0, -8], popupContainer: false }
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-date v-model:open="open" presentation="inline" :popup-props="popupOptions" aria-label="透传配置示例" />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
```
夏令时跳过的整小时或半小时会从时间候选中排除，仍然存在的分钟保持可选。新的当地时间选择遇到重复小时默认取第一次；已有 Date／时间戳即使位于第二次重复小时，切换时区展示、无修改确认以及编辑另一个范围端点都保留原始时刻和未显示的毫秒。字符串不携带重复小时的发生次数，如需保留明确时刻应使用 Date 或 timestamp。


## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。


## 滚轮可见字段

`date-fields` 与 `time-fields` 分别控制日期、时间滚轮列的显隐及顺序，两组不会交错排列。范围起止两端共用配置，字段与独立面板使用相同属性。

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `date-fields` | readonly DatePickerField[] | 按 type 生成年、月、日列 | 可选 year、month、day；只影响列式日期选择，不改变日历网格。 |
| `time-fields` | readonly TimePickerField[] | 时、分、秒 | 可选 hour、minute、second；也控制日历内的时间滚轮。 |

数组需非空、无重复，显式数组严格决定可见列与顺序；未传属性时采用默认列。两组字段各自校验，不能混用。隐藏字段保留已有值，编辑合并回完整草稿；更改字段配置不会提交主值。嵌套展示配置不能覆盖根属性。

Date/DateRange 的时间区域仅在 show-time 开启时生效。`format` 控制输入显示，`value-format` 控制保存格式，均不决定面板列。未指定格式时日期时间默认保存到秒；只需分钟字符串时，另行设置 format 与 value-format。隐藏年份仍使用完整草稿中的年份；仅保存 MM-DD 无法表达跨年范围，闰年和跨年业务应保存完整日期。
