# Shared Prop Naming — Migration Guide

BREAKING。无 alias。公共 API 以 Cedar（PC）为准；Cedar 内部分歧已先收口。

## 通用

| 旧 | 新 | 说明 |
| --- | --- | --- |
| `v-model:show` / `popupVisible` / `visible`（浮层开合） | `v-model:open` | 另有 `defaultOpen`、`update:open`、`openChange`；**内容显隐用 `show`，浮层开合用 `open`** |
| `teleport` | `popupContainer` | |
| `overlay` / `overlayClass` / `overlayStyle` | `mask` / `maskClass` / `maskStyle` | |
| `closeOnClickOverlay` | `maskClosable` | |
| `closeOnKeyEscape` | `escToClose` | |
| `onBeforeChange` / `onBeforeClose`（拦截器 prop） | `beforeChange` / `beforeClose` | `on*` 留给事件 |
| `DrawerConfig.onBeforeOk` / `onBeforeCancel` / `onBeforeOpen` / `onBeforeClose` | `beforeOk` / `beforeCancel` / `beforeOpen` / `beforeClose` | 与声明式 Props 同名；`onOk` / `onCancel` / `onOpen` / `onClose` 仍为事件回调 |
| `Tag.visible` / `defaultVisible` / `v-model:visible` | `show` / `defaultShow` / `v-model:show` | 内容显隐；Badge.`show` 本来就是 show，不变 |
| `maxlength`（字符） | `maxLength` | |
| `autoplay` | `autoPlay` | |
| `position`（浮层方位，Trigger 族） | `placement` | Badge 角标 position 除外 |
| `labelKey` / `valueKey` / `childrenKey` | `fieldNames` | `{ label, value, children }`；Select/Cascader 对象值的键也统一用 `fieldNames.value`（已移除独立 `valueKey` prop） |
| `allowedDates`（true=可选） | `disabledDate`（true=禁用） | **回调需取反** |
| `allowedTime`（true=可选） | `disabledTime`（true=禁用） | Maple 仍为 `{ hours/minutes/seconds: (n)=>boolean }`；Cedar DatePicker 为 `(date)=>DisabledTimeProps` |

不含：`Badge.show`（内容角标显隐，本就用 show）。

## Upload / Uploader

| 旧（Cedar） | 新 |
| --- | --- |
| `fileList` / `v-model:file-list` | `modelValue` / `v-model` |
| `defaultFileList` | `defaultValue` |
| — | `@change` / `onChange` 保留 |

Maple Uploader：`maxlength`（文件数）→ `maxFiles`。

## Switch（Maple → Cedar）

| 旧 | 新 |
| --- | --- |
| `activeValue` / `inactiveValue` | `checkedValue` / `uncheckedValue` |
| `color` / `inactiveColor` | `checkedColor` / `uncheckedColor` |

## Progress（Maple → Cedar）

| 旧 | 新 |
| --- | --- |
| `mode="linear"` | `mode="line"` |
| `lineWidth` | `strokeWidth` |
| `value` | `percent` |
| `label` | `showText` |
| `type`（语义色） | `status` |

## Avatar（Maple → Cedar）

| 旧 | 新 |
| --- | --- |
| `src` | `imageUrl` |
| `fit` | `objectFit` |
| `round` | `shape="circle"\|"square"` |

## Carousel（Maple → Cedar）

| 旧 | 新 |
| --- | --- |
| `autoplay` | `autoPlay` |
| `duration` | `moveSpeed` |
| `navigation` | `showArrow` |
| `vertical` | `direction="horizontal"\|"vertical"` |
| `initialIndex` | `defaultCurrent`（若仍并存则删除 initialIndex） |

## 其它局部

| 组件 | 旧 | 新 |
| --- | --- | --- |
| Menu `position` / `popupVisible` | `placement` / `open` | 已删双 API |
| Rate | `half` | `allowHalf` |
| BackTop | `visibilityHeight` / `target` | `visibleHeight` / `targetContainer` |
| Watermark | `offsetX/Y` / `gapX/Y` / `opacity` | `offset` / `gap` / `alpha` |
| Result | `description` / `type` / `error` | `subtitle` / `status` / `danger` |
| Empty | `imageSrc` | `imageUrl` |
| Badge 布局 | `type` | `mode` |
| Link | `type` | `status` |
| Loading | `description` | `tip` |
| Image Preview | `teleport` 等 | `popupContainer` / `escToClose` / `closable` |
| Select/Cascader `valueKey`（Cedar） | 用 `fieldNames.value` | 已删公开 valueKey |

## `disabledDate` 迁移示例

```js
// 旧：奇数日可选
const allowedDates = (val) => parseInt(val.split('-')[2], 10) % 2 === 1

// 新：偶数日禁用（可选集不变）
const disabledDate = (val) => parseInt(val.split('-')[2], 10) % 2 === 0
```

## Codemod 草案（jscodeshift / 手工正则思路）

1. 模板：`v-model:show` → `v-model:open`（排除 Badge、Tag；二者内容显隐继续用 `show`）
2. 模板：`v-model:visible` on Dialog/Drawer → `v-model:open`；Tag 的 `v-model:visible` → `v-model:show`
3. 属性：`teleport=` → `popup-container=`；`close-on-click-overlay` → `mask-closable`
4. Upload：`v-model:file-list` → `v-model`；`:file-list` → `:model-value`
5. Switch：`active-value` → `checked-value` 等
6. DrawerConfig：`onBeforeOk` / `onBeforeCancel` / `onBeforeOpen` / `onBeforeClose` → `beforeOk` / `beforeCancel` / `beforeOpen` / `beforeClose`
7. 日期：重命名 prop 后**人工**检查回调极性

不建议对 `allowedDates` 函数体做盲目 AST 取反；优先迁移表 + 单测。
