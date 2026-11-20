# 组件库快速成型工具

### 介绍

开箱即用的 `Vue3组件库` 快速成型工具，提供了一系列命令和工具去解决组件库开发上的问题。

### 特性

- 📦 &nbsp;开箱即用的组件库开发环境
- 📦 &nbsp;开箱即用的组件库编译工具，支持导出 `esm`, `cjs`, `umd` 三种模块代码
- 🛠️ &nbsp;基于配置文件的组件库文档站点，支持百度统计和主题定制
- 🛠️ &nbsp;支持 `sfc` 和 `tsx` 两种风格的组件库编写风格
- 📦 &nbsp;开箱即用的代码检查工具
- 📦 &nbsp;开箱即用的单元测试工具
- 📦 &nbsp;开箱即用的代码发布工具,同时发布到 `npm` 和 `github`, 并自动生成更新日志
- 💪 &nbsp;支持 `VSCode` 插件开发
- 💪 &nbsp;支持 `字体图标打包`
- 💪 &nbsp;支持 `Typescript`
- 💪 &nbsp;支持 `多种主题, 包含 default / maple 品牌及明暗模式`
- 🌍 &nbsp;支持 `国际化`
- 🚀 &nbsp;基于 `pnpm`

### 快速开始

`@maple-design/cli-vue` 内置了 `sfc` 和 `tsx` 两种风格的组件库项目模板，可以通过 `gen` 命令直接生成。
方便您直接进入组件库开发。

```shell
# playground-ignore
pnpm add @maple-design/cli-vue -g
maple-cli gen
```

## 高级定制

### 配置文件

项目根目录下的 `maple.config.mjs` 用来管理整个组件库项目的具体细节。
默认配置可查阅 [maple.default.config.ts](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/cli/src/node/config/maple.default.config.ts?ref_type=heads)。
也可以参考 `@maple-design/ui-vue` 的 [maple.config.mjs](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/ui/maple.config.mjs?ref_type=heads)。

