# Space 间隔

### 介绍

组件库提供了 `<mp-space>` 布局的组件，使您更有效率的进行 flex 布局。

### 基本使用

```html
<template>
  <mp-space>
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### 垂直

```html
<template>
  <mp-space direction="column" size="lg">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
  </mp-space>
</template>
```

### 间隙

```html
<template>
  <mp-space :size="[20, 20]">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
    <mp-button>Button3</mp-button>
    <mp-button>Button4</mp-button>
    <mp-button>Button5</mp-button>
    <mp-button>Button6</mp-button>
  </mp-space>
</template>
```

### 靠右

```html
<template>
  <mp-space justify="flex-end">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### 环绕

```html
<template>
  <mp-space justify="space-around">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### 居中

```html
<template>
  <mp-space justify="center">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### 两端对齐

```html
<template>
  <mp-space justify="space-between">
    <mp-button>Button1</mp-button>
    <mp-button>Button2</mp-button>
  </mp-space>
</template>
```

### 分隔符

```html
<template>
  <mp-space>
    <template #split>
      <span>|</span>
    </template>
    <a>Link1</a>
    <a>Link2</a>
    <a>Link3</a>
  </mp-space>
</template>
```


## API

### 属性

| 参数          | 说明                                                                                                  | 类型                                                       | 默认值        |
|-------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------|------------|
| `direction` | 布局方向 可选值为 `row` `column`                                                                            | _string_                                                 | `row`      |
| `justify`   | 主轴排列方式 可选值为 `flex-start` `flex-end` `center` `space-around` `space-between` `space-evenly`           | _string_                                                 | `flex-start` |
| `align`     | 交叉轴排列方式 可选值为 `stretch` `center` `flex-start` `flex-end` `baseline`，未传时根据 `direction` 推断（`row` → `center`，`column` → `stretch`） | _string_                                                 | `-`        |
| `size`      | 间距，可选值为 `xs` `sm` `md` `lg` `xl` 或 `[行间距, 列间距]` (支持长度单位)                                            | _string \| number \| [string \| number, string \| number]_ | `md`       |
| `wrap`      | 是否超出换行                                                                                              | _boolean_                                                | `true`     |
| `block`     | 是否撑满父容器宽度                                                                                           | _boolean_                                                | `true`     |

### 插槽

| 插槽名       | 说明       | 参数  |
|-----------|----------|-----|
| `default` | Space 内容 | `-` |
| `split`   | 分隔符     | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                | 默认值    |
|-----------------------------------|--------|
| `--mp-space-size-xs-row-gap`      | `4px`  |
| `--mp-space-size-xs-column-gap`   | `4px`  |
| `--mp-space-size-sm-row-gap`      | `6px`  |
| `--mp-space-size-sm-column-gap`   | `6px`  |
| `--mp-space-size-md-row-gap`      | `8px`  |
| `--mp-space-size-md-column-gap`   | `12px` |
| `--mp-space-size-lg-row-gap`      | `12px` |
| `--mp-space-size-lg-column-gap`   | `20px` |
| `--mp-space-size-xl-row-gap`      | `16px` |
| `--mp-space-size-xl-column-gap`   | `24px` |
