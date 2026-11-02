<!-- Source: src/auto-complete/docs/en-US.md; locale: en-US; page: /en-US/auto-complete -->

# AutoComplete

Free-text input with suggestions. Both libraries independently maintain the same component, props, Menu and styles. Local Input/Form integration supplies hover versus touch behavior; no shared runtime or platform configuration.

Opening and filtering are independent: shouldOpen controls opening, filterOption filters candidates. Empty results, disabled and readonly keep the menu closed. No list/picker presentation is provided.

## 案例

### Input and selection

Example source: src/auto-complete/example/demos/en-US/basic.vue

```vue
<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    placeholder="Type or select a city"
    clearable
    style="width: 100%; max-width: 320px"
  />
  <p>Current value: {{ value || '-' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  'Beijing',
  { value: 310000, label: 'Shanghai' },
  { value: 'chengdu', label: 'Chengdu' },
  { value: 'wuhan', label: 'Wuhan', disabled: true },
]
</script>
```

### Sizes

Example source: src/auto-complete/example/demos/en-US/size.vue

```vue
<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete v-for="size in sizes" :key="size" :size="size" :options="options" :placeholder="size" />
  </mp-space>
</template>

<script setup lang="ts">
import type { ComponentSize } from '@maple-design/ui'

const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const options = ['Beijing', 'Shanghai', 'Chengdu']
</script>
```

### Disabled and readonly

Example source: src/auto-complete/example/demos/en-US/state.vue

```vue
<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete default-value="Cedar" :options="options" readonly />
    <mp-auto-complete default-value="Maple" :options="options" disabled />
    <mp-auto-complete default-value="Invalid" :options="options" error clearable />
  </mp-space>
</template>

<script setup lang="ts">
const options = ['Cedar', 'Maple']
</script>
```

### Opening and filtering

Example source: src/auto-complete/example/demos/en-US/opening-policy.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const allowEmpty = ref(false)
const filter = ref(true)
const shouldOpen = (text: string) => allowEmpty.value || text.length >= 2
const options = ['Cedar', 'Maple', 'Vue']
</script>
<template>
  <mp-space direction="column" size="md">
    <mp-checkbox v-model="allowEmpty">Allow opening with empty input</mp-checkbox>
    <mp-checkbox v-model="filter">Filter suggestions by input</mp-checkbox>
    <mp-auto-complete
      v-model="value"
      :options="options"
      :filter-option="filter"
      :should-open="shouldOpen"
      placeholder="Type two characters to open by default"
    />
    <p>Opening policy does not filter candidates. The menu remains closed when there are no matches.</p>
  </mp-space>
</template>
```

### Case sensitivity

Example source: src/auto-complete/example/demos/en-US/case-sensitive.vue

```vue
<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      v-model="looseValue"
      :options="options"
      placeholder="Default: type ar"
      style="width: 100%; max-width: 320px"
    />
    <mp-auto-complete
      v-model="caseSensitiveValue"
      :options="options"
      case-sensitive
      placeholder="Case-sensitive: type Ar"
      style="width: 100%; max-width: 320px"
    />
  </mp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ['Arco', 'Maple', 'Cedar']
const looseValue = ref('')
const caseSensitiveValue = ref('')
</script>
```

### Async suggestions

Example source: src/auto-complete/example/demos/en-US/remote.vue

```vue
<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :filter-option="false"
    placeholder="Type to request suggestions"
    style="width: 100%; max-width: 320px"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const value = ref('')
const options = ref<string[]>([])

let requestId = 0
onBeforeUnmount(() => requestId++)
const handleSearch = async (keyword: string) => {
  const current = ++requestId
  const result = await Promise.resolve(
    keyword ? Array.from({ length: 4 }, (_, index) => `${keyword}-${index + 1}`) : [],
  )
  if (current === requestId) {
    options.value = result
  }
}
</script>
```

### Field names and slots

Example source: src/auto-complete/example/demos/en-US/footer.vue

```vue
<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :field-names="{ value: 'code', label: 'name', disabled: 'unavailable' }"
    placeholder="Type a city"
    style="width: 100%; max-width: 320px"
  >
    <template #option="{ data }">{{ data.label }} · {{ data.raw.country }}</template>
    <template #footer>
      <div style="padding: 6px 12px; color: var(--mp-sys-color-content-tertiary)">
        Choose a suggestion or continue typing
      </div>
    </template>
  </mp-auto-complete>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { code: 'PEK', name: 'Beijing', country: 'CN' },
  { code: 'SHA', name: 'Shanghai', country: 'CN' },
  { code: 'NRT', name: 'Tokyo', country: 'JP', unavailable: true },
]
</script>
```

### Virtual list

Example source: src/auto-complete/example/demos/en-US/virtual-list.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = Array.from({ length: 500 }, (_, index) => ({
  value: `device-${index + 1}`,
  label: `Device ${index + 1}`,
}))
</script>
<template>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :should-open="() => true"
    :virtual-list-props="{ height: 180 }"
    placeholder="Search 500 devices"
  />
</template>
```

