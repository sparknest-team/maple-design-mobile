<!-- Source: src/radio/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/radio -->

# 单选框

### 介绍

基础示例随站点语言切换显示文案，业务值和选中状态不会随语言变化。分组示例覆盖父级接受/拒绝更新、只读和异步选项回显；移除选项不会清空业务值。外层 Space 纵向布局使用 `direction="column"`，选择组自身纵向使用 `orientation="vertical"`。

在一组备选项中进行单选。

## 阅读方向

单选组继承来源 dir。RTL 的左右方向键按可见方向移动，跳过禁用项；上下键、Home/End 保持逻辑顺序。普通与按钮式单选组均保留单一 Tab 入口，方向切换不修改已选业务值。

## 基础示例

### 基本使用

Example source: src/radio/example/demos/basic-usage.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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

## 外观与状态

### 禁用

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                   | 相关示例 |
| ---------- | ---------------------- | -------- |
| `disabled` | 禁用，未设置时继承表单 | 禁用     |
| `readonly` | 只读，未设置时继承表单 | 只读     |

<!-- demo-config-notes:end -->

Example source: src/radio/example/demos/disabled.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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

### 只读

Example source: src/radio/example/demos/readonly.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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

## 分组与布局

### 单选组声明方式

比较子项与 options 声明，选择不同项观察组值；自定义字段与异步数据仍单独展示。

<details>
<summary>配置说明与使用限制</summary>

#### 单选框组

在单选框组中，需要给 `radio` 设置 `value` 用来标识，
单选框组会绑定选择的标识。

#### 选项式 API

通过 `options` 属性设置子元素。

</details>

Example source: src/radio/example/demos/group-declaration-comparison.vue

```vue
<script setup lang="ts">
import { computed, proxyRefs as demoProxyRefs, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

const scene1 = demoProxyRefs(
  (() => {
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
    return {
      demoLanguage,
      english,
      values,
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value9,
      optionValue,
      fieldValue,
    }
  })(),
)

const scene2 = demoProxyRefs(
  (() => {
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
    return {
      demoLanguage,
      english,
      values,
      value,
      value2,
      value3,
      value4,
      value5,
      value6,
      value9,
      optionValue,
      fieldValue,
      options,
    }
  })(),
)
</script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="radio-group">
      <h4><span lang="zh-CN">单选框组</span><span lang="en-US">RadioGroup</span></h4>
      <mp-radio-group v-model="scene1.value6">
        <mp-radio :value="0">{{ scene1.english ? 'Eat' : '吃饭' }}</mp-radio>
        <mp-radio :value="1">{{ scene1.english ? 'Sleep' : '睡觉' }}</mp-radio>
      </mp-radio-group>
      <div class="relation">{{ scene1.english ? 'Current value' : '当前的值' }}: {{ scene1.value6 }}</div>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="radio-group-options">
      <h4><span lang="zh-CN">选项式 API</span><span lang="en-US">Options API</span></h4>
      <mp-radio-group v-model="scene2.optionValue" :options="scene2.options" />
      <div class="relation">{{ scene2.english ? 'Current value' : '当前的值' }}: {{ scene2.optionValue }}</div>
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

  .button {
    margin-right: 10px;
  }

  .space {
    height: 40px;
  }
}
.demo-comparison-case--2 {
  .relation {
    margin-top: 10px;
  }

  .button {
    margin-right: 10px;
  }

  .space {
    height: 40px;
  }
}
</style>
```

### 垂直布局

> 单选框及单选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

Example source: src/radio/example/demos/vertical.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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
  <mp-radio-group v-model="value9" orientation="vertical">
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

### 分组状态与只读

`model-value !== undefined` 表示受控，父级不回写时保留原值；`default-value` 只初始化非受控值。分组内只由 Group 发出 `update:modelValue → change(value, event?)`，并通知 FormItem 一次，子项不重复发值变化事件。
原生输入的选中值、ARIA 状态和选中样式与模型保持一致。受控分组拒绝选择时，同时恢复原选中项和被点击项；标签、Enter 和空格激活各只提出一次更新。
Group 的 `disabled`、`readonly`、`error` 未设置时继承表单，显式 `false` 可以覆盖表单；子项不能绕过 Group 的禁用或只读限制。

Example source: src/radio/example/demos/group-state.vue

