# AppBar

### Intro

Provide top navigation for the page, commonly used as the mobile app chrome bar.

> Unlike Cedar's desktop **PageHeader**: AppBar is the application top bar (fixed, elevation, background image). PageHeader is an in-page title block (breadcrumb, title/subtitle, back, extra actions). Keep the names separate by design.

### Basic Usage

Set the title of the app bar through the `title` prop.

```html
<template>
   <mp-app-bar title="title" />
</template>
```

### Use Border Radius

Turn on rounded border with the `round` prop.

```html
<template>
   <mp-app-bar title="Use Border Radius" title-position="center" round />
</template>
```

### Custom Background Color

```html
<template>
   <mp-app-bar
     title="title"
     title-position="center"
     color="linear-gradient(90deg, rgba(72,176,221,1) 0%, rgba(0,208,161,1) 100%)"
   />
</template>
```

### Add Title Slot

```html
<template>
   <mp-app-bar>Add Title Slot</mp-app-bar>
</template>
```

### Add Left And Right Slot

```html
<template>
  <mp-app-bar title="Title">
    <template #left>
      <mp-button
        color="transparent"
        text-color="#fff"
        round
        text
      >
        <mp-icon name="chevron-left" :size="24" />
      </mp-button>
    </template>

    <template #right>
      <mp-menu>
        <mp-button
          color="transparent"
          text-color="#fff"
          round
          text
        >
          <mp-icon name="menu" :size="24" />
        </mp-button>

        <template #menu>
          <mp-cell ripple>OPTION</mp-cell>
          <mp-cell ripple>OPTION</mp-cell>
          <mp-cell ripple>OPTION</mp-cell>
        </template>
      </mp-menu>
    </template>
  </mp-app-bar>
</template>
```

### Bottom Border

Disable elevation and enable the bottom border for light top bars.

```html
<template>
  <mp-app-bar title="Bottom Border" :elevation="false" border />
</template>
```

### Fixed To Top

Use `fixed` with `placeholder` to pin the bar and reserve space for content.

```html
<template>
  <mp-app-bar title="Fixed" fixed placeholder safe-area-top />
</template>
```

### Custom Content

```html
<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<template>
  <mp-app-bar
    round
    image="https://maplejs.org/tree.jpeg"
    image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%"
  >
    Title
    <template #left>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="menu" :size="24" />
      </mp-button>
    </template>

    <template #right>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="map-marker-radius" :size="24" />
      </mp-button>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="star" :size="24" />
      </mp-button>
      <mp-button round text color="transparent" text-color="#fff">
        <mp-icon name="heart" :size="24" />
      </mp-button>
    </template>

    <template #content>
      <mp-tabs
        style="margin-top: 100px"
        color="transparent"
        active-color="#fff"
        inactive-color="#ddd"
        v-model:active="active"
      >
        <mp-tab>OPTION</mp-tab>
        <mp-tab>OPTION</mp-tab>
        <mp-tab>OPTION</mp-tab>
      </mp-tabs>
    </template>
  </mp-app-bar>
</template>
```

## API

### Props

| Prop             | Description                                          | Type | Default |
|------------------|------------------------------------------------------| --- |---------|
| `color`          | Background                                           | _string_ | `-`     |
| `text-color`     | Text color                                           | _string_ | `-`     |
| `title`          | Title                                                | _string_ | -       |
| `title-position` | Title location, can be set to `left`, `center`, `right` | _string_ | `left`  |
| `elevation` | Elevation level, options `true` `false` and level of `0-24` | _string \| number \| boolean_|   `true`    |
| `fixed`          | Whether to fixed to the top     | _boolean_ | `false` |
| `placeholder` ***3.2.14***  | Whether to generate placeholder elements of the same height at the top (`fixed` required)  | _boolean_ | `false` |
| `z-index`          | AppBar element z-index                            | _number \| string_ | `1` |
| `round`          | Whether to use rounded border                        | _boolean_ | `false` |
| `border` ***3.3.2***          | Whether to use bottom border                            | _boolean_ | `false` |
| `image`          | Background image                            | _string_ | `-` |
| `image-linear-gradient` | Background image linear gradient | _string_ | `-` |
| `safe-area-top` | Whether to enable top safe area adaptation | _boolean_ | `false` |

### Slots

| Name | Description                                                 | SlotProps |
| --- |-------------------------------------------------------------| --- |
| `default` | Customize the title content to override the `title` content | `-` |
| `left` | Insert the content to the left of the app bar               | `-` |
| `right` | Insert the content to the right of the app bar              | `-` |
| `content` | Insert the content to the extra content of the app bar   | `-` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable | Default |
| --- | --- |
| `--app-bar-color` | `var(--color-primary)` |
| `--app-bar-text-color` | `#fff` |
| `--app-bar-height` | `54px` |
| `--app-bar-title-padding` | `0 12px` |
| `--app-bar-title-font-size` | `var(--font-size-lg)` |
| `--app-bar-left-gap` | `6px` |
| `--app-bar-right-gap` | `6px` |
| `--app-bar-border-radius` | `4px` |
| `--app-bar-border-bottom` | `thin solid var(--color-outline)` |
