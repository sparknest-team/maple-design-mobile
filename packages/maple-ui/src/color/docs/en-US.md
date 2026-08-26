# Color

### Intro

Semantic color utilities with prefix `mp-` (Cedar uses `c-*`), variables `--mp-*`.  
Full scales: [Palette](#/en-US/palette).

```js
// playground-ignore
import '@maplejs/maple-ui/es/utilities/utilities.css'
```

### Class rules

| Class | Variable |
|---|---|
| `mp-primary` / `mp-success` / `mp-warning` / `mp-danger` / `mp-info` | `rgb(var(--mp-{hue}-6))` |
| `mp-*-hover` / `mp-*-pressed` / `mp-*-disabled` | scale 5 / 7 / 3 |
| `mp-bg-primary` etc. | `rgb(var(--mp-{hue}-1))` |
| `mp-text-1` … `mp-text-4` | `var(--mp-color-text-*)` |
| `mp-fill-1` … `mp-fill-4` | `var(--mp-color-fill-*)` |
| `mp-color-border-1` … `mp-color-border-4` | `var(--mp-color-border-*)` |
| `mp-bg-0` / `mp-bg-1` / `mp-bg-2` | background levels |

`mp-info` maps to `--mp-info-*`. See phone preview for demos.
