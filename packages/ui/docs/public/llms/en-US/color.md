<!-- Source: src/color/docs/en-US.md; locale: en-US; page: /en-US/color -->

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

Example source: src/color/example/basic.vue

```vue
<script setup>
import { onThemeChange } from '@maple-design/cli-vue/client'

onThemeChange()
const status = ['primary', 'success', 'warning', 'danger', 'info']
const levels = [1, 2, 3, 4]
</script>

<template>
  <div class="demo mp-px-16 mp-py-16">
    <div class="mp-text-1 mp-mb-8">Status</div>
    <div class="mp-flex mp-flex-wrap mp-items-center" style="gap: 8px">
      <div
        v-for="name in status"
        :key="name"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="[`mp-${name}`, `mp-bg-${name}`]"
      >
        mp-{{ name }}
      </div>
    </div>

    <div class="mp-text-1 mp-mt-24 mp-mb-8">Text / Fill / Border / Bg</div>
    <div class="mp-flex mp-flex-wrap" style="gap: 8px">
      <div v-for="n in levels" :key="`t-${n}`" :class="`mp-text-${n}`">mp-text-{{ n }}</div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div v-for="n in levels" :key="`f-${n}`" class="mp-px-8 mp-py-4 mp-rounded-sm" :class="`mp-fill-${n}`">
        mp-fill-{{ n }}
      </div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in levels"
        :key="`bd-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm"
        :class="`mp-color-border-${n}`"
        style="border-width: 2px; border-style: solid"
      >
        mp-color-border-{{ n }}
      </div>
    </div>
    <div class="mp-flex mp-flex-wrap mp-mt-8" style="gap: 8px">
      <div
        v-for="n in [0, 1, 2]"
        :key="`b-${n}`"
        class="mp-px-8 mp-py-4 mp-rounded-sm mp-border-2"
        :class="`mp-bg-${n}`"
        style="border-width: 1px; border-style: solid"
      >
        mp-bg-{{ n }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../../style/theme/css-variables.less';
@import '../../utilities/style/utilities.less';
</style>
```

## Empty-value recognition and reading placeholders

`empty-values` recognizes empty data; `empty-value` keeps existing clear output. `empty-text` defaults to `'-'` under `read-pretty`, with Field > FormItem > Form precedence and custom read slots first. With explicit `empty-values`, built-in required uses the policy; custom validators receive original data. See the [shared guide](#/en-US/emptyValues).

| Prop | Type | Default and scope |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | Field > FormItem > Form > component-family default; replaces the whole list |
| empty-text | string | Field > FormItem > Form > '-'; explicit '' is valid |

These props belong to field presentation; pure panels do not gain reading mode. Form and FormItem provide inherited settings. The existing empty-value type and clear fallback remain component-specific.
