---
'@maple-design/ui-vue': patch
---

发布包移除与逐组件产物重复且无消费方引用的 `es/maple.esm.js` 和 `lib/maple.cjs.js`，减少发布文件数与包体积。
