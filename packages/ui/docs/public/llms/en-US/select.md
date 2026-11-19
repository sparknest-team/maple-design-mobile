<!-- Source: src/select/docs/en-US.md; locale: en-US; page: /en-US/select -->

# Select

In multiple mode, the inline dropdown contains options only; the field owns selected values, removal and clearing. The popup editor retains the selected-items summary and clear action, and commits its draft on confirmation.

## Reading direction

Select inherits source `dir`. Standalone fields align to inline start; FormItem content-align still takes precedence when inherited. Explicit left/right alignment remains physical. Tags keep their array order and empty-search Backspace removes the last closable value. Dropdowns and picker panels retain source direction, including in a custom popup-container.

## Basic examples

### Basic usage

Open the options, select a value to close the menu, or clear it to choose again. This example demonstrates single selection only.

Example source: src/select/example/demos/standard.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref()
</script>
<template>
  <mp-form-item layout="vertical" hide-label>
    <mp-select v-model="value" variant="standard" placeholder="请选择一个选项" aria-label="基础单选示例">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-form-item>
</template>
```

## Appearance and states

### Appearance configuration comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------- | --------------------------------------------------- | ------------------------------ |
| `options` | Primitive, object or grouped options; one source for every presentation | Appearance configuration comparison, Form control size comparison |
| `clearable` | Allow clearing; preserve disabled selections | Appearance configuration comparison, Form control size comparison |
| `disabled` | Whether to disable | Form control size comparison |
| `edit-mode` | Field presentation; inherits FormItem/Form when omitted | Form control size comparison |
| `size` | Supports all five sizes; inherits group/form settings | Form control size comparison |
| `variant` | filled, outline, standard; inherits InputGroup | Form control size comparison |

<!-- demo-config-notes:end -->


Choose a dimension to compare all its values side by side while keeping other settings and content identical. Change the other settings to inspect combinations; input specimens share one model.

<details>
<summary>Configuration details and limits</summary>

#### Appearance combinations

Use this example for single selection from a known list. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

</details>

Example source: src/select/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref('design')
const options = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '运营', value: 'ops', disabled: true },
]
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
        <mp-select
          v-model="value"
          :options="options"
          clearable
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        ></mp-select>
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

### Form control size comparison

Compare Input, Button, Select, date/time fields and other single-line controls at the same size. Field variants share the height scale; Button uses outline here. DatePicker/TimePicker are panels; this example uses Date/Time fields. The example includes selected and clearable values, removable tags and long multiple selections. Select/Cascader keep the same size height with tag-nowrap. Long tag text uses ellipsis while removal icons remain available; tags scroll horizontally while clear and arrow controls stay outside the scrolling area. Hover, focus or tap truncated tag text to read its full content; dismiss with an outside click or Escape without changing the selected value. Restore values after clearing to repeat the comparison. Multiline text and wrapping multiple selections can grow with content.

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

## Selection modes and options

### Multiple selection

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | -------------------------------------------------- | -------------------------------- |
| `placeholder` | Placeholder | Multiple selection, Identical labels, distinct values, Labels and values |
| `variant` | filled, outline, standard; inherits InputGroup | Multiple selection, Identical labels, distinct values, Labels and values |
| `multiple` | Multiple selection; enables search by default | Multiple selection, Identical labels, distinct values, Option declarations and selection |
| `options` | Primitive, object or grouped options; one source for every presentation | Identical labels, distinct values, Group spacing, Option data |
| `show-tags` | Show tags; false displays separated text | Multiple selection, Identical labels, distinct values |
| `clearable` | Allow clearing; preserve disabled selections | Identical labels, distinct values, Option declarations and selection |

<!-- demo-config-notes:end -->


Example source: src/select/example/demos/multiple.vue

```vue
<script setup>
import { ref } from 'vue'

const outlineValue9 = ref([])
const outlineValue10 = ref([])
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue9" variant="outline" placeholder="多选" multiple>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <mp-option label="打游戏" />
      <mp-option label="写代码" />
    </mp-select>
    <mp-select v-model="outlineValue10" variant="outline" placeholder="标签风格的多选" show-tags multiple>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <mp-option label="打游戏" />
      <mp-option label="写代码" />
    </mp-select>
  </mp-space>
</template>
```

### Single-selection confirmation

Applies only to overlay editing. Single selection commits and closes on choice by default; true keeps a draft until confirmation. Multiple selection defaults to confirmation. Submission still runs form validation and before-commit; rejection keeps the editor open.

Example source: src/select/example/demos/en-US/confirmation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const immediate = ref('a')
const confirmed = ref('a')
const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
</script>
<template>
  <mp-space direction="column">
    <p>Choose and apply: {{ immediate }}</p>
    <mp-select v-model="immediate" :options="options" edit-mode="popup" />
    <p>Confirm before applying: {{ confirmed }}</p>
    <mp-select v-model="confirmed" :options="options" edit-mode="popup" need-confirm />
  </mp-space>
</template>
```

### Identical labels, distinct values

Labels may repeat, but values must be unique. Removing the second selected tag removes only its value, in all three presentations.

Example source: src/select/example/demos/same-label.vue

```vue
<script setup>
import { computed, reactive } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const values = reactive({ inline: [1, 2], dialog: [1, 2], popup: [1, 2] })
const options = computed(() => [
  { value: 1, label: english.value ? 'Device' : '设备' },
  { value: 2, label: english.value ? 'Device' : '设备' },
  { value: 3, label: english.value ? 'Spare device' : '备用设备' },
])
</script>

<template>
  <mp-space direction="column" :size="16">
    <section v-for="editMode in ['inline', 'popup', 'popup']" :key="editMode" style="width: 100%">
      <mp-select
        v-model="values[editMode]"
        :edit-mode="editMode"
        :options="options"
        :placeholder="editMode"
        variant="outline"
        multiple
        show-tags
        clearable
      />
      <p>{{ editMode }} · ID：{{ values[editMode].join(', ') || '—' }}</p>
    </section>
  </mp-space>
</template>
```

### Intro

Display and select the content through the drop-down menu.

### Labels and values

Example source: src/select/example/demos/value-mapping.vue

```vue
<script setup>
import { ref } from 'vue'

const outlineValue2 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue2" variant="outline" placeholder="文本关联值">
      <mp-option label="吃饭" :value="1" />
      <mp-option label="睡觉" :value="2" />
    </mp-select>
    <div class="relation">当前选择的是: {{ outlineValue2 }}</div>
  </mp-space>
</template>
```

### Group spacing

Example source: src/select/example/demos/group-spacing.vue

```vue
<script setup lang="ts">
const options = [
  {
    isGroup: true,
    label: '华北',
    options: [
      { value: 'beijing', label: '北京' },
      { value: 'tianjin', label: '天津' },
    ],
  },
  {
    isGroup: true,
    label: '华东',
    options: [
      { value: 'shanghai', label: '上海' },
      { value: 'hangzhou', label: '杭州' },
    ],
  },
]
</script>

<template>
  <mp-select :options="options" placeholder="分组候选" :style="{ width: '280px' }" />
</template>
```

