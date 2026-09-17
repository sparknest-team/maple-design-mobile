# Code

### Intro

Code Block component, used for code highlighted

### Notes

- `Code` does not bundle a syntax highlighter. Provide one that implements `codeToHtml` through `HighlighterProvider`.
- Shiki is a recommended integration, not a required dependency. You do not need to install Shiki if your project already has a compatible highlighter.

### Optional: Use Shiki

If you choose [Shiki](https://shiki.tmrs.site/), install it in your application with `pnpm add shiki`, `npm install shiki`, or `yarn add shiki`. See the Shiki documentation for [available themes](https://shiki.tmrs.site/themes) and other configuration options.

The examples below use Shiki only to demonstrate how highlighting is injected into `HighlighterProvider`; `Code` is not coupled to Shiki.

### Basic Usage

```demo
../example/demos/basic-usage.vue
```

### Word Wrap

Set `word-wrap` to support automatic line wrapping when code overflows.

```demo
../example/demos/word-wrap.vue
```

## API

### Props

#### Code Props

| Prop        | Description                                                                 | Type      | Default |
| ----------- | --------------------------------------------------------------------------- | --------- | ------- |
| `code`      | Code Snippet                                                                | _string_  | `-`     |
| `language`  | Code Language                                                               | _string_  | `-`     |
| `theme`     | Code Theme                                                                  | _string_  | `-`     |
| `word-wrap` | Whether to support automatic line wrapping when code overflows              | _boolean_ | `false` |
| `trim`      | Whether to remove the blank characters at the beginning and end of the code | _boolean_ | `true`  |

#### HighlighterProvider Props

| Prop          | Description      | Type          | Default |
| ------------- | ---------------- | ------------- | ------- |
| `highlighter` | Code Highlighter | `Highlighter` | `-`     |
| `theme`       | Code Theme       | _string_      | `-`     |
| `tag`         | Custom tag name  | _string_      | `div`   |

#### Highlighter

| Prop         | Description                                                              | Type                                                            | Default |
| ------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------- | ------- |
| `codeToHtml` | Highlighter function, component highlighter must implement this function | `(code: string, options: CodeToHtmlOptions) => Promise<string>` | `-`     |

#### CodeToHtmlOptions

| Prop    | Description   | Type     | Default |
| ------- | ------------- | -------- | ------- |
| `lang`  | Code Language | _string_ | `-`     |
| `theme` | Code Theme    | _string_ | `-`     |

### Style Variables

Here are the CSS variables used by the component. Styles can be customized using [StyleProvider](#/en-US/style-provider).

| Variable                | Default |
| ----------------------- | ------- |
| `--mp-code-line-height` | `1.7`   |
| `--mp-code-font-size`   | `14px`  |
