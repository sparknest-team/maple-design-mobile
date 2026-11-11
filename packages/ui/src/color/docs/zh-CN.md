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

```demo
../example/basic.vue
```

## 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。
