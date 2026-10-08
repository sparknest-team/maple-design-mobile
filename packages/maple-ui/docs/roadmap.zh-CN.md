# Roadmap

本文档记录 Maple Design Mobile 相对成熟移动端组件库的补齐节奏，并与 Cedar Design Web 公共 API 对齐。

## 当前阶段：P0（立刻）

| 项 | 状态 | 说明 |
| --- | --- | --- |
| 公开 Roadmap | ✅ | 本文档 |
| SwipeCell | ✅ | 滑动单元格 |
| NoticeBar | ✅ | 通知栏 |
| NumberKeyboard | ✅ | 数字键盘 |
| VerificationCode | ✅ | 验证码输入（对齐 Cedar，实现基于统一 OTP 交互规范） |
| Sidebar / Grid 宫格 | 待开始 | 分类导航与首页入口矩阵 |
| Segmented（与 Cedar 对齐） | 待开始 | 分段控制器 |
| a11y 落地 | 待开始 | 组件文档可访问性章节 + 实测 |

## 下一波：P1

- ShareSheet、移动端 Calendar
- 当前品牌与明暗主题的设计资源
- CI / `.github` 完善
- Toast / Notify 语义分层（现有 Message）

## 可择机：P2

- Circle 环形进度
- 电商套件（Address / Coupon / SubmitBar / GoodsAction）——非商城业务可不做

## 已完成

- 品牌与依赖残留清理

## 与 Cedar 的关系

公共 API 以 **Cedar（PC）为准**，Maple 同步。跨端破坏性变更走 OpenSpec。

## 不做硬跟的部分

除非业务明确要做商城，否则不照搬 Vant 电商业务套件。
