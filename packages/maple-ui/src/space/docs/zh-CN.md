# Space 间隔

### 介绍

组件库提供了 `<mp-space>` 布局的组件，使您更有效率的进行 flex 布局。

### 基本使用

```demo
../example/demos/base-use.vue
```

### 垂直

```demo
../example/demos/vertical.vue
```

### 间隙

```demo
../example/demos/space.vue
```

### 靠右

```demo
../example/demos/right-align.vue
```

### 环绕

```demo
../example/demos/around.vue
```

### 居中

```demo
../example/demos/center.vue
```

### 两端对齐

```demo
../example/demos/between.vue
```

### xs / sm / md / lg / xl

```demo
../example/demos/demo-8.vue
```

## API

### 属性

| 参数          | 说明                                                                                                  | 类型                                                       | 默认值        |
|-------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------|------------|
| `direction` | 布局方向 可选值为 `row` `column`                                                                            | _string_                                                 | `row`      |
| `justify`   | 主轴排列方式 可选值为 `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly`           | _string_                                                 | `flex-start` |
| `align`     | 交叉轴排列方式 可选值为 `stretch` `center` `flex-start` `flex-end` `baseline`，未传时根据 `direction` 推断（`row` → `center`，`column` → `stretch`） | _string_                                                 | `-`        |
| `size`      | 间距，可选值为 `xs` `sm` `md` `lg` `xl` 或 `[行间距, 列间距]` (支持长度单位)                                            | _string \| number \| [string \| number, string \| number]_ | `md`       |
| `wrap`      | 是否超出换行                                                                                              | _boolean_                                                | `false`     |
| `block`     | 是否撑满父容器宽度                                                                                           | _boolean_                                                | `true`     |

### 插槽

| 插槽名       | 说明       | 参数  |
|-----------|----------|-----|
| `default` | Space 内容 | `-` |
| `split`   | 分隔符     | `-` |

### 样式变量

| 变量名 | 默认值 |
| --- | --- |
| `--mp-space-size-xs-row-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-xs-column-gap` | `var(--mp-sys-space-2)` |
| `--mp-space-size-sm-row-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-sm-column-gap` | `var(--mp-sys-space-3)` |
| `--mp-space-size-md-row-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-md-column-gap` | `var(--mp-sys-space-4)` |
| `--mp-space-size-lg-row-gap` | `var(--mp-sys-space-6)` |
| `--mp-space-size-lg-column-gap` | `var(--mp-sys-space-5)` |
| `--mp-space-size-xl-row-gap` | `var(--mp-sys-space-8)` |
| `--mp-space-size-xl-column-gap` | `var(--mp-sys-space-6)` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、子节点展开、主样式、尺寸 token 和配对测试纳入只读一致性检查。仅安装入口与命名空间各自适配。

两端默认均为 `size="md"`、`wrap=false`、`block=true`、`direction="row"`。未传 align 时，row 为 center、column 为 stretch。Maple 原来依赖默认换行的用法请显式添加 `wrap`。

`size` 支持全部五档预设、number（px）、数字字符串（px）、CSS 长度或表达式（例如 1rem、var(--gap)）以及二元组 `[rowGap, columnGap]`。数组始终先行后列，direction 切换不会交换它们；数组项为长度，不支持预设名。预设 [行, 列]：xs=[4,4]、sm=[8,6]、md=[12,8]、lg=[16,12]、xl=[24,16] px，两端一致，仍可通过 CSS 变量覆盖。

### 显式换行

```demo
../example/demos/wrap.vue
```
