<!-- Source: src/ellipsis/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/ellipsis -->

# Ellipsis 文本省略

单行或多行文本省略，可选展开交互和 Tooltip。

## 基础示例

### 单行省略

Example source: src/ellipsis/example/demos/line.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%">
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

## 内容与展示

### 受控展开

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `tooltip` | Tooltip 配置，false 禁用 | 受控展开、自定义提示 |
| `expand` | 受控展开状态，配合 v-model:expand | 受控展开 |
| `line-clamp` | 正数行数，向下取整；未传或无效为单行 | 受控展开 |
| `expand-trigger` | 启用点击与 Enter / Space 展开 | 受控展开 |
<!-- demo-config-notes:end -->

Example source: src/ellipsis/example/demos/two-way-binding.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
</script>

<template>
  <div class="ellipsis-demo">
    <mp-button @click="expanded = !expanded">外部切换: {{ expanded }}</mp-button>
    <mp-ellipsis
      v-model:expand="expanded"
      style="width: 240px; max-width: 100%"
      :line-clamp="2"
      expand-trigger="click"
      :tooltip="false"
    >
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

### 自定义提示

Example source: src/ellipsis/example/demos/tooltip.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis
      style="width: 240px; max-width: 100%"
      :tooltip="{
        status: 'primary',
        trigger: ['hover', 'focus', 'click'],
        content: '独立的提示内容，不会重复拼接正文',
      }"
    >
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

## 数据与选项

### 多行省略

Example source: src/ellipsis/example/demos/multiple-line.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%" :line-clamp="2">
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

## 交互与控制

### 交互展开

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `line-clamp` | 正数行数，向下取整；未传或无效为单行 | 交互展开 |
| `expand-trigger` | 启用点击与 Enter / Space 展开 | 交互展开 |
| `tooltip` | Tooltip 配置，false 禁用 | 交互展开 |
<!-- demo-config-notes:end -->

Example source: src/ellipsis/example/demos/expand.vue

```vue
<template>
  <div class="ellipsis-demo">
    <mp-ellipsis style="width: 240px; max-width: 100%" :line-clamp="2" expand-trigger="click" :tooltip="false">
      这是一段较长的说明文字，用于展示有限宽度内的省略效果。点击或使用键盘可以展开查看完整内容，再次操作可以收起。容器宽度改变时，文本会根据新的空间重新排版。
    </mp-ellipsis>
    <p>点击文本，或聚焦后按 Enter / Space 展开与收起。</p>
  </div>
</template>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
.ellipsis-demo p {
  margin: 0;
}
</style>
```

## 使用说明

### 行数与内容边界

expand-trigger 仅支持 click；非法值在开发环境由 Vue 属性校验提示，运行时不启用按钮角色、点击或键盘展开。line-clamp 接受有限数字或数字字符串，至少 1 行，向下取整；不足 1、非有限或非法字符串提示后回退普通单行，清除旧多行样式。推荐正文使用纯文本或无独立交互的行内内容；默认 Tooltip 仍不检测是否实际溢出，开启时可通过 Tab 聚焦，自定义提示与展开的受控协议保持不变。

## API

### Ellipsis Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `expand` | 受控展开状态，配合 v-model:expand | `boolean` | `undefined` |
| `default-expand` | 非受控初始展开状态 | `boolean` | `false` |
| `expand-trigger` | 启用点击与 Enter / Space 展开 | `'click'` | `—` |
| `line-clamp` | 正数行数，向下取整；未传或无效为单行 | `number \| string` | `—` |
| `tooltip` | Tooltip 配置，false 禁用 | `boolean \| TooltipProps` | `true` |

传入 `expand` 后只通知父级，不擅自修改受控值；省略时由内部状态管理，`default-expand` 仅用于初始化。Tooltip 遵循自身默认宽度及触发方式，不以实际测量是否溢出作为显示条件；触控场景可显式设置 `tooltip.trigger` 包含 `click`。外部 class/style/width 直接作用于文本节点。

### Ellipsis Events / Slots

- `update:expand(expand: boolean)`：用户操作请求的新状态；外部更新不触发。
- `default`：正文。
- `tooltip-content`：提示内容；未提供时优先 tooltip.content，否则使用正文，不重复拼接。
- 键盘：可展开文本支持 Enter / Space；启用 Tooltip 的文本可通过 Tab 聚焦。无公开实例方法。

## Types

```ts
import type { EllipsisProps, EllipsisInstance, EllipsisExpandTrigger } from '@maple-design/ui-vue'
```

### 导入与事件类型

子入口的默认组件与子入口、根入口的命名组件是同一组件。Props 类型包含实际事件监听参数；事件仍是通知，不等待监听器返回的 Promise。仅使用文档列出的实例方法。

```ts
import Ellipsis, { Ellipsis as NamedEllipsis } from '@maple-design/ui-vue/ellipsis'
import { Ellipsis as RootEllipsis } from '@maple-design/ui-vue'
import type { EllipsisProps, EllipsisInstance } from '@maple-design/ui-vue'
import type { EllipsisProps as SubEllipsisProps } from '@maple-design/ui-vue/ellipsis'
const options: EllipsisProps = { 'onUpdate:expand': (expanded: boolean) => String(expanded) }
```

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-ellipsis-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-ellipsis-focus-offset` | `2px` | `outline-offset` |
| `--mp-ellipsis-focus-width` | `2px` | `outline` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-ellipsis-focus-color: var(--mp-sys-color-action-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
