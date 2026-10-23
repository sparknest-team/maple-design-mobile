

# HighlighterProvider

为代码展示子组件提供统一的语法高亮配置。

## 案例

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

| 参数              | 说明                                                        | 类型            | 默认值            |
|------------------|--------------------------------------------------------------|----------------|------------------|
| `highlighter`    | 着色器                                                       | `Highlighter`   | `-`              |
| `theme`          | 主题                                                         | _string_       | `-`              |
| `tag`            | 自定义标签名                                                  | _string_       | `div`              |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 组件内容 | `-` |
