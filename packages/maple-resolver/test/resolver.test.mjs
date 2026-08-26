import assert from 'node:assert/strict'
import test from 'node:test'
import { MapleResolver } from '../lib/index.js'

const [components, directives] = MapleResolver()

test('resolves UI components with their styles', () => {
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

  assert.deepEqual(components.resolve('MpMenuGroup'), {
    from: '@maplejs/maple-ui',
    name: '_MenuGroupComponent',
    sideEffects: ['@maplejs/maple-ui/menu-group/style'],
  })

  assert.equal(components.resolve('MpActionItem'), undefined)
})

test('distinguishes the icon wrapper from standalone SVG icons', () => {
  assert.deepEqual(components.resolve('MpIcon'), {
    from: '@maplejs/maple-ui',
    name: '_IconComponent',
    sideEffects: ['@maplejs/maple-ui/icon/style'],
  })
  assert.deepEqual(components.resolve('MIconInformation'), {
    from: '@maplejs/icons-vue/icon-information',
    name: 'IconInformation',
  })
  assert.deepEqual(components.resolve('MIconMore'), {
    from: '@maplejs/icons-vue/icon-more',
    name: 'IconMore',
  })
  assert.throws(() => components.resolve('MIconNotExists'), /Unknown icon component <m-icon-not-exists>/)
  assert.equal(components.resolve('MpIconInformation'), undefined)
})

test('resolves programmatic APIs and directives', () => {
  const [autoImports] = MapleResolver()
  assert.equal(autoImports.resolve('Message')?.name, 'Message')
  assert.deepEqual(autoImports.resolve('Message')?.sideEffects, ['@maplejs/maple-ui/message/style'])
  assert.equal(directives.resolve('Ripple')?.name, '_RippleComponent')
})

test('can disable styles and directives', () => {
  const [noStyleComponents, noDirectives] = MapleResolver({ importStyle: false, directives: false })
  assert.equal(noStyleComponents.resolve('MpButton')?.sideEffects, undefined)
  assert.equal(noDirectives.resolve('Ripple'), undefined)
})

test('can disable programmatic API resolution', () => {
  const [components] = MapleResolver({ autoImport: false })
  assert.equal(components.resolve('Message'), undefined)
})
