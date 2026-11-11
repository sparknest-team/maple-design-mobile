<!-- Source: src/date/docs/en-US.md; locale: en-US; page: /en-US/date -->

# Date

The year panel aligns the selected year, falling back to the current year, only inside its own scroll surface. It never scrolls the outer document. Alignment runs after mounting, accounts for dialog scale transitions, and is retired on deactivation or disposal.

While expanded, the native combobox uses `aria-controls` to identify its own named popup. Closing updates the state and removes the link. `aria-label` and `aria-describedby` reach the native input. Custom selected/trigger slots must preserve accessible names, keyboard operation and state associations.

Floating panel height follows the visual viewport. A full calendar is visible when space permits; short windows scroll content while keeping actions visible. Override `--mp-date-picker-popover-max-height` to cap the panel (default `100dvh - 32px`). Switching back to default/Maple removes brand overrides.

Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.

Installing Date also registers DatePicker, which is available through the static member `Date.Picker`.

## Basic examples

### Basic Usage

Example source: src/date/example/demos/en-US/basic-usage.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="date" placeholder="Select a date" clearable />
  </mp-space>
</template>
```

## Appearance and date presentation

### Appearance combinations

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| -------------- | ---------------------------------------------- | ---------------------------- |
| `value-format` | Model format, Date or timestamp | Appearance combinations, Instance locale isolation |
| `placeholder` | Placeholder | Form control size comparison, Type |
| `disabled` | Whether disabled | Form control size comparison |
| `readonly` | Whether readonly | Form control size comparison |
| `presentation` | Panel mode: `calendar` `picker` `calendarPicker` | Form control size comparison |
| `size` | Size: `xs` `sm` `md` `lg` `xl` | Form control size comparison |

<!-- demo-config-notes:end -->


Use this example for selecting a date. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/date/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef, ref } from 'vue'

const value = ref('2026-10-23')
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
        <mp-date
          v-model="value"
          value-format="YYYY-MM-DD"
          v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }"
        ></mp-date>
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

### Date value formats

Year/month/day model formats default to `YYYY`, `YYYY-MM` and `YYYY-MM-DD`. Date-time values include seconds by default; use `time-fields="['hour', 'minute']"` for minute precision. `format` controls display and `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/day panels and mobile calendars and wheels; week/quarter panels are only available in Cedar.

### Intro

Form date field that opens `DatePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

### Type

Example source: src/date/example/demos/en-US/type.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const year = ref()
const month = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="year" type="year" placeholder="Select a year" clearable />
    <mp-date v-model="month" type="month" placeholder="Select a month" clearable />
  </mp-space>
</template>
```

### Month labels

Fields configure panel options through `datePickerProps` / `dateRangePickerProps`.

`abbreviation` (boolean, default `true`) controls abbreviated month labels in the calendar month grid. Set it to `false` for full month names from the active Locale. It does not affect weekday labels, headers, wheel columns, or value formats. Range calendars use the top-level option; nested calendar options cannot override it.

Example source: src/date/example/demos/en-US/month-labels.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const abbreviation = ref(true)
</script>

<template>
  <mp-checkbox v-model="abbreviation">Abbreviated month labels</mp-checkbox>
  <mp-date-picker
    type="month"
    picker-value="2025-01"
    :abbreviation="abbreviation"
    :disable-confirm="false"
    presentation="calendar"
  />
  <mp-date-range-picker
    :date-picker-props="{ hint: 'Device reservation', touchable: false }"
    type="month"
    :abbreviation="abbreviation"
    presentation="calendar"
  />
</template>
```

### Locale and nested calendar options

Date labels, headers and actions use the global Locale and Provider settings. Changing language does not select or submit a value.

### Instance locale isolation

Date owners read the library's global Locale/Provider and keep `dayStartOfWeek` per instance. They do not switch the host Dayjs default locale or overwrite its base language data. Localized date metadata is registered under each library's own namespace; component instances and source code are not shared.

`valueFormat` is a stable English date protocol, including month-name tokens; `format` display and typed text use the UI language. Language changes do not rewrite or invalidate English month-name models. Numeric default protocols, Date objects and timestamps remain unchanged. The core Chinese locales and Maple built-in languages are loaded; other formats use already registered Dayjs language data, with a safe English fallback.

Example source: src/date/example/demos/en-US/locale-isolation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const monthModel = ref('2025 January 15')
const numericModel = ref('2025-01-15')
</script>

<template>
  <p>
    Switch the language in the header. Display and typed text follow the UI language; the model protocol stays stable.
  </p>
  <mp-date v-model="monthModel" value-format="YYYY MMMM DD" format="YYYY MMMM DD" panel-type="calendar" />
  <p>Month-name model (stable English protocol): {{ monthModel }}</p>
  <mp-date v-model="numericModel" format="YYYY MMMM DD" panel-type="calendar" />
  <p>Numeric model: {{ numericModel }}</p>
</template>
```

### Typed format boundaries

Date input is parsed strictly according to `format`, serialized according to `value-format`, and checked against disabled rules and bounds. Manual entry is enabled by default. Clicking edits the input; the calendar button or ArrowDown opens the panel; Enter / blur commits. Set `input-editable=false` for panel-only selection. Multiple mode and function format do not support reverse parsing and keep the input readonly; disable `input-editable` with function format. Maple does not provide week/quarter presentation modes.

## Time and selection rules

### Nested time and wheel views

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ---------------- | ------------------------------------------------------ | ------------------------------------ |
| `value-format` | Model format, Date or timestamp | Time zones, DST and calendar views, Date Time |
| `show-time` | Enable time selection | Time zones, DST and calendar views, Date Time |
| `clearable` | Whether the value can be cleared | Multiple, Date Time |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Time zones, DST and calendar views |
| `presentation` | Panel mode: `calendar` `picker` `calendarPicker` | Time zones, DST and calendar views |
| `min` | Minimum date | Time zones, DST and calendar views |

<!-- demo-config-notes:end -->


`pickerProps` uses `DateWheelOptions`: `optionHeight`, `optionCount`, `class`, `style`. It applies to date and time wheels in single/range panels. Generated columns, model, toolbar, field mapping and popup state cannot be overridden. explicitly displays a clock when the time tab is opened.

Example source: src/date/example/demos/en-US/time-presentation.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('2026-10-22 13:30')
</script>
<template>
  <mp-date-picker
    v-model="value"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
  />
  <mp-date-picker presentation="picker" :picker-props="{ optionHeight: 36, optionCount: 4 }" />
</template>
```

### Real platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`: desktop fields do not render mobile wheels or a mobile inner-calendar plugin. Maple retains these extensions using DateWheelOptions and DateRangeCalendarOptions. Both libraries use `Date.datePickerProps` / `DateRange.dateRangePickerProps` to configure their full panel; Cedar uses `timePickerProps` for its time view, while Maple uses `pickerProps` for wheels. Initial date/time values belong to top-level `defaultValue`.

### Time zones, DST and calendar views

Example source: src/date/example/demos/en-US/time-zone-views.vue

