# StyleProvider

Independent source copies in Cedar and Maple use identical behavior, installation and defaults.

## Basic examples

### basic

```demo
../example/demos/basic.vue
```

## Global calls

```ts
import { StyleProvider, Themes } from '@maple-design/ui'

StyleProvider.setStyleVars(Themes.default.dark)
StyleProvider.setStyleVars({ '--mp-color-scheme': 'light' })
StyleProvider.setStyleVars(null)
```

Each call replaces previous injected values rather than merging cumulatively. Values already equal to base styles are not written again.
`dark` sets `html[maple-theme="dark"]`; `light` removes it. Without color-scheme, existing attributes remain. `null` removes this library's injection/theme attributes without affecting the other library. SSR calls have no side effects.

Variables accept full CSS names or camelCase such as `mpColorScheme`. Prefixes are not added automatically. Prefer full `--mp-*` names.

## Installation and defaults

```ts
import { StyleProvider } from '@maple-design/ui'

app.use(StyleProvider)

StyleProvider.setPropsDefaults({
  tag: 'section',
  styleVars: () => ({ '--mp-demo-color': 'teal' }),
})
```

Set defaults during initialization before mounting; mounted instances are not retroactively updated. Explicit props take precedence. Object defaults are copied per instance; factories/`null` are supported. Defaults are local to each library, not shared.
Installation always registers `MpStyleProvider` without changing app-global config. Use `app.component('MyStyleProvider', StyleProvider)` for aliases.

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `style-vars` | Local CSS variables; null clears local overrides | `Record<string, string> \| null` | `{}` |
| `tag` | Wrapper tag | `string` | `div` |

The default slot supplies component content. No events.

## Type definitions

Exports `StyleVars`, `StyleProviderProps`, `StyleProviderDefaults` and `StyleProviderInstance`. `StyleProvider` is the only public component entry; `styleProviderProps` and resolver-facing `_StyleProviderComponent` are also exported.

No component-specific theme tokens. Variable values are strings; numeric dimensions should be unit-bearing strings.
