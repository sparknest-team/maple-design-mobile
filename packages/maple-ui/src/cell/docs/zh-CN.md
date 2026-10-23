# 单元格

## 案例

### 介绍

单元格为列表中的单个展示项。`title` 显示主标题；提供默认插槽时，插槽内容会覆盖 `title`。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 显示图标

示例通过 `#icon` 插槽使用 `<m-icon-fire />`，由 Resolver 自动按需导入，无需手动引入或注册。`icon="fire"` 是字符串名称 API，只查找应用已注册的图标；字符串不会触发 Resolver 自动导入。

```demo
../example/demos/show-icon.vue
```

### 显示描述

左侧图标、标题与描述组成的文字块、右侧内容垂直居中。组件统一处理图标插槽的间距和对齐，插槽内直接放图标即可，无需添加内部样式类。

```demo
../example/demos/show-desc.vue
```

### 显示边框

```demo
../example/demos/show-border.vue
```

### 用作列表项

```demo
../example/demos/list.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| ----- | -------------- | -------- | ---------- |
| `title` | 单元格标题，默认插槽优先 | _string_ | `-` |
| `icon` | 已注册的左侧图标名称 | _string_ | `-` |
| `description` | 单元格描述 | _string_ | `-` |
| `border` | 是否显示边框 | _boolean_ | `false` |
| `border-offset` | 边框偏移量 | _string \| number_ | `-` |
| `icon-class` | 左侧图标容器额外类名，对 icon 属性和插槽均生效 | _string_ | `-` |
| `title-class` | 标题额外类名 | _string_ | `-` |
| `description-class` | 描述额外类名 | _string_ | `-` |
| `extra-class` | 右侧内容额外类名 | _string_ | `-` |
| `ripple` | 是否启用水波效果 | _boolean_ | `false` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `event: Event` |

### 插槽

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 主内容，覆盖 title | `-` |
| `icon` | 自定义左侧 icon 区域 | `-` |
| `description` | 描述的内容 | `-` |
| `extra` | 自定义右侧区域内容 | `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制.

| 变量名             | 默认值 |
|-----------------| --- |
| `--cell-color`  | `var(--color-text)` |
| `--cell-font-size` | `var(--font-size-md)` |
| `--cell-description-font-size` | `var(--font-size-sm)` |
| `--cell-description-color` | `rgba(0, 0, 0, 0.6)` |
| `--cell-padding` | `10px 12px` |
| `--cell-min-height` | `40px` |
| `--cell-border-color` | `var(--color-border-2)` |
| `--cell-border-left` | `12px` |
| `--cell-border-right` | `12px` |
| `--cell-icon-right` | `8px` |
| `--cell-extra-left` | `8px` |
