<!-- Source: src/paper/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/paper -->

# Paper 基础表面

Paper 是承载内容的底层表面：背景、圆角、可选边框与阴影。不提供 variant、status、标题或内容结构，不添加默认内边距。需要完整卡片结构时使用 Card；只需要布局时使用 div 或 Space。

适用于自定义面板、表单分区、侧栏底板以及弹层内部表面。Paper 不负责弹层定位、焦点管理，也不会自动赋予按钮语义。交互内容请使用 Button 等语义组件。

## 基础示例

### basic usage

Example source: src/paper/example/demos/basic-usage.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2" width="25vmin" height="25vmin" />
</template>
```

## 内容与展示

### 边框与圆角对比

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `bordered` | 显示边框，与 elevation 独立 | 边框与圆角对比 |
| `width` | 宽度 | 边框与圆角对比 |
| `height` | 高度 | 边框与圆角对比 |
| `elevation` | false 关闭；true 使用 2 级；数字为 0–24 | 边框与圆角对比 |
| `round` | 50% 圆角；宽高相等时为圆形 | 边框与圆角对比 |
| `radius` | 圆角，显式值优先于 round | 边框与圆角对比 |
<!-- demo-config-notes:end -->

比较边框、完全圆角和指定半径；动态属性与点击波纹另行展示。

Example source: src/paper/example/demos/surface-comparison.vue

```vue
<script setup lang="ts"></script>

<template>
  <div class="demo-comparison">
    <section class="demo-comparison-case demo-comparison-case--1" data-comparison-scene="bordered">
      <h4><span lang="zh-CN">bordered</span><span lang="en-US">Border / Border with shadow</span></h4>
      <mp-space wrap>
        <mp-paper bordered width="25vmin" height="25vmin" />
        <mp-paper bordered :elevation="2" width="25vmin" height="25vmin" />
      </mp-space>
    </section>

    <section class="demo-comparison-case demo-comparison-case--2" data-comparison-scene="round">
      <h4><span lang="zh-CN">round</span><span lang="en-US">Rounded Paper</span></h4>
      <mp-paper :elevation="2" width="25vmin" height="25vmin" round />
    </section>

    <section class="demo-comparison-case demo-comparison-case--3" data-comparison-scene="radius">
      <h4><span lang="zh-CN">radius</span><span lang="en-US">Custom Border Radius</span></h4>
      <mp-paper :elevation="2" :radius="8" width="25vmin" height="25vmin" />
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
</style>
```

## 自定义与插槽

### slot

Example source: src/paper/example/demos/slot.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2">
    <mp-cell>纸张</mp-cell>
    <mp-cell>纸张</mp-cell>
    <mp-cell>纸张</mp-cell>
  </mp-paper>
</template>
```


```html
<mp-paper bordered>基础边框</mp-paper>
<mp-paper bordered :elevation="2" style="padding: 16px">边框与阴影独立</mp-paper>
<mp-paper :width="120" height="4rem" :radius="8" />
```

## 交互与控制

### 动态属性

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `elevation` | false 关闭；true 使用 2 级；数字为 0–24 | 动态属性、ripple |
| `width` | 宽度 | 动态属性、ripple |
| `height` | 高度 | 动态属性、ripple |
| `bordered` | 显示边框，与 elevation 独立 | 动态属性 |
| `round` | 50% 圆角；宽高相等时为圆形 | 动态属性 |
| `radius` | 圆角，显式值优先于 round | 动态属性 |
<!-- demo-config-notes:end -->

边框与阴影独立；显式 radius 优先于 round。内部按钮提供键盘语义，父级统计 Paper click，不将表面容器伪装成按钮。

Example source: src/paper/example/demos/live-properties.vue

