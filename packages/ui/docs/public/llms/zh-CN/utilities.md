<!-- Source: src/utilities/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/utilities -->

# 总览 Utilities

### 介绍

Maple / Cedar 语义与结构一致，**类名必须带库前缀**（`mp-` / `c-`），变量分别为 `--mp-*` / `--c-*`，避免混用撞名。  
不做无前缀别名，不做向后兼容。

| | Maple | Cedar |
|---|---|---|
| 类名 | `mp-text-1`、`mp-mt-16` | `c-text-1`、`c-mt-16` |
| 形态 | 独立 Utilities + Uno/TW preset | 固定 Utilities + Uno/TW preset |
| Token | `--mp-*` | `--c-*` |

### 引入

```js
// playground-ignore
import '@maple-design/ui-vue/utilities/style'
```

需已加载主题变量（`style/theme/css-variables`）。

### 分册

| 页面 | 内容 |
|---|---|
| [颜色 Color](#/zh-CN/color) | 功能色、文字 / 填充 / 边框 / 背景层级 |
| [常用写法](#/zh-CN/atomic-usage) | Flex / 间距 / 尺寸 / 溢出 / 圆角等日常原子类 |
| [海拔 Elevation](#/zh-CN/styles) | `mp-elevation--0` … `--24` |
| [字体排版 Typography](#/zh-CN/typography) | Cedar 有完整包；Maple 用 token / 原子化 |
| [原子化 CSS](#/zh-CN/atomic-css) | Uno / TW 安装与配置 |
| [Utility 规范](#/zh-CN/utilitySpec) | 两端共用约定 |

色阶变量见 [色板 Palette](#/zh-CN/palette)，不进默认工具包。左侧预览为总览快照。

## 基础示例

### 基础用法

Example source: src/utilities/example/basic.vue

```vue
<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'

onThemeChange()

const statusColors = ['primary', 'success', 'warning', 'danger', 'info']
const textLevels = [1, 2, 3, 4]
const spaceSamples = [
  { cls: 'mp-mt-16 mp-px-8', label: 'mp-mt-16 mp-px-8' },
  { cls: 'mp-p-16', label: 'mp-p-16' },
  { cls: 'mp-mx-24 mp-my-8', label: 'mp-mx-24 mp-my-8' },
]
</script>

<template>
  <div class="utilities-demo mp-px-16 mp-py-16">
    <div class="mp-text-1 mp-mb-8">Color</div>
    <div class="mp-flex mp-flex-wrap mp-items-center" style="gap: 8px">
      <div
        v-for="name in statusColors"
        :key="name"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="[`mp-${name}`, `mp-bg-${name}`]"
      >
        mp-{{ name }}
      </div>
    </div>

    <div class="mp-flex mp-flex-wrap mp-mt-16" style="gap: 8px">
      <div v-for="n in textLevels" :key="`t-${n}`" :class="`mp-text-${n}`">mp-text-{{ n }}</div>
    </div>

    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div v-for="n in textLevels" :key="`f-${n}`" class="mp-px-8 mp-py-4 mp-rounded-sm" :class="`mp-fill-${n}`">
        mp-fill-{{ n }}
      </div>
    </div>

    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in [0, 1, 2]"
        :key="`bg-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm mp-border-2"
        :class="`mp-bg-${n}`"
        style="border-width: 1px; border-style: solid"
      >
        mp-bg-{{ n }}
      </div>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Spacing</div>
    <div class="mp-fill-2 mp-rounded-md mp-p-8">
      <div v-for="item in spaceSamples" :key="item.label" class="mp-bg-primary mp-rounded-sm" :class="item.cls">
        {{ item.label }}
      </div>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Flex</div>
    <div class="mp-flex mp-flex-row mp-justify-between mp-items-center mp-fill-1 mp-rounded-md mp-px-16 mp-py-8">
      <span class="mp-text-1">start</span>
      <span class="mp-text-3">space-between</span>
      <span class="mp-primary">end</span>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Rounded</div>
    <div class="mp-flex mp-flex-col" style="gap: 12px">
      <div class="mp-bg-1 mp-rounded-sm mp-px-16 mp-py-8">mp-rounded-sm</div>
      <div class="mp-bg-1 mp-rounded-md mp-px-16 mp-py-8">mp-rounded-md</div>
      <div class="mp-bg-1 mp-rounded-lg mp-px-16 mp-py-8">mp-rounded-lg</div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../style/utilities.less';
</style>
```
