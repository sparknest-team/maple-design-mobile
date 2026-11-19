# @maple-design/cli-vue

## 1.2.0

### Minor Changes

- [#5](https://github.com/loca-spirit/maple-design-mobile/pull/5) [`92e7613`](https://github.com/loca-spirit/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Release the public packages together at 1.2.0 so applications can install matching versions.

### Patch Changes

- [#5](https://github.com/loca-spirit/maple-design-mobile/pull/5) [`92e7613`](https://github.com/loca-spirit/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Preserve source-generated declarations instead of overwriting them with legacy sibling declaration stubs, fixing missing theme types in published packages.

- [#5](https://github.com/loca-spirit/maple-design-mobile/pull/5) [`92e7613`](https://github.com/loca-spirit/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012) Thanks [@loca-spirit](https://github.com/loca-spirit)! - Develop with Vue 3.5.45 while supporting consumers on Vue 3.2.47 and later Vue 3 releases. Preserve compatible component IDs and public declarations, and gate releases on packed runtime and type compatibility checks.

  The minimum supported Vue version is 3.2.47. Consumers on Vue 3.2.0–3.2.46 must update Vue before installing this 1.x release.

- Updated dependencies [[`92e7613`](https://github.com/loca-spirit/maple-design-mobile/commit/92e761339607ceb1cd2365c605d6d9383cf11012)]:
  - @maple-design/resolver-vue@1.2.0
  - @maple-design/shared-vue@1.2.0
  - @maple-design/vite-plugins-vue@1.2.0
