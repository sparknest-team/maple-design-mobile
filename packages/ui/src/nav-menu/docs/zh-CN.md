# NavMenu 导航菜单

移动端提供横向筛选入口，支持 NavMenu / NavMenuItem、独立选中值、标题跟随、插槽和受控状态；不提供桌面侧栏、折叠导航、悬停展开或“更多”收纳。

## 基础示例

### 横向筛选栏

分类使用纵向选项，地区横向平铺；普通面板默认通栏。更多筛选通过 `popup-layout="full"` 撑满筛选栏下方可视区域，自定义内容负责草稿、应用、重置及固定底部操作区。

```demo
../example/demos/basic.vue
```

## 布局与排列

### 长内容与固定操作区

普通面板限制在剩余可视区域内，长列表在面板内滚动；铺满面板的正文独立滚动，底部按钮始终保留。展开时锁定背景滚动。

```demo
../example/demos/long-content.vue
```

## 数据与状态控制

### 受控状态与禁用

服务端渲染时，初始展开的菜单项会输出面板，支持分组和独立使用。入口通过 `aria-controls` 关联已创建的面板。使用默认 body 容器时，服务端页面需包含 Vue 输出到 body 的 Teleport 内容。

```demo
../example/demos/controlled.vue
```

普通 v-model 保存每个 Item 独立的筛选值；v-model:open 控制面板展开。更新事件只是请求，受控父级必须接收更新；父级拒绝关闭时面板保持展开。非受控入口同一时间只展开一个，切换入口不清空其他值或已挂载插槽内容。关闭不会自动应用或重置表单。

使用 content 插槽时，自定义面板的无障碍名称跟随入口的名称；入口可通过 aria-label 或 aria-labelledby 指定名称。请确保自定义入口具有有意义的名称。

默认标题跟随匹配选项，无匹配时使用 label；label 插槽可固定标题。highlight 只覆盖视觉强调，打开面板不会让筛选自动生效。需要根级业务单选时，为 Item 设置唯一 name，并使用根 active-item。

## 交互与控制

### 面板状态与关闭

```demo
../example/demos/panel-state.vue
```

### 两端对应关系

两端面板均在首次展开时创建，关闭或切换入口后默认保留挂载，内部草稿和分支展开状态继续保留。设置 `unmount-on-close` 后，在关闭过渡结束时卸载面板；再次展开会重新创建内部组件，但不会清空 Item 自身的选中值。草稿提交、重置和筛选生效时机由业务决定。

根 `close()` 只请求关闭 Item 面板并恢复入口焦点，不改变选中值、active-item 或桌面导航树的 expanded-keys。受控 open 拒绝更新时仍保持展开。当 `open` 为真时，添加 `#content` 或传入选项即可展开。移除 `#content` 后，有选项时显示选项列表，选项为空时收起面板。KeepAlive 停用期间隐藏面板并请求关闭，重新激活时仍以受控值为准。

Item 的选中值、展开状态、事件、插槽上下文及 `select/close/setOpen` 方法保持一致。两端根菜单都提供 `close/resize/setActiveItem`。`name` 必须在当前菜单内唯一，动态修改后会释放旧名称；同一次更新允许交换名称或在重排时复用旧名称，以更新完成后的名称检查重复。纵向选项会在初始值、受控值或 options 更新时展开当前值的可用祖先路径；用户仍可手动收起分支。

| 能力 | Cedar | Maple |
| --- | --- | --- |
| 根菜单 | options 导航树或 Item 入口；默认 vertical | 仅 Item 筛选栏；默认 horizontal |
| popup-layout | dropdown（默认）/ full-width / full-height / full | full-width（默认）/ full |
| 面板起点 | 当前入口底边 | 整个筛选栏底边；独立 Item 使用自身底边 |
| 触发与定位 | trigger / placement | 固定点击向下展开 |
| 遮罩与滚动 | 非模态，不锁背景滚动 | 根级 overlay / overlay-closable / lock-scroll / esc-to-close / z-index |
| 主题 | theme 可覆盖 | 跟随全局主题，无 theme 属性 |
| 导航树专用方法 | showOption / scrollTo / setCollapsed | — |

两端 `NavMenuPopupLayout` 分别导出本端支持的值域；Maple 的 `NavMenuMode` 仅为 horizontal，`options-mode` 仍支持两个方向。入口 default 插槽替换入口内部内容，移动端位于原生按钮中，请使用文本、图标等非交互内容；表单和操作按钮放在 content 插槽。

## API

### NavMenu Props

| 属性                              | 说明                                                                                     | 默认值           |
| --------------------------------- | ---------------------------------------------------------------------------------------- | ---------------- |
| mode                              | 移动端仅 horizontal                                                                      | horizontal       |
| active-item | 具名入口的受控激活项，支持 v-model:active-item | `undefined` |
| default-active-item | 具名入口的非受控初始激活项 | `null` |
| size                              | xs / sm / md / lg / xl                                                                   | md               |
| disabled                          | 禁用所有入口                                                                             | false            |
| popup-container                   | 浮层挂载容器；false 原地渲染；不改变视口布局参照，祖先 transform 可能改变 fixed 定位基准 | body             |
| popup-class                       | 面板附加类名                                                                             | —                |
| overlay                           | 显示背景遮罩；false 保留透明的点击关闭区域                                               | true             |
| overlay-closable                  | 点击遮罩区域关闭                                                                         | true             |
| lock-scroll                       | 展开及关闭过渡期间锁定背景滚动                                                           | true             |
| esc-to-close                      | Escape 关闭当前面板                                                                      | true             |
| z-index                           | 遮罩与面板的层级                                                                         | 自动分配         |

