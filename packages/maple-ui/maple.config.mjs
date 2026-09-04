import { defineConfig } from '@maplejs/maple-cli'

export default defineConfig({
  useMobile: true,
  analysis: {
    baidu: 'https://hm.baidu.com/hm.js?5c628ce58967c90ff4dd9c8803d930fa',
  },
  pc: {
    header: {
      playground: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://maplejs.org/playground',
    },
    menu: [
      {
        text: {
          'zh-CN': '开发指南',
          'en-US': 'Developer Guide',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '基本介绍',
          'en-US': 'Basic Introduce',
        },
        doc: 'home',
        type: 3,
      },
      {
        text: {
          'zh-CN': '快速开始',
          'en-US': 'Quick Start',
        },
        doc: 'quickstart',
        type: 3,
      },
      {
        text: {
          'zh-CN': '按需引入',
          'en-US': 'Import On Demand',
        },
        doc: 'importOnDemand',
        type: 3,
      },
      {
        text: {
          'zh-CN': '浏览器适配',
          'en-US': 'Browser Adaptation',
        },
        doc: 'browserAdaptation',
        type: 3,
      },
      {
        text: {
          'zh-CN': '国际化',
          'en-US': 'Locale',
        },
        doc: 'locale',
        type: 3,
      },
      {
        text: {
          'zh-CN': '服务端渲染',
          'en-US': 'Server-Side Rendering',
        },
        doc: 'serverSideRendering',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'Zod 验证',
          'en-US': 'Zod Validation',
        },
        doc: 'zodValidation',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'VSCode 插件',
          'en-US': 'VSCode Extension',
        },
        doc: 'extension',
        type: 3,
      },
      {
        text: {
          'zh-CN': '默认值定制',
          'en-US': 'Defaults Customization',
        },
        doc: 'defaultsCustomization',
        type: 3,
      },
      {
        text: {
          'zh-CN': '设计资源',
          'en-US': 'Design Resources',
        },
        doc: 'designResources',
        type: 3,
      },
      {
        text: {
          'zh-CN': '组件库快速成型工具',
          'en-US': 'Components Library Tools',
        },
        doc: 'cli',
        type: 3,
      },
      {
        text: {
          'zh-CN': '从 2.x 迁移',
          'en-US': 'Migrate from 2.x',
        },
        doc: 'migrationGuide',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'Roadmap',
          'en-US': 'Roadmap',
        },
        doc: 'roadmap',
        type: 3,
      },
      {
        text: {
          'zh-CN': '样式',
          'en-US': 'Styles',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '主题定制',
          'en-US': 'Theme Customization',
        },
        doc: 'themes',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'StyleProvider',
          'en-US': 'StyleProvider',
        },
        doc: 'style-provider',
        type: 2,
      },
      {
        text: {
          'zh-CN': '色板 Palette',
          'en-US': 'Palette',
        },
        doc: 'palette',
        type: 2,
      },
      {
        text: {
          'zh-CN': '颜色 Color',
          'en-US': 'Color',
        },
        doc: 'color',
        type: 2,
      },
      {
        text: {
          'zh-CN': '总览 Utilities',
          'en-US': 'Utilities Overview',
        },
        doc: 'utilities',
        type: 2,
      },
      {
        text: {
          'zh-CN': '海拔 Elevation',
          'en-US': 'Elevation',
        },
        doc: 'style',
        type: 2,
      },
      {
        text: {
          'zh-CN': '字体排版 Typography',
          'en-US': 'Typography',
        },
        doc: 'typography',
        type: 2,
      },
      {
        text: {
          'zh-CN': '原子化 CSS',
          'en-US': 'Atomic CSS',
        },
        doc: 'atomic-css',
        type: 2,
      },
      {
        text: {
          'zh-CN': '常用写法',
          'en-US': 'Common Utilities',
        },
        doc: 'atomic-usage',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Utility 规范',
          'en-US': 'Utility Spec',
        },
        doc: 'utilitySpec',
        type: 3,
      },
      {
        text: {
          'zh-CN': '通用组件',
          'en-US': 'General',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Button 按钮',
          'en-US': 'Button',
        },
        doc: 'button',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Fab 悬浮动作按钮',
          'en-US': 'Fab',
        },
        doc: 'fab',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Link 链接',
          'en-US': 'Link',
        },
        doc: 'link',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Icon 图标',
          'en-US': 'Icon',
        },
        doc: 'icon',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Cell 单元格',
          'en-US': 'Cell',
        },
        doc: 'cell',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'SwipeCell 滑动单元格',
          'en-US': 'SwipeCell',
        },
        doc: 'swipe-cell',
        type: 2,
      },
      {
        text: {
          'zh-CN': '布局',
          'en-US': 'Layout',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Space 间距',
          'en-US': 'Space',
        },
        doc: 'space',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Grid 栅格',
          'en-US': 'Grid',
        },
        doc: 'grid',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Sticky 粘性布局',
          'en-US': 'Sticky',
        },
        doc: 'sticky',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Divider 分割线',
          'en-US': 'Divider',
        },
        doc: 'divider',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Paper 纸张',
          'en-US': 'Paper',
        },
        doc: 'paper',
        type: 2,
      },
      {
        text: {
          'zh-CN': '导航',
          'en-US': 'Navigation',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Breadcrumb 面包屑',
          'en-US': 'Breadcrumb',
        },
        doc: 'breadcrumb',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Menu 菜单选择器',
          'en-US': 'Menu',
        },
        doc: 'menu',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'SplitButton 分裂按钮',
          'en-US': 'SplitButton',
        },
        doc: 'split-button',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Pagination 分页',
          'en-US': 'Pagination',
        },
        doc: 'pagination',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Steps 步骤条',
          'en-US': 'Steps',
        },
        doc: 'steps',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'PageHeader 导航栏',
          'en-US': 'PageHeader',
        },
        doc: 'page-header',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'BottomNavigation 底部导航栏',
          'en-US': 'BottomNavigation',
        },
        doc: 'bottom-navigation',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'IndexBar 索引栏',
          'en-US': 'IndexBar',
        },
        doc: 'index-bar',
        type: 2,
      },
      {
        text: {
          'zh-CN': '数据输入',
          'en-US': 'Data Entry',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Form 表单',
          'en-US': 'Form',
        },
        doc: 'form',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Input 输入框',
          'en-US': 'Input',
        },
        doc: 'input',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Textarea 文本域',
          'en-US': 'Textarea',
        },
        doc: 'textarea',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Search 搜索',
          'en-US': 'Search',
        },
        doc: 'search',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'AutoComplete 自动补全',
          'en-US': 'AutoComplete',
        },
        doc: 'auto-complete',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Select 选择框',
          'en-US': 'Select',
        },
        doc: 'select',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Cascader 级联选择器',
          'en-US': 'Cascader',
        },
        doc: 'cascader',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Picker 多列选择器',
          'en-US': 'Picker',
        },
        doc: 'picker',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Date 日期字段',
          'en-US': 'Date',
        },
        doc: 'date',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'DateRange 日期范围字段',
          'en-US': 'DateRange',
        },
        doc: 'date-range',
        type: 2,
      },

      {
        text: {
          'zh-CN': 'Time 时间字段',
          'en-US': 'Time',
        },
        doc: 'time',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'TimeRange 时间范围字段',
          'en-US': 'TimeRange',
        },
        doc: 'time-range',
        type: 2,
      },

      {
        text: {
          'zh-CN': 'Radio 单选框',
          'en-US': 'Radio',
        },
        doc: 'radio',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Checkbox 复选框',
          'en-US': 'Checkbox',
        },
        doc: 'checkbox',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'InputNumber 数字输入框',
          'en-US': 'InputNumber',
        },
        doc: 'input-number',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'NumberKeyboard 数字键盘',
          'en-US': 'NumberKeyboard',
        },
        doc: 'number-keyboard',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'VerificationCode 验证码输入',
          'en-US': 'VerificationCode',
        },
        doc: 'verification-code',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Switch 开关',
          'en-US': 'Switch',
        },
        doc: 'switch',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Slider 滑块',
          'en-US': 'Slider',
        },
        doc: 'slider',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Rate 评分',
          'en-US': 'Rate',
        },
        doc: 'rate',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Uploader 文件上传',
          'en-US': 'Uploader',
        },
        doc: 'uploader',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Signature 签名',
          'en-US': 'Signature',
        },
        doc: 'signature',
        type: 2,
      },
      {
        text: {
          'zh-CN': '数据展示',
          'en-US': 'Data Display',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Avatar 头像',
          'en-US': 'Avatar',
        },
        doc: 'avatar',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Badge 徽标',
          'en-US': 'Badge',
        },
        doc: 'badge',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Tag 标签',
          'en-US': 'Tag',
        },
        doc: 'tag',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Ellipsis 文本省略',
          'en-US': 'Ellipsis',
        },
        doc: 'ellipsis',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Empty 空状态',
          'en-US': 'Empty',
        },
        doc: 'empty',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Image 图片',
          'en-US': 'Image',
        },
        doc: 'image',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Tabs 选项卡',
          'en-US': 'Tabs',
        },
        doc: 'tabs',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Collapse 折叠面板',
          'en-US': 'Collapse',
        },
        doc: 'collapse',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'List 列表',
          'en-US': 'List',
        },
        doc: 'list',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'InfiniteScroll 无限滚动',
          'en-US': 'InfiniteScroll',
        },
        doc: 'infinite-scroll',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Carousel 轮播',
          'en-US': 'Carousel',
        },
        doc: 'carousel',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Card 卡片',
          'en-US': 'Card',
        },
        doc: 'card',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Table 表格',
          'en-US': 'Table',
        },
        doc: 'table',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Code 代码块',
          'en-US': 'Code',
        },
        doc: 'code',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Statistic 统计数值',
          'en-US': 'Statistic',
        },
        doc: 'statistic',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'CountTo 数字动画',
          'en-US': 'CountTo',
        },
        doc: 'count-to',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Countdown 倒计时',
          'en-US': 'Countdown',
        },
        doc: 'countdown',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Tooltip 文字提示',
          'en-US': 'Tooltip',
        },
        doc: 'tooltip',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Popover 气泡卡片',
          'en-US': 'Popover',
        },
        doc: 'popover',
        type: 2,
      },
      {
        text: {
          'zh-CN': '反馈',
          'en-US': 'Feedback',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Alert 警告信息',
          'en-US': 'Alert',
        },
        doc: 'alert',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'NoticeBar 通知栏',
          'en-US': 'NoticeBar',
        },
        doc: 'notice-bar',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Message 全局提示',
          'en-US': 'Message',
        },
        doc: 'message',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Dialog 对话框',
          'en-US': 'Dialog',
        },
        doc: 'dialog',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'ActionSheet 动作面板',
          'en-US': 'ActionSheet',
        },
        doc: 'action-sheet',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'FloatingPanel 浮动面板',
          'en-US': 'FloatingPanel',
        },
        doc: 'floating-panel',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Popup 弹出层',
          'en-US': 'Popup',
        },
        doc: 'popup',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Overlay 遮罩层',
          'en-US': 'Overlay',
        },
        doc: 'overlay',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'PullRefresh 下拉刷新',
          'en-US': 'PullRefresh',
        },
        doc: 'pull-refresh',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Loading 加载',
          'en-US': 'Loading',
        },
        doc: 'loading',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'LoadingBar 加载条',
          'en-US': 'LoadingBar',
        },
        doc: 'loading-bar',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Skeleton 骨架屏',
          'en-US': 'Skeleton',
        },
        doc: 'skeleton',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Progress 进度条',
          'en-US': 'Progress',
        },
        doc: 'progress',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'ProgressGroup 分段进度条',
          'en-US': 'ProgressGroup',
        },
        doc: 'progress-group',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Result 结果',
          'en-US': 'Result',
        },
        doc: 'result',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Drag 拖拽',
          'en-US': 'Drag',
        },
        doc: 'drag',
        type: 2,
      },
      {
        text: {
          'zh-CN': '指令与其它',
          'en-US': 'Directives & Others',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'BackTop 回到顶部',
          'en-US': 'BackTop',
        },
        doc: 'back-top',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Watermark 水印',
          'en-US': 'Watermark',
        },
        doc: 'watermark',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Ripple 水波指令',
          'en-US': 'Ripple',
        },
        doc: 'ripple',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Lazy 懒加载',
          'en-US': 'Lazy',
        },
        doc: 'lazy',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Hover 悬停指令',
          'en-US': 'Hover',
        },
        doc: 'hover',
        type: 2,
      },
    ],
  },
  copy: [],
  directives: ['ripple', 'lazy', 'hover'],
})
