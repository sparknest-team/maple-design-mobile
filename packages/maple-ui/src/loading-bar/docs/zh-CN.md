# 加载条

### 介绍

页面顶部显示加载进度。

### 基本使用

```demo
../example/demos/basic.vue
```

## API

### 方法

| 方法名                 | 说明       | 参数 | 返回值     |
|---------------------|----------|--|---------|
| `LoadingBar.start`  | 开始加载  | `-` | `-` |
| `LoadingBar.finish` | 结束加载  | `-` | `-` |
| `LoadingBar.error`  | 加载失败  | `-` | `-` |
| `LoadingBar.setDefaultOptions` | 设置默认的选项配置 | _options: LoadingBarOptions_ | `-` |
| `LoadingBar.resetDefaultOptions` | 重置默认的选项配置 | _-_ | `-` |

### LoadingBar Options

| 参数           | 说明           | 类型        | 默认值    |
|--------------|--------------|-----------|--------|
| `color`      | 加载条颜色        | _string_  | `-`    |
| `errorColor` | 加载失败时的颜色     | _string_  | `-`    |
| `height`     | 加载条的高度       | _string \| number_ | `-` |
| `top`        | 加载条距离页面顶部的距离 | _string \| number_ | `-` |
| `height`     | 加载条的高度       | _string \| number_ | `-` |
| `finishDelay` ***3.3.13*** | 结束加载的延时时间(单位 ms)，可用于增加加载动画的持续时间 | _number_ | `-` |

## 公开 CSS 变量

普通／失败进度条使用可读 content-brand／content-danger，而非 action／status 填充色：细线需要在普通表面保持可辨识。color／errorColor 选项优先于默认变量。自定义背景与颜色需要重新检查对比度，高度保留 3px。

| 变量 | 默认值 |
| --- | --- |
| `--mp-loading-bar-color` | `var(--mp-sys-color-content-brand)` |
| `--mp-loading-bar-error-color` | `var(--mp-sys-color-content-danger)` |
| `--mp-loading-bar-height` | `3px` |

Teleport 后主题变量按实际 DOM 祖先继承；放在内容内部的变量不会向上传到服务创建的容器。
