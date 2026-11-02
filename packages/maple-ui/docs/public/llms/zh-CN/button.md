<!-- Source: src/button/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/button -->

# Button

Button 的禁用配色按变体区分：彩色实心使用淡化状态背景；text/outline 保持透明背景并淡化状态文字；tonal 保留浅色背景。中性按钮使用中性禁用色。禁用时暂停 color/text-color 覆盖，关闭 hover/active 反馈和阴影。

两端使用同一份实现和示例，组件前缀、主题基础变量与注册入口各自保留。

## 案例

### 八种主题色

Example source: src/button/example/demos/basic.vue

```vue
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button v-for="status in statuses" :key="status" :status="status">{{ status }}</mp-button>
  </div>
</template>
```

### 变体、状态与尺寸

选择变体和尺寸，同时对比八种状态色。实心适合主要操作，text 和 outline 适合次要操作；这里只组合三个外观维度。

Example source: src/button/example/demos/variants.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const variant = ref('default')
const size = ref('md')
const variants = ['default', 'text', 'outline', 'tonal']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Variant</span>
        <mp-select
          v-model="variant"
          presentation="inline"
          :clearable="false"
          :options="variants.map((value) => ({ label: value, value }))"
          aria-label="Button variant"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          presentation="inline"
          :clearable="false"
          :options="sizes.map((value) => ({ label: value, value }))"
          aria-label="Button size"
        />
      </div>
    </mp-space>
    <mp-space wrap>
      <mp-button v-for="status in statuses" :key="status" :status="status" :variant="variant" :size="size">{{
        status
      }}</mp-button>
    </mp-space>
  </mp-space>
</template>
```

### 五档尺寸

同一平台的水平 Button 与 Input 默认按相同 size 对齐高度和字号。Cedar 高度为 24/28/32/36/44px，Maple 为 32/40/48/56/64px；按钮单侧内边距为 8/12/16/20/24px，图标与文字间距为 6px。堆叠按钮使用独立的内容高度规则。组件局部样式覆盖仍各自生效。

Example source: src/button/example/demos/size.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space v-for="size in sizes" :key="size" align="center" wrap :size="12">
      <span>{{ size }}</span>
      <mp-input :size="size" :aria-label="`Input ${size}`" placeholder="Input" style="width: 140px" />
      <mp-button :size="size">Button</mp-button>
      <mp-button :size="size"
        ><template #icon><m-icon-search /></template>Search</mp-button
      >
    </mp-space>
  </mp-space>
</template>
```

### 禁用与链接拦截

Example source: src/button/example/demos/disabled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button disabled @click="clicks++">Disabled button</mp-button>
    <mp-button component="a" href="#blocked-button-link" disabled @click="clicks++">Disabled link</mp-button>
    <mp-button component="a" href="#blocked-button-link" loading @click="clicks++">Loading link</mp-button>
  </div>
  <p aria-live="polite">Blocked clicks: {{ clicks }}</p>
</template>
```

### 加载动画、布局与尺寸

选择加载布局和指示器尺寸，对比五种动画。点击选择框箭头展开菜单，选择选项后收起。加载时按钮保留文案并阻止重复操作。

Example source: src/button/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const mode = ref('default')
const size = ref('md')
const modes = ['default', 'fill', 'line']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const types = ['circle', 'wave', 'cube', 'rect', 'disappear']
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Layout</span>
        <mp-select
          v-model="mode"
          presentation="inline"
          :clearable="false"
          :options="modes.map((value) => ({ label: value, value }))"
          aria-label="Loading mode"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          presentation="inline"
          :disabled="mode === 'line'"
          :clearable="false"
          :options="sizes.map((value) => ({ label: value, value }))"
          aria-label="Loading size"
        />
      </div>
    </mp-space>
    <p v-if="mode === 'line'">
      line 使用底部进度线，loading-type 和 loading-size 不适用；可通过 loading-color 调整颜色。
    </p>
    <mp-space wrap
      ><mp-button
        v-for="type in mode === 'line' ? ['line'] : types"
        :key="type"
        loading
        :loading-type="mode === 'line' ? 'circle' : type"
        :loading-mode="mode"
        :loading-size="size"
        >{{ type }}</mp-button
      ></mp-space
    >
  </mp-space>
</template>
```

