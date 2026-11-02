<!-- Source: src/time/docs/en-US.md; locale: en-US; page: /en-US/time -->

# Time

If a parent keeps the popup open after confirmation, repeated confirmation without a new selection is deduplicated. A fresh time selection starts a new transaction and can be confirmed again.

While expanded, the native combobox uses `aria-controls` to identify its own named popup. Closing updates the state and removes the link. `aria-label` and `aria-describedby` reach the native input. Custom selected/trigger slots must preserve accessible names, keyboard operation and state associations.

In clock and wheel modes, min/max are inclusive same-day bounds. A minute stays selectable when some of its seconds are available. Second constraints compare the complete clock value, not seconds from a different hour. Use TimeRange show-next-day for overnight ranges, rather than reversed min/max.

## Examples

### Basic Usage

Example source: src/time/example/demos/en-US/basic-usage.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const time = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="time" format="HH:mm" placeholder="Select a time" clearable />
  </mp-space>
</template>
```

### Disabled

Example source: src/time/example/demos/en-US/disabled.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const disabledTime = ref('09:30')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="disabledTime" format="HH:mm" disabled />
  </mp-space>
</template>
```

### Readonly

Example source: src/time/example/demos/en-US/readonly.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const readonlyTime = ref('09:30')
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="readonlyTime" format="HH:mm" readonly />
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

### Text entry

`input-editable` defaults to `false` (Cedar: `true`). When enabled, tap the input to type; use the clock button or ArrowDown to open the picker/clock panel. Enter or blur commits; Escape cancels. Parsing, steps, bounds and disabled rules match panel selection. Invalid or rejected controlled edits restore the model value. Disabling editing, readonly or disabled state discards drafts. IME composition and moving between range inputs do not commit.

Example source: src/time/example/demos/en-US/text-entry.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const editable = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="editable">Allow text entry</mp-checkbox>
    <p>
      Enter or blur to commit; Escape to cancel. Allowed range: 08:00–18:00. Use the clock button or ArrowDown to open
      the panel.
    </p>
    <mp-time v-model="value" :input-editable="editable" format="HH:mm" min="08:00" max="18:00" clearable />
    <span>{{ value }}</span>
  </mp-space>
</template>
```

### Intro

Form time **field** that opens `TimePicker` in a bottom popup. Interaction matches Select picker mode: Cancel discards the draft; Confirm writes `v-model`.

For time ranges, use [`TimeRange`](time-range.md). For panel-only, use [`TimePicker`](../../en-US/time-picker). For time range panel, use [`TimeRangePicker`](../../en-US/time-range-picker).

### AM / PM

Example source: src/time/example/demos/en-US/ampm-formats.vue

```vue
<script setup>
import { ref } from 'vue'

const morning = ref('09:30 AM')
const afternoon = ref('05:45 PM')
const noon = ref('12:00:00 PM')
</script>
<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Minute precision with AM / PM: choose morning and afternoon times.</p>
    <mp-time v-model="morning" format="hh:mm A" use12-hours />
    <mp-time v-model="afternoon" format="hh:mm A" use12-hours />
    <p>Standalone seconds: 12 AM is midnight and 12 PM is noon.</p>
    <mp-time-picker v-model="noon" format="hh:mm:ss A" use12-hours />
    <output>{{ morning }} / {{ afternoon }} / {{ noon }}</output>
  </mp-space>
</template>
```

### 24-Hour Format

Example source: src/time/example/demos/en-US/hour24.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const time24 = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="time24" format="HH:mm" placeholder="24-hour format" clearable />
  </mp-space>
</template>
```

### Show Seconds

Example source: src/time/example/demos/en-US/show-second.vue

```vue
<script setup>
import { reactive, ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli/client'

const time = ref()
const timeWithSeconds = ref()
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-time v-model="timeWithSeconds" format="HH:mm:ss" placeholder="Includes seconds" clearable />
  </mp-space>
</template>
```

### With FormItem

