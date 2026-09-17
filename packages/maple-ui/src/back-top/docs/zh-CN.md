# 回到顶部

### 介绍

返回页面顶部的操作按钮。

### 基本使用

未设置 `target-container` 时，监听页面滚动；滚动高度达到 `visible-height` 后，右下角会出现返回顶部按钮。

```demo
../example/demos/basic-usage.vue
```

### 指定滚动容器

在局部滚动容器内使用时，通过 `target-container` 指定监听目标。设置 `:popup-container="false"` 可让按钮显示在容器内，父级需设置 `position: relative`。

```demo
../example/demos/target-container.vue
```

### 自定义位置

通过 `right` 和 `bottom` 调整按钮位置。

```demo
../example/demos/custom-position.vue
```

### 自定义内容

通过默认插槽自定义按钮内容，并可通过 `@click` 监听点击事件。

```demo
../example/demos/custom-content.vue
```

## API

### 属性

| 参数                  | 说明                                        | 类型   | 默认值          |
|---------------------|-------------------------------------------|------|--------------|
| `target-container`            | 触发滚动的对象，未设置时会监听最近的可滚动祖先 | _string \| HTMLElement_ | `-` |
| `popup-container`          | 挂载目标；省略时挂载到 body；设为 `false` 时按钮相对父级定位，父级需 `position: relative` | _string \| HTMLElement \| false_ | `body` |
| `visible-height` | 滚动高度达到此参数值才出现                             | _string \| number_      | `200` |
| `bottom`            | 距离视口底部的距离                       | _string \| number_      | `-` |
| `right`             | 距离视口右侧的距离                       | _string \| number_      | `-` |
| `elevation`         | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级 | _number \| boolean_|   `true`    |
| `duration`          | 回到顶部所需时间（ms）                              | _number_ | `300`        |

### 事件

| 事件名 | 说明 | 回调参数 |
| ----- | -------------- | -------- |
| `click` | 点击按钮触发的事件 | `event: Event` |

### 插槽

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 自定义按钮内容 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--back-top-right` | `40px` |
| `--back-top-bottom` | `40px` |
| `--back-top-button-size` | `40px` |
| `--back-top-button-border-radius` | `50%` |