### Manage selected items

Multi-select panels include a selection summary and Clear. Cedar shows removable tags above list options. Maple opens selected-item details from the count row, with per-item removal and a way back to options. Popup/popover and dialog use the same behavior. Removal and Clear edit the draft; Cancel restores the value and Confirm publishes it. Disabled items remain selected, and confirmation locks selection actions. The panel Clear action is independent of the field clear icon.

### Option declarations and selection

Compare options supplied as data with child-option declarations. Select or clear values and inspect the model, including disabled options and customized option content.

Example source: src/select/example/demos/options-review.vue

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const multiple = ref(true)
const filterable = ref(true)
const disabled = ref(false)
const value = ref<string | string[] | undefined>([])
watch(multiple, (next) => {
  value.value = next ? [] : undefined
})
</script>
<template>
  <mp-space direction="column">
    <mp-space>
      <mp-checkbox v-model="multiple">多选</mp-checkbox>
      <mp-checkbox v-model="filterable">允许搜索</mp-checkbox>
      <mp-checkbox v-model="disabled">禁用研发选项</mp-checkbox>
      <mp-button @click="value = multiple ? [] : undefined">清空选择</mp-button>
    </mp-space>
    <mp-select
      v-model="value"
      :multiple="multiple"
      :filterable="filterable"
      clearable
      placeholder="子组件选项审查"
      :style="{ width: '280px' }"
    >
      <mp-optgroup label="研发组">
        <template #label><mp-tag>研发组插槽</mp-tag></template>
        <mp-option value="dev" label="研发" :disabled="disabled" :tag-props="{ size: 'sm' }" :index="0">
          <template #default="{ selected }"
            ><mp-tag>{{ selected ? '已选研发' : '选择研发' }}</mp-tag></template
          >
          <template #icon><mp-tag>图标</mp-tag></template>
          <template #suffix><mp-tag>后缀</mp-tag></template>
        </mp-option>
      </mp-optgroup>
    </mp-select>
    <p role="status">当前值：{{ JSON.stringify(value) }}</p>
  </mp-space>
</template>
```

### Option data

Example source: src/select/example/demos/options.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const outlineValue14 = ref()
const outlineValue15 = ref([])
const options = computed(() => [
  {
    label: '吃饭',
    value: 1,
  },
  {
    label: '睡觉',
    value: 2,
  },
  {
    label: '打游戏',
    value: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue14" variant="outline" placeholder="选项式 API" :options="options" />
    <mp-select
      v-model="outlineValue15"
      variant="outline"
      placeholder="选项式 API（多选）"
      :options="options"
      multiple
    />
  </mp-space>
</template>
```

### Field mapping

