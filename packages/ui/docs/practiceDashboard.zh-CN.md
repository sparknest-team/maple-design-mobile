# 团队工作台

按类型汇总项目指标、预算、待办与最近动态。

## 完整业务体验

选择业务范围，处理待办中的项目；再进入列表或详情，核对同一个项目的状态。创建、编辑、归档和跟进都会进入最近动态。

```demo
./practices-examples/dashboard/basic.vue
```

## 移动端业务适配

全部使用 Maple 自有组件。手机列表使用可选择的项目卡片，资料使用 Cell 展示，选择与日期使用 Popup。任务、跟进、收藏、归档和草稿在这些页面间共享，刷新保留当前浏览器会话数据。

业务数据在 `practices-examples/shared/usePracticeData.js` 中；示例使用合成数据，不访问真实业务接口。归档可恢复，重置会还原整个工作区。

参考信息组织：[Ant Design 表单页面](https://ant.design/docs/spec/research-form/) · [Arco Design Pro](https://github.com/arco-design/arco-design-pro) · [TDesign Starter](https://tdesign.tencent.com/starter)。全部界面使用本库组件组合。
