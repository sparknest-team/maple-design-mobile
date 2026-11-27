# 按钮

### 基本使用
```html
<va-button>按钮起步</va-button>
```

<demo src="../example/BasicUse.vue"></demo>

### 主题色按钮
```html
<va-button color="#009688">按钮起步</va-button>
```

<demo src="../example/ModifyColor.vue"></demo>

## API

### Button Props

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| `color` | 按钮颜色 | _string_ | `default` |

### Button Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `click` | 点击按钮时触发 | `event: Event` |

### Button Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 按钮内容 | `-` |