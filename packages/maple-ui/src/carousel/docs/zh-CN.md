# 轮播

自动播放的间隔是业务播放节奏（business-clock），不是 CSS 动效时长；默认关闭，启用 true 时默认3000ms，数字／配置间隔、hover/focus/隐藏暂停规则保持。取消或重排使旧播放任务失效；当前回调消费一次后才调用导航。停用／卸载保留 next／prev／to、键盘和滚轮入口无效，不能翻页或拦截输入。激活建立新观察器／事件绑定，解绑前迟交付不得借新 active 状态重新排任务。

## 案例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 禁止循环轮播

```demo
../example/demos/forbid-loop.vue
```

### 开启自动播放

示例使用 2000ms 间隔，显示页码从 1 开始（API 索引仍从 0 开始）。开关支持停止与继续；焦点在轮播内部时自动暂停。

通过 `auto-play` 开启自动播放。传入 `true` 使用默认间隔 3000ms；传入数字则作为间隔（毫秒）。

```demo
../example/demos/autoplay.vue
```

### 自动播放悬停暂停

```demo
../example/demos/autoplay-hover-pause.vue
```

### 垂直轮播

```demo
../example/demos/vertical.vue
```

### 切换箭头

通过 `show-arrow` 控制切换箭头的显示时机，支持 `always`、`hover`、`never`。两端默认 `always`。

```demo
../example/demos/navigation.vue
```

### 滑动效果（默认）

```demo
../example/demos/effect-slide.vue
```

### 淡入淡出效果

通过指示器按钮切换，非活动页透明且退出交互。各页重叠在同一网格位置，活动页占满视口宽度而不是分列。

```demo
../example/demos/effect-fade.vue
```

### 卡片效果

活动项恢复原始比例和不透明度，相邻项缩小、降低不透明度；上一页/下一页按钮支持原生键盘操作。

```demo
../example/demos/effect-card.vue
```

### 多图同屏

示例同时显示2.5项，可用鼠标拖拽并切换“接受切换”和“循环”。Current为父级已接受的零基索引，Proposal记录切换请求，Changes统计change事件；受控拒绝时仍可能发出提案及change，不等于模型已更新。接受后可正反拖动，首项向前循环到末项；关闭循环后末端继续拖动不越界、不重复通知。此处是鼠标组合示例，不代表真机触屏或所有居中/自动宽度组合均已验收。

```demo
../example/demos/multi-slides.vue
```

### 居中当前滑块

```demo
../example/demos/centered-slides.vue
```

### 指示器类型

通过 `indicator-type` 设置指示器类型，支持 `dot`、`line`、`slider`。隐藏指示器请使用 `indicator`。

```demo
../example/demos/indicator-type.vue
```

### 指示器位置

