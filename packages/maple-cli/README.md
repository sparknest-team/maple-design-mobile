# Components Library Tools

### Intro

`watchLang(callback)` detects both desktop documentation routes and mobile iframe query parameters, including the initial language and subsequent changes. An explicit `pc` or `mobile` argument remains available when needed.

The out-of-the-box `Vue3 component library` rapid prototyping tool provides a series of commands and tools to solve the problem of component library development.

### Features

- 📦 &nbsp;Out-of-the-box component library development environment
- 📦 &nbsp;An out-of-the-box component library compilation tool that supports exporting `esm`, `cjs`, `umd` module codes
- 🛠️ &nbsp;Configuration file-based component library documentation site, support Baidu statistics and theme customization
- 🛠️ &nbsp;Supports both `sfc` and `tsx` styles for writing component libraries
- 📦 &nbsp;Out-of-the-box code inspection tool
- 📦 &nbsp;Out-of-the-box unit testing tools
- 📦 &nbsp;Out-of-the-box code publishing tool, publishes to both `npm` and `github`, and automatically generates changelogs
- 💪 &nbsp;Support for `VSCode` extension development
- 💪 &nbsp;Support `build svg to web fonts`
- 💪 &nbsp;Support for `Typescript`
- 💪 &nbsp;Support `Various themes, including default / maple brands and light / dark modes`
- 🌍 &nbsp;Support `Internationalization`
- 🚀 &nbsp;Based on `pnpm`

### Quickstart

`@maple-design/cli` has built-in `sfc` and `tsx` style component library project templates, which can be generated directly by the `gen` command.
It is convenient for you to directly enter the component library development.

```shell
# playground-ignore
pnpm add @maple-design/cli -g
maple-cli gen
```

## Advanced customization

### Configuration file

The `maple.config.mjs` in the project root directory is used to manage the specific details of the entire component library project.
The default configuration can be viewed [maple.default.config.ts](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.default.config.ts?ref_type=heads).
Also refer to `@maple-design/ui` [maple.config.mjs](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-ui/maple.config.mjs?ref_type=heads).

