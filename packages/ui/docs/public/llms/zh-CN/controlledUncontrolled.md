<!-- Source: docs/controlledUncontrolled.zh-CN.md; locale: zh-CN; page: /zh-CN/controlledUncontrolled -->

# 受控、非受控与清空值：从操作结果理解

本文面向第一次接触“受控”的使用者。先看 Input 的具体操作，再看 `v-model`，最后理解 `emptyValue`。示例描述当前工作区实现；尚未实施的统一方案单独放在末尾。

代码中的组件已按“快速开始”完成注册及样式引入。每个完整 Vue 示例可以独立使用。输入类示例显式设置 `edit-mode="direct"`，先排除弹层确认草稿的影响。

## 1. 先分清三个问题

| 问题                     | 决定它的东西                       | 例子                                                  |
| ------------------------ | ---------------------------------- | ----------------------------------------------------- |
| 当前值最终听谁的？       | `modelValue` 与组件的受控判定      | 父级传 A，拒绝 B，最终仍是 A                          |
| 只想提供初始值吗？       | `defaultValue`                     | 初始杭州，后续用户改成苏州                            |
| 点击清空时提出什么新值？ | `emptyValue`，模板写 `empty-value` | 清空提出 null、空字符串或其他配置值                   |
| 一个值是否显示成“空”？   | 组件的数据类型、选项和格式化规则   | Input 的 null 显示空文字；字符串 EMPTY 显示文字 EMPTY |

**受控的“控”是父组件控制最终值。** 不代表组件被禁用、不能聚焦、没有输入事件，也不代表值由服务器保存。父组件就是写下 `<mp-input ... />` 的那个 Vue 组件；这里的 `ref` 或表单对象都属于父级。

`emptyValue` 解决第三个问题，不会自动解决第一个或第四个。它也不是“所有空值的列表”。

## 2. 非受控：只给初始值，之后组件自己保存

```vue
<script setup lang="ts">
import { ref } from 'vue'

const seed = ref('杭州')
const instanceKey = ref(0)
const lastRequest = ref<string | null>()
function record(next: string | null) {
  lastRequest.value = next
}
</script>

<template>
  <mp-input :key="instanceKey" :default-value="seed" edit-mode="direct" @update:model-value="record" />
  <p>初始值变量：{{ seed }}</p>
  <p>最近一次更新请求：{{ JSON.stringify(lastRequest) }}</p>
  <button type="button" @click="seed = '北京'">只修改默认值</button>
  <button type="button" @click="instanceKey++">重新挂载</button>
</template>
```

按下面的顺序操作：

| 操作               | 输入框当前文字 | 父级 seed | 原因                                     |
| ------------------ | -------------- | --------- | ---------------------------------------- |
| 首次打开           | 杭州           | 杭州      | 组件读取默认值                           |
| 全选文字，改成苏州 | 苏州           | 杭州      | 组件保存新值；事件记录不会改 seed        |
| 点击“只修改默认值” | 仍为苏州       | 北京      | 默认值不是当前值，后续变化不覆盖用户输入 |
| 点击“重新挂载”     | 北京           | 北京      | 新实例重新读取默认值                     |

监听 `update:modelValue` 只是知道用户提出了什么。**只监听事件，并没有把记录值传回 modelValue，因此仍是非受控。** 初始化和重挂载不会为了同步父级而自动发出初始值更新。

默认值的变化不会被当前实例当成重置命令。需要程序主动控制当前值时，应使用下面的受控绑定。

## 3. 受控且接受更新：父级保存当前值

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string | null>('A')
</script>

<template>
  <mp-input v-model="text" edit-mode="direct" />
  <p>父级保存的值：{{ JSON.stringify(text) }}</p>
  <button type="button" @click="text = 'C'">父级主动设为 C</button>
