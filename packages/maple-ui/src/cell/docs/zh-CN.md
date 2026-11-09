# 单元格

### 介绍

单元格为列表中的单个展示项。`title` 显示主标题；提供默认插槽时，插槽内容会覆盖 `title`。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 内容与展示

### 图标、描述与分隔线

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `border` | 是否显示边框 | 图标、描述与分隔线、用作列表项 |
| `title` | 单元格标题，默认插槽优先 | 图标、描述与分隔线 |
| `description` | 单元格描述 | 图标、描述与分隔线 |
| `ripple` | 是否启用水波效果 | 用作列表项 |
| `border-offset` | 边框偏移量 | 用作列表项 |
<!-- demo-config-notes:end -->

比较单元格的前置图标、补充描述和列表分隔，按信息层级选择组合。

<details>
<summary>配置说明与使用限制</summary>

#### 显示图标

示例通过 `#icon` 插槽使用 `<m-icon-fire />`，由 Resolver 自动按需导入，无需手动引入或注册。`icon="fire"` 是字符串名称 API，只查找应用已注册的图标；字符串不会触发 Resolver 自动导入。

#### 显示描述

左侧图标、标题与描述组成的文字块、右侧内容垂直居中。组件统一处理图标插槽的间距和对齐，插槽内直接放图标即可，无需添加内部样式类。

</details>

```demo
../example/demos/content-comparison.vue
```

### 用作列表项

```demo
../example/demos/list.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。图标、标签、值和扩展区继承阅读顺序，间距使用逻辑起止位置。显式设备安全区和物理位置约定不反转。

## API

`clickable` 开启主内容的按钮语义、焦点和 Enter/Space；未设置时跟随 `ripple`，显式 false 不生成主操作语义。图标或内容不足以命名操作时可设置 `action-aria-label`。`extra` 与主操作分开，可放独立控件；子控件点击默认冒泡，独立操作可使用 `.stop`。可操作行的主内容不应再嵌套交互控件。`title-class` 和 `description-class` 仅作用于对应默认节点，插槽自行设置样式。数字 `border-offset` 必须有限，负数和 0 有效；无效数字使用默认边距。

### Cell Props

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
| `clickable` | 是否启用主操作；未传时跟随 ripple | `boolean` | `—` |
| `action-aria-label` | 主操作的可访问名称 | `string` | `—` |

### Cell Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击时触发 | `event: Event` |

### Cell Slots

| 名称 | 说明 | 参数 |
| ----- | -------------- | -------- |
| `default` | 主内容，覆盖 title | `-` |
| `icon` | 自定义左侧 icon 区域 | `-` |
| `description` | 描述的内容 | `-` |
| `extra` | 自定义右侧区域内容 | `-` |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制.

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-cell-border-color` | `var(--mp-color-border-2)` | `border-bottom` |
| `--mp-cell-border-left` | `12px` | `left` |
| `--mp-cell-border-right` | `12px` | `right` |
| `--mp-cell-color` | `var(--mp-color-text)` | `color` |
| `--mp-cell-description-color` | `rgba(0, 0, 0, 0.6)` | `color` |
| `--mp-cell-description-font-size` | `var(--mp-font-size-sm)` | `font-size` |
| `--mp-cell-description-margin-top` | `4px` | `margin-top` |
| `--mp-cell-extra-left` | `8px` | `margin-inline-start` |
| `--mp-cell-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-cell-icon-right` | `8px` | `margin-inline-end` |
| `--mp-cell-min-height` | `40px` | `min-height` |
| `--mp-cell-padding` | `10px 12px` | `padding` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-cell-border-color: var(--mp-color-border-2);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
