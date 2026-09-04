# ProgressGroup 分段进度条

### 介绍

将多个数值展示为同一条进度轨中的分段，并提供对应图例。

### 基础用法

```html
<mp-progress-group
  :items="[
    { label: 'System', value: 24, color: '#64748b' },
    { label: 'Apps', value: 8, color: '#f53f3f' },
    { label: 'Media', value: 42, color: '#00b42a' }
  ]"
  :max="128"
  status
/>
```

### 尺寸与方向

通过 `size` 调整轨道粗细。设置 `orientation="vertical"` 可切换为纵向布局；纵向模式需要由容器提供明确高度。

```html
<mp-progress-group :items="items" size="xs" />
<mp-progress-group :items="items" size="xl" />
<mp-progress-group :items="items" orientation="vertical" style="height: 220px" />
```

### 颜色与自定义内容

`color` 是所有分段的默认颜色，每个 item 的 `color` 可以单独覆盖。省略所有 item 的标签和图标时，只展示进度轨。状态和图例内容可以通过插槽替换。

鼠标悬浮或键盘聚焦分段时会显示提示并加粗当前分段。使用 item 的 `tip` 覆盖默认提示，或通过 `tooltip` 插槽自定义内容。

```html
<mp-progress-group :items="items" color="#ff7d00" status>
  <template #status="{ value, max }">已使用 {{ value }} / {{ max }} GB</template>
  <template #item-trailing="{ item }">{{ item.value }} GB</template>
</mp-progress-group>
```

### 环形分段进度

设置 `mode="circle"` 展示分段圆环。`circle-size` 控制直径，`stroke-width` 控制环宽，状态内容显示在圆心。

```html
<mp-progress-group mode="circle" :items="items" :circle-size="160" :stroke-width="12" status />
```

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 分段数据 | `ProgressGroupItem[]` | `[]` |
| mode | 展示模式 | `line \| circle` | `line` |
| max | 计算占比时的总值 | `number` | `100` |
| status | 是否展示累计百分比 | `boolean` | `false` |
| size | 进度轨尺寸 | `xs \| sm \| md \| lg \| xl` | `md` |
| color | 默认分段颜色 | `string` | 主题主色 |
| circle-size | 环形模式的直径 | `number \| string` | `120` |
| stroke-width | 环形模式的轨道宽度 | `number` | `8` |
| tooltip | 是否显示分段悬浮/聚焦提示 | `boolean` | `true` |
| orientation | 排列方向 | `horizontal \| vertical` | `horizontal` |

### Slots

| 名称 | 插槽参数 |
| --- | --- |
| status | `{ percent, value, max }` |
| tooltip | `{ item, index, percent }` |
| item / item-leading / item-label / item-trailing | `{ item, index, percent }` |
