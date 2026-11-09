

# LocaleProvider

Set locale and messages for a subtree without changing the rest of the page.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## API

### LocaleProvider Props

| Prop | Description | Type | Default |
| -------------- | --------------- | -------------------------- | --------- |
| `locale` | Current locale | _string_ | `zh-CN` |
| `messages` | Language messages | _`Record<string, Partial<Message>>`_ | `-` |
| `dir` | Reading direction; inherits when omitted | _'ltr' \| 'rtl'_ | `-` |
| `tag` | Custom tag name | _string_ | `div` |

### LocaleProvider Slots

| Slot | Description | Prop |
| --- | --- | --- |
| `default` | Component content | `-` |


## Reading direction

`<mp-locale-provider dir="rtl">` supplies a reading-direction scope independently of locale. Omit dir to inherit; nested `dir="ltr"` and native DOM dir containers provide local overrides. Popup content retains the source scope after teleporting. Physical left/right API values and media content keep their original semantics.

### Language fallback and scope

`messages` maps language names to packs, and `locale` must match a pack in the current scope. Each key resolves to its own value in the selected local pack, then the nearest parent LocaleProvider, then the current global Locale. Missing packs or keys and `null`/`undefined` fall through; explicit empty strings are preserved. `Message` contains text and dictionaries such as calendar months and weekdays, so it is not a plain string map. Import `Message` from `@maple-design/ui/locale`.

Setting only `dir` preserves messages; nested local packs can override individual keys. Components inherit their calling scope through Vue injection, including across Teleport. Function services that create separate applications do not automatically inherit a page LocaleProvider; use the service context/configuration entry or global Locale. This component has no dedicated events or instance methods.
## CSS Variables

<!-- component-css-variables:start -->

This component declares no independent public CSS variables. Use the configuration and layout APIs documented on this page.

Internal custom properties and measurement values are implementation details and are not customization APIs.

<!-- component-css-variables:end -->
