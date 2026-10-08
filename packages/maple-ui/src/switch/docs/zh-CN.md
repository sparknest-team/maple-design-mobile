# Switch

与 Cedar 使用相同场景、参数和交互顺序；示例源码仅替换组件前缀，主题与站点外壳各自保留。

## 案例

### 双向绑定与默认值

```demo
../example/demos/basic.vue
```

### 四种变体

```demo
../example/demos/type.vue
```

### 三种尺寸

```demo
../example/demos/size.vue
```

### 禁用

```demo
../example/demos/disabled.vue
```

### 只读

```demo
../example/demos/readonly.vue
```

### 加载中

```demo
../example/demos/loading.vue
```

### 自定义颜色

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

### 自定义值与事件

```demo
../example/demos/custom-value.vue
```

### 异步允许、阻止与异常

```demo
../example/demos/switch-interception.vue
```

### 焦点与事件顺序

```demo
../example/demos/events.vue
```

## API

<!-- same-source-api:start -->
### Props

| Prop | 含义 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value | 受控值；省略时内部管理 | string / number / boolean | undefined |
| default-checked | 非受控初始状态，仅初始化生效 | boolean | false |
| checked-value | 选中值 | string / number / boolean | true |
| unchecked-value | 未选中值 | string / number / boolean | false |
| variant | 造型 | circle / round / line / tonal | circle |
| size | 尺寸档位；省略时见跨端说明 | sm / md / lg | undefined |
| disabled | 禁用；表单禁用也阻止交互 | boolean | false |
| readonly | 只读；仍可聚焦与通知 click，不切换 | boolean | false |
| loading | 加载中；禁止 click 和切换 | boolean | false |
| before-change | 切换拦截器，不是事件 | (nextValue: SwitchValue) => boolean / void / Promise<boolean / void> | — |
| checked-text | 选中文案 | string | — |
| unchecked-text | 未选中文案 | string | — |
| checked-color | 选中轨道颜色 | string | — |
| unchecked-color | 未选中轨道颜色 | string | — |
| loading-color | 加载图标颜色 | string | — |
| ripple | 点击波纹 | boolean | true |
| handle-elevation | 滑块阴影，true 等级 2，数字取整数并限制 0～24 | boolean / number | true |

before-change 返回 false、抛错或拒绝 Promise 均取消切换；其他正常完成允许切换。只有 Promise 等待期间自动 loading，重复输入被阻止。
等待期间卸载、KeepAlive 停用、值被外部更新、禁用/只读/loading 状态改变时，旧结果失效。
受控模式仅发送更新请求；父级更新 model-value 后才改变选中状态。省略 model-value 时使用内部状态。

### Events

| 事件 | 参数与时机 |
| --- | --- |
| click | (event: Event)，允许点击时，拦截前 |
| update:model-value | (nextValue: SwitchValue)，允许切换后，先于 change |
| change | (nextValue: SwitchValue, event: Event)，每次提交一次 |
| focus | (event: FocusEvent)，获得焦点 |
| blur | (event: FocusEvent)，失去焦点 |

支持 Enter、Space；按键长按重复不重复切换。disabled/loading 不触发 click 或值变化；readonly 可通知 click，但不执行拦截器。
外部 model-value 更新不会额外触发 change。

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| checked | 选中文案，优先于 checked-text；line 与 sm 不展示 | — |
| unchecked | 未选中文案，优先于 unchecked-text；line 与 sm 不展示 | — |
| checked-icon | 选中滑块图标，loading 时被加载图标替代 | — |
| unchecked-icon | 未选中滑块图标，loading 时被加载图标替代 | — |

### Methods

无公开方法。

### 跨端说明

组件属性、事件参数和插槽一致。Cedar 省略 size 时继承表单／全局尺寸（xs/sm 映射 sm，lg/xl 映射 lg）；Maple 回退 md。两端都继承表单禁用状态；Maple 还继承 Form 的 readonly，Cedar 仅使用组件 readonly。显式设置 size 和 readonly 可对齐独立示例行为；表单集成仍由各端适配。
<!-- same-source-api:end -->

### 类型

SwitchProps、SwitchVariant、SwitchSize、SwitchValue、SwitchBeforeChange、SwitchInstance 均由根入口及组件入口导出。

### 样式变量

| Token（Maple 使用 --mp-，Cedar 使用 --c-） | 默认值 |
| --- | --- |
| --mp-switch-width / height / handle-size | 40px / 24px / 16px |
| --mp-switch-size-sm-scale / size-lg-scale | .8 / 1.2 |
| --mp-switch-tonal-width / tonal-height / tonal-handle-size | 52px / 32px / 24px |
| --mp-switch-line-height / line-handle-size | 12px / 20px |
| --mp-switch-hit-area | 0px，点击区域向外扩展量，不改变布局 |
| --mp-switch-track-background / track-active-background | 中性色 / 主题色 |
| --mp-switch-handle-background / handle-color | 白色 / 主题色 |
| --mp-switch-disabled-opacity | .5 |
| --mp-switch-round-radius / gap | 4px / 4px |

完整可调变量见 style/token.less；旧版各端 Switch 几何 token 不保证保留。

## 迁移

Maple standard → line；不传 variant 现在使用 circle。两端统一四变体，不将 standard 保留为别名。
移除 lazy-change；before-change 从 (value, change) 回调改为返回值/Promise，应用不再手动调用 change。
Maple change 补齐第二个原始事件参数；checked-color/unchecked-color 统一控制轨道，滑块颜色通过 token 定制。

### 颜色变量与 tonal 前景迁移

| 变量后缀（--mp-switch-） | system 默认角色 | 职责 |
| --- | --- | --- |
| track-background | content-secondary | 普通未选中实心轨道 |
| track-active-background | content-brand | 选中轨道及键盘焦点环 |
| track-error-background | content-danger | 可交互错误轨道及 tonal 错误边框 |
| handle-background | surface-default | 普通／选中／错误滑块底色 |
| handle-color | content-brand | 普通／选中／错误滑块图标色 |
| text-color | surface-default | 实心轨道上的文字色 |
| tonal-track-background | surface-muted | tonal 未选中轨道底色 |
| tonal-border-color | content-secondary | tonal 未选中边框及滑块底色 |
| tonal-text-color | content-secondary | 新增：tonal 未选中轨道文字 |
| tonal-handle-color | surface-default | 新增：tonal 未选中滑块图标 |

默认值引用对应 system 角色，例如 var(--mp-sys-color-content-secondary)。tonal 未选中时使用 tonal-text-color / tonal-handle-color；需要全变体定制时请同时覆盖普通和 tonal 前景。可交互错误态使用普通文字／滑块配对，disabled / loading 抑制错误色。自定义轨道颜色需自行验证前景对比。阴影、尺寸及动效不在本批颜色契约中。

### 主题名与造型名

当前主题入口为 Themes.default.light / dark 与 Themes.maple.light / dark。Switch 的 tonal 是造型，不是主题；公开变体与八项专用变量统一使用 tonal 命名，不保留旧名称别名。

### 动效变量

内置动效遵循 `prefers-reduced-motion: reduce`；减少动效不会阻止加载状态或关闭事件更新。

| Token | Default |
| --- | --- |
| `--mp-switch-loading-duration` | `1s` |
