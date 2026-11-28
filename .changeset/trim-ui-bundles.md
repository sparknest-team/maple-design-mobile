---
'@maple-design/ui-vue': patch
---

发布包不再包含与逐组件产物重复、且无消费方引用的 `es/maple.esm.js` 与 `lib/maple.cjs.js`：构建改用 `@sparknest/ui-build-vue@1.5.0` 的 `bundleFormats` 开关（只保留 `umd`），`umd/maple.js` 与 `es/maple.css` 不受影响。发布包从 22831.6 KiB / 3943 文件降到 19354.8 KiB / 3941 文件，回到 `package:check` 的 20MB 门禁以内。

同时移除 `pnpm-workspace.yaml` 里针对 `@sparknest/ui-build-vue` 的本地 tarball override —— 该包 1.5.0 已发布到 npm，改用正式版。
