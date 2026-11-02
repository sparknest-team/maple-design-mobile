<!-- Source: src/checkbox/docs/en-US.md; locale: en-US; page: /en-US/checkbox -->

# Checkbox

Standalone Checkbox modelValue is a boolean checked state, or an array of selected option values in array mode. The value prop identifies this option; it is not the checked state. CheckboxGroup modelValue is the selected values array. defaultValue initializes uncontrolled state only and does not write into the parent.

## Examples

### Intro

Basic demos follow the site language without changing business values or selection. Group demos cover accepted/rejected updates, readonly state and asynchronous option labels; removing options does not clear the model. Use `direction="column"` on the outer Space and `direction="vertical"` on the choice group itself.

A group of options for multiple choices.

### Basic Usage

Example source: src/checkbox/example/demos/basic-usage.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
</script>

<template>
  <mp-checkbox v-model="value">{{ english ? 'Current value' : '当前的值' }}: {{ value }}</mp-checkbox>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Disabled

Example source: src/checkbox/example/demos/disabled.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
</script>

<template>
  <mp-checkbox v-model="value4" disabled>{{ english ? 'Current value' : '当前的值' }}: {{ value4 }}</mp-checkbox>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Readonly

Example source: src/checkbox/example/demos/readonly.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
</script>

<template>
  <mp-checkbox v-model="value5" readonly>{{ english ? 'Current value' : '当前的值' }}: {{ value5 }}</mp-checkbox>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Set State Value

Example source: src/checkbox/example/demos/set-state.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const selected = ref([])
</script>
<template>
  <mp-checkbox v-model="selected" :value="1"
    >{{ english ? 'Option 1, selected values: ' : '选项 1，当前选中值：' }}{{ selected }}</mp-checkbox
  >
</template>
```

### Modify The Icon And Color

Example source: src/checkbox/example/demos/set-style.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
</script>

<template>
  <mp-checkbox v-model="value3" unchecked-color="var(--mp-color-warning)" checked-color="var(--mp-color-danger)">
    <template #unchecked-icon>
      <m-icon-heart-half-full size="24px" />
    </template>
    <template #checked-icon>
      <m-icon-heart-fill size="24px" />
    </template>
    <template #default> {{ english ? 'Current value' : '当前的值' }}: {{ value3 }} </template>
  </mp-checkbox>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Indeterminate

Example source: src/checkbox/example/demos/indeterminate.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { watchLang } from '@maple-design/cli/client'

const demoLanguage = ref('zh-CN')
const english = computed(() => demoLanguage.value === 'en-US')
watchLang((value) => {
  demoLanguage.value = value
})

const selected = ref(['a'])
const all = computed({
  get: () => selected.value.length === 2,
  set: (value) => {
    selected.value = value ? ['a', 'b'] : []
  },
})
const indeterminate = computed(() => selected.value.length > 0 && selected.value.length < 2)
</script>
<template>
  <mp-space direction="column">
    <mp-checkbox v-model="all" :indeterminate="indeterminate">{{
      english ? 'Check all (mixed state derives from selected values)' : '全选（半选状态由业务值计算）'
    }}</mp-checkbox>
    <mp-checkbox-group
      v-model="selected"
      :options="[
        { label: english ? 'Device A' : '设备 A', value: 'a' },
        { label: english ? 'Device B' : '设备 B', value: 'b' },
      ]"
    />
  </mp-space>
</template>
```

### CheckboxGroup

In the checkbox group, you must set the `value` to identify the `checkbox`,
The checkbox group collects all checked identifiers.

Example source: src/checkbox/example/demos/checkbox-group.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
</script>

