import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'vitest'
import { MapleResolver } from '../lib/index.js'

const [components, directives] = MapleResolver()

test('resolves the input family through the input style module', () => {
  for (const name of ['Input', 'InputGroup', 'InputGroupLabel', 'InputPassword']) {
    assert.deepEqual(components.resolve(`Mp${name}`), {
      from: '@maplejs/maple-ui',
      name: `_${name}Component`,
      sideEffects: ['@maplejs/maple-ui/input/style'],
    })
  }
})

test('resolves UI components with their styles', () => {
  assert.deepEqual(components.resolve('MpPageHeader'), {
    from: '@maplejs/maple-ui',
    name: '_PageHeaderComponent',
    sideEffects: ['@maplejs/maple-ui/page-header/style'],
  })
  assert.equal(components.resolve('MpAppBar'), undefined)

  assert.deepEqual(components.resolve('MpProgressGroup'), {
    from: '@maplejs/maple-ui',
    name: '_ProgressGroupComponent',
    sideEffects: ['@maplejs/maple-ui/progress-group/style'],
  })

  assert.deepEqual(components.resolve('MpButton'), {
    from: '@maplejs/maple-ui',
    name: '_ButtonComponent',
    sideEffects: ['@maplejs/maple-ui/button/style'],
  })

  assert.deepEqual(components.resolve('MpSplitButton'), {
    from: '@maplejs/maple-ui',
    name: '_SplitButtonComponent',
    sideEffects: ['@maplejs/maple-ui/split-button/style'],
  })

  assert.deepEqual(components.resolve('MpStatistic'), {
    from: '@maplejs/maple-ui',
    name: '_StatisticComponent',
    sideEffects: ['@maplejs/maple-ui/statistic/style'],
  })

  assert.deepEqual(components.resolve('MpSkeletonLine'), {
    from: '@maplejs/maple-ui',
    name: '_SkeletonLineComponent',
    sideEffects: ['@maplejs/maple-ui/skeleton/style'],
  })

  assert.deepEqual(components.resolve('MpSkeletonShape'), {
    from: '@maplejs/maple-ui',
    name: '_SkeletonShapeComponent',
    sideEffects: ['@maplejs/maple-ui/skeleton/style'],
  })

  assert.deepEqual(components.resolve('MpMenuOption'), {
    from: '@maplejs/maple-ui',
    name: '_MenuOptionComponent',
    sideEffects: ['@maplejs/maple-ui/dropdown-menu/style'],
  })

  assert.deepEqual(components.resolve('MpInfiniteScroll'), {
    from: '@maplejs/maple-ui',
    name: '_InfiniteScrollComponent',
    sideEffects: ['@maplejs/maple-ui/infinite-scroll/style'],
  })

  assert.deepEqual(components.resolve('MpListItem'), {
    from: '@maplejs/maple-ui',
    name: '_ListItemComponent',
    sideEffects: ['@maplejs/maple-ui/list/style'],
  })

  assert.equal(components.resolve('MpActionItem'), undefined)

  assert.deepEqual(components.resolve('MpCollapseItem'), {
    from: '@maplejs/maple-ui',
    name: '_CollapseItemComponent',
    sideEffects: ['@maplejs/maple-ui/collapse/style'],
  })

  assert.deepEqual(components.resolve('MpRow'), {
    from: '@maplejs/maple-ui',
    name: '_RowComponent',
    sideEffects: ['@maplejs/maple-ui/row/style'],
  })

  assert.deepEqual(components.resolve('MpImagePreview'), {
    from: '@maplejs/maple-ui',
    name: '_ImagePreviewComponent',
    sideEffects: ['@maplejs/maple-ui/image/style'],
  })

  assert.deepEqual(components.resolve('MpImagePreviewAction'), {
    from: '@maplejs/maple-ui',
    name: '_ImagePreviewActionComponent',
    sideEffects: ['@maplejs/maple-ui/image/style'],
  })

  assert.deepEqual(components.resolve('MpHoverOverlay'), {
    from: '@maplejs/maple-ui',
    name: '_HoverOverlayComponent',
    sideEffects: ['@maplejs/maple-ui/hover/style'],
  })
})

test('resolves every public Maple UI component export', () => {
  const uiEntry = readFileSync(new URL('../../maple-ui/src/index.ts', import.meta.url), 'utf8')
  const componentNames = [...uiEntry.matchAll(/\b_([A-Z][A-Za-z0-9]*)Component\b/g)].map((match) => match[1])
  const unresolved = [...new Set(componentNames)].filter((name) => !components.resolve(`Mp${name}`))

  assert.deepEqual(unresolved, [])

  for (const name of new Set(componentNames)) {
    const result = components.resolve(`Mp${name}`)
    for (const sideEffect of result?.sideEffects ?? []) {
      const stylePath = sideEffect.replace('@maplejs/maple-ui/', '')
      assert.ok(
        existsSync(new URL(`../../maple-ui/src/${stylePath}/index.ts`, import.meta.url)),
        `${sideEffect} should exist`,
      )
    }
  }
})

test('distinguishes the icon wrapper from standalone SVG icons', () => {
  assert.deepEqual(components.resolve('MpIcon'), {
    from: '@maplejs/maple-ui',
    name: '_IconComponent',
    sideEffects: ['@maplejs/maple-ui/icon/style'],
  })
  assert.deepEqual(components.resolve('MIconInfoCircleFill'), {
    from: '@maplejs/icons-vue/icon-info-circle-fill',
    name: 'IconInfoCircleFill',
  })
  assert.deepEqual(components.resolve('MIconMore'), {
    from: '@maplejs/icons-vue/icon-more',
    name: 'IconMore',
  })
  assert.deepEqual(components.resolve('MIconCaretUp'), {
    from: '@maplejs/icons-vue/icon-caret-up',
    name: 'IconCaretUp',
  })
  assert.deepEqual(components.resolve('MIconCheckCircleFill'), {
    from: '@maplejs/icons-vue/icon-check-circle-fill',
    name: 'IconCheckCircleFill',
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
    ['StyleProvider', 'style-provider'],
  ]) {
    assert.equal(autoImports.resolve(name)?.name, name)
    assert.deepEqual(autoImports.resolve(name)?.sideEffects, [`@maplejs/maple-ui/${style}/style`])
  }
  assert.equal(autoImports.resolve('Locale')?.name, 'Locale')
  assert.equal(autoImports.resolve('Locale')?.sideEffects, undefined)
  assert.equal(directives.resolve('Ripple')?.name, '_RippleComponent')
  assert.deepEqual(directives.resolve('MpLoading'), {
    from: '@maplejs/maple-ui',
    name: 'vLoading',
    sideEffects: ['@maplejs/maple-ui/loading/style'],
  })
  assert.equal(directives.resolve('Loading'), undefined)
})

test('programmatic APIs are named exports of maple-ui', () => {
  const uiEntry = readFileSync(new URL('../../maple-ui/src/index.ts', import.meta.url), 'utf8')
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
    'StyleProvider',
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
    assert.deepEqual(resolved.sideEffects, ['@maplejs/maple-ui/' + name.toLowerCase() + '/style'])
  }
})

test('resolves the shared Tabs composition without the legacy Tab entry', () => {
  for (const name of ['Tabs', 'TabPane', 'TabsNavs', 'TabNav', 'TabsItems', 'TabItem']) {
    assert.deepEqual(components.resolve(`Mp${name}`), {
      from: '@maplejs/maple-ui',
      name: `_${name}Component`,
      sideEffects: ['@maplejs/maple-ui/tabs/style'],
    })
  }
  assert.equal(components.resolve('MpTab'), undefined)
})
