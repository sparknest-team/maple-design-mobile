<!-- Source: src/select/docs/en-US.md; locale: en-US; page: /en-US/select -->

# Select

In multiple mode, the inline dropdown contains options only; the field owns selected values, removal and clearing. The popup editor retains the selected-items summary and clear action, and commits its draft on confirmation.


## Examples

### Basic usage

Open the options, select a value to close the menu, or clear it to choose again. This example demonstrates single selection only.

Example source: src/select/example/demos/standard.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref()
</script>
<template>
  <mp-select v-model="value" variant="standard" placeholder="请选择一个选项" aria-label="基础单选示例">
    <mp-option label="吃饭" />
    <mp-option label="睡觉" />
  </mp-select>
</template>
```

### Candidate highlighting and form data flow

Both fields start with `undefined`. Opening or highlighting a candidate does not emit `update:modelValue` or `change`. Inline selection commits on click or Enter. Popup selection edits a draft; Confirm publishes it, while cancel discards it. Each example shows the committed value, update count and actual event log (newest first).

Example source: src/select/example/demos/en-US/selection-data-flow.vue

```vue
<script setup lang="ts">
import SelectionDataFlow from '../selection-data-flow.vue'
</script>

<template><SelectionDataFlow english /></template>
```

### Disabled and readonly

Example source: src/select/example/demos/state.vue

```vue
<script setup>
import { ref } from 'vue'

const outlineValue3 = ref()
const outlineValue4 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue3" variant="outline" placeholder="只读" readonly>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
    <mp-select v-model="outlineValue4" variant="outline" placeholder="禁用" disabled>
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-space>
</template>
```

### Small size

Example source: src/select/example/demos/size.vue

```vue
<script setup>
import { ref } from 'vue'

const outlineValue13 = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue13" variant="outline" size="sm" placeholder="小尺寸">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-space>
</template>
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

### Outlined variant

Example source: src/select/example/demos/outline.vue

```vue
<script setup>
import { ref } from 'vue'

const outlineValue = ref()
</script>

<template>
  <mp-space direction="column" :size="16">
    <mp-select v-model="outlineValue" variant="outline" placeholder="请选择一个选项">
      <mp-option label="吃饭" />
      <mp-option label="睡觉" />
    </mp-select>
  </mp-space>
</template>
```

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

### Multiple selection

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

### Custom icons

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

### Identical labels, distinct values

Labels may repeat, but values must be unique. Removing the second selected tag removes only its value, in all three presentations.

Example source: src/select/example/demos/same-label.vue

```vue
<script setup>
import { computed, reactive, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const values = reactive({ inline: [1, 2], dialog: [1, 2], popup: [1, 2] })
const language = ref('zh-CN')
watchLang((value) => {
  language.value = value
})
const options = computed(() => [
  { value: 1, label: language.value === 'en-US' ? 'Device' : '设备' },
  { value: 2, label: language.value === 'en-US' ? 'Device' : '设备' },
  { value: 3, label: language.value === 'en-US' ? 'Spare device' : '备用设备' },
])
</script>

<template>
  <mp-space direction="column" :size="16">
    <section v-for="presentation in ['inline', 'popup', 'popup']" :key="presentation" style="width: 100%">
      <mp-select
        v-model="values[presentation]"
        :presentation="presentation"
        :options="options"
        :placeholder="presentation"
        variant="outline"
        multiple
        show-tags
        clearable
      />
      <p>{{ presentation }} · ID：{{ values[presentation].join(', ') || '—' }}</p>
    </section>
  </mp-space>
</template>
```

### Intro

Display and select the content through the drop-down menu.

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
    <mp-select v-model="pickerValue" presentation="popup" placeholder="请选择一个选项" :options="options" />
    <mp-select
      v-model="pickerValue2"
      presentation="popup"
      placeholder="自定义字段"
      :options="keyOptions"
      :field-names="{ label: 'name', value: 'id' }"
    />
    <mp-select
      v-model="pickerMultiple"
      presentation="popup"
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
    <mp-select v-model="listValue" presentation="popup" placeholder="请选择一个选项" :options="options" />
    <mp-select
      v-model="listMultiple"
      presentation="popup"
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

