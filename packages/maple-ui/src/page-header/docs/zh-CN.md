# PageHeader 页头

返回按钮只派发 `back` 事件，不自动调用路由或浏览器历史。示例通过 Message 显示通知；真实返回目的地由调用方处理。原生按钮支持点击、Enter 和空格。

展示当前页面的标题、上下文和相关操作。组件不负责固定定位、安全区或背景皮肤，这些能力可通过业务层的 `class` / `style` 实现。

## 基础示例

### 基础用法

使用 Card 和 Space 组合返回、主标题、副标题及操作区。点击返回、关注或创建任务，查看消息反馈；通过 `show-back` 在标题左侧显示返回箭头，并将主要操作放在底部。

```demo
../example/demos/basic-usage.vue
```

## 内容与展示

### 面包屑与透明表面

比较面包屑导航和透明背景下的标题层级；完整业务内容另见独立案例。

<details>
<summary>配置说明与使用限制</summary>

#### 页头上方内容

通过 `header` 插槽展示面包屑；使用 Card 承载内容，Space 将标题和副标题纵向排列。

#### 透明底色

页头默认透明。使用 Card 的 `tonal` 变体提供底色，展示页头自然融入外层表面，无需自定义背景样式。

</details>

```demo
../example/demos/surface-comparison.vue
```

### 完整结构

使用 Card、Space、Cell、Grid、Statistic 和 Divider 组合完整页头，无需自定义样式。与 PC 示例展示相同的项目资料、统计和操作；返回箭头与标题处于同一行，面包屑独立放在 `header` 插槽，标题和资料纵向排列，将“创建任务”放在底部。

```demo
../example/demos/complete.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。返回按钮位于阅读起点，默认返回图形在 RTL 下指向右侧。标题、副标题与扩展区沿阅读顺序排列；自定义返回插槽不自动镜像。

## 使用说明

### 配置说明

返回按钮在支持悬停的鼠标指针和键盘聚焦时显示圆形反馈，反馈圆不影响标题布局。

## API

返回按钮默认使用当前语言的返回文案，可通过 `back-button-aria-label` 指定更具体的名称。标题插槽可按页面结构放置合适层级的标题元素；返回事件只通知，不自动导航。

### PageHeader Props

| 参数       | 说明             | 类型      | 默认值  |
| ---------- | ---------------- | --------- | ------- |
| `show-back` | 是否显示返回按钮 | _boolean_ | `false` |
| back-button-aria-label | 返回按钮的可访问名称 | `string` | 当前语言返回文案 |
| `title`    | 主标题           | _string_  | `-`     |
| `subtitle` | 次标题           | _string_  | `-`     |
| `extra`    | 右侧附加内容     | _string_  | `-`     |

### PageHeader Events

| 名称   | 说明                                         | 参数         |
| ------ | -------------------------------------------- | ------------ |
| `back` | 点击返回按钮时触发 | `MouseEvent` |

### PageHeader Slots

| 名称       | 说明                         |
| ---------- | ---------------------------- |
| `header`   | 页头上方内容，通常用于面包屑 |
| `back`     | 自定义返回图标               |
| `avatar`   | 头像                         |
| `title`    | 主标题                       |
| `subtitle` | 次标题                       |
| `extra`    | 右侧附加内容                 |
| `default`  | 页头正文内容                 |
| `footer`   | 页头底部内容                 |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-page-header-back-color` | `var(--mp-color-text-2)` | `color` |
| `--mp-page-header-back-hover-bg` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-page-header-back-hover-size` | `30px` | `height`, `width` |
| `--mp-page-header-back-size` | `22px` | `font-size` |
| `--mp-page-header-content-margin-top` | `16px` | `margin-top` |
| `--mp-page-header-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-page-header-footer-margin-top` | `16px` | `margin-top` |
| `--mp-page-header-item-gap` | `12px` | `margin-inline-start` |
| `--mp-page-header-row-gap` | `12px` | `margin-bottom` |
| `--mp-page-header-subtitle-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-page-header-title-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-page-header-title-font-size` | `var(--mp-font-size-lg)` | `font-size` |
| `--mp-page-header-title-font-weight` | `600` | `font-weight` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-page-header-back-color: var(--mp-color-text-2);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
