<!-- Source: src/cascader/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/cascader -->

# 级联选择器

多选时，`inline` 下拉只显示选项；已选内容、单项移除和清空由输入框承担。`popup` 编辑面板保留“已选／清空”，选择为草稿，确认后提交。


## 案例

### 请选择地区

Example source: src/cascader/example/demos/placeholder.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const menuValue = ref([])
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader v-model="menuValue" path-mode placeholder="请选择地区" :options="options" />
  </mp-space>
</template>
```

### 非路径模式

Example source: src/cascader/example/demos/placeholder-path-mode.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const menuValue2 = ref('')
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader v-model="menuValue2" placeholder="非路径模式" :options="options" :path-mode="false" />
  </mp-space>
</template>
```

### 级联多选

Example source: src/cascader/example/demos/placeholder-multiple.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const multipleValue = ref([])
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader v-model="multipleValue" path-mode placeholder="级联多选" :options="options" multiple show-tags />
  </mp-space>
</template>
```

### 表单控件尺寸对照

切换 size 和字段变体，对比有值、可清空、多选不换行的 Cascader、Select、Input 与 Button。长标签文字省略，删除图标保留，标签行可横向滚动；清空按钮和箭头固定在外侧。被省略的标签正文支持悬停、键盘聚焦或点按查看完整文字，点外部或按 Esc 关闭，不改变选中值。

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

### Dialog 模式

Example source: src/cascader/example/demos/placeholder-picker.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const pickerValue = ref([])
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader v-model="pickerValue" path-mode placeholder="Picker 模式" presentation="popup" :options="options" />
  </mp-space>
</template>
```

### Dialog 多选

Example source: src/cascader/example/demos/placeholder-picker-multiple.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const pickerMultipleValue = ref([])
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader
      v-model="pickerMultipleValue"
      path-mode
      placeholder="Picker 多选"
      presentation="popup"
      :options="options"
      multiple
      show-tags
    />
  </mp-space>
</template>
```

### Popup 模式

Example source: src/cascader/example/demos/placeholder-list.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const listValue = ref([])
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader v-model="listValue" path-mode placeholder="List 模式" presentation="popup" :options="options" />
  </mp-space>
</template>
```

### Popup 多选

Example source: src/cascader/example/demos/placeholder-list-multiple.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const listMultipleValue = ref([])
const options = computed(() => [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '拱墅区', value: 'gongshu' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      { label: '南京市', value: 'nanjing' },
      { label: '苏州市', value: 'suzhou' },
    ],
  },
])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-cascader
      v-model="listMultipleValue"
      path-mode
      placeholder="List 多选"
      presentation="popup"
      :options="options"
      multiple
      show-tags
    />
  </mp-space>
</template>
```

### 展示与提交规则

inline 即选即提交；popup、dialog 单选和多选都编辑草稿，外层确认一次后提交。取消、遮罩关闭、Escape、切换展示方式都丢弃草稿；外部 modelValue 更新优先。搜索在弹层内，沿用本地过滤、search 事件和 loadMore 异步加载。

### 管理已选项

多选面板顶部提供已选数量与清空。Cedar 在列表上方显示可删除标签；Maple 点击数量查看已选明细，支持逐项移除并返回可选项。popup/popover 与 dialog 共用该内容。移除和清空先修改草稿，关闭取消会恢复原值，确认后才提交；禁用项保留，异步确认期间禁用操作。面板的清空入口独立于字段清空图标。

### 外观组合

适用于地区等层级选项。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

Example source: src/cascader/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('shanghai')
const options = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      { label: '杭州', value: 'hangzhou' },
    ],
  },
]
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
    <mp-cascader v-model="value" :options="options" clearable v-bind="__demoAppearance"></mp-cascader>
  </mp-space>
</template>
```

### 交互状态切换

适用于地区等层级选项。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

Example source: src/cascader/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('shanghai')
const options = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      { label: '杭州', value: 'hangzhou' },
    ],
  },
]
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-cascader v-model="value" :options="options" clearable v-bind="__demoState"></mp-cascader>
  </mp-space>