</template>
```

全选 A 并输入 B 后，父级 `text` 变成 B，输入框随后以父级 B 为准。再点击按钮，父级把 `text` 改成 C，输入框也显示 C。

```text
父级 text=A → 传给输入框
用户输入 B → 输入框发出 update:modelValue(B)
父级接收并执行 text=B → 把 B 再传给输入框 → 最终显示 B
```

这里发生了一次“组件提出值 → 父级回写 → 组件读取父级值”的过程。“回写”指父级给自己的 ref/表单字段赋值，并让新值通过 prop 传回来，不是子组件直接改父级变量。

Vue 的 `v-model` 帮你自动写了这段回写逻辑。[Vue 官方说明](https://vuejs.org/guide/components/v-model.html)

## 4. 受控但拒绝更新：事件发生不等于值已被接受

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string | null>('A')
const requested = ref<string | null>()
const count = ref(0)
function recordOnly(next: string | null) {
  requested.value = next
  count.value++
  // 有意不执行 text.value = next。
}
</script>

<template>
  <mp-input :model-value="text" edit-mode="direct" @update:model-value="recordOnly" />
  <p>父级值：{{ JSON.stringify(text) }}</p>
  <p>候选值：{{ JSON.stringify(requested) }}；请求次数：{{ count }}</p>
</template>
```

全选 A 并尝试输入 B：候选值记录为 B，请求次数增加；父级 `text` 仍为 A，因此最终文字仍以 A 为准。输入时浏览器可能短暂显示编辑中的文字；判断最终状态，应看组件完成本轮更新后的结果。

| 项目            | 操作前 | 提出 B 后 |
| --------------- | ------ | --------- |
| 父级 text       | A      | A         |
| 组件提出的候选  | 尚无   | B         |
| 最终模型值/文字 | A      | A         |

这正是受控的用途：父级可以接受、拒绝或修正候选值。不是所有 `update:modelValue` 都会自动修改模型。

不要把这个示例当成只读的推荐写法。真正希望用户不能编辑时，用组件的 `readonly`/`disabled`；它们分别有聚焦、复制和事件行为的约定。拒绝更新演示的是状态所有权。

## 5. 根据条件决定是否接受

用布尔 Switch 可以更直观地观察“接受”与“拒绝”：

```vue
<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(false)
const allowUpdate = ref(false)
const requested = ref<string | number | boolean | null>()
function decide(next: string | number | boolean | null) {
  requested.value = next
  if (allowUpdate.value && typeof next === 'boolean') {
    enabled.value = next
  }
}
</script>

<template>
  <label><input v-model="allowUpdate" type="checkbox" />允许父级接受更新</label>
  <mp-switch :model-value="enabled" @update:model-value="decide" />
  <p>父级值：{{ enabled }}；候选值：{{ JSON.stringify(requested) }}</p>
</template>
```

先保持复选框未选中，点击 Switch：收到 true 候选，但父级不赋值，Switch 仍关闭。勾选复选框后再点 Switch：父级保存 true，Switch 才开启。

这个例子使用 Switch 默认的布尔值；配置 `checkedValue`/`uncheckedValue` 后，父级类型和判断应一起调整。后台权限、外部表单状态等也可以参与父级决策；业务需要等待时，显式展示 pending，避免让用户误以为更新已经生效。

## 6. `v-model` 到底省略了什么？

```html
<mp-input v-model="text" />
```

等价于下面的模板绑定：

```html
<mp-input :model-value="text" @update:model-value="text = $event" />
```

在 `<script setup>` 的函数里写的是 `text.value = next`；模板会自动解包 ref，所以模板里写 `text = $event`。

| 写法                       | 是否把父级值传入 | 是否回写更新                     | 对严格受控组件的意义 |
| -------------------------- | ---------------- | -------------------------------- | -------------------- |
| 只传 default-value         | 否               | 否                               | 组件自己保存后续值   |
| 只监听 update:modelValue   | 否               | 由监听函数决定，但未传回就不控制 | 只观察               |
| 只传 model-value=A         | 是               | 否                               | 固定以 A 为准        |
| model-value 加只记录事件   | 是               | 否                               | 收到候选，保持 A     |
| model-value 加赋值处理函数 | 是               | 是                               | 父级可以筛选更新     |
| v-model=text               | 是               | 自动赋值                         | 通常直接接受每次更新 |

“v-model 总是受控”也有前提：对按 `modelValue !== undefined` 判定的组件，`ref(undefined)` 初始仍未受控。还有少数组件采用本地代理，见第 15 节。

给 `v-model` 再加 `@update:model-value` 监听器，不能靠 `return false` 阻止 v-model 自带的赋值。需要拒绝时，请使用第 4/5 节的显式绑定。`change` 是提交通知，也不能通过返回 false 当作守卫。不要把同一次提交同时在 update 和 change 里执行两次保存。

## 7. `emptyValue` 与受控有冲突吗？

