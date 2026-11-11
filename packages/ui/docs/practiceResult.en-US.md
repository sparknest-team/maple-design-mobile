# 结果与异常页

结合最新项目记录提供成功反馈、异常恢复与下一步。

## 完整业务体验

体验服务失败重试、空状态创建申请和项目详情返回；办理成功时可以打开最近创建的真实本地项目。结果类型只用于本地演示，不调用真实业务后端。

```demo
./practices-examples/result/basic.vue
```

## 移动端业务适配

全部使用 Maple 自有组件。手机列表使用可选择的项目卡片，资料使用 Cell 展示，选择与日期使用 Popup。任务、跟进、收藏、归档和草稿在这些页面间共享，刷新保留当前浏览器会话数据。

业务数据在 `practices-examples/shared/usePracticeData.js` 中；示例使用合成数据，不访问真实业务接口。归档可恢复，重置会还原整个工作区。

参考信息组织：[Ant Design 表单页面](https://ant.design/docs/spec/research-form/) · [Arco Design Pro](https://github.com/arco-design/arco-design-pro) · [TDesign Starter](https://tdesign.tencent.com/starter)。全部界面使用本库组件组合。
