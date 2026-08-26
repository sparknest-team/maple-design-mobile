# Row / Col

### Intro

24-column Flex grid layout. API aligned with Cedar Design Web (PC).

> The former "Layout" menu entry is removed. For CSS Grid layout, see [Grid](#/en-US/grid).

Breakpoints (same as PC):

| Breakpoint | Media query |
| --- | --- |
| `xs` | `< 576px` |
| `sm` | `≥ 576px` |
| `md` | `≥ 768px` |
| `lg` | `≥ 992px` |
| `xl` | `≥ 1200px` |
| `xxl` | `≥ 1600px` |

### Basic Usage

```html
<template>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
    <mp-col :span="8"><div class="item">span: 8</div></mp-col>
  </mp-row>
</template>
```

### Offset

```html
<template>
  <mp-row :gutter="[10, 10]">
    <mp-col :span="16" :offset="8"><div class="item">offset: 8 span: 16</div></mp-col>
  </mp-row>
</template>
```

### Horizontal Alignment

`justify`: `start` `center` `end` `space-around` `space-between`.

### Vertical Alignment

`align`: `start` `center` `end` `stretch`.

### Order

```html
<template>
  <mp-row>
    <mp-col :span="6" :order="4"><div class="item">1</div></mp-col>
    <mp-col :span="6" :order="1"><div class="item">4</div></mp-col>
  </mp-row>
</template>
```

### Responsive

```html
<template>
  <mp-row :gutter="10">
    <mp-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2" :xxl="1">
      <div class="item">1</div>
    </mp-col>
  </mp-row>
</template>
```

### Flex

```html
<template>
  <mp-row>
    <mp-col flex="100px"><div class="item">100px</div></mp-col>
    <mp-col flex="auto"><div class="item">auto</div></mp-col>
  </mp-row>
</template>
```

## API

### Row Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `gutter` | Gutter in px. Supports responsive object or `[horizontal, vertical]` | `number \| ResponsiveValue \| [number \| ResponsiveValue, number \| ResponsiveValue]` | `0` |
| `justify` | Horizontal alignment | `'start' \| 'center' \| 'end' \| 'space-around' \| 'space-between'` | `'start'` |
| `align` | Vertical alignment | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` |
| `wrap` | Whether columns can wrap | `boolean` | `true` |
| `div` | Treat as plain div without grid styles | `boolean` | `false` |

### Col Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `span` | Number of grid spaces | `number` | `24` |
| `offset` | Number of spacing on the left | `number` | `-` |
| `order` | Sort order | `number` | `-` |
| `xs` | `< 576px` | `number \| { span?, offset?, order? }` | `-` |
| `sm` | `≥ 576px` | same | `-` |
| `md` | `≥ 768px` | same | `-` |
| `lg` | `≥ 992px` | same | `-` |
| `xl` | `≥ 1200px` | same | `-` |
| `xxl` | `≥ 1600px` | same | `-` |
| `flex` | Flex layout property | `number \| string \| 'initial' \| 'auto' \| 'none'` | `-` |

### Events / Slots

Row & Col emit `click` and provide a `default` slot.