```vue
<script setup>
import Demo from '../time-zone-views.vue'
</script>
<template><Demo english /></template>
```

### Multiple

Example source: src/date/example/demos/en-US/multiple.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const multiple = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="multiple" multiple placeholder="Select multiple dates" clearable />
  </mp-space>
</template>
```

### Date Time

Example source: src/date/example/demos/en-US/date-time.vue

```vue
<script setup>
import { ref } from 'vue'

const minute = ref()
const second = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <span>Time columns: hour / minute</span>
    <mp-date
      v-model="minute"
      show-time
      :time-fields="['hour', 'minute']"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      clearable
    />
    <span>Committed value：{{ minute || 'Not selected' }}</span>
    <span>Second precision: the default on both platforms</span>
    <mp-date v-model="second" show-time :time-fields="['hour', 'minute', 'second']" clearable />
    <span>Committed value：{{ second || 'Not selected' }}</span>
  </mp-space>
</template>
```

## Value model and text input

### Model and display formats

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `format` | Display format or formatter | Model and display formats, String models: date, month and month/day ranges, Text entry and panel selection |
| `value-format` | Model format, Date or timestamp | Model and display formats, String models: date, month and month/day ranges |
| `type` | Selection type: `year`/`month`/`date` | String models: date, month and month/day ranges |
| `min` | Minimum date | Text entry and panel selection |
| `max` | Maximum date | Text entry and panel selection |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Text entry and panel selection |

<!-- demo-config-notes:end -->


Example source: src/date/example/demos/en-US/value-formats.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const timestamp = ref(new Date(2026, 8, 15).getTime())
const objectValue = ref(new Date(2026, 8, 16))
</script>
<template>
  <div class="date-contract-demo">
    <mp-date v-model="timestamp" value-format="timestamp" format="DD/MM/YYYY" />
    <p>Timestamp model：{{ timestamp }}</p>
    <mp-date v-model="objectValue" value-format="Date" format="YYYY年MM月DD日" />
    <p>Date object model：{{ objectValue }}</p>
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

### String models: date, month and month/day ranges

`format` controls display; `value-format` controls the model and emitted value. The examples produce `"2026-09-10"`, `"2026-09"` and `["09-10", "10-10"]` directly. `MM-DD` has no year and parsing uses the current year; it cannot express cross-year ordering or a leap day in a specific year. For those cases retain `YYYY-MM-DD` and map the submitted payload in application code. The default calendar remains page mode and the default timezone remains browser-local.

Example source: src/date/example/demos/en-US/string-values.vue

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

### Text entry and panel selection

Example source: src/date/example/demos/en-US/text-entry.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('2025-01-15')
const range = ref(['2025-01-15', '2025-01-20'])
const panelOnly = ref(false)
</script>

<template>
  <p>Type DD/MM/YYYY and commit with Enter or blur. Invalid or out-of-bounds text returns to the model.</p>
  <mp-date v-model="value" format="DD/MM/YYYY" min="2025-01-10" max="2025-01-25" :input-editable="!panelOnly" />
  <p>Model: {{ value }}</p>
  <mp-switch v-model="panelOnly" />
  <p>Panel-only selection: {{ panelOnly }}</p>
  <mp-date-range v-model="range" format="DD/MM/YYYY" :disabled="[true, false]" :input-editable="!panelOnly" />
  <p>Start is locked; end cannot precede it: {{ range }}</p>
</template>
```

The mobile calendar button has these local extension variables:

| Variable | Default |
| ---------------------------------------- | ----------------------------------- |
| `--mp-date-input-trigger-padding` | `0` |
| `--mp-date-input-trigger-outline-width` | `var(--mp-sys-space-1)` |
| `--mp-date-input-trigger-outline-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)` |

## Layout and arrangement

### Responsive calendar panels

Resize the preview container to compare calendar panel layouts at different widths. Panel layout changes preserve the selected date.

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
    <mp-form-item layout="vertical" size="sm" label="独立面板快捷位置">
      <mp-radio-group
        v-model="position"
        aria-label="独立面板快捷位置"
        :options="positions"
        variant="button"
        size="sm"
      />
    </mp-form-item>
    <mp-form-item layout="vertical" size="sm" label="独立面板时间形式">
      <mp-radio-group
        v-model="presentation"
        aria-label="独立面板时间形式"
        :options="presentations"
        variant="button"
        size="sm"
      />
    </mp-form-item>
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

## Content and presentation

### Calendar Mode

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------- | ----------------------------------------------------- | ----------------------- |
| `placeholder` | Placeholder | Calendar Mode, With FormItem |
| `clearable` | Whether the value can be cleared | Calendar Mode, With FormItem |
| `panel-type` | Panel mode: `picker` `calendar` `calendarPicker` | Calendar Mode |

<!-- demo-config-notes:end -->


Example source: src/date/example/demos/en-US/calendar-mode.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const date = ref()
const calendarDate = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date v-model="calendarDate" panel-type="calendar" placeholder="Select a date from the calendar" clearable />
  </mp-space>
</template>
```

### With FormItem

Example source: src/date/example/demos/en-US/with-form-item.vue

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
      <mp-form-item field="birthday" label="Birthday" required>
        <mp-date v-model="formData.birthday" placeholder="Select" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### Shortcuts and calendar viewport

Example source: src/date/example/demos/en-US/panel-tools.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('2025-01-15')
const viewport = ref('2025-01-01')
const acceptNavigation = ref(true)
const shortcuts = [
  { label: 'Month start', value: '2025-01-01' },
  { label: 'Next month', value: () => '2025-02-01' },
  { label: 'Disabled', value: '2025-03-01', disabled: true },
]
function navigate(value: unknown) {
  if (acceptNavigation.value && typeof value === 'string') {
    viewport.value = value
  }
}
</script>
<template>
  <div>
    <p>Selected: {{ selected }}; viewport: {{ viewport }}</p>
    <mp-checkbox v-model="acceptNavigation">Accept viewport navigation</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      :picker-value="viewport"
      :shortcuts="shortcuts"
      :disable-confirm="false"
      presentation="calendar"
      @update:picker-value="navigate"
    />
    <p>Range shortcuts use the same confirmation and validation.</p>
    <mp-date-range-picker
      :default-value="['2025-01-10', '2025-01-15']"
      :shortcuts="[{ label: 'First week', value: ['2025-01-01', '2025-01-07'] }]"
      :disable-confirm="false"
      presentation="calendar"
    />
  </div>
</template>
```

Both libraries export `DateShortcut` and `DateShortcutsPosition`. A shortcut has `label`, `value` (a value or a lazy callback), optional `format` (input format) and `disabled`. Output uses the panel's `value-format`. Hover/focus previews without committing; click uses the same validation and confirmation flow as date selection. `preview-shortcut=false` disables preview, not selection. `shortcuts-position` supports left/bottom/right; bottom is recommended on mobile.

`picker-value` controls the calendar viewport, not selection. `default-picker-value` is read only on initialization. A range viewport contains two dates. Navigation emits `update:picker-value` and `picker-value-change(value, dates, texts)`, never `change` or `select`. Ignoring a controlled update keeps the previous viewport. `select-shortcut(shortcut)` fires only for an accepted shortcut selection. Mobile wheel presentations do not expose calendar month navigation. Fields configure these options through `date-picker-props` and forward the same three events.

