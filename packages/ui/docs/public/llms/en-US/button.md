<!-- Source: src/button/docs/en-US.md; locale: en-US; page: /en-US/button -->

# Button

Disabled colors depend on the variant: colored solid fills use a lighter status background; text and outline remain transparent with muted status text; tonal keeps its light background. Neutral buttons use disabled neutral colors. Custom color/text-color is suspended while disabled; hover/active feedback and elevation are suppressed.

Both libraries use the same implementation and examples; package prefixes, themes and registration stay local.

## Basic examples

### Eight statuses

Example source: src/button/example/demos/basic.vue

```vue
<script setup lang="ts">
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger'] as const
</script>
<template>
  <mp-space wrap size="12px">
    <mp-button v-for="status in statuses" :key="status" :status="status">{{ status }}</mp-button>
  </mp-space>
</template>
```

## Appearance and states

### Variants, statuses and sizes

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `variant` | Appearance; inherits group, otherwise default | Variants, statuses and sizes, Custom colors |
| `size` | Size; inherits group, otherwise md | Variants, statuses and sizes, Five sizes |
| `status` | Semantic color; inherits group, otherwise default | Variants, statuses and sizes |
| `disabled` | Disabled; inherits group, explicit false overrides | Disabled buttons and links |
| `component` | Root tag; link attributes fall through | Disabled buttons and links |
| `loading` | Loading; blocks activation and navigation | Disabled buttons and links |
<!-- demo-config-notes:end -->


Choose a variant and size to compare eight semantic colors. Filled buttons suit primary actions; text and outline suit secondary actions. The few variant, size and background options are shown directly with button-style RadioGroups. Form/FormItem provide standard field layout; Card carries the background comparison.

