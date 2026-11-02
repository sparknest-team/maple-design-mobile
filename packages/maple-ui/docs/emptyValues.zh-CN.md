# 空值识别、清空输出与阅读空文案

## 先判断你要解决什么问题

| 需求                                             | 使用的属性                 | 示例                 |
| ------------------------------------------------ | -------------------------- | -------------------- |
| 点击清空后提交 null、-1 或组件允许的其他值       | empty-value / emptyValue   | 清空按钮与手动删空   |
| 接口返回 -1 时，界面应显示“未选择”并无法通过必填 | empty-values / emptyValues | 空值标记与必填校验   |
| 空字符串代表合法的“全部”选项                     | empty-values 排除空字符串  | 合法空字符串选项     |
| 阅读模式为空时显示 '-' 或“暂无”                  | empty-text / emptyText     | 阅读空文案与配置继承 |

三个属性各有职责，不互相推导。emptyValue 只决定一次清空动作的输出；emptyValues 只声明空值身份；emptyText 只提供展示文案。配置与阅读展示不回写模型，不改变受控判断。

## 按场景理解

### 清空按钮与手动删空

在输入框中点击清空图标，模型变为 null；点击“恢复初值”后用 Backspace 删光，模型为 `''`。下方模型输出用引号区分空字符串与 null。

```demo
../src/input/example/demos/empty-value.vue
```

手动输入是普通输入事件，不会自动调用 emptyValue。Form reset 则恢复记录的初始值，也不是用户清空。详见 [Input 的值模型与交互](#/zh-CN/input)。

### 合法空字符串选项

“全部”的 value 是 `''`，仍应显示为已选。此时 emptyValues 使用 `[null, undefined]`；清空输出独立配置为 null。点击清空，再点击“选择全部”，比较两种模型值。

```demo
../src/select/example/demos/empty-value.vue
```

Select 默认保留合法空字符串选项。显式配置便于让字段和表单必填使用同一规则；删除选择器的搜索词只改变查询，不删除已选值。详见 [Select 的值模型与联动](#/zh-CN/select)。

### 空值标记与有效的 0

接口用 -1 表示未填写时，将它加入 emptyValues；需要清空也返回 -1 时，再配置 emptyValue=-1。初始界面空白，但下方模型仍为 -1。点击“设为 0”，应显示有效数字 0；清空后再回到 -1。

```demo
../src/input-number/example/demos/empty-value.vue
```

0 和 false 默认都不是空值。不要用 `!value` 一次性判断它们。InputNumber 手动删光后的提交仍遵循数值解析规则，可能输出 undefined，不自动套用按钮的清空输出。详见 [InputNumber 的数值输入与格式](#/zh-CN/input-number)。

### 接口空标记与必填校验

本例在 Form 设置 `[null, undefined, -1]`，供字段继承；Select 单独设置清空输出 -1。先校验初始值，再选择部门并校验；清空后再次校验会失败。

```demo
../src/form/example/demos/empty-values-validation.vue
```

只有 emptyValue=-1，不能声明 -1 为空；只有 emptyValues 包含 -1，也不会改变原有清空输出。required 在主动校验或既有触发时机运行，不会因为页面显示空白就自动运行。详见 [Form 的校验与提交](#/zh-CN/form)。

### 阅读空文案与配置继承

初始阅读模式下，姓名继承 Form 的默认 `'-'`，编号使用 FormItem 的“未分配”，昵称使用字段的“匿名”，数量保持 0。点击“使用暂无”，只有继承 Form 的空字段改变文案；再切换阅读/编辑，观察下方模型保持原值。

```demo
../src/form/example/demos/empty-text.vue
```

优先级为 **字段 > FormItem > Form > '-'**。显式 emptyText=`''` 表示空白；自定义 read 插槽始终优先。emptyText 不等于输入框 placeholder，也不会作为校验值或提交数据。详见 [Form 的字段呈现与交互](#/zh-CN/form)。

## 配置规则与边界

### emptyValues：识别当前模型是否为空

字段配置覆盖 FormItem，FormItem 覆盖 Form；列表完整替换，不合并。未配置时采用组件族默认：字符串识别 null/undefined/空字符串，Select 和数值字段保留各自的 nullish 默认。

标量用 includes 比较，0/false 默认有效；对象按引用识别，不做任意深比较。空数组始终是空集合，非空 `[null]` 不自动算空。显式 emptyValues=[] 可以移除额外标量空标记，但不能把空集合变成有选中项。

固定状态控件（Switch、Checkbox、Radio、Slider、Rate）与 Upload 在阅读和必填判断中使用策略，不因此重写 checked、数值范围或文件传输逻辑。非法日期、未完成的数字草稿仍由领域规则处理。

### emptyValue：清空动作产生什么值

省略时保留组件原有默认返回；具体允许的类型见组件 API。Input 当前支持字符串/null 及其工厂；对于支持 undefined 输出的 InputNumber、日期时间字段等，使用 `:empty-value="() => undefined"` 显式输出 undefined，直接绑定 undefined 仍表示未指定覆盖。

工厂在实际清空动作中求值，不在初始化、阅读或校验时执行。数组按原有解析规则生成独立结果。emptyValue 不会自动加入 emptyValues：例如清空恢复到 0 时，0 可以仍是有效值。

部分共享弹层在未配置 emptyValue 时会恢复 defaultValue；清空先修改草稿，确认后提交，取消则不提交。按钮清空、手动删空、移除最后一项和 reset 的差异按各组件既有规则执行。

### 必填与自定义规则

显式配置 emptyValues 后，内置 required 使用主字段策略。未显式配置时保留两库已有校验行为，不假定 Cedar 的 b-validate 与 Maple 的函数/Zod 在所有边界值上完全一致。

自定义 validator、Zod、min/max、enum 继续收到原始值。UI 识别 -1 为空，并不代表 `number().positive()` 会接受它；业务 schema 必须自己规定可缺省值。识别为空也不等于所有业务约束合法。

false 默认有效，因此“必填”不等于“必须勾选同意”。协议字段可显式将 false 标为空，或用自定义规则要求 true。一个 FormItem 建议对应一个主字段；多个独立值应拆成多个 FormItem。

### 与受控判断的关系

受控身份与业务空值是两件事。添加 -1 到 emptyValues 不会使外部绑定失去受控身份；移除 undefined 也不会改变组件既有的所有权判断。不要把内部所有 undefined 判断都替换为 isEmpty：模型所有权、数值解析失败、非法日期和业务空标记各有含义。

## 与 Element Plus 的对应关系

本设计借鉴 [Element Plus 空值配置](https://element-plus.org/zh-CN/component/config-provider.html#empty-values-configurations)和 [useEmptyValues](https://github.com/element-plus/element-plus/blob/dev/packages/hooks/use-empty-values/index.ts)的职责拆分。emptyValue 对应 valueOnClear，保留现有名称，不增加同义属性。

继承范围采用 Form/FormItem，工厂在清空动作时求值；保留组件族默认输出与空集合规则，没有照搬它的数组深比较、清空输出警告或 ConfigProvider 实现。
