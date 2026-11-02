# Theme Customization

Start with a built-in theme, then override the CSS variables you need. Themes control colors, corners and fonts. Use [SafeArea](#/en-US/safe-area) for device-edge spacing.

## Choose an approach

| Goal | Recommended approach |
| ------------------------------- | ------------------------------------------------------------------ |
| One brand across the app | `StyleProvider.setStyleVars()` with a built-in light or dark theme |
| Customize a region or component | `<mp-style-provider :style-vars="…">` |
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
../example/FireflyScenes.vue
```

### More component states

Expand a group when you need to compare field variants, sizes, disabled, readonly, error or upload states. Controls remain available so you can restore the example.

```demo
../example/ThemeDetails.vue
```

## Application usage

### 1. Choose a built-in theme

| Code Theme | Light | Dark | Style |
| ------- | ---------------------- | --------------------- | ------------------------------ |
| Default | `Themes.default.light` | `Themes.default.dark` | Teal |
| Maple | `Themes.maple.light` | `Themes.maple.dark` | Red-orange |
| Alps | `Themes.alps.light` | `Themes.alps.dark` | Dark primary buttons and orange selection controls |
| Firefly | `Themes.firefly.light` | `Themes.firefly.dark` | Yellow-green primary buttons, dark-blue text and rounded fields |

Alps/Firefly light themes follow brand styling; dark themes are Maple adaptations. Business code loads brand fonts; system fallback applies otherwise.

```ts
import { StyleProvider, Themes } from '@maple-design/ui'

// Set before mounting, or call again when users change themes.
StyleProvider.setStyleVars(Themes.maple.light)
StyleProvider.setStyleVars(Themes.maple.dark)
```

Light objects remove `html[maple-theme="dark"]`; dark objects set it. Every call replaces injected variables rather than merging cumulatively.

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

This change covers Firefly variables only; default/Maple/Alps light/dark palettes remain unchanged.

### 2. Set page background/text

Configure component themes together with business page backgrounds. Add these global application styles:

```css
body {
  color: var(--mp-color-text);
  background-color: var(--mp-color-body);
  color-scheme: var(--mp-color-scheme);
}
```

### 3. Override theme variables

Extend an existing theme, using corresponding bases for light/dark. The following adjusts only button corners:

```ts
StyleProvider.setStyleVars({
  ...Themes.maple.light,
  '--mp-button-border-radius': '16px',
})
```

Prefer actual component variables for local customization. Locally changing palette steps does not recompute aliases inherited from the root. See [StyleProvider](#/en-US/style-provider). Body-teleported popups need variables on their actual mount host.

## Finding variables

| Stack level | Example | Use case |
| -------- | --------------------------------------------------------------- | ------------------------------- |
| Brand palette steps | `--mp-primary-1` … `--mp-primary-10` | Build a complete brand palette with RGB-channel values |
| Semantic roles | `--mp-sys-color-content-primary`、`--mp-sys-color-surface-page` | General business text/page backgrounds |
| Component variables | `--mp-button-primary-color`、`--mp-button-border-radius` | Target a particular component |

Use RGB channels through `rgb(var(--mp-primary-6))`. Use complete color/dimension values as documented. `--mp-sys-font-family` is the font entry; applications supply font files.

See [Design Token layers](#/en-US/design-tokens) and component style-variable tables. For form interaction, see [Form](#/en-US/form).
