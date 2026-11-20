<!-- Source: src/checkbox/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/checkbox -->

# 复选框

独立 Checkbox 的 modelValue 在布尔模式下表示是否选中，在数组模式下表示选中选项的集合；value 是当前选项的标识。CheckboxGroup 的 modelValue 是选中值数组。defaultValue 只初始化非受控状态，不会回写父级绑定值。

### 介绍

基础示例随站点语言切换显示文案，业务值和选中状态不会随语言变化。分组示例覆盖父级接受/拒绝更新、只读和异步选项回显；移除选项不会清空业务值。外层 Space 纵向布局使用 `direction="column"`，选择组自身纵向使用 `orientation="vertical"`。

在一组备选项中进行多选。

## 阅读方向

复选框标签及分组按来源 dir 排列，业务数组顺序不变。Space 保持切换语义，禁用/只读状态不因方向变化失效；切换 LTR/RTL 不自动勾选或清空选项。

## 基础示例

### 基本使用

Example source: src/checkbox/example/demos/basic-usage.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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

## 分组与布局

### 选项声明方式对比

比较子组件声明和 options 数据声明；两种方式都使用组值，字段映射和异步选项另见对应示例。

<details>
<summary>配置说明与使用限制</summary>

#### 复选框组

在复选框组中，必须给 `checkbox` 设置 `value` 用来标识，
复选框组会收集所有选择的标识。

#### 选项式 API

通过 `options` 属性设置子元素。

</details>

Example source: src/checkbox/example/demos/group-declaration-comparison.vue

```vue
<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, reactive, ref, toRefs } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'
import type { CheckboxGroupInstance } from '@maple-design/ui-vue'

const scene1 = demoProxyRefs(
  (() => {
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
      group: null as CheckboxGroupInstance | null,
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
    return {
      english,
      values,
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
    }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
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
      group: null as CheckboxGroupInstance | null,
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
    return {
      english,
      values,
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
      options,
    }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="checkbox-group">
      <h4><span lang="zh-CN">复选框组</span><span lang="en-US">CheckboxGroup</span></h4>
      <mp-checkbox-group
        :ref="(element: unknown) => (scene1.group = element as CheckboxGroupInstance | null)"
        v-model="scene1.value6"
      >
        <mp-checkbox :value="0">{{ scene1.english ? 'Eat' : '吃饭' }}</mp-checkbox>
        <mp-checkbox :value="1">{{ scene1.english ? 'Sleep' : '睡觉' }}</mp-checkbox>
      </mp-checkbox-group>
      <div class="relation">{{ scene1.english ? 'Current value' : '当前的值' }}: {{ scene1.value6 }}</div>
      <mp-divider spacing="14px" />
      <mp-space wrap :size="[0, 10]">
        <mp-button status="primary" @click="scene1.group?.checkAll()">{{
          scene1.english ? 'Check all' : '全选'
        }}</mp-button>
        <mp-button status="primary" @click="scene1.group?.inverseAll()">{{
          scene1.english ? 'Invert' : '反选'
        }}</mp-button>
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="checkbox-group-options">
      <h4><span lang="zh-CN">选项式 API</span><span lang="en-US">Options API</span></h4>
      <mp-checkbox-group v-model="scene2.optionsValue" :options="scene2.options" />
      <div class="relation">{{ scene2.english ? 'Current value' : '当前的值' }}: {{ scene2.optionsValue }}</div>
    </section>
  </div>
</template>

<style scoped lang="less">
.demo-comparison {
  display: grid;
  gap: 24px;
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case {
  min-width: 0;
  max-width: 100%;
}
.demo-comparison-case > h4 {
  margin: 0 0 12px;
  font-size: 14px;
}
html:not([lang='en-US']) .demo-comparison-case > h4 > [lang='en-US'],
html[lang='en-US'] .demo-comparison-case > h4 > [lang='zh-CN'] {
  display: none;
}
.demo-comparison-case--1 {
  .relation {
    margin-top: 10px;
  }

  .space {
    height: 40px;
  }
}
.demo-comparison-case--2 {
  .relation {
    margin-top: 10px;
  }

  .space {
    height: 40px;
  }
}
</style>
```

### 分组状态与只读