**功能本身不冲突；`undefined` 在特定组合下会同时承担两个含义。**

对 Input、InputNumber、Switch、Slider、Select 等采用 undefined 判定的模型：

```ts
// 判定规则示意，不是使用者需要添加的代码。
const isControlled = modelValue !== undefined
```

这表示 `''`、`0`、`false` 和合法 `null` 都是已定义的受控值。是否允许某个值仍取决于具体组件：例如页码不能因为 0 是已定义的就变成合法页码。

点击清空后，会先提出一个候选值。随后发生什么由父级决定：

| 清空候选     | 父级处理              | 回传的 modelValue | 结果                                     |
| ------------ | --------------------- | ----------------- | ---------------------------------------- |
| null         | 接受                  | null              | 仍受控，前提是组件支持 null              |
| 空字符串     | 接受                  | 空字符串          | 仍受控                                   |
| undefined    | 原样接受              | undefined         | 进入非受控模式                           |
| undefined    | 归一化为 null         | null              | 仍受控                                   |
| 任意清空候选 | 忽略更新，原值 A 不变 | A                 | 保持原来的受控值                         |
| undefined    | 组件本来就是非受控    | 未绑定            | 由组件处理内部空状态，不涉及交出父级控制 |

因此，**不能只看 emptyValue 配置，就断言一定失去控制。** 真正的控制模式变化发生在父级传回 undefined 时。单纯调用 emptyValue 工厂或收到事件，还没有改变外部 prop。

## 8. 四种 empty-value 写法并不等价

共享 `resolveEmptyValue` 的当前行为如下；未设置时的结果由各组件传入的 fallback 决定：

| 写法                             | 表示什么                                       |
| -------------------------------- | ---------------------------------------------- |
| 不写 empty-value                 | 使用组件现有的默认清空值                       |
| `:empty-value="undefined"`       | 同样使用组件默认清空值；不是强制输出 undefined |
| `:empty-value="() => undefined"` | 在该组件类型支持时，显式请求清空输出 undefined |
| `:empty-value="null"`            | 显式请求输出 null                              |
| `empty-value="EMPTY"`            | 请求输出字符串 EMPTY，不保证显示为空           |
| `:empty-value="0"`               | 请求输出数值 0；不是所有组件都接受这个值       |
| `:empty-value="() => []"`        | 请求新空数组，仍须符合组件模型与业务约束       |

工厂写法能区分“没有配置”和“明确返回 undefined”。Input 的空值类型是 string/null 及相应工厂，不应为了试验强行传入不支持的 undefined 工厂；下面使用支持该工厂的 InputNumber。

普通字符串要注意 Vue 绑定：`empty-value="null"` 是四个字符的字符串 null；`:empty-value="null"` 才是真正的 null。直接 `empty-value="0"` 也不是数值绑定。

目前核实的默认清空路径：

| 组件/路径                         | 未配置覆盖值时的当前候选                          |
| --------------------------------- | ------------------------------------------------- |
| Input 清空按钮                    | 空字符串                                          |
| InputNumber 清空按钮              | undefined                                         |
| Select 单选且没有空字符串选项     | 通常空字符串                                      |
| Select 单选且存在 value='' 的选项 | undefined，用来区分“选择空字符串选项”和“清空选择” |
| Select 多选                       | 通常空数组；受保护的禁用选中项可能保留            |

这张表不是全组件空值规范。日期/时间及不同面板另有路径，不要从组件名称推断。`emptyValue` 也不会绕过禁用、只读、待处理事务、受保护选项等业务限制。

## 9. 示例：Input 清空成 null，之后仍然受控

```vue
<script setup lang="ts">
import { ref } from 'vue'

const text = ref<string | null>('A')
const updates = ref<string[]>([])
function accept(next: string | null) {
  updates.value.push(JSON.stringify(next))
  text.value = next
}
</script>

<template>
  <mp-input :model-value="text" :empty-value="null" edit-mode="direct" clearable @update:model-value="accept" />
  <p>父级值：{{ JSON.stringify(text) }}</p>
  <p>请求记录：{{ updates.join(' → ') }}</p>
</template>
```

操作顺序与预期：

| 操作                    | 本次候选 | 父级 text | 输入框 |
| ----------------------- | -------- | --------- | ------ |
| 初始                    | 无       | A         | A      |
| 点击清空按钮            | null     | null      | 空白   |
| 再输入 B                | B        | B         | B      |
| 全选后按 Backspace 删光 | 空字符串 | 空字符串  | 空白   |

