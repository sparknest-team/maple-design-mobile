# PeopleSelect 人员选择

`options` 接收人员数组或加载函数，组件内部管理等待、取消与过期结果；`fallback-option` 同步读取独立的响应式回显数据，异步查询完成后更新该数据即可回显。头像由 `avatar` 提供。组件提供可选的电话、聊天图标，拨号、聊天和权限仍由业务实现。

## 全局默认属性与局部覆盖

```ts
import { PeopleSelect, type PeopleSelectProps } from '@maple-design/ui'

PeopleSelect.setPropsDefaults({
  options: (query, { signal }) => peopleService.search(query, signal),
  fallbackOption: (id) => personCache.value[id] ?? { value: id, label: id },
  showPhone: true,
  showChat: true,
  call: (person) => businessPhone.call(person.mobile),
  chat: (person) => businessChat.open(person.value),
} satisfies PeopleSelectProps)
```

```vue
<mp-people-select v-model="personId" />
<!-- 本页覆盖候选接口与聊天行为，关闭电话图标 -->
<mp-people-select v-model="personId" :options="loadMyTeam" :chat="openTeamChat" :show-phone="false" read-pretty />
<!-- 数组覆盖全局加载函数；空数组也表示明确使用本地空数据 -->
<mp-people-select v-model="personId" :options="[]" />
```

局部属性优先于全局默认。图标只在阅读态展示；默认 show-phone/show-chat 为 false。启用显示但没有处理函数时，按钮禁用；未选人员、禁用状态也不能触发动作。函数返回 Promise 时按钮自动等待，失败触发 action-error(error, call|chat)。组件不自动打开 tel: 链接，也不包含聊天 SDK。业务需要独立处理读取权限与操作权限时，可覆盖操作区域。

setPropsDefaults 在挂载前配置一次，修改组件定义的默认属性；不是按应用或租户隔离的上下文。SSR 不应逐请求修改，动态页面/租户配置推荐封装业务组件并透传 props。

## 自定义操作区域

```vue
<mp-people-select v-model="personId" read-pretty>
  <template #actions="{ person, disabled }">
    <business-person-actions :person="person" :disabled="disabled" />
  </template>
</mp-people-select>
```

操作区域优先级：actions 插槽 → render-actions → 内置电话/聊天按钮。它们均不会触发字段编辑或更改已选人员。

## 基础示例

### 完整业务示例

<demo src="../example/demos/injected-services.vue"></demo>

## API

### 空值识别与阅读空文案

