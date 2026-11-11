# Color

### Intro

Semantic color utilities with prefix `mp-` (Cedar uses `c-*`), variables `--mp-*`.  
Full scales: [Palette](#/en-US/palette).

```js
// playground-ignore
import '@maple-design/ui-vue/utilities/style'
```

### Class rules

| Class | Variable |
| -------------------------------------------------------------------- | -------------------------- |
| `mp-primary` / `mp-success` / `mp-warning` / `mp-danger` / `mp-info` | `rgb(var(--mp-{hue}-6))` |
| `mp-*-hover` / `mp-*-pressed` / `mp-*-disabled` | scale 5 / 7 / 3 |
| `mp-bg-primary` etc. | `rgb(var(--mp-{hue}-1))` |
| `mp-text-1` … `mp-text-4` | `var(--mp-color-text-*)` |
| `mp-fill-1` … `mp-fill-4` | `var(--mp-color-fill-*)` |
| `mp-color-border-1` … `mp-color-border-4` | `var(--mp-color-border-*)` |
| `mp-bg-0` / `mp-bg-1` / `mp-bg-2` | background levels |

`mp-info` maps to `--mp-info-*`. See phone preview for demos.

## Basic examples

### Basic usage

```demo
../example/basic.vue
```

## Empty-value recognition and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.
