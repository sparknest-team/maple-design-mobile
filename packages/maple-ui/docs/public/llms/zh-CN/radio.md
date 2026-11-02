<!-- Source: src/radio/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/radio -->

# 单选框

## 案例

### 介绍

基础示例随站点语言切换显示文案，业务值和选中状态不会随语言变化。分组示例覆盖父级接受/拒绝更新、只读和异步选项回显；移除选项不会清空业务值。外层 Space 纵向布局使用 `direction="column"`，选择组自身纵向使用 `direction="vertical"`。

在一组备选项中进行单选。

### 基本使用

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

### 禁用

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

### 只读

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

### 设置状态值

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

### 修改图标和颜色

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

### 单选框组

在单选框组中，需要给 `radio` 设置 `value` 用来标识，
单选框组会绑定选择的标识。

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

### 选项式 API

通过 `options` 属性设置子元素。

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

### 自定义字段

通过 `field-names` 属性自定义 `options` 中数据的格式。

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

### 垂直布局

> 单选框及单选框组的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

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

### 分组状态与只读

`model-value !== undefined` 表示受控，父级不回写时保留原值；`default-value` 只初始化非受控值。分组内只由 Group 发出 `update:model-value → change(value, event?)`，并通知 FormItem 一次，子项不重复发值变化事件。
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

### 独立值模型与方法

Radio 的值为 string / number / boolean 或 null，null 表示未选中；重复点击已选项不会取消，父级可写 null 清空。
两端统一使用 `default-value` 初始化非受控值；受控提议被拒绝时保持原值。用户选择按 `update:model-value → change(value, event?)` 通知，命令式调用的 event 为 undefined。
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
    <mp-radio-group v-model="value" :options="options" :field-names="fields" direction="vertical">
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
      direction="vertical"
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

### 原生控件与自定义图标

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

### 交互状态切换

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
    <mp-checkbox v-model="manual" presentation="inline" @change="remove">Manual responses / 手动返回</mp-checkbox>
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
    <mp-radio-group v-model="value" presentation="inline" :options="options" @change="changeCount++" />
    <p>用户变更次数：{{ changeCount }}</p>
    <p role="status">Applied: {{ applied }} · Ignored: {{ ignored }} · Pending: {{ waiting.length }}</p>
  </mp-space>
</template>
```

## API

`ChoiceValue = string | number | boolean`；`CheckboxModel = boolean | ChoiceValue[]`；`RadioModel = ChoiceValue | null`。

### 属性

#### RadioGroup Props

| 参数                     | 说明                                       | 类型                                       | 默认值       |
| ------------------------ | ------------------------------------------ | ------------------------------------------ | ------------ |
| model-value (v-model) | 受控值 | RadioModel | undefined |
| default-value | 非受控初始值 | RadioModel | null |
| `disabled` | 禁用，未设置时继承表单 | _boolean_ | `undefined` |
| `readonly` | 只读，未设置时继承表单 | _boolean_ | `undefined` |
| `error` | 错误态，未设置时继承表单 | _boolean_ | `undefined` |
| variant | 分组外观 | radio \| button | radio |
| size | 仅调整按钮高度 | ComponentSize | undefined |
| `direction`              | 布局方向，可选值为 `horizontal` `vertical` | _string_                                   | `horizontal` |
| options | 选项；传入时替代默认插槽 | Array<ChoiceValue \| RadioOption \| Record<string, unknown>> / `(query, { signal }) => Array / Promise` | `undefined` |
| `aria-label` _**3.8.5**_ | 单选框组的标签                             | _string_                                   | `-`          |
| field-names | 选项字段映射 | ChoiceFieldNames | undefined |

#### RadioOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项标识 | ChoiceValue |
| label | 标签或渲染函数 | VNodeChild \| (data: RadioOption, checked: boolean) => VNodeChild |
| disabled | 禁用 | boolean |
| readonly | 只读 | boolean |


#### Radio Props

| 参数              | 说明             | 类型               | 默认值  |
| ----------------- | ---------------- | ------------------ | ------- |
| model-value (v-model) | 受控值 | ChoiceValue \| null | undefined |
| default-value | 非受控初始值 | ChoiceValue \| null | null |
| variant | 外观，分组设置优先 | radio \| button | radio |
| value | 选项标识 | string \| number \| boolean | true |
| `checked-color`   | 选中状态的颜色   | _string_           | `-`     |
| `unchecked-color` | 未选中状态的颜色 | _string_           | `-`     |
| `icon-size`       | 图标尺寸         | _string \| number_ | `-`     |
| `disabled` | 未设置时继承分组/表单 | _boolean_ | `undefined` |
| `readonly` | 未设置时继承分组/表单 | _boolean_ | `undefined` |
| `error` | 错误态，继承分组/表单 | _boolean_ | `undefined` |
| `ripple`          | 是否开启水波纹   | _boolean_          | `true`  |

### 方法

#### Radio Methods

| 方法名   | 说明                                                                      | 参数         | 返回值 |
| -------- | ------------------------------------------------------------------------- | ------------ | ------ |
| select | 请求选择；遵守禁用/只读限制 | - | void |
| focus | 聚焦控件 | options?: FocusOptions | void |
| blur | 失焦控件 | - | void |

### 事件

#### RadioGroup Events

| 事件名   | 说明       | 参数         |
| -------- | ---------- | ------------ |
| `update:model-value` | 提议新值 | `value: any` |
| `change` | 值变化，只由 Group 触发 | `value: any, event?: Event` |

#### Radio Events

| 事件名   | 说明           | 参数         |
| -------- | -------------- | ------------ |
| `click`  | 点击时触发     | `e: Event`   |
| update:model-value | 提议新值 | value: ChoiceValue |
| change | 值变化 | value: ChoiceValue, event?: Event |
| focus | 聚焦 | event: FocusEvent |
| blur | 失焦 | event: FocusEvent |

### 插槽

#### RadioGroup Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 未传 options 时的子项 | - |
| label | 选项标签 | data: RadioOption, checked: boolean |

#### Radio Slots

| 插槽名           | 说明       | 参数 |
| ---------------- | ---------- | ---- |
| `checked-icon`   | 选中图标   | `-`  |
| `unchecked-icon` | 未选中图标 | `-`  |
| `default`        | 显示的文本 | `-`  |

### 样式变量

| 变量名 | 默认值 |
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

公开导出类型：`RadioOption`、`ChoiceFieldNames`。

### 原生属性与外观补齐

| 组件 | 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| Radio / RadioGroup | name | 原生字段名，子项覆盖分组 | string | undefined |
| Radio | aria-label | 原生控件的无障碍名称 | string | undefined |
| Radio | input-attrs | 原生 input 属性 | InputHTMLAttributes | undefined |

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留直接编辑。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。


候选属性 `options` 支持数组或 `(query, { signal }) => 数组/Promise`。加载、取消、过期结果隔离由组件内部处理，失败触发 load-error。单选/多选分组初始化以空字符串查询，搜索型字段在查询变化时调用；树形字段根数据与原有 load-more 子节点懒加载独立。