### Variants and hints

Example source: src/auto-complete/example/demos/en-US/decorator.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ['Cedar', 'Maple']
</script>
<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      v-for="variant in ['filled', 'outline', 'standard'] as const"
      :key="variant"
      v-model="value"
      :options="options"
      :variant="variant"
      :placeholder="variant"
      hint
      clearable
    />
    <mp-auto-complete
      v-model="value"
      :options="options"
      hint
      placeholder="Custom colors"
      focus-color="#6750a4"
      text-color="#386a20"
      enterkeyhint="search"
    >
      <template #prefix>@</template><template #suffix>.com</template>
    </mp-auto-complete>
  </mp-space>
</template>
```

### Keyboard and accessibility

Example source: src/auto-complete/example/demos/en-US/accessibility.vue

```vue
<template>
  <label :for="inputId">Frontend framework</label>
  <mp-auto-complete
    v-model="value"
    :options="options"
    :input-attrs="{ id: inputId, 'aria-describedby': helpId }"
    style="width: 100%; max-width: 320px"
  />
  <p :id="helpId">Use arrow keys to navigate, Enter to select, Escape to close.</p>
</template>

<script setup lang="ts">
import { ref, useId } from 'vue'

const inputId = useId()
const helpId = useId()
const value = ref('')
const options = ['Vue', 'React', 'Angular']
</script>
```

Grouped option lists share Menu spacing: a 20px title line with 4px vertical padding (28px total), an extra 8px before subsequent groups, and no extra group gap before the first title. Labels align with option text; AutoComplete labels follow its option horizontal padding.

### Group spacing

Example source: src/auto-complete/example/demos/en-US/group-spacing.vue

```vue
<script setup lang="ts">
const options = [
  {
    isGroup: true,
    label: 'Northern China',
    options: [
      { value: 'beijing', label: 'Beijing' },
      { value: 'tianjin', label: 'Tianjin' },
    ],
  },
  {
    isGroup: true,
    label: 'Eastern China',
    options: [
      { value: 'shanghai', label: 'Shanghai' },
      { value: 'hangzhou', label: 'Hangzhou' },
    ],
  },
]
</script>

<template>
  <mp-space direction="column" size="md">
    <mp-auto-complete
      :options="options"
      :should-open="() => true"
      placeholder="Grouped suggestions"
      :style="{ width: '280px' }"
    />
    <mp-auto-complete
      :options="options"
      :should-open="() => true"
      placeholder="Grouped suggestions with custom inset"
      :style="{ width: '280px' }"
      :trigger-props="{ popupStyle: { '--mp-auto-complete-option-padding-horizontal': '20px' } }"
    />
  </mp-space>
</template>
```

### Appearance combinations

Use this example for suggestions while allowing free text. Adjust variant, size and compare the component with the same data. Keep the content unchanged while comparing the available settings.

Example source: src/auto-complete/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('研发')
const options = [{ value: '研发' }, { value: '研发平台' }, { value: '设计' }]
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
    <mp-auto-complete v-model="value" :options="options" clearable v-bind="__demoAppearance"></mp-auto-complete>
  </mp-space>
</template>
```

### Interaction states

Use this example for suggestions while allowing free text. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/auto-complete/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('研发')
const options = [{ value: '研发' }, { value: '研发平台' }, { value: '设计' }]
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-auto-complete v-model="value" :options="options" clearable v-bind="__demoState"></mp-auto-complete>
  </mp-space>
