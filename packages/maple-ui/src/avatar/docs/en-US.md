# Avatar

### Intro

Used as avatar display, supporting images, icons and characters.

### Avatar Size

```html
<template>
  <mp-space align="center">
    <mp-avatar src="https://maplejs.org/cat.jpg" size="mini" />
    <mp-avatar src="https://maplejs.org/cat.jpg" size="small" />
    <mp-avatar src="https://maplejs.org/cat.jpg" />
    <mp-avatar src="https://maplejs.org/cat.jpg" size="large" />
    <mp-avatar src="https://maplejs.org/cat.jpg" :size="78" />
  </mp-space>
</template>
```

### Avatar Shape

```html
<template>
  <mp-space>
    <mp-avatar src="https://maplejs.org/cat.jpg" />
    <mp-avatar src="https://maplejs.org/cat.jpg" :round="false" />
  </mp-space>
</template>
```

### Fit Mode

```html
<template>
  <mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="https://maplejs.org/cat.jpg" />
      <span>cover</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="https://maplejs.org/cat.jpg" fit="fill" />
      <span>fill</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="https://maplejs.org/cat.jpg" fit="contain" />
      <span>contain</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="https://maplejs.org/cat.jpg" fit="none" />
      <span>none</span>
    </mp-space>
    <mp-space direction="column" align="center">
      <mp-avatar src="https://maplejs.org/cat.jpg" fit="scale-down" />
      <span>scale-down</span>
    </mp-space>
  </mp-space>
</template>
```

### Text Adaptive

```html
<script setup>
import { ref } from 'vue'

const text = ref('VARLET')
</script>

<template>
  <mp-space direction="column">
    <mp-space>
      <mp-avatar>{{ text }}</mp-avatar>
      <mp-avatar :round="false">{{ text }}</mp-avatar>
    </mp-space>
    <mp-input v-model="text" />
  </mp-space>
</template>
```

### Background Color

```html
<template>
  <mp-space>
    <mp-avatar color="var(--color-warning)">
      <mp-icon name="fire" />
    </mp-avatar>
    <mp-avatar color="var(--color-danger)">VARLET</mp-avatar>
  </mp-space>
</template>
```

### Avatar Horizontal Group

```html
<template>
  <mp-avatar-group>
    <mp-avatar src="https://maplejs.org/cat.jpg" bordered />
    <mp-avatar src="https://maplejs.org/cat2.jpg" bordered />
    <mp-avatar src="https://maplejs.org/cat3.jpg" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>
</template>
```

### Avatar Vertical Group

```html
<template>
  <mp-avatar-group vertical>
    <mp-avatar src="https://maplejs.org/cat.jpg" bordered />
    <mp-avatar src="https://maplejs.org/cat2.jpg" bordered />
    <mp-avatar src="https://maplejs.org/cat3.jpg" bordered />
    <mp-avatar bordered>+2</mp-avatar>
  </mp-avatar-group>
</template>
```

### Avatar Hoverable

```html
<template>
  <mp-avatar-group>
    <mp-avatar hoverable src="https://maplejs.org/cat.jpg" />
    <mp-avatar hoverable src="https://maplejs.org/cat2.jpg" />
    <mp-avatar hoverable src="https://maplejs.org/cat3.jpg" />
    <mp-avatar hoverable bordered>+2</mp-avatar>
  </mp-avatar-group>
</template>
```

### Use Local Paths

In the file `.vue`,
the `Vue component` will not be automatically processed by the build tool like the native img module,
so you need to import the image resources manually.
Here's how the different build tools are used.

#### Vite

Automatic preprocessing with [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue#asset-url-handling).

```ts
// playground-ignore
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          'mp-avatar': ['src']
        }
      }
    })
  ],
})
```

```html
<!-- playground-ignore -->
<template>
  <mp-avatar src="../../assets/logo.png"/>
</template>
```

Or import separately

```html
<!-- playground-ignore -->
<script setup>
import logo from '../../assets/logo.png'
</script>

<template>
  <mp-avatar :src="logo"/>
</template>
```

#### Webpack

```html
<!-- playground-ignore -->
<template>
  <mp-avatar :src="require('../../assets/logo.png')"/>
</template>
```

## API

### Props

#### Avatar Props

| Prop          | Description                                                 | Type   | Default          |
|---------------|-------------------------------------------------------------|------|--------------|
| `round`       | Whether the avatar is round or not                                                | _boolean_          | `true` |
| `size`        | The size of the avatar, with optional values of `mini small normal large`                 | _string \| number_ | `normal` |
| `color`       | Background color of the avatar                                                | _string_           | `-` |
| `src`         | Address of avatar                                                   | _string_            | `-` |
| `alt` | Image alt text, the same as the native attribute of the `img` tag              | _string_ | `-` |
| `fit`         | Filling mode of avatar image, optional value `fill contain cover none scale-down` | _string_            | `cover` |
| `bordered`    | Avatar with or without border                                                | _boolean_ | `false` |
| `border-color`| Avatar border color                                                  | _string_ | `-` |
| `loading`     | When lazy loading is enabled, the image displayed in the load                                 | _string_ | `-` |
| `error`       | When lazy loading is enabled, the image displayed when loading fails                           | _string_ | `-` |
| `lazy`        | Whether to enable lazy loading                                               | _boolean_ | `false` |
| `hoverable`   | Whether to enable hover effect | _boolean_ | `false` |

#### AvatarGroup Props

| Prop              | Description                                        | Type   | Default          |
|-------------------|-------------------------------------------|------|--------------|
| `offset`          | Avatar Offset within Avatar Group	| _number \| string_ | `-` |
| `vertical`        | Whether the group avatars are vertically aligned | _boolean_ | `false` |

### Events

#### Avatar Events

| Event | Description | Arguments |
| --- | --- | --- |
| `click` | Triggered when clicking on avatar | `event: Event` |
| `load`  | Triggered when the avatar image is successfully loaded (failure in lazy loading mode will try to load the avatar image multiple times and will only be triggered when successfully loaded) | `event: Event` |
| `error` | Triggered when the avatar image fails to load (failure in lazy loading mode will try to load the avatar image multiple times, will only be triggered at the end of the number of attempts) | `event: Event` |

### Slots

#### Avatar Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Avatar content | `-` |

#### AvatarGroup Slots

| Name | Description | SlotProps |
| ----- | -------------- | -------- |
| `default` | Avatar group content | `-` |

### Style Variables
Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

#### Avatar Variables

| Variable | Default |
| --- | --- |
| `--avatar-text-color` |  `#f5f5f5`|
| `--avatar-border-radius` | `4px` |
| `--avatar-mini-size` | `28px`|
| `--avatar-small-size` |  `36px`|
| `--avatar-normal-size` |  `48px`|
| `--avatar-large-size` |  `64px`|
| `--avatar-border` |  `2px solid #fff`|
| `--avatar-background-color` |  `#bebebe`|
| `--avatar-hover-transform` | `scale(1.1)`      |

#### AvatarGroup Variables

| Variable | Default |
| --- | --- |
| `--avatar-group-offset` | `-10px` |