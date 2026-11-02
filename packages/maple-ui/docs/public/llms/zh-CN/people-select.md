<!-- Source: src/people-select/docs/zh-CN.md; locale: zh-CN; page: /zh-CN/people-select -->

# PeopleSelect 人员选择

`options` 接收人员数组或加载函数，组件内部管理等待、取消与过期结果；`resolve` 单独处理只有 ID 时的人员回显。头像由 `avatar` 提供。组件提供可选的电话、聊天图标，拨号、聊天和权限仍由业务实现。

## 全局默认属性与局部覆盖

```ts
import { PeopleSelect, type PeopleSelectProps } from '@maple-design/ui'
PeopleSelect.setPropsDefaults({
  options: (query, { signal }) => peopleService.search(query, signal),
  resolve: (id, { signal }) => peopleService.get(id, signal),
  showPhone: true,
  showChat: true,
  call: person => businessPhone.call(person.mobile),
  chat: person => businessChat.open(person.value),
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

## 完整业务示例

Example source: src/people-select/example/demos/injected-services.vue

```vue
<script setup lang="ts">
import { ref } from 'vue'

const personId = ref<string | null>('alice')
const log = ref('')
const people = [
  {
    value: 'alice',
    label: 'Alice',
    mobile: '13800000000',
    avatar:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24"%3E%3Ccircle cx="12" cy="12" r="12" fill="%236579af"/%3E%3C/svg%3E',
  },
  { value: 'bob', label: 'Bob', mobile: '13900000000' },
]
const options = async (query: string) =>
  people.filter((person) => person.label.toLowerCase().includes(query.toLowerCase()))
const resolve = async (id: string) => people.find((person) => person.value === id)
async function call(person: { value: string; mobile?: string }) {
  log.value = `Call: ${person.mobile || person.value}`
}
async function chat(person: { value: string }) {
  log.value = `Chat: ${person.value}`
}
</script>
<template>
  <mp-space direction="column">
    <mp-people-select v-model="personId" :options="options" :resolve="resolve" clearable :empty-value="null" />
    <mp-people-select
      v-model="personId"
      :resolve="resolve"
      show-phone
      show-chat
      :call="call"
      :chat="chat"
      read-pretty
    />
    <p role="status">{{ log }}</p>
  </mp-space>
</template>
```

## API

| 属性 | 说明 | 默认值 |
|---|---|---|
| v-model / default-value | 字符串 ID，null 表示显式清空 | — / '' |
| options | 人员数组，或 (query, { signal }) => 数组/Promise | — |
| resolve | (id, { signal }) => 人员/undefined/Promise | — |
| show-avatar | 展示 avatar | true |
| show-phone / show-chat | 阅读态电话 / 聊天图标 | false |
| call / chat | (person) => void/Promise，由业务实现 | — |
| render-actions | ({ person, disabled }) => VNodeChild | — |
| is-label / read-pretty | 阅读态，仅解析已选人员，不加载候选 | false |
| disabled / readonly | 省略继承表单状态 | — |
| empty-value | 清空结果；可指定 null 或返回 null 的函数 | '' |

人员数据为 `{ value: string, label: string, avatar?: string, mobile?: string, disabled?: boolean }`。

signal 可选地传给 fetch 取消过期请求；不是 HTTP 参数，也不会回滚服务器操作。忽略 signal 时，组件仍隔离旧结果。函数结果默认不再本地二次过滤，filter-option 只配置本地匹配策略。

事件：update:model-value、change、clear、search、load-error(error, options|resolve)、action-error(error, call|chat)。实例方法：refresh()、focus()、blur()。无独立 request 属性，无需外部 useAsyncData 或专用 provider key。


`empty-value` 可显式设为 `null`（或 `() => null`），清空时原样提交 null；省略时保留组件原默认值。界面把 null 显示为空，不会把普通输入的空字符串自动转成 null。支持弹出编辑的字段中，清空先修改草稿，确认后提交，取消则保留原值。
