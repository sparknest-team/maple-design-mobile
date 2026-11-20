# @maple-design/ui-vue

## 1.3.1

### Patch Changes

- [#10](https://github.com/sparknest-team/maple-design-mobile/pull/10) [`1ebd8d7`](https://github.com/sparknest-team/maple-design-mobile/commit/1ebd8d7fcf3bd5c5b1217aaf8ae6c1a49df56da1) Thanks [@sparknest-team](https://github.com/sparknest-team)! - 修复构建工具无法解析 NavMenu 内部模块名导致的打包错误。业务项目无需额外配置 alias，NavMenu 继续支持服务端渲染。

## 1.3.0

### Minor Changes

- [#7](https://github.com/loca-spirit/maple-design-mobile/pull/7) [`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Add the standalone Section layout component with form-aware defaults, automatic imports, and bilingual documentation examples. Replace MpFormSection and Form.Section with MpSection, and rename the section theme variables from --mp-form-section-* to --mp-section-*.

### Patch Changes

- [#7](https://github.com/loca-spirit/maple-design-mobile/pull/7) [`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Fix native form label targeting and nested field feedback, Cascader keyboard and search ownership, popup reference motion tracking, and inherited reading direction. Align Checkbox and Radio theme tokens and refresh their documentation.

- Updated dependencies [[`9133140`](https://github.com/loca-spirit/maple-design-mobile/commit/9133140e0ff5bb6bdb2a5547e1ede70dc6ddc8d0)]:
  - @maple-design/use-vue@1.2.2

## 1.2.0

### Minor Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Release the public packages together at 1.2.0 so applications can install matching versions.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Develop with Vue 3.5.45 while supporting consumers on Vue 3.2.47 and later Vue 3 releases. Preserve compatible component IDs and public declarations, and gate releases on packed runtime and type compatibility checks.

  The minimum supported Vue version is 3.2.47. Consumers on Vue 3.2.0–3.2.46 must update Vue before installing this 1.x release.

### Patch Changes

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix native form label targeting and nested field feedback, Cascader keyboard and search ownership, popup reference motion tracking, and inherited reading direction. Align Checkbox and Radio theme tokens and refresh their documentation.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix BackTop's unresolved stacking token and make Image footer descriptions follow the semantic theme color. Add component stylesheet and built-in theme variable dependency regression coverage.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Preserve component installers when applications tree-shake the aggregate library entry.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Close an open menu branch when another menu is opened from the keyboard.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Preserve inherited safe-area insets inside locally themed popup containers.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Keep standard Textarea fields within the available width on mobile.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix unresolved Timeline style tokens so dots, connecting lines, typography and spacing render correctly.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Preserve source-generated declarations instead of overwriting them with legacy sibling declaration stubs, fixing missing theme types in published packages.

- [#5](https://github.com/sparknest-team/maple-design-mobile/pull/5) [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@sparknest-team](https://github.com/sparknest-team)! - Fix keyboard listener types in Trigger while preserving Escape handling and listener cleanup across document windows.

- Updated dependencies [[`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012), [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012), [`92e7613`](https://github.com/sparknest-team/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012)]:
  - @maple-design/use-vue@1.2.0
  - @maple-design/icons-vue@1.2.0
  - @maple-design/shared-vue@1.2.0