null 与空字符串都能显示空白，但模型里的值不同。**当前 emptyValue 控制清空动作的输出，不会把手动删光自动改成 null。** 如果业务要求所有空文字统一为 null，可在父级处理函数中使用 `text.value = next === '' ? null : next`。

同理，设置 `empty-value="EMPTY"` 的 Input，点击清空后会以字符串 EMPTY 为值；“清空按钮”并不保证最终得到无文字的状态。

## 10. 示例：undefined 清空后为什么改变模式？

这是观察当前行为的示例，不是持续受控表单的推荐配置。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const quantity = ref<number | null | undefined>(12)
const clearToUndefined = () => undefined
const describe = (value: unknown) => (value === undefined ? 'undefined' : JSON.stringify(value))
const lastRequest = ref('尚无更新')
function accept(next: number | null | undefined) {
  lastRequest.value = describe(next)
  quantity.value = next
}
</script>

<template>
  <mp-input-number
    :model-value="quantity"
    :empty-value="clearToUndefined"
    edit-mode="direct"
    clearable
    @update:model-value="accept"
  />
  <p>父级值：{{ describe(quantity) }}；候选值：{{ lastRequest }}</p>
  <p>按当前判定是否受控：{{ quantity !== undefined }}</p>
</template>
```

| 步骤                                 | 父级 quantity | quantity !== undefined | 谁保存最终值           |
| ------------------------------------ | ------------- | ---------------------- | ---------------------- |
| 初始为 12                            | 12            | true                   | 父级                   |
| 组件提出 undefined，父级尚未处理     | 仍为 12       | true                   | 仍为父级               |
| accept 原样回写                      | undefined     | false                  | 组件内部               |
| 后续用户操作，父级继续不提供已定义值 | undefined     | false                  | 组件可以保存后续内部值 |

这里的变化不是由“空白”造成的，而是由 modelValue 的实际值变成 undefined 造成的。之后如果父级又回写一个已定义数值，便重新进入受控。当前各组件切换时内部值的保留策略尚未统一，不应依赖切换模式完成 reset。

同样，不要期待 `v-model` 的类型声明替你做运行时转换。把 ref 写成 `number | null` 并不会自动把收到的 undefined 转成 null。

## 11. 推荐示例：父级归一化，兼容不同空输入路径

```vue
<script setup lang="ts">
import { ref } from 'vue'

const quantity = ref<number | null>(12)
const lastRequest = ref('尚无更新')
function acceptNormalized(next: number | null | undefined) {
  lastRequest.value = next === undefined ? 'undefined' : JSON.stringify(next)
  quantity.value = next ?? null
}
</script>

<template>
  <mp-input-number
    :model-value="quantity"
    :empty-value="null"
    edit-mode="direct"
    clearable
    @update:model-value="acceptNormalized"
  />
  <p>组件候选值：{{ lastRequest }}</p>
  <p>父级最终值：{{ JSON.stringify(quantity) }}</p>
  <p>按当前判定是否受控：{{ quantity !== undefined }}</p>
</template>
```

这个处理同时覆盖清空按钮和其他实际发出 undefined 的输入路径：null → null，undefined → null，0 → 0，其他数值保持不变。父级保存的 quantity 始终不为 undefined，所以最终模型保持受控。

为什么除了 empty-value=null，还需要处理函数？当前 InputNumber 的清空按钮经过 `resolveEmptyValue`，而手动删空并提交的分支可以直接产生 undefined；在 `modelEvent='input'` 时还可能更早提出空值。**emptyValue 不是输入解析器，也不是所有提交路径的归一化器。**

不要写 `next || null`：它会把有效数值 0 也变成 null。`next ?? null` 只合并 null/undefined。该例的字段允许空数值；不要直接把这套归一化套在页码等不允许 null 的模型上。

如果希望父级用 v-model 的形式调用，可以用带 setter 的 computed 做同样转换；只读 computed 没有可回写入口。异步保存也应与本地回写分开：例如先同步更新父级表单，再在提交按钮中保存；如果业务需要先审核再接受，保留旧值并显示 pending，不靠延迟回写掩盖状态。

## 12. 示例：空字符串是有效选项时，使用 null 区分未选择

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string | null>(null)
const options = [
  { label: '全部', value: '' },
  { label: '仅启用', value: 'enabled' },
]
</script>

<template>
  <mp-select v-model="selected" :options="options" :empty-value="null" edit-mode="direct" clearable />
  <p>父级值：{{ JSON.stringify(selected) }}</p>
</template>
```

