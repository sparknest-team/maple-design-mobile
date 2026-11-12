<!-- Source: src/tooltip/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/tooltip -->

# Tooltip 文字气泡

SSR 限制：触发插槽内的同一节点同时使用 `v-for` 和 `v-memo` 时，服务端渲染可能报错。服务端渲染时请移除该插槽节点上的 `v-memo`；普通 `v-for` 仍可使用。 在 Vue 3.5.13 中，该插槽内单独使用动态 `v-memo` 也可能报错。 `content` 插槽也可能出现同样问题；服务端渲染时请移除该插槽节点上的 `v-memo`。

用于补充说明按钮、图标或被截断的文字。默认同时响应鼠标悬停和键盘聚焦；需要承载可操作内容时使用 Popover。

## 基础示例

### 基本使用

Example source: src/tooltip/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip">
    <mp-button status="primary">基本使用</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## 外观与状态

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 尺寸

只实现 `md` 和 `xs` 两档，默认 `md`。

#### 外观组合

适用于悬浮时的补充说明。调整状态、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

Example source: src/tooltip/example/demos/appearance-lab.vue

```vue
<script setup>
import { reactive as __demoReactive, computed as demoComputed, ref as demoRef } from 'vue'

const __demoAppearance = __demoReactive({ status: 'default', size: 'md' })
const demoCompareFields = [
  { name: 'status', values: ['default', 'primary', 'info', 'success', 'warning', 'danger'] },
  { name: 'size', values: ['xs', 'md'] },
]
const demoCompareAxis = demoRef('status')
const demoComparedOptions = demoComputed(
  () => demoCompareFields.find((field) => field.name === demoCompareAxis.value)?.values ?? [],
)
</script>
<template>
  <mp-space direction="column" :size="16">
    <mp-form layout="vertical">
      <mp-form-item layout="vertical" size="sm" label="status">
        <mp-select
          v-model="__demoAppearance['status']"
          :clearable="false"
          :options="[
            { label: 'default', value: 'default' },
            { label: 'primary', value: 'primary' },
            { label: 'info', value: 'info' },
            { label: 'success', value: 'success' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ]"
          aria-label="status"
        />
      </mp-form-item>
      <mp-form-item layout="vertical" size="sm" label="size">
        <mp-radio-group
          v-model="__demoAppearance['size']"
          aria-label="size"
          :options="[
            { label: 'xs', value: 'xs' },
            { label: 'md', value: 'md' },
          ]"
          variant="button"
          size="sm"
        />
      </mp-form-item>
    </mp-form>
    <p class="demo-config-comparison-hint">
      <span lang="zh-CN">选择一个对比维度；其他配置和内容保持一致。输入类示例共享同一个值，便于比较外观。</span
      ><span lang="en-US"
        >Compare one dimension while keeping the other settings and content identical. Input specimens share the same
        value.</span
      >
    </p>
    <mp-radio-group
      v-model="demoCompareAxis"
      aria-label="Compare configuration"
      :options="demoCompareFields.map((field) => ({ label: field.name, value: field.name }))"
    />
    <div class="demo-config-comparison">
      <section v-for="sample in demoComparedOptions" :key="String(sample)">
        <p>
          <code>{{ demoCompareAxis }}={{ sample }}</code>
        </p>
        <mp-tooltip content="Tooltip" v-bind="{ ...__demoAppearance, [demoCompareAxis]: sample }">
          <mp-button>默认</mp-button>
        </mp-tooltip>
      </section>
    </div>
  </mp-space>
</template>
<style scoped lang="less">
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style scoped>
.demo-config-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  min-width: 0;
  max-width: 100%;
}
.demo-config-comparison > section {
  min-width: 0;
}
.demo-config-comparison p {
  margin: 0 0 8px;
}
html:not([lang='en-US']) .demo-config-comparison-hint > [lang='en-US'],
html[lang='en-US'] .demo-config-comparison-hint > [lang='zh-CN'] {
  display: none;
}
</style>
```

## 布局与排列

