# Theme Customization

Start with a built-in theme, then override the CSS variables you need. Themes control colors, corners and fonts. Use [SafeArea](#/en-US/safe-area) for device-edge spacing.

One theme boundary for the entire application or a subtree. A provider around the application is its global theme; nesting creates local overrides with the same rules. Providers never mutate html or other application roots.

## Choose an approach

| Goal | Recommended approach |
| ------------------------------- | ------------------------------------------------------------------ |
| One brand across the app | `<mp-theme-provider :theme="Themes.maple[mode]">` |
| Customize a region or component | `<mp-theme-provider :style-vars="…">` |
| Find supported overrides | The variable guide below and each component's CSS variable table |

## Basic examples

### Built-in theme preview

Switch the brand and light/dark mode in the theme menu. Compare the same booking form, including editable fields, selection, switches and validation. Submission stays local. The booking fixture currently uses Chinese labels.

```demo
../example/BrandForm.vue
```

## Local themes and customization

### Local customization

Choose a color. Only the customized button changes; the other button follows the page theme. This example overrides button colors and corners without changing the global theme.

```demo
../example/LocalTheme.vue
```

## Brands and states

### Firefly button surfaces

Keep the existing status × variant API: yellow primary, neutral secondary and violet tertiary. Switch the card surface to compare transparent buttons, then inspect violet selection and focus across the related controls.

```demo
../example/en-US/FireflyScenes.vue
```

### More component states

Expand a group when you need to compare field variants, sizes, disabled, readonly, error or upload states. Controls remain available so you can restore the example.

```demo
../example/ThemeDetails.vue
```

## ThemeProvider examples

### Variable overrides

```demo
../../theme-provider/example/demos/basic.vue
```

### Application roots and nesting

```demo
../../theme-provider/example/demos/local-theme.vue
```

```vue
<mp-theme-provider :theme="mode">
  <App />
  <mp-theme-provider theme="light"><Preview /></mp-theme-provider>
</mp-theme-provider>
```

Omit theme to inherit. Use light/dark or a Themes preset object for an explicit boundary. Explicit themes replace inherited presets while style-vars overrides continue to inherit. style-vars overrides defaults, inner keys win, and null clears this layer. Explicit boundaries re-evaluate loaded component aliases. tag changes the wrapper; use a suitable layout host or display: contents where necessary.

Library declarative popups inherit their owning Vue provider with body, custom popup-container and inline targets. Services created outside a provider need a popup-container inside the themed region. Third-party Teleports need an explicit theme host; foreign documents must load the library styles.

## Application usage

### 1. Choose a built-in theme

| Code Theme | Light | Dark | Style |
| ------- | ---------------------- | --------------------- | ------------------------------ |
| Default | `Themes.default.light` | `Themes.default.dark` | Teal |
| Maple | `Themes.maple.light` | `Themes.maple.dark` | Red-orange |
| Alps | `Themes.alps.light` | `Themes.alps.dark` | Dark primary buttons and orange selection controls |
| Firefly | `Themes.firefly.light` | `Themes.firefly.dark` | Yellow-green primary buttons, dark-blue text and rounded fields |

Alps/Firefly light themes follow brand styling; dark themes are Maple adaptations. Business code loads brand fonts; system fallback applies otherwise.


#### Firefly color roles and existing APIs

| Purpose | Maple usage | Horo role |
| ------------------ | ------------------------------------- | --------------- |
| Yellow solid primary action | `status="primary" variant="default"` | primary |
| Neutral secondary action | `status="secondary"` | secondary |
| Purple auxiliary solid action | `status="tertiary" variant="default"` | tertiary; Firefly only |
| Purple text action | `status="tertiary" variant="text"` | text |
| Neutral text action | `status="default" variant="text"` | text_secondary |
| Yellow text on dark surfaces | `status="primary" variant="text"` | text_bg |

Yellow primary stays `#EAFF68`. Auxiliary purple fill uses `#CFC7FF`; light-mode text uses `#9A89EB`. secondary is neutral, not purple. text/outline stay transparent without extra supporting button backgrounds. Examples compare whole-card backgrounds. Raw light text does not guarantee contrast on every light background.

Selection, focus, sliders, date ranges and emphasized links use auxiliary purple. Body/general emphasis retain readable dark text adaptation. tonal/dark are Maple extensions of existing APIs, not claims of original Horo dark samples.

### 2. Set page background/text

Configure component themes together with business page backgrounds. Apply these styles to the element inside ThemeProvider that wraps the page:

```css
.app-page {
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 3. Override theme variables

Extend an existing theme, using corresponding bases for light/dark. The following adjusts only button corners:

```vue
<script setup>
import { ref } from 'vue'
import { Themes } from '@maple-design/ui-vue'
const mode = ref('dark')
</script>
<template>
  <mp-theme-provider :theme="Themes.maple[mode]" :style-vars="{ '--mp-button-border-radius': '12px' }">
    <App />
  </mp-theme-provider>
</template>
```

## Unit conversion

`Themes.toRem(theme, { rootFontSize, unitPrecision })` and `Themes.toViewport(theme, { viewportWidth, viewportUnit, unitPrecision })` return new objects. The defaults are 16px and 375px respectively, precision 6, and viewport unit `vmin`. The reference size must be finite and positive, precision an integer from 0 to 100, and the unit a CSS viewport unit. Invalid options throw `RangeError`.

`Themes.convert(theme, converter)` replaces `px` numbers in values as text. The callback receives a signed numeric string and returns the replacement. This is not a CSS parser: matching text in strings and URLs is also replaced, so pass only dimension variables suitable for conversion.

## Finding variables

| Stack level | Example | Use case |
| -------- | --------------------------------------------------------------- | ------------------------------- |
| Brand palette steps | `--mp-primary-1` … `--mp-primary-10` | Build a complete brand palette with RGB-channel values |
| Semantic roles | `--mp-sys-color-content-primary`、`--mp-sys-color-surface-page` | General business text/page backgrounds |
| Component variables | `--mp-button-primary-color`、`--mp-button-border-radius` | Target a particular component |

Use RGB channels through `rgb(var(--mp-primary-6))`. Use complete color/dimension values as documented. `--mp-sys-font-family` is the font entry; applications supply font files.

See [Design Token layers](#/en-US/design-tokens) and component style-variable tables. For form interaction, see [Form](#/en-US/form).

## Installation and defaults

```ts
import { ThemeProvider } from '@maple-design/ui-vue'
app.use(ThemeProvider)
ThemeProvider.setPropsDefaults({ theme: 'light', tag: 'section', styleVars: () => ({}) })
```

Defaults apply to subsequently created instances; explicit props take precedence. Variable objects are copied for each instance. SSR renders the same theme boundary as the client, without retaining theme state across requests.

## API

### ThemeProvider Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| theme | Light/dark mode or preset; inherit when omitted | `ThemeProviderTheme` | — |
| style-vars | CSS variables for this boundary; null clears the overrides | `StyleVars \| null` | `{}` |
| tag | Wrapper element tag | `string` | `'div'` |

The default slot supplies component content. No events.

## Types

Exports ThemeProvider, themeProviderProps, ThemeProviderProps, ThemeProviderInstance, ThemeProviderDefaults, ThemeProviderTheme, ThemeProviderMode, StyleVarName and StyleVars. Variables accept full --mp- names or camelCase names with the library prefix; values are CSS strings and dimensions require units.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
