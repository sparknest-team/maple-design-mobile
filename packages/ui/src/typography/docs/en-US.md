# Typography

### Intro

Cedar (PC) ships a full typography utility set (alignment, type scale recipes, size, family, weight, line-height; prefix `c-`).  
Maple (Mobile) **does not** duplicate that pack: mobile type is covered by components and `--mp-font-size-*` tokens; use [Atomic CSS](#/en-US/atomic-css) Uno / TW presets when you need atomic classes.

Shared semantic text-color utilities remain in Utilities: `mp-text-1` … `mp-text-4` (`--mp-color-text-*`).

### Related

- [Utilities Overview](#/en-US/utilities)
- [Atomic CSS](#/en-US/atomic-css)
- [Utility Spec](#/en-US/utilitySpec)

## Basic examples

### Basic usage

```demo
../example/basic.vue
```
