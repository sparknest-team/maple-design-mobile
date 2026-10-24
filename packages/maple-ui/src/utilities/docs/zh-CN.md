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
import '@maple-design/ui/es/utilities/utilities.css'
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