```vue
<script setup>
import { ref } from 'vue'

const accepted = ref('a')
const proposed = ref('')
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
      <mp-radio-group :default-value="'a'" :options="options" />
    </div>
    <div>
      <p>受控：父级接受更新 {{ accepted }}</p>
      <mp-radio-group v-model="accepted" :options="options" :readonly="readonly" />
      <mp-button size="sm" @click="readonly = !readonly">{{ readonly ? '解除只读' : '设为只读' }}</mp-button>
    </div>
    <div>
      <p>父级拒绝更新：仅记录提议 {{ proposed }}</p>
      <mp-radio-group :model-value="''" :options="options" @update:model-value="proposed = $event" />
    </div>
  </mp-space>
</template>
```

### 按钮尺寸

两端均支持 `variant="button"`。RadioGroup 的 `size` 支持 `xs / sm / md / lg / xl`，只调整按钮高度；普通圆形 Radio 不随 size 缩放。未设置时继承表单/全局尺寸，最终默认为 md。Group 的 variant 优先于子项。

Example source: src/radio/example/demos/button-sizes.vue

```vue
<script setup lang="ts">
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const options = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
]
</script>
<template>
  <section class="radio-demo">
    <div v-for="size in sizes" :key="size">
      <p>{{ size }}</p>
      <mp-radio-group variant="button" :size="size" default-value="week" :options="options" :aria-label="size" />
    </div>
    <p>纵向与只读</p>
    <mp-radio-group
      variant="button"
      orientation="vertical"
      readonly
      default-value="day"
      :options="options"
      aria-label="只读周期"
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

Radio 的值为 string / number / boolean 或 null，null 表示未选中；重复点击已选项不会取消，父级可写 null 清空。
两端统一使用 `default-value` 初始化非受控值；受控提议被拒绝时保持原值。用户选择按 `update:modelValue → change(value, event?)` 通知，命令式调用的 event 为 undefined。
提供 `select()`、`focus(options?)`、`blur()`。禁用禁止选择和聚焦，只读允许聚焦、禁止改值。Enter 按下与空格释放激活当前控件，长按不重复激活，失焦/停用会取消待处理的空格操作。

Example source: src/radio/example/demos/control-value.vue

```vue
<script setup>
import { ref } from 'vue'

const control = ref()
const value = ref(null)
</script>
<template>
  <mp-space direction="column">
    <p>null 表示未选中；重复选择不会取消。 当前值：{{ value }}</p>
    <mp-radio ref="control" v-model="value" :value="false">选择 false 选项</mp-radio>
    <mp-space wrap>
      <mp-button size="sm" @click="control?.select()">选中</mp-button>
      <mp-button size="sm" @click="control?.focus()">聚焦</mp-button>
      <mp-button size="sm" @click="value = null">重置</mp-button>
    </mp-space>

    <p>只读允许聚焦，禁用不允许操作；Enter/空格只影响当前控件。</p>
    <mp-radio :default-value="true" readonly>只读</mp-radio>
    <mp-radio :default-value="true" disabled>禁用</mp-radio>
  </mp-space>
</template>
```

### 选项数据与标签

两端均支持原始值或对象选项。`field-names` 映射 `label/value/disabled/readonly/indeterminate`；只读选项允许聚焦但不能改值，Checkbox 的半选仅用于展示。
`label` 插槽接收 `{ data, checked }`，优先于标签渲染函数 `(data, checked) => VNodeChild`。data 为保留业务字段的归一化副本，不修改输入对象；未提供标签时显示值的文字。
显式传入 `options` 时替代默认插槽，包括 `[]`；不传时使用默认插槽。选项值限字符串、有限数字或布尔值；缺失/非法值及同类型重复值被忽略（保留第一项）。`false`、`0`、`''` 和 `'0'` 是不同选项。异步选项变更不反向修改模型。
RadioGroup 默认 `null`，表示未选中；外部写入 `null` 清空。`''` 是有效选项，不再作为空状态标记。

Example source: src/radio/example/demos/option-data.vue

```vue
<script setup lang="ts">
import { h, ref } from 'vue'

const value = ref<string | number | boolean | null>(null)
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
    <mp-radio-group v-model="value" :options="options" :field-names="fields" orientation="vertical">
      <template #label="{ data, checked }">{{ data.label }} {{ checked ? '✓' : '' }}</template>
    </mp-radio-group>
    <p>当前值：{{ JSON.stringify(value) }}</p>
    <mp-button @click="value = null">清空</mp-button>
    <p>标签也支持渲染函数；不传 options 时使用默认插槽，传入 [] 时保持空组。</p>
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

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