```vue
<script setup>
import { ref } from 'vue'

const bordered = ref(false)
const round = ref(false)
const explicitRadius = ref(false)
const elevated = ref(false)
const clicks = ref(0)
</script>

<template>
  <section class="paper-live-demo">
    <div class="controls">
      <mp-checkbox v-model="bordered" edit-mode="direct">Paper border</mp-checkbox>
      <mp-checkbox v-model="round" edit-mode="direct">Round paper</mp-checkbox>
      <mp-checkbox v-model="explicitRadius" edit-mode="direct">Explicit radius</mp-checkbox>
      <mp-checkbox v-model="elevated" edit-mode="direct">Paper shadow</mp-checkbox>
    </div>
    <p role="status">Surface clicks: {{ clicks }}</p>
    <mp-paper
      data-testid="live-paper"
      :bordered="bordered"
      :round="round"
      :radius="explicitRadius ? '12' : undefined"
      :elevation="elevated ? 2 : false"
      width="160"
      :height="100"
      @click="clicks++"
    >
      <mp-button html-type="button">Surface action</mp-button>
    </mp-paper>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
[data-testid='live-paper'] {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### ripple

Example source: src/paper/example/demos/ripple.vue

```vue
<script setup></script>

<template>
  <mp-paper :elevation="2" ripple width="25vmin" height="25vmin" />
</template>
```

## API

### Paper Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bordered | 显示边框，与 elevation 独立 | boolean | false |
| elevation | false 关闭；true 使用 2 级；数字为 0–24 | boolean / number | false |
| ripple | 启用水波效果，不自动赋予按钮语义 | boolean | false |
| radius | 圆角，显式值优先于 round | number / string | — |
| width | 宽度 | number / string | — |
| height | 高度 | number / string | — |
| round | 50% 圆角；宽高相等时为圆形 | boolean | false |
| inline | 使用 inline-flex | boolean | false |

radius、width、height 的数字和数字字符串使用 px，其他字符串按 CSS 长度传递，例如 1rem、50%、calc(100% - 8px)。类名、原生属性和自定义样式透传到根容器。

elevation=false 不生成阴影等级类，true 使用 2；数字先四舍五入，再夹取到 0–24。NaN/Infinity 在开发环境产生 Vue 属性校验提示，运行时回退为 2。radius/width/height 的数字必须有限且非负；非法数字会移除该内联尺寸，不保留上一次尺寸，0 仍有效。十进制及科学计数法数字字符串按 px 处理；其他 CSS 字符串交给浏览器解析，不承诺支持浏览器本身不接受的表达式。

### Paper Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击时触发一次 | MouseEvent |

click 只通知并传递原始 MouseEvent，包含冒泡的子元素点击；@click.once 使用标准 Vue 事件语义，不等待监听器 Promise。PaperProps 包含该监听参数，根入口与子入口一致；PaperInstance 没有额外的业务执行方法。

### Paper Slots

| 插槽 | 说明 |
| --- | --- |
| default | 表面内部内容 |

## Types

```ts
import Paper, { Paper as NamedPaper } from '@maple-design/ui-vue/paper'
import type { PaperProps, PaperInstance } from '@maple-design/ui-vue'
import type { PaperProps as SubPaperProps } from '@maple-design/ui-vue/paper'
const surface: PaperProps = { onClick: (event: MouseEvent) => event.preventDefault() }
```

## 使用说明



默认背景使用主题表面色，默认不显示手形光标；通过尺寸、圆角、阴影和水波属性定制外观。

内置动效遵循 `prefers-reduced-motion: reduce`：保留内容与状态反馈，关闭装饰性动画。自定义动画需由调用方适配该偏好。

## CSS Variables

内置主题可覆盖背景和圆角。bordered=false 不占边框空间，开启后使用 border-box；固定宽高包含边框。背景、边框和阴影彼此独立。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-paper-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-paper-border-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-paper-border-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-paper-border-width` | `1px` | `border` |
| `--mp-paper-transition-duration` | `var(--mp-sys-motion-duration-slow)` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-paper-background: var(--mp-sys-color-surface-default);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
