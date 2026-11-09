# ThemeProvider

One theme boundary for the entire application or a subtree. A provider around the application is its global theme; nesting creates local overrides with the same rules. Providers never mutate html or other application roots.

## Basic examples

### Variable overrides

```demo
../example/demos/basic.vue
```

## Local themes

### Application roots and nesting

```demo
../example/demos/local-theme.vue
```

```vue
<mp-theme-provider :theme="mode">
  <App />
  <mp-theme-provider theme="light"><Preview /></mp-theme-provider>
</mp-theme-provider>
```

Omit theme to inherit. Use light/dark or a Themes preset object for an explicit boundary. Explicit themes replace inherited presets while style-vars overrides continue to inherit. style-vars overrides defaults, inner keys win, and null clears this layer. Explicit boundaries re-evaluate loaded component aliases. tag changes the wrapper; use a suitable layout host or display: contents where necessary.

Library declarative popups inherit their owning Vue provider with body, custom popup-container and inline targets. Services created outside a provider need a popup-container inside the themed region. Third-party Teleports need an explicit theme host; foreign documents must load the library styles.

## Theme presets

```vue
<mp-theme-provider :theme="Themes.maple.dark">
  <App />
</mp-theme-provider>
```

Import Themes from the library root. Update presets and custom variables through reactive props; no static method mutates the document root. Explicit style-vars take precedence over theme defaults, and fixed color overrides are inherited by descendants.

## Installation and defaults

```ts
import { ThemeProvider } from '@maple-design/ui'
app.use(ThemeProvider)
ThemeProvider.setPropsDefaults({ theme: 'light', tag: 'section', styleVars: () => ({}) })
```

Defaults apply to subsequently created instances; explicit props take precedence. Variable objects are copied for each instance. SSR renders the same theme boundary as the client, without retaining theme state across requests.

## API

### ThemeProvider Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| theme | Light or dark theme; inherit when omitted | `ThemeProviderTheme` | — |
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