Example source: src/radio/example/demos/custom-fields.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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

### 设置状态值

Example source: src/radio/example/demos/set-state.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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

## 交互与键盘

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                     | 相关示例     |
| ---------- | ------------------------ | ------------ |
| `value`    | 选项标识                 | 交互状态切换 |
| `disabled` | 禁用，未设置时继承表单   | 交互状态切换 |
| `readonly` | 只读，未设置时继承表单   | 交互状态切换 |
| `error`    | 错误态，未设置时继承表单 | 交互状态切换 |

<!-- demo-config-notes:end -->

适用于互斥选项。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

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

### 键盘导航

Tab 进入已选项（没有已选项时进入第一个可用项）；方向键循环，Home / End 跳到首尾，跳过禁用项。只读项可聚焦但不改变值。导航仅作用于当前分组，不拦截面板内其他按钮的键盘事件。

Example source: src/radio/example/demos/keyboard-navigation.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
const options = [
  { label: '邮件', value: 'email' },
  { label: '只读', value: 'locked', readonly: true },
  { label: '禁用', value: 'disabled', disabled: true },
  { label: '短信', value: 'sms' },
]
</script>
<template>
  <section class="radio-demo">
    <p>Tab 进入分组；方向键循环，Home / End 跳到首尾。只读项可聚焦，不改变选值。</p>
    <mp-radio-group v-model="value" :options="options" aria-label="通知方式" />
    <p>当前值：{{ value }}</p>
    <mp-button @click="value = null">清空</mp-button>
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

## 控件与内容定制

### 原生控件与自定义图标

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置              | 作用                   | 相关示例                             |
| ----------------- | ---------------------- | ------------------------------------ |
| `checked-color`   | 选中状态的颜色         | 原生控件与自定义图标、修改图标和颜色 |
| `value`           | 选项标识               | 原生控件与自定义图标                 |
| `icon-size`       | 图标尺寸               | 原生控件与自定义图标                 |
| `readonly`        | 只读，未设置时继承表单 | 原生控件与自定义图标                 |
| `unchecked-color` | 未选中状态的颜色       | 修改图标和颜色                       |

<!-- demo-config-notes:end -->

两端均使用原生 radio input。Group 的 name 供原生表单提交，子项可覆盖。aria-label/input-attrs 作用于 input；组件管理的 type、checked、disabled、tabindex 不允许覆盖。图标插槽仅替换图标；#radio 替换全部可见内容，使用时须提供可访问名称。

Example source: src/radio/example/demos/native-control.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | boolean | null>('email')
</script>
<template>
  <section class="native-radio-demo">
    <p>图标与原生 input 属性</p>
    <mp-radio-group v-model="value" name="channel" aria-label="通知方式">
      <mp-radio value="email" :icon-size="24" checked-color="rebeccapurple" :input-attrs="{ id: 'radio-email' }">
        <template #checked-icon><span aria-hidden="true">●</span></template>
        <template #unchecked-icon><span aria-hidden="true">○</span></template>
        邮件
      </mp-radio>
      <mp-radio value="sms">短信</mp-radio>
      <mp-radio value="readonly" readonly>只读</mp-radio>
    </mp-radio-group>
    <p>当前值：{{ value }}</p>
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

### 修改图标和颜色

Example source: src/radio/example/demos/set-style.vue

