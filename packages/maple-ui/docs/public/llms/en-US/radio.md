<!-- Source: src/radio/docs/en-US.md; locale: en-US; page: /en-US/radio -->

# Radio

## Examples

### Intro

Basic demos follow the site language without changing business values or selection. Group demos cover accepted/rejected updates, readonly state and asynchronous option labels; removing options does not clear the model. Use `direction="column"` on the outer Space and `direction="vertical"` on the choice group itself.

Single selection among multiple options.

### Basic Usage

Example source: src/radio/example/demos/basic-usage.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
</script>

<template>
  <mp-radio v-model="value">{{ english ? 'Current value' : '当前的值' }}: {{ value }}</mp-radio>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Disabled

Example source: src/radio/example/demos/disabled.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
</script>

<template>
  <mp-radio v-model="value4" disabled>{{ english ? 'Current value' : '当前的值' }}: {{ value4 }}</mp-radio>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Readonly

Example source: src/radio/example/demos/readonly.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
</script>

<template>
  <mp-radio v-model="value5" readonly>{{ english ? 'Current value' : '当前的值' }}: {{ value5 }}</mp-radio>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Set State Value

Example source: src/radio/example/demos/set-state.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
</script>

<template>
  <mp-radio v-model="value2" :value="1"> {{ english ? 'Current value' : '当前的值' }}: {{ value2 }} </mp-radio>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Modify Icon And Color

Example source: src/radio/example/demos/set-style.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
</script>

<template>
  <mp-radio v-model="value3" unchecked-color="var(--mp-color-warning)" checked-color="var(--mp-color-danger)">
    <template #unchecked-icon>
      <m-icon-heart-half-full size="24px" />
    </template>
    <template #checked-icon>
      <m-icon-heart-fill size="24px" />
    </template>
    <template #default> {{ english ? 'Current value' : '当前的值' }}: {{ value3 }} </template>
  </mp-radio>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### RadioGroup

In the radio group, you must set the `value` to identify the `radio`,
The radio group bind group checked identifiers.

Example source: src/radio/example/demos/radio-group.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
</script>

<template>
  <mp-radio-group v-model="value6">
    <mp-radio :value="0">{{ english ? 'Eat' : '吃饭' }}</mp-radio>
    <mp-radio :value="1">{{ english ? 'Sleep' : '睡觉' }}</mp-radio>
  </mp-radio-group>
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ value6 }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Options API

Setting child elements via the `options` prop.

Example source: src/radio/example/demos/radio-group-options.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
const options = computed(() => [
  { label: english.value ? 'Eat' : '吃饭', value: 0 },
  { label: english.value ? 'Sleep' : '睡觉', value: 1 },
  { label: english.value ? 'Game' : '打游戏', value: 2, disabled: true },
])
</script>

<template>
  <mp-radio-group v-model="optionValue" :options="options" />
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ optionValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Custom Fields

Customize the format of the data in `options` through the `field-names` attribute.

Example source: src/radio/example/demos/custom-fields.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
const options = computed(() => [
  { label: english.value ? 'Eat' : '吃饭', value: 0 },
  { label: english.value ? 'Sleep' : '睡觉', value: 1 },
  { label: english.value ? 'Game' : '打游戏', value: 2, disabled: true },
])
const fieldOptions = computed(() => [
  { name: english.value ? 'Eat' : '吃饭', id: 0 },
  { name: english.value ? 'Sleep' : '睡觉', id: 1 },
  { name: english.value ? 'Game' : '打游戏', id: 2 },
])
</script>

<template>
  <mp-radio-group v-model="fieldValue" :options="fieldOptions" :field-names="{ label: 'name', value: 'id' }" />
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ fieldValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Vertical Direction

> For form validation of radio and radio group, please use the [FormItem component](#/en-US/form-item).

Example source: src/radio/example/demos/vertical.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const values = reactive({
  value: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: 0,
  value9: 0,
  optionValue: 0,
  fieldValue: 0,
})
const { value, value2, value3, value4, value5, value6, value9, optionValue, fieldValue } = toRefs(values)
</script>

<template>
  <mp-radio-group v-model="value9" direction="vertical">
    <mp-radio :value="0">{{ english ? 'Eat' : '吃饭' }}</mp-radio>
    <mp-radio :value="1">{{ english ? 'Sleep' : '睡觉' }}</mp-radio>
  </mp-radio-group>
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ value9 }}</div>

  <div class="space"></div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Group state and readonly

