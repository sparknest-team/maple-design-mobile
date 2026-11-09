# 评分

### 介绍

用于对事物进行评级操作。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 外观与状态

### 禁用与只读

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置       | 作用                                | 相关示例   |
| ---------- | ----------------------------------- | ---------- |
| `disabled` | 禁用；缺省继承表单，显式 false 覆盖 | 禁用与只读 |
| `readonly` | 只读且可聚焦；缺省继承表单          | 禁用与只读 |

<!-- demo-config-notes:end -->

通过 `disabled` 属性将评分设置为禁止点击状态，`disabled-color` 设置禁用时图标的颜色。
通过 `readonly` 属性将评分设置为只读状态。

```demo
../example/demos/disabled-and-readonly.vue
```

## 内容与展示

### 尺寸与符号

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                              | 相关示例                             |
| --------------- | ------------------------------------------------- | ------------------------------------ |
| `allow-half`    | 半分步长                                          | 尺寸与符号、使用半星、评分总数与清除 |
| `size`          | 图标尺寸；数字/数字字符串为 px，带单位为 CSS 长度 | 尺寸与符号、自定义评分图标尺寸与间隔 |
| `gap`           | 图标间距；数字/数字字符串为 px，带单位为 CSS 长度 | 尺寸与符号、自定义评分图标尺寸与间隔 |
| `count`         | 0 < count <= 1000；向下取整且至少 1；非法或超范围回退 5                    | 使用半星、评分总数与清除             |
| `default-value` | 非受控初值，只初始化一次                          | 尺寸与符号                           |
| `aria-label`    | 评分的业务无障碍名称                              | 尺寸与符号                           |

<!-- demo-config-notes:end -->

```demo
../example/demos/sizes-and-symbols.vue
```

### 自定义评分图标尺寸与间隔

通过 `size` 属性设置评分图标的尺寸。
通过 `gap` 属性设置评分之间的间隔。

```demo
../example/demos/custom-rating-icon-size-and-gap.vue
```

### 使用半星

通过 `allow-half` 属性将评分设置为可半选，`half-icon` 属性设置半选时的样式。

```demo
../example/demos/half-star.vue
```

### 评分总数与清除

比较评分上限和重复选择时的清除行为；半星精度、键盘输入与受控值保持独立。

<details>
<summary>配置说明与使用限制</summary>

#### 可清空

通过 `clearable` 属性允许用户清空评分。

#### 自定义评分总数

通过 `count` 属性设置评分总数。

</details>

```demo
../example/demos/value-rules-comparison.vue
```

## 自定义与插槽

### 自定义评分图标样式

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置          | 作用                                     | 相关示例           |
| ------------- | ---------------------------------------- | ------------------ |
| `icon`        | 选中图标                                 | 自定义评分图标样式 |
| `empty-icon`  | 未选中图标                               | 自定义评分图标样式 |
| `color`       | 选中颜色，或按每个图标分值的递增阈值映射 | 自定义评分图标样式 |
| `empty-color` | 未选中颜色                               | 自定义评分图标样式 |

<!-- demo-config-notes:end -->

通过 `icon` 和 `empty-icon` 属性设置选中和未选中时的图标。
通过 `color` 和 `empty-color` 属性设置选中和未选中时的颜色。

```demo
../example/demos/custom-rating-icon-style.vue
```

## 交互与控制

### 交互状态切换

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                   | 相关示例                 |
| --------------- | -------------------------------------- | ------------------------ |
| `disabled`      | 禁用；缺省继承表单，显式 false 覆盖    | 交互状态切换、键盘与状态 |
| `readonly`      | 只读且可聚焦；缺省继承表单             | 交互状态切换、键盘与状态 |
| `allow-half`    | 半分步长                               | 键盘与状态               |
| `clearable`     | 重复点击当前分数清空；键盘边界不会清空 | 键盘与状态               |
| `aria-label`    | 评分的业务无障碍名称                   | 键盘与状态               |
| `default-value` | 非受控初值，只初始化一次               | 键盘与状态               |

<!-- demo-config-notes:end -->

适用于评分反馈。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

### 键盘与状态

```demo
../example/demos/keyboard.vue
```

### 监听事件

通过调用 `change` 事件完成其他交互逻辑。

