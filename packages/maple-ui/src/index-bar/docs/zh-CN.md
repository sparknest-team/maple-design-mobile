# 索引栏

## 案例

### 生命周期与滚动任务

新命令替换旧滚动；停用／卸载取消入口、插值及两帧稳定等待，保留命令不再写入／通知。激活等子锚点登记后恢复active位置，event:false不重复change。取消不跳旧目标，公开scrollTo仍返回void，duration默认0、正值cubic easing不变。组件私有任务替代原通用工具调用，不新增公共取消API／CSS变量。减少动效跳插值，但不跳列表／clickedName的必要两帧状态稳定。

消费者11＋私有任务4＋既有9共24测试通过，真实IAB四组4/4（替换、两帧状态、卸载、KeepAlive），节点0、无warn/error。范围仅default/light父文档，入口原生点击而内部命令／scroll事件由夹具脚本发出；原生手势、其他主题／窗口及OS仍独立待验。下文共享工具结果为历史工具证据，不替代本批消费者回归。

此前工具各端10项和真实IAB8组为独立工具证据。IndexBar当前由私有可取消任务管理零／非正／非有限时长、owner偏好及稳定帧；通用工具不新增取消参数，Form不受本批影响。零时长仍有入口／两帧等待，CSS动效Token不替代duration。

### 介绍

用于跳转到页面指定位置。

### 基本使用

点击索引栏时，会自动跳转到对应的 `IndexAnchor` 锚点位置。

```demo
../example/demos/basic.vue
```

### 停用、卸载与保留命令

```demo
../example/demos/lifecycle.vue
```

<!-- api-review:start -->
### 功能调试

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### 属性

#### IndexBar Props

| 参数                | 说明                       | 类型               | 默认值  |
| ------------------- | -------------------------- | ------------------ | ------- |
| `sticky`            | 是否开启锚点吸顶           | _boolean_          | `true`  |
| `sticky-offset-top` | 锚点吸顶时与顶部的距离     | _number \| string_ | `0`     |
| `hide-list`         | 是否隐藏锚点列表           | _boolean_          | `false` |
| `sticky-css-mode`   | 开启原生 `css sticky` 模式 | _boolean_          | `false` |
| `z-index`           | z-index 层级               | _number \| string_ | `1`     |
| `highlight-color`   | 索引字符高亮颜色           | _string_           | `-`     |
| `duration`          | 动画持续时间               | _string \| number_ | `0`     |

#### IndexAnchor Props

| 参数    | 说明     | 类型               | 默认值 |
| ------- | -------- | ------------------ | ------ |
| `index` | 索引字符 | _number \| string_ | `-`    |

### 事件

#### IndexBar Events

| 事件名   | 说明                         | 回调参数                  |
| -------- | ---------------------------- | ------------------------- |
| `click`  | 点击索引栏的字符时触发       | `index: number \| string` |
| `change` | 当前高亮的索引字符变化时触发 | `index: number \| string` |

### 插槽

#### IndexBar Slots

| 名称      | 说明       | 参数 |
| --------- | ---------- | ---- |
| `default` | 索引栏内容 | `-`  |

#### IndexAnchor Slots

| 名称          | 说明           | 参数                          |
| ------------- | -------------- | ----------------------------- |
| `default`     | 自定义索引字符 | `-`                           |
| `anchor-name` | 自定义锚点内容 | `anchorName: string` 锚点内容 |

### 方法

通过 ref 可以获取到 IndexBar 实例并调用实例方法

| 方法名     | 说明           | 参数                                                         | 返回值 |
| ---------- | -------------- | ------------------------------------------------------------ | ------ |
| `scrollTo` | 滚动到指定锚点 | `index: number \| string, options?: IndexBarScrollToOptions` | `-`    |

#### IndexBarScrollToOptions

| 参数    | 说明                                  | 类型      | 默认值 |
| ------- | ------------------------------------- | --------- | ------ |
| `event` | 值为 `false` 时阻止触发 `change` 事件 | _boolean_ | `-`    |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                                  | 默认值                    |
| --------------------------------------- | ------------------------- |
| `--mp-index-bar-list-right`             | `0`                       |
| `--mp-index-bar-list-top`               | `50%`                     |
| `--mp-index-bar-list-left`              | `auto`                    |
| `--mp-index-bar-list-bottom`            | `auto`                    |
| `--mp-index-bar-list-transform`         | `translate(0, -50%)`      |
| `--mp-index-bar-list-item-font-size`    | `var(--mp-font-size-xs)`  |
| `--mp-index-bar-list-item-color`        | `var(--mp-color-primary)` |
| `--mp-index-bar-list-item-active-color` | `var(--mp-color-danger)`  |
| `--mp-index-bar-list-item-height`       | `14px`                    |
| `--mp-index-bar-list-item-padding`      | `0 10px`                  |

### API

### 属性

| 参数    | 说明     | 类型                 | 默认值 |
| ------- | -------- | -------------------- | ------ |
| `index` | 索引字符 | _number_ \| _string_ | -      |

### 插槽

| 名称      | 说明           | 参数 |
| --------- | -------------- | ---- |
| `default` | 自定义索引字符 | -    |
