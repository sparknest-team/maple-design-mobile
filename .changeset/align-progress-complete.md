---
"@maplejs/maple-ui": major
---

独立复制 Cedar Progress / ProgressGroup 主体与样式。Progress 补齐 steps、animation、bufferColor，showText 默认 true，百分比完成自动推导 success（显式状态不变），统一主题变量及 SSR 稳定渐变。ProgressGroup 布尔 status/status 插槽直接迁移 showText/text，无兼容别名，补累计裁剪、聚焦提示与 Escape 关闭。size 继续支持 number|string。