### Current highlighting and selection

Example source: src/date/example/demos/en-US/current-range.vue

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
    <p>Current highlighting and selecting now are independent.</p>
    <mp-checkbox v-model="showCurrent">Highlight current</mp-checkbox>
    <mp-checkbox v-model="showNowButton">Select now button</mp-checkbox>
    <mp-date-picker
      v-model="selected"
      value-format="Date"
      :default-picker-value="new Date()"
      :show-current="showCurrent"
      :show-now-button="showNowButton"
      :disable-confirm="false"
      presentation="calendar"
    />
    <p>Confirmed selection: {{ selected }}</p>
    <p>Switch summary tabs to edit either endpoint. Reversed ranges show an error and disable confirmation.</p>
    <mp-date-range-picker
      v-model="range"
      show-time
      :time-fields="['hour', 'minute']"
      format="YYYY-MM-DD HH:mm"
      value-format="YYYY-MM-DD HH:mm"
      :disable-confirm="false"
      presentation="calendarPicker"
    />
    <p>Confirmed range: {{ range }}</p>
  </div>
</template>
```

| Prop | Meaning | Default |
| ----------------- | ----------------------------------------------------------------------------------------- | ------- |
| `show-current` | Highlight the current day/month/year in calendar presentations; does not select or commit | true |
| `show-now-button` | Show Now; hidden for multiple selection, updates the active range endpoint | true |

Now uses the panel's type, time precision and value-format and follows disabled/readonly, min/max and date/time rules. It only updates the draft. Even with disable-confirm enabled, Now and subsequent edits require confirmation; cancelling discards the draft. Date and date-time panels and ranges behave consistently in standalone panels and field editors; ranges update only the active endpoint without swapping. Neither mounting nor changing highlighting writes to the model. 

The actions slot provides `{ confirm, disabled, selectNow, nowDisabled }`. Custom UI must call these protected functions; it must not write directly to the model.

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

## Standalone date panels

### Basic Usage

Example source: src/date/example/demos/en-US/picker-basic.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" />
</template>
```

### Calendar Mode

Standalone panels use a calendar by default and display date and time controls together. Set `presentation="picker"` explicitly to use column wheels.

Example source: src/date/example/demos/en-US/picker-calendar.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" presentation="calendar" />
</template>
```

### Month Picker

Use `type` prop to change the type of the picker. The default value of `type` is `date`.

Example source: src/date/example/demos/en-US/picker-month.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('2021-04-08')
</script>

<template>
  <mp-date-picker v-model="date" type="month" elevation />
</template>
```

### Multiple

Use `multiple` prop to select multiple dates, at this time, `date` is an array.

Example source: src/date/example/demos/en-US/picker-multiple.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref([])
</script>

<template>
  <mp-date-picker v-model="date" multiple />
</template>
```

### Range

Use `range` prop to select date range, at this time, `date` is `[startDate, endDate]`.

Example source: src/date/example/demos/en-US/picker-range.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref(['2021-04-08', '2021-04-20'])
</script>

<template>
  <mp-date-picker v-model="date" type="date" range />
</template>
```

### Date Limit

Use `min` and `max` prop to allow the maximum and minimum date, and use `disabled-date` prop to disable dates that cannot be selected.

Example source: src/date/example/demos/en-US/picker-limit.vue

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

### Date Time

Enable `show-time` for date and time. Fields select content through `panel-type`; standalone DatePicker uses `presentation`:

- `calendar`: Calendar content with the corresponding time-selection tools when time is enabled

- `calendarPicker`: the same buttons switch between the calendar and hour/minute(/second) columns
- `picker`: the buttons switch between Y/M/D and hour/minute(/second) columns, preserving the other part of the value

The active button is highlighted. Date-only and time-only panels do not show these buttons. Changing views does not commit a value. Top summaries only display the value and cannot be clicked or focused.

Example source: src/date/example/demos/en-US/picker-date-time.vue

```vue
<script setup>
import { ref } from 'vue'

const calendarPicker = ref('2025-01-15 10:29')
const picker = ref('2025-01-15 10:29')
</script>

<template>
  <mp-date-picker
    v-model="calendarPicker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="calendarPicker"
  />
  <mp-date-picker
    v-model="picker"
    show-time
    :time-fields="['hour', 'minute']"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-MM-DD HH:mm"
    presentation="picker"
  />
</template>
```

## Interaction and field configuration

### Interaction state comparison

<!-- demo-config-notes:start -->

#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `panel-type` | Panel mode: `picker` `calendar` `calendarPicker` | Rejected controlled close, Field viewport and shortcut events, Field and embedded panel |
| `disabled` | Whether disabled | Interaction state comparison, Shared field and commit protocol |
| `open` | Controlled popup visibility | Rejected controlled close, Typed passthrough configuration |
| `input-editable` | Allow text entry; function format/multiple stays readonly | Field viewport and shortcut events, Copying and editing |
| `date-picker-props` | Props passed to `mp-date-picker` | Field viewport and shortcut events, Field and embedded panel |
| `placeholder` | Placeholder | Shared field and commit protocol, Field and embedded panel |

<!-- demo-config-notes:end -->


Toggle disabled, read-only and error states, then interact with the same instance. Recovery controls remain outside the target; error appearance alone does not validate data.

<details>
<summary>Configuration details and limits</summary>

#### Interaction states

Use this example for selecting a date. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

</details>

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

### Rejected controlled close

The parent may reject `update:open(false)` and keep the panel open. An equal controlled-model echo does not reset the confirmed state, so repeated confirmation neither submits nor requests another close. A new date starts a new transaction. The demo shows the model, commit count, and close-request count.

Example source: src/date/example/demos/en-US/rejected-close.vue

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
  <mp-space direction="column" size="12px">
    <p>
      The parent rejects close requests. A new date starts a new confirmation; repeated confirmation does not submit
      twice.
    </p>
    <mp-date v-model="value" :open="open" panel-type="calendar" @update:open="requestOpen" @change="commits++" />
    <span data-test="date-transaction-state"
      >Value: {{ value }}; commits: {{ commits }}; rejected closes: {{ closeRequests }}</span
    >
    <mp-button @click="open = false">Allow close</mp-button>
  </mp-space>
