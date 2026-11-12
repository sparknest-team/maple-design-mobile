# 轮播

自动播放的间隔是业务播放节奏（business-clock），不是 CSS 动效时长；默认关闭，启用 true 时默认3000ms，数字／配置间隔、hover/focus/隐藏暂停规则保持。取消或重排使旧播放任务失效；当前回调消费一次后才调用导航。停用／卸载保留 next／prev／to、键盘和滚轮入口无效，不能翻页或拦截输入。激活建立新观察器／事件绑定，解绑前迟交付不得借新 active 状态重新排任务。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 方向与布局

### 垂直轮播

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `slides-per-view` | 同时显示页数；auto使用子项宽高 | 多图同屏、居中当前滑块、auto-sized |
| `space-between` | 项间距；数字/数字字符串为px | 多图同屏、居中当前滑块、auto-sized |
| `draggable` | 鼠标拖动，可与触摸并存 | 多图同屏、auto-sized |
| `centered-slides` | 当前页居中 | 居中当前滑块、auto-sized |
| `orientation` | 轮播内容滑动的横纵轴向，默认 horizontal；不决定指示器所在位置 | 垂直轮播 |
| `model-value` | 受控页序号，从 1 开始 | 多图同屏 |
<!-- demo-config-notes:end -->

```demo
../example/demos/vertical.vue
```

### 多图同屏

示例同时显示 2.5 项，可拖拽并切换“接受切换”和“循环”。Current 显示父级接受的页序号（从 1 开始），Proposal 记录切换请求，Changes 统计 change 通知。拒绝更新时，收到请求或 change 不表示模型已更新；接受后可正反拖动，关闭循环后不会越过首尾边界。

```demo
../example/demos/multi-slides.vue
```

### 居中当前滑块

```demo
../example/demos/centered-slides.vue
```

### auto-sized

“反转顺序”以卡片宽度作为本示例的唯一key，反转同一批卡片。current 按页序号而非业务卡片身份解释：页序号 2从220px变成180px，索引与change次数不变；向左拖到页序号 3后恢复顺序，当前位置对应180px，向右拖回页序号 2。重排本身不提交切换；任意插入排序、身份保持、持按中重排和物理触屏仍未覆盖。

活动第五项删除组合：选中新增第五项后关闭“增加末项”，父级Current仍4、Changes不增加；显示层将越界索引限制到剩余第四项并居中。随后向左拖动才按四项循环到 1，回写模型并增加一次change。这里不自动修正父级受控值；业务若需要删除即重写索引，应自行更新current。未覆盖任意重排或持按手势中删除。

“清空项目”临时移除所有卡片，空态导航禁用、拖动不发切换；解除后恢复此前配置的卡片，不自动切换。从初始页序号 1清空再恢复后，向右拖动可正常循环到末项。此流程未覆盖非零越界受控索引或清空途中仍按住指针。

从末项页序号 4清空再恢复时，父级Current保留3、Changes不增加；恢复后末项仍居中，随后向左拖动才循环到 1并增加一次change。空态不把受控父级值强制回写0。此记录不覆盖活动末项删除、任意越界值或手势中清空。

“增加末项”追加200px第五项，不改变当前有效索引或增加change；从首项向右拖到新增项，再向右拖回原末项后移除第五项，仍保持原末项和次数。此时向左拖可按恢复后的四项循环回首项。这里只覆盖移除非活动末项，未认证删除当前项、任意重排或手势途中增删。

先拖到末项，再开启“加宽卡片”（各项增加80px）和“窄容器”（300px），当前模型与change次数不因尺寸变化而增加；观察当前340px卡片重新居中，再向左拖动循环到首项。恢复开关后应继续居中。本段描述真实ResizeObserver响应已结束手势后的尺寸变化，不代表按住拖动期间改变尺寸。

示例中的项目宽度不同。拖动时当前项保持居中，首尾可以循环切换；Current 显示已接受的页序号（从 1 开始），Changes 显示 change 通知次数。

```demo
../example/demos/auto-sized.vue
```

## 切换控件与效果

### 切换箭头

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `show-arrow` | 箭头显示策略 | 切换箭头 |
| `indicator-type` | 指示器样式 | 指示器样式与位置 |
| `indicator-position` | 指示器在轮播容器中的边缘或 outer 外部区域，默认 bottom；不是浮层相对触发器的方位 | 指示器样式与位置 |
| `effect` | 视觉效果，两端全部支持 | 切换效果对比 |
<!-- demo-config-notes:end -->

