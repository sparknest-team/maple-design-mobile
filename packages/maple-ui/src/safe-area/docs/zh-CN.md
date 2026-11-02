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

选择竖屏、横屏或四边归零，观察滚动内容、固定提交栏和字段弹层。四边可独立输入 0–120 CSS px；横屏默认缩放到可用宽度，也可切换原尺寸查看。

页面避让上、左、右，提交栏只避让底部；嵌套容器不重复增加留白。测量区显示实际 padding，弹层数值包含其原有内容间距。表单状态、上传和日期等附加控制放在“更多表单选项”中。

```demo
../example/demos/app-form.vue
```

### 组件联动

选择一个贴边组件，调整底部及左右留白，再打开或操作它。需要核对具体数值时，展开测量结果。所有模拟值只作用于当前示例。

```demo
../example/demos/affected-components.vue
```

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
| Picker / ActionSheet / NumberKeyboard | `safe-area`                             | 底部留白转交给 Popup                 |
| TabBar / FloatingPanel                | `safe-area`                             | 增加底部 padding                     |
| Fab                                   | `safe-area`                             | 调整自身底部位置                     |
| 表单 popup 编辑层                     | 自动处理底部与左右边距                  | 继承实际弹层宿主，不改变草稿确认流程 |

## 常见问题

**桌面浏览器为什么没有留白？** 没有设备安全区时 `env()` 通常为 0。上方示例使用局部模拟值，便于观察。

**键盘弹出后要更新 bottom 吗？** 不要把键盘高度直接当作安全区。WebView 的 resize、overlay、输入滚动和固定操作栏需要结合宿主策略处理。

**切换主题会重置安全区吗？** 不会。主题管理外观，SafeArea 管理运行环境边距。模拟器能检查布局，系统状态栏、键盘和设备旋转仍需在实际 iOS / Android WebView 中验证。

## API

| 属性    | 类型           | 默认值    | 说明                                 |
| ------- | -------------- | --------- | ------------------------------------ |
| edges   | 需要安全区留白的物理边，默认四边全部启用；不是位置或展开方向 | 四边      | 当前容器需要补偿的边；[] 不补偿      |
| insets  | SafeAreaInsets | undefined | 局部 CSS px 覆盖，0 有效，省略边继承 |
| consume | boolean        | true      | 对后代清除已消费的边                 |
| tag     | string         | div       | 容器标签                             |

默认插槽为内容，无新增事件。

`SafeArea.setInsets(insets, target?)`：insets 为 SafeAreaInsets 或 null；target 默认为当前 document.documentElement。替换该目标四边覆盖，保留目标其他 CSS；不隐式注册原生监听。SSR 无 document 时安全返回；组件 insets 可以在 SSR 中输出，避免把请求相关数据写入全局模块。数值必须有限且非负，否则抛 TypeError，并在校验全部通过前不修改 DOM。

## 类型定义

```ts
type SafeAreaEdge = 'top' | 'right' | 'bottom' | 'left'
type SafeAreaInsets = Partial<Record<SafeAreaEdge, number>>
```

## 样式变量

| 变量                  | 默认值                           |
| --------------------- | -------------------------------- |
| --mp-safe-area-top    | env(safe-area-inset-top, 0px)    |
| --mp-safe-area-right  | env(safe-area-inset-right, 0px)  |
| --mp-safe-area-bottom | env(safe-area-inset-bottom, 0px) |
| --mp-safe-area-left   | env(safe-area-inset-left, 0px)   |

这些是运行环境值，不要把它们写入 Alps/Firefly 品牌主题。品牌切换使用 StyleProvider；App 适配使用 SafeArea，两者不互相清空。
