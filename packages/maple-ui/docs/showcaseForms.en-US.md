# Consistent forms

Some scenario descriptions and demo labels are currently in Chinese. Component messages follow the selected site language.

切换阅读与编辑方式；修改后先取消，再确认，观察模型的更新。

## 一张业务单的完整流程

先提交空任务查看必填校验；填入演示数据进入确认页。勾选模拟失败，提交后查看草稿和记录；重试成功才创建记录。随时可以返回修改或重新演示。

部门和优先级使用 Popup；普通文本保持直接输入。本例只模拟本地保存，不访问业务接口。

```demo
../src/form/example/demos/task-workflow.vue
```

## 阅读与编辑的字段级控制

```demo
../src/form/example/demos/field-presentation.vue
```

