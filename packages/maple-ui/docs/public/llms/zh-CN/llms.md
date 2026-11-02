<!-- Source: docs/llms.zh-CN.md; locale: zh-CN; page: /zh-CN/llms -->

# LLM 文档

Maple Design Mobile 提供面向大语言模型（LLM）的纯文本与 Markdown 文档，包含指南、组件 API 和 Vue 示例源码。将在线地址交给 AI 编码助手，即可在编写代码前查阅相关文档。

## 在线文档

无需下载，支持读取网页的 AI 助手可以直接访问以下地址。**推荐从文档索引开始，按需读取相关组件。**

| 文档 | 在线地址 | 适用场景 |
| --- | --- | --- |
| 文档索引 | [https://maple.show/llms.txt](https://maple.show/llms.txt) | 查找指南和组件的单页 Markdown，推荐优先使用 |
| 完整文档 | [https://maple.show/llms-full.txt](https://maple.show/llms-full.txt) | 一次读取全部文档与示例，适合上下文容量充足的工具 |

索引中的每个组件都有独立的 Markdown 地址，可以直接打开、交给助手读取，或保存到本地。

## 在 AI 助手中使用

### 直接提供文档地址

复制下面的提示词，在末尾补充你的需求：

```text
请使用 Maple Design Mobile 和 Vue 3 实现我的需求。
先读取官方文档索引：https://maple.show/llms.txt
再根据任务读取快速开始和相关组件的单页文档，核对安装、引入与样式配置。
严格按照文档中的 props、事件、插槽和示例编写代码。
如果文档没有说明某个 API，请明确指出，不要猜测。

我的需求：
```

### 添加为项目参考资料

如果你的编码助手支持配置文档来源，可以添加上面的在线索引地址，并在项目说明中注明：使用 `@maple-design/ui` 时先查阅官方文档。

如果工具无法访问网页，可打开在线文件，将所需内容保存为 `.txt` 或 `.md` 后作为附件提供。全文文件较大，可能超过工具的读取限制；通常读取索引和任务相关的单页文档即可。

## 按语言选择

| 语言 | 文档索引 | 完整文档 |
| --- | --- | --- |
| 中文 | [https://maple.show/llms.zh-CN.txt](https://maple.show/llms.zh-CN.txt) | [https://maple.show/llms-full.zh-CN.txt](https://maple.show/llms-full.zh-CN.txt) |
| English | [https://maple.show/llms.en-US.txt](https://maple.show/llms.en-US.txt) | [https://maple.show/llms-full.en-US.txt](https://maple.show/llms-full.en-US.txt) |

各语言文件只收录已有的对应语言文档，未翻译的页面不会自动转换为英文。需要查阅全部页面时，请使用上方的综合索引。

## 内容与更新

文本文件从指南与组件文档自动生成，保留 API 表格，并将 Demo 引用展开为 Vue 源码。示例中的相对模块导入仍以标注的源码路径为基准。

每次构建文档站点时重新生成，并与站点一起发布。使用时请核对文档与项目中安装的组件库版本。
