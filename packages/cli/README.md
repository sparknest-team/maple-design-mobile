# Components Library Tools

### Intro

In a component demo, import `demoEnglish` from `@maple-design/cli-vue/demo-language`. This read-only computed ref tracks the global Maple locale on both the desktop docs page and the mobile preview. Use it directly in templates or read `demoEnglish.value` in script.

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

`@maple-design/cli-vue` has built-in `sfc` and `tsx` style component library project templates, which can be generated directly by the `gen` command.
It is convenient for you to directly enter the component library development.

```shell
# playground-ignore
pnpm add @maple-design/cli-vue -g
maple-cli gen
```

## Advanced customization

### Configuration file

The `maple.config.mjs` in the project root directory is used to manage the specific details of the entire component library project.
The default configuration can be viewed [maple.default.config.ts](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/cli/src/node/config/maple.default.config.ts).
Also refer to `@maple-design/ui-vue` [maple.config.mjs](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/ui/maple.config.mjs).

Configure documentation Vite plugins and proxies in `docs/.vuepress/config.ts`. Configure the library entry points, external dependencies and outputs in `ui-build.config.mjs`.

| Parameter           | Description                                                                    | Type                                                                                                                                | Default       |
| ------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `name`              | The full name of the component library, which will be used as the package name | _string_                                                                                                                            | `Maple`       |
| `namespace`         | Component library namespace, will be used as component prefix                  | _string_                                                                                                                            | `mp`          |
| `port`              | Development server port                                                        | _number_                                                                                                                            | `8080`        |
| `title`             | The title of the component library in the document                             | _string_                                                                                                                            | `Maple`       |
| `logo`              | The logo of the component library in the document                              | _string_                                                                                                                            | `-`           |
| `alias`             | Path alias (root is src folder when use relative path)                         | _Record<string, string>_                                                                                                            | `-`           |
| `defaultLanguage`   | Document default language                                                      | _string_                                                                                                                            | `zh-CN`       |
| `defaultLightTheme` | Default light-mode selection                                                   | _string_                                                                                                                            | `lightTheme`  |
| `defaultDarkTheme`  | Default dark-mode selection                                                    | _string_                                                                                                                            | `darkTheme`   |
| `themeKey`          | The key of the theme in local storage                                          | _string_                                                                                                                            | `MAPLE_THEME` |
| `lightTheme`        | Default brand light document theme                                             | _Record<string, any>_                                                                                                               | `-`           |
| `darkTheme`         | Default brand dark document theme                                              | _Record<string, any>_                                                                                                               | `-`           |
| `mapleLightTheme`   | Maple brand light document theme                                               | _Record<string, any>_                                                                                                               | `-`           |
| `mapleDarkTheme`    | Maple brand dark document theme                                                | _Record<string, any>_                                                                                                               | `-`           |
| `pc`                | PC side document structure configuration                                       | _[MapleConfigPc](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/cli/src/node/config/maple.config.ts)_     | `-`           |
| `mobile`            | Mobile document structure configuration                                        | _[MapleConfigMobile](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/cli/src/node/config/maple.config.ts)_ | `-`           |
| `directives`        | Component library directive folder name                                        | _string[]_                                                                                                                          | `[]`          |
| `icons`             | Font icon packaging related configurations                                     | _[MapleConfigIcons](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/cli/src/node/config/maple.config.ts) _ | `-`           |
| `seo`               | seo options                                                                    | _[MapleConfigSeo](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/cli/src/node/config/maple.config.ts)_    | ` -`          |

#### Menu

| Parameter | Description                                                                                                                                                                                                                | Type                     | Default |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------- |
| `doc`     | The document page corresponds to the matching file name, required                                                                                                                                                          | _string_                 | `-`     |
| `type`    | The type of menu, when the type is `1`, it means the category menu, when the type is `2`, the doc field matches the component file under src, when the type is `3`, the doc field matches the md file under docs, required | _MenuTypes_              | `-`     |
| `text`    | The text displayed in the menu, English display text can be configured when internationalization is set, required                                                                                                          | _Record<string, string>_ | `-`     |

### Custom pages

The Maple documentation site maps `docs/sponsor.zh-CN.md` and `docs/sponsor.en-US.md` to `/zh-CN/sponsor/` and `/en-US/sponsor/`. To include the page in the sidebar, add its `doc` to `pc.menu` in `maple.config.mjs`. The page patterns and route mapping live in `docs/.vuepress/config.ts`.

### Command related

#### Start the development server

```shell
# playground-ignore
maple-cli dev
# force mode
maple-cli dev -f
```

#### Build a documentation site

VuePress serves the Markdown pages and resolves components and styles from `src`. The CLI expects the VuePress configuration under `docs/.vuepress/`.

Markdown supports standalone `<demo src="../example/demos/basic.vue"></demo>` tags (including self-closing tags) and `demo` fences. Each referenced Vue file renders in its own live card with a source toolbar. Tags inside code samples remain static. Editing a Vue demo updates both the rendered example and its source automatically. The mobile iframe opens the current VuePress page.

Site component resolution follows the public export map directly to source modules, preventing circular barrel imports during documentation chunking. Authored function imports such as `import { Message } from '@maple-design/ui-vue'` retain automatic style injection. This is site-only resolution, not a change to published package entry points or a shared Cedar/Maple runtime.

The standalone Playground still consumes a built component package: run `pnpm build:lib` at the repository root before `pnpm dev:play`. It reads the published entry/CSS and writes browser assets to its own `public` directory; it does not need documentation development stubs.

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

```shell
pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```