</template>
```

### 异步设备与 ID 回显

Example source: src/cascader/example/demos/async-devices.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const presentation = ref<'inline' | 'popup'>('popup')
const value = ref(['factory', 'device-2'])
const options = ref<Record<string, unknown>[]>([])
const loading = ref(false)
async function load() {
  loading.value = true
  try {
    options.value = await Promise.resolve([
      {
        id: 'factory',
        name: '工厂',
        nodes: [
          { id: 'device-1', name: '设备一' },
          { id: 'device-2', name: '设备二' },
          { id: 'device-3', name: '检修设备', disabled: true },
        ],
      },
    ])
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-select
      v-model="presentation"
      placeholder="展示方式"
      :clearable="false"
      hint
      :options="[
        { label: 'inline', value: 'inline' },
        { label: 'popup', value: 'popup' },
      ]"
      :style="{ width: '200px' }"
    />
    <mp-button @click="load">加载设备树</mp-button>
    <mp-cascader
      v-model="value"
      :presentation="presentation"
      :options="options"
      :loading="loading"
      path-mode
      filterable
      clearable
      :field-names="{ label: 'name', value: 'id', children: 'nodes' }"
      placeholder="选择设备路径"
    />
    <p>已提交路径：{{ value }}。标签与 ID 分离，异步加载后自动回显。</p>
  </mp-space>
</template>
```

### 介绍

通过下拉菜单或底部弹窗的形式进行级联选择。

单选已选项在右侧显示内置主色对勾。多选使用 Checkbox：可选后代全部未选为未选，部分选中为半选，全部可选叶子选中为全选；禁用叶子不参与全选计算。checkStrictly 开启时父子独立选择，不汇总半选。确认式编辑面板中的选择先作为草稿，确认后才提交。

## 搜索匹配规则

`case-sensitive` 默认 false，只控制内置本地匹配是否区分大小写；自定义过滤函数优先。保留原有路径标签和 checkStrictly 行为；远程结果不需本地筛选时可使用 `:filter-option="() => true"`，该属性仍是原有函数协议。

Example source: src/cascader/example/demos/case-sensitive.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])
const caseSensitive = ref(false)
const options = [{ value: 'fruit', label: 'Fruit', children: [{ value: 'apple', label: 'Apple' }] }]
</script>
<template>
  <mp-space direction="column" fill>
    <mp-space><mp-switch v-model="caseSensitive" /><span>区分大小写</span></mp-space>
    <mp-cascader
      v-model="value"
      :options="options"
      :case-sensitive="caseSensitive"
      filterable
      placeholder="输入 fruit、Fruit、apple 或 Apple"
    />
    <p>保留原有路径标签匹配。启用区分大小写后，输入 fruit 不匹配 Fruit。</p>
  </mp-space>
