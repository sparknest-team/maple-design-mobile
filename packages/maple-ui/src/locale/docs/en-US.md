# Locale

### Intro

Component library uses Chinese as the default language, support multi-language switch.

### Multi-language Switch (Functional)

`Locale.add` is used for language mounted.

```js
// playground-ignore
import { Locale } from '@maple-design/ui'

Locale.add('en-US', Locale.enUS)
```

Use `Locale.merge` to override languages.

```js
// playground-ignore
Locale.merge('en-US', {
  dialogTitle: 'Hello'
})
```

Use `Locale.use` to switch language.

```js
// playground-ignore
Locale.use('en-US')
```

### Multi-language Switch (Component declarative)

```html
<script setup>
import { ref } from 'vue'
import { Locale } from '@maple-design/ui'

const date = ref('2021-04-08')
const locale = ref('zh-CN')
const messages = {
  'zh-CN': Locale.zhCN,
  'en-US': Locale.enUS
}

function switchLocale() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <mp-locale-provider :locale="locale" :messages="messages">
    <mp-date-picker v-model="date" />
    <mp-button status="primary" @click="switchLocale">Switch</mp-button>
  </mp-locale-provider>
</template>
```

### Notes

- `Locale.use` operates on a singleton language instance context. Do not call it on the server. It is recommended for client-side rendering scenarios.
- `LocaleProvider` is only valid for the sub-components it wraps, and is invalid for functional calls to components. It is recommended for server-side rendering scenarios.

### Currently Supported Languages

| Language Name | Language Code | Language Pack | Supported Version |
| --- | --- | --- | --- |
| `Chinese` | zh-CN | _Locale.zhCN_ | `v2.0.0` |
| `English` | en-US | _Locale.enUS_ | `v2.0.0` |
| `Traditional Chinese (TW)` | zh-TW | _Locale.zhTW_ | `v2.17.0` |
| `Traditional Chinese (HK)` | zh-HK | _Locale.zhHK_ | `v2.17.0` |
| `Farsi` | fa-IR | _Locale.faIR_ | `v2.22.0` |
| `Japanese` | ja-JP | _Locale.jaJP_ | `v3.9.0` |

## Basic examples

### Local language comparison

```demo
../../locale-provider/example/demos/basic.vue
```

## API

### LocaleProvider Props

| Prop | Description | Type | Default |
| -------------- | --------------- | -------------------------- | --------- |
| `locale` | Current locale | _string_ | `zh-CN` |
| `messages` | Language messages | _Record<string, Record<string, string>>_ | `-` |
| `tag` | Custom tag name | _string_ | `div` |

### LocaleProvider Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Component content | `-` |

### Global and independent instances

The root `Locale` is a global singleton with only `zh-CN` registered and active by default. Add another built-in language with `Locale.add` before selecting it with `Locale.use`. Japanese is available as `Locale.jaJP`; the `locale` entry has no separate named `jaJP` export. `Locale.useLocale()` (or the named `useLocale` export from `@maple-design/ui/locale`) creates an independent instance; it differs from Cedar's global language-switching function of the same name.

`add(lang, message)` writes `lang` to the supplied object. After replacing the current language's data, call `use` again to update the current reference. `merge(lang, partial)` shallow-merges and selects that language. `t` looks up a complete key, returns `undefined` for missing keys, and does not provide generic interpolation or nested-path lookup. Changing language does not automatically change reading direction.

## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
