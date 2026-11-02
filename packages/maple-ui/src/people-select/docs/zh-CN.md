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

| 属性                    | 说明                                             | 默认值 |
| ----------------------- | ------------------------------------------------ | ------ |
| v-model / default-value | 字符串 ID，null 表示显式清空                     | — / '' |
| options                 | 人员数组，或 (query, { signal }) => 数组/Promise | —      |
| fallback-option         | boolean / (id) => PeopleSelectOption             | true   |
| show-avatar             | 展示 avatar                                      | true   |
| show-phone / show-chat  | 阅读态电话 / 聊天图标                            | false  |
| call / chat             | (person) => void/Promise，由业务实现             | —      |
| render-actions          | ({ person, disabled }) => VNodeChild             | —      |
| is-label / read-pretty  | 阅读态，仅解析已选人员，不加载候选               | false  |
| disabled / readonly     | 省略继承表单状态                                 | —      |
| empty-value             | 清空结果；可指定 null 或返回 null 的函数         | ''     |

人员数据为 `{ value: string, label: string, avatar?: string, mobile?: string, disabled?: boolean }`。

signal 可选地传给 fetch 取消过期请求；不是 HTTP 参数，也不会回滚服务器操作。忽略 signal 时，组件仍隔离旧结果。函数结果默认不再本地二次过滤，filter-option 只配置本地匹配策略。

事件：update:model-value、change、clear、search、load-error(error, options)、action-error(error, call|chat)。实例方法：refresh()、focus()、blur()。无独立 request 属性，无需外部 useAsyncData 或专用 provider key。

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
