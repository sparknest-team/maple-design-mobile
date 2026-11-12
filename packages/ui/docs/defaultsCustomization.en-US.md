# Defaults and global configuration

## Set Global Component Defaults

Every component provides `setPropsDefaults` for changing the defaults of declarative instances created afterward. Call it before mounting the application:

```ts
import { Button, ThemeProvider } from '@maple-design/ui-vue'

Button.setPropsDefaults({
  status: 'primary',
  variant: 'tonal',
  size: 'lg',
})

// Other components use the same API
ThemeProvider.setPropsDefaults({
  tag: 'section',
})
```

Explicit component props take precedence. Existing mounted instances are not updated; object and array defaults are copied per instance.

## Global Context

Import `Context` from `@maple-design/ui-vue`, or default-import the same reactive object from `@maple-design/ui-vue/context`. It has `zIndex` (default 2000) and `enableRipple` (default true). Changing `zIndex` affects later allocations, not already open layers. Disabling ripple prevents new waves without disabling host interactions.

This is a module singleton shared by applications and server requests using the same module instance; do not mutate it for per-request SSR isolation. SSR starts at 2000 and allocates from the current value after mounting. The test environment does not increment allocations, and separate bundled copies have separate state. It is not a component and has no props, events, slots, or instance methods.
