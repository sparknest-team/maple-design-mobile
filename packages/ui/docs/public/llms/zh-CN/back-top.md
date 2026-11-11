<!-- Source: src/back-top/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/back-top -->

# BackTop 回到顶部

滚动页面或指定容器的回顶按钮，支持原生键盘操作。

## 基础示例

### 基础用法

Example source: src/back-top/example/demos/basic-usage.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>在面板内滚动，超过 120px 时显示按钮。</p>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · 滚动内容 {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => scroller"
        :popup-container="false"
        :visible-height="120"
        :right="16"
        :bottom="16"
        aria-label="回到顶部"
      />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

## 自定义与插槽

### 自定义位置

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target-container` | 滚动容器；省略时为页面 | 自定义位置 |
| `popup-container` | 挂载容器；false 原地渲染 | 自定义位置 |
| `visible-height` | 显示阈值（含边界）；数字字符串按 px，不支持 CSS 单位 | 自定义位置 |
| `right` | 右侧偏移；数字按 px，字符串支持 CSS 长度 | 自定义位置 |
| `bottom` | 底部偏移；数字按 px，字符串支持 CSS 长度 | 自定义位置 |
| `aria-label` | 无障碍名称 | 自定义位置 |
<!-- demo-config-notes:end -->

Example source: src/back-top/example/demos/custom-position.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>在面板内滚动，超过 120px 时显示按钮。</p>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · 滚动内容 {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => scroller"
        :popup-container="false"
        :visible-height="120"
        :right="64"
        :bottom="32"
        aria-label="回到顶部"
      />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

## 交互与控制

### 切换滚动容器

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target-container` | 滚动容器；省略时为页面 | 切换滚动容器、自定义内容与事件 |
| `popup-container` | 挂载容器；false 原地渲染 | 切换滚动容器、自定义内容与事件 |
| `visible-height` | 显示阈值（含边界）；数字字符串按 px，不支持 CSS 单位 | 切换滚动容器、自定义内容与事件 |
| `right` | 右侧偏移；数字按 px，字符串支持 CSS 长度 | 切换滚动容器、自定义内容与事件 |
| `bottom` | 底部偏移；数字按 px，字符串支持 CSS 长度 | 切换滚动容器、自定义内容与事件 |
| `aria-label` | 无障碍名称 | 切换滚动容器、自定义内容与事件 |
<!-- demo-config-notes:end -->

Example source: src/back-top/example/demos/target-container.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
const second = ref<HTMLElement>()
const useSecond = ref(false)
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>在面板内滚动，超过 120px 时显示按钮。</p>
    <mp-button @click="useSecond = !useSecond">切换滚动目标 {{ useSecond ? 'B' : 'A' }}</mp-button>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · 滚动内容 {{ row }}</p>
      </div>
      <div ref="second" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">B · 滚动内容 {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => (useSecond ? second : scroller)"
        :popup-container="false"
        :visible-height="120"
        :right="16"
        :bottom="16"
        aria-label="回到顶部"
      />
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

### 自定义内容与事件

Example source: src/back-top/example/demos/custom-content.vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const scroller = ref<HTMLElement>()
const clicks = ref(0)
onMounted(() => {
  if (scroller.value) {
    scroller.value.scrollTop = 240
    scroller.value.dispatchEvent(new Event('scroll'))
  }
})
</script>

<template>
  <div class="back-top-demo">
    <p>在面板内滚动，超过 120px 时显示按钮。 {{ '点击次数：' }}{{ clicks }}</p>
    <div class="back-top-demo__frame">
      <div ref="scroller" class="back-top-demo__scroll">
        <p v-for="row in 30" :key="row">A · 滚动内容 {{ row }}</p>
      </div>
      <mp-back-top
        :target-container="() => scroller"
        :popup-container="false"
        :visible-height="120"
        :right="16"
        :bottom="16"
        aria-label="回到顶部"
        @click="clicks++"
        >TOP</mp-back-top
      >
    </div>
  </div>
</template>

<style scoped>
.back-top-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.back-top-demo > p {
  margin: 0;
}
.back-top-demo__frame {
  position: relative;
  display: flex;
  gap: 12px;
}
.back-top-demo__scroll {
  flex: 1;
  min-width: 0;
  height: 240px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.back-top-demo__scroll p {
  padding: 8px 12px;
  margin: 0;
}
</style>
```

示例使用独立局部容器，避免多个卡片争用页面回顶按钮。不传 `target-container` 时监听页面，不自动查找滚动祖先。无效或未匹配的选择器会隐藏按钮；异步容器使用返回元素的响应式 getter。`popup-container` 只控制按钮挂载位置，不改变滚动目标。

## 生命周期与边界

### 调度生命周期

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `target-container` | 滚动容器；省略时为页面 | 调度生命周期 |
| `popup-container` | 挂载容器；false 原地渲染 | 调度生命周期 |
| `duration` | 回顶动画毫秒数，0 立即回顶 | 调度生命周期 |
| `easing` | 内置曲线或输入/输出 0–1 的自定义缓动函数 | 调度生命周期 |
<!-- demo-config-notes:end -->

Example source: src/back-top/example/demos/scheduler-lifecycle.vue

```vue
<script setup>
import { ref } from 'vue'

const first = ref()
const second = ref()
const active = ref(true)
const alternate = ref(false)
let retained
const capture = (instance) => {
  if (instance) {
    retained = instance
  }
}
const lower = () => {
  if (first.value) {
    first.value.scrollTop = 300
  }
  if (second.value) {
    second.value.scrollTop = 300
  }
}
</script>
<template>
  <div style="position: relative">
    <mp-button @click="lower">Scroll down / 滚动到底部</mp-button>
    <mp-button @click="alternate = !alternate">Switch target / 切换目标</mp-button>
    <mp-button @click="active = !active">Activate / 停用与激活</mp-button>
    <mp-button @click="retained?.scrollToTop()">Retained command / 保留命令</mp-button>
    <p>Start an animation, switch or deactivate before completion. Old work must not resume.</p>
    <div ref="first" style="height: 100px; overflow: auto"><div style="height: 500px">Target A</div></div>
    <div ref="second" style="height: 100px; overflow: auto"><div style="height: 500px">Target B</div></div>
    <KeepAlive>
      <mp-back-top
        v-if="active"
        :ref="capture"
        :target-container="() => (alternate ? second : first)"
        :popup-container="false"
        :duration="1000"
        easing="linear"
      />
    </KeepAlive>
  </div>
</template>
```

## 使用说明

### 缓动与异常

duration 必须是有限非负毫秒数；0 立即回顶。非法时长在开发环境由 Vue 属性校验提示，运行时沿用立即完成回退。easing 内置值只有 linear、quartOut、easeInOutCubic，非法名称提示后回退 quartOut。自定义函数输入为 0–1 进度：有限返回值夹取到 0–1，非有限或非数字返回值使用当前线性进度；不等待 Promise。函数抛出的错误原样交给调用环境报告，该帧不再安排后续动画，可以再次调用 scrollToTop 重试；不会伪造 click 成功或新增错误事件。

## API

### BackTop Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `target-container` | 滚动容器；省略时为页面 | `string \| HTMLElement \| (() => HTMLElement \| null \| undefined)` | `—` |
| `popup-container` | 挂载容器；false 原地渲染 | `string \| HTMLElement \| false` | `body` |
| `visible-height` | 显示阈值（含边界）；数字字符串按 px，不支持 CSS 单位 | `number \| string` | `200` |
| `duration` | 回顶动画毫秒数，0 立即回顶 | `number` | `200` |
| `easing` | 内置曲线或输入/输出 0–1 的自定义缓动函数 | `'linear' \| 'quartOut' \| 'easeInOutCubic' \| ((progress: number) => number)` | `'quartOut'` |
| `right` | 右侧偏移；数字按 px，字符串支持 CSS 长度 | `number \| string` | `—` |
| `bottom` | 底部偏移；数字按 px，字符串支持 CSS 长度 | `number \| string` | `—` |
| `elevation` | 阴影等级；true 为 2，false 关闭 | `boolean \| number` | `true` |
| `aria-label` | 无障碍名称 | `string` | `'Back to top'` |

`popup-container=false` 时按钮绝对定位，父级需 `position: relative`。重复点击替换前次动画；切换目标、KeepAlive 停用和卸载都会清理监听与动画。系统开启减少动态效果时立即回顶，不改变横向滚动位置。

### BackTop Events / Slots / Methods

- `click(event: MouseEvent)`：每次激活通知一次。
- 默认插槽：文字、图标等非交互内容；根节点已是原生 button，不再嵌套 Button 或链接。
- `scrollToTop()`：滚动当前目标，不额外触发 click。
- 键盘：Tab 聚焦可见按钮，Enter / Space 激活；隐藏时不可聚焦。

## Types

```ts
import type { BackTopProps, BackTopInstance, BackTopTarget, BackTopEasing } from '@maple-design/ui-vue'
```

### 导入与事件类型

子入口的默认组件与子入口、根入口的命名组件是同一组件。Props 类型包含实际事件监听参数；事件仍是通知，不等待监听器返回的 Promise。仅使用文档列出的实例方法。

```ts
import BackTop, { BackTop as NamedBackTop } from '@maple-design/ui-vue/back-top'
import { BackTop as RootBackTop } from '@maple-design/ui-vue'
import type { BackTopProps, BackTopInstance } from '@maple-design/ui-vue'
import type { BackTopProps as SubBackTopProps } from '@maple-design/ui-vue/back-top'
const options: BackTopProps = { onClick: (event: MouseEvent) => event.preventDefault() }
```

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-back-top-background` | `var(--mp-sys-color-surface-raised)` | `background` |
| `--mp-back-top-bottom` | `40px` | `bottom` |
| `--mp-back-top-button-border-radius` | `50%` | `border-radius` |
| `--mp-back-top-button-size` | `var(--mp-sys-control-touch-target)` | `height`, `width` |
| `--mp-back-top-focus-color` | `var(--mp-sys-color-content-brand)` | `outline` |
| `--mp-back-top-focus-offset` | `2px` | `outline-offset` |
| `--mp-back-top-focus-width` | `2px` | `outline` |
| `--mp-back-top-font-size` | `var(--mp-sys-font-size-md)` | `font-size` |
| `--mp-back-top-hover-background` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-back-top-icon-size` | `20px` | `height`, `width` |
| `--mp-back-top-right` | `40px` | `right` |
| `--mp-back-top-text-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-back-top-z-index` | `var(--mp-z-index-local-sticky)` | `z-index` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-back-top-background: var(--mp-sys-color-surface-raised);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
