# Vue component library template

### Reference

[@maple-design/cli-vue 中文文档](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/cli/README.md)
[@maple-design/cli-vue documentation](https://github.com/sparknest-team/maple-design-mobile/blob/main/packages/cli/README.md)

### Quickstart

```shell
pnpm install
pnpm dev
```

### Commands

#### Start the development server

```shell
pnpm dev
```

#### Build documentation site

```shell
pnpm build
```

#### Building component libraries

```shell
pnpm compile
```

#### Lint code

```shell
pnpm lint
```

#### Run unit test

```shell
pnpm test
```

#### Run unit test in watch mode

```shell
pnpm test:watch 
```

#### Run unit test and report coverage

```shell
pnpm test:coverage 
```

#### Mount Git Hooks

```shell
npx simple-git-hooks
```

#### Generate changelog

```shell
pnpm changelog
```

#### Release

tips: 
- 1.The registry of npm must be the official source of npm
- 2.The npm must be logged in

```shell
pnpm release
```

#### Create component template files

```shell
pnpm run create
```


本文件夹是组件库项目模板，不是工作区包。`maple-library-template-vue` 为模板占位名称；CLI 生成后使用用户输入的项目包名，并将内部 workspace 依赖替换为版本依赖。

生成项目已包含 ui-build.config.mjs 和 tsconfig.declaration.json。pnpm compile 输出 es/index.mjs、lib/index.js、types-generated/index.d.ts 和 es/library.css；发布包 files 包含 types-generated。运行时需要的 shared 包保留在 dependencies，所有内部版本在生成时转为 semver。