`model-value !== undefined` 表示受控，父级不回写时保留原值；`default-value` 只初始化非受控值。分组内只由 Group 发出 `update:modelValue → change(value, event?)`，并通知 FormItem 一次，子项不重复发值变化事件。
Group 的 `disabled`、`readonly`、`error` 未设置时继承表单，显式 `false` 可以覆盖表单；子项不能绕过 Group 的禁用或只读限制。

Example source: src/checkbox/example/demos/group-state.vue

```vue
<script setup>
import { ref } from 'vue'

const accepted = ref(['a'])
const proposed = ref([])
const readonly = ref(false)
const options = [
  { label: '设备 A', value: 'a' },
  { label: '设备 B', value: 'b' },
]
</script>

<template>
  <mp-space direction="column">
    <div>
      <p>非受控：default-value 只用于初始值</p>
      <mp-checkbox-group :default-value="['a']" :options="options" />
    </div>
    <div>
      <p>受控：父级接受更新 {{ accepted }}</p>
      <mp-checkbox-group v-model="accepted" :options="options" :readonly="readonly" />
      <mp-button size="sm" @click="readonly = !readonly">{{ readonly ? '解除只读' : '设为只读' }}</mp-button>
    </div>
    <div>
      <p>父级拒绝更新：仅记录提议 {{ proposed }}</p>
      <mp-checkbox-group :model-value="[]" :options="options" @update:model-value="proposed = $event" />
    </div>
  </mp-space>
</template>
```

### 垂直布局

Example source: src/checkbox/example/demos/vertical.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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
  <mp-checkbox-group v-model="value9" orientation="vertical">
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

## 选项与值模型

### 独立值模型与方法

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                   | 相关示例                     |
| --------------- | ---------------------- | ---------------------------- |
| `value`         | 选项标识               | 独立值模型与方法、设置状态值 |
| `default-value` | 非受控初始值           | 独立值模型与方法             |
| `readonly`      | 只读，未设置时继承表单 | 独立值模型与方法             |
| `disabled`      | 禁用，未设置时继承表单 | 独立值模型与方法             |

<!-- demo-config-notes:end -->

Checkbox 的布尔模型始终返回 boolean；数组模型按 value 增删选项，不修改传入数组。indeterminate 只用于展示，由业务方计算，不会自动回写。
两端统一使用 `default-value` 初始化非受控值；受控提议被拒绝时保持原值。用户选择按 `update:modelValue → change(value, event?)` 通知，命令式调用的 event 为 undefined。
提供 `toggle(checked?: boolean)`、`focus(options?)`、`blur()`。禁用禁止选择和聚焦，只读允许聚焦、禁止改值。Enter 按下与空格释放激活当前控件，长按不重复激活，失焦/停用会取消待处理的空格操作。

Example source: src/checkbox/example/demos/control-value.vue

```vue
<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(false)
const selected = ref([0])
</script>
<template>
  <mp-space direction="column">
    <p>布尔模型始终返回布尔值；数组模型用 value 标识选项。 当前值：{{ value }}</p>
    <mp-checkbox ref="control" v-model="value">启用通知</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="control?.toggle()">切换选择</mp-button>
      <mp-button size="sm" @click="control?.focus()">聚焦</mp-button>
      <mp-button size="sm" @click="value = false">重置</mp-button>
    </mp-space>
    <p>数组模型：{{ selected }}</p>
    <mp-checkbox v-model="selected" :value="0">数值 0</mp-checkbox>
    <mp-checkbox v-model="selected" :value="false">布尔 false</mp-checkbox>
    <p>只读允许聚焦，禁用不允许操作；Enter/空格只影响当前控件。</p>
    <mp-checkbox :default-value="true" readonly>只读</mp-checkbox>
    <mp-checkbox :default-value="true" disabled>禁用</mp-checkbox>
  </mp-space>
</template>
```

### 选项数据与标签

两端均支持原始值或对象选项。`field-names` 映射 `label/value/disabled/readonly/indeterminate`；只读选项允许聚焦但不能改值，Checkbox 的半选仅用于展示。
`label` 插槽接收 `{ data, checked }`，优先于标签渲染函数 `(data, checked) => VNodeChild`。data 为保留业务字段的归一化副本，不修改输入对象；未提供标签时显示值的文字。
显式传入 `options` 时替代默认插槽，包括 `[]`；不传时使用默认插槽。选项值限字符串、有限数字或布尔值；缺失/非法值及同类型重复值被忽略（保留第一项）。`false`、`0`、`''` 和 `'0'` 是不同选项。异步选项变更不反向修改模型。
CheckboxGroup 使用 `ChoiceValue[]`，`max` 只接受 number，请使用 `:max="2"`。