<template>
  <mp-checkbox-group ref="group" v-model="value6">
    <mp-checkbox :value="0">{{ english ? 'Eat' : '吃饭' }}</mp-checkbox>
    <mp-checkbox :value="1">{{ english ? 'Sleep' : '睡觉' }}</mp-checkbox>
  </mp-checkbox-group>
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ value6 }}</div>
  <mp-divider spacing="14px" />
  <mp-space wrap :size="[0, 10]">
    <mp-button status="primary" @click="$refs.group.checkAll()">{{ english ? 'Check all' : '全选' }}</mp-button>
    <mp-button status="primary" @click="$refs.group.inverseAll()">{{ english ? 'Invert' : '反选' }}</mp-button>
  </mp-space>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Options API

Setting child elements via the `options` prop.

Example source: src/checkbox/example/demos/checkbox-group-options.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
const options = computed(() => [
  { label: english.value ? 'Eat' : '吃饭', value: 0 },
  { label: english.value ? 'Sleep' : '睡觉', value: 1 },
  { label: english.value ? 'Game' : '游戏', value: 2, disabled: true },
])
</script>

<template>
  <mp-checkbox-group v-model="optionsValue" :options="options" />
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ optionsValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Custom Fields

Customize the format of the data in `options` through the `field-names` attribute.

Example source: src/checkbox/example/demos/custom-fields.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
const options = computed(() => [
  { label: english.value ? 'Eat' : '吃饭', value: 0 },
  { label: english.value ? 'Sleep' : '睡觉', value: 1 },
  { label: english.value ? 'Game' : '游戏', value: 2, disabled: true },
])
const fieldOptions = computed(() => [
  { name: english.value ? 'Eat' : '吃饭', id: 0 },
  { name: english.value ? 'Sleep' : '睡觉', id: 1 },
  { name: english.value ? 'Game' : '游戏', id: 2 },
])
</script>

<template>
  <mp-checkbox-group v-model="fieldValue" :options="fieldOptions" :field-names="{ label: 'name', value: 'id' }" />
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ fieldValue }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Vertical Direction

Example source: src/checkbox/example/demos/vertical.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
</script>

<template>
  <mp-checkbox-group v-model="value9" direction="vertical">
    <mp-checkbox :value="0">{{ english ? 'Eat' : '吃饭' }}</mp-checkbox>
    <mp-checkbox :value="1">{{ english ? 'Sleep' : '睡觉' }}</mp-checkbox>
  </mp-checkbox-group>
  <div class="relation">{{ english ? 'Current value' : '当前的值' }}: {{ value9 }}</div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Maximum Number Of Checked

In a checkbox group, you can limit the maximum number of selections by setting `max`.

> For form validation of checkbox and checkbox group, please use the [FormItem component](#/en-US/form-item).

Example source: src/checkbox/example/demos/max.vue

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
  value6: [],
  value9: [],
  value10: false,
  value11: [],
  group: null,
  indeterminate: true,
  optionsValue: [],
  fieldValue: [],
})
const {
  value,
  value2,
  value3,
  value4,
  value5,
  value6,
  value9,
  group,
  value10,
  value11,
  indeterminate,
  optionsValue,
  fieldValue,
} = toRefs(values)
</script>

<template>
  <mp-checkbox-group v-model="value11" :max="1">
    <mp-checkbox :value="0">{{ english ? 'Eat' : '吃饭' }}</mp-checkbox>
    <mp-checkbox :value="1">{{ english ? 'Sleep' : '睡觉' }}</mp-checkbox>
  </mp-checkbox-group>

  <div class="space"></div>
</template>

<style lang="less" scoped>
.relation {
  margin-top: 10px;
}

.space {
  height: 40px;
}
</style>
```

### Group state and readonly

A defined `model-value` is controlled: rejected updates do not change the selection. `default-value` initializes uncontrolled state only. Only Group emits `update:model-value → change(value, event?)` and notifies FormItem once; children do not duplicate these notifications.
Group inherits `disabled`, `readonly` and `error` from the form when omitted. An explicit `false` overrides the form; children cannot bypass a locked group.

Example source: src/checkbox/example/demos/en-US/group-state.vue

```vue
<script setup>
import { ref } from 'vue'

