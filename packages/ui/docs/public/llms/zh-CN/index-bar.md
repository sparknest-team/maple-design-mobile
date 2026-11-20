<!-- Source: src/index-bar/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/index-bar -->

# 索引栏

### 介绍

用于跳转到页面指定位置。

## 基础示例

### 基本使用

点击索引栏时，会自动跳转到对应的 `IndexAnchor` 锚点位置。

Example source: src/index-bar/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'
import { AppType, onThemeChange } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const list = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
const active = ref('A')

onThemeChange()

function handleChange(value) {
  active.value = String(value)
}
</script>

<template>
  <app-type>{{ english ? 'Basic Usage' : '基本使用' }} · {{ english ? 'Active' : '当前' }} {{ active }}</app-type>
  <div class="index-bar-demo-surface">
    <mp-index-bar duration="300" @change="handleChange">
      <div v-for="item in list" :key="item">
        <mp-index-anchor
          :index="item"
          class="index-bar-example-anchor"
          :style="{
            background: 'var(--mp-tag-status-primary-color)',
            color: 'var(--mp-tag-status-primary-text-color)',
          }"
        >
          {{ english ? 'Title' : '标题' }} {{ item }}
        </mp-index-anchor>
        <mp-cell>{{ item }} {{ english ? 'Item' : '文本' }}</mp-cell>
        <mp-cell>{{ item }} {{ english ? 'Item' : '文本' }}</mp-cell>
      </div>
    </mp-index-bar>
  </div>
</template>

<style lang="less">
.index-bar-demo-surface {
  position: relative;
  height: 520px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 8px;

  .mp-index-bar__anchor-list-container {
    position: sticky;
    top: 0;
    right: auto;
    bottom: auto;
    left: auto;
    width: 100%;
    height: 0;
    transform: none;
    pointer-events: none;
  }

  .mp-index-bar__anchor-list {
    position: absolute;
    top: 26px;
    right: 0;
    background: transparent !important;
    pointer-events: auto;
  }
}

.index-bar-example-anchor {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  transition: all 0.25s;
}
</style>
```

## 生命周期与边界

### 停用、卸载与保留命令

Example source: src/index-bar/example/demos/lifecycle.vue

```vue
<script setup>
import { KeepAlive, ref, watch } from 'vue'
import { AppType } from '@maple-design/cli-vue/client'
import { demoEnglish as english } from '@maple-design/cli-vue/demo-language'

const mounted = ref(true),
  active = ref(true),
  bar = ref(),
  changes = ref([])
let retained
watch(bar, (value) => {
  if (value) {
    retained = value
  }
})
const command = (index) => retained?.scrollTo(index)
const record = (value) => {
  changes.value.push(value)
}
</script>

<template>
  <app-type>{{ english ? 'Lifecycle and retained commands' : '生命周期与保留命令' }}</app-type>
  <mp-space wrap>
    <mp-button @click="command('C')">{{ english ? 'Scroll to C' : '跳转 C' }}</mp-button>
    <mp-button @click="active = !active">{{ english ? 'Toggle active' : '切换激活' }}</mp-button>
    <mp-button @click="mounted = !mounted">{{ english ? 'Toggle mounted' : '切换挂载' }}</mp-button>
    <mp-button @click="command('A')">{{ english ? 'Retained command A' : '保留命令 A' }}</mp-button>
  </mp-space>
  <p>{{ english ? 'Changes' : '变化事件' }}: {{ changes.join(' / ') }}</p>
  <div class="index-lifecycle-surface">
    <KeepAlive v-if="mounted">
      <mp-index-bar v-if="active" ref="bar" :duration="600" @change="record">
        <div v-for="index in ['A', 'B', 'C']" :key="index" class="index-lifecycle-group">
          <mp-index-anchor :index="index" />
          <p>{{ english ? 'Group' : '分组' }} {{ index }}</p>
        </div>
      </mp-index-bar>
    </KeepAlive>
  </div>
  <p>
    {{
      english
        ? 'Inactive/disposed retained commands do not scroll or notify. Activation restores active without another change event.'
        : '停用／卸载后保留命令不滚动、不通知；激活恢复当前定位，不重复变化事件。'
    }}
  </p>
</template>