> 评分组件的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/listen-event.vue
```

## 使用说明

### 编辑与确认

通过 `edit-mode` 配置编辑方式；未指定时依次继承 FormItem、Form，默认 `direct`。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit({ value, previousValue }, done, { signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### Rate Props

| 属性           | 说明                                              | 类型                             | 默认值     |
| -------------- | ------------------------------------------------- | -------------------------------- | ---------- |
| model-value    | 受控评分，配合 v-model；外部更新不发事件          | number                           | undefined  |
| default-value  | 非受控初值，只初始化一次                          | number                           | 0          |
| count          | 0 < count <= 1000；向下取整且至少 1；非法或超范围回退 5                    | number \| string                 | 5          |
| allow-half     | 半分步长                                          | boolean                          | false      |
| clearable      | 重复点击当前分数清空；键盘边界不会清空            | boolean                          | false      |
| grading        | 固定五级表情评分，优先于插槽和图标                | boolean                          | false      |
| disabled       | 禁用；缺省继承表单，显式 false 覆盖               | boolean                          | undefined  |
| readonly       | 只读且可聚焦；缺省继承表单                        | boolean                          | undefined  |
| aria-label     | 评分的业务无障碍名称                              | string                           | undefined  |
| size           | 图标尺寸；数字/数字字符串为 px，带单位为 CSS 长度 | number \| string                 | 样式默认值 |
| gap            | 图标间距；数字/数字字符串为 px，带单位为 CSS 长度 | number \| string                 | 样式默认值 |
| color          | 选中颜色，或按每个图标分值的递增阈值映射          | string \| Record<string, string> | undefined  |
| empty-color    | 未选中颜色                                        | string                           | undefined  |
| disabled-color | 禁用时覆盖选中/未选中颜色                         | string                           | undefined  |
| icon           | 选中图标                                          | string \| Component              | 星形       |
| half-icon      | 半选图标                                          | string \| Component              | 半星       |
| empty-icon     | 未选中图标                                        | string \| Component              | 空星       |
| ripple         | 点击水波纹                                        | boolean                          | true       |

size/gap 不接受 xs/sm/md/lg/xl 档位；省略或非法值保留样式默认值。size 要求正数，gap 允许 0；负间距回退样式默认值。CSS var/calc/min/max/clamp 长度可用。评分按 1 或 0.5 步长归一至 0～count；非有限评分显示 0，不反向改写外部值。

### Rate Events

| 事件               | 参数          | 说明                                      |
| ------------------ | ------------- | ----------------------------------------- |
| update:model-value | value: number \| null | 用户产生新值                              |
| change             | value: number \| null | 新值确认；相同值不重复通知                |
| hover-change       | value: number \| null | 鼠标预览改变；离开/失焦/禁用/只读重置为 0 |

### Rate Slots

| 插槽      | 参数                     | 说明                                           |
| --------- | ------------------------ | ---------------------------------------------- |
| character | { index, value, active } | index 从 0 开始，value 从 1 开始；active 表示整颗已选，替换评分符号 |
| read | { value, text } | 自定义阅读内容，保留 nullable 模型 |

优先级：grading > character > icon/half-icon/empty-icon > 默认图标。字符串图标需要全局注册；组件值无需注册。

### Rate Methods

focus() 聚焦评分，blur() 移除焦点。只读仍可聚焦，禁用移出 Tab 序列。方向键增减、Home 清零、End 满分；子控件键盘事件和 Alt/Ctrl/Meta 组合键不被接管。触屏点击与鼠标点击遵循相同半选、清空规则。

## Types

导出 RateProps、RateColor、RateIcon、RateInstance、RateExpose、RateEmits、RateCharacterSlotProps、RateSlots、RateReadScope。

## 配置清空后的值

`empty-value` 指定当前组件已有清空动作的输出；省略时采用该组件默认返回。具体类型以组件 API 为准。它不改变 empty-values 的识别规则，也不改变 Form reset 的初始值。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

公共 focus/blur 从首次挂载即可调用。focus 会打开可编辑的延迟编辑器，等待其就绪后定位；禁用、只读或纯阅读时不因此打开。blur 只失焦当前目标，不重新打开。保存的方法不会绑定旧编辑器，关闭、切换模式、停用或卸载会取消排队调用。

已处理的评分键盘操作会清除鼠标悬浮预览；存在预览时发送一次 hover-change(0)。受控父级拒绝评分更新时，显示仍以外部值为准。再次移动鼠标可以继续预览，未处理的按键不清除预览。

character 的 active 仅表示整颗已选：例如 1.5 分时第二颗 active 为 false，其外层带半选类，负责半分视觉；read 收到 { value, text }，保留 null/undefined，text 是共享格式化文本。自定义 read 优先于 empty-text，不把空值替换成数值 0。character 和 read 不承担业务任务执行。

before-commit 使用 ({ value, previousValue }, done, { signal }) 协议；可返回布尔或 Promise，也可调用 done 完成。同步返回 undefined 会等待 done；signal 取消后旧结果不再提交。普通 change 只通知，不等待返回值。

## CSS Variables

Cedar 默认使用金色星形与紧凑间距；Maple 默认使用主题主色与更大的触控间距。两端同名 CSS 变量具有相同用途，默认值可以不同。

`transition-duration` 控制 hover/颜色过渡，`scale-duration` 控制选中动画，`transition-timing-function` 控制缓动。低动态偏好下关闭非必要动画；`size` / `gap` Prop 会覆盖当前实例的对应 Token。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-rate-action-padding` | `4px` | `padding` |
| `--mp-rate-active-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-rate-active-scale` | `1.2` | `transform` |
| `--mp-rate-disabled-color` | `var(--mp-sys-color-content-disabled)` | `color` |
| `--mp-rate-empty-color` | `var(--mp-color-text)` | `color` |
| `--mp-rate-error-color` | `var(--mp-sys-color-content-danger)` | `color` |
| `--mp-rate-focus-color` | `var(--mp-sys-color-content-brand)` | `outline` |
| `--mp-rate-focus-offset` | `2px` | `outline-offset` |
| `--mp-rate-focus-width` | `2px` | `outline` |
| `--mp-rate-gap` | `0px` | `margin-inline-end` |
| `--mp-rate-min-height` | `0px` | `min-height` |
| `--mp-rate-scale-duration` | `250ms` | `animation` |
| `--mp-rate-size` | `24px` | `font-size` |
| `--mp-rate-transition-duration` | `250ms` | `transition` |
| `--mp-rate-transition-timing-function` | `ease` | `animation`, `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-rate-action-padding: 4px;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