Example source: src/button/example/demos/variants.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const variant = ref('default')
const size = ref('md')
const background = ref('navy')
const variants = ['default', 'text', 'outline', 'tonal']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const statuses = ['default', 'primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'danger']
const backgrounds = [
  { label: 'Navy / 深蓝', value: 'navy', color: '#17224B' },
  { label: 'White / 白色', value: 'light', color: '#FFFFFF' },
  { label: 'Light gray / 浅灰', value: 'muted', color: '#F5F5F5' },
  { label: 'Dark gray / 深灰', value: 'dark', color: '#252525' },
]
const cardBackground = computed(() => backgrounds.find((item) => item.value === background.value)?.color)
</script>
<template>
  <mp-space direction="column" block align="stretch" :size="16">
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Variant" field="variant">
        <mp-radio-group v-model="variant" :options="variants" aria-label="Button variant" variant="button" />
      </mp-form-item>
      <mp-form-item label="Size" field="size">
        <mp-radio-group v-model="size" :options="sizes" aria-label="Button size" variant="button" />
      </mp-form-item>
      <mp-form-item label="Background" field="background">
        <mp-radio-group v-model="background" :options="backgrounds" aria-label="Button background" variant="button" />
      </mp-form-item>
    </mp-form>
    <mp-card
      class="button-variant-card"
      :data-background="background"
      :elevation="false"
      :style="{ '--mp-card-background': cardBackground }"
    >
      <mp-space wrap>
        <mp-button v-for="status in statuses" :key="status" :status="status" :variant="variant" :size="size">{{
          status
        }}</mp-button>
      </mp-space>
    </mp-card>
  </mp-space>
</template>
```

### Five sizes

Horizontal buttons and inputs of the same size share the default height and font size within each platform. Cedar heights are 24/28/32/36/44px; Maple heights are 32/40/48/56/64px. Horizontal button padding is 8/12/16/20/24px per side, with a 6px icon-label gap. Stacked buttons keep their separate content-based height. Component-level overrides remain independent.

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

### Disabled buttons and links

Example source: src/button/example/demos/disabled.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
</script>
<template>
  <mp-space wrap size="12px">
    <mp-button disabled @click="clicks++">Disabled button</mp-button>
    <mp-button component="a" href="#blocked-button-link" disabled @click="clicks++">Disabled link</mp-button>
    <mp-button component="a" href="#blocked-button-link" loading @click="clicks++">Loading link</mp-button>
  </mp-space>
  <p aria-live="polite">Blocked clicks: {{ clicks }}</p>
</template>
```

### Custom colors

Example source: src/button/example/demos/custom-color.vue

```vue
<template>
  <mp-space wrap size="12px">
    <mp-button color="#6750a4" text-color="white">Custom filled</mp-button>
    <mp-button color="linear-gradient(to bottom right, #6750a4, #d0bcff)" text-color="white">Gradient</mp-button>
    <mp-button color="#6750a4" variant="text">Custom text</mp-button>
    <mp-button color="#6750a4" variant="outline">Custom outline</mp-button>
    <mp-button color="#6750a4" variant="tonal">Custom tonal</mp-button>
  </mp-space>
</template>
```

## Icons and layout

### Icons and label layouts

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Semantic color; inherits group, otherwise default | Icons and label layouts |
| `variant` | Appearance; inherits group, otherwise default | Icons and label layouts |
| `size` | Size; inherits group, otherwise md | Icons and label layouts |
| `stacked` | Stack icon and text; inherits group when omitted | Icons and label layouts |
| `round` | Round button | Icons and label layouts |
| `block` | Full available width | Block buttons |
<!-- demo-config-notes:end -->


Use built-in icons to compare icon-only, inline and stacked labels across four variants and five sizes. Stacked buttons grow with content and keep at least 8px of top and bottom padding. Omit the default slot for icon-only buttons; round controls shape and stacked controls label layout.

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
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Variant" field="variant">
        <mp-radio-group v-model="variant" :options="variants" aria-label="Icon button variant" variant="button" />
      </mp-form-item>
      <mp-form-item label="Size" field="size">
        <mp-radio-group v-model="size" :options="sizes" aria-label="Icon button size" variant="button" />
      </mp-form-item>
    </mp-form>
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

### Block buttons

Example source: src/button/example/demos/block.vue

```vue
<template>
  <mp-button block>Full width</mp-button>
</template>
```

## Button groups

### Group inheritance and overrides

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `status` | Semantic color; inherits group, otherwise default | Group inheritance and overrides |
| `disabled` | Disabled; inherits group, explicit false overrides | Group inheritance and overrides |
| `loading` | Loading; blocks activation and navigation | Group icons and loading |
<!-- demo-config-notes:end -->


Change the group size and disabled state. Children inherit group settings and can explicitly override color or disabled state.

Example source: src/button/example/demos/button-group.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const size = ref('md')
const disabled = ref(false)
</script>
<template>
  <mp-space direction="column" :size="16" class="button-group-demo">
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Size" field="size">
        <mp-radio-group
          v-model="size"
          aria-label="Button group size"
          :options="['xs', 'sm', 'md', 'lg', 'xl']"
          variant="button"
        />
      </mp-form-item>
      <mp-form-item label="State" field="disabled"
        ><mp-checkbox v-model="disabled">Disable group</mp-checkbox></mp-form-item
      >
    </mp-form>
    <div class="button-group-demo__scroll">
      <mp-button-group aria-label="Document actions" status="primary" :size="size" :disabled="disabled">
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

### Group layouts

Compare variants and sizes in horizontal and vertical groups: three related appearance dimensions.

Example source: src/button/example/demos/button-group-layout.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const mixed = ref(false)
const variant = ref('default')
const size = ref('md')
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Variant" field="variant">
        <mp-radio-group
          v-model="variant"
          aria-label="Button group variant"
          :options="['default', 'text', 'outline', 'tonal']"
          variant="button"
        />
      </mp-form-item>
      <mp-form-item label="Size" field="size">
        <mp-radio-group
          v-model="size"
          aria-label="Button group size"
          :options="['xs', 'sm', 'md', 'lg', 'xl']"
          variant="button"
        />
      </mp-form-item>
      <mp-form-item label="Mixed variants"
        ><mp-checkbox v-model="mixed">Text override in middle</mp-checkbox></mp-form-item
      >
    </mp-form>
    <mp-space wrap align="flex-start" :size="24">
      <mp-button-group
        v-for="vertical in [false, true]"
        :key="String(vertical)"
        :aria-label="vertical ? 'Vertical page actions' : 'Horizontal page actions'"
        :vertical="vertical"
        :variant="variant"
        :size="size"
        status="primary"
      >
        <mp-button>Prev</mp-button><mp-button :variant="mixed ? 'text' : undefined">Info</mp-button
        ><mp-button>Next</mp-button>
      </mp-button-group>
    </mp-space>
  </mp-space>
</template>
```

### Group icons and loading

Compare stacked labels and group direction, then load the first button while the other action remains available. Vertical groups align horizontal icon/text content at the start so different label lengths keep icons aligned.

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
    <mp-button-group aria-label="Save or cancel" status="primary" :stacked="stacked" :vertical="vertical">
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

## Forms and events

### Form control size comparison

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `size` | Size; inherits group, otherwise md | Form control size comparison |
| `variant` | Appearance; inherits group, otherwise default | Form control size comparison |
| `html-type` | Native button type | Native form, focus and touch events |
| `focusable` | Allow sequential Tab focus; does not prevent programmatic focus | Native form, focus and touch events |
<!-- demo-config-notes:end -->


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

### Native form, focus and touch events

Example source: src/button/example/demos/native-events.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Editable')
const submissions = ref(0)
const event = ref('Use Tab or Enter')
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
    <mp-button @focus="event = 'focus'" @blur="event = 'blur'" @click="event = 'click'">Event target</mp-button>
  </mp-form>
  <p aria-live="polite">Submissions: {{ submissions }}; {{ event }}</p>
</template>
```

## Loading and action feedback

### Loading animations, layouts and sizes

<!-- demo-config-notes:start -->
#### Configuration reference for this comparison

| Configuration | Purpose | Related examples |
| --- | --- | --- |
| `loading` | Loading; blocks activation and navigation | Loading animations, layouts and sizes, Loading indicator appearance |
| `loading-size` | Indicator size; xs/sm/md/lg/xl map to 12/14/16/18/20px; numbers are px; follows button size when omitted; not used in line mode | Loading animations, layouts and sizes, Loading indicator appearance |
| `loading-type` | Spinner animation; same as Loading.type; not used in line mode | Loading animations, layouts and sizes |
| `loading-mode` | Inline, covering, or bottom progress line; line only uses loading-color | Loading animations, layouts and sizes |
| `loading-color` | Loading indicator color | Loading indicator appearance |
| `ripple` | Click ripple | Ripple and elevation feedback |
<!-- demo-config-notes:end -->


Choose a loading layout and indicator size to compare five animations. Click a select arrow to open its menu, then choose an option to close it. Loading buttons keep their label and prevent repeated actions.

Example source: src/button/example/demos/loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const stacked = ref(false)
const mode = ref('default')
const size = ref('md')
const modes = ['default', 'fill', 'line']
const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const types = ['circle', 'wave', 'cube', 'rect', 'disappear']
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical" size="sm">
      <mp-form-item label="Layout" field="mode">
        <mp-radio-group v-model="mode" :options="modes" aria-label="Loading mode" variant="button" />
      </mp-form-item>
      <mp-form-item label="Size" field="size">
        <mp-radio-group
          v-model="size"
          :disabled="mode === 'line'"
          :options="sizes"
          aria-label="Loading size"
          variant="button"
        />
      </mp-form-item>
    </mp-form>
    <mp-checkbox v-model="stacked">图文堆叠（stacked）</mp-checkbox>
    <p v-if="mode === 'line'">
      line 使用底部进度线，loading-type 和 loading-size 不适用；可通过 loading-color 调整颜色。
    </p>
    <mp-space wrap
      ><mp-button
        v-for="type in mode === 'line' ? ['line'] : types"
        :key="type"
        loading
        :stacked="stacked"
        :loading-type="mode === 'line' ? 'circle' : type"
        :loading-mode="mode"
        :loading-size="size"
        ><template #icon
          ><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 1v14M1 8h14" stroke="currentColor" /></svg></template
        >{{ type }}</mp-button
      ></mp-space
    >
  </mp-space>
</template>
```

### Loading indicator appearance

Example source: src/button/example/demos/loading-appearance.vue

```vue
<template>
  <mp-space wrap
    ><mp-button loading loading-color="#e05279">Custom color</mp-button
    ><mp-button loading :loading-size="16">Custom size</mp-button></mp-space
  >
</template>
```

### Ripple and elevation feedback

Click to observe ripple feedback and adjust elevation to compare depth. Disabling the ripple does not disable clicks.

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

### Controlled loading and failure recovery

Example source: src/button/example/demos/controlled-loading.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const saving = ref(false)
const failing = ref(false)
const message = ref('点击保存，观察业务控制的 loading / Click Save to start')
const delay = () => new Promise((resolve) => setTimeout(resolve, 800))
async function save() {
  if (saving.value) {
    return
  }
  saving.value = true
  try {
    await delay()
    message.value = '保存完成 / Saved'
  } finally {
    saving.value = false
  }
}
async function recover() {
  if (failing.value) {
    return
  }
  failing.value = true
  try {
    await delay()
    throw new Error('模拟请求失败 / Simulated failure')
  } catch (error) {
    message.value = (error as Error).message
  } finally {
    failing.value = false
  }
}
</script>
<template>
  <mp-space direction="column" :size="12">
    <p>
      click 支持 async 回调；业务通过 loading 展示等待，在 finally 中恢复。Async click handlers own their loading state.
    </p>
    <mp-space wrap :size="12">
      <mp-button :loading="saving" @click="save">保存 / Save</mp-button>
      <mp-button :loading="failing" @click="recover">失败与恢复 / Failure recovery</mp-button>
    </mp-space>
    <p aria-live="polite">{{ message }}</p>
  </mp-space>
</template>
```

## Reading direction

Inherits the nearest `dir="ltr|rtl"`, including runtime changes and local overrides. Icons and content follow reading order; stacked content remains top to bottom without mirroring custom graphics. ButtonGroup uses its direction for horizontal arrangement, joined borders and end radii; individual buttons may override text direction. Single buttons retain full radii, and vertical groups keep top-to-bottom order. Native Tab, Enter and Space remain available; ordinary groups do not intercept arrow keys. Disabled and loading behavior is unchanged.

## API

<!-- same-source-api:start -->

### Button Props

| Prop | Description | Type | Default |
| ------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------- | -------------- |
| status | Semantic color; inherits group, otherwise default | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `undefined` |
| variant | Appearance; inherits group, otherwise default | `default / text / outline / tonal` | `undefined` |
| size | Size; inherits group, otherwise md | `xs / sm / md / lg / xl` | `undefined` |
| html-type | Native button type | `button / submit / reset` | `button` |
| component | Root tag; link attributes fall through | `button / a` | `button` |
| round | Round button | `boolean` | `false` |
| block | Full available width | `boolean` | `false` |
| loading | Loading; blocks activation and navigation | `boolean` | `false` |
| loading-type | Spinner animation; same as Loading.type; not used in line mode | `circle / wave / cube / rect / disappear` | `circle` |
| loading-mode | Inline, covering, or bottom progress line; line only uses loading-color | `default / fill / line` | `default` |
| loading-size | Indicator size; xs/sm/md/lg/xl map to 12/14/16/18/20px; numbers are px; follows button size when omitted; not used in line mode | `ComponentSize / number`<br>`ComponentSize: 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `undefined` |
| loading-color | Loading indicator color | `string` | `currentColor` |
| disabled | Disabled; inherits group, explicit false overrides | `boolean` | `undefined` |
| ripple | Click ripple | `boolean` | `true` |
| focusable | Allow sequential Tab focus; does not prevent programmatic focus | `boolean` | `true` |
| autofocus | Native autofocus | `boolean` | `false` |
| text-color | Custom text color | `string` | `undefined` |
| color | Custom background or variant base color | `string` | `undefined` |
| elevation | Default variant shadow; true=2, false=off, rounded/clamped 0–24; group owns grouped elevation | `boolean / number` | `true` |
| stacked | Stack icon and text; inherits group when omitted | `boolean` | `undefined` |

### Button Events

| Event | Arguments and behavior |
| ---------- | ------------------------------------------- |
| click | `(event: MouseEvent) => void` |

`click` is a notification event. The component does not process listener return values or switch loading automatically. Business code controls `loading` and should restore it in `finally` after asynchronous work. Disabled or loading links have their effective `href` removed.

### Button Slots

| Slot | Description | Prop |
| ------- | -------------------------------- | ---- |
| default | Button label; retained while loading | — |
| icon | Leading icon; above label when stacked | — |

### Button Methods

No custom public methods.
<!-- same-source-api:end -->

### ButtonGroup Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| status | Default semantic status for child buttons; individual buttons may override it | `SemanticStatus`<br>`'default' \| 'primary' \| 'secondary' \| 'tertiary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | default |
| size | Default child button size; individual buttons may override it | xs / sm / md / lg / xl | undefined |
| variant | Default child appearance; adjacent buttons join using their effective variants, including mixed variants | default / text / outline / tonal | default |
| color | Default custom child color; individual buttons may override it | string | undefined |
| text-color | Default child text color; individual buttons may override it | string | undefined |
| disabled | Default disabled state; an explicit child false overrides group true | boolean | false |
| stacked | Stack child icon and text vertically by default; a child may explicitly override with false | boolean | false |
| vertical | Vertical group layout, independent of button content stacking | boolean | false |
| elevation | Group elevation; true means 2, numbers normalize to 0–24, and it applies only to an enabled group using the default variant | boolean / number | true |

The root defaults to `role="group"`. Supply `aria-label` or `aria-labelledby` when the action group needs a name. Native attributes can override role. Ordinary groups retain native Tab / Enter / Space handling without arrow-key focus management.

**Inheritance:** explicit child status, size, variant, color, text-color, disabled and stacked values take precedence. The group always owns elevation; individual button elevation is ignored. Nested groups use their nearest group's configuration and defaults without automatically accumulating outer disabled state.

### ButtonGroup Events

No custom events. `@click` forwards a native root event and may receive descendant bubbling; listen to each Button's click for its action. The group does not collect event Promises or manage tasks or selection.

### ButtonGroup Slots

| Slot | Description | Prop |
| --- | --- | --- |
| default | Joined styling supports directly adjacent Button DOM nodes under the group root | — |

**Composition:** extra DOM wrappers, surrounding text and other controls are outside the joined appearance contract. Wrapped buttons may inherit configuration but do not receive the same joined styling. The group owns outer radii and does not preserve a standalone round button's circular appearance. Use Space for separate buttons or mixed content. In narrow areas, business code chooses scrolling, shorter labels or vertical layout; groups do not wrap automatically.

### ButtonGroup Methods

| Name | Description |
| --- | --- |
| buttonGroupProvider | Reactive group configuration with readonly ComputedRef fields; elevation is boolean / number and other fields match the Props |

No additional group action methods.

## Types

ButtonProps、ButtonVariant、ButtonLoadingMode、ButtonInstance、ButtonGroupProps、ButtonGroupInstance。

## CSS Variables

Button exposes 58 appearance tokens. `{status}-color` controls the solid background, `{status}-foreground-color` controls text/outline/tonal foreground, and `{status}-tonal-color` controls soft backgrounds. `solid-text-color` and `solid-state-layer-color` are shared by semantic statuses; default/tertiary foregrounds and primary/tertiary state layers retain theme-specific roles.

Sizes use xs/sm/md/lg/xl. Font sizes, transition duration, focus width/offset and stacked-height increments reuse system variables. Button groups and stacked buttons share border-radius. Four state opacity variables preserve hover/active differences. loading-duration controls only the bottom progress line; Loading controls other loading animations. Internal variables and fixed animation geometry are not public customization points.

<!-- component-css-variables:start -->

Use these variables to customize the component. Defaults may vary by the selector condition shown. Each variable applies to the corresponding size, variant and interaction states.

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| Variable | Default / condition | Affected styles |
| --- | --- | --- |
| `--mp-button-border-radius` | `var(--mp-sys-radius-md)` | `border-bottom-left-radius`, `border-bottom-right-radius`, `border-radius`, `border-top-left-radius`, `border-top-right-radius` |
| `--mp-button-content-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-button-danger-color` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-button-danger-disabled-color` | `rgb(var(--mp-danger-3))`<br>`rgba(var(--mp-danger-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-danger-foreground-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-button-danger-tonal-color` | `rgb(var(--mp-danger-1))` | `background-color` |
| `--mp-button-default-color` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-button-default-foreground-color` | `var(--mp-sys-color-content-primary)` | `background`, `background-color`, `color` |
| `--mp-button-default-tonal-color` | `var(--mp-sys-color-surface-muted)` | `background-color` |
| `--mp-button-disabled-color` | `var(--mp-color-fill-2)` | `background-color` |
| `--mp-button-disabled-solid-text-color` | `var(--mp-sys-color-content-on-dark)`<br>`rgba(255, 255, 255, 0.3)` (`:root[maple-theme='dark']`) | `color` |
| `--mp-button-disabled-text-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-button-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-button-info-color` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-button-info-disabled-color` | `rgb(var(--mp-blue-3))`<br>`rgba(var(--mp-blue-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-info-foreground-color` | `var(--mp-sys-color-content-info)` | `color` |
| `--mp-button-info-tonal-color` | `rgb(var(--mp-blue-1))` | `background-color` |
| `--mp-button-lg-height` | `56px` | `height`, `min-width`, `width` |
| `--mp-button-lg-padding` | `0 var(--mp-sys-space-7)` | `padding` |
| `--mp-button-loading-duration` | `1s` | `animation` |
| `--mp-button-loading-line-height` | `3px` | `height` |
| `--mp-button-md-height` | `48px` | `height`, `min-width`, `width` |
| `--mp-button-md-padding` | `0 var(--mp-sys-space-6)` | `padding` |
| `--mp-button-plain-state-opacity-active` | `1` | `opacity` |
| `--mp-button-plain-state-opacity-hover` | `0.5` | `opacity` |
| `--mp-button-primary-color` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-button-primary-disabled-color` | `rgb(var(--mp-primary-3))`<br>`rgba(var(--mp-primary-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-primary-foreground-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-button-primary-state-layer-color` | `var(--mp-button-solid-state-layer-color)` | `background-color` |
| `--mp-button-primary-tonal-color` | `rgb(var(--mp-primary-1))` | `background-color` |
| `--mp-button-secondary-color` | `rgb(var(--mp-gray-6))` | `background-color` |
| `--mp-button-secondary-foreground-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-button-secondary-tonal-color` | `rgb(var(--mp-gray-2))` | `background-color` |
| `--mp-button-sm-height` | `40px` | `height`, `min-width`, `width` |
| `--mp-button-sm-padding` | `0 var(--mp-sys-space-5)` | `padding` |
| `--mp-button-solid-state-layer-color` | `var(--mp-sys-color-content-on-dark)` | `background-color` |
| `--mp-button-solid-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-button-stacked-gap` | `var(--mp-sys-space-2)` | `gap`, `min-height`, `min-width` |
| `--mp-button-state-layer-color` | `var(--mp-sys-color-surface-page)` | `background-color` |
| `--mp-button-state-opacity-active` | `0.12` | `opacity` |
| `--mp-button-state-opacity-hover` | `0.08` | `opacity` |
| `--mp-button-success-color` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-button-success-disabled-color` | `rgb(var(--mp-success-3))`<br>`rgba(var(--mp-success-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-success-foreground-color` | `var(--mp-sys-color-content-success)` | `color` |
| `--mp-button-success-tonal-color` | `rgb(var(--mp-success-1))` | `background-color` |
| `--mp-button-tertiary-color` | `rgb(var(--mp-gray-7))` | `background-color` |
| `--mp-button-tertiary-foreground-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-button-tertiary-state-layer-color` | `var(--mp-sys-color-content-on-bright)`<br>`var(--mp-sys-color-content-on-dark)` (`:root[maple-theme='dark']`) | `background-color` |
| `--mp-button-tertiary-text-color` | `var(--mp-sys-color-content-on-dark)`<br>`var(--mp-sys-color-content-on-bright)` (`:root[maple-theme='dark']`) | `color` |
| `--mp-button-tertiary-tonal-color` | `rgb(var(--mp-gray-1))` | `background-color` |
| `--mp-button-warning-color` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-button-warning-disabled-color` | `rgb(var(--mp-warning-3))`<br>`rgba(var(--mp-warning-6), 0.5)` (`:root[maple-theme='dark']`) | `background-color`, `color` |
| `--mp-button-warning-foreground-color` | `var(--mp-sys-color-content-warning)` | `color` |
| `--mp-button-warning-tonal-color` | `rgb(var(--mp-warning-1))` | `background-color` |
| `--mp-button-xl-height` | `64px` | `height`, `min-width`, `width` |
| `--mp-button-xl-padding` | `0 var(--mp-sys-space-8)` | `padding` |
| `--mp-button-xs-height` | `32px` | `height`, `min-width`, `width` |
| `--mp-button-xs-padding` | `0 var(--mp-sys-space-4)` | `padding` |

</div>

Apply overrides to the rendered component root or the actual popup ancestor. For example, add the following class to that element and replace the value as needed:

```css
.component-theme {
  --mp-button-border-radius: var(--mp-sys-radius-md);
}
```

Explicit inline styles and props that write the same CSS property take precedence over stylesheet defaults. After Teleport, ordinary CSS variables inherit from the actual mount location. When using ThemeProvider, follow its local-theme and popup configuration rules. Override the component variable directly for local styling; root-level aliases are not recalculated merely because a descendant system variable changes. Internal variables are not public APIs.

<!-- component-css-variables:end -->
