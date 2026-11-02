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

## API

`open/defaultOpen` 分别控制面板状态与非受控初始开合；使用 `v-model:open` 双向绑定。defaultOpen 只在创建时读取，不在初始化时回写。

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示输入文字；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

键盘面板独立使用 `open/defaultOpen` 与 `update:open`；输入值和面板开关互不替代。

### 属性

| 参数                    | 说明                       | 类型                        | 默认值     |
| ----------------------- | -------------------------- | --------------------------- | ---------- |
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
| `lock-scroll`           | 是否锁定背景滚动           | `boolean`                   | `true`     |
| `esc-to-close`          | 按 Esc 是否关闭            | `boolean`                   | `true`     |
| `popup-container`        | 挂载节点                   | `string \| HTMLElement \| false` | `body`     |
| `safe-area`             | 是否开启底部安全区         | `boolean`                   | `true`     |

### 事件

| 事件名       | 说明                   | 参数          |
| ------------ | ---------------------- | ------------- |
| `input`      | 点击按键时触发         | `key: string` |
| `delete`     | 点击删除键时触发       | `-`           |
| `close`      | 关闭时触发             | `-`           |
| `blur`       | 关闭时触发（同 close） | `-`           |
| `open`       | 打开时触发             | `-`           |
| `opened`     | 打开动画结束后触发     | `-`           |
| `closed`     | 关闭动画结束后触发     | `-`           |
| `key-escape` | 按 Esc 时触发          | `-`           |
