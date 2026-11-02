<!-- Source: src/date/docs/en-US.md; locale: en-US; page: /en-US/date -->

# Date

The year panel aligns the selected year, falling back to the current year, only inside its own scroll surface. It never scrolls the outer document. Alignment runs after mounting, accounts for dialog scale transitions, and is retired on deactivation or disposal.

While expanded, the native combobox uses `aria-controls` to identify its own named popup. Closing updates the state and removes the link. `aria-label` and `aria-describedby` reach the native input. Custom selected/trigger slots must preserve accessible names, keyboard operation and state associations.

## Examples

Floating panels use the visual viewport instead of a half-screen cap. A full calendar is visible when space permits; short windows scroll content while keeping actions visible. Override `--mp-date-picker-popover-max-height` to cap the panel (default `100dvh - 32px`). Switching back to default/Maple removes brand overrides.

### Time zones, DST and calendar views

Example source: src/date/example/demos/en-US/time-zone-views.vue

```vue
<script setup>
import Demo from '../time-zone-views.vue'
</script>
<template><Demo english /></template>
```

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

### Disabled

Example source: src/date/example/demos/en-US/disabled.vue

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

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Set `time-fields="['hour', 'minute']"` for minute precision. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date field that opens `DatePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

### Shared field and commit protocol

Date, DateRange, Time and TimeRange use independent same-source copies of PickerField and FieldDecorator. Date/DateRange enable text entry by default (it can be disabled); Time uses its own inputEditable setting. Panels edit a draft, Confirm commits it, and Cancel or dismissal discards it. Clear commits an empty value and closes the panel. Range fields retain separate start/end values and overnight hints.

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
  <div style="display: flex; flex-direction: column; gap: 12px">
    <p>
      The parent rejects close requests. A new date starts a new confirmation; repeated confirmation does not submit
      twice.
    </p>
    <mp-date v-model="value" :open="open" panel-type="calendar" @update:open="requestOpen" @change="commits++" />
    <span data-test="date-transaction-state"
      >Value: {{ value }}; commits: {{ commits }}; rejected closes: {{ closeRequests }}</span
    >
    <mp-button @click="open = false">Allow close</mp-button>
  </div>
</template>
```

### Calendar Mode

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
    <mp-date v-model="minute" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" clearable />
    <span>Committed value：{{ minute || 'Not selected' }}</span>
    <span>Second precision: the default on both platforms</span>
    <mp-date v-model="second" show-time :time-fields="['hour', 'minute', 'second']" clearable />
    <span>Committed value：{{ second || 'Not selected' }}</span>
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

### Model and display formats

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

### Appearance combinations

Use this example for selecting a date. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

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

### Interaction states

Use this example for selecting a date. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

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

## API

### Shared rules and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot be committed. Boundaries are inclusive and use `value-format`; Date or timestamp boundaries are also accepted. Rules are rechecked at confirmation. `disabledTime` returns `disabledHours()`, `disabledMinutes(hour)` and `disabledSeconds(hour, minute)` number lists. Pure panels emit `confirm` after validation; field open state uses `update:open` / `open-change`, not `close`. Nested panel/popup props configure presentation only and cannot override models, rules or ownership listeners. Range `disabled` accepts `[startDisabled, endDisabled]`; a locked endpoint cannot be cleared or modified.

### Props

