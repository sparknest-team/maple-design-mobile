# Switch

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

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

### Props

| Prop             | 含义                                                         | 类型                                                                 | 默认值    |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------------------------------- | --------- |
| model-value      | 受控值；省略时内部管理                                       | string / number / boolean                                            | undefined |
| default-value    | 非受控初始实际值，仅创建时读取；省略时使用 uncheckedValue    | string / number / boolean                                            | undefined |
| clearable        | 弹出编辑时显示清空操作                                       | boolean                                                              | false     |
| empty-value      | 清空后提交的值，可传值或工厂函数                             | SwitchValue \| null \| (() => SwitchValue \| null)                   | undefined |
| edit-mode        | 编辑模式；未设置时继承 FormItem/Form，平台值域见编辑模式说明 | FieldEditMode                                                        | undefined |
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

before-change 返回 false、抛错或拒绝 Promise 均取消切换；其他正常完成允许切换。等待 Promise 或 done 期间自动 loading，重复输入被阻止。
等待期间卸载、KeepAlive 停用、值被外部更新、禁用/只读/loading 状态改变时，旧结果失效。
受控模式仅发送更新请求；父级更新 model-value 后才改变选中状态。省略 model-value 时使用内部状态。

### Events

| 事件               | 参数与时机                                           |
| ------------------ | ---------------------------------------------------- |
| click              | (event: Event)，允许点击时，拦截前                   |
| update:model-value | (nextValue: SwitchValue)，允许切换后，先于 change    |
| change             | (nextValue: SwitchValue, event: Event)，每次提交一次 |
| focus              | (event: FocusEvent)，获得焦点                        |
| blur               | (event: FocusEvent)，失去焦点                        |

支持 Enter、Space；按键长按重复不重复切换。disabled/loading 不触发 click 或值变化；readonly 可通知 click，但不执行拦截器。
外部 model-value 更新不会额外触发 change。

### Slots

| 插槽           | 说明                                                 | 参数 |
| -------------- | ---------------------------------------------------- | ---- |
| checked        | 选中文案，优先于 checked-text；line 与 sm 不展示     | —    |
| unchecked      | 未选中文案，优先于 unchecked-text；line 与 sm 不展示 | —    |
| checked-icon   | 选中滑块图标，loading 时被加载图标替代               | —    |
| unchecked-icon | 未选中滑块图标，loading 时被加载图标替代             | —    |

### Methods

无公开方法。

### 跨端说明

组件属性、事件参数和插槽一致。Cedar 省略 size 时继承表单／全局尺寸（xs/sm 映射 sm，lg/xl 映射 lg）；Maple 回退 md。两端的 disabled / readonly 均按字段 > FormItem > Form 继承，显式 false 覆盖父级；表单集成由各端适配。
<!-- same-source-api:end -->

### 类型

SwitchProps、SwitchVariant、SwitchSize、SwitchValue、SwitchBeforeChange、SwitchInstance 均由根入口及组件入口导出。

### 样式变量

| Token（Maple 使用 --mp-，Cedar 使用 --c-）                 | 默认值                              |
| ---------------------------------------------------------- | ----------------------------------- |
| --mp-switch-width / height / handle-size                   | 40px / 24px / 16px                  |
| --mp-switch-size-sm-scale / size-lg-scale                  | .8 / 1.2                            |
| --mp-switch-tonal-width / tonal-height / tonal-handle-size | 52px / 32px / 24px                  |
| --mp-switch-line-height / line-handle-size                 | 12px / 20px                         |
| --mp-switch-hit-area                                       | 0px，点击区域向外扩展量，不改变布局 |
| --mp-switch-track-background / track-active-background     | 中性色 / 主题色                     |
| --mp-switch-handle-background / handle-color               | 白色 / 主题色                       |
| --mp-switch-disabled-opacity                               | .5                                  |
| --mp-switch-round-radius / gap                             | 4px / 4px                           |

完整可调变量见 style/token.less；旧版各端 Switch 几何 token 不保证保留。

## 迁移

Maple standard → line；不传 variant 现在使用 circle。两端统一四变体，不将 standard 保留为别名。
移除 lazy-change；before-change 从 (value, change) 回调改为返回值/Promise，应用不再手动调用 change。
Maple change 补齐第二个原始事件参数；checked-color/unchecked-color 统一控制轨道，滑块颜色通过 token 定制。

### 颜色变量与 tonal 前景迁移

| 变量后缀（--mp-switch-） | system 默认角色   | 职责                                     |
| ------------------------ | ----------------- | ---------------------------------------- |
| track-background         | content-secondary | 普通未选中实心轨道                       |
| track-active-background  | content-brand     | 选中轨道及键盘焦点环                     |
| track-error-background   | content-danger    | 可交互错误轨道及 tonal 错误边框          |
| handle-background        | surface-default   | 普通／选中／错误滑块底色                 |
| handle-color             | content-brand     | 普通／选中／错误滑块图标色               |
| text-color               | surface-default   | 实心轨道上的文字色                       |
| checked-text-color       | content-on-bright | 选中轨道文字；错误态仍遵循原有前景优先级 |
| tonal-track-background   | surface-muted     | tonal 未选中轨道底色                     |
| tonal-border-color       | content-secondary | tonal 未选中边框及滑块底色               |
| tonal-text-color         | content-secondary | 新增：tonal 未选中轨道文字               |
| tonal-handle-color       | surface-default   | 新增：tonal 未选中滑块图标               |

默认值引用对应 system 角色，例如 var(--mp-sys-color-content-secondary)。tonal 未选中时使用 tonal-text-color / tonal-handle-color；需要全变体定制时请同时覆盖普通和 tonal 前景。可交互错误态使用普通文字／滑块配对，disabled / loading 抑制错误色。自定义轨道颜色需自行验证前景对比。阴影、尺寸及动效不在本批颜色契约中。

### 主题名与造型名

当前主题入口为 Themes.default.light / dark 与 Themes.maple.light / dark。Switch 的 tonal 是造型，不是主题；公开变体与八项专用变量统一使用 tonal 命名，不保留旧名称别名。

### 动效变量

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。

| Token                          | Default |
| ------------------------------ | ------- |
| `--mp-switch-loading-duration` | `1s`    |

### Form 字段展示与确认

本组件支持 `edit-mode`，字段 > FormItem > Form 逐层继承；未指定时为 `direct`，保留直接编辑。支持值：`direct / popup`。非 direct 编辑模式通过字段值入口打开编辑面板，并维护单份草稿；确认后才更新 v-model，取消、重置或启用 readPretty 时丢弃草稿。

Maple 使用 edit-mode="popup" 点击值区域打开编辑面板；direct 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

### 表单状态继承

省略 `disabled` / `readonly` 时依次继承 FormItem、Form；显式 `false` 覆盖父级。等待 `beforeChange` 时，父级变为禁用或只读会使此次切换失效，迟到结果不再改值。表单外省略时仍表现为 false。

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

### 守卫等待反馈

before-* 等待期间显示加载反馈并标记 aria-busy；拒绝或失败后恢复，重复提交不再启动同一操作。普通事件返回的 Promise 不参与加载。