Example source: src/checkbox/example/demos/option-data.vue

```vue
<script setup lang="ts">
import { h, ref } from 'vue'

const value = ref<Array<string | number | boolean>>(['locked'])
const fields = { value: 'id', label: 'name', disabled: 'unavailable', readonly: 'locked' }
const options = ref([
  { id: false, name: '布尔 false' },
  { id: 0, name: '数字 0' },
  { id: '', name: '空字符串' },
  { id: 'locked', name: '只读选项', locked: true },
  { id: 'disabled', name: '禁用选项', unavailable: true },
])
const renderOptions = [
  { value: 'render', label: (_data: unknown, checked: boolean) => h('strong', checked ? '已选择' : '渲染函数标签') },
]
</script>

<template>
  <section class="option-demo">
    <p>字段映射与标签插槽；只读可聚焦，禁用不可操作。</p>
    <mp-checkbox-group v-model="value" :options="options" :field-names="fields" orientation="vertical">
      <template #label="{ data, checked }">{{ data.label }} {{ checked ? '✓' : '' }}</template>
    </mp-checkbox-group>
    <p>当前值：{{ JSON.stringify(value) }}</p>
    <mp-button @click="value = []">清空</mp-button>
    <p>标签也支持渲染函数；不传 options 时使用默认插槽，传入 [] 时保持空组。</p>
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

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

Example source: src/checkbox/example/demos/custom-fields.vue

```vue
<script setup>
import { computed, reactive, toRefs } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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

### 设置状态值

Example source: src/checkbox/example/demos/set-state.vue

```vue
<script setup>
import { ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const selected = ref([])
</script>
<template>
  <mp-checkbox v-model="selected" :value="1"
    >{{ english ? 'Option 1, selected values: ' : '选项 1，当前选中值：' }}{{ selected }}</mp-checkbox
  >
</template>
```

## 选择与批量操作

### 最大选中数量

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                               | 相关示例     |
| --------------- | ---------------------------------- | ------------ |
| `value`         | 选项标识                           | 最大选中数量 |
| `indeterminate` | 是否为不确定状态（样式优先级最高） | 不确定状态   |
| `disabled`      | 禁用，未设置时继承表单             | 交互状态对比 |
| `readonly`      | 只读，未设置时继承表单             | 交互状态对比 |
| `error`         | 错误态，未设置时继承表单           | 交互状态对比 |

<!-- demo-config-notes:end -->

在复选框组中，可以通过设置 `max` 属性来限制最大选中数量。

> 复选框及复选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

Example source: src/checkbox/example/demos/max.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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

### 不确定状态

Example source: src/checkbox/example/demos/indeterminate.vue