</template>
```

## API

### Cascader 属性

分别使用 `v-model`、`v-model:open` 和 `v-model:input-value` 控制选中值、展开状态和搜索词。单选清空为 `''`，多选为 `[]`；Select 存在真实空字符串选项时，清空值为 `undefined`。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value / default-value` | 受控值 / 非受控初始值 | `Value` | `单选 ''，多选 []` |
| `open / default-open` | 受控展开 / 默认展开 | `boolean` | `undefined / false` |
| `input-value / default-input-value` | 搜索文本，独立于选中值 | `string` | `undefined / ''` |
| `multiple` | 多选；默认启用搜索 | `boolean` | `false` |
| `size` | 完整支持 xs、sm、md、lg、xl，未设置时继承分组与表单 | `ComponentSize` | `md` |
| `variant` | filled、outline、standard；未设置时继承 InputGroup | `FormControlVariant` | `filled` |
| `disabled / readonly / error` | 未设置时继承表单；显式 false 可覆盖 | `boolean` | `undefined` |
| `placeholder` | 占位文本 | `string` | `—` |
| `hint / line` | 浮动提示 / standard 变体下划线 | `boolean` | `true` |
| `text-color / focus-color / blur-color` | 字段颜色 | `string` | `—` |
| `loading` | 加载状态；禁止选择和确认 | `boolean` | `false` |
| `show-tags` | 多选值以标签展示；false 改用分隔文本 | `boolean` | `true` |
| `separator` | show-tags=false 时的多选分隔符 | `string` | `,` |
| `text-align` | left、center、right | `string` | `left` |
| `max-tag-count` | 标签数量上限，0 不限制 | `number` | `0` |
| `tag-nowrap` | 标签单行显示；长文字省略、删除图标保留，标签行可横向滚动；悬停、聚焦或点按省略正文查看全文 | `boolean` | `false` |
| `popup-container` | 选择器、元素、返回元素的函数或 false（原地渲染） | `PopupContainer` | `—` |
| `trigger-props` | Menu 的 Trigger 属性；展开状态由字段控制 | `TriggerProps` | `—` |
| `virtual-list-props` | Menu / List 的虚拟列表参数 | `VirtualListProps` | `—` |
| `search-delay` | search 事件防抖时长（毫秒） | `number` | `500` |
| `format-label` | 格式化已选标签；VNode 使用 label 插槽 | `function` | `—` |
| `clearable` | 允许清除，保留禁用的已选项 | `boolean` | `false` |
| `options` | 树形选项；叶值模式要求叶值唯一，路径模式可区分不同分支 | `CascaderOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | value、label、disabled、children、isLeaf、tagProps、render 的字段映射 | `CascaderFieldNames` | `—` |
| `path-mode` | true 返回完整路径；false 返回选中节点的值 | `boolean` | `false` |
| `check-strictly` | 允许选中父节点；多选不关联父子节点 | `boolean` | `false` |
| `filterable` | 开启搜索 | `boolean` | `单选 false / 多选 true` |
| case-sensitive | 内置本地过滤是否区分大小写，自定义过滤函数优先 | boolean | false |
| `filter-option` | 接收搜索词和原始节点 | `(input, option) => boolean` | `—` |
| `expand-trigger` | Menu / List 的展开交互：click 或 hover | `string` | `click` |
| `expand-child` | 展开到首个子节点 | `boolean` | `false` |
| `load-more` | 异步加载子节点；完成后调用 done(children)，失败调用 done() 以允许重试 | `(option, done) => void` | `—` |
| `fallback` | 尚未加载的值如何反显 | `boolean 或 (value) => string` | `true` |
| `search-option-only-label` | 搜索结果仅显示节点标签，不显示路径 | `boolean` | `false` |
| `auto-fit-popup-width` | Menu 是否与字段等宽 | `boolean` | `false` |
| `presentation` | 字段展示；未指定时继承 FormItem / Form | `inline / popup` | `popup` |
| `popup-props` | 弹层外观；展开状态、底部位置和挂载时机由扩展接管 | `PopupProps` | `{}` |

### 事件与方法

- `update:modelValue`、`change(value)`：提交时触发，编辑草稿不触发。
- `update:open`、`open-change(open)`：请求改变展开状态。
- `update:inputValue`、`input-value-change(text)`、`search(text)`：搜索状态。
- `focus(event)`、`blur(event)`、`clear(event)`：原生字段事件；只有字段所有者通知 Form。
- 方法：`focus()`、`blur()`。

### 插槽与选项数据

使用 `label({ data })` 自定义已选标签，`selected` 替换整个已选区域。还支持 `prefix`、`suffix`、`clear-icon({ clear })`、`arrow-icon`、`loading-icon`、`search-icon`、`empty`、`option({ data })`。

选项 `label` 是用于搜索的纯文本；自定义选项内容使用 `render` 或 `option` 插槽，自定义反显使用 `format-label` 或 `label` 插槽。以 value 而非 label 识别选项。选项的 `disabled` 禁止选择和删除，`tagProps` 可定制已选标签。

### CSS 变量

| Token | Default |
| --- | --- |
| `--mp-cascader-popup-max-height` | `200px` |
| `--mp-cascader-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-cascader-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-cascader-popup-color-border` | `var(--mp-color-fill-3)` |
| `--mp-cascader-popup-box-shadow` | `0 4px 10px rgb(0 0 0 / 10%)` |
| `--mp-cascader-size-item-height` | `36px` |
| `--mp-cascader-font-item-size` | `var(--mp-sys-font-size-md)` |
| `--mp-cascader-margin-item-icon-left` | `var(--mp-sys-space-5)` |
| `--mp-cascader-item-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-cascader-item-icon-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-cascader-padding-item-left` | `var(--mp-sys-space-5)` |
| `--mp-cascader-padding-item-right` | `var(--mp-sys-space-5)` |
| `--mp-cascader-size-item-icon` | `12px` |
| `--mp-cascader-item-text-color-hover` | `var(--mp-cascader-item-text-color)` |
| `--mp-cascader-item-text-color-active` | `var(--mp-cascader-item-text-color)` |
| `--mp-cascader-item-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-cascader-item-text-color-disabled-active` | `var(--mp-sys-color-content-disabled)` |
| `--mp-cascader-item-bg-active` | `var(--mp-color-fill-2)` |
| `--mp-cascader-item-bg-hover` | `var(--mp-cascader-item-bg-active)` |
| `--mp-cascader-item-bg-disabled` | `transparent` |
| `--mp-cascader-item-bg-disabled-active` | `var(--mp-color-fill-2)` |
| `--mp-cascader-checkbox-bg-hover` | `var(--mp-color-fill-3)` |
| `--mp-cascader-margin-checkbox-right` | `var(--mp-sys-space-4)` |
| `--mp-cascader-panel-column-min-width` | `120px` |
| `--mp-cascader-panel-column-max-height` | `200px` |
| `--mp-cascader-option-min-width` | `100px` |
| `--mp-cascader-slide-margin` | `120px` |


### CascaderPanel

也可以独立使用 `CascaderPanel`（`mp-cascader-panel`），或 `Cascader.CascaderPanel`。这是无输入框、无弹层的 Menu 面板；支持 options、modelValue/defaultValue、multiple、pathMode、checkStrictly、fieldNames、loadMore、disabled、expandTrigger 和 expandChild。事件为 update:modelValue、change；empty 插槽自定义空状态。

### 字段与移动展示的样式边界

字段外壳与菜单 Token 保持两端同源；popup / dialog 的容器和工具栏统一复用内部 FieldPresentation。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `popup`，点击值区域打开编辑面板。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

原 menu/list/picker 展示改为 inline/popup（PC 使用 popover）；不保留旧枚举别名。弹层复用原选项索引、搜索、异步加载与虚拟列表算法。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 子面板组合审查

Example source: src/cascader/example/demos/panel-review.vue

```vue
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CascaderOption } from '../../types'

