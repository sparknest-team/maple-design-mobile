# 默认值与全局配置

## 全局设置组件默认值

每个组件都提供 `setPropsDefaults`，用于统一修改之后创建的声明式组件默认值。请在应用挂载前调用：

```ts
import { Button, ThemeProvider } from '@maple-design/ui-vue'

Button.setPropsDefaults({
  status: 'primary',
  variant: 'tonal',
  size: 'lg',
})

// 其他组件使用相同方式
ThemeProvider.setPropsDefaults({
  tag: 'section',
})
```

组件上显式传入的属性优先级更高。设置不会追溯更新已经挂载的实例；对象和数组默认值会按实例创建副本。

## 全局 Context

从 `@maple-design/ui-vue` 命名导入 `Context`，或从 `@maple-design/ui-vue/context` 默认导入同一响应式对象。对象包含 `zIndex`（默认 2000）和 `enableRipple`（默认 true）。调整 `zIndex` 影响之后分配的层级，不改变已经打开的层；关闭波纹只阻止创建新波纹，不禁用宿主交互。

该对象是模块单例，同一模块实例的多个应用和服务端请求共享；不要在 SSR 请求中直接修改它来实现请求隔离。SSR 首次渲染层级使用 2000，挂载后才按当前配置分配；test 环境不递增层级，不同打包副本各自独立。它不是组件，没有 Props、事件、插槽或实例方法。
