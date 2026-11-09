# 加载条

### 介绍

页面顶部显示加载进度。

## 基础示例

### 基本使用

```demo
../example/demos/basic.vue
```

## 阅读方向

加载条从文档阅读起点增长，计时、进度和完成状态不因方向切换改变。函数式调用使用文档方向。

## 使用说明

### 配置说明

重复 finish 去重，start/error 取消旧任务。完成后服务卸载，下次调用重新挂载。setDefaultOptions 替换整份配置，resetDefaultOptions 清除所有已设置选项；不在 SSR 建立 DOM／计时器。

Teleport 后主题变量按实际 DOM 祖先继承；放在内容内部的变量不会向上传到服务创建的容器。

按需直接导入时，请同时导入 `@maple-design/ui/loading-bar/style`；也可使用全量样式 `@maple-design/ui/style`。

## API

### LoadingBar Methods

| 方法名                 | 说明       | 参数 | 返回值     |
|---------------------|----------|--|---------|
| `LoadingBar.start`  | 开始加载  | `-` | `-` |
| `LoadingBar.finish` | 结束加载  | `-` | `-` |
| `LoadingBar.error`  | 加载失败  | `-` | `-` |
| `LoadingBar.setDefaultOptions` | 设置默认的选项配置 | _options: LoadingBarOptions_ | `-` |
| `LoadingBar.resetDefaultOptions` | 重置默认的选项配置 | _-_ | `-` |

### LoadingBar Options

服务配置请使用 `LoadingBarOptions` 类型；`LoadingBarProps` 描述内部视图属性，不包含 `finishDelay`。

| 参数           | 说明           | 类型        | 默认值    |
|--------------|--------------|-----------|--------|
| `color`      | 加载条颜色        | _string_  | `-`    |
| `errorColor` | 加载失败时的颜色     | _string_  | `-`    |
| `height`     | 加载条的高度       | _string \| number_ | `-` |
| `top`        | 加载条距离页面顶部的距离 | _string \| number_ | `-` |
| `finishDelay` ***3.3.13*** | 结束加载的延时时间(单位 ms)，可用于增加加载动画的持续时间 | _number_ | `-` |

## CSS Variables

普通／失败进度条使用可读 content-brand／content-danger，而非 action／status 填充色：细线需要在普通表面保持可辨识。color／errorColor 选项优先于默认变量。自定义背景与颜色需要重新检查对比度，高度保留 3px。

动效变量控制 width／opacity／background-color，reduce 下关闭过渡。完成隐藏等待 max(300ms, 计算后的 width 时长+delay)，隐藏后等待 max(250ms, opacity 时长+delay) 再卸载；较长覆写不会被固定 250ms 截断，显式零仍保留清理下限。200ms 显示／进度 tick 是调度策略，不是 CSS Token。时序在对应阶段刷新 DOM 后采样，不保证等待途中任意 CSS 改动或自定义 animation。

<!-- component-css-variables:start -->

通过以下变量定制组件外观。默认值随表中注明的主题或选择器条件变化；变量仅在对应的尺寸、变体和交互状态下生效。

<div class="token-reference-table" style="max-width: 100%; overflow-x: auto;">

| 变量 | 默认值／条件 | 影响的样式 |
| --- | --- | --- |
| `--mp-loading-bar-color` | `var(--mp-sys-color-content-brand)` | `background-color` |
| `--mp-loading-bar-error-color` | `var(--mp-sys-color-content-danger)` | `background-color` |
| `--mp-loading-bar-height` | `3px` | `height` |
| `--mp-loading-bar-transition-duration` | `250ms` | `transition` |
| `--mp-loading-bar-transition-timing-function` | `ease` | `transition` |

</div>

将覆盖设置在组件实际根节点或弹层真实挂载祖先上。例如给该元素添加下列 class，再按需替换变量值：

```css
.component-theme {
  --mp-loading-bar-color: var(--mp-sys-color-content-brand);
}
```

显式行内样式及直接写入同一 CSS 属性的 Props 优先于样式表默认值。Teleport 后，普通 CSS 变量按实际挂载位置继承；使用 ThemeProvider 时，请遵循其局部主题与弹层配置规则。局部定制请直接覆盖组件变量；仅修改后代的 system 变量不会重新计算从根继承的组件别名。内部变量不属于公共 API。

<!-- component-css-variables:end -->