const value = ref<string | number | (string | number)[] | (string | number)[][]>()
const multiple = ref(false)
const pathMode = ref(false)
const empty = ref(false)
const loads = ref(0)
const options = computed(() =>
  empty.value
    ? []
    : [
        {
          value: 'frontend',
          label: '前端',
          children: [
            { value: 'vue', label: 'Vue', isLeaf: true },
            { value: 'react', label: 'React', isLeaf: true },
          ],
        },
        { value: 'backend', label: '后端', children: [{ value: 'node', label: 'Node.js', isLeaf: true }] },
        { value: 'lazy', label: '异步节点', isLeaf: false },
      ],
)
watch([multiple, pathMode], () => {
  value.value = multiple.value ? [] : undefined
})
function loadMore(option: CascaderOption, done: (children: CascaderOption[]) => void) {
  loads.value++
  done([{ value: `${option.value}-child`, label: '异步子节点', isLeaf: true }])
}
</script>
<template>
  <mp-space direction="column">
    <mp-space>
      <mp-checkbox v-model="multiple">面板多选</mp-checkbox>
      <mp-checkbox v-model="pathMode">完整路径</mp-checkbox>
      <mp-checkbox v-model="empty">空数据</mp-checkbox>
      <mp-button @click="value = multiple ? [] : undefined">清空面板选择</mp-button>
    </mp-space>
    <mp-cascader-panel
      v-model="value"
      :options="options"
      :multiple="multiple"
      :path-mode="pathMode"
      :load-more="loadMore"
    >
      <template #empty><mp-tag>子面板空状态</mp-tag></template>
    </mp-cascader-panel>
    <p role="status">面板值：{{ JSON.stringify(value) }}；加载回调：{{ loads }}</p>
  </mp-space>
