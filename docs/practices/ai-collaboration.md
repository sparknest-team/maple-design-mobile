# AI 协作约定 / 入口文件说明

> 这是一篇**元文档**：解释本仓库为 AI 编码代理（GitHub Copilot Chat / Claude Code / Cursor / Codex CLI 等）准备了哪些入口文件、它们如何被加载、什么时候应该更新。

## 1. 入口文件一览

| 文件 | 自动加载者 | 定位 |
| --- | --- | --- |
| [`AGENTS.md`](../../AGENTS.md)（仓库根） | Claude Code / Cursor / Codex / 新版 Copilot Chat 等通用约定 | **统一入口**，简短，列必读清单 + 高频踩坑 + 历史教训 |
| [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) | VS Code GitHub Copilot Chat（每次对话强制加载） | Copilot 专用版，含完整规范摘要 |
| [`docs/practices/component-spec.md`](./component-spec.md) | 人类 + 被 AI 按需 `read_file` | 详细组件规范（**真实的 source of truth**） |
| [`docs/practices/ai-collaboration.md`](./ai-collaboration.md) | 人类阅读，AI 按需查 | 本文，解释入口机制本身 |
| `~/.config/.../user memory` | 仅 AI 工具自身的用户级记忆 | 跨仓库的个人偏好/经验，**不在仓库内** |

## 2. 加载机制差异

- **`AGENTS.md`** —— 多数 AI 工具会在打开仓库时自动检测 `AGENTS.md` / `agents.md`（大小写视工具而定，建议固定 `AGENTS.md`）。是事实上的跨工具标准。
- **`.github/copilot-instructions.md`** —— GitHub Copilot Chat 专属约定，每次新对话都会注入到系统消息。
- **`docs/practices/*.md`** —— 不会自动加载，AI 需要主动 `read_file`，所以入口文件要**明确指引**它们去读。

## 3. 信息分层原则

为避免内容漂移、重复维护，按"入口越靠前越精简"分层：

```
AGENTS.md            ← 必读清单 + Top 反模式 + 历史血泪 (≤ 100 行)
copilot-instructions ← 完整规范摘要 (~200 行)
component-spec.md    ← 唯一权威详细规范 (可以很长)
user memory          ← 跨仓库的"我个人怎么用"
```

**规则**：
- 任何 API / 命名 / 样式约定的**最终定义**只允许出现在 `component-spec.md`，其他入口文件**只摘要 + 链回去**。
- 历史教训（"曾经踩过的坑"）放 `AGENTS.md` 顶部，因为它最容易被遗忘且最贵。
- 个人偏好（路径、命令快捷写法、跨仓库的对齐关系）放 user memory，不要污染仓库文档。

## 4. 何时更新哪个文件

| 场景 | 更新文件 |
| --- | --- |
| 新规范、新组件目录约定 | `component-spec.md` →（顺手）摘要进 `copilot-instructions.md` |
| 又踩了一次老坑 | `AGENTS.md` 的「历史教训」段 |
| 某个反模式频繁出现在 PR | `copilot-instructions.md` 的「反模式速查」 |
| 改了构建/测试命令 | `AGENTS.md` 命令表 + `copilot-instructions.md` 第 5 节 |
| 仅自己机器上的路径偏好 | user memory（不要进仓库） |

## 5. 与 PC 端（Cedar Design Web）的对齐

公共 API（如 `Space` 的 `size` 枚举、`Button` 的 `variant` 等）**以 PC 实现为准**，两端同步。  
PC 端入口：`/Users/shuaimeng/github/cedar-design-web/AGENTS.md`。

修改公共 API 时：
1. 先在 cedar 走 OpenSpec 流程定下来。
2. 在本仓库实现时，引用 cedar 的 spec 链接，不要自己重新发明字面量。
3. 两端文档的 prop 表保持顺序、命名、JSDoc 一致。

## 6. AI 工具不应做的事

- ❌ 在仓库内创建 `claude.md` / `cursor.md` / `.cursorrules` 等工具特定文件 —— 用 `AGENTS.md` 即可，避免碎片化。
- ❌ 把"个人偏好"写进 `AGENTS.md`（应放 user memory）。
- ❌ 在 `AGENTS.md` 重复 `component-spec.md` 的全部内容 —— 只摘要 + 链接。
- ❌ 删掉「历史教训」段，即使代码已修复 —— 它是给未来 AI 的免疫接种。
