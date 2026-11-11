<!-- Source: docs/utilitySpec.en-US.md; locale: en-US; page: /en-US/utilitySpec -->

# Utility Spec

### Intro

Cedar and Maple share the same utility semantics and structure. Class names and CSS variables use library prefixes to avoid collisions when both libraries are present.

| | Cedar | Maple |
|---|---|---|
| Class prefix | `c-` (e.g. `c-text-1`, `c-mt-16`) | `mp-` (e.g. `mp-text-1`, `mp-mt-16`) |
| CSS variables | `--c-*` | `--mp-*` |
| Ship | `style/tools.less` | standalone `utilities` + Uno/TW preset |

**No unprefixed aliases. No backward-compat shims.**

### Shared standard set

- **Color**: status colors, text / fill / border / background levels
- **Spacing / Size**: numeric classes generated only by the Uno / Tailwind preset, such as `mp-mt-16`, `mp-h-10`, `mp-w-full`. Daily catalog: [Common Utilities](#/en-US/atomic-usage).
- **Rounded / Shadow / Flex / Display / Position / Overflow**: overflow and ellipsis come from the atomic preset, such as `mp-overflow-hidden`, `mp-truncate`, `mp-line-clamp-2`
- **Elevation**: `{p}-elevation--0` … `--24` (Maple: separate CSS; Cedar: with box-shadow tools)

### Platform differences (menu aligned, capability differs)

| Item | Cedar | Maple |
|---|---|---|
| Typography utility pack | Yes (PC extensions) | No (tokens / atomic CSS) |
| Atomic CSS presets | `@cedar-design/preset-unocss-vue` / `@cedar-design/preset-tailwindcss-vue` | `@maple-design/preset-unocss-vue` / `@maple-design/preset-tailwindcss-vue` |

### Forbidden

- Unprefixed utility classes or variables
- Duplicate spacing atoms in fixed Utilities or full palette atoms in the default pack
- Bundling Maple utilities into the full component CSS

See also Cedar docs: Practices → Utility Spec.
