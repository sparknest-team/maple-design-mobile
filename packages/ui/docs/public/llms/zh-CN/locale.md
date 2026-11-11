<!-- Source: src/locale/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/locale -->

# 国际化

### 介绍

组件库使用中文作为默认语言，支持多语言切换。

### 多语言切换 (函数式)

使用 `Locale.add` 进行语言扩展。

```js
// playground-ignore
import { Locale } from '@maple-design/ui-vue'

Locale.add('en-US', Locale.enUS)
```

使用 `Locale.merge` 进行语言内容覆盖。

```js
// playground-ignore
Locale.merge('en-US', {
  dialogTitle: 'Hello'
})
```

使用 `Locale.use` 切换语言。

```js
// playground-ignore
Locale.use('en-US')
```

### 多语言切换 (组件声明式)

```html
<script setup>
import { ref } from 'vue'
import { Locale } from '@maple-design/ui-vue'

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
    <mp-button status="primary" @click="switchLocale">切换</mp-button>
  </mp-locale-provider>
</template>
```

### 注意事项

- `Locale.use` 操作的是单例语言实例，请不要在服务端使用，推荐用于客户端渲染的场景。
- `LocaleProvider` 仅对组件包裹的子孙组件有效，对组件的函数式调用无效，推荐用于服务端渲染的场景。

### 目前支持的语言

| 语言名称 | 语言编码 | 语言包 | 支持版本 |
| --- | --- | --- | --- |
| `简体中文` | zh-CN | _Locale.zhCN_ | `v2.0.0` |
| `英语` | en-US| _Locale.enUS_ | `v2.0.0` |
| `繁体中文(台)` | zh-TW | _Locale.zhTW_ | `v2.17.0` |
| `繁体中文(港)` | zh-HK | _Locale.zhHK_ | `v2.17.0` |
| `波斯语` | fa-IR | _Locale.faIR_ | `v2.22.0` |
| `日语` | ja-JP | _Locale.jaJP_ | `v3.9.0` |

## 基础示例

### 局部语言对照

两个子树分别显示中文与英文，不修改页面其他区域的语言。

Example source: src/locale-provider/example/demos/basic.vue

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const custom = ref(false)
const messages = {
  'zh-CN': { emptyDescription: '暂无数据' },
  'en-US': { emptyDescription: 'No data' },
}
const activeMessages = computed(() =>
  custom.value
    ? {
        'zh-CN': { emptyDescription: '自定义暂无数据' },
        'en-US': { emptyDescription: 'Custom no data' },
      }
    : messages,
)
</script>

<template>
  <mp-checkbox v-model="custom">自定义语言包 / Custom messages</mp-checkbox>
  <mp-locale-provider locale="zh-CN" :messages="activeMessages">
    <mp-empty />
  </mp-locale-provider>
  <mp-locale-provider locale="en-US" :messages="activeMessages">
    <mp-empty />
  </mp-locale-provider>
</template>
```

## API

### LocaleProvider Props

| 参数         | 说明   | 类型                     | 默认值 | 
|--------------|---------------|--------------------------|---------| 
| `locale` | 当前语言 | _string_ | `zh-CN`    |
| `messages`    | 语言包      | _Record<string, Record<string, string>>_                 | `-`   |
| `tag`    | 自定义标签名      | _string_                 | `div`   |

### LocaleProvider Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 组件内容 | `-` |

### 全局对象与独立实例

根入口的 `Locale` 是全局单例；默认只注册并启用 `zh-CN`。使用其他内置语言前先调用 `Locale.add`，再调用 `Locale.use`。日语通过 `Locale.jaJP` 取得；`locale` 子入口没有单独的 `jaJP` 命名导出。`Locale.useLocale()`（或从 `@maple-design/ui-vue/locale` 命名导入 `useLocale`）创建独立实例，它与 Cedar 的同名全局切换函数含义不同。

`add(lang, message)` 会把 `lang` 写入传入对象；替换当前语言的数据后需再次 `use` 才会更新当前引用。`merge(lang, partial)` 浅合并并切换到该语言。`t` 以完整键查找，缺失返回 `undefined`，不负责通用插值或嵌套路径解析。语言切换不会自动改变阅读方向。

## CSS Variables

<!-- component-css-variables:start -->

本组件未声明独立的公共 CSS 变量。请使用本页公开的配置与布局入口。

内部自定义属性与测量中间值属于实现细节，不作为业务定制 API。

<!-- component-css-variables:end -->