| Parameter | Description | Type | Default |
| --- | -------------- | -------- | ---------- |
| `name` | The full name of the component library, which will be used as the package name | _string_ | `Maple` |
| `namespace` | Component library namespace, will be used as component prefix | _string_ | `var` |
| `host` | Development server host | _number_ | `localhost` |
| `port` | Development server port | _number_ | `8080` |
| `proxy` | Development server proxy | _Record<string, string \| ProxyOptions>_ | `-` |
| `title` | The title of the component library in the document | _string_ | `Maple` |
| `logo` | The logo of the component library in the document | _string_ | `-` |
| `alias` | Path alias (root is src folder when use relative path) | _Record<string, string>_ | `-` |
| `defaultLanguage` | Document default language | _string_ | `zh-CN` |
| `defaultLightTheme` | Default light-mode selection | _string_ | `lightTheme` |
| `defaultDarkTheme` | Default dark-mode selection | _string_ | `darkTheme` |
| `useMobile` | Whether to display the mobile phone preview on the right | _boolean_ | `false` |
| `themeKey` | The key of the theme in local storage | _string_ | `MAPLE_THEME` |
| `lightTheme` | Default brand light document theme | _Record<string, any>_ | `-` |
| `darkTheme` | Default brand dark document theme | _Record<string, any>_ | `-` |
| `mapleLightTheme` | Maple brand light document theme | _Record<string, any>_ | `-` |
| `mapleDarkTheme` | Maple brand dark document theme | _Record<string, any>_ | `-` |
| `highlight` | Document code snippet style related | _{ style: string }_ | `-` |
| `analysis` | Document statistics related | _{ baidu: string }_ | `-` |
| `pc` | PC side document structure configuration | _[MapleConfigPc](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads)_ | `-` |
| `mobile` | Mobile document structure configuration | _[MapleConfigMobile](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads)_ | `-` |
| `bundle` | Bundle output options | _{ external: string[], globals: Record<string, string> }_ | `-` |
| `vitePlugins` | vite plugins | _[Plugin](https://vite.dev/guide/using-plugins.html)[]_ \| `(plugins: Plugin[]) => Plugin[])` | `-` |
| `directives` | Component library directive folder name | _string[]_ | `[]` |
| `copy` | Copy file configuration | _[CopyPath[]](https://github.com/loca-spirit/maple-design-mobile/blob/main/packages/maple-vite-plugins/src/copy.ts)_ | `- ` |
| `icons` | Font icon packaging related configurations | _[MapleConfigIcons](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads) _ | `-` |
| `esbuild` | esbuild configuration | _[MapleConfigEsbuild](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads)_ | ` -` |
| `seo` | seo options | _[MapleConfigSeo](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/-/blob/master/packages/maple-cli/src/node/config/maple.config.ts?ref_type=heads)_ | ` -` |

#### Menu

| Parameter | Description | Type | Default |
| --- | -------------- | -------- | ---------- |
| `doc` | The document page corresponds to the matching file name, required | _string_ | `-` |
| `type` | The type of menu, when the type is `1`, it means the category menu, when the type is `2`, the doc field matches the component file under src, when the type is `3`, the doc field matches the md file under docs, required | _MenuTypes_ | `-` |
| `text` | The text displayed in the menu, English display text can be configured when internationalization is set, required | _Record<string, string>_ | `-` |
| `useMobile` | Whether to display the mobile phone preview on the right side on the current document page, if not filled, the default value is useMobile in config  | _boolean_ | `-` |

### Custom pages

If you want to insert other pages into the component library, you can create a `pages` folder in the project root directory to write a vue component to generate other pages.
The directory structure is as follows:

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

The resulting route is as follows:

```text
// playground-ignore
/zh-CN/sponsor
/en-US/contributor
/zh-CN/changelog
/en-US/changelog
```

### Command related

#### Start the development server

```shell
# playground-ignore
maple-cli dev
# force mode
maple-cli dev -f
# draft mode
maple-cli dev -d
```

#### Build a documentation site

Documentation development resolves components and styles from `src`. It generates `.maple` site pages/configuration without clearing or rewriting npm artifacts in `es` / `lib`, including configuration or research-menu restarts. Demo development does not require a library build first.

Markdown supports standalone `<demo src="../example/demos/basic.vue"></demo>` tags (including self-closing tags) and `demo` fences. Each referenced Vue file renders in its own live card with a source toolbar. Tags inside code samples remain static. Editing a Vue demo updates both the rendered example and its source automatically. The mobile preview continues to render the collection in `example/index.vue`.

Site component resolution follows the public export map directly to source modules, preventing circular barrel imports during documentation chunking. Authored function imports such as `import { Message } from '@maple-design/ui'` retain automatic style injection. This is site-only resolution, not a change to published package entry points or a shared Cedar/Maple runtime.

The standalone Playground still consumes a built component package: run `pnpm build:lib` at the repository root before `pnpm dev:play`. It reads the published entry/CSS and writes browser assets to its own `public` directory; it does not need documentation development stubs.

Restart an already-running dev process once after upgrading the CLI to load the new behavior. The repository gate `pnpm check:dev-boundary` verifies artifact preservation on cold start and configuration/research restarts.

```shell
# playground-ignore
maple-cli build
```

#### Preview documentation site

```shell
# playground-ignore
maple-cli preview
# set port number
maple-cli preview -p <port>
```

#### Compile component library

```shell
# playground-ignore
maple-cli compile
```

#### Compile style vars types declaration file

```shell
# playground-ignore
maple-cli compile:style-vars
```

#### Run VSCode extension development environment

```shell
# playground-ignore
maple-cli dev:extension
```

#### Build VSCode extension for production

```shell
# playground-ignore
maple-cli build:extension
```

#### Build svg to web fonts

```shell
# playground-ignore
maple-cli build:icons -w
maple-cli build:icons
```

#### Execute all unit tests

```shell
# playground-ignore
maple-cli test
```

#### Execute a unit test

```shell
# playground-ignore
maple-cli test -c <componentName>
```

#### Execute unit tests in watch mode

```shell
# playground-ignore
maple-cli test -w
```

#### Execute unit tests and report coverage

```shell
# playground-ignore
maple-cli test -cov
```

#### Lint git commit message

```shell
# playground-ignore
maple-cli commit-lint
```

#### Show checklist

```shell
# playground-ignore
maple-cli checklist
```

#### Generate changelog

```shell
# playground-ignore
maple-cli changelog
```

#### Release component library

```shell
# playground-ignore
maple-cli release
```

#### Generate a project template

```shell
# playground-ignore
maple-cli gen

# Options
-n
--name
  project name
-s
--sfc
  Generate sfc-style project templates
-t
--tsx
  Generate tsx-style project templates
-l
--locale
  Need to support internationalization
```

#### Create a component template file

```shell
# playground-ignore
maple-cli create

# Options
-n
--name
  project name
-s
--sfc
  Generate sfc-style component
-t
--tsx
  Generate tsx-style component
-l
--locale
  Need to support internationalization
```

### Note before publish

1. `npm` repository registry must set to `npm` official mirror
2. Execute `npm login` to log in

### Q & A

#### How to solve failure of installing sharp ?

- You can choose to change mirror site which contains binaries for both sharp and libvips.

``` shell
pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```
