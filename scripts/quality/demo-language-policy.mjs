import { createRequire } from 'node:module'

const require = createRequire(new URL('../../packages/ui/package.json', import.meta.url))
const ts = require('typescript-js')
const localeCode = /^(?:en-US|zh-CN)$/
const equality = new Set([
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
])
const diagnostic =
  'The site selects the language. Use literal text in public examples and keep demoEnglish in the preview entry.'

export function checkDemoLanguage(code) {
  if (!/watchLang|en-US|zh-CN|currentMessage|demoEnglish|english|language|\.lang\b/i.test(code)) {
    return
  }
  const tree = ts.createSourceFile('demo.ts', code, ts.ScriptTarget.Latest, true)
  const refNames = new Set(['ref', 'shallowRef'])
  const globalReads = new Set(['currentMessage', 'demoEnglish'])
  for (const statement of tree.statements) {
    if (!ts.isImportDeclaration(statement)) {
      continue
    }
    const imports = statement.importClause?.namedBindings
    for (const item of imports?.elements ?? []) {
      const imported = (item.propertyName ?? item.name).text
      if (statement.moduleSpecifier.text === 'vue' && refNames.has(imported)) {
        refNames.add(item.name.text)
      }
      if (imported === 'demoEnglish') {
        globalReads.add(item.name.text)
      }
    }
  }
  const isCode = (node) => ts.isStringLiteralLike(node) && localeCode.test(node.text)
  function readsLanguage(node) {
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) {
      return readsLanguage(node.expression)
    }
    if (ts.isPropertyAccessExpression(node)) {
      return globalReads.has(node.name.text) || readsLanguage(node.expression)
    }
    return isCode(node) || (ts.isIdentifier(node) && globalReads.has(node.text))
  }
  function visit(node) {
    if (ts.isIdentifier(node) && ['watchLang', 'getSavedLanguage', 'resolveDemoLanguage'].includes(node.text)) {
      throw new Error(diagnostic)
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ['startsWith', 'includes', 'get'].includes(node.expression.name.text) &&
      /(?:location|route|query|hash|search)/i.test(node.expression.expression.getText()) &&
      node.arguments.some(
        (arg) => ts.isStringLiteralLike(arg) && /^(?:language=?|\/(?:en-US|zh-CN)\/?)$/.test(arg.text),
      )
    ) {
      throw new Error(diagnostic)
    }
    if (ts.isBinaryExpression(node)) {
      if (equality.has(node.operatorToken.kind) && [node.left, node.right].some(isCode)) {
        throw new Error(diagnostic)
      }
      if (
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        node.left.getText().endsWith('.value') &&
        readsLanguage(node.right)
      ) {
        throw new Error(diagnostic)
      }
    }
    if (
      ts.isCallExpression(node) &&
      refNames.has(
        ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : node.expression.getText(),
      ) &&
      node.arguments.some(readsLanguage)
    ) {
      throw new Error(diagnostic)
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.getText() === 'defineProps' &&
      /\b(?:english|isEnglish)\b/.test(node.getText())
    ) {
      throw new Error(diagnostic)
    }
    if (
      ts.isPropertyAccessExpression(node) &&
      ((node.name.text === 'language' && node.expression.getText().endsWith('.query')) ||
        (node.name.text === 'lang' && node.expression.getText().endsWith('documentElement')))
    ) {
      throw new Error(diagnostic)
    }
    ts.forEachChild(node, visit)
  }
  visit(tree)
}

/** Check the source exposed by the documentation, including script and template. */
export function checkCopyableDemo(source) {
  const missingCopyBinding = /\bcopy\s*\./.test(source) && !/\b(?:const|let|var|import)\s+copy\b/.test(source)
  const passesLanguageToDemo = /<[A-Za-z][\w.-]*\s+(?:[^<>]*?\s)?(?:english|:english)(?:\s|=|\/?>)/.test(source)
  if (
    passesLanguageToDemo ||
    missingCopyBinding ||
    /\b(?:useDemoLocale|demoEnglish)\b/.test(source) ||
    /['"](?:@maple-design\/cli-vue(?:\/[^'"]*)?|\.[^'"]*\/(?:locale|messages|demo-language)(?:[./][^'"]*)?)['"]/.test(
      source,
    )
  ) {
    throw new Error('Public demos must contain their own localized text. Select the language in the preview entry.')
  }
}
