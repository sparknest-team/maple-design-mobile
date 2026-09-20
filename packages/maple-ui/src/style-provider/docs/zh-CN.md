# StyleProvider 样式定制

两端独立同源，API、安装、默认值设置和运行逻辑一致；仅平台标识与本地导入不同。

## 案例

示例演示局部变量、嵌套覆盖、清空和自定义标签。

局部变量按 DOM 继承，嵌套 Provider 可覆盖父级变量；传入 `null` 清除本层覆盖（仍会继承父级）。通过 `popupContainer` 移到 Provider 外的节点不继承局部变量。组件式调用不修改全局主题属性。



### basic

```demo
../example/demos/basic.vue
```
## 全局调用

```ts
import { StyleProvider, Themes } from '@maplejs/maple-ui'

StyleProvider.setStyleVars(Themes.default.dark)
StyleProvider.setStyleVars({ '--mp-color-scheme': 'light' })
StyleProvider.setStyleVars(null)
```

每次调用替换上次注入，不累计合并。与当前基础样式一致的变量不重复写入。
`dark` 设置 `html[maple-theme="dark"]`；`light` 移除该属性。未提供 color-scheme 时保留现有主题属性；`null` 移除本库注入和主题属性，不影响另一库。SSR 中函数调用无副作用。

变量支持完整 CSS 名称，也支持驼峰（如 `mpColorScheme`）；不会自动补充库前缀。推荐完整 `--mp-*` 名称。

## 安装与默认值

```ts
import { StyleProvider } from '@maplejs/maple-ui'

app.use(StyleProvider)

StyleProvider.setPropsDefaults({
  tag: 'section',
  styleVars: () => ({ '--mp-demo-color': 'teal' }),
})
```

在应用初始化、挂载组件之前设置默认值，不追溯更新已挂载实例；显式 Props 优先。对象形式会为每个实例复制变量对象，也支持工厂和 `null`。默认配置仅属于本库，不跨库共享。
安装固定注册 `MpStyleProvider`，不修改应用全局配置；自定义别名使用 `app.component('MyStyleProvider', StyleProvider)`。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `style-vars` | 局部变量，null 清空本层覆盖 | `Record<string, string> \| null` | `{}` |
| `tag` | 包裹标签 | `string` | `div` |

默认插槽为组件内容，无事件。

## 类型定义

导出 `StyleVars`、`StyleProviderProps`、`StyleProviderDefaults`、`StyleProviderInstance`；运行时只以 `StyleProvider` 作为公开组件入口，另导出 `styleProviderProps` 和供 resolver 使用的 `_StyleProviderComponent`。

本组件不声明专属主题 token；变量值为字符串，数字尺寸请写成带单位的字符串。
