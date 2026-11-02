

# LocaleProvider

在局部子树中设置语言及语言包，不改变其他区域的语言。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## API

### 属性

| 参数         | 说明   | 类型                     | 默认值 | 
|--------------|---------------|--------------------------|---------| 
| `locale` | 当前语言 | _string_ | `zh-CN`    |
| `messages`    | 语言包      | _Record<string, Record<string, string>>_                 | `-`   |
| `tag`    | 自定义标签名      | _string_                 | `div`   |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 组件内容 | `-` |


## 阅读方向

`<mp-locale-provider dir="rtl">` 提供阅读方向作用域，与 locale 分别配置。省略 dir 时继承，可用嵌套 `dir="ltr"` 或原生 DOM dir 容器局部覆盖。Popup 挂载到外部后仍保留来源作用域的方向。物理 left/right 方位和媒体内容保留原有语义。
