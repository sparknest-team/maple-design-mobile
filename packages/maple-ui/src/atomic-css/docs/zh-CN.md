# 原子化 CSS

### 介绍

Maple 提供两套能力：

| 能力              | 包 / 入口                                                            | 何时用                            |
| ----------------- | -------------------------------------------------------------------- | --------------------------------- |
| 固定工具类 `mp-*` | `@maple-design/ui/es/utilities/utilities.css`                       | 不接 Uno/TW 时使用                |
| Uno / TW preset   | `@maple-design/preset-unocss` / `@maple-design/preset-tailwindcss` | 使用带 `mp-` 前缀的完整原子化体系 |

Preset **不是组件**，是构建期配置。左侧预览用同等 CSS 变量演示视觉效果；真实类由 Uno / Tailwind 生成。
两套引擎使用相同类名，例如 `mp-flex`、`mp-p-16`、`mp-text-md`、`mp-bg-primary`，项目中二选一启用。
日常分类速查见 [常用写法](#/zh-CN/atomic-usage)。
Tailwind 的 `prefix` 是全局配置，同一个 Tailwind 实例不能同时加载 Cedar 与 Maple 两个 preset；请按应用选择其中一个。

Cedar 对应：`@cedar/preset-unocss` / `@cedar/preset-tailwindcss`（前缀 `c-`）。

```js
// playground-ignore
import '@maple-design/ui/es/utilities/utilities.css'
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
pnpm add -D @maple-design/preset-unocss unocss
```

#### 配置

```js
// playground-ignore
// uno.config.ts
import { presetMaple } from '@maple-design/preset-unocss'
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
pnpm add -D @maple-design/preset-tailwindcss tailwindcss
```

#### Tailwind v3

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@maple-design/preset-tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [presetMaple()],
}
```

#### Tailwind v4

```js
// playground-ignore
// tailwind.config.js
import { presetMaple } from '@maple-design/preset-tailwindcss'

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