```vue
<script setup>
import { computed, ref } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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

### 分组批量方法

两端提供 `checkAll()` 和 `inverseAll()`，返回独立数组副本。仅操作已挂载且可编辑的子项，保留禁用、只读及未加载的已选值；重复值只要有一项被锁定，该值就不参与批量修改。
`checkAll` 保留原模型顺序，按当前 DOM 顺序追加未选值；`inverseAll` 先移除可编辑的已选值，再按 DOM 顺序加入此前未选值。新增选择遵守 `max`，不裁剪外部传入的超限值。
受控模式返回提议，需父级回写；拒绝的提议不保存。分组禁用/只读时只返回当前值副本。有实际变化才按 `update:modelValue → change(value, undefined) → FormItem` 通知一次，无变化不发事件。
子项重排、挂载、卸载及 KeepAlive 激活/停用会同步更新候选；变更渲染子项后应等待 `nextTick` 再调用方法。

Example source: src/checkbox/example/demos/group-methods.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { CheckboxGroupInstance } from '@maple-design/ui-vue'

const group = ref<CheckboxGroupInstance>()
const value = ref<Array<string | number | boolean>>(['remote', 'locked', 'a'])
const reverse = ref(false)
const proposal = ref<Array<string | number | boolean>>([])
const options = [
  { value: 'a', label: '任务 A' },
  { value: 'b', label: '任务 B' },
  { value: 'c', label: '任务 C' },
  { value: 'locked', label: '只读，保留选择', readonly: true },
  { value: 'disabled', label: '禁用，不参与操作', disabled: true },
]
</script>

<template>
  <section class="group-methods-demo">
    <p>最多选择 4 项（包含未加载的 remote）。全选/反选保留只读和未加载的已选值。</p>
    <mp-checkbox-group
      ref="group"
      v-model="value"
      :options="reverse ? [...options].reverse() : options"
      :max="4"
      orientation="vertical"
    />
    <mp-space wrap>
      <mp-button @click="proposal = group?.checkAll() ?? []">全选</mp-button>
      <mp-button @click="proposal = group?.inverseAll() ?? []">反选</mp-button>
      <mp-button @click="reverse = !reverse">调整选项顺序</mp-button>
    </mp-space>
    <p>当前值：{{ JSON.stringify(value) }}</p>
    <p>方法返回值：{{ JSON.stringify(proposal) }}</p>
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

### 交互状态对比

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于协议确认和独立勾选。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

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

## 控件与插槽定制

### 原生控件与外观

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置              | 作用                               | 相关示例                       |
| ----------------- | ---------------------------------- | ------------------------------ |
| `unchecked-color` | 未选中状态的颜色                   | 修改图标和颜色、自定义控件插槽 |
| `checked-color`   | 选中状态的颜色                     | 修改图标和颜色、自定义控件插槽 |
| `name`            | 组内原生输入字段名                 | 原生控件与外观                 |
| `indeterminate`   | 是否为不确定状态（样式优先级最高） | 原生控件与外观                 |
| `aria-label`      | 分组无障碍名称                     | 原生控件与外观                 |
| `default-value`   | 非受控初始值                       | 原生控件与外观                 |

<!-- demo-config-notes:end -->

Tab 聚焦，空格/Enter 切换；只读可聚焦，禁用不可聚焦。客户端半选通过原生 input 的 `indeterminate` 属性表达；组件管理原生选中状态，不采用传入的 `aria-checked`。SSR 首屏在 hydration 前无法保证向辅助技术传达半选状态。点击标签只激活一次。没有可见标签时设置 aria-label；name 传到原生输入，子项未设置时继承 Group。

icon-size 接受像素数字或 CSS 长度字符串，不是 ComponentSize 档位；默认图标 Cedar 为 14px、Maple 为 24px。实例颜色仅作用于普通状态，错误和禁用颜色优先。checkbox 插槽覆盖整个控件外观（也可在 Group 上统一设置），checked-icon、unchecked-icon、indeterminate-icon 仅替换对应图标。以上图标槽是装饰内容，不应放置另一个独立可聚焦控件。

Example source: src/checkbox/example/demos/native-control.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(false)
const choices = ref(['read'])
</script>
<template>
  <div class="checkbox-native-demo">
    <p>按 Tab 聚焦，按空格或 Enter 切换。禁用项跳过，只读项可聚焦。</p>
    <mp-checkbox v-model="value" name="agreement">接受协议：{{ value ? '已接受' : '未接受' }}</mp-checkbox>
    <mp-checkbox indeterminate aria-label="部分选中" />
    <mp-checkbox :default-value="true" readonly>只读已选</mp-checkbox>
    <mp-checkbox disabled>禁用</mp-checkbox>
    <mp-checkbox error>错误状态</mp-checkbox>
    <mp-checkbox-group
      v-model="choices"
      name="permissions"
      aria-label="权限"
      :max="2"
      :options="[
        { label: '读取', value: 'read' },
        { label: '编辑', value: 'edit' },
        { label: '管理', value: 'admin' },
      ]"
    />
    <p>最多选择两项：{{ choices.join(', ') }}</p>
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

### 修改图标和颜色

Example source: src/checkbox/example/demos/set-style.vue

```vue
<script setup>
import { reactive, toRefs } from 'vue'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

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

### 自定义控件插槽

通过控件插槽替换外观，仍使用相同的值模型和键盘操作。