const accepted = ref(['a'])
const proposed = ref([])
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
      <mp-checkbox-group :default-value="['a']" :options="options" />
    </div>
    <div>
      <p>Controlled: parent accepts updates {{ accepted }}</p>
      <mp-checkbox-group v-model="accepted" :options="options" :readonly="readonly" />
      <mp-button size="sm" @click="readonly = !readonly">{{ readonly ? 'Unlock' : 'Read only' }}</mp-button>
    </div>
    <div>
      <p>Parent rejects updates; proposals only {{ proposed }}</p>
      <mp-checkbox-group :model-value="[]" :options="options" @update:model-value="proposed = $event" />
    </div>
  </mp-space>
</template>
```

### Standalone values and methods

Checkbox boolean models emit booleans. Array models add/remove the option value without mutating the input array. indeterminate is presentation-only and must be derived by the application.
Use `default-value` only to initialize uncontrolled state. Rejected controlled proposals preserve the current selection. The event order is `update:model-value → change(value, event?)`; imperative calls have no native event.
Methods are `toggle(checked?: boolean)`, `focus(options?)` and `blur()`. Disabled controls cannot select or focus; readonly controls can focus but cannot change value. Enter on keydown and Space on keyup activate only the local control. Repeated Enter is ignored; blur/deactivation cancels pending Space activation.

Example source: src/checkbox/example/demos/en-US/control-value.vue

```vue
<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(false)
const selected = ref([0])
</script>
<template>
  <mp-space direction="column">
    <p>Boolean models emit booleans; array models use value as the option ID. Current value:{{ value }}</p>
    <mp-checkbox ref="control" v-model="value">Enable notifications</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="control?.toggle()">Toggle selection</mp-button>
      <mp-button size="sm" @click="control?.focus()">Focus</mp-button>
      <mp-button size="sm" @click="value = false">Reset</mp-button>
    </mp-space>
    <p>Array model:{{ selected }}</p>
    <mp-checkbox v-model="selected" :value="0">Number 0</mp-checkbox>
    <mp-checkbox v-model="selected" :value="false">Boolean false</mp-checkbox>
    <p>
      Read-only controls can receive focus; disabled controls cannot be edited. Enter/Space activates only this control.
    </p>
    <mp-checkbox :default-value="true" readonly>Read only</mp-checkbox>
    <mp-checkbox :default-value="true" disabled>Disabled</mp-checkbox>
  </mp-space>
</template>
```

### Option data and labels

Both libraries accept primitive options or objects. `field-names` maps `label/value/disabled/readonly/indeterminate`; read-only options remain focusable but cannot change the value. Checkbox indeterminate is presentation only.
The `label` slot receives `{ data, checked }` and takes precedence over a label render function `(data, checked) => VNodeChild`. Data is normalized and retains business fields; source objects are not mutated. Missing labels fall back to the value's text.
Providing `options` replaces the default slot, including `[]`; omit it to use the default slot. Values must be strings, finite numbers or booleans; missing/invalid values and duplicate values of the same type are skipped (first occurrence wins). `false`, `0`, `''` and `'0'` remain distinct. Option changes never rewrite the model.
CheckboxGroup uses `ChoiceValue[]`; `max` is a number (use `:max="2"`).

Example source: src/checkbox/example/demos/en-US/option-data.vue

```vue
<script setup lang="ts">
import { h, ref } from 'vue'

const value = ref<Array<string | number | boolean>>(['locked'])
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
    <mp-checkbox-group v-model="value" :options="options" :field-names="fields" direction="vertical">
      <template #label="{ data, checked }">{{ data.label }} {{ checked ? '✓' : '' }}</template>
    </mp-checkbox-group>
    <p>Current value: {{ JSON.stringify(value) }}</p>
    <mp-button @click="value = []">Clear</mp-button>
    <p>
      Labels also support render functions. Omitting options uses the default slot; passing [] renders an empty group.
    </p>
    <mp-checkbox-group :options="renderOptions" />
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

