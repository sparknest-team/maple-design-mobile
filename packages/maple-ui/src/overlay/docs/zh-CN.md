# 背景层

### 介绍

创建一个背景层，用于强调特定的页面元素。

### 基本使用

通过 `open` 控制背景层显示，默认点击背景区域会将 `open` 设置为 `false`。

```html
<script setup>
  import { ref } from 'vue'

  const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">显示背景层</mp-button>
  <mp-overlay v-model:open="open" />
</template>
```

### 嵌入内容

```html
<script setup>
  import { ref } from 'vue'

  const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">嵌入内容</mp-button>
  <mp-overlay v-model:open="open">
    <div class="overlay-content">
      素胚勾勒出青花笔锋浓转淡, 瓶身描绘的牡丹一如你初妆, 冉冉檀香透过窗心事我了然, 宣纸上走笔至此搁一半。
    </div>
  </mp-overlay>
</template>

<style>
  .overlay-content {
    padding: 24px;
    width: 312px;
    border-radius: 28px;
  }
</style>
```

### 点击事件

```html
<script setup>
  import { ref } from 'vue'
  import { Message } from '@maplejs/maple-ui'

  const open = ref(false)
</script>

<template>
  <mp-button status="primary" block @click="open = true">点击背景层</mp-button>
  <mp-overlay v-model:open="open" @click="Message.success('click')" />
</template>
```

## API

### 属性

| 参数               | 说明                                                   | 类型                           | 默认值   |
| ------------------ | ------------------------------------------------------ | ------------------------------ | -------- |
| `v-model:open`     | 是否显示背景层                                         | _boolean_                      | `false`  |
| `default-open`     | 非受控模式下是否默认显示                               | _boolean_                      | `false`  |
| `overlay-closable` | 点击背景区域是否关闭                                   | _boolean_                      | `true`   |
| `lock-scroll`      | 是否禁止滚动穿透，禁止时滚动背景层不会引发 body 的滚动 | _boolean_                      | `true`   |
| `unmount-on-close` | 关闭后是否卸载插槽内容                                 | _boolean_                      | `true`   |
| `popup-container`  | 背景层挂载的位置                                       | _TeleportProps['to'] \| false_ | `'body'` |
| `esc-to-close`     | 是否支持键盘 ESC 关闭背景层                            | _boolean_                      | `true`   |
| `z-index`          | 自定义层级                                             | _number_                       | `-`      |

### 事件

| 事件名       | 说明                | 参数            |
| ------------ | ------------------- | --------------- |
| `click`      | 点击背景层时触发    | `MouseEvent`    |
| `key-escape` | 点击键盘 ESC 时触发 | `KeyboardEvent` |
| `open`       | 开始打开时触发      | `-`             |
| `opened`     | 打开动画结束时触发  | `-`             |
| `close`      | 开始关闭时触发      | `-`             |
| `closed`     | 关闭动画结束时触发  | `-`             |

### 插槽

| 插槽名    | 说明       | 参数 |
| --------- | ---------- | ---- |
| `default` | 背景层内容 | `-`  |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                          | 默认值              |
| ------------------------------- | ------------------- |
| `--mp-overlay-background-color` | `rgba(0, 0, 0, .6)` |
