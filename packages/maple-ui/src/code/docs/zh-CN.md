# 代码块

### 介绍

代码块组件，用于代码着色

### 注意事项

- `Code` 不内置代码着色器，需要通过 `HighlighterProvider` 提供一个实现了 `codeToHtml` 的着色器。
- Shiki 只是推荐方案，并不是组件的强制依赖。项目已经有兼容的着色器时，不需要安装 Shiki。

### 可选：使用 Shiki

如果选择 [Shiki](https://shiki.tmrs.site/)，需要在业务项目中自行安装，例如运行 `pnpm add shiki`。使用 npm 时运行 `npm install shiki`，使用 Yarn 时运行 `yarn add shiki`。[可用主题](https://shiki.tmrs.site/themes)和其他配置请参考 Shiki 文档。

下方示例使用 Shiki，是为了演示如何向 `HighlighterProvider` 注入着色能力，并不表示 `Code` 只能与 Shiki 配合使用。

### 基本使用

```demo
../example/demos/basic-usage.vue
```

### 自动换行

设置 `word-wrap` 支持在代码溢出时自动换行。

```demo
../example/demos/word-wrap.vue
```

## API

### 属性

#### Code Props

| 参数        | 说明                             | 类型      | 默认值  |
| ----------- | -------------------------------- | --------- | ------- |
| `code`      | 代码片段                         | _string_  | `-`     |
| `language`  | 语言                             | _string_  | `-`     |
| `theme`     | 主题                             | _string_  | `-`     |
| `word-wrap` | 是否开启在代码溢出时自动换行     | _boolean_ | `false` |
| `trim`      | 是否移除代码开头和结尾的空白字符 | _boolean_ | `true`  |

#### HighlighterProvider Props

| 参数          | 说明         | 类型          | 默认值 |
| ------------- | ------------ | ------------- | ------ |
| `highlighter` | 着色器       | `Highlighter` | `-`    |
| `theme`       | 主题         | _string_      | `-`    |
| `tag`         | 自定义标签名 | _string_      | `div`  |

#### Highlighter

| 参数         | 说明                                 | 类型                                                            | 默认值 |
| ------------ | ------------------------------------ | --------------------------------------------------------------- | ------ |
| `codeToHtml` | 着色函数，组件的着色器必须实现该函数 | `(code: string, options: CodeToHtmlOptions) => Promise<string>` | `-`    |

#### CodeToHtmlOptions

| 参数    | 说明 | 类型     | 默认值 |
| ------- | ---- | -------- | ------ |
| `lang`  | 语言 | _string_ | `-`    |
| `theme` | 主题 | _string_ | `-`    |

### 样式变量

以下为组件使用的 css 变量，可以使用 [StyleProvider 组件](#/zh-CN/style-provider) 进行样式定制。

| 变量名                  | 默认值 |
| ----------------------- | ------ |
| `--mp-code-line-height` | `1.7`  |
| `--mp-code-font-size`   | `14px` |
