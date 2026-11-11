

# HighlighterProvider

为代码展示子组件提供统一的语法高亮配置。

## 基础示例

### 基础用法

向 Code 子组件提供本地异步转换器；示例只转义并展示源码，不加载外部高亮服务。

```demo
../example/demos/basic.vue
```

## API

### HighlighterProvider Props

| 参数              | 说明                                                        | 类型            | 默认值            |
|------------------|--------------------------------------------------------------|----------------|------------------|
| `highlighter`    | 着色器                                                       | `Highlighter`   | `-`              |
| `theme`          | 主题                                                         | _string_       | `-`              |
| `tag`            | 自定义标签名                                                  | _string_       | `div`              |

### HighlighterProvider Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 组件内容 | `-` |

`Highlighter` 和 `CodeToHtmlOptions` 可从组件库根入口或 `highlighter-provider` 子入口作为类型导入。`codeToHtml` 可同步返回 HTML 字符串，也可返回 Promise。嵌套时最近的 Provider 整体覆盖外层配置，未设置的 `highlighter` 不会从外层继承。`tag` 是实际渲染的原生容器标签；外部着色器及其资源由创建者管理，Provider 不负责销毁。
## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