<style lang="less">
.index-lifecycle-surface {
  height: 180px;
  overflow: auto;
  position: relative;
  border: 1px solid var(--mp-color-border-2);
}
.index-lifecycle-group {
  height: 240px;
}
</style>
```

## 阅读方向

默认索引列表位于阅读终点，字母/条目顺序及纵向滚动坐标不反转；安全区和 sticky 顶部偏移仍保持物理含义。

首次挂载不会自动选中索引；用户滚动或调用 `scrollTo` 后更新高亮。导航项使用原生按钮，支持 Tab、Enter 和 Space。`anchor-name` 插槽应提供按钮内可读内容，不应嵌套交互控件。

锚点标识按严格相等匹配，数字 `0` 与字符串 `"0"` 不同；未提供 index 的锚点不显示在导航中，空字符串是有效标识。应为每个锚点提供唯一标识；重复标识时程序跳转选择首个匹配项。`duration` 按毫秒读取数字或数字字符串，非正值及非有限值即时定位；`sticky-offset-top` 使用现有长度换算并始终按物理顶部定位。新滚动命令会替换旧命令，停用或卸载会取消待执行的滚动。

## API

### IndexBar Props

| 参数                | 说明                       | 类型               | 默认值  |
| ------------------- | -------------------------- | ------------------ | ------- |
| `sticky`            | 是否开启锚点吸顶           | _boolean_          | `true`  |
| `sticky-offset-top` | 锚点吸顶时与顶部的距离     | _number \| string_ | `0`     |
| `hide-list`         | 是否隐藏锚点列表           | _boolean_          | `false` |
| `sticky-css-mode`   | 开启原生 `css sticky` 模式 | _boolean_          | `false` |
| `z-index`           | z-index 层级               | _number \| string_ | `1`     |
| `highlight-color`   | 索引字符高亮颜色           | _string_           | `-`     |
| `duration`          | 动画持续时间               | _string \| number_ | `0`     |

### IndexAnchor Props

| 参数    | 说明     | 类型               | 默认值 |
| ------- | -------- | ------------------ | ------ |
| `index` | 索引字符 | _number \| string_ | `-`    |

### IndexBar Events

| 事件名   | 说明                         | 回调参数                  |
| -------- | ---------------------------- | ------------------------- |
| `click`  | 点击索引栏的字符时触发       | `index: number \| string` |
| `change` | 当前高亮的索引字符变化时触发 | `index: number \| string` |

### IndexBar Slots

| 名称      | 说明       | 参数 |
| --------- | ---------- | ---- |
| `default` | 索引栏内容 | `-`  |
| `anchor-name` | 导航按钮内容，建议只放非交互内容 | `{ anchorName: number \| string }` |

### IndexAnchor Slots

| 名称          | 说明           | 参数                          |
| ------------- | -------------- | ----------------------------- |
| `default`     | 自定义索引字符 | `-`                           |

### IndexBar Methods

通过 ref 可以获取到 IndexBar 实例并调用实例方法

| 方法名     | 说明           | 参数                                                         | 返回值 |
| ---------- | -------------- | ------------------------------------------------------------ | ------ |
| `scrollTo` | 滚动到指定锚点 | `index: number \| string, options?: IndexBarScrollToOptions` | `-`    |

## Types

### IndexBarScrollToOptions

| 参数    | 说明                                  | 类型      | 默认值 |
| ------- | ------------------------------------- | --------- | ------ |
| `event` | 值为 `false` 时阻止触发 `change` 事件 | _boolean_ | `-`    |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-index-bar-list-bottom` | `auto` | `bottom` |
| `--mp-index-bar-list-item-active-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-index-bar-list-item-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-index-bar-list-item-font-size` | `var(--mp-font-size-xs)` | `font-size` |
| `--mp-index-bar-list-item-height` | `14px` | `height` |
| `--mp-index-bar-list-item-padding` | `0 10px` | `padding` |
| `--mp-index-bar-list-left` | `auto` | `inset-inline-start` |
| `--mp-index-bar-list-right` | `0` | `inset-inline-end` |
| `--mp-index-bar-list-top` | `50%` | `top` |
| `--mp-index-bar-list-transform` | `translate(0, -50%)` | `transform` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-index-bar-list-item-active-color: var(--mp-sys-color-content-danger);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
