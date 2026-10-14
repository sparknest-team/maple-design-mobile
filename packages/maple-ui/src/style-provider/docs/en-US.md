# StyleProvider

Independent source copies in Cedar and Maple use identical behavior, installation and defaults.



### basic

```demo
../example/demos/basic.vue
```
## Local variables

Use `<mp-style-provider :style-vars="vars" tag="section">`. Variables follow DOM inheritance; nested providers override ancestors. Passing null clears only the local override. Content moved outside the provider by popupContainer does not inherit its variables. Local providers never change the document theme.

Prefer direct component variables for local customization. A palette/system override does not rebind component aliases already inherited from the root; redeclare the required mappings locally. This is not an automatic full-theme rebuild. Put popup overrides on the actual destination host. See [Design Tokens and CSS Variable Layers](#/en-US/design-tokens).

## Global variables

```ts
import { StyleProvider, Themes } from '@maplejs/maple-ui'
StyleProvider.setStyleVars(Themes.default.dark)
StyleProvider.setStyleVars({ '--mp-color-scheme': 'light' })
StyleProvider.setStyleVars(null)
```

Calls replace previous overrides rather than merge. Unchanged baseline values are omitted. Dark sets html[maple-theme="dark"]; light removes the attribute. Without color-scheme the current attribute is preserved. Null removes only Maple's style and theme attribute. Global calls are no-ops during SSR.
Keys accept full CSS names or camelCase (mpColorScheme); the library prefix is not automatically added. Values are strings; dimensions need explicit units.

## Installation and defaults

```ts
app.use(StyleProvider)
StyleProvider.setPropsDefaults({
  tag: 'section',
  styleVars: () => ({ '--mp-demo-color': 'teal' }),
})
```

Configure defaults through this single component entry before mounting; existing instances are not updated. Explicit props win. Variable objects are copied per instance; factories and null are also supported. Each library owns its defaults.
Installation registers MpStyleProvider without changing application configuration. Use app.component for custom aliases.

## API

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| style-vars | Local CSS variables; null clears local overrides | `Record<string, string> \| null` | `{}` |
| tag | Wrapper tag | `string` | `div` |

The default slot holds content. No events or component-specific tokens.
Exported types: StyleVars, StyleProviderProps, StyleProviderDefaults, StyleProviderInstance.
StyleProvider is the only public component entry. Runtime exports also include styleProviderProps and the resolver-only _StyleProviderComponent.
