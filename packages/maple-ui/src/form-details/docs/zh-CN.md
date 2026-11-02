

# FormDetails

表单辅助信息，用于展示错误反馈与补充说明。

## 阅读方向

继承来源 dir；错误信息按阅读起点对齐，附加信息按阅读终点对齐，间距随方向切换。

## 基础示例

### 基础用法

```demo
../example/demos/basic.vue
```

## 自定义与插槽

### 自定义辅助信息

```demo
../example/demos/extra-slot.vue
```

## API

### 属性

| 参数              | 说明      | 类型 | 默认值 | 
| ----------------- | --------- | --- | --- | 
| `error-message` | 错误信息    | _string_ | `-` |
| `extra-message` | 附加信息 | _string_ | `-` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `extra-message` | 附加信息 | `-` |
