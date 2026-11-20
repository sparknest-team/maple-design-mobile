import { readFileSync } from 'node:fs'
import { defineConfig } from '@maple-design/cli-vue'

const componentReuse = JSON.parse(readFileSync(new URL('./component-reuse.json', import.meta.url), 'utf8'))
const markReuse = (item) => {
  const reuse = componentReuse[item.doc]
  if (!reuse || item.type !== 2) {
    return item
  }
  return {
    ...item,
    text: {
      ...item.text,
      'zh-CN': `${item.text['zh-CN']} [${reuse.label}]`,
      'en-US': `${item.text['en-US']} [${reuse.en}]`,
    },
  }
}

export default defineConfig({
  defaultLightTheme: 'lightTheme',
  defaultDarkTheme: 'darkTheme',
  useMobile: true,
  analysis: {
    baidu: 'https://hm.baidu.com/hm.js?5c628ce58967c90ff4dd9c8803d930fa',
  },
  pc: {
    header: {
      // Updates live under Getting started; the legacy playground is not published.
      versions: [],
      changelog: '',
      playground: '',
      themes: [
        { 'zh-CN': '默认亮色', 'en-US': 'Default Light', value: 'lightTheme' },
        { 'zh-CN': '默认暗色', 'en-US': 'Default Dark', value: 'darkTheme' },
        { 'zh-CN': '枫叶亮色', 'en-US': 'Maple Light', value: 'mapleLightTheme' },
        { 'zh-CN': '枫叶暗色', 'en-US': 'Maple Dark', value: 'mapleDarkTheme' },
        { 'zh-CN': 'Alps 乐道', 'en-US': 'Alps Light', value: 'alpsLightTheme' },
        { 'zh-CN': 'Firefly 萤火虫', 'en-US': 'Firefly Light', value: 'fireflyLightTheme' },
        { 'zh-CN': 'Alps 乐道暗色', 'en-US': 'Alps Dark', value: 'alpsDarkTheme' },
        { 'zh-CN': 'Firefly 萤火虫暗色', 'en-US': 'Firefly Dark', value: 'fireflyDarkTheme' },
      ],
    },
    sections: [
      {
        id: 'start',
        text: { 'zh-CN': '开始使用', 'en-US': 'Getting started' },
        entry: 'quickstart',
        docs: [
          'updates',
          'home',
          'quickstart',
          'platform',
          'importOnDemand',
          'componentReuse',
          'defaultsCustomization',
          'controlledUncontrolled',
          'emptyValues',
          'locale',
          'zodValidation',
          'browserAdaptation',
          'serverSideRendering',
          'themes',
          'designTokens',
          'designTokenReference',
          'palette',
          'color',
          'utilities',
          'style',
          'typography',
          'atomic-css',
          'atomic-usage',
          'utilitySpec',
        ],
      },

      { id: 'components', text: { 'zh-CN': '组件', 'en-US': 'Components' }, entry: 'button' },
      {
        id: 'showcase',
        text: { 'zh-CN': '特色与场景', 'en-US': 'Features and scenarios' },
        entry: 'showcase',
        docs: [
          'showcase',
          'showcaseStrengths',
          'showcasePractices',
          'practiceDashboard',
          'practiceList',
          'practiceCard',
          'practiceDetail',
          'practiceForm',
          'practiceResult',
          'showcaseComponents',
          'showcaseCrossPlatform',
          'showcaseForms',
          'showcaseThemes',
          'showcaseAsync',
          'showcaseLoading',
          'showcaseData',
          'showcaseTouch',
        ],
      },
      {
        id: 'ai',
        text: { 'zh-CN': 'AI 与工具', 'en-US': 'AI and tools' },
        entry: 'ai',
        docs: ['ai', 'mcp', 'solutions', 'skills', 'tools', 'llms', 'extension', 'cli', 'designResources'],
      },
    ],
    menu: [
      {
        text: {
          'zh-CN': '开始使用',
          'en-US': 'Getting started',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '安装与快速开始',
          'en-US': 'Quick Start',
        },
        doc: 'quickstart',
        type: 3,
      },
      {
        text: {
          'zh-CN': '平台选择与兼容性',
          'en-US': 'Platforms and compatibility',
        },
        doc: 'platform',
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
          'zh-CN': '跨端复用标记说明',
          'en-US': 'Cross-platform reuse guide',
        },
        doc: 'componentReuse',
        type: 3,
      },
      {
        text: {
          'zh-CN': '基本介绍',
          'en-US': 'Introduction',
        },
        doc: 'home',
        type: 3,
      },
      {
        text: {
          'zh-CN': '配置与约定',
          'en-US': 'Configuration and conventions',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '默认值与全局配置',
          'en-US': 'Defaults and global configuration',
        },
        doc: 'defaultsCustomization',
        type: 3,
      },
      {
        text: {
          'zh-CN': '受控与非受控',
          'en-US': 'Controlled and uncontrolled',
        },
        doc: 'controlledUncontrolled',
        type: 3,
      },
      {
        text: {
          'zh-CN': '空值与阅读空文案',
          'en-US': 'Empty values and reading placeholders',
        },
        doc: 'emptyValues',
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
          'zh-CN': 'Zod 验证',
          'en-US': 'Zod Validation',
        },
        doc: 'zodValidation',
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
          'zh-CN': 'Design Token 与 CSS 变量分层',
          'en-US': 'Design Tokens and CSS Variables',
        },
        doc: 'designTokens',
        type: 3,
      },
      {
        text: {
          'zh-CN': '组件 CSS 变量参考',
          'en-US': 'Component CSS Variable Reference',
        },
        doc: 'designTokenReference',
        type: 3,
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
          'zh-CN': '平台适配',
          'en-US': 'Platform integration',
        },
        type: 1,
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
          'zh-CN': '服务端渲染',
          'en-US': 'Server-Side Rendering',
        },
        doc: 'serverSideRendering',
        type: 3,
      },
      {
        text: {
          'zh-CN': '更新与迁移',
          'en-US': 'Updates and migration',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '更新与迁移',
          'en-US': 'Updates and migration',
        },
        doc: 'updates',
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
          'zh-CN': 'Icon 图标',
          'en-US': 'Icon',
        },
        doc: 'icon',
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
          'zh-CN': '布局',
          'en-US': 'Layout',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Row 行',
          'en-US': 'Row',
        },
        doc: 'row',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Col 列',
          'en-US': 'Col',
        },
        doc: 'col',
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
          'zh-CN': 'Space 间距',
          'en-US': 'Space',
        },
        doc: 'space',
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
        text: { 'zh-CN': 'Section 内容分区', 'en-US': 'Section' },
        doc: 'section',
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
          'zh-CN': 'Menu 菜单',
          'en-US': 'Menu',
        },
        doc: 'menu',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'NavMenu 导航菜单',
          'en-US': 'NavMenu',
        },
        doc: 'nav-menu',
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
          'zh-CN': 'PageHeader 导航栏',
          'en-US': 'PageHeader',
        },
        doc: 'page-header',
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
          'zh-CN': '数据输入',
          'en-US': 'Data entry',
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
          'zh-CN': 'InputNumber 数字输入框',
          'en-US': 'InputNumber',
        },
        doc: 'input-number',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'InputTag 标签输入',
          'en-US': 'InputTag',
        },
        doc: 'input-tag',
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
          'zh-CN': 'AutoComplete 自动补全',
          'en-US': 'AutoComplete',
        },
        doc: 'auto-complete',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'Mention 提及',
          'en-US': 'Mention',
        },
        doc: 'mention',
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
          'zh-CN': 'Select 选择框',
          'en-US': 'Select',
        },
        doc: 'select',
        type: 2,
      },
      {
        text: {
          'zh-CN': 'PeopleSelect 人员选择',
          'en-US': 'PeopleSelect',
        },
        doc: 'people-select',
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
          'zh-CN': 'Checkbox 复选框',
          'en-US': 'Checkbox',
        },
        doc: 'checkbox',
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
          'zh-CN': 'Upload 文件上传',
          'en-US': 'Upload',
        },
        doc: 'upload',
        type: 2,
      },
      {
        text: {
          'zh-CN': '数据展示',
          'en-US': 'Data display',
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
          'zh-CN': 'Paper 纸张',
          'en-US': 'Paper',
        },
        doc: 'paper',
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
          'zh-CN': 'Timeline 时间轴',
          'en-US': 'Timeline',
        },
        doc: 'timeline',
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
          'zh-CN': 'Popover 气泡卡片',
          'en-US': 'Popover',
        },
        doc: 'popover',
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
          'zh-CN': 'Trigger 浮层定位',
          'en-US': 'Trigger',
        },
        doc: 'trigger',
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
          'zh-CN': 'Message 全局提示',
          'en-US': 'Message',
        },
        doc: 'message',
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
          'zh-CN': 'Dialog 对话框',
          'en-US': 'Dialog',
        },
        doc: 'dialog',
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
          'zh-CN': '其他',
          'en-US': 'Other',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Affix 固钉',
          'en-US': 'Affix',
        },
        doc: 'affix',
        type: 2,
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
          'zh-CN': 'Hover 悬停指令',
          'en-US': 'Hover',
        },
        doc: 'hover',
        type: 2,
      },
      {
        text: {
          'zh-CN': '特色与场景',
          'en-US': 'Features and scenarios',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '全部能力与场景',
          'en-US': 'Features and scenarios',
        },
        doc: 'showcase',
        type: 3,
      },
      {
        text: {
          'zh-CN': '体系特色',
          'en-US': 'Core features',
        },
        doc: 'showcaseStrengths',
        type: 3,
      },
      {
        text: {
          'zh-CN': '桌面与移动',
          'en-US': 'Desktop and mobile',
        },
        doc: 'showcaseCrossPlatform',
        type: 3,
      },
      {
        text: {
          'zh-CN': '一致的表单体验',
          'en-US': 'Consistent forms',
        },
        doc: 'showcaseForms',
        type: 3,
      },
      {
        text: {
          'zh-CN': '主题与品牌',
          'en-US': 'Themes and branding',
        },
        doc: 'showcaseThemes',
        type: 3,
      },
      {
        text: {
          'zh-CN': '异步数据选择',
          'en-US': 'Async selection',
        },
        doc: 'showcaseAsync',
        type: 3,
      },
      {
        text: {
          'zh-CN': '加载与等待',
          'en-US': 'Loading and waiting',
        },
        doc: 'showcaseLoading',
        type: 3,
      },
      {
        text: {
          'zh-CN': '数据与文件',
          'en-US': 'Data and files',
        },
        doc: 'showcaseData',
        type: 3,
      },
      {
        text: {
          'zh-CN': '移动触控体验',
          'en-US': 'Mobile touch interactions',
        },
        doc: 'showcaseTouch',
        type: 3,
      },
      {
        text: {
          'zh-CN': '逐组件对照',
          'en-US': 'Component comparisons',
        },
        doc: 'showcaseComponents',
        type: 3,
      },
      {
        text: {
          'zh-CN': '业务场景',
          'en-US': 'Business scenarios',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '业务场景',
          'en-US': 'Best practices',
        },
        doc: 'showcasePractices',
        type: 3,
      },
      {
        text: {
          'zh-CN': '团队工作台',
          'en-US': 'Team workspace',
        },
        doc: 'practiceDashboard',
        type: 3,
      },
      {
        text: {
          'zh-CN': '查询列表页',
          'en-US': 'Query list',
        },
        doc: 'practiceList',
        type: 3,
      },
      {
        text: {
          'zh-CN': '项目卡片页',
          'en-US': 'Project cards',
        },
        doc: 'practiceCard',
        type: 3,
      },
      {
        text: {
          'zh-CN': '业务详情页',
          'en-US': 'Business detail',
        },
        doc: 'practiceDetail',
        type: 3,
      },
      {
        text: {
          'zh-CN': '分步表单页',
          'en-US': 'Step form',
        },
        doc: 'practiceForm',
        type: 3,
      },
      {
        text: {
          'zh-CN': '结果与异常页',
          'en-US': 'Results and recovery',
        },
        doc: 'practiceResult',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'AI 与工具',
          'en-US': 'AI and tools',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'AI 快速开始',
          'en-US': 'AI quick start',
        },
        doc: 'ai',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'MCP 接入与故障排查',
          'en-US': 'MCP setup and troubleshooting',
        },
        doc: 'mcp',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'CLI 与方案获取',
          'en-US': 'CLI and solution access',
        },
        doc: 'solutions',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'Skill 与团队规则',
          'en-US': 'Skills and team rules',
        },
        doc: 'skills',
        type: 3,
      },
      {
        text: {
          'zh-CN': '工具和内容参考',
          'en-US': 'Tools and content reference',
        },
        doc: 'tools',
        type: 3,
      },
      {
        text: {
          'zh-CN': 'LLM 文档',
          'en-US': 'LLM documentation',
        },
        doc: 'llms',
        type: 3,
      },
      {
        text: {
          'zh-CN': '平台工具',
          'en-US': 'Platform tools',
        },
        type: 1,
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
          'zh-CN': '组件库快速成型工具',
          'en-US': 'Components Library Tools',
        },
        doc: 'cli',
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
          'zh-CN': '通用组件',
          'en-US': 'General',
        },
        type: 1,
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
          'zh-CN': 'SafeArea 安全区与 App 适配',
          'en-US': 'SafeArea and App Integration',
        },
        doc: 'safe-area',
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
          'zh-CN': 'TabBar 底部标签栏',
          'en-US': 'TabBar',
        },
        doc: 'tab-bar',
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
          'zh-CN': 'NumberKeyboard 数字键盘',
          'en-US': 'NumberKeyboard',
        },
        doc: 'number-keyboard',
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
          'zh-CN': 'Code 代码块',
          'en-US': 'Code',
        },
        doc: 'code',
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
          'zh-CN': 'NoticeBar 通知栏',
          'en-US': 'NoticeBar',
        },
        doc: 'notice-bar',
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
          'zh-CN': 'PullRefresh 下拉刷新',
          'en-US': 'PullRefresh',
        },
        doc: 'pull-refresh',
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
          'zh-CN': '其他',
          'en-US': 'Others',
        },
        type: 1,
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
          'zh-CN': 'Lazy 懒加载',
          'en-US': 'Lazy',
        },
        doc: 'lazy',
        type: 2,
      },
    ].map(markReuse),
  },
  mobile: {
    docs: [
      'showcasePractices',
      'practiceDashboard',
      'practiceList',
      'practiceCard',
      'practiceDetail',
      'practiceForm',
      'practiceResult',
      'showcase',
      'showcaseStrengths',
      'showcaseComponents',
      'showcaseCrossPlatform',
      'showcaseForms',
      'showcaseThemes',
      'showcaseAsync',
      'showcaseLoading',
      'showcaseData',
      'showcaseTouch',
    ],
  },
  copy: [],
  directives: ['ripple', 'lazy', 'hover', 'loading'],
})
