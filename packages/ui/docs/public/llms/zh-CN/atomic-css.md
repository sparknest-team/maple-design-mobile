<!-- Source: src/atomic-css/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/atomic-css -->

# 原子化 CSS

### 介绍

Maple 提供两套能力：

| 能力              | 包 / 入口                                                            | 何时用                            |
| ----------------- | -------------------------------------------------------------------- | --------------------------------- |
| 固定工具类 `mp-*` | `@maple-design/ui-vue/utilities/style`                       | 不接 Uno/TW 时使用                |
| Uno / TW preset   | `@maple-design/preset-unocss-vue` / `@maple-design/preset-tailwindcss-vue` | 使用带 `mp-` 前缀的完整原子化体系 |

Preset **不是组件**，是构建期配置。左侧预览用同等 CSS 变量演示视觉效果；真实类由 Uno / Tailwind 生成。
两套引擎使用相同类名，例如 `mp-flex`、`mp-p-16`、`mp-text-md`、`mp-bg-primary`，项目中二选一启用。
日常分类速查见 [常用写法](#/zh-CN/atomic-usage)。
Tailwind 的 `prefix` 是全局配置，同一个 Tailwind 实例不能同时加载 Cedar 与 Maple 两个 preset；请按应用选择其中一个。

Cedar 对应：`@cedar-design/preset-unocss-vue` / `@cedar-design/preset-tailwindcss-vue`（前缀 `c-`）。

```js
// playground-ignore
import '@maple-design/ui-vue/utilities/style'
```

### 新手示例

UnoCSS 和 Tailwind **二选一配置**，但组件里的类名完全相同。可以先复制下面这张卡片，再逐个调整类名：

```vue
<template>
  <div class="mp-flex mp-max-w-md mp-flex-col mp-gap-12 mp-rounded-lg mp-border mp-border-solid mp-border-gray-200 mp-bg-body mp-p-16">
    <h3 class="mp-m-0 mp-text-lg mp-text-primary">第一张原子化卡片</h3>
    <p class="mp-m-0 mp-text-sm">组合小类完成布局，不需要另外写组件样式。</p>

    <div class="mp-flex mp-items-center mp-justify-between mp-gap-8 mp-rounded-md mp-bg-gray-100 mp-p-12">
      <code>mp-flex mp-items-center mp-gap-8</code>
      <span class="mp-text-success">Success</span>
    </div>

    <mp-button class="mp-rounded-md mp-border-0 mp-bg-primary mp-px-16 mp-py-8 mp-text-white hover:mp-opacity-80">
      保存
    </mp-button>
  </div>
</template>
```

读法：`mp-` 是 Maple 前缀；`flex` 是布局；`p/px/py/gap` 是间距；`bg/text/border` 是颜色；`rounded` 是圆角；`hover:` 是交互状态。右侧手机预览最上方就是这段代码的效果。

### 与固定工具类的分工

| 能力           | 例子                              | 说明                                  |
| -------------- | --------------------------------- | ------------------------------------- |
| Preset 颜色    | `mp-bg-primary` `mp-text-success` | 需配置 preset                         |
| Preset 字号    | `mp-text-xs` … `mp-text-lg`       | 挂 `--mp-font-size-*`                 |
| Preset 断点    | `sm:` `md:` `lg:` `xl:`           | 数值与设计对齐                        |
| 固定 Utilities | `mp-text-1` `mp-fill-1`           | 仅保留设计语义类；布局与圆角由 preset 提供 |

---

### UnoCSS

#### 安装

```shell
# playground-ignore
pnpm add -D @maple-design/preset-unocss-vue unocss
```

#### 配置

```js
// playground-ignore
// uno.config.ts
import { presetMaple } from '@maple-design/preset-unocss-vue'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetMaple()],
})
```

可选：`presetMaple({ colors, fontSize, breakpoints })`。

---

### Tailwind CSS

#### 安装

```shell
# playground-ignore
pnpm add -D @maple-design/preset-tailwindcss-vue tailwindcss
```

#### Tailwind v3

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@maple-design/preset-tailwindcss-vue'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [presetMaple()],
}
```

#### Tailwind v4

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@maple-design/preset-tailwindcss-vue'

export default {
  presets: [presetMaple()],
}
```

```css
/* playground-ignore */
@import 'tailwindcss';
@config '../tailwind.config.js';
```

---

### 用法一览（与主题绑定的类）

