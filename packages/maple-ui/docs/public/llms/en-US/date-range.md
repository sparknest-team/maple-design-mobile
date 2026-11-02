<!-- Source: src/date-range/docs/en-US.md; locale: en-US; page: /en-US/date-range -->

# DateRange

Endpoint locks are provided reactively by the local mobile presentation adapter to calendars and wheels. Inherited and current locks are merged and remain intact when switching views or unlocking the other endpoint. The shared draft/confirmation owner has no mobile injection dependency; external model updates and confirm/cancel behavior are unchanged.

## Examples

Floating panels use the visual viewport instead of a half-screen cap. A full calendar is visible when space permits; short windows scroll content while keeping actions visible. Override `--mp-date-picker-popover-max-height` to cap the panel (default `100dvh - 32px`). Switching back to default/Maple removes brand overrides.

### Cross-month, DST and endpoint locks

Example source: src/date-range/example/demos/en-US/zoned-range.vue

```vue
<script setup>
import Demo from '../zoned-range.vue'
</script>
<template><Demo english /></template>
```

### Basic Usage

Keep both start/end summaries at the top; click either to switch the edited endpoint. The lower summary shows the current endpoint. Each opening selects the start endpoint (or the end when only the start is locked) and returns the calendar to the start date when available, clamped to date bounds; explicitly controlled picker-value remains owned by the caller. Confirm changes the edited endpoint and cancel preserves committed values.

Summary blocks have no visible start/end captions. The active endpoint is highlighted. Summary buttons and the footer view button support Tab, Enter and Space, with `aria-pressed` indicating selection. Switching views does not commit; cancel restores committed values.

Example source: src/date-range/example/demos/en-US/basic-usage.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="range" placeholder="Select a date range" clearable />
  </mp-space>
</template>
```

### Disabled

Example source: src/date-range/example/demos/en-US/disabled.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const disabledRange = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="disabledRange" disabled />
  </mp-space>
</template>
```

### Rejected controlled close

The parent may reject a close request and keep the range panel open. Repeating confirmation of one selection neither submits nor requests another close. Changing an endpoint starts a new confirmation transaction. In calendar mode, the first click chooses a new start and the second chooses the end; an equal controlled-array rerender preserves the first click.

Example source: src/date-range/example/demos/en-US/rejected-close.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['2026-09-22', '2026-09-24'])
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
      The parent rejects close requests. Changing the range starts a new confirmation; repeated confirmation does not
      submit twice.
    </p>
    <mp-date-range v-model="value" :open="open" panel-type="calendar" @update:open="requestOpen" @change="commits++" />
    <span data-test="date-range-transaction-state"
      >Value: {{ value.join(' ~ ') }}; commits: {{ commits }}; rejected closes: {{ closeRequests }}</span
    >
    <mp-button @click="open = false">Allow close</mp-button>
  </div>
</template>
```

### Date value formats

Both libraries independently copy the same value, validation and transaction logic. Year/month/date model formats default to `YYYY`, `YYYY-MM`, `YYYY-MM-DD`; date-time defaults to seconds. Set `time-fields="['hour', 'minute']"` for minute precision. `format` controls labels; `value-format` controls models, supporting custom formats, `Date` and `timestamp`. Maple provides year/month/date calendar, wheel presentations; week/quarter remain Cedar presentation capabilities.

### Intro

Form date-range **field** that opens DateRangePicker. Range panel demos are included below on this page; there is no separate date-range-picker documentation route. Same interaction as `Date`: Cancel discards draft; Confirm writes `v-model`.

- Uses the calendar by default; `panel-type="picker"` selects date columns.
- `panel-type="calendar"`: calendar panel
- `show-time`: a half-hour quick time Picker beside the calendar and a footer button for detailed time columns.

### Calendar Mode

Fields also support Picker wheels. Use `panel-type="calendar | picker"` to switch content; the example also supports date-time ranges. Field `presentation` selects the container. Empty calendar summaries display “Select start / Select end”; both valid endpoints are required to confirm.

Example source: src/date-range/example/demos/en-US/calendar-mode.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const mode = ref('calendar')
const showTime = ref(false)
const hideYear = ref(false)
const dateFields = computed(() => hideYear.value ? ['month', 'day'] : ['year', 'month', 'day'])
const dateRange = ref([])
const dateTimeRange = ref([])
const range = computed({
  get: () => (showTime.value ? dateTimeRange.value : dateRange.value),
  set: (value) => {
    if (showTime.value) {
      dateTimeRange.value = value
    } else {
      dateRange.value = value
    }
  },
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-select
      v-model="mode"
      :clearable="false"
      aria-label="Selection mode"
      :options="[
        { label: 'Calendar selection', value: 'calendar' },
        { label: 'Column selection', value: 'picker' },
      ]"
    />
    <mp-space align="center">
      <span>Include time</span>
      <mp-switch v-model="showTime" aria-label="Include time" />
    </mp-space>
    <mp-space v-if="mode === 'picker'" align="center">
      <span>Hide year column</span>
      <mp-switch v-model="hideYear" aria-label="Hide year column" />
    </mp-space>
    <p>
      Switch between calendar and wheels; enable time to compare date-time ranges. Selections are kept when switching
      modes.
    </p>
    <mp-date-range
      v-model="range"
      :date-fields="dateFields"
      :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm"
      :panel-type="mode"
      :show-time="showTime"
      :disable-confirm="false"
    />
  </mp-space>
</template>
```

