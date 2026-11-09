# SafeArea 安全区

为贴近屏幕边缘的内容预留空间，避免被刘海、圆角或底部手势区域遮挡。浏览器通常自动提供安全区；App WebView 也可以传入自己的边距。

## 什么时候用

| 页面情况                           | 建议                                         |
| ---------------------------------- | -------------------------------------------- |
| 普通页面，没有贴边内容             | 通常无需额外设置                             |
| 底部操作栏、全屏内容靠近设备边缘   | 用 SafeArea 包裹需要避让的区域，指定 `edges` |
| Popup、TabBar 等组件已经开启安全区 | 使用组件自身的开关，避免外层再次添加相同留白 |
| App 已经为 WebView 避让            | 显式传入对应边的 `0`                         |

## 基础示例

### 底部留白与嵌套

先看最常见的底部操作栏。斜纹表示安全区，修改数值可在桌面浏览器中观察效果；关闭嵌套保护可对比重复留白。

```demo
../example/demos/basic.vue
```

## 页面与组件组合

### App 页面模拟

选择竖屏、横屏、Duo 左右不对称模拟或四边归零，观察滚动内容、固定提交栏和字段弹层。四边可独立输入 0–120 CSS px；横屏默认缩放到可用宽度，也可切换原尺寸查看。

页面避让上、左、右，提交栏只避让底部；嵌套容器不重复增加留白。测量区显示实际 padding，弹层数值包含其原有内容间距。表单状态、上传和日期等附加控制放在“更多表单选项”中。

```demo
../example/demos/app-form.vue
```

### 组件联动

选择一个贴边组件，独立调整底部、左侧和右侧留白，再打开或操作它。需要核对具体数值时，展开测量结果。所有模拟值只作用于当前示例。

```demo
../example/demos/affected-components.vue
```

### Duo 不对称安全区

Duo 外屏横竖屏、内屏横竖屏和左右分屏预设会同时切换视口与四边模拟值；工具栏展开 / 收起切换小 / 大视口高度。左右避让按钮可在当前视口上交换不对称边距，归零只清空安全区。

尺寸采用 WebKit 公布的 Safari 27.1 CSS 视口：外屏竖屏 382 × 580/618，外屏横屏 594 × 368/406，内屏竖屏 669 × 867/902，内屏横屏 951 × 585/620，分屏每窗 385 × 571/609。它们不是设备物理屏幕尺寸。安全区值仅用于独立压力测试，不是这些视口对应的实测 inset；Safari 已避让的侧栏不要重复补偿。四边必须独立读取；宿主在折叠、展开、旋转、分屏及安全区变化后更新相对 WebView 内容视口的剩余边距，已经避让的边传 `0`。

Safari 与原生 App 的可用视口可能不同，不要把原生侧边栏宽度直接补到网页上。保留浏览器 `env()` 默认行为，宿主有准确数据时才覆盖。屏幕中间的折叠区域需要单独的分段布局，不能用四边 inset 表达。

