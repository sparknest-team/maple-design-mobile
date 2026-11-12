# Switch

## 阅读方向

开关继承来源 dir：未选中手柄位于阅读起点，选中后向阅读终点移动。Space/Enter 仍表示切换；方向变化本身不改变业务值，禁用、只读和 loading 时不提交切换。

## 基础示例

### 双向绑定与默认值

```demo
../example/demos/basic.vue
```

## 外观与状态

### 外观配置对比

选择一个对比维度后，同屏展示它的全部可选值；其余配置和内容保持一致。可切换其他配置检查组合效果；输入类预览共享一个值。

<details>
<summary>配置说明与使用限制</summary>

#### 外观组合

适用于即时生效的开关设置。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

</details>

```demo
../example/demos/appearance-lab.vue
```

## 自定义与插槽

### 自定义颜色

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置              | 作用           | 相关示例               |
| ----------------- | -------------- | ---------------------- |
| `variant`         | 造型           | 自定义文字、自定义图标 |
| `checked-color`   | 选中轨道颜色   | 自定义颜色             |
| `unchecked-color` | 未选中轨道颜色 | 自定义颜色             |
| `checked-text`    | 选中文案       | 自定义文字             |
| `unchecked-text`  | 未选中文案     | 自定义文字             |
| `ripple`          | 点击波纹       | 水波与滑块阴影         |

<!-- demo-config-notes:end -->

```demo
../example/demos/custom-color.vue
```

### 自定义文字

```demo
../example/demos/custom-text.vue
```

### 自定义图标

```demo
../example/demos/custom-icon.vue
```

### 水波与滑块阴影

```demo
../example/demos/custom.vue
```

## 交互与控制

### 交互状态对比

<!-- demo-config-notes:start -->

#### 本组配置对照

| 配置            | 作用                                                      | 相关示例       |
| --------------- | --------------------------------------------------------- | -------------- |
| `disabled`      | 禁用；表单禁用也阻止交互                                  | 交互状态对比   |
| `readonly`      | 只读；仍可聚焦与通知 click，不切换                        | 交互状态对比   |
| `variant`       | 造型                                                      | 加载中         |
| `loading`       | 加载中；禁止 click 和切换                                 | 加载中         |
| `default-value` | 非受控初始实际值，仅创建时读取；省略时使用 uncheckedValue | 加载中         |
| `size`          | 尺寸档位；省略时见跨端说明                                | 焦点与事件顺序 |

<!-- demo-config-notes:end -->

在同一实例上切换禁用、只读和错误状态后再操作控件，比较可编辑性和交互反馈。恢复开关位于目标控件外；错误外观本身不会执行校验。

<details>
<summary>配置说明与使用限制</summary>

#### 交互状态切换

适用于即时生效的开关设置。调整禁用、只读，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

</details>

```demo
../example/demos/state-lab.vue
```

### 加载中

```demo
../example/demos/loading.vue
```

### 焦点与事件顺序

```demo
../example/demos/events.vue
```

### 自定义值与事件

```demo
../example/demos/custom-value.vue
```

## 异步与动态数据

### 异步允许、阻止与异常

```demo
../example/demos/switch-interception.vue
```

## 使用说明

### 配置说明

使用下方 CSS Variables 表中的变量定制尺寸与颜色。

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示开关的实际值，类型与 checkedValue/uncheckedValue 一致；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

<!-- same-source-api:start -->

### Switch Props

