# Section 内容分区

将标题、说明、操作和正文组织为一个分区。适合详情页、抽屉和卡片内部。表单外的分区间距由父布局控制。放入 Form 后，分区自动跨整行并处理字段间距；父表单采用 inline 布局时，组内字段横排且允许换行。

## 基础示例

### 普通分区

设置 `variant="plain"` 可隐藏标题分隔线。

```demo
../example/demos/plain.vue
```

### 带线分区

`heading-line` 是默认外观。

heading-line 在标题后绘制装饰线，操作放入 extra 插槽。

```demo
../example/demos/line.vue
```

### 描边分区与自定义标题

通过 title 和 description 插槽提供分区标题与说明。打开 `show-marker` 显示标题色条，用 `heading-level` 指定标题层级。

```demo
../example/demos/outline.vue
```

### 分区尺寸、标题层级与内容

标题、描述和正文可独立开关，也可切换风格、状态和色条位置。隐藏标题后，启用的色条会标记整个分区。尺寸控制布局间距，标题层级可选 `h1` 到 `h6`，Section 默认为 `h4`。预览会显示当前组合，以及标题和说明各自的字号与上方间距。关闭「显示描述」会收起描述及其上方间距。关闭「显示正文」后，默认插槽只剩注释，正文容器和它的间距会一起移除。标题与色条的间距固定为 12px，可在分区上覆盖 `--mp-section-marker-gap`。单行标题旁的色条与字号等高，并垂直居中。标题换行时，色条每多一行增加一个行高。

```demo
../example/demos/sizes.vue
```

### 行内表单分组

放在 Form 中时，Section 默认采用 heading-line。需要标题色条时显式传 show-marker。字段跟随 inline 布局横排，空间不足时换行。需要分隔相邻分区时，可在页面中使用 Divider。

```demo
../example/demos/inline-form.vue
```

## API

### Section Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 分区锚点 | string | 自动生成 |
| title | 标题文本 | string | 空 |
| description | 标题下方的说明 | string | 空 |
| size | 视觉尺寸（xs / sm / md / lg / xl） | SectionSize | md |
| variant | 外观，可选 plain、heading-line、tonal、outline | 'plain' \| 'heading-line' \| 'tonal' \| 'outline' | heading-line |
| status | 状态决定色条、tonal 浅色背景和 outline 描边的颜色（default / info / success / warning / danger） | SectionStatus | — |
| heading-level | 标题层级，取值 1 至 6 | 1–6 | `4` |
| show-marker | 显示色条 | boolean | 默认关闭 |
| marker-placement | 色条位置（`title` / `section`） | string | `title` |

### Section Slots

默认插槽控制正文。省略插槽，或用 `v-if` 隐藏其中的全部内容时，正文容器及其间距一并移除。使用 `{{ note }}` 这样的文本插值时，即使字符串为空，也会保留正文容器。

默认插槽承载正文。title 和 description 插槽优先于同名属性。extra 插槽承载操作。

| 插槽 | 说明 |
| --- | --- |
| default | 正文 |
| title | 自定义标题 |
| description | 补充说明 |
| extra | 标题操作 |

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-section-accent-color` | `var(--mp-sys-color-action-primary)` | `background`, `border`, `border-inline-start` |
| `--mp-section-after-gap` | `24px` | `margin-block`, `padding-block-start` |
| `--mp-section-before-gap` | `32px` | `padding-block-start` |
| `--mp-section-card-background` | `var(--mp-sys-color-surface-default)` | `background-color` |
| `--mp-section-card-padding` | `16px` | `padding` |
| `--mp-section-card-radius` | `6px` | `border-radius` |
| `--mp-section-content-size` | `14px` | `font-size` |
| `--mp-section-description-color` | `var(--mp-sys-color-content-secondary)` | `color` |
| `--mp-section-description-gap` | `4px` | `margin-block-start` |
| `--mp-section-description-line-height` | `20px` | `line-height` |
| `--mp-section-description-size` | `13px` | `font-size` |
| `--mp-section-divider-color` | `var(--mp-sys-color-border-default)` | `border-block-start` |
| `--mp-section-divider-width` | `1px` | `border`, `border-block-start`, `border-radius` |
| `--mp-section-header-gap` | `16px` | `margin-block-start` |
| `--mp-section-heading-gap` | `16px` | `margin-inline-start` |
| `--mp-section-heading-size-step` | `1px` | `font-size`, `line-height` |
| `--mp-section-marker-gap` | `12px` | `padding-inline-end`, `padding-inline-start`, `row-gap` |
| `--mp-section-marker-height` | `calc(100% - 1lh + 1em)` | `height` |
| `--mp-section-marker-radius` | `2px` | `border-radius` |
| `--mp-section-marker-width` | `3px` | `border-inline-start`, `padding-inline-start`, `width` |
| `--mp-section-outline-color` | `var(--mp-sys-color-border-default)` | `border` |
| `--mp-section-size-lg-card-padding` | `20px` | `padding` |
| `--mp-section-size-lg-header-gap` | `20px` | `margin-block-start` |
| `--mp-section-size-lg-marker-height` | `calc(100% - 1lh + 1em)` | `height` |
| `--mp-section-size-lg-title-line-height` | `28px` | `line-height` |
| `--mp-section-size-lg-title-size` | `16px` | `font-size` |
| `--mp-section-size-sm-card-padding` | `12px` | `padding` |
| `--mp-section-size-sm-header-gap` | `12px` | `margin-block-start` |
| `--mp-section-size-sm-marker-height` | `calc(100% - 1lh + 1em)` | `height` |
| `--mp-section-size-sm-title-line-height` | `20px` | `line-height` |
| `--mp-section-size-sm-title-size` | `16px` | `font-size` |
| `--mp-section-size-xl-card-padding` | `24px` | `padding` |
| `--mp-section-size-xl-header-gap` | `24px` | `margin-block-start` |
| `--mp-section-size-xl-marker-height` | `calc(100% - 1lh + 1em)` | `height` |
| `--mp-section-size-xl-title-line-height` | `32px` | `line-height` |
| `--mp-section-size-xl-title-size` | `16px` | `font-size` |
| `--mp-section-size-xs-card-padding` | `8px` | `padding` |
| `--mp-section-size-xs-header-gap` | `8px` | `margin-block-start` |
| `--mp-section-size-xs-marker-height` | `calc(100% - 1lh + 1em)` | `height` |
| `--mp-section-size-xs-title-line-height` | `18px` | `line-height` |
| `--mp-section-size-xs-title-size` | `16px` | `font-size` |
| `--mp-section-title-color` | `var(--mp-sys-color-content-primary)` | `color` |
| `--mp-section-title-line-height` | `24px` | `line-height` |
| `--mp-section-title-size` | `16px` | `font-size` |
| `--mp-section-title-weight` | `600` | `font-weight` |
| `--mp-section-tonal-background` | `color-mix(in srgb, var(--mp-sys-color-surface-muted) 60%, var(--mp-section-card-background))` | `background-color` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-section-accent-color: var(--mp-sys-color-action-primary);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
