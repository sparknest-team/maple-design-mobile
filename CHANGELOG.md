## Unreleased

### ⚠ BREAKING CHANGES

* **Steps** API 与 PC (`cedar-design-web`) 对齐：
  * `active`（0-based）→ `current` / `defaultCurrent`（1-based，与 Pagination 一致）
  * 移除 `activeColor` / `inactiveColor`（改用 `--mp-step-*` CSS 变量）
  * 移除 `activeIcon` / `currentIcon` / `inactiveIcon` 及 `*-namespace`（改用 `#icon` 插槽）
  * `click-step` → `change`（需开启 `changeable`）
* **Alert** API 与 PC (`cedar-design-web`) 对齐：
  * `closeable` → `closable`（拼写修正）
  * 移除 `content` 插槽；改为内置 `body` 结构

### Features

* **Steps** 新增 `status` / `changeable` / `title` / `description` / `disabled`；支持 `#icon` / `#description`；类型导出 `StepsProps` / `StepProps` / `StepStatus`
* **Alert** 新增 `default` 类型；新增 `show-icon` / `banner` / `center` / `action` slot / `after-close` 事件
* **Alert** 重写为 `<script setup lang="ts">`，类型完整导出（`AlertProps` / `AlertType` / `AlertVariant` / `AlertInstance`）

## [1.0.3](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/compare/v1.0.2...v1.0.3) (2025-08-26)


### Features

* 修改主色调 ([5c698e1](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/commits/5c698e1b1b459a3d63864fd253c886c225fb114a))



## [1.0.2](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/compare/v1.0.1...v1.0.2) (2025-08-08)


### Bug Fixes

* autoimport not work ([45e6097](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/commits/45e6097733f9f20fc1667cfb6dd6c1be72d525cc))



## [1.0.1](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/compare/0f034a2a14b64027f67ddcccb0c7b323fbe93e2b...v1.0.1) (2025-08-06)


### Features

* rename ([ecd02ce](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/commits/ecd02ce2f33a35b965fc94a35eb5615da3843d2d))
* rename ([0f034a2](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/commits/0f034a2a14b64027f67ddcccb0c7b323fbe93e2b))
* version ([d510979](https://xxx/pe.frontend/materials/maplejs/maple-design-mobile/commits/d5109790f2029fc0664631b4b28328ed71c4c260))