</template>
```

### Field viewport and shortcut events

Configure `pickerValue`, `defaultPickerValue` and shortcuts through nested `datePickerProps` / `dateRangePickerProps`; listeners inside nested objects are filtered. Listen on the field and update the nested viewport. Controlled rejection keeps the previous month; navigation does not select or commit. A valid shortcut chooses a draft under the existing confirmation policy.

| Event | Description | Parameters |
| --------------------- | -------------------------------------- | --------------------------------- |
| `update:picker-value` | Request calendar viewport update | value: DateSelection |
| `picker-value-change` | Viewport request and formatted payload | value, date(s), formatted text(s) |
| `select-shortcut` | Accepted shortcut object | shortcut: DateShortcut |

Example source: src/date/example/demos/en-US/field-panel-tools.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateShortcut } from '@maple-design/ui-vue'

const selected = ref('2025-01-15')
const viewport = ref('2025-01-01')
const acceptNavigation = ref(true)
const notice = ref('')
const shortcutNotice = ref('')
const shortcuts: DateShortcut[] = [
  { label: 'Next month', value: '2025-02-15' },
  { label: 'Disabled', value: '2025-03-01', disabled: true },
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
  <mp-checkbox v-model="acceptNavigation">Accept viewport requests</mp-checkbox>
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
  <p>Selected model: {{ selected }}；Controlled viewport: {{ viewport }}</p>
  <p>Viewport event: {{ notice }}；Shortcut event: {{ shortcutNotice }}</p>
  <p>
    Navigation does not change selection. Rejected requests keep the previous viewport. Shortcuts select a draft;
    Confirm commits it.
  </p>
</template>
```

### Root-only presentation selection

`Date` / `DateRange` fields select their content through root `panel-type`; standalone date panels use root `presentation`. Both fields default to `calendar` content; standalone date panels default to `calendarPicker`. Field `DatePickerOptions` / `DateRangePickerOptions` do not accept root-owned `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarPicker; ranges support picker/calendar/calendarPicker. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.

### Editing and confirmation

`edit-mode` inherits from field > FormItem > Form and defaults to `popup`. Supported values are `direct / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple edit-mode="popup" opens the editor by clicking the value area; direct edits directly. readPretty is independent reading mode, separate from readonly/disabled.

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Direct editing keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `edit-mode` controls the field container. Standalone date pickers use `presentation` for panel content; time pickers follow their panel APIs.

Standalone, inline and popup editors share the same layout. The calendar has a preferred width of 265px with extra space for a half-hour quick time Picker when time is enabled; narrow screens fit the available width. The footer displays the date, time and a clock/calendar toggle. Explicit `presentation="picker"` preserves date wheels. The panel retains standalone confirmation and actions ownership.

`read-pretty` is an independent boolean alongside `readonly` and `disabled`. It inherits from field to FormItem to Form; explicit `false` overrides the parent. The default is `false`. Reading mode renders no editor.

### Shared mobile panel style

Single date, date-time and time panels omit the top summary in standalone panels and field editors. Date-time editors retain the current date/time and view switch at the bottom. Range summaries remain visible and highlight the active endpoint.

The calendar's central heading is a keyboard-accessible button with a dropdown indicator: activate it to choose months, then years. Use the footer calendar button to return to the date view without committing a value.


# Time zones and calendar views

`time-zone` accepts an IANA zone such as `America/New_York`. Dates and millisecond timestamps represent instants; strings represent civil time in that zone. Display, text entry, limits, shortcuts and disabled rules share this protocol. Event Dates remain actual instants. Omit the prop for existing host-local behavior. DST gaps are rejected, folds choose the earlier instant, and invalid zones block submission.

`interactive-mode` is `page` by default. `scroll` shows months between the limits with `use-virtual-scroll` enabled by default; without limits, the initial viewport has a one-year window on each side. `line` separates weekday headings from a row of dates, reuses round date selection, and labels the visible week with its date range. Previous/next buttons move by one week. Navigation never commits a field draft. Day-precision date-time uses these views together with the existing quick-time and detailed wheels. Range summaries, endpoint locks, reversed-range feedback and confirmation remain owned by the existing field transaction. Non-day precision retains its existing renderer.

Virtual months have equal height and six week rows. Customize `--mp-date-calendar-scroll-height`, `--mp-date-calendar-month-height`, `--mp-date-calendar-row-height` and `--mp-date-calendar-line-height` together. Existing calendar color tokens cover both brands and light/dark modes. Disabling virtualization renders the entire range.

### Shared field and commit protocol

Date / DateRange allow manual entry by default; input-editable can disable it. Time manual entry is controlled by inputEditable. Panels edit a draft and commit on confirmation; cancellation or external closing leaves the value unchanged. Clearing commits an empty value immediately and closes the panel. Date and time ranges display two inputs, retaining a next-day indicator for overnight time ranges.

Example source: src/date/example/demos/en-US/field-protocol.vue

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
    <p>
      Range fields: tap the right input to edit the end. Switching sides only changes the draft; Confirm commits it.
    </p>
    <span>Disable fields</span>
    <mp-switch v-model="disabled" aria-label="Disable fields" />
    <mp-date v-model="date" :disabled="disabled" clearable placeholder="Date" />
    <mp-date-range v-model="dateRange" :disabled="disabled" clearable placeholder="Date range" />
    <mp-time v-model="time" format="HH:mm" :disabled="disabled" clearable placeholder="Time" />
    <mp-time-range
      v-model="timeRange"
      format="HH:mm"
      :disabled="disabled"
      clearable
      show-next-day
      placeholder="Time range"
    />
    <p>Date：{{ date || 'Empty' }}；Date range：{{ dateRange }}</p>
    <p>Time：{{ time || 'Empty' }}；Time range：{{ timeRange }}</p>
  </mp-space>
</template>
```

### Intro

Date selection **panel**. DatePicker demos are included on this page; there is no separate date-picker documentation route. See the range documentation for [`DateRangePicker`](#/en-US/date-range). Form fields: [`Date`](#/en-US/date) / [`DateRange`](#/en-US/date-range).

The embedded panel example explicitly sets `disable-confirm=false`: selecting a date edits the draft; the committed value updates only after confirmation. Changing week start or removing bounds does not commit a value. Restoring bounds does not clear the existing model; an out-of-bounds draft cannot be confirmed until a valid date is selected.

Calendar arrows have localized accessible names: previous/next month in the day panel, year in the month panel, and years in the year list. They use global Locale, allow local LocaleProvider overrides, and fall back to the global translation for missing navigation keys. Boundaries still disable navigation; changing the preview does not commit a date.

### Field and embedded panel

Fields own input and popup state; panels embed directly. day-start-of-week accepts integer 0–6 (Sunday=0), with reactive range-calendar updates. Nested Options configure presentation only, not values, formats, bounds or disabled rules.

Example source: src/date/example/demos/en-US/entry-boundary.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateSelection } from '@maple-design/ui-vue'

const limited = ref(true)
const fieldValue = ref<DateSelection>('2025-02-12')
const panelValue = ref<DateSelection>('2025-02-12')
const week = ref<0 | 1 | 6>(1)
const presentation = ref<'picker' | 'calendar'>('calendar')
</script>

<template>
  <div class="entry-demo">
    <p>Limit selectable dates to February 2025; removing limits does not change the existing selection.</p>
    <mp-button @click="limited = !limited">{{ limited ? 'Remove limits' : 'Apply limits' }}</mp-button>
    <p>The root presentation selects the view. Nested date-picker-props only configures calendar appearance.</p>
    <mp-space>
      <mp-button @click="presentation = 'picker'">Wheel</mp-button>
      <mp-button @click="presentation = 'calendar'">Calendar</mp-button>
    </mp-space>
    <p>Changing the first weekday updates both headers and date columns, without changing the selection.</p>
    <mp-space wrap>
      <mp-button @click="week = 0">Sunday first</mp-button>
      <mp-button @click="week = 1">Monday first</mp-button>
      <mp-button @click="week = 6">Saturday first</mp-button>
    </mp-space>
    <div>
      <p>Field: input and popup ownership; use date-picker-props for presentation.</p>
      <mp-date
        v-model="fieldValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :panel-type="presentation"
        :date-picker-props="{ dayStartOfWeek: week }"
        placeholder="Select date"
      />
    </div>
    <div>
      <p>Panel: embedded directly, without open or popup-container.</p>
      <mp-date-picker
        v-model="panelValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        :presentation="presentation"
        :day-start-of-week="week"
        :disable-confirm="false"
      />
      <p>Committed: {{ panelValue }}</p>
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

### Typed passthrough configuration

Use `DatePopupOptions` from `@maple-design/ui-vue` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

Example source: src/date/example/demos/passthrough-options.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DatePopupOptions } from '@maple-design/ui-vue'

const open = ref(false)
const popupOptions: DatePopupOptions = { placement: 'top-start', popupTranslate: [0, -8], popupContainer: false }
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-date v-model:open="open" edit-mode="direct" :popup-props="popupOptions" aria-label="透传配置示例" />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
```