Picker wheels stage missing endpoints when opened and show the candidate dates in the summaries, so confirmation does not require scrolling first. An empty range starts at the same valid date/time; a missing endpoint prefers the existing endpoint. Bounds, disabled rules and endpoint locks remain enforced. Without a valid candidate, confirmation stays disabled. Initialization emits no select/change/model events: Confirm saves the draft and Cancel discards it. Returning to the calendar keeps the draft.

Field `presentation` selects the `inline` / `popup` container; `panel-type` selects `calendar` / `picker` content. Standalone `DateRangePicker` keeps `presentation` for its content mode.

### Date Time

Example source: src/date-range/example/demos/en-US/date-time.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const dateTimeRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range
      v-model="dateTimeRange"
      show-time
      :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm"
      placeholder="Select date and time range"
      clearable
    />
  </mp-space>
</template>
```

### Type

Example source: src/date-range/example/demos/en-US/type.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const yearRange = ref([])
const monthRange = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="yearRange" type="year" placeholder="Select a year range" clearable />
    <mp-date-range v-model="monthRange" type="month" placeholder="Select a month range" clearable />
  </mp-space>
</template>
```

### Custom Separator

Example source: src/date-range/example/demos/en-US/separator.vue

```vue
<script setup>
import { reactive, ref } from 'vue'

const range = ref([])
const customSeparator = ref([])
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-date-range v-model="customSeparator" separator=" to " placeholder="Custom separator" clearable />
  </mp-space>
</template>
```

### With FormItem

Example source: src/date-range/example/demos/en-US/with-form-item.vue

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
      <mp-form-item field="period" label="Period" required>
        <mp-date-range v-model="formData.period" placeholder="Select" clearable />
      </mp-form-item>
    </mp-form>
  </mp-space>
</template>
```

### Bounds and endpoint rules

On mobile, you can adjust the end date independently. Confirm commits the range; Cancel discards the draft. This demo allows September only and disables Sundays for the end date.

Example source: src/date-range/example/demos/en-US/boundaries.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['2026/09/10', '2026/09/15'])
const disabledDate = (date: Date, side: 'start' | 'end') => side === 'end' && date.getDay() === 0
</script>
<template>
  <div class="date-contract-demo">
    <mp-date-range
      v-model="value"
      value-format="YYYY/MM/DD"
      format="DD-MM-YYYY"
      min="2026/09/01"
      max="2026/09/30"
      :disabled-date="disabledDate"
    />
    <p>September only; Sundays cannot be the end date. Confirm commits; cancel discards the draft.</p>
    <output>{{ value }}</output>
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

### Endpoint locks

Locking both endpoints does not block parent model updates, but dates and confirmation stay disabled. Unlocking the start afterward restores editing without submitting. Choosing 16 and confirming retains the new end 22 rather than restoring the old end 15.

“External range 18~22” updates the parent model directly: the pending draft synchronizes and the locked endpoint uses the new model as its baseline. This update adds no selection or confirmation events. Choosing 24 and confirming then commits 18~24, without restoring the old start.

Locking an endpoint after editing its draft does not authorize that draft to replace the committed endpoint. Confirmation stays disabled while that locked draft differs from the model. Unlocking preserves the draft and restores confirmation, but does not itself submit; explicitly confirm to commit.

An inverted candidate that would move a locked endpoint must be rejected before it changes a nested calendar draft. The committed range and displayed draft remain unchanged; a subsequent valid choice can still be confirmed. Range sorting must never silently relocate a locked endpoint.

This demo explicitly sets disable-confirm=false. With one locked endpoint, a single date choice edits only the unlocked endpoint instead of starting a new two-click range. With both locked, date candidates expose disabled semantics and confirmation is unavailable; unlocking restores editing without submitting.

Use disabled=[startLocked, endLocked] to retain a committed endpoint while editing the other draft. Confirmation writes the model; changing locks alone does not submit. Locking both endpoints blocks selection. This standalone panel does not demonstrate popup cancellation.

Example source: src/date-range/example/demos/en-US/endpoint-lock.vue

```vue
<script setup>
import { ref } from 'vue'

