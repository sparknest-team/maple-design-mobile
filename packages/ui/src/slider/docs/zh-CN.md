# Slider 滑块

在有限数值范围内选择单值或区间。

## 基础示例

### 基础用法

```demo
../example/demos/basic-usage.vue
```

## 布局与排列

### 垂直

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置           | 作用                                                      | 相关示例 |
| -------------- | --------------------------------------------------------- | -------- |
| `orientation`  | 滑块轨道与操作的横纵轴向，默认 horizontal；不表示增减方向 | 垂直     |
| `aria-label`   | 可访问名称；范围可分别传入两个名称                        | 垂直     |
| `range`        | 两个固定低/高端，不可交叉；初始倒序自动排序               | 垂直     |
| `show-tooltip` | true悬浮/聚焦/拖动显示；false隐藏；always常驻             | 垂直     |

<!-- demo-config-notes:end -->

父容器提供 300px 高度。上移增大、下移减小；范围两端仍不能交叉。没有独立 reverse 属性。

```demo
../example/demos/vertical.vue
```

## 内容与展示

### 触控提示与定制

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置           | 作用                                          | 相关示例                           |
| -------------- | --------------------------------------------- | ---------------------------------- |
| `show-tooltip` | true悬浮/聚焦/拖动显示；false隐藏；always常驻 | 触控提示与定制、滑块按钮与数值标签 |
| `range`        | 两个固定低/高端，不可交叉；初始倒序自动排序   | 几何尺寸、滑块按钮与数值标签       |
| `aria-label`   | 可访问名称；范围可分别传入两个名称            | 触控提示与定制                     |

<!-- demo-config-notes:end -->

```demo
../example/demos/touch-and-labels.vue
```

### 几何尺寸

```demo
../example/demos/slider-size.vue
```

### 颜色

```demo
../example/demos/custom-style.vue
```

### 滑块按钮与数值标签

拖动滑块对比自定义按钮和数值标签；步长、双滑块与键盘模型保留独立场景。

```demo
../example/demos/thumb-label-comparison.vue
```

## 交互与控制

### 交互状态对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置           | 作用                                            | 相关示例                                     |
| -------------- | ----------------------------------------------- | -------------------------------------------- |
| `range`        | 两个固定低/高端，不可交叉；初始倒序自动排序     | 刻度、标记和数字输入、受控与非交叉范围、范围 |
| `step`         | 正有限步长，非法值回退1，按min对齐；max端点可达 | 刻度、标记和数字输入、步长                   |
| `aria-label`   | 可访问名称；范围可分别传入两个名称              | 刻度、标记和数字输入、受控与非交叉范围       |
| `show-tooltip` | true悬浮/聚焦/拖动显示；false隐藏；always常驻   | 受控与非交叉范围、自定义边界                 |
| `marks`        | 有限范围内位置到文本的映射                      | 刻度、标记和数字输入                         |
| `show-ticks`   | 按step显示刻度，过密时省略，最多1000个          | 刻度、标记和数字输入                         |

<!-- demo-config-notes:end -->

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于连续区间内的数值调整。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 刻度、标记和数字输入

数字输入遵守滑块步长和上下界；范围的两个端点不能互相越过。

```demo
../example/demos/keyboard-input.vue
```

### 步长

```demo
../example/demos/step-size.vue
```

### 受控与非交叉范围

范围示例接受模型更新；固定值滑块仅记录提议、不接受更新。只读和禁用滑块保持原值。

```demo
../example/demos/controlled-range.vue
```

### 范围

```demo
../example/demos/dual-thumb.vue
```

### 自定义边界

```demo
../example/demos/range.vue
```

### 指针交互的取消收尾

```demo
../example/demos/interaction-session.vue
```