### 加载指示器样式

Example source: src/button/example/demos/loading-appearance.vue

```vue
<template>
  <mp-space wrap
    ><mp-button loading loading-color="#e05279">Custom color</mp-button
    ><mp-button loading :loading-size="16">Custom size</mp-button></mp-space
  >
</template>
```

### 同步、异步与失败恢复

Example source: src/button/example/demos/auto-loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Ready')
function sync() {
  message.value = 'Synchronous: no loading'
}
async function run(fail = false) {
  message.value = 'Pending: duplicate clicks are blocked'
  await new Promise((resolve) => setTimeout(resolve, 800))
  message.value = fail ? 'Rejected: loading released' : 'Resolved: loading released'
  if (fail) {
    throw new Error('Demo rejection')
  }
}
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button auto-loading @click="sync">Sync</mp-button>
    <mp-button auto-loading @click="() => run()">Resolve</mp-button>
    <mp-button auto-loading @click="() => run(true)">Reject</mp-button>
  </div>
  <p aria-live="polite">{{ message }}</p>
</template>
```

### 块级按钮

Example source: src/button/example/demos/block.vue

```vue
<template>
  <mp-button block>Full width</mp-button>
</template>
```

### 按钮组继承与覆盖

切换组尺寸和禁用状态，观察子按钮继承配置。子按钮可独立覆盖状态色，显式 disabled=false 可覆盖组禁用。

Example source: src/button/example/demos/button-group.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const size = ref('md')
const disabled = ref(false)
</script>
<template>
  <mp-space direction="column" :size="16" class="button-group-demo">
    <mp-space wrap>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          aria-label="Button group size"
          :options="['xs', 'sm', 'md', 'lg', 'xl'].map((value) => ({ label: value, value }))"
          :clearable="false"
        />
      </div>
      <mp-checkbox v-model="disabled">Disable group</mp-checkbox>
    </mp-space>
    <div class="button-group-demo__scroll">
      <mp-button-group status="primary" :size="size" :disabled="disabled">
        <mp-button>Inherited</mp-button>
        <mp-button status="success">Status override</mp-button>
        <mp-button :disabled="false">Enabled override</mp-button>
      </mp-button-group>
    </div>
  </mp-space>
</template>
<style scoped>
.button-group-demo {
  width: 100%;
}
.button-group-demo__scroll {
  max-width: 100%;
  overflow-x: auto;
}
</style>
```

### 按钮组布局

在水平和垂直排列中比较变体和尺寸。尺寸、变体与排列方向共同组成三个外观维度。

Example source: src/button/example/demos/button-group-layout.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const variant = ref('default')
const size = ref('md')
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Variant</span>
        <mp-select
          v-model="variant"
          aria-label="Button group variant"
          :options="['default', 'text', 'outline', 'tonal'].map((value) => ({ label: value, value }))"
          :clearable="false"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          aria-label="Button group size"
          :options="['xs', 'sm', 'md', 'lg', 'xl'].map((value) => ({ label: value, value }))"
          :clearable="false"
        />
      </div>
    </mp-space>
    <mp-space align="start" :size="24">
      <mp-button-group
        v-for="vertical in [false, true]"
        :key="String(vertical)"
        :vertical="vertical"
        :variant="variant"
        :size="size"
        status="primary"
      >
        <mp-button>Previous</mp-button><mp-button>Next</mp-button>
      </mp-button-group>
    </mp-space>
  </mp-space>