| 操作         | 父级 selected | 含义                 |
| ------------ | ------------- | -------------------- |
| 初始         | null          | 尚未选择             |
| 选择“全部”   | 空字符串      | 已选择一个合法选项   |
| 选择“仅启用” | enabled       | 已选择另一个选项     |
| 点击清空     | null          | 恢复未选择，保持受控 |

不要把 `selected === ''` 同时当作“全部”和“未选择”。Element Plus 的文档用类似的空字符串选项说明这个问题，但它另有 `empty-values` 与 `value-on-clear` 两个 API；我们当前没有因此自动获得 `empty-values` 功能。

多选使用数组时，应按该组件的数组值域初始化并选择合适的 emptyValue，不能从“null 可用于某个单选”推出“所有多选都该改成 null”。选择器还会保留不能清除的禁用项；清空配置不覆盖这条业务规则。

## 13. 示例：值和弹层开合是两个独立模型

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string | null>(null)
const panelOpen = ref(false)
const allowClose = ref(true)
const options = [
  { label: '杭州', value: 'hz' },
  { label: '北京', value: 'bj' },
]
function acceptOpen(next: boolean) {
  if (next || allowClose.value) panelOpen.value = next
}
</script>

<template>
  <label><input v-model="allowClose" type="checkbox" />允许接受关闭请求</label>
  <mp-select
    v-model="selected"
    :open="panelOpen"
    :options="options"
    :empty-value="null"
    edit-mode="direct"
    clearable
    @update:open="acceptOpen"
  />
  <p>值：{{ JSON.stringify(selected) }}；展开：{{ panelOpen }}</p>
  <button type="button" @click="panelOpen = false">父级主动关闭</button>
</template>
```

选择值通过 v-model 直接接受，开合通过显式处理函数决定。取消“允许接受关闭请求”后，值仍可更新，但关闭请求会被父级拒绝；点击“父级主动关闭”则直接修改 panelOpen。

这不是一个“整个组件是否受控”的全局开关，而是两个状态分别有自己的所有者。`v-model:open="panelOpen"` 只是 `:open` 加 `@update:open="panelOpen = $event"` 的简写。

本例使用 Select 的直接编辑形态。弹层确认编辑还有 draft：面板中的候选可以与最终 modelValue 不同；确认才提交，取消应丢弃本轮草稿。看到候选文字变化，不足以判断最终模型是否被组件自行修改。

## 14. 表单初始化、重置与后端空值

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive<{ name: string | null; quantity: number | null }>({
  name: null,
  quantity: null,
})
const payloadText = ref('尚未提交')
function updateQuantity(next: number | null | undefined) {
  form.quantity = next ?? null
}
function reset() {
  form.name = null
  form.quantity = null
}
function submit() {
  const payload = {
    name: form.name === null ? undefined : form.name,
    quantity: form.quantity === null ? undefined : form.quantity,
  }
  payloadText.value = JSON.stringify(payload)
}
</script>

<template>
  <mp-input v-model="form.name" :empty-value="null" edit-mode="direct" clearable />
  <mp-input-number
    :model-value="form.quantity"
    :empty-value="null"
    edit-mode="direct"
    clearable
    @update:model-value="updateQuantity"
  />
  <button type="button" @click="reset">重置父级数据</button>
  <button type="button" @click="submit">生成提交数据</button>
  <p>提交数据：{{ payloadText }}</p>
</template>
```

这个例子用普通 reactive 对象说明状态归属，不依赖 Form 的布局或校验 API：父级负责初始化和 reset。Input 的默认值不会把空的 form 字段自动填成有值；需要初始姓名时，应直接初始化 form.name。

生成提交数据时，把 UI 中的 null 转为对象属性的 undefined，JSON 序列化便省略该属性；这一步不改变 form 本身。业务若要求发送 JSON null，就不要做该转换。

**界面模型的空值与后端传输格式可以不同。** 无需为了后端“省略字段”的要求，让受控组件的 modelValue 也变成 undefined。这里的文本空字符串仍原样发送；如果业务也要求省略空字符串，需在序列化层明确处理，不把它与 null 混为一谈。

