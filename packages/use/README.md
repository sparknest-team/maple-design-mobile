# 共用异步数据源

`useAsyncData` 适用于人员、字典、表格行、级联根选项等初始化与外部搜索。函数返回业务转换后的数据；composable 不规定 URL、客户端、查询字段或响应 DTO。组件的 options/data 仍是对应类型的数组。

```ts
import { useAsyncData } from '@maple-design/use-vue'

// 可从业务模块导入，同一个函数可供多处复用。
const loadPeople = async () => [{ value: 'mengshuai', label: '孟帅' }]
const { data: options, loading, error, execute, refresh, cancel, clearCache } =
  useAsyncData(loadPeople, { initialData: [], debounce: 250, cacheTime: 30_000 })

// 默认客户端挂载执行 loadPeople 一次，初始化不防抖。不会监听函数引用、选中值或数组变化。
// 数据绑定：<Select :options="options" :loading="loading" @search="search" />
function search(query: string) {
  options.value = [] // 外部搜索可立即退役旧候选，避免等待期间误选。
  void execute({
    cacheKey: query, // 若身份/权限/部门变化会影响结果，也必须包含在 key 中。
    loader: async ({ signal }) => {
      const response = await fetch(`/api/people?q=${encodeURIComponent(query)}`, { signal })
      if (!response.ok) throw new Error('People request failed')
      const rows = await response.json()
      return rows.map((row: { id: string; name: string }) => ({ value: row.id, label: row.name }))
    },
  })
}
```

## 参数和返回值

- `AsyncDataLoader<T> = (context: { signal: AbortSignal }) => T | Promise<T>`。零参数函数也可直接传入；原生 fetch 应包装后再传。业务参数由闭包捕获，数据格式转换在函数内部完成。
- options：必填 `initialData: T`，`immediate` 默认 true，`debounce` 默认 0 毫秒，`cacheTime` 默认 0（关闭）。零参数 loader 推断 T，提供 initialData 时应保持相同类型，空数组可显式标注 `[] as PersonOption[]`。
- `data` 是可写 shallowRef，保留结果对象身份；`loading`、`error` 只读。composable 不自动深拷贝、冻结或深监听数据。
- `execute({ loader?, cacheKey?, force? })`：手动执行，接受查询专属 loader，不替换初始化函数。无覆盖 loader 时执行初始 loader。返回 Promise，不自动向外抛异常。
- 结果为 `{ status: 'success', data }`、`{ status: 'error', error }` 或 `{ status: 'cancelled' }`。调用者可检查 status；自动初始化失败不会产生未处理拒绝。
- `refresh()`：重试最近一次请求及 key，绕过缓存和防抖。第一次调用时使用初始化 loader。
- `cancel()`：清除排队计时器、中止 signal、立即结算取消结果，保留 data，不记录错误。
- `clearCache()`：清空当前实例缓存，不清空展示数据，也不自动发请求。

## 生命周期、并发与缓存

在组件 setup 调用时，客户端 mounted 执行一次；SSR 不自动请求。在 effectScope 中使用但不属于组件时立即初始化。`immediate: false` 只手动执行。setup 中已手动 execute 的，不会在 mounted 重复初始化。重渲染、选中值变化不会重新执行；卸载/作用域结束后取消并禁止再次执行。重新挂载是新实例，会重新初始化。

每次 execute 立即令 loading=true（含防抖排队），取消上次请求；只有最后一次结果能更新 data/error/loading，即使旧客户端忽略 signal 也不能覆盖。初始加载和 refresh 不防抖；组件自身搜索延迟应设为 0，防止两次防抖。异常保留上次 data；远程候选是否清空由业务决定，上例主动清空。取消不会把 AbortError 当业务失败。

默认不缓存。启用后仅当前实例缓存，TTL 从成功完成时算起，最多保存 50 项，满后按写入顺序淘汰最早一项；不跨组件、不跨登录用户全局复用，不合并并发请求。初始化 loader 有独立的内部 key；覆盖 loader 只有显式传 cacheKey 才缓存。不通过函数身份推断缓存，不缓存异常或取消。相同函数用于两处意味着两次独立初始化；若业务要求只请求一次，应在父级创建 composable 并把同一 data/loading 传给两处。若 loader 本身返回共享可变对象，其引用仍由业务负责。

## 特殊协议

本工具不替代节点懒加载、游标分页或上传。Cedar Tree/TreeSelect：`loadMore(node): Promise<void>`；Cedar/Maple Cascader：`loadMore(option, done(children?)): void`；Cedar Table：`loadMore(record, done(children?)): void`。按现有节点插入/完成协议工作，不能把整表初始化 loader 直接当这些回调。

Scheduler 保留日程的 modelValue/defaultValue 数组、resources 数组，以及 `requestResources({ dimensionId?, query, cursor?, signal }) -> { items, nextCursor? }` 和 `resolveResources(ids, {signal}) -> Resource[]`；事件与资源不是一个 data。上传保留进度、中止和完成回调。本轮不更改这些已发布协议。

## 已发布 API

这个工具是 use 包新增的 minor API。各组件原有数组属性保持不变；没有为所有 options/data 加函数或 Promise 联合类型。PeopleSelect 按已确认方案移除旧 fetch/urlType，属于 UI 包下个 major 的迁移，文档提供对照；当前没有执行发布。
