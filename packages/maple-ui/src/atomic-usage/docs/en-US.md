# Common Utilities

Daily class cheat sheet. Setup and theme tokens: [Atomic CSS](#/en-US/atomic-css).

- Always use the `mp-` prefix; no unprefixed aliases
- Numeric spacing / size: `1 = 1px`, e.g. `mp-p-8` is 8px, `mp-h-40` is 40px
- Variants come first: `hover:mp-opacity-80` `focus:mp-border-primary`
- Breakpoints are unprefixed: `sm:mp-flex` `md:mp-p-24`

UnoCSS and Tailwind share the same class names; enable one generator per app.

### Layout

| Kind | Common classes |
| --- | --- |
| Display | `mp-block` `mp-inline-block` `mp-inline-flex` `mp-flex` `mp-grid` `mp-hidden` |
| Flex direction | `mp-flex-row` `mp-flex-col` `mp-flex-wrap` |
| Main axis | `mp-justify-start` `mp-justify-center` `mp-justify-between` `mp-justify-end` |
| Cross axis | `mp-items-start` `mp-items-center` `mp-items-stretch` `mp-items-end` |
| Flex grow | `mp-flex-1` `mp-flex-none` `mp-shrink-0` `mp-grow` |
| Grid | `mp-grid-cols-2` `mp-grid-cols-3` `mp-col-span-2` |

```html
<!-- playground-ignore -->
<div class="mp-flex mp-items-center mp-justify-between mp-gap-8">
  <span>Left</span>
  <span>Right</span>
</div>
```

### Position

| Kind | Common classes |
| --- | --- |
| Mode | `mp-relative` `mp-absolute` `mp-fixed` `mp-affix` `mp-static` |
| Edges | `mp-inset-0` `mp-top-0` `mp-right-0` `mp-bottom-0` `mp-left-0` |
| Stacking | `mp-z-0` `mp-z-10` `mp-z-20` `mp-z-50` |

`inset` / `top` values use the spacing scale: `mp-top-8` is `8px`.

### Spacing

| Kind | Common classes |
| --- | --- |
| margin | `mp-m-16` `mp-mt-8` `mp-mx-16` `mp-my-8` `mp-m-auto` `mp-ml-auto` |
| padding | `mp-p-16` `mp-px-12` `mp-py-8` `mp-pt-24` |
| gap | `mp-gap-8` `mp-gap-x-16` `mp-gap-y-12` |

Directions: `t` top / `r` right / `b` bottom / `l` left / `x` horizontal / `y` vertical.

### Size

| Kind | Common classes |
| --- | --- |
| Width / height | `mp-w-40` `mp-h-40` `mp-w-full` `mp-h-full` `mp-w-auto` `mp-h-auto` |
| Fractions | `mp-w-1/2` `mp-w-1/3` `mp-h-1/2` |
| Viewport | `mp-w-screen` `mp-h-screen` `mp-min-h-screen` |
| Constraints | `mp-min-w-0` `mp-max-w-md` `mp-min-h-0` `mp-max-h-full` |

`mp-h-10` is **10px**, not 10%. Use `mp-h-full` or `mp-h-1/2` for percentages.

### Overflow

| Kind | Common classes |
| --- | --- |
| overflow | `mp-overflow-hidden` `mp-overflow-auto` `mp-overflow-scroll` `mp-overflow-visible` |
| Axis | `mp-overflow-x-auto` `mp-overflow-y-auto` `mp-overflow-x-hidden` |
| Single-line | `mp-truncate` |
| Multi-line | `mp-line-clamp-1` `mp-line-clamp-2` `mp-line-clamp-3` |

### Typography

| Kind | Common classes |
| --- | --- |
| Align | `mp-text-left` `mp-text-center` `mp-text-right` |
| Theme font size | `mp-text-xs` `mp-text-sm` `mp-text-md` `mp-text-lg` |
| Weight | `mp-font-normal` `mp-font-medium` `mp-font-semibold` `mp-font-bold` |
| Line height | `mp-leading-none` `mp-leading-tight` `mp-leading-normal` |
| Whitespace | `mp-whitespace-nowrap` `mp-whitespace-pre-wrap` |
| Wrap | `mp-break-words` `mp-break-all` |

Do not confuse these with semantic text colors `mp-text-1` … `mp-text-4`.

### Color

Theme color classes set only the matching property. Pair border color with a width class.

| Use | Common classes |
| --- | --- |
| Background | `mp-bg-body` `mp-bg-primary` `mp-bg-success` `mp-bg-warning` `mp-bg-danger` `mp-bg-info` `mp-bg-disabled` |
| Text | `mp-text-primary` `mp-text-success` `mp-text-white` |
| Border color | `mp-border-primary` `mp-border-danger` |

Semantic levels (`mp-text-1`, `mp-fill-2`, `mp-color-border-2`, `mp-bg-1`) live on [Color](#/en-US/color). Palette scales: [Palette](#/en-US/palette).

```html
<!-- playground-ignore -->
<div class="mp-border mp-border-primary">primary border</div>
<mp-button class="mp-bg-primary mp-text-white hover:mp-opacity-80">Save</mp-button>
```

### Border

| Kind | Common classes |
| --- | --- |
| Width | `mp-border` `mp-border-0` `mp-border-2` `mp-border-t` `mp-border-b` |
| Style | `mp-border-solid` `mp-border-dashed` `mp-border-none` |

### Rounded

| Common classes | Note |
| --- | --- |
| `mp-rounded-none` `mp-rounded-sm` `mp-rounded-md` `mp-rounded-lg` `mp-rounded-xl` `mp-rounded-full` | Uno / TW scale |
| `mp-rounded-t-md` `mp-rounded-l-lg` | One side |

### Variants

| Kind | Syntax |
| --- | --- |
| Interaction | `hover:mp-opacity-80` `focus:mp-border-primary` `active:mp-opacity-70` `disabled:mp-opacity-40` |
| Breakpoints | `sm:mp-flex` `md:mp-p-24` `lg:mp-grid-cols-3` `xl:mp-max-w-screen` |

Breakpoints: `sm` 768 / `md` 992 / `lg` 1200 / `xl` 1920.

Do not interpolate class names such as `mp-bg-${status}`; Uno / TW only scans complete literals.

### Not on this page

| Topic | Where |
| --- | --- |
| Elevation / shadow | [Elevation](#/en-US/styles); `mp-shadow-*` is blocked |
| Semantic color levels | [Color](#/en-US/color) |
| Palette scales | [Palette](#/en-US/palette) |
| Install / config | [Atomic CSS](#/en-US/atomic-css) |
