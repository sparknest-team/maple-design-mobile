<!-- Source: docs/showcaseStrengths.zh-CN.md; locale: zh-CN; page: /zh-CN/showcaseStrengths -->

# 核心特点

Maple 的特点既体现在单个组件，也体现在跨组件的约定和业务流程中。这里整理了 20 个有现有示例支撑的展示点，覆盖 体系级特点、场景组合能力、交互与数据特点、业务组件特点、移动端特点、工程保障。

## 演示时先讲什么

- **跨组件一致性**：一起切换输入、选择和日期字段的尺寸、变体，观察一组字段如何遵循共同约定。
- **阅读与编辑闭环**：修改、取消、确认及拒绝后重试，核对临时输入与已保存数据。
- **业务数据接入**：从 ID 回显、搜索候选到人员操作，展示字段如何连接业务模型与服务。
- **移动触控组合**：体验滑动关闭确认、刷新及安全区，检查触控操作与移动容器的配合。

以下属于本库的设计取向、已实现能力和工程保障。是否比某个参考库更省配置或体验更好，需要在逐组件页中按同一业务任务验证。

## 体系级特点

### 桌面与移动沿用同一套公共约定

公共尺寸、变体、值绑定与主题语言对齐，端侧密度和操作形态分别适配。

演示方法：使用同一巡检任务：Cedar 在字段附近操作；Maple 的选择与日期时间进入 Popup。先取消，再确认，对照已提交模型。

