# Quick Start

### Intro

Here are the most basic ways to access component libraries in common development patterns.

### Install

#### CDN

`maple.js` contain all the styles and logic of the component library, and you can import them.

```html
<!-- playground-ignore -->
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/@nio-pow/maple-ui/umd/maple.js"></script>
<script>
  const app = Vue.createApp({
    template: '<mp-button>Button</mp-button>'
  })
  app.use(Maple).mount('#app')
</script>
```

#### Webpack/Vite

```shell
# playground-ignore
# Install with npm, yarn or pnpm

# npm
npm i @nio-pow/maple-ui -S

# yarn
yarn add @nio-pow/maple-ui

# pnpm
pnpm add @nio-pow/maple-ui
```

```js
// playground-ignore
import App from './App.vue'
import Maple from '@nio-pow/maple-ui'
import { createApp } from 'vue'
import '@nio-pow/maple-ui/es/style'

createApp(App).use(Maple).mount('#app')
```

### Support Desktop

`Maple` is a mobile-first component library. To support desktop, you need to install an adapter. See [browser adaptation](#/en-US/browserAdaptation) for details.

### Choose a design system

Starting from version 3.x, Maple supports both Material Design 2 and Material Design 3 design systems.

```js
// playground-ignore
// Maple defaults to Material Design 2 light mode
import { Themes, StyleProvider } from '@nio-pow/maple-ui'

// Material Design 2 Dark Mode
StyleProvider(Themes.dark)
// Material Design 3 Light Mode
StyleProvider(Themes.md3Light)
// Material Design 3 Dark Mode
StyleProvider(Themes.md3Dark)
```

```css
// playground-ignore
body {
  transition: background-color .25s, color .25s;
  color: var(--color-text);
  background-color: var(--color-body);
  color-scheme: var(--color-scheme);
}
```

### Components Playground

We provide a web version of the component editor,
which is convenient for you to quickly get started with each component of the component library,
edit it online, share it with others, or download the code package to run locally.
You can click the `{...}` icon in the upper right corner of the page or [go here](https://maplejs.org/playground).