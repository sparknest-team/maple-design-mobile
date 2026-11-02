<!-- Source: src/page-header/docs/en-US.md; locale: en-US; page: /en-US/page-header -->

# PageHeader

The back button only emits `back`; it does not navigate or call browser history. The demos show a Message notification. Handle the destination in your application. The native button supports click, Enter and Space.

Displays the current page title, context, and related actions. The API follows Naive UI. Fixed positioning, safe areas, and visual backgrounds belong in application-level `class` / `style` rules.

## Examples

### Basic usage

Compose the heading and actions with Card and Space. Tap Back, Follow or Create task to show a message. Use `show-back` to display a back arrow to the left of the title and place the primary action at the bottom.

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

### Content above the heading

Use Card for the surface, the `header` slot for breadcrumbs, and Space to stack the title and subtitle.

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

### Complete structure

Compose the header with Card, Space, Cell, Grid, Statistic and Divider without custom styles. The project details, statistics and actions match the desktop example. The back arrow sits beside the title, while breadcrumbs occupy the separate `header` slot. Mobile stacks the title and project details and places Create task at the bottom.

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

### Transparent background

The page header is transparent by default. A tonal Card supplies the outer surface without custom background styles.

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

### Props

| Prop       | Description                | Type      | Default |
| ---------- | -------------------------- | --------- | ------- |
| `show-back` | Whether to show back       | _boolean_ | `false` |
| `title`    | Main title                 | _string_  | `-`     |
| `subtitle` | Subtitle                   | _string_  | `-`     |
| `extra`    | Extra content on the right | _string_  | `-`     |

### Events

| Event  | Description                                                          | Arguments    |
| ------ | -------------------------------------------------------------------- | ------------ |
| `back` | Emitted when back is clicked | `MouseEvent` |

### Slots

| Slot       | Description                                    |
| ---------- | ---------------------------------------------- |
| `header`   | Content above the heading, usually breadcrumbs |
| `back`     | Custom back icon                               |
| `avatar`   | Avatar                                         |
| `title`    | Main title                                     |
| `subtitle` | Subtitle                                       |
| `extra`    | Extra content on the right                     |
| `default`  | Main page-header content                       |
| `footer`   | Footer content                                 |

### Back interaction tokens

`--mp-page-header-back-hover-size` (30px) controls the feedback circle without moving the title; `--mp-page-header-back-hover-bg` (`var(--mp-sys-color-state-hover)`) supplies its background. Hover feedback only applies to fine pointers supporting hover; keyboard focus-visible remains available for all input modes.
