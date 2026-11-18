# @maple-design/cli-vue

## 2.0.0

### Patch Changes

- [#1](https://github.com/loca-spirit/maple-design-mobile/pull/1) [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Preserve source-generated declarations instead of overwriting them with legacy sibling declaration stubs, fixing missing theme types in published packages.

- [`9ed6ea4`](https://github.com/loca-spirit/maple-design-mobile/commit/9ed6ea447b00accf1cce4961cede9259d2d0b177) - Develop with Vue 3.5.45 while supporting consumers on Vue 3.2.47 and later Vue 3 releases. Preserve compatible component IDs and public declarations, and gate releases on packed runtime and type compatibility checks.

  The peer minimum is explicitly Vue 3.2.47. Packages previously advertising ^3.2.0 require a major release under the repository compatibility policy; consumers on 3.2.0–3.2.46 must update within the 3.2 line. No release is performed by this change.

- Updated dependencies [[`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571), [`d48a83a`](https://github.com/loca-spirit/maple-design-mobile/commit/d48a83a02d6fff2fa2597337d80a7d5bf936a343), [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571), [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571), [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571), [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571), [`58c1b2b`](https://github.com/loca-spirit/maple-design-mobile/commit/58c1b2b1c228e7a7380f7fc4641f8e6e95f00571), [`9ed6ea4`](https://github.com/loca-spirit/maple-design-mobile/commit/9ed6ea447b00accf1cce4961cede9259d2d0b177)]:
  - @maple-design/ui-vue@2.0.0
  - @maple-design/icons-vue@2.0.0
  - @maple-design/resolver-vue@1.1.13
