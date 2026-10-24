# 颜色 Color

### 介绍

语义色工具类，前缀 `mp-`（Cedar 为 `c-*`），变量 `--mp-*`。  
完整色阶见 [色板 Palette](#/zh-CN/palette)。

引入：

```js
// playground-ignore
import '@maple-design/ui/es/utilities/utilities.css'
```

### 类名规则

| 类名 | 变量 |
|---|---|
| `mp-primary` / `mp-success` / `mp-warning` / `mp-danger` / `mp-info` | `rgb(var(--mp-{hue}-6))` |
| `mp-*-hover` / `mp-*-pressed` / `mp-*-disabled` | 5 / 7 / 3 号 |
| `mp-bg-primary` 等 | `rgb(var(--mp-{hue}-1))` |
| `mp-text-1` … `mp-text-4` | `var(--mp-color-text-1)` … `var(--mp-color-text-4)` |
| `mp-fill-1` … `mp-fill-4` | `var(--mp-color-fill-*)` |
| `mp-color-border-1` … `mp-color-border-4` | `var(--mp-color-border-*)` |
| `mp-bg-0` / `mp-bg-1` / `mp-bg-2` | `bg-white` / `bg-1` / `bg-2` |

`mp-info` 映射 `--mp-info-*`。移动端示例见左侧预览。