| Prop             | 含义                                                         | 类型                                                                 | 默认值    |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- | --------- |
| model-value      | 受控值；省略时内部管理                                       | string / number / boolean                                            | undefined |
| default-value    | 非受控初始实际值，仅创建时读取；省略时使用 uncheckedValue    | string / number / boolean                                            | undefined |
| clearable        | 弹出编辑时显示清空操作                                       | boolean                                                              | false     |
| empty-value      | 清空后提交的值，可传值或工厂函数                             | SwitchValue \| null \| (() => SwitchValue \| null)                   | undefined |
| empty-values | 空值识别列表；完整覆盖继承配置 | readonly unknown[] | 继承字段空值策略 |
| empty-text | 阅读空文案；字段 > FormItem > Form | string | - |
| edit-mode        | 编辑模式；未设置时继承 FormItem/Form，平台值域见编辑模式说明 | FieldEditMode<br>`'direct' \| 'popup'` | undefined |
| read-pretty      | 纯阅读展示，独立于 readonly                                  | boolean                                                              | undefined |
| before-commit    | 编辑层保存前的可取消拦截器                                   | BeforeFieldCommit                                                    | undefined |
| open             | 编辑层受控打开状态                                           | boolean                                                              | undefined |
| default-open     | 编辑层非受控初始状态                                         | boolean                                                              | false     |
| popup-container  | 编辑层挂载容器                                               | PopupContainer                                                       | undefined |
| checked-value    | 选中值                                                       | string / number / boolean                                            | true      |
| unchecked-value  | 未选中值                                                     | string / number / boolean                                            | false     |
| variant          | 造型                                                         | circle / round / line / tonal                                        | circle    |
| size             | 尺寸档位；省略时见跨端说明                                   | sm / md / lg                                                         | undefined |
| disabled         | 禁用；表单禁用也阻止交互                                     | boolean                                                              | undefined |
| readonly         | 只读；仍可聚焦与通知 click，不切换                           | boolean                                                              | undefined |
| loading          | 加载中；禁止 click 和切换                                    | boolean                                                              | false     |
| before-change    | 切换拦截器，不是事件                                         | (payload, done, context) => boolean / void / Promise<boolean / void> | —         |
| checked-text     | 选中文案                                                     | string                                                               | —         |
| unchecked-text   | 未选中文案                                                   | string                                                               | —         |
| checked-color    | 选中轨道颜色                                                 | string                                                               | —         |
| unchecked-color  | 未选中轨道颜色                                               | string                                                               | —         |
| loading-color    | 加载图标颜色                                                 | string                                                               | —         |
| ripple           | 点击波纹                                                     | boolean                                                              | true      |
| handle-elevation | 滑块阴影，true 等级 2，数字取整数并限制 0～24                | boolean / number                                                     | true      |

before-change 使用 (payload, done, context)。返回 true、调用 done() 或 Promise 兑现为非 false 结果时允许切换；返回 false、done(false)、抛错、Promise 兑现为 false 或拒绝均取消。同步 void 等待 done，`Promise<void>` 正常完成允许。等待期间自动 loading，重复输入被阻止；延迟编辑模式下确认按钮也会禁用，仍可关闭编辑器取消操作。异常按许可取消处理，不新增报错事件。
等待期间卸载、KeepAlive 停用、值被外部更新、禁用/只读/loading 状态改变时，旧结果失效。
受控模式仅发送更新请求；父级更新 model-value 后才改变选中状态。省略 model-value 时使用内部状态。

### Switch Events

| 事件               | 参数与时机                                           |
| ------------------ | ---------------------------------------------------- |
| click              | (event: Event)，允许点击时，拦截前                   |
| update:model-value | (nextValue: SwitchValue)，允许切换后，先于 change    |
| change             | (nextValue: SwitchValue, event?: Event)，每次提交一次 |
| focus              | (event: FocusEvent)，获得焦点                        |
| blur               | (event: FocusEvent)，失去焦点                        |

支持 Enter、Space；按键长按重复不重复切换。disabled/loading 不触发 click 或值变化；readonly 可通知 click，但不执行拦截器。
外部 model-value 更新不会额外触发 change。

### Switch Slots

| 插槽           | 说明                                                 | 参数 |
| -------------- | ---------------------------------------------------- | ---- |
| checked        | 选中文案，优先于 checked-text；line 与 sm 不展示     | —    |
| unchecked      | 未选中文案，优先于 unchecked-text；line 与 sm 不展示 | —    |
| checked-icon   | 选中滑块图标，loading 时被加载图标替代               | —    |
| unchecked-icon | 未选中滑块图标，loading 时被加载图标替代             | —    |

### Switch Methods

无公开方法。

### 使用说明

组件属性、事件参数和插槽一致。Cedar 省略 size 时继承表单／全局尺寸（xs/sm 映射 sm，lg/xl 映射 lg）；Maple 回退 md。两端的 disabled / readonly 均按字段 > FormItem > Form 继承，显式 false 覆盖父级；表单集成由各端适配。
<!-- same-source-api:end -->

## Types

SwitchProps、SwitchVariant、SwitchSize、SwitchValue、SwitchBeforeChange、SwitchInstance 均由根入口及组件入口导出。

## 表单 disabled 的继承

disabled 默认 undefined 表示继承，有效状态按 local ?? FormItem ?? Form ?? false 解析。显式 false 不会被吞掉，可以让一个字段保持可用，其他未指定字段仍跟随 Form。Form disabled 仍是整张表单的默认策略，不是禁止所有子项覆盖的强制锁。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

```vue
<mp-switch v-model="flag" :before-change="beforeChange" />
```

```ts
const beforeChange = (next, done) => {
  canChange(next).then((allowed) => done(allowed))
}
```

守卫统一使用 `(payload, done, context)`：关闭 payload 为 `{ action }`，切换和提交为 `{ value, previousValue }`，Popup 为 `{ reason }`。context 提供 `signal` 和可选原始 `event`。返回 boolean/Promise，或调用 done()/done(false)；同步 void 等待 done，Promise&lt;void&gt; 放行。首次完成生效。等待期间自动管理 loading/disabled，取消后旧结果失效，不暴露内部按钮 refs。