const value = ref(['2026-09-10', '2026-09-15'])
const lockStart = ref(true)
const lockEnd = ref(false)
const confirms = ref(0)
const selections = ref(0)
</script>

<template>
  <section class="date-range-lock-demo">
    <p>
      Local dates: lock one endpoint, edit the other and confirm. Locking both endpoints blocks selection. Lock changes
      do not submit drafts.
    </p>
    <mp-checkbox v-model="lockStart">Lock start</mp-checkbox>
    <mp-checkbox v-model="lockEnd">Lock end</mp-checkbox>
    <mp-button html-type="button" @click="value = ['2026-09-18', '2026-09-22']">External range 18~22</mp-button>
    <mp-date-range-picker
      v-model="value"
      presentation="calendar"
      :disable-confirm="false"
      :disabled="[lockStart, lockEnd]"
      @select="selections++"
      @confirm="confirms++"
    />
    <p role="status">Selections：{{ selections }}；Confirmations：{{ confirms }}</p>
    <output>{{ value }}</output>
  </section>
</template>
```

### Appearance combinations

Use this example for booking and query date ranges. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/date-range/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(['2026-10-23', '2026-10-25'])
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
    <mp-date-range v-model="value" value-format="YYYY-MM-DD" v-bind="__demoAppearance"></mp-date-range>
  </mp-space>
</template>
```

### Interaction states