</template>
```

### 按钮组图文与加载

切换图文堆叠和排列方向，再启用第一个按钮的加载状态；其他操作仍可独立使用。竖向按钮组的横排图文按起始边对齐，避免文字长度不同导致图标错位。

Example source: src/button/example/demos/button-group-content.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const stacked = ref(false)
const vertical = ref(false)
const loading = ref(false)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="stacked">Stacked labels</mp-checkbox>
      <mp-checkbox v-model="vertical">Vertical group</mp-checkbox>
      <mp-checkbox v-model="loading">Load first action</mp-checkbox>
    </mp-space>
    <mp-button-group status="primary" :stacked="stacked" :vertical="vertical">
      <mp-button :loading="loading"
        ><template #icon><m-icon-check /></template>Save</mp-button
      >
      <mp-button
        ><template #icon><m-icon-close /></template>Cancel</mp-button
      >
    </mp-button-group>
  </mp-space>
</template>
```

### 原生表单、焦点与触摸事件

Example source: src/button/example/demos/native-events.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Editable')
const submissions = ref(0)
const event = ref('Use Tab, Enter or touch')
</script>
<template>
  <mp-form style="display: flex; flex-wrap: wrap; gap: 12px" @submit="submissions++" @reset="value = 'Editable'">
    <mp-input
      v-model="value"
      aria-label="Example field"
      placeholder="Example field"
      style="width: 100%; max-width: 280px"
    />
    <mp-button html-type="submit">Submit</mp-button>
    <mp-button html-type="reset">Reset</mp-button>
    <mp-button :focusable="false">Skip Tab</mp-button>
    <mp-button
      @touchstart="event = 'touchstart'"
      @focus="event = 'focus'"
      @blur="event = 'blur'"
      @click="event = 'click'"
      >Event target</mp-button
    >
  </mp-form>
  <p aria-live="polite">Submissions: {{ submissions }}; {{ event }}</p>
</template>
```

### 水波与阴影反馈

点击按钮观察水波，调整阴影等级比较层次感。关闭水波不会影响点击事件。

Example source: src/button/example/demos/feedback.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const ripple = ref(true)
const elevation = ref(2)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="ripple">Ripple</mp-checkbox>
      <label>Elevation<mp-input-number v-model="elevation" :min="0" :max="24" aria-label="Button elevation" /></label>
    </mp-space>
    <mp-button :ripple="ripple" :elevation="elevation">Click to compare feedback</mp-button>
  </mp-space>
</template>
```

### 图标与图文布局

使用内置图标，切换四种变体和五档尺寸，对比纯图标、横排图文、上下堆叠。堆叠按钮按内容撑高，上下至少保留 8px 内边距。纯图标只传 icon 插槽；round 控制圆形，stacked 控制上下排列。

Example source: src/button/example/demos/icons.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const variants = ['default', 'text', 'outline', 'tonal'] as const
const layouts = ['icon', 'inline', 'stacked'] as const
const size = ref<(typeof sizes)[number]>('md')
const variant = ref<(typeof variants)[number]>('tonal')
const items = [
  { status: 'default', icon: 'plus', label: 'Add' },
  { status: 'primary', icon: 'reply', label: 'Reply' },
  { status: 'info', icon: 'info-circle', label: 'Info' },
  { status: 'success', icon: 'check', label: 'Confirm' },
  { status: 'warning', icon: 'delete', label: 'Delete' },
  { status: 'danger', icon: 'close', label: 'Close' },
] as const
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <div>
        <span>Variant</span>
        <mp-select
          v-model="variant"
          presentation="inline"
          :options="variants.map((value) => ({ label: value, value }))"
          :clearable="false"
          aria-label="Icon button variant"
        />
      </div>
      <div>
        <span>Size</span>
        <mp-select
          v-model="size"
          presentation="inline"
          :options="sizes.map((value) => ({ label: value, value }))"
          :clearable="false"
          aria-label="Icon button size"
        />
      </div>
    </mp-space>
    <mp-space v-for="layout in layouts" :key="layout" direction="column" :size="8">
      <span>{{
        layout === 'icon'
          ? 'Icon only / 纯图标'
          : layout === 'inline'
            ? 'Icon and text / 横排图文'
            : 'Stacked / 上下堆叠'
      }}</span>
      <mp-space wrap>
        <mp-button
          v-for="item in items"
          :key="item.label"
          :status="item.status"
          :variant="variant"
          :size="size"
          :stacked="layout === 'stacked'"
          :round="layout === 'icon'"
          :aria-label="item.label"
        >
          <template #icon>
            <m-icon-plus v-if="item.icon === 'plus'" />
            <m-icon-reply v-else-if="item.icon === 'reply'" />
            <m-icon-info-circle v-else-if="item.icon === 'info-circle'" />
            <m-icon-check v-else-if="item.icon === 'check'" />
            <m-icon-delete v-else-if="item.icon === 'delete'" />
            <m-icon-close v-else-if="item.icon === 'close'" />
          </template>
          <template v-if="layout !== 'icon'" #default>{{ item.label }}</template>
        </mp-button>
      </mp-space>
    </mp-space>
  </mp-space>
