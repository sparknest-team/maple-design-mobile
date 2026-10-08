# Collapse

可以折叠 / 展开的内容区域。示例与 Cedar Design Web 保持一致，布局按移动端换行。

## 案例

### 基础用法

用于将复杂的内容区域分组和隐藏，可折叠或展开。默认可以展开多个面板。

```demo
../example/demos/basic.vue
```

### 手风琴模式

通过 `accordion` 开启手风琴模式，同时只能打开一个面板。手风琴模式下 `activeNames` 仍为数组，最多包含一项。

```demo
../example/demos/accordion.vue
```

### 禁用

通过 `disabled` 禁用面板。

```demo
../example/demos/disabled.vue
```

### 嵌套面板

面板多层嵌套。

```demo
../example/demos/nested.vue
```

### 无边框模式

通过设置 `bordered="false"` 隐藏边框。

```demo
../example/demos/border-less.vue
```

### 分割线

通过 `divider` 控制面板之间的分割线。

```demo
../example/demos/divider.vue
```

### 展开间距

通过 `offset` 控制展开面板之间的间距。

```demo
../example/demos/offset.vue
```

### 额外节点

通过 `extra` 可以设置额外节点。点击 `extra` 区域不会触发展开。

```demo
../example/demos/extra.vue
```

### 展开图标

为展开项自定义展开图标。父级 `expand-icon` 插槽会下发给未自定义图标的子项。

```demo
../example/demos/expand-icon.vue
```

### 自定义样式

自定义面板样式。

```demo
../example/demos/custom.vue
```

### 展开图标位置

通过 `expand-icon-position` 属性设置展开图标的位置。

```demo
../example/demos/icon-position.vue
```

### 隐藏时销毁

通过设置 `destroy-on-hide` 可以让面板内容在隐藏时销毁。

```demo
../example/demos/destroy.vue
```

### 切换全部

通过 `toggleAll` 批量展开 / 收起面板。手风琴模式下不可用。

```demo
../example/demos/toggle-all.vue
```

## API

<!-- same-source-api:start -->
### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active-names | 当前展开面板的 name，支持 v-model:active-names | `(string \| number)[]` | `—` |
| default-active-names | 非受控初始展开面板 | `(string \| number)[]` | `[]` |
| accordion | 手风琴模式，同时最多展开一项 | `boolean` | `false` |
| show-expand-icon | 是否显示展开图标；未设置时由子项决定 | `boolean` | `—` |
| expand-icon-position | 展开图标位置 | `'left' \| 'right'` | `'left'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| divider | 是否显示面板分割线 | `boolean` | `true` |
| offset | 展开面板是否显示间距 | `boolean` | `false` |
| destroy-on-hide | 是否在隐藏时销毁内容 | `boolean` | `false` |

### Events

| Event | Description | Arguments |
| --- | --- | --- |
| update:active-names | 请求更新展开面板 | `(string \| number)[]` |
| change | 展开面板变化时触发 | `(string \| number)[]`, `Event` |

### Slots

| Slot | Description | Scope |
| --- | --- | --- |
| default | 面板列表 | `—` |

### Methods

| Method | Description |
| --- | --- |
| toggleAll | 开启或关闭所有面板（手风琴模式下无效） |

<!-- same-source-api:end -->


父级可通过 `expand-icon` 插槽下发默认展开图标，作用域为 `active`、`disabled`、`position`。该插槽由子项读取，不在根节点渲染。

#### CollapseToggleAllOptions

| 参数 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expand | `'inverse'` 切换全部；`boolean` 控制全部展开或收起 | `'inverse' \| boolean` | `—` |
| skipDisabled | 是否跳过禁用面板 | `boolean` | `false` |

### `<collapse-item>` Props

| 参数名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name **(必填)** | 面板唯一标识，对应 `activeNames` 中的值 | `string \| number` | `—` |
| title | 面板的标题 | `string` | `—` |
| disabled | 是否禁用 | `boolean` | `false` |
| show-expand-icon | 是否显示展开图标 | `boolean` | `true` |
| destroy-on-hide | 是否在隐藏时销毁内容 | `boolean` | `false` |

### `<collapse-item>` Slots

| 插槽名 | 描述 | 参数 |
| --- | --- | --- |
| title | 面板的标题 | `—` |
| extra | 额外内容 | `—` |
| expand-icon | 展开图标 | active: `boolean`<br>disabled: `boolean`<br>position: `'left' \| 'right'` |
| default | 面板内容 | `—` |

### 类型定义

组件导出以下类型定义。`Collapse.Item` 与 `mp-collapse-item` 为同一组件，`app.use(Collapse)` 会同时注册两者。

```ts
import type { CollapseInstance, CollapseToggleAllOptions, ExpandIconPosition } from '@maplejs/maple-ui'
```

## 颜色变量

Collapse 的公开颜色变量使用 system 语义作为默认值，Maple 与 Cedar 保持一致：

| 变量 | 默认语义 |
| --- | --- |
| `--mp-collapse-border-color` | `--mp-sys-color-border-default` |
| `--mp-collapse-title-bg` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-active` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-bg-disabled` | `--mp-sys-color-surface-default` |
| `--mp-collapse-title-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-title-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-text-color` | `--mp-sys-color-content-primary` |
| `--mp-collapse-content-text-color-disabled` | `--mp-sys-color-content-disabled` |
| `--mp-collapse-content-bg` | `--mp-sys-color-surface-muted` |
| `--mp-collapse-expand-icon` | `var(--mp-sys-color-content-secondary)` |
| `--mp-collapse-item-border-color` | `--mp-sys-color-border-default` |

### 减少动态效果

内置 CSS 过渡遵循 `prefers-reduced-motion: reduce`。关闭过渡不改变最终显隐、选中／展开状态及事件语义；插槽内自定义动画由应用自行控制。
