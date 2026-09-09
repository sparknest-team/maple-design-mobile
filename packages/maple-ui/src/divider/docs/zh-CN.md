# 分割线

### 介绍

用于分隔列表或布局的各个部分。API 与 Cedar Design Web 的 Divider 对齐。

### 基本使用

```html
<template>
  <mp-divider />
</template>
```

### 线型

通过 `type` 设置线型，可选 `solid` `dashed` `dotted` `double`。

```html
<template>
  <mp-divider />
  <mp-divider type="dashed" />
  <mp-divider type="dotted" />
  <mp-divider type="double" :thickness="3" />
</template>
```

### 间距与缩进

通过 `size-x` / `size-y` 控制缩进与间距，支持预设 `xs` `sm` `md` `lg` `xl`，或数值 / 带单位字符串 / `[start, end]`。

```html
<template>
  <mp-divider size-x="md" />
  <mp-divider :size-x="36" size-y="lg" />
  <mp-divider :size-x="[24, 0]" />
</template>
```

### 垂直分割线

```html
<template>
  <div style="display: flex; align-items: center">
    <span>文字</span>
    <mp-divider orientation="vertical" />
    <span>文字</span>
    <mp-divider orientation="vertical" type="dashed" />
    <span>文字</span>
  </div>
</template>
```

### 带文字

通过 `description` 或默认插槽添加文字；`text-align` 控制位置。

```html
<template>
  <mp-divider description="文字描述" />
  <mp-divider description="靠左" text-align="start" />
  <mp-divider description="靠右" text-align="end" />
  <mp-divider>
    <m-icon-heart style="margin: 0 16px; color: var(--mp-color-danger)" />
  </mp-divider>
</template>
```

### 颜色与线宽

```html
<template>
  <mp-divider color="var(--mp-color-primary)" />
  <mp-divider :thickness="3" color="#6750A4" />
  <mp-divider hairline />
</template>
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
| `--mp-divider-color` | `var(--mp-color-border-2)` |
| `--mp-divider-text-color` | `#888` |
| `--mp-divider-border-width` | `1px` |
| `--mp-divider-text-padding` | `8px` |
| `--mp-divider-text-align-inset` | `24px` |
| `--mp-divider-orientation-*-size-*-{xs\|sm\|md\|lg\|xl}` | 预设尺寸 token |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

动态增删默认插槽会同步更新带文字样式；opacity=0 生效；hairline 优先于 thickness，并输出 aria-orientation。