</template>
```

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `model-value` | Controlled text | `string` | `—` |
| `default-value` | Initial uncontrolled text | `string` | `''` |
| `options` | Suggestions, including groups; unique values become strings on selection | `(AutoCompleteOption \| SelectOptionGroup)[]` / `(query, { signal }) => Array / Promise` | `undefined` |
| `field-names` | Map value, label, disabled and other fields | `AutoCompleteFieldNames` | `—` |
| `should-open` | Opening policy; does not filter candidates | `(value: string) => boolean` | `value.length > 0` |
| `filter-option` | Filter by label; false for remote filtering | `AutoCompleteFilterOption` | automatic: arrays on; loader off |
| `case-sensitive` | Case-sensitive built-in matching | `boolean` | `false` |
| `popup-container` | Popup container; same contract as Trigger | `PopupContainer` | `—` |
| `trigger-props` | Trigger configuration; cannot override owned opening and disabled state | `TriggerProps` | `—` |
| `virtual-list-props` | Enable and configure virtual scrolling | `VirtualListProps` | `—` |
| `size` | Five sizes; inherit Group / Form / global configuration when unset | `xs \| sm \| md \| lg \| xl` | `md` |
| `variant` | Input variant; inherits Group when unset | `filled \| outline \| standard` | `outline` |
| `disabled` | Disabled; inherited when unset, explicit false overrides | `boolean` | `undefined` |
| `readonly` | Readonly; focus/copy allowed, suggestions stay closed | `boolean` | `undefined` |
| `error` | Error state; inherits FormItem when unset | `boolean` | `undefined` |
| `clearable` | Allow clearing a nonempty editable value | `boolean` | `false` |
| `placeholder` | Placeholder or floating hint text | `string` | `—` |
| `hint` | Enable Input floating hint | `boolean` | `undefined` |
| `line` | Show border or underline | `boolean` | `true` |
| `text-color` | Instance text color | `string` | `—` |
| `focus-color` | Instance focus color | `string` | `—` |
| `blur-color` | Instance unfocused hint color | `string` | `—` |
| `enterkeyhint` | Virtual keyboard action hint | `InputHTMLAttributes['enterKeyHint']` | `—` |
| `aria-label` | Accessible input name | `string` | `—` |
| `max-length` | Same length normalization for typing and selecting | `number \| { length: number; errorOnly?: boolean }` | `0` |
| `show-word-limit` | Display word count | `boolean` | `false` |
| `word-length` | Custom length calculation | `(value: string) => number` | `—` |
| `word-slice` | Custom slicing | `(value: string, maxLength: number) => string` | `—` |
| `input-attrs` | Native input attributes; combobox state is owned by the component | `Record<string, unknown>` | `—` |

### Events

| Event | Payload |
| --- | --- |
| `update:model-value` | `value: string` |
| `input / search / change` | `value: string, event: Event` |
| `select` | `value: string, option: AutoCompleteOptionInfo, event: Event` |
| `clear` | `event: Event` |
| `focus / blur` | `event: FocusEvent` |
| `dropdown-scroll / dropdown-reach-bottom` | `event: Event` |

Typing: `input → update:modelValue → search`; selection: `update:modelValue → select → change`; clear: `clear → input → update:modelValue → change`. Selecting the same value emits only select. change is a commit on blur, Enter or selection. Input owns typing/focus/clear Form notifications; AutoComplete notifies Form once for suggestion commits. Selection applies maxLength; select.value is the committed string, while option.value retains the original suggestion. clear receives an event, not a string.

### Slots

| Slot | Description |
| --- | --- |
| `option` | `{ data: AutoCompleteOptionInfo }` |
| `footer` | Menu footer |
| `prefix / suffix` | Input prefix / suffix |
| `clear-icon` | `{ clear }` |

### Methods

`focus()` / `blur()`

Use text labels and the option slot or option.render for rich content. Legacy function/VNode labels are removed. Arrow keys navigate, Enter selects, Escape closes, and Tab keeps native focus navigation. Vue useId provides SSR-stable IDs.

## Types

```ts
import type { AutoCompleteProps, AutoCompleteInstance, AutoCompleteOption, AutoCompleteOptionData,
  AutoCompleteOptionInfo, AutoCompleteFieldNames, AutoCompleteFilterOption } from '@maple-design/ui'
