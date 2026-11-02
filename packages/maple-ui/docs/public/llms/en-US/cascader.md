<!-- Source: src/cascader/docs/en-US.md; locale: en-US; page: /en-US/cascader -->

# Cascader

In multiple mode, the inline dropdown contains options only; the field owns selected values, removal and clearing. The popup editor retains the selected-items summary and clear action, and commits its draft on confirmation.


## 案例

### Please select a region

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

### Non-path mode

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

### Multiple cascade

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

### Form control size comparison

Compare selected, clearable and nowrap multiple values with Input and Button. Long labels use ellipsis; removal icons stay available and the tag row scrolls horizontally without moving clear or arrow controls.

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

### Picker mode

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

### Picker multiple

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

### List mode

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

### List multiple

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

### Presentation and commit rules

Inline commits immediately. Popup and dialog edit a draft for both single and multiple values. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Search is inside the editor and keeps the existing filtering, search event and lazy loading API.

### Manage selected items

Multi-select panels include a selection summary and Clear. Cedar shows removable tags above list options. Maple opens selected-item details from the count row, with per-item removal and a way back to options. Popup/popover and dialog use the same behavior. Removal and Clear edit the draft; Cancel restores the value and Confirm publishes it. Disabled items remain selected, and confirmation locks selection actions. The panel Clear action is independent of the field clear icon.

### Appearance combinations

Use this example for hierarchical choices such as regions. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

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

### Interaction states

Use this example for hierarchical choices such as regions. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

### Async device labels

Example source: src/cascader/example/demos/en-US/async-devices.vue

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
        name: 'Factory',
        nodes: [
          { id: 'device-1', name: 'Device one' },
          { id: 'device-2', name: 'Device two' },
          { id: 'device-3', name: 'Unavailable device', disabled: true },
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
      placeholder="Presentation"
      :clearable="false"
      hint
      :options="[
        { label: 'inline', value: 'inline' },
        { label: 'popup', value: 'popup' },
      ]"
      :style="{ width: '200px' }"
    />
    <mp-button @click="load">Load device tree</mp-button>
    <mp-cascader
      v-model="value"
      :presentation="presentation"
      :options="options"
      :loading="loading"
      path-mode
      filterable
      clearable
      :field-names="{ label: 'name', value: 'id', children: 'nodes' }"
      placeholder="Choose a device path"
    />
    <p>Committed path: {{ value }}. Labels resolve automatically after the tree loads.</p>
  </mp-space>
