<!-- Source: src/locale-provider/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/locale-provider -->

# LocaleProvider

在局部子树中设置语言及语言包，不改变其他区域的语言。

## 案例

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
