# @maple-design/ui-vue

## 2.0.0

### Major Changes

- [`9ed6ea4`](https://github.com/loca-spirit/maple-design-mobile/commit/9ed6ea447b00accf1cce4961cede9259d2d0b177) - Develop with Vue 3.5.45 while supporting consumers on Vue 3.2.47 and later Vue 3 releases. Preserve compatible component IDs and public declarations, and gate releases on packed runtime and type compatibility checks.

  The peer minimum is explicitly Vue 3.2.47. Packages previously advertising ^3.2.0 require a major release under the repository compatibility policy; consumers on 3.2.0–3.2.46 must update within the 3.2 line. No release is performed by this change.

### Patch Changes

- [#3](https://github.com/loca-spirit/maple-design-mobile/pull/3) [`97aac91`](https://github.com/loca-spirit/maple-design-mobile/commit/97aac911b4ae08698ac0f7f825f996b7dd438d61) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Fix native form label targeting and nested field feedback, Cascader keyboard and search ownership, popup reference motion tracking, and inherited reading direction. Align Checkbox and Radio theme tokens and refresh their documentation.

- [#1](https://github.com/loca-spirit/maple-design-mobile/pull/1) [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Fix BackTop's unresolved stacking token and make Image footer descriptions follow the semantic theme color. Add component stylesheet and built-in theme variable dependency regression coverage.

- [`d48a83a`](https://github.com/loca-spirit/maple-design-mobile/commit/d48a83a02d6fff2fa2597337d80a7d5bf936a343) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Preserve component installers when applications tree-shake the aggregate library entry.

- [#1](https://github.com/loca-spirit/maple-design-mobile/pull/1) [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Close an open menu branch when another menu is opened from the keyboard.

- [#1](https://github.com/loca-spirit/maple-design-mobile/pull/1) [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Preserve inherited safe-area insets inside locally themed popup containers.

- [#1](https://github.com/loca-spirit/maple-design-mobile/pull/1) [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Keep standard Textarea fields within the available width on mobile.

- [#1](https://github.com/loca-spirit/maple-design-mobile/pull/1) [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Fix unresolved Timeline style tokens so dots, connecting lines, typography and spacing render correctly.

- [#1](https://github.com/loca-spirit/maple-design-mobile/pull/1) [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Preserve source-generated declarations instead of overwriting them with legacy sibling declaration stubs, fixing missing theme types in published packages.

- Updated dependencies [[`97aac91`](https://github.com/loca-spirit/maple-design-mobile/commit/97aac911b4ae08698ac0f7f825f996b7dd438d61), [`9ed6ea4`](https://github.com/loca-spirit/maple-design-mobile/commit/9ed6ea447b00accf1cce4961cede9259d2d0b177)]:
  - @maple-design/use-vue@2.0.0
  - @maple-design/icons-vue@2.0.0