### Group bulk methods

Both libraries expose `checkAll()` and `inverseAll()`, returning a detached array. They operate on mounted, editable children only and preserve selected disabled, read-only or unloaded values. A duplicate value is locked if any child with that value is locked.
`checkAll` preserves the existing model order and appends missing values in current DOM order; `inverseAll` removes editable selected values before adding previously unselected values. Both enforce `max` without pruning external over-limit values.
Controlled groups return proposals and require parent updates; rejected proposals are not saved. Disabled/read-only groups return a copy of the current value. Actual changes notify `update:model-value → change(value, undefined) → FormItem` once; no-op calls stay silent.
Reordering, mounting, unmounting and KeepAlive activation are read correctly; call methods after `nextTick` when the rendered children change.

Example source: src/checkbox/example/demos/en-US/group-methods.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupInstance } from '@maple-design/ui'

const group = ref<CheckboxGroupInstance>()
const value = ref<Array<string | number | boolean>>(['remote', 'locked', 'a'])
const reverse = ref(false)
const proposal = ref<Array<string | number | boolean>>([])
const options = [
  { value: 'a', label: 'Task A' },
  { value: 'b', label: 'Task B' },
  { value: 'c', label: 'Task C' },
  { value: 'locked', label: 'Read-only, selection preserved', readonly: true },
  { value: 'disabled', label: 'Disabled, excluded from bulk changes', disabled: true },
]
</script>

<template>
  <section class="group-methods-demo">
    <p>
      Select up to 4 values, including the unloaded remote value. Bulk operations preserve read-only and unloaded
      selections.
    </p>
    <mp-checkbox-group
      ref="group"
      v-model="value"
      :options="reverse ? [...options].reverse() : options"
      :max="4"
      direction="vertical"
    />
    <mp-space wrap>
      <mp-button @click="proposal = group?.checkAll() ?? []">Check all</mp-button>
      <mp-button @click="proposal = group?.inverseAll() ?? []">Invert</mp-button>
      <mp-button @click="reverse = !reverse">Reverse option order</mp-button>
    </mp-space>
    <p>Current value: {{ JSON.stringify(value) }}</p>
    <p>Returned proposal: {{ JSON.stringify(proposal) }}</p>
  </section>
</template>

<style scoped>
.group-methods-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.group-methods-demo p {
  margin: 0;
}
</style>
```

### Native controls and appearance

Both libraries use independently copied native checkbox and label bodies. Tab focuses, Space/Enter toggles. A readonly control stays focusable; a disabled control is not focusable. Mixed state is exposed as aria-checked="mixed". A label click triggers one activation. Use aria-label when no visible label is supplied; name is forwarded to native inputs and inherited from the group.

The icon-size prop is a pixel number or CSS length string, not a ComponentSize preset. The default control size is 14px in Cedar and 24px in Maple. Instance colors apply to ordinary states; error and disabled colors take precedence. The checkbox slot overrides the whole visual control (including the group's checkbox slot), while checked-icon, unchecked-icon and indeterminate-icon replace only each icon. These slots are decorative: do not put independent focusable controls inside them.

Example source: src/checkbox/example/demos/en-US/native-control.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
const choices = ref(['read'])
</script>
<template>
  <div class="checkbox-native-demo">
    <p>Tab focuses; Space or Enter toggles. Disabled items are skipped; readonly items remain focusable.</p>
    <mp-checkbox v-model="value" name="agreement">Agreement: {{ value ? 'accepted' : 'not accepted' }}</mp-checkbox>
    <mp-checkbox indeterminate aria-label="Partially selected" />
    <mp-checkbox :default-value="true" readonly>Readonly checked</mp-checkbox>
    <mp-checkbox disabled>Disabled</mp-checkbox>
    <mp-checkbox error>Error state</mp-checkbox>
    <mp-checkbox-group
      v-model="choices"
      name="permissions"
      aria-label="Permissions"
      :max="2"
      :options="[
        { label: 'Read', value: 'read' },
        { label: 'Edit', value: 'edit' },
        { label: 'Admin', value: 'admin' },
      ]"
    />
    <p>Select up to two: {{ choices.join(', ') }}</p>
  </div>
</template>
<style scoped>
.checkbox-native-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.checkbox-native-demo p {
  margin: 0;
}
</style>
```

