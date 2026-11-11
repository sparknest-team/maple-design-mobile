# 空状态 Empty

指当前场景没有对应的数据内容，呈现出的一种状态。示例与 Cedar Design Web 保持一致，布局按移动端换行。

## 基础示例

### 基础用法

空状态组件的基本用法。不传 `description` 时使用国际化文案。

```demo
../example/demos/basic-usage.vue
```

## 外观与状态

### 图片尺寸

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `image-size` | 图片/图标尺寸 | 图片尺寸 |
| `description` | 描述内容，缺省时使用国际化文案 | 图片尺寸 |
<!-- demo-config-notes:end -->

通过 `image-size` 控制图标尺寸，可选值为 `xs` `sm` `md` `lg` `xl`，也可传入数值。

```demo
../example/demos/image-size.vue
```

## 内容与展示

### 空态图形与补充操作

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `description` | 描述内容，缺省时使用国际化文案 | 空态图形与补充操作、显示与隐藏 |
| `image-url` | 自定义图片地址 | 空态图形与补充操作 |
| `alt` | 图片替代文本 | 空态图形与补充操作 |
| `show-icon` | 是否显示图标 | 显示与隐藏 |
| `show-description` | 是否显示描述 | 显示与隐藏 |
<!-- demo-config-notes:end -->

对比自定义图形和补充操作，观察替换默认内容与保留业务操作入口的区别。

<details>
<summary>配置说明与使用限制</summary>

#### 自定义图片和文案

通过 `image` 插槽自定义图标、图片，或通过默认插槽修改文案。也可用 `image-url` 指定图片地址。

#### 操作按钮

Reload 只更新本地刷新次数和描述，不请求服务；真实业务请自行接入请求与结果状态。

通过 `extra` 插槽添加操作按钮。

</details>

```demo
../example/demos/content-comparison.vue
```

### 显示与隐藏

通过两个按钮分别隐藏和恢复图标、描述。两者同时隐藏不代表隐藏整个组件，也不影响 extra 插槽。

通过 `show-icon`、`show-description` 控制图标和描述是否显示。

```demo
../example/demos/show.vue
```

## API

### Empty Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `description` | 描述内容，缺省时使用国际化文案 | `string` | `-` |
| `image-url` | 自定义图片地址 | `string` | `-` |
| `alt` | 图片替代文本 | `string` | `''` |
| `image-size` | 图片/图标尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string` | `'md'` |
| `show-icon` | 是否显示图标 | `boolean` | `true` |
| `show-description` | 是否显示描述 | `boolean` | `true` |

### Empty Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击回调 | `(event: MouseEvent)` |

### Empty Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 描述内容 |
| `image` | 自定义图标/图片 |
| `extra` | 额外操作 |

## Types

```ts
type EmptyImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string
```

## CSS Variables

描述使用低强调文字语义，装饰图标使用 `content-decorative`；后者不用于需要阅读的文字。自定义图片或插槽可能有自己的颜色，不会被 `icon-color` 强制重染。尺寸与间距允许遵循移动端密度，但同名变量职责与 Cedar 一致。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-empty-description-color` | `var(--mp-sys-color-content-tertiary)` | `color` |
| `--mp-empty-description-font-size` | `14px` | `font-size` |
| `--mp-empty-description-line-height` | `1.5` | `line-height` |
| `--mp-empty-extra-margin-top` | `20px` | `margin-top` |
| `--mp-empty-icon-color` | `var(--mp-sys-color-content-decorative)` | `color` |
| `--mp-empty-image-margin-bottom` | `4px` | `margin-bottom` |
| `--mp-empty-padding` | `20px` | `padding` |
| `--mp-empty-size-lg` | `140px` | `font-size`, `height`, `width` |
| `--mp-empty-size-md` | `120px` | `font-size`, `height`, `width` |
| `--mp-empty-size-sm` | `100px` | `font-size`, `height`, `width` |
| `--mp-empty-size-xl` | `160px` | `font-size`, `height`, `width` |
| `--mp-empty-size-xs` | `80px` | `font-size`, `height`, `width` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-empty-description-color: var(--mp-sys-color-content-tertiary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
