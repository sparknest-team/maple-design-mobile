# 文档主题浏览器回归

首次准备：

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm build
pnpm check:docs-theme
```

Linux CI 使用 `pnpm exec playwright install --with-deps chromium` 安装浏览器及系统依赖。
Playwright 版本由根目录 manifest 和锁文件固定；无需全局 CLI 或预先启动文档服务。
`pnpm quality` 会先构建依赖，并在生产文档构建和包检查后运行此回归，Quality CI 也将其作为阻断步骤。

覆盖 320、375、390px 下的六组真实 Chromium 用例，每组检查四种主题：

- JavaScript、Python、自定义 GitHub 高亮主题及长代码换行。
- 点击主题菜单立即更新代码配色，刷新后保存主题、token 配色和菜单选中项。
- 文档主题与示例主题分别持久化，示例不会被另一份存储覆盖。
- 文档展开的 Vue 源码高亮、API 表格和页面宽度。
- 按需 WASM 每个页面实例只加载一次，切换主题不重新加载。
- 页面脚本异常和本地资源失败会使回归失败。

移动示例使用手机 UA；文档正文使用桌面 UA 配合手机视口，避免站点默认跳转到移动示例页。
文档头部在小于 562px 时隐藏主题菜单，因此通过真实菜单临时切换到 800px 进行选择，
随后恢复手机宽度检查显示并刷新；没有直接写入存储来模拟主题切换。

测试复制当前生产产物到临时目录，使用随机本机端口，并在结束时关闭浏览器、服务及清理目录。
百度统计脚本被本地空响应替代，避免外网依赖。文档代码、高亮器、主题和 WASM 都使用真实产物。