通过 `show-arrow` 控制切换箭头的显示时机，支持 `always`、`hover`、`never`。两端默认 `always`。

```demo
../example/demos/navigation.vue
```

### 指示器样式与位置

所有指示器方案使用相同的三张本地幻灯片和当前页模型。点击任一方案的指示器或翻页箭头，其他方案同步切换。第一组比较 dot、line、slider 样式，第二组比较 top、outer 位置；窄屏下自动纵向排列。

<details>
<summary>配置说明与使用限制</summary>

#### 指示器类型

通过 `indicator-type` 设置指示器类型，支持 `dot`、`line`、`slider`。隐藏指示器请使用 `indicator`。

</details>

```demo
../example/demos/indicator-comparison.vue
```

### 切换效果对比

在各预览中切换相邻项，比较淡入淡出、卡片与滑动效果；自动播放和输入方式不混入效果配置。

<details>
<summary>配置说明与使用限制</summary>

#### 淡入淡出效果

通过指示器按钮切换，非活动页透明且退出交互。各页重叠在同一网格位置，活动页占满视口宽度而不是分列。

#### 卡片效果

活动项恢复原始比例和不透明度，相邻项缩小、降低不透明度；上一页/下一页按钮支持原生键盘操作。

</details>

```demo
../example/demos/effect-comparison.vue
```

### 自定义指示器

```demo
../example/demos/custom-indicator.vue
```

## 播放与交互

### 禁止循环轮播

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `height` | 容器高度，数字为px | 开启自动播放、controlled、interactive-content |
| `keyboard` | 组件内方向键/Home/End | 键盘控制、controlled、interactive-content |
| `auto-play` | 自动播放及间隔 | 开启自动播放、自动播放悬停暂停 |
| `draggable` | 鼠标拖动，可与触摸并存 | controlled、interactive-content |
| `loop` | 循环，跨边界不复制实例 | 禁止循环轮播 |
| `trigger` | 指示器触发方式 | 悬停触发 |
<!-- demo-config-notes:end -->

```demo
../example/demos/forbid-loop.vue
```

### 开启自动播放

示例使用 2000ms 间隔，显示页码从 1 开始（API 序号同样从 1 开始）。开关支持停止与继续；焦点在轮播内部时自动暂停。

通过 `auto-play` 开启自动播放。传入 `true` 使用默认间隔 3000ms；传入数字则作为间隔（毫秒）。

```demo
../example/demos/autoplay.vue
```

### 自动播放悬停暂停

```demo
../example/demos/autoplay-hover-pause.vue
```

### 悬停触发

```demo
../example/demos/trigger-hover.vue
```

### 鼠标滚轮控制

滚轮作用在轮播区域时切换页，不滚动外层页面；开启 loop 时从首项向前切换到末项。该能力不等同于触屏拖拽。

```demo
../example/demos/mousewheel.vue
```

### 键盘控制

```demo
../example/demos/keyboard.vue
```

### 监听切换

```demo
../example/demos/handle-change.vue
```

### controlled

```demo
../example/demos/controlled.vue
```

### interactive-content

当前索引和变更次数展示受控模型。输入框内的方向键、Home/End和鼠标拖选文字保留原生编辑，不切换轮播；拖动背景，或聚焦轮播容器后按方向键，才切换页面。返回原页面仍保留输入文字；示例不涉及外部保存或物理触屏文字选择。

```demo
../example/demos/interactive-content.vue
```

## 生命周期

### Scheduler lifecycle / 调度生命周期

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `auto-play` | 自动播放及间隔 | Scheduler lifecycle / 调度生命周期 |
| `move-speed` | 显式切换时长（毫秒） | Scheduler lifecycle / 调度生命周期 |
| `height` | 容器高度，数字为px | Scheduler lifecycle / 调度生命周期 |
| `keyboard` | 组件内方向键/Home/End | Scheduler lifecycle / 调度生命周期 |
| `mousewheel` | 滚轮切换 | Scheduler lifecycle / 调度生命周期 |
<!-- demo-config-notes:end -->

```demo
../example/demos/scheduler-lifecycle.vue
```

### 介绍

显示可以在屏幕上滚动和滑动的项目集合。示例与 Cedar Design Web 保持一致；两端均支持 `effect`、`centered-slides`。

## 使用说明

### 循环与自动播放