### 位置、偏移与触发

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 提示内容 | 位置、偏移与触发 |
| `placement` | 浮层相对触发元素的首选方位，默认 top；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | 位置、偏移与触发 |
| `popup-translate` | 屏幕轴附加平移 | 位置、偏移与触发 |
| `trigger` | 触发方式 | 位置、偏移与触发 |
<!-- demo-config-notes:end -->

Example source: src/tooltip/example/demos/placement.vue

```vue
<script setup>
import { ref } from 'vue'

const placementValue = ref('top')
const placementOptions = ref([
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
])
</script>

<template>
  <mp-form-item layout="vertical" size="sm" label="placementValue">
    <mp-select v-model="placementValue" aria-label="placementValue" :hint="false">
      <mp-option v-for="(item, index) in placementOptions" :key="index" :label="item" />
    </mp-select>
  </mp-form-item>
  <div class="placement-container">
    <mp-tooltip content="Tooltip" :placement="placementValue">
      <mp-button status="primary">
        <m-icon-star-fill />
      </mp-button>
    </mp-tooltip>
  </div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/tooltip/example/demos/offset.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" :popup-translate="[64, -10]">
    <mp-button status="primary">偏移量</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/tooltip/example/demos/trigger.vue

```vue
<script setup>
import { ref } from 'vue'

const trigger = ref('click')
</script>

<template>
  <mp-form-item layout="vertical" size="sm" label="trigger">
    <mp-radio-group
      v-model="trigger"
      aria-label="trigger"
      :options="[
        { label: 'click', value: 'click' },
        { label: 'hover', value: 'hover' },
      ]"
      variant="button"
      size="sm"
    />
  </mp-form-item>
  <mp-tooltip content="Tooltip" style="margin-top: 15px" :trigger="trigger">
    <mp-button status="primary">触发方式</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## 内容与展示

### 内容、主题与颜色

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `content` | 提示内容 | 内容、主题与颜色、事件与禁用 |
| `color` | 自定义背景色 | 内容、主题与颜色 |
| `text-color` | 自定义文字色 | 内容、主题与颜色 |
| `disabled` | 禁止打开 | 事件与禁用 |
<!-- demo-config-notes:end -->

Example source: src/tooltip/example/demos/content-slot.vue

```vue
<script setup></script>

<template>
  <mp-tooltip>
    <mp-button status="primary">内容插槽</mp-button>

    <template #content>
      <m-icon-star-fill />
    </template>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```



Example source: src/tooltip/example/demos/custom-color.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" color="#d81b60" text-color="#fff">
    <mp-button status="primary">自定义颜色</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

### 事件与禁用

Example source: src/tooltip/example/demos/events.vue

```vue
<script setup>
import { Message } from '@maple-design/ui-vue'
</script>

<template>
  <mp-tooltip
    content="Tooltip"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <mp-button status="primary">注册事件</mp-button>
  </mp-tooltip>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

Example source: src/tooltip/example/demos/disabled.vue

```vue
<script setup></script>

<template>
  <mp-tooltip content="Tooltip" disabled>
    <mp-button status="primary">禁用提示</mp-button>
  </mp-tooltip>

  <div style="margin-bottom: 100px"></div>
</template>