## 15. 当前还不能一概而论的组件

以下是现状说明，不是目标设计已落地的声明：

| 范围                                 | 当前差异                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| Maple ActionSheet.open               | 默认 useVModel 本地代理，内部可以先改变状态                                   |
| Maple NumberKeyboard.open/modelValue | 两个模型均使用默认本地代理                                                    |
| Maple FloatingPanel.modelValue       | 停靠高度使用代理；另有手势显示高度                                            |
| Maple Popup 设置 beforeClose         | 会使用内部 visible，并可能拦截父级 open=false，拒绝时反向发 update:open(true) |
| 两端 Collapse                        | 当前使用 nullish 回退；null 会回退内部状态，全部收起用 []                     |

前三项不能用“忽略 update 就一定不会变化”推断。父级传回同一个原值，也不一定触发同步代理的 watch。两端 useVModel 工具逻辑基本一致，但 Input/Switch/Slider 等自己实现状态管理；工具函数名称不代表全组件行为。

InputNumber 可能保留尚未提交的中间文本，Input 还涉及 IME；Popup 退场时可能保留 DOM。应区分最终模型、草稿/原生编辑状态和动画状态。

## 16. 其他文档有哪些写法值得借鉴？

以下是说明方式的参考，不表示这些库的 API、空值或模式切换规则可直接照搬到 Cedar/Maple。所有示例均针对我们的组件重写。

| 参考                                                                                                                          | 值得借鉴的说明方式                               |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [Reka：Controlled State](https://www.reka-ui.com/docs/guides/controlled-state)                                                | 将显式回写、v-model 简写和 defaultValue 并排展示 |
| [React：Input](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)             | 通过“不回写便恢复原值”的操作结果解释所有权       |
| [Radix：Dialog 异步提交](https://www.radix-ui.com/primitives/docs/components/dialog#close-after-asynchronous-form-submission) | 用保存完成后由父级关闭的业务场景解释受控的价值   |
| [Element Plus：Select 空值](https://element-plus.org/en-US/component/select.html#empty-values)                                | 区分空值识别与清空输出，展示空字符串作为合法选项 |
| [Naive UI：受控说明](https://www.naiveui.com/zh-CN/docs/controlled-uncontrolled)                                              | 明确写出 undefined 如何影响控制模式              |

React 原生受控文本输入不应传 null/undefined；我们的 Input 接受 null 并显示为空。借鉴操作解释，不能把 React 的空值限制当成所有 Vue 组件库的规则。只有值 prop 的写法也不是一律写错：有意固定状态是合法用途；希望可编辑却忘记回写，才与预期不符。

## 17. 目标设计与现有 emptyValue 的关系

统一方案尚未实施。推荐保持这些边界：最终受控状态由父级决定；默认值只初始化；标准清空值尽量使用已定义的领域空值；草稿、手势、动画不能代替最终值。

**保留 emptyValue 的自定义输出能力，不把所有 () => undefined 一律视为非法。** 它与明确的父级归一化、已有接口和特定业务有配合价值；只是父级原样回传 undefined 时，必须接受当前判定下的非受控后果。

目标会继续单独设计各条空输入路径：清空按钮、键盘删空、面板清空和 Form reset，避免只改按钮而遗漏其他路径。更改已发布组件的默认空值、模式切换或代理行为，需要单独版本迁移，不能只更新文档就当作已经实现。

## 18. 排查时按这个顺序看

1. 确认当前讨论的是哪个状态：modelValue、open，还是 draft。
2. 看父级真正传下来的值；不要只看 ref 的静态类型或输入框是否空白。
3. 记录 update 事件候选，确认父级是否赋值，以及是否做了转换。
4. 若候选为空，区分清空按钮、手动删除、面板确认或 Form reset 路径。
5. 检查 emptyValue 是省略、显式 null、字符串，还是工厂返回 undefined。
6. 最后检查是否属于第 15 节的代理/守卫例外。

源码入口：两端 `packages/*-ui/src/input/use-input-value.ts`、`input-number/use-number-value.ts`、`select/use-select-controller.ts`、empty-value 工具；两端 `packages/*-use/src/useVModel.ts`；Maple 上述三个代理组件及 Popup。本文的预期值表用于说明已核实路径，不等于所有组件、平台与浏览器交互均已验收。
