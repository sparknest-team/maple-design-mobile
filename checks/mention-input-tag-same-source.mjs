import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { assertCopiedVueCompat } from '../../design-ui/bin/copied-source-normalization.mjs'
import { normalizeLessSource, normalizeTypeScript } from './normalize-source.mjs'

const workspace = fileURLToPath(new URL('../../', import.meta.url))
const roots = ['cedar-design-web', 'maple-design-mobile'].map((name) => resolve(workspace, name, 'packages/ui/src'))
assertCopiedVueCompat(
  readFileSync(resolve(roots[0], '_utils/vue-compat.ts'), 'utf8'),
  readFileSync(resolve(roots[1], 'utils/vue-compat.ts'), 'utf8'),
)
const components = {
  mention: [
    'mention.tsx',
    'props.ts',
    'types.ts',
    'emits.ts',
    'utils.ts',
    'token-codec.ts',
    'token-edit.ts',
    'token-label.ts',
    'selected-labels.ts',
    'presentation.ts',
    'style/index.less',
    'style/token.less',
  ],
  'input-tag': [
    'input-tag.tsx',
    'props.ts',
    'types.ts',
    'emits.ts',
    'utils.ts',
    'tag-keys.ts',
    'presentation.ts',
    'style/index.less',
    'style/input-tag.less',
    'style/token.less',
  ],
}
// Platform imports, namespace and theme tokens are the only intentional differences.
const normalize = (source) =>
  source
    .replaceAll('@cedar-design/use-vue', '@maple-design/use-vue')
    .replaceAll('../_utils/global-config', '../utils/components')
    .replaceAll('../_utils/empty-value', '../utils/empty-value')
    .replaceAll('../_utils/vue-compat', '../utils/vue-compat')
    .replaceAll('../_utils/input-composition', '../utils/input-composition')
    .replaceAll('../_hooks/use-form-item', '../form/item-provide')
    .replaceAll("../_components/resize-observer'", "../_components/resize-observer-v2'")
    .replaceAll('../_components/FeedbackIcon.vue', '../input/InputFeedback.vue')
    .replaceAll('<FeedbackIcon type={feedback.value} />', '<FeedbackIcon status={feedback.value} />')
    .replaceAll("from '../input'", "from '../input/base'")
    .replaceAll("from '../textarea'", "from '../textarea/presentation'")
    .replaceAll("from '../tag'", "from '../tag/Tag.vue'")
    .replaceAll("from '../field-decorator'", "from '../field-decorator/FieldDecorator.vue'")
    .replaceAll("from '../trigger'", "from '../trigger/trigger'")
    .replace("import { TagProps } from '../tag/Tag.vue'", "import type { TagProps } from '../tag/props'")
    .replace(
      "import { Backspace, Enter } from '../_utils/keycode'",
      "import { KEYBOARD_KEY } from '../_utils/keyboard'",
    )
    .replaceAll('Enter.key', 'KEYBOARD_KEY.ENTER')
    .replaceAll('Backspace.key', 'KEYBOARD_KEY.BACKSPACE')
    .replace(
      "const { prefix, n, classes } = createNamespace(props.baseCls ?? 'input-tag')",
      "const { n, classes } = createNamespace(props.baseCls ?? 'input-tag')\nconst prefix = n()",
    )
    .replaceAll('--c-', '--mp-')
    .replaceAll('.c-', '.mp-')
    .replaceAll('~"c-', '~"mp-')
    .replaceAll('--mp-transition-duration-3', '--mp-sys-motion-duration-standard')
    .replaceAll('--mp-transition-timing-function-standard', '--mp-sys-motion-easing-standard')
    .replaceAll('--mp-transition-timing-function-overshoot', '--mp-sys-motion-easing-standard')
    .replace('@import "../../style/theme/index.less";\n', '')
for (const [component, files] of Object.entries(components)) {
  for (const file of files) {
    const canonical = file.endsWith('.less') ? normalizeLessSource : normalizeTypeScript
    const [cedar, maple] = roots.map((root) => readFileSync(resolve(root, component, file), 'utf8'))
    assert.equal(await canonical(normalize(cedar)), await canonical(normalize(maple)), `${component}/${file} differs`)
    assert.doesNotMatch(maple, /from ['"][^'"]*(?:@cedar-design|cedar-design)/)
  }
}
for (const [root, compiler] of [
  [roots[0], '../node_modules/less/package.json'],
  [roots[1], '../../cli/node_modules/less/package.json'],
]) {
  const less = createRequire(resolve(root, compiler))('./')
  for (const component of Object.keys(components)) {
    const filename = resolve(root, component, 'style/index.less')
    const { css } = await less.render(readFileSync(filename, 'utf8'), { filename })
    assert.match(css, new RegExp(component))
  }
}
console.log('Mention and InputTag source copies and both Less outputs verified.')