每个轮播项始终只有一个组件实例。普通上一页/下一页在出场项离开后回收位置；跨多页或居中跳转若需要同一项同时占据两个位置，则直接无动画定位，不复制交互内容，也不排队执行无限过渡。项目数量小于可视页数时不会复制项目填满。可访问名称跟随全局 Locale，显式标签属性优先。

根节点的 `keydown`、`mouseenter`、`mouseleave`、`focusin`、`focusout` 原生监听器与内部翻页、自动播放暂停逻辑同时生效；原生 `.once` 监听器在该根元素生命周期内只执行一次。

`space-between` 也接受百分比和 `calc()` 等有效 CSS 长度；多页布局按未缩放的 CSS 像素计算，祖先缩放不会改变间距与页宽的比例。

当正在聚焦的幻灯片因切页或删除而不再可访问时，焦点移至轮播容器；仍可见的幻灯片及组件外焦点保持不变。容器默认可通过程序聚焦，但 `keyboard` 未启用时不进入 Tab 顺序；显式 `tabindex` 仍由调用方控制。

自动播放示例在焦点进入时将 `auto-play` 设为 `false` 持续停止，由外部开关显式重启；组件本身的焦点暂停只是临时暂停，离开后会自动恢复。这与 WAI-ARIA APG 建议的“焦点进入后停止，直到用户显式重启”不同，不能视为完整 APG 轮播模式；需要该行为时请由业务控制播放状态。减少动态效果关闭过渡，不会单独停止自动换页。

页码从 1 开始，有限小数向零截断后，根据 `loop` 循环或限制到有效页；`move-speed` 有限值按非负毫秒处理，非有限值使用 CSS 过渡时长。根为具名 region，每个默认指示按钮有本地化页码名称和当前页状态；指示器容器本身没有单独的 group 名称。`line` 和 `slider` 默认使用相同的长条尺寸，`slider` 在容器有可分配空间时可伸展，并非拖动滑块。

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示当前页序号，从 1 开始；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### Carousel Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` | 受控页序号，从 1 开始 | `number` | `undefined` |
| `default-value` | 非受控初始页序号（从 1 开始） | `number` | `1` |
| `loop` | 循环，跨边界不复制实例 | `boolean` | `true` |
| `auto-play` | 自动播放及间隔 | `boolean \| number \| CarouselAutoPlayConfig` | `false` |
| `move-speed` | 显式切换时长（毫秒） | `number` | `undefined (token)` |
| `trigger` | 指示器触发方式 | `click \| hover` | `click` |
| `orientation` | 轮播内容滑动的横纵轴向，默认 horizontal；不决定指示器所在位置 | `horizontal \| vertical` | `horizontal` |
| `show-arrow` | 箭头显示策略 | `always \| hover \| never` | `always` |
| `arrow-class` | 箭头附加类 | `string` | `undefined` |
| `indicator` | 显示指示器 | `boolean` | `true` |
| `indicator-type` | 指示器样式 | `dot \| line \| slider` | `dot` |
| `indicator-position` | 指示器在轮播容器中的边缘或 outer 外部区域，默认 bottom；不是浮层相对触发器的方位 | `bottom \| top \| left \| right \| outer` | `bottom` |
| `indicator-class` | 指示器附加类 | `string` | `undefined` |
| `indicator-color` | 自定义指示器背景 | `string` | `undefined` |
| `height` | 容器高度，数字为px | `number \| string` | `undefined` |
| `transition-timing-function` | 显式缓动曲线 | `string` | `undefined (token)` |
| `touchable` | 触摸拖动 | `boolean` | `true` |
| `draggable` | 鼠标拖动，可与触摸并存 | `boolean` | `false` |
| `mousewheel` | 滚轮切换 | `boolean` | `false` |
| `keyboard` | 组件内方向键/Home/End | `boolean` | `false` |
| `slides-per-view` | 同时显示页数；auto使用子项宽高 | `number \| auto` | `1` |
| `space-between` | 项间距；数字/数字字符串为px | `number \| string` | `0` |
| `effect` | 视觉效果，两端全部支持 | `slide \| fade \| card` | `slide` |
| `centered-slides` | 当前页居中 | `boolean` | `false` |
| `aria-label` | 轮播可访问名称 | `string` | Locale |
| `previous-button-aria-label` | 上一页按钮名称 | `string` | Locale |
| `next-button-aria-label` | 下一页按钮名称 | `string` | Locale |

