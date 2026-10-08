# 分割线

## 介绍

用于分隔列表或布局的各个部分。API 与 Cedar Design Web 的 Divider 对齐。

## 案例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 线型

通过 `type` 设置线型，可选 `solid` `dashed` `dotted` `double`。

```demo
../example/demos/type.vue
```

### 间距与缩进

通过 `size-x` / `size-y` 控制缩进与间距，支持预设 `xs` `sm` `md` `lg` `xl`，或数值 / 带单位字符串 / `[start, end]`。

```demo
../example/demos/size.vue
```

### 垂直分割线

```demo
../example/demos/vertical.vue
```

### 带文字

通过 `description` 或默认插槽添加文字；`text-align` 控制位置。

```demo
../example/demos/with-desc.vue
```

### 自定义内容

```demo
../example/demos/custom.vue
```

### 颜色、线宽与透明度

```demo
../example/demos/color.vue
```
## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `orientation` | 方向，可选 `horizontal` `vertical` | _string_ | `horizontal` |
| `type` | 线型，可选 `solid` `dashed` `dotted` `double` | _string_ | `solid` |
| `text-align` | 文字位置，可选 `start` `center` `end` | _string_ | `center` |
| `description` | 文字描述 | _string_ | `-` |
| `size-x` | 水平缩进 / 垂直时上下间距 | _number \| string \| array_ | `-` |
| `size-y` | 水平上下间距 / 垂直时左右间距 | _number \| string \| array_ | `md` |
| `thickness` | 线宽（与 `hairline` 互斥） | _number_ | `-` |
| `hairline` | 是否为 0.5px 线 | _boolean_ | `false` |
| `color` | 分割线颜色 | _string_ | `-` |
| `opacity` | 不透明度 | _number_ | `-` |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| `default` | 自定义分割线中间内容 |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-divider-color` | `var(--mp-sys-color-border-default)` |
| `--mp-divider-text-color` | `var(--mp-sys-color-content-secondary)` |
| `--mp-divider-border-width` | `1px` |
| `--mp-divider-text-padding` | `8px` |
| `--mp-divider-text-align-inset` | `24px` |
| `--mp-divider-orientation-*-size-*-{xs\|sm\|md\|lg\|xl}` | 预设尺寸 token |

线条使用常规边框语义，分隔线文字使用辅助内容语义；文字留白 `8px` 与 Cedar 的 `16px` 是移动／桌面密度差异。`opacity` 属性按实例写入透明度，不是主题默认色。

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

动态增删默认插槽会同步更新带文字样式；opacity=0 生效；hairline 优先于 thickness，并输出 aria-orientation。