Example source: src/select/example/demos/field-names.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const outlineValue16 = ref()
const options = computed(() => [
  {
    label: '吃饭',
    value: 1,
  },
  {
    label: '睡觉',
    value: 2,
  },
  {
    label: '打游戏',
    value: 3,
    disabled: true,
  },
])
const keyOptions = computed(() => [
  {
    name: '吃饭',
    id: 1,
  },
  {
    name: '睡觉',
    id: 2,
  },
  {
    name: '打游戏',
    id: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select
      v-model="outlineValue16"
      variant="outline"
      placeholder="自定义字段"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
  </mp-space>
</template>
```

## Search and filtering

### Search matching rules

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ---------------- | ------------------------------------------------ | ------------ |
| `options` | Primitive, object or grouped options; one source for every presentation | Search matching rules |
| `case-sensitive` | Case-sensitive built-in filtering; custom filters take priority | Search matching rules |
| `search-delay` | Search debounce delay in ms | Search matching rules |
| `filterable` | Enable search; optionally retainInputValue | Search matching rules |
| `placeholder` | Placeholder | Search matching rules |

<!-- demo-config-notes:end -->


Search the same option data with different case sensitivity, search fields and delays. Compare which labels match; data mapping and asynchronous request handling remain separate.

Example source: src/select/example/demos/search-matching.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const value = ref('')
const mode = ref('label')
const caseSensitive = ref(false)
const modes = [
  { value: 'label', label: '默认：只匹配 label' },
  { value: 'both', label: '配置：value 或 label' },
]
const options = [
  { value: 'USER_A', label: 'Apple' },
  { value: 'USER_B', label: 'Banana' },
]
const searchFields = computed<('label' | 'value')[]>(() => (mode.value === 'both' ? ['value', 'label'] : ['label']))
</script>
<template>
  <mp-space direction="column" align="stretch" fill>
    <mp-form-item layout="vertical" size="sm" label="匹配字段">
      <mp-radio-group v-model="mode" aria-label="匹配字段" :options="modes" variant="button" size="sm" />
    </mp-form-item>
    <mp-space><mp-switch v-model="caseSensitive" /><span>区分大小写</span></mp-space>
    <mp-select
      v-model="value"
      :options="options"
      :case-sensitive="caseSensitive"
      :search-fields="searchFields"
      :search-delay="0"
      filterable
      placeholder="输入 Apple、apple 或 USER_A"
    />
    <p>默认搜索 label，不区分大小写；配置两字段后，USER_A 和 Apple 都能找到同一个选项。</p>
  </mp-space>
</template>
```

## Content and dropdown customization

### Custom icons

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | -------------------------------------------------- | ---------------------------------------- |
| `placeholder` | Placeholder | Custom icons, Overlay presentations, Selection and popup slots |
| `options` | Primitive, object or grouped options; one source for every presentation | Overlay presentations, Selection and popup slots |
| `multiple` | Multiple selection; enables search by default | Overlay presentations, Selection and popup slots |
| `clearable` | Allow clearing; preserve disabled selections | Overlay presentations, Selection and popup slots |
| `variant` | filled, outline, standard; inherits InputGroup | Custom icons |
| `edit-mode` | Field presentation; inherits FormItem/Form when omitted | Overlay presentations |

<!-- demo-config-notes:end -->


Example source: src/select/example/demos/custom-icons.vue

```vue
<script setup>
import { ref } from 'vue'

const outlineValue7 = ref()
const outlineValue8 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue7" variant="outline" placeholder="自定义图标">
      <template #default>
        <mp-option label="吃饭">
          <m-icon-cake-variant class="selected-icon" />
          <span>吃饭</span>
        </mp-option>
        <mp-option label="睡觉">
          <m-icon-weather-night class="selected-icon" />
          <span>睡觉</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="outlineValue7 === '吃饭'" class="selected-icon" />
        <m-icon-weather-night v-else class="selected-icon" />
        <span>{{ outlineValue7 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
    <mp-select v-model="outlineValue8" variant="outline" placeholder="自定义图标尺寸">
      <template #default>
        <mp-option label="吃饭">
          <m-icon-cake-variant class="selected-icon" />
          <span>吃饭</span>
        </mp-option>
        <mp-option label="睡觉">
          <m-icon-weather-night class="selected-icon" />
          <span>睡觉</span>
        </mp-option>
      </template>
      <template #selected>
        <m-icon-cake-variant v-if="outlineValue8 === '吃饭'" class="selected-icon" size="8vmin" />
        <m-icon-weather-night v-else class="selected-icon" size="8vmin" />
        <span>{{ outlineValue8 }}</span>
      </template>
      <template #prefix>
        <m-icon-github class="prefix" size="8vmin" />
      </template>
      <template #suffix>
        <m-icon-github class="suffix" size="12vmin" />
      </template>
      <template #arrow-icon="{ focus }">
        <m-icon-chevron-down :transition="300" :class="{ 'arrow-icon-rotate': focus }" />
      </template>
    </mp-select>
  </mp-space>
</template>
<style scoped lang="less">
.space {
  height: 200px;
}

.selected-icon {
  margin-right: 6px;
}

.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}

.arrow-icon-rotate {
  transform: rotate(180deg);
}
</style>
```

### Overlay presentations

Use inline for the standard field, popup for a bottom list, dialog for a dialog, and read for value-only content. See the combined Form demonstration for inheritance and confirmation.

Example source: src/select/example/demos/dialog.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const pickerValue = ref()
const pickerValue2 = ref()
const pickerMultiple = ref([])
const options = computed(() => [
  {
    label: '吃饭',
    value: 1,
  },
  {
    label: '睡觉',
    value: 2,
  },
  {
    label: '打游戏',
    value: 3,
    disabled: true,
  },
])
const keyOptions = computed(() => [
  {
    name: '吃饭',
    id: 1,
  },
  {
    name: '睡觉',
    id: 2,
  },
  {
    name: '打游戏',
    id: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-select v-model="pickerValue" edit-mode="popup" placeholder="请选择一个选项" :options="options" />
    <mp-select
      v-model="pickerValue2"
      edit-mode="popup"
      placeholder="自定义字段"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
    <mp-select
      v-model="pickerMultiple"
      edit-mode="popup"
      multiple
      show-tags
      clearable
      placeholder="Picker 多选"
      :options="options"
    />
  </mp-space>
</template>

<style lang="less" scoped>
.space {
  height: 200px;
}

.selected-icon {
  margin-right: 6px;
}

.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}

.arrow-icon-rotate {
  transform: rotate(180deg);
}
</style>
```

Example source: src/select/example/demos/popup.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const listValue = ref()
const listMultiple = ref([])
const options = computed(() => [
  {
    label: '吃饭',
    value: 1,
  },
  {
    label: '睡觉',
    value: 2,
  },
  {
    label: '打游戏',
    value: 3,
    disabled: true,
  },
])
</script>

<template>
  <mp-space direction="column" :size="['3vmin', 0]">
    <mp-select v-model="listValue" edit-mode="popup" placeholder="请选择一个选项" :options="options" />
    <mp-select
      v-model="listMultiple"
      edit-mode="popup"
      multiple
      show-tags
      clearable
      placeholder="List 多选"
      :options="options"
    />
  </mp-space>

  <div class="space"></div>
</template>

<style lang="less" scoped>
.space {
  height: 200px;
}

.selected-icon {
  margin-right: 6px;
}

.prefix {
  margin-right: 6px;
}

.suffix {
  margin-left: 6px;
}

.arrow-icon-rotate {
  transform: rotate(180deg);
}
</style>
```

### Presentation and commit rules

Inline commits immediately by default. Popup single selection commits on choice by default; multiple selection or an explicit need-confirm uses a draft. Confirm publishes it; cancel, overlay dismissal, Escape and presentation changes discard uncommitted edits. External model replacements win over drafts. Cedar supports direct / click/dblclick; Maple supports direct / popup. No shared runtime or state.

### Selection and popup slots

Select and clear options to compare customized labels, option content and popup slots. The model remains the option value while the slots change its presentation.

Example source: src/select/example/demos/slots-review.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>(['dev'])
const selectedSlot = ref(false)
const triggerSlot = ref(false)
const clears = ref(0)
const options = [
  { value: 'dev', label: '研发' },
  { value: 'design', label: '设计' },
  { value: 'ops', label: '运营', disabled: true },
]
function onClear(clear: (event: MouseEvent) => void, event: MouseEvent) {
  clears.value++
  clear(event)
}
</script>
<template>
  <mp-space direction="column">
    <mp-space>
      <mp-checkbox v-model="selectedSlot">自定义已选区</mp-checkbox>
      <mp-checkbox v-model="triggerSlot">自定义触发器</mp-checkbox>
    </mp-space>
    <mp-select
      v-model="value"
      :options="options"
      multiple
      filterable
      clearable
      placeholder="复杂插槽审查"
      :style="{ width: '320px' }"
    >
      <template #prefix><mp-tag>前缀</mp-tag></template>
      <template #suffix><mp-tag>后缀</mp-tag></template>
      <template #header><mp-tag>菜单页头</mp-tag></template>
      <template #footer><mp-tag>菜单页脚</mp-tag></template>
      <template #option="{ data }"
        ><mp-tag>选项：{{ data.label }}</mp-tag></template
      >
      <template #label="{ data }"
        ><mp-tag>已选：{{ data.label }}</mp-tag></template
      >
      <template #clear-icon="{ clear }"
        ><mp-button size="xs" @mousedown.prevent @click.stop="onClear(clear, $event)">插槽清空</mp-button></template
      >
      <template #arrow-icon><mp-tag>展开</mp-tag></template>
      <template #search-icon><mp-tag>搜索</mp-tag></template>
      <template #loading-icon><mp-tag>加载</mp-tag></template>
      <template #empty><mp-tag>无匹配选项</mp-tag></template>
      <template #read="{ text }"
        ><mp-tag>阅读：{{ text }}</mp-tag></template
      >
      <template v-if="selectedSlot" #selected
        ><mp-tag>已选区域：{{ value.join(' / ') }}</mp-tag></template
      >
      <template v-if="triggerSlot" #trigger><mp-button>插槽打开选择器</mp-button></template>
    </mp-select>
    <p role="status">当前值：{{ JSON.stringify(value) }}；插槽清空：{{ clears }}</p>
  </mp-space>
</template>
```

## Value model and linked fields

### Candidate highlighting and form data flow

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `options` | Primitive, object or grouped options; one source for every presentation | Candidate highlighting and form data flow, Empty recognition and clear output, Interaction state comparison |
| `clearable` | Allow clearing; preserve disabled selections | Empty recognition and clear output, Clearing, Interaction state comparison |
| `placeholder` | Placeholder | Candidate highlighting and form data flow, Clearing |
| `edit-mode` | Field presentation; inherits FormItem/Form when omitted | Candidate highlighting and form data flow |
| `default-active-first-option` | On opening, activate the first enabled candidate if no valid selected option exists. Highlighting does not update modelValue or emit change; an existing valid selection takes priority | Candidate highlighting and form data flow |
| `empty-value` | Clear output override; return an array for multiple selection and preserve protected items | Empty recognition and clear output |

<!-- demo-config-notes:end -->


Both fields start with `undefined`. Opening or highlighting a candidate does not emit `update:modelValue` or `change`. Inline selection commits on click or Enter. Popup selection edits a draft; Confirm publishes it, while cancel discards it. Each example shows the committed value, update count and actual event log (newest first).

Example source: src/select/example/demos/en-US/selection-data-flow.vue

```vue
<script setup lang="ts">
import SelectionDataFlow from '../selection-data-flow.vue'
</script>

<template><SelectionDataFlow english /></template>
```

### Empty recognition and clear output

This example keeps an empty string as the valid All option and clears to null. Compare the selected All option with the cleared state in the model output. Deleting the search query does not remove the selected value. The additional fields show multiple selection clearing to [] and a factory explicitly producing undefined, each with its own model output.

Example source: src/select/example/demos/en-US/empty-value.vue

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ status: '' as string | null })
const multiple = ref(['active'])
const optional = ref<string | undefined>('active')
const options = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
]
</script>
<template>
  <mp-space direction="column">
    <p>All uses an empty string as a valid option value. Clearing produces null.</p>
    <mp-form :model="model" layout="vertical">
      <mp-form-item field="status" label="Status">
        <mp-select
          v-model="model.status"
          :options="options"
          edit-mode="direct"
          clearable
          :empty-values="[null, undefined]"
          :empty-value="null"
        />
      </mp-form-item>
    </mp-form>
    <mp-button @click="model.status = ''">Choose All</mp-button>
    <p>
      Current model: <output>{{ JSON.stringify(model.status) }}</output>
    </p>
    <mp-form layout="vertical">
      <mp-form-item label="Multiple: clear to []">
        <mp-select
          v-model="multiple"
          :options="options"
          edit-mode="direct"
          multiple
          clearable
          :empty-value="() => []"
        />
        <output>{{ JSON.stringify(multiple) }}</output>
      </mp-form-item>
      <mp-form-item label="Single: clear to undefined">
        <mp-select v-model="optional" :options="options" edit-mode="direct" clearable :empty-value="() => undefined" />
        <output>{{ String(optional) }}</output>
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### Clearing

Example source: src/select/example/demos/clearable.vue

```vue
<script setup>
import { ref } from 'vue'

const outlineValue5 = ref()
const outlineValue6 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue5" variant="outline" placeholder="可清除" clearable>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue6" variant="outline" placeholder="使用插槽自定义清除图标" clearable>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
      <template #clear-icon="{ clear }">
        <m-icon-github class="clear-icon" @click="clear" />
      </template>
    </mp-select>
  </mp-space>
</template>
```

### Interaction state comparison

Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for single selection from a known list. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

Example source: src/select/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('design')
const options = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '运营', value: 'ops', disabled: true },
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
    <mp-select v-model="value" :options="options" clearable v-bind="__demoState"></mp-select>
  </mp-space>
</template>
```

## Async data and search

### Loading

Toggle loading to compare the default indicator and bottom line. The selected value remains visible; selection and confirmation resume after loading.

Example source: src/select/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const busy = ref(true)
const value = ref('beijing')
const selected = ref(['beijing'])
const options = [
  { label: '北京 / Beijing', value: 'beijing' },
  { label: '上海 / Shanghai', value: 'shanghai' },
  { label: '广州 / Guangzhou', value: 'guangzhou' },
]
</script>
<template>
  <mp-space direction="column" :size="16" style="width: 100%">
    <mp-form layout="vertical">
      <mp-form-item label="加载状态 / Loading"><mp-switch v-model="busy" /></mp-form-item>
      <mp-form-item label="默认指示器 / Default"
        ><mp-select v-model="value" :loading="busy" :options="options" edit-mode="direct" loading-mode="default"
      /></mp-form-item>
      <mp-form-item label="底部加载线 / Line"
        ><mp-select v-model="value" :loading="busy" :options="options" edit-mode="direct" loading-mode="line"
      /></mp-form-item>
      <mp-form-item label="多选动作 / Multiple actions"
        ><mp-select
          v-model="selected"
          :loading="busy"
          :options="options"
          multiple
          clearable
          filterable
          edit-mode="direct"
      /></mp-form-item>
    </mp-form>
    <p>
      加载时保留选择，暂停选择、清空和移除；搜索仍可输入，关闭加载后恢复。Loading pauses selection, clearing and removal
      while search remains editable.
    </p>
  </mp-space>
</template>
```

### Async device labels

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| -------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `options` | Primitive, object or grouped options; one source for every presentation | Async device labels, Asynchronous source replacement, Public async data composable |
| `filterable` | Enable search; optionally retainInputValue | Async device labels, Asynchronous source replacement, Public async data composable |
| `loading` | Loading state; blocks selection and confirmation | Async device labels, Asynchronous source replacement |
| `edit-mode` | Field presentation; inherits FormItem/Form when omitted | Async device labels |
| `field-names` | Map value, label, disabled, tagProps, render; object values need a unique ID field | Async device labels |
| `virtual-list-props` | Virtual list settings for option panels | Async device labels |

<!-- demo-config-notes:end -->


Example source: src/select/example/demos/en-US/async-devices.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const editMode = ref<'direct' | 'popup'>('popup')
const value = ref([2])
const options = ref<{ id: number; name: string; disabled?: boolean }[]>([])
const loading = ref(false)
const notice = ref('')
async function load() {
  loading.value = true
  try {
    options.value = await Promise.resolve(
      Array.from({ length: 200 }, (_, index) => ({
        id: index + 1,
        name: `Device ${index + 1}`,
        disabled: index === 3,
      })),
    )
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-radio-group v-model="editMode" aria-label="Presentation">
      <mp-radio value="inline">inline</mp-radio>
      <mp-radio value="popup">popup</mp-radio>
    </mp-radio-group>
    <mp-button @click="load">Load devices</mp-button>
    <mp-select
      v-model="value"
      :edit-mode="editMode"
      :options="options"
      :loading="loading"
      :field-names="{ label: 'name', value: 'id' }"
      :virtual-list-props="{ height: 180 }"
      :limit="3"
      multiple
      filterable
      clearable
      placeholder="Choose up to three devices"
      @exceed-limit="notice = 'Choose at most three devices. Remove one before adding another.'"
      @change="notice = ''"
    />
    <p role="note">
      {{
        editMode === 'popup'
          ? 'Check devices, then Confirm to save. Cancel discards the draft.'
          : 'Menu selections save immediately. Device 4 is disabled.'
      }}
    </p>
    <p role="status" aria-live="polite">{{ notice || `Selected: ${value.length} / 3` }}</p>
    <p>Committed IDs: {{ value }}. IDs display before loading; labels resolve automatically afterwards.</p>
  </mp-space>
</template>
```

Use edit-mode to choose direct editing or a popup editor. Confirmation commits a draft; cancellation discards it.

### Asynchronous source replacement

Use the request controls to resolve requests in different orders. Compare applied and ignored results and observe loading, error and current selection feedback.

Example source: src/select/example/demos/async-source.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncData } from '@maple-design/use-vue'

const value = ref('mengshuai')
// A shared business function can be imported and reused in other fields.
const loadPeople = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return [
    { value: 'mengshuai', label: '孟帅' },
    { value: 'wujiaming', label: '吴甲明' },
  ]
}
const {
  data: options,
  loading,
  error,
  refresh,
} = useAsyncData(loadPeople, {
  initialData: [] as { value: string; label: string }[],
})
</script>
<template>
  <mp-space direction="column">
    <mp-select v-model="value" :options="options" :loading="loading" filterable />
    <p v-if="error" role="alert">加载失败，请重试。</p>
    <mp-button @click="refresh()">重新加载</mp-button>
  </mp-space>
</template>
```

### Public async data composable

Normal integration passes a loader directly to the options prop; the component owns asynchronous state. The public useAsyncData composable is optional for advanced cases that share one result across several components. Existing array-based options remain supported.

Example source: src/select/example/demos/en-US/async-data.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
// Replace this loader body with your API and response mapping.
async function request(query: string, { signal }: { signal: AbortSignal }) {
  await new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer)
      reject(new Error('Cancelled'))
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort)
      resolve()
    }, 300)
    if (signal.aborted) {
      abort()
      return
    }
    signal.addEventListener('abort', abort, { once: true })
  })
  return [
    { value: 'a', label: 'Alice' },
    { value: 'b', label: 'Bob' },
  ].filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
}
const error = ref('')
</script>
<template>
  <mp-space direction="column">
    <mp-select v-model="value" :options="request" filterable @load-error="error = 'Load failed'" />
    <p role="alert">{{ error }}</p>
    <p>Selected: {{ value }}</p>
  </mp-space>
</template>
```

## Configuration and lifecycle

### Typed passthrough configuration

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `edit-mode` | Field presentation; inherits FormItem/Form when omitted | Typed passthrough configuration, Interaction Scheduling Lifecycle, Thumb drag lifecycle |
| `options` | Primitive, object or grouped options; one source for every presentation | Typed passthrough configuration, Interaction Scheduling Lifecycle, Thumb drag lifecycle |
| `trigger-props` | Optional dropdown Trigger settings. Placement defaults to bottom-start and automatically adjusts when space is limited. The field owns open state; there is no top-level placement prop | Typed passthrough configuration |
| `scrollbar` | option panels scrollbar settings | Thumb drag lifecycle |
| `open-trigger-target` | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | Copying and editing |
| `filterable` | Enable search; optionally retainInputValue | Copying and editing |

<!-- demo-config-notes:end -->


Use `SelectTriggerOptions` from `@maple-design/ui-vue` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

Example source: src/select/example/demos/passthrough-options.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectTriggerOptions } from '@maple-design/ui-vue'

const open = ref(false)
const triggerOptions: SelectTriggerOptions = { placement: 'top-start', popupOffset: 8, popupContainer: false }
const options = [
  { value: 'USER_A', label: 'Apple' },
  { value: 'USER_B', label: 'Banana' },
]
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-select
      v-model:open="open"
      edit-mode="direct"
      :options="options"
      :trigger-props="triggerOptions"
      aria-label="透传配置示例"
    />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
```

### Interaction Scheduling Lifecycle

Example source: src/select/example/demos/en-US/scheduler-lifecycle.vue

```vue
<script setup>
import { ref } from 'vue'

const active = ref(true)
const open = ref(false)
const value = ref('Item 101')
const options = Array.from({ length: 200 }, (_, index) => 'Item ' + (index + 1))
</script>
<template>
  <div>
    <mp-button @click="open = !open">Open / close</mp-button>
    <mp-button @click="active = !active">Activate / deactivate</mp-button>
    <p>Open the menu, navigate with Arrow keys, then close or deactivate. Old scrolling must not replay.</p>
    <KeepAlive>
      <mp-select
        v-if="active"
        v-model="value"
        v-model:open="open"
        :options="options"
        edit-mode="popup"
        style="width: 240px"
      />
    </KeepAlive>
  </div>
</template>
```

Grouped option lists share Menu spacing: a 20px title line with 4px vertical padding (28px total), an extra 8px before subsequent groups, and no extra group gap before the first title. Labels align with option text; AutoComplete labels follow its option horizontal padding.

### Clear values

`SelectValue` includes `undefined`. By default, single-select clear emits `''`; if the current options contain a `value: ''` option, it emits `undefined` to distinguish clearing from selecting that option. This published behavior is preserved. Both `change` and `update:modelValue` use `SelectValue`.

`empty-value` defines clear output; omission preserves the existing fallback. Single selection can use `() => undefined` to explicitly return undefined; multiple selection should return an array matching its model shape. Protected disabled selections take priority and prevent the clear override from running. Controlled mode still requires parent acceptance.

Root and component entries export `SelectValue` and `SelectEmptyValue`.

### Thumb drag lifecycle

Each primary-button start owns a session: generation, track/thumb nodes, immutable axis/start and thumb.ownerDocument.defaultView. Register mousemove/mouseup/contextmenu/blur on that original window. Release the full set and dragging/mouseOffset on normal end, context cancellation, blur, effective geometry/direction change, deactivation or disposal. This repairs leaked contextmenu, missing suspension/disposal cleanup and global-window iframe binding. Old move cannot drive a new gesture; old end cannot release one. Activation allows only fresh starts.

Changing direction/max/thumbSize/ratio cancels the gesture; replacing data with equal primitive geometry does not. Parent measurement/setOffset still settles final position. Recheck ownership after geometry/reactive writes to reject reentrant disposal. Inactive/disposed retained start/track/setOffset are inert without preventDefault; nonprimary clicks do not drag/page. Active setOffset clamping, drag-time suppression and one-thumb track paging remain. 

Example source: src/select/example/demos/en-US/thumb-lifecycle.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const open = ref(false)
const value = ref('Item 101')
const options = Array.from({ length: 200 }, (_, index) => 'Item ' + (index + 1))
</script>
<template>
  <div>
    <mp-button @click="open = !open">Open / 关闭与打开</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <p>
      Drag the menu thumb, release/context-cancel/blur, then move again. Hover the footer target during drag to suspend.
      Fresh activation must not replay old input.
    </p>
    <KeepAlive v-if="mounted">
      <mp-select
        v-if="active"
        v-model="value"
        v-model:open="open"
        :options="options"
        :scrollbar="true"
        edit-mode="popup"
        style="width: 240px"
      >
        <template #footer>
          <mp-button @mouseenter="active = false">Hover to deactivate / 移入停用</mp-button>
        </template>
      </mp-select>
    </KeepAlive>
  </div>
</template>
```

### Scrollbar consumer lifecycle

Previously saved scroll commands do not affect deactivated or unmounted instances. Reactivation measures the current content. Changing direction or thumb geometry ends an active drag; use the current instance after remounting.

Zero is a valid coordinate, including scrollTo(0,0); measurement resets thumbs at zero. Horizontal measurement uses horizontal rather than vertical ratio. Zero/invalid viewport yields finite nonnegative metrics and no scrollbar on that zero-sized axis. Existing20px minimum thumb/15px track strategy remains. Hidden/disabled-axis thumb delivery is inert, but disabling the bar does not forbid content/public native scrolling. Options are forwarded without JS animation. Public signatures and CSS variables unchanged.

Example source: src/select/example/demos/en-US/scrollbar-lifecycle.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
const mounted = ref(true)
const open = ref(false)
const value = ref('Item 101')
const options = Array.from({ length: 200 }, (_, index) => 'Item ' + (index + 1))
</script>
<template>
  <div>
    <mp-button @click="open = !open">Open / 关闭与打开</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="mounted = !mounted">Mount / 卸载与挂载</mp-button>
    <p>
      Scroll the menu, deactivate or unmount, then reopen. Old scrollbar events must not move or notify the new active
      phase. Native smooth/Thumb dragging still needs separate browser validation.
    </p>
    <KeepAlive v-if="mounted">
      <mp-select
        v-if="active"
        v-model="value"
        v-model:open="open"
        :options="options"
        edit-mode="popup"
        style="width: 240px"
      />
    </KeepAlive>
  </div>
</template>
```

Active-option scrolling follows the latest keyboard navigation. Closing the menu or moving to another option cancels outdated scroll requests; reopening uses the current options.

### Copying and editing

Use open-trigger-target to control pointer opening independently. In icon mode, clicking, focusing and typing do not automatically open the panel. input-editable / filterable still controls editing or search. The suffix button, explicit keyboard commands and controlled open can open it.

Example source: src/select/example/demos/open-trigger-target.vue

```vue
<template>
  <mp-space direction="column" align="stretch">
    <mp-radio-group
      v-model="target"
      :options="[
        { label: '整个字段', value: 'field' },
        { label: '仅右侧图标', value: 'icon' },
      ]"
    />
    <label><mp-switch v-model="editable" /> 允许编辑 / 搜索</label>
    <mp-form-item layout="vertical" hide-label>
      <mp-select
        v-model="value"
        edit-mode="direct"
        :open-trigger-target="target"
        :filterable="editable"
        :options="[
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ]"
      />
    </mp-form-item>
    <p>关闭编辑后，可以复制已有文本；仅图标模式下编辑不会展开。</p>
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const target = ref<'field' | 'icon'>('icon')
const editable = ref(true)
const value = ref('a')
</script>
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Usage notes

