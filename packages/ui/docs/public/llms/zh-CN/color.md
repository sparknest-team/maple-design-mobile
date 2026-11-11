<!-- Source: src/color/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/color -->

# 颜色 Color

### 介绍

语义色工具类，前缀 `mp-`（Cedar 为 `c-*`），变量 `--mp-*`。  
完整色阶见 [色板 Palette](#/zh-CN/palette)。

引入：

```js
// playground-ignore
import '@maple-design/ui-vue/utilities/style'
```

### 类名规则

| 类名                                                                 | 变量                                                |
| -------------------------------------------------------------------- | --------------------------------------------------- |
| `mp-primary` / `mp-success` / `mp-warning` / `mp-danger` / `mp-info` | `rgb(var(--mp-{hue}-6))`                            |
| `mp-*-hover` / `mp-*-pressed` / `mp-*-disabled`                      | 5 / 7 / 3 号                                        |
| `mp-bg-primary` 等                                                   | `rgb(var(--mp-{hue}-1))`                            |
| `mp-text-1` … `mp-text-4`                                            | `var(--mp-color-text-1)` … `var(--mp-color-text-4)` |
| `mp-fill-1` … `mp-fill-4`                                            | `var(--mp-color-fill-*)`                            |
| `mp-color-border-1` … `mp-color-border-4`                            | `var(--mp-color-border-*)`                          |
| `mp-bg-0` / `mp-bg-1` / `mp-bg-2`                                    | `bg-white` / `bg-1` / `bg-2`                        |

`mp-info` 映射 `--mp-info-*`。移动端示例见左侧预览。

## 基础示例

### 基础用法

Example source: src/color/example/basic.vue

```vue
<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'

onThemeChange()
const status = ['primary', 'success', 'warning', 'danger', 'info']
const levels = [1, 2, 3, 4]
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="mp-text-1 mp-mb-8">Status</div>
    <div class="mp-flex mp-flex-wrap mp-items-center" style="gap: 8px">
      <div
        v-for="name in status"
        :key="name"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="[`mp-${name}`, `mp-bg-${name}`]"
      >
        mp-{{ name }}
      </div>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Text / Fill / Border / Bg</div>
    <div class="mp-flex mp-flex-wrap" style="gap: 8px">
      <div v-for="n in levels" :key="`t-${n}`" :class="`mp-text-${n}`">mp-text-{{ n }}</div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div v-for="n in levels" :key="`f-${n}`" class="mp-px-8 mp-py-4 mp-rounded-sm" :class="`mp-fill-${n}`">
        mp-fill-{{ n }}
      </div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in levels"
        :key="`bd-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="`mp-color-border-${n}`"
        style="border-width: 2px; border-style: solid"
      >
        mp-color-border-{{ n }}
      </div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in [0, 1, 2]"
        :key="`b-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm mp-border-2"
        :class="`mp-bg-${n}`"
        style="border-width: 1px; border-style: solid"
      >
        mp-bg-{{ n }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';
</style>
```

## 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。
