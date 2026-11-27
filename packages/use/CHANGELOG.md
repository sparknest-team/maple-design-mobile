# @maple-design/use-vue

## 1.4.9

### Patch Changes

- [#61](https://github.com/sparknest-team/maple-design-mobile/pull/61) [`eb8a82b`](https://github.com/sparknest-team/maple-design-mobile/commit/eb8a82b0894b6f107c9d4a52a361c99d56b679fb) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 文档站迁移到 VuePress 并统一组件库打包流程：

  - 文档站由 maple-cli 自有 SPA 改为 VuePress 构建（`packages/ui/site`），与 Cedar 使用同一套共享构建工具（`@sparknest/vuepress-plugins-vue`）。
  - 移除 CLI 内的 SPA 站点与其 50 万行生成产物，CLI 只保留编译与文档构建职责。
  - 组件运行时、交互测试与文档示例同步更新；`vite-plugins` 的 markdown 处理对齐共享实现。

  发布包内容因此发生变化，十个公开包统一 patch 升级。

- Updated dependencies [[`eb8a82b`](https://github.com/sparknest-team/maple-design-mobile/commit/eb8a82b0894b6f107c9d4a52a361c99d56b679fb)]:
  - @maple-design/shared-vue@1.4.9

## 1.4.8

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.8

## 1.4.7

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.7

## 1.4.6

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.6

## 1.4.5

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.5

## 1.4.4

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.4

## 1.4.3

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.3

## 1.4.2

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.2

## 1.4.1

### Patch Changes

- Updated dependencies []:
  - @maple-design/shared-vue@1.4.1

## 1.2.2

### Patch Changes

- [#7](https://github.com/loca-spirit/maple-design-mobile/pull/7) [`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Fix native form label targeting and nested field feedback, Cascader keyboard and search ownership, popup reference motion tracking, and inherited reading direction. Align Checkbox and Radio theme tokens and refresh their documentation.

## 1.2.0

### Minor Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Release the public packages together at 1.2.0 so applications can install matching versions.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Develop with Vue 3.5.45 while supporting consumers on Vue 3.2.47 and later Vue 3 releases. Preserve compatible component IDs and public declarations, and gate releases on packed runtime and type compatibility checks.

  The minimum supported Vue version is 3.2.47. Consumers on Vue 3.2.0–3.2.46 must update Vue before installing this 1.x release.

### Patch Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix native form label targeting and nested field feedback, Cascader keyboard and search ownership, popup reference motion tracking, and inherited reading direction. Align Checkbox and Radio theme tokens and refresh their documentation.

- Updated dependencies [[`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012)]:
  - @maple-design/shared-vue@1.2.0
