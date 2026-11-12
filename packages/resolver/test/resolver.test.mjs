import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { MapleResolver } from '../lib/index.js'

const [components, directives] = MapleResolver()

test('standalone icons include motion styles unless disabled', () => {
  const [unstyled] = MapleResolver({ importStyle: false })
  assert.deepEqual(components.resolve('MIconCheck').sideEffects, ['@maple-design/icons-vue/style.css'])
  assert.equal(unstyled.resolve('MIconCheck').sideEffects, undefined)
})

test('resolves Menu and MenuOption through the menu style entry', () => {
  for (const name of ['Menu', 'MenuOption']) {
    assert.deepEqual(components.resolve(`Mp${name}`), {
      from: '@maple-design/ui-vue',
      name: `_${name}Component`,
      sideEffects: ['@maple-design/ui-vue/menu/style'],
    })
  }
  assert.equal(components.resolve('MpDropdownMenu'), undefined)
})

test('resolves the input family through the input style module', () => {
  for (const name of ['Input', 'InputGroup', 'InputGroupLabel', 'InputPassword']) {
    assert.deepEqual(components.resolve(`Mp${name}`), {
      from: '@maple-design/ui-vue',
      name: `_${name}Component`,
      sideEffects: ['@maple-design/ui-vue/input/style'],
    })
  }
})

test('resolves Mention and InputTag with their styles', () => {
  for (const [component, path] of [
    ['Mention', 'mention'],
    ['InputTag', 'input-tag'],
  ]) {
    assert.deepEqual(components.resolve(`Mp${component}`), {
      from: '@maple-design/ui-vue',
      name: `_${component}Component`,
      sideEffects: [`@maple-design/ui-vue/${path}/style`],
    })
  }
})

test('resolves UI components with their styles', () => {
  assert.deepEqual(components.resolve('MpPageHeader'), {
    from: '@maple-design/ui-vue',
    name: '_PageHeaderComponent',
    sideEffects: ['@maple-design/ui-vue/page-header/style'],
  })
  assert.equal(components.resolve('MpAppBar'), undefined)

  assert.deepEqual(components.resolve('MpProgressGroup'), {
    from: '@maple-design/ui-vue',
    name: '_ProgressGroupComponent',
    sideEffects: ['@maple-design/ui-vue/progress-group/style'],
  })

  assert.deepEqual(components.resolve('MpButton'), {
    from: '@maple-design/ui-vue',
    name: '_ButtonComponent',
    sideEffects: ['@maple-design/ui-vue/button/style'],
  })

  assert.deepEqual(components.resolve('MpSplitButton'), {
    from: '@maple-design/ui-vue',
    name: '_SplitButtonComponent',
    sideEffects: ['@maple-design/ui-vue/split-button/style'],
  })

  assert.deepEqual(components.resolve('MpStatistic'), {
    from: '@maple-design/ui-vue',
    name: '_StatisticComponent',
    sideEffects: ['@maple-design/ui-vue/statistic/style'],
  })

  assert.deepEqual(components.resolve('MpSkeletonLine'), {
    from: '@maple-design/ui-vue',
    name: '_SkeletonLineComponent',
    sideEffects: ['@maple-design/ui-vue/skeleton/style'],
  })

  assert.deepEqual(components.resolve('MpSkeletonShape'), {
    from: '@maple-design/ui-vue',
    name: '_SkeletonShapeComponent',
    sideEffects: ['@maple-design/ui-vue/skeleton/style'],
  })

  assert.deepEqual(components.resolve('MpMenuOption'), {
    from: '@maple-design/ui-vue',
    name: '_MenuOptionComponent',
    sideEffects: ['@maple-design/ui-vue/menu/style'],
  })

  assert.deepEqual(components.resolve('MpInfiniteScroll'), {
    from: '@maple-design/ui-vue',
    name: '_InfiniteScrollComponent',
    sideEffects: ['@maple-design/ui-vue/infinite-scroll/style'],
  })

  assert.deepEqual(components.resolve('MpListItem'), {
    from: '@maple-design/ui-vue',
    name: '_ListItemComponent',
    sideEffects: ['@maple-design/ui-vue/list/style'],
  })

  assert.equal(components.resolve('MpActionItem'), undefined)

  assert.deepEqual(components.resolve('MpCollapseItem'), {
    from: '@maple-design/ui-vue',
    name: '_CollapseItemComponent',
    sideEffects: ['@maple-design/ui-vue/collapse/style'],
  })

  assert.deepEqual(components.resolve('MpRow'), {
    from: '@maple-design/ui-vue',
    name: '_RowComponent',
    sideEffects: ['@maple-design/ui-vue/row/style'],
  })

  assert.deepEqual(components.resolve('MpImagePreview'), {
    from: '@maple-design/ui-vue',
    name: '_ImagePreviewComponent',
    sideEffects: ['@maple-design/ui-vue/image/style'],
  })

  assert.deepEqual(components.resolve('MpImagePreviewAction'), {
    from: '@maple-design/ui-vue',
    name: '_ImagePreviewActionComponent',
    sideEffects: ['@maple-design/ui-vue/image/style'],
  })

  assert.deepEqual(components.resolve('MpHoverOverlay'), {
    from: '@maple-design/ui-vue',
    name: '_HoverOverlayComponent',
    sideEffects: ['@maple-design/ui-vue/hover/style'],
  })
})