`empty-values` 用于空值识别，`empty-value` 保留原清空输出；`empty-text` 仅在 `read-pretty` 空内容下展示，默认 `'-'`，字段 > FormItem > Form，自定义 read 插槽优先。显式配置 empty-values 后，内置 required 接入该策略，自定义校验仍收到原值。详见[统一说明](#/zh-CN/emptyValues)。

| 参数         | 类型               | 缺省与范围                                            |
| ------------ | ------------------ | ----------------------------------------------------- |
| empty-values | readonly unknown[] | 字段 > FormItem > Form > 组件族默认；完整覆盖，不合并 |
| empty-text   | string             | 字段 > FormItem > Form > '-'；显式 '' 有效            |

以上是字段展示层 API；纯面板不因此新增阅读模式。Form 与 FormItem 提供继承配置。empty-value 的现有类型与默认输出仍按该组件原 API 执行。

### PeopleSelect Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| model-value / v-model | string / null | undefined | 受控人员标识；显式 null 保持为空。 |
| default-value | string | '' | 仅创建时读取的非受控初始标识。 |
| options | readonly PeopleSelectOption[] / PeopleSelectOptionsLoader | undefined | 候选数组或 (query, { signal }) 加载函数；显式数组优先。 |
| fallback-option | PeopleSelectFallbackOption | true | 同步回显回退；可返回人员对象，false 关闭未匹配回显。 |
| label | string | '' | 候选缺失时的响应式回显姓名。 |
| default-text | string | '-' | 人员信息不可用时的默认姓名文本。 |
| placeholder | string | undefined | 可编辑字段的占位内容。 |
| name | string | undefined | 传给内部 Select 的表单名称。 |
| show-avatar | boolean | true | 显示人员头像；头像失败时保留姓名。 |
| show-phone | boolean | false | 人员阅读内容显示电话按钮；未提供 call 时禁用。 |
| show-chat | boolean | false | 人员阅读内容显示聊天按钮；未提供 chat 时禁用。 |
| call | PeopleSelectAction | undefined | 显式电话任务；返回 Promise 时仅对应按钮等待，失败发送 action-error。 |
| chat | PeopleSelectAction | undefined | 显式聊天任务；返回 Promise 时仅对应按钮等待，失败发送 action-error。 |
| render-actions | PeopleSelectRenderActions | undefined | 阅读操作区域渲染函数；actions 插槽优先。 |
| is-label | boolean | false | 人员阅读入口，不创建编辑字段；read 插槽与 read-pretty 使用同一参数。 |
| read-pretty | boolean | undefined | 统一字段纯阅读状态，省略时继承表单；不请求函数候选。 |
| edit-mode | FieldEditMode<br>`'direct' \| 'popup'` | undefined | 字段编辑入口，省略时继承 FormItem / Form，否则 direct。 |
| disabled | boolean | undefined | 省略时继承表单；允许读取姓名，禁止打开、选择和清空。 |
| readonly | boolean | undefined | 省略时继承表单；保留回显读取，禁止编辑。 |
| filterable | boolean | true | 显示候选搜索输入。 |
| filter-option | FilterOption | undefined | 本地过滤策略；函数候选默认不重复过滤，数组默认过滤。 |
| case-sensitive | boolean | false | 内置本地搜索区分大小写。 |
| search-fields | readonly OptionSearchField[]<br>`OptionSearchField: 'label' \| 'value'` | ['label'] | 内置本地搜索使用的候选字段，默认 label。 |
| search-delay | number | 500 | 搜索通知与请求的防抖毫秒数。 |
| clearable | boolean | false | 允许可编辑字段清空；延迟模式先清草稿，确认后提交。 |
| empty-value | string / null / function | '' | 清空提交值；显式 null 原样保留，省略时使用空字符串。 |
| empty-values | readonly unknown[] | undefined | 空值识别策略；字段、FormItem、Form 逐级继承。 |
| empty-text | string | undefined | 纯阅读空文案，继承后缺省为短横线。 |
| loading | boolean | false | 编辑字段的手动等待展示，暂停选择与清空；不覆盖人员阅读内容。 |
| loading-mode | 'default' / 'line' | 'default' | 编辑字段加载指示形式；不改写 disabled 或 readonly。 |
| before-commit | BeforeFieldCommit | undefined | 延迟确认协议 ({ value, previousValue }, done, { signal })；支持布尔返回、Promise 或 done，同步 undefined 等待 done。 |
| open | boolean | undefined | 受控延迟编辑层打开状态。 |
| default-open | boolean | false | 非受控延迟编辑层初始打开状态。 |
| popup-container | PopupContainer | undefined | 编辑弹层挂载目标；选择器、HTMLElement 或 false。 |

### PeopleSelect Events

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:model-value | value: string / null | 提交人员标识，不收集监听器返回值。 |
| change | value: string / null | 人员值变更通知。 |
| update:open / open-change | open: boolean | 延迟编辑层打开状态通知。 |
| clear | — | 清空动作通知；延迟模式仍需确认草稿。 |
| search | query: string | 搜索通知；请求由 options 显式函数管理。 |
| load-error | error: unknown, source: 'options' | 当前候选读取失败通知。 |
| action-error | error: unknown, action: 'call' / 'chat' | 显式电话或聊天任务失败通知，不等待错误监听器。 |

### PeopleSelect Slots

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| default | — | 透传 Select 的自定义 Option 内容。 |
| read | PeopleSelectReadScope | 两种阅读入口均为 { value, text, person }；空值也可自定义。 |
| actions | PeopleSelectActionScope | 人员阅读操作区域，参数为 { person, disabled }。 |
| option / label | { data: PeopleSelectOption } | 候选及已选人员内容；默认渲染姓名和头像。 |
| selected / trigger / prefix / suffix / empty / header / footer | — | 沿用 Select 同名插槽及其呈现范围。 |
| arrow-icon | { focus, menuOpen } | 字段箭头图标状态。 |
| clear-icon | { clear(event?) } | 清除节点；调用 clear 才执行标准清空。 |
| loading-icon / search-icon | — | 字段加载或搜索图标内容。 |

### PeopleSelect Methods

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| refresh() | `Promise<void>` | 重新读取当前候选；纯阅读入口不请求，禁用或只读仍允许显式读取。 |
| focus() / blur() | void | 操作当前真实编辑输入；纯阅读无输入，禁用延迟模式不打开编辑层。 |

禁用和只读均保留初次候选读取与显式 refresh，以补全姓名；普通搜索、选择和清空被阻止。禁用同时阻止内置人员操作，只读不自动禁止阅读态业务操作。is-label / read-pretty 不加载函数候选，使用数组、label、fallback-option 或已选缓存回显。手动 loading 只控制编辑字段反馈，阅读操作各自等待 call / chat；普通事件只通知，不接管 Promise。

人员数据为 `{ value: string, label: string, avatar?: string, mobile?: string, disabled?: boolean }`。

signal 可选地传给 fetch 取消过期请求；不是 HTTP 参数，也不会回滚服务器操作。忽略 signal 时，组件仍隔离旧结果。函数结果默认不再本地二次过滤，filter-option 只配置本地匹配策略。

公开类型包含 PeopleSelectReadScope、PeopleSelectSlots、PeopleSelectEmits 及既有数据、任务和实例类型，可从根入口及 people-select 子入口导入。

`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。

`fallback-option` 与候选 options 独立，不返回 Promise、不主动发请求。回显优先使用当前候选项，不存在时读取 fallback；传入 false 关闭未匹配值的回显。

### 业务请求如何接收取消信号

组件为每次操作创建 AbortController，把 signal 传入加载函数。业务需要逐层透传给请求库。fetch 原生支持 AbortSignal；Axios 0.22+ 支持 signal；ofetch、Ky 会向底层 fetch 传递或合并这个信号。未支持的封装需要把 abort 事件适配到自己的取消方法。取消客户端请求不能回滚服务端已完成的操作。

```ts
async function loadPeople(query, { signal }) {
  const response = await fetch(`/api/people?q=${encodeURIComponent(query)}`, { signal })
  if (!response.ok) throw new Error('People request failed')
  return response.json()
}

// Axios: preserve signal through your service wrapper.
async function loadWithAxios(query, { signal }) {
  const { data } = await axios.get('/api/people', { params: { q: query }, signal })
  return data
}

// Other fetch wrappers:
const loadWithOfetch = (query, { signal }) => ofetch('/api/people', { query: { q: query }, signal })
const loadWithKy = (query, { signal }) => ky.get('/api/people', { searchParams: { q: query }, signal }).json()
```

[AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) · [Axios cancellation](https://axios-http.com/docs/cancellation) · [ofetch](https://github.com/unjs/ofetch) · [Ky](https://github.com/sindresorhus/ky#cancellation)

### 共享字段加载

`loading-mode="line"` 使用 FieldDecorator 的共享加载线；默认模式保留本组件已有的加载展示。加载状态本身不隐式设置 disabled 或 readonly。

focus()/blur() 通过当前 Select 引用操作真实输入；允许编辑的延迟模式下，focus() 先打开编辑器。延迟禁用、只读或纯阅读时不打开；direct 只读仍可聚焦。is-label 没有输入，方法不打开编辑器。关闭重开后使用当前目标，卸载后不操作其他输入。

公开实例类型 SelectInstance/SelectExpose 与 PeopleSelectInstance/PeopleSelectExpose 对齐既有方法；PeopleSelectExpose 可从根入口及组件子入口导入。refresh() 返回 `Promise<void>`；选项为函数时按既有协议重读选项，不表示保存或业务动作完成。

编辑入口枚举保留端侧差异：Cedar 为 direct / click / dblclick，Maple 为 direct / popup。

## CSS Variables

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-people-select-avatar-radius` | `50%` | `border-radius` |
| `--mp-people-select-avatar-size` | `24px` | `height`, `width` |
| `--mp-people-select-content-gap` | `8px` | `gap` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-people-select-avatar-size: 24px;
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
