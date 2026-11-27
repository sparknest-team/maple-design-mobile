import { defineConfig } from '@maple-design/cli-vue'

export default defineConfig({
  namespace: 'va',
  logo: './maple_icon.png',
  pc: {
    header: {
      darkMode: null,
      i18n: null,
      playground: null,
      versions: null,
    },
    menu: [
      {
        text: {
          'zh-CN': '开发指南',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': '基本介绍',
        },
        doc: 'home-fill',
        type: 3,
      },
      {
        text: {
          'zh-CN': '基础组件',
        },
        type: 1,
      },
      {
        text: {
          'zh-CN': 'Button 按钮',
        },
        doc: 'button',
        type: 2,
      },
    ],
  },
  mobile: {
    header: {
      i18n: null,
      darkMode: null,
    },
  },
})
