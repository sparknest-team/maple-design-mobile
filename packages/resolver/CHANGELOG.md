# @maple-design/resolver-vue

## 1.4.11

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.11
  - @maple-design/shared-vue@1.4.11

## 1.4.10

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.10
  - @maple-design/shared-vue@1.4.10

## 1.4.9

### Patch Changes

- [#61](https://github.com/sparknest-team/maple-design-mobile/pull/61) [`eb8a82b`](https://github.com/sparknest-team/maple-design-mobile/commit/eb8a82b0894b6f107c9d4a52a361c99d56b679fb) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 文档站迁移到 VuePress 并统一组件库打包流程：

  - 文档站由 maple-cli 自有 SPA 改为 VuePress 构建（`packages/ui/site`），与 Cedar 使用同一套共享构建工具（`@sparknest/vuepress-plugins-vue`）。
  - 移除 CLI 内的 SPA 站点与其 50 万行生成产物，CLI 只保留编译与文档构建职责。
  - 组件运行时、交互测试与文档示例同步更新；`vite-plugins` 的 markdown 处理对齐共享实现。

  发布包内容因此发生变化，十个公开包统一 patch 升级。

- Updated dependencies [[`eb8a82b`](https://github.com/sparknest-team/maple-design-mobile/commit/eb8a82b0894b6f107c9d4a52a361c99d56b679fb)]:
  - @maple-design/icons-vue@1.4.9
  - @maple-design/shared-vue@1.4.9

## 1.4.8

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.8
  - @maple-design/shared-vue@1.4.8

## 1.4.7

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.7
  - @maple-design/shared-vue@1.4.7

## 1.4.6

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.6
  - @maple-design/shared-vue@1.4.6

## 1.4.5

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.5
  - @maple-design/shared-vue@1.4.5

## 1.4.4

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.4
  - @maple-design/shared-vue@1.4.4

## 1.4.3

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.3
  - @maple-design/shared-vue@1.4.3

## 1.4.2

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.2
  - @maple-design/shared-vue@1.4.2

## 1.4.1

### Patch Changes

- Updated dependencies []:
  - @maple-design/icons-vue@1.4.1
  - @maple-design/shared-vue@1.4.1

## 1.3.1

### Patch Changes

- Updated dependencies [[`7b85843`](https://github.com/sparknest-team/maple-design-mobile/commit/7b858430cc74795bc6c276381f74f44a69bef26a)]:
  - @maple-design/icons-vue@1.3.1

## 1.3.0

### Minor Changes

- [#7](https://github.com/loca-spirit/maple-design-mobile/pull/7) [`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Add the standalone Section layout component with form-aware defaults, automatic imports, and bilingual documentation examples. Replace MpFormSection and Form.Section with MpSection, and rename the section theme variables from --mp-form-section-* to --mp-section-*.

## 1.2.0

### Minor Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Release the public packages together at 1.2.0 so applications can install matching versions.

### Patch Changes

- Updated dependencies [[`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012), [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012)]:
  - @maple-design/icons-vue@1.2.0
  - @maple-design/shared-vue@1.2.0
