# Theme Customization

### Intro

Maple’s palette is aligned with Cedar: **RGB channel scales** + **semantic colors** + **component tokens**.

- Scales: `--mp-primary-6: r, g, b` → `rgb(var(--mp-primary-6))` / `rgba(var(--mp-primary-6), 0.12)`
- Semantics: `--mp-color-text-1`, `--mp-color-bg-*`, `--mp-color-fill-*`, `--mp-color-primary`, …
- Dark mode: `html[maple-theme="dark"]`
- Overrides / theme packs: [StyleProvider](#/en-US/style-provider)

### Built-in theme packs

| Theme | Package | Notes |
| --- | --- | --- |
| Default | `Themes.default.light` / `Themes.default.dark` | Teal brand scale with light and dark modes |
| Maple | `Themes.maple.light` / `Themes.maple.dark` | Maple red-orange brand scale with light and dark modes |

### DOM dark mode

```ts
document.documentElement.setAttribute('maple-theme', 'dark')
document.documentElement.removeAttribute('maple-theme')
```

### StyleProvider

Light theme objects remove `html[maple-theme=dark]`; dark theme objects set it. Pass the matching `light` / `dark` object when switching themes.

```html
<!-- playground-ignore -->
<script setup>
  import { StyleProvider, Themes } from '@maplejs/maple-ui'
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.default.light)">Default Light</mp-button>
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.default.dark)">Default Dark</mp-button>
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.maple.light)">Maple Light</mp-button>
    <mp-button status="primary" block @click="StyleProvider.setStyleVars(Themes.maple.dark)">Maple Dark</mp-button>
  </mp-space>
</template>
```

### Body styles

```css
/* playground-ignore */
body {
  transition:
    background-color 0.25s,
    color 0.25s;
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### Customize

```html
<!-- playground-ignore -->
<script setup>
  import { StyleProvider, Themes } from '@maplejs/maple-ui'

  const customTheme = {
    ...Themes.maple.light,
    '--mp-primary-6': '255, 0, 0',
    '--mp-color-primary': 'rgb(var(--mp-primary-6))',
  }

  StyleProvider.setStyleVars(customTheme)
</script>
```
