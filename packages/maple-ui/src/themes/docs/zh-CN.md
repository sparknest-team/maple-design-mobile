# 主题定制

使用内置主题统一页面外观，再按需要覆盖少量 CSS 变量。主题控制配色、圆角和字体；设备边缘留白请使用 [SafeArea](#/zh-CN/safe-area)。

应用根部和局部区域统一使用 ThemeProvider。根部示例：

```vue
<mp-theme-provider :theme="mode" :style-vars="currentStyleVars"><App /></mp-theme-provider>
```

mode 为 light/dark，currentStyleVars 是响应式的 Themes 预设或自定义变量。Provider 不设置 html 属性，不提供静态文档主题修改方法。

## 如何选择

| 需求                     | 推荐方式                                            |
| ------------------------ | --------------------------------------------------- |
| 整个应用使用一种品牌风格 | `currentStyleVars.value = Themes.maple.light` 等 |
| 只修改一个区域或组件     | `<mp-theme-provider :style-vars="…">`               |
| 查找可覆盖的变量         | 本页变量说明及各组件文档的样式变量表                |

## 基础示例

### 内置主题预览

在页面主题菜单中切换品牌和亮暗模式，比较同一份预约表单。输入、选择、开关和校验提示均可操作，提交仅在本地演示。

```demo
../example/BrandForm.vue
```

## 局部主题与定制

### 局部定制

选择一种颜色，“定制按钮”随之变化，“默认按钮”继续使用页面主题。这个例子只覆盖按钮的颜色和圆角，不修改站点全局主题。

```demo
../example/LocalTheme.vue
```

## 品牌与状态对照

### 萤火虫按钮使用场景

沿用现有 status × variant API：黄色 primary、中性 secondary、紫色 tertiary。切换卡片背景对照透明按钮，再操作单选、多选、开关、滑块、输入框和链接，查看紫色交互反馈。

```demo
../example/FireflyScenes.vue
```

### 更多组件状态

需要检查主题在不同尺寸、字段变体、禁用、只读、错误和上传状态下的表现时，再展开对应分组。控制项和恢复入口始终可用。

```demo
../example/ThemeDetails.vue
```

## 在应用中使用

### 1. 选择内置主题

| 主题    | 亮色                   | 暗色                  | 风格                           |
| ------- | ---------------------- | --------------------- | ------------------------------ |
| 默认    | `Themes.default.light` | `Themes.default.dark` | 青绿色                         |
| 枫叶    | `Themes.maple.light`   | `Themes.maple.dark`   | 红橙色                         |
| Alps    | `Themes.alps.light`    | `Themes.alps.dark`    | 深色主按钮、橙色选择控件       |
| Firefly | `Themes.firefly.light` | `Themes.firefly.dark` | 黄绿主按钮、深蓝文字、圆角字段 |

Alps / Firefly 亮色基于品牌样式，暗色为 Maple 适配版。品牌字体文件由业务自行加载；未加载时使用系统字体回退。

```ts
import { ThemeProvider, Themes } from '@maple-design/ui'

// 在应用挂载前设置，也可以在用户切换主题时再次调用。
currentStyleVars.value = Themes.maple.light
currentStyleVars.value = Themes.maple.dark
```

亮色对象移除 `html[maple-theme="dark"]`，暗色对象设置该属性。**每次调用替换上次注入的变量，不会累计合并。**

#### Firefly 的颜色角色与现有 API

| 用途               | Maple 写法                            | Horo 对应角色   |
| ------------------ | ------------------------------------- | --------------- |
| 黄色实心主行动     | `status="primary" variant="default"`  | primary         |
| 中性次级操作       | `status="secondary"`                  | secondary       |
| 紫色辅助实心       | `status="tertiary" variant="default"` | tertiary，仅 FY |
| 紫色文字操作       | `status="tertiary" variant="text"`    | text            |
| 中性文字操作       | `status="default" variant="text"`     | text_secondary  |
| 深色区域的黄色文字 | `status="primary" variant="text"`     | text_bg         |

黄色主色保持 `#EAFF68`。辅助紫色填充使用 `#CFC7FF`，亮色文字使用 `#9A89EB`；secondary 是中性色，不代表紫色。text/outline 保持透明，不给按钮额外加承托底。示例通过整张卡片的背景切换比较场景；原始亮色文字不应视为在所有浅色背景上都满足对比度要求。

选择、焦点、滑块、日期范围与强调链接使用辅助紫色；正文和普通页面强调保留深色文字的可读性适配。tonal 和暗色是 Maple 在现有 API 上的扩展，不声称是 Horo 原始暗色样本。

本次仅覆盖 Firefly 主题变量；默认、Maple、Alps 的亮暗色板保持原值。

### 2. 设置页面背景和文字

组件主题与业务页面背景需要一起设置。将以下样式加入应用的全局样式：

```css
body {
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 3. 在主题上覆盖变量

基于现有主题扩展，切换亮暗模式时分别使用对应基础对象。下面只调整按钮圆角：

```vue
<script setup>
import { ref } from 'vue'
import { Themes } from '@maple-design/ui'
const mode = ref('dark')
</script>
<template>
  <mp-theme-provider :theme="mode" :style-vars="Themes.maple[mode]">
    <App />
  </mp-theme-provider>
</template>
```

局部定制优先覆盖实际组件变量。仅在局部修改色阶变量，不会重新计算从根节点继承的组件别名；完整规则见 [ThemeProvider](#/zh-CN/theme-provider)。传送到 body 的弹层需在实际挂载宿主上配置变量。

## 尺寸单位转换

`Themes.toRem(theme, { rootFontSize, unitPrecision })` 和 `Themes.toViewport(theme, { viewportWidth, viewportUnit, unitPrecision })` 返回新对象，默认分别以 16px 和 375px 为基准，精度为 6，视口单位为 `vmin`。基准必须是有限正数，精度必须是 0–100 的整数，视口单位必须是 CSS 视口单位；无效选项抛出 `RangeError`。

`Themes.convert(theme, converter)` 对值中的 `px` 数字进行文本替换，回调收到带符号的数字字符串，返回替换文本。它不是 CSS 解析器，字符串和 URL 中匹配的文本也会替换；请仅传入适合转换的尺寸变量。

## 变量怎么找

| 层级     | 示例                                                            | 适合用途                        |
| -------- | --------------------------------------------------------------- | ------------------------------- |
| 品牌色阶 | `--mp-primary-1` … `--mp-primary-10`                            | 构建整套品牌色板，值为 RGB 通道 |
| 语义角色 | `--mp-sys-color-content-primary`、`--mp-sys-color-surface-page` | 业务文字、页面背景等通用角色    |
| 组件变量 | `--mp-button-primary-color`、`--mp-button-border-radius`        | 定向调整某个组件                |

RGB 通道通过 `rgb(var(--mp-primary-6))` 使用；颜色成品值和尺寸按组件变量表填写。字体入口为 `--mp-sys-font-family`，字体文件由应用自行提供。

更多变量见 [Design Token 分层](#/zh-CN/design-tokens) 和各组件文档底部的样式变量表；表单交互见 [Form](#/zh-CN/form)。

## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