完整分类（Flex / 间距 / 尺寸 / 溢出 / 圆角等）见 [常用写法](#/zh-CN/atomic-usage)。下面只列 preset 挂到 Maple token 上的那几项。

#### 颜色

| Theme key  | CSS 变量              | 常用类                              |
| ---------- | --------------------- | ----------------------------------- |
| `body`     | `--mp-color-body`     | `mp-bg-body`                        |
| `primary`  | `--mp-color-primary`  | `mp-bg-primary` `mp-text-primary`   |
| `info`     | `--mp-color-info`     | `mp-bg-info` `mp-text-info`         |
| `success`  | `--mp-color-success`  | `mp-bg-success` `mp-text-success`   |
| `warning`  | `--mp-color-warning`  | `mp-bg-warning` `mp-text-warning`   |
| `danger`   | `--mp-color-danger`   | `mp-bg-danger` `mp-text-danger`     |
| `disabled` | `--mp-color-disabled` | `mp-bg-disabled` `mp-text-disabled` |

#### 字号

| 档位 | CSS 变量            | Uno / Tailwind 类名 |
| ---- | ------------------- | ------------------- |
| xs   | `--mp-font-size-xs` | `mp-text-xs`        |
| sm   | `--mp-font-size-sm` | `mp-text-sm`        |
| md   | `--mp-font-size-md` | `mp-text-md`        |
| lg   | `--mp-font-size-lg` | `mp-text-lg`        |

不要与固定 Utilities 的文字颜色类 `mp-text-1…4` 混淆。

#### 间距

间距与宽高数值直接对应像素，`1 = 1px`。例如 `mp-h-10` 为 10px；百分比用 `mp-w-full` / `mp-h-full` 或 `mp-w-1/2`。

| 类型           | 示例                                                  |
| -------------- | ----------------------------------------------------- |
| margin         | `mp-m-16` `mp-mt-16` `mp-mx-8` `mp-my-24`             |
| padding        | `mp-p-16` `mp-pt-16` `mp-px-8` `mp-py-24`             |
| gap            | `mp-gap-8` `mp-gap-x-16` `mp-gap-y-24`                |
| auto           | `mp-m-auto` `mp-ml-auto`                              |
| width / height | `mp-w-10` `mp-h-10` `mp-w-full` `mp-h-auto` `mp-w-1/2` |

左侧 Demo 展示了 `4px / 8px / 16px` 以及横纵不同间距的实际效果。

#### 断点

`sm` 768 / `md` 992 / `lg` 1200 / `xl` 1920，例：`sm:mp-bg-info`。

#### 组合示例

```html
<!-- playground-ignore -->
<template>
  <div class="mp-bg-body mp-text-1 mp-text-md">
    <span class="mp-text-primary">primary</span>
    <div class="mp-bg-primary mp-text-lg sm:mp-bg-info md:mp-bg-warning">maple</div>
  </div>
</template>
```

## 基础示例

### 基础用法

Example source: src/atomic-css/example/basic.vue

```vue
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'

onThemeChange()

const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
const onResize = () => {
  width.value = window.innerWidth
}
onMounted(() => {
  width.value = window.innerWidth
  window.addEventListener('resize', onResize)
})
onUnmounted(() => window.removeEventListener('resize', onResize))

const active = computed(() => {
  const w = width.value
  if (w >= 1920) {
    return 'xl'
  }
  if (w >= 1200) {
    return 'lg'
  }
  if (w >= 992) {
    return 'md'
  }
  if (w >= 768) {
    return 'sm'
  }
  return 'base'
})

const bgItems = [
  { cls: 'mp-bg-body', style: { background: 'var(--mp-color-body)', color: 'var(--mp-color-text-1)' } },
  { cls: 'mp-bg-primary', style: { background: 'var(--mp-color-primary)', color: '#fff' } },
  { cls: 'mp-bg-info', style: { background: 'var(--mp-color-info)', color: '#fff' } },
  { cls: 'mp-bg-success', style: { background: 'var(--mp-color-success)', color: '#fff' } },
  { cls: 'mp-bg-warning', style: { background: 'var(--mp-color-warning)', color: '#fff' } },
  { cls: 'mp-bg-danger', style: { background: 'var(--mp-color-danger)', color: '#fff' } },
]

const fonts = [
  { className: 'mp-text-xs', size: 'var(--mp-font-size-xs)' },
  { className: 'mp-text-sm', size: 'var(--mp-font-size-sm)' },
  { className: 'mp-text-md', size: 'var(--mp-font-size-md)' },
  { className: 'mp-text-lg', size: 'var(--mp-font-size-lg)' },
]
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="starter-card">
      <div class="starter-title">第一张原子化卡片</div>
      <div class="starter-description">组合小类完成布局，不需要另外写组件样式。</div>
      <div class="starter-row">
        <code>mp-flex mp-items-center mp-gap-8</code>
        <span class="starter-status">Success</span>
      </div>
      <mp-button :ripple="false" class="starter-button">mp-bg-primary · hover:mp-opacity-80</mp-button>
    </div>

    <div class="mp-text-3 mp-mb-4">Preset 颜色（等价预览）</div>
    <div class="swatches">
      <div v-for="item in bgItems" :key="item.cls" class="swatch" :style="item.style">
        {{ item.cls }}
      </div>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">Preset 字号</div>
    <div v-for="f in fonts" :key="f.className" class="font-line" :style="{ fontSize: f.size }">
      <code>{{ f.className }}</code>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">数值间距 · 1 = 1px</div>
    <div class="spacing-list">
      <div class="spacing-row">
        <code>mp-p-4 · 4px</code>
        <div class="spacing-stage"><div class="spacing-box mp-p-4">内容</div></div>
      </div>
      <div class="spacing-row">
        <code>mp-p-8 · 8px</code>
        <div class="spacing-stage"><div class="spacing-box mp-p-8">内容</div></div>
      </div>
      <div class="spacing-row">
        <code>mp-p-16 · 16px</code>
        <div class="spacing-stage"><div class="spacing-box mp-p-16">内容</div></div>
      </div>
      <div class="spacing-row">
        <code>mp-px-24 mp-py-8 · 24px / 8px</code>
        <div class="spacing-stage"><div class="spacing-box mp-px-24 mp-py-8">内容</div></div>
      </div>
    </div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">断点 · 当前 {{ active }}</div>
    <div class="banner">mp-bg-primary · sm:info · md:warning · lg:danger · xl:success</div>

    <div class="mp-text-3 mp-mt-24 mp-mb-4">组合</div>
    <div class="combo">
      <span class="text-primary">mp-text-primary</span>
      <div class="combo-box">mp-text-md + mp-bg-primary</div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';

.demo {
  font-size: 13px;
}

.starter-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid var(--mp-color-border-2);
  border-radius: 8px;
  background: var(--mp-color-body);
}

.starter-title {
  color: var(--mp-sys-color-content-primary);
  font-size: var(--mp-font-size-lg);
  font-weight: 600;
}

.starter-description {
  color: var(--mp-color-text-3);
}

.starter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  border-radius: 6px;
  background: var(--mp-color-fill-2);

  code {
    color: var(--mp-color-text-2);
    font-size: 11px;
  }
}

.starter-status {
  color: var(--mp-color-success);
}

.starter-button {
  padding: 8px 16px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  background: var(--mp-color-primary);
  transition: opacity 0.2s;

  &:active {
    opacity: 0.8;
  }
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.swatch {
  min-width: 96px;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  font-size: 11px;
  border: 1px solid var(--mp-color-border-2);
}

.font-line {
  color: var(--mp-color-text-1);
  margin-bottom: 4px;

  code {
    font-size: 11px;
    color: var(--mp-color-text-3);
  }
}

.spacing-list {
  display: grid;
  gap: 12px;
}

.spacing-row {
  display: grid;
  grid-template-columns: minmax(190px, 1fr) 2fr;
  align-items: center;
  gap: 12px;
}

.spacing-stage {
  background: var(--mp-color-fill-2);
  border-radius: 4px;
}

.spacing-box {
  width: fit-content;
  color: #fff;
  background: var(--mp-color-primary);
}

/* 文档站未接入 preset 时的等价预览，业务项目由 Uno / Tailwind 生成。 */
.mp-p-4 {
  padding: 4px;
}
.mp-p-8 {
  padding: 8px;
}
.mp-p-16 {
  padding: 16px;
}
.mp-px-24 {
  padding-right: 24px;
  padding-left: 24px;
}
.mp-py-8 {
  padding-top: 8px;
  padding-bottom: 8px;
}

@media (max-width: 480px) {
  .spacing-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.banner {
  padding: 12px;
  border-radius: 4px;
  color: #fff;
  background: var(--mp-color-primary);

  @media (min-width: 768px) {
    background: var(--mp-color-info);
  }
  @media (min-width: 992px) {
    background: var(--mp-color-warning);
  }
  @media (min-width: 1200px) {
    background: var(--mp-color-danger);
  }
  @media (min-width: 1920px) {
    background: var(--mp-color-success);
  }
}

.combo {
  padding: 12px;
  border-radius: 8px;
  background: var(--mp-color-body);
  border: 1px solid var(--mp-color-border-2);
}

.text-primary {
  color: var(--mp-sys-color-content-primary);
}

.combo-box {
  margin-top: 8px;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  background: var(--mp-color-primary);
  font-size: var(--mp-font-size-md);
}
</style>
```
