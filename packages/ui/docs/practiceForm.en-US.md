# 分步表单页

基础资料、计划预算、核对提交、办理结果四阶段。

## 完整业务体验

先提交空资料查看校验；填写名称和负责人，设置计划与预算。保存草稿后离开并回来恢复；确认页模拟失败并重试，成功后点击“查看项目详情”。新项目同时进入列表、卡片和工作台。

```demo
./practices-examples/form/basic.vue
```

## 移动端业务适配

全部使用 Maple 自有组件。手机列表使用可选择的项目卡片，资料使用 Cell 展示，选择与日期使用 Popup。任务、跟进、收藏、归档和草稿在这些页面间共享，刷新保留当前浏览器会话数据。

业务数据在 `practices-examples/shared/usePracticeData.js` 中；示例使用合成数据，不访问真实业务接口。归档可恢复，重置会还原整个工作区。

参考信息组织：[Ant Design 表单页面](https://ant.design/docs/spec/research-form/) · [Arco Design Pro](https://github.com/arco-design/arco-design-pro) · [TDesign Starter](https://tdesign.tencent.com/starter)。全部界面使用本库组件组合。
