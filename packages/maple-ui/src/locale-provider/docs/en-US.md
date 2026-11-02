

# LocaleProvider

Set locale and messages for a subtree without changing the rest of the page.

## Basic examples

### Basic usage

```demo
../example/demos/basic.vue
```

## API

### Props

| Arguments | Description | Type | Default |
| -------------- | --------------- | -------------------------- | --------- |
| `locale` | Current locale | _string_ | `zh-CN` |
| `messages` | Language messages | _Record<string, Record<string, string>>_ | `-` |
| `tag` | Custom tag name | _string_ | `div` |

### Slots

| Slot | Description | Arguments |
| --- | --- | --- |
| `default` | Component content | `-` |


## Reading direction

`<mp-locale-provider dir="rtl">` supplies a reading-direction scope independently of locale. Omit dir to inherit; nested `dir="ltr"` and native DOM dir containers provide local overrides. Popup content retains the source scope after teleporting. Physical left/right API values and media content keep their original semantics.
