# PageHeader 页头

展示当前页面的标题、上下文和相关操作。API 参照 Naive UI，组件不负责固定定位、安全区或背景皮肤，这些能力可通过业务层的 `class` / `style` 实现。

### 基本使用

通过 `show-back` 属性显示返回按钮。

```html
<mp-page-header show-back title="标题" subtitle="页面说明" @back="router.back()" />
```

### 完整结构

```html
<mp-page-header show-back title="标题" @back="router.back()">
  <template #header><mp-breadcrumb>...</mp-breadcrumb></template>
  <template #avatar><mp-avatar>M</mp-avatar></template>
  <template #extra><mp-button>操作</mp-button></template>
  页面摘要或统计信息
  <template #footer>最近更新：今天</template>
</mp-page-header>
```

## API

### 属性

| 参数       | 说明             | 类型      | 默认值  |
| ---------- | ---------------- | --------- | ------- |
| `show-back` | 是否显示返回按钮 | _boolean_ | `false` |
| `title`    | 主标题           | _string_  | `-`     |
| `subtitle` | 次标题           | _string_  | `-`     |
| `extra`    | 右侧附加内容     | _string_  | `-`     |

### 事件

| 名称   | 说明                                         | 参数         |
| ------ | -------------------------------------------- | ------------ |
| `back` | 点击返回按钮时触发 | `MouseEvent` |

### 插槽

| 名称       | 说明                         |
| ---------- | ---------------------------- |
| `header`   | 页头上方内容，通常用于面包屑 |
| `back`     | 自定义返回图标               |
| `avatar`   | 头像                         |
| `title`    | 主标题                       |
| `subtitle` | 次标题                       |
| `extra`    | 右侧附加内容                 |
| `default`  | 页头正文内容                 |
| `footer`   | 页头底部内容                 |

## 同源实现与平台边界

两端各自保存完整源码，不引用公共核心，不共享组件实例或响应式状态；修改时同步维护两份实现。主体、Props、关键样式及配对测试纳入只读源码一致性检查，主题 token 和安装入口各自维护。

返回按钮统一使用原生 button，支持键盘触发并派发 back(MouseEvent)。Cedar 内部类名由 c-page-header-xxx 调整为 c-page-header__xxx；图标资源仍由本库提供。