test('resolves every public Maple UI component export', () => {
  const uiEntry = readFileSync(new URL('../../ui/src/index.ts', import.meta.url), 'utf8')
  const componentNames = [...uiEntry.matchAll(/\b_([A-Z][A-Za-z0-9]*)Component\b/g)].map((match) => match[1])
  const unresolved = [...new Set(componentNames)].filter((name) => !components.resolve(`Mp${name}`))

  assert.deepEqual(unresolved, [])

  for (const name of new Set(componentNames)) {
    const result = components.resolve(`Mp${name}`)
    for (const sideEffect of result?.sideEffects ?? []) {
      const stylePath = sideEffect.replace('@maple-design/ui-vue/', '')
      assert.ok(
        existsSync(new URL(`../../ui/src/${stylePath}/index.ts`, import.meta.url)),
        `${sideEffect} should exist`,
      )
    }
  }
})

test('distinguishes the icon wrapper from standalone SVG icons', () => {
  assert.deepEqual(components.resolve('MpIcon'), {
    from: '@maple-design/ui-vue',
    name: '_IconComponent',
    sideEffects: ['@maple-design/ui-vue/icon/style'],
  })
  assert.deepEqual(components.resolve('MIconInfoCircleFill'), {
    from: '@maple-design/icons-vue/icon-info-circle-fill',
    name: 'IconInfoCircleFill',
    sideEffects: ['@maple-design/icons-vue/style.css'],
  })
  assert.deepEqual(components.resolve('MIconMore'), {
    from: '@maple-design/icons-vue/icon-more',
    name: 'IconMore',
    sideEffects: ['@maple-design/icons-vue/style.css'],
  })
  assert.deepEqual(components.resolve('MIconCaretUp'), {
    from: '@maple-design/icons-vue/icon-caret-up',
    name: 'IconCaretUp',
    sideEffects: ['@maple-design/icons-vue/style.css'],
  })
  assert.deepEqual(components.resolve('MIconCheckCircleFill'), {
    from: '@maple-design/icons-vue/icon-check-circle-fill',
    name: 'IconCheckCircleFill',
    sideEffects: ['@maple-design/icons-vue/style.css'],
  })
  assert.throws(() => components.resolve('MIconNotExists'), /Unknown icon component <m-icon-not-exists>/)
  assert.equal(components.resolve('MpIconInfoCircleFill'), undefined)
})

test('resolves programmatic APIs and directives', () => {
  const [autoImports] = MapleResolver()
  for (const [name, style] of [
    ['ActionSheet', 'action-sheet'],
    ['Dialog', 'dialog'],
    ['ImagePreview', 'image'],
    ['imagePreview', 'image'],
    ['LoadingBar', 'loading-bar'],
    ['Message', 'message'],
    ['Picker', 'picker'],
    ['ThemeProvider', 'theme-provider'],
  ]) {
    assert.equal(autoImports.resolve(name)?.name, name)
    assert.deepEqual(autoImports.resolve(name)?.sideEffects, [`@maple-design/ui-vue/${style}/style`])
  }
  assert.equal(autoImports.resolve('Locale')?.name, 'Locale')
  assert.equal(autoImports.resolve('Locale')?.sideEffects, undefined)
  assert.equal(directives.resolve('Ripple')?.name, '_RippleComponent')
  assert.deepEqual(directives.resolve('MpLoading'), {
    from: '@maple-design/ui-vue',
    name: 'vLoading',
    sideEffects: ['@maple-design/ui-vue/loading/style'],
  })
  assert.equal(directives.resolve('Loading'), undefined)
})

test('programmatic APIs are named exports of maple-ui', () => {
  const uiEntry = readFileSync(new URL('../../ui/src/index.ts', import.meta.url), 'utf8')
  const exported = new Set(
    [...uiEntry.matchAll(/export\s*\{([^}]+)\}/g)]
      .flatMap((match) => match[1].split(','))
      .map((part) => {
        const sides = part.trim().split(/\s+as\s+/)
        return (sides[1] ?? sides[0]).trim()
      })
      .filter(Boolean),
  )
  for (const name of [
    'ActionSheet',
    'Dialog',
    'ImagePreview',
    'imagePreview',
    'LoadingBar',
    'Locale',
    'Message',
    'Picker',
    'ThemeProvider',
  ]) {
    assert.ok(exported.has(name), `${name} should be exported from maple-ui`)
  }
})

test('can disable styles and directives', () => {
  const [noStyleComponents, noDirectives] = MapleResolver({ importStyle: false, directives: false })
  assert.equal(noStyleComponents.resolve('MpButton')?.sideEffects, undefined)
  assert.equal(noDirectives.resolve('Ripple'), undefined)
  assert.equal(noDirectives.resolve('MpLoading'), undefined)
})

test('can disable programmatic API resolution', () => {
  const [components] = MapleResolver({ autoImport: false })
  assert.equal(components.resolve('Message'), undefined)
})

test('Row and Col resolve independent styles', () => {
  for (const name of ['Row', 'Col']) {
    const resolved = components.resolve('Mp' + name)
    assert.equal(resolved.name, '_' + name + 'Component')
    assert.deepEqual(resolved.sideEffects, ['@maple-design/ui-vue/' + name.toLowerCase() + '/style'])
  }
})

test('resolves the shared Tabs composition without the legacy Tab entry', () => {
  for (const name of ['Tabs', 'TabPane', 'TabsNavs', 'TabNav', 'TabsItems', 'TabItem']) {
    assert.deepEqual(components.resolve(`Mp${name}`), {
      from: '@maple-design/ui-vue',
      name: `_${name}Component`,
      sideEffects: ['@maple-design/ui-vue/tabs/style'],
    })
  }
  assert.equal(components.resolve('MpTab'), undefined)
})