```vue
<script setup>
import { computed, reactive, ref, toRefs } from 'vue'
import { watchLang } from '@maple-design/cli-vue/client'

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

## 异步选项

### 异步选项

开启“手动返回”后使用真实本地Promise，不走默认定时器。连续加载两次，分别按新旧或旧新顺序返回：只有当前请求版本可替换选项、结束加载。移除选项使在途版本失效但保留业务选值；旧任务仍可手动返回。Applied/Ignored/Pending显示应用、忽略及等待数，加载/返回不增加用户变更次数。版本保护和等待清理由示例业务加载器负责，不代表Radio自动解决网络竞争，也不访问外部服务。

选项载入、移除和外部值更新均不会反向触发值变化；未载入的已选值不会自动清理。重复选择当前值不再触发 change，false、0、空字符串按实际值比较。

示例以 800ms 本地延迟模拟加载。等待期间可设为设备 A 或清空选择，选项到达后按最新模型反显；这些外部操作不会增加用户变更次数。加载中移除选项会取消待完成任务，避免旧选项重新显示。

等待期间仍可用方向键选择已加载的选项；同值选项重新加载后保留当前焦点。加载提示保持稳定节点，避免提示显隐导致分组重新挂载；重复激活当前值不会增加 change 次数。

Example source: src/radio/example/demos/async-options.vue

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
      { label: '异步设备', value: 'remote' },
      { label: '设备 A', value: 'a' },
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
  <mp-space class="radio-async-demo" direction="column">
    <p>业务值独立于当前选项，加载或移除选项不会清空已选值：{{ value }}</p>
    <mp-checkbox v-model="manual" edit-mode="direct" @change="remove">Manual responses / 手动返回</mp-checkbox>
    <mp-space wrap>
      <mp-button size="sm" @click="load">加载选项</mp-button>
      <mp-button size="sm" @click="remove">移除选项</mp-button>
      <mp-button size="sm" @click="value = 'a'">设为设备 A</mp-button>
      <mp-button size="sm" @click="value = null">清空选择</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(false)">返回最早加载</mp-button>
      <mp-button size="sm" :disabled="waiting.length === 0" @click="settle(true)">返回最新加载</mp-button>
    </mp-space>
    <p aria-live="polite">
      {{ loading ? '加载中，可在完成前移除选项以取消本次加载。' : '加载完成后保留当前选值和键盘焦点。' }}
    </p>
    <mp-radio-group v-model="value" edit-mode="direct" :options="options" @change="changeCount++" />
    <p>用户变更次数：{{ changeCount }}</p>
    <p role="status">Applied: {{ applied }} · Ignored: {{ ignored }} · Pending: {{ waiting.length }}</p>
  </mp-space>
</template>
```

## 原生输入属性与键盘拦截

`id`、`form`、`required`、其他原生约束、`aria-*`、`data-*` 和键盘监听器传给实际 input；`class` / `style` 和其他外壳属性保留在 label。未提供 id 时生成稳定且唯一的原生 id；外部 label[for] 可以关联显式 id。HTML required 参与浏览器原生表单验证，与 Form 的业务校验规则分开。

原生监听的 Once / Capture / Passive 修饰符保留在 input，不会因插槽中嵌套按钮而错误触发。原生键盘监听 preventDefault() 可以阻止 Enter / Space 的组件激活及 RadioGroup 方向键导航；被取消的 Space 不留下延迟释放动作。组件仍管理 checked、disabled、输入类型及分组的 Tab 焦点规则。

input-attrs 保留原生属性别名；与顶层原生属性重叠时别名优先，但不能覆盖组件管理的状态。Radio 的选中状态由原生 `checked` 属性管理，传入的 `aria-checked` 不覆盖组件状态；tabindex 继续由组件管理，组内仍遵守单一 Tab 入口。

## 使用说明

### 原生属性与外观补齐

| 组件               | 属性        | 说明                     | 类型                | 默认值    |
| ------------------ | ----------- | ------------------------ | ------------------- | --------- |
| Radio / RadioGroup | name        | 原生字段名，子项覆盖分组 | string              | undefined |
| Radio              | aria-label  | 原生控件的无障碍名称     | string              | undefined |
| Radio              | input-attrs | 原生 input 属性          | InputHTMLAttributes | undefined |

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(payload, done, context)` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

## API

### 参数、展示清空与挂载边界

orientation 仅接受 horizontal / vertical，非法值诊断后按 horizontal 展示。max 仅用于 CheckboxGroup：合法值为有限非负整数，0 表示不能新增选择，省略为不限；不裁剪已有外部模型。非法 JS 值诊断后保留既有归一化：负数按 0、小数向下取整、NaN 按不限，Infinity 仍按不限处理。

icon-size 接受正长度，数值和纯数字字符串按 px，允许 0.5 这样的正小数；无效、非正或非有限数值诊断并回退主题，不套用 Divider 的最小 1。CSS 表达式的最终解析值由业务样式负责。

uninject-group-context 在挂载时决定是否接入分组；运行中修改不会重新注入，需改变 key 或重新挂载，脱离分组后仍参与 Form。clearable / empty-value 只控制延迟展示层的显式清空；原生取消勾选仍输出 false 或从数组移除该值，不会使用 empty-value。普通事件返回 Promise 不参与等待；before-commit 仅在延迟保存时按 payload / done / context 协议执行。

显式 options 加载期间，两端分组通过 aria-busy 通知等待，失败发一次 load-error；不增加 loading 属性或额外图形，也不因加载或失败提议新模型。

普通圆形 Radio 的图标不随 Group.size 缩放；size 五档用于 button 外观，圆形尺寸使用 icon-size 或主题。radio 插槽替换圆形的完整可见内容，原生 input 保留；button 外观使用 default 标签，不使用 radio 插槽。

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[] | null`；`RadioModel = ChoiceValue | null`。