## 使用说明

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit({ value, previousValue }, done, { signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

### 指针交互的取消收尾

每次有效指针 `start` 都有一次 `end`，包括被禁用、只读、边界/步长/方向/范围模式变化、丢失捕获、所属窗口失焦、KeepAlive 停用或卸载所取消的情况。`end` 携带该次手势最后的提案；未提出变更时携带开始值，切换范围模式不转换旧手势的载荷形状。取消只结束交互，不撤销此前的 `change`，不额外制造模型更新；是否接受提案仍由父级控制。迟到的 pointerup/move 不会让同一手势重复结束，普通通知返回的 Promise 不被等待。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

步长按 min 的十进制网格对齐，保留精确端点和范围约束；支持可表示的小数及科学计数法。公开模型仍是 Number，小于当前数值可分辨间隔的增量无法表达；format-tooltip 仅改变显示。数值输入失焦按自身正常提交与校验流程执行，Slider 不额外制造一次数值提交。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Slider Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| model-value | SliderValue / null | undefined | 受控数值或范围二元组；null 为显式空值。 |
| default-value | SliderValue | 0 | 非受控初始值；范围模型按升序二元组归一化。 |
| min | number / string | 0 | 有限最小边界，支持十进制与科学计数法数字字符串。 |
| max | number / string | 100 | 有限最大边界；不大于 min 时不可交互。 |
| step | number / string | 1 | 正有限步长，以 min 对齐；非法值回退 1。 |
| range | boolean | false | 双拇指范围，端点保持有序且不能交叉。 |
| orientation | 'horizontal' / 'vertical' | 'horizontal' | 轨道朝向；非法枚举在开发期提示。 |
| disabled | boolean | undefined | 禁用交互，省略时继承表单。 |
| readonly | boolean | undefined | 只读保留焦点和提示，禁止改变数值。 |
| error | boolean | undefined | 错误外观，省略时继承表单。 |
| marks | Record<number, string> | undefined | 范围内位置的文字标记。 |
| show-ticks | boolean | false | 显示步长刻度，最多 1000 个。 |
| show-input | boolean | false | 显示附带 InputNumber；范围模式显示两个。滑块的 aria-describedby 也用于数字输入，并与表单错误说明合并。 |
| show-tooltip | boolean / 'always' | true | true 在悬浮、聚焦、拖动时显示；false 隐藏；always 常驻。 |
| format-tooltip | SliderTooltipFormatter | undefined | 格式化提示及 aria-valuetext，不改变模型。 |
| aria-label | string / [string, string] | undefined | 单拇指名称或范围两个拇指的名称。 |
| active-color | string | undefined | 已选轨道颜色。 |
| track-color | string | undefined | 背景轨道颜色。 |
| thumb-color | string | undefined | 拇指颜色。 |
| label-color | string | undefined | 提示背景颜色。 |
| label-text-color | string | undefined | 提示文字颜色。 |
| track-height | number / string | undefined | 轨道厚度，数字为 px；非法长度保留主题默认。 |
| thumb-size | number / string | undefined | 拇指直径，数字为 px；非法长度保留主题默认。 |
| edit-mode | FieldEditMode<br>`'direct' \| 'popup'` | undefined | 字段编辑入口，省略时继承表单，否则 direct。 |
| read-pretty | boolean | undefined | 统一纯阅读状态，独立于只读和禁用。 |
| before-commit | BeforeFieldCommit | undefined | 延迟确认协议 ({ value, previousValue }, done, { signal })；布尔、Promise 或 done 完成，同步 undefined 等待 done。 |
| open | boolean | undefined | 受控延迟编辑层状态。 |
| default-open | boolean | false | 非受控延迟编辑层初始状态。 |
| popup-container | PopupContainer | undefined | 延迟编辑层挂载目标：选择器、HTMLElement 或 false。 |
| clearable | boolean | false | 延迟编辑层提供清空操作；不为内联滑块增加清除按钮。 |
| empty-value | SliderProps['emptyValue'] | undefined | 清空提交覆盖值，可显式返回 null。 |
| empty-values | readonly unknown[] | undefined | 空值识别策略，按字段、FormItem、Form 继承。 |
| empty-text | string | undefined | 默认纯阅读空文案，继承后缺省为短横线。 |

范围模式可通过 `aria-labelledby` 指向范围组名称；`aria-label` 的数组仍分别命名两个滑块。显式设置的 `role` 优先。

### 行为与键盘

方向键按step增加/减少，PageUp/PageDown为10步，Home/End到可用端点。范围的ARIA min/max随另一个拇指变化；重合时向左/下点击可分开低端，向右/上可分开高端。拇指内业务交互元素的键盘事件不被接管。只读保留焦点与提示，禁用不进入Tab顺序。

Pointer Events统一鼠标、触控、笔；pointerup提交最后坐标，pointercancel/丢失capture结束最近提议。禁用、卸载、KeepAlive失活会清理监听与capture且不继续发值事件。横向允许页面纵向滚动，纵向允许横向滚动。

受控模式只有父级回写才能改变显示；模型归一化不自动emit。change/update:model-value只报告不同提议，end携带最终提议，不保证父级接受。键盘及数字输入每次操作各有start/end；拖动是一组start/end。InputNumber内部不重复触发Form验证。

### Slider Events

| 事件               | 参数          | 含义                         |
| ------------------ | ------------- | ---------------------------- |
| update:model-value | `SliderValue` | 请求更新                     |
| change             | `SliderValue` | 不同数值提议，与模型事件配对 |
| start              | —             | 交互开始                     |
| end                | `SliderValue` | 交互结束的最终提议           |

### Slider Slots / Methods

button 插槽接收 { currentValue, index }；自定义内容保留键盘、ARIA 与提示。read 插槽接收 { value, text }，value 保留 null/undefined 及范围模型，text 为格式化值。focus(index=0) 按显示顺序聚焦拇指；blur() 让组件内部当前焦点失焦，包括 show-input 数值输入，不影响外部控件。

导出 SliderProps、SliderValue、SliderOrientation、SliderTooltipFormatter、SliderTooltipVisibility、SliderEmits、SliderSlots、SliderExpose、SliderInstance 和运行时 sliderProps。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-slider-active-color` | `var(--mp-sys-color-action-primary)` | `background`, `outline` |
| `--mp-slider-control-height` | `var(--mp-sys-control-height-md)` | `height`, `min-height`, `padding-bottom`, `padding-inline-end`, `width` |
| `--mp-slider-disabled-color` | `var(--mp-sys-color-content-disabled)` | `background`, `border-color` |
| `--mp-slider-error-color` | `var(--mp-sys-color-content-danger)` | `background`, `border-color` |
| `--mp-slider-font-size` | `var(--mp-sys-font-size-sm)` | `font-size` |
| `--mp-slider-gap` | `var(--mp-sys-space-4)` | `bottom`, `gap`, `left`, `padding` |
| `--mp-slider-input-width` | `80px` | `width` |
| `--mp-slider-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-slider-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-slider-thumb-border-color` | `var(--mp-sys-color-action-primary)` | `border` |
| `--mp-slider-thumb-color` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-slider-thumb-size` | `16px` | `height`, `width` |
| `--mp-slider-tooltip-background` | `var(--mp-sys-color-surface-tooltip)` | `background` |
| `--mp-slider-tooltip-color` | `var(--mp-sys-color-content-on-dark)` | `color` |
| `--mp-slider-track-color` | `var(--mp-sys-color-state-hover)` | `background` |
| `--mp-slider-track-height` | `4px` | `height`, `width` |
| `--mp-slider-transition-duration` | `var(--mp-sys-motion-duration-fast)` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-slider-active-color: var(--mp-sys-color-action-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