### Editing mode
Presentation containers use internal `src/_components/field-presentation/token.less` with system surfaces/spacing/dimensions. Option lists retain existing Select tokens.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Search fields
`searchFields` / `search-fields` is a readonly `('label' | 'value')[]`, defaulting to `['label']`. Multiple fields use OR matching, case-insensitive by default. `['value', 'label']` searches codes and names; fieldNames maps semantic fields to business fields. An empty array matches no items for a nonempty query. Values are compared as strings; object traversal, object values and pinyin matching require a custom callback. A custom callback takes precedence and decides case handling itself. Remote results use the existing protocol for disabling local filtering. Cascader retains path semantics and checks the configured fields on each path node.

### Configuration

Single/multiple options both use popup-option-padding-horizontal. There is no implicit search-highlight DOM; custom option slots style their own highlighted fragments.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Clear values

`SelectValue` includes `undefined`. By default, single-select clear emits `''`; if the current options contain a `value: ''` option, it emits `undefined` to distinguish clearing from selecting that option. This published behavior is preserved. Both `change` and `update:modelValue` use `SelectValue`.

`empty-value` defines clear output; omission preserves the existing fallback. Single selection can use `() => undefined` to explicitly return undefined; multiple selection should return an array matching its model shape. Protected disabled selections take priority and prevent the clear override from running. Controlled mode still requires parent acceptance.