### Custom control slot

Replace the appearance while retaining the same value model and keyboard interaction.

Example source: src/checkbox/example/demos/en-US/custom-control.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
<template>
  <div class="checkbox-custom-demo">
    <mp-checkbox v-model="checked" :icon-size="28" checked-color="#137547" unchecked-color="#656565"
      >Pixel size and instance colors</mp-checkbox
    >
    <mp-checkbox icon-size="1.5rem" :ripple="false">CSS length without ripple</mp-checkbox>
    <mp-checkbox v-model="checked">
      <template #checked-icon><span class="checkbox-custom-icon" aria-hidden="true">✓</span></template>
      <template #unchecked-icon><span class="checkbox-custom-icon" aria-hidden="true">○</span></template>
      Custom icons retain native keyboard and accessibility semantics
    </mp-checkbox>
    <mp-checkbox-group
      :default-value="['a']"
      :options="[
        { label: 'Plan A', value: 'a' },
        { label: 'Plan B', value: 'b' },
      ]"
    >
      <template #checkbox="{ checked: selected }"
        ><span class="checkbox-custom-icon">{{ selected ? '✓' : '○' }}</span></template
      >
    </mp-checkbox-group>
  </div>
</template>
<style scoped>
.checkbox-custom-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.checkbox-custom-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid currentColor;
  border-radius: 4px;
}
</style>
```

### Interaction states

Use this example for agreement and independent checks. Adjust disabled, read-only, error feedback and compare the component with the same data. The controls remain available to restore editing; error appearance alone does not run validation.

Example source: src/checkbox/example/demos/state-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, ref } from 'vue'

const value = ref(false)
const __demoState = __demoReactive({ disabled: false, readonly: false, error: false })
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-space wrap>
      <mp-checkbox v-model="__demoState['disabled']">disabled</mp-checkbox>
      <mp-checkbox v-model="__demoState['readonly']">readonly</mp-checkbox>
      <mp-checkbox v-model="__demoState['error']">error</mp-checkbox>
    </mp-space>
    <mp-checkbox v-model="value" v-bind="__demoState">同意条款</mp-checkbox>
  </mp-space>
</template>
```

### Asynchronous options

Enable manual responses to create local Promises and resolve the oldest or newest load in either order. The demo loader uses a version guard: obsolete responses cannot finish a newer load, clear selections, release a `max=2` slot, or increment user changes. Removing options invalidates in-flight results; a fresh load reflects the retained model. Deactivation or unmount settles waiting jobs and cancels timers. This is demo business logic, not automatic network-race handling by the component; no external service is used.

Loading/removing options or updating the external value never emits reverse updates. Selected values absent from the current options are retained. This demo simulates a request with an 800ms local delay; removing options while loading cancels the pending result so stale options do not reappear. The selected remote value occupies one slot; selecting Device A reaches `max=2` and disables Device B. Deselecting either item frees a slot. External over-limit values are not truncated.

Use Space or Enter on existing options while waiting. Reloading the same values preserves keyboard focus and the latest selection. Keep the loading-status node stable to avoid remounting the group; deselecting an item still frees a slot for another choice.

Example source: src/checkbox/example/demos/en-US/async-options.vue

