# 加载与等待

以活动报名为场景，集中观察各组件的加载位置、尺寸和布局变化。所有等待均使用本地计时，不请求业务接口；选择文件也不会发起上传。

1. 填写报名信息，或点击卡片上的「体验等待」，观察 2 秒后的恢复。
2. 开启「全部保持加载」比较各组件；「重置加载」停止等待，保留填写内容。
3. 单独切换「等待时禁止编辑」，对照 loading 与 disabled；再切换文本字段的默认指示器与底线。
4. 打开报名确认，观察 before-close 等待；关闭检查不通过时，弹层会保留。

```demo
./practices-examples/loading-lab.vue
```

这里只展示有明确加载语义的输入、数据选择、操作与内容区域。普通事件不会自动收集 Promise。Upload 的文件进度与 before 等待在其专属案例中演示；Scheduler 的保存守卫放在 Scheduler 文档内说明。

## 更多 before 等待场景

### Upload

```demo
../src/upload/example/regressions/before-read.vue
```