[打开对应示例](#/zh-CN/form#zhuo1mian4yu3yi2dong4de0tong2chang3jing3zhan3shi4) · 相关组件：[Button 按钮](#/zh-CN/button)、[Input 输入框](#/zh-CN/input)、[Select 下拉框](#/zh-CN/select)、[Form 表单](#/zh-CN/form)

### 主题从品牌延伸到组件与局部覆盖

品牌、语义颜色与组件变量分层，亮暗模式和局部覆盖可以组合使用。

演示方法：切换品牌和亮暗，再比较默认按钮与局部覆盖按钮，随后打开字段弹层。

[打开对应示例](#/zh-CN/themes) · 相关组件：[ThemeProvider](#/zh-CN/theme-provider)、[Button 按钮](#/zh-CN/button)、[FieldDecorator 字段外壳](#/zh-CN/field-decorator)

### 跨控件保持字段外观与几何一致

Input、Select、日期时间字段通过共同外壳组织尺寸、变体、前后缀和清除区域。

演示方法：一次切换尺寸与变体，对照普通、有值、多选长标签和日期范围字段。

[打开对应示例](#/zh-CN/field-decorator#biao3dan1kong4jian4chi3cun4dui4zhao4) · 相关组件：[FieldDecorator 字段外壳](#/zh-CN/field-decorator)、[Input 输入框](#/zh-CN/input)、[Textarea 文本域](#/zh-CN/textarea)、[Select 下拉框](#/zh-CN/select)、[Cascader 级联选择](#/zh-CN/cascader)、[Date 日期字段](#/zh-CN/date)、[Time 时间字段](#/zh-CN/time)、[Button 按钮](#/zh-CN/button)

### 同一字段承接阅读与编辑

Form、FormItem 与字段可继承阅读展示和编辑方式，字段可以覆盖父级配置。

演示方法：切换阅读态、直接编辑和确认后提交，再查看单项覆盖。

[打开对应示例](#/zh-CN/form) · 相关组件：[Form 表单](#/zh-CN/form)、[Input 输入框](#/zh-CN/input)、[Textarea 文本域](#/zh-CN/textarea)、[InputNumber 数字输入框](#/zh-CN/input-number)、[Select 下拉框](#/zh-CN/select)、[PeopleSelect 人员选择](#/zh-CN/people-select)、[Date 日期字段](#/zh-CN/date)、[Time 时间字段](#/zh-CN/time)、[Upload 上传](#/zh-CN/upload)

### 日期时间字段和独立面板分别使用

带触发器的字段与可嵌入的面板分层，单值、范围和提交规则按公开契约接入。

演示方法：对照带输入框的字段与内嵌面板，检查手输、取消和确认后的值。

[打开对应示例](#/zh-CN/date#zi4duan4shi4kou3yu3kuai4jie2xiang4shi4jian4) · 相关组件：[Date 日期字段](#/zh-CN/date)、[DateRange 日期范围字段](#/zh-CN/date-range)、[Time 时间字段](#/zh-CN/time)、[TimeRange 时间范围字段](#/zh-CN/time-range)

## 场景组合能力

### 筛选、行操作和统计来自同一份业务数据

条件查询、状态变更、空结果与统计联动，桌面表格与移动表格使用同一任务场景。

演示方法：查询运营部 → 完成任务 → 按状态过滤 → 空结果 → 清空筛选并恢复任务。

[打开对应示例](#/zh-CN/table#ren4wu0shai1xuan3yu3shu4ju4lian2dong4) · 相关组件：[Table 表格](#/zh-CN/table)、[Input 输入框](#/zh-CN/input)、[Select 下拉框](#/zh-CN/select)

业务流程示例使用本地数据与模拟保存，不代表组件内置业务后端。

### 从字段校验走到确认、失败与恢复

把 Form 校验、预览和保存状态组合为业务流程，失败保留草稿，提交记录独立保存。

演示方法：空值校验 → 填入数据 → 返回修改 → 模拟失败 → 重试成功 → 查看提交记录。

[打开对应示例](#/zh-CN/form#xun2jian3ren4wu0wan2zheng3liu2cheng2) · 相关组件：[Form 表单](#/zh-CN/form)、[Input 输入框](#/zh-CN/input)、[Select 下拉框](#/zh-CN/select)

业务流程示例使用本地数据与模拟保存，不代表组件内置业务后端。

## 交互与数据特点

### 编辑过程具有草稿、确认和失败恢复语义

编辑过程区分临时输入与已保存值，确认失败时可以保留内容供用户修正。

演示方法：修改后取消，再模拟拒绝确认并重试；观察最终模型和仍在编辑的内容。

[打开对应示例](#/zh-CN/form#jin4yong4、zhi1du2yu3yi4bu4que4ren4) · 相关组件：[Form 表单](#/zh-CN/form)、[Input 输入框](#/zh-CN/input)、[Select 下拉框](#/zh-CN/select)、[Date 日期字段](#/zh-CN/date)、[Time 时间字段](#/zh-CN/time)

Cedar 的 click/dblclick 原位编辑还包含字段切换与面板键盘优先级；Maple 按自身弹层交互演示。

### 候选高亮、搜索词、草稿与业务值分开

打开或搜索候选时不应意外提交表单，选择和确认按字段展示方式更新模型。

演示方法：先打开、搜索和移动候选，再选择与确认，对照更新次数与真实事件。

[打开对应示例](#/zh-CN/select#hou4xuan3gao1liang4yu3biao3dan1shu4ju4liu2) · 相关组件：[Select 下拉框](#/zh-CN/select)、[AutoComplete 自动补全](#/zh-CN/auto-complete)、[PeopleSelect 人员选择](#/zh-CN/people-select)、[Cascader 级联选择](#/zh-CN/cascader)、[Form 表单](#/zh-CN/form)

### 远程搜索与已选 ID 回显分工

候选获取和已选内容解析分别接入业务服务，处理异步状态与过期结果。

演示方法：从仅有 ID 的模型开始，展示名称回显，再连续切换搜索词。

[打开对应示例](#/zh-CN/people-select) · 相关组件：[Select 下拉框](#/zh-CN/select)、[PeopleSelect 人员选择](#/zh-CN/people-select)、[AutoComplete 自动补全](#/zh-CN/auto-complete)

### 数值显示格式与业务数字分离

formatter / parser 处理展示与解析，精度、步长及边界共同约束最终数值。

演示方法：输入带格式的值，再尝试小数步长和边界，观察模型中保存的数字。

[打开对应示例](#/zh-CN/input-number#xiao3bu4chang2yu3fan4wei2bian1jie4) · 相关组件：[InputNumber 数字输入框](#/zh-CN/input-number)、[Form 表单](#/zh-CN/form)

模型仍为 JavaScript number；不将十进制计算等同于任意精度的大数存储。

### 上传准备与取消竞争有明确处理

异步准备、取消、重试和迟到请求句柄之间隔离失效结果，文件替换后重新检查限制。

演示方法：等待准备时取消并重新提交，再放行旧结果，核对有效请求与文件状态。

[打开对应示例](#/zh-CN/upload#shang4chuan2qian2zhun3bei4yu3qu3xiao1jing4zheng1) · 相关组件：[Upload 上传](#/zh-CN/upload)

### 浮层开合、异步关闭和焦点按职责处理

弹层的展示控制、异步确认及焦点恢复与业务保存逻辑配合，嵌套时按当前层操作。

演示方法：在弹层内打开字段面板，尝试 Esc 和拒绝关闭，再核对焦点返回。

[打开对应示例](#/zh-CN/popup#shi4jian4) · 相关组件：[Dialog 对话框](#/zh-CN/dialog)、[弹出层](#/zh-CN/popup)、[Popover 气泡卡片](#/zh-CN/popover)、[Trigger 浮层触发](#/zh-CN/trigger)

## 业务组件特点

### 人员字段可以连接业务操作

人员显示与选择复用统一字段行为；头像与操作区由业务提供，不绑定聊天 SDK。

演示方法：同一人员 ID 在编辑字段和阅读字段中联动，并触发示例业务操作。

[打开对应示例](#/zh-CN/people-select) · 相关组件：[PeopleSelect 人员选择](#/zh-CN/people-select)、[Form 表单](#/zh-CN/form)

### 文件读取、准备、请求和展示可分别接入

不配置上传接口时可以只读取文件；请求、进度和自定义展示按业务需要组合。

演示方法：先选择本地文件，再展示手动提交、外部进度与独立 hook。

[打开对应示例](#/zh-CN/upload#shou3dong4dui4lie4he2ke3qu3xiao1qing3qiu2) · 相关组件：[Upload 上传](#/zh-CN/upload)

## 移动端特点

### 滑动操作包含关闭确认和取消处理

SwipeCell 为左右操作区、关闭前确认和拖动取消提供专门的触控场景。

演示方法：左右滑动并尝试拒绝关闭，再通过可见按钮完成同一操作。

[打开对应示例](#/zh-CN/swipe-cell#guan1bi4qian2que4ren4) · 相关组件：[滑动单元格](#/zh-CN/swipe-cell)

### 刷新、滚动与内容定位有专用组件

下拉刷新、无限加载和分组索引分别处理移动内容的刷新与定位。

演示方法：下拉刷新结束后再次操作；再对照无限加载和分组索引入口。

[打开对应示例](#/zh-CN/pull-refresh#ji1ben3shi3yong4) · 相关组件：[下拉刷新 PullRefresh](#/zh-CN/pull-refresh)、[InfiniteScroll 无限滚动](#/zh-CN/infinite-scroll)、[索引栏](#/zh-CN/index-bar)

### 安全区与底部操作区可以组合

安全区留白与弹层、底部栏等组件联动，覆盖嵌套和应用容器接入。

演示方法：切换安全区模拟条件，观察底部按钮及嵌套区域的留白。

[打开对应示例](#/zh-CN/safe-area#di3bu4liu2bai2yu3qian4tao4) · 相关组件：[SafeArea 安全区](#/zh-CN/safe-area)、[弹出层](#/zh-CN/popup)、[底部标签栏](#/zh-CN/tab-bar)、[浮动面板](#/zh-CN/floating-panel)

## 工程保障

### 部分稳定逻辑可以脱离默认界面复用

useUploader 提供独立文件处理逻辑，可以接入自定义界面与请求服务。

演示方法：展开 useUploader 示例，查看模型、文件校验与自定义请求如何连接。

[打开对应示例](#/zh-CN/upload#shang4chuan2qian2zhun3bei4yu3qu3xiao1jing4zheng1) · 相关组件：[Upload 上传](#/zh-CN/upload)

### 复杂交互明确考虑停用、卸载与过期任务

对选择请求、计时、拖动和滚动等异步过程提供生命周期示例与相应检查。

演示方法：启动操作后改变状态或停用实例，再恢复并重新操作，观察旧任务是否干扰。

[打开对应示例](#/zh-CN/select#jiao1hu4diao4du4sheng1ming4zhou1qi1) · 相关组件：[Select 下拉框](#/zh-CN/select)、[Search 搜索框](#/zh-CN/search)、[Upload 上传](#/zh-CN/upload)、[Countdown 倒计时](#/zh-CN/countdown)

## 继续逐项比较

在[逐组件对照](#/zh-CN/showcaseComponents)中查看其他组件库的相似示例、文档依据与待核验增量；每个特点的运行示例仍保存在对应组件目录中。