```vue
<script setup>
import { onDeactivated, onUnmounted, ref, shallowRef } from 'vue'

const value = ref(['remote'])
const options = ref([])
const loading = ref(false)
let pendingTimer
const manual = ref(false)
const waiting = shallowRef([])
const applied = ref(0)
const ignored = ref(0)
const changeCount = ref(0)
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
      { label: 'Device B', value: 'b' },
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
  <mp-space class="checkbox-async-demo" direction="column">
    <p>Values survive loading and removing options:{{ value }}</p>
    <mp-checkbox v-model="manual" @change="remove">Manual responses / 手动返回</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="load">Load options</mp-button>
      <mp-button size="sm" @click="remove">Remove options</mp-button>
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
    <mp-checkbox-group v-model="value" :options="options" :max="2" @change="changeCount++" />
    <p>User changes：{{ changeCount }}</p>
    <p role="status">Applied: {{ applied }} · Ignored: {{ ignored }} · Pending: {{ waiting.length }}</p>
  </mp-space>
</template>
```

## API

`ChoiceValue = string | number | boolean`;`CheckboxModel = boolean | ChoiceValue[]`;`RadioModel = ChoiceValue | null`.

### Props

#### CheckboxGroup Props

| Prop                   | Description                                                     | Type                                       | Default      |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------ | ------------ |
| model-value (v-model) | Controlled value | ChoiceValue[] | undefined |
| default-value | Initial uncontrolled value | ChoiceValue[] | [] |
| `disabled` | Disabled; inherits form when omitted | _boolean_ | `undefined` |
| `readonly` | Read only; inherits form when omitted | _boolean_ | `undefined` |
| `error` | Error; inherits form when omitted | _boolean_ | `undefined` |
| max | Maximum selection count | number | undefined |
| `direction`            | The layout direction, optional value is `horizontal` `vertical` | _string_                                   | `horizontal` |
| options | Options; replaces default slot when supplied | Array<ChoiceValue \| CheckboxOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined` |
| field-names | Option field mapping | ChoiceFieldNames | undefined |
| name | Native input name inherited by children | string | undefined |
| aria-label | Accessible group name | string | undefined |

#### CheckboxOption

| Property | Description | Type |
| --- | --- | --- |
| value | Option identity | ChoiceValue |
| label | Label content or render function | VNodeChild \| (data: CheckboxOption, checked: boolean) => VNodeChild |
| disabled | Disabled | boolean |
| readonly | Read-only | boolean |
| indeterminate | Presentation-only mixed state | boolean |


#### Checkbox Props

| Prop              | Description                                                  | Type               | Default |
| ----------------- | ------------------------------------------------------------ | ------------------ | ------- |
| model-value (v-model) | Controlled value | boolean \| ChoiceValue[] | undefined |
| default-value | Initial uncontrolled value | boolean \| ChoiceValue[] | false |
| value | Option identity | string \| number \| boolean | true |
| `checked-color`   | Checked color                                                | _string_           | `-`     |
| `unchecked-color` | Unchecked color                                              | _string_           | `-`     |
| `icon-size`       | Icon size                                                    | _string \| number_ | `-`     |
| `disabled` | Inherits group/form when omitted | _boolean_ | `undefined` |
| `readonly` | Inherits group/form when omitted | _boolean_ | `undefined` |
| `error` | Error; inherits group/form | _boolean_ | `undefined` |
| `indeterminate`   | Whether indeterminate status(style has the highest priority) | _boolean_          | `false` |
| uninject-group-context | Ignore surrounding CheckboxGroup; form state still applies | boolean | false |
| name | Native name, inherited from Group | string | undefined |
| aria-label | Accessible name without visible label | string | undefined |
| `ripple`          | Whether to open ripple                                       | _boolean_          | `true`  |

### Methods

#### CheckboxGroup Methods

| Method | Parameters | Return value |
| --- | --- | --- |
| checkAll | - | ChoiceValue[] |
| inverseAll | - | ChoiceValue[] |


#### Checkbox Methods

| Method   | Description                                                                                                | Arguments     | Return |
| -------- | ---------------------------------------------------------------------------------------------------------- | ------------- | ------ |
| toggle | Request a selection; obeys disabled/readonly | checked?: boolean | void |
| focus | Focus the control | options?: FocusOptions | void |
| blur | Blur the control | - | void |

### Events

#### CheckboxGroup Events

| Event    | Description         | Arguments      |
| -------- | ------------------- | -------------- |
| `update:model-value` | Proposes a value | `value: ChoiceValue[]` |
| `change` | Value changed; emitted by Group only | `value: ChoiceValue[], event?: Event` |

#### Checkbox Events

| Event    | Description         | Arguments    |
| -------- | ------------------- | ------------ |
| `click`  | Triggered on Click  | `e: Event`   |
| update:model-value | Proposes a new value | value: CheckboxModel |
| change | Value changed | value: CheckboxModel, event?: Event |
| focus | Focused | event: FocusEvent |
| blur | Blurred | event: FocusEvent |

### Slots

#### CheckboxGroup Slots

| Slot | Description | Parameters |
| --- | --- | --- |
| default | Children when options is omitted | - |
| label | Option label | data: CheckboxOption, checked: boolean |

#### Checkbox Slots

The component and group both support the checkbox slot with { checked, disabled, indeterminate }.


| Name                 | Description        | SlotProps                     |
| -------------------- | ------------------ | ----------------------------- |
| `checked-icon`       | Checked icon       | `-`                           |
| `unchecked-icon`     | Unchecked icon     | `-`                           |
| `indeterminate-icon` | Indeterminate icon | `-`                           |
| `default`            | Displayed text     | `checked: boolean` is checked |

### Style Variables

| Token | Default |
| --- | --- |
| `--mp-checkbox-control-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-checkbox-control-color-checked` | `var(--mp-sys-color-content-brand)` |
| `--mp-checkbox-control-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-checkbox-control-color-error` | `var(--mp-sys-color-content-danger)` |
| `--mp-checkbox-control-size` | `24px` |
| `--mp-checkbox-label-text-color` | `var(--mp-sys-color-content-primary)` |
| `--mp-checkbox-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |
| `--mp-checkbox-label-font-size` | `var(--mp-font-size-md)` |
| `--mp-checkbox-label-gap` | `0` |
| `--mp-checkbox-action-padding` | `6px` |
| `--mp-checkbox-group-gap` | `0` |
| `--mp-checkbox-animation-duration` | `var(--mp-sys-motion-duration-standard)` |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

