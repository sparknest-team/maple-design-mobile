# 计数器

### 介绍

用于在一定范围内输入或者调整数字。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 设置取值范围

```demo
../example/demos/range.vue
```

### 设置步长

```demo
../example/demos/step.vue
```

### 保留小数

```demo
../example/demos/to-fixed.vue
```

### 设置尺寸

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

### 异步变更

在某些场景下需要等待服务器返回成功之后再执行变更。
设置 `lazy-change` 后会阻止组件本身的绑定值更新操作，
并注册 `before-change` 事件进行手动更新。



> 计数器的表单校验请使用 [FormItem 组件](#/zh-CN/form-item)。

```demo
../example/demos/lazy-change.vue
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `v-model` | 绑定的值 | _number_ | `0` |
| `min` | 最小值 | _string \| number_ | `-` |
| `max` | 最大值 | _string \| number_ | `-` |
| `step` | 步长 | _string \| number_ | `1` |
| `decimal-length` | 保留小数位数 | _string \| number_ | `-` |
| `color` | 背景颜色 | _string_ | `-` |
| `input-width` | 输入框的宽度 | _string \| number_ | `-` |
| `input-text-size` | 输入框的文字大小 | _string \| number_ | `-` |
| `button-size` | 按钮大小 | _string \| number_ | `-` |
| `elevation` | 海拔高度，可选值为 `true` `false` 和 `0-24` 的等级, 不为简单模式时生效 | _number \| boolean_| `true` |
| `readonly` | 是否只读 | _boolean_ | `false` |
| `disabled` | 是否禁用 | _boolean_ | `false` |
| `disable-increment` | 是否禁用增加 | _boolean_ | `false` |
| `disable-decrement` | 是否禁用减少 | _boolean_ | `false` |
| `disable-input` | 是否禁用输入 | _boolean_ | `false` |
| `increment-button` | 是否显示增加按钮 | _boolean_ | `true` |
| `decrement-button` | 是否显示减少按钮 | _boolean_ | `true` |
| `press` | 是否开启按钮长按 | _boolean_ | `true` |
| `ripple` | 是否开启水波纹 | _boolean_ | `true` |
| `lazy-change` | 是否阻止组件本身的绑定值更新操作 | _boolean_ | `false` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `before-change` | 变更之前(仅限 lazy-change 模式)触发 | `value: number` <br> `change: (value: string \| number) => void` |
| `change` | 变更时触发 | `value: number` |
| `increment` | 增加时触发 | `value: number` |
| `decrement` | 减少时触发 | `value: number` |


### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                             | 默认值                          |
|---------------------------------|------------------------------|
| `--counter-padding`             | `0 4px`                      |
| `--counter-font-color`          | `#fff`                       |
| `--counter-background`          | `var(--color-primary)`       |
| `--counter-input-width`         | `28px`                       |
| `--counter-input-margin`        | `0 4px`                      |
| `--counter-input-font-size`     | `14px`                       |
| `--counter-button-size`         | `28px`                       |
| `--counter-button-text-color`         | `#fff`                       |
| `--counter-button-icon-size`    | `100%`                       |
| `--counter-disabled-color`      | `var(--color-disabled)`      |
| `--counter-disabled-opacity`    | `var(--opacity-disabled)`    |
| `--counter-error-color`         | `var(--color-danger)`        |
