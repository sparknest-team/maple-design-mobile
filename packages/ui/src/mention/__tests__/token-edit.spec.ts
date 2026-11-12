import { expect, test } from 'vitest'
import { diffMentionText, projectMentionParts, replaceMentionRange } from '../token-edit'

test('a partial deletion expands to the whole mention while preserving surrounding text', () => {
  const parts = [
    { type: 'text' as const, text: '请联系 ' },
    { type: 'mention' as const, value: 'shuai.meng' },
    { type: 'text' as const, text: ' 跟进' },
  ]
  const spans = projectMentionParts(parts, () => '孟帅')
  const diff = diffMentionText('请联系 @孟帅 跟进', '请联系 @孟 跟进')
  expect(replaceMentionRange(spans, diff.start, diff.end, [])).toEqual({
    parts: [
      { type: 'text', text: '请联系 ' },
      { type: 'text', text: ' 跟进' },
    ],
    start: 4,
  })
})

test('inserting at a token boundary preserves the token', () => {
  const parts = [{ type: 'mention' as const, value: 'id' }]
  const spans = projectMentionParts(parts, () => '姓名')
  expect(replaceMentionRange(spans, 3, 3, [{ type: 'text', text: '!' }]).parts).toEqual([
    { type: 'mention', value: 'id' },
    { type: 'text', text: '!' },
  ])
})