</template>
```

### 自定义颜色

Example source: src/button/example/demos/custom-color.vue

```vue
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <mp-button color="#6750a4" text-color="white">Custom filled</mp-button>
    <mp-button color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white">Gradient</mp-button>
    <mp-button color="#6750a4" variant="text">Custom text</mp-button>
    <mp-button color="#6750a4" variant="outline">Custom outline</mp-button>
    <mp-button color="#6750a4" variant="tonal">Custom tonal</mp-button>
  </div>
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

## API

<!-- same-source-api:start -->

### Props

| 属性          | 说明                                                                                             | 类型                                      | 默认值         |
| ------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------- | -------------- |
| status        | 主题色；省略时继承按钮组，否则 default                                                           | `SemanticStatus`                          | `undefined`    |
| variant       | 外观；省略时继承按钮组，否则 default                                                             | `default / text / outline / tonal`        | `undefined`    |
| size          | 尺寸；省略时继承按钮组，否则 md                                                                  | `xs / sm / md / lg / xl`                  | `undefined`    |
| html-type     | 原生按钮类型                                                                                     | `button / submit / reset`                 | `button`       |
| component     | 根标签，链接属性通过 attrs 传入                                                                  | `button / a`                              | `button`       |
| round         | 圆形按钮                                                                                         | `boolean`                                 | `false`        |
| block         | 占满可用宽度                                                                                     | `boolean`                                 | `false`        |
| loading       | 加载状态，禁止点击和链接跳转                                                                     | `boolean`                                 | `false`        |
| loading-type  | 加载动画；与 Loading 的 type 相同，line 模式不适用                                               | `circle / wave / cube / rect / disappear` | `circle`       |
| loading-mode  | 行内、覆盖或底部进度线；line 只使用 loading-color                                                | `default / fill / line`                   | `default`      |
| loading-size  | 指示器尺寸；xs/sm/md/lg/xl 对应 12/14/16/18/20px，数字为 px；省略时跟随按钮尺寸，line 模式不适用 | `ComponentSize / number`                  | `undefined`    |
| loading-color | 加载指示器颜色                                                                                   | `string`                                  | `currentColor` |
| auto-loading  | 等待 click/touchstart 返回的 Promise；同步回调不闪 loading                                       | `boolean`                                 | `false`        |
| disabled      | 禁用；省略时继承按钮组，显式 false 可覆盖                                                        | `boolean`                                 | `undefined`    |
| ripple        | 点击水波                                                                                         | `boolean`                                 | `true`         |
| focusable     | 允许 Tab 顺序聚焦；不影响通过代码聚焦                                                            | `boolean`                                 | `true`         |
| autofocus     | 原生自动聚焦                                                                                     | `boolean`                                 | `false`        |
| text-color    | 自定义文字色                                                                                     | `string`                                  | `undefined`    |
| color         | 自定义背景／变体基色                                                                             | `string`                                  | `undefined`    |
| elevation     | default 变体阴影；true 为 2，false 关闭，数字四舍五入并限制 0～24；组内由组控制                  | `boolean / number`                        | `true`         |
| stacked       | 图标文字纵向排列；省略时继承按钮组                                                               | `boolean`                                 | `undefined`    |

### Events

