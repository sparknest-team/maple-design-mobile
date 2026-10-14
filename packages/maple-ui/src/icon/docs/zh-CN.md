# 图标

### 名称切换与生命周期

transition默认0，是JS视觉替换时长，不新增CSS Token。CSS与计时共享归一化值，负值／非有限值按0；时长改变取消旧阶段并提交当前名称。名称替换／减少动效／停用／卸载使旧任务失效，已消费回调不能清掉新动画。KeepAlive停用不排动画、解绑偏好监听；激活直接显示最新名称，不重放旧动画。偏好由实际span所属窗口读取，绑定代次隔离已解绑监听。具名注册／slot优先／spin不变。两端新模拟测试各9项（基线6失败／3对照），完整Icon Cedar20／Maple21通过；真实浏览器／OS仍独立待验。

```demo
../example/demos/lifecycle.vue
```



### 基础用法

```demo
../example/demos/basic.vue
```

### 图标尺寸

```demo
../example/demos/icon-size.vue
```

### 图标颜色

```demo
../example/demos/icon-color.vue
```

### 旋转与持续旋转

```demo
../example/demos/rotate-and-spin.vue
```

### 点击事件

```demo
../example/demos/click-event.vue
```

### 动态名称（特殊场景，点击切换）

```demo
../example/demos/icon-animation.vue
```

### 图标列表 (点击复制)

```demo
../example/demos/icon-list.vue
```

## API

### 属性

| 参数              | 说明               | 类型               | 默认值 |
| ----------------- | ------------------ | ------------------ | ------ |
| `name`            | 图标名称           | _string_           | `-`    |
| `size`            | `inherit` | _string \| number_ | `-`    |
| `color`           | 图标颜色           | _string_           | `-`    |
| `rotate`          | 旋转角度           | _number_           | `-`    |
| `spin`            | 是否持续旋转       | _boolean_          | `false` |
| `animation-class` | 过渡动画类名       | _string_           | `-`    |
| `transition`      | 过渡动画时间（ms） | _string \| number_ | `0`    |

### 独立 SVG 图标属性

| 参数              | 说明       | 类型                                       | 默认值    |
| ----------------- | ---------- | ------------------------------------------ | --------- |
| `size`            | `inherit` | _string \| number_                          | `-`       |
| `color`           | 图标颜色   | _string_                                   | `-`       |
| `rotate`          | 旋转角度   | _number_                                   | `-`       |
| `spin`            | 是否旋转   | _boolean_                                  | `false`   |
| `title`           | 无障碍标题 | _string_                                   | `-`       |
| `stroke-width`    | 线宽       | _number_                                   | `4`       |
| `stroke-linecap`  | 端点类型   | _'butt' \| 'round' \| 'square'_            | `'butt'`  |
| `stroke-linejoin` | 拐角类型   | _'bevel' \| 'inherit' \| 'miter' \| 'round'_ | `'miter'` |

### 事件

| 事件名  | 说明           | 参数           |
| ------- | -------------- | -------------- |
| `click` | 点击图标时触发 | `event: Event` |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名        | 默认值 |
| ------------- | ------ |
| `--icon-size` | `20px` |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

只解析本应用已注册的图标；连续切换 name 会取消过期定时器，卸载后不再执行切换。各库注册前缀和历史 spin 类由本地适配保留，图标资源不跨库引用。

两端 Icon 默认继承宿主字号。需要固定 20px 的场景请显式设置 size="20" 或 icon-size 变量；size 属性优先于变量，颜色默认继承宿主。

### 动效变量

| Token | Default |
| --- | --- |
| `--mp-icon-spin-duration` | `1s` |

内置动效遵循 prefers-reduced-motion: reduce：保留内容与状态反馈，关闭装饰性旋转、扫光和波纹。Icon 名称切换直接显示最新值并取消未结束阶段，CSS与JS时长保持一致；自定义动画类由调用方负责适配。Ripple的时长与清理策略以Ripple组件文档为准，不将其历史250ms规则当作Icon的时长上限。