<style lang="less" scoped>
.placement-container {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## 使用说明

### 配置说明

以下为实际 :root 默认值。业务定制优先使用组件变量；内部定位变量不属于公开 API。

使用 Teleport 时，变量需放在实际 popup 的作用域中（例如通过 `popup-style`）；触发按钮上的变量不会自动继承到浮层。

## API

Tooltip 继承 Trigger 的定位、容器、受控状态和关闭策略。默认 `hide-empty=true`、`auto-fit-transform-origin=true`，未传 `animation-name` 时使用 Tooltip 自身动画。空内容只隐藏提示，不改变 open；组件节点视为有内容，即使其最终不渲染任何内容也会生成空提示及描述关联。内容可能为空时，请在插槽中有条件地渲染组件节点。实例提供 `open`、`close`、`resize`、`allowClose`、`getReference`、`focusReference` 和 `setReference` 七个方法。

### Tooltip Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:open | 受控打开状态 | `boolean` | — |
| default-open | 非受控初始状态 | `boolean` | `false` |
| content | 提示内容 | `string` | — |
| status | 面板主题 | `default \| primary \| info \| success \| warning \| danger` | `default` |
| size | 尺寸；只实现两档 | `xs \| md` | `md` |
| color | 自定义背景色 | `string` | — |
| text-color | 自定义文字色 | `string` | — |
| trigger | 触发方式 | `TriggerEvent \| TriggerEvent[]`<br>`TriggerEvent: 'manual' \| 'focus' \| 'hover' \| 'click' \| 'contextMenu'` | `['hover', 'focus']` |
| placement | 浮层相对触发元素的首选方位，默认 top；启用默认的 auto-fit-position 时，空间不足会自动翻转并约束到可视区域，不保证最终停在该侧 | `TriggerPlacement`<br>`'left' \| 'right' \| 'bottom' \| 'top' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `top` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| popup-offset | 沿方位主轴的距离 | `number` | `10` |
| popup-translate | 屏幕轴附加平移 | `[number, number] \| Record` | — |
| popup-container | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| reference | 外部触发元素 | `string \| HTMLElement \| SVGElement` | — |
| disabled | 禁止打开 | `boolean` | `false` |
| unmount-on-close | 关闭后卸载内容 | `boolean` | `true` |

### Tooltip Events

| 事件名 | 说明 |
| --- | --- |
| update:open | 请求修改受控打开状态 |
| open-change | 请求修改打开状态 |
| open | 开始打开 |
| opened | 入场动画完成 |
| close | 开始关闭 |
| closed | 离场动画完成 |
| click-outside | 点击浮层外部 |

### Tooltip Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发元素 |
| content | 提示内容；未提供时使用 `content` 属性 |

### Tooltip Methods

`open()`、`close()`、`resize()`、`allowClose()`、`getReference()`、`setReference()`、`focusReference()`。

内容具有 `role="tooltip"`，打开时通过 `aria-describedby` 与实际触发元素关联，并与原有描述及 reference-attrs 中的描述合并去重；关闭、更换引用或卸载时移除提示 ID 并保留原有描述。两端独立保存同一份实现，不提供 `backgroundColor` 或布尔 `xs` 兼容入口。

## CSS Variables

所有内置主题 opacity 为 1。彩色实心状态文字遵循 Button，统一使用 on-dark，明暗模式一致。Maple 暗色保留圆角 4px、字号 14px、纵向／横向内边距 8px／16px。中性表面在明暗模式均保持深色。`color` 同时设置内容与箭头背景，`text-color` 设置文字；显式 content-style／arrow-style 覆盖各自节点。自定义颜色／透明度需重新验证。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-tooltip-animation-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | `background-color` |
| `--mp-tooltip-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-tooltip-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-tooltip-line-height` | `var(--mp-line-height)` | `line-height` |
| `--mp-tooltip-max-width` | `350px` | `max-width` |
| `--mp-tooltip-opacity` | `1` | `opacity` |
| `--mp-tooltip-padding-horizontal` | `var(--mp-sys-space-6)` | `padding` |
| `--mp-tooltip-padding-vertical` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-tooltip-size-xs-padding-horizontal` | `var(--mp-sys-space-4)` | `padding` |
| `--mp-tooltip-size-xs-padding-vertical` | `var(--mp-sys-space-2)` | `padding` |
| `--mp-tooltip-status-danger-background` | `var(--mp-sys-color-status-danger)` | `background-color` |
| `--mp-tooltip-status-danger-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-info-background` | `var(--mp-sys-color-status-info)` | `background-color` |
| `--mp-tooltip-status-info-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-primary-background` | `var(--mp-sys-color-action-primary)` | `background-color` |
| `--mp-tooltip-status-primary-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-success-background` | `var(--mp-sys-color-status-success)` | `background-color` |
| `--mp-tooltip-status-success-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-status-warning-background` | `var(--mp-sys-color-status-warning)` | `background-color` |
| `--mp-tooltip-status-warning-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-tooltip-text-color` | `var(--mp-sys-color-content-on-dark)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-tooltip-background: var(--mp-sys-color-surface-tooltip);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