Example source: src/time/example/demos/en-US/with-form-item.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const time = ref()
const form = ref(null)
const formData = reactive({
  alarm: undefined,
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-form ref="form" :model="formData">
      <mp-form-item field="alarm" label="Alarm" required>
        <mp-time v-model="formData.alarm" format="HH:mm" placeholder="Select" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

Disabled callbacks match Cedar: disabled-hours, disabled-minutes and disabled-seconds; the old disabled-time prop is removed. Both views respect inclusive same-day min/max. Overnight ranges use show-next-day. Hidden seconds are evaluated as zero. Opening a field aligns its draft to a valid candidate without writing the external model; confirmation validates again. Empty or invalid drafts cannot be confirmed after rules change.

### Wheel constraints

Example source: src/time/example/demos/en-US/wheel-limits.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('10:30:40')
const locked = ref(false)
const disabledHours = () => (locked.value ? Array.from({ length: 24 }, (_, hour) => hour) : [])
const disabledMinutes = (hour) => (hour === 10 ? [45] : [])
const disabledSeconds = (hour, minute) => (hour === 10 && minute === 30 ? [41, 43, 45] : [])
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>
      Inclusive 10:30:38–11:30:02. Change the hour to see dependent minutes and seconds; blocking all hours prevents
      confirmation.
    </p>
    <mp-button @click="locked = !locked">{{ locked ? 'Restore choices' : 'Block all hours' }}</mp-button>
    <mp-time
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

### AM/PM and midnight/noon

Example source: src/time/example/demos/en-US/ampm.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('12:00:00 am')
const noon = ref('12:00:00 pm')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>12 AM is midnight; 12 PM is noon. Fields and the panel stay in sync.</p>
    <mp-time v-model="value" use12-hours style="width: 100%; max-width: 360px" />
    <mp-time v-model="noon" use12-hours style="width: 100%; max-width: 360px" />
    <mp-time-picker v-model="noon" use12-hours />
    <span>Model: {{ value }}</span>
  </mp-space>
</template>
```

### Hour/minute/second steps

With 12-hour display and a 5-hour step, hours remain anchored to midnight: 0/5/10/15/20, not restarted at noon. AM offers 12/05/10 and PM offers 03/08. Selecting 03 PM commits 15:30:00 because this Demo retains HH:mm:ss as its model format. Changing the rules preserves the old 09:30:00; cancellation does not commit aligned candidates. Only confirmation writes the selected value. Enable Disable 15:00 to combine disabled-hours with the step: 03 PM is unavailable while 08 PM still means 20:00. Turning off Accept controlled updates records proposals without changing the business value; re-enable it before confirming an accepted value. Proposal counts are not acceptance counts. Other non-dividing steps and physical touch remain separate coverage.

Example source: src/time/example/demos/en-US/step.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const value = ref('09:30:00')
const coarse = ref(false)
const fiveHours = ref(false)
const blockAfternoon = ref(false)
const accept = ref(true)
const proposals = ref(0)
const disabledHours = () => (blockAfternoon.value ? [15] : [])
function update(next) {
  proposals.value++
  if (accept.value) {
    value.value = next
  }
}
const step = computed(() => ({ hour: fiveHours.value ? 5 : 1, minute: coarse.value ? 30 : 15, second: 10 }))
</script>

<template>
  <mp-space class="time-step-demo" direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="fiveHours">12-hour display with a 5-hour step</mp-checkbox>
    <mp-checkbox v-model="coarse">Use 30-minute intervals</mp-checkbox>
    <mp-checkbox v-model="blockAfternoon">Disable 15:00 (03 PM)</mp-checkbox>
    <mp-checkbox v-model="accept">Accept controlled updates</mp-checkbox>
    <p>Confirmation validates the current step. Changing a rule does not change the committed value.</p>
    <mp-time
      :model-value="value"
      format="HH:mm:ss"
      :use12-hours="fiveHours"
      :step="step"
      :disabled-hours="disabledHours"
      style="width: 100%; max-width: 360px"
      @update:model-value="update"
    />
    <span>{{ value }}</span>
    <span role="status">Proposals：{{ proposals }}</span>
  </mp-space>
</template>
```

### Multiple independent fields

The example displays each field's model separately. Cancel discards only the current draft, and clear affects only the current field. Fields do not share models or drafts.

Example source: src/time/example/demos/en-US/multiple-fields.vue

```vue
<script setup>
import { ref } from 'vue'

const lastEvent = ref('—')
const readonly = ref(false)
const start = ref('09:00:00')
const end = ref('18:00:00')
const range = ref(['09:00:00', '18:00:00'])
</script>
<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="readonly">Readonly fields remain focusable</mp-checkbox>
    <mp-input placeholder="Press Enter here: time popups should not open" />
    <small aria-live="polite">{{ lastEvent }}</small>
    <div aria-live="polite">
      <div>Start model: {{ start ?? 'undefined' }}</div>
      <div>End model: {{ end ?? 'undefined' }}</div>
      <div>Range model: {{ range ?? 'undefined' }}</div>
    </div>
    <p>Open and cancel each field in sequence. Drafts remain independent.</p>
    <mp-time
      v-model="start"
      :readonly="readonly"
      format="HH:mm:ss"
      placeholder="Start"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'start: focus'"
      @blur="lastEvent = 'start: blur'"
    />
    <mp-time
      v-model="end"
      :readonly="readonly"
      format="HH:mm:ss"
      placeholder="End"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'end: focus'"
      @blur="lastEvent = 'end: blur'"
    />
    <mp-time-range
      v-model="range"
      :readonly="readonly"
      format="HH:mm:ss"
      style="width: 100%; max-width: 360px"
      @focus="lastEvent = 'range: focus'"
      @blur="lastEvent = 'range: blur'"
    />
  </mp-space>
</template>
```

`format` now has the same meaning as Cedar: it parses string models and controls display and emitted strings. The default is `HH:mm:ss`; with `use12-hours` and no explicit format it is `hh:mm:ss a`. Use `HH:mm` to omit seconds, `hh:mm A` for uppercase AM/PM, and `[Time] HH:mm` for literal text. Models accept formatted strings, local Date objects, or millisecond timestamps; output is always a formatted string (an array for ranges). Invalid input is not normalized or written back. `min`/`max` remain 24-hour `HH:mm[:ss]` strings, and disabled callbacks always receive actual hours 0–23. The old Time `use-seconds` and format enum have been removed, without aliases.

### Model types and literals

Example source: src/time/example/demos/en-US/format-model.vue

```vue
<script setup>
import { ref } from 'vue'

const date = new Date(2026, 8, 23, 13, 5, 9)
const timestamp = ref(date.getTime())
const value = ref(date)
const literal = ref('Time 09:30')
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>Date and timestamp inputs use local time. After selection, the model is a formatted string.</p>
    <mp-time v-model="value" format="hh:mm A" style="width: 100%; max-width: 360px" />
    <span>Current model: {{ value }}</span>
    <mp-time v-model="timestamp" format="HH:mm:ss" style="width: 100%; max-width: 360px" />
    <span>Timestamp model: {{ timestamp }}</span>
    <mp-time v-model="literal" format="[Time] HH:mm" style="width: 100%; max-width: 360px" />
    <span>Literal format: {{ literal }}</span>
  </mp-space>
</template>
```

### Default and controlled values

`defaultValue` initializes uncontrolled fields/panels once; subsequent edits are retained locally. `modelValue` is authoritative when provided. `defaultOpen` initializes field visibility once. Controlled `open` requires the parent to accept `update:open`; `open-change(open: boolean)` reports requests. `clear` has no arguments. Panels support `disabled` for both range endpoints.

Example source: src/time/example/demos/en-US/default-state.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const open = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <p>Uncontrolled initial value</p>
    <mp-time :default-value="'09:00'" format="HH:mm" clearable />
    <p>Controlled value and visibility</p>
    <mp-time v-model="value" v-model:open="open" format="HH:mm" clearable />
    <span>{{ value }} / {{ open }}</span>
  </div>
</template>
```

### Selection and commit

On the mobile trigger, Enter / ArrowDown opens, Space opens on key release, and Escape cancels. Tab requests closure without blocking native navigation; inline uses an anchored popover and outside clicks discard its draft. Keys are scoped to the trigger, not window; composing input and custom interactive controls are ignored.

Field `focus` and `blur` events have no arguments and fire once per transition. Moving between range endpoints stays within one field. Readonly fields remain focusable but cannot open for editing; disabling a focused field releases its focus state and notifies blur.

Fields and standalone panels revalidate the current format, steps and disabled rules at commit time. Cedar text input follows the same rules. Changing constraints does not rewrite committed values. Reversed ranges are accepted only when `show-next-day` is enabled; otherwise a red footer message is shown and confirmation is disabled. Endpoints are never swapped. Clearing commits `undefined` regardless of candidate restrictions, but still respects readonly/disabled state.

`select(value, date)` reports user draft selection; `change(value, date)` reports a committed value. Both single and range fields clear to `undefined`, with an undefined date argument and a no-argument `clear` event. Date arguments represent local clock times (not next-day calendar arithmetic). Fields default to explicit confirmation; `disable-confirm` commits a valid choice immediately and requests close. Range confirmation rejects reversed endpoints unless `show-next-day` is enabled. Controlled `open` still requires parent acceptance. Standalone panels also default to confirmation; disable-confirm commits immediately without closing the panel.

Example source: src/time/example/demos/en-US/selection-events.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('09:00')
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
    <mp-checkbox v-model="readonly">Read-only: focus allowed, edits blocked</mp-checkbox>
    <mp-checkbox v-model="disabled">Disabled: focus released, edits blocked</mp-checkbox>
    <mp-checkbox v-model="immediate">Commit immediately on selection</mp-checkbox>
    <p>Select records drafts. Change records commits. Cancel leaves the model unchanged. Clear returns undefined.</p>
    <mp-time
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
    <span>Model: {{ value === undefined ? 'undefined' : value }}</span>
    <mp-button variant="outline" @click="value = '15:30'">Replace model externally</mp-button>
    <small>External replacement updates the display without emitting select or change.</small>
    <div v-for="(event, index) in events" :key="index" style="overflow-wrap: anywhere">{{ event }}</div>
  </div>
</template>
```

Replacing the model from the parent resets the draft without emitting `select` or `change`. The example includes an external-update button; confirming a user selection remains a separate action.

### Panel confirmation and disabled options

For a pending single-value draft, enabling readonly, hiding disabled hours or switching to immediate mode does not submit the old draft. Unlocking does not submit it either; the next valid selection commits once. Maple wheel updates preserve the same draft without updating the parent model. Mouse/keyboard checks do not establish physical touch-inertia behavior.

Example source: src/time/example/demos/en-US/panel-behavior.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('09:30')
const immediate = ref(false)
const confirmations = ref(0)
const hideDisabled = ref(false)
const readonly = ref(false)
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7]
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%">
    <mp-checkbox v-model="immediate">Commit without confirmation</mp-checkbox>
    <mp-checkbox v-model="hideDisabled">Hide disabled hours (00–07)</mp-checkbox>
    <mp-checkbox v-model="readonly">Read-only (including confirmation)</mp-checkbox>
    <mp-button variant="outline" @click="value = '13:45'">Replace externally with 13:45</mp-button>
    <mp-time-picker
      v-model="value"
      format="HH:mm"
      :disable-confirm="immediate"
      :hide-disabled-options="hideDisabled"
      :readonly="readonly"
      :disabled-hours="disabledHours"
      @confirm="confirmations++"
    >
      <template #extra><p>Changing presentation keeps the draft; extra content uses the same slot.</p></template>
    </mp-time-picker>
    <span>Valid confirmations: {{ confirmations }}</span>
    <span>Committed value: {{ value }}</span>
    <p>With confirmation enabled, selection only changes the draft. The value above changes after confirmation.</p>
  </div>
</template>
```

The standalone panel owns its draft and commit state directly. External model replacement resets the draft without emitting selection or change events. Read-only and disabled states block selection and confirmation. Cedar renders lists; Maple renders wheels. These views do not create a second draft.

### Interaction states

Use this example for selecting a time. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/time/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('09:30')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-time v-model="value" format="HH:mm" v-bind="__demoState"></mp-time>
  </mp-space>
</template>
```

## API

Inline uses a field-anchored popover, positioned bottom-start by default. Wheel panels share one confirmation footer. Explicit popup presentations use the shared field editor shell.

`popup-props` configures the anchored Trigger popover on both platforms. It cannot replace field open/disabled/trigger ownership. Top-level popup-container, including false, takes precedence. Panel and popup options are separate. `click(event)` fires once for an enabled field; readonly fields notify but do not open. Use `open-change(false)` for close requests, not proof that a controlled state changed. The field close event has been removed without an alias.

Use the `suffix-icon` slot with `focus: boolean` and `popupOpen: boolean`. The method `focus(index = 0)` focuses an endpoint without committing; `blur()` blurs and requests closure.

### Field appearance and nested options

hint controls the floating label (Cedar defaults to false, Maple to true) and is suppressed by an outer Form label. line defaults to true; text-color/focus-color/blur-color accept optional color strings. An unset error inherits Form state; explicit false overrides it. TimeRange separator defaults to ` ~ ` and accepts an empty string. Default variants remain Cedar filled and Maple standard; set variant explicitly for matching appearance.

The field owns values, defaults, open state, format, steps, bounds, disabled rules and readonly/disabled state. Set these directly on the field, not inside timePickerProps/timeRangePickerProps. Nested options customize presentation only; model/select/confirm listeners cannot replace the field flow. Types reject owner properties and runtime filtering removes them, even when a top-level constraint is unset.

Maple pickerProps accepts visual options such as optionHeight/optionCount, not columns, fieldNames, selection, toolbar or open state. popupProps accepts positioning, appearance and lifecycle callbacks, but not open/defaultOpen or open-update listeners. Top-level popupContainer (including false) takes priority. Nested options in standalone time panels follow the same ownership rules.

Example source: src/time/example/demos/en-US/field-appearance.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('09:00')
const hint = ref(true)
const error = ref(false)
const line = ref(true)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <mp-checkbox v-model="hint">Floating hint</mp-checkbox>
    <mp-checkbox v-model="error">Explicit error state</mp-checkbox>
    <mp-checkbox v-model="line">Border / underline</mp-checkbox>
    <mp-time
      v-model="value"
      format="HH:mm"
      variant="outline"
      placeholder="Choose time"
      :hint="hint"
      :error="error"
      :line="line"
      focus-color="#6750a4"
    />
    <span>{{ value }}</span>
  </mp-space>
</template>
```

Field interactions use one local controller: select stages a draft; confirmation validates current rules before commit and Form change notification. Clearing uses the commit path with undefined, followed by clear; it is blocked when readonly/disabled or not clearable. Readonly fields remain focusable; repeated focus/blur notifications are deduplicated. A pending controlled close request cannot repeat a commit.

The panel owns one draft and confirmation flow; presentation content only renders that state. The example above counts valid confirmations and shows the extra slot. Reconfirming an unchanged value emits confirm without an extra change event.

### Time bounds

In the single-value Demo, tightening the minimum to 10:30:40 retains committed 10:30:38 and prevents confirmation. Moving the wheel to minute 31 aligns draft seconds to valid candidates. Explicitly select second 02 and confirm to commit the inclusive maximum 10:31:02. Changing the field popup draft to second 00 and canceling retains second 02. Candidate alignment is not an external model commit; mouse/keyboard evidence is not physical-touch inertia testing.

`min` / `max` are optional strings, with no bound by default. Use 24-hour `HH:mm` or `HH:mm:ss`, independently of format/use12Hours. Both endpoints are inclusive; omitted seconds mean 00. Range endpoints are validated individually; showNextDay does not make the bounds wrap across midnight. Reversed bounds allow no commit; unparseable bounds are treated as unset.

Changing bounds does not rewrite the external model. Commits must satisfy bounds, steps and disabled callbacks. Hidden seconds are validated as 00. Coarse list columns are disabled when their whole hour/minute is out of bounds; confirmation validates the complete time. Use hide-disabled-options to hide disabled choices.

Example source: src/time/example/demos/en-US/bounds.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref('10:30:38')
const narrow = ref(false)
</script>

<template>
  <mp-space direction="column" :size="12" style="width: 100%">
    <p>
      Inclusive bounds: 10:30:38–10:31:02. Narrowing the bounds preserves the current model but prevents invalid
      confirmation.
    </p>
    <mp-checkbox v-model="narrow">Move minimum to 10:30:40</mp-checkbox>
    <mp-time v-model="value" format="HH:mm:ss" :min="narrow ? '10:30:40' : '10:30:38'" max="10:31:02" />
    <mp-time-picker v-model="value" format="HH:mm:ss" :min="narrow ? '10:30:40' : '10:30:38'" max="10:31:02" />
    <span>{{ value }}</span>
  </mp-space>
</template>
```

### Pure panel events and slots

TimePicker / TimeRangePicker own drafts, not fields or popups. Pass open, size, variant, clearing and popup options to Time / TimeRange.

- `select(value, date)` reports draft selections.
- `change(value, date)` and model updates occur only when a valid commit changes the value.
- `confirm(value, date)` fires on every valid confirmation, including unchanged values and immediate commits with disableConfirm. Invalid, disabled or readonly commits do not emit it.
- `extra` adds supporting content.
- `actions({ confirm, canConfirm, value })` replaces the default actions. value is the draft; call confirm() to commit and disable the button when canConfirm is false.

Single values are formatted strings and Dates; range values are arrays. Pure panels do not emit open-change, update:open or clear.

The field uses independently copied PickerField → FieldDecorator layers. Panels edit a draft; Confirm commits, Cancel/dismiss discards, and Clear commits an empty value and closes the popup. Mobile fields do not open the software keyboard. See the Date field-protocol demo for all four field types.

### Props

| Prop                | Description                                             | Type                         | Default    |
| ------------------- | ------------------------------------------------------- | ---------------------------- | ---------- |
| `v-model` | Model value | _TimeValue_ | `-` |
| `default-value` | Initial uncontrolled value | _TimeValue_ | `-` |
| `open`              | Controlled popup visibility                             | _boolean_                    | `-`        |
| `default-open` | Initial visibility | _boolean_ | `false` |
| `disable-confirm` | Commit a valid choice immediately and request close | _boolean_ | `false` |
| `show-now-button` | Show Now; stage the current time until confirmation | _boolean_ | `true` |
| `format` | String parse, display and output format | _string_ | `HH:mm:ss` |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | _boolean_ | `false` |
| `step` | Candidate steps anchored at midnight; invalid values use 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |
| `min`               | Minimum time                                            | _string_                     | `-`        |
| `max`               | Maximum time                                            | _string_                     | `-`        |
| `disabled-hours` | Disabled hours (0–23) | `() => number[]` | `-` |
| `disabled-minutes` | Disabled minutes for the hour | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | Disabled seconds for the hour and minute | `(hour?: number, minute?: number) => number[]` | `-` |
| `time-picker-props` | Props passed to `mp-time-picker`                        | _Partial\<TimePickerProps\>_ | `{}`       |
| `picker-props`      | Props passed to `mp-picker`                             | _Partial\<PickerProps\>_     | `{}`       |
| `popup-props`       | Props passed to popup                                   | _Partial\<TriggerProps\>_      | `{}`       |
| `input-editable` | Allow text entry; panel selection remains available | _boolean_ | `false` |
| `placeholder`       | Placeholder                                             | _string_                     | `-`        |
| `clearable`         | Show clear button                                       | _boolean_                    | `false`    |
| `disabled`          | Disabled                                                | _boolean_                    | `false`    |
| `readonly`          | Readonly                                                | _boolean_                    | `false`    |
| `size`              | Size: `xs` `sm` `md` `lg` `xl`                          | _ComponentSize_              | `md`       |
| `variant`           | Variant: `filled` `standard` `outline`                 | _string_                     | `standard` |

### Events

| Event    | Description               | Arguments      |
| -------- | ------------------------- | -------------- |
| `focus`  | Emitted on focus          | `-`            |
| `blur`   | Emitted on blur           | `-`            |
| `click`  | Emitted on click          | `event: Event` |
| `clear` | Cleared | `-` |
| `open-change` | Visibility request | _open: boolean_ |
| `click` | Enabled field click (including readonly) | `event: Event` |
| `change` | Committed value | _value: string \| undefined, date: Date \| undefined_ |
| `select` | User draft selection | _value: string, date: Date_ |

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
| `suffix-icon` | Field icon       | `focus: boolean, popupOpen: boolean` |

### Type Definitions

```ts
type TimeDisabledRules = {
  disabledHours?: () => number[]
  disabledMinutes?: (hour?: number) => number[]
  disabledSeconds?: (hour?: number, minute?: number) => number[]
}
```

## TimePicker

> 源码已并入 `time/`，安装父组件时一并注册。静态成员：`Time.Picker`。

### Intro

Form field: [`Time`](time.md). Time range field: [`TimeRange`](time-range.md). Time range panel: [`TimeRangePicker`](../../en-US/time-range-picker).

### Basic Usage

Example source: src/time/example/demos/en-US/picker-basic.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('11:20')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm" />
</template>
```

### 24hr Format

Use `format="HH:mm"` for hour and minute precision.

Example source: src/time/example/demos/en-US/picker-hour24.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('15:20')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm" />
</template>
```

### Show Seconds

Use `format="HH:mm:ss"` to include seconds.

Example source: src/time/example/demos/en-US/picker-seconds.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('17:36:22')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm:ss" />
</template>
```

### Readonly

Example source: src/time/example/demos/en-US/picker-readonly.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('07:10')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm" readonly />
</template>
```

### Time Limit

Use inclusive min/max bounds together with the three disabled callbacks in both clock and wheel modes.

Example source: src/time/example/demos/en-US/picker-limit.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('10:30:40')

const disabledHours = () => Array.from({ length: 24 }, (_, hour) => hour).filter((hour) => hour % 2 !== 0)
const disabledMinutes = (hour) => (hour === 10 ? [0, 15, 45] : [])
const disabledSeconds = (hour, minute) => (hour === 10 && minute === 30 ? [41, 43, 45] : [])
</script>

<template>
  <section class="wheel-boundary-demo">
    <p>Wheel mode: 10:30:38–18:40:22 inclusive, combined with disabled rules.</p>
    <mp-time-picker
      v-model="date"
      format="HH:mm:ss"
      min="10:30:38"
      max="18:40:22"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
    />
    <p role="status">Model: {{ date }}</p>
  </section>
</template>
```

### Actions Slots

Example source: src/time/example/demos/en-US/picker-actions.vue

```vue
<script setup>
import { ref } from 'vue'

const date = ref('17:36')
</script>

<template>
  <mp-time-picker v-model="date" format="HH:mm">
    <template #actions="{ confirm, canConfirm, selectNow, nowDisabled }">
      <mp-button variant="text" :disabled="nowDisabled" @click="selectNow">Now</mp-button>
      <mp-button status="primary" variant="text" :disabled="!canConfirm" @click="confirm">Confirm</mp-button>
    </template>
  </mp-time-picker>
  <p>Confirmed: {{ date }}</p>
</template>
```

### API

Panel prop `disable-confirm: boolean = false` skips confirmation. When replacing the actions slot, call its confirm() function and use canConfirm to disable invalid submission.

### Props

| Prop            | Description                                                                                                        | Type                          | Default       |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ------------- |
| `v-model` | Model value | _TimeValue_ | `-` |
| `default-value` | Initial uncontrolled value | _TimeValue_ | `-` |
| `disabled` | Disable panel editing | _boolean_ | `false` |
| `disable-confirm` | Commit immediately without a confirmation button | _boolean_ | `false` |
| `show-now-button` | Show Now; stage the current time until confirmation | _boolean_ | `true` |
| `picker-props`  | Props passed to `Picker` in column-wheel mode                                                                      | _object_                      | `-`           |
| `format` | String parse, display and output format | _string_ | `HH:mm:ss` |
| `elevation`     | Elevation level, options `true` `false` and level of `0-24`                                                        | _number \| boolean_ | `false`       |
| `min`           | Minimum allowed time (ISO 8601 format)                                                                             | _string_                      | `-`           |
| `max`           | Maximum allowed time (ISO 8601 format)                                                                             | _string_                      | `-`           |
| `disabled-hours` | Disabled hours (0–23) | `() => number[]` | `-` |
| `disabled-minutes` | Disabled minutes for the hour | `(hour?: number) => number[]` | `-` |
| `disabled-seconds` | Disabled seconds for the hour and minute | `(hour?: number, minute?: number) => number[]` | `-` |
| `readonly`      | Readonly                                                                                                           | _boolean_                     | `false`       |
| `use12-hours` | Twelve-hour panel; defaults to hh:mm:ss a without an explicit format | _boolean_ | `false` |
| `step` | Candidate steps anchored at midnight; invalid values use 1 | `{ hour?: number; minute?: number; second?: number }` | `{ hour: 1, minute: 1, second: 1 }` |

### Disabled rules

Clock and wheel use the same three callbacks returning disabled values. Hours always use 0–23. Wheel parents without selectable descendants are excluded.

### Events

| Event    | Description                | arguments       |
| -------- | -------------------------- | --------------- |
| `change` | Committed value | _value: string \| undefined, date: Date \| undefined_ |
| `select` | User draft selection | _value: string, date: Date_ |

### slots

| Name      | Description                          | SlotProps |
| --------- | ------------------------------------ | --------- |
| `actions` | Replace panel actions | _{ confirm: () => void, canConfirm: boolean, value, selectNow: () => boolean, nowDisabled: boolean }_ |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                                             | Default                     |
| ---------------------------------------------------- | --------------------------- |
| `--time-picker-border-radius`                        | `4px`                       |
| `--time-picker-font-size`                            | `var(--font-size-md)`       |
| `--time-picker-min-width`                            | `290px`                     |
| `--time-picker-body-background`                      | `#fff`                      |
| `--time-picker-actions-padding`                      | `0 8px 12px 8px`            |

### Value type

```ts
export type TimeValue = string | number | Date
```

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `popup`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Inline keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `presentation` controls the field container. Standalone pickers keep their existing content `presentation`.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### Shared mobile panel style

Mobile wheels use a rounded selection band and omit the top summary for single time selection. Fields and standalone panels share the style.

For single time selection, Now appears to the left of Confirm and updates only the draft using the current format, step and disabled rules. It neither commits nor closes the popup. Even with `disable-confirm`, Now and subsequent wheel edits require explicit confirmation; cancelling discards the draft. Set `:show-now-button="false"` to hide it. Custom `actions` slots can use `selectNow()` and `nowDisabled` to render this action.

Column headings above the wheel follow the visible hour, minute and second units, with AM/PM for twelve-hour formats, matching the time range panel.

Panel style variables:

| Token | Default |
| --- | --- |
| `--mp-temporal-panel-inset` | `12px` |
| `--mp-temporal-panel-column-label-height` | `36px` |
| `--mp-temporal-panel-column-label-font-size` | `13px` |
| `--mp-temporal-panel-radius` | `12px` |
| `--mp-time-picker-column-label-height` | `var(--mp-temporal-panel-column-label-height)` |
| `--mp-temporal-panel-group-gap` | `24px` |
| `--mp-temporal-panel-touch-height` | `44px` |
| `--mp-temporal-panel-summary-background` | `var(--mp-color-fill-1)` |
| `--mp-temporal-panel-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-temporal-panel-active-background` | `color-mix(in srgb, var(--mp-color-primary) 8%, transparent)` |


## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.

## Visible wheel fields

`time-fields` controls time columns and their order on fields and standalone panels. Range endpoints share the configuration.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `time-fields` | readonly TimePickerField[] | hour, minute, second | Controls time wheels, including those embedded in calendars. |

Lists must be nonempty and unique. Explicit lists determine columns and order; only omitted props use defaults. Date and time fields cannot be mixed. Edits preserve hidden units in the full draft. Changing fields does not submit the model. Nested presentation props cannot override root field configuration.

Time format retains its string parsing/display/output protocol. time-fields changes columns only and retains hidden units represented in the model. Twelve-hour hour columns automatically include AM/PM.

Example source: src/time/example/demos/time-fields.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TimePickerField } from '../../picker-props'

const props = defineProps<{ range?: boolean; english?: boolean }>()
const preset = ref('hour-minute')
const fields = computed<TimePickerField[]>(() =>
  preset.value === 'minute-hour' ? ['minute', 'hour'] : preset.value === 'second' ? ['second'] : ['hour', 'minute'],
)
const time = ref('09:30:17')
const times = ref(['09:30:17', '18:00:23'])
</script>
<template>
  <mp-space direction="column">
    <mp-select
      v-model="preset"
      :clearable="false"
      :aria-label="english ? 'Visible wheel fields' : '滚轮可见字段'"
      :options="[
        { label: english ? 'Hour / minute' : '时 / 分', value: 'hour-minute' },
        { label: english ? 'Minute / hour' : '分 / 时', value: 'minute-hour' },
        { label: english ? 'Second only' : '仅秒', value: 'second' },
      ]"
    />
    <mp-time-range v-if="props.range" v-model="times" :time-fields="fields" format="HH:mm:ss" />
    <mp-time v-else v-model="time" :time-fields="fields" format="HH:mm:ss" />
    <p>{{ english ? 'Hidden fields retain their values:' : '隐藏字段保留原值：' }} {{ props.range ? times : time }}</p>
  </mp-space>
</template>
```
