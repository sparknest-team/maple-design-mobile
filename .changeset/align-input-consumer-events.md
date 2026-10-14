---
"@maplejs/maple-ui": major
---

Search 与 AutoComplete 同步 Input 的 input → update:modelValue 输入顺序和 clear → input → update:modelValue → change 清空管线；清空不会重复写模型、执行搜索或重开候选面板。AutoComplete 的 search 在模型更新通知后触发，候选选择行为不变。

修复 Search 遗漏 trim 提交模型更新，Enter 搜索等待已接受的受控值；AutoComplete 被拒绝的连续清空/候选选择不丢 change，键盘清空归焦不重开面板，补齐 Form 单次通知依赖回归。
