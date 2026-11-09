# 通知栏

### 介绍

用于展示临时性的系统通知或运营消息。

## 基础示例

### 基本使用

```demo
../example/demos/basic.vue
```

### 暂停滚动

通过 `paused` 和操作区按钮提供持续暂停或继续；系统设置为减少动画时，内容会静态换行显示。

`speed` 表示每秒移动的 CSS 像素。容器、文字或插槽内容尺寸变化后会重新计算周期；调整周期时保留动画进度，视觉位置可能随尺寸变化。需要读者控制持续滚动时，可像下例一样在 `action` 中提供暂停按钮，或使用 `closeable` 提供关闭入口。

```demo
../example/demos/pausable.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。图标、文字和关闭区继承阅读顺序。滚动文字从阅读终点移向起点，RTL 下更换运动方向，不镜像文字或改变关闭/重播事件含义。

图标和关闭按钮的间距分别使用 `--mp-notice-bar-icon-margin`、`--mp-notice-bar-close-margin`；RTL 使用对应的 `--mp-notice-bar-icon-margin-rtl`、`--mp-notice-bar-close-margin-rtl`。关闭按钮名称来自最近的 LocaleProvider，未提供时使用全局语言。

`speed` 和 `delay` 的字符串按数字前缀解析。非有限或小于 1 的速度按 1 px/s 处理；无效或非有限的延迟按 0 秒处理，负延迟保留 CSS 动画含义。关闭后组件隐藏但不卸载；若需重新显示，请由父组件重新挂载。实例的内部状态和处理函数不作为公开重开或暂停方法；暂停使用 `paused`。

## API

### NoticeBar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `text` | 通知文本 | `string` | `-` |
| `type` | 类型 | `info \| success \| warning \| danger` | `warning` |
| `mode` | `closeable` 时显示关闭按钮 | `closeable` | `-` |
| `icon` | 左侧图标名，空字符串隐藏 | `string` | `info-circle` |
| `color` | 文字颜色 | `string` | `-` |
| `background` | 背景色 | `string` | `-` |
| `scrollable` | 是否滚动 | `boolean` | `false` |
| `paused` | 暂停滚动动画；关闭后从当前位置继续 | `boolean` | `false` |
| `speed` | 滚动速度（px/s） | `number \| string` | `50` |
| `delay` | 滚动开始前延迟（秒） | `number \| string` | `1` |

### NoticeBar Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `close` | 关闭时触发 | `event` |
| `replay` | 滚动一轮结束时触发 | `-` |

### NoticeBar Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 通知内容 |
| `icon` | 左侧图标 |
| `action` | 右侧操作区 |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-notice-bar-close-margin` | `0 0 0 8px` | `margin` |
| `--mp-notice-bar-close-margin-rtl` | `0 8px 0 0` | `margin` |
| `--mp-notice-bar-danger-background` | `var(--mp-color-danger)` | `background` |
| `--mp-notice-bar-danger-color` | `var(--mp-color-white)` | `color` |
| `--mp-notice-bar-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-notice-bar-height` | `40px` | `min-height` |
| `--mp-notice-bar-icon-margin` | `0 8px 0 0` | `margin` |
| `--mp-notice-bar-icon-margin-rtl` | `0 0 0 8px` | `margin` |
| `--mp-notice-bar-icon-size` | `18px` | `font-size` |
| `--mp-notice-bar-info-background` | `var(--mp-color-info)` | `background` |
| `--mp-notice-bar-info-color` | `var(--mp-color-white)` | `color` |
| `--mp-notice-bar-padding` | `0 12px` | `padding` |
| `--mp-notice-bar-success-background` | `var(--mp-color-success)` | `background` |
| `--mp-notice-bar-success-color` | `var(--mp-color-white)` | `color` |
| `--mp-notice-bar-warning-background` | `var(--mp-color-warning)` | `background` |
| `--mp-notice-bar-warning-color` | `var(--mp-color-white)` | `color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-notice-bar-danger-background: var(--mp-color-danger);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