```demo
../example/demos/indicator-position.vue
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

### 自定义指示器

```demo
../example/demos/custom-indicator.vue
```

### 监听切换

```demo
../example/demos/handle-change.vue
```

### controlled

```demo
../example/demos/controlled.vue
```

### auto-sized

“反转顺序”以卡片宽度作为本示例的唯一key，反转同一批卡片。current按位置索引而非业务卡片身份解释：索引1从220px变成180px，索引与change次数不变；向左拖到索引2后恢复顺序，当前位置对应180px，向右拖回索引1。重排本身不提交切换；任意插入排序、身份保持、持按中重排和物理触屏仍未覆盖。

活动第五项删除组合：选中新增第五项后关闭“增加末项”，父级Current仍4、Changes不增加；显示层将越界索引限制到剩余第四项并居中。随后向左拖动才按四项循环到0，回写模型并增加一次change。这里不自动修正父级受控值；业务若需要删除即重写索引，应自行更新current。未覆盖任意重排或持按手势中删除。

“清空项目”临时移除所有卡片，空态导航禁用、拖动不发切换；解除后恢复此前配置的卡片，不自动切换。从初始索引0清空再恢复后，向右拖动可正常循环到末项。此流程未覆盖非零越界受控索引或清空途中仍按住指针。

从末项索引3清空再恢复时，父级Current保留3、Changes不增加；恢复后末项仍居中，随后向左拖动才循环到0并增加一次change。空态不把受控父级值强制回写0。此记录不覆盖活动末项删除、任意越界值或手势中清空。

“增加末项”追加200px第五项，不改变当前有效索引或增加change；从首项向右拖到新增项，再向右拖回原末项后移除第五项，仍保持原末项和次数。此时向左拖可按恢复后的四项循环回首项。这里只覆盖移除非活动末项，未认证删除当前项、任意重排或手势途中增删。

先拖到末项，再开启“加宽卡片”（各项增加80px）和“窄容器”（300px），当前模型与change次数不因尺寸变化而增加；观察当前340px卡片重新居中，再向左拖动循环到首项。恢复开关后应继续居中。本段描述真实ResizeObserver响应已结束手势后的尺寸变化，不代表按住拖动期间改变尺寸。

居中自动宽度示例包含140/220/180/260px四个独立项目，间隔12px。鼠标拖拽逐项切换，首尾均可循环；Current显示已接受的零基模型，Changes记录change事件次数。当前项宽度不同仍保持居中。本示例不代表真机触屏、手势中尺寸变化或动态增删项目已全部验收。

```demo
../example/demos/auto-sized.vue
```

### interactive-content

当前索引和变更次数展示受控模型。输入框内的方向键、Home/End和鼠标拖选文字保留原生编辑，不切换轮播；拖动背景，或聚焦轮播容器后按方向键，才切换页面。返回原页面仍保留输入文字；示例不涉及外部保存或物理触屏文字选择。

```demo
../example/demos/interactive-content.vue
```

### Scheduler lifecycle / 调度生命周期

```demo
../example/demos/scheduler-lifecycle.vue
```

### 介绍

显示可以在屏幕上滚动和滑动的项目集合。示例与 Cedar Design Web 保持一致；两端均支持 `effect`、`centered-slides`。

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Carousel Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `current` | 受控索引，零基 | `number` | `undefined` |
| `default-current` | 非受控初始索引 | `number` | `0` |
| `loop` | 循环，跨边界不复制实例 | `boolean` | `true` |
| `auto-play` | 自动播放及间隔 | `boolean \| number \| CarouselAutoPlayConfig` | `false` |
| `move-speed` | 显式切换时长（毫秒） | `number` | `undefined (token)` |
| `trigger` | 指示器触发方式 | `click \| hover` | `click` |
| `direction` | 内部滑动方向 | `horizontal \| vertical` | `horizontal` |
| `show-arrow` | 箭头显示策略 | `always \| hover \| never` | `always` |
| `arrow-class` | 箭头附加类 | `string` | `undefined` |
| `indicator` | 显示指示器 | `boolean` | `true` |
| `indicator-type` | 指示器样式 | `dot \| line \| slider` | `dot` |
| `indicator-position` | 指示器位置 | `bottom \| top \| left \| right \| outer` | `bottom` |
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
索引从零开始。受控操作先发 update:current，再发 change(index, previousIndex, isManual)，父级接受 current 前不移动；外部赋值不补发 change。方法 options 的 event:false 只关闭 change，不吞掉模型提议。用户操作的 isManual 为 true，自动播放为 false。

loop 跨边界移动原有子项，不复制组件实例。非循环且未居中时，末尾视区钳制以避免留白，选中项可能在最后一组可见项内移动而不再移动轨道。部分可见页保持可访问，完全离屏页 inert。fade 固定展示一页；auto 使用 CarouselItem 显式 width（横向）或 height（纵向），纵向需提供容器高度。默认插槽只统计 CarouselItem（可包在 Vue Fragment 中），注释、普通元素不成为页。

auto-play=true 使用 3000ms 且悬停暂停，数字指定毫秒且不启用悬停暂停；对象配置 interval/hoverToPause。焦点在组件内、拖动中、文档/祖先隐藏、KeepAlive 停用始终暂停。尊重减少动态效果偏好。输入框、按钮等交互子项保留原生行为，自定义交互区域可加 data-carousel-no-drag。show-arrow=hover 在键盘聚焦时也显示。

### Events
| 事件 | 参数 |
| --- | --- |
| update:current | index: number |
| change | index: number, previousIndex: number, isManual: boolean |

### Slots
| 插槽 | 参数 |
| --- | --- |
| default | CarouselItem |
| prev / next / indicator | { index, length, hovering, prev, next, to, resize } |

### Methods
| 方法 | 签名 |
| --- | --- |
| prev / next | (options?: CarouselToOptions) => void |
| to | (index: number, options?: CarouselToOptions) => void |
| resize | () => void |

CarouselItem 无自有 Props、事件或方法；默认插槽为页面内容。

### Types
CarouselProps, CarouselItemProps, CarouselInstance, CarouselItemInstance, CarouselEmits, CarouselSlots, CarouselItemSlots, CarouselExpose, CarouselSlotScope, CarouselToOptions, CarouselChangeData, CarouselDirection, CarouselEffect, CarouselAutoPlayConfig, CarouselArrowType, CarouselIndicatorType, CarouselIndicatorPosition, CarouselTriggerEvent.

### 样式变量

| Token | 默认值 |
| --- | --- |
| `--mp-carousel-indicator-dot-size` | `8px` |
| `--mp-carousel-indicator-position` | `var(--mp-sys-space-4)` |
| `--mp-carousel-indicator-gap` | `var(--mp-sys-space-3)` |
| `--mp-carousel-indicator-color-default` | `rgb(255 255 255 / 35%)` |
| `--mp-carousel-indicator-color-active` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-carousel-indicator-outer-margin-bottom` | `var(--mp-sys-space-8)` |
| `--mp-carousel-indicator-line-width` | `20px` |
| `--mp-carousel-indicator-line-height` | `3px` |
| `--mp-carousel-indicator-line-border-radius` | `var(--mp-sys-radius-sm)` |
| `--mp-carousel-arrow-size` | `var(--mp-sys-control-height-md)` |
| `--mp-carousel-arrow-font-size` | `var(--mp-sys-font-size-xl)` |
| `--mp-carousel-arrow-margin` | `var(--mp-sys-space-4)` |
| `--mp-carousel-arrow-color` | `var(--mp-sys-color-content-on-dark)` |
| `--mp-carousel-arrow-background` | `rgb(0 0 0 / 35%)` |
| `--mp-carousel-arrow-background-hover` | `rgb(0 0 0 / 55%)` |
| `--mp-carousel-arrow-disabled-opacity` | `0.4` |
| `--mp-carousel-navigation-z-index` | `10` |
| `--mp-carousel-transition-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-carousel-transition-timing-function` | `ease` |
| `--mp-carousel-fade-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-carousel-card-duration` | `var(--mp-sys-motion-duration-standard)` |
| `--mp-carousel-card-scale` | `0.85` |
| `--mp-carousel-card-opacity` | `0.6` |
| `--mp-carousel-focus-width` | `2px` |
| `--mp-carousel-focus-offset` | `2px` |
| `--mp-carousel-focus-color` | `var(--mp-sys-color-content-brand)` |

### 循环过渡边界

每个轮播项始终只有一个组件实例。普通上一页/下一页在出场项离开后回收位置；跨多页或居中跳转若需要同一项同时占据两个位置，则直接无动画定位，不复制交互内容，也不排队执行无限过渡。项目数量小于可视页数时不会复制项目填满。可访问名称跟随全局 Locale，显式标签属性优先。