A defined `model-value` is controlled: rejected updates do not change the selection. `default-value` initializes uncontrolled state only. Only Group emits `update:model-value → change(value, event?)` and notifies FormItem once; children do not duplicate these notifications.
Native checked values, ARIA state and selection styles stay synchronized with the model. A rejected group selection restores both the previous and clicked inputs; label, Enter and Space activation each propose one update.
Group inherits `disabled`, `readonly` and `error` from the form when omitted. An explicit `false` overrides the form; children cannot bypass a locked group.

Example source: src/radio/example/demos/en-US/group-state.vue

```vue
<script setup>
import { ref } from 'vue'

const accepted = ref('a')
const proposed = ref('')
const readonly = ref(false)
const options = [
  { label: 'Device A', value: 'a' },
  { label: 'Device B', value: 'b' },
]
</script>

<template>
  <mp-space direction="column">
    <div>
      <p>Uncontrolled: default-value initializes only</p>
      <mp-radio-group :default-value="'a'" :options="options" />
    </div>
    <div>
      <p>Controlled: parent accepts updates {{ accepted }}</p>
      <mp-radio-group v-model="accepted" :options="options" :readonly="readonly" />
      <mp-button size="sm" @click="readonly = !readonly">{{ readonly ? 'Unlock' : 'Read only' }}</mp-button>
    </div>
    <div>
      <p>Parent rejects updates; proposals only {{ proposed }}</p>
      <mp-radio-group :model-value="''" :options="options" @update:model-value="proposed = $event" />
    </div>
  </mp-space>
</template>
```

### Standalone values and methods

Radio accepts string, number, boolean or null; null means unselected. Selecting an already selected radio does not deselect it; the parent can clear it with null.
Use `default-value` only to initialize uncontrolled state. Rejected controlled proposals preserve the current selection. The event order is `update:model-value → change(value, event?)`; imperative calls have no native event.
Methods are `select()`, `focus(options?)` and `blur()`. Disabled controls cannot select or focus; readonly controls can focus but cannot change value. Enter on keydown and Space on keyup activate only the local control. Repeated Enter is ignored; blur/deactivation cancels pending Space activation.

Example source: src/radio/example/demos/en-US/control-value.vue

```vue
<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(null)
</script>
<template>
  <mp-space direction="column">
    <p>null means unselected; repeated selection does not deselect. Current value:{{ value }}</p>
    <mp-radio ref="control" v-model="value" :value="false">Select the false option</mp-radio>
    <mp-space wrap>
      <mp-button size="sm" @click="control?.select()">Select</mp-button>
      <mp-button size="sm" @click="control?.focus()">Focus</mp-button>
      <mp-button size="sm" @click="value = null">Reset</mp-button>
    </mp-space>

    <p>
      Read-only controls can receive focus; disabled controls cannot be edited. Enter/Space activates only this control.
    </p>
    <mp-radio :default-value="true" readonly>Read only</mp-radio>
    <mp-radio :default-value="true" disabled>Disabled</mp-radio>
  </mp-space>
</template>
```

### Option data and labels

Both libraries accept primitive options or objects. `field-names` maps `label/value/disabled/readonly/indeterminate`; read-only options remain focusable but cannot change the value. Checkbox indeterminate is presentation only.
The `label` slot receives `{ data, checked }` and takes precedence over a label render function `(data, checked) => VNodeChild`. Data is normalized and retains business fields; source objects are not mutated. Missing labels fall back to the value's text.
Providing `options` replaces the default slot, including `[]`; omit it to use the default slot. Values must be strings, finite numbers or booleans; missing/invalid values and duplicate values of the same type are skipped (first occurrence wins). `false`, `0`, `''` and `'0'` remain distinct. Option changes never rewrite the model.
RadioGroup defaults to `null` (no selection). Set `model-value` to `null` to clear; `''` is a valid option, not an empty-state marker.

Example source: src/radio/example/demos/en-US/option-data.vue