Root and component entries export `SelectValue` and `SelectEmptyValue`.

### Select Props

Use `v-model`, `v-model:open` and `v-model:input-value` for controlled state. Clear values are `''` for single selection and `[]` for multiple selection. Select uses `undefined` when an actual empty-string option exists.

| Prop | Description | Type | Default |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------- |
| need-confirm | Applies only to overlay editing. Single selection commits and closes on choice by default; true keeps a draft until confirmation. Multiple selection defaults to confirmation. Submission still runs form validation and before-commit; rejection keeps the editor open. | `boolean` | Single `false`; multiple `true` |
| `model-value` | Controlled selected value; supports v-model | `Value \| null` | `undefined` |
| `default-value` | Initial uncontrolled selection; read once | `Value` | Single: `''`; multiple: `[]` |
| `open` | Controlled open state; supports v-model:open | `boolean` | `undefined` |
| `default-open` | Initial uncontrolled open state; read only at initialization | `boolean` | `false` |
| `open-trigger-target` | Pointer opening area: field includes the whole field; icon uses only the suffix trigger. Clear/remove actions are excluded; explicit keyboard opening and controlled open remain available. | `'field' \| 'icon'` | `'field'` |
| `input-value` | Controlled search text, independent of selection; supports v-model:input-value | `string` | `undefined` |
| `default-input-value` | Initial uncontrolled search text, independent of selection; read only at initialization | `string` | `''` |
| `multiple` | Multiple selection; enables search by default | `boolean` | `false` |
| `size` | Supports all five sizes; inherits group/form settings | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md` |
| `variant` | filled, outline, standard; inherits InputGroup | `FieldDecoratorVariant`<br>`'filled' \| 'outline' \| 'standard'` | `filled` |
| `disabled` | Disabled state; explicit values override inherited Form / Group state | `boolean` | `undefined` |
| `readonly` | Read-only state; explicit values override inherited Form / Group state | `boolean` | `undefined` |
| `error` | Error state; explicit values override inherited Form / Group state | `boolean` | `undefined` |
| `placeholder` | Placeholder | `string` | `—` |
| `hint` | Enable the floating hint | `boolean` | `true` |
| `line` | Show the underline in the standard variant | `boolean` | `true` |
| `text-color` | Custom per-instance text color; prefer tokens for static themes | `string` | `—` |
| `focus-color` | Custom per-instance focused color; prefer tokens for static themes | `string` | `—` |
| `blur-color` | Custom per-instance unfocused color; prefer tokens for static themes | `string` | `—` |
| `loading` | Loading pauses selection, clearing, tag removal and confirmation; retains values while search and closing remain available. | `boolean` | `false` |
| `loading-mode` | Loading layout: default indicator or bottom line | `default / line` | `default` |
| `show-tags` | Show tags; false displays separated text | `boolean` | `true` |
| `separator` | Separator when show-tags=false | `string` | `,` |
| `text-align` | Physical text alignment: left / center / right. When omitted, inherits FormItem content-align; standalone fields default to logical start | `'left' \| 'center' \| 'right'` | `-` |
| `max-tag-count` | Finite nonnegative integer; 0 leaves the displayed tag count unlimited. | `number` | `0` |
| `tag-nowrap` | Keep tags on one line with ellipsis and preserved removal icons; overflow scrolls horizontally; hover, focus or tap truncated text to preview it | `boolean` | `false` |
| `popup-container` | Selector, element, element resolver, or false for inline rendering | `PopupContainer` | `—` |
| `trigger-props` | Optional dropdown Trigger settings. Placement defaults to bottom-start and automatically adjusts when space is limited. The field owns open state; there is no top-level placement prop | `TriggerProps` | `—` |
| `virtual-list-props` | Virtual list settings for option panels | `VirtualListProps` | `—` |
| `search-delay` | Finite nonnegative search debounce delay in milliseconds. | `number` | `500` |
| `format-label` | Format selected labels; use label slot for VNodes | `function` | `—` |
| `clearable` | Allow clearing; preserve disabled selections | `boolean` | `true` |
| `empty-value` | Clear override; multiple mode accepts arrays or recognized empty values and falls back to an empty array for invalid scalars; disabled selections take precedence. | `SelectEmptyValue` | `undefined` |
| `options` | Primitive, object or grouped options; one source for every presentation | `SelectOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | Map value, label, disabled, tagProps, render; object values need a unique ID field | `SelectFieldNames` | `—` |
| `filterable` | Enable search; optionally retainInputValue | `boolean or { retainInputValue?: boolean }` | `Single: false; multiple: true` |
| case-sensitive | Case-sensitive built-in filtering; custom filters take priority | boolean | false |
| `filter-option` | false disables local filtering; callback receives query and raw option | `boolean or (input, option) => boolean` | Automatic: enabled for arrays, disabled for loader functions |
| `creatable` | Allow creating missing options | `boolean` | `false` |
| `fallback-option` | Display unresolved values or return a complete fallback option | `boolean or (value) => SelectOptionData` | `true` |
| `show-extra-options` | Display fallback/created options in the panel | `boolean` | `true` |
| `limit` | Finite nonnegative integer; 0 leaves the selection count unlimited. | `number` | `0` |
| `auto-fit-popup-width` | Match Menu width to the field | `boolean` | `true` |
| `default-active-first-option` | On opening, activate the first enabled candidate if no valid selected option exists. Highlighting does not update modelValue or emit change; an existing valid selection takes priority | `boolean` | `true` |
| `unmount-on-close` | Unmount Menu content when closed | `boolean` | `false` |
| `scrollbar` | option panels scrollbar settings | `boolean or ScrollbarProps` | `true` |
| `show-header-on-empty` | Show the header in the empty state | `boolean` | `false` |
| `show-footer-on-empty` | Show the footer in the empty state | `boolean` | `false` |
| `edit-mode` | Field presentation; inherits FormItem/Form when omitted | `direct / popup` | `popup` |
| `before-commit` | Before confirmation, calls ({ value, previousValue }, done, { signal }); complete with a boolean, Promise or done; synchronous undefined waits for done. | `BeforeFieldCommit` | — |

