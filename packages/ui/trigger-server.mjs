import { Tokenizer } from 'parse5'
import { ssrRenderAttr, ssrRenderVNode } from 'vue/server-renderer'

const semanticAttribute = /^(?:aria|data)-[a-z0-9_.:-]+$/

async function flatten(chunk) {
  const value = await chunk
  return typeof value === 'string' ? value : (await Promise.all(value.map(flatten))).join('')
}

// Preserve the component's own rendering context and every byte outside its first start tag.
export async function renderReference(node, parent, attrs, marker) {
  const chunks = []
  ssrRenderVNode((chunk) => chunks.push(chunk), node, parent)
  const source = await flatten(chunks)
  let result = source
  const ignore = () => {}
  const tokenizer = new Tokenizer(
    { sourceCodeLocationInfo: true },
    {
      onComment: ignore,
      onDoctype: ignore,
      onEndTag: ignore,
      onEof: ignore,
      onCharacter: ignore,
      onNullCharacter: ignore,
      onWhitespaceCharacter: ignore,
      onStartTag(token) {
        tokenizer.pause()
        const originals = new Map(token.attrs.map((attr) => [attr.name, attr.value]))
        const baseline = new Map()
        // Preserve occupied business attributes and reuse an enclosing Trigger's record.
        let recordName = marker
        while (originals.has(recordName)) {
          try {
            const rows = JSON.parse(originals.get(recordName))
            if (
              Array.isArray(rows) &&
              rows.every(
                (row) =>
                  Array.isArray(row) &&
                  row.length === 3 &&
                  typeof row[0] === 'string' &&
                  semanticAttribute.test(row[0]) &&
                  (typeof row[1] === 'string' || row[1] === null) &&
                  typeof row[2] === 'string',
              )
            ) {
              for (const row of rows) {
                baseline.set(row[0], row)
              }
              break
            }
          } catch {
            /* Ordinary business data may occupy the marker. */
          }
          recordName += '-'
        }
        const edits = []
        let additions = ''
        for (const [name, value] of Object.entries(attrs)) {
          if (value == null || !semanticAttribute.test(name) || name === marker || name === recordName) {
            continue
          }
          const original = originals.get(name) ?? null
          const rendered =
            name === 'aria-describedby'
              ? [
                  ...new Set(
                    [original ?? '', String(value)]
                      .join(' ')
                      .split(/[ \t\n\f\r]+/)
                      .filter(Boolean),
                  ),
                ].join(' ')
              : String(value)
          if (original === rendered) {
            continue
          }
          const prior = baseline.get(name)
          baseline.set(name, [name, prior && prior[2] === original ? prior[1] : original, rendered])
          const location = token.location.attrs?.[name]
          const serialized = ssrRenderAttr(name, rendered)
          if (location) {
            edits.push([location.startOffset, location.endOffset, serialized.trimStart()])
          } else {
            additions += serialized
          }
        }
        if (!edits.length && !additions) {
          return
        }
        const metadata = ssrRenderAttr(recordName, JSON.stringify([...baseline.values()]))
        const markerLocation = token.location.attrs?.[recordName]
        if (markerLocation) {
          edits.push([markerLocation.startOffset, markerLocation.endOffset, metadata.trimStart()])
        } else {
          additions += metadata
        }
        const insert = token.location.startOffset + 1 + token.tagName.length
        edits.push([insert, insert, additions])
        for (const [start, end, text] of edits.sort((a, b) => b[0] - a[0])) {
          result = result.slice(0, start) + text + result.slice(end)
        }
      },
    },
  )
  tokenizer.write(source, true)
  return result
}