| Prop                | Description                                                       | Type                         | Default    |
| ------------------- | ----------------------------------------------------------------- | ---------------------------- | ---------- |
| `model-value` | Controlled value | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue / DateValue[] (multiple/range) | `undefined` |
| `input-editable` | Allow text entry; function format/multiple stays readonly | boolean | true |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `open`              | Controlled popup visibility                                       | _boolean_                    | `-`        |
| `default-open` | Uncontrolled initial open state | boolean | false |
| `popup-container` | Popup mount target | string / HTMLElement / (() => HTMLElement) / false | — |
| `panel-type`      | Panel mode: `picker` `calendar` `calendarPicker`  | _string_                     | `calendar`   |
| `type`              | Picker type: `year` `month` `date`                                | _string_                     | `date`     |
| `show-time`         | Enable time selection                                             | _boolean_                    | `false`    |
| `multiple`          | Enable multiple select                                            | _boolean_                    | `false`    |
| `min`               | Minimum date                                                      | DateValue                     | `-`        |
| `max`               | Maximum date                                                      | DateValue                     | `-`        |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`         | Display separator for multiple                                    | _string_                     | `, `       |
| `date-picker-props` | Props passed to `mp-date-picker`                                  | _DatePickerOptions_ | `{}`       |
| `popup-props`       | Props passed to popup                                             | _Partial\<PopupProps\>_      | `{}`       |
| `placeholder`       | Placeholder                                                       | _string_                     | `-`        |
| `clearable`         | Show clear button                                                 | _boolean_                    | `true`    |
| `disabled`          | Disabled                                                          | _boolean_                    | `false`    |
| `readonly`          | Readonly                                                          | _boolean_                    | `false`    |
| `size`              | Size: `xs` `sm` `md` `lg` `xl`                                    | _ComponentSize_              | `md`       |
| `variant`           | Variant: `filled` `standard` `outline`                           | _string_                     | `standard` |

### Events

| Event    | Description               | Arguments      |
| -------- | ------------------------- | -------------- |
| `focus`  | Emitted on focus          | `-`            |
| `blur`   | Emitted on blur           | `-`            |
| `click`  | Emitted on click          | `event: Event` |
| `clear` | Cleared: undefined for single, [] for multiple/range | — |
| `open-change` | Open-state change | open: boolean |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Methods

| Method  | Description     | Arguments | Return |
| ------- | --------------- | --------- | ------ |
| `focus` | Focus the field | `-`       | `-`    |
| `blur`  | Blur the field  | `-`       | `-`    |

### Slots

| Slot         | Description      | Arguments                            |
| ------------ | ---------------- | ------------------------------------ |
| `selected`   | Selected content | `-`                                  |
| `prefix`     | Prefix           | `-`                                  |
| `clear-icon` | Clear icon       | `clear: (e: Event) => void`          |
| `suffix`     | Suffix           | `-`                                  |
| `suffix-icon` | Arrow icon       | `focus: boolean, popupOpen: boolean` |

### Field and embedded panel

Fields own input and popup state; panels embed directly. day-start-of-week accepts integer 0–6 (Sunday=0), with reactive range-calendar updates. Nested Options configure presentation only, not values, formats, bounds or disabled rules.

Example source: src/date/example/demos/en-US/entry-boundary.vue

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

## DatePicker
Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.

> 源码已并入 `date/`，安装父组件时一并注册。静态成员：`Date.Picker`。

### Intro

Date selection **panel**. DatePicker demos are included on this page; there is no separate date-picker documentation route. See the range documentation for [`DateRangePicker`](#/en-US/date-range). Form fields: [`Date`](#/en-US/date) / [`DateRange`](#/en-US/date-range).

The embedded panel example explicitly sets `disable-confirm=false`: selecting a date edits the draft; the committed value updates only after confirmation. Changing week start or removing bounds does not commit a value. Restoring bounds does not clear the existing model; an out-of-bounds draft cannot be confirmed until a valid date is selected.

Calendar arrows have localized accessible names: previous/next month in the day panel, year in the month panel, and years in the year list. They use global Locale, allow local LocaleProvider overrides, and fall back to the global translation for missing navigation keys. Boundaries still disable navigation; changing the preview does not commit a date.

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

Enable `show-time` for date+time. `presentation` controls the UI:

-: the footer clock/calendar button switches between date and clock content
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
  <mp-date-picker v-model="calendarPicker" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" presentation="calendarPicker" />
  <mp-date-picker v-model="picker" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" presentation="picker" />
</template>
```

### API

### Props

| Prop                | Description                                                                                   | Type                          | Default       |
| ------------------- | --------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| `model-value` | Controlled value | DateValue / DateValue[] (multiple/range) | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue / DateValue[] (multiple/range) | `undefined` |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `type`              | Picker type, optional values `date` `month` `year`                                            | _string_                      | `date`        |
| `presentation`      | Panel mode: `calendar` `picker` `calendarPicker`                              | _string_                      | `calendarPicker`      |
| `show-time`         | Enable time selection                                                                         | _boolean_                     | `false`       |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `color`             | Picker color                                                                                  | _string_                      | `-`           |
| `title-color`       | Color of picker title. If not specified it will use `color` prop or the default picker color. | _string_                      | `-`           |
| `hint`              | Picker hint                                                                                   | _string_                      | `SELECT DATE` |
| `elevation`         | Elevation level, options `true` `false` and level of `0-24`                                   | _number \| boolean_ | `false`       |
| `button-elevation`  | Elevation level of Button                                                                     | _string \| number \| boolean_ | `true`        |
| `day-start-of-week` | Sets the first day of the week, starting with 0 for Sunday.                                   | _DateWeekStart_            | `0`           |
| `min`               | Minimum allowed date/month (ISO 8601 format)                                                  | DateValue                      | `-`           |
| `max`               | Maximum allowed date/month (ISO 8601 format)                                                  | DateValue                      | `-`           |
| `show-current`      | Whether to display the current date                                                           | _boolean_                     | `true`        |
| `readonly`          | readonly                                                                                      | _boolean_                     | `false`       |
| `multiple`          | Allow the selection of multiple dates                                                         | _boolean_                     | `false`       |
| `range`             | Allow the selection of date range                                                             | _boolean_                     | `false`       |
| `touchable`         | Allow switch panel by touch                                                                   | _boolean_                     | `true`        |

