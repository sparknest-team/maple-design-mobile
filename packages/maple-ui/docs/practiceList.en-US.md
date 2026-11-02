# 查询列表页

组合筛选、分页、编辑、交付、批量归档、恢复与 CSV 导出。

## 完整业务体验

按关键词、类型和状态组合查询；编辑项目后查看详情；归档所选项目，再勾选“查看已归档项目”并查询，恢复记录。导出的是当前筛选结果。

```demo
./practices-examples/list/basic.vue
```

## 移动端业务适配

全部使用 Maple 自有组件。手机列表使用可选择的项目卡片，资料使用 Cell 展示，选择与日期使用 Popup。任务、跟进、收藏、归档和草稿在这些页面间共享，刷新保留当前浏览器会话数据。

业务数据在 `practices-examples/shared/usePracticeData.js` 中；示例使用合成数据，不访问真实业务接口。归档可恢复，重置会还原整个工作区。

参考信息组织：[Ant Design 表单页面](https://ant.design/docs/spec/research-form/) · [Arco Design Pro](https://github.com/arco-design/arco-design-pro) · [TDesign Starter](https://tdesign.tencent.com/starter)。全部界面使用本库组件组合。
