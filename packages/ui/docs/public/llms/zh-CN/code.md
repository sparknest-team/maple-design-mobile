<!-- Source: src/code/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/code -->

# 代码块

### 介绍

代码块组件，用于代码着色

### 注意事项

- `Code` 不内置代码着色器，需要通过 `HighlighterProvider` 提供一个实现了 `codeToHtml` 的着色器。
- Shiki 只是推荐方案，并不是组件的强制依赖。项目已经有兼容的着色器时，不需要安装 Shiki。

### 可选：使用 Shiki

如果选择 [Shiki](https://shiki.tmrs.site/)，需要在业务项目中自行安装，例如运行 `pnpm add shiki`。使用 npm 时运行 `npm install shiki`，使用 Yarn 时运行 `yarn add shiki`。[可用主题](https://shiki.tmrs.site/themes)和其他配置请参考 Shiki 文档。

下方示例使用 Shiki，是为了演示如何向 `HighlighterProvider` 注入着色能力，并不表示 `Code` 只能与 Shiki 配合使用。

## 基础示例

### 基本使用

Example source: src/code/example/demos/basic-usage.vue

```vue
<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'
import { codeToHtml } from '../highlighter'

const rootTheme = ref('vitesse-light')
const customTheme = ref('github-light')
onThemeChange((theme) => {
  if (theme.toLocaleLowerCase().includes('dark')) {
    rootTheme.value = 'vitesse-dark'
    customTheme.value = 'github-dark'
  } else {
    rootTheme.value = 'vitesse-light'
    customTheme.value = 'github-light'
  }
})
</script>

<template>
  <mp-highlighter-provider :highlighter="{ codeToHtml }" :theme="rootTheme">
    <mp-space direction="column" size="lg">
      <mp-code code="console.log('Hello Maple UI')" language="javascript" />
      <mp-code code="print('Hello Maple UI')" language="python" />
      <mp-code code="console.log('Hello Maple UI')" language="javascript" :theme="customTheme" />
    </mp-space>
  </mp-highlighter-provider>
</template>
```

## 布局与排列

### 自动换行

<!-- demo-config-notes:start -->
#### 本组配置对照

| 配置 | 作用 | 相关示例 |
| --- | --- | --- |
| `code` | 代码片段 | 自动换行 |
| `language` | 语言 | 自动换行 |
| `word-wrap` | 是否开启在代码溢出时自动换行 | 自动换行 |
<!-- demo-config-notes:end -->

设置 `word-wrap` 支持在代码溢出时自动换行。

Example source: src/code/example/demos/word-wrap.vue

```vue
<script setup>
import { ref } from 'vue'
import { onThemeChange } from '@maple-design/cli-vue/client'
import { codeToHtml } from '../highlighter'

const rootTheme = ref('vitesse-light')
onThemeChange((theme) => {
  if (theme.toLocaleLowerCase().includes('dark')) {
    rootTheme.value = 'vitesse-dark'
  } else {
    rootTheme.value = 'vitesse-light'
  }
})
</script>

<template>
  <mp-highlighter-provider :highlighter="{ codeToHtml }" :theme="rootTheme">
    <mp-code code="console.log('Hello Maple UI');console.log('Hello Maple UI');" language="javascript" word-wrap />
  </mp-highlighter-provider>
</template>
```

## 使用说明

### 配置说明

没有着色器或着色失败时显示经过转义的原始代码；异步转换只采用最新结果。转换器返回的 HTML 会直接渲染，请确保其输出可信。`word-wrap` 控制代码溢出时换行；组件不提供业务事件、插槽或公开方法。

## API

### Code Props

| 参数        | 说明                             | 类型      | 默认值  |
| ----------- | -------------------------------- | --------- | ------- |
| `code`      | 代码片段                         | _string_  | `''`     |
| `language`  | 语言                             | _string_  | `-`     |
| `theme`     | 主题                             | _string_  | `-`     |
| `word-wrap` | 是否开启在代码溢出时自动换行     | _boolean_ | `false` |
| `trim`      | 是否移除代码开头和结尾的空白字符 | _boolean_ | `true`  |

### HighlighterProvider Props

| 参数          | 说明         | 类型          | 默认值 |
| ------------- | ------------ | ------------- | ------ |
| `highlighter` | 着色器       | `Highlighter` | `-`    |
| `theme`       | 主题         | _string_      | `-`    |
| `tag`         | 自定义标签名 | _string_      | `div`  |

## Types

### Highlighter

| 参数         | 说明                                 | 类型                                                            | 默认值 |
| ------------ | ------------------------------------ | --------------------------------------------------------------- | ------ |
| `codeToHtml` | 着色函数，组件的着色器必须实现该函数 | `(code: string, options: CodeToHtmlOptions) => string \| Promise<string>` | `-`    |

### CodeToHtmlOptions

| 参数    | 说明 | 类型     | 默认值 |
| ------- | ---- | -------- | ------ |
| `lang`  | 语言 | _string_ | `-`    |
| `theme` | 主题 | _string_ | `-`    |

## CSS Variables

以下为组件使用的 css 变量，可以使用 [ThemeProvider 组件](#/zh-CN/theme-provider) 进行样式定制。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-code-font-size` | `14px` | `font-size` |
| `--mp-code-line-height` | `1.7` | `line-height` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-code-font-size: 14px;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