Inline commits immediately by default. Popup confirms a draft. Confirm publishes once; cancel, overlay dismissal, Escape and presentation changes discard edits. External model replacements win over drafts. Cedar supports inline/click/dblclick; Maple supports inline/popup. No shared runtime or state.

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

### Appearance combinations

Use this example for single selection from a known list. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/select/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('design')
const options = [
  { label: '研发', value: 'dev' },
  { label: '设计', value: 'design' },
  { label: '运营', value: 'ops', disabled: true },
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
    <mp-select v-model="value" :options="options" clearable v-bind="__demoAppearance"></mp-select>
  </mp-space>
</template>
```

### Interaction states

Use this example for single selection from a known list. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

### Async device labels

Example source: src/select/example/demos/en-US/async-devices.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const presentation = ref<'inline' | 'popup'>('popup')
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
    <mp-radio-group v-model="presentation" aria-label="Presentation">
      <mp-radio value="inline">inline</mp-radio>
      <mp-radio value="popup">popup</mp-radio>
    </mp-radio-group>
    <mp-button @click="load">Load devices</mp-button>
    <mp-select
      v-model="value"
      :presentation="presentation"
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
        presentation === 'popup'
          ? 'Check devices, then Confirm to save. Cancel discards the draft.'
          : 'Menu selections save immediately. Device 4 is disabled.'
      }}
    </p>
    <p role="status" aria-live="polite">{{ notice || `Selected: ${value.length} / 3` }}</p>
    <p>Committed IDs: {{ value }}. IDs display before loading; labels resolve automatically afterwards.</p>
  </mp-space>
</template>
```

The field, controller, option algorithms, Menu and styles are independently copied from Cedar. Maple uses the shared internal field presentation host for popup; neither library imports the other at runtime.

### Thumb drag lifecycle / 滑块拖动生命周期

Each primary-button start owns a session: generation, track/thumb nodes, immutable axis/start and thumb.ownerDocument.defaultView. Register mousemove/mouseup/contextmenu/blur on that original window. Release the full set and dragging/mouseOffset on normal end, context cancellation, blur, effective geometry/direction change, deactivation or disposal. This repairs leaked contextmenu, missing suspension/disposal cleanup and global-window iframe binding. Old move cannot drive a new gesture; old end cannot release one. Activation allows only fresh starts.

Changing direction/max/thumbSize/ratio cancels the gesture; replacing data with equal primitive geometry does not. Parent measurement/setOffset still settles final position. Recheck ownership after geometry/reactive writes to reject reentrant disposal. Inactive/disposed retained start/track/setOffset are inert without preventDefault; nonprimary clicks do not drag/page. Active setOffset clamping, drag-time suppression and one-thumb track paging remain. No Pointer/touch protocol migration or rollback of native scrolling.

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
        presentation="popup"
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

### Scrollbar consumer lifecycle / 滚动条消费者生命周期

Lifecycle availability gates retained native methods, thumb commands, scroll notifications and measurement. Suspension/disposal invalidate operation and binding epochs; activation remeasures current geometry and accepts only fresh binding deliveries. After geometry getters/reactive commits/thumb callbacks, operation/node/lifecycle checks reject reentrant disposal or newer measurement ownership. Logical cancellation cannot undo native scrolling already handed to the browser; native smooth interpolation/cancellation is not certified.

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
        presentation="popup"
        style="width: 240px"
      />
    </KeepAlive>
  </div>
</template>
```

Render-settled active-option scrolling is not CSS animation completion. Close/reopen, newer navigation, deactivation or disposal invalidate old work; consumed callbacks never replay, including empty options. Inactive/disposed retained selection/keyboard/scroll entries are inert; activation accepts fresh commands. Late dropdown registration remains supported. Virtual callbacks are rechecked before DOM scrolling. Scoped14 each/shared consumer regression Cedar93/Maple96 pass with controlled queues, not native browser/OS or full downstream proof. No API/CSS token change.

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
        presentation="popup"
        style="width: 240px"
      />
    </KeepAlive>
  </div>
</template>
```

Grouped option lists share Menu spacing: a 20px title line with 4px vertical padding (28px total), an extra 8px before subsequent groups, and no extra group gap before the first title. Labels align with option text; AutoComplete labels follow its option horizontal padding.

### Clear values and 1.x compatibility

`SelectValue` includes `undefined`. By default, single-select clear emits `''`; if the current options contain a `value: ''` option, it emits `undefined` to distinguish clearing from selecting that option. This published behavior is preserved. Both `change` and `update:modelValue` use `SelectValue`.

Set `empty-value` to a scalar value to choose a stable single-select clear result, or use `:empty-value="() => undefined"` for a stable undefined result. Omit it to keep the 1.x rules. In multiple mode it is ignored: clearing preserves disabled selections and returns an array. Controlled components still require the parent to accept the update.

Root and component entries export `SelectValue` and `SelectEmptyValue`.

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

## API

### Select props

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
| `virtual-list-props` | Virtual list settings for option panels | `VirtualListProps` | `—` |
| `search-delay` | Search debounce delay in ms | `number` | `500` |
| `format-label` | Format selected labels; use label slot for VNodes | `function` | `—` |
| `clearable` | Allow clearing; preserve disabled selections | `boolean` | `true` |
| `empty-value` | Single-select clear override; omit for 1.x behavior | `SelectEmptyValue` | `undefined` |
| `options` | Primitive, object or grouped options; one source for every presentation | `SelectOption[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | Map value, label, disabled, tagProps, render; object values need a unique ID field | `SelectFieldNames` | `—` |
| `filterable` | Enable search; optionally retainInputValue | `boolean 或 { retainInputValue?: boolean }` | `单选 false / 多选 true` |
| `filter-option` | false disables local filtering; callback receives query and raw option | `boolean 或 (input, option) => boolean` | automatic: arrays on; loader off |
| `creatable` | Allow creating missing options | `boolean` | `false` |
| `fallback-option` | Display unresolved values or return a complete fallback option | `boolean 或 (value) => SelectOptionData` | `true` |
| `show-extra-options` | Display fallback/created options in the panel | `boolean` | `true` |
| `limit` | Selection limit; 0 means unlimited | `number` | `0` |
| `auto-fit-popup-width` | Match Menu width to the field | `boolean` | `true` |
| `default-active-first-option` | On opening, activate the first enabled candidate if no valid selected option exists. Highlighting does not update modelValue or emit change; an existing valid selection takes priority | `boolean` | `true` |
| `unmount-on-close` | Unmount Menu content when closed | `boolean` | `false` |
| `scrollbar` | option panels scrollbar settings | `boolean 或 ScrollbarProps` | `true` |
| `show-header-on-empty / show-footer-on-empty` | Display header/footer in empty state | `boolean` | `false` |
| `presentation` | 字段展示；未指定时继承 FormItem/Form | `inline / popup` | `popup` |
| `before-commit` | 确认校验后可等待的保存拦截钩子 | `(value, context) => void / false / Promise` | — |

Selected options show a primary-color check on the right in both single and multiple mode. Candidate highlighting alone shows no check. In popup/edit panels the check represents the draft selection until confirmation; disabled selections keep their disabled appearance.

### Events and methods

- `update:modelValue`, `change(value)`: published on commit, never on draft edits.
- `update:open`, `open-change(open)`: requests to change the open state.
- `update:inputValue`, `input-value-change(text)`, `search(text)`: search state.
- `focus(event)`, `blur(event)`, `clear(event)`: native field events. The field alone notifies Form.
- Methods: `focus()`, `blur()`.

Select also emits `remove(value)`, `exceed-limit(value, event)`, `dropdown-scroll(event)`, and `dropdown-reach-bottom(event)`.

### Slots and option data

Use `label({ data })` for custom selected labels; `selected` replaces the whole selection area. Also supports `prefix`, `suffix`, `clear-icon({ clear })`, `arrow-icon`, `loading-icon`, `search-icon`, `empty`, and `option({ data })`.

Option `label` is searchable plain text. Use `render` or the `option` slot for custom option content, and `format-label` or `label` slot for selected content. Values identify selections; labels never do. `disabled` blocks selection/removal, and `tagProps` customizes selected tags.

Select additionally supports `header`, `footer`, `trigger`, and default `Option / Optgroup` children. Option props: `value`, `label`, `disabled`, `tagProps`, `index`; its default slot receives `selected`. Group data uses `{ isGroup: true, label, options }`. List and Picker also accept slot options; Picker displays their text labels.

### CSS tokens

| Token | Default |
| --- | --- |
| `--mp-select-popup-max-height` | `200px` |
| `--mp-select-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-select-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-select-popup-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-select-popup-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-select-popup-box-shadow` | `0 4px 10px rgb(0 0 0 / 10%)` |
| `--mp-select-popup-option-height` | `36px` |
| `--mp-select-popup-option-font-weight-selected` | `var(--mp-sys-font-weight-medium)` |
| `--mp-select-popup-option-padding-horizontal` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-option-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-bg-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-select-popup-option-bg-selected` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-bg-disabled` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-select-popup-option-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-hover` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-selected` | `var(--mp-sys-color-content-primary)` |
| `--mp-select-popup-option-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-select-popup-group-title-height` | `20px` |
| `--mp-select-popup-group-title-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` |
| `--mp-select-popup-group-title-padding-top` | `var(--mp-sys-space-4)` |
| `--mp-select-popup-group-title-font-size` | `var(--mp-sys-font-size-xs)` |
| `--mp-select-popup-group-title-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-select-popup-option-suffix-icon-margin-left` | `var(--mp-sys-space-5)` |
| `--mp-select-popup-loading-min-height` | `50px` |
| `--mp-select-popup-option-icon-margin-right` | `var(--mp-sys-space-4)` |

Single and multiple options share popup-option-padding-horizontal. There is no implicit search-highlight element; custom option slots own any highlighted substring styling. Unconsumed multi-popup-option-padding-horizontal and popup-option-highlight-* variables have been removed.

### Field and mobile presentation styles

Presentation containers use internal `src/_components/field-presentation/token.less`, with system surface, spacing and size tokens. Option lists retain the existing Select tokens.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Selection check tokens

| Token | Default |
| --- | --- |
| `--mp-select-popup-option-check-color` | `var(--mp-sys-color-action-primary)` |
| `--mp-select-popup-option-check-size` | `var(--mp-sys-font-size-md)` |
| `--mp-select-popup-option-check-gap` | `var(--mp-sys-space-4)` |

### Public types

Root and component entries export `SelectEmits`、`SelectSlots`、`SelectExpose` alongside Props and Instance. Emits are event argument tuples derived from the runtime validators; Expose contains focus/blur.


## Typed passthrough configuration

Use `SelectTriggerOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

Example source: src/select/example/demos/passthrough-options.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectTriggerOptions } from '@maple-design/ui'

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
The previously introduced unpublished valueOnClear prop is renamed to emptyValue, with no alias. Single and multiple modes can configure their own model-shaped results.