### Events

| Event     | Description                 | arguments                                             |
| --------- | --------------------------- | ----------------------------------------------------- |
| `preview` | Emitted after date switched | `year: number` <br>`month: number` <br>`day?: number` |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Slots

`weekIndex` means the nth day of the week, starting with `0` for Sunday.

| Name       | Description                          | SlotProps                                                            |
| ---------- | ------------------------------------ | -------------------------------------------------------------------- |
| `year`     | Custom the year in the title         | `year: YYYY`                                                         |
| `month`    | Custom the month in the title        | `year: YYYY` <br> `month: MM`                                        |
| `date`     | Custom the date in the title         | `year: YYYY` <br> `month: MM` <br> `date: DD` <br> `week: weekIndex` |
| `range`    | Custom the range in the title        | `choose: [startData, endDate]`                                       |
| `multiple` | Custom the multiple in the title     | `choose: ['YYYY-MM-DD' \| 'YYYY-MM']`                                |
| `actions`  | Custom the views in the action panel | `-`                                                                  |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                     | Default                |
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
| `--mp-date-picker-body-padding`                 | `0`                    |
| `--mp-date-picker-body-background-color`        | `#fff`                 |
| `--mp-date-picker-body-height`                  | `280px`                |
| `--mp-date-picker-header-arrow-filter`          | `opacity(0.54)`        |
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
      :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm"
      :disable-confirm="false"
      presentation="calendarPicker"
    />
    <p>Confirmed range: {{ range }}</p>
  </div>
</template>
```

| Prop | Meaning | Default |
| --- | --- | --- |
| `show-current` | Highlight the current day/month/year in calendar presentations; does not select or commit | true |
| `show-now-button` | Show Now; hidden for multiple selection, updates the active range endpoint | true |

Now uses the panel's type, time precision and value-format and follows disabled/readonly, min/max and date/time rules. It only updates the draft. Even with disable-confirm enabled, Now and subsequent edits require confirmation; cancelling discards the draft. Date and date-time panels and ranges behave consistently in standalone panels and field editors; ranges update only the active endpoint without swapping. Neither mounting nor changing highlighting writes to the model. The removed showNowBtn name has no alias.

The actions slot provides `{ confirm, disabled, selectNow, nowDisabled }`. Custom UI must call these protected functions; it must not write directly to the model.

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

## Month labels

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

Date labels, headers and actions use the library's global Locale/LocaleProvider. Cedar no longer accepts a component-level `locale`; no compatibility alias is retained. Changing language does not select or submit a value.

### Nested time and wheel views

`timePickerProps` uses `DateTimePickerOptions`: `use12Hours`, `step`, `hideDisabledOptions`, `class`, `style`. It customizes the time view only; date model, precision/format, validation and confirmation remain owned by the date component. `step` samples the view and does not silently round external values. Unknown keys and listeners are not forwarded.

`pickerProps` uses `DateWheelOptions`: `optionHeight`, `optionCount`, `class`, `style`. It applies to date and time wheels in single/range panels. Generated columns, model, toolbar, field mapping and popup state cannot be overridden. explicitly displays a clock when the time tab is opened.

Example source: src/date/example/demos/en-US/time-presentation.vue

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

### Real platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`: desktop fields do not render mobile wheels or a mobile inner-calendar plugin. Maple retains these real extensions, using DateWheelOptions and DateRangeCalendarOptions. Both libraries use `Date.datePickerProps` / `DateRange.dateRangePickerProps` to configure their full panel, and `timePickerProps` for the nested time view. Initial date/time values belong to top-level `defaultValue`, not `timePickerProps.defaultValue`.

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

The copied date parser strictly uses display `format`, serializes through `value-format`, and checks the existing disabled/range rules. Single/range date fields now wire real native input. Editing is enabled by default: input clicks only edit; the calendar button or ArrowDown opens the panel, and Enter/blur commits. Set `input-editable=false` for panel-only selection. Multiple/function-formatted display has no inverse text protocol and stays readonly. A function `format` has no inverse parsing protocol: disable `input-editable` and use the selection panel. Maple has no week/quarter presentation; copied parsing logic does not introduce unsupported component types.

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
| --- | --- |
| `--mp-date-input-trigger-padding` | `0` |
| `--mp-date-input-trigger-outline-width` | `var(--mp-sys-space-1)` |
| `--mp-date-input-trigger-outline-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-date-input-trigger-outline-offset` | `var(--mp-sys-space-1)` |