| 参数 | 说明 | 类型 | 默认值 |
| -- | -------------- | -------- | ---------- |
| `name` | 组件库全名，会作为包名 | _string_ | `Maple` |
| `namespace` | 组件库命名空间, 会作为组件前缀 | _string_ | `var` |
| `host` | 开发服务器主机 | _number_ | `localhost` |
| `port` | 开发服务器端口 | _number_ | `8080` |
| `proxy` | 开发服务器代理 | _Record<string, string \| ProxyOptions>_ | `-` |
| `title` | 文档中组件库的标题 | _string_ | `Maple` |
| `logo` | 文档中组件库的 logo | _string_ | `-` |
| `alias` | 路径别名 (使用相对路径时，根路径为 src 文件夹) | _Record<string, string>_ | `-` |
| `defaultLanguage` | 文档默认语言 | _string_ | `zh-CN` |
| `defaultLightTheme` | 默认使用的亮色主题 | _string_ | `lightTheme` |
| `defaultDarkTheme` | 默认使用的暗色主题 | _string_ | `darkTheme` |
| `useMobile` | 是否显示右侧手机预览 | _boolean_ | `false` |
| `themeKey` | 主题在本地存储中的 key | _string_ | `MAPLE_THEME` |
| `lightTheme` | 默认品牌亮色文档主题 | _Record<string, any>_ | `-` |
| `darkTheme` | 默认品牌暗色文档主题 | _Record<string, any>_ | `-` |
| `mapleLightTheme` | 枫叶品牌亮色文档主题 | _Record<string, any>_ | `-` |
| `mapleDarkTheme` | 枫叶品牌暗色文档主题 | _Record<string, any>_ | `-` |
| `highlight` | 文档代码片段样式相关 | _{ style: string }_ | `-` |
| `analysis` | 文档统计相关 | _{ baidu: string }_ | `-` |
| `pc` | pc 端文档结构配置 | _[MapleConfigPc](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/cli/src/node/config/maple.config.ts?ref_type=heads)_ | `-` |
| `mobile` | mobile 端文档结构配置 | _[MapleConfigMobile](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/cli/src/node/config/maple.config.ts?ref_type=heads)_ | `-` |
| `bundle` | 组件库编译的捆绑产物配置 | _{ external: string[], globals: Record<string, string> }_ | `-` |
| `vitePlugins` | vite 插件 | _[Plugin](https://vite.dev/guide/using-plugins.html)[]_ \| `(plugins: Plugin[]) => Plugin[])` | `-` |
| `directives` | 组件库指令文件夹名称 | _string[]_ | `[]` |
| `copy` | 复制文件配置 | _[CopyPath[]](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/vite-plugins/src/copy.ts)_ | `-` |
| `icons` | 字体图标打包相关配置 | _[MapleConfigIcons](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/cli/src/node/config/maple.config.ts?ref_type=heads)_ | `-` |
| `esbuild` | esbuild 配置 | _[MapleConfigEsbuild](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/cli/src/node/config/maple.config.ts?ref_type=heads)_ | `-` |
| `seo` | seo 选项 | _[MapleConfigSeo](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/cli/src/node/config/maple.config.ts?ref_type=heads)_ | ` -` |

#### Menu

| 参数 | 说明 | 类型 | 默认值 |
| -- | -------------- | -------- | ---------- |
| `doc` | 文档页面应匹配的文件名称, 必填 | _string_ | `-` |
| `type` | menu 类型, 当 type 为 `1` 时表示分类 menu, 类型为 `2` 时 doc 字段匹配 src 下的组件文件, 类型为`3`时 doc 字段匹配 docs 下的 md 文件 | _MenuTypes_ | `-` |
| `text` | menu 所展示的文字, 当设置国际化时可配置英文展示文字 | _Record<string, string>_ | `-` |
| `useMobile` | 是否在当前文档页显示右侧手机预览, 如不填写, 默认取 config 中的 useMobile | _boolean_ | `-` |

### 自定义页面

如果想在组件库中插入其他页面，可以在项目根目录下的创建 `pages` 文件夹编写 vue 组件， 用来生成其他的页面。
目录结构如下：

```text
// playground-ignore
|-- maple-ui
  |-- src
  |-- docs
  |-- pages
    |-- sponsor
      |-- index.vue
    |-- contributor
      |-- locale
        |-- en-US.ts
      |-- index.vue
    |-- changelog
      |-- locale
        |-- zh-CN.ts
        |-- en-US.ts
      |-- index.vue
```

生成的路由如下：

```text
// playground-ignore
/zh-CN/sponsor
/en-US/contributor
/zh-CN/changelog
/en-US/changelog
```

### 命令相关

#### 启动开发服务器

```shell
# playground-ignore
maple-cli dev
# force mode
maple-cli dev -f
# draft mode
maple-cli dev -d
```

#### 构建文档站点

文档开发直接解析 `src` 中的组件和样式，只生成 `.maple` 站点配置与页面，不清空或改写 npm 发布用的 `es` / `lib`。修改配置或调研菜单触发重启时同样遵守此边界；不用先构建 npm 包才能展示 Demo。

Markdown 支持独立一行的 `<demo src="../example/demos/basic.vue"></demo>`（也可自闭合）与 `demo` 代码围栏。两种写法都读取实际 Vue 文件，每个文件对应独立运行卡片和源码工具条；代码示例中的标签不会执行。修改 Vue 示例会自动更新运行内容与源码，无需手动同步静态副本。右侧手机预览继续读取 `example/index.vue` 的示例集合。

Demo 通过 `import { demoEnglish } from '@maple-design/cli-vue/demo-language'` 读取站点语言。桌面卡片和手机预览都随全局 Locale 更新，模板直接使用 `demoEnglish`，脚本读取 `demoEnglish.value`。

文档站自动组件引用依据公开导出表直达源码模块，避免组件内部再经过全库根入口导致循环分包；显式函数导入仍可写 `import { Message } from '@maple-design/ui-vue'`，自动样式注入保留。该解析只作用于站点，不改变 npm 包入口或共享两库运行时。

独立 Playground 仍需要已构建的组件包：先在仓库根执行 `pnpm build:lib`，再执行 `pnpm dev:play`。它读取发布入口与 CSS 并将浏览器资源写入自己的 `public`，不是文档 dev 的占位入口。

升级 CLI 开发流程后，已经启动的旧 dev 进程需要手动重启一次才能使用新逻辑。仓库门禁 `pnpm check:dev-boundary` 验证冷启动和配置/调研重启不会破坏发布文件。

```shell
# playground-ignore
maple-cli build
```

#### 预览文档站点

```shell
# playground-ignore
maple-cli preview
# set port number
maple-cli preview -p <port>
```

#### 构建组件库

```shell
# playground-ignore
maple-cli compile
```

#### 构建样式变量类型声明文件

```shell
# playground-ignore
maple-cli compile:style-vars
```

#### 启动 VSCode 插件开发环境

```shell
# playground-ignore
maple-cli dev:extension
```

#### 构建 VSCode 插件

```shell
# playground-ignore
maple-cli build:extension
```

#### 打包字体图标

```shell
# playground-ignore
maple-cli build:icons -w
maple-cli build:icons
```

#### 执行所有的单元测试

```shell
# playground-ignore
maple-cli test
```

#### 执行单个组件的单元测试

```shell
# playground-ignore
maple-cli test -c <componentName>
```

#### 以 watch 模式执行单元测试

```shell
# playground-ignore
maple-cli test -w
```

#### 执行所有的单元测试并报告覆盖率

```shell
# playground-ignore
maple-cli test -cov
```

#### 校验提交信息

```shell
# playground-ignore
maple-cli commit-lint
```

#### 显示检查清单

```shell
# playground-ignore
maple-cli checklist
```

#### 生成更新日志

```shell
# playground-ignore
maple-cli changelog
```

#### 发布组件库

```shell
# playground-ignore
maple-cli release
```

#### 生成一个项目模板

```shell
# playground-ignore
maple-cli gen

# Options
-n
--name
  项目名
-s
--sfc
  生成 sfc 风格的项目模板
-t
--tsx
  生成 tsx 格式项目
-l
--locale
  需要支持国际化
```

#### 创建组件模板文件

```shell
# playground-ignore
maple-cli create

# Options
-n
--name
  组件名
-s
--sfc
  生成 sfc 风格的组件
-t
--tsx
  生成 tsx 风格的文件
-l
--locale
  需要支持国际化
```

### 发布前注意

1. `npm` 的仓库源必须指向 `npm` 官方镜像
2. 执行 `npm login` 进行登录

### 问答

#### 如何解决安装 sharp 失败的问题 ?

- 您可以选择更改包含 sharp 和 libvips 二进制文件的镜像站点

``` shell
pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```