事件：update:active-item。方法：close()、resize()、setActiveItem(key)。默认插槽放置 mp-nav-menu-item；也可使用 NavMenu.Item。

### NavMenuItem Props

| 属性                          | 说明                                                                                                                         | 默认值            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| name                          | 根级业务激活项的唯一标识；省略时各筛选独立高亮                                                                               | —                 |
| label                         | 未匹配选项时的入口标题                                                                                                       | —                 |
| options | 菜单选项，结构与 NavMenu 一致 | `[]` |
| field-names | 选项字段映射，与 NavMenu 一致 | `undefined` |
| model-value | 受控选中 key，支持字符串、数字和 null，支持 v-model | `undefined` |
| default-value | 非受控初始选中 key，支持字符串、数字和 null，仅初始化时读取 | `null` |
| open | 受控展开状态，支持 v-model:open | `undefined` |
| default-open | 非受控初始展开状态。首次渲染时多个可展开条目同时设置该属性，优先展开最先注册的一项。 | `false` |
| highlight                     | 视觉强调覆盖，省略时跟随业务 active                                                                                          | undefined         |
| disabled                      | 禁用入口，同时遵循父菜单                                                                                                     | undefined             |
| hide-on-select                | 调用 select 后关闭面板                                                                                                       | true              |
| unmount-on-close | 关闭过渡结束后卸载面板；默认保留首次展开后的内容 | false |
| popup-layout                  | full-width：通栏，内容自适应高度；full：宽高占满筛选栏下方可视区域。均从整个筛选栏底边向下展开，不自动翻转，宽度不随入口变化 | full-width        |
| popup-style                   | 自定义面板样式                                                                                                               | —                 |
| popup-container | 浮层挂载容器；省略时跟随父菜单 | 跟随父菜单 |
| popup-class | 浮层附加类名；省略时跟随父菜单 | 跟随父菜单 |
| options-mode                  | 面板内选项的 vertical / horizontal 排列                                                                                      | vertical          |

独立使用 NavMenuItem 时，以自身底边作为面板起点。触发固定为点击，入口不足时横向滚动。移动端不提供 placement/trigger、dropdown 或侧向 full-height 布局。

事件：update:model-value、update:open、select(key, option, event)、click(event)。方法：select(key, event?)、close()、setOpen(open)。

插槽：default（入口内部内容）、label、icon、content（替换默认选项面板）、option-label、option-icon、option-extra。入口与 content 插槽收到 `{ modelValue, selectedOption, active, open, select, close }`；选项插槽收到 `{ option, active, expanded, level }`。

## Types

NavMenuKey 为 string | number。NavMenuOption 使用 key、label、icon、extra、children、disabled、show、props，type 为 item/group/divider。label/icon/extra 支持 VNode 或上下文渲染函数。数字 0 和空字符串是有效 key；普通项缺少 key 或重复 key 抛错。禁用向子项继承，隐藏项及其子树不展示。所有类型从 @maple-design/ui-vue 导出。

## 阅读方向与键盘交互

NavMenu 继承最近的原生 `dir`，支持动态切换和局部覆盖。导航栏左右键按阅读方向移动焦点，Home/End 聚焦首尾可用项；下键打开选项面板，Escape 关闭并返回触发项。选项面板的水平按键随方向调整，上下键保持原有顺序。Teleport 面板继承触发项的方向，切换方向不会清空筛选值或选中项。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-nav-menu-active-color` | `var(--mp-sys-color-action-primary)` | `color`, `outline` |
| `--mp-nav-menu-arrow-size` | `6px` | `height`, `width` |
| `--mp-nav-menu-background` | `var(--mp-sys-color-surface-overlay)` | `background` |
| `--mp-nav-menu-border-color` | `var(--mp-sys-color-border-default)` | `border-top` |
| `--mp-nav-menu-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-nav-menu-disabled-color` | `var(--mp-color-text-disabled)` | `color` |
| `--mp-nav-menu-font-size` | `var(--mp-font-size-md)` | `font-size` |
| `--mp-nav-menu-gap` | `8px` | `gap` |
| `--mp-nav-menu-height` | `48px` | `min-height` |
| `--mp-nav-menu-padding` | `12px 16px` | `padding` |
| `--mp-nav-menu-panel-padding` | `12px` | `padding`, `padding-bottom` |
| `--mp-nav-menu-size-lg-height` | `56px` | `min-height` |
| `--mp-nav-menu-size-sm-height` | `40px` | `min-height` |
| `--mp-nav-menu-size-xl-height` | `64px` | `min-height` |
| `--mp-nav-menu-size-xs-height` | `32px` | `min-height` |
| `--mp-nav-menu-transition-duration` | `200ms` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-nav-menu-active-color: var(--mp-sys-color-action-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