### Field viewport and shortcut events

Configure `pickerValue`, `defaultPickerValue` and shortcuts through nested `datePickerProps` / `dateRangePickerProps`; listeners inside nested objects are filtered. Listen on the field and update the nested viewport. Controlled rejection keeps the previous month; navigation does not select or commit. A valid shortcut chooses a draft under the existing confirmation policy.

| Event | Description | Parameters |
| --- | --- | --- |
| `update:picker-value` | Request calendar viewport update | value: DateSelection |
| `picker-value-change` | Viewport request and formatted payload | value, date(s), formatted text(s) |
| `select-shortcut` | Accepted shortcut object | shortcut: DateShortcut |

Example source: src/date/example/demos/en-US/field-panel-tools.vue

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

`Date` / `DateRange` fields select their content through root `panel-type`; pure panels use root `presentation`. Both fields default to `calendar` content; standalone date panels default to `calendarPicker`. Field `DatePickerOptions` / `DateRangePickerOptions` no longer accept the ineffective `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarPicker; ranges support picker/calendar. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `popup`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Inline keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `presentation` controls the field container. Standalone pickers keep their existing content `presentation`.

Standalone, inline and popup editors share the same layout. The calendar has a preferred width of 265px with extra space for a half-hour quick time Picker when time is enabled; narrow screens fit the available width. The footer displays the date, time and a clock/calendar toggle. Explicit `presentation="picker"` preserves date wheels. The panel retains standalone confirmation and actions ownership.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Shared mobile panel style

Single date, date-time and time panels omit the top summary in standalone panels and field editors. Date-time editors retain the current date/time and view switch at the bottom. Range summaries remain visible and highlight the active endpoint.

The hint and selected year are no longer repeated below the summary. The calendar's central heading is a keyboard-accessible button with a dropdown indicator: activate it to choose months, then years. Use the footer calendar button to return to the date view without committing a value.

Shared style variables:

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
# Time zones and calendar views

`time-zone` accepts an IANA zone such as `America/New_York`. Dates and millisecond timestamps represent instants; strings represent civil time in that zone. Display, text entry, limits, shortcuts and disabled rules share this protocol. Event Dates remain actual instants. Omit the prop for existing host-local behavior. DST gaps are rejected, folds choose the earlier instant, and invalid zones block submission.

`interactive-mode` is `page` by default. `scroll` shows months between the limits with `use-virtual-scroll` enabled by default; without limits, the initial viewport has a one-year window on each side. `line` separates weekday headings from a row of dates, reuses round date selection, and labels the visible week with its date range. Previous/next buttons move by one week. Navigation never commits a field draft. Day-precision date-time uses these views together with the existing quick-time and detailed wheels. Range summaries, endpoint locks, reversed-range feedback and confirmation remain owned by the existing field transaction. Non-day precision retains its existing renderer.

Virtual months have equal height and six week rows. Customize `--mp-date-calendar-scroll-height`, `--mp-date-calendar-month-height`, `--mp-date-calendar-row-height` and `--mp-date-calendar-line-height` together. Existing calendar color tokens cover both brands and light/dark modes. Disabling virtualization renders the entire range.


## Typed passthrough configuration

Use `DatePopupOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

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
DST gaps, including half-hour transitions, disable only nonexistent times. New civil selections use the earlier fold occurrence. Existing Date/timestamp values preserve their occurrence and hidden milliseconds through zone changes, unchanged confirmation and edits to the opposite endpoint. Strings cannot encode which fold occurrence was intended.


## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.


## Visible wheel fields

`date-fields` and `time-fields` independently control date and time columns and their order. The two groups do not interleave. Fields and standalone panels share the same props; range endpoints share the configuration.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `date-fields` | readonly DatePickerField[] | According to type | year, month, day. Only date wheels are affected; the calendar grid is unchanged. |
| `time-fields` | readonly TimePickerField[] | hour, minute, second | Controls time wheels, including those embedded in calendars. |

Lists must be nonempty and unique. Explicit lists determine columns and order; only omitted props use defaults. Date and time fields cannot be mixed. Edits preserve hidden units in the full draft. Changing fields does not submit the model. Nested presentation props cannot override root field configuration.

Time fields apply when show-time is enabled. format controls input text; value-format controls serialization. Neither controls columns. Datetime values default to seconds; configure both formats explicitly for minute strings. Hidden years remain in the full draft. Month/day strings cannot express cross-year ranges; use full dates for leap-year and cross-year logic.
