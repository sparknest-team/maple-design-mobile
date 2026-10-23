

# HighlighterProvider

Provide a shared syntax highlighter configuration to code displays.

## Examples

<!-- api-review:start -->
### Feature playground

```demo
../example/demos/api-review.vue
```

<!-- api-review:end -->

## API

### Props

| Prop             | Description                                                  | Type           | Default       |
|------------------|--------------------------------------------------------------|----------------|------------------|
| `highlighter`    | Shader                                                       | `Highlighter`  | `-`              |
| `theme`          | Theme                                                        | _string_       | `-`              |
| `tag`            | Tag name                                                     | _string_       | `div`              |

### Slots

| Name | Description | SlotProps |
| --- | --- | --- |
| `default` | Component content | `-` |
