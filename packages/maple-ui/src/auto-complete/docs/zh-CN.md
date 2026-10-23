# AutoComplete 自动补全

允许自由输入的单行文本框，候选只是快捷填写方式。两端独立维护同源主体、Props、Menu 和样式；触控与 hover 差异由本地 Input 处理，没有跨库运行时或 platform 配置。

shouldOpen 控制是否允许展开，filterOption 控制逐项过滤；它们不是同一个设置。没有候选、禁用或只读时不会打开。自动补全不提供 list/picker 展示。

## 案例

### 基础输入与选择

```demo
../example/demos/zh-CN/basic.vue
```

### 五档尺寸

```demo
../example/demos/zh-CN/size.vue
```

### 禁用与只读

```demo
../example/demos/zh-CN/state.vue
```

### 展开条件与过滤

```demo
../example/demos/zh-CN/opening-policy.vue
```

### 大小写匹配

```demo
../example/demos/zh-CN/strict.vue
```

### 异步建议

```demo
../example/demos/zh-CN/remote.vue
```

### 自定义字段与内容

```demo
../example/demos/zh-CN/footer.vue
```

### 虚拟列表

```demo
../example/demos/zh-CN/virtual-list.vue
```

### 外观与浮动提示

```demo
../example/demos/zh-CN/decorator.vue
```

### 键盘与无障碍

```demo
../example/demos/zh-CN/accessibility.vue
```

选项分组与 Menu 使用一致的间距逻辑：标题行高 20px，上下各 4px 留白（总高 28px）；后续分组前额外留 8px，首组不添加组间距。标题与选项文字左对齐；AutoComplete 的标题缩进跟随其选项水平 padding 配置。

### 分组间距

```demo
../example/demos/zh-CN/group-spacing.vue
```

### 外观组合

适用于允许自由输入的候选提示。调整变体、尺寸，用相同数据观察变化。内容保持一致，便于比较不同设置的实际效果。

```demo
../example/demos/appearance-lab.vue
```

### 交互状态切换

适用于允许自由输入的候选提示。调整禁用、只读、错误反馈，用相同数据观察变化。控制区始终可用，可以随时恢复编辑；错误外观本身不会触发表单校验。

```demo
../example/demos/state-lab.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/zh-CN/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` | 受控文本值 | `string` | `—` |
| `default-value` | 非受控初始文本 | `string` | `''` |
| `options` | 候选；支持分组，value 唯一，选择后转为字符串 | `(AutoCompleteOption \| SelectOptionGroup)[]` | `[]` |
| `field-names` | 映射 value、label、disabled 等字段 | `AutoCompleteFieldNames` | `—` |
| `should-open` | 允许展开的条件，不负责过滤候选 | `(value: string) => boolean` | `value.length > 0` |
| `filter-option` | 按标签过滤；false 用于远程筛选 | `AutoCompleteFilterOption` | `true` |
| `strict` | 内置过滤是否区分大小写 | `boolean` | `false` |
| `popup-container` | 弹层挂载容器，与 Trigger 一致 | `PopupContainer` | `—` |
| `trigger-props` | 弹层配置；不能覆盖内部 open / disabled / 容器优先级 | `TriggerProps` | `—` |
| `virtual-list-props` | 传入后启用虚拟列表 | `VirtualListProps` | `—` |
| `size` | 五档尺寸；未设置时继承 Group / Form / 全局配置 | `xs \| sm \| md \| lg \| xl` | `md` |
| `variant` | 输入外观；未设置时继承 Group | `filled \| outline \| standard` | `outline` |
| `disabled` | 禁用；未设置时继承，显式 false 覆盖 | `boolean` | `undefined` |
| `readonly` | 只读，可聚焦复制，不展开候选 | `boolean` | `undefined` |
| `error` | 错误状态；未设置时继承 FormItem | `boolean` | `undefined` |
| `clearable` | 允许清除可编辑的非空值 | `boolean` | `false` |
| `placeholder` | 占位文字或浮动提示内容 | `string` | `—` |
| `hint` | 启用 Input 的浮动提示 | `boolean` | `undefined` |
| `line` | 显示边框或底线 | `boolean` | `true` |
| `text-color` | 实例文字颜色 | `string` | `—` |
| `focus-color` | 实例聚焦颜色 | `string` | `—` |
| `blur-color` | 实例失焦提示颜色 | `string` | `—` |
| `enterkeyhint` | 移动虚拟键盘回车提示 | `InputHTMLAttributes['enterKeyHint']` | `—` |
| `aria-label` | 输入框可访问名称 | `string` | `—` |
| `max-length` | 输入与候选选择使用相同的截断规则 | `number \| { length: number; errorOnly?: boolean }` | `0` |
| `show-word-limit` | 显示字数统计 | `boolean` | `false` |
| `word-length` | 自定义长度计算 | `(value: string) => number` | `—` |
| `word-slice` | 自定义截断 | `(value: string, maxLength: number) => string` | `—` |
| `input-attrs` | 原生 input 属性，combobox 状态由组件维护 | `Record<string, unknown>` | `—` |