Example source: src/select/example/demos/en-US/empty-value.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const single = ref<string | undefined>('a')
const multiple = ref(['a'])
const number = ref(12)
const options = [
  { value: 'a', label: 'Alice' },
  { value: 'b', label: 'Bob' },
]
</script>
<template>
  <mp-space direction="column">
    <mp-select v-model="single" :options="options" clearable :empty-value="() => undefined" />
    <p>Single: {{ String(single) }}</p>
    <mp-select v-model="multiple" :options="options" multiple clearable :empty-value="() => []" />
    <p>Multiple: {{ JSON.stringify(multiple) }}</p>
    <mp-input-number v-model="number" clearable :empty-value="0" />
    <p>Number: {{ number }}</p>
  </mp-space>
</template>
```

## Function props for asynchronous options

Pass options(query, { signal }) directly. Arrays remain in options; explicit options (including []) take priority. The component owns loading, stale-result isolation and cancellation. No composable is required. A loader may ignore its second argument. load-error reports failures; the instance refresh() retries.

filterable enables entering a query. filterOption controls local candidate matching only; it never sends requests. When an options loader supplies results, local matching defaults off, so the server can return aliases or ranked results. With arrays, local matching defaults on. Set filterOption explicitly only to override this choice.

```vue
<mp-select v-model="value" :options="loadOptions" filterable />
```


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
