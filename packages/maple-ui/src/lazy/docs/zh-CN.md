# 图片懒加载

### 介绍

在图片可见时进行加载。

## 基础示例

### 基本使用

```demo
../example/demos/basic-usage.vue
```

## 内容与展示

### 背景图懒加载

```demo
../example/demos/background-image-lazy-load.vue
```

### 内联属性

可以通过内联属性修改 `loading`、 `error` 图片和`总尝试次数，包含首次请求`。

```html
<template>
  <img
    class="lazy-example-cat"
    v-lazy="'https://maplejs.org/cat.jpg'"
    lazy-loading="https://xxx.cn/loading.png"
    lazy-error="https://xxx.cn/error.png"
    lazy-attempt="3"
  >
</template>

<style>
.lazy-example-cat {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-size: cover;
  pointer-events: none;
}
</style>
```

### 插件

`Lazy` 提供了在插件注册时传入的选项，可以设置默认的懒加载选项。

```js
// playground-ignore
import { createApp } from 'vue'
import { Lazy } from '@maple-design/ui'

createApp().use(Lazy, {
  loading: 'https://xxx.cn/loading.png',
  error: 'https://xxx.cn/error.png',
  attempt: 3,
  throttleWait: 300,
  events: [
    'scroll',
    'wheel',
    'mousewheel',
    'resize',
    'animationend',
    'transitionend',
    'touchmove'
  ],
  filter(lazy) {
    // 可以访问 lazy 上下文的所有属性,执行一些属性拦截,
    // 比如简单修改所有的图片地址 http -> https
    lazy.src = lazy.src.replace('http://', 'https://')
  }
})
```

## API

### Lazy Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `loading` | 加载中的图片，尽可能选择加载速度很快的图片 | _string_ | `1像素透明图片` |
| `error` | 加载失败显示的图片 | _string_ | `1像素透明图片` |
| `attempt` | 总尝试次数，包含首次请求 | _number_ | `3` |
| `throttleWait` | 节流时间，数值越大事件触发频率越低 | _number_ | `300` |
| `events` | 触发可见性检测注册的事件列表 | _string[]_ | `['scroll'...]` |
| `filter` | 属性拦截函数 | _(lazy: LazyContext) => void_ | `() => void` |

`attempt` 表示包含首次请求的总尝试次数。非有限值（含非法字符串、Infinity）恢复为3；有限值向下取整且至少为1。失败达到上限即终止，缓存命中不计网络尝试。`filter` 可修改 `LazyContext`，修改地址需要赋回 `lazy.src`。公开类型包括 `LazyOptions`、`LazyContext`、`LazyState`、`LazyHTMLElement`。

资源地址、背景参数或 `lazy-loading` / `lazy-error` / `lazy-attempt` 改变时，旧任务失效并创建新任务；卸载取消排队帧、预加载监听器和全局待调度检查，已交付的旧回调也不能写入新任务或卸载节点。背景URL以CSS字符串转义，支持括号、空格、引号和data URL。

插件默认配置、100项FIFO资源缓存和可见性调度为模块级共享，并非各应用隔离。再次安装更新后续任务的默认配置；已有任务保留创建时的资源选项，所有待加载节点的事件按新事件列表重新绑定，最后一个任务结束时解除全部注册。`events` 与 `throttleWait` 只支持插件配置，不支持 `lazy-throttle-wait` 属性。可见性按视口判断，滚动祖先监听负责触发检查，不承诺按每层裁剪区域预加载。
## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