### 模型与交互
公开页序号从 1 开始。受控操作先发 update:model-value，再发 change(slideNumber, previousSlideNumber, isManual)，父级接受 current 前不移动；外部赋值不补发 change。方法 options 的 event:false 只关闭 change，不吞掉模型提议。用户操作的 isManual 为 true，自动播放为 false。

loop 跨边界移动原有子项，不复制组件实例。非循环且未居中时，末尾视区钳制以避免留白，选中项可能在最后一组可见项内移动而不再移动轨道。部分可见页保持可访问，完全离屏页 inert。fade 固定展示一页；auto 使用 CarouselItem 显式 width（横向）或 height（纵向），纵向需提供容器高度。默认插槽只统计 CarouselItem（可包在 Vue Fragment 中），注释、普通元素不成为页。

auto-play=true 使用 3000ms 且悬停暂停，数字指定毫秒且不启用悬停暂停；对象配置 interval/hoverToPause。焦点在组件内、拖动中、文档/祖先隐藏、KeepAlive 停用始终暂停。尊重减少动态效果偏好。输入框、按钮等交互子项保留原生行为，自定义交互区域可加 data-carousel-no-drag。show-arrow=hover 在键盘聚焦时也显示。

### Carousel Events
| 事件 | 参数 |
| --- | --- |
| update:model-value | slideNumber: number |
| change | slideNumber: number, previousSlideNumber: number, isManual: boolean |

### Carousel Slots
| 插槽 | 参数 |
| --- | --- |
| default | CarouselItem |
| prev / next / indicator | { slideNumber, length, hovering, prev, next, to, resize } |

### Carousel Methods
| 方法 | 签名 |
| --- | --- |
| prev / next | (options?: CarouselToOptions) => void |
| to | (slideNumber: number, options?: CarouselToOptions) => void |
| resize | () => void |

CarouselItem 无自有 Props、事件或方法；默认插槽为页面内容。

## Types
CarouselProps, CarouselItemProps, CarouselInstance, CarouselItemInstance, CarouselEmits, CarouselSlots, CarouselItemSlots, CarouselExpose, CarouselSlotScope, CarouselToOptions, CarouselChangeData, CarouselOrientation, CarouselEffect, CarouselAutoPlayConfig, CarouselArrowType, CarouselIndicatorType, CarouselIndicatorPosition, CarouselTriggerEvent.

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-carousel-arrow-background` | `rgb(0 0 0 / 35%)` | `background` |
| `--mp-carousel-arrow-background-hover` | `rgb(0 0 0 / 55%)` | `background` |
| `--mp-carousel-arrow-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-carousel-arrow-disabled-opacity` | `0.4` | `opacity` |
| `--mp-carousel-arrow-font-size` | `var(--mp-sys-font-size-xl)` | `font-size` |
| `--mp-carousel-arrow-margin` | `var(--mp-sys-space-4)` | `bottom`, `left`, `right`, `top` |
| `--mp-carousel-arrow-size` | `var(--mp-sys-control-height-md)` | `height`, `width` |
| `--mp-carousel-card-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-carousel-card-opacity` | `0.6` | `opacity` |
| `--mp-carousel-card-scale` | `0.85` | `transform` |
| `--mp-carousel-fade-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-carousel-focus-color` | `var(--mp-sys-color-action-primary)` | `outline` |
| `--mp-carousel-focus-offset` | `2px` | `outline-offset` |
| `--mp-carousel-focus-width` | `2px` | `outline` |
| `--mp-carousel-indicator-color-active` | `var(--mp-sys-color-content-on-dark)` | `background` |
| `--mp-carousel-indicator-color-default` | `rgb(255 255 255 / 35%)` | `background` |
| `--mp-carousel-indicator-dot-size` | `8px` | `height`, `width` |
| `--mp-carousel-indicator-gap` | `var(--mp-sys-space-3)` | `gap` |
| `--mp-carousel-indicator-line-border-radius` | `var(--mp-sys-radius-sm)` | `border-radius` |
| `--mp-carousel-indicator-line-height` | `3px` | `height` |
| `--mp-carousel-indicator-line-width` | `20px` | `width` |
| `--mp-carousel-indicator-outer-margin-bottom` | `var(--mp-sys-space-8)` | `padding-bottom` |
| `--mp-carousel-indicator-position` | `var(--mp-sys-space-4)` | `bottom`, `left`, `right`, `top` |
| `--mp-carousel-navigation-z-index` | `10` | `z-index` |
| `--mp-carousel-transition-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-carousel-transition-timing-function` | `ease` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-carousel-arrow-background: rgb(0 0 0 / 35%);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
