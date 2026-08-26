# 弹出层

### 介绍

创建一个可以从上、下、左、右、中心弹出的容器，用于展示信息。默认使用 `popupContainer` 插入到 `body` 尾部。


### 弹出位置

```html
<script setup>
import { ref } from 'vue'

const center = ref(false)
const top = ref(false)
const bottom = ref(false)
const left = ref(false)
const right = ref(false)
</script>

<template>
  <mp-space direction="column" :size="[10, 0]">
    <mp-button type="primary" block @click="center = true">
      居中弹出
    </mp-button>
    <mp-button type="primary" block @click="bottom = true">
      下方弹出
    </mp-button>
    <mp-button type="primary" block @click="top = true">
      上方弹出
    </mp-button>
    <mp-button type="primary" block @click="left = true">
      左侧弹出
    </mp-button>
    <mp-button type="primary" block @click="right = true">
      右侧弹出
    </mp-button>
  </mp-space>

  <mp-popup v-model:open="center">
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>

  <mp-popup position="bottom" v-model:open="bottom">
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>

  <mp-popup position="top" v-model:open="top">
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>

  <mp-popup position="left" v-model:open="left">
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>

  <mp-popup position="right" v-model:open="right">
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
</template>

<style>
.popup-example-block {
  padding: 24px;
  width: 280px;
}
</style>
```

### 遮罩层样式

```html
<script setup>
import { ref } from 'vue'

const maskClass = ref(false)
const maskStyle = ref(false)
</script>

<template>
  <mp-space direction="column" :size="[10, 0]">
    <mp-button type="primary" block @click="maskClass = true">
      遮罩层 class
    </mp-button>
    <mp-button type="primary" block @click="maskStyle = true">
      遮罩层 style
    </mp-button>
  </mp-space>

  <mp-popup
    mask-class="popup-example-custom-overlay"
    v-model:open="maskClass"
  >
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>

  <mp-popup
    :mask-style="{backgroundColor: 'rgba(0, 0, 0, 0.3)'}"
    v-model:open="maskStyle"
  >
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
</template>

<style>
.popup-example-custom-overlay {
  background: rgba(0, 0, 0, 0.3) !important;
}

.popup-example-block {
  padding: 24px;
  width: 280px;
}
</style>
```

### 注册事件

```html
<script setup>
import { ref } from 'vue'
import { Message } from '@maplejs/maple-ui'

const event = ref(false)
</script>

<template>
  <mp-button type="primary" block @click="event = true">
    注册事件
  </mp-button>

  <mp-popup
    v-model:open="event"
    @open="Message.info('open')"
    @opened="Message.success('opened')"
    @close="Message.warning('close')"
    @closed="Message.error('closed')"
  >
    <div class="popup-example-block">
      素胚勾勒出青花笔锋浓转淡,
      瓶身描绘的牡丹一如你初妆,
      冉冉檀香透过窗心事我了然,
      宣纸上走笔至此搁一半。
    </div>
  </mp-popup>
</template>

<style>
.popup-example-block {
  padding: 24px;
  width: 280px;
}
</style>
```

## API

### 属性

| 参数                       | 说明                                               | 类型                    | 默认值      |
|--------------------------|--------------------------------------------------|-----------------------|----------|
| `v-model:open`           | 是否显示弹出层                                          | _boolean_             | `false`  |
| `position`               | 弹出位置，可选值为 `top` `bottom` `right` `left` `center` | _string_              | `center` |
| `mask`                | 是否显示遮罩层                                          | _boolean_             | `true`   |
| `mask-class`          | 自定义遮罩层的 class                                    | _string_              | `-`      |
| `mask-style`          | 自定义遮罩层的 style                                    | _object_              | `-`      |
| `default-style`          | 是否启用默认样式                                         | _boolean_             | `true`   |
| `transition`             | 过渡动画的名称                                          | _string_              | `-`      |
| `lock-scroll`            | 是否禁止滚动穿透，禁止时滚动弹出层不会引发 body 的滚动                   | _boolean_             | `true`   |
| `mask-closable` | 是否点击遮罩层关闭弹出层                                     | _boolean_             | `true`   |
| `esc-to-close` | 是否支持键盘 ESC 关闭弹出层 | _boolean_ | `true`  |
| `popupContainer`               | 弹出层挂载的位置                                         | _TeleportProps['to'] \| false_ | `body`      |
| `safe-area`              | 是否开启底部安全区适配	                                     | _boolean_             | `false`  |
| `safe-area-top`          | 是否开启顶部安全区适配	                                     | _boolean_             | `false`  |
| `z-index`  ***3.3.10***         | 	 元素 z-index            | _number_             | `-`  |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `open` | 打开弹出层时触发 | `-` |
| `opened` | 打开弹出层动画结束时触发 | `-` |
| `close` | 关闭弹出层时触发 | `-` |
| `closed` | 关闭弹出层动画结束时触发 | `-` |
| `click-overlay` | 点击遮罩层时触发 | `-` |
| `key-escape` | 点击键盘 ESC 时触发 | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 弹出层内容 | `-` |

### 样式变量
以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--popup-overlay-background-color` | `rgba(0, 0, 0, .6)` |
| `--popup-content-background-color` | `var(--color-bg-1)` |
