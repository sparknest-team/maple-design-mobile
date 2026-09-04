# Icon

## Introduction

SVG Vue component icon library.
Icons are sourced from [Material Design Icon](https://materialdesignicons.com/).

## Recommended Usage

After configuring `MapleResolver()`, use template tags for automatic on-demand imports. `m-icon-*` is the Resolver's icon namespace; only the corresponding individual icon is loaded from `@maplejs/icons-vue`:

```html
<mp-icon size="40" color="red">
  <m-icon-checkbox-marked-circle />
</mp-icon>
```

You can also import a standalone icon component manually:

```ts
import { IconCheckboxMarkedCircle } from '@maplejs/icons-vue'
```

For manual imports, the `<mp-icon>` wrapper is still recommended when size, color, animation, or the interaction area should be controlled consistently:

```html
<mp-icon size="40" color="red">
  <IconCheckboxMarkedCircle />
</mp-icon>
```

Both approaches render the same result and support Tree Shaking. The Resolver generates the first import, while application code explicitly owns the second. Use `<img>` or an image component for web images.

### Dynamic Names and Explicit Registration

Use `<mp-icon :name>` only when the icon name must be decided at runtime. `name` only looks up icons explicitly registered on the current Vue application; `mp-icon` does not import the complete icon collection. Register only the icons required by the dynamic scenario:

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

If the application genuinely needs to access every icon by an arbitrary name, it can explicitly register the complete collection. This loads every icon:

```ts
import * as MapleIconsVue from '@maplejs/icons-vue'

for (const [name, component] of Object.entries(MapleIconsVue)) {
  if (name !== 'iconNames') app.component(name, component)
}
```

## Examples

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

Set `transition` (in ms) to enable the icon-switch animation.

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
