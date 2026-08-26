# Icon

### Intro

SVG Vue component icon library.
Icons are sourced from [Material Design Icon](https://materialdesignicons.com/).

After configuring `MapleResolver`, use `m-icon-*` tags. The resolver imports each icon on demand from the corresponding `@maplejs/icons-vue` subpath.
Use the `<mp-icon>` wrapper to control size, color, and interaction consistently. Use `<img>` or an image component for web images.

### Basic Usage

```html
<template>
  <mp-icon size="40" color="red">
    <m-icon-checkbox-marked-circle />
  </mp-icon>
  <mp-icon size="40" color="red">
    <m-icon-information />
  </mp-icon>
</template>
```

### Icon Size

```html
<template>
  <mp-icon size="20"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon size="28"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon size="36"><m-icon-checkbox-marked-circle /></mp-icon>
</template>
```

### Icon Color

```html
<template>
  <mp-icon size="28" color="var(--mp-color-primary)"><m-icon-checkbox-marked-circle /></mp-icon>
  <mp-icon size="28" color="var(--mp-color-success)"><m-icon-checkbox-marked-circle /></mp-icon>
</template>
```

### Click Event

```html
<template>
  <mp-icon size="28" color="var(--mp-color-primary)" @click="Message.success('Click success')">
    <m-icon-checkbox-marked-circle />
  </mp-icon>
</template>
```

### Dynamic Name (Special Case)

Use `<mp-icon :name>` only when the icon name must be decided at runtime. `name` only looks up icons explicitly registered on the current Vue application; the Icon component does not import the complete icon collection. Register only the icons required by the dynamic scenario. If the application registers the entire package, it explicitly accepts that bundle cost. Setting `transition (ms)` enables the switch animation.

```ts
// main.ts
import { createApp } from 'vue'
import { IconCheckboxMarkedCircle, IconInformation } from '@maplejs/icons-vue'
import App from './App.vue'

const app = createApp(App)
app.component('IconCheckboxMarkedCircle', IconCheckboxMarkedCircle)
app.component('IconInformation', IconInformation)
app.mount('#app')
```

```html
<script setup>
  import { ref } from 'vue'

  const name = ref('information')

  function toggle() {
    name.value = name.value === 'information' ? 'checkbox-marked-circle' : 'information'
  }
</script>

<template>
  <mp-icon color="var(--mp-color-primary)" :name="name" :transition="300" :size="30" @click="toggle" />
</template>
```

### Icon List (Click to Copy)

The list obtains every icon name from `iconNames` and resolves its SVG component from the standalone icon package. Application code should use `m-icon-*` tags so the resolver can load icons on demand.

```html
<script setup>
  import { computed, ref } from 'vue'
  import * as MapleIcons from '@maplejs/icons-vue'
  import { iconNames } from '@maplejs/icons-vue'
  import { pascalCase } from '@maplejs/maple-shared'

  const keyword = ref('')
  const filteredIcons = computed(() => iconNames.filter((name) => name.includes(keyword.value)))

  function resolveIcon(name) {
    return MapleIcons[`Icon${pascalCase(name)}`]
  }

  function copyImport(name) {
    navigator.clipboard.writeText(`<m-icon-${name} />`)
  }
</script>

<template>
  <mp-input v-model.trim="keyword" placeholder="Search icons" clearable />

  <button v-for="name in filteredIcons" :key="name" type="button" @click="copyImport(name)">
    <component :is="resolveIcon(name)" />
    <span>{{ name }}</span>
  </button>
</template>
```

### Standalone icon package

Import concrete icon components from `@maplejs/icons-vue` for SVG rendering and Tree Shaking. No icon font is required.

```ts
import { IconInformation } from '@maplejs/icons-vue'
```

```html
<mp-icon :size="24" color="currentColor">
  <IconInformation title="IconInformation" />
</mp-icon>
```

## API

### Props

| Prop              | Description                            | Type               | Default |
| ----------------- | -------------------------------------- | ------------------ | ------- |
| `name`            | icon name                              | _string_           | `-`     |
| `size`            | icon size                              | _string \| number_ | `-`     |
| `color`           | Icon color                             | _string_           | `-`     |
| `animation-class` | Name of the transition animation class | _string_           | `-`     |
| `transition`      | Transition animation time(ms)          | _string \| number_ | `0`     |

### Events

| Event   | Description                          | Arguments      |
| ------- | ------------------------------------ | -------------- |
| `click` | Triggered when you click on the icon | `event: Event` |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable      | Default |
| ------------- | ------- |
| `--icon-size` | `20px`  |