### Events

| 事件 | 参数 |
| --- | --- |
| `update:model-value` | `value: string` |
| `input / search / change` | `value: string, event: Event` |
| `select` | `value: string, option: AutoCompleteOptionInfo, event: Event` |
| `clear` | `event: Event` |
| `focus / blur` | `event: FocusEvent` |
| `dropdown-scroll / dropdown-reach-bottom` | `event: Event` |

输入顺序：`input → update:modelValue → search`；选择：`update:modelValue → select → change`；清除：`clear → input → update:modelValue → change`。同值选择只发 select。change 表示失焦、Enter 或候选选择产生的提交。Input 负责输入、焦点与清除的 Form 通知，AutoComplete 仅对候选提交通知一次。选择也遵守 maxLength；select 的 value 是最终提交字符串，option.value 保留原始候选。clear 参数为事件，不再是字符串。

### Slots

| 插槽 | 说明 |
| --- | --- |
| `option` | `{ data: AutoCompleteOptionInfo }` |
| `footer` | 菜单底部 |
| `prefix / suffix` | 输入框前后缀 |
| `clear-icon` | `{ clear }` |

### Methods

`focus()` / `blur()`

label 使用文本；复杂候选通过 option 插槽或选项 render 实现，不保留旧的函数/VNode label 写法。方向键浏览、Enter 选择、Escape 关闭，Tab 保留原生焦点导航。使用 Vue useId 保证 SSR 标识稳定。

## 类型定义

```ts
import type { AutoCompleteProps, AutoCompleteInstance, AutoCompleteOption, AutoCompleteOptionData,
  AutoCompleteOptionInfo, AutoCompleteFieldNames, AutoCompleteFilterOption } from '@maplejs/maple-ui'
```

## 样式变量

| Token | 默认值 |
| --- | --- |
| `--mp-auto-complete-popup-max-height` | `200px` |
| `--mp-auto-complete-popup-bg` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-popup-border-radius` | `var(--mp-sys-radius-md)` |
| `--mp-auto-complete-popup-padding-vertical` | `var(--mp-sys-space-2)` |
| `--mp-auto-complete-popup-font-size` | `var(--mp-sys-font-size-md)` |
| `--mp-auto-complete-popup-border-color` | `var(--mp-sys-color-border-default)` |
| `--mp-auto-complete-popup-box-shadow` | `0 4px 10px rgba(0, 0, 0, 0.1)` |
| `--mp-auto-complete-option-height` | `36px` |
| `--mp-auto-complete-option-font-weight-selected` | `var(--mp-sys-font-weight-medium)` |
| `--mp-auto-complete-option-padding-horizontal` | `var(--mp-sys-space-5)` |
| `--mp-auto-complete-option-bg-default` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-option-bg-hover` | `var(--mp-sys-color-state-hover)` |
| `--mp-auto-complete-option-bg-selected` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-option-bg-disabled` | `var(--mp-sys-color-surface-overlay)` |
| `--mp-auto-complete-option-text-color-default` | `var(--mp-sys-color-content-primary)` |
| `--mp-auto-complete-option-text-color-hover` | `var(--mp-sys-color-content-primary)` |
| `--mp-auto-complete-option-text-color-selected` | `var(--mp-sys-color-content-primary)` |
| `--mp-auto-complete-option-text-color-disabled` | `var(--mp-sys-color-content-disabled)` |

清空不发 search，也不重新展开候选面板，包括从键盘聚焦的清空按钮回到输入框。受控值由父级决定：连续被拒绝的清空或选择仍各自发出 change 提议；已接受的候选选择只通知 Form 一次。

### Form 字段展示与确认

本组件支持 `presentation`，字段 > FormItem > Form 逐层继承；未指定时为 `inline`，保留原有交互。支持值：`inline / popup`。其他编辑展示使用 Cell 入口和一份草稿，确认后才更新 v-model；取消、重置或启用 readPretty 丢弃草稿。

Maple 使用 presentation="popup" 点击值区域打开编辑面板；inline 直接编辑。 readPretty 为纯阅读属性，与 readonly、disabled 独立。

`before-commit(value, { previousValue, signal })` 可拦截弹层保存；FormItem 先校验候选值，失败保持编辑。`open / default-open / update:open` 控制编辑层。`#read="{ value, text }"` 可自定义阅读内容。集中示例见 Form 的“各类字段统一展示”。

`read-pretty` 为独立布尔属性，与 `readonly`、`disabled` 同级；字段 > FormItem > Form 继承，显式 `false` 覆盖父级。默认 `false`。纯阅读不显示编辑器。

异步搜索时应在新请求开始时清除旧候选，并只采纳当前搜索词的最后一次响应。popup 内方向键与 Enter 只操作当前候选，保存由底部确认按钮完成。校验失败保留草稿；确认期间锁定编辑和关闭，表单重置会关闭 popup 并中止提交。请求归属应在关闭和重置时失效，完整示例见 Form 的“各类字段统一展示”。