### Select Events / Methods

- `update:modelValue`, `change(value)`: emitted on commit, not while editing a draft.
- `update:open`, `open-change(open)`: request an expanded-state change.
- `update:inputValue`, `input-value-change(text)`, `search(text)`: search state.
- `focus(event)`, `blur(event)`, `clear(event)`: native field events; only the field owner notifies Form.
- Methods: `focus()`, `blur()`.

Select also emits `remove(value)`, `exceed-limit(value, event)`, `dropdown-scroll(event)`, and `dropdown-reach-bottom(event)`.

### Slots and option data

Use `label({ data })` for custom `selected` labels; `selected` replaces the whole selection area. Also supports `prefix`, `suffix`, `clear-icon({ clear })`, `arrow-icon`, `loading-icon`, `search-icon`, `empty`, and `option({ data })`.

Option `label` is searchable plain text. Use `render` or the `option` slot for custom `option` content, and `format-label` or `label` slot for selected content. Values identify selections; labels never do. `disabled` blocks selection/removal, and `tagProps` customizes selected tags.

Select additionally supports `header`, `footer`, `trigger`, and default `Option / Optgroup` children. Option props: `value`, `label`, `disabled`, `tagProps`, `index`; its default slot receives `selected`. Group data uses `{ isGroup: true, label, options }`. List and Picker also accept slot options; Picker displays their text labels.