```

## Style variables

| Token | Default |
| --- | --- |
| `--mp-auto-complete-popup-max-height` | `var(--mp-select-popup-max-height)` |
| `--mp-auto-complete-popup-bg` | `var(--mp-select-popup-bg)` |
| `--mp-auto-complete-popup-border-radius` | `var(--mp-select-popup-border-radius)` |
| `--mp-auto-complete-popup-padding-vertical` | `var(--mp-select-popup-padding-vertical)` |
| `--mp-auto-complete-popup-font-size` | `var(--mp-select-popup-font-size)` |
| `--mp-auto-complete-popup-border-color` | `var(--mp-select-popup-border-color)` |
| `--mp-auto-complete-popup-box-shadow` | `var(--mp-select-popup-box-shadow)` |
| `--mp-auto-complete-option-height` | `var(--mp-select-popup-option-height)` |
| `--mp-auto-complete-option-font-weight-selected` | `var(--mp-select-popup-option-font-weight-selected)` |
| `--mp-auto-complete-option-padding-horizontal` | `var(--mp-select-popup-option-padding-horizontal)` |
| `--mp-auto-complete-option-bg-default` | `var(--mp-select-popup-option-bg)` |
| `--mp-auto-complete-option-bg-hover` | `var(--mp-select-popup-option-bg-hover)` |
| `--mp-auto-complete-option-bg-selected` | `var(--mp-select-popup-option-bg-selected)` |
| `--mp-auto-complete-option-bg-disabled` | `var(--mp-select-popup-option-bg-disabled)` |
| `--mp-auto-complete-option-text-color-default` | `var(--mp-select-popup-option-text-color)` |
| `--mp-auto-complete-option-text-color-hover` | `var(--mp-select-popup-option-text-color-hover)` |
| `--mp-auto-complete-option-text-color-selected` | `var(--mp-select-popup-option-text-color-selected)` |
| `--mp-auto-complete-option-text-color-disabled` | `var(--mp-select-popup-option-text-color-disabled)` |

Clear does not emit search or reopen suggestions, including when keyboard focus returns from the clear button. Controlled values remain authoritative: repeated rejected clear/selection proposals still emit their own change events. Accepted selections notify Form only once.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `popup`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

Suggestions share Select’s list, group, selected and disabled styles. AutoComplete style variables follow the corresponding Select variables by default. In `inline` mode, the list opens below the input and follows scrolling; use `trigger-props` to explicitly change placement or enable automatic flipping. In `popup` mode, candidates use the same full editor surface as Select.

### Public types

Root and component entries export `AutoCompleteEmits`、`AutoCompleteSlots`、`AutoCompleteExpose` alongside Props and Instance. Emits are event argument tuples derived from the runtime validators; Expose contains focus/blur.

`case-sensitive` only makes built-in local filtering case-sensitive: `ap` matches `Apple` when false, but not when true. It does not require choosing an option or validate the value. A custom `filterOption` takes priority; `filterOption=false` disables local filtering and makes case-sensitive irrelevant.

### Migration from strict

The old `strict` prop is removed. Use `case-sensitive` (`caseSensitive` in TypeScript) instead; boolean meanings and the default false remain unchanged. This removal is marked for the next major release, without a compatibility alias.


## Typed passthrough configuration

Use `AutoCompleteTriggerOptions` from `@maple-design/ui` for opt-in boundary checking. Published wide prop types and runtime precedence remain unchanged. AutoComplete visibility is internal, driven by focus/input and shouldOpen; it has no public open/defaultOpen/update:open API. Disabled state belongs to the host. Top-level popupContainer wins when defined (including false), otherwise the existing nested fallback applies. Select/Cascader keep nested overrides for existing presentation defaults, including unmountOnClose. Date/DateRange filter owned state, rules and listeners; their interaction/offset settings and mobile unmountOnClose are fixed by the renderer.

Example source: src/auto-complete/example/demos/passthrough-options.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { AutoCompleteTriggerOptions } from '@maple-design/ui'

const disabled = ref(false)
const triggerOptions: AutoCompleteTriggerOptions = { placement: 'top-start', popupOffset: 8, popupContainer: false }
const options = [
  { value: 'USER_A', label: 'Apple' },
  { value: 'USER_B', label: 'Banana' },
]
</script>
<template>
  <mp-space direction="column" fill>
    <mp-button @click="disabled = !disabled">{{ disabled ? '启用输入' : '禁用输入' }}</mp-button>
    <mp-auto-complete
      presentation="inline"
      :disabled="disabled"
      :should-open="() => true"
      :options="options"
      :trigger-props="triggerOptions"
      aria-label="透传配置示例"
    />
    <p role="status">顶层 disabled：{{ disabled }}；聚焦输入框查看向上展开的候选。</p>
  </mp-space>
</template>
```


## Configuring the clear result

`empty-value` / `emptyValue` sets the model value produced by a clear action. It accepts a value or a zero-argument factory within this component's existing model type. Omitted preserves the previous default. Use `() => undefined` when an undefined override must be distinguished from omission. Array results are shallow-copied for each clear; protected disabled selections remain selected. This does not redefine which values are empty, change Form reset defaults, or treat 0/false as universally empty.
Text and person-ID models remain strings; use an empty string or another string sentinel.

## Function props for asynchronous options

Pass options(query, { signal }) directly. Arrays remain in options; explicit options (including []) take priority. The component owns loading, stale-result isolation and cancellation. No composable is required. A loader may ignore its second argument. load-error reports failures; the instance refresh() retries.

filterable enables entering a query. filterOption controls local candidate matching only; it never sends requests. When an options loader supplies results, local matching defaults off, so the server can return aliases or ranked results. With arrays, local matching defaults on. Set filterOption explicitly only to override this choice.

```vue
<mp-auto-complete v-model="text" :options="loadSuggestions" />
```


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.