```vue
<script setup lang="ts">
import { h, ref } from 'vue'

const value = ref<string | number | boolean | null>(null)
const fields = { value: 'id', label: 'name', disabled: 'unavailable', readonly: 'locked' }
const options = ref([
  { id: false, name: 'Boolean false' },
  { id: 0, name: 'Number zero' },
  { id: '', name: 'Empty string' },
  { id: 'locked', name: 'Read-only option', locked: true },
  { id: 'disabled', name: 'Disabled option', unavailable: true },
])
const renderOptions = [
  {
    value: 'render',
    label: (_data: unknown, checked: boolean) => h('strong', checked ? 'Selected' : 'Rendered label'),
  },
]
</script>

<template>
  <section class="option-demo">
    <p>Field mapping and label slots. Read-only options can receive focus; disabled options cannot be edited.</p>
    <mp-radio-group v-model="value" :options="options" :field-names="fields" direction="vertical">
      <template #label="{ data, checked }">{{ data.label }} {{ checked ? '✓' : '' }}</template>
    </mp-radio-group>
    <p>Current value: {{ JSON.stringify(value) }}</p>
    <mp-button @click="value = null">Clear</mp-button>
    <p>
      Labels also support render functions. Omitting options uses the default slot; passing [] renders an empty group.
    </p>
    <mp-radio-group :options="renderOptions" />
  </section>
</template>

<style scoped>
.option-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.option-demo p {
  margin: 0;
}
</style>
```

### Keyboard navigation

Tab enters the selected item, or the first enabled item. Arrow keys cycle; Home / End move to the first / last enabled item. Readonly items receive focus without changing the value. Navigation is local to the group and does not intercept embedded buttons.

Example source: src/radio/example/demos/en-US/keyboard-navigation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
const options = [
  { label: 'Email', value: 'email' },
  { label: 'Readonly', value: 'locked', readonly: true },
  { label: 'Disabled', value: 'disabled', disabled: true },
  { label: 'SMS', value: 'sms' },
]
</script>
<template>
  <section class="radio-demo">
    <p>
      Tab enters the group. Arrow keys cycle; Home / End focus the first / last item. Readonly items receive focus
      without changing the value.
    </p>
    <mp-radio-group v-model="value" :options="options" aria-label="Notification channel" />
    <p>Current value：{{ value }}</p>
    <mp-button @click="value = null">Clear</mp-button>
  </section>
</template>
<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.radio-demo p {
  margin: 0;
}
</style>
```

### Button sizes

Both libraries support `variant="button"`. RadioGroup supports `xs / sm / md / lg / xl`; size changes button height, not circular icons. Unset size inherits the form/global setting and finally defaults to md. The group variant takes precedence over its children.

Example source: src/radio/example/demos/en-US/button-sizes.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]
</script>
<template>
  <section class="radio-demo">
    <div v-for="size in sizes" :key="size">
      <p>{{ size }}</p>
      <mp-radio-group variant="button" :size="size" default-value="week" :options="options" :aria-label="size" />
    </div>
    <p>Vertical and readonly</p>
    <mp-radio-group
      variant="button"
      direction="vertical"
      readonly
      default-value="day"
      :options="options"
      aria-label="Readonly period"
    />
  </section>
</template>
<style scoped>
.radio-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.radio-demo p {
  margin: 0 0 8px;
}
</style>
```

### Native control and custom icons

Both libraries render a native radio input. Use name on the group for native form submission; aria-label/input-attrs address the input. Managed type, checked, disabled and tabindex take precedence over input-attrs. Icon slots replace only the icon; #radio replaces the complete visible content, so provide an accessible name.

Example source: src/radio/example/demos/en-US/native-control.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
</script>
<template>
  <section class="native-radio-demo">
    <p>Icons and native input attributes</p>
    <mp-radio-group v-model="value" name="channel" aria-label="Notification channel">
      <mp-radio value="email" :icon-size="24" checked-color="rebeccapurple" :input-attrs="{ id: 'radio-email' }">
        <template #checked-icon><span aria-hidden="true">●</span></template>
        <template #unchecked-icon><span aria-hidden="true">○</span></template>
        Email
      </mp-radio>
      <mp-radio value="sms">SMS</mp-radio>
      <mp-radio value="readonly" readonly>Readonly</mp-radio>
    </mp-radio-group>
    <p>Current value：{{ value }}</p>
  </section>
</template>
<style scoped>
.native-radio-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.native-radio-demo p {
  margin: 0;
}
</style>
```

### Interaction states

Use this example for mutually exclusive choices. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/radio/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref('design')
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-radio v-model="value" value="design" v-bind="__demoState">设计</mp-radio>
  </mp-space>
</template>
```

### Asynchronous options