Example source: src/checkbox/example/demos/custom-control.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>
<template>
  <div class="checkbox-custom-demo">
    <mp-checkbox v-model="checked" :icon-size="28" checked-color="#137547" unchecked-color="#656565"
      >数字尺寸（px）与实例颜色</mp-checkbox
    >
    <mp-checkbox icon-size="1.5rem" :ripple="false">CSS 长度尺寸，无波纹</mp-checkbox>
    <mp-checkbox v-model="checked">
      <template #checked-icon><span class="checkbox-custom-icon" aria-hidden="true">✓</span></template>
      <template #unchecked-icon><span class="checkbox-custom-icon" aria-hidden="true">○</span></template>
      自定义图标，仍保留原生键盘与无障碍语义
    </mp-checkbox>
    <mp-checkbox-group
      :default-value="['a']"
      :options="[
        { label: '方案 A', value: 'a' },
        { label: '方案 B', value: 'b' },
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

## 异步选项

### 异步选项

开启手动返回后，每次加载创建本地 Promise，可分别返回最早或最新任务验证两种乱序。示例业务加载器用版本保护忽略旧响应：旧结果不结束新加载、不清空选择、不释放 `max=2` 名额，也不增加用户变更次数。移除使在途结果失效，新加载仍按保留模型反显；停用或卸载会结清等待并取消定时器。此保护属于示例业务逻辑，不代表组件自动处理网络竞争；不访问外部接口。

选项载入、移除和外部值更新均不会反向触发值变化；未载入的已选值不会自动清理。示例使用 800ms 本地延迟模拟请求；加载中移除选项会取消待完成的加载，避免旧结果重新显示。已选 remote 占一个名额，再选设备 A 后达到 `max=2`，设备 B 将不可选；取消任一已选项会释放名额。外部超限值不会自动裁剪。

等待期间可用空格或 Enter 操作已有选项；同值选项重载后保留键盘焦点和最新选择。加载提示保持稳定节点，避免显隐导致分组重新挂载，取消已选项后仍可继续选择并释放名额。

Example source: src/checkbox/example/demos/async-options.vue

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
      { label: '异步设备', value: 'remote' },
      { label: '设备 A', value: 'a' },
      { label: '设备 B', value: 'b' },
      { label: '停用设备', value: 'locked', disabled: true },
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
    <p>业务值独立于当前选项，加载或移除选项不会清空已选值：{{ value }}</p>
    <mp-checkbox v-model="manual" edit-mode="direct" @change="remove">Manual responses / 手动返回</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="load">加载选项</mp-button>
      <mp-button size="sm" @click="remove">移除选项</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(false)">返回最早加载</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(true)">返回最新加载</mp-button>
    </mp-space>
    <p aria-live="polite">
      {{ loading ? '加载中，可在完成前移除选项以取消本次加载。' : '加载完成后保留当前选值和键盘焦点。' }}
    </p>
    <mp-checkbox-group v-model="value" edit-mode="direct" :options="options" :max="2" @change="changeCount++" />
    <p>用户变更次数：{{ changeCount }}</p>
    <p role="status">Applied: {{ applied }} · Ignored: {{ ignored }} · Pending: {{ waiting.length }}</p>
  </mp-space>
</template>
```

## 原生输入属性与键盘拦截

`id`、`form`、`required`、其他原生约束、`aria-*`、`data-*` 和键盘监听器传给实际 input；`class` / `style` 和其他外壳属性保留在 label。未提供 id 时生成稳定且唯一的原生 id；外部 label[for] 可以关联显式 id。HTML required 参与浏览器原生表单验证，与 Form 的业务校验规则分开。

原生监听的 Once / Capture / Passive 修饰符保留在 input，不会因插槽中嵌套按钮而错误触发。原生键盘监听 preventDefault() 可以阻止 Enter / Space 的组件激活及 RadioGroup 方向键导航；被取消的 Space 不留下延迟释放动作。组件仍管理 checked、disabled、输入类型及分组的 Tab 焦点规则。

Checkbox 的 null 模型仍表示空状态；default / checkbox 插槽中的 checked 始终为 boolean，null 对应 false，不会仅为渲染而提交新模型。

## 使用说明

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(payload, done, context)` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

CheckboxGroup 的 checkAll/inverseAll 仅由活动编辑器执行变更；延迟编辑器关闭、停用或卸载后调用，返回当前业务值的独立数组副本，不打开编辑器或发布模型变化。

## API

### 参数、展示清空与挂载边界

orientation 仅接受 horizontal / vertical，非法值诊断后按 horizontal 展示。max 仅用于 CheckboxGroup：合法值为有限非负整数，0 表示不能新增选择，省略为不限；不裁剪已有外部模型。非法 JS 值诊断后保留既有归一化：负数按 0、小数向下取整、NaN 按不限，Infinity 仍按不限处理。