### Radio Props

| 属性                  | 说明                            | 类型                      | 默认值    |
| --------------------- | ------------------------------- | ------------------------- | --------- |
| model-value (v-model) | 受控值 | RadioModel | undefined |
| default-value         | 非受控初始值                    | ChoiceValue \| null       | null      |
| value                 | 选项的`value`                   | `string\|number\|boolean` | `true`    |
| variant               | 单选的类型                      | `'radio'\|'button'`       | `'radio'` |
| disabled              | 是否禁用；未设置时继承表单/分组 | boolean                   | undefined |
| readonly              | 是否只读；未设置时继承表单/分组 | boolean                   | undefined |
| error                 | 错误态；未设置时继承表单/分组   | boolean                   | undefined |
| edit-mode | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| clearable | 延迟编辑层清空操作，不改变原生取消选择 | `boolean` | `false` |
| empty-value | 展示层显式清空输出，不控制原生取消勾选 | `RadioModel \| (() => RadioModel)` | `null` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |
| checked-color | 实例选中颜色；错误和禁用优先 | string | undefined |
| unchecked-color | 实例未选中颜色 | string | undefined |
| icon-size | 正长度；非法值诊断并回退主题 | number \| string | undefined |
| ripple | 是否启用波纹 | boolean | true |
| name | 原生字段名，未设置时继承 Group | string | undefined |
| input-attrs | 原生属性别名，不能覆盖组件管理的状态 | InputHTMLAttributes | undefined |
| aria-label | 无可见标签时的无障碍名称 | string | undefined |
| uninject-group-context | 挂载时决定是否脱离分组，仍参与 Form | boolean | false |

### RadioGroup Props

