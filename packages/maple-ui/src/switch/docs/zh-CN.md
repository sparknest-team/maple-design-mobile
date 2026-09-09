# Switch

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 案例

### 双向绑定与默认值

```html
<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(false)
</script>

<template>
  <mp-space wrap
    ><mp-switch v-model="enabled" aria-label="Enable notifications" /><output>{{ enabled }}</output
    ><mp-switch default-checked aria-label="Initially enabled"
  /></mp-space>
</template>
```

### 四种变体

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><label v-for="variant in variants" :key="variant"
      >{{ variant }} <mp-switch :variant="variant" :aria-label="variant" /></label
  ></mp-space>
</template>
```

### 三种尺寸

```html
<script setup lang="ts">
const sizes = ['sm', 'md', 'lg'] as const
</script>

<template>
  <mp-space wrap
    ><label v-for="size in sizes" :key="size">{{ size }} <mp-switch :size="size" :aria-label="size" /></label
  ></mp-space>
</template>
```

### 禁用

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" disabled :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        default-checked
        disabled
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### 只读

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" readonly :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        default-checked
        readonly
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### 加载中

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><template v-for="variant in variants" :key="variant"
      ><mp-switch :variant="variant" loading :aria-label="variant + ' off'" /><mp-switch
        :variant="variant"
        default-checked
        loading
        :aria-label="variant + ' on'" /></template
  ></mp-space>
</template>
```

### 自定义颜色

```html
<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(false)
</script>

<template>
  <mp-switch
    v-model="enabled"
    checked-color="#005f73"
    unchecked-color="#9b2226"
    aria-label="Custom color switch"
  />
</template>
```

### 自定义文字

```html
<template>
  <mp-space wrap
    ><mp-switch checked-text="ON" unchecked-text="OFF" aria-label="Text props" /><mp-switch
      variant="round"
      aria-label="Text slots"
      ><template #checked>ON</template><template #unchecked>OFF</template></mp-switch
    ></mp-space
  >
</template>
```

### 自定义图标

```html
<script setup lang="ts">
const variants = ['circle', 'round', 'line', 'md3'] as const
</script>

<template>
  <mp-space wrap
    ><mp-switch v-for="variant in variants" :key="variant" :variant="variant" :aria-label="variant"
      ><template #checked-icon>✓</template><template #unchecked-icon>×</template></mp-switch
    ></mp-space
  >
</template>
```

### 水波与滑块阴影

```html
<template>
  <mp-space wrap
    ><mp-switch :ripple="false" :handle-elevation="false" aria-label="No ripple or shadow" /><mp-switch
      :handle-elevation="4"
      aria-label="Elevated handle"
  /></mp-space>
</template>
```

### 自定义值与事件

```html
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('disabled')
const lastChange = ref('—')
</script>

<template>
  <mp-space direction="column"
    ><mp-switch
      v-model="value"
      checked-value="enabled"
      unchecked-value="disabled"
      aria-label="String value"
      @change="lastChange = String($event)"
    /><output aria-live="polite">Value: {{ value }}; change: {{ lastChange }}</output></mp-space
  >
</template>
```

### 异步允许、阻止与异常

```html
<script setup lang="ts">
import { ref } from 'vue'
const result = ref('Ready')
const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 500))
async function allow() {
  await wait()
  result.value = 'Allowed'
  return true
}
async function deny() {
  await wait()
  result.value = 'Blocked'
  return false
}
async function reject() {
  await wait()
  result.value = 'Rejected'
  throw new Error('Demo rejection')
}
</script>

<template>
  <mp-space direction="column">
    <label>Allow after 500ms <mp-switch :before-change="allow" aria-label="Async allow" /></label>
    <label>Return false <mp-switch :before-change="deny" aria-label="Async deny" /></label>
    <label>Reject Promise <mp-switch :before-change="reject" aria-label="Async rejection" /></label>
    <output aria-live="polite">{{ result }}</output>
  </mp-space>
</template>
```

### 焦点与事件顺序

```html
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
const events = ref<string[]>([])
function record(name: string) {
  events.value = [...events.value.slice(-7), name]
}
</script>

<template>
  <p>Use Tab to focus, then Space or Enter to toggle.</p>
  <mp-switch
    v-model="value"
    size="md"
    aria-label="Event sequence"
    @focus="record('focus')"
    @blur="record('blur')"
    @click="record('click')"
    @update:model-value="record(`update: ${$event}`)"
    @change="record(`change: ${$event}`)"
  />
  <p aria-live="polite">{{ events.join(' → ') || 'No events yet' }}</p>
  <mp-button @click="events = []">Clear events</mp-button>
</template>
```

