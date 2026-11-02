# 异步数据选择

观察人员 ID 的名称回显、候选搜索及阅读态业务操作。示例使用本地数据。

```demo
../src/people-select/example/demos/injected-services.vue
```


## 复用业务数据服务

重新加载候选，观察加载状态和选中值；展开源码查看 useAsyncData 如何把数据请求与字段绑定分开。此例为本地固定数据，不模拟请求失败。

```demo
../src/select/example/demos/async-source.vue
```

演示后返回[专栏总览](/zh-CN/showcase)继续下一站。

## 连续修改时的异步校验

输入错误用户名并触发校验，再改为 admin 再次校验。手动先返回最新结果、再返回最早结果，检查过期校验是否影响当前字段。此例的等待队列完全在本地，方便演示返回顺序。

```demo
../src/form/example/demos/async-race.vue
```
