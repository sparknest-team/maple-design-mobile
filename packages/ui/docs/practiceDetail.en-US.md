# 业务详情页

动态项目资料、任务清单、交付进度、跟进、操作记录与归档。

## 完整业务体验

从列表或卡片进入一个具体项目；编辑资料后取消，确认原值未变；保存编辑、完成任务并添加跟进，再到工作台查看操作动态。

```demo
./practices-examples/detail/basic.vue
```

## 移动端业务适配

全部使用 Maple 自有组件。手机列表使用可选择的项目卡片，资料使用 Cell 展示，选择与日期使用 Popup。任务、跟进、收藏、归档和草稿在这些页面间共享，刷新保留当前浏览器会话数据。

业务数据在 `practices-examples/shared/usePracticeData.js` 中；示例使用合成数据，不访问真实业务接口。归档可恢复，重置会还原整个工作区。

参考信息组织：[Ant Design 表单页面](https://ant.design/docs/spec/research-form/) · [Arco Design Pro](https://github.com/arco-design/arco-design-pro) · [TDesign Starter](https://tdesign.tencent.com/starter)。全部界面使用本库组件组合。
