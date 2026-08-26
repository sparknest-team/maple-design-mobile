import axe, { type AxeResults, type RunOptions } from 'axe-core'

export async function getAccessibilityViolations(
  root: Element,
  options?: RunOptions,
): Promise<AxeResults['violations']> {
  const result = options ? await axe.run(root, options) : await axe.run(root)
  return result.violations
}

export async function expectNoAccessibilityViolations(root: Element, options?: RunOptions): Promise<void> {
  const violations = await getAccessibilityViolations(root, options)
  const details = violations.map(({ id, help, nodes }) => `${id}: ${help} (${nodes.length} nodes)`).join('\n')
  expect(violations, details).toHaveLength(0)
}
