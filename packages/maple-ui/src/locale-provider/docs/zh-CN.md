

# LocaleProvider

在局部子树中设置语言及语言包，不改变其他区域的语言。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## API

### LocaleProvider Props

| 参数         | 说明   | 类型                     | 默认值 | 
|--------------|---------------|--------------------------|---------| 
| `locale` | 当前语言 | _string_ | `zh-CN`    |
| `messages`    | 语言包      | _`Record<string, Partial<Message>>`_                 | `-`   |
| `dir` | 阅读方向，省略时继承 | _'ltr' \| 'rtl'_ | `-` |
| `tag`    | 自定义标签名      | _string_                 | `div`   |

### LocaleProvider Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 组件内容 | `-` |


## 阅读方向

`<mp-locale-provider dir="rtl">` 提供阅读方向作用域，与 locale 分别配置。省略 dir 时继承，可用嵌套 `dir="ltr"` 或原生 DOM dir 容器局部覆盖。Popup 挂载到外部后仍保留来源作用域的方向。物理 left/right 方位和媒体内容保留原有语义。

### 语言回退与作用域

`messages` 的键为语言名称，`locale` 需匹配本层语言包。每个词条依次使用本层选中语言的自有值、最近父级 LocaleProvider、当前全局 Locale；缺包、缺词及 `null`/`undefined` 继续回退，显式空字符串保留。`Message` 包含文字及日期月份、星期等字典，不能简化为纯字符串映射。可从 `@maple-design/ui/locale` 导入 `Message` 类型。

仅设置 `dir` 不会清空文案；嵌套局部包可只覆盖部分词条。组件通过 Vue 依赖注入继承调用处作用域，Teleport 不会丢失它。直接调用函数服务创建的独立应用不自动继承页面中的 LocaleProvider，按该服务的上下文/配置入口提供语言，或使用全局 Locale。组件没有专属事件或实例方法。
## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