DST gaps, including half-hour transitions, disable only nonexistent times. New civil selections use the earlier fold occurrence. Existing Date/timestamp values preserve their occurrence and hidden milliseconds through zone changes, unchanged confirmation and edits to the opposite endpoint. Strings cannot encode which fold occurrence was intended.

### Copying and editing

Use open-trigger-target to control pointer opening independently. In icon mode, clicking, focusing and typing do not automatically open the panel. input-editable / filterable still controls editing or search. The suffix button, explicit keyboard commands and controlled open can open it.

Example source: src/date/example/demos/open-trigger-target.vue

```vue
<template>
  <mp-space direction="column">
    <mp-radio-group
      v-model="target"
      :options="[
        { label: '整个字段', value: 'field' },
        { label: '仅右侧图标', value: 'icon' },
      ]"
    />
    <label><mp-switch v-model="editable" /> 允许编辑 / 搜索</label>
    <mp-date v-model="value" edit-mode="direct" :open-trigger-target="target" :input-editable="editable" />
    <p>关闭编辑后，可以复制已有文本；仅图标模式下编辑不会展开。</p>
  </mp-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const target = ref<'field' | 'icon'>('icon')
const editable = ref(true)
const value = ref('2026-10-27')
</script>
```

### Shared field loading

`loading` displays the shared field indicator. `loading-mode` is `default` (indicator) or `line` (an indeterminate bottom line); it defaults to `default`. Rendering belongs to FieldDecorator. Loading does not implicitly disable editing or change readonly. Set those states separately.

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Calendar dates, months and years follow reading order; navigation icons mirror, while date values keep their meaning. In paged grids, Left/Right moves focus visually, Up/Down moves one row, and Home/End moves to the row boundary, skipping disabled items. Focus navigation does not select; Enter/Space keeps the existing selection behavior. Navigation is bounded by the displayed grid. Explicit `shortcuts-position="left|right"` remains physical; `bottom` stays below. Field popovers inherit their source direction.

## Triggers and positioning

### Popup placement

The Date field prefers bottom-start below its input. Override the preferred side through popupProps.placement only when needed; the underlying Trigger positions it, not Popup or Popover. DatePicker is a standalone date panel with no input anchor. Configure popup placement on the Date field.

Public focus/blur methods are callable from initial mount. Focus opens an editable deferred editor and targets it after readiness; disabled, readonly, or reading fields do not open. Blur only blurs the current target without reopening. Stored methods never bind an old editor; closure, mode changes, deactivation, or unmount cancel queued calls.

## Usage notes

### Panel configuration

DatePicker and DateRangePicker provide standalone date selection. Use `show-current` for current-date highlighting and `picker-value` or `default-picker-value` for the displayed date.

Use showCurrent for current-date highlighting, showNowButton for selecting now, pickerValue/defaultPickerValue for the viewport, and min/max/disabledDate for selectable-value constraints. Existing field lists, abbreviation, wheel settings, appearance and actual panel capabilities remain available. loading-icon is not wired to a public panel or date-field slot and is not an available capability.


<!-- date-contract:start -->

### Values and formats

DateValue is string, number or native Date. Numbers are timestamps and 0 is not empty; modelValue=null is explicitly empty. Ranges retain broad arrays and incomplete endpoints rather than forcing a tuple; commits still validate completeness and validity. Maple general DatePicker/Date multiple selection does not widen Cedar single-value Props.

Tables list actual public properties. Inherited/precision-derived defaults describe resolved behavior; raw Props can be undefined. format controls display/text input and valueFormat controls the model protocol. Week/quarter display labels differ from model formats; function format has no reverse parser for text input.

Bounds are inclusive. Invalid supplied bounds block confirmation instead of being treated as omitted. Tightening rules does not clear the business model. disabledDate/disabledTime are explicit validation callbacks rather than asynchronous event tasks; time callbacks return disabled lists through DateDisabledTime.

### Date Slots / Methods

Field default replaces the trigger; prefix/selected/suffix replace content, and ranges also support separator. Preserve names, endpoint distinctions and keyboard access when replacing native controls. read receives value/text, suffix-icon receives focus/popupOpen, and clear-icon receives guarded clear(event?), respecting emptyValue and disabled/readonly guards.

actions receives confirm/disabled/selectNow/nowDisabled, with both actions returning void. It has no Time-panel canConfirm/value arguments. disabled=true prevents confirmation. Standalone panels can replace the action region; the outer editing shell owns final saving in hosted editing, while the panel contributes auxiliary actions. Panel confirm is not the outer-save method.

Now capabilities follow the actual panel: Cedar single panels support it, while Cedar range panels have no now action. Maple range panels stage now for the active endpoint, preserve the other endpoint and still require confirmation. The presence of selectNow in scope does not imply every mode supports the action.

Cedar cell customizes a calendar cell with date and, for ranges, type=start/end; extra adds content. Maple Date/DatePicker page-calendar summaries support year({year}), month({year,month}), date({week,year,month,date}), range({choose}) and multiple({choose}) according to mode. Maple DateRange/DateRangePicker do not forward these single-panel summary slots, nor do scroll/line viewports promise them.

loading-icon is not wired to date fields or pure panels and is not available merely because the underlying decorator supports it. Field focus(index?)/blur() delegate to real controls. Cedar/direct-field blur closes the field popup; Maple range persistent-reference blur only clears its focus, without pretending to close the outer Drawer. Pure panels expose no focus/blur methods.

### Presentation configuration and ranges

datePickerProps/dateRangePickerProps configure presentation without overriding owned model/rules/type/control events; Maple internal range datePickerProps uses a calendar allowlist. popupProps retains a broad dictionary, with public DatePopupOptions/DateRangePopupOptions recommended and owner keys still filtered at runtime. Cedar timePickerProps configures embedded time presentation; Maple pickerProps configures wheels.

