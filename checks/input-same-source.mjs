import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { assertCopiedVueCompat } from '../../design-ui/bin/copied-source-normalization.mjs'
import { normalizeLessSource, normalizeTypeScript, normalizeVueSource } from './normalize-source.mjs'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const cedar = resolve(workspace, 'cedar-design-web/packages/ui/src')
const maple = resolve(workspace, 'maple-design-mobile/packages/ui/src')
assertCopiedVueCompat(
  readFileSync(resolve(cedar, '_utils/vue-compat.ts'), 'utf8'),
  readFileSync(resolve(maple, 'utils/vue-compat.ts'), 'utf8'),
)
const pairs = [
  ['field-decorator/FieldDecorator.vue', 'field-decorator/FieldDecorator.vue'],
  ['field-decorator/props.ts', 'field-decorator/props.ts'],
  ['field-decorator/use-field-geometry.ts', 'field-decorator/use-field-geometry.ts'],
  ['field-decorator/style/field-decorator.less', 'field-decorator/style/field-decorator.less'],
  ['input/input.vue', 'input/Input.vue'],
  ['input/props.ts', 'input/props.ts'],
  ['input/context.ts', 'input/context.ts'],
  ['input/native-attrs.ts', 'input/native-attrs.ts'],
  ['input/use-input-value.ts', 'input/use-input-value.ts'],
  ['input/InputFeedback.vue', 'input/InputFeedback.vue'],
  ['input/InputPassword.vue', 'input/InputPassword.vue'],
  ['input/InputGroup.vue', 'input/InputGroup.vue'],
  ['input/InputGroupLabel.vue', 'input/InputGroupLabel.vue'],
  ['input/style/input.less', 'input/style/input.less'],
  ['input/style/group.less', 'input/style/group.less'],
  ['input/style/index.less', 'input/style/index.less'],
  ['input/__tests__/same-source.spec.ts', 'input/__tests__/same-source.spec.ts'],
  ['field-decorator/__tests__/field-decorator.spec.ts', 'field-decorator/__tests__/field-decorator.spec.ts'],
]
const normalizePlatform = (source) =>
  source
    .replaceAll('@cedar-design/icons-vue', '@maple-design/icons-vue')
    .replaceAll('_utils/global-config', 'utils/components')
    .replaceAll('_utils/constant', 'utils/constants')
    .replaceAll('_utils/input-composition', 'utils/input-composition')
    .replaceAll('_utils/popup-container', 'utils/popup-container')
    .replaceAll('_utils/text-input-value', 'utils/text-input-value')
    .replaceAll('_utils/empty-value', 'utils/empty-value')
    .replaceAll('_utils/vue-compat', 'utils/vue-compat')
    .replaceAll('./input.vue', './Input.vue')
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
    .replaceAll('c-input-feedback-spin', 'mp-input-feedback-spin')
    .replaceAll('c-field-loading-line', 'mp-field-loading-line')
    .replace(
      /hint:\s*\{\s*type: Boolean,\s*default: (?:false|true),?\s*\}/g,
      'hint: { type: Boolean, default: PLATFORM_DEFAULT }',
    )

const normalize = (source) => normalizePlatform(source).replace(/\s+/g, ' ').trim()
const canonical = (source, file) => {
  const normalized = normalizePlatform(source)
  return file.endsWith('.ts')
    ? normalizeTypeScript(normalized)
    : file.endsWith('.vue')
      ? normalizeVueSource(normalized)
      : file.endsWith('.less')
        ? normalizeLessSource(normalized)
        : normalized.replace(/\s+/g, ' ').trim()
}
for (const [a, b] of pairs) {
  assert.equal(
    await canonical(readFileSync(resolve(cedar, a), 'utf8'), a),
    await canonical(readFileSync(resolve(maple, b), 'utf8'), b),
    a + ' differs',
  )
}
console.log(
  'Input / FieldDecorator: ' +
    pairs.length +
    ' independently maintained source pairs match; form/locale bridges and token defaults remain local.',
)

/** Source parity alone cannot catch differences between the two Less compilers. */
for (const [root, prefix, compilerPackage] of [
  [cedar, 'c', '../node_modules/less/package.json'],
  [maple, 'mp', '../../cli/node_modules/less/package.json'],
]) {
  const requireLess = createRequire(resolve(root, compilerPackage))
  const less = requireLess('./')
  const filename = resolve(root, 'field-decorator/style/index.less')
  const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
  const selector = '.' + prefix + '-field-decorator__border--notched'
  const rule = css.slice(css.indexOf(selector)).split('}')[0]
  assert.match(rule, /padding-inline-start: max\(0px, calc\(/, prefix + ' notch offset must survive Less compilation')
}
console.log('Both Less compilers preserve the hint notch offset expression.')
