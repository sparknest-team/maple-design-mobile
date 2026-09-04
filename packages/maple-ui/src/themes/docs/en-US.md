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
| Default light | CSS `:root` | Scales + semantics |
| Dark | `Themes.dark` or DOM | Aligns with `:root[maple-theme=dark]` |
| MD3 light | `Themes.md3Light` | StyleProvider overrides |
| MD3 dark | `Themes.md3Dark` | StyleProvider + DOM dark |

### DOM dark mode

```ts
document.documentElement.setAttribute('maple-theme', 'dark')
document.documentElement.removeAttribute('maple-theme')
```

### StyleProvider

`StyleProvider(Themes.dark)` also sets `html[maple-theme=dark]`; `StyleProvider(null)` clears it.

```html
<!-- playground-ignore -->
<script setup>
  import { StyleProvider, Themes } from '@maplejs/maple-ui'
</script>

<template>
  <mp-space direction="column" size="lg">
    <mp-button status="primary" block @click="StyleProvider(null)">Light</mp-button>
    <mp-button status="primary" block @click="StyleProvider(Themes.dark)">Dark</mp-button>
    <mp-button status="primary" block @click="StyleProvider(Themes.md3Light)">MD3 Light</mp-button>
    <mp-button status="primary" block @click="StyleProvider(Themes.md3Dark)">MD3 Dark</mp-button>
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
    ...Themes.md3Light,
    '--mp-primary-6': '255, 0, 0',
    '--mp-color-primary': 'rgb(var(--mp-primary-6))',
  }

  StyleProvider(customTheme)
</script>
```
