<!-- Source: src/style-provider/docs/en-US.md; locale: en-US; page: /en-US/style-provider -->

# StyleProvider

Independent source copies in Cedar and Maple use identical behavior, installation and defaults.


## 案例

### basic

Example source: src/style-provider/example/demos/basic.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
</script>

<template>
  <div>
    <mp-button variant="outline" @click="active = !active">切换局部变量 / Toggle local variables</mp-button>
    <mp-style-provider tag="section" :style-vars="active ? { '--mp-demo-color': 'teal' } : null">
      <p style="color: var(--mp-demo-color, currentColor)">局部颜色 / Local color</p>
      <mp-style-provider :style-vars="{ '--mp-demo-color': 'coral' }">
        <p style="color: var(--mp-demo-color)">嵌套覆盖 / Nested override</p>
      </mp-style-provider>
    </mp-style-provider>
    <p>外部不受影响 / Outside remains unchanged</p>
  </div>
</template>
```

## Local variables

The demo button toggles only the outer section's local variables. Disabling restores inherited text color while the nested coral override and outside text remain unchanged; toggling again restores teal. The demo does not call global setStyleVars, so it does not verify global theme injection, replacement or cleanup.

Use `<mp-style-provider :style-vars="vars" tag="section">`. Variables follow DOM inheritance; nested providers override ancestors. Passing null clears only the local override. Content moved outside the provider by popupContainer does not inherit its variables. Local providers never change the document theme.

Prefer direct component variables for local customization. A palette/system override does not rebind component aliases already inherited from the root; redeclare the required mappings locally. This is not an automatic full-theme rebuild. Put popup overrides on the actual destination host. See [Design Tokens and CSS Variable Layers](#/en-US/design-tokens).

## Global variables

```ts
import { StyleProvider, Themes } from '@maple-design/ui'
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