| 事件       | 参数与行为                                  |
| ---------- | ------------------------------------------- |
| click      | `(event: Event) => void / Promise<unknown>` |
| touchstart | `(event: Event) => void / Promise<unknown>` |

事件处理函数可返回 Promise，也支持多个监听器。auto-loading 会等待全部监听器完成，即使某个提前拒绝也不会提前解除禁用。卸载或 KeepAlive 停用会使旧异步结果失效。内部直接读取监听器返回值，不再二次 emit。原生 focus/blur 等事件透传。禁用／加载中的 click 会阻止跳转与冒泡。

### Slots

| 插槽    | 说明                             | 参数 |
| ------- | -------------------------------- | ---- |
| default | 按钮内容；加载时保留             | —    |
| icon    | 前置图标；stacked 时位于文字上方 | —    |

### Methods

无自定义公开方法。
<!-- same-source-api:end -->

## ButtonGroup

属性：size=md、status=default、variant=default、color/text-color=undefined、disabled/stacked/vertical=false、elevation=true。使用 default 插槽，公开 buttonGroupProvider（响应式组配置），没有自定义事件。子按钮按字段覆盖组配置；阴影由组整体控制。

## 类型

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonHandler、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。

## CSS 变量职责与完整默认值

Button 保留 58 个外观变量。`{status}-color` 控制实心背景，`{status}-foreground-color` 控制 text/outline/tonal 的文字和图标，`{status}-tonal-color` 控制浅色背景。语义状态共用 `solid-text-color` 和 `solid-state-layer-color`；default/tertiary 前景与 primary/tertiary 状态层保留必要的主题差异。

尺寸统一使用 xs/sm/md/lg/xl。字号、过渡时长、焦点宽度与偏移、堆叠高度增量直接复用系统变量；按钮组与堆叠圆角共用 border-radius。四个状态透明度变量保留 hover/active 的差异。loading-duration 仅控制底部进度线；其他加载动画由 Loading 负责。内部变量与固定动画几何细节不再作为公共定制项。