Enable Manual responses to start real local promises instead of the default timer. Load twice and resolve newest/oldest in either order: only the current request version may replace options or end loading. Removing options invalidates the outstanding version but preserves the selected business value; old tasks remain available to resolve manually. Applied/Ignored/Pending expose this behavior. Loading and responses do not count as user changes. Versioning and pending cleanup belong to this Demo's business loader, not an automatic Radio network-race guarantee; no external service is called.

Loading/removing options or updating the external value never emits reverse updates. Selected values absent from the current options are retained. Selecting the current value again does not emit change. false, zero and empty string retain their identity.

This demo simulates loading with an 800ms local delay. Set Device A or clear the selection while waiting: arriving options reflect the latest model without increasing the user-change count. Removing options while loading cancels the pending task so stale options do not reappear.

Arrow keys can still select existing options while loading. Reloading the same option values preserves focus. Keep the loading-status node stable to avoid remounting the group when the message changes; activating the current value again does not emit another change.

Example source: src/radio/example/demos/en-US/async-options.vue

```vue
<script setup>
import { onDeactivated, onUnmounted, ref, shallowRef } from 'vue'

const value = ref('remote')
const options = ref([])
const loading = ref(false)
const changeCount = ref(0)
let pendingTimer
const manual = ref(false)
const waiting = shallowRef([])
const applied = ref(0)
const ignored = ref(0)
let version = 0
let sequence = 0

function cancelPending() {
  version++
  if (pendingTimer !== undefined) {
    clearTimeout(pendingTimer)
  }
  pendingTimer = undefined
  loading.value = false
}

function load() {
  cancelPending()
  loading.value = true
  const ticket = version
  const id = ++sequence
  const complete = () => {
    if (ticket !== version) {
      ignored.value++
      return
    }
    applied.value = id
    options.value = [
      { label: 'Remote device', value: 'remote' },
      { label: 'Device A', value: 'a' },
      { label: 'Disabled device', value: 'locked', disabled: true },
    ]
    pendingTimer = undefined
    loading.value = false
  }
  if (manual.value) {
    new Promise((resolve) => {
      waiting.value = [...waiting.value, { id, resolve }]
    }).then(complete)
  } else {
    pendingTimer = setTimeout(complete, 800)
  }
}

function settle(latest) {
  const jobs = [...waiting.value]
  const job = latest ? jobs.pop() : jobs.shift()
  waiting.value = jobs
  job?.resolve()
}

function cleanup() {
  cancelPending()
  const jobs = waiting.value
  waiting.value = []
  jobs.forEach((job) => job.resolve())
}

function remove() {
  cancelPending()
  options.value = []
}

onDeactivated(cleanup)
onUnmounted(cleanup)
</script>

<template>
  <mp-space class="radio-async-demo" direction="column">
    <p>Values survive loading and removing options:{{ value }}</p>
    <mp-checkbox v-model="manual" @change="remove">Manual responses / 手动返回</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="load">Load options</mp-button>
      <mp-button size="sm" @click="remove">Remove options</mp-button>
      <mp-button size="sm" @click="value = 'a'">Set Device A</mp-button>
      <mp-button size="sm" @click="value = null">Clear selection</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(false)">Resolve oldest load</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(true)">Resolve newest load</mp-button>
    </mp-space>
    <p aria-live="polite">
      {{
        loading
          ? 'Loading. Remove the options before completion to cancel this request.'
          : 'Loading preserves the current selection and keyboard focus.'
      }}
    </p>
    <mp-radio-group v-model="value" :options="options" @change="changeCount++" />
    <p>User changes：{{ changeCount }}</p>
    <p role="status">Applied: {{ applied }} · Ignored: {{ ignored }} · Pending: {{ waiting.length }}</p>
  </mp-space>
</template>
```

## API

`ChoiceValue = string | number | boolean`;`CheckboxModel = boolean | ChoiceValue[]`;`RadioModel = ChoiceValue | null`.

### Props

#### RadioGroup Props