### Option Props

| Prop | Description | Type | Default |
| --------- | ------------------------------------- | ------------------------------------------------------ | --------- |
| value | Option Value | string \| number \| boolean \| Record<string, unknown> | undefined |
| label | Option group title | string | undefined |
| disabled | Whether to disable | boolean | false |
| tag-props | Props of the multi-select label corresponding to the option | TagProps | undefined |
| index | Explicit option order | number | undefined |

### Option Slots

| Slot | Description | Prop |
| ------- | -------------- | --------------------- |
| default | Custom option content | { selected: boolean } |
| icon | Option icon | - |
| suffix | Option suffix | - |

### Optgroup Props

| Prop | Description | Type | Default |
| ----- | -------- | ------ | --------- |
| label | Option group title | string | undefined |

### Optgroup Slots

| Slot | Description | Prop |
| ------- | ---------------------- | ---- |
| label | Option group title | - |
| default | Option children inside a group | - |

### Select Slots

| Slot | Description | Prop |
| ------------ | ------------------------ | --------------- |
| default | Option / Optgroup children | - |
| option | Custom option content | { data } |
| label | Option group title | { data } |
| selected | Replace the whole selected-value region | - |
| header | Menu header | - |
| footer | Menu footer | - |
| trigger | Custom field trigger | - |
| prefix | Field prefix | - |
| suffix | Field suffix | - |
| clear-icon | Custom clear action | { clear } |
| arrow-icon | Dropdown arrow | - |
| search-icon | Search icon | - |
| loading-icon | Loading icon | - |
| empty | Empty-state content | - |
| read | Read-mode content | { value, text } |

### Select Events

