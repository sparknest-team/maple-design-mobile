<!-- Source: src/page-header/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/page-header -->

# PageHeader 页头

返回按钮只派发 `back` 事件，不自动调用路由或浏览器历史。示例通过 Message 显示通知；真实返回目的地由调用方处理。原生按钮支持点击、Enter 和空格。

展示当前页面的标题、上下文和相关操作。API 参照 Naive UI，组件不负责固定定位、安全区或背景皮肤，这些能力可通过业务层的 `class` / `style` 实现。

## 案例

### 基础用法

使用 Card 和 Space 组合返回、主标题、副标题及操作区。点击返回、关注或创建任务，查看消息反馈；通过 `show-back` 在标题左侧显示返回箭头，并将主要操作放在底部。

Example source: src/page-header/example/demos/basic-usage.vue

```vue
<script setup>
import { Message } from '@maple-design/ui'

const handleBack = () => Message.info('点击返回')
const handleAction = () => Message.success('已关注项目')
const handleCreate = () => Message.info('点击创建任务')
</script>

<template>
  <mp-card variant="outline" size="sm">
    <mp-page-header show-back @back="handleBack">
      <template #title>
        <mp-space direction="column" :size="0">
          <span>设计系统</span>
          <small>项目概览</small>
        </mp-space>
      </template>
      <template #extra><mp-button @click="handleAction">关注</mp-button></template>
      <template #footer><mp-button block status="primary" @click="handleCreate">创建任务</mp-button></template>
    </mp-page-header>
  </mp-card>
</template>
```

### 页头上方内容

通过 `header` 插槽展示面包屑；使用 Card 承载内容，Space 将标题和副标题纵向排列。

Example source: src/page-header/example/demos/breadcrumb.vue

```vue
<template>
  <mp-card variant="outline" size="sm">
    <mp-page-header>
      <template #header>
        <mp-breadcrumb>
          <mp-breadcrumb-item>工作台</mp-breadcrumb-item>
          <mp-breadcrumb-item>项目</mp-breadcrumb-item>
          <mp-breadcrumb-item>设计系统</mp-breadcrumb-item>
        </mp-breadcrumb>
      </template>
      <template #title>
        <mp-space direction="column" :size="0">
          <span>设计系统</span>
          <small>项目概览</small>
        </mp-space>
      </template>
    </mp-page-header>
  </mp-card>
</template>
```

### 完整结构

使用 Card、Space、Cell、Grid、Statistic 和 Divider 组合完整页头，无需自定义样式。与 PC 示例展示相同的项目资料、统计和操作；返回箭头与标题处于同一行，面包屑独立放在 `header` 插槽，标题和资料纵向排列，将“创建任务”放在底部。

Example source: src/page-header/example/demos/complete.vue

```vue
<script setup>
import { Message } from '@maple-design/ui'

const handleBack = () => Message.info('点击返回')
const handleAction = () => Message.success('已关注项目')
const handleCreate = () => Message.info('点击创建任务')
</script>

<template>
  <mp-card variant="outline" size="sm">
    <mp-page-header show-back @back="handleBack">
      <template #header>
        <mp-breadcrumb>
          <mp-breadcrumb-item>工作台</mp-breadcrumb-item>
          <mp-breadcrumb-item>项目</mp-breadcrumb-item>
        </mp-breadcrumb>
      </template>
      <template #avatar><mp-avatar shape="square" :size="32">D</mp-avatar></template>
      <template #title>
        <mp-space direction="column" :size="0">
          <span>设计系统</span>
          <small>项目概览</small>
        </mp-space>
      </template>
      <template #extra><mp-button @click="handleAction">关注</mp-button></template>
      <span>统一设计规范与组件资源，帮助团队高效协作。</span>
      <mp-cell title="负责人"><template #extra>林晓</template></mp-cell>
      <mp-cell title="所属团队"><template #extra>设计平台</template></mp-cell>
      <mp-divider />
      <mp-grid :cols="3" :col-gap="12">
        <mp-grid-item><mp-statistic title="组件" :value="48" tabular-nums /></mp-grid-item>
        <mp-grid-item><mp-statistic title="进行中" :value="12" tabular-nums /></mp-grid-item>
        <mp-grid-item><mp-statistic title="成员" :value="8" tabular-nums /></mp-grid-item>
      </mp-grid>
      <template #footer>
        <mp-divider :spacing="[0, 16]" />
        <mp-grid :cols="1" :row-gap="16">
          <mp-grid-item>
            <mp-space justify="space-between" size="xs" wrap>
              <small>项目编号 DS-001</small>
              <small>最近更新：今天</small>
            </mp-space>
          </mp-grid-item>
          <mp-grid-item><mp-button block status="primary" @click="handleCreate">创建任务</mp-button></mp-grid-item>
        </mp-grid>
      </template>
    </mp-page-header>
  </mp-card>
</template>
```

### 透明底色

页头默认透明。使用 Card 的 `tonal` 变体提供底色，展示页头自然融入外层表面，无需自定义背景样式。

Example source: src/page-header/example/demos/transparent.vue

```vue
<script setup>
import { Message } from '@maple-design/ui'

const handleAction = () => Message.success('已关注项目')
</script>

<template>
  <mp-card variant="tonal" size="sm">
    <mp-page-header>
      <template #title>
        <mp-space direction="column" :size="0">
          <span>设计系统</span>
          <small>项目概览</small>
        </mp-space>
      </template>
      <template #extra><mp-button @click="handleAction">关注</mp-button></template>
      <span>页头默认透明，可以融入页面背景。</span>
    </mp-page-header>
  </mp-card>
</template>
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

### 返回交互变量

`--mp-page-header-back-hover-size`（30px）控制反馈圆尺寸，不推动标题布局；`--mp-page-header-back-hover-bg`（`var(--mp-sys-color-state-hover)`）控制反馈背景。hover 仅应用于支持悬停的精细指针，所有输入模式均保留键盘 focus-visible 反馈。