</template>
```

### `<CascaderPanel>` Props

| 参数名                    | 描述                                   | 类型                                                                                                                                                               |         默认值          |
| ------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------: |
| path-mode                 | 绑定值是否为路径                       | `boolean`                                                                                                                                                          |         `false`         |
| multiple                  | 是否为多选状态（多选模式默认开启搜索） | `boolean`                                                                                                                                                          |         `false`         |
| model-value **(v-model)** | 绑定值                                 | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` |           `-`           |
| default-value             | 默认值（非受控状态）                   | `string\| number\| Record<string, any>\| (    \| string    \| number    \| Record<string, any>    \| (string \| number \| Record<string, any>)[]  )[]\| undefined` | `'' \| undefined \| []` |
| options                   | 级联选择器的选项                       | `CascaderOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| expand-trigger            | 展开下一级的触发方式                   | `string`                                                                                                                                                           |        `'click'`        |
| check-strictly            | 是否开启严格选择模式                   | `boolean`                                                                                                                                                          |         `false`         |
| load-more                 | 数据懒加载函数，传入时开启懒加载功能   | `(  option: CascaderOption,  done: (children?: CascaderOption[]) => void) => void`                                                                                 |           `-`           |
| field-names               | 自定义 `CascaderOption` 中的字段；当选项值为对象时，也用其中的 `value` 作为键属性 | `CascaderFieldNames`                                                                                                                                               |           `-`           |
| expand-child              | 是否展开子菜单                         | `boolean`                                                                                                                                                          |         `false`         |

### `<CascaderPanel>` Events

| 事件名 | 描述             | 参数                                                                                   |
| ------ | ---------------- | -------------------------------------------------------------------------------------- |
| change | 选中值改变时触发 | value: `string \| number \| (string \| number \| (string \| number)[])[] \| undefined` |

### `<CascaderPanel>` Slots

| 插槽名 |         描述         | 参数 |
| ------ | :------------------: | ---- |
| empty  | 选项为空时的显示内容 | -    |


异步搜索时应在新请求开始时清除旧候选，并只采纳当前搜索词的最后一次响应。可使用 `update:input-value` 立即响应输入，通过 `loading` 和 `filter-option` 展示远程过滤结果。popup 内方向键与 Enter 只操作当前候选，保存由底部确认按钮完成。校验失败保留草稿；确认期间锁定编辑和关闭，表单重置会关闭 popup 并中止提交。请求归属应在关闭和重置时失效，完整示例见 Form 的“各类字段统一展示”。

### 单选对勾样式变量

| 变量 | 默认值 |
| --- | --- |
| `--mp-cascader-item-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-cascader-item-check-size` | `var(--mp-sys-font-size-md)` |

### 内置搜索字段配置

`searchFields` / `search-fields` 是只读 `('label' | 'value')[]`，默认 `['label']`；多字段为 OR 匹配，大小写默认不敏感。配置 `['value', 'label']` 可同时搜索编码和名称，fieldNames 将语义字段映射到业务字段；空数组对非空查询不匹配任何项。value 采用字符串比较，不做对象深层搜索，对象值或拼音等复杂规则仍用自定义回调。自定义回调优先并自行决定大小写；远程结果使用原有关闭本地过滤协议。Cascader 保留路径语义，会检查路径各节点的配置字段。


## 透传配置边界与优先级

建议使用 `CascaderTriggerOptions` 声明 trigger-props。open/defaultOpen、disabled 和展开更新归 Cascader 管理。popup-container 顶层明确传入时优先（包括 false），否则回退 triggerProps.popupContainer。Trigger 的普通配置保留原顺序，嵌套 unmountOnClose 仍可覆盖顶层 unmount-on-close；默认的定位/交互配置也仍可被有效嵌套字段覆盖。内部展开监听继续执行，通知使用 Cascader 事件。

本次仅新增可主动选用的专用类型，不收窄已发布的宽属性类型，不增加运行时过滤、不改变覆盖顺序；旧业务写法继续可编译。若直接使用旧宽属性，内部托管字段仍可能通过类型检查，但不代表能控制内部状态。

```ts
import type { CascaderTriggerOptions } from '@maple-design/ui'
```

Example source: src/cascader/example/demos/passthrough-options.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CascaderTriggerOptions } from '@maple-design/ui'

const open = ref(false)
const triggerOptions: CascaderTriggerOptions = { placement: 'top-start', popupOffset: 8, popupContainer: false }
const options = [{ value: 'fruit', label: '水果', children: [{ value: 'apple', label: 'Apple' }] }]
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-cascader
      v-model:open="open"
      presentation="inline"
      :options="options"
      :trigger-props="triggerOptions"
      aria-label="透传配置示例"
    />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
```


## 配置清空后的值

`empty-value` / `emptyValue` 指定清空动作产生的模型值，接受当前组件模型类型内的值或无参数工厂函数。省略保留原有默认结果；需要区分“省略”与“返回 undefined”时使用 `() => undefined`。数组会按每次清空浅复制；不可清除的禁用选中项仍保留。该属性不改变哪些值算空、不改变 Form reset 默认值，也不会将 0/false 普遍视为空。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。


候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。