| Event | Description | Arguments |
| --------------------- | ------------ | ------------ |
| update:model-value | Request a model value update | value |
| change | Option | value |
| update:open | Request popup visibility | open |
| open-change | Popup visibility changes | open |
| update:input-value | Request search text update | text |
| input-value-change | Search text changes | text |
| search | Triggered when the user searches | text |
| focus | Field gains focus | event |
| blur | Field loses focus | event |
| keydown | Field or editor search key; `preventDefault()` suppresses internal keyboard handling | event: KeyboardEvent |
| clear | Triggered when the value of the input changes | event |
| remove | Triggered when the delete button of the label is clicked | value |
| exceed-limit | Selection would exceed the multiple-selection limit | value, event |
| dropdown-scroll | Menu scrolls | event |
| dropdown-reach-bottom | Menu reaches its bottom | event |

### Select Methods

| Method | Description | Arguments |
| ----- | ---------------- | ---- |
| focus | Focus the actual field | - |
| blur | Blur the actual field | - |

Async search should clear old candidates when requests start and accept only the latest current-query response. Combine remote results with `loading`, `:filter-option="false"` and `show-extra-options="false"` to avoid treating ID display fallbacks as search results. Popup arrows/Enter operate current candidates; confirmation mode saves with the bottom button, while immediate single selection commits on choice. Failed validation in confirmation mode preserves drafts. Pending confirmation locks editing/closing; reset closes Popup and aborts submission. Closing/reset invalidates request ownership. See Form’s unified field-presentation examples.

## Types

### Type imports
Root and component entries export `SelectEmits`、`SelectSlots`、`SelectExpose` alongside Props and Instance. Emits are event argument tuples derived from the runtime validators; Expose contains focus/blur.

## Loading options through a function prop

Pass options(query, { signal }) directly; useAsyncData is unnecessary. options still accepts arrays, and an explicit array, including [], takes precedence. The component manages loading, stale-result isolation and cancellation. load-error reports failures, and the instance refresh() method retries. A business loader may accept only query and ignore the second argument.

filterable enables entering a search query. filterOption controls only local matching and never sends requests. With an options loader, remote results are not filtered again by default; with only an array, local matching is enabled by default. Most callers do not need filter-option.

```vue
<mp-select v-model="value" :options="loadOptions" filterable />
```

`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes `null` unchanged; omission preserves the existing default. The UI displays null as blank without converting ordinary empty-string input to null. In confirmation mode, clearing changes the draft and confirm commits it; without confirmation, clearing commits directly.

Cancellable hooks use `(payload, done, context)`: closure payloads contain `{ action }`, change/commit payloads contain `{ value, previousValue }`, and Popup uses `{ reason }`. Context provides `signal` and an optional original `event`. Return a boolean/Promise, or call done()/done(false). Synchronous void waits for done; Promise&lt;void&gt; allows the operation. First completion wins. Pending state controls loading/disabled automatically. Cancellation invalidates stale results. Button refs are not exposed.

In direct mode, focus() targets the native input. In closed deferred mode it focuses the reference without opening; when open it targets the current editor. blur() blurs the current input or editor without reopening or simulating selection. Cached and remounted editors both resolve the current target.

Public SelectInstance/SelectExpose and PeopleSelectInstance/PeopleSelectExpose reflect the existing methods. PeopleSelectExpose is available from the root and component subentry. refresh() returns `Promise<void>` and reloads function-based options through the existing protocol; it does not represent completion of saving or business actions.

SelectEditMode is exported consistently from root and select subentries, retaining each platform public edit-mode values.

### Selection actions during loading

While manual loading or the current candidate request is active, selection fields preserve existing values and pause selection, clearing and tag removal. Blocked actions neither notify nor submit a model. Search text remains editable and disabled/readonly are not changed; set them separately to prevent searching.

Deferred editor clearing and confirmation are unavailable while loading; cancellation and closing remain available. Actions return to their normal state after both the manual flag and current request finish, still respecting disabled options. Loading on free-text fields such as Input and AutoComplete continues to allow text editing and clearing.

Pass business data through object `value` or `options`.

Multiple empty-value supports arrays, null/undefined and empty values recognized by empty-values; other scalars are rejected. Factories run only for a real clear with no disabled retained selections; invalid results produce a development diagnostic and fall back to [], without publishing an invalid scalar.

## CSS Variables

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-select-popup-bg` | `var(--mp-sys-color-surface-overlay)` | `background-color` |
| `--mp-select-popup-border-color` | `var(--mp-sys-color-border-subtle)` | `border`, `border-bottom`, `border-top` |
| `--mp-select-popup-border-radius` | `var(--mp-sys-radius-lg)` | `border-radius` |
| `--mp-select-popup-box-shadow` | `0 8px 24px rgba(0, 0, 0, 0.08)` | `box-shadow` |
| `--mp-select-popup-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-select-popup-group-title-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-select-popup-group-title-height` | `20px` | `line-height` |
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` | `padding` |
| `--mp-select-popup-group-title-padding-top` | `var(--mp-sys-space-4)` | `margin-top` |
| `--mp-select-popup-group-title-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-select-popup-loading-min-height` | `50px` | `min-height` |
| `--mp-select-popup-max-height` | `200px` | `max-height` |
| `--mp-select-popup-option-bg` | `transparent` | `background-color` |
| `--mp-select-popup-option-bg-disabled` | `transparent` | `background-color` |
| `--mp-select-popup-option-bg-hover` | `var(--mp-sys-color-state-hover)` | `background`, `background-color` |
| `--mp-select-popup-option-bg-selected` | `transparent` | `background`, `background-color` |
| `--mp-select-popup-option-bg-selected-hover` | `var(--mp-select-popup-option-bg-hover)` | `background`, `background-color` |
| `--mp-select-popup-option-border-radius` | `var(--mp-sys-radius-lg)` | `border-radius` |
| `--mp-select-popup-option-check-color` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-select-popup-option-check-gap` | `var(--mp-sys-space-4)` | `margin-inline-start` |
| `--mp-select-popup-option-check-size` | `var(--mp-sys-font-size-md)` | `height`, `width` |
| `--mp-select-popup-option-font-weight-selected` | `var(--mp-sys-font-weight-medium)` | `font-weight` |
| `--mp-select-popup-option-height` | `36px` | `line-height` |
| `--mp-select-popup-option-icon-margin-right` | `var(--mp-sys-space-4)` | `margin-inline-end` |
| `--mp-select-popup-option-padding-horizontal` | `var(--mp-sys-space-4)` | `padding`, `padding-inline` |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)` | `margin-inline-start` |
| `--mp-select-popup-option-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-select-popup-option-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-select-popup-option-text-color-hover` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-select-popup-option-text-color-selected` | `var(--mp-sys-color-action-primary)` | `color` |
| `--mp-select-popup-padding-horizontal` | `var(--mp-sys-space-3)` | `padding-inline` |
| `--mp-select-popup-padding-vertical` | `var(--mp-sys-space-2)` | `padding`, `padding-block` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-select-popup-border-color: var(--mp-sys-color-border-subtle);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
