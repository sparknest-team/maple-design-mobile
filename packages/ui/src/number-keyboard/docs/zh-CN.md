# 数字键盘

### 介绍

用于输入数字、密码等场景，从底部弹出的虚拟键盘。

## 基础示例

### 基本使用

```demo
../example/demos/basic.vue
```

## 阅读方向

继承最近的 `dir="ltr|rtl"`，支持运行时切换与局部覆盖。标题与操作区继承阅读方向，数字按键区保留 LTR 数字键盘顺序；RTL 不倒置数字排列或输入值。安全区仍按设备物理边缘计算。

按键为原生按钮，可用 Tab、Enter 和 Space 操作。图标删除键有本地化名称；`title` 默认关联弹窗名称，也可通过组件的 `aria-label` 或 `aria-labelledby` 指定弹窗名称。

在 FormItem 内，弹窗会合并调用方的 `aria-describedby` 与当前表单错误；错误清除后保留调用方描述。

输入与开合使用本地 passive 状态并发出更新；父级应接受更新并保持同步，仅拒绝回写并不能保证面板保持打开。`hide-on-click-outside` 控制背景层关闭，不监听任意外部鼠标点击。

`max-length` 按 JavaScript UTF-16 长度计算；有限值向下取整并且至少为 0，`Infinity` 或字符串 `"Infinity"` 表示不限。额外键可包含多个字符；整个追加结果超限则拒绝，既不截断也不发 `input`。删除每次移除一个 UTF-16 单元。数字键盘没有公开业务方法或插槽；普通事件返回的 Promise 不决定开合或输入。

## API

`open/defaultOpen` 分别控制面板状态与非受控初始开合；使用 `v-model:open` 双向绑定。defaultOpen 只在创建时读取，不在初始化时回写。

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示输入文字；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

键盘面板独立使用 `open/defaultOpen` 与 `update:open`；输入值和面板开关互不替代。

### NumberKeyboard Props

| 参数                    | 说明                       | 类型                        | 默认值     |
| ----------------------- | -------------------------- | --------------------------- | ---------- |
| `default-value`         | 非受控初始输入值，仅创建时读取 | `string` | `''` |
| `default-open`          | 非受控初始开合状态，仅创建时读取 | `boolean` | `false` |
| `v-model`               | 当前输入值                 | `string`                    | `''`       |
| `v-model:open`          | 是否显示键盘               | `boolean`                   | `false`    |
| `title`                 | 键盘标题                   | `string`                    | `-`        |
| `theme`                 | 键盘主题                   | `default \| custom`         | `default`  |
| `max-length`             | 最大输入长度               | `number \| string`          | `Infinity` |
| `extra-key`             | 左下角额外按键             | `string \| string[]`        | `''`       |
| `close-button-text`     | 自定义主题完成按钮文案     | `string`                    | `完成`     |
| `delete-button-text`    | 删除键文案，为空时显示图标 | `string`                    | `-`        |
| `show-delete-key`       | 是否显示删除键             | `boolean`                   | `true`     |
| `random-key-order`      | 是否随机 1-9 顺序          | `boolean`                   | `false`    |
| `hide-on-click-outside` | 点击背景层是否关闭         | `boolean`                   | `true`     |
| `overlay`               | 是否显示背景层             | `boolean`                   | `true`     |
| `overlay-class`         | 背景层类名                 | `string`                    | `-`        |
| `overlay-style`         | 背景层样式                 | `object`                    | `-`        |
| `overlay-closable`      | 背景层是否可关闭；还受 hide-on-click-outside 限制 | `boolean` | `true` |
| `lock-scroll`           | 是否锁定背景滚动           | `boolean`                   | `true`     |
| `esc-to-close`          | 按 Esc 是否关闭            | `boolean`                   | `true`     |
| `popup-container`        | 挂载节点                   | `string \| HTMLElement \| false` | `body`     |
| `safe-area`             | 是否开启底部及左右安全区         | `boolean`                   | `true`     |

### NumberKeyboard Events

| 事件名       | 说明                   | 参数          |
| ------------ | ---------------------- | ------------- |
| `update:modelValue` | 输入值更新通知 | `value: string` |
| `update:open` | 面板开关更新通知 | `open: boolean` |
| `input`      | 点击按键时触发         | `key: string` |
| `delete`     | 点击删除键时触发       | `-`           |
| `close`      | 关闭时触发             | `-`           |
| `blur`       | 关闭时触发（同 close） | `-`           |
| `open`       | 打开时触发             | `-`           |
| `opened`     | 打开动画结束后触发     | `-`           |
| `closed`     | 关闭动画结束后触发     | `-`           |
| `key-escape` | 按 Esc 时触发          | `-`           |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-number-keyboard-background` | `var(--mp-color-bg-1)` | `background` |
| `--mp-number-keyboard-close-color` | `var(--mp-sys-color-content-brand)` | `color` |
| `--mp-number-keyboard-close-font-size` | `var(--mp-font-size-lg, 16px)` | `font-size` |
| `--mp-number-keyboard-delete-icon-size` | `22px` | `font-size` |
| `--mp-number-keyboard-header-color` | `var(--mp-color-text-3)` | `color` |
| `--mp-number-keyboard-header-font-size` | `var(--mp-font-size-md, 14px)` | `font-size` |
| `--mp-number-keyboard-header-height` | `34px` | `height` |
| `--mp-number-keyboard-key-active-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-number-keyboard-key-background` | `var(--mp-color-fill-3)` | `background` |
| `--mp-number-keyboard-key-color` | `var(--mp-color-text-1)` | `color` |
| `--mp-number-keyboard-key-font-size` | `22px` | `font-size` |
| `--mp-number-keyboard-key-gap` | `6px` | `gap` |
| `--mp-number-keyboard-key-height` | `48px` | `height`, `min-height` |
| `--mp-number-keyboard-padding` | `6px` | `padding` |
| `--mp-number-keyboard-sidebar-width` | `25%` | `width` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-number-keyboard-background: var(--mp-color-bg-1);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