参考：[WebKit 网页适配说明](https://webkit.org/blog/18486/webkit-features-for-safari-27-1/)、[苹果安全区适配说明](https://developer.apple.com/videos/play/tech-talks/111461/)。

## 在应用中使用

### 1. 开启浏览器适配

在应用 HTML 中配置视口：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

包裹需要留白的区域。默认读取浏览器 `env(safe-area-inset-*, 0px)`，无需写死某款手机的尺寸：

```vue
<mp-safe-area :edges="['bottom']">
  <mp-button status="primary" block>提交</mp-button>
</mp-safe-area>
```

按需引入时加载 `@maple-design/ui/safe-area/style`；使用自动导入 Resolver 时由工具处理样式。

### 2. App 提供边距时再覆盖

传入 WebView **内容视口仍需避让的 CSS 像素**，不是设备物理像素，也不是键盘高度。

```ts
import { SafeArea } from '@maple-design/ui'

SafeArea.setInsets({ top: 0, right: 0, bottom: 34, left: 0 })
SafeArea.setInsets(null) // 移除覆盖，恢复浏览器或继承值
```

`0` 是有效覆盖。每次调用替换目标的四边覆盖，省略的边恢复继承或浏览器值。应用适配器统一负责初始快照、旋转及页面恢复后的更新和退订；移除适配器时再清理全局覆盖。没有原生数据时保留浏览器默认值即可。

### 3. 局部容器和弹层

```vue
<mp-safe-area :edges="[]" :insets="{ top: 0, bottom: 20 }">
  <!-- 只提供局部边距，不给本层增加 padding -->
  <YourContent />
</mp-safe-area>
```

边距沿实际 DOM 继承。传送到 body 的弹层离开了局部容器，应使用根节点覆盖，或把弹层挂载到带有正确边距的 `popup-container`。也可以调用 `SafeArea.setInsets(insets, hostElement)`，只更新指定宿主；iframe 需要在自己的文档加载样式。

## 避免重复留白

- `edges`：本层给哪些边增加 padding；`[]` 表示不增加。
- `insets`：当前子树使用的有效边距；省略边继承，`0` 表示无需避让。
- `consume`：默认 `true`，已使用的边在直接元素子节点重置为 0，后代继续继承。

同一条内容路径选择一个避让位置。例如底栏已启用 `safe-area`，就不要再给外层手写相同的 padding。需要后代独立避让时才设 `consume=false`。相对视口固定定位的元素应有明确的宿主或边距，不能假设普通流祖先已经为它避让。

| 组件                                  | 开启方式                                | 行为                                 |
| ------------------------------------- | --------------------------------------- | ------------------------------------ |
| Popup                                 | `safe-area-inset-top/right/bottom/left` | 对指定边增加 padding                 |
| Picker / ActionSheet / NumberKeyboard | `safe-area`                             | 底部及左右留白转交给 Popup                 |
| TabBar / FloatingPanel                | `safe-area`                             | 增加底部及左右 padding                     |
| Fab                                   | `safe-area`                             | 按 position 避让所在角落的上下及左右安全区                     |
| 表单 popup 编辑层                     | 自动处理底部与左右边距                  | 继承实际弹层宿主，不改变草稿确认流程 |

## 常见问题

**桌面浏览器为什么没有留白？** 没有设备安全区时 `env()` 通常为 0。上方示例使用局部模拟值，便于观察。

**键盘弹出后要更新 bottom 吗？** 不要把键盘高度直接当作安全区。WebView 的 resize、overlay、输入滚动和固定操作栏需要结合宿主策略处理。

**切换主题会重置安全区吗？** 不会。主题管理外观，SafeArea 管理运行环境边距。模拟器能检查布局，系统状态栏、键盘和设备旋转仍需在实际 iOS / Android WebView 中验证。

## API

### SafeArea Props

| 属性    | 类型           | 默认值    | 说明                                 |
| ------- | -------------- | --------- | ------------------------------------ |
| edges | `SafeAreaEdge[]`<br>`SafeAreaEdge: 'left' \| 'right' \| 'bottom' \| 'top'` | `['top', 'right', 'bottom', 'left']` | 需要留白的物理边；[] 不补偿，不表示位置或展开方向 |
| insets  | SafeAreaInsets | undefined | 局部 CSS px 覆盖，0 有效，省略边继承 |
| consume | boolean        | true      | 对后代清除已消费的边                 |
| tag     | string         | div       | 容器标签                             |

默认插槽为内容，无新增事件。

`SafeArea.setInsets(insets, target?)`：insets 为 SafeAreaInsets 或 null；target 默认为当前 document.documentElement。替换该目标四边覆盖，保留目标其他 CSS；不隐式注册原生监听。SSR 无 document 时安全返回；组件 insets 可以在 SSR 中输出，避免把请求相关数据写入全局模块。数值必须有限且非负，否则抛 TypeError，并在校验全部通过前不修改 DOM。

## Types

```ts
import SafeArea from '@maple-design/ui/safe-area'
import type { SafeAreaProps, SafeAreaInstance, SafeAreaEdge, SafeAreaInsets } from '@maple-design/ui'
import type { SafeAreaProps as SubSafeAreaProps } from '@maple-design/ui/safe-area'
const options: SafeAreaProps = { edges: ['bottom'], insets: { bottom: 0 } }
SafeArea.setInsets({ bottom: 0 })
```

SafeAreaEdge 是 top/right/bottom/left 的联合类型，SafeAreaInsets 是这些边到 number 的可选映射。SafeAreaInstance 表示组件实例，没有 setInsets 实例方法；setInsets 是组件对象上的静态方法，模板 ref 上不要调用。

## CSS Variables

这些是运行环境值，不要把它们写入 Alps/Firefly 品牌主题。品牌切换使用 ThemeProvider；App 适配使用 SafeArea，两者不互相清空。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-safe-area-bottom` | `env(safe-area-inset-bottom, 0px)` | `margin-bottom`, `padding-bottom` |
| `--mp-safe-area-left` | `env(safe-area-inset-left, 0px)` | `inset-inline-end`, `margin-left`, `padding-left`, `width` |
| `--mp-safe-area-right` | `env(safe-area-inset-right, 0px)` | `inset-inline-end`, `margin-right`, `padding-right`, `width` |
| `--mp-safe-area-top` | `env(safe-area-inset-top, 0px)` | `margin-top`, `padding-top` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-safe-area-bottom: env(safe-area-inset-bottom, 0px);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