icon-size 接受正长度，数值和纯数字字符串按 px，允许 0.5 这样的正小数；无效、非正或非有限数值诊断并回退主题，不套用 Divider 的最小 1。CSS 表达式的最终解析值由业务样式负责。

uninject-group-context 在挂载时决定是否接入分组；运行中修改不会重新注入，需改变 key 或重新挂载，脱离分组后仍参与 Form。clearable / empty-value 只控制延迟展示层的显式清空；原生取消勾选仍输出 false 或从数组移除该值，不会使用 empty-value。普通事件返回 Promise 不参与等待；before-commit 仅在延迟保存时按 payload / done / context 协议执行。

显式 options 加载期间，两端分组通过 aria-busy 通知等待，失败发一次 load-error；不增加 loading 属性或额外图形，也不因加载或失败提议新模型。

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[] | null`；`RadioModel = ChoiceValue | null`。

### Checkbox Props

| 属性                   | 说明                               | 类型                     | 默认值    |
| ---------------------- | ---------------------------------- | ------------------------ | --------- |
| model-value (v-model) | 受控值 | CheckboxModel | undefined |
| default-value | 非受控初始值 | CheckboxModel | false |
| value                  | 数组/分组模式的选项标识            | string\|number\|boolean  | true      |
| disabled               | 是否禁用；未设置时继承表单/分组    | boolean                  | undefined |
| readonly               | 是否只读；未设置时继承表单/分组    | boolean                  | undefined |
| error                  | 错误态；未设置时继承表单/分组      | boolean                  | undefined |
| indeterminate          | 是否为半选状态                     | boolean                  | false     |
| checked-color          | 实例选中颜色；错误/禁用优先        | string                   | undefined |
| unchecked-color        | 实例未选中颜色；错误/禁用优先      | string                   | undefined |
| icon-size | 正长度；非法值诊断并回退主题 | number \| string | undefined |
| ripple                 | 是否启用波纹                       | boolean                  | true      |
| uninject-group-context | 脱离外层 CheckboxGroup，仍参与表单 | boolean                  | false     |
| name                   | 原生字段名，未设置时继承 Group     | string                   | undefined |
| aria-label             | 无可见标签时的无障碍名称           | string                   | undefined |
| edit-mode | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| clearable | 延迟编辑层清空操作，不改变原生取消选择 | `boolean` | `false` |
| empty-value | 展示层显式清空输出，不控制原生取消勾选 | `CheckboxModel \| (() => CheckboxModel)` | `false` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |

### CheckboxGroup Props

| 属性                  | 说明                                                        | 类型                                                                                                       | 默认值       |
| --------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------ |
| model-value (v-model) | 受控值 | ChoiceValue[] \| null | undefined |
| default-value         | 非受控初始值                                                | ChoiceValue[]                                                                                              | []           |
| max                   | 最多可选数量                                                | number                                                                                                     | undefined    |
| options               | 选项；传入时替代默认插槽                                    | Array<ChoiceValue \| CheckboxOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined`  |
| orientation           | 复选组内选项的横纵排列，默认 horizontal；不表示文字阅读方向 | Orientation<br>`'horizontal' \| 'vertical'` | 'horizontal' |
| disabled              | 是否禁用；未设置时继承表单/分组                             | boolean                                                                                                    | undefined    |
| readonly              | 是否只读；未设置时继承表单/分组                             | boolean                                                                                                    | undefined    |
| error                 | 错误态；未设置时继承表单/分组                               | boolean                                                                                                    | undefined    |
| field-names           | 选项字段映射                                                | ChoiceFieldNames                                                                                           | undefined    |
| name                  | 组内原生输入字段名                                          | string                                                                                                     | undefined    |
| aria-label            | 分组无障碍名称                                              | string                                                                                                     | undefined    |
| edit-mode | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| clearable | 延迟编辑层清空操作，不改变原生取消选择 | `boolean` | `false` |
| empty-value | 展示层显式清空输出，不控制原生取消勾选 | `ChoiceValue[] \| null \| (() => ChoiceValue[] \| null)` | `[]` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |

### Checkbox Methods