## API

<!-- same-source-api:start -->
### Props

| Prop | 含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 受控值；省略时内部管理 | string / number / boolean | undefined |
| default-checked | 非受控初始状态，仅初始化生效 | boolean | false |
| checked-value | 选中值 | string / number / boolean | true |
| unchecked-value | 未选中值 | string / number / boolean | false |
| variant | 造型 | circle / round / line / md3 | circle |
| size | 尺寸档位；省略时见跨端说明 | sm / md / lg | undefined |
| disabled | 禁用；表单禁用也阻止交互 | boolean | false |
| readonly | 只读；仍可聚焦与通知 click，不切换 | boolean | false |
| loading | 加载中；禁止 click 和切换 | boolean | false |
| before-change | 切换拦截器，不是事件 | (nextValue: SwitchValue) => boolean / void / Promise<boolean / void> | — |
| checked-text | 选中文案 | string | — |
| unchecked-text | 未选中文案 | string | — |
| checked-color | 选中轨道颜色 | string | — |
| unchecked-color | 未选中轨道颜色 | string | — |
| loading-color | 加载图标颜色 | string | — |
| ripple | 点击波纹 | boolean | true |
| handle-elevation | 滑块阴影，true 等级 2，数字取整数并限制 0～24 | boolean / number | true |

before-change 返回 false、抛错或拒绝 Promise 均取消切换；其他正常完成允许切换。只有 Promise 等待期间自动 loading，重复输入被阻止。
等待期间卸载、KeepAlive 停用、值被外部更新、禁用/只读/loading 状态改变时，旧结果失效。
受控模式仅发送更新请求；父级更新 model-value 后才改变选中状态。省略 model-value 时使用内部状态。

### Events

| 事件 | 参数与时机 |
| --- | --- |
| click | (event: Event)，允许点击时，拦截前 |
| update:model-value | (nextValue: SwitchValue)，允许切换后，先于 change |
| change | (nextValue: SwitchValue, event: Event)，每次提交一次 |
| focus | (event: FocusEvent)，获得焦点 |
| blur | (event: FocusEvent)，失去焦点 |

支持 Enter、Space；按键长按重复不重复切换。disabled/loading 不触发 click 或值变化；readonly 可通知 click，但不执行拦截器。
外部 model-value 更新不会额外触发 change。

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| checked | 选中文案，优先于 checked-text；line 与 sm 不展示 | — |
| unchecked | 未选中文案，优先于 unchecked-text；line 与 sm 不展示 | — |
| checked-icon | 选中滑块图标，loading 时被加载图标替代 | — |
| unchecked-icon | 未选中滑块图标，loading 时被加载图标替代 | — |

### Methods

无公开方法。

### 跨端说明

组件属性、事件参数和插槽一致。Cedar 省略 size 时继承表单／全局尺寸（xs/sm 映射 sm，lg/xl 映射 lg）；Maple 回退 md。两端都继承表单禁用状态；Maple 还继承 Form 的 readonly，Cedar 仅使用组件 readonly。显式设置 size 和 readonly 可对齐独立示例行为；表单集成仍由各端适配。
<!-- same-source-api:end -->

### 类型

SwitchProps、SwitchVariant、SwitchSize、SwitchValue、SwitchBeforeChange、SwitchInstance 均由根入口及组件入口导出。

### 样式变量

| Token（Maple 使用 --mp-，Cedar 使用 --c-） | 默认值 |
| --- | --- |
| --mp-switch-width / height / handle-size | 40px / 24px / 16px |
| --mp-switch-size-sm-scale / size-lg-scale | .8 / 1.2 |
| --mp-switch-md3-width / md3-height / md3-handle-size | 52px / 32px / 24px |
| --mp-switch-line-height / line-handle-size | 12px / 20px |
| --mp-switch-hit-area | 0px，点击区域向外扩展量，不改变布局 |
| --mp-switch-track-background / track-active-background | 中性色 / 主题色 |
| --mp-switch-handle-background / handle-color | 白色 / 主题色 |
| --mp-switch-disabled-opacity | .5 |
| --mp-switch-round-radius / gap | 4px / 4px |

完整可调变量见 style/token.less；旧版各端 Switch 几何 token 不保证保留。

## 迁移

Maple standard → line；不传 variant 现在使用 circle。两端统一四变体，不将 standard 保留为别名。
移除 lazy-change；before-change 从 (value, change) 回调改为返回值/Promise，应用不再手动调用 change。
Maple change 补齐第二个原始事件参数；checked-color/unchecked-color 统一控制轨道，滑块颜色通过 token 定制。
