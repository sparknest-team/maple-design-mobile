<!-- Source: src/floating-panel/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/floating-panel -->

# 浮动面板

## 案例

### 介绍
浮动在页面底部的面板，常用于提供额外的功能或信息，用户可灵活上下滑动浏览内容。

### 基本使用

演示面板限制在 400px 高的独立容器中，不覆盖文档页面；使用 `popup-container=false` 与局部固定定位包含块。业务页面不传该属性时仍默认浮动在窗口底部。自定义锚点为 80、180、320px；“仅头部拖拽”中内容只滚动，不改变面板高度。

Example source: src/floating-panel/example/demos/basic.vue

```vue
<script setup>
import { ref } from 'vue'

const tabsRef = ref(null)
const active = ref('basic')
const anchors = ref([80, 180, 320])
const anchor = ref(80)
const styleVars = ref({
  '--mp-tab-padding': '2px',
})
</script>

<template>
  <mp-style-provider class="floating-panel-demo-surface" :style-vars="styleVars">
    <mp-tabs v-model="active" style="margin-top: 14px">
      <mp-tabs-navs ref="tabsRef">
        <mp-tab-nav name="basic" title="基本使用" />
        <mp-tab-nav name="anchors" title="自定义锚点" />
        <mp-tab-nav name="head" title="仅头部拖拽" />
      </mp-tabs-navs>

      <mp-tabs-items>
        <mp-tab-item name="basic">
          <mp-floating-panel v-if="active === 'basic'" :anchors="[80, 320]" :popup-container="false">
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item name="anchors">
          <mp-floating-panel v-if="active === 'anchors'" v-model="anchor" :anchors="anchors" :popup-container="false">
            <div style="text-align: center; padding: 5px 15px">
              <p>面板锚点高度为 {{ Math.floor(anchor) }} px</p>
            </div>
          </mp-floating-panel>
        </mp-tab-item>
        <mp-tab-item name="head">
          <mp-floating-panel
            v-if="active === 'head'"
            :anchors="[80, 320]"
            :content-draggable="false"
            :popup-container="false"
          >
            <mp-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" border />
          </mp-floating-panel>
        </mp-tab-item>
      </mp-tabs-items>
    </mp-tabs>
  </mp-style-provider>
</template>

<style scoped>
.floating-panel-demo-surface {
  position: relative;
  height: 400px;
  overflow: hidden;
  transform: translateZ(0);
  border: 1px solid var(--mp-sys-color-border-default);
  border-radius: 8px;
}
</style>
```

## API

### 主值与默认值

使用普通 `v-model`。`modelValue` 表示当前停靠高度，单位 px；`defaultValue` 仅在创建时初始化非受控值，后续修改不会重置当前状态。显式绑定值优先，初始化不发出 `update:modelValue`。

### 属性

| 参数              | 说明                                                             | 类型     | 默认值        |
|------------------|----------------------------------------------------------------- |----------|----------------|
| `v-model`    | 当前停靠高度，单位 px；拖动结束并吸附后更新 | _number_ | `-`  |
| `default-value` | 非受控初始高度，仅创建时读取 | _number_ | `100` |
| `anchors`           | 自定义锚点，单位为 `px` | _number[]_ | `[100, window.innerHeight * 0.6]`  |
| `content-draggable` | 是否允许拖拽面板内容       | _boolean_ | `true`  |
| `duration`          | 动画时长，单位为 `ms`          | _number \| string_ | `300`  |
| `elevation`         | 海拔高度，可选值为 `true`、`false` 和 `0-24` 的等级                                                            | _number \| boolean_ | `true`            |
| `popup-container`          | 弹出层挂载的位置              | _TeleportProps['to'] \| false_ | `body`  |
| `safe-area`         | 是否开启底部安全区适配        | _boolean_ | `false`  |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `update:model-value` | 用户拖动结束并吸附后回传高度；初始化不触发 | `height: number` |
| `height-change` | 移动到某个锚点后触发 | `height: number` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 自定义面板内容 |  `-` |
| `header` ***3.2.12*** | 自定义面板标头 |  `-` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名 | 默认值 |
| --- | --- |
| `--floating-panel-z-index` | `999` |
| `--floating-panel-border-top` | `none` |
| `--floating-panel-border-radius` | `0` |
| `--mp-floating-panel-background` | `var(--mp-sys-color-surface-overlay)` |
| `--floating-panel-header-height` | `40px` |
| `--floating-panel-toolbar-width` | `20px` |
| `--floating-panel-toolbar-height` | `3px` |
| `--floating-panel-toolbar-border-radius` | `10px` |
| `--floating-panel-toolbar-background` | `#ddd` |
| `--floating-panel-transition-timing-function` | `cubic-bezier(0.18, 0.89, 0.32, 1.28)` |