### 异步操作反馈

before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。

延迟编辑的 `change` 在有来源时保留真实确认事件，例如保存按钮事件；程序触发的编辑器接力没有 DOM 事件，第二个参数可缺省。事件 target 可能是确认控件，不保证是输入元素。`change` 只通知，不等待监听器返回的 Promise；异步审批请使用 `before-commit`。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-switch-checked-text-color` | `var(--mp-switch-text-color)` | `color` |
| `--mp-switch-disabled-opacity` | `0.5` | `opacity` |
| `--mp-switch-duration` | `var(--mp-sys-motion-duration-standard)` | `transition` |
| `--mp-switch-focus-width` | `2px` | `outline`, `outline-offset` |
| `--mp-switch-font-size` | `var(--mp-sys-font-size-xs)` | `font-size` |
| `--mp-switch-gap` | `var(--mp-sys-space-2)` | `inset-inline-start`, `padding-inline` |
| `--mp-switch-handle-background` | `var(--mp-sys-color-surface-default)` | `background` |
| `--mp-switch-handle-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-switch-handle-size` | `16px` | `height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-height` | `24px` | `height` |
| `--mp-switch-hit-area` | `0px` | `inset` |
| `--mp-switch-line-handle-size` | `20px` | `height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-line-height` | `12px` | `height` |
| `--mp-switch-loading-duration` | `1s` | `animation` |
| `--mp-switch-radius` | `var(--mp-sys-radius-pill)` | `border-radius` |
| `--mp-switch-ripple-duration` | `400ms` | `animation` |
| `--mp-switch-ripple-scale` | `2.4` | `transform` |
| `--mp-switch-round-radius` | `var(--mp-sys-radius-md)` | `border-radius` |
| `--mp-switch-shadow-color` | `#0003` | 组件样式 |
| `--mp-switch-size-lg-scale` | `1.2` | `font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-size-sm-scale` | `0.8` | `font-size`, `height`, `inset-inline-start`, `min-width`, `padding-inline`, `width` |
| `--mp-switch-text-color` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-switch-tonal-border-color` | `var(--mp-sys-color-content-secondary)` | `background`, `border` |
| `--mp-switch-tonal-border-width` | `2px` | `border` |
| `--mp-switch-tonal-handle-color` | `var(--mp-sys-color-surface-default)` | `color` |
| `--mp-switch-tonal-handle-size` | `24px` | `height`, `inset-inline-start`, `padding-inline`, `width` |
| `--mp-switch-tonal-height` | `32px` | `height` |
| `--mp-switch-tonal-text-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-switch-tonal-track-background` | `var(--mp-sys-color-surface-muted)` | `background` |
| `--mp-switch-tonal-width` | `52px` | `min-width` |
| `--mp-switch-track-active-background` | `var(--mp-sys-color-action-primary)` | `background`, `outline` |
| `--mp-switch-track-background` | `var(--mp-sys-color-content-secondary)` | `background` |
| `--mp-switch-track-error-background` | `var(--mp-sys-color-content-danger)` | `background`, `border-color` |
| `--mp-switch-width` | `40px` | `min-width` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-switch-checked-text-color: var(--mp-switch-text-color);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->

### 动效

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。

### 轨道与滑块颜色

| 变量后缀（--mp-switch-） | system 默认角色   | 职责                                     |
| ------------------------ | ----------------- | ---------------------------------------- |
| track-background         | content-secondary | 普通未选中实心轨道                       |
| track-active-background  | content-brand     | 选中轨道及键盘焦点环                     |
| track-error-background   | content-danger    | 可交互错误轨道及 tonal 错误边框          |
| handle-background        | surface-default   | 普通／选中／错误滑块底色                 |
| handle-color             | content-brand     | 普通／选中／错误滑块图标色               |
| text-color               | surface-default   | 实心轨道上的文字色                       |
| checked-text-color       | switch-text-color | 选中轨道文字；错误态仍遵循原有前景优先级 |
| tonal-track-background   | surface-muted     | tonal 未选中轨道底色                     |
| tonal-border-color       | content-secondary | tonal 未选中边框及滑块底色               |
| tonal-text-color         | content-secondary | tonal 未选中轨道文字               |
| tonal-handle-color       | surface-default   | tonal 未选中滑块图标               |

默认值引用对应 system 角色，例如 var(--mp-sys-color-content-secondary)。tonal 未选中时使用 tonal-text-color / tonal-handle-color；需要全变体定制时请同时覆盖普通和 tonal 前景。可交互错误态使用普通文字／滑块配对，disabled / loading 抑制错误色。自定义轨道颜色需自行验证前景对比。