| 属性                  | 说明                                                        | 类型                                                                                                    | 默认值         |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------- |
| model-value (v-model) | 受控值 | RadioModel | undefined |
| default-value         | 非受控初始值                                                | RadioModel                                                                                              | null           |
| variant               | 单选框组的类型                                              | `'radio'\|'button'`                                                                                     | `'radio'`      |
| size                  | 单选框组的尺寸                                              | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                                                                          | `-`            |
| options               | 选项；传入时替代默认插槽                                    | Array<ChoiceValue \| RadioOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined`    |
| orientation           | 单选组内选项的横纵排列，默认 horizontal；不表示文字阅读方向 | `'horizontal'\|'vertical'`                                                                              | `'horizontal'` |
| disabled              | 是否禁用；未设置时继承表单/分组                             | boolean                                                                                                 | undefined      |
| readonly              | 是否只读；未设置时继承表单/分组                             | boolean                                                                                                 | undefined      |
| error                 | 错误态；未设置时继承表单/分组                               | boolean                                                                                                 | undefined      |
| field-names           | 选项字段映射                                                | ChoiceFieldNames                                                                                        | undefined      |
| aria-label            | 分组的无障碍名称                                            | string                                                                                                  | ''             |
| edit-mode | 编辑模式，继承 FormItem 和 Form | `'direct' \| 'popup'` | `'direct'` |
| read-pretty | 独立阅读状态，显式 false 覆盖父级 | `boolean` | `false` |
| clearable | 延迟编辑层清空操作，不改变原生取消选择 | `boolean` | `false` |
| empty-value | 展示层显式清空输出，不控制原生取消勾选 | `RadioModel \| (() => RadioModel)` | `null` |
| empty-values | 空值识别策略，字段优先于 FormItem 和 Form | `readonly unknown[]` | `-` |
| empty-text | 阅读空文案，显式空字符串有效 | `string` | `'-'` |
| before-commit | 延迟编辑保存前守卫；返回布尔值、Promise 或通过 done 完成 | `(payload: { value: unknown; previousValue: unknown }, done: (allow?: boolean) => void, context: { signal: AbortSignal; event?: Event }) => void \| boolean \| Promise<void \| boolean>` | `-` |
| open | 受控编辑层开关，不是内部原生输入焦点 | `boolean` | `-` |
| default-open | 非受控编辑层初始开关 | `boolean` | `false` |
| popup-container | 编辑层挂载容器 | `string \| HTMLElement \| false` | `-` |
| name | 组内原生输入字段名 | string | undefined |

### Radio Methods

| 方法名 | 说明                        | 参数                   | 返回值 |
| ------ | --------------------------- | ---------------------- | ------ |
| select | 请求选择；遵守禁用/只读限制 | -                      | void   |
| focus  | 聚焦控件                    | options?: FocusOptions | void   |
| blur   | 失焦控件                    | -                      | void   |

### Radio Events

| 事件名             | 说明     | 参数                              |
| ------------------ | -------- | --------------------------------- |
| update:modelValue | 提议新值 | value: RadioModel |
| change | 值变化提案 | value: RadioModel, event?: Event |
| focus              | 聚焦     | event: FocusEvent                 |
| blur               | 失焦     | event: FocusEvent                 |
| update:open | 编辑层受控开关更新 | open: boolean |
| open-change | 编辑层实际开关变化 | open: boolean |
| click | 点击；禁用不触发 | event: MouseEvent |

### RadioGroup Events

| 事件名             | 说明                        | 参数                                           |
| ------------------ | --------------------------- | ---------------------------------------------- |
| update:modelValue | 提议新值 | value: RadioModel |
| change | 值变化提案 | value: RadioModel, event?: Event |
| update:open | 编辑层受控开关更新 | open: boolean |
| open-change | 编辑层实际开关变化 | open: boolean |
| load-error | 显式选项加载失败，不改变模型 | error: unknown |

### Radio Slots

| 插槽名 | 说明         | 参数                                     |
| ------ | ------------ | ---------------------------------------- |
| radio  | 自定义单选框 | `checked:boolean`<br/>`disabled:boolean` |
| read | 自定义阅读内容，优先于 empty-text | value: RadioModel, text: string |
| default | button 标签或默认圆形标签 | checked: boolean, disabled: boolean |
| checked-icon | 默认圆形选中图标 | - |
| unchecked-icon | 默认圆形未选中图标 | - |

### RadioGroup Slots

| 插槽名 | 说明          | 参数                                     |
| ------ | ------------- | ---------------------------------------- |
| radio  | 自定义单选框  | `checked:boolean`<br/>`disabled:boolean` |
| label  | radio文案内容 | `data: RadioOption, checked: boolean`    |
| read | 自定义阅读内容，优先于 empty-text | value: RadioModel, text: string |
| default | 未提供 options 时的原生子选项 | - |

## Types

### RadioOption

| 字段     | 说明           | 类型                                                              |
| -------- | -------------- | ----------------------------------------------------------------- |
| value    | 选项标识       | ChoiceValue                                                       |
| label    | 标签或渲染函数 | VNodeChild \| (data: RadioOption, checked: boolean) => VNodeChild |
| disabled | 禁用           | boolean                                                           |
| readonly | 只读           | boolean                                                           |

### ChoiceFieldNames

`{ label?: string; value?: string; disabled?: string; readonly?: string; indeterminate?: string }`

公开导出类型：`RadioOption`、`ChoiceFieldNames`。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-radio-action-padding` | `6px` | `padding` |
| `--mp-radio-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-radio-control-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-radio-control-color-checked` | `var(--mp-sys-color-action-primary)` | `color`, `outline` |
| `--mp-radio-control-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-radio-control-color-error` | `var(--mp-sys-color-content-danger)` | `box-shadow`, `color` |
| `--mp-radio-control-size` | `24px` | `font-size`, `height`, `width` |
| `--mp-radio-group-gap` | `0` | `gap` |
| `--mp-radio-label-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-radio-label-gap` | `0` | `margin-inline-start` |
| `--mp-radio-label-text-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-radio-label-text-color-disabled` | `var(--mp-sys-color-content-disabled)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-radio-action-padding: 6px;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
