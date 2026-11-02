<!-- Source: src/locale-provider/docs/en-US.md; locale: en-US; page: /en-US/locale-provider -->

# LocaleProvider

Set locale and messages for a subtree without changing the rest of the page.

## Examples

## API

### Props

| Prop         | Description   | Type                     | Default | 
|--------------|---------------|--------------------------|---------| 
| `locale` | Current locale | _string_ | `zh-CN`    |
| `messages`    | Language messages      | _Record<string, Record<string, string>>_                 | `-`   |
| `tag`        | Tag name      | _string_                 | `div`   |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Component content | `-` |
