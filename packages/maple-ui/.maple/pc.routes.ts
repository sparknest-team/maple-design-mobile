export default [
  {
    path: '/en-US/index',
    // @ts-ignore
    component: () =>
      import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/.maple/site/pc/pages/index/index.vue'),
  },
  {
    path: '/zh-CN/index',
    // @ts-ignore
    component: () =>
      import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/.maple/site/pc/pages/index/index.vue'),
  },
  {
    path: '/layout',
    // @ts-ignore
    component: () =>
      import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/.maple/site/pc/Layout.vue'),
    children: [
      {
        path: '/en-US/action-sheet',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/action-sheet/docs/en-US.md'),
      },
      {
        path: '/zh-CN/action-sheet',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/action-sheet/docs/zh-CN.md'),
      },
      {
        path: '/en-US/alert',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/alert/docs/en-US.md'),
      },
      {
        path: '/zh-CN/alert',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/alert/docs/zh-CN.md'),
      },
      {
        path: '/en-US/app-bar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/app-bar/docs/en-US.md'),
      },
      {
        path: '/zh-CN/app-bar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/app-bar/docs/zh-CN.md'),
      },
      {
        path: '/en-US/auto-complete',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/auto-complete/docs/en-US.md'),
      },
      {
        path: '/zh-CN/auto-complete',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/auto-complete/docs/zh-CN.md'),
      },
      {
        path: '/en-US/avatar-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/avatar-group/docs/en-US.md'),
      },
      {
        path: '/zh-CN/avatar-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/avatar-group/docs/zh-CN.md'),
      },
      {
        path: '/en-US/avatar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/avatar/docs/en-US.md'),
      },
      {
        path: '/zh-CN/avatar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/avatar/docs/zh-CN.md'),
      },
      {
        path: '/en-US/back-top',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/back-top/docs/en-US.md'),
      },
      {
        path: '/zh-CN/back-top',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/back-top/docs/zh-CN.md'),
      },
      {
        path: '/en-US/badge',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/badge/docs/en-US.md'),
      },
      {
        path: '/zh-CN/badge',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/badge/docs/zh-CN.md'),
      },
      {
        path: '/en-US/bottom-navigation-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/bottom-navigation-item/docs/en-US.md'),
      },
      {
        path: '/zh-CN/bottom-navigation-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/bottom-navigation-item/docs/zh-CN.md'),
      },
      {
        path: '/en-US/bottom-navigation',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/bottom-navigation/docs/en-US.md'),
      },
      {
        path: '/zh-CN/bottom-navigation',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/bottom-navigation/docs/zh-CN.md'),
      },
      {
        path: '/en-US/breadcrumb-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/breadcrumb-item/docs/en-US.md'),
      },
      {
        path: '/zh-CN/breadcrumb-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/breadcrumb-item/docs/zh-CN.md'),
      },
      {
        path: '/en-US/breadcrumb',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/breadcrumb/docs/en-US.md'),
      },
      {
        path: '/zh-CN/breadcrumb',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/breadcrumb/docs/zh-CN.md'),
      },
      {
        path: '/en-US/button-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/button-group/docs/en-US.md'),
      },
      {
        path: '/zh-CN/button-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/button-group/docs/zh-CN.md'),
      },
      {
        path: '/en-US/button',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/button/docs/en-US.md'),
      },
      {
        path: '/zh-CN/button',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/button/docs/zh-CN.md'),
      },
      {
        path: '/en-US/card',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/card/docs/en-US.md'),
      },
      {
        path: '/zh-CN/card',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/card/docs/zh-CN.md'),
      },
      {
        path: '/en-US/cell',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/cell/docs/en-US.md'),
      },
      {
        path: '/zh-CN/cell',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/cell/docs/zh-CN.md'),
      },
      {
        path: '/en-US/checkbox-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/checkbox-group/docs/en-US.md'),
      },
      {
        path: '/zh-CN/checkbox-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/checkbox-group/docs/zh-CN.md'),
      },
      {
        path: '/en-US/checkbox',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/checkbox/docs/en-US.md'),
      },
      {
        path: '/zh-CN/checkbox',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/checkbox/docs/zh-CN.md'),
      },
      {
        path: '/en-US/chip',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/chip/docs/en-US.md'),
      },
      {
        path: '/zh-CN/chip',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/chip/docs/zh-CN.md'),
      },
      {
        path: '/en-US/code',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/code/docs/en-US.md'),
      },
      {
        path: '/zh-CN/code',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/code/docs/zh-CN.md'),
      },
      {
        path: '/en-US/col',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/col/docs/en-US.md'),
      },
      {
        path: '/zh-CN/col',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/col/docs/zh-CN.md'),
      },
      {
        path: '/en-US/collapse-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/collapse-item/docs/en-US.md'),
      },
      {
        path: '/zh-CN/collapse-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/collapse-item/docs/zh-CN.md'),
      },
      {
        path: '/en-US/collapse-transition',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/collapse-transition/docs/en-US.md'),
      },
      {
        path: '/zh-CN/collapse-transition',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/collapse-transition/docs/zh-CN.md'),
      },
      {
        path: '/en-US/collapse',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/collapse/docs/en-US.md'),
      },
      {
        path: '/zh-CN/collapse',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/collapse/docs/zh-CN.md'),
      },
      {
        path: '/en-US/count-to',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/count-to/docs/en-US.md'),
      },
      {
        path: '/zh-CN/count-to',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/count-to/docs/zh-CN.md'),
      },
      {
        path: '/en-US/countdown',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/countdown/docs/en-US.md'),
      },
      {
        path: '/zh-CN/countdown',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/countdown/docs/zh-CN.md'),
      },
      {
        path: '/en-US/counter',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/counter/docs/en-US.md'),
      },
      {
        path: '/zh-CN/counter',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/counter/docs/zh-CN.md'),
      },
      {
        path: '/en-US/date-picker',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/date-picker/docs/en-US.md'),
      },
      {
        path: '/zh-CN/date-picker',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/date-picker/docs/zh-CN.md'),
      },
      {
        path: '/en-US/dialog',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/dialog/docs/en-US.md'),
      },
      {
        path: '/zh-CN/dialog',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/dialog/docs/zh-CN.md'),
      },
      {
        path: '/en-US/divider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/divider/docs/en-US.md'),
      },
      {
        path: '/zh-CN/divider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/divider/docs/zh-CN.md'),
      },
      {
        path: '/en-US/drag',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/drag/docs/en-US.md'),
      },
      {
        path: '/zh-CN/drag',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/drag/docs/zh-CN.md'),
      },
      {
        path: '/en-US/ellipsis',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/ellipsis/docs/en-US.md'),
      },
      {
        path: '/zh-CN/ellipsis',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/ellipsis/docs/zh-CN.md'),
      },
      {
        path: '/en-US/empty',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/empty/docs/en-US.md'),
      },
      {
        path: '/zh-CN/empty',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/empty/docs/zh-CN.md'),
      },
      {
        path: '/en-US/fab',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/fab/docs/en-US.md'),
      },
      {
        path: '/zh-CN/fab',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/fab/docs/zh-CN.md'),
      },
      {
        path: '/en-US/floating-panel',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/floating-panel/docs/en-US.md'),
      },
      {
        path: '/zh-CN/floating-panel',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/floating-panel/docs/zh-CN.md'),
      },
      {
        path: '/en-US/form-details',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/form-details/docs/en-US.md'),
      },
      {
        path: '/zh-CN/form-details',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/form-details/docs/zh-CN.md'),
      },
      {
        path: '/en-US/form',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/form/docs/en-US.md'),
      },
      {
        path: '/zh-CN/form',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/form/docs/zh-CN.md'),
      },
      {
        path: '/en-US/highlighter-provider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/highlighter-provider/docs/en-US.md'),
      },
      {
        path: '/zh-CN/highlighter-provider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/highlighter-provider/docs/zh-CN.md'),
      },
      {
        path: '/en-US/hover',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/hover/docs/en-US.md'),
      },
      {
        path: '/zh-CN/hover',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/hover/docs/zh-CN.md'),
      },
      {
        path: '/en-US/icon',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/icon/docs/en-US.md'),
      },
      {
        path: '/zh-CN/icon',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/icon/docs/zh-CN.md'),
      },
      {
        path: '/en-US/image-preview',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/image-preview/docs/en-US.md'),
      },
      {
        path: '/zh-CN/image-preview',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/image-preview/docs/zh-CN.md'),
      },
      {
        path: '/en-US/image',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/image/docs/en-US.md'),
      },
      {
        path: '/zh-CN/image',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/image/docs/zh-CN.md'),
      },
      {
        path: '/en-US/index-anchor',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/index-anchor/docs/en-US.md'),
      },
      {
        path: '/zh-CN/index-anchor',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/index-anchor/docs/zh-CN.md'),
      },
      {
        path: '/en-US/index-bar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/index-bar/docs/en-US.md'),
      },
      {
        path: '/zh-CN/index-bar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/index-bar/docs/zh-CN.md'),
      },
      {
        path: '/en-US/input',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/input/docs/en-US.md'),
      },
      {
        path: '/zh-CN/input',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/input/docs/zh-CN.md'),
      },
      {
        path: '/en-US/lazy',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/lazy/docs/en-US.md'),
      },
      {
        path: '/zh-CN/lazy',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/lazy/docs/zh-CN.md'),
      },
      {
        path: '/en-US/link',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/link/docs/en-US.md'),
      },
      {
        path: '/zh-CN/link',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/link/docs/zh-CN.md'),
      },
      {
        path: '/en-US/list',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/list/docs/en-US.md'),
      },
      {
        path: '/zh-CN/list',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/list/docs/zh-CN.md'),
      },
      {
        path: '/en-US/loading-bar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/loading-bar/docs/en-US.md'),
      },
      {
        path: '/zh-CN/loading-bar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/loading-bar/docs/zh-CN.md'),
      },
      {
        path: '/en-US/loading',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/loading/docs/en-US.md'),
      },
      {
        path: '/zh-CN/loading',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/loading/docs/zh-CN.md'),
      },
      {
        path: '/en-US/locale-provider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/locale-provider/docs/en-US.md'),
      },
      {
        path: '/zh-CN/locale-provider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/locale-provider/docs/zh-CN.md'),
      },
      {
        path: '/en-US/locale',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/locale/docs/en-US.md'),
      },
      {
        path: '/zh-CN/locale',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/locale/docs/zh-CN.md'),
      },
      {
        path: '/en-US/menu-option',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/menu-option/docs/en-US.md'),
      },
      {
        path: '/zh-CN/menu-option',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/menu-option/docs/zh-CN.md'),
      },
      {
        path: '/en-US/menu-select',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/menu-select/docs/en-US.md'),
      },
      {
        path: '/zh-CN/menu-select',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/menu-select/docs/zh-CN.md'),
      },
      {
        path: '/en-US/menu',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/menu/docs/en-US.md'),
      },
      {
        path: '/zh-CN/menu',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/menu/docs/zh-CN.md'),
      },
      {
        path: '/en-US/option',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/option/docs/en-US.md'),
      },
      {
        path: '/zh-CN/option',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/option/docs/zh-CN.md'),
      },
      {
        path: '/en-US/overlay',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/overlay/docs/en-US.md'),
      },
      {
        path: '/zh-CN/overlay',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/overlay/docs/zh-CN.md'),
      },
      {
        path: '/en-US/pagination',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/pagination/docs/en-US.md'),
      },
      {
        path: '/zh-CN/pagination',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/pagination/docs/zh-CN.md'),
      },
      {
        path: '/en-US/paper',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/paper/docs/en-US.md'),
      },
      {
        path: '/zh-CN/paper',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/paper/docs/zh-CN.md'),
      },
      {
        path: '/en-US/picker',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/picker/docs/en-US.md'),
      },
      {
        path: '/zh-CN/picker',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/picker/docs/zh-CN.md'),
      },
      {
        path: '/en-US/popup',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/popup/docs/en-US.md'),
      },
      {
        path: '/zh-CN/popup',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/popup/docs/zh-CN.md'),
      },
      {
        path: '/en-US/progress',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/progress/docs/en-US.md'),
      },
      {
        path: '/zh-CN/progress',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/progress/docs/zh-CN.md'),
      },
      {
        path: '/en-US/pull-refresh',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/pull-refresh/docs/en-US.md'),
      },
      {
        path: '/zh-CN/pull-refresh',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/pull-refresh/docs/zh-CN.md'),
      },
      {
        path: '/en-US/radio-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/radio-group/docs/en-US.md'),
      },
      {
        path: '/zh-CN/radio-group',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/radio-group/docs/zh-CN.md'),
      },
      {
        path: '/en-US/radio',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/radio/docs/en-US.md'),
      },
      {
        path: '/zh-CN/radio',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/radio/docs/zh-CN.md'),
      },
      {
        path: '/en-US/rate',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/rate/docs/en-US.md'),
      },
      {
        path: '/zh-CN/rate',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/rate/docs/zh-CN.md'),
      },
      {
        path: '/en-US/result',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/result/docs/en-US.md'),
      },
      {
        path: '/zh-CN/result',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/result/docs/zh-CN.md'),
      },
      {
        path: '/en-US/ripple',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/ripple/docs/en-US.md'),
      },
      {
        path: '/zh-CN/ripple',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/ripple/docs/zh-CN.md'),
      },
      {
        path: '/en-US/row',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/row/docs/en-US.md'),
      },
      {
        path: '/zh-CN/row',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/row/docs/zh-CN.md'),
      },
      {
        path: '/en-US/select',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/select/docs/en-US.md'),
      },
      {
        path: '/zh-CN/select',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/select/docs/zh-CN.md'),
      },
      {
        path: '/en-US/signature',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/signature/docs/en-US.md'),
      },
      {
        path: '/zh-CN/signature',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/signature/docs/zh-CN.md'),
      },
      {
        path: '/en-US/skeleton',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/skeleton/docs/en-US.md'),
      },
      {
        path: '/zh-CN/skeleton',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/skeleton/docs/zh-CN.md'),
      },
      {
        path: '/en-US/slider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/slider/docs/en-US.md'),
      },
      {
        path: '/zh-CN/slider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/slider/docs/zh-CN.md'),
      },
      {
        path: '/en-US/snackbar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/snackbar/docs/en-US.md'),
      },
      {
        path: '/zh-CN/snackbar',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/snackbar/docs/zh-CN.md'),
      },
      {
        path: '/en-US/space',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/space/docs/en-US.md'),
      },
      {
        path: '/zh-CN/space',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/space/docs/zh-CN.md'),
      },
      {
        path: '/en-US/step',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/step/docs/en-US.md'),
      },
      {
        path: '/zh-CN/step',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/step/docs/zh-CN.md'),
      },
      {
        path: '/en-US/steps',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/steps/docs/en-US.md'),
      },
      {
        path: '/zh-CN/steps',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/steps/docs/zh-CN.md'),
      },
      {
        path: '/en-US/sticky',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/sticky/docs/en-US.md'),
      },
      {
        path: '/zh-CN/sticky',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/sticky/docs/zh-CN.md'),
      },
      {
        path: '/en-US/style-provider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/style-provider/docs/en-US.md'),
      },
      {
        path: '/zh-CN/style-provider',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/style-provider/docs/zh-CN.md'),
      },
      {
        path: '/en-US/styles',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/styles/docs/en-US.md'),
      },
      {
        path: '/zh-CN/styles',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/styles/docs/zh-CN.md'),
      },
      {
        path: '/en-US/swipe-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/swipe-item/docs/en-US.md'),
      },
      {
        path: '/zh-CN/swipe-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/swipe-item/docs/zh-CN.md'),
      },
      {
        path: '/en-US/swipe',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/swipe/docs/en-US.md'),
      },
      {
        path: '/zh-CN/swipe',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/swipe/docs/zh-CN.md'),
      },
      {
        path: '/en-US/switch',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/switch/docs/en-US.md'),
      },
      {
        path: '/zh-CN/switch',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/switch/docs/zh-CN.md'),
      },
      {
        path: '/en-US/tab-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tab-item/docs/en-US.md'),
      },
      {
        path: '/zh-CN/tab-item',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tab-item/docs/zh-CN.md'),
      },
      {
        path: '/en-US/tab',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tab/docs/en-US.md'),
      },
      {
        path: '/zh-CN/tab',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tab/docs/zh-CN.md'),
      },
      {
        path: '/en-US/table',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/table/docs/en-US.md'),
      },
      {
        path: '/zh-CN/table',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/table/docs/zh-CN.md'),
      },
      {
        path: '/en-US/tabs-items',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tabs-items/docs/en-US.md'),
      },
      {
        path: '/zh-CN/tabs-items',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tabs-items/docs/zh-CN.md'),
      },
      {
        path: '/en-US/tabs',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tabs/docs/en-US.md'),
      },
      {
        path: '/zh-CN/tabs',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tabs/docs/zh-CN.md'),
      },
      {
        path: '/zh-CN/tag',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tag/docs/zh-CN.md'),
      },
      {
        path: '/en-US/themes',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/themes/docs/en-US.md'),
      },
      {
        path: '/zh-CN/themes',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/themes/docs/zh-CN.md'),
      },
      {
        path: '/en-US/time-picker',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/time-picker/docs/en-US.md'),
      },
      {
        path: '/zh-CN/time-picker',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/time-picker/docs/zh-CN.md'),
      },
      {
        path: '/en-US/tooltip',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tooltip/docs/en-US.md'),
      },
      {
        path: '/zh-CN/tooltip',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/tooltip/docs/zh-CN.md'),
      },
      {
        path: '/en-US/uploader',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/uploader/docs/en-US.md'),
      },
      {
        path: '/zh-CN/uploader',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/uploader/docs/zh-CN.md'),
      },
      {
        path: '/en-US/watermark',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/watermark/docs/en-US.md'),
      },
      {
        path: '/zh-CN/watermark',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/src/watermark/docs/zh-CN.md'),
      },
      {
        path: '/en-US/atomicCssSupport',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/atomicCssSupport.en-US.md'),
      },
      {
        path: '/zh-CN/atomicCssSupport',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/atomicCssSupport.zh-CN.md'),
      },
      {
        path: '/en-US/browserAdaptation',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/browserAdaptation.en-US.md'),
      },
      {
        path: '/zh-CN/browserAdaptation',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/browserAdaptation.zh-CN.md'),
      },
      {
        path: '/en-US/cli',
        // @ts-ignore
        component: () => import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/cli.en-US.md'),
      },
      {
        path: '/zh-CN/cli',
        // @ts-ignore
        component: () => import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/cli.zh-CN.md'),
      },
      {
        path: '/en-US/defaultsCustomization',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/defaultsCustomization.en-US.md'),
      },
      {
        path: '/zh-CN/defaultsCustomization',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/defaultsCustomization.zh-CN.md'),
      },
      {
        path: '/en-US/designResources',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/designResources.en-US.md'),
      },
      {
        path: '/zh-CN/designResources',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/designResources.zh-CN.md'),
      },
      {
        path: '/en-US/extension',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/extension.en-US.md'),
      },
      {
        path: '/zh-CN/extension',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/extension.zh-CN.md'),
      },
      {
        path: '/en-US/home',
        // @ts-ignore
        component: () => import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/home.en-US.md'),
      },
      {
        path: '/zh-CN/home',
        // @ts-ignore
        component: () => import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/home.zh-CN.md'),
      },
      {
        path: '/en-US/importOnDemand',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/importOnDemand.en-US.md'),
      },
      {
        path: '/zh-CN/importOnDemand',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/importOnDemand.zh-CN.md'),
      },
      {
        path: '/en-US/migrationGuide',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/migrationGuide.en-US.md'),
      },
      {
        path: '/zh-CN/migrationGuide',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/migrationGuide.zh-CN.md'),
      },
      {
        path: '/en-US/quickstart',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/quickstart.en-US.md'),
      },
      {
        path: '/zh-CN/quickstart',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/quickstart.zh-CN.md'),
      },
      {
        path: '/en-US/serverSideRendering',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/serverSideRendering.en-US.md'),
      },
      {
        path: '/zh-CN/serverSideRendering',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/serverSideRendering.zh-CN.md'),
      },
      {
        path: '/en-US/zodValidation',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/zodValidation.en-US.md'),
      },
      {
        path: '/zh-CN/zodValidation',
        // @ts-ignore
        component: () =>
          import('/Users/shuaimeng/github_web/maple-design-mobile/packages/maple-ui/docs/zodValidation.zh-CN.md'),
      },
    ],
  },
]