A range placeholder string applies to both endpoints; arrays configure each and missing entries are empty. readonly is separate from disabled; unset field state inherits Form. Cedar range-panel exchangeTime only handles reversed interactive candidates: true swaps their times, false retains endpoint times. It does not reorder external model/text/shortcut values. Maple does not expose this property.

## API

### Empty values and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.

### Values and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot commit. min/max are inclusive; strings follow value-format, while Date/timestamps are also accepted. Confirmation revalidates rules. `disabledTime` returns numeric lists from `disabledHours()`, `disabledMinutes(hour)`, `disabledSeconds(hour, minute)`. Valid pure panels emit `confirm(value, date(s), text(s))`; fields use `update:open`/`open-change`, not close. Nested panel/popup props configure presentation only, not top-level models/rules/state events. Range disabled accepts [startDisabled, endDisabled]; locked endpoints cannot be cleared/modified.

### Date Props

| Prop | Description | Type | Default behavior |
| --- | --- | --- | --- |
| `before-commit` | Explicit field-save guard using payload, done and context | `BeforeFieldCommit` | `undefined` |
| `blur-color` | Color while unfocused | `string` | Theme default |
| `clearable` | Allow clearing with disabled, readonly and pending guards | `boolean` | `true` |
| `date-fields` | Date wheel columns and order; an explicit list controls visibility | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | Derived from precision |
| `date-picker-props` | Date-panel presentation options, with model/rules/type owned by the field | `DatePickerOptions` | `{}` |
| `default-open` | Initial uncontrolled opening, read only at creation | `boolean` | `false` |
| `default-value` | Initial uncontrolled value, read only at creation | `DateValue \| DateValue[]` | `undefined` |
| `disable-confirm` | Commit on selection; false retains draft for confirmation | `boolean` | `false` |
| `disabled` | Disable interaction; fields inherit FormItem/Form when unset | `boolean` | Inherited, finally false |
| `disabled-date` | Return true to disable the date; side is start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | Return disabled hour/minute/second lists for a date and endpoint | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `edit-mode` | Field editing mode, inherited from FormItem/Form when unset | `FieldEditMode`<br>`'direct' \| 'popup'` | Inherited, finally popup |
| `empty-text` | Empty text in read-pretty mode | `string` | Inherited, finally '-' |
| `empty-value` | Clear output or synchronous factory, independent of emptyValues recognition | `DateValue \| null \| (() => DateValue \| null \| undefined)` | `undefined` |
| `empty-values` | Empty-value recognition list, replaced rather than merged | `readonly unknown[]` | Inherited/family default |
| `error` | Field error presentation, inherited when unset | `boolean` | Inherited, finally false |
| `focus-color` | Color while focused | `string` | Theme default |
| `format` | Display/text-input format; a function only formats without reverse text parsing | `string \| ((date: Date) => string)` | From precision/time settings |
| `hint` | Floating placeholder hint, suppressed by an outer Form label | `boolean` | `true` |
| `input-editable` | Allow text input without removing panel selection | `boolean` | `true` |
| `interactive-mode` | Maple calendar viewport mode, independent of field editing mode | `page \| scroll \| line` | `page` |
| `line` | Show the field border or underline | `boolean` | `true` |
| `loading` | Manual loading feedback, independent of event return values | `boolean` | `false` |
| `loading-mode` | Field loading presentation mode | `default \| line` | default |
| `max` | Inclusive maximum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `min` | Inclusive minimum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `model-value` | External date value; undefined is uncontrolled, null is explicitly empty | `DateValue \| DateValue[] \| null` | `undefined` |
| `multiple` | Maple multiple selection; avoid enabling range mode at the same time | `boolean` | `false` |
| `open` | Controlled field editor opening | `boolean` | `undefined` |
| `open-trigger-target` | Open by field or icon click, without restricting keyboard opening | `field \| icon` | field |
| `panel-type` | Maple field panel presentation, independent of editMode | `calendar \| picker \| calendarPicker` | `calendar` |
| `picker-props` | Maple date/time wheel presentation options, excluding the root model/rules | `DateWheelOptions` | `{}` |
| `placeholder` | Field placeholder, following Locale when omitted | `string` | `undefined` |
| `popup-container` | Editor container; false renders in place | `PopupContainer` | Shared container default |
| `popup-props` | Trigger presentation options, filtering owned state/model/rules/control listeners at runtime | `Record<string, unknown>` | `{}` |
| `read-pretty` | Read-pretty presentation without an editor, independent of readonly | `boolean` | Inherited, finally false |
| `readonly` | Readonly; fields allow focus/copy without value changes or opening editing | `boolean` | Inherited, finally false |
| `separator` | Separator text for joined/range display, including an empty string | `string` | `, ` |
| `show-time` | Enable time precision/selection, with visible precision controlled by format | `boolean` | `false` |
| `size` | Five sizes, following field Form inheritance | `ComponentSize`<br>`'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Inherited, finally md |
| `text-color` | Content text color | `string` | Theme default |
| `time-fields` | Wheel columns and order; an explicit list controls visibility without changing format or model | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Derived from format |
| `time-zone` | IANA time zone; an invalid zone does not fall back to a valid selectable value | `string` | System local time zone |
| `type` | Date precision; Cedar includes week/quarter, while Maple supports date/month/year | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Use virtual rendering for the Maple scroll viewport | `boolean` | `true` |
| `value-format` | Serialized model format: Date, timestamp or format tokens, independent of display format | `string` | From precision/time settings |
| `variant` | Field appearance | `filled \| outline \| standard` | `standard` |

### Date Events

See the complete field and panel event lists on this page.

### Date Methods

| Method | Description | Arguments | Returns |
| ------- | ---- | ---- | ------ |
| `focus` | Focus | `-` | `-` |
| `blur` | Blur | `-` | `-` |

### Date Slots

| Slot | Description | Prop |
| ------------- | ------------ | ------------------------------------ |
| `selected` | Selected content | `-` |
| `prefix` | The prepend icon of alert | `-` |
| `clear-icon` | Clear icon | `clear: (e: Event) => void` |
| `suffix` | Suffix | `-` |
| `suffix-icon` | Arrow icon | `focus: boolean, popupOpen: boolean` |

### DatePicker Props

| Prop | Description | Type | Default behavior |
| --- | --- | --- | --- |
| `abbreviation` | Use abbreviated month-grid names; false uses full month names | `boolean` | `true` |
| `button-elevation` | Elevation of Maple internal calendar buttons | `boolean \| number` | `true` |
| `color` | Maple calendar color | `string` | Theme default |
| `date-fields` | Date wheel columns and order; an explicit list controls visibility | `readonly DatePickerField[]`<br>`DatePickerField: 'month' \| 'year' \| 'day'` | Derived from precision |
| `day-start-of-week` | First day of week for calendars, an integer from 0 to 6 | `DateWeekStart` | `0` |
| `default-picker-value` | Initial calendar viewport, read once; selected values take precedence over the current date | `DateSelection` | `undefined` |
| `default-value` | Initial uncontrolled value, read only at creation | `DateValue \| DateValue[]` | `undefined` |
| `disable-confirm` | Commit on selection; false retains draft for confirmation | `boolean` | `true` |
| `disabled` | Disable panel selection and commit | `boolean` | `false` |
| `disabled-date` | Return true to disable the date; side is start/end | `(date: Date, side: DateSide) => boolean`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `disabled-time` | Return disabled hour/minute/second lists for a date and endpoint | `(date: Date, side: DateSide) => DateDisabledTime`<br>`DateSide: 'end' \| 'start'` | `undefined` |
| `elevation` | Panel elevation; false disables its shadow | `boolean \| number` | `false` |
| `empty-value` | Clear output or synchronous factory, independent of emptyValues recognition | `DateValue \| null \| (() => DateValue \| null \| undefined)` | `undefined` |
| `format` | Display/text-input format; a function only formats without reverse text parsing | `string \| ((date: Date) => string)` | From precision/time settings |
| `hint` | Maple summary hint, effective when the summary region is displayed | `string` | `Locale` |
| `interactive-mode` | Maple calendar viewport mode, independent of field editing mode | `page \| scroll \| line` | `page` |
| `max` | Inclusive maximum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `min` | Inclusive minimum; a supplied invalid boundary is not silently ignored | `DateValue` | `undefined` |
| `model-value` | External date value; undefined is uncontrolled, null is explicitly empty | `DateValue \| DateValue[] \| null` | `undefined` |
| `multiple` | Maple multiple selection; avoid enabling range mode at the same time | `boolean` | `false` |
| `picker-props` | Maple date/time wheel presentation options, excluding the root model/rules | `DateWheelOptions` | `{}` |
| `picker-value` | Controlled calendar viewport, separate from selection; range viewports contain two dates | `DateSelection` | `undefined` |
| `presentation` | Maple standalone-panel presentation | `calendar \| picker \| calendarPicker` | `calendarPicker` |
| `preview-shortcut` | Preview shortcuts on hover/focus without committing | `boolean` | `true` |
| `range` | Range mode of the Maple general standalone panel | `boolean` | `false` |
| `readonly` | Readonly panel without candidate changes or commits | `boolean` | `false` |
| `shortcuts` | Shortcuts with values or on-demand synchronous value factories, optional format/disabled | `DateShortcut[]` | `[]` |
| `shortcuts-position` | Shortcut position | `left \| bottom \| right` | `bottom` |
| `show-current` | Highlight the current date without changing selection or model | `boolean` | `true` |
| `show-now-button` | Show the now action according to the actual panel range capabilities | `boolean` | `true` |
| `show-time` | Enable time precision/selection, with visible precision controlled by format | `boolean` | `false` |
| `time-fields` | Wheel columns and order; an explicit list controls visibility without changing format or model | `readonly TimePickerField[]`<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Derived from format |
| `time-zone` | IANA time zone; an invalid zone does not fall back to a valid selectable value | `string` | System local time zone |
| `title-color` | Maple summary-title background, taking precedence over color | `string` | Theme default |
| `touchable` | Maple calendar touch paging, subject to viewport mode and readonly rules | `boolean` | `true` |
| `type` | Date precision; Cedar includes week/quarter, while Maple supports date/month/year | `date \| month \| year` | `date` |
| `use-virtual-scroll` | Use virtual rendering for the Maple scroll viewport | `boolean` | `true` |
| `value-format` | Serialized model format: Date, timestamp or format tokens, independent of display format | `string` | From precision/time settings |

### DatePicker Events

See the complete field and panel event lists on this page.

### DatePicker Slots

`weekIndex` is the nth day of the week, starting at `0` on the weekend

| Name | Description | Prop |
| ---------- | ------------------ | -------------------------------------------------------------------- |
| `year` | Custom the year in the title | `year: YYYY` |
| `month` | Custom the month in the title | `year: YYYY` <br> `month: MM` |
| `date` | Custom the date in the title | `year: YYYY` <br> `month: MM` <br> `date: DD` <br> `week: weekIndex` |
| `range` | Custom range in the title | `choose: [startData, endDate]` |
| `multiple` | Custom multiple selection in the title | `choose: ['YYYY-MM-DD' \| 'YYYY-MM']` |
| `actions` | Custom the views in the action panel | `{ confirm, disabled }` |

## Configuring the cleared value

`empty-value` defines the output of an existing clear action. Omission preserves the component fallback; supported types remain component-specific. It does not change empty-values recognition or Form reset defaults.

## Visible wheel fields

`date-fields` and `time-fields` independently control date and time columns and their order. The two groups do not interleave. Fields and standalone panels share the same props; range endpoints share the configuration.

| Prop | Type | Default | Description |
| ------------- | -------------------------- | ------------------------ | ----------------------------------------------------------- |
| `date-fields` | readonly DatePickerField[]<br>`DatePickerField: 'month' \| 'year' \| 'day'` | Generate year/month/day columns from type | year, month, day. Only date wheels are affected; the calendar grid is unchanged. |
| `time-fields` | readonly TimePickerField[]<br>`TimePickerField: 'hour' \| 'minute' \| 'second'` | Hour/minute/second | Controls time wheels, including those embedded in calendars. |

Arrays must be nonempty and unique; explicit arrays strictly determine column visibility/order. Omission uses defaults. Date/time field groups validate separately and cannot mix. Hidden units retain existing values and merge back into the complete draft. Changing field configuration does not commit the model. Nested display options cannot override root props.

Date/DateRange time areas apply only with show-time. `format` controls input text; `value-format` controls saved representation; neither determines panel columns. Unspecified datetime formats save seconds by default. For minute strings, configure both formats explicitly. Hiding year still uses the complete draft year. MM-DD alone cannot represent cross-year ranges; save complete dates for leap-year/cross-year workflows.

## Types

### Field event parameter types

| Event | Arguments |
| --- | --- |
| `update:modelValue` | `DateEmits['update:modelValue']` |
| `change` | `DateEmits['change']` |
| `select` | `DateEmits['select']` |
| `clear` | `DateEmits['clear']` |
| `click` | `DateEmits['click']` |
| `focus` | `DateEmits['focus']` |
| `blur` | `DateEmits['blur']` |
| `update:open` | `DateEmits['update:open']` |
| `open-change` | `DateEmits['open-change']` |
| `update:pickerValue` | `DateEmits['update:pickerValue']` |
| `picker-value-change` | `DateEmits['picker-value-change']` |
| `select-shortcut` | `DateEmits['select-shortcut']` |

Field value/viewport notifications use the corresponding public Emits tuples; DateChangeArgs contains value, date(s) and text(s). Listener Promises are not awaited and do not drive loading. beforeCommit uses payload/done/context, with value/previousValue in payload and signal/optional event in context; undefined waits for done.

### Panel event parameter types

Standalone panels have the seven events below, without the old preview event. Navigation uses picker-value-change and update:pickerValue. Navigation/shortcut hover-focus preview does not imply selection or commit. Confirmation only notifies when valid; select draft is separate from committed change.

| Event | Arguments |
| --- | --- |
| `update:modelValue` | `DatePickerEmits['update:modelValue']` |
| `change` | `DatePickerEmits['change']` |
| `select` | `DatePickerEmits['select']` |
| `confirm` | `DatePickerEmits['confirm']` |
| `update:pickerValue` | `DatePickerEmits['update:pickerValue']` |
| `picker-value-change` | `DatePickerEmits['picker-value-change']` |
| `select-shortcut` | `DatePickerEmits['select-shortcut']` |

### Type imports

```ts
import { Date as DateField, DatePicker, type DateProps, type DatePickerProps,
  type DateEmits, type DatePickerEmits, type DateValue, type DateSelection,
  type DateChangeArgs, type DateRules, type DateShortcut } from '@maple-design/ui-vue'