| 方法名 | 说明                        | 参数                   | 返回值 |
| ------ | --------------------------- | ---------------------- | ------ |
| toggle | 请求选择；遵守禁用/只读限制 | checked?: boolean      | void   |
| focus  | 聚焦控件                    | options?: FocusOptions | void   |
| blur   | 失焦控件                    | -                      | void   |

### CheckboxGroup Methods

| 方法       | 参数 | 返回值        |
| ---------- | ---- | ------------- |
| checkAll   | -    | ChoiceValue[] |
| inverseAll | -    | ChoiceValue[] |

### Checkbox Events

| 事件名             | 说明             | 参数                                |
| ------------------ | ---------------- | ----------------------------------- |
| update:modelValue | 提议新值         | value: CheckboxModel                |
| change             | 值变化           | value: CheckboxModel, event?: Event |
| click              | 点击；禁用不触发 | event: MouseEvent                   |
| focus              | 聚焦             | event: FocusEvent                   |
| blur               | 失焦             | event: FocusEvent                   |
| update:open | 编辑层受控开关更新 | open: boolean |
| open-change | 编辑层实际开关变化 | open: boolean |

### CheckboxGroup Events

| 事件名             | 说明                        | 参数                                               |
| ------------------ | --------------------------- | -------------------------------------------------- |
| update:modelValue | 提议新值 | value: ChoiceValue[] \| null |
| change | 值变化提案 | value: ChoiceValue[] \| null, event?: Event |
| update:open | 编辑层受控开关更新 | open: boolean |
| open-change | 编辑层实际开关变化 | open: boolean |
| load-error | 显式选项加载失败，不改变模型 | error: unknown |

### Checkbox Slots

| 插槽名             | 说明               | 参数                                                        |
| ------------------ | ------------------ | ----------------------------------------------------------- |
| checkbox           | 自定义完整控件外观 | checked: boolean, disabled: boolean, indeterminate: boolean |
| checked-icon       | 选中图标           | -                                                           |
| unchecked-icon     | 未选中图标         | -                                                           |
| indeterminate-icon | 半选图标           | -                                                           |
| default            | 标签               | checked: boolean                                            |
| read | 自定义阅读内容，优先于 empty-text | value: CheckboxModel, text: string |

### CheckboxGroup Slots

| 插槽名   | 说明              | 参数                                   |
| -------- | ----------------- | -------------------------------------- |
| checkbox | 自定义复选框      | checked: boolean<br/>disabled: boolean<br/>indeterminate: boolean |
| label    | checkbox 文案内容 | data: CheckboxOption, checked: boolean |
| read | 自定义阅读内容，优先于 empty-text | value: ChoiceValue[] \| null, text: string |
| default | 未提供 options 时的原生子选项 | - |

## Types

### CheckboxOption

| 字段          | 说明           | 类型                                                                 |
| ------------- | -------------- | -------------------------------------------------------------------- |
| value         | 选项标识       | ChoiceValue                                                          |
| label         | 标签或渲染函数 | VNodeChild \| (data: CheckboxOption, checked: boolean) => VNodeChild |
| disabled      | 禁用           | boolean                                                              |
| readonly      | 只读           | boolean                                                              |
| indeterminate | 仅展示半选状态 | boolean                                                              |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

公开导出类型：`CheckboxOption`、`ChoiceFieldNames`、`CheckboxSlots`、`CheckboxGroupSlots`；根入口和子入口保持一致。

公开方法类型：`CheckboxGroupMethods`；`CheckboxGroupInstance` 包含上述方法。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-checkbox-action-padding` | `6px` | `padding` |
| `--mp-checkbox-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-checkbox-control-border-radius` | `2px` | `border-radius` |
| `--mp-checkbox-control-color` | `var(--mp-sys-color-border-default)` | `color` |
| `--mp-checkbox-control-color-checked` | `var(--mp-sys-color-action-primary)` | `color`, `outline` |
| `--mp-checkbox-control-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-checkbox-control-color-error` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-checkbox-control-size` | `24px` | `height`, `width` |
| `--mp-checkbox-group-gap` | `0` | `gap` |
| `--mp-checkbox-label-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-checkbox-label-gap` | `0` | `margin-inline-start` |
| `--mp-checkbox-label-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-checkbox-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-checkbox-mark-color` | `var(--mp-sys-color-content-on-bright)` | `background-color`, `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-checkbox-action-padding: 6px;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
