# Utilities Overview

### Intro

Maple / Cedar share utility structure; **class names must use library prefixes** (`mp-` / `c-`), variables `--mp-*` / `--c-*`.  
No unprefixed aliases and no backward-compat shims.

| | Maple | Cedar |
|---|---|---|
| Class | `mp-text-1`, `mp-mt-16` | `c-text-1`, `c-mt-16` |
| Ship | standalone Utilities + Uno/TW preset | fixed Utilities + Uno/TW preset |
| Token | `--mp-*` | `--c-*` |

### Import

```js
// playground-ignore
import '@maple-design/ui/es/utilities/utilities.css'
```

Theme CSS variables must be loaded.

### Sections

| Page | Content |
|---|---|
| [Color](#/en-US/color) | Status colors, text / fill / border / bg |
| [Common Utilities](#/en-US/atomic-usage) | Flex / spacing / size / overflow / radius |
| [Elevation](#/en-US/styles) | `mp-elevation--0` … `--24` |
| [Typography](#/en-US/typography) | Full pack on Cedar; Maple uses tokens / atomic CSS |
| [Atomic CSS](#/en-US/atomic-css) | Uno / TW install and config |
| [Utility Spec](#/en-US/utilitySpec) | Shared conventions |

Palette scales: [Palette](#/en-US/palette). Phone preview shows a quick overview.