```

<!-- date-contract:end -->

## CSS Variables

The following CSS variables support customization with [ThemeProvider](#/en-US/theme-provider).

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-date-calendar-disabled-opacity` | `0.4` | `opacity` |
| `--mp-date-calendar-line-height` | `60px` | `grid-auto-rows` |
| `--mp-date-calendar-month-height` | `320px` | `height` |
| `--mp-date-calendar-row-height` | `38px` | `grid-auto-rows`, `line-height` |
| `--mp-date-calendar-scroll-height` | `320px` | `height` |
| `--mp-date-calendar-selected-background` | `var(--mp-sys-color-action-primary)` | `background` |
| `--mp-date-calendar-selected-color` | `var(--mp-button-solid-text-color)` | `color` |
| `--mp-date-calendar-today-color` | `var(--mp-button-default-foreground-color)` | `background`, `color` |
| `--mp-date-input-trigger-outline-color` | `var(--mp-sys-color-content-brand)` | `outline` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)` | `outline-offset` |
| `--mp-date-input-trigger-outline-width` | `var(--mp-sys-space-1)` | `outline` |
| `--mp-date-input-trigger-padding` | `0` | `padding` |
| `--mp-date-picker-actions-padding` | `0 8px 12px 8px` | `padding` |
| `--mp-date-picker-body-background-color` | `#fff` | `background`, `background-color` |
| `--mp-date-picker-body-height` | `280px` | `height`, `min-height` |
| `--mp-date-picker-body-padding` | `0` | `padding` |
| `--mp-date-picker-border-radius` | `4px` | `border-radius` |
| `--mp-date-picker-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-date-picker-header-arrow-filter` | `opacity(0.54)` | `filter` |
| `--mp-date-picker-header-color` | `#555` | `color` |
| `--mp-date-picker-header-padding` | `4px 16px` | `padding` |
| `--mp-date-picker-main-color` | `rgba(0, 0, 0, 0.87)` | `color` |
| `--mp-date-picker-min-width` | `290px` | `flex`, `min-width` |
| `--mp-date-picker-panel-background` | `var(--mp-sys-color-surface-overlay)` | `background` |
| `--mp-date-picker-panel-border` | `var(--mp-color-border-2)` | `border` |
| `--mp-date-picker-panel-date-width` | `265px` | `flex`, `min-width`, `width` |
| `--mp-date-picker-panel-preferred-width` | `var(--mp-date-picker-popover-width)` | `flex`, `width` |
| `--mp-date-picker-panel-radius` | `8px` | `border-radius` |
| `--mp-date-picker-popover-gap` | `32px` | `max-height`, `max-width` |
| `--mp-date-picker-popover-max-height` | `calc(100dvh - var(--mp-date-picker-popover-gap))` | `max-height` |
| `--mp-date-picker-popover-width` | `calc(var(--mp-date-picker-panel-date-width) + 2px)` | `flex`, `width` |
| `--mp-date-picker-range-background` | `var(--mp-color-primary-light-1)` | `background` |
| `--mp-date-picker-range-disabled-background` | `var(--mp-color-fill-1)` | `background` |
| `--mp-date-picker-range-preview-background` | `var(--mp-color-fill-2)` | `background` |
| `--mp-date-picker-range-preview-outline` | `1px dashed var(--mp-color-primary)` | `outline` |
| `--mp-date-picker-shortcuts-column-width` | `128px` | `flex`, `width` |
| `--mp-date-picker-title-background` | `var(--mp-date-picker-body-background-color)` | `background` |
| `--mp-date-picker-title-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-date-picker-title-date-font-size` | `34px` | `font-size` |
| `--mp-date-picker-title-date-font-weight` | `500` | `font-weight` |
| `--mp-date-picker-title-date-height` | `48px` | `min-height` |
| `--mp-date-picker-title-date-justify-content` | `normal` | `justify-content` |
| `--mp-date-picker-title-date-range-font-size` | `20px` | `font-size` |
| `--mp-date-picker-title-height` | `105px` | `min-height` |
| `--mp-date-picker-title-hint-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-date-picker-title-hint-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-date-picker-title-padding` | `16px` | `padding` |
| `--mp-date-picker-title-year-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-date-picker-title-year-font-weight` | `500` | `font-weight` |
| `--mp-date-picker-title-year-margin-bottom` | `8px` | `margin-bottom` |
| `--mp-date-picker-title-year-min-height` | `21px` | `min-height` |
| `--mp-date-picker-wheel-font-size` | `5cqi` | `font-size` |
| `--mp-date-title-font-size` | `var(--mp-picker-title-font-size, 16px)` | `font-size` |
| `--mp-date-title-text-color` | `var(--mp-picker-title-text-color, #555)` | `color` |
| `--mp-date-toolbar-height` | `var(--mp-picker-toolbar-height, 44px)` | `height` |
| `--mp-date-toolbar-padding` | `var(--mp-picker-toolbar-padding, 0 4px)` | `padding` |
| `--mp-day-picker-content-item-button-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-day-picker-content-item-button-height` | `32px` | `height` |
| `--mp-day-picker-content-item-button-width` | `32px` | `width` |
| `--mp-day-picker-content-item-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-day-picker-content-item-min-height` | `21px` | `min-height` |
| `--mp-day-picker-content-item-padding` | `2px 0` | `padding` |
| `--mp-day-picker-content-item-width` | `14.28%` | `width` |
| `--mp-day-picker-head-item-color` | `rgba(0, 0, 0, 0.38)` | `color` |
| `--mp-day-picker-head-item-font-weight` | `600` | `font-weight` |
| `--mp-day-picker-head-item-padding` | `8px 0` | `padding` |
| `--mp-month-picker-item-button-max-width` | `140px` | `max-width` |
| `--mp-month-picker-item-height` | `56px` | `height` |
| `--mp-month-picker-item-width` | `33%` | `width` |
| `--mp-month-picker-padding` | `0 12px` | `padding` |
| `--mp-year-picker-item-button-max-width` | `140px` | `max-width` |
| `--mp-year-picker-item-height` | `56px` | `height` |
| `--mp-year-picker-item-width` | `33%` | `width` |
| `--mp-year-picker-padding` | `0 12px` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-date-calendar-selected-background: var(--mp-sys-color-action-primary);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