| 变量名                                         | 默认值                                     |
| ---------------------------------------------- | ------------------------------------------ |
| `--mp-button-border-radius`                    | `var(--mp-sys-radius-md)`                  |
| `--mp-button-content-gap`                      | `var(--mp-sys-space-3)`                    |
| `--mp-button-danger-color`                     | `var(--mp-sys-color-status-danger)`        |
| `--mp-button-danger-disabled-color`            | `rgb(var(--mp-danger-3))`                  |
| `--mp-button-danger-foreground-color`          | `var(--mp-sys-color-content-danger)`       |
| `--mp-button-danger-plain-background-color`    | `transparent`                              |
| `--mp-button-danger-tonal-color`               | `rgb(var(--mp-danger-1))`                  |
| `--mp-button-default-color`                    | `var(--mp-sys-color-surface-default)`      |
| `--mp-button-default-foreground-color`         | `var(--mp-sys-color-content-primary)`      |
| `--mp-button-default-plain-background-color`   | `transparent`                              |
| `--mp-button-default-tonal-color`              | `var(--mp-sys-color-surface-muted)`        |
| `--mp-button-disabled-color`                   | `var(--mp-color-fill-2)`                   |
| `--mp-button-disabled-solid-text-color`        | `var(--mp-sys-color-content-on-dark)`      |
| `--mp-button-disabled-text-color`              | `var(--mp-sys-color-content-disabled)`     |
| `--mp-button-focus-color`                      | `var(--mp-sys-color-content-brand)`        |
| `--mp-button-info-color`                       | `var(--mp-sys-color-status-info)`          |
| `--mp-button-info-disabled-color`              | `rgb(var(--mp-blue-3))`                    |
| `--mp-button-info-foreground-color`            | `var(--mp-sys-color-content-info)`         |
| `--mp-button-info-plain-background-color`      | `transparent`                              |
| `--mp-button-info-tonal-color`                 | `rgb(var(--mp-blue-1))`                    |
| `--mp-button-lg-height`                        | `56px`                                     |
| `--mp-button-lg-padding`                       | `0 var(--mp-sys-space-7)`                  |
| `--mp-button-loading-duration`                 | `1s`                                       |
| `--mp-button-loading-line-height`              | `3px`                                      |
| `--mp-button-md-height`                        | `48px`                                     |
| `--mp-button-md-padding`                       | `0 var(--mp-sys-space-6)`                  |
| `--mp-button-plain-state-opacity-active`       | `1`                                        |
| `--mp-button-plain-state-opacity-hover`        | `0.5`                                      |
| `--mp-button-primary-color`                    | `var(--mp-sys-color-action-primary)`       |
| `--mp-button-primary-disabled-color`           | `rgb(var(--mp-primary-3))`                 |
| `--mp-button-primary-foreground-color`         | `var(--mp-sys-color-content-brand)`        |
| `--mp-button-primary-plain-background-color`   | `transparent`                              |
| `--mp-button-primary-state-layer-color`        | `var(--mp-button-solid-state-layer-color)` |
| `--mp-button-primary-tonal-color`              | `rgb(var(--mp-primary-1))`                 |
| `--mp-button-secondary-color`                  | `rgb(var(--mp-gray-6))`                    |
| `--mp-button-secondary-foreground-color`       | `var(--mp-sys-color-content-secondary)`    |
| `--mp-button-secondary-plain-background-color` | `transparent`                              |
| `--mp-button-secondary-tonal-color`            | `rgb(var(--mp-gray-2))`                    |
| `--mp-button-sm-height`                        | `40px`                                     |
| `--mp-button-sm-padding`                       | `0 var(--mp-sys-space-5)`                  |
| `--mp-button-solid-state-layer-color`          | `var(--mp-sys-color-content-on-dark)`      |
| `--mp-button-solid-text-color`                 | `var(--mp-sys-color-content-on-dark)`      |
| `--mp-button-stacked-gap`                      | `var(--mp-sys-space-2)`                    |
| `--mp-button-state-layer-color`                | `var(--mp-sys-color-surface-page)`         |
| `--mp-button-state-opacity-active`             | `0.12`                                     |
| `--mp-button-state-opacity-hover`              | `0.08`                                     |
| `--mp-button-success-color`                    | `var(--mp-sys-color-status-success)`       |
| `--mp-button-success-disabled-color`           | `rgb(var(--mp-success-3))`                 |
| `--mp-button-success-foreground-color`         | `var(--mp-sys-color-content-success)`      |
| `--mp-button-success-plain-background-color`   | `transparent`                              |
| `--mp-button-success-tonal-color`              | `rgb(var(--mp-success-1))`                 |
| `--mp-button-tertiary-color`                   | `rgb(var(--mp-gray-7))`                    |
| `--mp-button-tertiary-foreground-color`        | `var(--mp-sys-color-content-secondary)`    |
| `--mp-button-tertiary-plain-background-color`  | `transparent`                              |
| `--mp-button-tertiary-state-layer-color`       | `var(--mp-sys-color-content-on-bright)`    |
| `--mp-button-tertiary-text-color`              | `var(--mp-sys-color-content-on-dark)`      |
| `--mp-button-tertiary-tonal-color`             | `rgb(var(--mp-gray-1))`                    |
| `--mp-button-warning-color`                    | `var(--mp-sys-color-status-warning)`       |
| `--mp-button-warning-disabled-color`           | `rgb(var(--mp-warning-3))`                 |
| `--mp-button-warning-foreground-color`         | `var(--mp-sys-color-content-warning)`      |
| `--mp-button-warning-plain-background-color`   | `transparent`                              |
| `--mp-button-warning-tonal-color`              | `rgb(var(--mp-warning-1))`                 |
| `--mp-button-xl-height`                        | `64px`                                     |
| `--mp-button-xl-padding`                       | `0 var(--mp-sys-space-8)`                  |
| `--mp-button-xs-height`                        | `32px`                                     |
| `--mp-button-xs-padding`                       | `0 var(--mp-sys-space-4)`                  |