| Prop                     | Description                                                     | Type                                       | Default      |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------ | ------------ |
| model-value (v-model) | Controlled value | RadioModel | undefined |
| default-value | Initial uncontrolled value | RadioModel | null |
| `disabled` | Disabled; inherits form when omitted | _boolean_ | `undefined` |
| `readonly` | Read only; inherits form when omitted | _boolean_ | `undefined` |
| `error` | Error; inherits form when omitted | _boolean_ | `undefined` |
| variant | Group appearance | radio \| button | radio |
| size | Button height only | ComponentSize | undefined |
| `direction`              | The layout direction, optional value is `horizontal` `vertical` | _string_                                   | `horizontal` |
| options | Options; replaces default slot when supplied | Array<ChoiceValue \| RadioOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined` |
| `aria-label` _**3.8.5**_ | The label of the radio group                                    | _string_                                   | `-`          |
| field-names | Option field mapping | ChoiceFieldNames | undefined |

#### RadioOption

| Property | Description | Type |
| --- | --- | --- |
| value | Option identity | ChoiceValue |
| label | Label content or render function | VNodeChild \| (data: RadioOption, checked: boolean) => VNodeChild |
| disabled | Disabled | boolean |
| readonly | Read-only | boolean |


#### Radio Props

| Prop              | Description              | Type               | Default |
| ----------------- | ------------------------ | ------------------ | ------- |
| model-value (v-model) | Controlled value | ChoiceValue \| null | undefined |
| default-value | Initial uncontrolled value | ChoiceValue \| null | null |
| variant | Appearance; group takes precedence | radio \| button | radio |
| value | Option identity | string \| number \| boolean | true |
| `checked-color`   | Checked color            | _string_           | `-`     |
| `unchecked-color` | Unchecked color          | _string_           | `-`     |
| `icon-size`       | Icon size                | _string \| number_ | `-`     |
| `readonly` | Inherits group/form when omitted | _boolean_ | `undefined` |
| `error` | Error; inherits group/form | _boolean_ | `undefined` |
| `disabled` | Inherits group/form when omitted | _boolean_ | `undefined` |
| `ripple`          | Whether to open ripple   | _boolean_          | `true`  |

### Methods

#### Radio Methods

| Method   | Description                                                                                                | Arguments    | Return |
| -------- | ---------------------------------------------------------------------------------------------------------- | ------------ | ------ |
| select | Request a selection; obeys disabled/readonly | - | void |
| focus | Focus the control | options?: FocusOptions | void |
| blur | Blur the control | - | void |

### Events

#### RadioGroup Events

| Event    | Description         | Arguments    |
| -------- | ------------------- | ------------ |
| `update:model-value` | Proposes a value | `value: any` |
| `change` | Value changed; emitted by Group only | `value: any, event?: Event` |

#### Radio Events

| Event    | Description         | Arguments    |
| -------- | ------------------- | ------------ |
| `click`  | Triggered on click  | `e: Event`   |
| update:model-value | Proposes a new value | value: ChoiceValue |
| change | Value changed | value: ChoiceValue, event?: Event |
| focus | Focused | event: FocusEvent |
| blur | Blurred | event: FocusEvent |

### Slots

#### RadioGroup Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Children when options is omitted | - |
| label | Option label | data: RadioOption, checked: boolean |

#### Radio Slots

| Name             | Description    | SlotProps |
| ---------------- | -------------- | --------- |
| `checked-icon`   | Checked icon   | `-`       |
| `unchecked-icon` | Unchecked icon | `-`       |
| `default`        | Displayed text | `-`       |

### Style Variables

| Token | Default |
| --- | --- |
| `--mp-radio-control-color-checked` | `var(--mp-sys-color-content-brand)` |
| `--mp-radio-control-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-radio-control-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-radio-control-color-error` | `var(--mp-sys-color-content-danger)` |
| `--mp-radio-control-size` | `24px` |
| `--mp-radio-action-padding` | `6px` |
| `--mp-radio-label-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-radio-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-radio-label-font-size` | `var(--mp-font-size-md)` |
| `--mp-radio-label-gap` | `0` |
| `--mp-radio-group-gap` | `0` |
| `--mp-radio-animation-duration` | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

Exported types：`RadioOption`、`ChoiceFieldNames`。

### Additional native and appearance Props

| Component | Prop | Description | Type | Default |
| --- | --- | --- | --- | --- |
| Radio / RadioGroup | name | Native field name; child overrides group | string | undefined |
| Radio | aria-label | Native accessible name | string | undefined |
| Radio | input-attrs | Native input attributes | InputHTMLAttributes | undefined |

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.


The candidate `options` prop accepts an array or `(query, { signal }) => array/Promise`. Components own loading, cancellation and stale results, and emit load-error on failure. Choice groups initialize with an empty query; searchable fields load when queries change. Root tree loaders remain independent of existing load-more child loading.