Use this example for booking and query date ranges. Adjust read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/date-range/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(['2026-10-23', '2026-10-25'])
const __demoState = __demoReactive({ readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-date-range v-model="value" value-format="YYYY-MM-DD" v-bind="__demoState"></mp-date-range>
  </mp-space>
</template>
```

### String models: date, month and month/day ranges

`format` controls display; `value-format` controls the model and emitted value. The examples produce `"2026-09-10"`, `"2026-09"` and `["09-10", "10-10"]` directly. `MM-DD` has no year and parsing uses the current year; it cannot express cross-year ordering or a leap day in a specific year. For those cases retain `YYYY-MM-DD` and map the submitted payload in application code. The default calendar remains page mode and the default timezone remains browser-local.

Example source: src/date-range/example/demos/en-US/string-values.vue

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

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

### Shared rules and events

`DateValue = Date | string | number`. Invalid dates and incomplete/reversed ranges cannot be committed. Boundaries are inclusive and use `value-format`; Date or timestamp boundaries are also accepted. Rules are rechecked at confirmation. `disabledTime` returns `disabledHours()`, `disabledMinutes(hour)` and `disabledSeconds(hour, minute)` number lists. Pure panels emit `confirm` after validation; field open state uses `update:open` / `open-change`, not `close`. Nested panel/popup props configure presentation only and cannot override models, rules or ownership listeners. Range `disabled` accepts `[startDisabled, endDisabled]`; a locked endpoint cannot be cleared or modified.

The field uses independently copied PickerField → FieldDecorator layers. Panels edit a draft; Confirm commits, Cancel/dismiss discards, and Clear commits an empty value and closes the popup. DateRange enables text entry by default; set `input-editable=false` for panel-only selection. See the Date field-protocol demo for all four field types.

### Props

| Prop                      | Description                                                       | Type                              | Default    |
| ------------------------- | ----------------------------------------------------------------- | --------------------------------- | ---------- |
| `model-value` | Controlled value | DateValue[] | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue[] | `undefined` |
| `input-editable` | Allow text entry; function format/multiple stays readonly | boolean | true |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `open`                    | Controlled popup visibility                                       | _boolean_                         | `-`        |
| `default-open` | Uncontrolled initial open state | boolean | false |
| `popup-container` | Popup mount target | string / HTMLElement / (() => HTMLElement) / false | — |
| `panel-type`            | Panel mode: `calendar` `picker`                                   | _string_                          | `calendar`   |
| `type`                    | Picker type: `year` `month` `date`                                | _string_                          | `date`     |
| `show-time`               | Enable time selection                                             | _boolean_                         | `false`    |
| `min`                     | Minimum date                                                      | DateValue                          | `-`        |
| `max`                     | Maximum date                                                      | DateValue                          | `-`        |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `separator`               | Display separator                                                 | _string_                          | `~`        |
| `date-picker-props`       | Appearance options for the internal calendar (allowlist)                             | _DateRangeCalendarOptions_      | `{}`       |
| `picker-props`            | Props for `mp-picker` (picker)                                    | _DateWheelOptions_          | `{}`       |
| `date-range-picker-props` | Props for `mp-date-range-picker`                                  | _DateRangePickerOptions_ | `{}`       |
| `popup-props`             | Props passed to popup                                             | _Partial\<PopupProps\>_           | `{}`       |
| `placeholder`             | Placeholder                                                       | _string_                          | `-`        |
| `clearable`               | Show clear button                                                 | _boolean_                         | `true`    |
| `disabled` | Disable all or individual endpoints | boolean / boolean[] | false |
| `readonly`                | Readonly                                                          | _boolean_                         | `false`    |
| `size`                    | Size: `xs` `sm` `md` `lg` `xl`                                    | _ComponentSize_                   | `md`       |
| `variant`                 | Variant: `filled` `standard` `outline`                           | _string_                          | `standard` |

### Events

| Event    | Description               | Arguments         |
| -------- | ------------------------- | ----------------- |
| `focus`  | Emitted on focus          | `-`               |
| `blur`   | Emitted on blur           | `-`               |
| `click`  | Emitted on click          | `event: Event`    |
| `clear` | Cleared: undefined for single, [] for multiple/range | — |
| `open-change` | Open-state change | open: boolean |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Methods

| Method  | Description     | Arguments | Return |
| ------- | --------------- | --------- | ------ |
| `focus` | Focus the field | `-`       | `-`    |
| `blur`  | Blur the field  | `-`       | `-`    |

### Field and embedded panel

Fields own input and popup state; panels embed directly. day-start-of-week accepts integer 0–6 (Sunday=0), with reactive range-calendar updates. Nested Options configure presentation only, not values, formats, bounds or disabled rules.

The “disable day 20 as the end” switch changes `disabled-date` dynamically. A pending 10–20 range cannot commit while blocked; the committed model stays unchanged. Unblocking only restores confirmation eligibility, without committing. Day 20 remains valid as the start.

Example source: src/date-range/example/demos/en-US/entry-boundary.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@maple-design/ui'

const limited = ref(true)
const blockEnd20 = ref(false)
const disabledEnd = (date: Date, side: 'start' | 'end') => side === 'end' && blockEnd20.value && date.getDate() === 20
const fieldValue = ref<DateValue[]>(['2025-02-12', '2025-02-14'])
const panelValue = ref<DateValue[]>(['2025-02-12', '2025-02-14'])
const week = ref<0 | 1 | 6>(1)
</script>

<template>
  <div class="entry-demo">
    <p>Limit selectable dates to February 2025; removing limits does not change the existing selection.</p>
    <mp-button @click="limited = !limited">{{ limited ? 'Remove limits' : 'Apply limits' }}</mp-button>
    <p>Switch the first weekday: headers and date columns update together, without changing the selection.</p>
    <mp-space wrap>
      <mp-button @click="week = 0">Sunday first</mp-button>
      <mp-button @click="week = 1">Monday first</mp-button>
      <mp-button @click="week = 6">Saturday first</mp-button>
    </mp-space>
    <div>
      <p>Range field: input, popup and confirmation ownership.</p>
      <mp-date-range
        v-model="fieldValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        panel-type="calendar"
        :date-range-picker-props="{ dayStartOfWeek: week }"
      />
    </div>
    <div>
      <p>Range panel: the selected first weekday; confirm to commit.</p>
      <mp-checkbox v-model="blockEnd20">Disable day 20 as the end (keep the committed value)</mp-checkbox>
      <mp-date-range-picker
        v-model="panelValue"
        :min="limited ? '2025-02-01' : undefined"
        :max="limited ? '2025-02-28' : undefined"
        presentation="calendar"
        :day-start-of-week="week"
        :disable-confirm="false"
        :disabled-date="disabledEnd"
      >
        <template #actions="{ confirm, disabled }">
          <mp-button :disabled="disabled" @click="confirm">Commit range</mp-button>
        </template>
      </mp-date-range-picker>
      <p>Committed: {{ panelValue.join(' ~ ') }}</p>
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

## DateRangePicker

The embedded example calls `confirm` from the `actions` slot and binds its `disabled` state to the submit button. Selecting a draft does not update the committed value until confirmation. Tightening bounds does not clear the existing model, but an invalid draft cannot be submitted; choose valid endpoints to submit again.
Pure panels do not accept open/default-open, popup-container, placement, trigger-props, placeholder, variant or clearable. disable-confirm controls confirmation; actions receives { confirm, disabled }. Panels support independent app.use installation. Root and date/date-range subpaths export components, Props, Instance, Type, Options and Emits; no standalone date-picker/date-range-picker npm subpath exists.

> 源码已并入 `date-range/`，安装父组件时一并注册。静态成员：`DateRange.Picker`。

### Intro

Date range selection **panel**. Embed alone when you only need the panel.

The top summary displays start and end values in separate background blocks without captions or a chevron. Clicking a summary selects and highlights the endpoint. Existing endpoints navigate to their date; empty endpoints preserve the current calendar viewport.

- Default `calendarPicker` (`calendar` also applies): a single-selection calendar highlights only the active endpoint, without range bands. A half-hour quick time Picker appears on the right when `show-time` is enabled.
- `presentation="picker"`: date columns for the selected endpoint, using 1/2/3 columns for year/month/date.
- The footer shows the current endpoint label and date. With time enabled, its right side shows the time and a clock button. The button opens the detailed time Picker and changes to a calendar icon for returning to the date view.
- Detailed time uses 2 columns without seconds or 3 with seconds, with matching unit labels. Endpoint switching preserves the view and the other endpoint. Viewing or switching does not round or commit a time.
- Date-only ranges hide the quick time Picker and view button.

Form field: [`DateRange`](date-range.md). Single date panel: [`DatePicker`](../../en-US/date-picker).

### Basic Usage

Example source: src/date-range/example/demos/en-US/picker-basic.vue

```vue
<script setup>
import { ref } from 'vue'

const range = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-date-range-picker v-model="range" />
</template>
```

### Calendar Mode

Standalone panels use `presentation="calendar | picker"` to switch between calendar and wheels. The example also supports date-time ranges. Switching content modes preserves the selection; date and date-time selections are stored separately.

Example source: src/date-range/example/demos/en-US/picker-calendar.vue

```vue
<script setup>
import { computed, ref } from 'vue'

const mode = ref('calendar')
const showTime = ref(false)
const hideYear = ref(false)
const dateFields = computed(() => hideYear.value ? ['month', 'day'] : ['year', 'month', 'day'])
const dateRange = ref([])
const dateTimeRange = ref([])
const range = computed({
  get: () => (showTime.value ? dateTimeRange.value : dateRange.value),
  set: (value) => {
    if (showTime.value) {
      dateTimeRange.value = value
    } else {
      dateRange.value = value
    }
  },
})
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-select
      v-model="mode"
      :clearable="false"
      aria-label="Selection mode"
      :options="[
        { label: 'Calendar selection', value: 'calendar' },
        { label: 'Column selection', value: 'picker' },
      ]"
    />
    <mp-space align="center">
      <span>Include time</span>
      <mp-switch v-model="showTime" aria-label="Include time" />
    </mp-space>
    <mp-space v-if="mode === 'picker'" align="center">
      <span>Hide year column</span>
      <mp-switch v-model="hideYear" aria-label="Hide year column" />
    </mp-space>
    <p>
      Switch between calendar and wheels; enable time to compare date-time ranges. Selections are kept when switching
      modes.
    </p>
    <mp-date-range-picker
      v-model="range"
      :date-fields="dateFields"
      :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm"
      :presentation="mode"
      :show-time="showTime"
      :disable-confirm="false"
    />
  </mp-space>
</template>
```

### Date Time Range

Example source: src/date-range/example/demos/en-US/picker-date-time.vue

```vue
<script setup>
import { ref } from 'vue'

const calendarPicker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
const seconds = ref(['2025-01-15 10:29:30', '2025-01-16 11:29:45'])
const picker = ref(['2025-01-15 10:29', '2025-01-16 11:29'])
</script>

<template>
  <mp-date-range-picker v-model="calendarPicker" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" presentation="calendarPicker" />
  <mp-date-range-picker v-model="seconds" show-time :time-fields="['hour', 'minute', 'second']" presentation="calendarPicker" />
  <mp-date-range-picker v-model="picker" show-time :time-fields="['hour', 'minute']" format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DD HH:mm" presentation="picker" />
</template>
```

### Year / Month Range

Example source: src/date-range/example/demos/en-US/picker-type.vue

```vue
<script setup>
import { ref } from 'vue'

const yearRange = ref(['2020', '2024'])
const monthRange = ref(['2024-01', '2024-06'])
</script>

<template>
  <mp-date-range-picker v-model="yearRange" presentation="picker" type="year" />
  <mp-date-range-picker v-model="monthRange" presentation="picker" type="month" />
</template>
```

### Readonly

Example source: src/date-range/example/demos/en-US/picker-readonly.vue

```vue
<script setup>
import { ref } from 'vue'

const range = ref(['2024-01-01', '2024-01-15'])
</script>

<template>
  <mp-date-range-picker v-model="range" readonly />
</template>
```

### API

### Props

| Prop                | Description                                                       | Type                          | Default  |
| ------------------- | ----------------------------------------------------------------- | ----------------------------- | -------- |
| `model-value` | Controlled value | DateValue[] | `undefined` |
| `default-value` | Uncontrolled initial value, read once | DateValue[] | `undefined` |
| `format` | Display format or formatter | string / (date: Date) => string | — |
| `value-format` | Model format, Date or timestamp | string | — |
| `disable-confirm` | Commit immediately | boolean | field: false; panel: true |
| `presentation`      | Panel mode: `calendar` `picker` `calendarPicker`  | _string_                      | `calendarPicker` |
| `type`              | Selection type: `date` `month` `year`                             | _string_                      | `date`   |
| `day-start-of-week` | First weekday for calendar presentation (integer 0–6) | _DateWeekStart_ | `0` |
| `show-time`         | Enable time selection                                             | _boolean_                     | `false`  |
| `min`               | Minimum date                                                      | DateValue                      | `-`      |
| `max`               | Maximum date                                                      | DateValue                      | `-`      |
| `disabled-date` | true disables; side is start or end | (date: Date, side: DateSide) => boolean | — |
| `disabled-time` | Disabled time lists for this date and endpoint | (date: Date, side: DateSide) => DateDisabledTime | — |
| `date-picker-props` | Appearance options for the internal calendar (allowlist)                             | _DateRangeCalendarOptions_  | `{}`     |
| `picker-props`      | Props for `mp-picker` (picker)                                    | _DateWheelOptions_      | `{}`     |
| `readonly`          | Whether readonly                                                  | _boolean_                     | `false`  |
| `elevation`         | Elevation                                                         | _number \| boolean_ | `false`  |

### Events

| Event    | Description                    | Arguments         |
| -------- | ------------------------------ | ----------------- |
| `change` | Validated value committed | value, date(s), formatted text(s) |
| `select` | Draft selected, not necessarily committed | value, date(s), formatted text(s) |

### Slots

| Slot      | Description          | Arguments |
| --------- | -------------------- | --------- |
| `actions` | Custom actions panel | `-`       |

### Style Variables

| Variable                                     | Default                                 |
| -------------------------------------------- | --------------------------------------- |
| `--mp-date-range-picker-values-height`          | `56px`                                  |
| `--mp-date-range-picker-values-font-size`       | `18px`                                  |
| `--mp-date-range-picker-values-font-weight`     | `500`                                   |
| `--mp-date-range-picker-value-color`            | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-value-active-color`     | `var(--mp-color-primary)`                  |
| `--mp-date-range-picker-value-arrow-color`      | `var(--mp-color-border-2)`                 |
| `--mp-date-range-picker-value-arrow-size`       | `18px`                                  |
| `--mp-date-range-picker-value-date-font-size`   | `var(--mp-sys-font-size-md)` |
| `--mp-date-range-picker-value-time-font-size`   | `22px`                                  |
| `--mp-date-range-picker-time-group-gap` | `24px` |
| `--mp-date-range-picker-time-group-radius` | `12px` |
| `--mp-date-range-picker-time-selection-background` | `var(--mp-color-fill-2)` |
| `--mp-date-range-picker-summary-background` | `var(--mp-temporal-panel-summary-background)` |
| `--mp-date-range-picker-summary-active-background` | `var(--mp-temporal-panel-summary-active-background)` |
| `--mp-date-range-picker-summary-touch-height` | `44px` |
| `--mp-date-range-picker-quick-time-width` | `var(--mp-temporal-panel-quick-time-width)` |
| `--mp-date-range-picker-column-label-height`    | `var(--mp-temporal-panel-column-label-height)` |
| `--mp-date-range-picker-column-label-font-size` | `var(--mp-temporal-panel-column-label-font-size)` |
| `--mp-date-range-picker-column-label-color`     | `var(--mp-color-text-3)`                   |
| `--mp-date-range-picker-border-radius`          | `var(--mp-date-picker-border-radius, 4px)` |
| `--mp-date-range-picker-background`             | `var(--mp-sys-color-surface-overlay)`                   |

### Shortcuts and viewport

DateRangePicker supports shortcuts, shortcuts-position, preview-shortcut and picker-value/default-picker-value. Range viewport values contain two dates. Shortcuts cannot change a locked endpoint; preview does not commit. Events: update:picker-value, picker-value-change(value, dates, texts), select-shortcut(shortcut). See the Date shortcut example. DateRange fields configure these through date-range-picker-props and forward the events.

### Current endpoint selection

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

Highlighting is owned by top-level show-current. Nested date-picker-props does not accept showCurrent/showNowButton.

## Month labels

Fields configure this through `dateRangePickerProps`.

`abbreviation` (boolean, default `true`) controls abbreviated month labels in the calendar month grid. Set it to `false` for full month names from the active Locale. It does not affect weekday labels, headers, wheel columns, or value formats. Range calendars use the top-level option; nested calendar options cannot override it.

### Locale and nested calendar options

Date labels, headers and actions use the library's global Locale/LocaleProvider. Cedar no longer accepts a component-level `locale`; no compatibility alias is retained. Changing language does not select or submit a value.

`DateRangePicker.datePickerProps` and `DateRange.datePickerProps` accept only `DateRangeCalendarOptions`: `hint`, `color`, `titleColor`, `buttonElevation`, `touchable`. Model, validation, viewport, presentation, elevation, abbreviation and action control stay at the range root. Unknown keys and event listeners are not forwarded. The calendar branches explicitly use calendar presentation.

Field-level appearance merges over nested `dateRangePickerProps.datePickerProps`; empty defaults no longer erase nested settings. Explicit field keys take precedence.

### Nested time and wheel views

### Real platform capabilities

Cedar does not expose `Date.pickerProps`, `DateRange.pickerProps` or `DateRange.datePickerProps`: desktop fields do not render mobile wheels or a mobile inner-calendar plugin. Maple retains these real extensions, using DateWheelOptions and DateRangeCalendarOptions. Both libraries use `Date.datePickerProps` / `DateRange.dateRangePickerProps` to configure their full panel. Range time wheels use `pickerProps`; initial date/time values belong to top-level `defaultValue`.

### Instance locale isolation

Date owners read the library's global Locale/Provider and keep `dayStartOfWeek` per instance. They do not switch the host Dayjs default locale or overwrite its base language data. Localized date metadata is registered under each library's own namespace; component instances and source code are not shared.

`valueFormat` is a stable English date protocol, including month-name tokens; `format` display and typed text use the UI language. Language changes do not rewrite or invalidate English month-name models. Numeric default protocols, Date objects and timestamps remain unchanged. The core Chinese locales and Maple built-in languages are loaded; other formats use already registered Dayjs language data, with a safe English fallback.

### Typed format boundaries

The copied date parser strictly uses display `format`, serializes through `value-format`, and checks the existing disabled/range rules. Single/range date fields now wire real native input. Editing is enabled by default: input clicks only edit; the calendar button or ArrowDown opens the panel, and Enter/blur commits. Set `input-editable=false` for panel-only selection. Multiple/function-formatted display has no inverse text protocol and stays readonly. A function `format` has no inverse parsing protocol: disable `input-editable` and use the selection panel. Maple has no week/quarter presentation; copied parsing logic does not introduce unsupported component types.

### Text entry and panel selection

Example source: src/date-range/example/demos/en-US/text-entry.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const range = ref(['2025-01-15', '2025-01-20'])
const panelOnly = ref(false)
</script>

<template>
  <p>Type DD/MM/YYYY and commit with Enter or blur. Invalid or out-of-bounds text returns to the model.</p>
  <mp-switch v-model="panelOnly" />
  <p>Panel-only selection: {{ panelOnly }}</p>
  <mp-date-range v-model="range" format="DD/MM/YYYY" :disabled="[true, false]" :input-editable="!panelOnly" />
  <p>Start is locked; end cannot precede it: {{ range }}</p>
</template>
```

### Field viewport and shortcut events

Configure `pickerValue`, `defaultPickerValue` and shortcuts through nested `datePickerProps` / `dateRangePickerProps`; listeners inside nested objects are filtered. Listen on the field and update the nested viewport. Controlled rejection keeps the previous month; navigation does not select or commit. A valid shortcut chooses a draft under the existing confirmation policy.

| Event | Description | Parameters |
| --- | --- | --- |
| `update:picker-value` | Request calendar viewport update | value: DateSelection |
| `picker-value-change` | Viewport request and formatted payload | value, date(s), formatted text(s) |
| `select-shortcut` | Accepted shortcut object | shortcut: DateShortcut |

Example source: src/date-range/example/demos/en-US/field-panel-tools.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateShortcut } from '@maple-design/ui'

const selected = ref(['2025-01-15', '2025-01-20'])
const viewport = ref(['2025-01-01', '2025-02-01'])
const acceptNavigation = ref(true)
const notice = ref('')
const shortcutNotice = ref('')
const shortcuts: DateShortcut[] = [
  { label: 'Next month', value: ['2025-02-15', '2025-02-20'] },
  { label: 'Disabled', value: ['2025-03-01', '2025-03-05'], disabled: true },
]
function navigate(value: unknown) {
  if (
    acceptNavigation.value &&
    Array.isArray(value) &&
    value.length === 2 &&
    value.every((part) => typeof part === 'string')
  ) {
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
  <mp-date-range
    v-model="selected"
    panel-type="calendar"
    :input-editable="false"
    format="DD/MM/YYYY"
    :date-range-picker-props="{ pickerValue: viewport, shortcuts }"
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

`Date` / `DateRange` fields select their content through root `panel-type`; pure panels use root `presentation`. Date and DateRange fields default to `calendar`, and standalone date panels to `calendarPicker`. Field `DatePickerOptions` / `DateRangePickerOptions` no longer accept the ineffective `presentation`; untyped nested selectors are filtered at runtime. Week start, viewport, shortcuts and valid appearance remain configurable. Single roots support picker/calendar/calendarPicker; ranges support picker/calendar. Cedar only implements its desktop calendar and does not expose empty mobile modes.

### Reactive first weekday

`dayStartOfWeek` updates the calendar headers and date columns together without changing the selected value or submitting a draft. Use the root prop on pure panels; on fields configure `datePickerProps` / `dateRangePickerProps`. The wheel view does not use weekday columns.

### Dynamic date limits

Updating or removing `min` / `max` changes selectable dates, not the existing model or draft. In Maple calendar views, day/month/year navigation availability is derived from the current viewport and both limits; removing one limit restores only that side. A released bound does not trigger selection or submission.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `popup`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

Inline keeps the existing date/time confirmation policy. In popup, the inner pure panel hides its toolbar and the host owns the single confirmation boundary. Standalone DatePicker, DateRangePicker, TimePicker and TimeRangePicker retain their panel API and confirmation behavior. On fields, use `panel-type` to choose calendar/picker content; `presentation` controls the field container. Standalone pickers keep their existing content `presentation`.

### Range panel interaction

Date and date-time ranges edit only the active endpoint. Neither manual selection nor Now swaps endpoints. Reversed drafts show a red footer message and disable Confirm until corrected; correcting the range still requires explicit confirmation. Cancel discards the draft. Bounds, disabled date/time rules and locked endpoints remain enforced. Time-only ranges retain their next-day behavior.

### Disabled units inside a range

`disabled-date` restricts the start and end. A range may span disabled interior units; it is not scanned unit by unit or automatically truncated. The same rule applies to dates, months, and years. Disabled interior cells stay gray. Paging preserves the selected first endpoint and clears hover previews; reverse clicks are ordered chronologically.

Standalone DatePicker / DateRangePicker panels and inline fields share a 265px calendar width. Date and time controls appear side by side when space permits and wrap in narrow containers. Explicit `presentation="picker"` preserves wheels. Standalone confirmation and the actions slot remain owned by the panel.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

The lightning button on date-time ranges opens a localized quick-range panel. Choosing an allowed preset updates the draft only. Click Confirm to submit through the regular validation and before-commit flow and close the editor. Custom shortcuts replace the built-in ranges. Now changes only the active endpoint without swapping. Even with `disable-confirm`, Now and subsequent edits require confirmation; cancelling discards the draft. Standalone panels, inline fields and popups behave consistently; reversed ranges show a red message and disable Confirm. Set `:show-now-button="false"` to hide Now.
## Time zones and mobile calendars

`time-zone` shares Date's IANA instant/civil-string protocol. `interactive-mode="scroll"` and `line` support day-precision date-time ranges, cross-month navigation and endpoint locks. Open the start or end input to edit only that endpoint. Locked inputs are disabled; the other endpoint retains its original instant. Once both values exist, their ordering is validated. See Date for virtualization and DST details.


## Typed passthrough configuration

Use `DateRangePopupOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. Visibility, disabled state and owned updates belong to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

Example source: src/date-range/example/demos/passthrough-options.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateRangePopupOptions } from '@maple-design/ui'

const open = ref(false)
const popupOptions: DateRangePopupOptions = { placement: 'top-start', popupTranslate: [0, -8], popupContainer: false }
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="open = !open">{{ open ? '关闭面板' : '打开面板' }}</mp-button>
    <mp-date-range v-model:open="open" presentation="inline" :popup-props="popupOptions" aria-label="透传配置示例" />
    <p role="status">顶层 open：{{ open }}；嵌套配置：向上展开并调整偏移。</p>
  </mp-space>
</template>
```


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