</template>
```

### Intro

Cascading selection via dropdown menu or bottom popup picker.

Single selection uses the built-in check icon on the right. Multiple selection uses Checkbox controls: no checked descendants is unchecked, some is indeterminate, and all selectable leaf descendants is checked. Disabled leaves are excluded from select-all. With checkStrictly, parent and child selections are independent. Panel selections remain drafts until confirmation.

## API

### Cascader props

Use `v-model`, `v-model:open` and `v-model:input-value` for controlled state. Clear values are `''` for single selection and `[]` for multiple selection. Select uses `undefined` when an actual empty-string option exists.

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value / default-value` | Controlled value / uncontrolled initial value | `Value` | `单选 ''，多选 []` |
| `open / default-open` | Controlled / initial open state | `boolean` | `undefined / false` |
| `input-value / default-input-value` | Search text, independent of selected values | `string` | `undefined / ''` |
| `multiple` | Multiple selection; enables search by default | `boolean` | `false` |
| `size` | Supports all five sizes; inherits group/form settings | `ComponentSize` | `md` |
| `variant` | filled, outline, standard; inherits InputGroup | `FormControlVariant` | `filled` |
| `disabled / readonly / error` | Inherits form state unless explicitly overridden | `boolean` | `undefined` |
| `placeholder` | Placeholder | `string` | `—` |
| `hint / line` | Floating hint / standard variant underline | `boolean` | `true` |
| `text-color / focus-color / blur-color` | Field colors | `string` | `—` |
| `loading` | Loading state; blocks selection and confirmation | `boolean` | `false` |
| `show-tags` | Show tags; false displays separated text | `boolean` | `true` |
| `separator` | Separator when show-tags=false | `string` | `,` |
| `text-align` | left, center, right | `string` | `left` |
| `max-tag-count` | Maximum visible tags; 0 means unlimited | `number` | `0` |
| `tag-nowrap` | Keep tags on one line with ellipsis and preserved removal icons; overflow scrolls horizontally; hover, focus or tap truncated text to preview it | `boolean` | `false` |
| `popup-container` | Selector, element, element resolver, or false for inline rendering | `PopupContainer` | `—` |
| `trigger-props` | Menu Trigger props; field owns open state | `TriggerProps` | `—` |
| `virtual-list-props` | Virtual list settings for Menu / List | `VirtualListProps` | `—` |
| `search-delay` | Search debounce delay in ms | `number` | `500` |
| `format-label` | Format selected labels; use label slot for VNodes | `function` | `—` |
| `clearable` | Allow clearing; preserve disabled selections | `boolean` | `false` |
| `options` | Tree options; leaf values must be unique in scalar mode; paths distinguish branches | `CascaderOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | Map value, label, disabled, children, isLeaf, tagProps, render | `CascaderFieldNames` | `—` |
| `path-mode` | Return a complete path instead of a node value | `boolean` | `false` |
| `check-strictly` | Allow parent selection; unlink parent/child checks | `boolean` | `false` |
| `filterable` | Enable search | `boolean` | `单选 false / 多选 true` |
| `filter-option` | Receives query and raw node | `(input, option) => boolean` | `—` |
| `expand-trigger` | Menu / List expansion: click or hover | `string` | `click` |
| `expand-child` | Expand to first child | `boolean` | `false` |
| `load-more` | Load children asynchronously; call done(children), or done() to allow retry | `(option, done) => void` | `—` |
| `fallback` | Display unresolved values | `boolean 或 (value) => string` | `true` |
| `search-option-only-label` | Show node label only in search results | `boolean` | `false` |
| `auto-fit-popup-width` | Match Menu width to field | `boolean` | `false` |
| `presentation` | 字段展示；未指定时继承 FormItem / Form | `inline / popup` | `popup` |
| `popup-props` | Popup appearance; open state, bottom placement and mounting are owned by the extension | `PopupProps` | `{}` |

### Events and methods

- `update:modelValue`, `change(value)`: published on commit, never on draft edits.
- `update:open`, `open-change(open)`: requests to change the open state.
- `update:inputValue`, `input-value-change(text)`, `search(text)`: search state.
- `focus(event)`, `blur(event)`, `clear(event)`: native field events. The field alone notifies Form.
- Methods: `focus()`, `blur()`.

### Slots and option data

Use `label({ data })` for custom selected labels; `selected` replaces the whole selection area. Also supports `prefix`, `suffix`, `clear-icon({ clear })`, `arrow-icon`, `loading-icon`, `search-icon`, `empty`, and `option({ data })`.

Option `label` is searchable plain text. Use `render` or the `option` slot for custom option content, and `format-label` or `label` slot for selected content. Values identify selections; labels never do. `disabled` blocks selection/removal, and `tagProps` customizes selected tags.

### CSS tokens

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

Use CascaderPanel (mp-cascader-panel), also exposed as Cascader.CascaderPanel, for a standalone Menu panel without a field or popup. It supports options, modelValue/defaultValue, multiple, pathMode, checkStrictly, fieldNames, loadMore, disabled, expandTrigger and expandChild; emits update:modelValue, and change; and provides an empty slot.

### Field and mobile presentation styles

The copied field shell keeps the same token declarations as Cedar. Mobile presentation-only variables are declared separately in `src/_components/selection-field/presentation/style/token.less` and loaded with the local presentation stylesheet. Their names and defaults remain unchanged: `--mp-selection-presentation-max-height` (`65vh`), `--mp-selection-presentation-bg` (`var(--mp-sys-color-surface-overlay)`) and `--mp-selection-presentation-padding` (`var(--mp-sys-space-5)`). They do not add mobile presentation behavior to Cedar.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `popup`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

The former menu/list/picker presentation values are replaced by inline/popup. Overlay editors retain the existing option index, search, lazy loading and virtual scrolling.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Selection check tokens

| Token | Default |
| --- | --- |
| `--mp-cascader-item-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-cascader-item-check-size` | `var(--mp-sys-font-size-md)` |


## Typed passthrough configuration

Use `CascaderTriggerOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

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


## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.


The candidate `options` prop accepts an array or `(query, { signal }) => array/Promise`. Components own loading, cancellation and stale results, and emit load-error on failure. Choice groups initialize with an empty query; searchable fields load when queries change. Root tree loaders remain independent of existing load-more child loading.