Exported types：`CheckboxOption`、`ChoiceFieldNames`。

Public method type：`CheckboxGroupMethods`；`CheckboxGroupInstance` includes these methods.

### Reduced motion

Built-in CSS transitions respect `prefers-reduced-motion: reduce`. Final visibility, checked/expanded state and event semantics remain unchanged; custom slot animations are controlled by the application.

### Form field presentation and confirmation

`presentation` inherits from field > FormItem > Form and defaults to `inline`. Supported values are `inline / popup`. Inline keeps the existing control behavior. Overlay editing uses a Cell reference and an isolated draft; only confirmation updates v-model. Cancel, reset and enabling readPretty discard the draft.

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` can reject an overlay save. FormItem validates the candidate first and keeps the editor open on failure. `open / default-open / update:open` control the editor. Use `#read="{ value, text }"` to customize display. See the full field comparison in Form.

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


`empty-value` accepts explicit `null` (or `() => null`). Clearing publishes null unchanged; omitted values preserve the existing default. Editors render null as blank without converting ordinary empty-string input to null. In popup editing, clearing changes the draft; confirm commits it and cancel preserves the original model.


The candidate `options` prop accepts an array or `(query, { signal }) => array/Promise`. Components own loading, cancellation and stale results, and emit load-error on failure. Choice groups initialize with an empty query; searchable fields load when queries change. Root tree loaders remain independent of existing load-more child loading.
